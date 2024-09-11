using System.ComponentModel.Composition;
using Mendix.StudioPro.ExtensionsAPI.UI.Menu;
using Mendix.StudioPro.ExtensionsAPI.UI.Services;

namespace com.cinaq.MxLintExtension;

[Export(typeof(MenuExtension))]
[method: ImportingConstructor]
public class MxLintMenuExtension(IDockingWindowService dockingWindowService, IMessageBoxService messageBoxService) : MenuExtension
{

    public override IEnumerable<MenuViewModel> GetMenus()
    {
        yield return new MenuViewModel("Open MxLint", () => dockingWindowService.OpenPane(MxLintPaneExtension.ID));
        yield return new MenuViewModel("About", () => messageBoxService.ShowInformation("Find the latest version and license info at https://github.com/mxlint/mxlint-extension"));

    }
}