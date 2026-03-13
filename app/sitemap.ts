import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://noorui.com'

  // Component pages (all directories under app/(docs)/components/)
  const components = [
    // Basic Components
    'accordion', 'alert', 'avatar', 'badge', 'blockquote', 'breadcrumb',
    'button', 'button-arrow', 'card', 'checkbox', 'input', 'kbd', 'label',
    'select', 'separator', 'slider', 'switch', 'textarea',
    // Form Components
    'calendar', 'date-picker', 'file-upload', 'form', 'number-input',
    'radio-group', 'range-slider', 'rich-text-editor', 'time-picker',
    // Data Display
    'chart', 'collapsible', 'data-table', 'empty-state', 'feature-card', 'listing-card',
    'pagination', 'stats-card', 'table', 'tabs',
    // Overlay & Popups
    'command', 'context-menu', 'dialog', 'dropdown-menu', 'popover',
    'sheet', 'toast', 'tooltip',
    // Content
    'callout', 'content-renderer', 'pull-quote',
    // Advanced Components
    'dashboard-shell', 'notification-center', 'progress', 'reaction-picker',
    'carousel', 'skeleton', 'stepper', 'timeline', 'user-badge', 'user-menu',
    // GCC-Specific
    'arabic-number', 'hijri-date', 'prayer-times', 'zakat-calculator',
    // Experimental (AI/LLM)
    'chat-message', 'conversation-history', 'message-actions', 'model-selector',
    'parameter-slider', 'prompt-input', 'thinking-indicator', 'token-counter',
    'workflow-canvas', 'workflow-node',
  ]

  // Documentation pages (all directories under app/(docs)/documentation/)
  const docs = [
    'installation', 'quick-start', 'configuration', 'props', 'examples',
    'rtl', 'bidi', 'arabic',
    'wcag', 'keyboard', 'screen-readers',
  ]

  // Example pages (all directories under app/examples/)
  const examples = [
    'gcc-dashboard', 'islamic-finance-dashboard', 'calendar', 'datatable-showcase',
    'registration', 'dashboard', 'ecommerce', 'cms',
    'marketplace', 'b2b-marketplace', 'portfolio', 'real-estate', 'healthcare', 'education',
    'blog-dashboard', 'workflow-basic', 'accessible-inputs',
    'ai-chat-simple', 'ai-playground', 'ai-code-assistant', 'ai-document-qa',
    'ai-multi-agent', 'ai-workflow', 'ai-agent-evals',
  ]

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/components`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...components.map((component) => ({
      url: `${baseUrl}/components/${component}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    {
      url: `${baseUrl}/documentation`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...docs.map((doc) => ({
      url: `${baseUrl}/documentation/${doc}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    {
      url: `${baseUrl}/examples`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...examples.map((example) => ({
      url: `${baseUrl}/examples/${example}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    {
      url: `${baseUrl}/starters`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/getting-started`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/rtl-guide`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/roadmap`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/license`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/utilities`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/tokens`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/themes`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
}
