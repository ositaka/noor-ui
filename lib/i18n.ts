/**
 * Internationalization content
 * Real, meaningful Arabic content for the GCC market
 */

export type Locale = 'en' | 'ar'

export const content = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      components: 'Components',
      tokens: 'Design Tokens',
      themes: 'Themes',
      documentation: 'Documentation',
      getStarted: 'Get Started',
    },

    // Homepage
    home: {
      hero: {
        title: 'RTL-First Design System',
        subtitle: 'Built for the GCC market. Arabic and English, equal citizens.',
        description: 'A comprehensive, modern design system with full bilingual support. 91 accessible components, 4 beautiful themes, perfect RTL mirroring.',
        cta: {
          primary: 'Explore Components',
          secondary: 'View Documentation',
        },
      },
      features: {
        title: 'Everything You Need',
        subtitle: 'Production-ready components for modern web applications',
        items: [
          {
            title: '91 Components',
            description: 'Complete UI toolkit from buttons to complex data tables',
          },
          {
            title: 'True Bilingual',
            description: 'RTL-first architecture with perfect Arabic support',
          },
          {
            title: 'Accessible',
            description: 'WCAG AA compliant with full keyboard navigation',
          },
          {
            title: '4 Themes',
            description: 'From minimal to artistic, all from the same tokens',
          },
          {
            title: 'Token-Based',
            description: 'Customize everything through design tokens',
          },
          {
            title: 'Modern Stack',
            description: 'Built with Next.js 14, TypeScript, and Tailwind CSS',
          },
        ],
      },
      showcase: {
        title: 'See It In Action',
        subtitle: 'Interactive components that work perfectly in both directions',
      },
    },

    // Common UI
    ui: {
      button: {
        submit: 'Submit',
        cancel: 'Cancel',
        save: 'Save',
        delete: 'Delete',
        edit: 'Edit',
        close: 'Close',
        confirm: 'Confirm',
        back: 'Back',
        next: 'Next',
        previous: 'Previous',
        loading: 'Loading...',
        copy: 'Copy',
        copied: 'Copied!',
        tryIt: 'Try it live',
      },
      form: {
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        phone: 'Phone Number',
        address: 'Address',
        city: 'City',
        country: 'Country',
        message: 'Message',
        search: 'Search',
        filter: 'Filter',
        sort: 'Sort',
        required: 'Required',
        optional: 'Optional',
        placeholder: 'Enter text...',
      },
      status: {
        success: 'Success',
        error: 'Error',
        warning: 'Warning',
        info: 'Information',
        loading: 'Loading',
        pending: 'Pending',
        completed: 'Completed',
        failed: 'Failed',
      },
      accessibility: {
        menu: 'Menu',
        closeMenu: 'Close menu',
        openMenu: 'Open menu',
        skipToContent: 'Skip to main content',
        toggleTheme: 'Toggle theme',
        toggleDirection: 'Toggle text direction',
        increaseTextSize: 'Increase text size',
        decreaseTextSize: 'Decrease text size',
      },
    },

    // Documentation
    docs: {
      installation: 'Installation',
      usage: 'Usage',
      examples: 'Examples',
      props: 'Props',
      accessibility: 'Accessibility',
      rtl: 'RTL Considerations',
      relatedComponents: 'Related Components',
      propsTable: {
        name: 'Name',
        type: 'Type',
        default: 'Default',
        required: 'Required',
        description: 'Description',
      },
      codeBlock: {
        copy: 'Copy code',
        copied: 'Copied!',
        expand: 'Expand',
        collapse: 'Collapse',
      },
    },

    // Themes
    themes: {
      title: 'Themes',
      description: 'Choose from 4 beautiful themes, all powered by the same design tokens',
      switch: 'Switch Theme',
      lightMode: 'Light Mode',
      darkMode: 'Dark Mode',
    },

    // GCC-specific
    gcc: {
      hijriDate: 'Hijri Date',
      gregorianDate: 'Gregorian Date',
      prayerTimes: 'Prayer Times',
      fajr: 'Fajr',
      dhuhr: 'Dhuhr',
      asr: 'Asr',
      maghrib: 'Maghrib',
      isha: 'Isha',
    },
  },

  ar: {
    // التنقل
    nav: {
      home: 'الرئيسية',
      components: 'المكونات',
      tokens: 'رموز التصميم',
      themes: 'السمات',
      documentation: 'التوثيق',
      getStarted: 'ابدأ الآن',
    },

    // الصفحة الرئيسية
    home: {
      hero: {
        title: 'نظام تصميم بتوجه عربي أولاً',
        subtitle: 'مبني لسوق دول الخليج. العربية والإنجليزية، مواطنون متساوون.',
        description: 'نظام تصميم شامل وحديث مع دعم كامل للغتين. 91 مكوّن قابل للوصول، 4 سمات جميلة، انعكاس مثالي لاتجاه النص.',
        cta: {
          primary: 'استكشف المكونات',
          secondary: 'اطّلع على التوثيق',
        },
      },
      features: {
        title: 'كل ما تحتاجه',
        subtitle: 'مكونات جاهزة للإنتاج لتطبيقات الويب الحديثة',
        items: [
          {
            title: '91 مكوّن',
            description: 'مجموعة أدوات واجهة مستخدم كاملة من الأزرار إلى جداول البيانات المعقدة',
          },
          {
            title: 'ثنائي اللغة حقيقي',
            description: 'بنية ذات توجه عربي أولاً مع دعم مثالي للعربية',
          },
          {
            title: 'قابل للوصول',
            description: 'متوافق مع معايير WCAG AA مع تنقل كامل بلوحة المفاتيح',
          },
          {
            title: '4 سمات',
            description: 'من البسيط إلى الفني، كلها من نفس الرموز',
          },
          {
            title: 'قائم على الرموز',
            description: 'خصص كل شيء من خلال رموز التصميم',
          },
          {
            title: 'تقنيات حديثة',
            description: 'مبني باستخدام Next.js 14 و TypeScript و Tailwind CSS',
          },
        ],
      },
      showcase: {
        title: 'شاهده عملياً',
        subtitle: 'مكونات تفاعلية تعمل بشكل مثالي في كلا الاتجاهين',
      },
    },

    // واجهة المستخدم العامة
    ui: {
      button: {
        submit: 'إرسال',
        cancel: 'إلغاء',
        save: 'حفظ',
        delete: 'حذف',
        edit: 'تعديل',
        close: 'إغلاق',
        confirm: 'تأكيد',
        back: 'رجوع',
        next: 'التالي',
        previous: 'السابق',
        loading: 'جارٍ التحميل...',
        copy: 'نسخ',
        copied: 'تم النسخ!',
        tryIt: 'جرّبه مباشرة',
      },
      form: {
        firstName: 'الاسم الأول',
        lastName: 'اسم العائلة',
        email: 'البريد الإلكتروني',
        password: 'كلمة المرور',
        confirmPassword: 'تأكيد كلمة المرور',
        phone: 'رقم الهاتف',
        address: 'العنوان',
        city: 'المدينة',
        country: 'الدولة',
        message: 'الرسالة',
        search: 'بحث',
        filter: 'تصفية',
        sort: 'ترتيب',
        required: 'مطلوب',
        optional: 'اختياري',
        placeholder: 'أدخل النص...',
      },
      status: {
        success: 'نجح',
        error: 'خطأ',
        warning: 'تحذير',
        info: 'معلومات',
        loading: 'جارٍ التحميل',
        pending: 'قيد الانتظار',
        completed: 'مكتمل',
        failed: 'فشل',
      },
      accessibility: {
        menu: 'القائمة',
        closeMenu: 'إغلاق القائمة',
        openMenu: 'فتح القائمة',
        skipToContent: 'الانتقال إلى المحتوى الرئيسي',
        toggleTheme: 'تبديل السمة',
        toggleDirection: 'تبديل اتجاه النص',
        increaseTextSize: 'تكبير حجم النص',
        decreaseTextSize: 'تصغير حجم النص',
      },
    },

    // التوثيق
    docs: {
      installation: 'التثبيت',
      usage: 'الاستخدام',
      examples: 'أمثلة',
      props: 'الخصائص',
      accessibility: 'إمكانية الوصول',
      rtl: 'اعتبارات اتجاه النص من اليمين لليسار',
      relatedComponents: 'مكونات ذات صلة',
      propsTable: {
        name: 'الاسم',
        type: 'النوع',
        default: 'الافتراضي',
        required: 'مطلوب',
        description: 'الوصف',
      },
      codeBlock: {
        copy: 'نسخ الكود',
        copied: 'تم النسخ!',
        expand: 'توسيع',
        collapse: 'طي',
      },
    },

    // السمات
    themes: {
      title: 'السمات',
      description: 'اختر من بين 4 سمات جميلة، كلها مدعومة بنفس رموز التصميم',
      switch: 'تبديل السمة',
      lightMode: 'الوضع الفاتح',
      darkMode: 'الوضع الداكن',
    },

    // خاص بدول الخليج
    gcc: {
      hijriDate: 'التاريخ الهجري',
      gregorianDate: 'التاريخ الميلادي',
      prayerTimes: 'مواقيت الصلاة',
      fajr: 'الفجر',
      dhuhr: 'الظهر',
      asr: 'العصر',
      maghrib: 'المغرب',
      isha: 'العشاء',
    },
  },
} as const

/**
 * Get translation based on current locale
 */
export function t(locale: Locale, path: string): string {
  const keys = path.split('.')
  let value: any = content[locale]

  for (const key of keys) {
    value = value?.[key]
    if (value === undefined) {
      console.warn(`Translation missing for: ${path} (${locale})`)
      return path
    }
  }

  return value as string
}

/**
 * Get current locale from document
 */
export function getCurrentLocale(): Locale {
  if (typeof document === 'undefined') return 'en'
  return document.documentElement.lang === 'ar' ? 'ar' : 'en'
}

/**
 * Set locale and direction
 */
export function setLocale(locale: Locale) {
  if (typeof document === 'undefined') return

  document.documentElement.lang = locale
  document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr'
}
