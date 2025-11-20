import type { Product, Category } from '@/types/product'

// Mock Categories
export const mockCategories: Category[] = [
  {
    id: 'cat-1',
    slug: 'bags',
    name: {
      en: 'Designer Bags',
      fa: 'کیف‌های برند',
      ar: 'حقائب مصممة',
    },
    description: {
      en: 'Luxury handbags from renowned designers',
      fa: 'کیف‌های دستی لوکس از طراحان معروف',
      ar: 'حقائب يد فاخرة من مصممين مشهورين',
    },
  },
  {
    id: 'cat-2',
    slug: 'watches',
    name: {
      en: 'Luxury Watches',
      fa: 'ساعت‌های لوکس',
      ar: 'ساعات فاخرة',
    },
    description: {
      en: 'Premium timepieces for the discerning collector',
      fa: 'ساعت‌های ممتاز برای کلکسیونرهای باسلیقه',
      ar: 'ساعات متميزة لجامعي التحف الفاخرة',
    },
  },
  {
    id: 'cat-3',
    slug: 'jewelry',
    name: {
      en: 'Fine Jewelry',
      fa: 'جواهرات فاخر',
      ar: 'مجوهرات راقية',
    },
    description: {
      en: 'Exquisite pieces crafted with precious metals and gems',
      fa: 'قطعات منحصر به فرد ساخته شده از فلزات و سنگ‌های قیمتی',
      ar: 'قطع رائعة مصنوعة من المعادن والأحجار الكريمة',
    },
  },
  {
    id: 'cat-4',
    slug: 'accessories',
    name: {
      en: 'Luxury Accessories',
      fa: 'اکسسوری‌های لوکس',
      ar: 'إكسسوارات فاخرة',
    },
    description: {
      en: 'Sophisticated accessories to complete your look',
      fa: 'اکسسوری‌های پیچیده برای تکمیل استایل شما',
      ar: 'إكسسوارات أنيقة لإكمال مظهرك',
    },
  },
]

// Mock Products
export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    slug: 'chanel-classic-flap',
    title: {
      en: 'Chanel Classic Flap Bag',
      fa: 'کیف کلاسیک شنل',
      ar: 'حقيبة شانيل الكلاسيكية',
    },
    description: {
      en: 'An iconic symbol of timeless elegance. This meticulously crafted handbag features quilted lambskin leather and the signature interlocking CC turn-lock closure. The versatile chain strap allows for shoulder or crossbody wear.',
      fa: 'نماد برجسته‌ای از ظرافت بی‌زمان. این کیف دستی با دقت ساخته شده دارای چرم بره نرم کوییلت شده و قفل چرخشی CC در هم تنیده مشخصه است. بند زنجیری همه کاره امکان استفاده روی شانه یا کراس بادی را فراهم می‌کند.',
      ar: 'رمز أيقوني للأناقة الخالدة. تتميز حقيبة اليد المصنوعة بدقة بجلد الحمل المبطن وإغلاق CC المتشابك المميز. يسمح حزام السلسلة متعدد الاستخدامات بالارتداء على الكتف أو عبر الجسم.',
    },
    shortDescription: {
      en: 'Timeless elegance in quilted lambskin',
      fa: 'ظرافت بی‌زمان در چرم بره کوییلت',
      ar: 'أناقة خالدة في جلد الحمل المبطن',
    },
    price: 28500,
    currency: 'AED',
    compareAtPrice: 32000,
    images: [
      '/products/chanel-bag-1.jpg',
      '/products/chanel-bag-2.jpg',
      '/products/chanel-bag-3.jpg',
    ],
    thumbnail: '/products/chanel-bag-thumb.jpg',
    category: mockCategories[0],
    tags: ['chanel', 'handbag', 'luxury', 'classic'],
    specifications: [
      {
        key: { en: 'Material', fa: 'جنس', ar: 'المادة' },
        value: { en: 'Lambskin Leather', fa: 'چرم بره', ar: 'جلد الحمل' },
      },
      {
        key: { en: 'Dimensions', fa: 'ابعاد', ar: 'الأبعاد' },
        value: { en: '25 x 15 x 7 cm', fa: '۲۵ × ۱۵ × ۷ سانتی‌متر', ar: '٢٥ × ١٥ × ٧ سم' },
      },
      {
        key: { en: 'Color', fa: 'رنگ', ar: 'اللون' },
        value: { en: 'Black', fa: 'مشکی', ar: 'أسود' },
      },
      {
        key: { en: 'Hardware', fa: 'متال', ar: 'المعدن' },
        value: { en: 'Gold-tone', fa: 'طلایی', ar: 'ذهبي' },
      },
    ],
    featured: true,
    status: 'active',
    stockStatus: 'in_stock',
    sku: 'CHANEL-CF-BLK-001',
    weight: 650,
    dimensions: {
      length: 25,
      width: 15,
      height: 7,
      unit: 'cm',
    },
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-01-18'),
  },
  {
    id: 'prod-2',
    slug: 'rolex-datejust-41',
    title: {
      en: 'Rolex Datejust 41',
      fa: 'رولکس دیت جاست ۴۱',
      ar: 'رولكس ديت جست ٤١',
    },
    description: {
      en: 'A prestigious timepiece that epitomizes luxury watchmaking. Features an Oystersteel case, Jubilee bracelet, and the iconic cyclops lens over the date window. Powered by the perpetual calibre 3235 movement.',
      fa: 'یک ساعت معتبر که نماد ساعت‌سازی لوکس است. دارای کیس استیل Oyster، دستبند Jubilee و عدسی آیکونیک Cyclops روی پنجره تاریخ. با موتور دائمی کالیبر ۳۲۳۵ کار می‌کند.',
      ar: 'ساعة مرموقة تجسد صناعة الساعات الفاخرة. تتميز بعلبة أويستر ستيل، وسوار جوبيلي، وعدسة سايكلوبس المميزة فوق نافذة التاريخ. مدعومة بحركة كاليبر ٣٢٣٥ الدائمة.',
    },
    shortDescription: {
      en: 'Iconic precision in every detail',
      fa: 'دقت نمادین در هر جزئیات',
      ar: 'دقة أيقونية في كل التفاصيل',
    },
    price: 42000,
    currency: 'AED',
    images: [
      '/products/rolex-1.jpg',
      '/products/rolex-2.jpg',
      '/products/rolex-3.jpg',
    ],
    thumbnail: '/products/rolex-thumb.jpg',
    category: mockCategories[1],
    tags: ['rolex', 'watch', 'luxury', 'datejust'],
    specifications: [
      {
        key: { en: 'Case Material', fa: 'جنس کیس', ar: 'مادة العلبة' },
        value: { en: 'Oystersteel', fa: 'استیل Oyster', ar: 'أويستر ستيل' },
      },
      {
        key: { en: 'Diameter', fa: 'قطر', ar: 'القطر' },
        value: { en: '41mm', fa: '۴۱ میلی‌متر', ar: '٤١ ملم' },
      },
      {
        key: { en: 'Movement', fa: 'حرکت', ar: 'الحركة' },
        value: { en: 'Calibre 3235', fa: 'کالیبر ۳۲۳۵', ar: 'كاليبر ٣٢٣٥' },
      },
      {
        key: { en: 'Water Resistance', fa: 'ضد آب', ar: 'مقاومة الماء' },
        value: { en: '100m', fa: '۱۰۰ متر', ar: '١٠٠ متر' },
      },
    ],
    featured: true,
    status: 'active',
    stockStatus: 'in_stock',
    sku: 'ROLEX-DJ41-SS-001',
    weight: 150,
    createdAt: new Date('2025-01-10'),
    updatedAt: new Date('2025-01-20'),
  },
  {
    id: 'prod-3',
    slug: 'cartier-love-bracelet',
    title: {
      en: 'Cartier LOVE Bracelet',
      fa: 'دستبند لاو کارتیه',
      ar: 'أسورة كارتييه لوف',
    },
    description: {
      en: 'An iconic symbol of eternal love. Crafted in 18K rose gold, this distinctive bracelet features the signature screw motif and is fastened with a special screwdriver. A timeless piece that transcends trends.',
      fa: 'نماد برجسته عشق ابدی. این دستبند متمایز از طلای رز ۱۸ عیار ساخته شده و دارای طرح پیچ مشخصه است و با پیچ‌گوشتی مخصوص بسته می‌شود. یک قطعه بی‌زمان که فراتر از ترندها است.',
      ar: 'رمز أيقوني للحب الأبدي. مصنوع من الذهب الوردي عيار ١٨، يتميز هذا السوار المميز بتصميم المسمار المميز ويُربط بمفك خاص. قطعة خالدة تتجاوز الاتجاهات.',
    },
    shortDescription: {
      en: 'A timeless testament to love',
      fa: 'گواهی بی‌زمان عشق',
      ar: 'شهادة خالدة على الحب',
    },
    price: 31500,
    currency: 'AED',
    images: [
      '/products/cartier-1.jpg',
      '/products/cartier-2.jpg',
      '/products/cartier-3.jpg',
    ],
    thumbnail: '/products/cartier-thumb.jpg',
    category: mockCategories[2],
    tags: ['cartier', 'bracelet', 'jewelry', 'gold'],
    specifications: [
      {
        key: { en: 'Material', fa: 'جنس', ar: 'المادة' },
        value: { en: '18K Rose Gold', fa: 'طلای رز ۱۸ عیار', ar: 'ذهب وردي عيار ١٨' },
      },
      {
        key: { en: 'Size', fa: 'اندازه', ar: 'المقاس' },
        value: { en: '17', fa: '۱۷', ar: '١٧' },
      },
      {
        key: { en: 'Width', fa: 'عرض', ar: 'العرض' },
        value: { en: '6.1mm', fa: '۶.۱ میلی‌متر', ar: '٦.١ ملم' },
      },
    ],
    featured: true,
    status: 'active',
    stockStatus: 'in_stock',
    sku: 'CARTIER-LOVE-RG-17',
    weight: 32,
    createdAt: new Date('2025-01-12'),
    updatedAt: new Date('2025-01-19'),
  },
  {
    id: 'prod-4',
    slug: 'hermes-birkin-30',
    title: {
      en: 'Hermès Birkin 30',
      fa: 'کیف برکین ۳۰ هرمس',
      ar: 'حقيبة هيرميس بيركين ٣٠',
    },
    description: {
      en: 'The ultimate symbol of luxury and exclusivity. Handcrafted by skilled artisans in Togo leather with palladium hardware. Each bag takes over 18 hours to create and represents the pinnacle of craftsmanship.',
      fa: 'نماد نهایی لوکس و انحصار. با دست توسط صنعتگران ماهر از چرم توگو با متال پالادیوم ساخته شده. ساخت هر کیف بیش از ۱۸ ساعت طول می‌کشد و نشان‌دهنده اوج صنعتگری است.',
      ar: 'الرمز النهائي للفخامة والحصرية. مصنوعة يدويًا من قبل حرفيين ماهرين من جلد توغو مع معدن بالاديوم. تستغرق كل حقيبة أكثر من ١٨ ساعة للإنشاء وتمثل قمة الحرفية.',
    },
    shortDescription: {
      en: 'Unparalleled luxury and craftsmanship',
      fa: 'لوکس و صنعتگری بی‌نظیر',
      ar: 'فخامة وحرفية لا مثيل لها',
    },
    price: 95000,
    currency: 'AED',
    compareAtPrice: 110000,
    images: [
      '/products/birkin-1.jpg',
      '/products/birkin-2.jpg',
      '/products/birkin-3.jpg',
    ],
    thumbnail: '/products/birkin-thumb.jpg',
    category: mockCategories[0],
    tags: ['hermes', 'birkin', 'handbag', 'luxury'],
    specifications: [
      {
        key: { en: 'Material', fa: 'جنس', ar: 'المادة' },
        value: { en: 'Togo Leather', fa: 'چرم توگو', ar: 'جلد توغو' },
      },
      {
        key: { en: 'Size', fa: 'اندازه', ar: 'المقاس' },
        value: { en: '30cm', fa: '۳۰ سانتی‌متر', ar: '٣٠ سم' },
      },
      {
        key: { en: 'Color', fa: 'رنگ', ar: 'اللون' },
        value: { en: 'Etoupe', fa: 'اتوپ', ar: 'إيتوب' },
      },
      {
        key: { en: 'Hardware', fa: 'متال', ar: 'المعدن' },
        value: { en: 'Palladium', fa: 'پالادیوم', ar: 'بالاديوم' },
      },
    ],
    featured: true,
    status: 'active',
    stockStatus: 'pre_order',
    sku: 'HERMES-BIRKIN-30-ET',
    weight: 980,
    dimensions: {
      length: 30,
      width: 16,
      height: 22,
      unit: 'cm',
    },
    createdAt: new Date('2025-01-08'),
    updatedAt: new Date('2025-01-21'),
  },
]

// Helper functions
export function getProductBySlug(slug: string): Product | undefined {
  return mockProducts.find((product) => product.slug === slug)
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return mockProducts.filter(
    (product) => product.category.slug === categorySlug
  )
}

export function getFeaturedProducts(): Product[] {
  return mockProducts.filter((product) => product.featured)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return mockCategories.find((category) => category.slug === slug)
}
