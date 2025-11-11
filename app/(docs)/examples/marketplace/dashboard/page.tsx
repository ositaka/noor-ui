'use client'

import * as React from 'react'
import Link from 'next/link'
import { useDirection } from '@/hooks/use-direction'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArabicNumber } from '@/components/ui/arabic-number'
import { formatSAR } from '@/lib/arabic-numbers'
import { cn } from '@/lib/utils'
import {
  Store,
  User,
  Package,
  Image as ImageIcon,
  MapPin,
  Phone,
  Mail,
  Globe,
  Edit,
  Trash2,
  Plus,
  Save,
  X,
  Upload,
  Eye,
  TrendingUp,
  ShoppingCart,
  DollarSign,
  Star,
} from 'lucide-react'

interface Product {
  id: string
  name: string
  nameAr: string
  description: string
  descriptionAr: string
  price: number
  category: string
  categoryAr: string
  image: string
  stockCount: number
  status: 'in-stock' | 'out-of-stock' | 'low-stock'
  rating: number
  reviewCount: number
  sales: number
}

interface VendorProfile {
  id: string
  name: string
  nameAr: string
  description: string
  descriptionAr: string
  logo: string
  banner: string
  location: string
  locationAr: string
  phone: string
  email: string
  website: string
  categories: string[]
  rating: number
  reviewCount: number
  totalSales: number
  totalRevenue: number
  joinDate: string
}

function generateMockProducts(): Product[] {
  return [
    {
      id: '1',
      name: 'Wireless Headphones',
      nameAr: 'سماعات لاسلكية',
      description: 'Premium noise-cancelling wireless headphones',
      descriptionAr: 'سماعات لاسلكية فاخرة بخاصية إلغاء الضوضاء',
      price: 299,
      category: 'Electronics',
      categoryAr: 'إلكترونيات',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      stockCount: 45,
      status: 'in-stock',
      rating: 4.5,
      reviewCount: 128,
      sales: 234,
    },
    {
      id: '2',
      name: 'Smart Watch',
      nameAr: 'ساعة ذكية',
      description: 'Fitness tracking smartwatch with heart rate monitor',
      descriptionAr: 'ساعة ذكية لتتبع اللياقة مع مراقب معدل ضربات القلب',
      price: 499,
      category: 'Electronics',
      categoryAr: 'إلكترونيات',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      stockCount: 8,
      status: 'low-stock',
      rating: 4.7,
      reviewCount: 89,
      sales: 156,
    },
    {
      id: '3',
      name: 'Laptop Stand',
      nameAr: 'حامل لابتوب',
      description: 'Adjustable aluminum laptop stand',
      descriptionAr: 'حامل لابتوب من الألومنيوم قابل للتعديل',
      price: 89,
      category: 'Accessories',
      categoryAr: 'إكسسوارات',
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
      stockCount: 0,
      status: 'out-of-stock',
      rating: 4.3,
      reviewCount: 45,
      sales: 78,
    },
    {
      id: '4',
      name: 'Mechanical Keyboard',
      nameAr: 'لوحة مفاتيح ميكانيكية',
      description: 'RGB mechanical gaming keyboard',
      descriptionAr: 'لوحة مفاتيح ميكانيكية للألعاب مع إضاءة RGB',
      price: 199,
      category: 'Electronics',
      categoryAr: 'إلكترونيات',
      image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400',
      stockCount: 32,
      status: 'in-stock',
      rating: 4.6,
      reviewCount: 156,
      sales: 298,
    },
  ]
}

function generateMockVendorProfile(): VendorProfile {
  return {
    id: 'tech-store',
    name: 'Tech Store',
    nameAr: 'متجر التقنية',
    description: 'Your trusted source for premium electronics and tech accessories. We offer the latest gadgets with warranty and excellent customer service.',
    descriptionAr: 'مصدرك الموثوق للإلكترونيات والإكسسوارات التقنية الممتازة. نقدم أحدث الأجهزة مع ضمان وخدمة عملاء ممتازة.',
    logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200',
    banner: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200',
    location: 'Riyadh, Saudi Arabia',
    locationAr: 'الرياض، المملكة العربية السعودية',
    phone: '+966 50 123 4567',
    email: 'contact@techstore.sa',
    website: 'www.techstore.sa',
    categories: ['Electronics', 'Accessories', 'Gaming'],
    rating: 4.8,
    reviewCount: 1234,
    totalSales: 5678,
    totalRevenue: 1234567,
    joinDate: 'Jan 2023',
  }
}

export default function VendorDashboardPage() {
  const { locale } = useDirection()
  const isRTL = locale === 'ar'

  const [products] = React.useState<Product[]>(generateMockProducts())
  const [vendorProfile, setVendorProfile] = React.useState<VendorProfile>(generateMockVendorProfile())
  const [editingProduct, setEditingProduct] = React.useState<Product | null>(null)
  const [isEditingProfile, setIsEditingProfile] = React.useState(false)

  // Profile form state
  const [profileForm, setProfileForm] = React.useState({
    name: vendorProfile.name,
    nameAr: vendorProfile.nameAr,
    description: vendorProfile.description,
    descriptionAr: vendorProfile.descriptionAr,
    location: vendorProfile.location,
    locationAr: vendorProfile.locationAr,
    phone: vendorProfile.phone,
    email: vendorProfile.email,
    website: vendorProfile.website,
  })

  // Product form state
  const [productForm, setProductForm] = React.useState({
    name: '',
    nameAr: '',
    description: '',
    descriptionAr: '',
    price: '',
    category: '',
    categoryAr: '',
    stockCount: '',
  })

  React.useEffect(() => {
    if (editingProduct) {
      setProductForm({
        name: editingProduct.name,
        nameAr: editingProduct.nameAr,
        description: editingProduct.description,
        descriptionAr: editingProduct.descriptionAr,
        price: editingProduct.price.toString(),
        category: editingProduct.category,
        categoryAr: editingProduct.categoryAr,
        stockCount: editingProduct.stockCount.toString(),
      })
    }
  }, [editingProduct])

  const handleSaveProfile = () => {
    setVendorProfile({
      ...vendorProfile,
      ...profileForm,
    })
    setIsEditingProfile(false)
  }

  const handleCancelProfile = () => {
    setProfileForm({
      name: vendorProfile.name,
      nameAr: vendorProfile.nameAr,
      description: vendorProfile.description,
      descriptionAr: vendorProfile.descriptionAr,
      location: vendorProfile.location,
      locationAr: vendorProfile.locationAr,
      phone: vendorProfile.phone,
      email: vendorProfile.email,
      website: vendorProfile.website,
    })
    setIsEditingProfile(false)
  }

  const handleSaveProduct = () => {
    // In a real app, this would save to backend
    console.log('Saving product:', productForm)
    setEditingProduct(null)
  }

  const handleCancelProduct = () => {
    setEditingProduct(null)
    setProductForm({
      name: '',
      nameAr: '',
      description: '',
      descriptionAr: '',
      price: '',
      category: '',
      categoryAr: '',
      stockCount: '',
    })
  }

  const getStatusColor = (status: Product['status']) => {
    switch (status) {
      case 'in-stock':
        return 'text-green-600'
      case 'low-stock':
        return 'text-yellow-600'
      case 'out-of-stock':
        return 'text-red-600'
      default:
        return 'text-muted-foreground'
    }
  }

  const getStatusText = (status: Product['status']) => {
    if (isRTL) {
      switch (status) {
        case 'in-stock':
          return 'متوفر'
        case 'low-stock':
          return 'مخزون منخفض'
        case 'out-of-stock':
          return 'غير متوفر'
      }
    } else {
      switch (status) {
        case 'in-stock':
          return 'In Stock'
        case 'low-stock':
          return 'Low Stock'
        case 'out-of-stock':
          return 'Out of Stock'
      }
    }
  }

  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                {isRTL ? 'الرئيسية' : 'Home'}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/examples" className="hover:text-foreground transition-colors">
                {isRTL ? 'الأمثلة' : 'Examples'}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/examples/marketplace" className="hover:text-foreground transition-colors">
                {isRTL ? 'السوق' : 'Marketplace'}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">
              {isRTL ? 'لوحة التحكم' : 'Dashboard'}
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              {isRTL ? 'لوحة تحكم البائع' : 'Vendor Dashboard'}
            </h1>
            <p className="text-muted-foreground">
              {isRTL
                ? 'إدارة ملفك الشخصي ومنتجاتك وأعمالك'
                : 'Manage your profile, products, and business'}
            </p>
          </div>
          <Button asChild>
            <Link href="/examples/marketplace">
              <Store className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
              {isRTL ? 'عرض المتجر' : 'View Store'}
            </Link>
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {isRTL ? 'إجمالي المبيعات' : 'Total Sales'}
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <ArabicNumber value={vendorProfile.totalSales} />
              </div>
              <p className="text-xs text-muted-foreground">
                {isRTL ? 'جميع الأوقات' : 'All time'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {isRTL ? 'الإيرادات' : 'Revenue'}
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatSAR(vendorProfile.totalRevenue, isRTL)}
              </div>
              <p className="text-xs text-muted-foreground">
                {isRTL ? 'جميع الأوقات' : 'All time'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {isRTL ? 'التقييم' : 'Rating'}
              </CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <ArabicNumber value={vendorProfile.rating} />
              </div>
              <p className="text-xs text-muted-foreground">
                <ArabicNumber value={vendorProfile.reviewCount} />{' '}
                {isRTL ? 'تقييم' : 'reviews'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {isRTL ? 'المنتجات' : 'Products'}
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <ArabicNumber value={products.length} />
              </div>
              <p className="text-xs text-muted-foreground">
                {isRTL ? 'إجمالي المنتجات' : 'Total products'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="profile">
              <User className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
              {isRTL ? 'الملف الشخصي' : 'Profile'}
            </TabsTrigger>
            <TabsTrigger value="products">
              <Package className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
              {isRTL ? 'المنتجات' : 'Products'}
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{isRTL ? 'معلومات المتجر' : 'Store Information'}</CardTitle>
                    <CardDescription>
                      {isRTL
                        ? 'إدارة معلومات متجرك وتفاصيل الاتصال'
                        : 'Manage your store information and contact details'}
                    </CardDescription>
                  </div>
                  {!isEditingProfile && (
                    <Button onClick={() => setIsEditingProfile(true)} variant="outline">
                      <Edit className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                      {isRTL ? 'تعديل' : 'Edit'}
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Store Images */}
                <div className="space-y-4">
                  <div>
                    <Label>{isRTL ? 'صورة الغلاف' : 'Banner Image'}</Label>
                    <div
                      className="mt-2 h-48 rounded-lg bg-cover bg-center relative group"
                      style={{ backgroundImage: `url(${vendorProfile.banner})` }}
                    >
                      {isEditingProfile && (
                        <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="secondary" size="sm">
                            <Upload className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                            {isRTL ? 'تحميل صورة جديدة' : 'Upload New Image'}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label>{isRTL ? 'شعار المتجر' : 'Store Logo'}</Label>
                    <div className="mt-2 flex items-center gap-4">
                      <div
                        className="h-24 w-24 rounded-lg bg-cover bg-center relative group"
                        style={{ backgroundImage: `url(${vendorProfile.logo})` }}
                      >
                        {isEditingProfile && (
                          <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Upload className="h-6 w-6 text-white" />
                          </div>
                        )}
                      </div>
                      {isEditingProfile && (
                        <div className="text-sm text-muted-foreground">
                          {isRTL
                            ? 'انقر لتحميل شعار جديد (مستحسن: 200x200 بكسل)'
                            : 'Click to upload new logo (Recommended: 200x200px)'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Store Details Form */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="store-name">
                      {isRTL ? 'اسم المتجر (English)' : 'Store Name (English)'}
                    </Label>
                    <Input
                      id="store-name"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      disabled={!isEditingProfile}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="store-name-ar">
                      {isRTL ? 'اسم المتجر (عربي)' : 'Store Name (Arabic)'}
                    </Label>
                    <Input
                      id="store-name-ar"
                      value={profileForm.nameAr}
                      onChange={(e) => setProfileForm({ ...profileForm, nameAr: e.target.value })}
                      disabled={!isEditingProfile}
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="description">
                      {isRTL ? 'الوصف (English)' : 'Description (English)'}
                    </Label>
                    <Textarea
                      id="description"
                      value={profileForm.description}
                      onChange={(e) => setProfileForm({ ...profileForm, description: e.target.value })}
                      disabled={!isEditingProfile}
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description-ar">
                      {isRTL ? 'الوصف (عربي)' : 'Description (Arabic)'}
                    </Label>
                    <Textarea
                      id="description-ar"
                      value={profileForm.descriptionAr}
                      onChange={(e) => setProfileForm({ ...profileForm, descriptionAr: e.target.value })}
                      disabled={!isEditingProfile}
                      rows={4}
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="location">
                      {isRTL ? 'الموقع (English)' : 'Location (English)'}
                    </Label>
                    <div className="relative">
                      <MapPin className={cn(
                        'absolute top-3 h-4 w-4 text-muted-foreground',
                        isRTL ? 'right-3' : 'left-3'
                      )} />
                      <Input
                        id="location"
                        value={profileForm.location}
                        onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                        disabled={!isEditingProfile}
                        className={isRTL ? 'pe-10' : 'ps-10'}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location-ar">
                      {isRTL ? 'الموقع (عربي)' : 'Location (Arabic)'}
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute top-3 right-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="location-ar"
                        value={profileForm.locationAr}
                        onChange={(e) => setProfileForm({ ...profileForm, locationAr: e.target.value })}
                        disabled={!isEditingProfile}
                        className="pe-10"
                        dir="rtl"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      {isRTL ? 'رقم الهاتف' : 'Phone Number'}
                    </Label>
                    <div className="relative">
                      <Phone className={cn(
                        'absolute top-3 h-4 w-4 text-muted-foreground',
                        isRTL ? 'right-3' : 'left-3'
                      )} />
                      <Input
                        id="phone"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        disabled={!isEditingProfile}
                        className={isRTL ? 'pe-10' : 'ps-10'}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      {isRTL ? 'البريد الإلكتروني' : 'Email'}
                    </Label>
                    <div className="relative">
                      <Mail className={cn(
                        'absolute top-3 h-4 w-4 text-muted-foreground',
                        isRTL ? 'right-3' : 'left-3'
                      )} />
                      <Input
                        id="email"
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        disabled={!isEditingProfile}
                        className={isRTL ? 'pe-10' : 'ps-10'}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">
                      {isRTL ? 'الموقع الإلكتروني' : 'Website'}
                    </Label>
                    <div className="relative">
                      <Globe className={cn(
                        'absolute top-3 h-4 w-4 text-muted-foreground',
                        isRTL ? 'right-3' : 'left-3'
                      )} />
                      <Input
                        id="website"
                        value={profileForm.website}
                        onChange={(e) => setProfileForm({ ...profileForm, website: e.target.value })}
                        disabled={!isEditingProfile}
                        className={isRTL ? 'pe-10' : 'ps-10'}
                      />
                    </div>
                  </div>
                </div>

                {isEditingProfile && (
                  <div className="flex gap-3 justify-end pt-4 border-t">
                    <Button variant="outline" onClick={handleCancelProfile}>
                      <X className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                      {isRTL ? 'إلغاء' : 'Cancel'}
                    </Button>
                    <Button onClick={handleSaveProfile}>
                      <Save className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                      {isRTL ? 'حفظ التغييرات' : 'Save Changes'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            {editingProduct ? (
              // Product Edit Form
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>
                        {isRTL ? 'تعديل المنتج' : 'Edit Product'}
                      </CardTitle>
                      <CardDescription>
                        {isRTL
                          ? 'قم بتحديث معلومات منتجك'
                          : 'Update your product information'}
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" onClick={handleCancelProduct}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Product Image */}
                  <div>
                    <Label>{isRTL ? 'صورة المنتج' : 'Product Image'}</Label>
                    <div className="mt-2 flex items-center gap-4">
                      <div
                        className="h-32 w-32 rounded-lg bg-cover bg-center relative group"
                        style={{ backgroundImage: `url(${editingProduct.image})` }}
                      >
                        <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Upload className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <Button variant="outline" size="sm">
                          <ImageIcon className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                          {isRTL ? 'تحميل صورة جديدة' : 'Upload New Image'}
                        </Button>
                        <p className="text-sm text-muted-foreground mt-2">
                          {isRTL
                            ? 'مستحسن: 800x800 بكسل، PNG أو JPG'
                            : 'Recommended: 800x800px, PNG or JPG'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="product-name">
                        {isRTL ? 'اسم المنتج (English)' : 'Product Name (English)'}
                      </Label>
                      <Input
                        id="product-name"
                        value={productForm.name}
                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="product-name-ar">
                        {isRTL ? 'اسم المنتج (عربي)' : 'Product Name (Arabic)'}
                      </Label>
                      <Input
                        id="product-name-ar"
                        value={productForm.nameAr}
                        onChange={(e) => setProductForm({ ...productForm, nameAr: e.target.value })}
                        dir="rtl"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="product-description">
                        {isRTL ? 'الوصف (English)' : 'Description (English)'}
                      </Label>
                      <Textarea
                        id="product-description"
                        value={productForm.description}
                        onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="product-description-ar">
                        {isRTL ? 'الوصف (عربي)' : 'Description (Arabic)'}
                      </Label>
                      <Textarea
                        id="product-description-ar"
                        value={productForm.descriptionAr}
                        onChange={(e) => setProductForm({ ...productForm, descriptionAr: e.target.value })}
                        rows={4}
                        dir="rtl"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="price">
                        {isRTL ? 'السعر (SAR)' : 'Price (SAR)'}
                      </Label>
                      <Input
                        id="price"
                        type="number"
                        value={productForm.price}
                        onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="stock">
                        {isRTL ? 'الكمية المتوفرة' : 'Stock Count'}
                      </Label>
                      <Input
                        id="stock"
                        type="number"
                        value={productForm.stockCount}
                        onChange={(e) => setProductForm({ ...productForm, stockCount: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">
                        {isRTL ? 'الفئة' : 'Category'}
                      </Label>
                      <Select
                        value={productForm.category}
                        onValueChange={(value) => setProductForm({ ...productForm, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Electronics">
                            {isRTL ? 'إلكترونيات' : 'Electronics'}
                          </SelectItem>
                          <SelectItem value="Accessories">
                            {isRTL ? 'إكسسوارات' : 'Accessories'}
                          </SelectItem>
                          <SelectItem value="Gaming">
                            {isRTL ? 'ألعاب' : 'Gaming'}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-end pt-4 border-t">
                    <Button variant="outline" onClick={handleCancelProduct}>
                      <X className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                      {isRTL ? 'إلغاء' : 'Cancel'}
                    </Button>
                    <Button onClick={handleSaveProduct}>
                      <Save className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                      {isRTL ? 'حفظ التغييرات' : 'Save Changes'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              // Products List
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {isRTL ? 'إدارة المنتجات' : 'Product Management'}
                    </h2>
                    <p className="text-muted-foreground">
                      {isRTL
                        ? 'عرض وتعديل منتجاتك'
                        : 'View and edit your products'}
                    </p>
                  </div>
                  <Button>
                    <Plus className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                    {isRTL ? 'إضافة منتج' : 'Add Product'}
                  </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {products.map((product) => (
                    <Card key={product.id} className="overflow-hidden">
                      <div
                        className="h-48 bg-cover bg-center"
                        style={{ backgroundImage: `url(${product.image})` }}
                      />
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <CardTitle className="text-lg">
                              {isRTL ? product.nameAr : product.name}
                            </CardTitle>
                            <CardDescription className="line-clamp-2 mt-1">
                              {isRTL ? product.descriptionAr : product.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold">
                            {formatSAR(product.price, isRTL)}
                          </span>
                          <Badge variant="secondary">
                            {isRTL ? product.categoryAr : product.category}
                          </Badge>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">
                              {isRTL ? 'المخزون:' : 'Stock:'}
                            </span>
                            <span className={getStatusColor(product.status)}>
                              <ArabicNumber value={product.stockCount} />{' '}
                              ({getStatusText(product.status)})
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">
                              {isRTL ? 'المبيعات:' : 'Sales:'}
                            </span>
                            <span>
                              <ArabicNumber value={product.sales} />
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">
                              {isRTL ? 'التقييم:' : 'Rating:'}
                            </span>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <ArabicNumber value={product.rating} />
                              <span className="text-muted-foreground">
                                (<ArabicNumber value={product.reviewCount} />)
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => setEditingProduct(product)}
                          >
                            <Edit className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                            {isRTL ? 'تعديل' : 'Edit'}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            asChild
                          >
                            <Link href={`/examples/marketplace/${product.id}`}>
                              <Eye className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                              {isRTL ? 'عرض' : 'View'}
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
