'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Home,
  MapPin,
  Bed,
  Bath,
  Square,
  TrendingUp,
  Search,
  Filter,
  Heart,
  Share2,
  Building2,
  Car,
} from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'

interface Property {
  id: string
  title: string
  titleAr: string
  description: string
  descriptionAr: string
  price: number
  location: string
  locationAr: string
  bedrooms: number
  bathrooms: number
  area: number
  type: 'villa' | 'apartment' | 'townhouse' | 'penthouse'
  status: 'sale' | 'rent'
  featured: boolean
  imageUrl: string
  amenities: string[]
  amenitiesAr: string[]
}

export default function RealEstatePage() {
  const { locale } = useDirection()
  const [searchQuery, setSearchQuery] = React.useState('')
  const [propertyType, setPropertyType] = React.useState('all')
  const [priceRange, setPriceRange] = React.useState('all')

  // Mock property data
  const properties: Property[] = [
    {
      id: '1',
      title: 'Luxury Villa in Dubai Hills',
      titleAr: 'فيلا فاخرة في دبي هيلز',
      description: 'Stunning 5-bedroom villa with private pool and garden in prestigious Dubai Hills Estate.',
      descriptionAr: 'فيلا مذهلة من 5 غرف نوم مع مسبح خاص وحديقة في دبي هيلز استيت المرموقة.',
      price: 8500000,
      location: 'Dubai Hills Estate, Dubai',
      locationAr: 'دبي هيلز استيت، دبي',
      bedrooms: 5,
      bathrooms: 6,
      area: 4500,
      type: 'villa',
      status: 'sale',
      featured: true,
      imageUrl: '/placeholder-property.jpg',
      amenities: ['Private Pool', 'Garden', 'Maid Room', 'Smart Home', 'Parking'],
      amenitiesAr: ['مسبح خاص', 'حديقة', 'غرفة خادمة', 'منزل ذكي', 'موقف سيارات'],
    },
    {
      id: '2',
      title: 'Modern Apartment in Downtown',
      titleAr: 'شقة عصرية في وسط المدينة',
      description: 'Contemporary 2-bedroom apartment with stunning Burj Khalifa views.',
      descriptionAr: 'شقة عصرية من غرفتي نوم مع إطلالات خلابة على برج خليفة.',
      price: 150000,
      location: 'Downtown Dubai',
      locationAr: 'وسط مدينة دبي',
      bedrooms: 2,
      bathrooms: 3,
      area: 1200,
      type: 'apartment',
      status: 'rent',
      featured: true,
      imageUrl: '/placeholder-property.jpg',
      amenities: ['Gym', 'Pool', 'Concierge', 'Parking'],
      amenitiesAr: ['صالة رياضية', 'مسبح', 'خدمة الكونسيرج', 'موقف سيارات'],
    },
    {
      id: '3',
      title: 'Spacious Townhouse in Arabian Ranches',
      titleAr: 'تاون هاوس واسع في المرابع العربية',
      description: '4-bedroom townhouse with community facilities and green spaces.',
      descriptionAr: 'تاون هاوس من 4 غرف نوم مع مرافق مجتمعية ومساحات خضراء.',
      price: 3200000,
      location: 'Arabian Ranches, Dubai',
      locationAr: 'المرابع العربية، دبي',
      bedrooms: 4,
      bathrooms: 4,
      area: 2800,
      type: 'townhouse',
      status: 'sale',
      featured: false,
      imageUrl: '/placeholder-property.jpg',
      amenities: ['Community Pool', 'Park', 'BBQ Area', 'Kids Play Area'],
      amenitiesAr: ['مسبح مشترك', 'حديقة', 'منطقة شواء', 'منطقة لعب أطفال'],
    },
    {
      id: '4',
      title: 'Penthouse with Sea View',
      titleAr: 'بنتهاوس مع إطلالة بحرية',
      description: 'Exclusive penthouse with panoramic sea views and private terrace.',
      descriptionAr: 'بنتهاوس حصري مع إطلالات بانورامية على البحر وشرفة خاصة.',
      price: 250000,
      location: 'Dubai Marina',
      locationAr: 'دبي مارينا',
      bedrooms: 3,
      bathrooms: 4,
      area: 2200,
      type: 'penthouse',
      status: 'rent',
      featured: true,
      imageUrl: '/placeholder-property.jpg',
      amenities: ['Private Terrace', 'Sea View', 'Gym', 'Pool', 'Concierge'],
      amenitiesAr: ['شرفة خاصة', 'إطلالة بحرية', 'صالة رياضية', 'مسبح', 'خدمة الكونسيرج'],
    },
    {
      id: '5',
      title: 'Family Villa in Jumeirah',
      titleAr: 'فيلا عائلية في جميرا',
      description: 'Traditional family villa in prime location with modern amenities.',
      descriptionAr: 'فيلا عائلية تقليدية في موقع متميز مع وسائل راحة عصرية.',
      price: 6800000,
      location: 'Jumeirah, Dubai',
      locationAr: 'جميرا، دبي',
      bedrooms: 6,
      bathrooms: 7,
      area: 5200,
      type: 'villa',
      status: 'sale',
      featured: false,
      imageUrl: '/placeholder-property.jpg',
      amenities: ['Private Pool', 'Garden', 'Elevator', 'Driver Room', 'Parking'],
      amenitiesAr: ['مسبح خاص', 'حديقة', 'مصعد', 'غرفة سائق', 'موقف سيارات'],
    },
    {
      id: '6',
      title: 'Studio Apartment in Business Bay',
      titleAr: 'شقة استوديو في الخليج التجاري',
      description: 'Compact studio ideal for professionals with modern finishes.',
      descriptionAr: 'استوديو مدمج مثالي للمحترفين مع تشطيبات عصرية.',
      price: 45000,
      location: 'Business Bay, Dubai',
      locationAr: 'الخليج التجاري، دبي',
      bedrooms: 1,
      bathrooms: 1,
      area: 450,
      type: 'apartment',
      status: 'rent',
      featured: false,
      imageUrl: '/placeholder-property.jpg',
      amenities: ['Gym', 'Pool', 'Security', 'Parking'],
      amenitiesAr: ['صالة رياضية', 'مسبح', 'أمن', 'موقف سيارات'],
    },
  ]

  const stats = [
    {
      label: 'إجمالي العقارات',
      labelEn: 'Total Properties',
      value: '2,543',
      icon: Building2,
      trend: '+12%',
    },
    {
      label: 'متوسط السعر',
      labelEn: 'Average Price',
      value: '4.2M AED',
      icon: TrendingUp,
      trend: '+8%',
    },
    {
      label: 'عقارات للبيع',
      labelEn: 'For Sale',
      value: '1,234',
      icon: Home,
      trend: '+5%',
    },
    {
      label: 'عقارات للإيجار',
      labelEn: 'For Rent',
      value: '1,309',
      icon: Home,
      trend: '+15%',
    },
  ]

  const getPropertyTypeLabel = (type: string) => {
    const types = {
      villa: { en: 'Villa', ar: 'فيلا' },
      apartment: { en: 'Apartment', ar: 'شقة' },
      townhouse: { en: 'Townhouse', ar: 'تاون هاوس' },
      penthouse: { en: 'Penthouse', ar: 'بنتهاوس' },
    }
    return locale === 'ar' ? types[type as keyof typeof types].ar : types[type as keyof typeof types].en
  }

  const getStatusLabel = (status: string) => {
    return status === 'sale'
      ? locale === 'ar'
        ? 'للبيع'
        : 'For Sale'
      : locale === 'ar'
        ? 'للإيجار'
        : 'For Rent'
  }

  const formatPrice = (price: number, status: string) => {
    const formatted = new Intl.NumberFormat('en-US').format(price)
    const suffix = status === 'rent' ? (locale === 'ar' ? '/سنوياً' : '/year') : ''
    return `${formatted} ${locale === 'ar' ? 'د.إ' : 'AED'}${suffix}`
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b bg-background">
        <div className="container py-3">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  {locale === 'ar' ? 'الرئيسية' : 'Home'}
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/examples" className="hover:text-foreground transition-colors">
                  {locale === 'ar' ? 'الأمثلة' : 'Examples'}
                </Link>
              </li>
              <li>/</li>
              <li className="text-foreground font-medium">
                {locale === 'ar' ? 'لوحة العقارات' : 'Real Estate Dashboard'}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="border-b">
        <div className="container py-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              {locale === 'ar' ? 'لوحة العقارات' : 'Real Estate Dashboard'}
            </h1>
            <p className="text-muted-foreground">
              {locale === 'ar'
                ? 'تصفح أفضل العقارات في دبي والإمارات'
                : 'Browse premium properties in Dubai and UAE'}
            </p>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {locale === 'ar' ? stat.label : stat.labelEn}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">{stat.trend}</span>{' '}
                  {locale === 'ar' ? 'عن الشهر الماضي' : 'from last month'}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search & Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={
                      locale === 'ar' ? 'ابحث عن موقع أو نوع عقار...' : 'Search location or property type...'
                    }
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="ps-10"
                  />
                </div>
              </div>
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger>
                  <SelectValue placeholder={locale === 'ar' ? 'نوع العقار' : 'Property Type'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{locale === 'ar' ? 'جميع الأنواع' : 'All Types'}</SelectItem>
                  <SelectItem value="villa">{locale === 'ar' ? 'فيلا' : 'Villa'}</SelectItem>
                  <SelectItem value="apartment">{locale === 'ar' ? 'شقة' : 'Apartment'}</SelectItem>
                  <SelectItem value="townhouse">{locale === 'ar' ? 'تاون هاوس' : 'Townhouse'}</SelectItem>
                  <SelectItem value="penthouse">{locale === 'ar' ? 'بنتهاوس' : 'Penthouse'}</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger>
                  <SelectValue placeholder={locale === 'ar' ? 'نطاق السعر' : 'Price Range'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{locale === 'ar' ? 'جميع الأسعار' : 'All Prices'}</SelectItem>
                  <SelectItem value="low">{locale === 'ar' ? 'أقل من 1M' : 'Under 1M'}</SelectItem>
                  <SelectItem value="mid">{locale === 'ar' ? '1M - 5M' : '1M - 5M'}</SelectItem>
                  <SelectItem value="high">{locale === 'ar' ? 'أكثر من 5M' : 'Over 5M'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Property Grid */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {locale === 'ar' ? 'العقارات المميزة' : 'Featured Properties'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {locale === 'ar' ? `${properties.length} عقار متاح` : `${properties.length} properties available`}
            </p>
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 me-2" />
            {locale === 'ar' ? 'مزيد من الفلاتر' : 'More Filters'}
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {/* Property Image */}
              <div className="relative h-48 bg-muted">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Home className="h-16 w-16 text-muted-foreground/30" />
                </div>
                <div className="absolute top-3 start-3 flex gap-2">
                  <Badge variant={property.status === 'sale' ? 'default' : 'secondary'}>
                    {getStatusLabel(property.status)}
                  </Badge>
                  {property.featured && (
                    <Badge variant="destructive">{locale === 'ar' ? 'مميز' : 'Featured'}</Badge>
                  )}
                </div>
                <div className="absolute top-3 end-3 flex gap-2">
                  <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white/90">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white/90">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-1">
                      {locale === 'ar' ? property.titleAr : property.title}
                    </CardTitle>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3" />
                      <span className="line-clamp-1">
                        {locale === 'ar' ? property.locationAr : property.location}
                      </span>
                    </div>
                  </div>
                  <Badge variant="outline">{getPropertyTypeLabel(property.type)}</Badge>
                </div>
                <CardDescription className="line-clamp-2">
                  {locale === 'ar' ? property.descriptionAr : property.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* Property Details */}
                <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Bed className="h-4 w-4" />
                    <span>{property.bedrooms}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4" />
                    <span>{property.bathrooms}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Square className="h-4 w-4" />
                    <span>
                      {property.area} {locale === 'ar' ? 'قدم²' : 'sqft'}
                    </span>
                  </div>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {(locale === 'ar' ? property.amenitiesAr : property.amenities)
                    .slice(0, 3)
                    .map((amenity, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  {property.amenities.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{property.amenities.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <div className="text-2xl font-bold">{formatPrice(property.price, property.status)}</div>
                  </div>
                  <Button size="sm">
                    {locale === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
