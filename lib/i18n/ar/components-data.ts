/**
 * AR translations - components-data
 * Auto-generated from lib/i18n.ts
 */

export const components_data = {
tableComponent: {
      title: 'الجدول',
      description: 'مكون جدول متجاوب لعرض البيانات المنظمة مع دعم كامل لـ RTL. يستخدم HTML دلالي مع محاذاة نصية صحيحة للمحتوى ثنائي الاتجاه.',
      preview: 'معاينة',
      installation: 'التثبيت',
      usage: 'الاستخدام',
      compositionPattern: {
        title: 'نمط التركيب',
        description: 'يتبع مكون الجدول نمط تركيب مع سبعة مكونات فرعية:',
        table: 'الغلاف الرئيسي مع معالجة الفيضان',
        tableHeader: 'عنصر thead لرؤوس الأعمدة',
        tableBody: 'عنصر tbody لصفوف البيانات',
        tableRow: 'عنصر tr لصفوف الجدول',
        tableHead: 'عنصر th لخلايا الرأس (يستخدم text-start لـ RTL)',
        tableCell: 'عنصر td لخلايا البيانات',
        tableCaption: 'عنصر caption لوصف الجدول',
      },
      examples: {
        title: 'أمثلة',
        basic: 'جدول أساسي',
        withCaption: 'مع تعليق توضيحي',
        striped: 'صفوف مخططة',
        hoverable: 'صفوف قابلة للتمرير',
        withSelection: 'مع تحديد الصفوف',
        responsive: 'جدول متجاوب',
      },
      props: {
        title: 'الخصائص',
        className: 'فئات CSS إضافية للتطبيق',
        tableHeader: 'فئات CSS إضافية للتطبيق على thead',
        tableBody: 'فئات CSS إضافية للتطبيق على tbody',
        tableRow: 'فئات CSS إضافية للتطبيق على tr',
        tableHead: 'فئات CSS إضافية للتطبيق على th (يستخدم text-start لدعم RTL)',
        tableCell: 'فئات CSS إضافية للتطبيق على td',
        tableCaption: 'فئات CSS إضافية للتطبيق على caption',
      },
      demoContent: {
        caption: 'قائمة بالمستخدمين الحديثين',
        captionTransactions: 'قائمة بمعاملاتك الأخيرة',
        headers: {
          id: 'المعرف',
          name: 'الاسم',
          email: 'البريد الإلكتروني',
          role: 'الدور',
          status: 'الحالة',
          select: 'تحديد',
          amount: 'المبلغ',
          date: 'التاريخ',
        },
        sampleData: {
          john: 'جون دو',
          jane: 'جين سميث',
          mike: 'مايك جونسون',
          sarah: 'سارة ويلسون',
        },
        emails: {
          john: 'john@example.com',
          jane: 'jane@example.com',
          mike: 'mike@example.com',
          sarah: 'sarah@example.com',
        },
        roles: {
          admin: 'مسؤول',
          user: 'مستخدم',
          editor: 'محرر',
          viewer: 'مشاهد',
        },
        statuses: {
          active: 'نشط',
          inactive: 'غير نشط',
          pending: 'قيد الانتظار',
        },
      },
      accessibility: {
        title: 'إمكانية الوصول',
        useCaption: 'استخدم التعليقات التوضيحية دائماً',
        useCaptionDesc: 'استخدم TableCaption لتوفير سياق حول غرض الجدول. هذا ضروري لقارئات الشاشة.',
        semanticHTML: 'HTML دلالي',
        semanticHTMLDesc: 'استخدم TableHeader و TableBody و TableRow لإنشاء بنية جدول صحيحة يمكن للتقنيات المساعدة فهمها.',
        headerScope: 'نطاق الرأس',
        headerScopeDesc: 'تحتوي مكونات TableHead تلقائياً على سمة النطاق الصحيحة لإمكانية الوصول.',
        keyboardNav: 'التنقل بلوحة المفاتيح',
        keyboardNavDesc: 'إذا كان جدولك يحتوي على عناصر تفاعلية (مربعات اختيار، أزرار)، تأكد من إمكانية الوصول إليها بلوحة المفاتيح مع إدارة التركيز المناسبة.',
      },
      rtl: {
        title: 'اعتبارات RTL',
        description: 'تدعم الجداول تلقائياً تخطيط RTL. جميع محاذاة النص تستخدم text-start التي تتكيف تلقائياً مع اتجاه النص.',
        ltr: 'LTR (الإنجليزية)',
        rtlLabel: 'RTL (العربية)',
      },
      related: {
        title: 'المكونات ذات الصلة',
        dataTable: 'جدول البيانات',
        dataTableDesc: 'جدول متقدم مع الفرز والتصفية',
        badge: 'الشارة',
        badgeDesc: 'مؤشرات الحالة لخلايا الجدول',
        checkbox: 'مربع الاختيار',
        checkboxDesc: 'لتحديد الصفوف',
      },
    },

dataTableComponent: {
      title: 'جدول البيانات',
      breadcrumb: 'جدول البيانات',
      badge: 'محسّن',
      description: 'جدول بيانات قوي وغني بالميزات مع الفرز والتصفية والترقيم والاستجابة للأجهزة المحمولة. مثالي لعرض مجموعات البيانات المعقدة مع دعم RTL كامل.',
      sections: {
        basicUsage: 'الاستخدام الأساسي',
        features: 'الميزات',
        rtlConsiderations: 'اعتبارات RTL',
        relatedComponents: 'المكونات ذات الصلة',
      },
      features: {
        sortableColumns: {
          title: 'أعمدة قابلة للفرز',
          description: 'انقر على رؤوس الأعمدة للفرز مع مؤشرات متوافقة مع RTL',
        },
        searchFilter: {
          title: 'البحث والتصفية',
          description: 'بحث مدمج مع زر مسح وتصفية مخصصة',
        },
        pagination: {
          title: 'الترقيم',
          description: 'ترقيم متكامل لمجموعات البيانات الكبيرة',
        },
        loadingStates: {
          title: 'حالات التحميل',
          description: 'رسوم متحركة للتحميل أثناء جلب البيانات',
        },
        mobileResponsive: {
          title: 'متجاوب مع الأجهزة المحمولة',
          description: 'عرض بطاقات أو تمرير أفقي على الشاشات الصغيرة',
        },
        customCells: {
          title: 'خلايا مخصصة',
          description: 'عرض مكونات مخصصة في أي خلية',
        },
      },
      examples: {
        sortableColumns: 'أعمدة قابلة للفرز',
        sortableDescription: 'انقر على أي رأس عمود للفرز. انقر مرة أخرى للعكس، ومرة أخرى لإلغاء الفرز.',
        searchableTable: 'جدول قابل للبحث',
        paginatedTable: 'جدول مرقم',
        customCellRendering: 'عرض خلايا مخصصة',
        loadingState: 'حالة التحميل',
        completeExample: 'مثال كامل',
        completeDescription: 'جميع الميزات مجتمعة: الفرز والبحث والترقيم والخلايا المخصصة.',
      },
      buttons: {
        triggerLoadingState: 'تفعيل حالة التحميل',
        loading: 'جاري التحميل...',
      },
      props: {
        dataTableProps: 'خصائص DataTable',
        columnDefProps: 'خصائص ColumnDef',
      },
      accessibility: {
        semanticHtml: {
          title: 'HTML دلالي',
          description: 'مبني على مكون الجدول الدلالي مع عناصر thead و tbody و th و td المناسبة.',
        },
        keyboardNavigation: {
          title: 'التنقل بلوحة المفاتيح',
          description: 'رؤوس الأعمدة القابلة للفرز هي أزرار يمكن تنشيطها بمفاتيح Enter أو Space. حقل البحث قابل للوصول بالكامل بلوحة المفاتيح.',
        },
        screenReaders: {
          title: 'قارئات الشاشة',
          description: 'توفر مؤشرات الفرز ملاحظات بصرية، ويتم الإعلان عن بنية الجدول بشكل صحيح لقارئات الشاشة مع ربط رؤوس الأعمدة بخلاياها.',
        },
        loadingStates: {
          title: 'حالات التحميل',
          description: 'توفر حالات التحميل الهيكلية ملاحظات بصرية مع الحفاظ على استقرار التخطيط. يتم تعطيل العناصر التفاعلية أثناء التحميل.',
        },
      },
      rtl: {
        automaticSupport: {
          title: 'دعم RTL تلقائي',
          description: 'يرث جدول البيانات دعم RTL من مكون الجدول الأساسي. مؤشرات الفرز وحقل البحث وجميع المسافات تستخدم الخصائص المنطقية لتخطيط RTL المناسب.',
        },
        sortIndicators: {
          title: 'مؤشرات الفرز',
          description: 'تتموضع أيقونات الشيفرون تلقائياً بشكل صحيح في كل من سياقات LTR و RTL. يتكيف تخطيط زر الفرز مع اتجاه النص.',
        },
        searchInput: {
          title: 'حقل البحث',
          description: 'تتموضع أيقونة البحث وزر المسح بشكل صحيح باستخدام أدوات margin-inline-start (ms-) و margin-inline-end (me-)، مما يضمن الوضع الصحيح في كلا الاتجاهين.',
        },
        mobileCards: {
          title: 'بطاقات الأجهزة المحمولة',
          description: 'على الأجهزة المحمولة، يستخدم عرض البطاقات تخطيط شبكة يتكيف تلقائياً مع RTL، مع التسميات على الجانب البدائي والقيم على الجانب النهائي.',
        },
      },
      related: {
        table: {
          title: 'الجدول',
          description: 'مكون الجدول الأساسي',
        },
        pagination: {
          title: 'الترقيم',
          description: 'عنصر التحكم في التنقل بين الصفحات',
        },
        skeleton: {
          title: 'الهيكل العظمي',
          description: 'عنصر نائب التحميل',
        },
        input: {
          title: 'الإدخال',
          description: 'يُستخدم لوظيفة البحث',
        },
        badge: {
          title: 'الشارة',
          description: 'مؤشرات الحالة',
        },
        button: {
          title: 'الزر',
          description: 'رؤوس الفرز والإجراءات',
        },
      },
    },

paginationComponent: {
      title: 'الترقيم',
      description: 'التنقل عبر صفحات المحتوى. يستجيب بالكامل مع دعم تلقائي لـ RTL لأسهم التنقل.',
      preview: 'معاينة',
      installation: 'التثبيت',
      usage: 'الاستخدام',
      examples: {
        title: 'أمثلة',
        basic: 'أساسي',
        withText: 'مع معلومات الصفحة',
        controlled: 'متحكم به',
        customSize: 'حجم مخصص',
      },
      props: {
        title: 'الخصائص',
        currentPage: 'رقم الصفحة النشطة الحالية',
        totalPages: 'إجمالي عدد الصفحات',
        onPageChange: 'استدعاء عند تغيير الصفحة',
        siblingCount: 'عدد الصفحات الشقيقة المراد عرضها',
      },
      accessibility: {
        title: 'إمكانية الوصول',
      },
      rtl: {
        title: 'اعتبارات RTL',
        description: 'أسهم الترقيم تنعكس تلقائياً في تخطيطات RTL.',
      },
    },

accordionComponent: {
      title: 'الأكورديون',
      description: 'أقسام محتوى قابلة للتوسيع. مبني على Radix UI مع رسوم متحركة سلسة ودعم مثالي لـ RTL.',
      preview: 'معاينة',
      installation: 'التثبيت',
      usage: 'الاستخدام',
      examples: {
        title: 'أمثلة',
        single: 'فردي',
        multiple: 'متعدد',
        withIcons: 'مع أيقونات',
        styled: 'منسق',
      },
      props: {
        title: 'الخصائص',
        type: 'يمكن فتح عنصر واحد أو متعدد',
        collapsible: 'ما إذا كان يمكن طي العناصر',
        defaultValue: 'العنصر (العناصر) المفتوح افتراضياً',
        value: 'العنصر (العناصر) المفتوح المتحكم به',
      },
      accessibility: {
        title: 'إمكانية الوصول',
      },
      rtl: {
        title: 'اعتبارات RTL',
        description: 'أسهم الأكورديون والمحتوى تتكيف تلقائياً مع تخطيط RTL.',
      },
    },

collapsibleComponent: {
      title: 'القابل للطي',
      description: 'إظهار وإخفاء المحتوى مع رسوم متحركة سلسة. مبني على Radix UI مع دعم كامل لـ RTL.',
      preview: 'معاينة',
      installation: 'التثبيت',
      usage: 'الاستخدام',
      examples: {
        title: 'أمثلة',
        basic: 'أساسي',
        controlled: 'متحكم به',
        withTrigger: 'مشغل مخصص',
        animated: 'متحرك',
      },
      props: {
        title: 'الخصائص',
        open: 'حالة الفتح المتحكم بها',
        defaultOpen: 'حالة الفتح الافتراضية',
        onOpenChange: 'استدعاء عند تغيير حالة الفتح',
        disabled: 'ما إذا كان القابل للطي معطلاً',
      },
      accessibility: {
        title: 'إمكانية الوصول',
      },
      rtl: {
        title: 'اعتبارات RTL',
        description: 'محتوى ورسوم متحركة القابل للطي تعمل بشكل مثالي في تخطيطات RTL.',
      },
    },

tabsComponent: {
      title: 'علامات التبويب',
      description: 'تنظيم المحتوى في طرق عرض منفصلة. مبني على Radix UI مع رسوم متحركة سلسة ودعم كامل لـ RTL.',
      preview: 'معاينة',
      installation: 'التثبيت',
      usage: 'الاستخدام',
      examples: {
        title: 'أمثلة',
        basic: 'أساسي',
        withIcons: 'مع أيقونات',
        vertical: 'عمودي',
        disabled: 'علامة تبويب معطلة',
      },
      props: {
        title: 'الخصائص',
        defaultValue: 'قيمة علامة التبويب النشطة الافتراضية',
        value: 'قيمة علامة التبويب النشطة المتحكم بها',
        onValueChange: 'استدعاء عند تغيير علامة التبويب',
        orientation: 'اتجاه علامات التبويب (أفقي أو عمودي)',
      },
      accessibility: {
        title: 'إمكانية الوصول',
      },
      rtl: {
        title: 'اعتبارات RTL',
        description: 'علامات التبويب تتماشى وتتدفق بشكل صحيح في تخطيطات RTL.',
      },
    },

breadcrumbComponent: {
      title: 'مسار التنقل',
      description: 'مكون تنقل يعرض موقع الصفحة الحالية. يتكيف تلقائياً مع تخطيطات RTL مع وضع الفاصل المناسب.',
      preview: 'معاينة',
      installation: 'التثبيت',
      usage: 'الاستخدام',
      examples: {
        title: 'أمثلة',
        basic: 'أساسي',
        withIcons: 'مع أيقونات',
        withDropdown: 'مع قائمة منسدلة',
        collapsed: 'مطوي',
      },
      props: {
        title: 'الخصائص',
        separator: 'فاصل مخصص بين عناصر مسار التنقل',
        className: 'فئات CSS إضافية للتطبيق',
      },
      accessibility: {
        title: 'إمكانية الوصول',
      },
      rtl: {
        title: 'اعتبارات RTL',
        description: 'مسارات التنقل تعكس الترتيب واتجاه الفاصل تلقائياً في تخطيطات RTL.',
      },
    },

commandComponent: {
      title: 'الأوامر',
      breadcrumb: 'الأوامر',
      description: 'قائمة أوامر سريعة وقابلة للتركيب لـ React. مثالية لبناء واجهات البحث، ولوحات الأوامر، والإجراءات السريعة.',
      sections: {
        basicCommand: 'الأمر الأساسي',
        commandDialog: 'مربع حوار الأوامر',
        dialogDescription: 'يُفتح في مربع حوار بدعم اختصارات لوحة المفاتيح (Cmd/Ctrl + K):',
        openCommandMenu: 'فتح قائمة الأوامر',
      },
      rtl: {
        description: 'يتكيف مكون الأوامر تلقائياً مع مواضع الأيقونات، ومحاذاة النص، والتنقل بلوحة المفاتيح لتخطيطات RTL. جرّب تبديل الاتجاه لرؤيته في العمل.',
      },
      accessibility: {
        keyboardNav: 'قابل للتنقل بالكامل بلوحة المفاتيح باستخدام مفاتيح الأسهم',
        screenReader: 'متوافق مع قارئ الشاشة مع تسميات ARIA المناسبة',
        typeAhead: 'دعم البحث بالكتابة المسبقة',
        focusManagement: 'إدارة التركيز في وضع الحوار',
        escapeKey: 'مفتاح Escape يغلق مربع الحوار',
      },
    },

emptyStateComponent: {
      title: 'حالة فارغة',
      description: 'اعرض رسائل تعليمية عندما لا يكون هناك محتوى للعرض',
      preview: 'معاينة',
      installation: 'التثبيت',
      usage: 'الاستخدام',
      examples: {
        title: 'أمثلة',
      },
      props: {
        icon: 'الأيقونة المعروضة في الأعلى',
        title: 'عنوان الحالة الفارغة',
        description: 'نص وصفي اختياري',
        action: 'زر أو أزرار الإجراء',
        className: 'فئات CSS إضافية',
      },
      bestPractices: {
        doList: [
          'استخدم أيقونات ذات صلة تمثل المحتوى المفقود',
          'اجعل العنوان واضحًا وموجزًا',
          'قدم إجراءً واضحًا إذا كان بإمكان المستخدم إصلاح الموقف',
          'استخدم لهجة ودية ومفيدة',
        ],
        dontList: [
          'لا تستخدم أيقونات عامة أو غير ذات صلة',
          'لا تستخدم عناوين طويلة أو تقنية',
          'لا تترك المستخدمين عالقين بدون إجراء واضح',
          'لا تستخدم لهجة سلبية أو لوم المستخدم',
        ],
      },
    },

statsCardComponent: {
      title: 'بطاقة الإحصائيات',
      description: 'اعرض مقاييس لوحة المعلومات مع مؤشرات الاتجاه',
      preview: 'معاينة',
      installation: 'التثبيت',
      usage: 'الاستخدام',
      examples: {
        title: 'أمثلة',
      },
      props: {
        label: 'تسمية المقياس',
        value: 'القيمة المعروضة',
        trend: 'نسبة الاتجاه (موجبة أو سالبة)',
        trendLabel: 'تسمية الاتجاه (مثل "مقابل الشهر الماضي")',
        icon: 'الأيقونة المعروضة',
        isLoading: 'حالة التحميل',
        format: 'تنسيق القيمة',
        className: 'فئات CSS إضافية',
        valueClassName: 'فئات CSS لعنصر القيمة',
      },
      bestPractices: {
        doList: [
          'استخدم أيقونات متسقة عبر لوحة المعلومات',
          'قدم سياقًا لمؤشرات الاتجاه (مثل "مقابل الشهر الماضي")',
          'استخدم الألوان المناسبة للاتجاهات (أخضر للإيجابي، أحمر للسلبي)',
          'احتفظ بالتسميات قصيرة ووصفية',
          'اعرض حالة التحميل أثناء جلب البيانات',
        ],
        dontList: [
          'لا تستخدم أيقونات مختلفة لنفس النوع من المقاييس',
          'لا تعرض الاتجاهات بدون سياق زمني',
          'لا تستخدم الأحمر للاتجاهات الإيجابية أو الأخضر للسلبية',
          'لا تستخدم تسميات طويلة أو غامضة',
          'لا تعرض بيانات قديمة بدون مؤشر تحميل',
        ],
      },
    },
}
