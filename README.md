# MxLint Extension for Mendix Studio Pro

While [mxlint-cli](https://github.com/mxlint/mxlint-cli) is designed for pipeline automation, this extension is designed to be used in Mendix Studio Pro. It gives you quicker feedback to avoid surprises when you are ready to deploy your app.


## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm (usually comes with Node.js)
- Mendix Studio Pro (version 10.21.0 or later)

### Installation

1. Clone this repository (or fork it to create your own copy):
```bash
   git clone https://github.com/mxlint/mxlint-extension.git
```

2. Navigate to the project directory:
```bash
   cd mxlint-extension
```

3. Install dependencies:
```bash
   npm install
```

### Building the Extension

To build the extension, run:

```bash
npm run build
```

The build output will be located in the `dist/myextension` directory.

## Usage

1. After building, copy the `myextension` directory from `dist` to the `webextensions` directory in your Mendix app project. The resulting structure should be as follows:

```
<app directory>/
  App.mpr
  ...
  webextensions/
    myextension/
      manifest.json
      main.js
      ...
```

2. Rename the `myextension` directory to the actual name of your extension.

3. Start Studio Pro with the `--enable-extension-development` feature flag.

4. Open your Mendix app in Studio Pro and start using your web extension!

## Development

We recommend using [Visual Studio Code](https://code.visualstudio.com/) (VSCode) for developing your web extension. VSCode offers excellent support for JavaScript/TypeScript development and has a wide range of helpful extensions.


> This is still early stage of development. Follow this project for future updates.

See the [official docs](https://mxlint.com)