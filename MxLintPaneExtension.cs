using System.ComponentModel.Composition;
using Mendix.StudioPro.ExtensionsAPI.Services;
using Mendix.StudioPro.ExtensionsAPI.UI.DockablePane;

namespace com.cinaq.MxLintExtension;

[Export(typeof(DockablePaneExtension))]
public class MxLintPaneExtension : DockablePaneExtension
{
    private readonly ILogService _logService;

    public const string ID = "com-cinaq-mxlint-extension";
    public override string Id => ID;

    [ImportingConstructor]
    public MxLintPaneExtension(ILogService logService)
    {
        _logService = logService;
    }

    public override DockablePaneViewModelBase Open()
    {
        return new MxLintPaneExtensionWebViewModel(new Uri(Path.Combine(WebServerBaseUrl.AbsoluteUri,"wwwroot")), () => CurrentApp, _logService) { Title = "MxLint" };
    }
}
