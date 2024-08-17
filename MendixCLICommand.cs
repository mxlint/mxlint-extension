using System.Diagnostics;
using Mendix.StudioPro.ExtensionsAPI.Model.Projects;
using Mendix.StudioPro.ExtensionsAPI.Model;
using System.IO;


namespace com.cinaq.MendixCLI;

public class MendixCLICommand
{

    IModel Model;
    string ExecutablePath;

    public MendixCLICommand(IModel model)
    {
        Model = model;
        ExecutablePath = Path.Combine(Model.Root.DirectoryPath, "mendix-cli-local");
    }

    public string exportModel()
    {
        ProcessStartInfo startInfo = new ProcessStartInfo();
        startInfo.FileName = ExecutablePath;
        startInfo.Arguments = "export-model";
        startInfo.WorkingDirectory = Model.Root.DirectoryPath;
        startInfo.RedirectStandardOutput = true;

        Process process = new Process();
        process.StartInfo = startInfo;

        try
        {
            process.Start();
            process.WaitForExit();

            string output = process.StandardOutput.ReadToEnd();
            Console.WriteLine(output);
            return output;

        }
        catch (Exception ex)
        {
            Console.WriteLine("Error: " + ex.Message);
            return string.Empty; // Or handle the error appropriately
        }
    }

    public string lintModel()
    {
        ProcessStartInfo startInfo = new ProcessStartInfo();
        startInfo.FileName = ExecutablePath;
        startInfo.Arguments = "lint -j lint-results.json";
        startInfo.WorkingDirectory = Model.Root.DirectoryPath;
        startInfo.RedirectStandardOutput = true;

        Process process = new Process();
        process.StartInfo = startInfo;

        try
        {
            process.Start();
            process.WaitForExit();

            string output = process.StandardOutput.ReadToEnd();
            Console.WriteLine(output);
            return output;

        }
        catch (Exception ex)
        {
            Console.WriteLine("Error: " + ex.Message);
            return string.Empty; // Or handle the error appropriately
        }
    }

    private void ensureMendixCLI()
    {
        ProcessStartInfo startInfo = new ProcessStartInfo();
        startInfo.FileName = "npm";
        startInfo.Arguments = "install -g mendix-cli";
        startInfo.RedirectStandardOutput = true;

        Process process = new Process();
        process.StartInfo = startInfo;
        process.Start();

        string output = process.StandardOutput.ReadToEnd();

        Console.WriteLine("XXX");
        Console.WriteLine(output);

        process.WaitForExit();
    }
}
