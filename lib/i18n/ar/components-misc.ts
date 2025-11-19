/**
 * AR translations - components-misc
 * Auto-generated from lib/i18n.ts
 */

export const components_misc = {
avatarComponent: {
      title: 'الصورة الرمزية',
      description: 'عرض صور ملف تعريف المستخدم مع احتياطي تلقائي للأحرف الأولى. يدعم أحجام متعددة واتجاه نص RTL للأحرف الأولى.',
      preview: 'معاينة',
      installation: 'التثبيت',
      usage: 'الاستخدام',
      examples: {
        title: 'أمثلة',
        withImage: 'مع صورة',
        withInitials: 'مع احتياطي للأحرف الأولى',
        sizes: 'الأحجام',
        shapes: 'الأشكال',
      },
      props: {
        title: 'الخصائص',
        src: 'عنوان URL لمصدر الصورة',
        alt: 'نص بديل للصورة',
        size: 'حجم الصورة الرمزية',
        className: 'فئات CSS إضافية للتطبيق',
      },
      accessibility: {
        title: 'إمكانية الوصول',
      },
      rtl: {
        title: 'اعتبارات RTL',
        description: 'تتكيف الأحرف الأولى للصورة الرمزية تلقائياً مع اتجاه نص RTL.',
      },
    },

alertComponent: {
      title: 'التنبيه',
      description: 'عرض رسائل وإشعارات مهمة. يدعم أشكال متعددة مع أيقونات ودعم كامل لـ RTL.',
      preview: 'معاينة',
      installation: 'التثبيت',
      usage: 'الاستخدام',
      examples: {
        title: 'أمثلة',
        variants: 'الأشكال',
        withIcon: 'مع أيقونات',
        withTitle: 'مع عنوان',
        dismissible: 'قابل للإغلاق',
      },
      props: {
        title: 'الخصائص',
        variant: 'شكل النمط البصري للتنبيه',
        className: 'فئات CSS إضافية للتطبيق',
      },
      accessibility: {
        title: 'إمكانية الوصول',
      },
      rtl: {
        title: 'اعتبارات RTL',
        description: 'تدعم التنبيهات تلقائياً تخطيط RTL مع محاذاة صحيحة للأيقونات والنص.',
      },
    },

stepperComponent: {
      title: 'مؤشر الخطوات',
      description: 'مؤشر تقدم متعدد الخطوات للنماذج والأسواق',
      actions: {
        previous: 'السابق',
        next: 'التالي',
      },
      variants: {
        simpleVariant: 'الشكل البسيط',
        simpleDesc: 'شكل مضغوط مثالي للتنقل في الأعلى',
        circlesVariant: 'شكل الدوائر',
        circlesDesc: 'دوائر كبيرة مع تأثير تكبير',
        verticalOrientation: 'الاتجاه الرأسي',
      },
      useCases: {
        registrationForms: 'نماذج التسجيل',
        checkoutProcess: 'عمليات الدفع',
        setupWizards: 'معالجات الإعداد',
        multiStepWorkflows: 'سير العمل متعدد الخطوات',
      },
      features: {
        threeVariants: 'ثلاثة أشكال مرئية (افتراضي، بسيط، دوائر)',
        orientations: 'اتجاه أفقي ورأسي',
        clickableSteps: 'خطوات قابلة للنقر مع التحقق',
        optionalSteps: 'دعم الخطوات الاختيارية',
        visualStates: 'حالات مرئية (مكتمل، حالي، قادم)',
        bilingualSupport: 'دعم ثنائي اللغة كامل',
        rtlSupport: 'دعم RTL/LTR',
        accessibility: 'ميزات إمكانية الوصول (ARIA)',
      },
    },
}
