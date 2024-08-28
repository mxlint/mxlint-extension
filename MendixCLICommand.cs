using System.Diagnostics;
using Mendix.StudioPro.ExtensionsAPI.Model;
using System.Net.Http;
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

    public async Task Lint()
    {
        try
        {
            await EnsureMendixCLI();
            await EnsurePolicies();
            await ExportModel();
            await LintModel();
        }
        catch (Exception ex)
        {
            _logService.Error($"Error during linting process: {ex.Message}");
        }
    }

    public async Task ExportModel()
    {
        await RunProcess("export-model", "Exporting model");
    }

    public async Task LintModel()
    {
        await RunProcess($"lint -j {LintResultsPath} -p {PoliciesPath}", "Linting model");
    }

    private async Task RunProcess(string arguments, string operationName)
    {
        var startInfo = new ProcessStartInfo
        {
            FileName = ExecutablePath,
            Arguments = arguments,
            WorkingDirectory = Model.Root.DirectoryPath,
            UseShellExecute = false,
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            CreateNoWindow = true
        };

        using var process = new Process { StartInfo = startInfo };
        process.OutputDataReceived += (sender, e) => { if (e.Data != null) _logService.Info(e.Data); };
        process.ErrorDataReceived += (sender, e) => { if (e.Data != null) _logService.Error(e.Data); };

        try
        {
            process.Start();
            process.BeginOutputReadLine();
            process.BeginErrorReadLine();
            await process.WaitForExitAsync();
            _logService.Info($"Finished {operationName}");
        }
        catch (Exception ex)
        {
            _logService.Error($"Error during {operationName}: {ex.Message}");
        }
    }

    private async Task EnsureMendixCLI()
    {
        if (File.Exists(ExecutablePath))
        {
            _logService.Info("Mendix CLI already exists");
            return;
        }

        using (var client = new HttpClient())
        {
            string DownloadURL = BaseURL + "mendix-cli-" + MendixCLIVersion + "-windows-amd64.exe";
            _logService.Info("Downloading Mendix CLI from " + DownloadURL);
            var response = await client.GetAsync(DownloadURL);
            using (var fs = new FileStream(ExecutablePath, FileMode.CreateNew))
            {
                await response.Content.CopyToAsync(fs);
            }
        }
    }

    private async Task EnsurePolicies()
    {
        if (Directory.Exists(PoliciesPath))
        {
            _logService.Info("Policies already exists");
            return;
        }

        using (var client = new HttpClient())
        {
            string DownloadURL = BaseURL + "policies-" + MendixCLIVersion + ".zip";
            string tempPolicies = Path.Combine(CachePath, "policies.zip");
            _logService.Info("Downloading Policies from " + DownloadURL);
            var response = await client.GetAsync(DownloadURL);
            using (var fs = new FileStream(tempPolicies, FileMode.CreateNew))
            {
                await response.Content.CopyToAsync(fs);
            }
            // unzip
            ZipFile.ExtractToDirectory(tempPolicies, CachePath);
        }
    }
}
