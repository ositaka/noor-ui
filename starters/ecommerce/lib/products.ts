export interface Product {
  id: string
  name: string
  nameAr: string
  description: string
  descriptionAr: string
  price: number
  originalPrice?: number
  image: string
  category: string
  categoryAr: string
  rating: number
  reviews: number
  inStock: boolean
  featured?: boolean
}

export const categories = [
  { id: 'all', name: 'All Products', nameAr: 'جميع المنتجات' },
  { id: 'electronics', name: 'Electronics', nameAr: 'إلكترونيات' },
  { id: 'fashion', name: 'Fashion', nameAr: 'أزياء' },
  { id: 'home', name: 'Home & Garden', nameAr: 'المنزل والحديقة' },
  { id: 'books', name: 'Books', nameAr: 'كتب' },
  { id: 'sports', name: 'Sports', nameAr: 'رياضة' },
]

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    nameAr: 'سماعات لاسلكية',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life',
    descriptionAr: 'سماعات لاسلكية ممتازة بخاصية إلغاء الضوضاء مع بطارية تدوم 30 ساعة',
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    category: 'electronics',
    categoryAr: 'إلكترونيات',
    rating: 4.5,
    reviews: 128,
    inStock: true,
    featured: true,
  },
  {
    id: '2',
    name: 'Smart Watch',
    nameAr: 'ساعة ذكية',
    description: 'Fitness tracking smartwatch with heart rate monitor and GPS',
    descriptionAr: 'ساعة ذكية لتتبع اللياقة البدنية مع مراقب معدل ضربات القلب و GPS',
    price: 199,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    category: 'electronics',
    categoryAr: 'إلكترونيات',
    rating: 4.8,
    reviews: 256,
    inStock: true,
    featured: true,
  },
  {
    id: '3',
    name: 'Classic White Sneakers',
    nameAr: 'حذاء رياضي أبيض كلاسيكي',
    description: 'Comfortable leather sneakers for everyday wear',
    descriptionAr: 'حذاء رياضي جلدي مريح للارتداء اليومي',
    price: 89,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
    category: 'fashion',
    categoryAr: 'أزياء',
    rating: 4.3,
    reviews: 89,
    inStock: true,
  },
  {
    id: '4',
    name: 'Modern Desk Lamp',
    nameAr: 'مصباح مكتب عصري',
    description: 'LED desk lamp with adjustable brightness and color temperature',
    descriptionAr: 'مصباح مكتب LED بسطوع ودرجة حرارة لون قابلة للتعديل',
    price: 45,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop',
    category: 'home',
    categoryAr: 'المنزل والحديقة',
    rating: 4.6,
    reviews: 145,
    inStock: true,
  },
  {
    id: '5',
    name: 'Arabic Calligraphy Book',
    nameAr: 'كتاب فن الخط العربي',
    description: 'Learn the art of Arabic calligraphy with step-by-step tutorials',
    descriptionAr: 'تعلم فن الخط العربي مع دروس تفصيلية خطوة بخطوة',
    price: 35,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop',
    category: 'books',
    categoryAr: 'كتب',
    rating: 4.9,
    reviews: 67,
    inStock: true,
    featured: true,
  },
  {
    id: '6',
    name: 'Yoga Mat',
    nameAr: 'سجادة يوغا',
    description: 'Non-slip eco-friendly yoga mat with carrying strap',
    descriptionAr: 'سجادة يوغا صديقة للبيئة غير قابلة للانزلاق مع حزام حمل',
    price: 29,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop',
    category: 'sports',
    categoryAr: 'رياضة',
    rating: 4.4,
    reviews: 92,
    inStock: true,
  },
  {
    id: '7',
    name: 'Laptop Backpack',
    nameAr: 'حقيبة ظهر للكمبيوتر المحمول',
    description: 'Water-resistant backpack with padded laptop compartment',
    descriptionAr: 'حقيبة ظهر مقاومة للماء مع مقصورة محشوة للكمبيوتر المحمول',
    price: 69,
    originalPrice: 99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    category: 'electronics',
    categoryAr: 'إلكترونيات',
    rating: 4.7,
    reviews: 178,
    inStock: true,
  },
  {
    id: '8',
    name: 'Cotton T-Shirt',
    nameAr: 'تيشيرت قطني',
    description: '100% organic cotton t-shirt in various colors',
    descriptionAr: 'تيشيرت قطن عضوي 100٪ بألوان متعددة',
    price: 25,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    category: 'fashion',
    categoryAr: 'أزياء',
    rating: 4.2,
    reviews: 203,
    inStock: true,
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'all') return products
  return products.filter((p) => p.category === category)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured)
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase()
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.nameAr.includes(query) ||
      p.description.toLowerCase().includes(lowerQuery)
  )
}
