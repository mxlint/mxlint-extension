import { componentFramework as e } from "@mendix/component-framework";
import { getModelAccessWithComponentProxy as n } from "@mendix/model-access-sdk";
const i = {
  /**
   * UI related APIs
   */
  ui: {
    /**
     * API for showing message boxes
     */
    messageBoxes: e.getApi("mendix.MessageBoxApi"),
    /**
     * API for working with (document) tabs
     */
    tabs: e.getApi("mendix.TabApi"),
    /**
     * API for working with dockable panes
     */
    panes: e.getApi("mendix.DockablePaneApi"),
    /**
     * API for working with the Extensions menu
     */
    extensionsMenu: e.getApi("mendix.ExtensionsMenuApi")
  },
  /**
   * APIs for working with the app data, such as the app model and the files in the app directory
   */
  app: {
    /**
     * API for working with files in the app directory
     */
    files: e.getApi("mendix.AppFilesApi"),
    /**
     * APIs for working with the app model
     */
    model: {
      /**
       * API for working with domain models
       */
      domainModels: n(
        "mendix.DomainModelApi",
        "DomainModels$DomainModel"
      ),
      /**
       * API for working with pages
       */
      pages: n(
        "mendix.PageApi",
        "Pages$Page"
      ),
      /**
       * API for working with enumerations
       */
      enumerations: n(
        "mendix.EnumerationApi",
        "Enumerations$Enumeration"
      ),
      /**
       * API for working with snippets
       */
      snippets: n(
        "mendix.SnippetApi",
        "Pages$Snippet"
      ),
      /**
       * API for working with building blocks
       */
      buildingBlocks: n(
        "mendix.BuildingBlockApi",
        "Pages$BuildingBlock"
      )
    }
  }
};
class m {
  async loaded() {
    await i.ui.extensionsMenu.add({
      menuId: "mxlint.MainMenu",
      caption: "MxLint",
      subMenus: [
        { menuId: "mxlint.ShowDockMenuItem", caption: "Open" },
        { menuId: "mxlint.ShowTabMenuItem", caption: "Settings" }
      ]
    });
    const o = await i.ui.panes.register(
      {
        title: "MxLint",
        initialPosition: "bottom"
      },
      {
        componentName: "extension/mxlint",
        uiEntrypoint: "mainDock"
      }
    );
    i.ui.extensionsMenu.addEventListener(
      "menuItemActivated",
      (t) => {
        t.menuId === "mxlint.ShowTabMenuItem" ? i.ui.tabs.open(
          {
            title: "MxLint Settings"
          },
          {
            componentName: "extension/mxlint",
            uiEntrypoint: "settingsTab"
          }
        ) : t.menuId === "mxlint.ShowDockMenuItem" && i.ui.panes.open(o);
      }
    );
  }
}
const d = new m();
export {
  d as component
};
