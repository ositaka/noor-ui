'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
  House,
  MapPin,
  Bed,
  Bathtub,
  Square,
  TrendUp,
  MagnifyingGlass,
  Funnel,
  Heart,
  ShareNetwork,
  Buildings,
  X,
  Sliders,
} from '@phosphor-icons/react'
import { useDirection } from '@/components/providers/direction-provider'
import { DirectionToggle } from '@/components/docs/direction-toggle'

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

const propertyImages: Record<Property['type'], string> = {
  villa: '/examples/real-estate/villa.jpg',
  apartment: '/examples/real-estate/apartment.jpg',
  townhouse: '/examples/real-estate/townhouse.jpg',
  penthouse: '/examples/real-estate/penthouse.jpg',
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
  const router = useRouter()
  const isRTL = locale === 'ar'

  const t = isRTL ? {
    home: 'الرئيسية',
    examples: 'الأمثلة',
    dashboard: 'لوحة العقارات',
    subtitle: 'تصفح أفضل العقارات في دبي والإمارات',
    totalProperties: 'إجمالي العقارات',
    averagePrice: 'متوسط السعر',
    forSale: 'عقارات للبيع',
    forRent: 'عقارات للإيجار',
    fromLastMonth: 'عن الشهر الماضي',
    searchPlaceholder: 'ابحث عن موقع أو مدينة...',
    searchLabel: 'ابحث عن موقع أو مدينة',
    cityLabel: 'المدينة',
    allCities: 'جميع المدن',
    dubai: 'دبي',
    abuDhabi: 'أبوظبي',
    sharjah: 'الشارقة',
    typeLabel: 'نوع العقار',
    allTypes: 'جميع الأنواع',
    villa: 'فيلا',
    apartment: 'شقة',
    townhouse: 'تاون هاوس',
    penthouse: 'بنتهاوس',
    statusLabel: 'الحالة',
    all: 'الكل',
    sale: 'للبيع',
    rent: 'للإيجار',
    availableProperties: 'العقارات المتاحة',
    propertiesCount: (n: number) => `${n} عقار متاح`,
    clearFilters: 'مسح الفلاتر',
    moreFilters: 'مزيد من الفلاتر',
    advancedFilters: 'فلاتر متقدمة',
    advancedFiltersDesc: 'قم بتخصيص بحثك للعثور على العقار المثالي',
    bedrooms: 'عدد غرف النوم',
    priceRange: 'نطاق السعر (د.إ)',
    areaRange: 'المساحة (قدم مربع)',
    furnishedOnly: 'مفروش فقط',
    featuredOnly: 'عقارات مميزة فقط',
    reset: 'إعادة تعيين',
    applyFilters: 'تطبيق الفلاتر',
    noProperties: 'لم يتم العثور على عقارات',
    noPropertiesDesc: 'جرب تعديل الفلاتر أو البحث للعثور على المزيد من النتائج',
    clearAllFilters: 'مسح جميع الفلاتر',
    featured: 'مميز',
    furnished: 'مفروش',
    addToFavorites: 'إضافة للمفضلة',
    share: 'مشاركة',
    bedroomsLabel: 'غرف النوم',
    bathroomsLabel: 'الحمامات',
    areaLabel: 'المساحة',
    sqft: 'قدم²',
    currency: 'د.إ',
    perYear: '/سنوياً',
    million: 'م',
  } : {
    home: 'Home',
    examples: 'Examples',
    dashboard: 'Real Estate Dashboard',
    subtitle: 'Browse premium properties in Dubai and UAE',
    totalProperties: 'Total Properties',
    averagePrice: 'Average Price',
    forSale: 'For Sale',
    forRent: 'For Rent',
    fromLastMonth: 'from last month',
    searchPlaceholder: 'Search location or city...',
    searchLabel: 'Search location or city',
    cityLabel: 'City',
    allCities: 'All Cities',
    dubai: 'Dubai',
    abuDhabi: 'Abu Dhabi',
    sharjah: 'Sharjah',
    typeLabel: 'Property Type',
    allTypes: 'All Types',
    villa: 'Villa',
    apartment: 'Apartment',
    townhouse: 'Townhouse',
    penthouse: 'Penthouse',
    statusLabel: 'Status',
    all: 'All',
    sale: 'For Sale',
    rent: 'For Rent',
    availableProperties: 'Available Properties',
    propertiesCount: (n: number) => `${n} properties available`,
    clearFilters: 'Clear Filters',
    moreFilters: 'More Filters',
    advancedFilters: 'Advanced Filters',
    advancedFiltersDesc: 'Customize your search to find the perfect property',
    bedrooms: 'Bedrooms',
    priceRange: 'Price Range (AED)',
    areaRange: 'Area (sqft)',
    furnishedOnly: 'Furnished Only',
    featuredOnly: 'Featured Properties Only',
    reset: 'Reset',
    applyFilters: 'Apply Filters',
    noProperties: 'No Properties Found',
    noPropertiesDesc: 'Try adjusting your filters or search to find more results',
    clearAllFilters: 'Clear All Filters',
    featured: 'Featured',
    furnished: 'Furnished',
    addToFavorites: 'Add to favorites',
    share: 'Share',
    bedroomsLabel: 'Bedrooms',
    bathroomsLabel: 'Bathrooms',
    areaLabel: 'Area',
    sqft: 'sqft',
    currency: 'AED',
    perYear: '/year',
    million: 'M',
  }

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

    // Search — locale-aware, includes Arabic city names
    if (searchQuery) {
      const query = searchQuery.toLocaleLowerCase(isRTL ? 'ar' : 'en')
      filtered = filtered.filter(
        (p) =>
          p.title.toLocaleLowerCase('en').includes(query) ||
          p.titleAr.includes(query) ||
          p.location.toLocaleLowerCase('en').includes(query) ||
          p.locationAr.includes(query) ||
          p.city.toLocaleLowerCase('en').includes(query) ||
          p.cityAr.includes(query)
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
      label: t.totalProperties,
      value: filteredProperties.length.toLocaleString(),
      icon: Buildings,
      trend: '+12%',
    },
    {
      label: t.averagePrice,
      value:
        filteredProperties.length > 0
          ? `${(filteredProperties.reduce((sum, p) => sum + p.price, 0) / filteredProperties.length / 1000000).toFixed(1)}${t.million}`
          : '0',
      icon: TrendUp,
      trend: '+8%',
    },
    {
      label: t.forSale,
      value: filteredProperties.filter((p) => p.status === 'sale').length.toLocaleString(),
      icon: House,
      trend: '+5%',
    },
    {
      label: t.forRent,
      value: filteredProperties.filter((p) => p.status === 'rent').length.toLocaleString(),
      icon: House,
      trend: '+15%',
    },
  ]

  const typeLabels: Record<string, string> = {
    villa: t.villa,
    apartment: t.apartment,
    townhouse: t.townhouse,
    penthouse: t.penthouse,
  }

  const getPropertyTypeLabel = (type: string) => typeLabels[type] || type

  const getStatusLabel = (status: string) => status === 'sale' ? t.sale : t.rent

  const formatPrice = (price: number, status: string) => {
    const formatted = new Intl.NumberFormat('en-US').format(price)
    const suffix = status === 'rent' ? t.perYear : ''
    return `${formatted} ${t.currency}${suffix}`
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
          <nav aria-label={isRTL ? 'مسار التنقل' : 'Breadcrumb'}>
            <div className="flex items-center justify-between gap-4">
              <ol className="flex items-center gap-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-foreground transition-colors">
                    {t.home}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/examples" className="hover:text-foreground transition-colors">
                    {t.examples}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-foreground font-medium">
                  {t.dashboard}
                </li>
              </ol>
              <DirectionToggle />
            </div>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="border-b">
        <div className="container py-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              {t.dashboard}
            </h1>
            <p className="text-muted-foreground">
              {t.subtitle}
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
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-success">{stat.trend}</span>{' '}
                  {t.fromLastMonth}
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
                  <MagnifyingGlass className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <Input
                    aria-label={t.searchLabel}
                    placeholder={t.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="ps-10"
                  />
                </div>
              </div>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger aria-label={t.cityLabel}>
                  <SelectValue placeholder={t.cityLabel} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.allCities}</SelectItem>
                  <SelectItem value="Dubai">{t.dubai}</SelectItem>
                  <SelectItem value="Abu Dhabi">{t.abuDhabi}</SelectItem>
                  <SelectItem value="Sharjah">{t.sharjah}</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger aria-label={t.typeLabel}>
                  <SelectValue placeholder={t.typeLabel} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.allTypes}</SelectItem>
                  <SelectItem value="villa">{t.villa}</SelectItem>
                  <SelectItem value="apartment">{t.apartment}</SelectItem>
                  <SelectItem value="townhouse">{t.townhouse}</SelectItem>
                  <SelectItem value="penthouse">{t.penthouse}</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger aria-label={t.statusLabel}>
                  <SelectValue placeholder={t.statusLabel} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.all}</SelectItem>
                  <SelectItem value="sale">{t.sale}</SelectItem>
                  <SelectItem value="rent">{t.rent}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Property Grid Header */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {t.availableProperties}
            </h2>
            <p className="text-sm text-muted-foreground" role="status" aria-live="polite" aria-atomic="true">
              {t.propertiesCount(filteredProperties.length)}
            </p>
          </div>
          <div className="flex gap-2">
            {activeFiltersCount > 0 && (
              <Button variant="outline" size="sm" onClick={clearAdvancedFilters}>
                <X className="h-4 w-4 me-2" aria-hidden="true" />
                {t.clearFilters} ({activeFiltersCount})
              </Button>
            )}
            <Dialog open={filterDialogOpen} onOpenChange={setFilterDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Sliders className="h-4 w-4 me-2" aria-hidden="true" />
                  {t.moreFilters}
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ms-2">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>{t.advancedFilters}</DialogTitle>
                  <DialogDescription>
                    {t.advancedFiltersDesc}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                  {/* Bedrooms */}
                  <fieldset className="space-y-3">
                    <legend className="text-sm font-medium">
                      {t.bedrooms}
                    </legend>
                    <div className="flex flex-wrap gap-2">
                      {['1', '2', '3', '4', '5', '6+'].map((bed) => (
                        <Button
                          key={bed}
                          variant={bedroomFilter.includes(bed) ? 'primary' : 'outline'}
                          size="sm"
                          aria-pressed={bedroomFilter.includes(bed)}
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
                  </fieldset>

                  {/* Price Range */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {t.priceRange}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {new Intl.NumberFormat('en-US').format(priceRange[0])} -{' '}
                        {new Intl.NumberFormat('en-US').format(priceRange[1])}
                      </span>
                    </div>
                    <Slider
                      aria-label={t.priceRange}
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
                      <span className="text-sm font-medium">
                        {t.areaRange}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {new Intl.NumberFormat('en-US').format(areaRange[0])} -{' '}
                        {new Intl.NumberFormat('en-US').format(areaRange[1])}
                      </span>
                    </div>
                    <Slider
                      aria-label={t.areaRange}
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
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="furnished"
                        checked={furnishedOnly}
                        onCheckedChange={(checked) => setFurnishedOnly(checked as boolean)}
                      />
                      <label
                        htmlFor="furnished"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {t.furnishedOnly}
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="featured"
                        checked={featuredOnly}
                        onCheckedChange={(checked) => setFeaturedOnly(checked as boolean)}
                      />
                      <label
                        htmlFor="featured"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {t.featuredOnly}
                      </label>
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={clearAdvancedFilters}>
                    {t.reset}
                  </Button>
                  <Button onClick={() => setFilterDialogOpen(false)}>
                    {t.applyFilters}
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
              <House className="h-12 w-12 mx-auto text-muted-foreground mb-4" aria-hidden="true" />
              <h3 className="text-lg font-semibold mb-2">
                {t.noProperties}
              </h3>
              <p className="text-muted-foreground mb-4">
                {t.noPropertiesDesc}
              </p>
              <Button variant="outline" onClick={() => {
                setSearchQuery('')
                setSelectedCity('all')
                setSelectedType('all')
                setSelectedStatus('all')
                clearAdvancedFilters()
              }}>
                {t.clearAllFilters}
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
                    label: t.featured,
                    variant: 'destructive',
                  })
                }
                if (property.furnished) {
                  badges.push({
                    label: t.furnished,
                    variant: 'outline',
                    className: 'bg-background/90',
                  })
                }

                // Prepare actions
                const actions: ListingCardAction[] = [
                  {
                    icon: Heart,
                    label: t.addToFavorites,
                    onClick: () => console.log('Favorite clicked'),
                  },
                  {
                    icon: ShareNetwork,
                    label: t.share,
                    onClick: () => console.log('Share clicked'),
                  },
                ]

                // Prepare stats
                const cardStats: ListingCardStat[] = [
                  {
                    icon: Bed,
                    value: property.bedrooms,
                    label: t.bedroomsLabel,
                  },
                  {
                    icon: Bathtub,
                    value: property.bathrooms,
                    label: t.bathroomsLabel,
                  },
                  {
                    icon: Square,
                    value: `${property.area.toLocaleString()} ${t.sqft}`,
                    label: t.areaLabel,
                  },
                ]

                // Prepare tags
                const tags: ListingCardTag[] = (isRTL ? property.amenitiesAr : property.amenities).map(
                  (amenity) => ({
                    label: amenity,
                    variant: 'secondary',
                  })
                )

                return (
                  <ListingCard
                    key={property.id}
                    title={isRTL ? property.titleAr : property.title}
                    subtitle={
                      <>
                        <MapPin className="h-3 w-3 inline me-1" aria-hidden="true" />
                        {isRTL ? property.locationAr : property.location}
                      </>
                    }
                    description={isRTL ? property.descriptionAr : property.description}
                    price={formatPrice(property.price, property.status)}
                    image={propertyImages[property.type]}
                    placeholderIcon={House}
                    badges={badges}
                    actions={actions}
                    stats={cardStats}
                    tags={tags}
                    maxTags={3}
                    typeBadge={getPropertyTypeLabel(property.type)}
                    featured={property.featured}
                    imageAspect="wide"
                    onClick={() => router.push(`/examples/real-estate/${property.id}`)}
                  />
                )
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => { e.preventDefault(); setCurrentPage(Math.max(1, currentPage - 1)) }}
                      aria-disabled={currentPage === 1}
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
                      href="#"
                      onClick={(e) => { e.preventDefault(); setCurrentPage(Math.min(totalPages, currentPage + 1)) }}
                      aria-disabled={currentPage === totalPages}
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
