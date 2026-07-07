using System.Text.Json.Nodes;
using com.cinaq.MxLintExtension.Core;
using Mendix.StudioPro.ExtensionsAPI.Model;
using Mendix.StudioPro.ExtensionsAPI.Model.Projects;
using Mendix.StudioPro.ExtensionsAPI.Services;
using Mendix.StudioPro.ExtensionsAPI.UI.DockablePane;
using Mendix.StudioPro.ExtensionsAPI.UI.Services;
using Mendix.StudioPro.ExtensionsAPI.UI.WebView;

namespace com.cinaq.MxLintExtension.Extensions.Pane;

public class MxLintPaneExtensionWebViewModel : WebViewDockablePaneViewModel
{
    private readonly Uri _baseUri;
    private readonly Func<IModel?> _getCurrentApp;
    private readonly ILogService _logService;
    private readonly IDockingWindowService _dockingWindowService;
    private readonly SemaphoreSlim _lintLock = new(1, 1);
    private DateTime _lastUpdateTime;
    private bool _autoRefreshEnabled = true;
    private bool _diffModeEnabled = true;
    private IWebView? _webView;

    public MxLintPaneExtensionWebViewModel(
        Uri baseUri,
        Func<IModel?> getCurrentApp,
        ILogService logService,
        IDockingWindowService dockingWindowService)
    {
        _baseUri = baseUri;
        _getCurrentApp = getCurrentApp;
        _dockingWindowService = dockingWindowService;
        _logService = logService;
        _lastUpdateTime = DateTime.Now.AddYears(-100);
    }

    public override void InitWebView(IWebView webView)
    {
        _webView = webView;
        webView.Address = new Uri(_baseUri, "index.html");
        _logService.Info($"InitWebView base URI: {_baseUri}");
        _logService.Info($"InitWebView address: {webView.Address}");
        webView.MessageReceived += HandleWebViewMessage;
    }

    private async void HandleWebViewMessage(object? sender, MessageReceivedEventArgs args)
    {
        try
        {
            _logService.Info($"WebView message received: {args.Message}");

            var currentApp = _getCurrentApp();
            WriteDebugToMxLintLog(currentApp, $"WebView message received: {args.Message}");
            if (currentApp == null)
            {
                _logService.Info($"Ignoring message '{args.Message}' because CurrentApp is null.");
                return;
            }

            if (args.Message == "refreshData")
            {
                if (_autoRefreshEnabled)
                {
                    await RunLint(currentApp, force: false);
                }
            }

            if (args.Message == "toggleDebug")
            {
                _webView?.ShowDevTools();
            }

            if (args.Message == "setAutoRefresh")
            {
                _autoRefreshEnabled = ParseBoolean(args.Data);
                _logService.Info($"Auto refresh set to {_autoRefreshEnabled}");
            }

            if (args.Message == "setDiffMode")
            {
                _diffModeEnabled = ParseBoolean(args.Data);
                _logService.Info($"Diff mode set to {_diffModeEnabled}");
            }

            if (args.Message == "runLintNow")
            {
                await RunLint(currentApp, force: true);
            }

            if (args.Message == "openDocument")
            {
                _webView?.PostMessage("documentOpened");
                await OpenDocument(currentApp, args.Data);
            }
        }
        catch (Exception ex)
        {
            _logService.Error($"Unhandled webview message processing error for '{args.Message}': {ex}");
            WriteDebugToMxLintLog(_getCurrentApp(), $"Webview message processing error for '{args.Message}': {ex.Message}");
        }
    }

    private Task<bool> OpenDocument(IModel currentApp, JsonObject data)
    {
        if (OperatingSystem.IsMacOS())
        {
            _logService.Info($"Skipping openDocument on macOS: {data}");
            WriteDebugToMxLintLog(currentApp, $"Skipping openDocument on macOS: {data}");
            return Task.FromResult(false);
        }

        var doc = GetUnit(currentApp, data);
        if (doc == null)
        {
            _logService.Error($"Document not found: {data}");
            return Task.FromResult(false);
        }

        try
        {
            _dockingWindowService.TryOpenEditor(doc, null);
            return Task.FromResult(true);
        }
        catch (Exception ex)
        {
            _logService.Error($"Failed to open document '{data}': {ex}");
            WriteDebugToMxLintLog(currentApp, $"Failed to open document '{data}': {ex.Message}");
            return Task.FromResult(false);
        }
    }

    private IAbstractUnit? GetUnit(IModel currentApp, JsonObject data)
    {
        _logService.Info($"Looking up document: {data}");

        var documentName = data["document"]?.ToString();
        if (string.IsNullOrWhiteSpace(documentName))
        {
            return null;
        }

        if (documentName == "Security$ProjectSecurity")
        {
            return null;
        }

        var moduleName = data["module"]?.ToString();
        if (string.IsNullOrWhiteSpace(moduleName))
        {
            return null;
        }

        var module = currentApp.Root.GetModules().FirstOrDefault(m => m.Name == moduleName);
        if (module == null)
        {
            _logService.Error($"Module not found: {moduleName}");
            return null;
        }

        if (documentName == "DomainModels$DomainModel")
        {
            return module.DomainModel;
        }

        IFolder? folder = null;
        while (documentName.Contains('/'))
        {
            var tokens = documentName.Split('/');
            var folderName = tokens[0];
            folder = folder == null
                ? module.GetFolders().FirstOrDefault(f => f.Name == folderName)
                : folder.GetFolders().FirstOrDefault(f => f.Name == folderName);
            documentName = documentName.Substring(folderName.Length + 1);
        }

        return folder == null
            ? module.GetDocuments().FirstOrDefault(d => d.Name == documentName)
            : folder.GetDocuments().FirstOrDefault(d => d.Name == documentName);
    }

    private async Task<bool> RunLint(IModel currentApp, bool force)
    {
        await _lintLock.WaitAsync();
        try
        {
        var mprFile = GetMprFile(currentApp.Root.DirectoryPath);
        if (mprFile == null)
        {
            return false;
        }

        var lastWrite = File.GetLastWriteTime(mprFile);
        if (!force && lastWrite <= _lastUpdateTime)
        {
            _logService.Debug("No changes detected");
            return false;
        }

        _webView?.PostMessage("start");
        _lastUpdateTime = lastWrite;
        _logService.Info(force ? "Manual lint run requested" : $"Changes detected: {_lastUpdateTime}");

        var cmd = new MxLint(currentApp, _logService) { DiffMode = _diffModeEnabled };
        await cmd.Lint();

        _webView?.PostMessage("end");
        _webView?.PostMessage("refreshData");
        return true;
        }
        finally
        {
            _lintLock.Release();
        }
    }

    private string? GetMprFile(string directoryPath)
    {
        var mprFile = Directory.GetFiles(directoryPath, "*.mpr", SearchOption.TopDirectoryOnly).FirstOrDefault();
        if (mprFile == null)
        {
            _logService.Error("No mpr file found");
        }

        return mprFile;
    }

    private static bool ParseBoolean(JsonObject data)
    {
        var value = data["enabled"]?.ToString();
        return bool.TryParse(value, out var parsed) && parsed;
    }

    private static void WriteDebugToMxLintLog(IModel? app, string message)
    {
        if (app == null)
        {
            return;
        }

        try
        {
            var cachePath = Path.Combine(app.Root.DirectoryPath, ".mendix-cache");
            Directory.CreateDirectory(cachePath);
            var logPath = Path.Combine(cachePath, "mxlint.logs");
            var timestamp = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss.fff");
            File.AppendAllText(logPath, $"[{timestamp}] [DEBUG] {message}{Environment.NewLine}");
        }
        catch
        {
            // Never fail message handling because of diagnostics logging.
        }
    }
}
