'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { ArabicNumber } from '@/components/ui/arabic-number'
import { RangeSlider } from '@/components/ui/range-slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Separator } from '@/components/ui/separator'
import { useDirection } from '@/components/providers/direction-provider'
import {
  MagnifyingGlass,
  Star,
  MapPin,
  SwimmingPool,
  Barbell,
  WifiHigh,
  Car,
  Mosque,
  Flower,
  FunnelSimple,
  X,
  SortAscending,
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// Translations
// ---------------------------------------------------------------------------

const t = {
  en: {
    searchTitle: 'Search Hotels',
    resultsIn: 'hotels found in',
    dubai: 'Dubai',
    sortBy: 'Sort by',
    recommended: 'Recommended',
    priceLow: 'Price: Low to High',
    priceHigh: 'Price: High to Low',
    rating: 'Rating',
    distance: 'Distance',
    filters: 'Filters',
    priceRange: 'Price Range',
    perNight: '/ night',
    starRating: 'Star Rating',
    amenities: 'Amenities',
    pool: 'Swimming Pool',
    gym: 'Fitness Center',
    wifi: 'Free WiFi',
    parking: 'Free Parking',
    prayerRoom: 'Prayer Room',
    spa: 'Spa & Wellness',
    propertyType: 'Property Type',
    hotel: 'Hotel',
    resort: 'Resort',
    boutique: 'Boutique',
    apartment: 'Apartment',
    viewHotel: 'View Details',
    clearFilters: 'Clear Filters',
    searchPlaceholder: 'Search by hotel name...',
    reviews: 'reviews',
    showFilters: 'Show Filters',
    hideFilters: 'Hide Filters',
    aed: 'AED',
  },
  ar: {
    searchTitle: 'بحث الفنادق',
    resultsIn: 'فندق في',
    dubai: 'دبي',
    sortBy: 'ترتيب حسب',
    recommended: 'الموصى بها',
    priceLow: 'السعر: من الأقل',
    priceHigh: 'السعر: من الأعلى',
    rating: 'التقييم',
    distance: 'المسافة',
    filters: 'التصفية',
    priceRange: 'نطاق السعر',
    perNight: '/ ليلة',
    starRating: 'تصنيف النجوم',
    amenities: 'المرافق',
    pool: 'مسبح',
    gym: 'مركز لياقة',
    wifi: 'واي فاي مجاني',
    parking: 'موقف مجاني',
    prayerRoom: 'مصلى',
    spa: 'سبا وعافية',
    propertyType: 'نوع العقار',
    hotel: 'فندق',
    resort: 'منتجع',
    boutique: 'بوتيك',
    apartment: 'شقة فندقية',
    viewHotel: 'عرض التفاصيل',
    clearFilters: 'مسح التصفية',
    searchPlaceholder: 'ابحث باسم الفندق...',
    reviews: 'تقييم',
    showFilters: 'إظهار التصفية',
    hideFilters: 'إخفاء التصفية',
    aed: 'د.إ',
  },
}

// ---------------------------------------------------------------------------
// Hotel data
// ---------------------------------------------------------------------------

interface Hotel {
  id: string
  name: string
  nameAr: string
  location: string
  locationAr: string
  stars: number
  price: number
  image: string
  rating: number
  reviewCount: number
  amenities: string[]
  type: string
}

const allHotels: Hotel[] = [
  {
    id: 'pearl-grand',
    name: 'Pearl Grand Hotel',
    nameAr: 'فندق اللؤلؤة الكبير',
    location: 'Dubai Marina, Dubai',
    locationAr: 'دبي مارينا، دبي',
    stars: 5,
    price: 850,
    image: '/examples/hotel/hotel-1.jpg',
    rating: 4.8,
    reviewCount: 2341,
    amenities: ['pool', 'gym', 'wifi', 'spa', 'parking', 'prayer'],
    type: 'hotel',
  },
  {
    id: 'al-nakheel',
    name: 'Al Nakheel Resort',
    nameAr: 'منتجع النخيل',
    location: 'Corniche, Abu Dhabi',
    locationAr: 'الكورنيش، أبوظبي',
    stars: 5,
    price: 720,
    image: '/examples/hotel/hotel-2.jpg',
    rating: 4.7,
    reviewCount: 1856,
    amenities: ['pool', 'gym', 'wifi', 'spa', 'prayer'],
    type: 'resort',
  },
  {
    id: 'al-deira',
    name: 'Al Deira Boutique Hotel',
    nameAr: 'فندق الديرة بوتيك',
    location: 'West Bay, Doha',
    locationAr: 'الخليج الغربي، الدوحة',
    stars: 4,
    price: 480,
    image: '/examples/hotel/hotel-3.jpg',
    rating: 4.6,
    reviewCount: 987,
    amenities: ['wifi', 'gym', 'prayer', 'parking'],
    type: 'boutique',
  },
  {
    id: 'al-waha',
    name: 'Al Waha Hotel',
    nameAr: 'فندق الواحة',
    location: 'Al Qurum, Muscat',
    locationAr: 'القرم، مسقط',
    stars: 4,
    price: 380,
    image: '/examples/hotel/hotel-4.jpg',
    rating: 4.5,
    reviewCount: 643,
    amenities: ['pool', 'wifi', 'parking', 'prayer'],
    type: 'hotel',
  },
  {
    id: 'riyadh-towers',
    name: 'Riyadh Towers Hotel',
    nameAr: 'أبراج الرياض',
    location: 'Olaya District, Riyadh',
    locationAr: 'حي العليا، الرياض',
    stars: 5,
    price: 650,
    image: '/examples/hotel/hotel-5.jpg',
    rating: 4.7,
    reviewCount: 1523,
    amenities: ['pool', 'gym', 'wifi', 'spa', 'parking', 'prayer'],
    type: 'hotel',
  },
  {
    id: 'red-sea',
    name: 'Red Sea Hotel',
    nameAr: 'فندق البحر الأحمر',
    location: 'Corniche, Jeddah',
    locationAr: 'الكورنيش، جدة',
    stars: 4,
    price: 420,
    image: '/examples/hotel/hotel-6.jpg',
    rating: 4.4,
    reviewCount: 876,
    amenities: ['pool', 'wifi', 'gym', 'parking', 'prayer'],
    type: 'hotel',
  },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function HotelSearchPage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const h = t[locale]

  const [searchQuery, setSearchQuery] = React.useState('')
  const [priceRange, setPriceRange] = React.useState<[number, number]>([100, 2000])
  const [selectedStars, setSelectedStars] = React.useState<number[]>([])
  const [selectedAmenities, setSelectedAmenities] = React.useState<string[]>([])
  const [sortBy, setSortBy] = React.useState('recommended')
  const [showMobileFilters, setShowMobileFilters] = React.useState(false)
  const [currentPage, setCurrentPage] = React.useState(1)

  const toggleStar = (star: number) => {
    setSelectedStars((prev) =>
      prev.includes(star) ? prev.filter((s) => s !== star) : [...prev, star],
    )
  }

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity],
    )
  }

  const filteredHotels = React.useMemo(() => {
    let results = allHotels.filter((hotel) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        if (
          !hotel.name.toLowerCase().includes(q) &&
          !hotel.nameAr.includes(searchQuery)
        )
          return false
      }
      if (hotel.price < priceRange[0] || hotel.price > priceRange[1]) return false
      if (selectedStars.length > 0 && !selectedStars.includes(hotel.stars)) return false
      if (
        selectedAmenities.length > 0 &&
        !selectedAmenities.every((a) => hotel.amenities.includes(a))
      )
        return false
      return true
    })

    switch (sortBy) {
      case 'price-low':
        results = [...results].sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        results = [...results].sort((a, b) => b.price - a.price)
        break
      case 'rating':
        results = [...results].sort((a, b) => b.rating - a.rating)
        break
    }

    return results
  }, [searchQuery, priceRange, selectedStars, selectedAmenities, sortBy])

  const clearFilters = () => {
    setSearchQuery('')
    setPriceRange([100, 2000])
    setSelectedStars([])
    setSelectedAmenities([])
  }

  const amenityIcons: Record<string, React.ReactNode> = {
    pool: <SwimmingPool className="h-4 w-4" />,
    gym: <Barbell className="h-4 w-4" />,
    wifi: <WifiHigh className="h-4 w-4" />,
    parking: <Car className="h-4 w-4" />,
    prayer: <Mosque className="h-4 w-4" />,
    spa: <Flower className="h-4 w-4" />,
  }

  const amenityLabels: Record<string, string> = {
    pool: h.pool,
    gym: h.gym,
    wifi: h.wifi,
    parking: h.parking,
    prayer: h.prayerRoom,
    spa: h.spa,
  }

  const formatPrice = (value: number) => `${value} ${h.aed}`

  // ---------------------------------------------------------------------------
  // Filter sidebar (shared between mobile and desktop)
  // ---------------------------------------------------------------------------

  const filterContent = (
    <div className="space-y-6">
      {/* Search */}
      <div className="space-y-2">
        <Label htmlFor="hotel-search" className="text-sm font-medium">{h.searchTitle}</Label>
        <div className="relative">
          <MagnifyingGlass className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <Input
            id="hotel-search"
            placeholder={h.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="ps-9"
          />
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">{h.priceRange}</Label>
        <RangeSlider
          min={100}
          max={2000}
          step={50}
          value={priceRange}
          onValueChange={setPriceRange}
          formatLabel={formatPrice}
          showLabels
          showMinMax
        />
      </div>

      <Separator />

      {/* Star Rating */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">{h.starRating}</Label>
        <div className="space-y-2">
          {[5, 4, 3].map((star) => (
            <div key={star} className="flex items-center gap-2">
              <Checkbox
                id={`star-${star}`}
                checked={selectedStars.includes(star)}
                onCheckedChange={() => toggleStar(star)}
              />
              <Label htmlFor={`star-${star}`} className="flex items-center gap-1 cursor-pointer text-sm font-normal">
                {Array.from({ length: star }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 text-warning fill-warning" weight="fill" />
                ))}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Amenities */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">{h.amenities}</Label>
        <div className="space-y-2">
          {Object.entries(amenityLabels).map(([key, label]) => (
            <div key={key} className="flex items-center gap-2">
              <Checkbox
                id={`amenity-${key}`}
                checked={selectedAmenities.includes(key)}
                onCheckedChange={() => toggleAmenity(key)}
              />
              <Label htmlFor={`amenity-${key}`} className="flex items-center gap-2 cursor-pointer text-sm font-normal">
                {amenityIcons[key]}
                {label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Clear */}
      <Button variant="outline" className="w-full" onClick={clearFilters}>
        {h.clearFilters}
      </Button>
    </div>
  )

  return (
    <div className="container py-6">
      {/* Top bar: results count + sort */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">{h.searchTitle}</h1>
          <p className="text-muted-foreground text-sm">
            <ArabicNumber value={filteredHotels.length} /> {h.resultsIn} {isRTL ? 'دبي' : 'Dubai'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Mobile filter toggle */}
          <Button
            variant="outline"
            size="sm"
            className="md:hidden"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            {showMobileFilters ? <X className="h-4 w-4 me-1.5" /> : <FunnelSimple className="h-4 w-4 me-1.5" />}
            {showMobileFilters ? h.hideFilters : h.showFilters}
          </Button>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <SortAscending className="h-4 w-4 text-muted-foreground" />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-44">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">{h.recommended}</SelectItem>
                <SelectItem value="price-low">{h.priceLow}</SelectItem>
                <SelectItem value="price-high">{h.priceHigh}</SelectItem>
                <SelectItem value="rating">{h.rating}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Mobile filters */}
      {showMobileFilters && (
        <Card className="md:hidden mb-6">
          <CardContent className="p-4">
            {filterContent}
          </CardContent>
        </Card>
      )}

      <div className="flex gap-6">
        {/* Desktop sidebar */}
        <aside className="hidden md:block w-72 shrink-0">
          <Card className="sticky top-20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <FunnelSimple className="h-5 w-5" />
                {h.filters}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filterContent}
            </CardContent>
          </Card>
        </aside>

        {/* Results */}
        <div className="flex-1 space-y-4">
          {filteredHotels.map((hotel) => (
            <Link key={hotel.id} href={`/examples/hotel/${hotel.id}`}>
              <Card className="overflow-hidden hover:shadow-md transition-shadow group cursor-pointer mb-4">
                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="relative w-full sm:w-64 h-48 sm:h-auto shrink-0 overflow-hidden">
                    <Image
                      src={hotel.image}
                      alt={isRTL ? hotel.nameAr : hotel.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <CardContent className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                            {isRTL ? hotel.nameAr : hotel.name}
                          </h3>
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                            <MapPin className="h-3.5 w-3.5" />
                            <span>{isRTL ? hotel.locationAr : hotel.location}</span>
                          </div>
                        </div>
                        <Badge variant="secondary" className="shrink-0 font-semibold">
                          <Star className="h-3 w-3 me-0.5 fill-warning text-warning" weight="fill" />
                          {hotel.rating}
                        </Badge>
                      </div>

                      {/* Stars */}
                      <div className="flex items-center gap-0.5 mt-2">
                        {Array.from({ length: hotel.stars }).map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 text-warning fill-warning" weight="fill" />
                        ))}
                      </div>

                      {/* Amenities */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {hotel.amenities.slice(0, 4).map((a) => (
                          <span key={a} className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
                            {amenityIcons[a]}
                            {amenityLabels[a]}
                          </span>
                        ))}
                        {hotel.amenities.length > 4 && (
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
                            +<ArabicNumber value={hotel.amenities.length - 4} />
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-end justify-between mt-4 pt-3 border-t">
                      <span className="text-xs text-muted-foreground">
                        <ArabicNumber value={hotel.reviewCount} /> {h.reviews}
                      </span>
                      <div className="text-end">
                        <div className="text-2xl font-bold">
                          <ArabicNumber value={hotel.price} />
                          <span className="text-sm font-normal text-muted-foreground ms-1">
                            {h.aed} {h.perNight}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          ))}

          {/* Pagination */}
          {filteredHotels.length > 0 && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" onClick={(e) => e.preventDefault()} />
                </PaginationItem>
                {[1, 2, 3].map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={page === currentPage}
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage(page)
                      }}
                    >
                      <ArabicNumber value={page} />
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext href="#" onClick={(e) => e.preventDefault()} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </div>
  )
}
