using System.Diagnostics;
using System.Net.Http;
using System.Runtime.InteropServices;
using System.Text;
using YamlDotNet.Serialization;
using YamlDotNet.Serialization.NamingConventions;
using Mendix.StudioPro.ExtensionsAPI.Model;
using Mendix.StudioPro.ExtensionsAPI.Services;

namespace com.cinaq.MxLintExtension.Core;

public class MxLint
{
    private const string DefaultNoqaReason = "Skipped from MxLint extension";
    internal const string DefaultCliVersion = "v3.14.2";
    private readonly IModel _model;
    private readonly ILogService _logService;
    private string _executablePath;
    private readonly string _lintResultsPath;
    private readonly string _configPath;
    private readonly string _cachePath;
    private readonly string _logFilePath;

    public bool DiffMode { get; set; }

    public MxLint(IModel model, ILogService logService)
    {
        _model = model;
        _logService = logService;

        var currentOsPlatform = GetCurrentOSPlatform();
        _cachePath = Path.Combine(_model.Root.DirectoryPath, ".mendix-cache");
        var defaultCliAssetName = ResolveCliAssetName(DefaultCliVersion, currentOsPlatform, RuntimeInformation.OSArchitecture);
        _executablePath = Path.Combine(_cachePath, ResolveLocalExecutableName(defaultCliAssetName));
        _lintResultsPath = Path.Combine(_cachePath, "lint-results.json");
        _configPath = Path.Combine(_model.Root.DirectoryPath, "mxlint.yaml");
        _logFilePath = Path.Combine(_cachePath, "mxlint.logs");
    }

    public async Task Lint()
    {
        LogInfo("Starting lint workflow.");
        try
        {
            EnsureCacheDirectory();
            LogInfo($"Cache directory: {_cachePath}");
            LogInfo($"Config path: {_configPath}");
            LogInfo($"Lint results path: {_lintResultsPath}");
            await EnsureConfigFile();
            await EnsureCli();
            await ExportModel();
            await LintModel();
            LogInfo("Lint workflow completed.");
        }
        catch (Exception ex)
        {
            LogError($"Error during linting process: {ex.Message}", ex);
        }
    }

    public async Task ExportModel()
    {
        await RunProcess($"--config \"{_configPath}\" export", "Exporting model");
    }

    public async Task LintModel()
    {
        var diffArg = DiffMode ? " --diff" : string.Empty;
        await RunProcess($"--config \"{_configPath}\" lint{diffArg}", "Linting model");
    }

    public async Task AddNoqaRules(IEnumerable<NoqaDocumentRules> entries)
    {
        EnsureCacheDirectory();
        await EnsureConfigFile();
        var config = await ReadConfig();

        config.Lint ??= new MxLintConfigLint();
        config.Lint.Skip ??= new Dictionary<string, List<MxLintConfigSkipRule>>(StringComparer.OrdinalIgnoreCase);

        foreach (var entry in entries)
        {
            var documentPath = NormalizeDocumentPath(entry.Document);
            if (string.IsNullOrWhiteSpace(documentPath))
            {
                continue;
            }

            if (!config.Lint.Skip.TryGetValue(documentPath, out var skipRules))
            {
                skipRules = new List<MxLintConfigSkipRule>();
                config.Lint.Skip[documentPath] = skipRules;
            }

            var existingRules = skipRules
                .Where(item => !string.IsNullOrWhiteSpace(item.Rule))
                .Select(item => item.Rule)
                .ToHashSet(StringComparer.OrdinalIgnoreCase);

            foreach (var ruleNumber in entry.Rules.Select(NormalizeRuleNumber).Where(rule => !string.IsNullOrWhiteSpace(rule)))
            {
                if (existingRules.Contains(ruleNumber))
                {
                    continue;
                }

                skipRules.Add(new MxLintConfigSkipRule
                {
                    Rule = ruleNumber,
                    Reason = string.IsNullOrWhiteSpace(entry.Reason) ? DefaultNoqaReason : entry.Reason.Trim(),
                    Date = DateTime.UtcNow.ToString("yyyy-MM-dd")
                });

                existingRules.Add(ruleNumber);
            }
        }

        await WriteConfig(config);
    }

    public async Task RemoveNoqaRules(IEnumerable<NoqaDocumentRules> entries)
    {
        EnsureCacheDirectory();
        await EnsureConfigFile();
        var config = await ReadConfig();

        config.Lint ??= new MxLintConfigLint();
        config.Lint.Skip ??= new Dictionary<string, List<MxLintConfigSkipRule>>(StringComparer.OrdinalIgnoreCase);

        foreach (var entry in entries)
        {
            var documentPath = NormalizeDocumentPath(entry.Document);
            if (string.IsNullOrWhiteSpace(documentPath))
            {
                continue;
            }

            if (!config.Lint.Skip.TryGetValue(documentPath, out var skipRules))
            {
                continue;
            }

            var rulesToRemove = entry.Rules
                .Select(NormalizeRuleNumber)
                .Where(rule => !string.IsNullOrWhiteSpace(rule))
                .ToHashSet(StringComparer.OrdinalIgnoreCase);

            if (rulesToRemove.Count == 0)
            {
                continue;
            }

            skipRules.RemoveAll(item => !string.IsNullOrWhiteSpace(item.Rule) && rulesToRemove.Contains(item.Rule));
            if (skipRules.Count == 0)
            {
                config.Lint.Skip.Remove(documentPath);
            }
        }

        await WriteConfig(config);
    }

    public async Task<List<string>> GetBookmarkedIds()
    {
        EnsureCacheDirectory();
        await EnsureConfigFile();
        var config = await ReadConfig();
        config.Ui ??= new MxLintConfigUi();

        return config.Ui.Bookmarks
            .Where(value => !string.IsNullOrWhiteSpace(value))
            .Select(value => value.Trim())
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .OrderBy(value => value, StringComparer.OrdinalIgnoreCase)
            .ToList();
    }

    public async Task SaveBookmarkedIds(IEnumerable<string> bookmarks)
    {
        EnsureCacheDirectory();
        await EnsureConfigFile();
        var config = await ReadConfig();
        config.Ui ??= new MxLintConfigUi();

        config.Ui.Bookmarks = bookmarks
            .Where(value => !string.IsNullOrWhiteSpace(value))
            .Select(value => value.Trim())
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .OrderBy(value => value, StringComparer.OrdinalIgnoreCase)
            .ToList();

        await WriteConfig(config);
    }

    private async Task RunProcess(string arguments, string operationName)
    {
        LogInfo($"Starting process for {operationName}. Executable: {_executablePath}; Arguments: {arguments}");
        var startInfo = new ProcessStartInfo
        {
            FileName = _executablePath,
            Arguments = arguments,
            WorkingDirectory = _model.Root.DirectoryPath,
            UseShellExecute = false,
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            CreateNoWindow = true
        };

        using var process = new Process { StartInfo = startInfo };
        process.OutputDataReceived += (_, e) =>
        {
            if (e.Data != null)
            {
                LogInfo(e.Data);
            }
        };
        process.ErrorDataReceived += (_, e) =>
        {
            if (e.Data != null)
            {
                LogError(e.Data);
            }
        };

        try
        {
            process.Start();
            process.BeginOutputReadLine();
            process.BeginErrorReadLine();
            await process.WaitForExitAsync();
            if (process.ExitCode != 0)
            {
                throw new InvalidOperationException($"{operationName} failed with exit code {process.ExitCode}");
            }

            LogInfo($"Finished {operationName}");
        }
        catch (Exception ex)
        {
            LogError($"Error during {operationName}: {ex.Message}", ex);
        }
    }

    private async Task EnsureCli()
    {
        var currentOsPlatform = GetCurrentOSPlatform();
        var cliVersion = await ResolveConfiguredCliVersion();
        var cliAssetName = ResolveCliAssetName(cliVersion, currentOsPlatform, RuntimeInformation.OSArchitecture);
        _executablePath = Path.Combine(_cachePath, ResolveLocalExecutableName(cliAssetName));
        LogInfo($"CLI resolution: platform={currentOsPlatform}, arch={RuntimeInformation.OSArchitecture}, configuredVersion={cliVersion}, asset={cliAssetName}, targetPath={_executablePath}");

        if (File.Exists(_executablePath))
        {
            LogInfo($"CLI already exists for version {cliVersion} at {_executablePath}");
            return;
        }

        var cliBaseUrl = $"https://github.com/mxlint/mxlint-cli/releases/download/{cliVersion}/";
        using var client = new HttpClient();
        var downloadUrl = $"{cliBaseUrl}{cliAssetName}";
        LogInfo($"CLI not found. Downloading CLI from {downloadUrl}");
        var response = await client.GetAsync(downloadUrl);
        LogInfo($"CLI download response status: {(int)response.StatusCode} {response.ReasonPhrase}");
        response.EnsureSuccessStatusCode();
        await using var fs = new FileStream(_executablePath, FileMode.CreateNew);
        await response.Content.CopyToAsync(fs);
        var fileSize = new FileInfo(_executablePath).Length;
        LogInfo($"CLI downloaded successfully to {_executablePath} ({fileSize} bytes)");
        EnsureExecutablePermissions(currentOsPlatform);
    }

    private async Task<string> ResolveConfiguredCliVersion()
    {
        var config = await ReadConfig();
        var cliVersion = ResolveCliVersion(config.Cli?.Version);
        LogInfo($"Resolved CLI version from config: raw='{config.Cli?.Version ?? "<null>"}', effective='{cliVersion}'");
        return cliVersion;
    }

    internal static string ResolveCliVersion(string? configuredVersion)
    {
        return string.IsNullOrWhiteSpace(configuredVersion)
            ? DefaultCliVersion
            : configuredVersion.Trim();
    }

    internal static string ResolveCliAssetName(string cliVersion, OSPlatform osPlatform, Architecture architecture)
    {
        var normalizedVersion = ResolveCliVersion(cliVersion);
        if (osPlatform == OSPlatform.Windows)
        {
            return architecture switch
            {
                Architecture.Arm64 => $"mxlint-{normalizedVersion}-windows-arm64.exe",
                _ => $"mxlint-{normalizedVersion}-windows-amd64.exe"
            };
        }

        if (osPlatform == OSPlatform.OSX)
        {
            return architecture switch
            {
                Architecture.Arm64 => $"mxlint-{normalizedVersion}-darwin-arm64",
                _ => $"mxlint-{normalizedVersion}-darwin-amd64"
            };
        }

        return architecture switch
        {
            Architecture.Arm64 => $"mxlint-{normalizedVersion}-linux-arm64",
            _ => $"mxlint-{normalizedVersion}-linux-amd64"
        };
    }

    internal static string ResolveLocalExecutableName(string cliAssetName)
    {
        return cliAssetName;
    }

    private static OSPlatform GetCurrentOSPlatform()
    {
        if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
        {
            return OSPlatform.Windows;
        }

        if (RuntimeInformation.IsOSPlatform(OSPlatform.OSX))
        {
            return OSPlatform.OSX;
        }

        return OSPlatform.Linux;
    }

    private void EnsureExecutablePermissions(OSPlatform osPlatform)
    {
        if (OperatingSystem.IsWindows() || osPlatform == OSPlatform.Windows)
        {
            LogInfo("Skipping executable permission update on Windows.");
            return;
        }

        try
        {
            File.SetUnixFileMode(
                _executablePath,
                UnixFileMode.UserRead | UnixFileMode.UserWrite | UnixFileMode.UserExecute |
                UnixFileMode.GroupRead | UnixFileMode.GroupExecute |
                UnixFileMode.OtherRead | UnixFileMode.OtherExecute);
            LogInfo($"Executable permissions updated for {_executablePath}");
        }
        catch (Exception ex)
        {
            LogError($"Unable to set executable permissions on CLI: {ex.Message}", ex);
        }
    }

    private void EnsureCacheDirectory()
    {
        if (!Directory.Exists(_cachePath))
        {
            Directory.CreateDirectory(_cachePath);
        }
    }

    public async Task EnsureConfigFile()
    {
        if (File.Exists(_configPath))
        {
            LogInfo("MxLint config already exists.");
            return;
        }

        EnsureCacheDirectory();
        var config = CreateDefaultConfig();
        await WriteConfig(config);
        LogInfo($"Created default MxLint config at {_configPath}");
    }

    private async Task<MxLintConfig> ReadConfig()
    {
        if (!File.Exists(_configPath))
        {
            return CreateDefaultConfig();
        }

        var yaml = await File.ReadAllTextAsync(_configPath);
        var deserializer = new DeserializerBuilder()
            .WithNamingConvention(CamelCaseNamingConvention.Instance)
            .IgnoreUnmatchedProperties()
            .Build();

        var config = deserializer.Deserialize<MxLintConfig>(yaml);
        LogInfo($"Read config from {_configPath}");
        return config ?? CreateDefaultConfig();
    }

    private async Task WriteConfig(MxLintConfig config)
    {
        var serializer = new SerializerBuilder()
            .WithNamingConvention(CamelCaseNamingConvention.Instance)
            .Build();

        var yaml = serializer.Serialize(config);
        await File.WriteAllTextAsync(_configPath, yaml, Encoding.UTF8);
        LogInfo($"Wrote config to {_configPath}");
    }

    private MxLintConfig CreateDefaultConfig()
    {
        return new MxLintConfig
        {
            Rules = new MxLintConfigRules
            {
                Path = ".mendix-cache/rules",
                Rulesets = new List<string>
                {
                    "https://github.com/mxlint/mxlint-rules/releases/download/v3.3.0/rules-v3.3.0.zip"
                }
            },
            Lint = new MxLintConfigLint
            {
                XunitReport = "",
                JsonFile = ".mendix-cache/lint-results.json",
                IgnoreNoqa = false,
                Concurrency = 4,
                RegoTrace = false,
                Skip = new Dictionary<string, List<MxLintConfigSkipRule>>()
            },
            Cache = new MxLintConfigCache
            {
                Directory = ".mendix-cache/mxlint",
                Enable = true
            },
            Modelsource = "modelsource",
            ProjectDirectory = ".",
            Export = new MxLintConfigExport
            {
                Filter = ".*",
                Raw = false,
                Appstore = false
            },
            Cli = new MxLintConfigCli
            {
                Version = DefaultCliVersion
            }
        };
    }

    private static string NormalizeDocumentPath(string value)
    {
        var normalized = value.Trim().Replace("\\", "/");
        normalized = normalized.TrimStart('/');
        normalized = normalized.StartsWith("./", StringComparison.Ordinal) ? normalized[2..] : normalized;
        return normalized;
    }

    private static string NormalizeRuleNumber(string value)
    {
        return value.Trim();
    }

    private void LogInfo(string message) => Log("INFO", message);

    private void LogError(string message, Exception? exception = null)
    {
        var fullMessage = exception == null ? message : $"{message}{Environment.NewLine}{exception}";
        Log("ERROR", fullMessage);
    }

    private void Log(string level, string message)
    {
        var line = $"[{DateTime.UtcNow:yyyy-MM-dd HH:mm:ss.fff}Z] [{level}] {message}";

        try
        {
            if (!Directory.Exists(_cachePath))
            {
                Directory.CreateDirectory(_cachePath);
            }

            File.AppendAllText(_logFilePath, line + Environment.NewLine);
        }
        catch
        {
            // File logging must never block extension execution.
        }

        if (level == "ERROR")
        {
            _logService.Error(message);
            return;
        }

        _logService.Info(message);
    }
}

public sealed class NoqaDocumentRules
{
    public string Document { get; set; } = string.Empty;
    public List<string> Rules { get; set; } = new();
    public string Reason { get; set; } = string.Empty;
}

public sealed class MxLintConfig
{
    public MxLintConfigRules Rules { get; set; } = new();
    public MxLintConfigLint Lint { get; set; } = new();
    public MxLintConfigCache Cache { get; set; } = new();
    public MxLintConfigExport Export { get; set; } = new();
    public MxLintConfigServe Serve { get; set; } = new();
    public MxLintConfigCli Cli { get; set; } = new();
    public MxLintConfigUi Ui { get; set; } = new();
    public string Modelsource { get; set; } = "modelsource";
    public string ProjectDirectory { get; set; } = ".";
}

public sealed class MxLintConfigRules
{
    public string Path { get; set; } = ".mendix-cache/rules";
    public List<string> Rulesets { get; set; } = new();
}

public sealed class MxLintConfigLint
{
    public string XunitReport { get; set; } = "";
    public string JsonFile { get; set; } = "";
    public bool IgnoreNoqa { get; set; }
    public int Concurrency { get; set; } = 4;
    public bool RegoTrace { get; set; }
    public Dictionary<string, List<MxLintConfigSkipRule>> Skip { get; set; } = new();
}

public sealed class MxLintConfigCache
{
    public string Directory { get; set; } = ".mendix-cache/mxlint";
    public bool Enable { get; set; } = true;
}

public sealed class MxLintConfigExport
{
    public string Filter { get; set; } = ".*";
    public bool Raw { get; set; }
    public bool Appstore { get; set; }
}

public sealed class MxLintConfigServe
{
    public int Port { get; set; } = 8082;
    public int Debounce { get; set; } = 500;
}

public sealed class MxLintConfigCli
{
    public string Version { get; set; } = MxLint.DefaultCliVersion;
}

public sealed class MxLintConfigUi
{
    public List<string> Bookmarks { get; set; } = new();
}

public sealed class MxLintConfigSkipRule
{
    public string Rule { get; set; } = string.Empty;
    public string Reason { get; set; } = string.Empty;
    public string Date { get; set; } = string.Empty;
}
