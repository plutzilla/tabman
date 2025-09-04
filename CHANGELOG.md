
# TabMan Changelog

## Version 2.3.0 - Auto-Focus Enhancement

### 🎯 New Features

#### **Auto-Focus on Most Recent Tab**

- Automatically highlights the most recently accessed tab when extension opens
- Visual feedback with keyboard selection styling
- Smart positioning across all tab groups (pinned, regular, ungrouped)
- Ready for keyboard navigation - TAB key starts from focused position
- Non-intrusive behavior that respects search and manual navigation

#### **Enhanced User Experience**

- Immediate visual feedback showing which tab was last accessed
- Seamless integration with existing keyboard navigation system
- Improved workflow continuity for power users
- Better visual hierarchy and focus management

### 🔧 Technical Improvements

#### **Smart Tab Selection**

- Accurate tab matching by ID instead of DOM order
- Proper handling of tab groups and pinned tabs
- Consistent styling with keyboard navigation highlight
- Performance optimized scrolling and selection

#### **Navigation Integration**

- Auto-focus sets up keyboard navigation state
- TAB/Shift+TAB starts from the focused tab
- Maintains existing keyboard shortcuts and behaviors
- Respects search filters and navigation modes

### 🎨 Visual Enhancements

#### **Focus Indicators**

- Same visual styling as keyboard selection
- Clear visual feedback for most recent tab
- Consistent highlight across all interface states
- Improved accessibility and user guidance

---

## Version 2.2.1 - Layout Fix

### 🐛 Bug Fixes

#### **Viewport Scrollbar Issue**

- Fixed vertical scrollbar appearing in full-page overlay
- Corrected body height from `min-height: 100vh` to `height: 100vh`
- Added `overflow: hidden` to body to prevent page-level scrolling
- Maintained proper container height calculation `calc(100vh - 32px)`
- Ensured perfect full-page fit without exceeding viewport

#### **Layout Improvements**

- Eliminated unwanted scrollbars while preserving content scrolling
- Better viewport height utilization for overlay interface
- Improved visual consistency across different screen sizes

---

## Version 2.2.0 - Material Icons Redesign

### 🎨 Icon System Overhaul

#### **Material Design Icons**

- Replaced custom icons with authentic Material Icons "tab" character
- Consistent design language following Google's Material Design principles
- Professional, clean aesthetic that matches modern browser interfaces
- Dark orange color scheme (#E65100) for distinctive branding

#### **Complete Icon Set**

- Updated all extension icons (16x16, 32x32, 48x48, 128x128)
- Replaced search bar icon with Material Icons design
- Consistent visual identity across all interface elements
- SVG format for crisp rendering at all sizes

#### **Enhanced Icon Generator**

- Updated `create_icons.html` tool for PNG export
- SVG-to-PNG conversion with transparent backgrounds
- Live preview of both SVG and PNG versions
- Bulk download functionality for all icon sizes

### 🔧 Technical Improvements

#### **Icon Implementation**

- Direct SVG embedding for optimal quality
- Transparent PNG generation for compatibility
- Proper Material Icons viewBox and path data
- Optimized file sizes and rendering performance

#### **UI Consistency**

- Unified color scheme throughout the extension
- Removed redundant search emoji icon
- Cleaner, more professional interface
- Better visual hierarchy and focus

### 🎯 User Experience

#### **Visual Polish**

- More professional and trustworthy appearance
- Better integration with Chrome's interface design
- Improved brand recognition and consistency
- Enhanced accessibility through better contrast

#### **Interface Refinements**

- Simplified search bar design
- Removed visual clutter
- Focus on content over decoration
- Streamlined user interactions

### 🛠️ Developer Tools

#### **Icon Generation Workflow**

- Updated icon generator with Material Design integration
- Transparent PNG export capability
- Easy color scheme modifications
- Future-proof icon management system

---

## Version 2.1.0 - UI Improvements and Enhanced Search

### 🎨 UI/UX Enhancements

#### **Redesigned Header**

- Removed "TabMan" title for cleaner interface
- Integrated tab icon directly into search bar
- More compact and focused design
- Better visual hierarchy

#### **Pinned Tabs Support**

- Special "Pinned" group for pinned tabs
- Always appears at the top of the group list
- Distinctive golden/yellow color scheme
- Automatic grouping of all pinned tabs

#### **Enhanced Search Experience**

- Global search activation - start typing anywhere to search
- No need to click search bar first
- ESC key to clear search and return to all tabs
- Immediate search results as you type
- Smart keyboard handling that respects input fields

### 🔧 Technical Improvements

#### **Search Functionality**

- Global keydown listener for instant search activation
- Improved keyboard event handling
- Better focus management
- Non-intrusive search that respects other inputs

#### **Tab Organization**

- Enhanced tab grouping logic
- Pinned tabs get priority placement
- Improved group ordering: Pinned → Regular Groups → Ungrouped
- Better visual distinction between group types

### 🎯 User Experience

#### **Keyboard Navigation**

- Type anywhere to start searching immediately
- ESC to clear search and remove focus
- Seamless transition between search and browsing
- No interruption of existing keyboard shortcuts

#### **Visual Improvements**

- Tab icon in search bar for better branding
- Pinned tabs clearly identified and prioritized
- Consistent color scheme for different group types
- Enhanced visual feedback for user actions

### 🐛 Bug Fixes

- Improved search input padding for icon placement
- Better handling of special keyboard events
- Enhanced group rendering order consistency

---

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
