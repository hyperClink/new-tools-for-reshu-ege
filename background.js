
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo) => { var tab = await chrome.tabs.get(tabId);	if (tab.active && changeInfo.url) {
  const tab = await chrome.tabs.get(info.tabId);
    
    const isGithub = tab.url.startsWith('https://math-ege');
    isGithub 
      ? chrome.action.enable(tab.tabId) 
      : chrome.action.disable(tab.tabId);
} });