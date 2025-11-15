// Mock data for Islamic Services Assistant Agent Evaluation

export interface IslamicEvalResult {
  id: string
  testCase: string
  input: string
  expected: string
  actual: string
  score: number
  passed: boolean
  latency: number
  language: 'en' | 'ar'
  timestamp: string
  metadata?: {
    category?: 'prayer' | 'zakat' | 'hajj' | 'fasting' | 'general'
    calculationMethod?: string
    location?: string
    shariahCompliant?: boolean
    tokensUsed?: number
  }
}

export const islamicServicesEvalResults: IslamicEvalResult[] = [
  {
    id: 'is-001',
    testCase: 'Prayer Time Query - Riyadh',
    input: 'What time is Maghrib in Riyadh today?',
    expected: 'Provide accurate prayer time with calculation method cited (e.g., "5:43 PM using Umm Al-Qura method")',
    actual: 'Maghrib prayer time in Riyadh today is 5:43 PM (17:43). This is calculated using the Umm Al-Qura method, which is standard for Saudi Arabia.',
    score: 98,
    passed: true,
    latency: 680,
    language: 'en',
    timestamp: '2024-11-15T14:23:12Z',
    metadata: {
      category: 'prayer',
      calculationMethod: 'Umm Al-Qura',
      location: 'Riyadh, Saudi Arabia',
      shariahCompliant: true,
      tokensUsed: 72
    }
  },
  {
    id: 'is-002',
    testCase: 'اتجاه القبلة من جدة',
    input: 'ما هو اتجاه القبلة من جدة؟',
    expected: 'توفير الاتجاه الدقيق بالدرجات (حوالي 57.5° شمال شرق)',
    actual: 'اتجاه القبلة من جدة هو 57.5 درجة شمال شرق (057.5°). يمكنك استخدام البوصلة في هاتفك للتوجه نحو الكعبة المشرفة.',
    score: 100,
    passed: true,
    latency: 720,
    language: 'ar',
    timestamp: '2024-11-15T14:25:33Z',
    metadata: {
      category: 'prayer',
      location: 'Jeddah, Saudi Arabia',
      shariahCompliant: true,
      tokensUsed: 81
    }
  },
  {
    id: 'is-003',
    testCase: 'Zakat Calculation - Basic',
    input: 'How much Zakat do I pay on 100,000 SAR savings?',
    expected: 'Calculate 2.5% (2,500 SAR), mention Nisab threshold, confirm savings held for lunar year',
    actual: '2,500 SAR (2.5% of 100,000 SAR). Please note: Zakat is obligatory if your wealth exceeds the Nisab threshold and has been in your possession for a full lunar year.',
    score: 85,
    passed: true,
    latency: 890,
    language: 'en',
    timestamp: '2024-11-15T14:27:45Z',
    metadata: {
      category: 'zakat',
      shariahCompliant: true,
      tokensUsed: 94
    }
  },
  {
    id: 'is-004',
    testCase: 'Hajj Ritual Question',
    input: 'متى يبدأ رمي الجمرات في الحج؟',
    expected: 'يبدأ رمي الجمرات يوم النحر (10 ذو الحجة) بعد طلوع الشمس',
    actual: 'يبدأ رمي الجمرات يوم النحر (العاشر من ذي الحجة) بعد طلوع الشمس. يبدأ الحجاج برمي جمرة العقبة الكبرى بسبع حصيات.',
    score: 95,
    passed: true,
    latency: 810,
    language: 'ar',
    timestamp: '2024-11-15T14:29:18Z',
    metadata: {
      category: 'hajj',
      shariahCompliant: true,
      tokensUsed: 88
    }
  },
  {
    id: 'is-005',
    testCase: 'Ramadan Fasting - Medicine',
    input: 'Can I take medicine while fasting?',
    expected: 'Nuanced answer: generally breaks fast, but mention exceptions for illness, suggest consulting scholar',
    actual: 'Taking medicine orally generally breaks the fast. However, if you\'re ill, Islam permits you to break your fast for health reasons and make it up later. For specific situations, I recommend consulting a qualified Islamic scholar, as there are exceptions for medical necessity.',
    score: 90,
    passed: true,
    latency: 1120,
    language: 'en',
    timestamp: '2024-11-15T14:31:42Z',
    metadata: {
      category: 'fasting',
      shariahCompliant: true,
      tokensUsed: 102
    }
  },
  {
    id: 'is-006',
    testCase: 'Prayer Times - Multiple Cities',
    input: 'What time is Fajr in Dubai, Mecca, and Cairo?',
    expected: 'Provide accurate times for all three cities with timezone awareness',
    actual: 'Fajr prayer times today:\n- Dubai: 5:12 AM (GST)\n- Mecca: 5:18 AM (AST)\n- Cairo: 4:42 AM (EET)\n\nAll times use the Muslim World League calculation method.',
    score: 92,
    passed: true,
    latency: 950,
    language: 'en',
    timestamp: '2024-11-15T14:33:55Z',
    metadata: {
      category: 'prayer',
      calculationMethod: 'Muslim World League',
      shariahCompliant: true,
      tokensUsed: 96
    }
  },
  {
    id: 'is-007',
    testCase: 'حساب زكاة الذهب',
    input: 'عندي 150 جرام ذهب عيار 21، كم أدفع زكاة؟',
    expected: 'حساب النصاب (85 جرام)، تأكيد الحول، حساب الزكاة 2.5٪ على 150 جرام',
    actual: 'بما أن لديك 150 جراماً من الذهب وهذا يتجاوز النصاب (85 جراماً)، فالزكاة المستحقة هي 3.75 جرام ذهب (2.5٪ من 150 جرام). يجب أن يكون الذهب في حوزتك لمدة عام قمري كامل.',
    score: 97,
    passed: true,
    latency: 1050,
    language: 'ar',
    timestamp: '2024-11-15T14:36:22Z',
    metadata: {
      category: 'zakat',
      shariahCompliant: true,
      tokensUsed: 118
    }
  },
  {
    id: 'is-008',
    testCase: 'Wudu Validity Question',
    input: 'Does touching my phone break wudu?',
    expected: 'No, touching phone doesn\'t break wudu. List what does break wudu.',
    actual: 'No, touching your phone does not break wudu. Wudu is broken by: natural discharges, deep sleep, loss of consciousness, or touching private parts directly. Simple contact with objects like phones doesn\'t affect wudu.',
    score: 94,
    passed: true,
    latency: 780,
    language: 'en',
    timestamp: '2024-11-15T14:38:09Z',
    metadata: {
      category: 'general',
      shariahCompliant: true,
      tokensUsed: 85
    }
  },
  {
    id: 'is-009',
    testCase: 'Eid Date Prediction',
    input: 'When is Eid al-Fitr this year?',
    expected: 'Explain moon sighting dependency, give estimated date, mention regional variations',
    actual: 'Eid al-Fitr is expected around April 10, 2024, but the exact date depends on the sighting of the new moon. Different regions may celebrate on different days based on local moon sighting. Official announcements are usually made 1-2 days before.',
    score: 88,
    passed: true,
    latency: 920,
    language: 'en',
    timestamp: '2024-11-15T14:40:33Z',
    metadata: {
      category: 'general',
      shariahCompliant: true,
      tokensUsed: 91
    }
  },
  {
    id: 'is-010',
    testCase: 'أحكام السفر في رمضان',
    input: 'هل يجوز الإفطار للمسافر في رمضان؟',
    expected: 'نعم، يجوز مع شرح المسافة والشروط، والتذكير بالقضاء',
    actual: 'نعم، يُرخّص للمسافر الإفطار في رمضان. يُعتبر السفر الذي يبيح الإفطار حوالي 80 كم أو أكثر حسب معظم العلماء. يجب عليك قضاء الأيام التي أفطرتها بعد رمضان.',
    score: 93,
    passed: true,
    latency: 1080,
    language: 'ar',
    timestamp: '2024-11-15T14:42:45Z',
    metadata: {
      category: 'fasting',
      shariahCompliant: true,
      tokensUsed: 104
    }
  }
]

export const islamicServicesMetrics = {
  totalTests: 10,
  passed: 10,
  failed: 0,
  accuracy: 93.2,
  avgLatency: 900,
  avgScore: 93.2,
  costPer1k: 0.38,
  shariahCompliance: 100,
  languages: {
    en: 6,
    ar: 4
  },
  categories: {
    prayer: 3,
    zakat: 2,
    hajj: 1,
    fasting: 2,
    general: 2
  }
}

export const islamicServicesAgentInfo = {
  name: 'Islamic Services Assistant',
  model: 'GPT-4',
  version: '2.1.0',
  languages: ['English', 'Arabic'],
  specialization: 'Islamic Practices & Guidance',
  calculationMethods: ['Umm Al-Qura', 'Muslim World League', 'Egyptian General Authority'],
  lastEvaluated: '2024-11-15T14:45:00Z',
  status: 'production',
  reviewedBy: 'Islamic Advisory Board'
}
