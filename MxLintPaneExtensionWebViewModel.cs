using Mendix.StudioPro.ExtensionsAPI.Model;
using Mendix.StudioPro.ExtensionsAPI.Model.Projects;
using Mendix.StudioPro.ExtensionsAPI.Services;
using Mendix.StudioPro.ExtensionsAPI.UI.DockablePane;
using Mendix.StudioPro.ExtensionsAPI.UI.Services;
using Mendix.StudioPro.ExtensionsAPI.UI.WebView;
using System.Text.Json.Nodes;


namespace com.cinaq.MxLintExtension;

public class MxLintPaneExtensionWebViewModel : WebViewDockablePaneViewModel
{
    private readonly Uri _baseUri;
    private readonly Func<IModel?> _getCurrentApp;
    private readonly ILogService _logService;
    private readonly IDockingWindowService _dockingWindowService;
    private DateTime _lastUpdateTime;
    private IWebView? _webView;  // Change 1: Make _webView nullable


    public MxLintPaneExtensionWebViewModel(Uri baseUri, Func<IModel?> getCurrentApp, ILogService logService, IDockingWindowService dockingWindowService)
    {
        _baseUri = baseUri;
        _getCurrentApp = getCurrentApp;
        _dockingWindowService = dockingWindowService;
        _logService = logService;
        _lastUpdateTime = DateTime.Now.AddYears(-100); // force refresh on first run
    }

    public override void InitWebView(IWebView webView)
    {
        _webView = webView;
        webView.Address = new Uri(_baseUri, "index.html");
        // print message
        Console.WriteLine($"InitWebView: {webView.Address}");

        webView.ShowDevTools();
        webView.MessageReceived += HandleWebViewMessage;

        var currentApp = _getCurrentApp();
        Refresh(currentApp);
    }

    private async void HandleWebViewMessage(object? sender, MessageReceivedEventArgs args)  // Change 2: Make sender nullable
    {
        var currentApp = _getCurrentApp();
        Console.WriteLine($"HandleWebViewMessage: {args.Message}");
        if (currentApp == null) return;

        if (args.Message == "refreshData")
        {
            await Refresh(currentApp);
        }
        if (args.Message == "toggleDebug")
        {
            _webView?.ShowDevTools();
        }
        if (args.Message == "openDocument")
        {
            _webView?.PostMessage("documentOpened");
            await OpenDocument(currentApp, args.Data);
        }
    }


    private async Task<bool> OpenDocument(IModel currentApp, JsonObject data)
    {
        var doc = GetUnit(currentApp, data);
        if (doc == null)
        {
            _logService.Error($"Document not found: {data}");
            return false;
        }

        _dockingWindowService.TryOpenEditor(doc, null);
        return true;
    }

    private IAbstractUnit? GetUnit(IModel currentApp, JsonObject data)
    {
        _logService.Info($"Looking up document: {data}");

        var documentName = data["document"].ToString();
        if (documentName == "Security$ProjectSecurity")
        {
            return null;
        }

        var moduleName = data["module"].ToString();

        var module = currentApp.Root.GetModules().Single(m => m.Name == moduleName);
        if (module == null)
        {
            _logService.Error($"Module not found: {moduleName}");
            return null;
        }


        if (documentName == "DomainModels$DomainModel")
        {
            return module.DomainModel;
        }


        IFolder folder = null;
        while (documentName.Contains("/"))
        {
            var tokens = documentName.Split("/");
            var folderName = tokens[0];
            if (folder == null)
            {
                folder = module.GetFolders().FirstOrDefault(f => f.Name == folderName);
            }
            else
            {
                folder = folder.GetFolders().FirstOrDefault(f => f.Name == folderName);
            }
            documentName = documentName.Substring(folderName.Length + 1);
        }
        if (folder == null)
        {
            return module.GetDocuments().FirstOrDefault(d => d.Name == documentName);
        }
        else
        {
            return folder.GetDocuments().FirstOrDefault(d => d.Name == documentName);
        }

    }

    private async Task<bool> Refresh(IModel currentApp)
    {
        var mprFile = GetMprFile(currentApp.Root.DirectoryPath);
        Console.WriteLine($"Refresh: {mprFile}");
        if (mprFile == null) return false;

        var lastWrite = File.GetLastWriteTime(mprFile);
        if (lastWrite <= _lastUpdateTime)
        {
            _logService.Debug("No changes detected");
            return false;
        }

        _webView?.PostMessage("start");
        _lastUpdateTime = lastWrite;
        _logService.Info($"Changes detected: {_lastUpdateTime}");
        Console.WriteLine($"Refresh: {_lastUpdateTime}");

        var cmd = new MxLint(currentApp, _logService);
        await cmd.Lint();

        _webView?.PostMessage("end");
        _webView?.PostMessage("refreshData");
        return true;
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
}
