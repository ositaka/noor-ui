'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ButtonArrow } from '@/components/ui/button-arrow'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Carousel } from '@/components/ui/carousel'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  House,
  MapPin,
  Bed,
  Bathtub,
  Square,
  Calendar,
  Heart,
  ShareNetwork,
  Phone,
  EnvelopeSimple,
  ChatCircle,
  CheckCircle,
  Car,
  Buildings,
  Ruler,
  Door,
} from '@phosphor-icons/react'
import { useDirection } from '@/components/providers/direction-provider'
import { DirectionToggle } from '@/components/docs/direction-toggle'

const propertyImages: Record<string, string> = {
  villa: '/examples/real-estate/villa.jpg',
  apartment: '/examples/real-estate/apartment.jpg',
  townhouse: '/examples/real-estate/townhouse.jpg',
  penthouse: '/examples/real-estate/penthouse.jpg',
}

interface Property {
  id: string
  title: string
  titleAr: string
  description: string
  descriptionAr: string
  fullDescription: string
  fullDescriptionAr: string
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
  propertyId: string
  floors: number
}

// Mock data generator (same as main page but with more details)
const getAllProperties = (): Property[] => {
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
    {
      en: ['Private Pool', 'Garden', 'Maid Room', 'Smart Home', 'Parking', 'Gym', 'Security', 'BBQ Area'],
      ar: ['مسبح خاص', 'حديقة', 'غرفة خادمة', 'منزل ذكي', 'موقف سيارات', 'صالة رياضية', 'أمن', 'منطقة شواء'],
    },
    {
      en: ['Gym', 'Pool', 'Concierge', 'Parking', 'Security', 'Balcony', 'Central AC', 'Elevator'],
      ar: ['صالة رياضية', 'مسبح', 'خدمة الكونسيرج', 'موقف سيارات', 'أمن', 'شرفة', 'تكييف مركزي', 'مصعد'],
    },
    {
      en: ['Community Pool', 'Park', 'BBQ Area', 'Kids Play Area', 'Parking', 'Sports Courts'],
      ar: ['مسبح مشترك', 'حديقة', 'منطقة شواء', 'منطقة لعب أطفال', 'موقف سيارات', 'ملاعب رياضية'],
    },
    {
      en: ['Private Terrace', 'Sea View', 'Gym', 'Pool', 'Concierge', 'Parking', 'Jacuzzi', 'Wine Cellar'],
      ar: ['شرفة خاصة', 'إطلالة بحرية', 'صالة رياضية', 'مسبح', 'خدمة الكونسيرج', 'موقف سيارات', 'جاكوزي', 'قبو نبيذ'],
    },
  ]

  const properties: Property[] = []

  for (let i = 0; i < 24; i++) {
    const propType = propertyTypes[i % propertyTypes.length]
    const location = locations[i % locations.length]
    const bedrooms = propType.beds[i % propType.beds.length]
    const bathrooms = propType.baths[i % propType.baths.length]
    const status: Property['status'] = i % 3 === 0 ? 'rent' : 'sale'
    const amenities = amenitiesList[i % amenitiesList.length]

    let basePrice = 0
    if (propType.type === 'villa') {
      basePrice = status === 'sale' ? 3000000 + bedrooms * 1000000 : 120000 + bedrooms * 30000
    } else if (propType.type === 'penthouse') {
      basePrice = status === 'sale' ? 2500000 + bedrooms * 800000 : 180000 + bedrooms * 50000
    } else if (propType.type === 'townhouse') {
      basePrice = status === 'sale' ? 2000000 + bedrooms * 600000 : 90000 + bedrooms * 20000
    } else {
      basePrice = status === 'sale' ? 800000 + bedrooms * 400000 : 45000 + bedrooms * 15000
    }

    const price = basePrice + i * 100000
    const area = bedrooms * 800 + (propType.type === 'villa' ? 1000 : 400)

    const typeLabel =
      propType.type === 'villa'
        ? 'Villa'
        : propType.type === 'apartment'
          ? 'Apartment'
          : propType.type === 'townhouse'
            ? 'Townhouse'
            : 'Penthouse'

    properties.push({
      id: `prop-${i + 1}`,
      title: `${typeLabel} ${bedrooms}BR in ${location.en.split(',')[0]}`,
      titleAr: `${propType.type === 'villa' ? 'فيلا' : propType.type === 'apartment' ? 'شقة' : propType.type === 'townhouse' ? 'تاون هاوس' : 'بنتهاوس'} ${bedrooms} غرف في ${location.ar.split('،')[0]}`,
      description: `${propType.type === 'villa' ? 'Stunning' : 'Modern'} ${bedrooms}-bedroom ${propType.type} with ${bathrooms} bathrooms in ${location.en.split(',')[0]}.`,
      descriptionAr: `${propType.type === 'villa' ? 'مذهلة' : 'عصرية'} ${propType.type === 'villa' ? 'فيلا' : propType.type === 'apartment' ? 'شقة' : propType.type === 'townhouse' ? 'تاون هاوس' : 'بنتهاوس'} من ${bedrooms} غرف نوم و ${bathrooms} حمامات في ${location.ar.split('،')[0]}.`,
      fullDescription: `This exceptional ${typeLabel.toLowerCase()} offers ${bedrooms} spacious bedrooms and ${bathrooms} modern bathrooms. Located in the heart of ${location.en.split(',')[0]}, this property combines luxury living with convenient access to schools, shopping centers, and entertainment venues. The property features high-quality finishes throughout, with large windows that provide abundant natural light. The open-plan living area flows seamlessly to the outdoor space, perfect for entertaining. ${propType.type === 'villa' ? 'The private garden and pool area offer a peaceful retreat.' : 'Residents enjoy access to world-class amenities.'} Built in ${2015 + (i % 9)}, this property is in excellent condition and ready for immediate occupancy.`,
      fullDescriptionAr: `يقدم هذا ${propType.type === 'villa' ? 'الفيلا' : propType.type === 'apartment' ? 'الشقة' : propType.type === 'townhouse' ? 'التاون هاوس' : 'البنتهاوس'} الاستثنائي ${bedrooms} غرف نوم واسعة و ${bathrooms} حمامات عصرية. يقع في قلب ${location.ar.split('،')[0]}، يجمع هذا العقار بين الحياة الفاخرة والوصول المريح إلى المدارس ومراكز التسوق وأماكن الترفيه. يتميز العقار بتشطيبات عالية الجودة في جميع أنحائه، مع نوافذ كبيرة توفر ضوءاً طبيعياً وفيراً. تتدفق منطقة المعيشة ذات المخطط المفتوح بسلاسة إلى المساحة الخارجية، مثالية للترفيه. ${propType.type === 'villa' ? 'توفر الحديقة الخاصة ومنطقة المسبح ملاذاً هادئاً.' : 'يتمتع السكان بالوصول إلى وسائل راحة عالمية المستوى.'} تم بناؤه في عام ${2015 + (i % 9)}، هذا العقار في حالة ممتازة وجاهز للإشغال الفوري.`,
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
      propertyId: `RE-${2024000 + i}`,
      floors: propType.type === 'villa' ? 2 : 1,
    })
  }

  return properties
}

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const { locale } = useDirection()
  const isRTL = locale === 'ar'
  const [property, setProperty] = React.useState<Property | null>(null)

  const t = isRTL ? {
    home: 'الرئيسية',
    examples: 'الأمثلة',
    realEstate: 'لوحة العقارات',
    backToListings: 'العودة إلى القائمة',
    propertyNotFound: 'العقار غير موجود',
    propertyNotFoundDesc: 'العقار الذي تبحث عنه غير متاح',
    villa: 'فيلا',
    apartment: 'شقة',
    townhouse: 'تاون هاوس',
    penthouse: 'بنتهاوس',
    sale: 'للبيع',
    rent: 'للإيجار',
    featured: 'مميز',
    furnished: 'مفروش',
    addToFavorites: 'إضافة للمفضلة',
    share: 'مشاركة',
    bedrooms: 'غرف النوم',
    bathrooms: 'الحمامات',
    area: 'المساحة',
    sqft: 'قدم²',
    parking: 'مواقف السيارات',
    floors: 'الطوابق',
    yearBuilt: 'سنة البناء',
    currency: 'د.إ',
    perYear: '/سنوياً',
    description: 'الوصف',
    amenities: 'المرافق',
    propertyOverview: 'نظرة عامة على العقار',
    amenitiesFeatures: 'المرافق والميزات',
    location: 'الموقع',
    interactiveMap: 'خريطة تفاعلية',
    locationMap: 'خريطة الموقع',
    contactAgent: 'تواصل مع الوكيل',
    contactDesc: 'تواصل معنا للحصول على المزيد من المعلومات',
    callNow: 'اتصل الآن',
    whatsapp: 'واتساب',
    email: 'إرسال بريد',
    propertyDetails: 'تفاصيل العقار',
    propertyId: 'رقم العقار',
    type: 'النوع',
    status: 'الحالة',
    furnishedLabel: 'التأثيث',
    yes: 'نعم',
    no: 'لا',
    similarProperties: 'عقارات مشابهة',
    similarPropertiesDesc: 'عقارات مشابهة متاحة قريباً',
    propertyPhoto: (name: string) => `صورة ${name}`,
  } : {
    home: 'Home',
    examples: 'Examples',
    realEstate: 'Real Estate',
    backToListings: 'Back to Listings',
    propertyNotFound: 'Property Not Found',
    propertyNotFoundDesc: 'The property you are looking for is not available',
    villa: 'Villa',
    apartment: 'Apartment',
    townhouse: 'Townhouse',
    penthouse: 'Penthouse',
    sale: 'For Sale',
    rent: 'For Rent',
    featured: 'Featured',
    furnished: 'Furnished',
    addToFavorites: 'Add to favorites',
    share: 'Share',
    bedrooms: 'Bedrooms',
    bathrooms: 'Bathrooms',
    area: 'Area',
    sqft: 'sqft',
    parking: 'Parking',
    floors: 'Floors',
    yearBuilt: 'Year Built',
    currency: 'AED',
    perYear: '/year',
    description: 'Description',
    amenities: 'Amenities',
    propertyOverview: 'Property Overview',
    amenitiesFeatures: 'Amenities & Features',
    location: 'Location',
    interactiveMap: 'Interactive Map',
    locationMap: 'Property location map',
    contactAgent: 'Contact Agent',
    contactDesc: 'Get in touch for more information',
    callNow: 'Call Now',
    whatsapp: 'WhatsApp',
    email: 'Email',
    propertyDetails: 'Property Details',
    propertyId: 'Property ID',
    type: 'Type',
    status: 'Status',
    furnishedLabel: 'Furnished',
    yes: 'Yes',
    no: 'No',
    similarProperties: 'Similar Properties',
    similarPropertiesDesc: 'Similar properties available soon',
    propertyPhoto: (name: string) => `Photo of ${name}`,
  }

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

  React.useEffect(() => {
    const allProperties = getAllProperties()
    const found = allProperties.find((p) => p.id === params.id)
    setProperty(found || null)
  }, [params.id])

  if (!property) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <House className="h-16 w-16 mx-auto text-muted-foreground mb-4" aria-hidden="true" />
          <h2 className="text-2xl font-bold mb-2">
            {t.propertyNotFound}
          </h2>
          <p className="text-muted-foreground mb-4">
            {t.propertyNotFoundDesc}
          </p>
          <ButtonArrow direction="back" icon="arrow" asChild>
            <Link href="/examples/real-estate">
              {t.backToListings}
            </Link>
          </ButtonArrow>
        </div>
      </div>
    )
  }

  const propertyFeatures = [
    { icon: Bed, label: t.bedrooms, value: property.bedrooms },
    { icon: Bathtub, label: t.bathrooms, value: property.bathrooms },
    { icon: Square, label: t.area, value: `${property.area.toLocaleString()} ${t.sqft}` },
    { icon: Car, label: t.parking, value: property.parking },
    { icon: Buildings, label: t.floors, value: property.floors },
    { icon: Calendar, label: t.yearBuilt, value: property.yearBuilt },
  ]

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
                <li>
                  <Link href="/examples/real-estate" className="hover:text-foreground transition-colors">
                    {t.realEstate}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-foreground font-medium">{property.propertyId}</li>
              </ol>
              <DirectionToggle />
            </div>
          </nav>
        </div>
      </div>

      {/* Back Button */}
      <div className="border-b">
        <div className="container py-4">
          <ButtonArrow variant="ghost" size="sm" direction="back" icon="arrow" asChild>
            <Link href="/examples/real-estate">
              {t.backToListings}
            </Link>
          </ButtonArrow>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Images Carousel */}
            <Card className="overflow-hidden">
              <div className="relative">
                <Carousel
                  items={[
                    { src: propertyImages[property.type], alt: t.propertyPhoto(isRTL ? property.titleAr : property.title) },
                    { src: '/examples/real-estate/interior-1.jpg', alt: isRTL ? 'الداخلية - غرفة المعيشة' : 'Interior - Living Room' },
                    { src: '/examples/real-estate/interior-2.jpg', alt: isRTL ? 'الداخلية - المطبخ' : 'Interior - Kitchen' },
                    { src: '/examples/real-estate/interior-3.jpg', alt: isRTL ? 'الداخلية - غرفة النوم' : 'Interior - Bedroom' },
                  ]}
                  renderItem={(item) => (
                    <div className="relative h-[400px] bg-muted">
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>
                  )}
                  showArrows
                  showDots
                  dotSize="lg"
                  aria-label={isRTL ? 'معرض صور العقار' : 'Property photo gallery'}
                />
                <div className="absolute top-4 start-4 flex gap-2 z-10 pointer-events-none">
                  <Badge variant={property.status === 'sale' ? 'default' : 'secondary'} className="text-sm pointer-events-auto">
                    {getStatusLabel(property.status)}
                  </Badge>
                  {property.featured && (
                    <Badge variant="destructive" className="text-sm pointer-events-auto">
                      {t.featured}
                    </Badge>
                  )}
                  {property.furnished && (
                    <Badge variant="outline" className="bg-background/90 text-sm pointer-events-auto">
                      {t.furnished}
                    </Badge>
                  )}
                </div>
                <div className="absolute top-4 end-4 flex gap-2 z-10">
                  <Button size="icon" variant="secondary" className="rounded-full bg-white/90" aria-label={t.addToFavorites}>
                    <Heart className="h-5 w-5" aria-hidden="true" />
                  </Button>
                  <Button size="icon" variant="secondary" className="rounded-full bg-white/90" aria-label={t.share}>
                    <ShareNetwork className="h-5 w-5" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Property Info */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{getPropertyTypeLabel(property.type)}</Badge>
                      <Badge variant="secondary" className="text-xs">
                        {isRTL ? `رقم العقار: ${property.propertyId}` : `ID: ${property.propertyId}`}
                      </Badge>
                    </div>
                    <CardTitle id="property-title" className="text-3xl">
                      {isRTL ? property.titleAr : property.title}
                    </CardTitle>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  <span>{isRTL ? property.locationAr : property.location}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-primary mb-6">
                  {formatPrice(property.price, property.status)}
                </div>

                {/* Key Features Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {propertyFeatures.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                      <div className="p-2 rounded-full bg-background">
                        <feature.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">{feature.label}</div>
                        <div className="font-semibold">{feature.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                {/* Description */}
                <Tabs defaultValue="description" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="description">
                      {t.description}
                    </TabsTrigger>
                    <TabsTrigger value="amenities">
                      {t.amenities}
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="description" className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-3">
                        {t.propertyOverview}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {isRTL ? property.fullDescriptionAr : property.fullDescription}
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="amenities" className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-3">
                        {t.amenitiesFeatures}
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {(isRTL ? property.amenitiesAr : property.amenities).map((amenity, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-success" aria-hidden="true" />
                            <span className="text-sm">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle>{t.location}</CardTitle>
                <CardDescription>
                  {isRTL ? property.locationAr : property.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  role="region"
                  aria-label={t.locationMap}
                  className="h-[300px] bg-muted rounded-lg flex items-center justify-center"
                >
                  <div className="text-center text-muted-foreground" aria-hidden="true">
                    <MapPin className="h-12 w-12 mx-auto mb-2" />
                    <p className="text-sm">{t.interactiveMap}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {t.contactAgent}
                </CardTitle>
                <CardDescription>
                  {t.contactDesc}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" size="lg" aria-describedby="property-title">
                  <Phone className="h-4 w-4 me-2" aria-hidden="true" />
                  {t.callNow}
                </Button>
                <Button variant="outline" className="w-full" size="lg" aria-describedby="property-title">
                  <ChatCircle className="h-4 w-4 me-2" aria-hidden="true" />
                  {t.whatsapp}
                </Button>
                <Button variant="outline" className="w-full" size="lg" aria-describedby="property-title">
                  <EnvelopeSimple className="h-4 w-4 me-2" aria-hidden="true" />
                  {t.email}
                </Button>
              </CardContent>
            </Card>

            {/* Property Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {t.propertyDetails}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t.propertyId}</span>
                  <span className="font-medium">{property.propertyId}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t.type}</span>
                  <span className="font-medium">{getPropertyTypeLabel(property.type)}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t.status}</span>
                  <Badge variant={property.status === 'sale' ? 'default' : 'secondary'}>
                    {getStatusLabel(property.status)}
                  </Badge>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t.furnishedLabel}</span>
                  <span className="font-medium">
                    {property.furnished ? t.yes : t.no}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t.yearBuilt}</span>
                  <span className="font-medium">{property.yearBuilt}</span>
                </div>
              </CardContent>
            </Card>

            {/* Similar Properties */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {t.similarProperties}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground text-center py-8">
                  {t.similarPropertiesDesc}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
