const STYLE_ID = '__ai_rtl_style__';

const site = SITES.find((site) => site.hosts.includes(location.hostname));

if (!site) {
  console.warn('Unsupported site');
} else {
  injectStyle();

  chrome.storage.local.get('isRTL', ({ isRTL = true }) => {
    document.body.classList.toggle('site-rtl-active', isRTL);
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'local') return;
    if (!changes.isRTL) return;

    document.body.classList.toggle('site-rtl-active', changes.isRTL.newValue);
  });
}

function injectStyle() {
  let style = document.getElementById(STYLE_ID);

  if (!style) {
    style = document.createElement('style');
    style.id = STYLE_ID;
    document.head.appendChild(style);
  }

  style.textContent = `
.site-rtl-active ${site.selectors.user},
.site-rtl-active ${site.selectors.assistant}{
  direction: rtl !important;
  text-align: right !important;
}

.site-rtl-active ${site.selectors.assistant} ${site.selectors.code}{
  direction: ltr !important;
  text-align: left !important;
}
`;
}
