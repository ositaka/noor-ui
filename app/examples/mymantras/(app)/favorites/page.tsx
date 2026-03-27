'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Carousel } from '@/components/ui/carousel'
import { PullQuote } from '@/components/ui/blockquote'
import { EmptyState } from '@/components/ui/empty-state'
import { useDirection } from '@/components/providers/direction-provider'
import { Heart, Quotes } from '@phosphor-icons/react'
import Link from 'next/link'

const gt = {
  en: {
    title: 'Favorites',
    subtitle: 'Your saved quotes',
    noFavorites: 'No favorites yet',
    noFavoritesDesc: 'Start exploring quotes and save the ones that resonate with you.',
    browseQuotes: 'Browse Collections',
  },
  ar: {
    title: 'المفضلة',
    subtitle: 'اقتباساتك المحفوظة',
    noFavorites: 'لا توجد مفضلة بعد',
    noFavoritesDesc: 'ابدأ باستكشاف الاقتباسات واحفظ تلك التي تتردد في قلبك.',
    browseQuotes: 'تصفح المجموعات',
  },
}

interface FavoriteQuote {
  id: string
  text: string
  textAr: string
  author: string
  authorAr: string
}

const favoriteQuotes: FavoriteQuote[] = [
  {
    id: '1',
    text: 'The wound is the place where the Light enters you.',
    textAr: 'الجرح هو المكان الذي يدخل منه النور إليك.',
    author: 'Rumi',
    authorAr: 'جلال الدين الرومي',
  },
  {
    id: '2',
    text: 'What you seek is seeking you.',
    textAr: 'ما تبحث عنه يبحث عنك.',
    author: 'Rumi',
    authorAr: 'جلال الدين الرومي',
  },
  {
    id: '3',
    text: 'The self is an ocean without a shore. Gazing upon it has no beginning or end.',
    textAr: 'الذات بحر بلا شاطئ. التحديق فيها ليس له بداية ولا نهاية.',
    author: 'Ibn Arabi',
    authorAr: 'ابن عربي',
  },
  {
    id: '4',
    text: 'Knowing yourself is the beginning of all wisdom.',
    textAr: 'معرفة نفسك هي بداية كل حكمة.',
    author: 'Aristotle',
    authorAr: 'أرسطو',
  },
  {
    id: '5',
    text: 'Let yourself be silently drawn by the strange pull of what you really love.',
    textAr: 'دع نفسك تنجذب بصمت نحو ما تحبه حقاً.',
    author: 'Rumi',
    authorAr: 'جلال الدين الرومي',
  },
  {
    id: '6',
    text: 'Whoever knows himself, knows his Lord.',
    textAr: 'من عرف نفسه فقد عرف ربه.',
    author: 'Hadith',
    authorAr: 'حديث شريف',
  },
  {
    id: '7',
    text: 'The quieter you become, the more you can hear.',
    textAr: 'كلما أصبحت أكثر هدوءاً، كلما استطعت أن تسمع أكثر.',
    author: 'Ram Dass',
    authorAr: 'رام داس',
  },
  {
    id: '8',
    text: 'Out beyond ideas of wrongdoing and rightdoing, there is a field. I\'ll meet you there.',
    textAr: 'وراء أفكار الصواب والخطأ، هناك حقل. سألقاك هناك.',
    author: 'Rumi',
    authorAr: 'جلال الدين الرومي',
  },
]

export default function MyMantrasFavoritesPage() {
  const { locale, direction } = useDirection()
  const isRTL = direction === 'rtl'
  const h = gt[locale]
  const [showEmpty, setShowEmpty] = React.useState(false)

  if (showEmpty) {
    return (
      <div className="container py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-4 bg-primary/10 rounded-xl">
            <Heart className="h-10 w-10 text-primary" weight="duotone" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{h.title}</h1>
            <p className="text-muted-foreground">{h.subtitle}</p>
          </div>
        </div>
        <EmptyState
          icon={<Heart />}
          title={h.noFavorites}
          description={h.noFavoritesDesc}
          action={
            <Button variant="outline" asChild>
              <Link href="/examples/mymantras/collections">{h.browseQuotes}</Link>
            </Button>
          }
        />
      </div>
    )
  }

  return (
    <div className="container py-8">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-4 bg-primary/10 rounded-xl">
          <Heart className="h-10 w-10 text-primary" weight="duotone" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{h.title}</h1>
          <p className="text-muted-foreground">{h.subtitle}</p>
        </div>
      </div>

      {/* Carousel */}
      <div className="max-w-3xl mx-auto">
        <Carousel
          items={favoriteQuotes}
          renderItem={(quote) => (
            <div className="px-4 py-12">
              <PullQuote align="center">
                {isRTL ? quote.textAr : quote.text}
              </PullQuote>
              <p className="text-center text-sm text-muted-foreground mt-4">
                — {isRTL ? quote.authorAr : quote.author}
              </p>
            </div>
          )}
          showDots
          showArrows
          loop
          aria-label={h.title}
          dotSize="lg"
        />
      </div>
    </div>
  )
}
