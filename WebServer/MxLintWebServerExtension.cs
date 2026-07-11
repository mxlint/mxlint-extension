using System.ComponentModel.Composition;
using System.Net;
using System.Reflection;
using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;
using com.cinaq.MxLintExtension.Core;
using Mendix.StudioPro.ExtensionsAPI.Model;
using Mendix.StudioPro.ExtensionsAPI.Model.Projects;
using Mendix.StudioPro.ExtensionsAPI.Services;
using Mendix.StudioPro.ExtensionsAPI.UI.Events;
using Mendix.StudioPro.ExtensionsAPI.UI.Services;
using Mendix.StudioPro.ExtensionsAPI.UI.WebServer;

namespace com.cinaq.MxLintExtension.WebServer;

[Export(typeof(WebServerExtension))]
public class MxLintWebServerExtension : WebServerExtension
{
    private readonly IExtensionFileService _extensionFileService;
    private readonly ILogService _logService;
    private readonly IConfigurationService _configurationService;
    private readonly IDockingWindowService _dockingWindowService;
    private readonly SemaphoreSlim _runLintLock = new(1, 1);
    private readonly SemaphoreSlim _refreshLintLock = new(1, 1);
    private DateTime _lastRefreshUpdateTime = DateTime.Now.AddYears(-100);
    private bool _autoRefreshEnabled = true;
    private bool _diffModeEnabled = true;
    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNameCaseInsensitive = true
    };

    [ImportingConstructor]
    public MxLintWebServerExtension(
        IExtensionFileService extensionFileService,
        ILogService logService,
        IConfigurationService configurationService,
        IDockingWindowService dockingWindowService)
    {
        _extensionFileService = extensionFileService;
        _logService = logService;
        _configurationService = configurationService;
        _dockingWindowService = dockingWindowService;
    }

    public override void InitializeWebServer(IWebServer webServer)
    {
        var wwwrootPath = _extensionFileService.ResolvePath("wwwroot");
        var files = Directory.GetFiles(wwwrootPath, "*", SearchOption.AllDirectories);
        _logService.Info($"Initializing web server from wwwroot: {wwwrootPath}");

        foreach (var file in files)
        {
            var route = Path.GetRelativePath(wwwrootPath, file).Replace('\\', '/');
            var prefixedRoute = $"wwwroot/{route}";

            // Register both route styles for compatibility:
            // - route            (legacy consumers)
            // - wwwroot/route    (recommended macOS-friendly base URI)
            webServer.AddRoute(route, (request, response, ct) => ServeFile(file, response, ct));
            webServer.AddRoute(prefixedRoute, (request, response, ct) => ServeFile(file, response, ct));
            _logService.Info($"Registered web routes '{route}' and '{prefixedRoute}' -> '{file}'");
        }

        webServer.AddRoute("api", ServeApi);
        webServer.AddRoute("wwwroot/api", ServeApi);
        webServer.AddRoute("api/version", ServeVersion);
        webServer.AddRoute("wwwroot/api/version", ServeVersion);
        webServer.AddRoute("api/theme", ServeTheme);
        webServer.AddRoute("wwwroot/api/theme", ServeTheme);
        webServer.AddRoute("api/noqa", ServeNoqa);
        webServer.AddRoute("wwwroot/api/noqa", ServeNoqa);
        webServer.AddRoute("api/config", ServeConfig);
        webServer.AddRoute("wwwroot/api/config", ServeConfig);
        webServer.AddRoute("api/bookmarks", ServeBookmarks);
        webServer.AddRoute("wwwroot/api/bookmarks", ServeBookmarks);
        webServer.AddRoute("api/runlint", ServeRunLint);
        webServer.AddRoute("wwwroot/api/runlint", ServeRunLint);
        webServer.AddRoute("api/message", ServeMessage);
        webServer.AddRoute("wwwroot/api/message", ServeMessage);
        webServer.AddRoute("api/diag", ServeDiag);
        webServer.AddRoute("wwwroot/api/diag", ServeDiag);
        _logService.Info("Registered API routes: api/* and wwwroot/api/*");

        // Auto-run an initial lint when the app finishes loading so results are ready
        // even if the MxLint pane has not been opened yet (e.g. in headless CI sessions).
        Subscribe<ExtensionLoaded>(TriggerInitialLint);
    }

    private void TriggerInitialLint()
    {
        var currentApp = CurrentApp;
        if (currentApp == null)
        {
            _logService.Info("ExtensionLoaded fired without a current app; skipping initial lint.");
            return;
        }

        _logService.Info("ExtensionLoaded fired; starting initial lint in background.");
        _ = Task.Run(async () =>
        {
            try
            {
                var mxlint = new MxLint(currentApp, _logService);
                await mxlint.Lint();
            }
            catch (Exception ex)
            {
                _logService.Error($"Initial lint run failed: {ex}");
            }
        });
    }

    private static async Task ServeFile(string filePath, HttpListenerResponse response, CancellationToken ct)
    {
        var mimeType = GetMimeType(filePath);
        await response.SendFileAndClose(mimeType, filePath, ct);
    }

    private static string GetMimeType(string filePath)
    {
        var extension = Path.GetExtension(filePath);
        return extension switch
        {
            ".html" => "text/html",
            ".js" => "text/javascript",
            ".css" => "text/css",
            _ => "application/octet-stream"
        };
    }

    private async Task ServeApi(HttpListenerRequest request, HttpListenerResponse response, CancellationToken ct)
    {
        _logService.Info($"ServeApi hit: {request.Url}");
        WriteDebugToMxLintLog(CurrentApp, $"ServeApi hit: {request.Url}");

        if (CurrentApp == null)
        {
            response.SendNoBodyAndClose(404);
            return;
        }

        var jsonPath = Path.Combine(CurrentApp.Root.DirectoryPath, ".mendix-cache", "lint-results.json");
        var data = await File.ReadAllTextAsync(jsonPath, ct);
        var jsonStream = new MemoryStream();
        jsonStream.Write(Encoding.UTF8.GetBytes(data));
        response.SendJsonAndClose(jsonStream);
    }

    private Task ServeVersion(HttpListenerRequest request, HttpListenerResponse response, CancellationToken ct)
    {
        _logService.Info($"ServeVersion hit: {request.Url}");

        var versionObject = new JsonObject
        {
            ["version"] = GetExtensionVersion()
        };

        var json = versionObject.ToJsonString(new()
        {
            WriteIndented = true
        });

        var jsonStream = new MemoryStream();
        jsonStream.Write(Encoding.UTF8.GetBytes(json));
        response.SendJsonAndClose(jsonStream);
        return Task.CompletedTask;
    }

    private static string GetExtensionVersion()
    {
        var assembly = Assembly.GetExecutingAssembly();
        var informationalVersion = assembly
            .GetCustomAttribute<AssemblyInformationalVersionAttribute>()?
            .InformationalVersion;

        // InformationalVersion may carry build metadata (e.g. "3.7.1+abc123"); trim it.
        var version = informationalVersion?.Split('+')[0];
        if (string.IsNullOrWhiteSpace(version))
        {
            version = assembly.GetName().Version?.ToString();
        }

        return string.IsNullOrWhiteSpace(version) ? "unknown" : version;
    }

    private Task ServeTheme(HttpListenerRequest request, HttpListenerResponse response, CancellationToken ct)
    {
        _logService.Info($"ServeTheme hit: {request.Url}");
        WriteDebugToMxLintLog(CurrentApp, $"ServeTheme hit: {request.Url}");

        if (CurrentApp == null)
        {
            response.SendNoBodyAndClose(404);
            return Task.CompletedTask;
        }

        var themeObject = new JsonObject
        {
            ["theme"] = _configurationService.Configuration.Theme
                .ToString()
                .ToLowerInvariant()
        };

        var json = themeObject.ToJsonString(new()
        {
            WriteIndented = true
        });

        var jsonStream = new MemoryStream();
        jsonStream.Write(Encoding.UTF8.GetBytes(json));
        response.SendJsonAndClose(jsonStream);
        return Task.CompletedTask;
    }

    private async Task ServeNoqa(HttpListenerRequest request, HttpListenerResponse response, CancellationToken ct)
    {
        _logService.Info($"ServeNoqa hit: {request.Url}");
        WriteDebugToMxLintLog(CurrentApp, $"ServeNoqa hit: {request.Url}");

        if (CurrentApp == null)
        {
            response.SendNoBodyAndClose(404);
            return;
        }

        if (!string.Equals(request.HttpMethod, "POST", StringComparison.OrdinalIgnoreCase))
        {
            response.SendNoBodyAndClose(405);
            return;
        }

        try
        {
            using var reader = new StreamReader(request.InputStream, request.ContentEncoding ?? Encoding.UTF8);
            var body = await reader.ReadToEndAsync(ct);
            _logService.Info($"NOQA request received. Body length={body.Length}");
            var payload = JsonSerializer.Deserialize<NoqaRequest>(body, JsonOptions);

            if (payload?.Entries == null || payload.Entries.Count == 0)
            {
                _logService.Error("NOQA request rejected: no entries provided.");
                SendJson(response, new { success = false, error = "No NOQA entries provided." }, 400);
                return;
            }

            var totalRules = payload.Entries.Sum(e => e.Rules?.Count ?? 0);
            var action = string.IsNullOrWhiteSpace(payload.Action) ? "add" : payload.Action.Trim().ToLowerInvariant();
            _logService.Info($"Applying NOQA action='{action}'. Documents={payload.Entries.Count}, Rules={totalRules}");

            var mxlint = new MxLint(CurrentApp, _logService);
            if (action == "remove")
            {
                await mxlint.RemoveNoqaRules(payload.Entries);
            }
            else
            {
                await mxlint.AddNoqaRules(payload.Entries);
            }
            _logService.Info("NOQA update completed successfully.");
            SendJson(response, new { success = true });
        }
        catch (Exception ex)
        {
            _logService.Error($"Failed to update NOQA config: {ex}");
            SendJson(response, new { success = false, error = ex.Message }, 500);
        }
    }

    private async Task ServeConfig(HttpListenerRequest request, HttpListenerResponse response, CancellationToken ct)
    {
        _logService.Info($"ServeConfig hit: {request.HttpMethod} {request.Url}");
        WriteDebugToMxLintLog(CurrentApp, $"ServeConfig hit: {request.HttpMethod} {request.Url}");

        if (CurrentApp == null)
        {
            response.SendNoBodyAndClose(404);
            return;
        }

        var configPath = Path.Combine(CurrentApp.Root.DirectoryPath, "mxlint.yaml");

        if (string.Equals(request.HttpMethod, "GET", StringComparison.OrdinalIgnoreCase))
        {
            try
            {
                var mxlint = new MxLint(CurrentApp, _logService);
                await mxlint.EnsureConfigFile();
                var content = await File.ReadAllTextAsync(configPath, ct);
                SendJson(response, new { success = true, content });
            }
            catch (Exception ex)
            {
                _logService.Error($"Failed to read config file: {ex.Message}");
                SendJson(response, new { success = false, error = ex.Message }, 500);
            }

            return;
        }

        if (string.Equals(request.HttpMethod, "POST", StringComparison.OrdinalIgnoreCase))
        {
            try
            {
                using var reader = new StreamReader(request.InputStream, request.ContentEncoding ?? Encoding.UTF8);
                var body = await reader.ReadToEndAsync(ct);
                var payload = JsonSerializer.Deserialize<ConfigUpdateRequest>(body, JsonOptions);

                if (payload == null || string.IsNullOrWhiteSpace(payload.Content))
                {
                    SendJson(response, new { success = false, error = "Config content cannot be empty." }, 400);
                    return;
                }

                await File.WriteAllTextAsync(configPath, payload.Content, Encoding.UTF8, ct);
                SendJson(response, new { success = true });
            }
            catch (Exception ex)
            {
                _logService.Error($"Failed to update config file: {ex.Message}");
                SendJson(response, new { success = false, error = ex.Message }, 500);
            }

            return;
        }

        response.SendNoBodyAndClose(405);
    }

    private async Task ServeRunLint(HttpListenerRequest request, HttpListenerResponse response, CancellationToken ct)
    {
        _logService.Info($"ServeRunLint hit: {request.HttpMethod} {request.Url}");
        WriteDebugToMxLintLog(CurrentApp, $"ServeRunLint hit: {request.HttpMethod} {request.Url}");

        if (CurrentApp == null)
        {
            response.SendNoBodyAndClose(404);
            return;
        }

        if (!string.Equals(request.HttpMethod, "POST", StringComparison.OrdinalIgnoreCase))
        {
            response.SendNoBodyAndClose(405);
            return;
        }

        await _runLintLock.WaitAsync(ct);
        try
        {
            var mxlint = CreateMxLint(CurrentApp);
            await mxlint.Lint();
            SendJson(response, new { success = true });
        }
        catch (Exception ex)
        {
            _logService.Error($"ServeRunLint failed: {ex}");
            WriteDebugToMxLintLog(CurrentApp, $"ServeRunLint failed: {ex.Message}");
            SendJson(response, new { success = false, error = ex.Message }, 500);
        }
        finally
        {
            _runLintLock.Release();
        }
    }

    private async Task ServeBookmarks(HttpListenerRequest request, HttpListenerResponse response, CancellationToken ct)
    {
        _logService.Info($"ServeBookmarks hit: {request.HttpMethod} {request.Url}");
        WriteDebugToMxLintLog(CurrentApp, $"ServeBookmarks hit: {request.HttpMethod} {request.Url}");

        if (CurrentApp == null)
        {
            response.SendNoBodyAndClose(404);
            return;
        }

        var mxlint = new MxLint(CurrentApp, _logService);

        if (string.Equals(request.HttpMethod, "GET", StringComparison.OrdinalIgnoreCase))
        {
            var bookmarks = await mxlint.GetBookmarkedIds();
            SendJson(response, new { success = true, bookmarks });
            return;
        }

        if (string.Equals(request.HttpMethod, "POST", StringComparison.OrdinalIgnoreCase))
        {
            try
            {
                using var reader = new StreamReader(request.InputStream, request.ContentEncoding ?? Encoding.UTF8);
                var body = await reader.ReadToEndAsync(ct);
                var payload = JsonSerializer.Deserialize<BookmarksUpdateRequest>(body, JsonOptions);
                if (payload == null)
                {
                    SendJson(response, new { success = false, error = "Invalid bookmarks payload." }, 400);
                    return;
                }

                await mxlint.SaveBookmarkedIds(payload.Bookmarks);
                SendJson(response, new { success = true });
            }
            catch (Exception ex)
            {
                _logService.Error($"Failed to update bookmarks: {ex.Message}");
                SendJson(response, new { success = false, error = ex.Message }, 500);
            }

            return;
        }

        response.SendNoBodyAndClose(405);
    }

    private async Task ServeMessage(HttpListenerRequest request, HttpListenerResponse response, CancellationToken ct)
    {
        _logService.Info($"ServeMessage hit: {request.HttpMethod} {request.Url}");
        WriteDebugToMxLintLog(CurrentApp, $"ServeMessage hit: {request.HttpMethod} {request.Url}");

        if (CurrentApp == null)
        {
            response.SendNoBodyAndClose(404);
            return;
        }

        if (!string.Equals(request.HttpMethod, "POST", StringComparison.OrdinalIgnoreCase))
        {
            response.SendNoBodyAndClose(405);
            return;
        }

        FrontendMessageRequest? payload;
        try
        {
            using var reader = new StreamReader(request.InputStream, request.ContentEncoding ?? Encoding.UTF8);
            var body = await reader.ReadToEndAsync(ct);
            payload = JsonSerializer.Deserialize<FrontendMessageRequest>(body, JsonOptions);
        }
        catch (Exception ex)
        {
            _logService.Error($"ServeMessage payload parse failed: {ex.Message}");
            SendJson(response, new { success = false, error = "Invalid message payload." }, 400);
            return;
        }

        if (payload == null || string.IsNullOrWhiteSpace(payload.Message))
        {
            SendJson(response, new { success = false, error = "Message is required." }, 400);
            return;
        }

        var message = payload.Message;
        var data = payload.Data ?? new JsonObject();
        WriteDebugToMxLintLog(CurrentApp, $"ServeMessage dispatch: {message}");

        switch (message)
        {
            case "MessageListenerRegistered":
                SendJson(response, new { success = true });
                return;

            case "setAutoRefresh":
                _autoRefreshEnabled = ParseBoolean(data);
                _logService.Info($"Auto refresh set to {_autoRefreshEnabled} via HTTP message");
                SendJson(response, new { success = true, autoRefreshEnabled = _autoRefreshEnabled });
                return;

            case "setDiffMode":
                _diffModeEnabled = ParseBoolean(data);
                _logService.Info($"Diff mode set to {_diffModeEnabled} via HTTP message");
                SendJson(response, new { success = true, diffModeEnabled = _diffModeEnabled });
                return;

            case "refreshData":
            {
                if (!_autoRefreshEnabled)
                {
                    SendJson(response, new { success = true, ran = false, skipped = "autoRefreshDisabled" });
                    return;
                }

                var ran = await RunLintIfNeeded(CurrentApp, force: false, ct);
                SendJson(response, new { success = true, ran });
                return;
            }

            case "runLintNow":
            {
                await RunLintIfNeeded(CurrentApp, force: true, ct);
                SendJson(response, new { success = true, ran = true });
                return;
            }

            case "openDocument":
            {
                var opened = OpenDocument(CurrentApp, data);
                SendJson(response, new { success = opened, opened });
                return;
            }

            case "toggleDebug":
                SendJson(response, new { success = true, ignored = true });
                return;

            default:
                SendJson(response, new { success = false, error = $"Unknown message: {message}" }, 400);
                return;
        }
    }

    private async Task<bool> RunLintIfNeeded(IModel currentApp, bool force, CancellationToken ct)
    {
        await _refreshLintLock.WaitAsync(ct);
        try
        {
            var mprFile = GetMprFile(currentApp.Root.DirectoryPath);
            if (mprFile == null)
            {
                return false;
            }

            var lastWrite = File.GetLastWriteTime(mprFile);
            if (!force && lastWrite <= _lastRefreshUpdateTime)
            {
                _logService.Debug("HTTP refreshData: no changes detected.");
                return false;
            }

            _lastRefreshUpdateTime = lastWrite;
            var mxlint = CreateMxLint(currentApp);
            await mxlint.Lint();
            return true;
        }
        finally
        {
            _refreshLintLock.Release();
        }
    }

    private bool OpenDocument(IModel currentApp, JsonObject data)
    {
        if (OperatingSystem.IsMacOS())
        {
            _logService.Info($"Skipping openDocument via HTTP message on macOS: {data}");
            WriteDebugToMxLintLog(currentApp, $"Skipping openDocument via HTTP message on macOS: {data}");
            return false;
        }

        var doc = GetUnit(currentApp, data);
        if (doc == null)
        {
            _logService.Error($"Document not found via HTTP message: {data}");
            return false;
        }

        try
        {
            _dockingWindowService.TryOpenEditor(doc, null);
            return true;
        }
        catch (Exception ex)
        {
            _logService.Error($"Failed to open document '{data}' via HTTP message: {ex}");
            WriteDebugToMxLintLog(currentApp, $"Failed to open document '{data}' via HTTP message: {ex.Message}");
            return false;
        }
    }

    private IAbstractUnit? GetUnit(IModel currentApp, JsonObject data)
    {
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

    private string? GetMprFile(string directoryPath)
    {
        return Directory.GetFiles(directoryPath, "*.mpr", SearchOption.TopDirectoryOnly).FirstOrDefault();
    }

    private MxLint CreateMxLint(IModel currentApp) =>
        new(currentApp, _logService) { DiffMode = _diffModeEnabled };

    private static bool ParseBoolean(JsonObject data)
    {
        var value = data["enabled"]?.ToString();
        return bool.TryParse(value, out var parsed) && parsed;
    }

    private static void SendJson(HttpListenerResponse response, object payload, int statusCode = 200)
    {
        var json = JsonSerializer.Serialize(payload);
        var jsonStream = new MemoryStream(Encoding.UTF8.GetBytes(json));
        response.SendJsonAndClose(jsonStream, statusCode);
    }

    private Task ServeDiag(HttpListenerRequest request, HttpListenerResponse response, CancellationToken ct)
    {
        var evt = request.QueryString["event"] ?? "unknown";
        var detail = request.QueryString["detail"] ?? string.Empty;
        var source = request.QueryString["source"] ?? "web";

        _logService.Info($"Web diag [{source}] event='{evt}' detail='{detail}'");
        WriteDebugToMxLintLog(CurrentApp, $"Web diag [{source}] event='{evt}' detail='{detail}'");
        SendJson(response, new { success = true });
        return Task.CompletedTask;
    }

    private static void WriteDebugToMxLintLog(Mendix.StudioPro.ExtensionsAPI.Model.IModel? app, string message)
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
            // Never fail request processing because of diagnostics logging.
        }
    }
}

public sealed class NoqaRequest
{
    public List<NoqaDocumentRules> Entries { get; set; } = new();
    public string Action { get; set; } = "add";
}

public sealed class ConfigUpdateRequest
{
    public string Content { get; set; } = string.Empty;
}

public sealed class BookmarksUpdateRequest
{
    public List<string> Bookmarks { get; set; } = new();
}

public sealed class FrontendMessageRequest
{
    public string Message { get; set; } = string.Empty;
    public JsonObject? Data { get; set; }
}
