'use client'

import * as React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useDirection } from '@/components/providers/direction-provider'
import { useToast } from '@/hooks/use-toast'
import {
  FlowerLotus,
  Heart,
  ShareNetwork,
  ArrowsClockwise,
  Quotes,
  Sparkle,
} from '@phosphor-icons/react'

const gt = {
  en: {
    greeting: 'Good morning, Layla',
    subtitle: 'Your daily wisdom awaits',
    newInspiration: 'New Inspiration',
    favorited: 'Added to favorites',
    unfavorited: 'Removed from favorites',
    linkCopied: 'Link copied to clipboard!',
    share: 'Share',
    favorite: 'Favorite',
    refresh: 'New quote',
  },
  ar: {
    greeting: 'صباح الخير، ليلى',
    subtitle: 'حكمتك اليومية بانتظارك',
    newInspiration: 'إلهام جديد',
    favorited: 'تمت الإضافة إلى المفضلة',
    unfavorited: 'تمت الإزالة من المفضلة',
    linkCopied: 'تم نسخ الرابط!',
    share: 'مشاركة',
    favorite: 'المفضلة',
    refresh: 'اقتباس جديد',
  },
}

interface Quote {
  id: string
  text: string
  textAr: string
  author: string
  authorAr: string
}

const quotes: Quote[] = [
  {
    id: '1',
    text: 'The wound is the place where the Light enters you.',
    textAr: 'الجرح هو المكان الذي يدخل منه النور إليك.',
    author: 'Rumi',
    authorAr: 'جلال الدين الرومي',
  },
  {
    id: '2',
    text: 'Knowing yourself is the beginning of all wisdom.',
    textAr: 'معرفة نفسك هي بداية كل حكمة.',
    author: 'Aristotle',
    authorAr: 'أرسطو',
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
    text: 'What you seek is seeking you.',
    textAr: 'ما تبحث عنه يبحث عنك.',
    author: 'Rumi',
    authorAr: 'جلال الدين الرومي',
  },
  {
    id: '5',
    text: 'Be patient with yourself. Nothing in nature blooms all year.',
    textAr: 'كن صبوراً مع نفسك. لا شيء في الطبيعة يزهر طوال العام.',
    author: 'Karen Salmansohn',
    authorAr: 'كارين سالمانسون',
  },
  {
    id: '6',
    text: 'The only way to make sense out of change is to plunge into it and join the dance.',
    textAr: 'الطريقة الوحيدة لفهم التغيير هي الانغماس فيه والانضمام إلى الرقصة.',
    author: 'Alan Watts',
    authorAr: 'آلان واتس',
  },
  {
    id: '7',
    text: 'Trust the wait. Embrace the uncertainty. Enjoy the beauty of becoming.',
    textAr: 'ثق بالانتظار. تقبّل عدم اليقين. استمتع بجمال التحوّل.',
    author: 'Mandy Hale',
    authorAr: 'ماندي هيل',
  },
  {
    id: '8',
    text: 'Your task is not to seek for love, but merely to seek and find all the barriers within yourself that you have built against it.',
    textAr: 'مهمتك ليست البحث عن الحب، بل البحث عن كل الحواجز التي بنيتها في داخلك ضده وإيجادها.',
    author: 'Rumi',
    authorAr: 'جلال الدين الرومي',
  },
]

export default function MyMantrasHomePage() {
  const { locale, direction } = useDirection()
  const isRTL = direction === 'rtl'
  const h = gt[locale]
  const { toast } = useToast()
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isTransitioning, setIsTransitioning] = React.useState(false)
  const [favoritedIds, setFavoritedIds] = React.useState<Set<string>>(new Set(['1', '4']))

  const quote = quotes[currentIndex]

  const handleNewQuote = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      let newIndex: number
      do {
        newIndex = Math.floor(Math.random() * quotes.length)
      } while (newIndex === currentIndex && quotes.length > 1)
      setCurrentIndex(newIndex)
      setIsTransitioning(false)
    }, 300)
  }

  const toggleFavorite = () => {
    const newFavs = new Set(favoritedIds)
    if (newFavs.has(quote.id)) {
      newFavs.delete(quote.id)
      toast({ title: h.unfavorited })
    } else {
      newFavs.add(quote.id)
      toast({ title: h.favorited, variant: 'success' })
    }
    setFavoritedIds(newFavs)
  }

  const handleShare = () => {
    toast({ title: h.linkCopied, variant: 'success' })
  }

  const isFav = favoritedIds.has(quote.id)

  return (
    <div className="container py-8">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-4 bg-primary/10 rounded-xl">
          <FlowerLotus className="h-10 w-10 text-primary" weight="duotone" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{h.greeting}</h1>
          <p className="text-muted-foreground">{h.subtitle}</p>
        </div>
      </div>

      {/* Quote Card */}
      <div className="max-w-2xl mx-auto">
        <Card className="overflow-hidden">
          <CardContent className="p-8 md:p-12 relative">
            {/* Decorative quote marks */}
            <Quotes
              className="absolute top-6 start-6 h-16 w-16 text-primary/10"
              weight="fill"
            />
            <Quotes
              className="absolute bottom-6 end-6 h-16 w-16 text-primary/10 rotate-180"
              weight="fill"
            />

            {/* Quote text */}
            <div
              className="relative z-[1] text-center py-8 transition-opacity duration-300"
              style={{ opacity: isTransitioning ? 0 : 1 }}
            >
              <blockquote className="text-2xl md:text-3xl font-serif italic text-foreground leading-relaxed text-balance mb-6">
                <span className="text-primary">&ldquo;</span>
                {isRTL ? quote.textAr : quote.text}
                <span className="text-primary">&rdquo;</span>
              </blockquote>

              {/* Accent line */}
              <div className="h-px w-16 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent mb-4" />

              {/* Author */}
              <p className="text-sm font-medium text-muted-foreground">
                — {isRTL ? quote.authorAr : quote.author}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-center gap-2 pt-4 border-t border-border/50">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFavorite}
                aria-label={h.favorite}
                className={isFav ? 'text-destructive' : ''}
              >
                <Heart className="h-5 w-5" weight={isFav ? 'fill' : 'regular'} />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleShare} aria-label={h.share}>
                <ShareNetwork className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleNewQuote} aria-label={h.refresh}>
                <ArrowsClockwise className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* New Inspiration button */}
        <div className="text-center mt-8">
          <Button size="lg" onClick={handleNewQuote} className="gap-2">
            <Sparkle className="h-5 w-5" />
            {h.newInspiration}
          </Button>
        </div>
      </div>
    </div>
  )
}
