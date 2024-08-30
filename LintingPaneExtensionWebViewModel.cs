using Mendix.StudioPro.ExtensionsAPI.Model;
using Mendix.StudioPro.ExtensionsAPI.Services;
using Mendix.StudioPro.ExtensionsAPI.UI.DockablePane;
using Mendix.StudioPro.ExtensionsAPI.UI.WebView;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace com.cinaq.MendixCLIExtension;

public class LintingPaneExtensionWebViewModel : WebViewDockablePaneViewModel
{
    private readonly Uri _baseUri;
    private readonly Func<IModel?> _getCurrentApp;
    private readonly ILogService _logService;
    private DateTime _lastUpdateTime;
    private IWebView? _webView;  // Change 1: Make _webView nullable

    public LintingPaneExtensionWebViewModel(Uri baseUri, Func<IModel?> getCurrentApp, ILogService logService)
    {
        _baseUri = baseUri;
        _getCurrentApp = getCurrentApp;
        _logService = logService;
        _lastUpdateTime = DateTime.Now.AddYears(-100); // force refresh on first run
    }

    public override void InitWebView(IWebView webView)
    {
        _webView = webView;
        webView.Address = new Uri(_baseUri, "index.html");
        _logService.Info($"InitWebView: {_baseUri}");

        webView.MessageReceived += HandleWebViewMessage;
        //webView.ShowDevTools();
    }

    private async void HandleWebViewMessage(object? sender, MessageReceivedEventArgs args)  // Change 2: Make sender nullable
    {
        var currentApp = _getCurrentApp();
        if (currentApp == null) return;

        if (args.Message == "refreshData")
        {
            await Refresh(currentApp);
        }
        if (args.Message == "toggleDebug")
        {
            _webView?.ShowDevTools();
        }
    }

    private async Task<bool> Refresh(IModel currentApp)
    {
        var mprFile = GetMprFile(currentApp.Root.DirectoryPath);
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

        var cmd = new MendixCLICommand(currentApp, _logService);
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
