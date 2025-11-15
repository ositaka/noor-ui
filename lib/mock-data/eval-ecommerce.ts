// Mock data for E-commerce Customer Support Agent Evaluation

export interface EvalResult {
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
    intent?: string
    sentiment?: string
    tokensUsed?: number
  }
}

export const ecommerceEvalResults: EvalResult[] = [
  {
    id: 'ec-001',
    testCase: 'Product Return Request',
    input: 'I want to return the shoes I bought last week. They don\'t fit.',
    expected: 'Provide return policy (30 days), request order number, explain return process',
    actual: 'I understand you\'d like to return your shoes. Our return policy allows returns within 30 days. Could you please provide your order number so I can assist you with the return process?',
    score: 95,
    passed: true,
    latency: 1240,
    language: 'en',
    timestamp: '2024-11-15T10:23:45Z',
    metadata: {
      intent: 'return_request',
      sentiment: 'neutral',
      tokensUsed: 87
    }
  },
  {
    id: 'ec-002',
    testCase: 'Shipping Delay Complaint',
    input: 'My order is 3 days late. This is unacceptable!',
    expected: 'Apologize, check tracking, offer compensation or expedited shipping',
    actual: 'I sincerely apologize for the delay. Let me check your tracking information. I can see there was a delay at the distribution center. I\'ll prioritize your shipment.',
    score: 72,
    passed: false,
    latency: 1180,
    language: 'en',
    timestamp: '2024-11-15T10:25:12Z',
    metadata: {
      intent: 'complaint',
      sentiment: 'negative',
      tokensUsed: 94
    }
  },
  {
    id: 'ec-003',
    testCase: 'طلب استرجاع منتج',
    input: 'أريد إرجاع الحذاء الذي اشتريته الأسبوع الماضي. لا يناسبني.',
    expected: 'توفير سياسة الإرجاع (30 يوم)، طلب رقم الطلب، شرح عملية الإرجاع',
    actual: 'أتفهم رغبتك في إرجاع الحذاء. تسمح سياسة الإرجاع لدينا بالإرجاع خلال 30 يوماً. هل يمكنك تزويدي برقم طلبك حتى أتمكن من مساعدتك في عملية الإرجاع؟',
    score: 98,
    passed: true,
    latency: 1320,
    language: 'ar',
    timestamp: '2024-11-15T10:27:33Z',
    metadata: {
      intent: 'return_request',
      sentiment: 'neutral',
      tokensUsed: 112
    }
  },
  {
    id: 'ec-004',
    testCase: 'Product Availability Check',
    input: 'Is the blue jacket in size M available?',
    expected: 'Check inventory, provide availability status, offer alternatives if out of stock',
    actual: 'Yes, the blue jacket in size M is currently in stock! Would you like me to help you place an order?',
    score: 88,
    passed: true,
    latency: 890,
    language: 'en',
    timestamp: '2024-11-15T10:29:18Z',
    metadata: {
      intent: 'product_inquiry',
      sentiment: 'positive',
      tokensUsed: 62
    }
  },
  {
    id: 'ec-005',
    testCase: 'استفسار عن طرق الدفع',
    input: 'هل تقبلون الدفع عند الاستلام؟',
    expected: 'شرح طرق الدفع المتاحة، تأكيد توفر الدفع عند الاستلام، ذكر أي رسوم إضافية',
    actual: 'نعم، نوفر خدمة الدفع عند الاستلام في معظم المناطق. هل تريد التحقق من توفرها في منطقتك؟',
    score: 85,
    passed: true,
    latency: 1050,
    language: 'ar',
    timestamp: '2024-11-15T10:31:42Z',
    metadata: {
      intent: 'payment_inquiry',
      sentiment: 'neutral',
      tokensUsed: 78
    }
  },
  {
    id: 'ec-006',
    testCase: 'Discount Code Issue',
    input: 'The discount code SAVE20 is not working!',
    expected: 'Validate code, check expiry and conditions, apply manually or provide alternative',
    actual: 'I apologize for the inconvenience. Let me check the discount code SAVE20 for you. It appears this code expired yesterday. However, I can offer you code SAVE15 which gives you 15% off and is valid until the end of the month.',
    score: 92,
    passed: true,
    latency: 1420,
    language: 'en',
    timestamp: '2024-11-15T10:34:09Z',
    metadata: {
      intent: 'discount_issue',
      sentiment: 'negative',
      tokensUsed: 105
    }
  },
  {
    id: 'ec-007',
    testCase: 'Order Status Inquiry',
    input: 'Where is my order #ORD-12345?',
    expected: 'Look up order, provide current status and location, give estimated delivery',
    actual: 'Your order #ORD-12345 is currently in transit and should arrive by tomorrow, November 16th. It\'s currently at the distribution center in your city.',
    score: 100,
    passed: true,
    latency: 980,
    language: 'en',
    timestamp: '2024-11-15T10:36:22Z',
    metadata: {
      intent: 'order_tracking',
      sentiment: 'neutral',
      tokensUsed: 71
    }
  },
  {
    id: 'ec-008',
    testCase: 'شكوى جودة المنتج',
    input: 'المنتج الذي استلمته معيب. الجودة سيئة جداً!',
    expected: 'الاعتذار، طلب صور المنتج، تقديم استبدال أو استرجاع كامل المبلغ',
    actual: 'أعتذر بشدة عن هذه التجربة السيئة. هل يمكنك إرسال صور للمنتج المعيب؟ سأقوم فوراً بترتيب استبدال أو استرجاع كامل المبلغ حسب رغبتك.',
    score: 96,
    passed: true,
    latency: 1280,
    language: 'ar',
    timestamp: '2024-11-15T10:38:55Z',
    metadata: {
      intent: 'quality_complaint',
      sentiment: 'negative',
      tokensUsed: 98
    }
  }
]

export const ecommerceMetrics = {
  totalTests: 8,
  passed: 7,
  failed: 1,
  accuracy: 87.5,
  avgLatency: 1170,
  avgScore: 90.8,
  costPer1k: 0.42,
  languages: {
    en: 5,
    ar: 3
  },
  intents: {
    return_request: 2,
    complaint: 2,
    product_inquiry: 1,
    payment_inquiry: 1,
    discount_issue: 1,
    order_tracking: 1
  }
}

export const ecommerceAgentInfo = {
  name: 'E-commerce Support Agent',
  model: 'GPT-4-Turbo',
  version: '1.2.0',
  languages: ['English', 'Arabic'],
  lastEvaluated: '2024-11-15T10:40:00Z',
  status: 'production'
}
