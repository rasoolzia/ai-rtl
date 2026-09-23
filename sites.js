const SITES = [
  {
    hosts: ['chat.deepseek.com'],
    selectors: {
      user: '.fbb737a4',
      assistant: '.ds-assistant-message-main-content',
      code: ['.md-code-block', 'pre'],
    },
  },

  {
    hosts: ['chatgpt.com'],
    selectors: {
      user: '[data-message-author-role="user"]',
      assistant: '[data-message-author-role="assistant"]',
      code: ['pre'],
    },
  },

  {
    hosts: ['grok.com'],
    selectors: {
      user: '[data-testid="user-message"]',
      assistant: '[data-testid="assistant-message"]',
      code: ['pre'],
    },
  },

  {
    hosts: ['claude.ai'],
    selectors: {
      user: '[data-testid="user-message"]',
      assistant: '[data-testid="assistant-message"]',
      code: ['pre'],
    },
  },

  {
    hosts: ['gemini.google.com'],
    selectors: {
      user: 'user-query',
      assistant: 'model-response',
      code: ['pre'],
    },
  },

  {
    hosts: ['www.perplexity.ai', 'perplexity.ai'],
    selectors: {
      user: '.group\\/user-bubble',
      assistant: '[data-workflow-final-text] .prose',
      code: ['pre'],
    },
  },
];
