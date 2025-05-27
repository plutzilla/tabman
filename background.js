// Background service worker for TabMan extension

// Handle extension installation
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        console.log('TabMan extension installed successfully!');
        
        // Set up default settings or perform initial setup
        chrome.storage.local.set({
            'tabman_settings': {
                'autoGroup': false,
                'closeTabsAfterGroup': false,
                'showTabCount': true,
                'theme': 'light'
            }
        });
    } else if (details.reason === 'update') {
        console.log('TabMan extension updated to version', chrome.runtime.getManifest().version);
    }
});

// Handle messages from popup or content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message.action) {
        case 'getTabs':
            handleGetTabs(sendResponse);
            break;
        case 'getTabGroups':
            handleGetTabGroups(sendResponse);
            break;
        case 'createTabGroup':
            handleCreateTabGroup(message.data, sendResponse);
            break;
        default:
            console.log('Unknown message action:', message.action);
            sendResponse({ error: 'Unknown action' });
    }
    
    // Return true to indicate we'll respond asynchronously
    return true;
});

async function handleGetTabs(sendResponse) {
    try {
        const tabs = await chrome.tabs.query({});
        sendResponse({ success: true, data: tabs });
    } catch (error) {
        console.error('Error getting tabs:', error);
        sendResponse({ success: false, error: error.message });
    }
}

async function handleGetTabGroups(sendResponse) {
    try {
        if (chrome.tabGroups) {
            const groups = await chrome.tabGroups.query({});
            sendResponse({ success: true, data: groups });
        } else {
            sendResponse({ success: true, data: [] });
        }
    } catch (error) {
        console.error('Error getting tab groups:', error);
        sendResponse({ success: false, error: error.message });
    }
}

async function handleCreateTabGroup(data, sendResponse) {
    try {
        const { tabIds, title, color } = data;
        
        // Create the group
        const groupId = await chrome.tabs.group({ tabIds });
        
        // Update group properties
        if (title || color) {
            await chrome.tabGroups.update(groupId, {
                title: title || '',
                color: color || 'grey'
            });
        }
        
        sendResponse({ success: true, data: { groupId } });
    } catch (error) {
        console.error('Error creating tab group:', error);
        sendResponse({ success: false, error: error.message });
    }
}

// Function to open TabMan (shared between icon click and keyboard shortcut)
async function openTabMan() {
    try {
        // Check if TabMan tab already exists
        const tabs = await chrome.tabs.query({ url: chrome.runtime.getURL('popup.html') });
        
        if (tabs.length > 0) {
            // Switch to existing TabMan tab
            await chrome.tabs.update(tabs[0].id, { active: true });
            await chrome.windows.update(tabs[0].windowId, { focused: true });
        } else {
            // Create new TabMan tab
            await chrome.tabs.create({
                url: chrome.runtime.getURL('popup.html'),
                active: true
            });
        }
    } catch (error) {
        console.error('Error opening TabMan tab:', error);
    }
}

// Handle extension icon click - open in new tab
chrome.action.onClicked.addListener(openTabMan);

// Handle keyboard shortcuts
chrome.commands.onCommand.addListener((command) => {
    if (command === 'toggle-tabman') {
        openTabMan();
    }
});

// Handle tab events for potential future features
chrome.tabs.onCreated.addListener((tab) => {
    // Could be used for auto-grouping new tabs
    console.log('New tab created:', tab.id);
});

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
    // Could be used for cleanup or analytics
    console.log('Tab removed:', tabId);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Could be used for monitoring tab changes
    if (changeInfo.status === 'complete') {
        console.log('Tab updated:', tabId, tab.url);
    }
}); 