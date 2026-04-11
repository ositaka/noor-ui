import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://noorui.com'

  // Component pages — all 70 components
  const components = [
    // Core
    'accordion', 'alert', 'avatar', 'badge', 'blockquote', 'breadcrumb',
    'button', 'button-arrow', 'card', 'checkbox', 'input', 'kbd', 'label',
    'select', 'separator', 'slider', 'switch', 'textarea',
    // Forms
    'calendar', 'date-picker', 'file-upload', 'form', 'number-input',
    'radio-group', 'range-slider', 'rich-text-editor', 'time-picker',
    // Data Display
    'chart', 'collapsible', 'command', 'content-renderer', 'data-table',
    'empty-state', 'feature-card', 'listing-card', 'pagination', 'pull-quote',
    'stats-card', 'table', 'tabs',
    // Overlays & Feedback
    'callout', 'context-menu', 'dialog', 'dropdown-menu', 'popover',
    'progress', 'sheet', 'skeleton', 'toast', 'tooltip',
    // User Interface
    'carousel', 'dashboard-shell', 'notification-center', 'reaction-picker',
    'stepper', 'timeline', 'user-badge', 'user-menu',
    // Regional & Islamic
    'arabic-number', 'hijri-date', 'prayer-times', 'zakat-calculator',
    // AI/LLM
    'chat-message', 'conversation-history', 'message-actions', 'model-selector',
    'parameter-slider', 'prompt-input', 'thinking-indicator', 'token-counter',
  ]

  // Example app pages
  const examples = [
    'healthcare', 'hotel', 'banking', 'education',
    'islamic-finance-dashboard', 'calendar', 'registration',
    'marketplace', 'portfolio', 'real-estate', 'government',
    'ai-playground',
  ]

  return [
    // Homepage
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    // Getting Started
    {
      url: `${baseUrl}/getting-started`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    // Components index
    {
      url: `${baseUrl}/components`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // All component pages
    ...components.map((component) => ({
      url: `${baseUrl}/components/${component}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    // Documentation hub
    {
      url: `${baseUrl}/documentation`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Examples index
    {
      url: `${baseUrl}/examples`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // All example pages
    ...examples.map((example) => ({
      url: `${baseUrl}/examples/${example}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    // Email Templates
    {
      url: `${baseUrl}/email-templates`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Guides & Reference
    {
      url: `${baseUrl}/rtl-guide`,
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
    {
      url: `${baseUrl}/tokens`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/utilities`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
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
  ]
}
