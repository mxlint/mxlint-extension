using System.ComponentModel.Composition;
using Mendix.StudioPro.ExtensionsAPI.UI.DockablePane;

namespace com.cinaq.MendixCLI.MendixExtension;

[Export(typeof(DockablePaneExtension))]
public class LintingPaneExtension : DockablePaneExtension
{
    public const string ID = "cinaq-linting-pane";
    public override string Id => ID;

    public override DockablePaneViewModelBase Open() => new LintingPaneExtensionWebViewModel("https://cinaq.com");
}
