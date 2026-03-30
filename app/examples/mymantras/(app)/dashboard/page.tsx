'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Callout } from '@/components/ui/callout'
import { ArabicNumber } from '@/components/ui/arabic-number'
import { Timeline, type TimelineItem } from '@/components/ui/timeline'
import { QuoteHero } from '@/components/ui/quote-hero'
import { useDirection } from '@/components/providers/direction-provider'
import {
  Sparkle,
  Heart,
  ArrowRight,
  ArrowLeft,
  BookmarkSimple,
  Books,
  FlowerLotus,
  Star,
  UserCircle,
} from '@phosphor-icons/react'

const gt = {
  en: {
    title: 'Your Journey',
    subtitle: 'A moment of reflection',
    quotesSaved: 'quotes saved',
    collections: 'collections',
    favorites: 'favorites',
    mantraSets: 'mantra sets',
    lastSaved: 'Last saved',
    yourPath: 'Your Path',
    recentReflections: 'Recent Reflections',
    viewAll: 'View All',
    yourCollections: 'Your Collections',
    viewCollection: 'View',
    quotes: 'quotes',
    completeProfile: 'Deepen Your Practice',
    completeProfileDesc: 'Add your Human Design chart to unlock mantras crafted uniquely for your design.',
    goToSettings: 'Go to Settings',
    // Timeline events
    tJoined: 'Joined MyMantras',
    tJoinedDesc: 'Your journey of self-discovery began',
    tJoinedDate: 'Mar 15',
    tFirstFav: 'First Quote Saved',
    tFirstFavDesc: '"The wound is the place where the Light enters you."',
    tFirstFavDate: 'Mar 16',
    tFirstMantras: 'First Mantras Generated',
    tFirstMantrasDesc: '8 mantras on Self-Worth, crafted from your HD chart',
    tFirstMantrasDate: 'Mar 20',
    tCollection: 'Created "Morning Wisdom"',
    tCollectionDesc: 'Your first collection — 5 quotes for daily inspiration',
    tCollectionDate: 'Mar 23',
    tMilestone: '23 Favorites Milestone',
    tMilestoneDesc: 'Your library of wisdom is growing beautifully',
    tMilestoneDate: 'Today',
  },
  ar: {
    title: 'رحلتك',
    subtitle: 'لحظة تأمّل',
    quotesSaved: 'اقتباسات محفوظة',
    collections: 'مجموعات',
    favorites: 'مفضلة',
    mantraSets: 'مجموعات تأملات',
    lastSaved: 'آخر حفظ',
    yourPath: 'مسارك',
    recentReflections: 'تأملات حديثة',
    viewAll: 'عرض الكل',
    yourCollections: 'مجموعاتك',
    viewCollection: 'عرض',
    quotes: 'اقتباسات',
    completeProfile: 'عمّق ممارستك',
    completeProfileDesc: 'أضف مخطط تصميمك البشري لفتح تأملات مصممة خصيصاً لتصميمك.',
    goToSettings: 'الذهاب إلى الإعدادات',
    // Timeline events
    tJoined: 'انضممت إلى تأملاتي',
    tJoinedDesc: 'بدأت رحلتك في اكتشاف الذات',
    tJoinedDate: '١٥ مارس',
    tFirstFav: 'أول اقتباس محفوظ',
    tFirstFavDesc: '"الجرح هو المكان الذي يدخل منه النور إليك."',
    tFirstFavDate: '١٦ مارس',
    tFirstMantras: 'أول تأملات مُنشأة',
    tFirstMantrasDesc: '٨ تأملات عن تقدير الذات، مصممة من مخطط تصميمك البشري',
    tFirstMantrasDate: '٢٠ مارس',
    tCollection: 'إنشاء "حكمة الصباح"',
    tCollectionDesc: 'مجموعتك الأولى — ٥ اقتباسات للإلهام اليومي',
    tCollectionDate: '٢٣ مارس',
    tMilestone: 'إنجاز ٢٣ مفضلة',
    tMilestoneDesc: 'مكتبة حكمتك تنمو بشكل جميل',
    tMilestoneDate: 'اليوم',
  },
}

const featuredQuote = {
  text: 'The wound is the place where the Light enters you.',
  textAr: 'الجرح هو المكان الذي يدخل منه النور إليك.',
  author: 'Rumi',
  authorAr: 'جلال الدين الرومي',
}

const recentQuotes = [
  { id: '1', text: 'The wound is the place where the Light enters you.', textAr: 'الجرح هو المكان الذي يدخل منه النور إليك.', author: 'Rumi', authorAr: 'الرومي', date: 'Mar 27', dateAr: '٢٧ مارس', isFav: true },
  { id: '2', text: 'Knowing yourself is the beginning of all wisdom.', textAr: 'معرفة نفسك هي بداية كل حكمة.', author: 'Aristotle', authorAr: 'أرسطو', date: 'Mar 26', dateAr: '٢٦ مارس', isFav: false },
  { id: '3', text: 'What you seek is seeking you.', textAr: 'ما تبحث عنه يبحث عنك.', author: 'Rumi', authorAr: 'الرومي', date: 'Mar 25', dateAr: '٢٥ مارس', isFav: true },
  { id: '4', text: 'Be patient with yourself. Nothing in nature blooms all year.', textAr: 'كن صبوراً مع نفسك. لا شيء في الطبيعة يزهر طوال العام.', author: 'Karen Salmansohn', authorAr: 'كارين سالمانسون', date: 'Mar 24', dateAr: '٢٤ مارس', isFav: false },
  { id: '5', text: 'The self is an ocean without a shore.', textAr: 'الذات بحر بلا شاطئ.', author: 'Ibn Arabi', authorAr: 'ابن عربي', date: 'Mar 23', dateAr: '٢٣ مارس', isFav: true },
]

const collectionPreviews = [
  { id: '1', name: 'Morning Wisdom', nameAr: 'حكمة الصباح', count: 5, desc: 'Quotes to start your day with clarity', descAr: 'اقتباسات لبدء يومك بوضوح' },
  { id: '2', name: "Rumi's Pearls", nameAr: 'لآلئ الرومي', count: 6, desc: 'His most transformative verses', descAr: 'أكثر أبياته تأثيراً' },
  { id: '3', name: 'Inner Peace', nameAr: 'السلام الداخلي', count: 5, desc: 'A sanctuary for turbulent days', descAr: 'ملاذ للأيام العاصفة' },
]

export default function MyMantrasDashboardPage() {
  const { locale, direction } = useDirection()
  const isRTL = direction === 'rtl'
  const h = gt[locale]

  const timelineItems: TimelineItem[] = [
    {
      icon: <FlowerLotus className="h-4 w-4" weight="fill" />,
      title: h.tJoined, titleAr: h.tJoined,
      description: h.tJoinedDesc, descriptionAr: h.tJoinedDesc,
      date: h.tJoinedDate, dateAr: h.tJoinedDate,
      status: 'complete',
    },
    {
      icon: <Heart className="h-4 w-4" weight="fill" />,
      title: h.tFirstFav, titleAr: h.tFirstFav,
      description: h.tFirstFavDesc, descriptionAr: h.tFirstFavDesc,
      date: h.tFirstFavDate, dateAr: h.tFirstFavDate,
      status: 'complete',
    },
    {
      icon: <Sparkle className="h-4 w-4" weight="fill" />,
      title: h.tFirstMantras, titleAr: h.tFirstMantras,
      description: h.tFirstMantrasDesc, descriptionAr: h.tFirstMantrasDesc,
      date: h.tFirstMantrasDate, dateAr: h.tFirstMantrasDate,
      status: 'complete',
    },
    {
      icon: <BookmarkSimple className="h-4 w-4" weight="fill" />,
      title: h.tCollection, titleAr: h.tCollection,
      description: h.tCollectionDesc, descriptionAr: h.tCollectionDesc,
      date: h.tCollectionDate, dateAr: h.tCollectionDate,
      status: 'complete',
    },
    {
      icon: <Star className="h-4 w-4" weight="fill" />,
      title: h.tMilestone, titleAr: h.tMilestone,
      description: h.tMilestoneDesc, descriptionAr: h.tMilestoneDesc,
      date: h.tMilestoneDate, dateAr: h.tMilestoneDate,
      status: 'current',
    },
  ]

  return (
    <div className="container py-8">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-4 bg-primary/10 rounded-xl">
          <Sparkle className="h-10 w-10 text-primary" weight="duotone" />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold">{h.title}</h1>
          <p className="text-muted-foreground font-body-serif italic">{h.subtitle}</p>
        </div>
      </div>

      {/* Featured Quote */}
      <div className="mb-8">
        <QuoteHero
          text={isRTL ? featuredQuote.textAr : featuredQuote.text}
          author={isRTL ? featuredQuote.authorAr : featuredQuote.author}
          size="md"
          showMarks={false}
          className="bg-card rounded-xl border border-border/50"
        />
        <p className="text-center text-xs text-muted-foreground mt-2 font-body-serif">
          <Heart className="h-3 w-3 inline-block text-destructive me-1" weight="fill" />
          {h.lastSaved} {isRTL ? '٢٧ مارس' : 'Mar 27'}
        </p>
      </div>

      {/* Gentle inline stats */}
      <div className="flex items-center justify-center gap-4 md:gap-8 text-center mb-10 py-4">
        <div>
          <p className="text-2xl font-display font-bold text-foreground">
            <ArabicNumber value={47} />
          </p>
          <p className="text-xs text-muted-foreground font-body-serif">{h.quotesSaved}</p>
        </div>
        <Separator orientation="vertical" className="h-8" />
        <div>
          <p className="text-2xl font-display font-bold text-foreground">
            <ArabicNumber value={6} />
          </p>
          <p className="text-xs text-muted-foreground font-body-serif">{h.collections}</p>
        </div>
        <Separator orientation="vertical" className="h-8" />
        <div>
          <p className="text-2xl font-display font-bold text-foreground">
            <ArabicNumber value={23} />
          </p>
          <p className="text-xs text-muted-foreground font-body-serif">{h.favorites}</p>
        </div>
        <Separator orientation="vertical" className="h-8" />
        <div>
          <p className="text-2xl font-display font-bold text-foreground">
            <ArabicNumber value={4} />
          </p>
          <p className="text-xs text-muted-foreground font-body-serif">{h.mantraSets}</p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Your Path — Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="font-display">{h.yourPath}</CardTitle>
            </CardHeader>
            <CardContent>
              <Timeline
                items={timelineItems}
                compact
                aria-label={h.yourPath}
              />
            </CardContent>
          </Card>

          {/* Recent Reflections */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-display">{h.recentReflections}</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/examples/mymantras/collections">
                    {h.viewAll}
                    {isRTL ? <ArrowLeft className="h-4 w-4 ms-1" /> : <ArrowRight className="h-4 w-4 ms-1" />}
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-1">
              {recentQuotes.map((q, i) => (
                <div key={q.id}>
                  <div className="flex items-start gap-3 py-3">
                    <Heart
                      className={`h-4 w-4 mt-1.5 shrink-0 ${q.isFav ? 'text-destructive' : 'text-muted-foreground/30'}`}
                      weight={q.isFav ? 'fill' : 'regular'}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-body-serif italic text-sm leading-relaxed">
                        &ldquo;{isRTL ? q.textAr : q.text}&rdquo;
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        — {isRTL ? q.authorAr : q.author} · {isRTL ? q.dateAr : q.date}
                      </p>
                    </div>
                  </div>
                  {i < recentQuotes.length - 1 && <Separator className="opacity-30" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Collections Preview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-display">{h.yourCollections}</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/examples/mymantras/collections">
                    {h.viewAll}
                    {isRTL ? <ArrowLeft className="h-3 w-3 ms-1" /> : <ArrowRight className="h-3 w-3 ms-1" />}
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {collectionPreviews.map((col) => (
                <Link
                  key={col.id}
                  href="/examples/mymantras/collections"
                  className="block p-3 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-primary/[0.02] transition-all"
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium font-display">{isRTL ? col.nameAr : col.name}</p>
                    <Books className="h-4 w-4 text-muted-foreground/50" />
                  </div>
                  <p className="text-xs text-muted-foreground font-body-serif italic">{isRTL ? col.descAr : col.desc}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    <ArabicNumber value={col.count} /> {h.quotes}
                  </p>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Complete Profile */}
          <Callout type="info" title={h.completeProfile}>
            <p className="text-sm mb-3 font-body-serif">{h.completeProfileDesc}</p>
            <Button size="sm" variant="outline" asChild>
              <Link href="/examples/mymantras/settings">{h.goToSettings}</Link>
            </Button>
          </Callout>
        </div>
      </div>
    </div>
  )
}
