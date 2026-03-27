'use client'

import * as React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { ArabicNumber } from '@/components/ui/arabic-number'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { useDirection } from '@/components/providers/direction-provider'
import { useToast } from '@/hooks/use-toast'
import { GearSix, Coins, X, CaretUpDown, Check } from '@phosphor-icons/react'

// ---------------------------------------------------------------------------
// Translations
// ---------------------------------------------------------------------------

const gt = {
  en: {
    title: 'Settings',
    subtitle: 'Manage your profile and Human Design chart',
    credits: 'Credits',
    creditsBalance: 'Current Balance',
    creditsInfo: 'Credits are used to generate personalized mantras. Each mantra set costs 3 credits.',
    coreDesign: 'Core Design',
    coreDesignDesc: 'Your fundamental Human Design type and strategy',
    type: 'Type',
    typePlaceholder: 'Select your type',
    strategy: 'Strategy',
    strategyAuto: 'Auto-filled from Type',
    notSelfTheme: 'Not-Self Theme',
    notSelfAuto: 'Auto-filled from Type',
    profileAuth: 'Profile & Authority',
    profileAuthDesc: 'Your profile lines and decision-making authority',
    profile: 'Profile',
    profilePlaceholder: 'Select your profile',
    authority: 'Authority',
    authorityPlaceholder: 'Select your authority',
    definition: 'Definition',
    definitionPlaceholder: 'Select your definition',
    gatesCross: 'Gates & Cross',
    gatesCrossDesc: 'Your Sun/Earth gates and Incarnation Cross',
    sunGate: 'Sun Gate',
    earthGate: 'Earth Gate',
    gatePlaceholder: 'Select a gate',
    incarnationCross: 'Incarnation Cross',
    incarnationCrossPlaceholder: 'e.g. Right Angle Cross of the Sphinx',
    centers: 'Centers',
    centersDesc: 'Your defined and open energy centers',
    definedCenters: 'Defined Centers',
    openCenters: 'Open Centers',
    openCentersAuto: 'Auto-derived from defined centers',
    channels: 'Channels',
    channelsDesc: 'Your defined channels connecting energy centers',
    definedChannels: 'Defined Channels',
    channelsPlaceholder: 'Search channels...',
    noChannelsFound: 'No channels found.',
    selectChannels: 'Select channels',
    clearAll: 'Clear All',
    saveChanges: 'Save Changes',
    saved: 'Profile saved',
    savedDesc: 'Your Human Design profile has been updated successfully.',
    cleared: 'Profile cleared',
    clearedDesc: 'All Human Design fields have been reset.',
    optional: 'Optional',
  },
  ar: {
    title: 'الإعدادات',
    subtitle: 'إدارة ملفك الشخصي ومخطط التصميم البشري',
    credits: 'الرصيد',
    creditsBalance: 'الرصيد الحالي',
    creditsInfo: 'يُستخدم الرصيد لإنشاء تأملات مخصصة. كل مجموعة تأملات تكلف ٣ أرصدة.',
    coreDesign: 'التصميم الأساسي',
    coreDesignDesc: 'نوع التصميم البشري الأساسي واستراتيجيتك',
    type: 'النوع',
    typePlaceholder: 'اختر نوعك',
    strategy: 'الاستراتيجية',
    strategyAuto: 'تُعبّأ تلقائياً من النوع',
    notSelfTheme: 'موضوع اللا-ذات',
    notSelfAuto: 'يُعبّأ تلقائياً من النوع',
    profileAuth: 'الملف الشخصي والسلطة',
    profileAuthDesc: 'خطوط ملفك الشخصي وسلطة اتخاذ القرار',
    profile: 'الملف الشخصي',
    profilePlaceholder: 'اختر ملفك الشخصي',
    authority: 'السلطة',
    authorityPlaceholder: 'اختر سلطتك',
    definition: 'التعريف',
    definitionPlaceholder: 'اختر تعريفك',
    gatesCross: 'البوابات والصليب',
    gatesCrossDesc: 'بوابات الشمس/الأرض وصليب التجسد',
    sunGate: 'بوابة الشمس',
    earthGate: 'بوابة الأرض',
    gatePlaceholder: 'اختر بوابة',
    incarnationCross: 'صليب التجسد',
    incarnationCrossPlaceholder: 'مثال: صليب الزاوية اليمنى لأبو الهول',
    centers: 'المراكز',
    centersDesc: 'مراكز الطاقة المحددة والمفتوحة لديك',
    definedCenters: 'المراكز المحددة',
    openCenters: 'المراكز المفتوحة',
    openCentersAuto: 'تُشتق تلقائياً من المراكز المحددة',
    channels: 'القنوات',
    channelsDesc: 'قنواتك المحددة التي تربط مراكز الطاقة',
    definedChannels: 'القنوات المحددة',
    channelsPlaceholder: 'ابحث عن القنوات...',
    noChannelsFound: 'لم يتم العثور على قنوات.',
    selectChannels: 'اختر القنوات',
    clearAll: 'مسح الكل',
    saveChanges: 'حفظ التغييرات',
    saved: 'تم حفظ الملف الشخصي',
    savedDesc: 'تم تحديث ملف التصميم البشري بنجاح.',
    cleared: 'تم مسح الملف الشخصي',
    clearedDesc: 'تمت إعادة تعيين جميع حقول التصميم البشري.',
    optional: 'اختياري',
  },
}

// ---------------------------------------------------------------------------
// HD Data Options
// ---------------------------------------------------------------------------

const hdTypes = [
  { value: 'manifestor', en: 'Manifestor', ar: 'المُظهر' },
  { value: 'generator', en: 'Generator', ar: 'المولّد' },
  { value: 'manifesting-generator', en: 'Manifesting Generator', ar: 'المولّد المُظهر' },
  { value: 'projector', en: 'Projector', ar: 'المُسقِط' },
  { value: 'reflector', en: 'Reflector', ar: 'العاكس' },
]

const typeToStrategy: Record<string, { en: string; ar: string }> = {
  manifestor: { en: 'Inform', ar: 'الإبلاغ' },
  generator: { en: 'Wait to Respond', ar: 'انتظار الاستجابة' },
  'manifesting-generator': { en: 'Wait to Respond', ar: 'انتظار الاستجابة' },
  projector: { en: 'Wait for Invitation', ar: 'انتظار الدعوة' },
  reflector: { en: 'Wait for Lunar Cycle', ar: 'انتظار الدورة القمرية' },
}

const typeToNotSelf: Record<string, { en: string; ar: string }> = {
  manifestor: { en: 'Anger', ar: 'الغضب' },
  generator: { en: 'Frustration', ar: 'الإحباط' },
  'manifesting-generator': { en: 'Frustration', ar: 'الإحباط' },
  projector: { en: 'Bitterness', ar: 'المرارة' },
  reflector: { en: 'Disappointment', ar: 'خيبة الأمل' },
}

const hdProfiles = [
  '1/3', '1/4', '2/4', '2/5', '3/5', '3/6', '4/6', '4/1', '5/1', '5/2', '6/2', '6/3',
]

const hdAuthorities = [
  { value: 'emotional', en: 'Emotional', ar: 'عاطفي' },
  { value: 'sacral', en: 'Sacral', ar: 'عجزي' },
  { value: 'splenic', en: 'Splenic', ar: 'طحالي' },
  { value: 'ego-manifested', en: 'Ego Manifested', ar: 'الأنا المتجلية' },
  { value: 'ego-projected', en: 'Ego Projected', ar: 'الأنا المُسقَطة' },
  { value: 'self-projected', en: 'Self-Projected', ar: 'إسقاط ذاتي' },
  { value: 'lunar', en: 'Lunar', ar: 'قمري' },
  { value: 'environmental', en: 'Environmental (Mental)', ar: 'بيئي (ذهني)' },
  { value: 'none', en: 'None', ar: 'بدون' },
]

const hdDefinitions = [
  { value: 'single', en: 'Single', ar: 'مفرد' },
  { value: 'split', en: 'Split', ar: 'منقسم' },
  { value: 'triple-split', en: 'Triple Split', ar: 'منقسم ثلاثي' },
  { value: 'quadruple-split', en: 'Quadruple Split', ar: 'منقسم رباعي' },
  { value: 'no-definition', en: 'No Definition', ar: 'بدون تعريف' },
]

const allCenters = [
  { id: 'head', en: 'Head', ar: 'الرأس' },
  { id: 'ajna', en: 'Ajna', ar: 'الأجنا' },
  { id: 'throat', en: 'Throat', ar: 'الحلق' },
  { id: 'g-center', en: 'G-Center', ar: 'مركز الذات' },
  { id: 'heart', en: 'Heart/Will', ar: 'القلب/الإرادة' },
  { id: 'sacral', en: 'Sacral', ar: 'العجز' },
  { id: 'solar-plexus', en: 'Solar Plexus', ar: 'الضفيرة الشمسية' },
  { id: 'spleen', en: 'Spleen', ar: 'الطحال' },
  { id: 'root', en: 'Root', ar: 'الجذر' },
]

const gates = [
  { num: 1, en: 'Self-Expression', ar: 'التعبير عن الذات' },
  { num: 2, en: 'Direction of the Self', ar: 'اتجاه الذات' },
  { num: 3, en: 'Ordering', ar: 'الترتيب' },
  { num: 4, en: 'Formulization', ar: 'الصياغة' },
  { num: 5, en: 'Fixed Rhythms', ar: 'الإيقاعات الثابتة' },
  { num: 6, en: 'Friction', ar: 'الاحتكاك' },
  { num: 7, en: 'The Role of the Self', ar: 'دور الذات' },
  { num: 8, en: 'Contribution', ar: 'المساهمة' },
  { num: 9, en: 'Focus', ar: 'التركيز' },
  { num: 10, en: 'Behavior of the Self', ar: 'سلوك الذات' },
  { num: 11, en: 'Ideas', ar: 'الأفكار' },
  { num: 12, en: 'Caution', ar: 'الحذر' },
  { num: 13, en: 'The Listener', ar: 'المستمع' },
  { num: 14, en: 'Power Skills', ar: 'مهارات القوة' },
  { num: 15, en: 'Extremes', ar: 'الأقصى' },
  { num: 16, en: 'Skills', ar: 'المهارات' },
  { num: 17, en: 'Opinions', ar: 'الآراء' },
  { num: 18, en: 'Correction', ar: 'التصحيح' },
  { num: 19, en: 'Wanting', ar: 'الرغبة' },
  { num: 20, en: 'Contemplation', ar: 'التأمل' },
  { num: 21, en: 'The Hunter', ar: 'الصياد' },
  { num: 22, en: 'Openness', ar: 'الانفتاح' },
  { num: 23, en: 'Assimilation', ar: 'الاستيعاب' },
  { num: 24, en: 'Rationalization', ar: 'العقلنة' },
  { num: 25, en: 'Innocence', ar: 'البراءة' },
  { num: 26, en: 'The Taming Power', ar: 'قوة الترويض' },
  { num: 27, en: 'Nourishment', ar: 'التغذية' },
  { num: 28, en: 'The Game Player', ar: 'اللاعب' },
  { num: 29, en: 'Perseverance', ar: 'المثابرة' },
  { num: 30, en: 'Feelings', ar: 'المشاعر' },
  { num: 31, en: 'Influence', ar: 'التأثير' },
  { num: 32, en: 'Continuity', ar: 'الاستمرارية' },
  { num: 33, en: 'Privacy', ar: 'الخصوصية' },
  { num: 34, en: 'Power of the Great', ar: 'قوة العظمة' },
  { num: 35, en: 'Change', ar: 'التغيير' },
  { num: 36, en: 'Crisis', ar: 'الأزمة' },
  { num: 37, en: 'Friendship', ar: 'الصداقة' },
  { num: 38, en: 'The Fighter', ar: 'المقاتل' },
  { num: 39, en: 'Provocation', ar: 'الاستفزاز' },
  { num: 40, en: 'Aloneness', ar: 'الوحدة' },
  { num: 41, en: 'Contraction', ar: 'الانكماش' },
  { num: 42, en: 'Growth', ar: 'النمو' },
  { num: 43, en: 'Insight', ar: 'البصيرة' },
  { num: 44, en: 'Alertness', ar: 'اليقظة' },
  { num: 45, en: 'The Gatherer', ar: 'الجامع' },
  { num: 46, en: 'Determination', ar: 'العزيمة' },
  { num: 47, en: 'Realization', ar: 'الإدراك' },
  { num: 48, en: 'Depth', ar: 'العمق' },
  { num: 49, en: 'Revolution', ar: 'الثورة' },
  { num: 50, en: 'Values', ar: 'القيم' },
  { num: 51, en: 'Shock', ar: 'الصدمة' },
  { num: 52, en: 'Stillness', ar: 'السكون' },
  { num: 53, en: 'Beginnings', ar: 'البدايات' },
  { num: 54, en: 'Ambition', ar: 'الطموح' },
  { num: 55, en: 'Spirit', ar: 'الروح' },
  { num: 56, en: 'Stimulation', ar: 'التحفيز' },
  { num: 57, en: 'Intuitive Insight', ar: 'البصيرة الحدسية' },
  { num: 58, en: 'Vitality', ar: 'الحيوية' },
  { num: 59, en: 'Sexuality', ar: 'الجنسانية' },
  { num: 60, en: 'Limitation', ar: 'القيد' },
  { num: 61, en: 'Mystery', ar: 'الغموض' },
  { num: 62, en: 'Details', ar: 'التفاصيل' },
  { num: 63, en: 'Doubt', ar: 'الشك' },
  { num: 64, en: 'Confusion', ar: 'الارتباك' },
]

const hdChannels = [
  { id: '1-8', en: '1-8 — Inspiration', ar: '١-٨ — الإلهام' },
  { id: '2-14', en: '2-14 — The Beat', ar: '٢-١٤ — النبض' },
  { id: '3-60', en: '3-60 — Mutation', ar: '٣-٦٠ — التحوّل' },
  { id: '4-63', en: '4-63 — Logic', ar: '٤-٦٣ — المنطق' },
  { id: '5-15', en: '5-15 — Rhythm', ar: '٥-١٥ — الإيقاع' },
  { id: '6-59', en: '6-59 — Intimacy', ar: '٦-٥٩ — العلاقة الحميمة' },
  { id: '7-31', en: '7-31 — The Alpha', ar: '٧-٣١ — القائد' },
  { id: '9-52', en: '9-52 — Concentration', ar: '٩-٥٢ — التركيز' },
  { id: '10-20', en: '10-20 — Awakening', ar: '١٠-٢٠ — اليقظة' },
  { id: '10-34', en: '10-34 — Exploration', ar: '١٠-٣٤ — الاستكشاف' },
  { id: '10-57', en: '10-57 — Perfected Form', ar: '١٠-٥٧ — الشكل المثالي' },
  { id: '11-56', en: '11-56 — Curiosity', ar: '١١-٥٦ — الفضول' },
  { id: '12-22', en: '12-22 — Openness', ar: '١٢-٢٢ — الانفتاح' },
  { id: '13-33', en: '13-33 — The Prodigal', ar: '١٣-٣٣ — الابن الضال' },
  { id: '16-48', en: '16-48 — The Wavelength', ar: '١٦-٤٨ — الطول الموجي' },
  { id: '17-62', en: '17-62 — Acceptance', ar: '١٧-٦٢ — القبول' },
  { id: '18-58', en: '18-58 — Judgment', ar: '١٨-٥٨ — الحكم' },
  { id: '19-49', en: '19-49 — Synthesis', ar: '١٩-٤٩ — التوليف' },
  { id: '20-34', en: '20-34 — Charisma', ar: '٢٠-٣٤ — الكاريزما' },
  { id: '20-57', en: '20-57 — The Brain Wave', ar: '٢٠-٥٧ — الموجة الدماغية' },
  { id: '21-45', en: '21-45 — Money Line', ar: '٢١-٤٥ — خط المال' },
  { id: '23-43', en: '23-43 — Structuring', ar: '٢٣-٤٣ — الهيكلة' },
  { id: '24-61', en: '24-61 — Awareness', ar: '٢٤-٦١ — الوعي' },
  { id: '25-51', en: '25-51 — Initiation', ar: '٢٥-٥١ — التدشين' },
  { id: '26-44', en: '26-44 — Surrender', ar: '٢٦-٤٤ — التسليم' },
  { id: '27-50', en: '27-50 — Preservation', ar: '٢٧-٥٠ — الحفظ' },
  { id: '28-38', en: '28-38 — Struggle', ar: '٢٨-٣٨ — الكفاح' },
  { id: '29-46', en: '29-46 — Discovery', ar: '٢٩-٤٦ — الاكتشاف' },
  { id: '30-41', en: '30-41 — Recognition', ar: '٣٠-٤١ — التقدير' },
  { id: '32-54', en: '32-54 — Transformation', ar: '٣٢-٥٤ — التحوّل' },
  { id: '34-57', en: '34-57 — Power', ar: '٣٤-٥٧ — القوة' },
  { id: '35-36', en: '35-36 — Transitoriness', ar: '٣٥-٣٦ — الزوال' },
  { id: '37-40', en: '37-40 — Community', ar: '٣٧-٤٠ — المجتمع' },
  { id: '39-55', en: '39-55 — Emoting', ar: '٣٩-٥٥ — العاطفة' },
  { id: '42-53', en: '42-53 — Maturation', ar: '٤٢-٥٣ — النضج' },
]

// ---------------------------------------------------------------------------
// Default profile (Layla's data)
// ---------------------------------------------------------------------------

const defaultProfile = {
  type: 'generator',
  profile: '2/4',
  authority: 'sacral',
  definition: 'single',
  sunGate: '34',
  earthGate: '20',
  incarnationCross: 'Right Angle Cross of the Sleeping Phoenix',
  definedCenters: ['sacral', 'throat', 'g-center'],
  definedChannels: ['20-34', '20-57'],
}

const emptyProfile = {
  type: '',
  profile: '',
  authority: '',
  definition: '',
  sunGate: '',
  earthGate: '',
  incarnationCross: '',
  definedCenters: [] as string[],
  definedChannels: [] as string[],
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function MyMantrasSettingsPage() {
  const { locale, direction } = useDirection()
  const isRTL = direction === 'rtl'
  const h = gt[locale]
  const { toast } = useToast()

  const [profile, setProfile] = React.useState(defaultProfile)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [channelsOpen, setChannelsOpen] = React.useState(false)

  // Auto-derive strategy and not-self theme
  const strategy = profile.type ? typeToStrategy[profile.type] : null
  const notSelf = profile.type ? typeToNotSelf[profile.type] : null

  // Auto-derive open centers
  const openCenters = allCenters.filter((c) => !profile.definedCenters.includes(c.id))

  const updateField = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const toggleCenter = (centerId: string) => {
    setProfile((prev) => ({
      ...prev,
      definedCenters: prev.definedCenters.includes(centerId)
        ? prev.definedCenters.filter((c) => c !== centerId)
        : [...prev.definedCenters, centerId],
    }))
  }

  const toggleChannel = (channelId: string) => {
    setProfile((prev) => ({
      ...prev,
      definedChannels: prev.definedChannels.includes(channelId)
        ? prev.definedChannels.filter((c) => c !== channelId)
        : [...prev.definedChannels, channelId],
    }))
  }

  const handleSave = async () => {
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 400))
    setIsSubmitting(false)
    toast({ title: h.saved, description: h.savedDesc, variant: 'success' })
  }

  const handleClear = () => {
    setProfile(emptyProfile)
    toast({ title: h.cleared, description: h.clearedDesc })
  }

  return (
    <div className="container py-8 max-w-3xl">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-4 bg-primary/10 rounded-xl">
          <GearSix className="h-10 w-10 text-primary" weight="duotone" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{h.title}</h1>
          <p className="text-muted-foreground">{h.subtitle}</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Credits Card */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            <Coins className="h-5 w-5 text-primary" />
            <div>
              <CardTitle className="text-base">{h.credits}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-bold"><ArabicNumber value={12} /></span>
              <span className="text-sm text-muted-foreground">{h.creditsBalance}</span>
            </div>
            <p className="text-sm text-muted-foreground">{h.creditsInfo}</p>
          </CardContent>
        </Card>

        <Separator />

        {/* Card 1: Core Design */}
        <Card>
          <CardHeader>
            <CardTitle>{h.coreDesign}</CardTitle>
            <CardDescription>{h.coreDesignDesc}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>{h.type}</Label>
              <Select value={profile.type} onValueChange={(v) => updateField('type', v)}>
                <SelectTrigger>
                  <SelectValue placeholder={h.typePlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  {hdTypes.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {isRTL ? t.ar : t.en}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>{h.strategy}</Label>
                <div className="h-9 flex items-center px-3 rounded-md border border-input bg-muted/50 text-sm">
                  {strategy ? (isRTL ? strategy.ar : strategy.en) : <span className="text-muted-foreground">{h.strategyAuto}</span>}
                </div>
              </div>
              <div className="space-y-2">
                <Label>{h.notSelfTheme}</Label>
                <div className="h-9 flex items-center px-3 rounded-md border border-input bg-muted/50 text-sm">
                  {notSelf ? (isRTL ? notSelf.ar : notSelf.en) : <span className="text-muted-foreground">{h.notSelfAuto}</span>}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Profile & Authority */}
        <Card>
          <CardHeader>
            <CardTitle>{h.profileAuth}</CardTitle>
            <CardDescription>{h.profileAuthDesc}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>{h.profile}</Label>
                <Select value={profile.profile} onValueChange={(v) => updateField('profile', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder={h.profilePlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {hdProfiles.map((p) => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{h.authority}</Label>
                <Select value={profile.authority} onValueChange={(v) => updateField('authority', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder={h.authorityPlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {hdAuthorities.map((a) => (
                      <SelectItem key={a.value} value={a.value}>
                        {isRTL ? a.ar : a.en}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>{h.definition}</Label>
              <Select value={profile.definition} onValueChange={(v) => updateField('definition', v)}>
                <SelectTrigger>
                  <SelectValue placeholder={h.definitionPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  {hdDefinitions.map((d) => (
                    <SelectItem key={d.value} value={d.value}>
                      {isRTL ? d.ar : d.en}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Gates & Cross */}
        <Card>
          <CardHeader>
            <CardTitle>{h.gatesCross}</CardTitle>
            <CardDescription>{h.gatesCrossDesc}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>{h.sunGate}</Label>
                <Select value={profile.sunGate} onValueChange={(v) => updateField('sunGate', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder={h.gatePlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {gates.map((g) => (
                      <SelectItem key={g.num} value={String(g.num)}>
                        {isRTL
                          ? `بوابة ${new Intl.NumberFormat('ar', { numberingSystem: 'arab' }).format(g.num)} — ${g.ar}`
                          : `Gate ${g.num} — ${g.en}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{h.earthGate}</Label>
                <Select value={profile.earthGate} onValueChange={(v) => updateField('earthGate', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder={h.gatePlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {gates.map((g) => (
                      <SelectItem key={g.num} value={String(g.num)}>
                        {isRTL
                          ? `بوابة ${new Intl.NumberFormat('ar', { numberingSystem: 'arab' }).format(g.num)} — ${g.ar}`
                          : `Gate ${g.num} — ${g.en}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>{h.incarnationCross}</Label>
                <span className="text-xs text-muted-foreground">{h.optional}</span>
              </div>
              <Input
                value={profile.incarnationCross}
                onChange={(e) => updateField('incarnationCross', e.target.value)}
                placeholder={h.incarnationCrossPlaceholder}
              />
            </div>
          </CardContent>
        </Card>

        {/* Card 4: Centers */}
        <Card>
          <CardHeader>
            <CardTitle>{h.centers}</CardTitle>
            <CardDescription>{h.centersDesc}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Label>{h.definedCenters}</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {allCenters.map((center) => (
                  <label
                    key={center.id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Checkbox
                      checked={profile.definedCenters.includes(center.id)}
                      onCheckedChange={() => toggleCenter(center.id)}
                    />
                    <span className="text-sm">{isRTL ? center.ar : center.en}</span>
                  </label>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>{h.openCenters}</Label>
              <p className="text-xs text-muted-foreground mb-2">{h.openCentersAuto}</p>
              <div className="flex flex-wrap gap-2">
                {openCenters.length > 0 ? (
                  openCenters.map((center) => (
                    <Badge key={center.id} variant="secondary">
                      {isRTL ? center.ar : center.en}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">—</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 5: Channels */}
        <Card>
          <CardHeader>
            <CardTitle>{h.channels}</CardTitle>
            <CardDescription>{h.channelsDesc}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Label>{h.definedChannels}</Label>

            {/* Selected channels as badges */}
            {profile.definedChannels.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {profile.definedChannels.map((chId) => {
                  const ch = hdChannels.find((c) => c.id === chId)
                  return (
                    <Badge key={chId} variant="secondary" className="gap-1">
                      {ch ? (isRTL ? ch.ar : ch.en) : chId}
                      <button
                        type="button"
                        onClick={() => toggleChannel(chId)}
                        className="ms-1 hover:text-destructive"
                        aria-label={`Remove ${chId}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )
                })}
              </div>
            )}

            {/* Channel multi-select */}
            <Popover open={channelsOpen} onOpenChange={setChannelsOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  role="combobox"
                  aria-expanded={channelsOpen}
                >
                  <span className="text-muted-foreground">{h.selectChannels}</span>
                  <CaretUpDown className="h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                <Command>
                  <CommandInput placeholder={h.channelsPlaceholder} />
                  <CommandList>
                    <CommandEmpty>{h.noChannelsFound}</CommandEmpty>
                    <CommandGroup>
                      {hdChannels.map((ch) => {
                        const isSelected = profile.definedChannels.includes(ch.id)
                        return (
                          <CommandItem
                            key={ch.id}
                            value={`${ch.en} ${ch.ar}`}
                            onSelect={() => toggleChannel(ch.id)}
                          >
                            <div className={`me-2 flex h-4 w-4 items-center justify-center rounded-sm border ${isSelected ? 'bg-primary border-primary text-primary-foreground' : 'border-muted-foreground/30'}`}>
                              {isSelected && <Check className="h-3 w-3" />}
                            </div>
                            {isRTL ? ch.ar : ch.en}
                          </CommandItem>
                        )
                      })}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex items-center justify-between pt-2">
          <Button variant="outline" onClick={handleClear}>
            {h.clearAll}
          </Button>
          <Button onClick={handleSave} loading={isSubmitting}>
            {h.saveChanges}
          </Button>
        </div>
      </div>
    </div>
  )
}
