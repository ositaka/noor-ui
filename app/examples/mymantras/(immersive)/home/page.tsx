'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { QuoteHero } from '@/components/ui/quote-hero'
import { StreamingText } from '@/components/ui/streaming-text'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useDirection } from '@/components/providers/direction-provider'
import { useToast } from '@/hooks/use-toast'
import {
  Heart,
  ShareNetwork,
  ArrowsClockwise,
  Sparkle,
} from '@phosphor-icons/react'

const gt = {
  en: {
    greeting: 'Good morning, Layla',
    newInspiration: 'New Inspiration',
    favorited: 'Added to favorites',
    unfavorited: 'Removed from favorites',
    linkCopied: 'Link copied to clipboard!',
    share: 'Share',
    favorite: 'Favorite',
    refresh: 'New quote',
    decode: 'Decode for me',
    decodeTitle: 'Your Human Design Decode',
    hdProfile: '2/4 Generator · Sacral Authority',
    creditsRemaining: 'credits remaining',
  },
  ar: {
    greeting: 'صباح الخير، ليلى',
    newInspiration: 'إلهام جديد',
    favorited: 'تمت الإضافة إلى المفضلة',
    unfavorited: 'تمت الإزالة من المفضلة',
    linkCopied: 'تم نسخ الرابط!',
    share: 'مشاركة',
    favorite: 'المفضلة',
    refresh: 'اقتباس جديد',
    decode: 'فسّر لي',
    decodeTitle: 'تفسير تصميمك البشري',
    hdProfile: 'مولّد ٢/٤ · سلطة عجزية',
    creditsRemaining: 'أرصدة متبقية',
  },
}

interface Quote {
  id: string
  text: string
  textAr: string
  author: string
  authorAr: string
  decode: string
  decodeAr: string
}

const quotes: Quote[] = [
  {
    id: '1',
    text: 'The wound is the place where the Light enters you.',
    textAr: 'الجرح هو المكان الذي يدخل منه النور إليك.',
    author: 'Rumi',
    authorAr: 'جلال الدين الرومي',
    decode: 'As a Generator with Sacral Authority, your wounds aren\'t failures — they\'re openings. Every time life hasn\'t gone the way your mind planned, your Sacral was redirecting you toward what genuinely lights you up. Your 2/4 profile means you carry natural gifts that others see before you do. The "wound" Rumi describes is that gap between who you think you should be and who you already are. Your open Head and Ajna centers absorb mental pressure to figure everything out — but your body already knows. The light enters not through understanding, but through response. The next time frustration surfaces, notice it. That\'s not weakness. That\'s your Generator Not-Self theme pointing you back toward your Sacral truth.',
    decodeAr: 'كمولّد بسلطة عجزية، جروحك ليست إخفاقات — إنها انفتاحات. في كل مرة لم تسر الحياة كما خطط عقلك، كان عجزك يعيد توجيهك نحو ما يشعلك حقاً. ملفك ٢/٤ يعني أنك تحمل مواهب طبيعية يراها الآخرون قبلك. "الجرح" الذي يصفه الرومي هو تلك الفجوة بين من تعتقد أنك يجب أن تكون ومن أنت بالفعل. مركزا الرأس والأجنا المفتوحان يمتصان الضغط الذهني لفهم كل شيء — لكن جسدك يعرف بالفعل. النور يدخل ليس من خلال الفهم، بل من خلال الاستجابة. في المرة القادمة التي يظهر فيها الإحباط، لاحظه. ذلك ليس ضعفاً. إنه موضوع اللا-ذات للمولّد يشير إليك بالعودة إلى حقيقتك العجزية.',
  },
  {
    id: '2',
    text: 'Knowing yourself is the beginning of all wisdom.',
    textAr: 'معرفة نفسك هي بداية كل حكمة.',
    author: 'Aristotle',
    authorAr: 'أرسطو',
    decode: 'Aristotle\'s words land differently when you understand Human Design. "Knowing yourself" for a Generator isn\'t about personality tests or self-reflection — it\'s about learning to hear your Sacral response. That guttural uh-huh or unh-unh that your body gives before your mind catches up. Your 2nd line is The Hermit — you need alone time to hear yourself clearly. But your 4th line pulls you into networks and relationships. The wisdom Aristotle describes begins when you stop trying to know yourself through other people\'s frameworks and start trusting what your body tells you in the moment. Your defined Throat gives you a voice. The question is: are you speaking from response, or from conditioning?',
    decodeAr: 'كلمات أرسطو تصل بشكل مختلف عندما تفهم التصميم البشري. "معرفة نفسك" للمولّد ليست عن اختبارات الشخصية أو التأمل الذاتي — إنها عن تعلم سماع استجابتك العجزية. ذلك الصوت الحشوي بنعم أو لا الذي يعطيه جسدك قبل أن يلحق عقلك. خطك الثاني هو الناسك — تحتاج وقتاً وحدك لسماع نفسك بوضوح. لكن خطك الرابع يجذبك إلى الشبكات والعلاقات. الحكمة التي يصفها أرسطو تبدأ عندما تتوقف عن محاولة معرفة نفسك من خلال أطر الآخرين وتبدأ بالثقة بما يخبرك به جسدك في اللحظة.',
  },
  {
    id: '3',
    text: 'The self is an ocean without a shore. Gazing upon it has no beginning or end.',
    textAr: 'الذات بحر بلا شاطئ. التحديق فيها ليس له بداية ولا نهاية.',
    author: 'Ibn Arabi',
    authorAr: 'ابن عربي',
    decode: 'Ibn Arabi\'s ocean is your open centers. With six undefined centers — Head, Ajna, Heart/Will, Solar Plexus, Spleen, and Root — you absorb and amplify the energy of everyone around you. You don\'t have fixed edges. You are, quite literally, an ocean without a shore. This isn\'t a deficiency. Your open centers give you wisdom: the wisdom to know which questions matter (open Head), which truths are worth holding (open Ajna), and which fears are yours versus borrowed (open Spleen). The "gazing" with no beginning or end is your life\'s work — learning to be in this openness without drowning in conditioning. Your Sacral is your anchor. It knows what\'s yours.',
    decodeAr: 'محيط ابن عربي هو مراكزك المفتوحة. مع ستة مراكز غير محددة — الرأس والأجنا والقلب والضفيرة الشمسية والطحال والجذر — تمتص وتضخم طاقة كل من حولك. ليس لديك حواف ثابتة. أنت حرفياً بحر بلا شاطئ. هذا ليس نقصاً. مراكزك المفتوحة تمنحك الحكمة: حكمة معرفة أي الأسئلة مهمة، وأي الحقائق تستحق التمسك بها، وأي المخاوف لك مقابل المستعارة. "التحديق" بلا بداية ولا نهاية هو عمل حياتك — تعلم أن تكون في هذا الانفتاح دون الغرق في التكييف. عجزك هو مرساتك. يعرف ما هو لك.',
  },
  {
    id: '4',
    text: 'What you seek is seeking you.',
    textAr: 'ما تبحث عنه يبحث عنك.',
    author: 'Rumi',
    authorAr: 'جلال الدين الرومي',
    decode: 'This is Generator strategy distilled into seven words. You don\'t initiate — you respond. What\'s meant for you will come TO you, show up in your field, knock on your door. Your enveloping aura pulls the right opportunities toward you when you\'re operating correctly. But here\'s the catch your mind won\'t like: waiting. Your 2nd line Hermit needs to be called out. If you\'re constantly chasing, hustling, initiating — you override your design. The seeking Rumi describes isn\'t passive. It\'s being so lit up by what you love that the universe rearranges itself around your energy. Your Channel 20-34 gives you charisma through action, not through effort. Do what lights you up. The rest follows.',
    decodeAr: 'هذه استراتيجية المولّد مقطرة في سبع كلمات. أنت لا تبادر — أنت تستجيب. ما هو مقدر لك سيأتي إليك، يظهر في مجالك، يطرق بابك. هالتك الشاملة تجذب الفرص المناسبة نحوك عندما تعمل بشكل صحيح. لكن هناك فخ لن يحبه عقلك: الانتظار. ناسك خطك الثاني يحتاج أن يُستدعى. إذا كنت تطارد وتكدح وتبادر باستمرار — فأنت تتجاوز تصميمك. البحث الذي يصفه الرومي ليس سلبياً. إنه أن تكون مشتعلاً لدرجة أن الكون يعيد ترتيب نفسه حول طاقتك.',
  },
  {
    id: '5',
    text: 'Be patient with yourself. Nothing in nature blooms all year.',
    textAr: 'كن صبوراً مع نفسك. لا شيء في الطبيعة يزهر طوال العام.',
    author: 'Karen Salmansohn',
    authorAr: 'كارين سالمانسون',
    decode: 'Your Sacral energy has natural rhythms. Some days the response is a full-body YES to everything. Other days, your gut goes quiet. That\'s not burnout — that\'s your design cycling. As a Generator, society tells you to be productive every single day. But your 2nd line Hermit needs withdrawal. Periods of apparent "nothing" where your natural genius reconstitutes itself. The frustration you feel when you\'re not producing? That\'s conditioning, not truth. Your body knows how to bloom. It also knows how to rest, root, and gather. Trust the fallow seasons. Your Sacral will tell you when spring arrives — you\'ll feel it as an unmistakable pull toward action.',
    decodeAr: 'طاقتك العجزية لها إيقاعات طبيعية. بعض الأيام الاستجابة نعم كاملة لكل شيء. أيام أخرى يهدأ حدسك. ذلك ليس احتراقاً — إنه تصميمك يدور. كمولّد، المجتمع يخبرك أن تكون منتجاً كل يوم. لكن ناسك في الخط الثاني يحتاج الانسحاب. فترات "لا شيء" ظاهري حيث تعيد عبقريتك الطبيعية تشكيل نفسها. الإحباط الذي تشعر به عندما لا تنتج؟ ذلك تكييف، ليس حقيقة. جسدك يعرف كيف يزهر. ويعرف أيضاً كيف يرتاح ويتجذر ويجمع.',
  },
  {
    id: '6',
    text: 'The only way to make sense out of change is to plunge into it and join the dance.',
    textAr: 'الطريقة الوحيدة لفهم التغيير هي الانغماس فيه والانضمام إلى الرقصة.',
    author: 'Alan Watts',
    authorAr: 'آلان واتس',
    decode: 'Watts is describing what happens when a Generator stops resisting and starts responding. "Plunge into it" isn\'t initiation — it\'s surrender to the Sacral pull. When change appears in your field and your gut says YES, the mind will still build cases for caution. Your open Head and Ajna will collect everyone else\'s doubts. But your defined Sacral-Throat connection (Channel 20-34) gives you the power to act from presence. The "dance" is response in motion. Not planned, not strategic — alive. Your 4th line network will reorganize around your new direction naturally. You don\'t need to announce the change. Just respond to it. The dance has already started.',
    decodeAr: 'واتس يصف ما يحدث عندما يتوقف المولّد عن المقاومة ويبدأ بالاستجابة. "الانغماس فيه" ليس مبادرة — إنه استسلام للجذب العجزي. عندما يظهر التغيير في مجالك ويقول حدسك نعم، سيظل العقل يبني حججاً للحذر. لكن اتصالك المحدد بين العجز والحلق يمنحك القوة للتصرف من الحضور. "الرقصة" هي الاستجابة في حركة. ليست مخططة ولا استراتيجية — حية.',
  },
  {
    id: '7',
    text: 'Trust the wait. Embrace the uncertainty. Enjoy the beauty of becoming.',
    textAr: 'ثق بالانتظار. تقبّل عدم اليقين. استمتع بجمال التحوّل.',
    author: 'Mandy Hale',
    authorAr: 'ماندي هيل',
    decode: 'Three sentences. Three aspects of Generator strategy. "Trust the wait" — your strategy is to respond, not initiate. Waiting isn\'t passive; it\'s the most active thing a Generator can do. It\'s keeping your energy available for what\'s truly correct. "Embrace the uncertainty" — your open Head center will pressure you to resolve every question. Don\'t. The uncertainty is where your wisdom lives. "Enjoy the beauty of becoming" — you\'re not here to arrive at a fixed identity. Your 2/4 profile is a lifetime of being called out of your hermit cave into new connections, each one reshaping you. The becoming never stops. That\'s not a problem to solve — it\'s the design working.',
    decodeAr: 'ثلاث جمل. ثلاثة جوانب من استراتيجية المولّد. "ثق بالانتظار" — استراتيجيتك هي الاستجابة لا المبادرة. الانتظار ليس سلبياً؛ إنه أكثر شيء نشط يمكن للمولّد فعله. "تقبّل عدم اليقين" — مركز رأسك المفتوح سيضغط عليك لحل كل سؤال. لا تفعل. عدم اليقين هو حيث تعيش حكمتك. "استمتع بجمال التحوّل" — لست هنا لتصل إلى هوية ثابتة. ملفك ٢/٤ هو عمر من الاستدعاء خارج كهف ناسكك إلى اتصالات جديدة.',
  },
  {
    id: '8',
    text: 'Your task is not to seek for love, but merely to seek and find all the barriers within yourself that you have built against it.',
    textAr: 'مهمتك ليست البحث عن الحب، بل البحث عن كل الحواجز التي بنيتها في داخلك ضده وإيجادها.',
    author: 'Rumi',
    authorAr: 'جلال الدين الرومي',
    decode: 'The barriers Rumi describes are your Not-Self conditioning. Every time you initiated instead of responding, every time you overrode your Sacral to please someone, every time frustration told you something was wrong but you pushed through anyway — you built a wall. Your open Heart/Will center may have convinced you that you need to prove your worth to deserve love. Your open Solar Plexus might have absorbed others\' emotional waves and called them your own. The "task" isn\'t another thing on your to-do list. It\'s deconditioning. It\'s learning to hear your body over the noise of your open centers. Seven years of living your design — that\'s how long the cells take to turn over. You\'re already on the path.',
    decodeAr: 'الحواجز التي يصفها الرومي هي تكييف اللا-ذات لديك. في كل مرة بادرت بدلاً من الاستجابة، في كل مرة تجاوزت عجزك لإرضاء أحد، في كل مرة أخبرك الإحباط أن شيئاً خاطئ لكنك واصلت على أي حال — بنيت جداراً. مركز قلبك المفتوح ربما أقنعك أنك بحاجة لإثبات قيمتك لتستحق الحب. ضفيرتك الشمسية المفتوحة ربما امتصت موجات الآخرين العاطفية ونسبتها لنفسك. "المهمة" ليست شيئاً آخر في قائمتك. إنها فك التكييف.',
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
  const [decodeOpen, setDecodeOpen] = React.useState(false)
  const [decodeStreaming, setDecodeStreaming] = React.useState(false)

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

  const handleDecode = () => {
    setDecodeOpen(true)
    setDecodeStreaming(true)
  }

  const isFav = favoritedIds.has(quote.id)

  return (
    <div className="min-h-[calc(100vh-48px)] flex flex-col items-center justify-center relative pt-12">
      {/* Tiny greeting */}
      <p className="absolute top-14 start-6 text-xs text-muted-foreground/50 font-body-serif italic">
        {h.greeting}
      </p>

      {/* The quote — owns the viewport */}
      <div className="flex-1 flex items-center justify-center w-full max-w-4xl mx-auto">
        <QuoteHero
          text={isRTL ? quote.textAr : quote.text}
          author={isRTL ? quote.authorAr : quote.author}
          size="xl"
          isTransitioning={isTransitioning}
          actions={
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFavorite}
                aria-label={h.favorite}
                className={isFav ? 'text-destructive hover:text-destructive/80' : 'text-muted-foreground'}
              >
                <Heart className="h-5 w-5" weight={isFav ? 'fill' : 'regular'} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleShare}
                aria-label={h.share}
                className="text-muted-foreground"
              >
                <ShareNetwork className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNewQuote}
                aria-label={h.refresh}
                className="text-muted-foreground"
              >
                <ArrowsClockwise className="h-5 w-5" />
              </Button>
            </>
          }
        />
      </div>

      {/* Bottom buttons */}
      <div className="pb-12 flex items-center gap-3">
        <Button
          variant="outline"
          size="lg"
          onClick={handleDecode}
          className="gap-2 rounded-full px-6 glow-accent border-accent/30 text-accent-foreground hover:bg-accent/10"
        >
          <Sparkle className="h-5 w-5 text-accent" weight="fill" />
          {h.decode}
        </Button>
        <Button
          size="lg"
          onClick={handleNewQuote}
          className="gap-2 rounded-full px-6 glow-primary"
        >
          <ArrowsClockwise className="h-5 w-5" />
          {h.newInspiration}
        </Button>
      </div>

      {/* Decode Sheet — HD interpretation */}
      <Sheet open={decodeOpen} onOpenChange={setDecodeOpen}>
        <SheetContent side="bottom" className="h-[75vh] overflow-y-auto">
          <SheetHeader className="text-center pb-4">
            <SheetTitle className="font-display flex items-center justify-center gap-2">
              <Sparkle className="h-5 w-5 text-accent" weight="fill" />
              {h.decodeTitle}
            </SheetTitle>
          </SheetHeader>

          <div className="max-w-2xl mx-auto space-y-6">
            {/* HD profile info */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span className="font-body-serif">{h.hdProfile}</span>
              <span className="font-body-serif">
                <Sparkle className="h-3 w-3 inline-block me-1 text-accent" weight="fill" />
                12 {h.creditsRemaining}
              </span>
            </div>

            <Separator className="opacity-30" />

            {/* The quote being decoded */}
            <blockquote className="font-display italic text-foreground/60 text-center text-lg">
              &ldquo;{isRTL ? quote.textAr : quote.text}&rdquo;
            </blockquote>

            <Separator className="opacity-30" />

            {/* The decode — streaming text */}
            <div className="font-body-serif text-base leading-[1.8] text-foreground/90">
              {decodeStreaming ? (
                <StreamingText
                  text={isRTL ? quote.decodeAr : quote.decode}
                  speed={12}
                  isStreaming
                  onComplete={() => setDecodeStreaming(false)}
                />
              ) : (
                <p>{isRTL ? quote.decodeAr : quote.decode}</p>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
