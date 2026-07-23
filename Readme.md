# Make AIs RTL

A Chrome extension that adds Right-to-Left (RTL) support to AI chatbot websites that don't natively support it.

![Extension Icon](icons/icon_rtl128.png)

## 📖 Description

This extension allows you to toggle RTL (Right-to-Left) text direction on AI chatbot platforms, making them more accessible for users who read right-to-left languages like Arabic, Persian, Hebrew, and Urdu.

## ✨ Features

- **One-click toggle** - Click the extension icon to switch between RTL and LTR modes
- **Persistent settings** - Remembers your preference across browsing sessions
- **Selective styling** - Applies RTL to user and assistant messages while keeping code blocks LTR
- **Visual feedback** - Icon changes to indicate current mode (RTL/LTR)
- **Lightweight** - Minimal performance impact

## 🚀 Supported Sites

| Site                                       | Status       |
| ------------------------------------------ | ------------ |
| [ChatGPT](https://chatgpt.com)             | ✅ Supported |
| [DeepSeek Chat](https://chat.deepseek.com) | ✅ Supported |

## 📥 Installation

### From Chrome Web Store (Recommended)

_(Coming soon)_

### Manual Installation (Developer Mode)

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked"
5. Select the extension folder
6. The extension icon will appear in your toolbar

## 🎯 How to Use

1. Navigate to a supported AI chat site (ChatGPT or DeepSeek)
2. Click the extension icon in your toolbar
3. The interface will switch to RTL mode
4. Click again to switch back to LTR mode

The extension will remember your preference for future visits.

## 🛠️ Technical Details

### Architecture

- **Manifest V3** - Modern Chrome extension platform
- **Service Worker** - Background script for state management
- **Content Script** - Injects RTL styles into supported sites
- **Storage API** - Persists user preferences

### File Structure

```
├── background.js      # Service worker - handles icon and state
├── content.js         # Content script - applies RTL styles
├── sites.js          # Site configuration and selectors
├── manifest.json     # Extension manifest
└── icons/            # Extension icons
    ├── icon_rtl16.png
    ├── icon_rtl48.png
    ├── icon_rtl128.png
    ├── icon_ltr16.png
    ├── icon_ltr48.png
    └── icon_ltr128.png
```

## 🔧 Configuration

### Adding New Sites

To add support for additional AI chatbots, edit `sites.js`:

```javascript
const SITES = [
  // ... existing sites ...
  {
    hosts: ['example.com', 'chat.example.com'],
    selectors: {
      user: '.user-message-selector',
      assistant: '.assistant-message-selector',
      code: '.code-block-selector',
    },
  },
];
```

Then update `host_permissions` in `manifest.json`:

```json
"host_permissions": [
  "https://example.com/*",
  "https://chat.example.com/*"
]
```

And add to `content_scripts.matches`:

```json
"matches": [
  "https://example.com/*",
  "https://chat.example.com/*"
]
```

## 🎨 Customization

The extension applies RTL styling with the following CSS rules:

```css
.site-rtl-active .user-message,
.site-rtl-active .assistant-message {
  direction: rtl !important;
  text-align: right !important;
}

.site-rtl-active .assistant-message .code-block {
  direction: ltr !important;
  text-align: left !important;
}
```

This ensures:

- Messages are right-aligned
- Text flows right-to-left
- Code blocks maintain LTR formatting

## 🐛 Troubleshooting

### Extension not working on a supported site

- Refresh the page after toggling
- Check if the site's DOM structure has changed
- Verify the extension has permission for the site

### Icon not updating

- Click the extension icon to force a state toggle
- Restart the browser

### Site not displaying correctly

- Try toggling RTL off and on again
- Report the issue with site details and screenshot

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Add new sites** - Submit PRs with new site configurations
2. **Fix bugs** - Report or fix issues with existing sites
3. **Improve styling** - Better RTL support for complex layouts
4. **Documentation** - Improve this README

### Development Setup

1. Clone the repository
2. Make your changes
3. Load the extension in Chrome (Developer Mode)
4. Test thoroughly
5. Submit a pull request

## 📝 License

MIT License - feel free to use, modify, and distribute.

## 💬 Feedback

Found a bug or have a suggestion? [Open an issue](https://github.com/yourusername/make-ais-rtl/issues) or submit a pull request.

## 🙏 Acknowledgments

- Inspired by the need for better RTL support in AI tools
- Built with accessibility in mind

---

**Enjoy using AI chatbots in your preferred reading direction!** 🌍
