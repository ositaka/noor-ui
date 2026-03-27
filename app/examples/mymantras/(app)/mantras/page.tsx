'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Callout } from '@/components/ui/callout'
import { Stepper, type Step } from '@/components/ui/stepper'
import { ThinkingIndicator } from '@/components/ui/thinking-indicator'
import { StreamingText } from '@/components/ui/streaming-text'
import { Blockquote } from '@/components/ui/blockquote'
import { useDirection } from '@/components/providers/direction-provider'
import { useToast } from '@/hooks/use-toast'
import {
  Sparkle,
  Cookie,
  Target,
  Users,
  PaintBrush,
  CurrencyCircleDollar,
  Moon,
  Scales,
  SunHorizon,
  Briefcase,
  UsersThree,
  ArrowLeft,
  ShareNetwork,
  BookmarkSimple,
} from '@phosphor-icons/react'

// ---------------------------------------------------------------------------
// Translations
// ---------------------------------------------------------------------------

const gt = {
  en: {
    title: 'Mantra Generator',
    subtitle: 'Generate personalized mantras from your Human Design chart',
    step1: 'Choose Topic',
    step2: 'Generating',
    step3: 'Your Mantras',
    hdSummary: 'Your Design: Generator 2/4 · Sacral Authority',
    profileIncomplete: 'Complete your HD Profile in Settings to get personalized mantras.',
    goToSettings: 'Go to Settings',
    generateBtn: 'Generate Mantras',
    selectTopic: 'Select a topic to continue',
    generating1: 'Reading your Human Design chart...',
    generating2: 'Analyzing your open centers...',
    generating3: 'Crafting personalized mantras...',
    resultsTitle: 'mantras for',
    generateAgain: 'Generate Again',
    saveToCollection: 'Save to Collection',
    share: 'Share',
    saved: 'Saved to collection',
    savedDesc: 'Your mantra set has been saved successfully.',
    linkCopied: 'Link copied to clipboard!',
    topics: {
      cravings: 'Cravings & Habits',
      productivity: 'Productivity & Focus',
      relationships: 'Relationships & Boundaries',
      creative: 'Creative Blocks',
      money: 'Money & Resources',
      rest: 'Rest & Recovery',
      decisions: 'Decision-Making',
      selfWorth: 'Self-Worth',
      career: 'Career Transitions',
      solitude: 'Solitude & Social Energy',
    },
  },
  ar: {
    title: 'مولّد التأملات',
    subtitle: 'أنشئ تأملات مخصصة من مخطط تصميمك البشري',
    step1: 'اختر الموضوع',
    step2: 'جارٍ الإنشاء',
    step3: 'تأملاتك',
    hdSummary: 'تصميمك: مولّد ٢/٤ · سلطة عجزية',
    profileIncomplete: 'أكمل ملف التصميم البشري في الإعدادات للحصول على تأملات مخصصة.',
    goToSettings: 'الذهاب إلى الإعدادات',
    generateBtn: 'إنشاء التأملات',
    selectTopic: 'اختر موضوعاً للمتابعة',
    generating1: 'جارٍ قراءة مخطط تصميمك البشري...',
    generating2: 'جارٍ تحليل مراكزك المفتوحة...',
    generating3: 'جارٍ صياغة تأملات مخصصة...',
    resultsTitle: 'تأملات عن',
    generateAgain: 'إنشاء مجدداً',
    saveToCollection: 'حفظ في مجموعة',
    share: 'مشاركة',
    saved: 'تم الحفظ في المجموعة',
    savedDesc: 'تم حفظ مجموعة التأملات بنجاح.',
    linkCopied: 'تم نسخ الرابط!',
    topics: {
      cravings: 'الرغبات والعادات',
      productivity: 'الإنتاجية والتركيز',
      relationships: 'العلاقات والحدود',
      creative: 'العوائق الإبداعية',
      money: 'المال والموارد',
      rest: 'الراحة والاستشفاء',
      decisions: 'اتخاذ القرارات',
      selfWorth: 'تقدير الذات',
      career: 'التحولات المهنية',
      solitude: 'العزلة والطاقة الاجتماعية',
    },
  },
}

// ---------------------------------------------------------------------------
// Topic data
// ---------------------------------------------------------------------------

const topics = [
  { id: 'cravings', icon: Cookie, key: 'cravings' as const },
  { id: 'productivity', icon: Target, key: 'productivity' as const },
  { id: 'relationships', icon: Users, key: 'relationships' as const },
  { id: 'creative', icon: PaintBrush, key: 'creative' as const },
  { id: 'money', icon: CurrencyCircleDollar, key: 'money' as const },
  { id: 'rest', icon: Moon, key: 'rest' as const },
  { id: 'decisions', icon: Scales, key: 'decisions' as const },
  { id: 'selfWorth', icon: SunHorizon, key: 'selfWorth' as const },
  { id: 'career', icon: Briefcase, key: 'career' as const },
  { id: 'solitude', icon: UsersThree, key: 'solitude' as const },
]

// ---------------------------------------------------------------------------
// Mock mantras (for Self-Worth topic, adapted for Generator 2/4)
// ---------------------------------------------------------------------------

interface Mantra {
  mantra: string
  mantraAr: string
  explanation: string
  explanationAr: string
  hdElement: string
  hdElementAr: string
}

const mockMantras: Mantra[] = [
  {
    mantra: 'My Sacral knowing is instant. If I have to convince myself, the answer is no.',
    mantraAr: 'معرفتي العجزية فورية. إذا اضطررت لإقناع نفسي، فالجواب لا.',
    explanation: 'Your Sacral Authority works in the moment — a gut response that needs no reasoning. When you find yourself building a case for something, that\'s your mind overriding your body. The real answer came already.',
    explanationAr: 'سلطتك العجزية تعمل في اللحظة — استجابة حشوية لا تحتاج تبريراً. عندما تجد نفسك تبني حجة لشيء ما، فذلك عقلك يتجاوز جسدك. الجواب الحقيقي جاء بالفعل.',
    hdElement: 'Sacral Authority',
    hdElementAr: 'السلطة العجزية',
  },
  {
    mantra: 'I don\'t need to prove my worth. My aura does it for me when I wait.',
    mantraAr: 'لا أحتاج لإثبات قيمتي. هالتي تفعل ذلك عني عندما أنتظر.',
    explanation: 'As a Generator, your enveloping aura naturally draws the right opportunities. The 2nd line in your 2/4 profile means you have natural gifts others see before you do. Chasing recognition is your Not-Self speaking.',
    explanationAr: 'كمولّد، هالتك الشاملة تجذب الفرص المناسبة بشكل طبيعي. الخط الثاني في ملفك ٢/٤ يعني أن لديك مواهب طبيعية يراها الآخرون قبلك. السعي وراء التقدير هو صوت اللا-ذات.',
    hdElement: 'Profile 2/4',
    hdElementAr: 'الملف الشخصي ٢/٤',
  },
  {
    mantra: 'My frustration is a compass, not a verdict. It tells me where I\'m not responding.',
    mantraAr: 'إحباطي بوصلة وليس حكماً. يخبرني أين لا أستجيب.',
    explanation: 'Frustration is the Generator\'s Not-Self theme — it signals you\'re initiating instead of waiting to respond. When you feel it around self-worth, ask: "Am I trying to make something happen that hasn\'t asked for me yet?"',
    explanationAr: 'الإحباط هو موضوع اللا-ذات للمولّد — يشير إلى أنك تبادر بدلاً من انتظار الاستجابة. عندما تشعر به حول تقدير الذات، اسأل: "هل أحاول أن أجعل شيئاً يحدث لم يطلبني بعد؟"',
    hdElement: 'Not-Self Theme',
    hdElementAr: 'موضوع اللا-ذات',
  },
  {
    mantra: 'My open Head and Ajna are not confused. They are wise.',
    mantraAr: 'رأسي وأجناي المفتوحان ليسا مشوشين. هما حكيمان.',
    explanation: 'With undefined Head and Ajna centers, you absorb mental pressure from everyone around you. You might think you need to figure everything out to be worthy. You don\'t. Your wisdom is knowing which questions matter — not having all the answers.',
    explanationAr: 'مع مركزي الرأس والأجنا غير المحددين، تمتص الضغط الذهني من كل من حولك. قد تعتقد أنك بحاجة لمعرفة كل شيء لتكون جديراً. لست كذلك. حكمتك هي معرفة أي الأسئلة مهمة — لا امتلاك كل الأجوبة.',
    hdElement: 'Open Head & Ajna',
    hdElementAr: 'الرأس والأجنا المفتوحان',
  },
  {
    mantra: 'I am here to respond to life, not to perform for it.',
    mantraAr: 'أنا هنا لأستجيب للحياة، لا لأؤدي عرضاً لها.',
    explanation: 'The 2nd line is the Hermit — naturally talented but needing alone time. When you feel pressure to constantly show up and prove yourself, you\'re operating from the 4th line\'s network without the 2nd line\'s retreat. Worth isn\'t earned through visibility.',
    explanationAr: 'الخط الثاني هو الناسك — موهوب بطبيعته لكنه يحتاج وقتاً وحده. عندما تشعر بضغط للظهور المستمر وإثبات نفسك، فأنت تعمل من شبكة الخط الرابع دون انسحاب الخط الثاني. القيمة لا تُكتسب بالظهور.',
    hdElement: 'Line 2 — The Hermit',
    hdElementAr: 'الخط ٢ — الناسك',
  },
  {
    mantra: 'My defined Throat gives me a voice. I choose when to use it.',
    mantraAr: 'حلقي المحدد يمنحني صوتاً. أنا أختار متى أستخدمه.',
    explanation: 'With a defined Throat center, you have consistent access to expression and manifestation. But the Generator strategy says: wait to respond before speaking. Your worth isn\'t in how much you say — it\'s in the power of what comes through when you\'re genuinely lit up.',
    explanationAr: 'مع مركز حلق محدد، لديك وصول ثابت للتعبير والإظهار. لكن استراتيجية المولّد تقول: انتظر الاستجابة قبل التحدث. قيمتك ليست في كثرة ما تقوله — بل في قوة ما يخرج عندما تكون مشتعلاً حقاً.',
    hdElement: 'Defined Throat',
    hdElementAr: 'الحلق المحدد',
  },
  {
    mantra: 'Channel 20-34 gives me presence through action, not through effort.',
    mantraAr: 'قناة ٢٠-٣٤ تمنحني الحضور من خلال الفعل، لا من خلال الجهد.',
    explanation: 'The Channel of Charisma (20-34) connects your Sacral power to the Throat. When you\'re in response, your doing is magnetic — people notice without you trying. Self-worth issues arise when you force the charisma instead of letting it flow from genuine response.',
    explanationAr: 'قناة الكاريزما (٢٠-٣٤) تربط قوتك العجزية بالحلق. عندما تكون في استجابة، فعلك مغناطيسي — الناس يلاحظون دون أن تحاول. مشاكل تقدير الذات تنشأ عندما تفرض الكاريزما بدلاً من تركها تتدفق من الاستجابة الحقيقية.',
    hdElement: 'Channel 20-34',
    hdElementAr: 'قناة ٢٠-٣٤',
  },
  {
    mantra: 'My body is the authority. My mind is the passenger.',
    mantraAr: 'جسدي هو السلطة. عقلي هو الراكب.',
    explanation: 'Gate 34 — Power of the Great — gives you raw, available energy. But that power is only correct when your Sacral says yes. Every time you override your gut to do what you think you should, you trade authentic power for approval. Choose the gut. Every time.',
    explanationAr: 'البوابة ٣٤ — قوة العظمة — تمنحك طاقة خام متاحة. لكن تلك القوة صحيحة فقط عندما يقول عجزك نعم. في كل مرة تتجاوز حدسك لتفعل ما تعتقد أنه يجب، تستبدل القوة الأصيلة بالقبول. اختر الحدس. دائماً.',
    hdElement: 'Gate 34 — Power',
    hdElementAr: 'البوابة ٣٤ — القوة',
  },
]

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

type Phase = 'select' | 'generating' | 'results'

export default function MyMantrasMantrasPage() {
  const { locale, direction } = useDirection()
  const isRTL = direction === 'rtl'
  const h = gt[locale]
  const { toast } = useToast()

  const [phase, setPhase] = React.useState<Phase>('select')
  const [selectedTopic, setSelectedTopic] = React.useState<string | null>(null)
  const [generatingMsg, setGeneratingMsg] = React.useState(0)
  const [firstMantraStreaming, setFirstMantraStreaming] = React.useState(true)
  const timeoutsRef = React.useRef<NodeJS.Timeout[]>([])

  const currentStep = phase === 'select' ? 0 : phase === 'generating' ? 1 : 2

  const steps: Step[] = [
    { id: 'select', title: h.step1, titleAr: h.step1 },
    { id: 'generating', title: h.step2, titleAr: h.step2 },
    { id: 'results', title: h.step3, titleAr: h.step3 },
  ]

  const clearTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
  }

  const handleGenerate = () => {
    if (!selectedTopic) return
    clearTimeouts()
    setPhase('generating')
    setGeneratingMsg(0)

    const t1 = setTimeout(() => setGeneratingMsg(1), 1500)
    const t2 = setTimeout(() => setGeneratingMsg(2), 3000)
    const t3 = setTimeout(() => {
      setFirstMantraStreaming(true)
      setPhase('results')
    }, 4000)
    timeoutsRef.current = [t1, t2, t3]
  }

  const handleGenerateAgain = () => {
    clearTimeouts()
    setPhase('select')
    setSelectedTopic(null)
    setFirstMantraStreaming(true)
  }

  const handleStepClick = (step: number) => {
    if (step === 0 && phase === 'results') {
      handleGenerateAgain()
    }
  }

  React.useEffect(() => {
    return () => clearTimeouts()
  }, [])

  const generatingMessages = [h.generating1, h.generating2, h.generating3]

  const topicLabel = selectedTopic ? h.topics[selectedTopic as keyof typeof h.topics] : ''

  return (
    <div className="container py-8 max-w-4xl">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-4 bg-primary/10 rounded-xl">
          <Sparkle className="h-10 w-10 text-primary" weight="duotone" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{h.title}</h1>
          <p className="text-muted-foreground">{h.subtitle}</p>
        </div>
      </div>

      {/* Stepper */}
      <div className="mb-8">
        <Stepper
          steps={steps}
          currentStep={currentStep}
          onStepClick={handleStepClick}
        />
      </div>

      {/* Phase 1: Topic Selection */}
      {phase === 'select' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {topics.map((topic) => {
              const Icon = topic.icon
              const isSelected = selectedTopic === topic.id
              return (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic.id)}
                  className={`p-4 rounded-xl border-2 text-center transition-all hover:shadow-sm ${
                    isSelected
                      ? 'border-primary bg-primary/5 shadow-sm'
                      : 'border-border hover:border-primary/30'
                  }`}
                >
                  <Icon className={`h-8 w-8 mx-auto mb-2 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} weight="duotone" />
                  <span className="text-sm font-medium block">{h.topics[topic.key]}</span>
                </button>
              )
            })}
          </div>

          <Callout type="info" title={h.hdSummary}>
            <Link href="/examples/mymantras/settings" className="text-sm text-primary hover:underline">
              {h.goToSettings}
            </Link>
          </Callout>

          <div className="text-center">
            <Button
              size="lg"
              onClick={handleGenerate}
              disabled={!selectedTopic}
              className="gap-2"
            >
              <Sparkle className="h-5 w-5" />
              {h.generateBtn}
            </Button>
            {!selectedTopic && (
              <p className="text-sm text-muted-foreground mt-2">{h.selectTopic}</p>
            )}
          </div>
        </div>
      )}

      {/* Phase 2: Generating */}
      {phase === 'generating' && (
        <div className="flex flex-col items-center justify-center py-20 space-y-6">
          <ThinkingIndicator variant="wave" size="lg" />
          <p className="text-lg text-muted-foreground animate-pulse">
            {generatingMessages[generatingMsg]}
          </p>
        </div>
      )}

      {/* Phase 3: Results */}
      {phase === 'results' && (
        <div className="space-y-6">
          {/* Results header */}
          <div className="flex items-center gap-2 mb-4">
            <Badge>{topicLabel}</Badge>
            <h2 className="text-lg font-semibold">
              {isRTL ? `٨ ${h.resultsTitle} ${topicLabel}` : `8 ${h.resultsTitle} ${topicLabel}`}
            </h2>
          </div>

          {/* Mantras */}
          <div className="max-w-3xl mx-auto space-y-6">
            {mockMantras.map((m, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="shrink-0 mt-1">
                      {isRTL ? new Intl.NumberFormat('ar', { numberingSystem: 'arab' }).format(i + 1) : i + 1}
                    </Badge>
                    <div className="space-y-3 min-w-0">
                      {/* Mantra text */}
                      <div className="text-lg font-semibold italic">
                        {i === 0 && firstMantraStreaming ? (
                          <StreamingText
                            text={`"${isRTL ? m.mantraAr : m.mantra}"`}
                            speed={20}
                            showCursor
                            isStreaming
                            onComplete={() => setFirstMantraStreaming(false)}
                          />
                        ) : (
                          <span style={{ opacity: i === 0 || !firstMantraStreaming ? 1 : 0 }}>
                            &ldquo;{isRTL ? m.mantraAr : m.mantra}&rdquo;
                          </span>
                        )}
                      </div>

                      {/* Explanation (only show after streaming completes or if not first) */}
                      {(i === 0 ? !firstMantraStreaming : !firstMantraStreaming) && (
                        <>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {isRTL ? m.explanationAr : m.explanation}
                          </p>
                          <Badge variant="secondary" className="text-xs">
                            {isRTL ? m.hdElementAr : m.hdElement}
                          </Badge>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <Button variant="outline" onClick={handleGenerateAgain} className="gap-2">
              <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
              {h.generateAgain}
            </Button>
            <Button
              onClick={() => toast({ title: h.saved, description: h.savedDesc, variant: 'success' })}
              className="gap-2"
            >
              <BookmarkSimple className="h-4 w-4" />
              {h.saveToCollection}
            </Button>
            <Button
              variant="ghost"
              onClick={() => toast({ title: h.linkCopied, variant: 'success' })}
              className="gap-2"
            >
              <ShareNetwork className="h-4 w-4" />
              {h.share}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
