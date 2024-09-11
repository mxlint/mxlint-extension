using System.ComponentModel.Composition;
using System.Net;
using System.Text;
using System.Text.Json;
using Mendix.StudioPro.ExtensionsAPI.Services;
using Mendix.StudioPro.ExtensionsAPI.UI.WebServer;

namespace com.cinaq.MxLintExtension;

[Export(typeof(WebServerExtension))]
public class MxLintWebServerExtension : WebServerExtension
{
    private readonly IExtensionFileService _extensionFileService;
    private readonly ILogService _logService;

    [ImportingConstructor]
    public MxLintWebServerExtension(IExtensionFileService extensionFileService, ILogService logService)
    {
        _extensionFileService = extensionFileService;
        _logService = logService;
    }

    public override void InitializeWebServer(IWebServer webServer)
    {
        var wwwrootPath = _extensionFileService.ResolvePath("wwwroot");
        var files = Directory.GetFiles(wwwrootPath);

        foreach (var file in files)
        {
            var route = Path.GetFileName(file);
            webServer.AddRoute(route, (request, response, ct) => ServeFile(file, response, ct));
        }

        webServer.AddRoute("api", ServeAPI);
    }

    private async Task ServeFile(string filePath, HttpListenerResponse response, CancellationToken ct)
    {
        var mimeType = GetMimeType(filePath);
        await response.SendFileAndClose(mimeType, filePath, ct);
    }

    private string GetMimeType(string filePath)
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

    private async Task ServeAPI(HttpListenerRequest request, HttpListenerResponse response, CancellationToken ct)
    {
        if (CurrentApp == null)
        {
            response.SendNoBodyAndClose(404);
            return;
        }

        // read json file
        var jsonPath = Path.Combine(CurrentApp.Root.DirectoryPath, ".mendix-cache", "lint-results.json");
        var data = await File.ReadAllTextAsync(jsonPath, ct);
        var jsonStream = new MemoryStream();
        jsonStream.Write(Encoding.UTF8.GetBytes(data));
        response.SendJsonAndClose(jsonStream);
    }
}