using Mendix.StudioPro.ExtensionsAPI.Services;
using Mendix.StudioPro.ExtensionsAPI.UI.DockablePane;
using Mendix.StudioPro.ExtensionsAPI.UI.WebView;

namespace com.cinaq.MxLintExtension.Extensions.Pane;

public class MxLintLogsPaneExtensionWebViewModel : WebViewDockablePaneViewModel
{
    private readonly Uri _baseUri;
    private readonly ILogService _logService;

    public MxLintLogsPaneExtensionWebViewModel(Uri baseUri, ILogService logService)
    {
        _baseUri = baseUri;
        _logService = logService;
    }

    public override void InitWebView(IWebView webView)
    {
        webView.Address = new Uri(_baseUri, "index.html?view=logs");
        _logService.Info($"InitWebView MxLint Logs base URI: {_baseUri}");
        _logService.Info($"InitWebView MxLint Logs address: {webView.Address}");
    }
}
