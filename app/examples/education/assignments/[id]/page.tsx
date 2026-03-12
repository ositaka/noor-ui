'use client'

import * as React from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Callout } from '@/components/ui/callout'
import { Textarea } from '@/components/ui/textarea'
import { ButtonArrow } from '@/components/ui/button-arrow'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  GraduationCap,
  ClipboardText,
  Clock,
  CheckCircle,
  FileText,
  UploadSimple,
  DownloadSimple,
  Star,
  ChatCircle,
  CalendarBlank,
  User,
} from '@phosphor-icons/react'
import { useDirection } from '@/components/providers/direction-provider'
import { DirectionToggle } from '@/components/docs/direction-toggle'
import { content } from '@/lib/i18n'
import { toArabicNumerals } from '@/lib/arabic-numbers'

const ed = {
  en: {
    schoolName: 'Al Noor International School',
    mainNavigation: 'Main navigation',
    dashboard: 'Dashboard',
    grades: 'Grades',
    schedule: 'Schedule',
    assignments: 'Assignments',
    attendance: 'Attendance',
    teachers: 'Teachers',
    backToAssignments: 'Back to Assignments',
    instructions: 'Instructions',
    resources: 'Resources',
    submission: 'Submission',
    uploadFile: 'Upload File',
    submitAssignment: 'Submit Assignment',
    resubmit: 'Resubmit',
    submittedOn: 'Submitted on',
    fileName: 'File',
    teacherFeedback: 'Teacher Feedback',
    score: 'Score',
    dueDate: 'Due Date',
    subject: 'Subject',
    teacher: 'Teacher',
    status: 'Status',
    pending: 'Pending',
    submitted: 'Submitted',
    graded: 'Graded',
    daysRemaining: 'days remaining',
    grade: 'Grade',
    download: 'Download',
    wordCount: 'Word count requirement',
    rubric: 'Rubric hints',
    words: 'words',
  },
  ar: {
    schoolName: 'مدرسة النور الدولية',
    mainNavigation: 'التنقل الرئيسي',
    dashboard: 'لوحة التحكم',
    grades: 'الدرجات',
    schedule: 'الجدول',
    assignments: 'الواجبات',
    attendance: 'الحضور',
    teachers: 'المعلمون',
    backToAssignments: 'العودة للواجبات',
    instructions: 'التعليمات',
    resources: 'المراجع',
    submission: 'التسليم',
    uploadFile: 'رفع ملف',
    submitAssignment: 'تسليم الواجب',
    resubmit: 'إعادة التسليم',
    submittedOn: 'تم التسليم في',
    fileName: 'الملف',
    teacherFeedback: 'ملاحظات المعلم',
    score: 'الدرجة',
    dueDate: 'تاريخ التسليم',
    subject: 'المادة',
    teacher: 'المعلم',
    status: 'الحالة',
    pending: 'قيد الانتظار',
    submitted: 'تم التسليم',
    graded: 'تم التقييم',
    daysRemaining: 'أيام متبقية',
    grade: 'التقدير',
    download: 'تحميل',
    wordCount: 'عدد الكلمات المطلوب',
    rubric: 'معايير التقييم',
    words: 'كلمة',
  },
}

interface AssignmentDetail {
  id: string
  title: string
  titleAr: string
  subject: string
  subjectAr: string
  teacher: string
  teacherAr: string
  dueDate: string
  dueDateAr: string
  daysLeft: number
  status: 'pending' | 'submitted' | 'graded'
  category: string
  instructions: string
  instructionsAr: string
  wordCount?: number
  rubricHints: string[]
  rubricHintsAr: string[]
  resources: { name: string; nameAr: string; type: string }[]
  submittedFile?: string
  submittedDate?: string
  submittedDateAr?: string
  score?: number
  maxScore?: number
  gradeLabel?: string
  gradeLabelAr?: string
  feedback?: string
  feedbackAr?: string
}

const assignmentDetails: Record<string, AssignmentDetail> = {
  '1': {
    id: '1', title: 'Chapter 5 Exercises', titleAr: 'تمارين الفصل الخامس',
    subject: 'Mathematics', subjectAr: 'الرياضيات',
    teacher: 'Mr. Mohammed Al Otaibi', teacherAr: 'أ. محمد العتيبي',
    dueDate: 'March 14, 2026', dueDateAr: '١٤ مارس ٢٠٢٦', daysLeft: 2,
    status: 'pending', category: 'stem',
    instructions: 'Complete all exercises from Chapter 5: Quadratic Equations (pages 112-118). Show all work and steps for each problem. Use graph paper for plotting exercises.',
    instructionsAr: 'أكمل جميع تمارين الفصل الخامس: المعادلات التربيعية (الصفحات ١١٢-١١٨). أظهر جميع خطوات الحل لكل مسألة. استخدم ورق الرسم البياني للتمارين البيانية.',
    wordCount: undefined,
    rubricHints: ['Show complete working for each problem', 'Use correct mathematical notation', 'Graph all functions accurately', 'Include units where applicable'],
    rubricHintsAr: ['أظهر الحل الكامل لكل مسألة', 'استخدم الترميز الرياضي الصحيح', 'ارسم جميع الدوال بدقة', 'أضف الوحدات عند الحاجة'],
    resources: [
      { name: 'Chapter 5 Textbook PDF', nameAr: 'كتاب الفصل الخامس PDF', type: 'pdf' },
      { name: 'Formula Reference Sheet', nameAr: 'ورقة مرجعية للصيغ', type: 'pdf' },
    ],
  },
  '2': {
    id: '2', title: 'Lab Report: Optics', titleAr: 'تقرير مختبر: البصريات',
    subject: 'Physics', subjectAr: 'الفيزياء',
    teacher: 'Mr. Fahad Al Shammari', teacherAr: 'أ. فهد الشمري',
    dueDate: 'March 16, 2026', dueDateAr: '١٦ مارس ٢٠٢٦', daysLeft: 4,
    status: 'pending', category: 'stem',
    instructions: 'Write a complete lab report on the optics experiment conducted in class. Include hypothesis, methodology, data tables, calculations, results, and conclusion. Follow the lab report template provided.',
    instructionsAr: 'اكتب تقرير مختبر كاملاً عن تجربة البصريات التي أُجريت في الفصل. يشمل الفرضية والمنهجية وجداول البيانات والحسابات والنتائج والخاتمة. اتبع نموذج تقرير المختبر المقدم.',
    wordCount: 1500,
    rubricHints: ['Follow lab report format strictly', 'Include error analysis', 'Reference at least 3 sources', 'Include labeled diagrams'],
    rubricHintsAr: ['اتبع تنسيق تقرير المختبر بدقة', 'أضف تحليل الأخطاء', 'أشر إلى ٣ مراجع على الأقل', 'أضف رسومات توضيحية مُعنونة'],
    resources: [
      { name: 'Lab Report Template', nameAr: 'نموذج تقرير المختبر', type: 'docx' },
      { name: 'Experiment Data Sheet', nameAr: 'ورقة بيانات التجربة', type: 'xlsx' },
      { name: 'Optics Reference Guide', nameAr: 'دليل مرجعي للبصريات', type: 'pdf' },
    ],
  },
  '3': {
    id: '3', title: 'Essay: My Community', titleAr: 'مقال: مجتمعي',
    subject: 'Arabic Language', subjectAr: 'اللغة العربية',
    teacher: 'Ms. Noura Al Qahtani', teacherAr: 'أ. نورة القحطاني',
    dueDate: 'March 18, 2026', dueDateAr: '١٨ مارس ٢٠٢٦', daysLeft: 6,
    status: 'pending', category: 'languages',
    instructions: 'Write a descriptive essay about your community and its role in Saudi Vision 2030. Discuss the changes you have observed, the values that define your neighborhood, and your hopes for the future. Use formal Arabic and proper essay structure.',
    instructionsAr: 'اكتب مقالاً وصفياً عن مجتمعك ودوره في رؤية السعودية ٢٠٣٠. ناقش التغييرات التي لاحظتها والقيم التي تميز حيك وآمالك للمستقبل. استخدم اللغة العربية الفصحى وهيكل المقال الصحيح.',
    wordCount: 800,
    rubricHints: ['Formal Arabic (Fusha) required', 'Clear introduction, body, conclusion', 'Connect to Vision 2030 themes', 'Use at least 5 literary devices'],
    rubricHintsAr: ['مطلوب اللغة العربية الفصحى', 'مقدمة وعرض وخاتمة واضحة', 'اربط بمحاور رؤية ٢٠٣٠', 'استخدم ٥ أساليب أدبية على الأقل'],
    resources: [
      { name: 'Essay Structure Guide', nameAr: 'دليل هيكل المقال', type: 'pdf' },
    ],
  },
  '4': {
    id: '4', title: 'Book Report: Great Expectations', titleAr: 'تقرير كتاب: التوقعات الكبرى',
    subject: 'English Language', subjectAr: 'اللغة الإنجليزية',
    teacher: 'Ms. Sarah Al Ghamdi', teacherAr: 'أ. سارة الغامدي',
    dueDate: 'March 10, 2026', dueDateAr: '١٠ مارس ٢٠٢٦', daysLeft: -2,
    status: 'submitted', category: 'languages',
    instructions: 'Write a comprehensive book report on Great Expectations by Charles Dickens.',
    instructionsAr: 'اكتب تقرير كتاب شاملاً عن رواية التوقعات الكبرى لتشارلز ديكنز.',
    wordCount: 1000,
    rubricHints: ['Include character analysis', 'Discuss themes and motifs', 'Personal reflection section'],
    rubricHintsAr: ['أضف تحليل الشخصيات', 'ناقش المواضيع والدوافع', 'قسم التأمل الشخصي'],
    resources: [
      { name: 'Book Report Template', nameAr: 'نموذج تقرير الكتاب', type: 'docx' },
    ],
    submittedFile: 'book_report_great_expectations.pdf',
    submittedDate: 'March 9, 2026', submittedDateAr: '٩ مارس ٢٠٢٦',
  },
  '5': {
    id: '5', title: 'Python Project: Calculator', titleAr: 'مشروع بايثون: الآلة الحاسبة',
    subject: 'Computer Science', subjectAr: 'علوم الحاسب',
    teacher: 'Mr. Khalid Al Zahrani', teacherAr: 'أ. خالد الزهراني',
    dueDate: 'March 8, 2026', dueDateAr: '٨ مارس ٢٠٢٦', daysLeft: -4,
    status: 'submitted', category: 'stem',
    instructions: 'Build a calculator application in Python with GUI.',
    instructionsAr: 'أنشئ تطبيق آلة حاسبة بلغة بايثون مع واجهة رسومية.',
    rubricHints: ['Clean code with comments', 'Error handling', 'User-friendly interface'],
    rubricHintsAr: ['كود نظيف مع تعليقات', 'معالجة الأخطاء', 'واجهة سهلة الاستخدام'],
    resources: [],
    submittedFile: 'calculator_project.zip',
    submittedDate: 'March 7, 2026', submittedDateAr: '٧ مارس ٢٠٢٦',
  },
  '6': {
    id: '6', title: 'Surah Memorization: Al-Mulk', titleAr: 'حفظ سورة: الملك',
    subject: 'Islamic Studies', subjectAr: 'الدراسات الإسلامية',
    teacher: 'Mr. Abdullah Al Malki', teacherAr: 'أ. عبدالله المالكي',
    dueDate: 'March 5, 2026', dueDateAr: '٥ مارس ٢٠٢٦', daysLeft: -7,
    status: 'graded', category: 'islamic',
    instructions: 'Memorize and recite Surah Al-Mulk (30 verses). Assessment will include Tajweed rules accuracy and fluency.',
    instructionsAr: 'احفظ واتلُ سورة الملك (٣٠ آية). سيشمل التقييم دقة أحكام التجويد والطلاقة.',
    rubricHints: ['Perfect memorization', 'Correct Tajweed', 'Fluent recitation', 'Understanding of meanings'],
    rubricHintsAr: ['حفظ متقن', 'تجويد صحيح', 'تلاوة بطلاقة', 'فهم المعاني'],
    resources: [
      { name: 'Surah Al-Mulk Audio', nameAr: 'سورة الملك - صوت', type: 'mp3' },
      { name: 'Tajweed Rules Guide', nameAr: 'دليل أحكام التجويد', type: 'pdf' },
    ],
    submittedFile: 'recitation_al_mulk.mp3',
    submittedDate: 'March 4, 2026', submittedDateAr: '٤ مارس ٢٠٢٦',
    score: 95, maxScore: 100, gradeLabel: 'Excellent', gradeLabelAr: 'ممتاز',
    feedback: 'Excellent memorization and Tajweed! Minor hesitation in verses 22-24. Overall a very strong performance. Keep up the great work, Yousef.',
    feedbackAr: 'حفظ وتجويد ممتاز! تردد بسيط في الآيات ٢٢-٢٤. أداء قوي بشكل عام. واصل العمل الرائع يا يوسف.',
  },
  '7': {
    id: '7', title: 'AI Ethics Research Paper', titleAr: 'بحث أخلاقيات الذكاء الاصطناعي',
    subject: 'Artificial Intelligence', subjectAr: 'الذكاء الاصطناعي',
    teacher: 'Ms. Mona Al Subaie', teacherAr: 'أ. منى السبيعي',
    dueDate: 'March 3, 2026', dueDateAr: '٣ مارس ٢٠٢٦', daysLeft: -9,
    status: 'graded', category: 'stem',
    instructions: 'Write a research paper on AI ethics focusing on bias and fairness.',
    instructionsAr: 'اكتب بحثاً عن أخلاقيات الذكاء الاصطناعي مع التركيز على التحيز والعدالة.',
    wordCount: 2000,
    rubricHints: ['Academic writing style', 'Cite at least 5 sources', 'Include case studies', 'Propose solutions'],
    rubricHintsAr: ['أسلوب كتابة أكاديمي', 'استشهد بـ ٥ مصادر على الأقل', 'أضف دراسات حالة', 'اقترح حلولاً'],
    resources: [],
    submittedFile: 'ai_ethics_paper.pdf',
    submittedDate: 'March 2, 2026', submittedDateAr: '٢ مارس ٢٠٢٦',
    score: 88, maxScore: 100, gradeLabel: 'Very Good', gradeLabelAr: 'جيد جداً',
    feedback: 'Well-researched paper with strong arguments. The case studies were well chosen. Could improve by adding more local/regional AI examples from Saudi Arabia and the GCC. Good analysis of bias in facial recognition systems.',
    feedbackAr: 'بحث جيد بحجج قوية. دراسات الحالة كانت مختارة بعناية. يمكن التحسين بإضافة أمثلة محلية وإقليمية للذكاء الاصطناعي من السعودية والخليج. تحليل جيد للتحيز في أنظمة التعرف على الوجه.',
  },
}

const categoryColors: Record<string, string> = {
  stem: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
  languages: 'bg-green-500/10 text-green-700 dark:text-green-400',
  islamic: 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
  humanities: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
  other: 'bg-orange-500/10 text-orange-700 dark:text-orange-400',
}

export default function AssignmentDetailPage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const t = content[locale]
  const h = ed[locale]
  const params = useParams()
  const id = params.id as string

  const assignment = assignmentDetails[id] || assignmentDetails['1']

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/examples/education" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl hidden sm:inline">{h.schoolName}</span>
            </Link>
          </div>
          <nav aria-label={h.mainNavigation} className="flex items-center gap-1">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/examples/education/dashboard">{h.dashboard}</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/examples/education/grades">{h.grades}</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/examples/education/schedule">{h.schedule}</Link>
            </Button>
            <Button variant="ghost" size="sm" className="font-medium" asChild>
              <Link href="/examples/education/assignments">{h.assignments}</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/examples/education/attendance">{h.attendance}</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/examples/education/teachers">{h.teachers}</Link>
            </Button>
            <Separator orientation="vertical" className="mx-2 h-4" />
            <Button variant="outline" size="sm" asChild>
              <Link href="/examples">{t.nav.examples}</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="border-b bg-background">
        <div className="container py-3">
          <div className="flex items-center justify-between gap-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">{t.nav.home}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/examples">{t.nav.examples}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/examples/education">{h.schoolName}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/examples/education/assignments">{h.assignments}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{isRTL ? assignment.titleAr : assignment.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <DirectionToggle />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main id="main-content" className="container py-8 scroll-mt-16">
        {/* Back button */}
        <div className="mb-6">
          <ButtonArrow direction="back" variant="ghost" size="sm" asChild>
            <Link href="/examples/education/assignments">
              {h.backToAssignments}
            </Link>
          </ButtonArrow>
        </div>

        {/* Assignment Header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="secondary" className={categoryColors[assignment.category]}>
              {isRTL ? assignment.subjectAr : assignment.subject}
            </Badge>
            {assignment.status === 'pending' && (
              <Badge variant={assignment.daysLeft <= 2 ? 'destructive' : 'outline'}>
                <Clock className="h-3 w-3 me-1" />
                {assignment.daysLeft > 0 ? `${isRTL ? toArabicNumerals(assignment.daysLeft) : assignment.daysLeft} ${h.daysRemaining}` : h.status}
              </Badge>
            )}
            {assignment.status === 'submitted' && (
              <Badge variant="secondary">
                <CheckCircle className="h-3 w-3 me-1" />
                {h.submitted}
              </Badge>
            )}
            {assignment.status === 'graded' && assignment.score !== undefined && (
              <Badge variant="default">
                <Star className="h-3 w-3 me-1" />
                {isRTL ? `${toArabicNumerals(assignment.score!)}/${toArabicNumerals(assignment.maxScore!)}` : `${assignment.score}/${assignment.maxScore}`} — {isRTL ? assignment.gradeLabelAr : assignment.gradeLabel}
              </Badge>
            )}
          </div>

          <h1 className="text-3xl font-bold tracking-tight mb-1">
            {isRTL ? assignment.titleAr : assignment.title}
          </h1>
          <p className="text-lg text-muted-foreground" lang={isRTL ? 'en' : 'ar'}>
            {isRTL ? assignment.title : assignment.titleAr}
          </p>

          <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {isRTL ? assignment.teacherAr : assignment.teacher}
            </span>
            <span className="flex items-center gap-1">
              <CalendarBlank className="h-4 w-4" />
              {h.dueDate}: {isRTL ? assignment.dueDateAr : assignment.dueDate}
            </span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main content - 2/3 */}
          <div className="lg:col-span-2 space-y-6">
            {/* Instructions */}
            <Card>
              <CardHeader>
                <CardTitle>{h.instructions}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed">
                  {isRTL ? assignment.instructionsAr : assignment.instructions}
                </p>
                {assignment.wordCount && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    {h.wordCount}: {isRTL ? toArabicNumerals(assignment.wordCount!) : assignment.wordCount} {h.words}
                  </div>
                )}
                {assignment.rubricHints.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">{h.rubric}:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {(isRTL ? assignment.rubricHintsAr : assignment.rubricHints).map((hint, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                          {hint}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Resources */}
            {assignment.resources.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>{h.resources}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {assignment.resources.map((res, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-muted rounded-lg">
                            <FileText className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{isRTL ? res.nameAr : res.name}</p>
                            <p className="text-xs text-muted-foreground uppercase">{res.type}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <DownloadSimple className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Teacher Feedback (graded only) */}
            {assignment.status === 'graded' && assignment.feedback && (
              <Card className="border-primary/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ChatCircle className="h-5 w-5" />
                    {h.teacherFeedback}
                  </CardTitle>
                  <CardDescription>
                    {isRTL ? assignment.teacherAr : assignment.teacher}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">
                    {isRTL ? assignment.feedbackAr : assignment.feedback}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Submission section */}
            <Card>
              <CardHeader>
                <CardTitle>{h.submission}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {assignment.status === 'pending' && (
                  <>
                    <label
                      htmlFor="assignment-upload"
                      className="border-2 border-dashed rounded-lg p-6 text-center block cursor-pointer hover:bg-accent/50 transition-colors focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
                    >
                      <UploadSimple className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">{h.uploadFile}</p>
                      <input id="assignment-upload" type="file" className="sr-only" />
                    </label>
                    <Button className="w-full">
                      {h.submitAssignment}
                    </Button>
                  </>
                )}

                {(assignment.status === 'submitted' || assignment.status === 'graded') && (
                  <>
                    <Callout type="success" title={h.submitted}>
                      <p>{h.submittedOn}: {isRTL ? assignment.submittedDateAr : assignment.submittedDate}</p>
                      <p className="mt-1">{h.fileName}: {assignment.submittedFile}</p>
                    </Callout>
                    {assignment.status === 'submitted' && (
                      <Button variant="outline" className="w-full">
                        {h.resubmit}
                      </Button>
                    )}
                  </>
                )}

                {assignment.status === 'graded' && assignment.score !== undefined && (
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 text-center">
                    <p className="text-sm text-muted-foreground mb-1">{h.score}</p>
                    <p className="text-3xl font-bold text-primary">
                      {isRTL ? `${toArabicNumerals(assignment.score!)}/${toArabicNumerals(assignment.maxScore!)}` : `${assignment.score}/${assignment.maxScore}`}
                    </p>
                    <Badge variant="default" className="mt-2">
                      {isRTL ? assignment.gradeLabelAr : assignment.gradeLabel}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Assignment Info */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{h.subject}</span>
                  <span className="font-medium">{isRTL ? assignment.subjectAr : assignment.subject}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{h.teacher}</span>
                  <span className="font-medium">{isRTL ? assignment.teacherAr : assignment.teacher}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{h.dueDate}</span>
                  <span className="font-medium">{isRTL ? assignment.dueDateAr : assignment.dueDate}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{h.status}</span>
                  <Badge variant={
                    assignment.status === 'graded' ? 'default' :
                    assignment.status === 'submitted' ? 'secondary' : 'outline'
                  }>
                    {h[assignment.status]}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
