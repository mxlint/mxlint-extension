using System.ComponentModel.Composition;
using Mendix.StudioPro.ExtensionsAPI.Services;
using Mendix.StudioPro.ExtensionsAPI.UI.DockablePane;

namespace com.cinaq.MxLintExtension.Extensions.Pane;

[Export(typeof(DockablePaneExtension))]
public class MxLintLogsPaneExtension : DockablePaneExtension
{
    public const string IdValue = "com-cinaq-mxlint-extension-logs";
    public override string Id => IdValue;
    public override DockablePanePosition InitialPosition => DockablePanePosition.Bottom;

    private readonly ILogService _logService;

    [ImportingConstructor]
    public MxLintLogsPaneExtension(ILogService logService)
    {
        _logService = logService;
    }

    public override DockablePaneViewModelBase Open()
    {
        var baseUri = new Uri(WebServerBaseUrl, "wwwroot/");
        return new MxLintLogsPaneExtensionWebViewModel(baseUri, _logService)
        {
            Title = "MxLint Logs"
        };
    }
}
