using System.Diagnostics;
using Mendix.StudioPro.ExtensionsAPI.Model;
using System.Net.Http;
using Mendix.StudioPro.ExtensionsAPI.Services;
using System.IO.Compression;

namespace com.cinaq.MxLintExtension;

public class MxLint
{

    IModel Model;
    string ExecutablePath;
    string LintResultsPath;
    string CachePath;
    string RulesPath;
    string CLIBaseURL;
    string RulesBaseURL;
    private readonly ILogService _logService;
    private const string CLIVersion = "v3.2.1";
    private const string RulesVersion = "v3.1.0";

    public MxLint(IModel model, ILogService logService)
    {
        Model = model;
        _logService = logService;

        CachePath = Path.Combine(Model.Root.DirectoryPath, ".mendix-cache");
        ExecutablePath = Path.Combine(CachePath, "mxlint-local.exe");
        LintResultsPath = Path.Combine(CachePath, "lint-results.json");
        RulesPath = Path.Combine(CachePath, "rules");
        CLIBaseURL = "https://github.com/mxlint/mxlint-cli/releases/download/" + CLIVersion + "/";
        RulesBaseURL = "https://github.com/mxlint/mxlint-rules/releases/download/" + RulesVersion + "/";
    }

    public async Task Lint()
    {
        try
        {
            await EnsureCLI();
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
        await RunProcess($"lint -j {LintResultsPath} -r {RulesPath}", "Linting model");
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

    private async Task EnsureCLI()
    {
        if (File.Exists(ExecutablePath))
        {
            _logService.Info("CLI already exists");
            return;
        }

        using (var client = new HttpClient())
        {
            string DownloadURL = CLIBaseURL + "mxlint-" + CLIVersion + "-windows-amd64.exe";
            _logService.Info("Downloading CLI from " + DownloadURL);
            var response = await client.GetAsync(DownloadURL);
            using (var fs = new FileStream(ExecutablePath, FileMode.CreateNew))
            {
                await response.Content.CopyToAsync(fs);
            }
        }
    }

    private async Task EnsurePolicies()
    {
        if (Directory.Exists(RulesPath))
        {
            _logService.Info("Rules already exists");
            return;
        }

        using (var client = new HttpClient())
        {
            string DownloadURL = RulesBaseURL + "rules-" + RulesVersion + ".zip";
            string tempZip = Path.Combine(CachePath, "rules.zip");
            _logService.Info("Downloading rules from " + DownloadURL);
            var response = await client.GetAsync(DownloadURL);
            using (var fs = new FileStream(tempZip, FileMode.CreateNew))
            {
                await response.Content.CopyToAsync(fs);
            }
            // unzip
            ZipFile.ExtractToDirectory(tempZip, CachePath);
            File.Delete(tempZip);
        }
    }
}
