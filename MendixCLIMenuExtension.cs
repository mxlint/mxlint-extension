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
        yield return new MenuViewModel("Say hello", () => messageBoxService.ShowInformation("Hello World!"));
        yield return new MenuViewModel("Export Model", () => {
            MendixCLICommand cmd = new MendixCLICommand(CurrentApp);
            Console.WriteLine(CurrentApp.Root.DirectoryPath);
            cmd.exportModel();
        });
        yield return new MenuViewModel("Lint Model", () => {
            MendixCLICommand cmd = new MendixCLICommand(CurrentApp);
            Console.WriteLine(CurrentApp.Root.DirectoryPath);
            cmd.lintModel();
        });
        yield return new MenuViewModel("Open My Dockable Pane", () => dockingWindowService.OpenPane(LintingPaneExtension.ID));
    }
}