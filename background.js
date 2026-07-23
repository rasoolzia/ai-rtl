function setRTLDirection(isRTL) {
  document.body.classList.toggle('site-rtl-active', isRTL);

  console.log(`✅ RTL mode: ${isRTL ? 'ENABLED' : 'DISABLED'}`);
}

function isTargetURL(url) {
  return url && typeof url === 'string' && url.includes('chat.deepseek.com');
}

const DirectionState = {
  get(callback) {
    chrome.storage.local.get(['isRTL'], (result) => {
      callback(result.isRTL ?? true);
    });
  },

  set(isRTL) {
    chrome.storage.local.set({ isRTL });
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

function applyStoredDirection(tab) {
  if (!isTargetURL(tab.url)) return;

  DirectionState.get((isRTL) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setRTLDirection,
      args: [isRTL],
    });

    updateIcon(isRTL);
  });
}

chrome.action.onClicked.addListener((tab) => {
  if (!isTargetURL(tab.url)) {
    chrome.tabs.update(tab.id, {
      url: 'https://chat.deepseek.com',
    });

    return;
  }

  DirectionState.get((current) => {
    const next = !current;

    DirectionState.set(next);

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setRTLDirection,
      args: [next],
    });

    updateIcon(next);

    chrome.action.setBadgeText({
      text: next ? 'RTL' : 'LTR',
      tabId: tab.id,
    });

    setTimeout(() => {
      chrome.action.setBadgeText({
        text: '',
        tabId: tab.id,
      });
    }, 2000);
  });
});

chrome.tabs.onActivated.addListener(({ tabId }) => {
  chrome.tabs.get(tabId, applyStoredDirection);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    applyStoredDirection(tab);
  }
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace !== 'local' || !changes.isRTL) return;

  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    ([tab]) => {
      if (tab) {
        applyStoredDirection(tab);
      }
    },
  );
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(['isRTL'], ({ isRTL }) => {
    if (isRTL === undefined) {
      chrome.storage.local.set({
        isRTL: true,
      });
    }
  });
});
