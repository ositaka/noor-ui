import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://your-domain.com'

  // Component pages
  const components = [
    'button', 'card', 'input', 'textarea', 'select', 'checkbox', 'radio', 'switch',
    'slider', 'range-slider', 'tabs', 'accordion', 'dialog', 'popover', 'tooltip', 'dropdown-menu',
    'context-menu', 'badge', 'avatar', 'separator', 'progress', 'toast', 'alert',
    'form', 'calendar', 'command', 'collapsible', 'label', 'data-table',
    'prayer-times', 'hijri-date', 'arabic-number', 'zakat-calculator'
  ]

  // Documentation pages
  const docs = [
    'installation', 'quick-start', 'configuration', 'rtl', 'arabic',
    'accessibility', 'keyboard-navigation', 'screen-readers', 'color-contrast',
    'theming', 'customization'
  ]

  // Example pages
  const examples = [
    'gcc-dashboard', 'islamic-finance-dashboard', 'datatable-showcase',
    'registration', 'dashboard', 'ecommerce'
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
