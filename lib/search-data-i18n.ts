import { content } from './i18n'
import type { Locale } from './i18n/types'

export interface SearchItem {
  title: string
  description: string
  href: string
  category: 'Component' | 'Documentation' | 'Token' | 'Theme' | 'Example'
  keywords?: string[]
}

/**
 * Get search data with translations for the given locale
 */
export function getSearchData(locale: Locale): SearchItem[] {
  const t = content[locale]
  const isArabic = locale === 'ar'

  return [
    // Documentation Pages
    {
      title: isArabic ? 'البدء' : 'Getting Started',
      description: isArabic ? 'دليل التثبيت والإعداد لـ Noor UI' : 'Installation and setup guide for Noor UI',
      href: '/getting-started',
      category: 'Documentation',
      keywords: isArabic ? ['تثبيت', 'إعداد', 'تكوين', 'بداية', 'نور'] : ['install', 'setup', 'configuration', 'start', 'noor'],
    },
    {
      title: isArabic ? 'التثبيت' : 'Installation',
      description: isArabic ? 'قم بتثبيت Noor UI في مشروعك' : 'Install Noor UI in your project',
      href: '/documentation/installation',
      category: 'Documentation',
      keywords: isArabic ? ['npm', 'yarn', 'pnpm', 'تثبيت', 'نور'] : ['npm', 'yarn', 'pnpm', 'install', 'noor'],
    },
    {
      title: isArabic ? 'البداية السريعة' : 'Quick Start',
      description: isArabic ? 'ابنِ أول مكون في دقائق' : 'Build your first component in minutes',
      href: '/documentation/quick-start',
      category: 'Documentation',
      keywords: isArabic ? ['سريع', 'بداية', 'تعليمي', 'دليل'] : ['quick', 'start', 'tutorial', 'guide'],
    },
    {
      title: isArabic ? 'التكوين' : 'Configuration',
      description: isArabic ? 'قم بتكوين Tailwind والموفرات' : 'Configure Tailwind and providers',
      href: '/documentation/configuration',
      category: 'Documentation',
      keywords: isArabic ? ['تكوين', 'tailwind', 'موفرات', 'إعداد'] : ['config', 'tailwind', 'providers', 'setup'],
    },
    {
      title: isArabic ? 'توثيق الخصائص' : 'Props Documentation',
      description: isArabic ? 'خصائص المكونات ومرجع API' : 'Component props and API reference',
      href: '/documentation/props',
      category: 'Documentation',
      keywords: isArabic ? ['خصائص', 'api', 'مرجع', 'واجهة'] : ['props', 'api', 'reference', 'interface'],
    },
    {
      title: isArabic ? 'أمثلة' : 'Examples',
      description: isArabic ? 'أمثلة استخدام حقيقية' : 'Real-world usage examples',
      href: '/documentation/examples',
      category: 'Documentation',
      keywords: isArabic ? ['أمثلة', 'أنماط', 'استخدام'] : ['examples', 'patterns', 'usage'],
    },
    {
      title: isArabic ? 'إرشادات RTL' : 'RTL Guidelines',
      description: isArabic ? 'أفضل ممارسات التطوير بنهج RTL أولاً' : 'RTL-first development best practices',
      href: '/documentation/rtl',
      category: 'Documentation',
      keywords: isArabic ? ['rtl', 'من اليمين لليسار', 'عربي', 'عبري', 'منطقي'] : ['rtl', 'right-to-left', 'arabic', 'hebrew', 'logical'],
    },
    {
      title: isArabic ? 'النص ثنائي الاتجاه' : 'Bidirectional Text',
      description: isArabic ? 'التعامل مع المحتوى متعدد الاتجاهات' : 'Handling mixed-direction content',
      href: '/documentation/bidi',
      category: 'Documentation',
      keywords: isArabic ? ['ثنائي الاتجاه', 'مختلط', 'اتجاه'] : ['bidi', 'bidirectional', 'mixed', 'direction'],
    },
    {
      title: isArabic ? 'الطباعة العربية' : 'Arabic Typography',
      description: isArabic ? 'إرشادات الخطوط العربية وعرض النصوص' : 'Arabic font and text rendering guidelines',
      href: '/documentation/arabic',
      category: 'Documentation',
      keywords: isArabic ? ['عربي', 'طباعة', 'خطوط', 'نص'] : ['arabic', 'typography', 'fonts', 'text'],
    },
    {
      title: isArabic ? 'التوافق مع WCAG' : 'WCAG Compliance',
      description: isArabic ? 'معايير إمكانية الوصول للويب' : 'Web accessibility standards',
      href: '/documentation/wcag',
      category: 'Documentation',
      keywords: isArabic ? ['إمكانية الوصول', 'wcag', 'a11y', 'توافق'] : ['accessibility', 'wcag', 'a11y', 'compliance'],
    },
    {
      title: isArabic ? 'التنقل بلوحة المفاتيح' : 'Keyboard Navigation',
      description: isArabic ? 'دليل إمكانية الوصول بلوحة المفاتيح' : 'Keyboard accessibility guide',
      href: '/documentation/keyboard',
      category: 'Documentation',
      keywords: isArabic ? ['لوحة المفاتيح', 'تنقل', 'اختصارات', 'إمكانية الوصول'] : ['keyboard', 'navigation', 'shortcuts', 'accessibility'],
    },
    {
      title: isArabic ? 'قارئات الشاشة' : 'Screen Readers',
      description: isArabic ? 'تحسين قارئ الشاشة' : 'Screen reader optimization',
      href: '/documentation/screen-readers',
      category: 'Documentation',
      keywords: isArabic ? ['قارئ الشاشة', 'nvda', 'jaws', 'voiceover', 'aria'] : ['screen reader', 'nvda', 'jaws', 'voiceover', 'aria'],
    },
    {
      title: isArabic ? 'دليل RTL' : 'RTL Guide',
      description: isArabic ? 'دليل شامل لتطوير RTL' : 'Comprehensive RTL development guide',
      href: '/rtl-guide',
      category: 'Documentation',
      keywords: isArabic ? ['rtl', 'دليل', 'تعليمي'] : ['rtl', 'guide', 'tutorial'],
    },
    {
      title: isArabic ? 'خارطة الطريق' : 'Roadmap',
      description: isArabic ? 'خارطة التطوير والخطط المستقبلية' : 'Development roadmap and future plans',
      href: '/roadmap',
      category: 'Documentation',
      keywords: isArabic ? ['خارطة الطريق', 'خطط', 'مستقبل', 'مراحل', 'جدول زمني'] : ['roadmap', 'plans', 'future', 'phases', 'timeline'],
    },

    // Use componentNames for component titles
    {
      title: t.componentNames['button'],
      description: isArabic ? 'مكون زر تفاعلي بأشكال متنوعة' : 'Interactive button component with variants',
      href: '/components/button',
      category: 'Component',
      keywords: isArabic ? ['زر', 'نقر', 'إجراء', 'دعوة'] : ['button', 'click', 'action', 'cta'],
    },
    {
      title: t.componentNames['card'],
      description: isArabic ? 'حاوية لتجميع المحتوى' : 'Container for grouping content',
      href: '/components/card',
      category: 'Component',
      keywords: isArabic ? ['بطاقة', 'حاوية', 'صندوق'] : ['card', 'container', 'box'],
    },
    {
      title: t.componentNames['feature-card'],
      description: isArabic ? 'بطاقة عرض الميزات مع أيقونة وعنوان ووصف' : 'Feature showcase card with icon, title, and description',
      href: '/components/feature-card',
      category: 'Component',
      keywords: isArabic ? ['ميزة', 'بطاقة', 'عرض', 'أيقونة', 'صفحة هبوط', 'تسويق'] : ['feature', 'card', 'showcase', 'icon', 'landing', 'marketing'],
    },

    // Design Tokens & Themes
    {
      title: isArabic ? 'رموز التصميم' : 'Design Tokens',
      description: isArabic ? 'رموز ومتغيرات نظام التصميم' : 'Design system tokens and variables',
      href: '/tokens',
      category: 'Token',
      keywords: isArabic ? ['رموز', 'ألوان', 'مسافات', 'طباعة', 'متغيرات'] : ['tokens', 'colors', 'spacing', 'typography', 'variables'],
    },
    {
      title: isArabic ? 'السمات' : 'Themes',
      description: isArabic ? 'خيارات السمات المتاحة' : 'Available theme options',
      href: '/themes',
      category: 'Theme',
      keywords: isArabic ? ['سمات', 'داكن', 'فاتح', 'بسيط', 'مستقبلي'] : ['themes', 'dark', 'light', 'minimal', 'futuristic'],
    },
    {
      title: isArabic ? 'نظرة عامة على المكونات' : 'Components Overview',
      description: isArabic ? 'تصفح جميع المكونات المتاحة' : 'Browse all available components',
      href: '/components',
      category: 'Component',
      keywords: isArabic ? ['مكونات', 'واجهة المستخدم', 'مكتبة'] : ['components', 'ui', 'library'],
    },

    // Examples
    {
      title: isArabic ? 'أمثلة' : 'Examples',
      description: isArabic ? 'أمثلة استخدام حقيقية وعروض توضيحية' : 'Real-world usage examples and demos',
      href: '/examples',
      category: 'Example',
      keywords: isArabic ? ['أمثلة', 'عروض', 'قوالب', 'أنماط', 'عرض'] : ['examples', 'demos', 'templates', 'patterns', 'showcase'],
    },
  ]
}
