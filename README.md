# MxLint Extension for Mendix Studio Pro

This extension integrates MxLint into Mendix Studio Pro, allowing you to view lint results directly within the IDE.

## Features

- View lint results in a dedicated pane within Mendix Studio Pro
- Filter results by failures or skipped tests
- Configure server port and other settings
- Auto-refresh results

## Installation

1. Build the extension:
   ```
   npm install
   npm run build
   ```

2. Install the extension in Mendix Studio Pro:
   - Go to Menu > Extensions > Manage Extensions
   - Click "Import" and select the built extension file

## Usage

### Running the MxLint Server

The extension connects to a running mxlint-cli serve instance. To start the server:

1. Open a terminal in your Mendix project directory
2. Run the following command:
   ```
   mxlint-cli serve -i . -o modelsource -r rules -p 8084
   ```
   
   Where:
   - `-i .` specifies the input directory (current directory)
   - `-o modelsource` specifies the output directory for exported model files
   - `-r rules` specifies the directory containing lint rules
   - `-p 8084` specifies the port to run the server on (must match the port in the extension settings)

3. The server will watch for changes in your Mendix project and automatically update the lint results

### Using the Extension

1. Open the MxLint pane:
   - Go to Menu > Extensions > MxLint > Open Pane

2. Configure settings:
   - Go to Menu > Extensions > MxLint > Settings
   - Set the server port to match your mxlint-cli serve instance (default: 8084)

3. View and filter lint results in the MxLint pane

## Configuration

In the Settings tab, you can configure:

- Server port (default: 8084)
- Rules directory path
- Model source directory path
- JSON report path

## Development

This extension is built using:

- React
- TypeScript
- Mendix Extensions API

To develop:

1. Clone the repository
2. Install dependencies: `npm install`
3. Build: `npm run build`

## License

This project is licensed under the AGPL-3.0 License - see the LICENSE file for details.