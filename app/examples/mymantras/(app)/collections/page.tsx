'use client'

import * as React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArabicNumber } from '@/components/ui/arabic-number'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Carousel } from '@/components/ui/carousel'
import { Blockquote } from '@/components/ui/blockquote'
import { EmptyState } from '@/components/ui/empty-state'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { useDirection } from '@/components/providers/direction-provider'
import { Books, Quotes, Lock, Globe } from '@phosphor-icons/react'

// ---------------------------------------------------------------------------
// Translations
// ---------------------------------------------------------------------------

const gt = {
  en: {
    title: 'Collections',
    subtitle: 'Browse and manage your quote collections',
    myCollections: 'My Collections',
    publicCollections: 'Public Collections',
    quotes: 'quotes',
    publicBadge: 'Public',
    privateBadge: 'Private',
    noPublicCollections: 'No public collections yet',
    noPublicDesc: 'Public collections from other users will appear here.',
    browseQuotes: 'Browse Quotes',
  },
  ar: {
    title: 'المجموعات',
    subtitle: 'تصفح وإدارة مجموعات اقتباساتك',
    myCollections: 'مجموعاتي',
    publicCollections: 'المجموعات العامة',
    quotes: 'اقتباسات',
    publicBadge: 'عامة',
    privateBadge: 'خاصة',
    noPublicCollections: 'لا توجد مجموعات عامة بعد',
    noPublicDesc: 'ستظهر هنا المجموعات العامة من المستخدمين الآخرين.',
    browseQuotes: 'تصفح الاقتباسات',
  },
}

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

interface Quote {
  text: string
  textAr: string
  author: string
  authorAr: string
}

interface Collection {
  id: string
  name: string
  nameAr: string
  description: string
  descriptionAr: string
  isPublic: boolean
  quotes: Quote[]
}

const collections: Collection[] = [
  {
    id: '1',
    name: 'Morning Wisdom',
    nameAr: 'حكمة الصباح',
    description: 'Quotes to start your day with clarity and purpose.',
    descriptionAr: 'اقتباسات لبدء يومك بوضوح وهدف.',
    isPublic: true,
    quotes: [
      { text: 'The wound is the place where the Light enters you.', textAr: 'الجرح هو المكان الذي يدخل منه النور إليك.', author: 'Rumi', authorAr: 'الرومي' },
      { text: 'What you seek is seeking you.', textAr: 'ما تبحث عنه يبحث عنك.', author: 'Rumi', authorAr: 'الرومي' },
      { text: 'Be patient with yourself. Nothing in nature blooms all year.', textAr: 'كن صبوراً مع نفسك. لا شيء في الطبيعة يزهر طوال العام.', author: 'Karen Salmansohn', authorAr: 'كارين سالمانسون' },
      { text: 'The morning wind has secrets to tell you. Do not go back to sleep.', textAr: 'ريح الصباح لديها أسرار لتخبرك بها. لا تعد إلى النوم.', author: 'Rumi', authorAr: 'الرومي' },
      { text: 'Every morning brings new potential.', textAr: 'كل صباح يحمل إمكانيات جديدة.', author: 'Unknown', authorAr: 'مجهول' },
    ],
  },
  {
    id: '2',
    name: "Rumi's Pearls",
    nameAr: 'لآلئ الرومي',
    description: 'A curated selection of Rumi\'s most transformative verses.',
    descriptionAr: 'مختارات من أكثر أبيات الرومي تأثيراً.',
    isPublic: true,
    quotes: [
      { text: 'Let yourself be silently drawn by the strange pull of what you really love.', textAr: 'دع نفسك تنجذب بصمت نحو ما تحبه حقاً.', author: 'Rumi', authorAr: 'الرومي' },
      { text: 'Don\'t be satisfied with stories, how things have gone with others. Unfold your own myth.', textAr: 'لا تكتفِ بالقصص وكيف سارت الأمور مع الآخرين. اكشف أسطورتك الخاصة.', author: 'Rumi', authorAr: 'الرومي' },
      { text: 'Out beyond ideas of wrongdoing and rightdoing, there is a field. I\'ll meet you there.', textAr: 'وراء أفكار الصواب والخطأ، هناك حقل. سألقاك هناك.', author: 'Rumi', authorAr: 'الرومي' },
      { text: 'The garden of the world has no limits, except in your mind.', textAr: 'حديقة العالم ليس لها حدود، إلا في عقلك.', author: 'Rumi', authorAr: 'الرومي' },
      { text: 'Silence is the language of God, all else is poor translation.', textAr: 'الصمت لغة الله، وكل ما عداه ترجمة ركيكة.', author: 'Rumi', authorAr: 'الرومي' },
      { text: 'You were born with wings, why prefer to crawl through life?', textAr: 'وُلدت بأجنحة، فلماذا تفضل الزحف في الحياة؟', author: 'Rumi', authorAr: 'الرومي' },
    ],
  },
  {
    id: '3',
    name: 'Sufi Reflections',
    nameAr: 'تأملات صوفية',
    description: 'Wisdom from the Sufi tradition — Ibn Arabi, Al-Ghazali, and others.',
    descriptionAr: 'حكمة من التراث الصوفي — ابن عربي والغزالي وغيرهم.',
    isPublic: true,
    quotes: [
      { text: 'The self is an ocean without a shore.', textAr: 'الذات بحر بلا شاطئ.', author: 'Ibn Arabi', authorAr: 'ابن عربي' },
      { text: 'Knowledge without action is vanity, and action without knowledge is insanity.', textAr: 'العلم بلا عمل غرور، والعمل بلا علم جنون.', author: 'Al-Ghazali', authorAr: 'الغزالي' },
      { text: 'The heart is the seat of knowledge.', textAr: 'القلب مقر المعرفة.', author: 'Ibn Arabi', authorAr: 'ابن عربي' },
      { text: 'Whoever knows himself, knows his Lord.', textAr: 'من عرف نفسه فقد عرف ربه.', author: 'Hadith', authorAr: 'حديث شريف' },
    ],
  },
  {
    id: '4',
    name: 'Modern Mindfulness',
    nameAr: 'اليقظة الحديثة',
    description: 'Contemporary wisdom for living with presence and awareness.',
    descriptionAr: 'حكمة معاصرة للعيش بحضور ووعي.',
    isPublic: false,
    quotes: [
      { text: 'The only way to make sense out of change is to plunge into it and join the dance.', textAr: 'الطريقة الوحيدة لفهم التغيير هي الانغماس فيه والانضمام إلى الرقصة.', author: 'Alan Watts', authorAr: 'آلان واتس' },
      { text: 'Knowing yourself is the beginning of all wisdom.', textAr: 'معرفة نفسك هي بداية كل حكمة.', author: 'Aristotle', authorAr: 'أرسطو' },
      { text: 'Trust the wait. Embrace the uncertainty. Enjoy the beauty of becoming.', textAr: 'ثق بالانتظار. تقبّل عدم اليقين. استمتع بجمال التحوّل.', author: 'Mandy Hale', authorAr: 'ماندي هيل' },
      { text: 'You are not a drop in the ocean. You are the entire ocean in a drop.', textAr: 'لست قطرة في المحيط. أنت المحيط بأكمله في قطرة.', author: 'Rumi', authorAr: 'الرومي' },
      { text: 'The present moment is filled with joy and happiness. If you are attentive, you will see it.', textAr: 'اللحظة الحاضرة مليئة بالفرح والسعادة. إذا كنت منتبهاً ستراها.', author: 'Thich Nhat Hanh', authorAr: 'ثيك نات هان' },
    ],
  },
  {
    id: '5',
    name: 'Strength & Resilience',
    nameAr: 'القوة والصمود',
    description: 'Words for when you need to remember your power.',
    descriptionAr: 'كلمات لحين تحتاج أن تتذكر قوتك.',
    isPublic: true,
    quotes: [
      { text: 'The oak fought the wind and was broken, the willow bent when it must and survived.', textAr: 'البلوطة حاربت الريح فانكسرت، والصفصافة انحنت حين يجب فنجت.', author: 'Robert Jordan', authorAr: 'روبرت جوردان' },
      { text: 'Stars can\'t shine without darkness.', textAr: 'النجوم لا تستطيع أن تتألق بدون ظلام.', author: 'D.H. Sidebottom', authorAr: 'د.هـ. سايدبوتوم' },
      { text: 'Fall seven times, stand up eight.', textAr: 'اسقط سبع مرات، انهض ثماني.', author: 'Japanese Proverb', authorAr: 'مثل ياباني' },
      { text: 'He who has a why to live can bear almost any how.', textAr: 'من لديه سبب للعيش يمكنه تحمّل أي كيف تقريباً.', author: 'Nietzsche', authorAr: 'نيتشه' },
    ],
  },
  {
    id: '6',
    name: 'Inner Peace',
    nameAr: 'السلام الداخلي',
    description: 'A sanctuary of calm for turbulent days.',
    descriptionAr: 'ملاذ هدوء للأيام العاصفة.',
    isPublic: false,
    quotes: [
      { text: 'Peace comes from within. Do not seek it without.', textAr: 'السلام يأتي من الداخل. لا تبحث عنه في الخارج.', author: 'Buddha', authorAr: 'بوذا' },
      { text: 'Nothing can bring you peace but yourself.', textAr: 'لا شيء يمكنه أن يجلب لك السلام إلا نفسك.', author: 'Ralph Waldo Emerson', authorAr: 'رالف والدو إمرسون' },
      { text: 'The quieter you become, the more you can hear.', textAr: 'كلما أصبحت أكثر هدوءاً، كلما استطعت أن تسمع أكثر.', author: 'Ram Dass', authorAr: 'رام داس' },
      { text: 'If you are depressed you are living in the past. If you are anxious you are living in the future. If you are at peace you are living in the present.', textAr: 'إذا كنت مكتئباً فأنت تعيش في الماضي. إذا كنت قلقاً فأنت تعيش في المستقبل. إذا كنت في سلام فأنت تعيش في الحاضر.', author: 'Lao Tzu', authorAr: 'لاو تسو' },
      { text: 'Within you, there is a stillness and a sanctuary to which you can retreat at any time.', textAr: 'في داخلك سكينة وملجأ يمكنك الانسحاب إليه في أي وقت.', author: 'Hermann Hesse', authorAr: 'هرمان هيسه' },
    ],
  },
]

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function MyMantrasCollectionsPage() {
  const { locale, direction } = useDirection()
  const isRTL = direction === 'rtl'
  const h = gt[locale]
  const [selectedCollection, setSelectedCollection] = React.useState<Collection | null>(null)

  const myCollections = collections
  const publicCollections: Collection[] = []

  return (
    <div className="container py-8">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-4 bg-primary/10 rounded-xl">
          <Books className="h-10 w-10 text-primary" weight="duotone" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{h.title}</h1>
          <p className="text-muted-foreground">{h.subtitle}</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="my">
        <TabsList className="mb-6">
          <TabsTrigger value="my">{h.myCollections}</TabsTrigger>
          <TabsTrigger value="public">{h.publicCollections}</TabsTrigger>
        </TabsList>

        <TabsContent value="my">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myCollections.map((col) => (
              <button
                key={col.id}
                onClick={() => setSelectedCollection(col)}
                className="text-start"
              >
                <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base">{isRTL ? col.nameAr : col.name}</CardTitle>
                      <Badge variant={col.isPublic ? 'default' : 'secondary'} className="shrink-0">
                        {col.isPublic ? (
                          <><Globe className="h-3 w-3 me-1" />{h.publicBadge}</>
                        ) : (
                          <><Lock className="h-3 w-3 me-1" />{h.privateBadge}</>
                        )}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {isRTL ? col.descriptionAr : col.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Quotes className="h-4 w-4" />
                      <ArabicNumber value={col.quotes.length} />
                      <span>{h.quotes}</span>
                    </div>
                  </CardContent>
                </Card>
              </button>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="public">
          <EmptyState
            icon={<Globe />}
            title={h.noPublicCollections}
            description={h.noPublicDesc}
            action={
              <Button variant="outline" onClick={() => {}}>
                {h.browseQuotes}
              </Button>
            }
          />
        </TabsContent>
      </Tabs>

      {/* Collection Detail Dialog */}
      <Dialog open={!!selectedCollection} onOpenChange={(open) => !open && setSelectedCollection(null)}>
        <DialogContent className="sm:max-w-2xl">
          {selectedCollection && (
            <>
              <DialogHeader>
                <DialogTitle>{isRTL ? selectedCollection.nameAr : selectedCollection.name}</DialogTitle>
                <DialogDescription>{isRTL ? selectedCollection.descriptionAr : selectedCollection.description}</DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Carousel
                  items={selectedCollection.quotes}
                  renderItem={(quote) => (
                    <div className="px-4 py-8">
                      <Blockquote
                        author={isRTL ? quote.authorAr : quote.author}
                        variant="accent"
                      >
                        {isRTL ? quote.textAr : quote.text}
                      </Blockquote>
                    </div>
                  )}
                  showDots
                  showArrows
                  loop
                  aria-label={isRTL ? selectedCollection.nameAr : selectedCollection.name}
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
