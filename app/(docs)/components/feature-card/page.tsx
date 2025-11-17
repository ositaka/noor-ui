'use client'

import * as React from 'react'
import Link from 'next/link'
import { FeatureCard } from '@/components/ui/feature-card'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Sparkles, Rocket, Zap, Shield, Package, Settings } from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const featureCardProps: PropDefinition[] = [
  {
    name: 'title',
    type: 'string',
    required: true,
    description: 'The title/heading of the feature card',
  },
  {
    name: 'description',
    type: 'string',
    required: true,
    description: 'The description text explaining the feature',
  },
  {
    name: 'icon',
    type: 'LucideIcon',
    required: true,
    description: 'Lucide icon component to display',
  },
  {
    name: 'href',
    type: 'string',
    required: false,
    description: 'Optional link URL. When provided, the card becomes clickable',
  },
  {
    name: 'className',
    type: 'string',
    required: false,
    description: 'Additional CSS classes to apply',
  },
]

const installCode = `npm install noorui-rtl`

const basicUsageCode = `import { FeatureCard } from '@/components/ui/feature-card'
import { Sparkles } from 'lucide-react'

<FeatureCard
  icon={Sparkles}
  title="Amazing Feature"
  description="This feature will change your life"
/>`

const clickableCode = `import { FeatureCard } from '@/components/ui/feature-card'
import { Rocket } from 'lucide-react'

// Card becomes clickable when href is provided
<FeatureCard
  icon={Rocket}
  title="Get Started"
  description="Click to learn how to begin"
  href="/getting-started"
/>`

const gridLayoutCode = `import { FeatureCard } from '@/components/ui/feature-card'
import { Zap, Shield, Package } from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  <FeatureCard
    icon={Zap}
    title="Lightning Fast"
    description="Optimized for performance"
    href="/components"
  />
  <FeatureCard
    icon={Shield}
    title="Secure by Default"
    description="Built with security in mind"
    href="/documentation"
  />
  <FeatureCard
    icon={Package}
    title="Easy to Use"
    description="Simple API, powerful results"
    href="/examples"
  />
</div>`

const rtlCode = `// RTL support is automatic!
// The icon and text layout adjusts based on direction

<FeatureCard
  icon={Sparkles}
  title="ميزة رائعة"
  description="هذه الميزة ستغير حياتك"
  href="/components"
/>
// In RTL: Layout mirrors automatically`

export default function FeatureCardPage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const t = content[locale]

  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-12">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                {t.nav.home}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/components" className="hover:text-foreground transition-colors">
                {t.nav.components}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">{t.componentNames['feature-card']}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t.componentNames['feature-card']}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {isRTL
              ? 'مكون بطاقة متخصص لعرض الميزات مع أيقونة وعنوان ووصف. قابل للنقر اختيارياً مع تأثيرات التمرير. مثالي للصفحات المقصودة وشبكات الميزات.'
              : 'A specialized card component for showcasing features with an icon, title, and description. Optionally clickable with hover effects. Perfect for landing pages and feature grids.'}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentPage.sections.preview}</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <div className="max-w-sm">
                <FeatureCard
                  icon={Sparkles}
                  title={isRTL ? "تصميم يدعم الكتابة من اليمين إلى اليسار" : "RTL-First Design"}
                  description={isRTL ? "مبني من الأساس لدعم التخطيطات من اليسار إلى اليمين ومن اليمين إلى اليسار بسلاسة" : "Built from the ground up to support both LTR and RTL layouts seamlessly"}
                  href="/rtl-guide"
                />
              </div>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentPage.sections.installation}</h2>
          <CodeBlock code={installCode} language="bash" title="Terminal" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentPage.sections.usage}</h2>
          <CodeBlock code={basicUsageCode} language="tsx" title="React" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentPage.sections.examples}</h2>

          {/* Static Card */}
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.componentPage.examples.static}</h3>
              <ComponentShowcase>
                <ComponentShowcase.Demo>
                  <div className="max-w-sm">
                    <FeatureCard
                      icon={Sparkles}
                      title={isRTL ? "ميزة رائعة" : "Amazing Feature"}
                      description={isRTL ? "هذه بطاقة ثابتة بدون رابط. رائعة للعروض غير التفاعلية." : "This is a static card without a link. Great for non-interactive displays."}
                    />
                  </div>
                </ComponentShowcase.Demo>
                <ComponentShowcase.Code code={basicUsageCode} />
              </ComponentShowcase>
            </div>

            {/* Clickable Card */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.componentPage.examples.clickable}</h3>
              <ComponentShowcase>
                <ComponentShowcase.Demo>
                  <div className="max-w-sm">
                    <FeatureCard
                      icon={Rocket}
                      title={isRTL ? "ابدأ الآن" : "Get Started"}
                      description={isRTL ? "انقر لتتعلم كيفية البدء في استخدام مكوناتنا" : "Click to learn how to begin using our components"}
                      href="/getting-started"
                    />
                  </div>
                </ComponentShowcase.Demo>
                <ComponentShowcase.Code code={clickableCode} />
              </ComponentShowcase>
            </div>

            {/* Grid Layout */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.componentPage.examples.gridLayout}</h3>
              <ComponentShowcase>
                <ComponentShowcase.Demo>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <FeatureCard
                      icon={Zap}
                      title={isRTL ? "سريع كالبرق" : "Lightning Fast"}
                      description={isRTL ? "محسّن للأداء" : "Optimized for performance"}
                      href="/components"
                    />
                    <FeatureCard
                      icon={Shield}
                      title={isRTL ? "آمن افتراضياً" : "Secure by Default"}
                      description={isRTL ? "مبني مع وضع الأمان في الاعتبار" : "Built with security in mind"}
                      href="/documentation"
                    />
                    <FeatureCard
                      icon={Package}
                      title={isRTL ? "سهل الاستخدام" : "Easy to Use"}
                      description={isRTL ? "واجهة برمجية بسيطة، نتائج قوية" : "Simple API, powerful results"}
                      href="/examples"
                    />
                  </div>
                </ComponentShowcase.Demo>
                <ComponentShowcase.Code code={gridLayoutCode} />
              </ComponentShowcase>
            </div>
          </div>
        </section>

        {/* RTL Support */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentPage.sections.rtlSupport}</h2>
          <p className="text-muted-foreground mb-6">
            {isRTL
              ? 'تتكيف بطاقة الميزة تلقائياً مع تخطيطات RTL. تنعكس الأيقونة ومحاذاة النص بناءً على الاتجاه الحالي.'
              : 'FeatureCard automatically adapts to RTL layouts. The icon and text alignment mirror based on the current direction.'}
          </p>
          <CodeBlock code={rtlCode} language="tsx" title="React" />
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentPage.sections.props}</h2>
          <PropsTable props={featureCardProps} />
        </section>

        {/* Best Practices */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentPage.sections.bestPractices}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg border-2 border-green-500/20 bg-green-500/5">
              <h3 className="text-foreground font-semibold mb-4 flex items-center gap-2">
                <span className="text-green-600 dark:text-green-400 text-xl">✓</span>
                {t.componentPage.bestPractices.do}
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-0.5">•</span>
                  <span>{isRTL ? 'استخدم أيقونات ذات معنى تمثل الميزة' : 'Use meaningful icons that represent the feature'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-0.5">•</span>
                  <span>{isRTL ? 'اجعل العناوين قصيرة ووصفية (2-5 كلمات)' : 'Keep titles short and descriptive (2-5 words)'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-0.5">•</span>
                  <span>{isRTL ? 'اجعل الأوصاف موجزة (1-2 جملة)' : 'Keep descriptions concise (1-2 sentences)'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-0.5">•</span>
                  <span>{isRTL ? 'استخدم في تخطيطات الشبكة لعرض الميزات' : 'Use in grid layouts for feature showcases'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-0.5">•</span>
                  <span>{isRTL ? 'أضف href عندما يجب أن تنقل البطاقة إلى مكان ما' : 'Add href when the card should navigate somewhere'}</span>
                </li>
              </ul>
            </div>
            <div className="p-6 rounded-lg border-2 border-red-500/20 bg-red-500/5">
              <h3 className="text-foreground font-semibold mb-4 flex items-center gap-2">
                <span className="text-red-600 dark:text-red-400 text-xl">✕</span>
                {t.componentPage.bestPractices.dont}
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 dark:text-red-400 mt-0.5">•</span>
                  <span>{isRTL ? 'لا تستخدم للمحتوى الطويل (استخدم بطاقة عادية بدلاً من ذلك)' : "Don't use for long-form content (use regular Card instead)"}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 dark:text-red-400 mt-0.5">•</span>
                  <span>{isRTL ? 'لا تخلط البطاقات القابلة للنقر وغير القابلة للنقر في نفس الشبكة' : "Don't mix clickable and non-clickable cards in the same grid"}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 dark:text-red-400 mt-0.5">•</span>
                  <span>{isRTL ? 'لا تستخدم أيقونات صغيرة جداً أو كبيرة جداً' : "Don't use tiny icons or oversized icons"}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 dark:text-red-400 mt-0.5">•</span>
                  <span>{isRTL ? 'لا تجعل الوصف طويلاً جداً (يكسر التوازن البصري)' : "Don't make the description too long (breaks visual balance)"}</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Related Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentPage.sections.relatedComponents}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={Package}
              title={t.componentNames['card']}
              description={isRTL ? 'مكون البطاقة الأساسي للمحتوى العام' : 'The base card component for general content'}
              href="/components/card"
            />
            <FeatureCard
              icon={Settings}
              title={t.componentNames['stats-card']}
              description={isRTL ? 'بطاقة متخصصة لعرض الإحصائيات' : 'Specialized card for displaying statistics'}
              href="/components/stats-card"
            />
          </div>
        </section>
      </main>
    </div>
  )
}
