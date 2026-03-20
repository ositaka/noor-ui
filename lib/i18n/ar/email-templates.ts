/**
 * AR translations - email templates
 */

export const email_templates = {
  emailTemplates: {
    title: 'قوالب البريد الإلكتروني',
    subtitle: 'قوالب MJML جاهزة للإنتاج مع دعم كامل للعربية والإنجليزية وثنائية اللغة.',
    description: 'قوالب HTML جاهزة للنسخ للبريد الإلكتروني التجاري والنشرات الإخبارية والإشعارات. مُصمَّمة بألوان Noor UI وقابلة للتخصيص.',
    filters: {
      all: 'جميع القوالب',
      transactional: 'المعاملات',
      auth: 'المصادقة',
      notifications: 'الإشعارات',
      marketing: 'التسويق',
      industry: 'القطاعات',
    },
    variants: {
      ltr: 'إنجليزي (LTR)',
      rtl: 'عربي (RTL)',
      bilingual: 'ثنائي اللغة',
    },
    device: {
      desktop: 'سطح المكتب',
      mobile: 'الجوال',
    },
    theme: {
      label: 'السمة',
    },
    actions: {
      copyHtml: 'نسخ HTML',
      copied: 'تم النسخ!',
      downloadHtml: 'تنزيل HTML',
      back: 'العودة إلى القوالب',
      preview: 'معاينة',
    },
    templates: {
      // المعاملات
      'order-confirmation': {
        name: 'تأكيد الطلب',
        description: 'ملخص الطلب مع صور المنتجات وعنوان الشحن وموعد التسليم.',
      },
      'shipping-update': {
        name: 'تحديث الشحن',
        description: 'إشعار حالة التوصيل مع رقم التتبع وموعد الوصول المتوقع.',
      },
      'invoice-receipt': {
        name: 'الفاتورة والإيصال',
        description: 'فاتورة مفصّلة مع بنود وحساب الضريبة ومعلومات الدفع.',
      },
      'banking-transfer-receipt': {
        name: 'إيصال التحويل البنكي',
        description: 'تأكيد التحويل مع بيانات المرسل والمستفيد ورقم المرجع.',
      },
      'hotel-booking-confirmation': {
        name: 'تأكيد حجز الفندق',
        description: 'تفاصيل الحجز مع صورة الفندق والتواريخ وتفصيل الأسعار.',
      },
      'payment-reminder': {
        name: 'تذكير بالدفع',
        description: 'إشعار دفع مستحق مع المبلغ وشارة الموعد وزر الدفع.',
      },
      // المصادقة
      'welcome-onboarding': {
        name: 'الترحيب والتعريف',
        description: 'ترحيب بالمستخدمين الجدد مع إبراز الميزات وزر البدء.',
      },
      'password-reset': {
        name: 'إعادة تعيين كلمة المرور',
        description: 'إعادة تعيين آمنة مع مؤقت انتهاء الصلاحية ومعلومات الأمان.',
      },
      'otp-verification': {
        name: 'رمز التحقق',
        description: 'عرض رمز التحقق المكوّن من 6 أرقام مع عد تنازلي.',
      },
      // الإشعارات
      'notification-alert': {
        name: 'إشعار تنبيه',
        description: 'تنبيه مختصر مع شريط حالة ملوّن وزر إجراء.',
      },
      'healthcare-appointment-reminder': {
        name: 'تذكير بالموعد الطبي',
        description: 'تفاصيل الموعد مع معلومات الطبيب وتعليمات التحضير.',
      },
      'education-assignment-notification': {
        name: 'إشعار واجب دراسي',
        description: 'تنبيه بواجب جديد مع تاريخ التسليم واسم المعلم والوصف.',
      },
      'support-ticket': {
        name: 'تذكرة الدعم',
        description: 'تأكيد التذكرة مع رقم المرجع والأولوية ووقت الاستجابة.',
      },
      // التسويق
      'newsletter': {
        name: 'النشرة الإخبارية',
        description: 'تصميم تحريري مع صورة رئيسية ومقال مميز وشبكة مقالات.',
      },
      'event-invitation': {
        name: 'دعوة حدث',
        description: 'تفاصيل الحدث مع التاريخ والمكان والمتحدث وزر الحضور.',
      },
      'feedback-request': {
        name: 'طلب تقييم',
        description: 'تقييم ما بعد الخدمة مع نجوم التصنيف وزر المراجعة.',
      },
      // القطاعات
      'real-estate-viewing-confirmation': {
        name: 'معاينة عقار',
        description: 'تأكيد المعاينة مع تفاصيل العقار ومعلومات الوكيل والعنوان.',
      },
      'marketplace-order-notification': {
        name: 'طلب السوق',
        description: 'إشعار للبائع بطلب جديد مع تفاصيل المنتج وموعد الشحن.',
      },
      'government-service-confirmation': {
        name: 'خدمة حكومية',
        description: 'تأكيد طلب الخدمة مع رقم التتبع ووقت المعالجة.',
      },
      'esports-tournament-registration': {
        name: 'تسجيل بطولة',
        description: 'تأكيد تسجيل الرياضات الإلكترونية مع تفاصيل الفريق والجوائز.',
      },
      'islamic-finance-zakat-receipt': {
        name: 'إيصال الزكاة',
        description: 'إيصال دفع الزكاة مع تفصيل الحساب ومعلومات التوزيع.',
      },
    },
  },
}
