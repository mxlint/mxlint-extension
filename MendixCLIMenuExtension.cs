using System.ComponentModel.Composition;
using Mendix.StudioPro.ExtensionsAPI.UI.Menu;
using Mendix.StudioPro.ExtensionsAPI.UI.Services;

namespace com.cinaq.MendixCLIExtension;

[Export(typeof(MenuExtension))]
[method: ImportingConstructor]
public class MendixCLIMenuExtension(IDockingWindowService dockingWindowService, IMessageBoxService messageBoxService) : MenuExtension
{

    public override IEnumerable<MenuViewModel> GetMenus()
    {
        yield return new MenuViewModel("About", () => messageBoxService.ShowInformation("Hello World!"));
        yield return new MenuViewModel("Open Linting", () => dockingWindowService.OpenPane(LintingPaneExtension.ID));
    }
}