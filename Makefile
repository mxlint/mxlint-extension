.PHONY: all clean frontend rebuild

# Version embedded into the built extension DLL. Release builds pass the release
# tag (without the leading "v"), e.g. `make VERSION=3.7.1`.
VERSION ?= 3.7.1

all: rebuild

clean:
	dotnet clean MxLintExtension.sln /p:Configuration=Debug /p:Platform="Any CPU"
	rm -rf bin obj tests/MxLintExtension.Tests/bin tests/MxLintExtension.Tests/obj

frontend:
	cd frontend && npm install
	cd frontend && npm run build
	rm -f wwwroot/index.html wwwroot/index-*.css wwwroot/index-*.js
	rm -rf wwwroot/assets
	cp -r frontend/dist/* wwwroot/

rebuild: clean frontend
	dotnet build MxLintExtension.sln --no-incremental /property:GenerateFullPaths=true /consoleloggerparameters:NoSummary /p:Configuration=Debug /p:Platform="Any CPU" /p:Version=$(VERSION)
	rm -rf resources/App/extensions/MxLintExtension/*
	cp -r bin/Debug/net8.0/* resources/App/extensions/MxLintExtension/