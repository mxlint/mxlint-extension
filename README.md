# Mendix CLI Extension for Mendix Studio Pro

While [mendix-cli](https://github.com/cinaq/mendix-cli) is designed for pipeline automation, this extension is designed to be used in Mendix Studio Pro. This extension gives you quicker feedback to avoid surprises when you are ready to deploy your app.

> This is still early stage of development. Follow this project for future updates.

## Requirements

### OSX (MacOS)

- [Visual Studio Code](https://code.visualstudio.com/)
- [Mendix Studio Pro](https://marketplace.mendix.com/link/studiopro)
- [dotNet core SDK vscode](https://dot.net/core-sdk-vscode)
- C# dev kit VSCode extension (inside of VSCode)

### Windows

- TODO

## Build

```bash
make

```

## Test

```bash
/Applications/Studio\ Pro\ 10.12.2.41995-Beta.app/Contents/MacOS/studiopro --enable-extension-development
```

Open local project located in `resources/App`