# TabMan Extension Test Guide

## Quick Test Checklist

After installing the extension, follow these steps to verify everything works:

### ✅ Installation Test
- [ ] Extension appears in `chrome://extensions/`
- [ ] No error messages shown
- [ ] Extension icon appears in toolbar (if pinned)

### ✅ Overlay Activation
- [ ] Ctrl+Shift+K (Cmd+Shift+K on Mac) opens the full-page overlay
- [ ] Clicking extension icon opens the overlay
- [ ] Overlay appears as a dark-themed full-screen interface
- [ ] Escape key closes the overlay
- [ ] Keyboard shortcut toggles overlay open/closed

### ✅ Tab Screenshots
- [ ] Tab cards show visual screenshots (may take a moment to capture)
- [ ] Screenshots are clear and properly scaled
- [ ] Fallback favicons appear for tabs that can't be captured
- [ ] Active tab is highlighted with a blue border

### ✅ Grid Layout
- [ ] Tabs are displayed in a responsive grid
- [ ] Cards have proper aspect ratio (16:12)
- [ ] Hover effects work (cards lift up and glow)
- [ ] Close buttons appear on hover

### ✅ Search Feature
- [ ] Type in search box filters tabs in real-time
- [ ] Search works for both tab titles and URLs
- [ ] Search results highlight matching text
- [ ] Clear search shows all tabs again

### ✅ Tab Navigation
- [ ] Clicking on a tab switches to that tab
- [ ] Active tab is highlighted differently
- [ ] Popup closes after switching tabs

### ✅ Tab Management
- [ ] Hover over tab shows close button (×)
- [ ] Clicking close button closes the tab
- [ ] Closed tabs disappear from list immediately
- [ ] Tab count updates after closing tabs

### ✅ Advanced Features
- [ ] "Refresh" button reloads the tab list
- [ ] "Close Duplicates" removes duplicate URLs (if any exist)
- [ ] "Group by Domain" creates tab groups (Chrome 88+ only)

### ✅ Tab Groups (Chrome 88+)
- [ ] Existing tab groups are displayed with colors
- [ ] Group headers show group name and tab count
- [ ] Ungrouped tabs are shown separately
- [ ] "Group by Domain" creates new groups correctly

### ✅ Error Handling
- [ ] Extension handles tabs without favicons gracefully
- [ ] Extension works with various URL types (http, https, chrome://, etc.)
- [ ] No console errors in browser developer tools

## Sample Test Scenarios

### Scenario 1: Basic Tab Management
1. Open 5-10 tabs in different websites
2. Open TabMan extension
3. Verify all tabs are listed
4. Search for a specific website
5. Click on a search result to switch to that tab
6. Close a tab from the extension
7. Verify the tab list updates

### Scenario 2: Domain Grouping
1. Open multiple tabs from the same domains (e.g., 3 YouTube tabs, 2 GitHub tabs)
2. Open TabMan extension
3. Click "Group by Domain"
4. Verify tabs are grouped by domain
5. Check that group headers show domain names

### Scenario 3: Duplicate Management
1. Open the same URL in multiple tabs
2. Open TabMan extension
3. Click "Close Duplicates"
4. Verify only one instance of each URL remains

### Scenario 4: Search Functionality
1. Open tabs with various titles
2. Open TabMan extension
3. Search for partial text from tab titles
4. Search for partial URLs
5. Verify highlighting works correctly
6. Clear search to show all tabs

## Performance Test

### Large Number of Tabs
1. Open 50+ tabs (you can use a script or open many bookmarks)
2. Open TabMan extension
3. Verify:
   - Extension loads quickly
   - Scrolling is smooth
   - Search is responsive
   - No memory issues or crashes

## Browser Compatibility Test

If testing on different browsers:
- [ ] Chrome (latest version)
- [ ] Chrome (version 88-100 for tab groups)
- [ ] Edge (Chromium-based)
- [ ] Brave Browser
- [ ] Other Chromium browsers

## Common Issues to Watch For

### Icons
- Missing or broken extension icon
- Broken favicons in tab list
- Solution: Icons are optional for functionality

### Permissions
- "Cannot read properties of undefined" errors
- Extension not showing tabs
- Solution: Check extension permissions

### Tab Groups
- "chrome.tabGroups is not defined" errors
- Grouping features not working
- Solution: Requires Chrome 88+, graceful degradation

### Search
- Search not filtering results
- Highlighting not working
- Solution: Check JavaScript console for errors

## Reporting Issues

If you find any issues during testing:

1. **Check Browser Console**
   - Open Developer Tools (F12)
   - Look for error messages in Console tab
   - Note any red error messages

2. **Record Details**
   - Chrome version
   - Operating system
   - Steps to reproduce the issue
   - Expected vs actual behavior

3. **Test in Incognito Mode**
   - Sometimes other extensions interfere
   - Test if issue persists in incognito

4. **Try Fresh Installation**
   - Remove and reinstall extension
   - Test with minimal tabs open

## Success Criteria

The extension passes testing if:
- ✅ All basic functionality works
- ✅ No JavaScript console errors
- ✅ Extension handles edge cases gracefully
- ✅ Performance is acceptable with many tabs
- ✅ UI is responsive and intuitive
- ✅ Search and filtering work correctly
- ✅ Tab management features work as expected

Remember: Tab groups are only available in Chrome 88+ and some features may degrade gracefully in older versions. 