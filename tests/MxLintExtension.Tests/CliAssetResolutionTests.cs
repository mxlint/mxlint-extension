using System.Runtime.InteropServices;
using com.cinaq.MxLintExtension.Core;
using Xunit;

namespace MxLintExtension.Tests;

public class CliAssetResolutionTests
{
    [Fact]
    public void ResolveCliVersion_ReturnsConfiguredValue_WhenProvided()
    {
        var version = MxLint.ResolveCliVersion("v9.9.9");
        Assert.Equal("v9.9.9", version);
    }

    [Theory]
    [InlineData("")]
    [InlineData("   ")]
    [InlineData(null)]
    public void ResolveCliVersion_ReturnsDefault_WhenValueMissing(string? configuredVersion)
    {
        var version = MxLint.ResolveCliVersion(configuredVersion);
        Assert.Equal(MxLint.DefaultCliVersion, version);
    }

    [Fact]
    public void ResolveCliAssetName_ReturnsWindowsArm64Asset_ForWindowsArm64()
    {
        var assetName = MxLint.ResolveCliAssetName("v3.14.1", OSPlatform.Windows, Architecture.Arm64);
        Assert.Equal("mxlint-v3.14.1-windows-arm64-signed.exe", assetName);
    }

    [Theory]
    [InlineData(Architecture.X64)]
    [InlineData(Architecture.X86)]
    [InlineData(Architecture.Arm)]
    [InlineData(Architecture.Wasm)]
    [InlineData(Architecture.S390x)]
    [InlineData(Architecture.LoongArch64)]
    [InlineData(Architecture.Ppc64le)]
    public void ResolveCliAssetName_ReturnsWindowsAmd64Asset_ForNonArm64Windows(Architecture architecture)
    {
        var assetName = MxLint.ResolveCliAssetName("v3.14.1", OSPlatform.Windows, architecture);
        Assert.Equal("mxlint-v3.14.1-windows-amd64-signed.exe", assetName);
    }

    [Fact]
    public void ResolveCliAssetName_ReturnsDarwinArm64Asset_ForMacArm64()
    {
        var assetName = MxLint.ResolveCliAssetName("v3.14.1", OSPlatform.OSX, Architecture.Arm64);
        Assert.Equal("mxlint-v3.14.1-darwin-arm64", assetName);
    }

    [Fact]
    public void ResolveCliAssetName_ReturnsDarwinAmd64Asset_ForMacX64()
    {
        var assetName = MxLint.ResolveCliAssetName("v3.14.1", OSPlatform.OSX, Architecture.X64);
        Assert.Equal("mxlint-v3.14.1-darwin-amd64", assetName);
    }

    [Fact]
    public void ResolveLocalExecutableName_MatchesAssetName_ForWindowsAsset()
    {
        var executableName = MxLint.ResolveLocalExecutableName("mxlint-v3.14.1-windows-arm64-signed.exe");
        Assert.Equal("mxlint-v3.14.1-windows-arm64-signed.exe", executableName);
    }

    [Fact]
    public void ResolveLocalExecutableName_MatchesAssetName_ForMacAsset()
    {
        var executableName = MxLint.ResolveLocalExecutableName("mxlint-v3.14.1-darwin-arm64");
        Assert.Equal("mxlint-v3.14.1-darwin-arm64", executableName);
    }
}
