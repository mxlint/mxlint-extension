using Mendix.StudioPro.ExtensionsAPI.Model;
using Mendix.StudioPro.ExtensionsAPI.Services;
using Mendix.StudioPro.ExtensionsAPI.UI.DockablePane;
using Mendix.StudioPro.ExtensionsAPI.UI.WebView;


namespace com.cinaq.MendixCLIExtension;

public class LintingPaneExtensionWebViewModel : WebViewDockablePaneViewModel
{
    private readonly Uri _baseUri;
    private readonly Func<IModel?> _getCurrentApp;
    private readonly ILogService _logService;

    public LintingPaneExtensionWebViewModel(Uri baseUri, Func<IModel?> getCurrentApp, ILogService logService)
    {
        _baseUri = baseUri;
        _getCurrentApp = getCurrentApp;
        _logService = logService;
    }

    public override void InitWebView(IWebView webView)
    {
        webView.Address = new Uri(_baseUri, "index.html");
        _logService.Info("InitWebView: " + _baseUri);


        webView.MessageReceived += (_, args) =>
        {
            var currentApp = _getCurrentApp();
            if (currentApp == null) return;

            // if (args.Message == "Refresh")
            // {
            //     var toDoText = args.Data["toDoText"]?.GetValue<string>() ?? "New To Do";
            //     AddToDo(currentApp, toDoText);
            //     webView.PostMessage("RefreshToDos");
            // }
            _logService.Info("Message received: " + args.Message);

            if (args.Message == "LintModel")
            {
                Refresh(currentApp);
                webView.PostMessage("Refresh");
            }
        };
    }

    private void Refresh(IModel currentApp)
    {
        // var toDoStorage = new ToDoStorage(currentApp, _logService);
        // var toDoList = toDoStorage.LoadToDoList();
        // toDoList.ToDos.RemoveAll(x => x.IsDone);
        // toDoStorage.SaveToDoList(toDoList);
        _logService.Info("Refreshing");
        // export model
        var cmd = new MendixCLICommand(currentApp, _logService);
        cmd.Lint();
    }

}
