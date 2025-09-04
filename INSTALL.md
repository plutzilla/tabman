# TabMan Installation Guide

## Quick Installation (Developer Mode)

1. **Download the Extension**
   - Clone this repository or download as ZIP
   - Extract to a folder on your computer

2. **Enable Developer Mode in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Toggle on "Developer mode" in the top-right corner

3. **Load the Extension**
   - Click "Load unpacked" button
   - Select the `tabman` folder (the one containing `manifest.json`)
   - The extension should now appear in your extensions list

4. **Pin the Extension (Optional)**
   - Click the puzzle piece icon in Chrome's toolbar
   - Find "TabMan - Tab Manager" and click the pin icon
   - The extension icon will now appear in your toolbar

## Creating PNG Icons (Optional)

If you want to convert the SVG icons to PNG format for better compatibility:

### Method 1: Using the Icon Generator (Recommended)

1. Open `icons/create_icons.html` in your web browser
2. The page will generate preview icons automatically
3. Click the download buttons to save PNG files
4. Replace the SVG references in `manifest.json` with PNG references:

```json
"icons": {
  "16": "icons/icon16.png",
  "32": "icons/icon32.png",
  "48": "icons/icon48.png",
  "128": "icons/icon128.png"
}
```

### Method 2: Using Browser Console

1. Open Chrome Developer Tools (F12)
2. Go to the Console tab
3. Copy and paste the code from `create_icons.js`
4. Run the code and copy the generated data URLs
5. Save them as PNG files

### Method 3: Using Command Line Tools

If you have `rsvg-convert` or `inkscape` installed:

```bash
# Using rsvg-convert
rsvg-convert -w 16 -h 16 icons/icon16.svg > icons/icon16.png
rsvg-convert -w 32 -h 32 icons/icon32.svg > icons/icon32.png
rsvg-convert -w 48 -h 48 icons/icon48.svg > icons/icon48.png
rsvg-convert -w 128 -h 128 icons/icon128.svg > icons/icon128.png

# Using Inkscape
inkscape -w 16 -h 16 icons/icon16.svg -o icons/icon16.png
inkscape -w 32 -h 32 icons/icon32.svg -o icons/icon32.png
inkscape -w 48 -h 48 icons/icon48.svg -o icons/icon48.png
inkscape -w 128 -h 128 icons/icon128.svg -o icons/icon128.png
```

## Testing the Extension

1. **Open the Extension**
   - Click the TabMan icon in your Chrome toolbar
   - The popup should appear with your current tabs

2. **Test Features**
   - Search for tabs using the search box
   - Click on tabs to switch to them
   - Try the "Close Duplicates" button
   - Try the "Group by Domain" button
   - Hover over tabs to see the close button

3. **Verify Functionality**
   - Open multiple tabs from the same domain
   - Use "Group by Domain" to see automatic grouping
   - Try searching for specific tab titles or URLs
   - Test closing tabs from the extension

## Troubleshooting

### Extension Not Loading

- Make sure you selected the correct folder (containing `manifest.json`)
- Check that Developer Mode is enabled
- Look for error messages in the extensions page

### Icons Not Showing

- The extension works fine with SVG icons
- If you need PNG icons, follow the icon generation steps above
- The extension functionality is not affected by missing icons

### Permissions Errors

- Make sure the extension has the required permissions:
  - `tabs`: Access to tab information
  - `tabGroups`: Access to tab groups (Chrome 88+)

### Features Not Working

- **Tab Groups**: Requires Chrome 88 or later
- **Search**: Should work immediately
- **Tab Switching**: Requires `tabs` permission
- **Domain Grouping**: Requires both `tabs` and `tabGroups` permissions

## Browser Compatibility

- **Chrome**: 88+ (recommended for full features)
- **Chrome**: 76+ (basic features, no tab groups)
- **Edge**: Latest versions based on Chromium
- **Brave**: Latest versions
- **Other Chromium browsers**: Should work with recent versions

## Development Mode Limitations

When running in developer mode:

- Chrome may show warnings about the extension
- You'll need to reload the extension after making changes
- The extension won't auto-update

## Publishing to Chrome Web Store

To publish this extension:

1. Create PNG icons using the methods above
2. Update manifest.json to use PNG icons
3. Test thoroughly across different Chrome versions
4. Create a developer account at https://chrome.google.com/webstore/devconsole
5. Package and upload the extension
6. Fill out the store listing details
7. Submit for review

## Security Notes

This extension:

- Only requests minimal necessary permissions
- Does not collect or transmit any user data
- Runs locally in your browser
- Source code is fully visible and auditable

## Getting Help

If you encounter issues:

1. Check the browser console for error messages
2. Try disabling and re-enabling the extension
3. Reload the extension from the extensions page
4. Check that you're using a compatible Chrome version
5. Report issues in the repository if available
