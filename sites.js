const SITES = [
  {
    hosts: ['chat.deepseek.com'],
    selectors: {
      user: '.fbb737a4',
      assistant: '.ds-assistant-message-main-content',
      code: '.md-code-block',
    },
  },

  {
    hosts: ['chatgpt.com', 'chat.openai.com'],
    selectors: {
      user: '[data-message-author-role="user"]',
      assistant: '[data-message-author-role="assistant"]',
      code: 'pre',
    },
  },
];
