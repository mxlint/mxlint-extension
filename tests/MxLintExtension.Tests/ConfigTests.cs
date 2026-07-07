using Xunit;
using com.cinaq.MxLintExtension.Core;
using MxLintExtension.Tests.Helpers;
using YamlDotNet.Serialization;
using YamlDotNet.Serialization.NamingConventions;

namespace MxLintExtension.Tests;

public class ConfigTests : IDisposable
{
    private readonly TestFixture _fixture = new();

    [Fact]
    public async Task EnsureConfigFile_CreatesDefaultConfig_WhenMissing()
    {
        var mxlint = new MxLint(_fixture.Model, _fixture.LogService);

        await mxlint.EnsureConfigFile();

        Assert.True(File.Exists(_fixture.ConfigPath));
        var config = DeserializeConfig(await File.ReadAllTextAsync(_fixture.ConfigPath));
        Assert.Equal(".mendix-cache/rules", config.Rules.Path);
        Assert.Equal(".mendix-cache/lint-results.json", config.Lint.JsonFile);
        Assert.Equal("modelsource", config.Modelsource);
        Assert.Equal(MxLint.DefaultCliVersion, config.Cli.Version);
        Assert.NotEmpty(config.Rules.Rulesets);
        Assert.Contains(config.Rules.Rulesets, value => value.Contains("mxlint-rules"));
    }

    [Fact]
    public async Task EnsureConfigFile_DoesNotOverwrite_WhenExists()
    {
        Directory.CreateDirectory(_fixture.CachePath);
        var customContent = "modelsource: custom-dir\n";
        await File.WriteAllTextAsync(_fixture.ConfigPath, customContent);

        var mxlint = new MxLint(_fixture.Model, _fixture.LogService);
        await mxlint.EnsureConfigFile();

        var actual = await File.ReadAllTextAsync(_fixture.ConfigPath);
        Assert.Equal(customContent, actual);
    }

    [Fact]
    public async Task EnsureConfigFile_CreatesCacheDirectory()
    {
        Assert.False(Directory.Exists(_fixture.CachePath));

        var mxlint = new MxLint(_fixture.Model, _fixture.LogService);
        await mxlint.EnsureConfigFile();

        Assert.True(Directory.Exists(_fixture.CachePath));
    }

    [Fact]
    public async Task DefaultConfig_HasExpectedStructure()
    {
        var mxlint = new MxLint(_fixture.Model, _fixture.LogService);
        await mxlint.EnsureConfigFile();

        var config = DeserializeConfig(await File.ReadAllTextAsync(_fixture.ConfigPath));

        Assert.False(config.Lint.IgnoreNoqa);
        Assert.Equal(4, config.Lint.Concurrency);
        Assert.False(config.Lint.RegoTrace);
        Assert.NotNull(config.Lint.Skip);
        Assert.Empty(config.Lint.Skip);
        Assert.True(config.Cache.Enable);
        Assert.Equal(".mendix-cache/mxlint", config.Cache.Directory);
        Assert.Equal(".", config.ProjectDirectory);
        Assert.Equal(".*", config.Export.Filter);
        Assert.False(config.Export.Raw);
        Assert.False(config.Export.Appstore);
    }

    private static MxLintConfig DeserializeConfig(string yaml)
    {
        var deserializer = new DeserializerBuilder()
            .WithNamingConvention(CamelCaseNamingConvention.Instance)
            .IgnoreUnmatchedProperties()
            .Build();
        return deserializer.Deserialize<MxLintConfig>(yaml);
    }

    public void Dispose() => _fixture.Dispose();
}
