class TabManager {
    constructor() {
        this.tabs = [];
        this.tabGroups = new Map();
        this.filteredTabs = [];
        this.searchTerm = '';
        this.init();
    }

        async init() {
        this.setupEventListeners();
        this.setupThemeDetection();
        await this.loadTabs();
        this.renderTabs();
    }
    
    setupThemeDetection() {
        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Apply initial theme
        this.applySystemTheme(mediaQuery.matches);
        
        // Listen for theme changes
        mediaQuery.addEventListener('change', (e) => {
            this.applySystemTheme(e.matches);
        });
    }
    
    applySystemTheme(isDark) {
        const root = document.documentElement;
        
        if (isDark) {
            // Dark theme - neutral colors that work with any Chrome theme
            root.style.setProperty('--chrome-color-bg', '#1f1f1f');
            root.style.setProperty('--chrome-color-text', '#e8eaed');
            root.style.setProperty('--chrome-color-surface', '#2d2e30');
            root.style.setProperty('--chrome-color-surface-variant', '#3c4043');
            root.style.setProperty('--chrome-color-border', '#5f6368');
            root.style.setProperty('--chrome-color-text-secondary', '#9aa0a6');
            root.style.setProperty('--chrome-color-primary', '#2d2e30'); // Neutral dark header
            root.style.setProperty('--chrome-color-on-primary', '#e8eaed');
            root.style.setProperty('--chrome-color-primary-container', '#1e3a5f');
            root.style.setProperty('--chrome-color-primary-alpha', 'rgba(138, 180, 248, 0.25)');
            root.style.setProperty('--chrome-color-shadow', 'rgba(0, 0, 0, 0.3)');
        } else {
            // Light theme - neutral colors that adapt to any Chrome theme
            root.style.setProperty('--chrome-color-bg', '#f5f5f5');
            root.style.setProperty('--chrome-color-text', '#202124');
            root.style.setProperty('--chrome-color-surface', '#ffffff');
            root.style.setProperty('--chrome-color-surface-variant', '#f8f9fa');
            root.style.setProperty('--chrome-color-border', '#dadce0');
            root.style.setProperty('--chrome-color-text-secondary', '#5f6368');
            root.style.setProperty('--chrome-color-primary', '#f8f9fa'); // Neutral light header
            root.style.setProperty('--chrome-color-on-primary', '#202124');
            root.style.setProperty('--chrome-color-primary-container', '#e8f0fe');
            root.style.setProperty('--chrome-color-primary-alpha', 'rgba(26, 115, 232, 0.15)');
            root.style.setProperty('--chrome-color-shadow', 'rgba(0, 0, 0, 0.1)');
        }
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => {
            this.searchTerm = e.target.value.toLowerCase();
            this.filterTabs();
            this.renderTabs();
        });

        // Auto-refresh when window/tab comes into focus
        window.addEventListener('focus', async () => {
            await this.refreshTabs();
        });

        // Also refresh when page becomes visible (handles tab switching)
        document.addEventListener('visibilitychange', async () => {
            if (!document.hidden) {
                await this.refreshTabs();
            }
        });

        // Action buttons
        document.getElementById('closeAllDuplicates').addEventListener('click', () => {
            this.closeAllDuplicates();
        });

        document.getElementById('groupByDomain').addEventListener('click', () => {
            this.groupByDomain();
        });
    }

    async loadTabs() {
        try {
            // Get all tabs
            this.tabs = await chrome.tabs.query({});
            


            // Sort tabs by recently accessed (most recent first)
            this.tabs.sort((a, b) => {
                // Put active tab first
                if (a.active && !b.active) return -1;
                if (!a.active && b.active) return 1;
                
                // Then sort by lastAccessed time (most recent first)
                return (b.lastAccessed || 0) - (a.lastAccessed || 0);
            });
            
            // Get tab groups
            if (chrome.tabGroups) {
                const groups = await chrome.tabGroups.query({});
                this.tabGroups.clear();
                groups.forEach(group => {
                    this.tabGroups.set(group.id, group);
                });
            }

            this.filterTabs();
            this.updateTabCount();
        } catch (error) {
            console.error('Error loading tabs:', error);
            this.showError('Failed to load tabs');
        }
    }

    async refreshTabs() {
        try {
            // Clear current data to force fresh load
            this.tabs = [];
            this.tabGroups.clear();
            this.filteredTabs = [];

            // Force reload tab data with fresh timestamps
            await this.loadTabs();
            
            // Ensure filtering is applied
            this.filterTabs();
            
            // Re-render with fresh data
            this.renderTabs();

        } catch (error) {
            console.error('Error refreshing tabs:', error);
            this.showError('Failed to refresh tabs');
        }
    }

    filterTabs() {
        if (!this.searchTerm) {
            this.filteredTabs = [...this.tabs];
        } else {
            this.filteredTabs = this.tabs.filter(tab => 
                tab.title.toLowerCase().includes(this.searchTerm) ||
                tab.url.toLowerCase().includes(this.searchTerm)
            );
        }
    }

    updateTabCount() {
        const count = this.filteredTabs.length;
        const totalCount = this.tabs.length;
        const countElement = document.getElementById('tabCount');
        
        if (this.searchTerm) {
            countElement.textContent = `${count} of ${totalCount} tabs`;
        } else {
            countElement.textContent = `${totalCount} tab${totalCount !== 1 ? 's' : ''}`;
        }
    }

    renderTabs() {
        const container = document.getElementById('tabsContainer');
        
        if (this.filteredTabs.length === 0) {
            container.innerHTML = this.searchTerm 
                ? '<div class="no-tabs"><h3>No matching tabs</h3><p>Try a different search term</p></div>'
                : '<div class="no-tabs"><h3>No tabs found</h3><p>This should not happen!</p></div>';
            return;
        }

        // Group tabs by their tab groups
        const groupedTabs = this.groupTabs(this.filteredTabs);
        
        container.innerHTML = '';
        
        // Render each group
        Object.entries(groupedTabs).forEach(([groupId, tabs]) => {
            const groupElement = this.createGroupElement(groupId, tabs);
            container.appendChild(groupElement);
        });

        this.updateTabCount();
    }

    groupTabs(tabs) {
        const grouped = {};
        
        tabs.forEach(tab => {
            const groupId = tab.groupId || 'ungrouped';
            if (!grouped[groupId]) {
                grouped[groupId] = [];
            }
            grouped[groupId].push(tab);
        });

        return grouped;
    }

    createGroupElement(groupId, tabs) {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'tab-group';

        // Create group header for both grouped and ungrouped tabs
        const header = document.createElement('div');
        header.className = 'group-header';
        
        const colorSpan = document.createElement('span');
        colorSpan.className = 'group-color';
        
        const title = document.createElement('span');
        
        if (groupId !== 'ungrouped' && this.tabGroups.has(parseInt(groupId))) {
            // Real tab group
            const group = this.tabGroups.get(parseInt(groupId));
            colorSpan.style.backgroundColor = this.getGroupColor(group.color);
            title.textContent = group.title || 'Unnamed Group';
        } else {
            // Ungrouped tabs
            colorSpan.style.backgroundColor = '#9AA0A6';
            title.textContent = 'Ungrouped';
            header.classList.add('ungrouped-header');
        }
        
        const count = document.createElement('span');
        count.className = 'group-count';
        count.textContent = `${tabs.length} tab${tabs.length !== 1 ? 's' : ''}`;
        
        header.appendChild(colorSpan);
        header.appendChild(title);
        header.appendChild(count);
        
        // Add action buttons for real tab groups (not ungrouped)
        if (groupId !== 'ungrouped' && this.tabGroups.has(parseInt(groupId))) {
            const groupActions = document.createElement('div');
            groupActions.className = 'group-actions';
            
            const ungroupBtn = document.createElement('button');
            ungroupBtn.className = 'group-action ungroup';
            ungroupBtn.innerHTML = '↗';
            ungroupBtn.title = 'Ungroup tabs';
            ungroupBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.ungroupTabs(parseInt(groupId));
            });
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'group-action delete';
            deleteBtn.innerHTML = '✕';
            deleteBtn.title = 'Delete group (close all tabs)';
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.deleteGroup(parseInt(groupId));
            });
            
            groupActions.appendChild(ungroupBtn);
            groupActions.appendChild(deleteBtn);
            header.appendChild(groupActions);
        }
        
        groupDiv.appendChild(header);

        // Create grid container for tabs
        const tabsGrid = document.createElement('div');
        tabsGrid.className = 'tabs-grid';

        // Create tab elements
        tabs.forEach(tab => {
            const tabElement = this.createTabElement(tab);
            tabsGrid.appendChild(tabElement);
        });

        groupDiv.appendChild(tabsGrid);
        return groupDiv;
    }

    createTabElement(tab) {
        const tabDiv = document.createElement('div');
        tabDiv.className = 'tab-item';
        if (tab.active) {
            tabDiv.classList.add('active');
        }

        // Favicon
        const favicon = document.createElement('img');
        favicon.className = 'tab-favicon';
        favicon.src = tab.favIconUrl || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTggMTVDMTEuODY2IDE1IDE1IDExLjg2NiAxNSA4QzE1IDQuMTM0IDExLjg2NiAxIDggMUM0LjEzNCAxIDEgNC4xMzQgMSA4QzEgMTEuODY2IDQuMTM0IDE1IDggMTVaIiBzdHJva2U9IiM2QzcwRDMiIHN0cm9rZS13aWR0aD0iMS41Ii8+Cjwvc3ZnPgo=';
        favicon.onerror = () => {
            favicon.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTggMTVDMTEuODY2IDE1IDE1IDExLjg2NiAxNSA4QzE1IDQuMTM0IDExLjg2NiAxIDggMUM0LjEzNCAxIDEgNC4xMzQgMSA4QzEgMTEuODY2IDQuMTM0IDE1IDggMTVaIiBzdHJva2U9IiM2QzcwRDMiIHN0cm9rZS13aWR0aD0iMS41Ii8+Cjwvc3ZnPgo=';
        };

        // Tab info
        const tabInfo = document.createElement('div');
        tabInfo.className = 'tab-info';

        const title = document.createElement('div');
        title.className = 'tab-title';
        title.textContent = tab.title || 'Untitled';
        
        const url = document.createElement('div');
        url.className = 'tab-url';
        url.textContent = this.formatUrl(tab.url);

        // Add last accessed time for non-active tabs
        const timeInfo = document.createElement('div');
        timeInfo.className = 'tab-time';
        if (!tab.active && tab.lastAccessed) {
            timeInfo.textContent = this.formatTimeAgo(tab.lastAccessed);
        }

        // Highlight search terms
        if (this.searchTerm) {
            title.innerHTML = this.highlightText(title.textContent, this.searchTerm);
            url.innerHTML = this.highlightText(url.textContent, this.searchTerm);
        }

        tabInfo.appendChild(title);
        tabInfo.appendChild(url);
        if (timeInfo.textContent) {
            tabInfo.appendChild(timeInfo);
        }

        // Tab actions
        const actions = document.createElement('div');
        actions.className = 'tab-actions';

        const closeBtn = document.createElement('button');
        closeBtn.className = 'tab-action close';
        closeBtn.innerHTML = '✕';
        closeBtn.title = 'Close tab';
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.closeTab(tab.id);
        });

        actions.appendChild(closeBtn);

        // Assembly
        tabDiv.appendChild(favicon);
        tabDiv.appendChild(tabInfo);
        tabDiv.appendChild(actions);

        // Click to switch to tab
        tabDiv.addEventListener('click', () => {
            this.switchToTab(tab.id);
        });

        return tabDiv;
    }

    highlightText(text, searchTerm) {
        if (!searchTerm) return text;
        
        const regex = new RegExp(`(${this.escapeRegex(searchTerm)})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    }

    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    formatUrl(url) {
        try {
            const urlObj = new URL(url);
            return urlObj.hostname + urlObj.pathname;
        } catch {
            return url;
        }
    }

    formatTimeAgo(timestamp) {
        const now = Date.now();
        const diffMs = now - timestamp;
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));



        if (diffMinutes < 1) {
            return 'Just now';
        } else if (diffMinutes < 60) {
            return `${diffMinutes}m ago`;
        } else if (diffHours < 24) {
            return `${diffHours}h ago`;
        } else if (diffDays < 7) {
            return `${diffDays}d ago`;
        } else {
            return '1w+ ago';
        }
    }

    getGroupColor(color) {
        const colorMap = {
            'grey': '#9AA0A6',
            'blue': '#1A73E8',
            'red': '#D93025',
            'yellow': '#FBC02D',
            'green': '#137333',
            'pink': '#C2185B',
            'purple': '#9C27B0',
            'cyan': '#00ACC1',
            'orange': '#F57C00'
        };
        return colorMap[color] || '#9AA0A6';
    }

    async switchToTab(tabId) {
        try {
            await chrome.tabs.update(tabId, { active: true });
            const tab = await chrome.tabs.get(tabId);
            await chrome.windows.update(tab.windowId, { focused: true });
            // Don't close the TabMan tab - keep it open for continued use
        } catch (error) {
            console.error('Error switching to tab:', error);
        }
    }

    async closeTab(tabId) {
        try {
            await chrome.tabs.remove(tabId);
            // Refresh to get updated timestamps and re-sort
            await this.refreshTabs();
        } catch (error) {
            console.error('Error closing tab:', error);
        }
    }

    async closeAllDuplicates() {
        const urlMap = new Map();
        const duplicates = [];

        this.tabs.forEach(tab => {
            if (urlMap.has(tab.url)) {
                duplicates.push(tab.id);
            } else {
                urlMap.set(tab.url, tab.id);
            }
        });

        if (duplicates.length > 0) {
            try {
                await chrome.tabs.remove(duplicates);
                await this.refreshTabs();
            } catch (error) {
                console.error('Error closing duplicate tabs:', error);
            }
        }
    }

    async groupByDomain() {
        try {
            // Get all tabs that aren't already grouped
            const ungroupedTabs = this.tabs.filter(tab => tab.groupId === -1);
            
            // Group by domain
            const domainGroups = new Map();
            ungroupedTabs.forEach(tab => {
                try {
                    const domain = new URL(tab.url).hostname;
                    if (!domainGroups.has(domain)) {
                        domainGroups.set(domain, []);
                    }
                    domainGroups.get(domain).push(tab.id);
                } catch {
                    // Skip invalid URLs
                }
            });

            // Create groups for domains with multiple tabs
            for (const [domain, tabIds] of domainGroups) {
                if (tabIds.length > 1) {
                    const groupId = await chrome.tabs.group({ tabIds });
                    await chrome.tabGroups.update(groupId, {
                        title: domain,
                        color: this.getRandomColor()
                    });
                }
            }

            await this.refreshTabs();
        } catch (error) {
            console.error('Error grouping by domain:', error);
        }
    }

    async ungroupTabs(groupId) {
        try {
            // Get all tabs in this group
            const groupTabs = this.tabs.filter(tab => tab.groupId === groupId);
            const tabIds = groupTabs.map(tab => tab.id);
            
            // Ungroup the tabs (removes them from the group)
            await chrome.tabs.ungroup(tabIds);
            await this.refreshTabs();
        } catch (error) {
            console.error('Error ungrouping tabs:', error);
        }
    }

    async deleteGroup(groupId) {
        try {
            // Get all tabs in this group
            const groupTabs = this.tabs.filter(tab => tab.groupId === groupId);
            const tabIds = groupTabs.map(tab => tab.id);
            
            // Close all tabs in the group
            await chrome.tabs.remove(tabIds);
            await this.refreshTabs();
        } catch (error) {
            console.error('Error deleting group:', error);
        }
    }

    getRandomColor() {
        const colors = ['blue', 'red', 'yellow', 'green', 'pink', 'purple', 'cyan', 'orange'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    showError(message) {
        const container = document.getElementById('tabsContainer');
        container.innerHTML = `<div class="no-tabs"><h3>Error</h3><p>${message}</p></div>`;
    }
}

// Initialize the tab manager when the popup loads
document.addEventListener('DOMContentLoaded', () => {
    new TabManager();
}); 