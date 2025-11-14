'use client'

import Link from 'next/link';
import { content } from '@/lib/i18n';
import { useDirection } from '@/components/providers/direction-provider';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';

export default function SitemapPage() {
  const { locale } = useDirection();
  const t = content[locale];

  // Component lists organized by category
  const componentsByCategory = {
    basic: [
      'alert', 'avatar', 'badge', 'breadcrumb', 'button', 'card',
      'checkbox', 'input', 'label', 'select', 'separator', 'slider',
      'switch', 'textarea'
    ],
    forms: [
      'calendar', 'date-picker', 'file-upload', 'form', 'number-input',
      'radio-group', 'rich-text-editor', 'time-picker'
    ],
    data: [
      'accordion', 'collapsible', 'data-table', 'empty-state',
      'feature-card', 'listing-card', 'pagination', 'stats-card',
      'table', 'tabs'
    ],
    overlay: [
      'command', 'context-menu', 'dialog', 'dropdown-menu',
      'popover', 'sheet', 'toast', 'tooltip'
    ],
    advanced: [
      'dashboard-shell', 'notification-center', 'progress',
      'skeleton', 'stepper', 'user-menu'
    ],
    gcc: [
      'arabic-number', 'hijri-date', 'prayer-times', 'zakat-calculator'
    ],
    experimental: [
      'chat-message', 'conversation-history', 'message-actions',
      'model-selector', 'parameter-slider', 'prompt-input',
      'thinking-indicator', 'token-counter', 'workflow-canvas',
      'workflow-node'
    ],
  };

  const examples = [
    { slug: 'login', name: 'Login Form' },
    { slug: 'registration', name: 'Registration Form' },
    { slug: 'dashboard', name: 'Dashboard' },
    { slug: 'analytics', name: 'Analytics Dashboard' },
    { slug: 'workflow-basic', name: 'Workflow Builder' },
    { slug: 'chat', name: 'Chat Interface' },
    { slug: 'ecommerce', name: 'E-commerce Product Grid' },
    { slug: 'portfolio', name: 'Portfolio Gallery' },
    { slug: 'real-estate', name: 'Real Estate Listings' },
  ];

  const resources = [
    { href: '/getting-started', name: 'Getting Started' },
    { href: '/documentation', name: 'Documentation' },
    { href: '/rtl-guide', name: 'RTL Development Guide' },
    { href: '/roadmap', name: 'Roadmap' },
  ];

  const themesAndDesign = [
    { href: '/themes', name: 'Themes' },
    { href: '/tokens', name: 'Design Tokens' },
  ];

  // Helper to format component slug to title
  const formatComponentName = (slug: string) => {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-foreground transition-colors">
              {t.sitemap.breadcrumb.home}
            </Link>
          </li>
          <li>/</li>
          <li className="text-foreground font-medium">
            {t.sitemap.breadcrumb.sitemap}
          </li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">
          {t.sitemap.title}
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          {t.sitemap.description}
        </p>

        {/* Stats */}
        <div className="flex flex-wrap gap-4 mt-6">
          <div className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium">
            {t.sitemap.counts.totalComponents}
          </div>
          <div className="px-4 py-2 bg-secondary/10 text-secondary rounded-lg font-medium">
            {t.sitemap.counts.totalExamples}
          </div>
          <div className="px-4 py-2 bg-accent/10 text-accent-foreground rounded-lg font-medium">
            {t.sitemap.counts.totalPages}
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      {/* Main Sections Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

        {/* Getting Started */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">
            {t.sitemap.sections.gettingStarted}
          </h2>
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className="text-primary hover:underline"
              >
                Home
              </Link>
            </li>
            {resources.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-primary hover:underline"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </Card>

        {/* Examples */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">
            {t.sitemap.sections.examples}
          </h2>
          <ul className="space-y-2">
            <li>
              <Link
                href="/examples"
                className="text-primary hover:underline font-medium"
              >
                All Examples →
              </Link>
            </li>
            {examples.map((example) => (
              <li key={example.slug}>
                <Link
                  href={`/examples/${example.slug}`}
                  className="text-primary hover:underline"
                >
                  {example.name}
                </Link>
              </li>
            ))}
          </ul>
        </Card>

        {/* Themes & Design */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">
            {t.sitemap.sections.themes}
          </h2>
          <ul className="space-y-2">
            {themesAndDesign.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-primary hover:underline"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Separator className="my-12" />

      {/* Components Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-6">
          {t.sitemap.sections.components}
        </h2>
        <p className="text-muted-foreground mb-8">
          All 64 components organized by category. Each component includes live examples,
          full documentation, accessibility guidelines, and bilingual support.
        </p>
      </div>

      {/* Component Categories */}
      <div className="grid gap-8 md:grid-cols-2">

        {/* Basic Components */}
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4 text-primary">
            {t.sitemap.componentCategories.basic}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {componentsByCategory.basic.map((slug) => (
              <Link
                key={slug}
                href={`/components/${slug}`}
                className="text-sm text-primary hover:underline"
              >
                {formatComponentName(slug)}
              </Link>
            ))}
          </div>
        </Card>

        {/* Form Components */}
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4 text-primary">
            {t.sitemap.componentCategories.forms}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {componentsByCategory.forms.map((slug) => (
              <Link
                key={slug}
                href={`/components/${slug}`}
                className="text-sm text-primary hover:underline"
              >
                {formatComponentName(slug)}
              </Link>
            ))}
          </div>
        </Card>

        {/* Data Display */}
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4 text-primary">
            {t.sitemap.componentCategories.data}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {componentsByCategory.data.map((slug) => (
              <Link
                key={slug}
                href={`/components/${slug}`}
                className="text-sm text-primary hover:underline"
              >
                {formatComponentName(slug)}
              </Link>
            ))}
          </div>
        </Card>

        {/* Overlay & Popups */}
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4 text-primary">
            {t.sitemap.componentCategories.overlay}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {componentsByCategory.overlay.map((slug) => (
              <Link
                key={slug}
                href={`/components/${slug}`}
                className="text-sm text-primary hover:underline"
              >
                {formatComponentName(slug)}
              </Link>
            ))}
          </div>
        </Card>

        {/* Advanced Components */}
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4 text-primary">
            {t.sitemap.componentCategories.advanced}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {componentsByCategory.advanced.map((slug) => (
              <Link
                key={slug}
                href={`/components/${slug}`}
                className="text-sm text-primary hover:underline"
              >
                {formatComponentName(slug)}
              </Link>
            ))}
          </div>
        </Card>

        {/* GCC-Specific Components */}
        <Card className="p-6 border-2 border-primary/20">
          <h3 className="text-xl font-bold mb-4 text-primary">
            {t.sitemap.componentCategories.gcc}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {componentsByCategory.gcc.map((slug) => (
              <Link
                key={slug}
                href={`/components/${slug}`}
                className="text-sm text-primary hover:underline"
              >
                {formatComponentName(slug)}
              </Link>
            ))}
          </div>
        </Card>

        {/* Experimental (AI/LLM) */}
        <Card className="p-6 md:col-span-2 border-2 border-secondary/20">
          <h3 className="text-xl font-bold mb-4 text-secondary">
            {t.sitemap.componentCategories.experimental}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            10 experimental components designed for AI/LLM interfaces, chat applications,
            and workflow builders.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {componentsByCategory.experimental.map((slug) => (
              <Link
                key={slug}
                href={`/components/${slug}`}
                className="text-sm text-primary hover:underline"
              >
                {formatComponentName(slug)}
              </Link>
            ))}
          </div>
        </Card>
      </div>

      {/* Footer CTA */}
      <div className="mt-12 p-8 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg text-center">
        <h3 className="text-2xl font-bold mb-2">
          {t.common.readyToGo}
        </h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          {t.common.autoRTL}
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/getting-started"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Get Started
          </Link>
          <Link
            href="/components/button"
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Browse Components
          </Link>
        </div>
      </div>
    </div>
  );
}
