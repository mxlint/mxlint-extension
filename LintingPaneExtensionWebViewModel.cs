using Mendix.StudioPro.ExtensionsAPI.Model;
using Mendix.StudioPro.ExtensionsAPI.Services;
using Mendix.StudioPro.ExtensionsAPI.UI.DockablePane;
using Mendix.StudioPro.ExtensionsAPI.UI.WebView;
using System.Timers;



namespace com.cinaq.MendixCLIExtension;

public class LintingPaneExtensionWebViewModel : WebViewDockablePaneViewModel
{
    private readonly Uri _baseUri;
    private readonly Func<IModel?> _getCurrentApp;
    private readonly ILogService _logService;
    private DateTime _lastUpdateTime;
    private IWebView _webView;

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
        _logService.Info("InitWebView: " + _baseUri);


        webView.MessageReceived += (_, args) =>
        {
            var currentApp = _getCurrentApp();
            if (currentApp == null) return;

            //_logService.Info("Message received: " + args.Message);

            if (args.Message == "refreshData")
            {
                Refresh(currentApp);
            }
        };
        //webView.ShowDevTools();
    }

    private bool Refresh(IModel currentApp)
    {

        //_logService.Info("Refreshing");
        var mprs = Directory.GetFiles(currentApp.Root.DirectoryPath, "*.mpr", SearchOption.TopDirectoryOnly);
        if (mprs.Length == 0)
        {
            _logService.Error("No mpr file found");
            return false;
        }
        var mpr = mprs[0];
        var lastWrite = File.GetLastWriteTime(mpr);
        if (lastWrite <= _lastUpdateTime)
        {
            _logService.Debug("No changes detected");
            return false;
        }
        _webView.PostMessage("start");
        _lastUpdateTime = lastWrite;
        _logService.Info("Changes detected" + _lastUpdateTime);

        // export model
        var cmd = new MendixCLICommand(currentApp, _logService);
        cmd.Lint();

        _webView.PostMessage("end");
        _webView.PostMessage("refreshData");
        return true;
    }

}
