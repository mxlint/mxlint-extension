using System.ComponentModel.Composition;
using Mendix.StudioPro.ExtensionsAPI.Services;
using Mendix.StudioPro.ExtensionsAPI.UI.DockablePane;

namespace com.cinaq.MendixCLI.MendixExtension;

[Export(typeof(DockablePaneExtension))]
public class LintingPaneExtension : DockablePaneExtension
{
    private readonly ILogService _logService;

    public const string ID = "com-cinaq-mendix-cli";
    public override string Id => ID;

    [ImportingConstructor]
    public LintingPaneExtension(ILogService logService)
    {
        _logService = logService;
    }

    public override DockablePaneViewModelBase Open()
    {
        return new LintingPaneExtensionWebViewModel(WebServerBaseUrl, () => CurrentApp, _logService) { Title = "Linting" };
    }
}
