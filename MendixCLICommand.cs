using System.Diagnostics;
using Mendix.StudioPro.ExtensionsAPI.Model;
using System.Net;
using Mendix.StudioPro.ExtensionsAPI.Services;
using System.IO.Compression;


namespace com.cinaq.MendixCLIExtension;

public class MendixCLICommand
{

    IModel Model;
    string ExecutablePath;
    string LintResultsPath;
    string CachePath;
    string BaseURL;
    string PoliciesPath;
    private readonly ILogService _logService;
    private const string MendixCLIVersion = "v2.3.0";

    public MendixCLICommand(IModel model, ILogService logService)
    {
        Model = model;
        _logService = logService;

        CachePath = Path.Combine(Model.Root.DirectoryPath, ".mendix-cache");
        ExecutablePath = Path.Combine(CachePath, "mendix-cli-local.exe");
        LintResultsPath = Path.Combine(CachePath, "lint-results.json");
        PoliciesPath = Path.Combine(CachePath, "policies");
        BaseURL = "https://github.com/cinaq/mendix-cli/releases/download/" + MendixCLIVersion + "/";
    }

    public void Lint()
    {
        EnsureMendixCLI();
        EnsurePolicies();
        ExportModel();
        LintModel();
    }

    public void ExportModel()
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
            _logService.Info("Finished export model");
        }
        catch (Exception ex)
        {
            _logService.Error("Error: " + ex.Message);
        }
    }

    public void LintModel()
    {
        ProcessStartInfo startInfo = new ProcessStartInfo();
        startInfo.FileName = ExecutablePath;
        startInfo.Arguments = "lint -j " + LintResultsPath + " -p " + PoliciesPath;
        startInfo.WorkingDirectory = Model.Root.DirectoryPath;
        startInfo.UseShellExecute = true;
        startInfo.WindowStyle = ProcessWindowStyle.Hidden;


        Process process = new Process();
        process.StartInfo = startInfo;

        try
        {
            process.Start();
            process.WaitForExit();
            _logService.Info("Finished lint model");
        }
        catch (Exception ex)
        {
            _logService.Error("Error: " + ex.Message);
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
            string DownloadURL = BaseURL + "mendix-cli-" + MendixCLIVersion + "-windows-amd64.exe";
            _logService.Info("Downloading Mendix CLI from " + DownloadURL);
            client.DownloadFile(DownloadURL, ExecutablePath);
        }
    }
    private void EnsurePolicies()
    {
        if (Directory.Exists(PoliciesPath))
        {
            _logService.Info("Policies already exists");
            return;
        }

        using (var client = new WebClient())
        {
            string DownloadURL = BaseURL + "policies-" + MendixCLIVersion + ".zip";
            string tempPolicies = Path.Combine(CachePath, "policies.zip");
            _logService.Info("Downloading Policies from " + DownloadURL);
            client.DownloadFile(DownloadURL, tempPolicies);
            // unzip
            ZipFile.ExtractToDirectory(tempPolicies, CachePath);
        }
    }
}
