using System.Diagnostics;
using com.cinaq.MxLintExtension.Core;
using MxLintExtension.Tests.Helpers;
using Xunit;

namespace MxLintExtension.Tests;

public class ProjectGitChangesTests
{
    [Fact]
    public async Task DirectoryHasPendingGitChanges_NonGitDirectory_ReturnsFalse()
    {
        using var fixture = new TestFixture();

        var hasPending = await MxLint.DirectoryHasPendingGitChanges(fixture.ProjectDir);

        Assert.False(hasPending);
    }

    [Fact]
    public async Task DirectoryHasPendingGitChanges_CleanRepo_ReturnsFalse()
    {
        RequireGit();
        using var fixture = new TestFixture();
        await InitGitRepo(fixture.ProjectDir);
        await File.WriteAllTextAsync(Path.Combine(fixture.ProjectDir, "readme.txt"), "ok");
        await RunGit(fixture.ProjectDir, "add", "readme.txt");
        await RunGit(fixture.ProjectDir, "commit", "-m", "initial");

        var hasPending = await MxLint.DirectoryHasPendingGitChanges(fixture.ProjectDir);

        Assert.False(hasPending);
    }

    [Fact]
    public async Task DirectoryHasPendingGitChanges_DirtyRepo_ReturnsTrue()
    {
        RequireGit();
        using var fixture = new TestFixture();
        await InitGitRepo(fixture.ProjectDir);
        await File.WriteAllTextAsync(Path.Combine(fixture.ProjectDir, "readme.txt"), "ok");
        await RunGit(fixture.ProjectDir, "add", "readme.txt");
        await RunGit(fixture.ProjectDir, "commit", "-m", "initial");
        await File.WriteAllTextAsync(Path.Combine(fixture.ProjectDir, "readme.txt"), "changed");

        var hasPending = await MxLint.DirectoryHasPendingGitChanges(fixture.ProjectDir);

        Assert.True(hasPending);
    }

    [Fact]
    public async Task ProjectHasPendingGitChanges_UsesModelProjectDirectory()
    {
        RequireGit();
        using var fixture = new TestFixture();
        await InitGitRepo(fixture.ProjectDir);
        await File.WriteAllTextAsync(Path.Combine(fixture.ProjectDir, "readme.txt"), "ok");
        await RunGit(fixture.ProjectDir, "add", "readme.txt");
        await RunGit(fixture.ProjectDir, "commit", "-m", "initial");
        await File.WriteAllTextAsync(Path.Combine(fixture.ProjectDir, "untracked.txt"), "pending");

        var mxlint = new MxLint(fixture.Model, fixture.LogService);
        var hasPending = await mxlint.ProjectHasPendingGitChanges();

        Assert.True(hasPending);
    }

    private static void RequireGit()
    {
        try
        {
            using var process = Process.Start(new ProcessStartInfo
            {
                FileName = "git",
                Arguments = "--version",
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            });
            process?.WaitForExit(5000);
            Assert.True(process is { ExitCode: 0 }, "git is not available on PATH");
        }
        catch (Exception ex) when (ex is not Xunit.Sdk.XunitException)
        {
            Assert.Fail($"git is not available on PATH: {ex.Message}");
        }
    }

    private static async Task InitGitRepo(string directory)
    {
        await RunGit(directory, "init");
        await RunGit(directory, "config", "user.name", "mxlint-test");
        await RunGit(directory, "config", "user.email", "mxlint-test@localhost");
    }

    private static async Task RunGit(string directory, params string[] args)
    {
        var startInfo = new ProcessStartInfo
        {
            FileName = "git",
            WorkingDirectory = directory,
            UseShellExecute = false,
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            CreateNoWindow = true
        };
        foreach (var arg in args)
        {
            startInfo.ArgumentList.Add(arg);
        }

        using var process = new Process { StartInfo = startInfo };
        process.Start();
        var stdout = await process.StandardOutput.ReadToEndAsync();
        var stderr = await process.StandardError.ReadToEndAsync();
        await process.WaitForExitAsync();
        if (process.ExitCode != 0)
        {
            throw new InvalidOperationException($"git {string.Join(' ', args)} failed: {stderr}\n{stdout}");
        }
    }
}
