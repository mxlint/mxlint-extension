all:
	dotnet build MendixCLIExtension.sln /property:GenerateFullPaths=true /consoleloggerparameters:NoSummary /p:Configuration=Debug /p:Platform="Any CPU"
	cp -r bin/Debug/net8.0/* resources/App/extensions/MendixCLIExtension/