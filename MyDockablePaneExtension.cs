using System.ComponentModel.Composition;
using Mendix.StudioPro.ExtensionsAPI.UI.DockablePane;

namespace MyCompany.MyProject.MendixExtension;

[Export(typeof(DockablePaneExtension))]
public class MyDockablePaneExtension : DockablePaneExtension
{
    public const string ID = "my-dockable-pane";
    public override string Id => ID;

    public override DockablePaneViewModelBase Open() => new MyDockablePaneExtensionWebViewModel("https://mendix.com");
}
