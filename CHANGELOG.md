# TabMan Changelog

## Version 2.0.0 - Full-Page Overlay with Screenshots

### 🎉 Major New Features

#### **Full-Page Overlay Interface**
- Replaced popup with immersive full-screen overlay
- Dark gradient theme with glassmorphism effects
- Responsive grid layout for tab cards
- Smooth animations and hover effects

#### **Tab Screenshots**
- Real-time tab screenshot capture using Chrome API
- Visual previews for all accessible tabs
- Graceful fallback to favicons for protected tabs
- High-quality PNG format with optimized compression

#### **Keyboard Shortcuts**
- `Ctrl+Shift+K` (Windows/Linux) to toggle overlay
- `Cmd+Shift+K` (Mac) to toggle overlay
- `Escape` key to close overlay
- Extension icon click also toggles overlay

#### **Enhanced UI/UX**
- Card-based design with 16:12 aspect ratio
- Hover animations with lift and glow effects
- Better visual hierarchy with group headers
- Improved search with better highlighting
- Status indicators and loading states

### 🔧 Technical Improvements

#### **Architecture Changes**
- Content script injection system
- Iframe-based overlay for security isolation
- Message passing between components
- Background script keyboard shortcut handling

#### **New Permissions**
- `activeTab`: For capturing tab screenshots
- `scripting`: For content script injection
- Enhanced error handling for permission issues

#### **File Structure**
- `content.js`: Overlay injection and management
- `overlay.html`: Full-page interface structure
- `overlay.js`: Screenshot capture and grid logic
- `overlay.css`: Dark theme and animations
- Updated `background.js` with shortcut handling

### 🎨 Design Updates

#### **Visual Theme**
- Dark gradient background with blur effects
- High contrast white text on dark surfaces
- Blue accent color (#667eea to #764ba2 gradient)
- Glassmorphism borders and transparency

#### **Layout Improvements**
- Responsive grid with auto-fill columns
- 300px minimum card width
- Proper spacing and padding
- Optimized for various screen sizes

### 📱 User Experience

#### **Interaction Model**
- Click to switch tabs instantly
- Hover to reveal close buttons
- Keyboard navigation support
- Visual feedback for all actions

#### **Performance**
- Optimized screenshot capture process
- Efficient tab switching during capture
- Memory management for large tab counts
- Smooth 60fps animations

### 🔄 Legacy Support

#### **Backward Compatibility**
- Original popup files maintained
- Can be enabled by changing manifest
- All original features preserved
- Graceful degradation for older Chrome versions

#### **Migration Path**
- Automatic upgrade from v1.0.0
- No data loss or configuration changes
- Existing permissions expanded automatically

### 🐛 Bug Fixes
- Fixed tab group color mapping
- Improved error handling for inaccessible tabs
- Better URL formatting and display
- Enhanced search highlighting accuracy

### ⚡ Performance Optimizations
- Reduced memory usage during screenshot capture
- Faster overlay initialization
- Optimized DOM manipulation
- Reduced extension bundle size

### 🔮 Future Enhancements
- Tab preview on hover
- Drag and drop tab reordering
- Custom screenshot quality settings
- Keyboard navigation between tabs
- Export/import tab sessions

---

## Version 1.0.0 - Initial Release

### Features
- Basic popup interface
- Tab listing and management
- Search functionality
- Tab groups support
- Domain grouping
- Duplicate tab detection

### Technical
- Manifest V3 compatibility
- Chrome tabs and tabGroups APIs
- Basic UI with gradient styling
- Extension icon and branding 