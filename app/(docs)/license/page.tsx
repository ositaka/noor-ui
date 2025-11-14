'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'
import { CheckCircle2, XCircle, ExternalLink, FileText, Shield } from 'lucide-react'

export default function LicensePage() {
  const { locale } = useDirection()

  const licenseContent = {
    en: {
      title: 'License & Trademark',
      subtitle: 'Understanding how you can use Noor UI in your projects',
      mitLicense: 'MIT License',
      mitDescription: 'The code is free and open source',
      trademark: 'Trademark Protection',
      trademarkDescription: 'The Noor UI name and branding are protected',
      overview: 'Overview',
      overviewText: 'Noor UI uses a dual protection model: the source code is released under the permissive MIT License, while the "Noor UI" name and branding are protected trademarks. This means you can freely use the code, but the name and brand identity are reserved.',
      codeSection: 'Code License (MIT)',
      codeDescription: 'All source code, components, and documentation are licensed under the MIT License.',
      youCanDo: 'What You Can Do',
      youCannotDo: 'What You Cannot Do (Trademark)',
      permitted: [
        'Use Noor UI in personal projects',
        'Use Noor UI in commercial applications',
        'Modify the code for your needs',
        'Distribute the code with your apps',
        'Study and learn from the code',
        'Contribute back to the project',
      ],
      restricted: [
        'Create a competing library called "Noor UI"',
        'Publish npm packages with "Noor UI" in the name',
        'Remove copyright notices from the code',
        'Misrepresent the official source',
        'Use branding in misleading ways',
      ],
      derivativeWorks: 'Derivative Works',
      derivativeText: 'If you create a modified version or fork of Noor UI:',
      derivativeSteps: [
        'Give it a distinct, different name',
        'Clearly state it is derived from Noor UI',
        'Keep the original copyright notices in the code',
        'Link back to the original project (appreciated)',
      ],
      derivativeExample: 'Example attribution:',
      attributionText: '"Based on Noor UI by Nuno Marques"',
      officialSources: 'Official Sources',
      officialDescription: 'The canonical and official sources for Noor UI are:',
      github: 'GitHub Repository',
      githubDescription: 'Source code and issue tracking',
      npm: 'npm Package',
      npmDescription: 'Install via npm (when published)',
      author: 'Author',
      authorDescription: 'Created by Nuno Marques',
      fullLicense: 'Full MIT License Text',
      licenseText: `Copyright (c) 2025 Nuno Marques

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`,
      questions: 'Questions?',
      questionsText: 'If you have questions about acceptable use of the Noor UI trademark or license terms, please contact:',
      email: 'info@ositaka.com',
      seeNotice: 'See NOTICE file',
      readFull: 'Read full trademark details',
    },
    ar: {
      title: 'الترخيص والعلامة التجارية',
      subtitle: 'فهم كيفية استخدام Noor UI في مشاريعك',
      mitLicense: 'ترخيص MIT',
      mitDescription: 'الكود مجاني ومفتوح المصدر',
      trademark: 'حماية العلامة التجارية',
      trademarkDescription: 'اسم Noor UI والعلامة التجارية محميان',
      overview: 'نظرة عامة',
      overviewText: 'تستخدم Noor UI نموذج حماية مزدوج: يتم إصدار الكود المصدري بموجب ترخيص MIT المتساهل، بينما اسم "Noor UI" والعلامة التجارية محميان. هذا يعني أنه يمكنك استخدام الكود بحرية، لكن الاسم والهوية التجارية محفوظة.',
      codeSection: 'ترخيص الكود (MIT)',
      codeDescription: 'جميع الأكواد المصدرية والمكونات والوثائق مرخصة بموجب ترخيص MIT.',
      youCanDo: 'ما يمكنك فعله',
      youCannotDo: 'ما لا يمكنك فعله (العلامة التجارية)',
      permitted: [
        'استخدام Noor UI في المشاريع الشخصية',
        'استخدام Noor UI في التطبيقات التجارية',
        'تعديل الكود حسب احتياجاتك',
        'توزيع الكود مع تطبيقاتك',
        'الدراسة والتعلم من الكود',
        'المساهمة في المشروع',
      ],
      restricted: [
        'إنشاء مكتبة منافسة باسم "Noor UI"',
        'نشر حزم npm تحتوي على "Noor UI" في الاسم',
        'إزالة إشعارات حقوق النشر من الكود',
        'تحريف المصدر الرسمي',
        'استخدام العلامة التجارية بطرق مضللة',
      ],
      derivativeWorks: 'الأعمال المشتقة',
      derivativeText: 'إذا قمت بإنشاء نسخة معدلة أو فرع من Noor UI:',
      derivativeSteps: [
        'امنحه اسمًا مختلفًا ومميزًا',
        'اذكر بوضوح أنه مشتق من Noor UI',
        'احتفظ بإشعارات حقوق النشر الأصلية في الكود',
        'ضع رابطًا للمشروع الأصلي (نقدر ذلك)',
      ],
      derivativeExample: 'مثال على الإسناد:',
      attributionText: '"مبني على Noor UI من تطوير Nuno Marques"',
      officialSources: 'المصادر الرسمية',
      officialDescription: 'المصادر الرسمية والموثوقة لـ Noor UI هي:',
      github: 'مستودع GitHub',
      githubDescription: 'الكود المصدري وتتبع المشاكل',
      npm: 'حزمة npm',
      npmDescription: 'التثبيت عبر npm (عند النشر)',
      author: 'المطور',
      authorDescription: 'من تطوير Nuno Marques',
      fullLicense: 'نص ترخيص MIT الكامل',
      licenseText: `حقوق النشر (c) 2025 Nuno Marques

يُمنح الإذن بموجب هذا، مجانًا، لأي شخص يحصل على نسخة من هذا البرنامج والملفات الوثائقية المرتبطة ("البرنامج")، للتعامل مع البرنامج دون قيود، بما في ذلك على سبيل المثال لا الحصر حقوق الاستخدام والنسخ والتعديل والدمج والنشر والتوزيع والترخيص من الباطن و/أو بيع نسخ من البرنامج، والسماح للأشخاص الذين يتم تزويدهم بالبرنامج بذلك، مع مراعاة الشروط التالية:

يجب تضمين إشعار حقوق النشر أعلاه وإشعار الإذن هذا في جميع نسخ أو أجزاء كبيرة من البرنامج.

يتم توفير البرنامج "كما هو"، دون أي ضمان من أي نوع، صريحًا أو ضمنيًا، بما في ذلك على سبيل المثال لا الحصر ضمانات القابلية للتسويق والملاءمة لغرض معين وعدم الانتهاك. لن يكون المؤلفون أو أصحاب حقوق النشر مسؤولين في أي حال عن أي مطالبة أو أضرار أو مسؤولية أخرى، سواء في إجراء عقدي أو ضرر أو غير ذلك، ناشئة عن أو فيما يتعلق بالبرنامج أو استخدام أو معاملات أخرى في البرنامج.`,
      questions: 'أسئلة؟',
      questionsText: 'إذا كان لديك أسئلة حول الاستخدام المقبول للعلامة التجارية Noor UI أو شروط الترخيص، يرجى الاتصال:',
      email: 'info@ositaka.com',
      seeNotice: 'انظر ملف NOTICE',
      readFull: 'اقرأ تفاصيل العلامة التجارية الكاملة',
    },
  }

  const t = licenseContent[locale]

  return (
    <div className="container py-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="outline" className="flex items-center gap-1.5">
            <Shield className="h-3 w-3" />
            {t.mitLicense}
          </Badge>
          <Badge variant="secondary">Open Source</Badge>
        </div>
        <h1 className="text-4xl font-bold mb-4">{t.title}</h1>
        <p className="text-xl text-muted-foreground">{t.subtitle}</p>
      </div>

      {/* Overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {t.overview}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{t.overviewText}</p>
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500" />
                <h3 className="font-semibold text-green-900 dark:text-green-100">
                  {t.mitLicense}
                </h3>
              </div>
              <p className="text-sm text-green-800 dark:text-green-200">
                {t.mitDescription}
              </p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-blue-600 dark:text-blue-500" />
                <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                  {t.trademark}
                </h3>
              </div>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                {t.trademarkDescription}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What You Can Do */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-900 dark:text-green-100">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500" />
              {t.youCanDo}
            </CardTitle>
            <CardDescription>{t.codeDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {t.permitted.map((item: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-red-200 dark:border-red-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-900 dark:text-red-100">
              <XCircle className="h-5 w-5 text-red-600 dark:text-red-500" />
              {t.youCannotDo}
            </CardTitle>
            <CardDescription>{t.trademarkDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {t.restricted.map((item: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Derivative Works */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{t.derivativeWorks}</CardTitle>
          <CardDescription>{t.derivativeText}</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 mb-4">
            {t.derivativeSteps.map((step: string, index: number) => (
              <li key={index} className="flex items-start gap-2">
                <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  {index + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ul>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium mb-2">{t.derivativeExample}</p>
            <code className="text-sm text-muted-foreground">
              {t.attributionText}
            </code>
          </div>
        </CardContent>
      </Card>

      {/* Official Sources */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{t.officialSources}</CardTitle>
          <CardDescription>{t.officialDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <a
              href="https://github.com/ositaka/noor-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
            >
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  {t.github}
                  <ExternalLink className="h-4 w-4" />
                </h3>
                <p className="text-sm text-muted-foreground">{t.githubDescription}</p>
              </div>
            </a>
            <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
              <div>
                <h3 className="font-semibold">{t.npm}</h3>
                <p className="text-sm text-muted-foreground">{t.npmDescription}</p>
                <code className="text-xs text-muted-foreground mt-1 block">
                  noorui-rtl
                </code>
              </div>
            </div>
            <a
              href="https://ositaka.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
            >
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  {t.author}
                  <ExternalLink className="h-4 w-4" />
                </h3>
                <p className="text-sm text-muted-foreground">{t.authorDescription}</p>
              </div>
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Full License Text */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{t.fullLicense}</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="p-4 bg-muted rounded-lg overflow-x-auto text-sm whitespace-pre-wrap">
            {t.licenseText}
          </pre>
          <p className="text-sm text-muted-foreground mt-4">
            <strong>Note:</strong> The MIT License covers the code only. The &quot;Noor UI&quot; trademark is protected separately.
          </p>
        </CardContent>
      </Card>

      {/* Questions */}
      <Card>
        <CardHeader>
          <CardTitle>{t.questions}</CardTitle>
          <CardDescription>{t.questionsText}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <a
              href="mailto:nuno@ositaka.com"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              {t.email}
              <ExternalLink className="h-4 w-4" />
            </a>
            <Separator />
            <a
              href="https://github.com/ositaka/noor-ui/blob/main/NOTICE"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <FileText className="h-4 w-4" />
              {t.seeNotice}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
