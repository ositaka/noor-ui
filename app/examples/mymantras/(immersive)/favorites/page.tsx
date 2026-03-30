'use client'

import * as React from 'react'
import { Carousel } from '@/components/ui/carousel'
import { QuoteHero } from '@/components/ui/quote-hero'
import { useDirection } from '@/components/providers/direction-provider'
import { Heart } from '@phosphor-icons/react'

const gt = {
  en: {
    title: 'Favorites',
    subtitle: 'Your saved wisdom',
  },
  ar: {
    title: 'المفضلة',
    subtitle: 'حكمتك المحفوظة',
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

  return (
    <div className="min-h-[calc(100vh-48px)] flex flex-col pt-12">
      {/* Subtle header */}
      <div className="flex items-center justify-center gap-2 pt-4 pb-2">
        <Heart className="h-4 w-4 text-primary/60" weight="fill" />
        <span className="text-sm text-muted-foreground font-body-serif italic">{h.subtitle}</span>
      </div>

      {/* Carousel of QuoteHero components */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto">
          <Carousel
            items={favoriteQuotes}
            renderItem={(quote) => (
              <div className="px-4">
                <QuoteHero
                  text={isRTL ? quote.textAr : quote.text}
                  author={isRTL ? quote.authorAr : quote.author}
                  size="lg"
                />
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
    </div>
  )
}
