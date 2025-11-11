'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { ListingCard, type ListingCardBadge, type ListingCardAction, type ListingCardStat, type ListingCardTag } from '@/components/ui/listing-card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
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
  X,
  SlidersHorizontal,
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
  city: string
  cityAr: string
  bedrooms: number
  bathrooms: number
  area: number
  type: 'villa' | 'apartment' | 'townhouse' | 'penthouse'
  status: 'sale' | 'rent'
  featured: boolean
  imageUrl: string
  amenities: string[]
  amenitiesAr: string[]
  furnished: boolean
  parking: number
  yearBuilt: number
}

// Generate more realistic mock data
const generateProperties = (): Property[] => {
  const locations = [
    { en: 'Dubai Hills Estate, Dubai', ar: 'دبي هيلز استيت، دبي', city: 'Dubai', cityAr: 'دبي' },
    { en: 'Downtown Dubai', ar: 'وسط مدينة دبي', city: 'Dubai', cityAr: 'دبي' },
    { en: 'Arabian Ranches, Dubai', ar: 'المرابع العربية، دبي', city: 'Dubai', cityAr: 'دبي' },
    { en: 'Dubai Marina', ar: 'دبي مارينا', city: 'Dubai', cityAr: 'دبي' },
    { en: 'Jumeirah, Dubai', ar: 'جميرا، دبي', city: 'Dubai', cityAr: 'دبي' },
    { en: 'Business Bay, Dubai', ar: 'الخليج التجاري، دبي', city: 'Dubai', cityAr: 'دبي' },
    { en: 'Palm Jumeirah, Dubai', ar: 'نخلة جميرا، دبي', city: 'Dubai', cityAr: 'دبي' },
    { en: 'Jumeirah Village Circle, Dubai', ar: 'قرية جميرا الدائرية، دبي', city: 'Dubai', cityAr: 'دبي' },
    { en: 'Al Reem Island, Abu Dhabi', ar: 'جزيرة الريم، أبوظبي', city: 'Abu Dhabi', cityAr: 'أبوظبي' },
    { en: 'Yas Island, Abu Dhabi', ar: 'جزيرة ياس، أبوظبي', city: 'Abu Dhabi', cityAr: 'أبوظبي' },
    { en: 'Al Majaz, Sharjah', ar: 'المجاز، الشارقة', city: 'Sharjah', cityAr: 'الشارقة' },
    { en: 'Muwaileh, Sharjah', ar: 'مويلح، الشارقة', city: 'Sharjah', cityAr: 'الشارقة' },
  ]

  const propertyTypes: Array<{ type: Property['type']; beds: number[]; baths: number[] }> = [
    { type: 'villa', beds: [3, 4, 5, 6], baths: [3, 4, 5, 6, 7] },
    { type: 'apartment', beds: [1, 2, 3], baths: [1, 2, 3] },
    { type: 'townhouse', beds: [3, 4], baths: [3, 4] },
    { type: 'penthouse', beds: [3, 4], baths: [3, 4, 5] },
  ]

  const amenitiesList = [
    { en: ['Private Pool', 'Garden', 'Maid Room', 'Smart Home', 'Parking', 'Gym', 'Security'],
      ar: ['مسبح خاص', 'حديقة', 'غرفة خادمة', 'منزل ذكي', 'موقف سيارات', 'صالة رياضية', 'أمن'] },
    { en: ['Gym', 'Pool', 'Concierge', 'Parking', 'Security', 'Balcony'],
      ar: ['صالة رياضية', 'مسبح', 'خدمة الكونسيرج', 'موقف سيارات', 'أمن', 'شرفة'] },
    { en: ['Community Pool', 'Park', 'BBQ Area', 'Kids Play Area', 'Parking'],
      ar: ['مسبح مشترك', 'حديقة', 'منطقة شواء', 'منطقة لعب أطفال', 'موقف سيارات'] },
    { en: ['Private Terrace', 'Sea View', 'Gym', 'Pool', 'Concierge', 'Parking'],
      ar: ['شرفة خاصة', 'إطلالة بحرية', 'صالة رياضية', 'مسبح', 'خدمة الكونسيرج', 'موقف سيارات'] },
  ]

  const properties: Property[] = []

  for (let i = 0; i < 24; i++) {
    const propType = propertyTypes[i % propertyTypes.length]
    const location = locations[i % locations.length]
    const bedrooms = propType.beds[i % propType.beds.length]
    const bathrooms = propType.baths[i % propType.baths.length]
    const status: Property['status'] = i % 3 === 0 ? 'rent' : 'sale'
    const amenities = amenitiesList[i % amenitiesList.length]

    // Calculate price based on type and bedrooms
    let basePrice = 0
    if (propType.type === 'villa') {
      basePrice = status === 'sale' ? 3000000 + (bedrooms * 1000000) : 120000 + (bedrooms * 30000)
    } else if (propType.type === 'penthouse') {
      basePrice = status === 'sale' ? 2500000 + (bedrooms * 800000) : 180000 + (bedrooms * 50000)
    } else if (propType.type === 'townhouse') {
      basePrice = status === 'sale' ? 2000000 + (bedrooms * 600000) : 90000 + (bedrooms * 20000)
    } else {
      basePrice = status === 'sale' ? 800000 + (bedrooms * 400000) : 45000 + (bedrooms * 15000)
    }

    const price = basePrice + (i * 100000)
    const area = bedrooms * 800 + (propType.type === 'villa' ? 1000 : 400)

    properties.push({
      id: `prop-${i + 1}`,
      title: `${propType.type.charAt(0).toUpperCase() + propType.type.slice(1)} ${bedrooms}BR in ${location.en.split(',')[0]}`,
      titleAr: `${propType.type === 'villa' ? 'فيلا' : propType.type === 'apartment' ? 'شقة' : propType.type === 'townhouse' ? 'تاون هاوس' : 'بنتهاوس'} ${bedrooms} غرف في ${location.ar.split('،')[0]}`,
      description: `${propType.type === 'villa' ? 'Stunning' : 'Modern'} ${bedrooms}-bedroom ${propType.type} with ${bathrooms} bathrooms in ${location.en.split(',')[0]}.`,
      descriptionAr: `${propType.type === 'villa' ? 'مذهلة' : 'عصرية'} ${propType.type === 'villa' ? 'فيلا' : propType.type === 'apartment' ? 'شقة' : propType.type === 'townhouse' ? 'تاون هاوس' : 'بنتهاوس'} من ${bedrooms} غرف نوم و ${bathrooms} حمامات في ${location.ar.split('،')[0]}.`,
      price,
      location: location.en,
      locationAr: location.ar,
      city: location.city,
      cityAr: location.cityAr,
      bedrooms,
      bathrooms,
      area,
      type: propType.type,
      status,
      featured: i % 5 === 0,
      imageUrl: '/placeholder-property.jpg',
      amenities: amenities.en,
      amenitiesAr: amenities.ar,
      furnished: i % 3 === 0,
      parking: bedrooms > 2 ? 2 : 1,
      yearBuilt: 2015 + (i % 9),
    })
  }

  return properties
}

export default function RealEstatePage() {
  const { locale } = useDirection()

  // Data
  const [allProperties] = React.useState<Property[]>(generateProperties())
  const [filteredProperties, setFilteredProperties] = React.useState<Property[]>(allProperties)

  // Search & Filter state
  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedCity, setSelectedCity] = React.useState('all')
  const [selectedType, setSelectedType] = React.useState('all')
  const [selectedStatus, setSelectedStatus] = React.useState('all')

  // Advanced filters
  const [bedroomFilter, setBedroomFilter] = React.useState<string[]>([])
  const [priceRange, setPriceRange] = React.useState<number[]>([0, 10000000])
  const [areaRange, setAreaRange] = React.useState<number[]>([0, 10000])
  const [furnishedOnly, setFurnishedOnly] = React.useState(false)
  const [featuredOnly, setFeaturedOnly] = React.useState(false)

  // Pagination
  const [currentPage, setCurrentPage] = React.useState(1)
  const propertiesPerPage = 9
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage)

  // Dialog state
  const [filterDialogOpen, setFilterDialogOpen] = React.useState(false)

  // Apply filters
  React.useEffect(() => {
    let filtered = [...allProperties]

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.titleAr.includes(query) ||
          p.location.toLowerCase().includes(query) ||
          p.locationAr.includes(query) ||
          p.city.toLowerCase().includes(query)
      )
    }

    // City filter
    if (selectedCity !== 'all') {
      filtered = filtered.filter((p) => p.city === selectedCity)
    }

    // Type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter((p) => p.type === selectedType)
    }

    // Status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter((p) => p.status === selectedStatus)
    }

    // Bedroom filter
    if (bedroomFilter.length > 0) {
      filtered = filtered.filter((p) => bedroomFilter.includes(String(p.bedrooms)))
    }

    // Price range
    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Area range
    filtered = filtered.filter((p) => p.area >= areaRange[0] && p.area <= areaRange[1])

    // Furnished filter
    if (furnishedOnly) {
      filtered = filtered.filter((p) => p.furnished)
    }

    // Featured filter
    if (featuredOnly) {
      filtered = filtered.filter((p) => p.featured)
    }

    setFilteredProperties(filtered)
    setCurrentPage(1) // Reset to first page
  }, [searchQuery, selectedCity, selectedType, selectedStatus, bedroomFilter, priceRange, areaRange, furnishedOnly, featuredOnly, allProperties])

  // Paginated properties
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * propertiesPerPage,
    currentPage * propertiesPerPage
  )

  // Stats
  const stats = [
    {
      label: 'إجمالي العقارات',
      labelEn: 'Total Properties',
      value: filteredProperties.length.toLocaleString(),
      icon: Building2,
      trend: '+12%',
    },
    {
      label: 'متوسط السعر',
      labelEn: 'Average Price',
      value:
        filteredProperties.length > 0
          ? `${(filteredProperties.reduce((sum, p) => sum + p.price, 0) / filteredProperties.length / 1000000).toFixed(1)}M`
          : '0',
      icon: TrendingUp,
      trend: '+8%',
    },
    {
      label: 'عقارات للبيع',
      labelEn: 'For Sale',
      value: filteredProperties.filter((p) => p.status === 'sale').length.toLocaleString(),
      icon: Home,
      trend: '+5%',
    },
    {
      label: 'عقارات للإيجار',
      labelEn: 'For Rent',
      value: filteredProperties.filter((p) => p.status === 'rent').length.toLocaleString(),
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
    return status === 'sale' ? (locale === 'ar' ? 'للبيع' : 'For Sale') : locale === 'ar' ? 'للإيجار' : 'For Rent'
  }

  const formatPrice = (price: number, status: string) => {
    const formatted = new Intl.NumberFormat('en-US').format(price)
    const suffix = status === 'rent' ? (locale === 'ar' ? '/سنوياً' : '/year') : ''
    return `${formatted} ${locale === 'ar' ? 'د.إ' : 'AED'}${suffix}`
  }

  const clearAdvancedFilters = () => {
    setBedroomFilter([])
    setPriceRange([0, 10000000])
    setAreaRange([0, 10000])
    setFurnishedOnly(false)
    setFeaturedOnly(false)
  }

  const activeFiltersCount =
    bedroomFilter.length +
    (furnishedOnly ? 1 : 0) +
    (featuredOnly ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 10000000 ? 1 : 0) +
    (areaRange[0] > 0 || areaRange[1] < 10000 ? 1 : 0)

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
              {locale === 'ar' ? 'تصفح أفضل العقارات في دبي والإمارات' : 'Browse premium properties in Dubai and UAE'}
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
                <CardTitle className="text-sm font-medium">{locale === 'ar' ? stat.label : stat.labelEn}</CardTitle>
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
            <div className="grid gap-4 md:grid-cols-5">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={locale === 'ar' ? 'ابحث عن موقع أو مدينة...' : 'Search location or city...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="ps-10"
                  />
                </div>
              </div>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue placeholder={locale === 'ar' ? 'المدينة' : 'City'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{locale === 'ar' ? 'جميع المدن' : 'All Cities'}</SelectItem>
                  <SelectItem value="Dubai">{locale === 'ar' ? 'دبي' : 'Dubai'}</SelectItem>
                  <SelectItem value="Abu Dhabi">{locale === 'ar' ? 'أبوظبي' : 'Abu Dhabi'}</SelectItem>
                  <SelectItem value="Sharjah">{locale === 'ar' ? 'الشارقة' : 'Sharjah'}</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedType} onValueChange={setSelectedType}>
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
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder={locale === 'ar' ? 'الحالة' : 'Status'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{locale === 'ar' ? 'الكل' : 'All'}</SelectItem>
                  <SelectItem value="sale">{locale === 'ar' ? 'للبيع' : 'For Sale'}</SelectItem>
                  <SelectItem value="rent">{locale === 'ar' ? 'للإيجار' : 'For Rent'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Property Grid Header */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {locale === 'ar' ? 'العقارات المتاحة' : 'Available Properties'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {locale === 'ar'
                ? `${filteredProperties.length} عقار متاح`
                : `${filteredProperties.length} properties available`}
            </p>
          </div>
          <div className="flex gap-2">
            {activeFiltersCount > 0 && (
              <Button variant="outline" size="sm" onClick={clearAdvancedFilters}>
                <X className="h-4 w-4 me-2" />
                {locale === 'ar' ? 'مسح الفلاتر' : 'Clear Filters'} ({activeFiltersCount})
              </Button>
            )}
            <Dialog open={filterDialogOpen} onOpenChange={setFilterDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <SlidersHorizontal className="h-4 w-4 me-2" />
                  {locale === 'ar' ? 'مزيد من الفلاتر' : 'More Filters'}
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ms-2">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>{locale === 'ar' ? 'فلاتر متقدمة' : 'Advanced Filters'}</DialogTitle>
                  <DialogDescription>
                    {locale === 'ar'
                      ? 'قم بتخصيص بحثك للعثور على العقار المثالي'
                      : 'Customize your search to find the perfect property'}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                  {/* Bedrooms */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium">
                      {locale === 'ar' ? 'عدد غرف النوم' : 'Bedrooms'}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['1', '2', '3', '4', '5', '6+'].map((bed) => (
                        <Button
                          key={bed}
                          variant={bedroomFilter.includes(bed) ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => {
                            if (bedroomFilter.includes(bed)) {
                              setBedroomFilter(bedroomFilter.filter((b) => b !== bed))
                            } else {
                              setBedroomFilter([...bedroomFilter, bed])
                            }
                          }}
                        >
                          {bed}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">
                        {locale === 'ar' ? 'نطاق السعر (د.إ)' : 'Price Range (AED)'}
                      </label>
                      <span className="text-sm text-muted-foreground">
                        {new Intl.NumberFormat('en-US').format(priceRange[0])} -{' '}
                        {new Intl.NumberFormat('en-US').format(priceRange[1])}
                      </span>
                    </div>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      min={0}
                      max={10000000}
                      step={100000}
                      className="w-full"
                    />
                  </div>

                  {/* Area Range */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">
                        {locale === 'ar' ? 'المساحة (قدم مربع)' : 'Area (sqft)'}
                      </label>
                      <span className="text-sm text-muted-foreground">
                        {new Intl.NumberFormat('en-US').format(areaRange[0])} -{' '}
                        {new Intl.NumberFormat('en-US').format(areaRange[1])}
                      </span>
                    </div>
                    <Slider
                      value={areaRange}
                      onValueChange={setAreaRange}
                      min={0}
                      max={10000}
                      step={100}
                      className="w-full"
                    />
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Checkbox
                        id="furnished"
                        checked={furnishedOnly}
                        onCheckedChange={(checked) => setFurnishedOnly(checked as boolean)}
                      />
                      <label
                        htmlFor="furnished"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {locale === 'ar' ? 'مفروش فقط' : 'Furnished Only'}
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Checkbox
                        id="featured"
                        checked={featuredOnly}
                        onCheckedChange={(checked) => setFeaturedOnly(checked as boolean)}
                      />
                      <label
                        htmlFor="featured"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {locale === 'ar' ? 'عقارات مميزة فقط' : 'Featured Properties Only'}
                      </label>
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={clearAdvancedFilters}>
                    {locale === 'ar' ? 'إعادة تعيين' : 'Reset'}
                  </Button>
                  <Button onClick={() => setFilterDialogOpen(false)}>
                    {locale === 'ar' ? 'تطبيق الفلاتر' : 'Apply Filters'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Property Grid */}
        {paginatedProperties.length === 0 ? (
          <Card className="p-12">
            <div className="text-center">
              <Home className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {locale === 'ar' ? 'لم يتم العثور على عقارات' : 'No Properties Found'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {locale === 'ar'
                  ? 'جرب تعديل الفلاتر أو البحث للعثور على المزيد من النتائج'
                  : 'Try adjusting your filters or search to find more results'}
              </p>
              <Button variant="outline" onClick={() => {
                setSearchQuery('')
                setSelectedCity('all')
                setSelectedType('all')
                setSelectedStatus('all')
                clearAdvancedFilters()
              }}>
                {locale === 'ar' ? 'مسح جميع الفلاتر' : 'Clear All Filters'}
              </Button>
            </div>
          </Card>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
              {paginatedProperties.map((property) => {
                // Prepare badges
                const badges: ListingCardBadge[] = [
                  {
                    label: getStatusLabel(property.status),
                    variant: property.status === 'sale' ? 'default' : 'secondary',
                  },
                ]
                if (property.featured) {
                  badges.push({
                    label: locale === 'ar' ? 'مميز' : 'Featured',
                    variant: 'destructive',
                  })
                }
                if (property.furnished) {
                  badges.push({
                    label: locale === 'ar' ? 'مفروش' : 'Furnished',
                    variant: 'outline',
                    className: 'bg-background/90',
                  })
                }

                // Prepare actions
                const actions: ListingCardAction[] = [
                  {
                    icon: Heart,
                    label: locale === 'ar' ? 'إضافة للمفضلة' : 'Add to favorites',
                    onClick: () => console.log('Favorite clicked'),
                  },
                  {
                    icon: Share2,
                    label: locale === 'ar' ? 'مشاركة' : 'Share',
                    onClick: () => console.log('Share clicked'),
                  },
                ]

                // Prepare stats
                const stats: ListingCardStat[] = [
                  {
                    icon: Bed,
                    value: property.bedrooms,
                    label: locale === 'ar' ? 'غرف النوم' : 'Bedrooms',
                  },
                  {
                    icon: Bath,
                    value: property.bathrooms,
                    label: locale === 'ar' ? 'الحمامات' : 'Bathrooms',
                  },
                  {
                    icon: Square,
                    value: `${property.area.toLocaleString()} ${locale === 'ar' ? 'قدم²' : 'sqft'}`,
                    label: locale === 'ar' ? 'المساحة' : 'Area',
                  },
                ]

                // Prepare tags
                const tags: ListingCardTag[] = (locale === 'ar' ? property.amenitiesAr : property.amenities).map(
                  (amenity) => ({
                    label: amenity,
                    variant: 'secondary',
                  })
                )

                return (
                  <Link href={`/examples/real-estate/${property.id}`} key={property.id}>
                    <ListingCard
                      title={locale === 'ar' ? property.titleAr : property.title}
                      subtitle={
                        <>
                          <MapPin className="h-3 w-3 inline me-1" />
                          {locale === 'ar' ? property.locationAr : property.location}
                        </>
                      }
                      description={locale === 'ar' ? property.descriptionAr : property.description}
                      price={formatPrice(property.price, property.status)}
                      placeholderIcon={Home}
                      badges={badges}
                      actions={actions}
                      stats={stats}
                      tags={tags}
                      maxTags={3}
                      typeBadge={getPropertyTypeLabel(property.type)}
                      featured={property.featured}
                      imageAspect="wide"
                    />
                  </Link>
                )
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Show first page, last page, current page, and pages around current
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => setCurrentPage(page)}
                            isActive={currentPage === page}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )
                    }
                    return null
                  })}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </div>
    </div>
  )
}
