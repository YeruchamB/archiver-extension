# Wayback Machine URL Archiver Chrome Extension

A simple Chrome extension that allows you to quickly archive any webpage using the Internet Archive's Wayback Machine.

## Features

- One-click archiving of the current tab's URL
- Automatically checks if the URL is already archived in the Wayback Machine
- If archived, opens the archived version directly
- If not archived, displays a message that no archived version was found
- No approval prompts or delays - instant archiving

## Installation

1. **Download the Repository**:
   - Go to [https://github.com/YeruchamB/archiver-extension](https://github.com/YeruchamB/archiver-extension)
   - Click the green "Code" button
   - Select "Download ZIP"
   - Extract the ZIP file to your desired location

2. **Load Extension in Chrome**:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in the top right)
   - Click "Load unpacked"
   - Select the extracted `archiver-extension` folder

3. **Test the Extension**:
   - Navigate to any webpage you want to archive
   - Click the extension icon in your Chrome toolbar
   - Click "Archive URL"
   - The extension will check the Wayback Machine and open the appropriate page

## How It Works

The extension:
1. Gets the URL of the currently active tab
2. When you click "Archive URL", it checks the Wayback Machine API at `https://archive.org/wayback/available?url=<YOUR_URL>`
3. If the URL is already archived, it opens the archived version directly
4. If the URL is not archived, it displays a message that no archived version was found
5. The popup stays open to show the result

## Files

- `manifest.json` - Extension configuration
- `popup.html` - Extension popup interface
- `wayback-archiver.js` - Extension functionality (Wayback Machine integration)
- `icon16.png`, `icon48.png`, `icon128.png` - Extension icons
- `README.md` - This file

## Permissions

The extension requires:
- `activeTab` - To get the current tab's URL
- `tabs` - To open new tabs
- `https://archive.org/*` - To check Wayback Machine availability
- `https://web.archive.org/*` - To access archived pages and save pages

## Troubleshooting

If the extension doesn't work:
1. Make sure all icon files are present (icon16.png, icon48.png, icon128.png)
2. Check the Chrome extension page for any error messages
3. Try reloading the extension
4. Make sure you're on a regular webpage (not chrome:// pages)

## Development

To modify the extension:
1. Edit the files as needed
2. Go to `chrome://extensions/`
3. Click the refresh icon on your extension to reload it
4. Test the changes
