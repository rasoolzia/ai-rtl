const DirectionState = {
  get(callback) {
    chrome.storage.local.get('isRTL', ({ isRTL = true }) => {
      callback(isRTL);
    });
  },

  set(value) {
    chrome.storage.local.set({ isRTL: value });
  },
};

function updateIcon(isRTL) {
  chrome.action.setIcon({
    path: isRTL
      ? {
          16: 'icons/icon_rtl16.png',
          48: 'icons/icon_rtl48.png',
          128: 'icons/icon_rtl128.png',
        }
      : {
          16: 'icons/icon_ltr16.png',
          48: 'icons/icon_ltr48.png',
          128: 'icons/icon_ltr128.png',
        },
  });
}

chrome.action.onClicked.addListener(() => {
  DirectionState.get((current) => {
    const next = !current;

    DirectionState.set(next);

    updateIcon(next);
  });
});

chrome.tabs.onActivated.addListener(() => {
  DirectionState.get(updateIcon);
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get('isRTL', ({ isRTL }) => {
    if (isRTL === undefined) {
      chrome.storage.local.set({ isRTL: true });
    }
  });
});
