import { IComponent, studioPro } from "@mendix/extensions-api";

class Main implements IComponent {
    async loaded() {
        // Add a menu item to the Extensions menu
        await studioPro.ui.extensionsMenu.add({
            menuId: "mxlint.MainMenu",
            caption: "MxLint",
            subMenus: [
                { menuId: "mxlint.ShowDockMenuItem", caption: "Open" },
                { menuId: "mxlint.ShowTabMenuItem", caption: "Settings" },
            ],
        });

        const paneHandle = await studioPro.ui.panes.register(
            {
                title: "MxLint",
                initialPosition: "bottom",
            },
            {
                componentName: "extension/mxlint",
                uiEntrypoint: "mainDock",
            });

        // Open a tab when the menu item is clicked
        studioPro.ui.extensionsMenu.addEventListener(
            "menuItemActivated",
            (args) => {
                if (args.menuId === "mxlint.ShowTabMenuItem") {
                    studioPro.ui.tabs.open(
                        {
                            title: "MxLint Settings",
                        },
                        {
                            componentName: "extension/mxlint",
                            uiEntrypoint: "settingsTab",
                        }
                    );
                }
                else if (args.menuId === "mxlint.ShowDockMenuItem") {
                    studioPro.ui.panes.open(paneHandle);
                }
            }
        );
    }
}

export const component: IComponent = new Main();
