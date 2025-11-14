/**
 * AR translations - components-experimental
 * Experimental and AI/LLM components
 */

export const components_experimental = {
chatMessageComponent: {
    title: 'رسالة الدردشة',
    description: 'عرض رسائل الدردشة من المستخدمين أو مساعدي الذكاء الاصطناعي أو إشعارات النظام. مثالي لبناء واجهات الدردشة مع دعم RTL الكامل والإجراءات القابلة للتخصيص.',
    preview: 'معاينة',
    installation: 'التثبيت',
    usage: 'الاستخدام',
    examples: {
      title: 'أمثلة',
      messageRoles: 'أدوار الرسائل',
      messageRolesDesc: 'عرض الرسائل من أدوار مختلفة: مستخدم، مساعد، أو نظام',
      withActions: 'مع الإجراءات',
      withActionsDesc: 'إضافة أزرار النسخ وإعادة التوليد إلى الرسائل',
      compactVariant: 'المتغير المدمج',
      compactVariantDesc: 'استخدم المتغير المدمج لتخطيطات دردشة أكثر كثافة',
    },
    props: {
      role: 'الدور/المرسل للرسالة',
      content: 'محتوى الرسالة (يدعم markdown)',
      variant: 'متغير النمط البصري',
      state: 'حالة الرسالة للرسوم المتحركة والتصميم',
      timestamp: 'الطابع الزمني الاختياري للعرض',
      avatar: 'رابط الصورة الرمزية الاختياري',
      name: 'الاسم/العنوان الاختياري للمرسل',
      showCopy: 'إظهار زر النسخ',
      showRegenerate: 'إظهار زر إعادة التوليد (للمساعد فقط)',
      onCopy: 'استدعاء عند النقر على النسخ',
      onRegenerate: 'استدعاء عند النقر على إعادة التوليد',
      isRTL: 'ما إذا كان اتجاه النص من اليمين إلى اليسار',
    },
    accessibility: {
      title: 'إمكانية الوصول',
      screenReader: 'قارئ الشاشة',
      screenReaderDesc: 'يستخدم المكون HTML الدلالي مع سمات ARIA المناسبة. يتم الإعلان عن الدور والطابع الزمني والمحتوى بشكل صحيح.',
      keyboardNav: 'التنقل بلوحة المفاتيح',
      tabKey: 'التنقل عبر أزرار الإجراءات',
      enterKey: 'تنشيط الأزرار (نسخ، إعادة التوليد)',
    },
    rtl: {
      title: 'اعتبارات RTL',
      description: 'تتكيف رسائل الدردشة تلقائيًا مع تخطيط RTL. تتم محاذاة رسائل المستخدم إلى النهاية (اليمين في RTL)، ورسائل المساعد إلى البداية (اليسار في RTL). قم بتعيين خاصية isRTL للنص الخاص بـ RTL.',
      ltr: 'LTR (إنجليزي)',
      rtl: 'RTL (العربية)',
    },
    related: {
      title: 'المكونات ذات الصلة',
      promptInput: 'مكون الإدخال لإرسال رسائل الدردشة',
      messageActions: 'أزرار الإجراءات لرسائل الدردشة',
      thinkingIndicator: 'حالة التحميل لاستجابات الذكاء الاصطناعي',
    },
  },

modelSelectorComponent: {
    title: 'محدد النموذج',
    description: 'اختر نماذج الذكاء الاصطناعي من قائمة مع مواصفات تفصيلية. يتميز بدعم ثنائي اللغة، ومؤشرات بصرية للسرعة والتسعير، وإبراز النماذج الموصى بها.',
    examples: {
      title: 'أمثلة',
      basic: 'الاستخدام الأساسي',
      basicDesc: 'محدد نموذج بسيط مع النماذج الافتراضية',
      custom: 'نماذج مخصصة',
      customDesc: 'حدد نماذجك الخاصة بمواصفات مخصصة',
      bilingual: 'الدعم ثنائي اللغة',
      bilingualDesc: 'عرض معلومات النموذج باللغتين الإنجليزية والعربية',
    },
    props: {
      models: 'مصفوفة نماذج الذكاء الاصطناعي المتاحة',
      value: 'معرف النموذج المحدد',
      onValueChange: 'استدعاء عند تغيير النموذج',
      isRTL: 'ما إذا كان اتجاه النص من اليمين إلى اليسار',
      placeholder: 'نص العنصر النائب',
      placeholderAr: 'نص العنصر النائب بالعربية',
      className: 'فئات CSS إضافية',
    },
    interface: 'واجهة AIModel',
    related: {
      chatMessage: 'عرض استجابات دردشة الذكاء الاصطناعي',
      thinkingIndicator: 'إظهار حالة معالجة الذكاء الاصطناعي',
    },
  },

thinkingIndicatorComponent: {
    title: 'مؤشر التفكير',
    description: 'مؤشر متحرك يوضح أن الذكاء الاصطناعي يعالج. مثالي لواجهات الدردشة لإظهار أن المساعد يكتب أو يفكر.',
    examples: {
      title: 'أمثلة',
      basic: 'أساسي',
      compact: 'مدمج',
      withText: 'مع نص مخصص',
    },
    props: {
      variant: 'متغير النمط البصري',
      text: 'نص التحميل المخصص',
      className: 'فئات CSS إضافية',
    },
  },

  workflowNodeComponent: {
    title: 'عقدة سير العمل',
    description: 'مكون عقدة مرئي لبناء مخططات سير العمل. يمثل خطوة واحدة في سير العمل مع المدخلات والمخرجات ونقاط الاتصال.',
    examples: {
      title: 'أمثلة',
      basic: 'عقدة أساسية',
      withPorts: 'مع منافذ الإدخال/الإخراج',
      selected: 'حالة محددة',
    },
    props: {
      id: 'معرف العقدة الفريد',
      title: 'عنوان العقدة',
      type: 'نوع العقدة (يحدد الأيقونة واللون)',
      selected: 'ما إذا كانت العقدة محددة',
      onSelect: 'استدعاء عند تحديد العقدة',
      inputs: 'مصفوفة منافذ الإدخال',
      outputs: 'مصفوفة منافذ الإخراج',
    },
  },

  workflowCanvasComponent: {
    title: 'لوحة سير العمل',
    description: 'لوحة تفاعلية لبناء مخططات سير العمل. اسحب وأفلت العقد، وقم بتوصيلها، وأنشئ سير عمل معقد للذكاء الاصطناعي.',
    examples: {
      title: 'أمثلة',
      empty: 'لوحة فارغة',
      withNodes: 'مع عقد',
      fullWorkflow: 'سير عمل كامل',
    },
    props: {
      nodes: 'مصفوفة عقد سير العمل',
      edges: 'مصفوفة الاتصالات بين العقد',
      onNodesChange: 'استدعاء عند تغيير العقد',
      onEdgesChange: 'استدعاء عند تغيير الحواف',
      onConnect: 'استدعاء عند توصيل العقد',
    },
  },

  conversationHistoryComponent: {
    title: 'سجل المحادثات',
    description: 'عرض قائمة بالمحادثات السابقة مع البحث والتصفية. مثالي لتطبيقات الدردشة لإظهار سجل المحادثات.',
    examples: {
      title: 'أمثلة',
      list: 'قائمة المحادثات',
      withSearch: 'مع البحث',
      withFilters: 'مع المرشحات',
    },
    props: {
      conversations: 'مصفوفة المحادثات',
      selected: 'معرف المحادثة المحددة',
      onSelect: 'استدعاء عند تحديد المحادثة',
      onDelete: 'استدعاء عند حذف المحادثة',
      searchable: 'تمكين وظيفة البحث',
    },
  },

  dashboardShellComponent: {
    title: 'هيكل لوحة التحكم',
    description: 'تخطيط لوحة تحكم كامل مع شريط جانبي ورأس ومنطقة محتوى. متجاوب بالكامل مع دعم RTL.',
    examples: {
      title: 'أمثلة',
      basic: 'تخطيط أساسي',
      withSidebar: 'مع شريط جانبي',
      fullDashboard: 'لوحة تحكم كاملة',
    },
    props: {
      sidebar: 'محتوى الشريط الجانبي',
      header: 'محتوى الرأس',
      children: 'منطقة المحتوى الرئيسية',
      sidebarCollapsed: 'ما إذا كان الشريط الجانبي مطويًا',
    },
  },

  parameterSliderComponent: {
    title: 'شريط تمرير المعاملات',
    description: 'شريط تمرير متخصص لمعاملات نموذج الذكاء الاصطناعي مثل درجة الحرارة وtop-p وعقوبة التكرار. يعرض القيمة والوصف.',
    examples: {
      title: 'أمثلة',
      temperature: 'درجة الحرارة',
      topP: 'Top P',
      frequencyPenalty: 'عقوبة التكرار',
    },
    props: {
      label: 'تسمية المعامل',
      description: 'وصف المعامل',
      value: 'القيمة الحالية',
      min: 'القيمة الدنيا',
      max: 'القيمة القصوى',
      step: 'زيادة الخطوة',
      onChange: 'استدعاء عند تغيير القيمة',
    },
  },

  tokenCounterComponent: {
    title: 'عداد الرموز',
    description: 'عرض عدد الرموز وتقديرات التكلفة لمدخلات نموذج الذكاء الاصطناعي. مفيد لإظهار حدود الاستخدام والتسعير.',
    examples: {
      title: 'أمثلة',
      basic: 'عداد أساسي',
      withCost: 'مع تقدير التكلفة',
      withLimit: 'مع حد الرموز',
    },
    props: {
      text: 'النص لعد الرموز له',
      model: 'معرف نموذج الذكاء الاصطناعي للعد الدقيق',
      showCost: 'إظهار تقدير التكلفة',
      limit: 'حد الرموز للتحذير بشأنه',
    },
  },

  featureCardComponent: {
    title: 'بطاقة الميزة',
    description: 'عرض ميزة مع أيقونة وعنوان ووصف. مثالي لصفحات الهبوط وعروض الميزات.',
    examples: {
      title: 'أمثلة',
      basic: 'ميزة أساسية',
      withLink: 'مع رابط',
      highlighted: 'مميزة',
    },
    props: {
      icon: 'مكون الأيقونة',
      title: 'عنوان الميزة',
      description: 'وصف الميزة',
      href: 'رابط URL اختياري',
      highlighted: 'ما إذا كان سيتم تمييز البطاقة',
    },
  },

  promptInputComponent: {
    title: 'إدخال الموجه',
    description: 'إدخال متعدد الأسطر لموجهات الذكاء الاصطناعي مع زر إرسال وتحميل ملف واختصارات لوحة المفاتيح. مثالي لواجهات الدردشة.',
    examples: {
      title: 'أمثلة',
      basic: 'إدخال أساسي',
      withUpload: 'مع تحميل الملف',
      withShortcuts: 'مع اختصارات لوحة المفاتيح',
    },
    props: {
      value: 'قيمة الإدخال',
      onChange: 'استدعاء عند تغيير القيمة',
      onSubmit: 'استدعاء عند إرسال النموذج',
      placeholder: 'نص العنصر النائب',
      allowUpload: 'السماح بتحميل الملفات',
      maxLength: 'الحد الأقصى لطول الأحرف',
    },
  },

  userMenuComponent: {
    title: 'قائمة المستخدم',
    description: 'قائمة منسدلة لملف المستخدم مع الصورة الرمزية وإعدادات الحساب وتسجيل الخروج. قابلة للوصول بالكامل مع التنقل بلوحة المفاتيح.',
    examples: {
      title: 'أمثلة',
      basic: 'قائمة أساسية',
      withAvatar: 'مع صورة رمزية',
      withNotifications: 'مع شارة الإشعارات',
    },
    props: {
      user: 'كائن المستخدم مع الاسم والبريد الإلكتروني والصورة الرمزية',
      onSignOut: 'استدعاء عند النقر على تسجيل الخروج',
      onSettings: 'استدعاء عند النقر على الإعدادات',
    },
  },

  notificationCenterComponent: {
    title: 'مركز الإشعارات',
    description: 'عرض وإدارة الإشعارات مع التصفية ووضع علامة مقروء والتجميع. قابل للوصول بالكامل.',
    examples: {
      title: 'أمثلة',
      list: 'قائمة الإشعارات',
      withGroups: 'مع التجميع',
      withFilters: 'مع المرشحات',
    },
    props: {
      notifications: 'مصفوفة الإشعارات',
      onMarkRead: 'استدعاء عند وضع علامة مقروء على الإشعار',
      onDelete: 'استدعاء عند حذف الإشعار',
      groupBy: 'كيفية تجميع الإشعارات',
    },
  },

  messageActionsComponent: {
    title: 'إجراءات الرسائل',
    description: 'أزرار الإجراءات لرسائل الدردشة (نسخ، إعادة توليد، مشاركة، إلخ). قابلة للتخصيص مع الأيقونات وتلميحات الأدوات.',
    examples: {
      title: 'أمثلة',
      basic: 'إجراءات أساسية',
      custom: 'إجراءات مخصصة',
      withTooltips: 'مع تلميحات الأدوات',
    },
    props: {
      actions: 'مصفوفة تكوينات الإجراءات',
      onAction: 'استدعاء عند النقر على الإجراء',
      className: 'فئات CSS إضافية',
    },
  },
}
