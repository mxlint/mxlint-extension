using System.Diagnostics;
using Mendix.StudioPro.ExtensionsAPI.Model;
using System.Net;
using Mendix.StudioPro.ExtensionsAPI.Services;


namespace com.cinaq.MendixCLIExtension;

public class MendixCLICommand
{

    IModel Model;
    string ExecutablePath;
    string LintResultsPath;
    string DownloadURL;
    private readonly ILogService _logService;

    public MendixCLICommand(IModel model, ILogService logService)
    {
        Model = model;
        _logService = logService;
        ExecutablePath = Path.Combine(Model.Root.DirectoryPath, ".mendix-cache", "mendix-cli-local.exe");
        LintResultsPath = Path.Combine(Model.Root.DirectoryPath, ".mendix-cache", "lint-results.json");
        DownloadURL = "https://github.com/cinaq/mendix-cli/releases/download/v2.2.2/mendix-cli-v2.2.2-windows-amd64.exe";

    }

    public void Lint()
    {
        EnsureMendixCLI();
        ExportModel();
        LintModel();
    }

    public string ExportModel()
    {
        ProcessStartInfo startInfo = new ProcessStartInfo();
        startInfo.FileName = ExecutablePath;
        startInfo.Arguments = "export-model";
        startInfo.WorkingDirectory = Model.Root.DirectoryPath;
        startInfo.UseShellExecute = true;
        startInfo.WindowStyle = ProcessWindowStyle.Hidden;

        Process process = new Process();
        process.StartInfo = startInfo;

        try
        {
            process.Start();
            process.WaitForExit();

            string output = process.StandardOutput.ReadToEnd();
            _logService.Info(output);
            return output;

        }
        catch (Exception ex)
        {
            _logService.Error("Error: " + ex.Message);
            return string.Empty; // Or handle the error appropriately
        }
    }

    public string LintModel()
    {
        ProcessStartInfo startInfo = new ProcessStartInfo();
        startInfo.FileName = ExecutablePath;
        startInfo.Arguments = "lint -j " + LintResultsPath;
        startInfo.WorkingDirectory = Model.Root.DirectoryPath;
        startInfo.UseShellExecute = true;
        startInfo.WindowStyle = ProcessWindowStyle.Hidden;


        Process process = new Process();
        process.StartInfo = startInfo;

        try
        {
            process.Start();
            process.WaitForExit();

            string output = process.StandardOutput.ReadToEnd();
            _logService.Info(output);
            return output;

        }
        catch (Exception ex)
        {
            _logService.Error("Error: " + ex.Message);
            return string.Empty; // Or handle the error appropriately
        }
    }

    private void EnsureMendixCLI()
    {
        if (File.Exists(ExecutablePath))
        {
            _logService.Info("Mendix CLI already exists");
            return;
        }

        using (var client = new WebClient())
        {
            _logService.Info("Downloading Mendix CLI from " + DownloadURL);
            client.DownloadFile(DownloadURL, ExecutablePath);
        }
    }
}
