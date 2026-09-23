importScripts('sites.js');

const DEFAULT_RTL = true;

const DEFAULT_ICON = {
  16: 'icons/icon_default16.png',
  48: 'icons/icon_default48.png',
  128: 'icons/icon_default128.png',
};

const DirectionState = {
  get(callback) {
    chrome.storage.local.get({ isRTL: DEFAULT_RTL }, ({ isRTL }) => {
      callback(Boolean(isRTL));
    });
  },

  set(value) {
    chrome.storage.local.set({ isRTL: Boolean(value) });
  },
};

function getSite(hostname) {
  return SITES.find((site) => site.hosts.includes(hostname));
}

function getIcon(isRTL) {
  const suffix = isRTL ? 'rtl' : 'ltr';

  return {
    16: `icons/icon_${suffix}16.png`,
    48: `icons/icon_${suffix}48.png`,
    128: `icons/icon_${suffix}128.png`,
  };
}

function updateTabIcon(tabId, hostname, isRTL) {
  if (!getSite(hostname)) {
    chrome.action.setIcon({
      tabId,
      path: DEFAULT_ICON,
    });

    chrome.action.setBadgeText({
      tabId,
      text: '',
    });

    return;
  }

  chrome.action.setIcon({
    tabId,
    path: getIcon(isRTL),
  });

  chrome.action.setBadgeText({
    tabId,
    text: isRTL ? '✓' : '',
  });
}

function updateActiveTab(tabId, url) {
  if (!url) return;

  let hostname;

  try {
    hostname = new URL(url).hostname;
  } catch {
    return;
  }

  DirectionState.get((isRTL) => {
    updateTabIcon(tabId, hostname, isRTL);
  });
}

chrome.action.onClicked.addListener(() => {
  DirectionState.get((current) => {
    const next = !current;

    DirectionState.set(next);

    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      const tab = tabs[0];

      if (!tab?.id || !tab.url) return;

      updateActiveTab(tab.id, tab.url);
    });
  });
});

chrome.tabs.onActivated.addListener(({ tabId }) => {
  chrome.tabs.get(tabId, (tab) => {
    if (chrome.runtime.lastError) return;

    updateActiveTab(tabId, tab.url);
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url || changeInfo.status === 'complete') {
    updateActiveTab(tabId, tab.url);
  }
});

chrome.runtime.onInstalled.addListener(() => {
  DirectionState.get((isRTL) => {
    DirectionState.set(isRTL);
  });
});

chrome.runtime.onStartup.addListener(() => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    const tab = tabs[0];

    if (!tab?.id || !tab.url) return;

    updateActiveTab(tab.id, tab.url);
  });
});
