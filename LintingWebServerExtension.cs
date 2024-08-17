using System.ComponentModel.Composition;
using System.Net;
using System.Text.Json;
using Mendix.StudioPro.ExtensionsAPI.Services;
using Mendix.StudioPro.ExtensionsAPI.UI.WebServer;

namespace com.cinaq.MendixCLI.MendixExtension;

[Export(typeof(WebServerExtension))]
public class LintingWebServerExtension : WebServerExtension
{
    private readonly IExtensionFileService _extensionFileService;
    private readonly ILogService _logService;

    [ImportingConstructor]
    public LintingWebServerExtension(IExtensionFileService extensionFileService, ILogService logService)
    {
        _extensionFileService = extensionFileService;
        _logService = logService;
    }

    public override void InitializeWebServer(IWebServer webServer)
    {
        webServer.AddRoute("index", ServeIndex);
        webServer.AddRoute("main.js", ServeMainJs);
        webServer.AddRoute("data", ServeData);
    }

    private async Task ServeIndex(HttpListenerRequest request, HttpListenerResponse response, CancellationToken ct)
    {
        var indexFilePath = _extensionFileService.ResolvePath("wwwroot", "index.html");
        await response.SendFileAndClose("text/html", indexFilePath, ct);
    }

    private async Task ServeMainJs(HttpListenerRequest request, HttpListenerResponse response, CancellationToken ct)
    {
        var indexFilePath = _extensionFileService.ResolvePath("wwwroot", "main.js");
        await response.SendFileAndClose("text/javascript", indexFilePath, ct);
    }

    private async Task ServeData(HttpListenerRequest request, HttpListenerResponse response, CancellationToken ct)
    {
        if (CurrentApp == null)
        {
            response.SendNoBodyAndClose(404);
            return;
        }

        // var toDoList = new ToDoStorage(CurrentApp, _logService).LoadToDoList();
        var toDoList = new List<string>();
        var jsonStream = new MemoryStream();
        await JsonSerializer.SerializeAsync(jsonStream, toDoList, cancellationToken: ct);

        response.SendJsonAndClose(jsonStream);
    }
}