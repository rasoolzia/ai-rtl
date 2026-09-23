const STYLE_ID = '__ai_rtl_style__';

const site = SITES.find((item) => item.hosts.includes(location.hostname));

if (!site) {
  console.warn('[AI RTL] Unsupported site:', location.hostname);
} else {
  injectStyle();

  chrome.storage.local.get({ isRTL: true }, ({ isRTL }) => {
    setRTL(isRTL);
  });

  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== 'local' || !changes.isRTL) return;
    setRTL(changes.isRTL.newValue);
  });
}

function setRTL(enabled) {
  document.documentElement.classList.toggle(
    'site-rtl-active',
    Boolean(enabled),
  );
}

function injectStyle() {
  let style = document.getElementById(STYLE_ID);

  if (!style) {
    style = document.createElement('style');
    style.id = STYLE_ID;
    document.head.appendChild(style);
  }

  const { user, assistant, code } = site.selectors;
  const codeSelector = code.join(', ');

  style.textContent = `
    .site-rtl-active ${user},
    .site-rtl-active ${assistant} {
      direction: rtl !important;
      text-align: right !important;
    }

    .site-rtl-active ${user} ${codeSelector},
    .site-rtl-active ${assistant} ${codeSelector} {
      direction: ltr !important;
      text-align: left !important;
    }
  `;
}
