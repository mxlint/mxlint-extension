all:
	dotnet build mendix-cli-studio-pro-extension.generated.sln /property:GenerateFullPaths=true /consoleloggerparameters:NoSummary /p:Configuration=Debug /p:Platform="Any CPU"
	cp -r bin/Debug/net8.0/* resources/App/extensions/com.cinaq.MendixCLI/