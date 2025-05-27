# TabMan - Chrome Extension

A powerful Chrome extension with a full-page overlay interface featuring tab screenshots, keyboard shortcuts, and advanced tab management.

## 🚀 Features

- **📱 Full-Window Interface**: Opens in a new tab using your entire browser window
- **🕒 Smart Sorting**: Recently accessed tabs appear first for quick access
- **📱 Responsive Grid Layout**: Modern card-based design that adapts to your window size
- **🔍 Advanced Search**: Real-time search with highlighting across titles and URLs
- **👥 Tab Groups**: Full support for Chrome's tab groups with visual organization
- **🚀 Quick Navigation**: Click any tab to switch instantly (TabMan stays open)
- **❌ Tab Management**: Close tabs with hover actions and bulk operations
- **🔄 Duplicate Detection**: Find and close duplicate tabs with one click
- **🌐 Domain Grouping**: Automatically organize tabs by website domain
- **⏰ Time Indicators**: See when tabs were last accessed
- **🎨 Modern Design**: Clean gradient design with smooth animations

## 📸 Screenshots

The extension features a modern, intuitive interface with:
- Clean tab listing with favicons and titles
- Search functionality with highlighting
- Visual tab grouping with colors
- Hover effects and smooth animations

## 🛠 Installation

### From Source (Developer Mode)

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the project folder
5. The TabMan extension should now appear in your extensions

### From Chrome Web Store

*Coming soon - extension will be published to the Chrome Web Store*

## 🎯 Usage

### Opening TabMan
- **Extension Icon**: Click the TabMan icon in your Chrome toolbar
- **Opens in New Tab**: TabMan opens in a dedicated browser tab
- **Reuse**: Click the icon again to return to existing TabMan tab

### Navigation & Search
- **Search**: Type in the search box to filter tabs by title or URL in real-time
- **Browse**: Scroll through the responsive grid of tab cards
- **Switch Tabs**: Click on any tab card to navigate to it (TabMan stays open)
- **Recent First**: Tabs are automatically sorted by recent activity

### Tab Management
- **Close Individual Tabs**: Hover over a tab card and click the red × button
- **Close Duplicates**: Click "Close Duplicates" to remove tabs with identical URLs
- **Group by Domain**: Click "Group by Domain" to organize tabs by website
- **Refresh**: Click "Refresh" to update the tab list and capture new screenshots

## 🏗 Project Structure

```
tabman/
├── manifest.json          # Extension configuration 
├── background.js         # Service worker for tab management
├── popup.html            # Main interface HTML
├── popup.js              # Main JavaScript logic with sorting
├── styles.css            # Responsive grid styling
├── icons/                # Extension icons (SVG format)
├── README.md            # This file
├── INSTALL.md           # Installation guide
├── CHANGELOG.md         # Version history
└── test_extension.md    # Testing checklist
```

## 🔧 Technical Details

### Permissions Required

- `tabs`: To access and manage browser tabs
- `tabGroups`: To work with Chrome's tab grouping feature  
- `storage`: To store user preferences

### Chrome APIs Used

- `chrome.tabs`: For tab management, navigation, and sorting
- `chrome.tabGroups`: For tab group functionality
- `chrome.runtime`: For background script communication
- `chrome.storage`: For storing user preferences

### Browser Compatibility

- **Chrome**: Version 88+ (for tab groups support)
- **Chromium-based browsers**: Edge, Brave, etc. with tab groups support

## 🎨 Features in Detail

### Tab Grouping
- Displays existing tab groups with their colors and titles
- Shows ungrouped tabs separately
- Maintains group organization in the interface

### Search & Filter
- Real-time search as you type
- Searches both tab titles and URLs
- Highlights matching text in results
- Shows filtered count vs total tabs

### Tab Actions
- **Switch**: Click any tab to navigate to it
- **Close**: Individual tab closure with confirmation
- **Bulk Actions**: Close all duplicates at once
- **Auto-Group**: Group tabs by domain automatically

### UI/UX Features
- **Responsive Design**: Works well in the extension popup
- **Smooth Animations**: Hover effects and transitions
- **Visual Feedback**: Active tab highlighting
- **Loading States**: Proper loading indicators
- **Error Handling**: Graceful error messages

## 🚧 Development

### Local Development

1. Make changes to the source files
2. Go to `chrome://extensions/`
3. Click the refresh button on the TabMan extension
4. Test your changes in the popup

### Building for Production

The extension is ready to use as-is. For distribution:

1. Ensure all files are included
2. Create extension icons (16x16, 32x32, 48x48, 128x128)
3. Test thoroughly across different Chrome versions
4. Package for Chrome Web Store submission

## 📋 TODO / Future Features

- [ ] Keyboard shortcuts for quick access
- [ ] Tab session saving and restoration
- [ ] Custom tab sorting options
- [ ] Export/import tab lists
- [ ] Tab preview on hover
- [ ] Dark/light theme toggle
- [ ] Tab group creation from extension
- [ ] Tab history and recently closed tabs
- [ ] Performance metrics and analytics
- [ ] Integration with bookmarks

## 🐛 Known Issues

- Icons may need to be created for full functionality
- Some advanced grouping features require Chrome 88+
- Extension popup size is fixed (may need responsive improvements)

## 📄 License

This project is open source. Feel free to use, modify, and distribute as needed.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you encounter any issues or have suggestions, please create an issue in the repository.

---

**TabMan** - Making tab management simple and efficient! 🚀 