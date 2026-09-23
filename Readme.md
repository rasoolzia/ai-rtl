# Make AIs RTL

A lightweight Chrome extension that adds **Right-to-Left (RTL) support** to AI chat interfaces for Persian and other RTL languages.

Make AIs RTL lets you switch supported AI chat platforms between RTL and LTR with one click, while keeping code blocks in their natural **left-to-right (LTR)** direction.

## ✨ Features

- **One-click RTL/LTR toggle** - Switch between RTL and LTR instantly.
- **RTL support** - Makes AI conversations easier to read in Persian, Arabic, Hebrew, Urdu, and other RTL languages.
- **Code stays LTR** - Code blocks remain left-to-right even when the surrounding conversation is RTL.
- **Persistent preference** - Your RTL/LTR preference is stored locally and restored automatically.
- **Lightweight** - No external libraries, servers, analytics, or tracking.
- **Privacy-focused** - Conversation content and personal information are never sent to the extension developer or an external server.

## 🌐 Supported AI Platforms

| Platform                                   | Status       |
| ------------------------------------------ | ------------ |
| [ChatGPT](https://chatgpt.com)             | ✅ Supported |
| [DeepSeek Chat](https://chat.deepseek.com) | ✅ Supported |

More AI platforms may be supported in the future.

## 📥 Installation

### Chrome Web Store

**Coming soon.**

### Manual Installation

Until the extension is available on the Chrome Web Store, you can install it manually:

1. Clone or download this repository.
2. Open `chrome://extensions/` in Chrome.
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the extension directory.

The extension will appear in your Chrome toolbar.

## 🎯 How to Use

1. Open a supported AI chat platform.
2. Click the **Make AIs RTL** extension icon.
3. The supported conversation content will switch to RTL.
4. Click the icon again to switch back to LTR.

Your selected direction is saved locally and will be restored when you use the extension again.

### RTL and LTR behavior

When RTL mode is enabled:

- User messages use RTL direction.
- Assistant messages use RTL direction.
- Text is right-aligned.
- Code blocks remain LTR and left-aligned.

For example:

```text
RTL conversation text

function calculateTotal(items) {
  return items.reduce((total, item) => total + item.price, 0);
}
```

The surrounding conversation can use RTL while the code remains in its natural LTR direction.

## 🔒 Privacy

Make AIs RTL runs locally in your browser.

The extension:

- Does not collect conversation content.
- Does not send prompts or AI responses to any server.
- Does not collect account information.
- Does not use analytics or tracking.
- Does not use advertising services.
- Does not use external APIs or servers.
- Stores only the user's RTL/LTR preference locally using Chrome's Storage API.

For more information, see the [Privacy Policy](https://github.com/rasoolzia/ai-rtl/blob/main/Privacy.md).

## 🛠️ Technical Details

Make AIs RTL uses Chrome's Manifest V3 extension platform.

### Architecture

- **Manifest V3** - Chrome extension platform.
- **Service Worker** - Manages the user's RTL/LTR preference and extension icon.
- **Content Script** - Applies RTL/LTR styles to supported AI chat pages.
- **Storage API** - Stores the user's direction preference locally.
- **Site Configuration** - Keeps platform-specific selectors in a separate configuration file.

### Project Structure

```text
├── icons/
│   ├── icon_default16.png
│   ├── icon_default48.png
│   ├── icon_default128.png
│   ├── icon_ltr16.png
│   ├── icon_ltr48.png
│   ├── icon_ltr128.png
│   ├── icon_rtl16.png
│   ├── icon_rtl48.png
│   └── icon_rtl128.png
├── background.js
├── content.js
├── sites.js
├── manifest.json
├── Privacy.md
└── README.md
```

## 🔧 Adding a New AI Platform

Supported platforms are configured in `sites.js`.

Add a new site configuration:

```js
{
  hosts: ['example.com'],
  selectors: {
    user: '.user-message-selector',
    assistant: '.assistant-message-selector',
    code: '.code-block-selector',
  },
}
```

Then add the corresponding domain to both `host_permissions` and `content_scripts.matches` in `manifest.json`.

After making the changes, test the platform thoroughly before submitting a change.

## 🤝 Contributing

Contributions are welcome.

You can contribute by:

- Adding support for new AI platforms.
- Fixing selectors when a platform changes its UI.
- Improving RTL behavior.
- Reporting bugs.
- Improving documentation.

Before submitting a pull request, test the extension on the affected platform and make sure existing supported platforms still work correctly.

## 🐛 Reporting Issues

If the extension does not work correctly on a supported platform, please [open an issue](https://github.com/rasoolzia/ai-rtl/issues).

When reporting a problem, include:

- The affected platform.
- A description of the issue.
- A screenshot when possible.
- Whether RTL or LTR mode was enabled.

Please do not include private conversations, personal information, API keys, or other sensitive data in issue reports.

## 📄 License

This project is licensed under the MIT License.

See the [LICENSE](https://github.com/rasoolzia/ai-rtl/blob/main/LICENSE) file for details.

---

Built to make AI tools a little more comfortable for RTL users. 🌍
