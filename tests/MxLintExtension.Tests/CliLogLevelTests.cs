using com.cinaq.MxLintExtension.Core;
using Xunit;

namespace MxLintExtension.Tests;

public class CliLogLevelTests
{
    [Theory]
    [InlineData("time=\"2026-09-10T20:45:14Z\" level=error msg=\"export failed\"")]
    [InlineData("time=\"2026-09-10T20:45:14Z\" level=fatal msg=\"panic\"")]
    [InlineData("time=\"2026-09-10T20:45:14Z\" level=warning msg=\"deprecated flag\"")]
    public void IsCliErrorLine_ReturnsTrue_ForWarningAndErrorLevels(string line)
    {
        Assert.True(MxLint.IsCliErrorLine(line));
    }

    [Theory]
    [InlineData("time=\"2026-09-10T20:45:14Z\" level=info msg=\"Exporting to .mendix-cache/modelsource\"")]
    [InlineData("time=\"2026-09-10T20:45:14Z\" level=debug msg=\"cache hit\"")]
    public void IsCliErrorLine_ReturnsFalse_ForRoutineLogLevels(string line)
    {
        Assert.False(MxLint.IsCliErrorLine(line));
    }

    [Theory]
    [InlineData("Error: unknown flag: --modelsource")]
    [InlineData("panic: runtime error: index out of range")]
    public void IsCliErrorLine_ReturnsTrue_ForUnstructuredStderrOutput(string line)
    {
        Assert.True(MxLint.IsCliErrorLine(line));
    }
}
