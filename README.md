# Mendix CLI Extension for Mendix Studio Pro

While [mendix-cli](https://github.com/cinaq/mendix-cli) is designed for pipeline automation, this extension is designed to be used in Mendix Studio Pro. This extension gives you quicker feedback to avoid surprises when you are ready to deploy your app.

> This is still early stage of development. Follow this project for future updates.

## Try out

- download this repo as a zipfile
- unpack the archive
- open Mendix Studio pro with extension development flag, see Test section below
- open the test app inside of the project at resources/App

> if you want to try this on your own project, just copy the contents of extensions from the test app here into your app.

## Good to know

- This extension uses mendix-cli tool behind the scenes
- Policies are cached inside of .mendix-cache/policies folder of your project
- You can add or modify policies inside of the cache folder
- mendix-cli is cached inside of .mendix-cache as well. you can side load your own version if desired
- current UX is not fantastic yet. mostly due to spawning heavy process to export and check the model.


## Development Environment

### OSX (MacOS)

- [Visual Studio Code](https://code.visualstudio.com/)
- [Mendix Studio Pro 10.12.2](https://marketplace.mendix.com/link/studiopro)
- [dotNet core SDK vscode](https://dot.net/core-sdk-vscode)
- C# dev kit VSCode extension (inside of VSCode)

#### Build

```bash
make

```

#### Test

- Open Mendix Studio Pro with `--enable-extension-development` flag: `/Applications/Studio\ Pro\ 10.12.2.41995-Beta.app/Contents/MacOS/studiopro --enable-extension-development`

- Open local project located in `resources/App`

### Windows

- [Visual Studio 2022](https://visualstudio.microsoft.com/)
- [Mendix Studio Pro 10.12.2](https://marketplace.mendix.com/link/studiopro)

#### Build

- Open `MendixCliExtension.sln` in Visual Studio and hit `F6` to build the project.
- Copy the output of `bin/Debug/net5.0` to `resources/App/extenions/MendixCLIExtension`: `copy-item -force -recurse .\bin\Debug\net8.0\* .\resources\App\extensions\MendixCLIExtension\`

#### Test

- Open studiopro.exe with `--enable-extension-development` flag.
- Open local project located in `resources/App`
