# ps-generative-credits-plugin

A UXP plugin for Adobe Photoshop that displays Adobe Firefly partner model information and their generative credit costs.

## Features

- Fetches real-time model data from Adobe's official documentation
- Displays model names and credit costs in an easy-to-read format

## Installation

### Enabled Developer Mode in Photoshop
1. Launch Photoshop (2025/26.0 or greater)
2. Go to **Settings > Plugins** and check **"Enable Developer Mode"**
3. Restart Photoshop


### Install Plugin via UXP Developer Tool
1. Launch **UXP Developer Tools** from Creative Cloud
2. Enable developer mode when prompted
3. Select **File > Add Plugin**
4. Navigate to the the directory you downloaded the files and select **manifest.json**:
5. Click **Load**
6. In your Photoshop, open the plugin panel and click **Connect**






1. **Download or clone this plugin** to a folder on your computer (e.g., `/Users/YourName/ps-generative-credits-plugin/`)

2. **Open Adobe Photoshop** (version 24.0.0 or later)

3. **Open the UXP Developer Tool**:
   - In Photoshop, go to `Plugins > Development > UXP Developer Tool`
   - If you don't see this option, you may need to enable developer mode in Photoshop preferences

4. **Add the plugin**:
   - In the UXP Developer Tool, click the `Add Plugin` button
   - Navigate to the plugin folder and select the `manifest.json` file
   - Click `Open`

5. **Load the plugin**:
   - The plugin should now appear in the UXP Developer Tool
   - Click the `•••` (three dots) menu next to the plugin name
   - Select `Load`

6. **Access the plugin**:
   - In Photoshop, go to `Plugins > Firefly Models`
   - The plugin panel will open showing the model information



## Usage

1. **Open the plugin panel**:
   - Go to `Plugins > Firefly Models` in Photoshop

2. **View model information**:
   - The plugin will automatically fetch and display model data when opened
   - Scroll through the list to see all available models and their credit costs

3. **Refresh data**:
   - Click the `Refresh` button at the top of the panel to reload the latest model information

4. **Understanding the information**:
   - **Model Name**: The name of the AI model and its provider (e.g., "Gemini 2.5 Flash Image by Google")
   - **Credits**: The cost in generative credits per generation or per second (e.g., "10 credits per generation" or "720p - 25 credits per second")

## Plugin Structure
```
firefly-models-plugin/
├── manifest.json       # Plugin configuration and metadata
├── index.html          # Plugin UI structure
├── index.js            # Plugin logic and data fetching
├── styles.css          # Plugin styling
└── README.md           # This file
```

## Requirements

- Adobe Photoshop 24.0.0 or later
- Internet connection (to fetch model data)

## Troubleshooting

### Plugin doesn't appear in Photoshop
- Make sure you're using Photoshop 24.0.0 or later
- Try restarting Photoshop after loading the plugin
- Check the UXP Developer Tool for any error messages

### "No models found" message
- Check your internet connection
- Click the Refresh button to try again
- Check the browser console in UXP Developer Tool for error messages

### Plugin panel is blank
- Make sure all files (manifest.json, index.html, index.js, styles.css) are in the same folder
- Check the UXP Developer Tool console for JavaScript errors
- Try unloading and reloading the plugin

### Network permission errors
- The plugin requires access to `helpx.adobe.com` to fetch model data
- This permission is specified in the manifest.json file
- If you get permission errors, ensure the manifest.json file hasn't been modified

## Development

To modify or debug the plugin:

1. Load the plugin using the UXP Developer Tool
2. Make changes to the code files
3. In the UXP Developer Tool, click the reload button (circular arrow) to see your changes
4. Use the `Watch` feature in UXP Developer Tool for automatic reloading on file changes
5. Check the console in UXP Developer Tool for debugging output

## Data Source

This plugin fetches data from:
https://helpx.adobe.com/firefly/web/get-started/learn-the-basics/non-adobe-models-in-adobe-products.html

The plugin parses HTML tables to extract model names and credit costs. If Adobe changes the page structure, the plugin may need to be updated.

**Note**: This plugin is not officially affiliated with Adobe Inc. It simply provides a convenient interface to view publicly available model information from Adobe's documentation.

## License

Project released under a [MIT License](LICENSE.md).

[![License: MIT](https://img.shields.io/badge/License-MIT-orange.svg)](LICENSE.md)