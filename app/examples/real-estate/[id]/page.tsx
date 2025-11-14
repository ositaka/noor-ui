'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Home,
  MapPin,
  Bed,
  Bath,
  Square,
  Calendar,
  Heart,
  Share2,
  Phone,
  Mail,
  MessageCircle,
  CheckCircle2,
  Car,
  ArrowLeft,
  Building2,
  Ruler,
  DoorOpen,
} from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

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
  const [property, setProperty] = React.useState<Property | null>(null)

  React.useEffect(() => {
    const allProperties = getAllProperties()
    const found = allProperties.find((p) => p.id === params.id)
    setProperty(found || null)
  }, [params.id])

  if (!property) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Home className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">
            {locale === 'ar' ? 'العقار غير موجود' : 'Property Not Found'}
          </h2>
          <p className="text-muted-foreground mb-4">
            {locale === 'ar'
              ? 'العقار الذي تبحث عنه غير متاح'
              : 'The property you are looking for is not available'}
          </p>
          <Link href="/examples/real-estate">
            <Button>
              <ArrowLeft className="h-4 w-4 me-2" />
              {locale === 'ar' ? 'العودة إلى القائمة' : 'Back to Listings'}
            </Button>
          </Link>
        </div>
      </div>
    )
  }

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

  const propertyFeatures = [
    {
      icon: Bed,
      label: locale === 'ar' ? 'غرف النوم' : 'Bedrooms',
      value: property.bedrooms,
    },
    {
      icon: Bath,
      label: locale === 'ar' ? 'الحمامات' : 'Bathrooms',
      value: property.bathrooms,
    },
    {
      icon: Square,
      label: locale === 'ar' ? 'المساحة' : 'Area',
      value: `${property.area.toLocaleString()} ${locale === 'ar' ? 'قدم²' : 'sqft'}`,
    },
    {
      icon: Car,
      label: locale === 'ar' ? 'مواقف السيارات' : 'Parking',
      value: property.parking,
    },
    {
      icon: Building2,
      label: locale === 'ar' ? 'الطوابق' : 'Floors',
      value: property.floors,
    },
    {
      icon: Calendar,
      label: locale === 'ar' ? 'سنة البناء' : 'Year Built',
      value: property.yearBuilt,
    },
  ]

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
              <li>
                <Link href="/examples/real-estate" className="hover:text-foreground transition-colors">
                  {locale === 'ar' ? 'لوحة العقارات' : 'Real Estate'}
                </Link>
              </li>
              <li>/</li>
              <li className="text-foreground font-medium">{property.propertyId}</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Back Button */}
      <div className="border-b">
        <div className="container py-4">
          <Link href="/examples/real-estate">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 me-2" />
              {locale === 'ar' ? 'العودة إلى القائمة' : 'Back to Listings'}
            </Button>
          </Link>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Images */}
            <Card className="overflow-hidden">
              <div className="relative h-[400px] bg-muted">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Home className="h-32 w-32 text-muted-foreground/30" />
                </div>
                <div className="absolute top-4 start-4 flex gap-2">
                  <Badge variant={property.status === 'sale' ? 'default' : 'secondary'} className="text-sm">
                    {getStatusLabel(property.status)}
                  </Badge>
                  {property.featured && (
                    <Badge variant="destructive" className="text-sm">
                      {locale === 'ar' ? 'مميز' : 'Featured'}
                    </Badge>
                  )}
                  {property.furnished && (
                    <Badge variant="outline" className="bg-background/90 text-sm">
                      {locale === 'ar' ? 'مفروش' : 'Furnished'}
                    </Badge>
                  )}
                </div>
                <div className="absolute top-4 end-4 flex gap-2">
                  <Button size="icon" variant="secondary" className="rounded-full bg-white/90">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="secondary" className="rounded-full bg-white/90">
                    <Share2 className="h-5 w-5" />
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
                        {locale === 'ar' ? `رقم العقار: ${property.propertyId}` : `ID: ${property.propertyId}`}
                      </Badge>
                    </div>
                    <CardTitle className="text-3xl">
                      {locale === 'ar' ? property.titleAr : property.title}
                    </CardTitle>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{locale === 'ar' ? property.locationAr : property.location}</span>
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
                        <feature.icon className="h-5 w-5 text-primary" />
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
                      {locale === 'ar' ? 'الوصف' : 'Description'}
                    </TabsTrigger>
                    <TabsTrigger value="amenities">
                      {locale === 'ar' ? 'المرافق' : 'Amenities'}
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="description" className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-3">
                        {locale === 'ar' ? 'نظرة عامة على العقار' : 'Property Overview'}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {locale === 'ar' ? property.fullDescriptionAr : property.fullDescription}
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="amenities" className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-3">
                        {locale === 'ar' ? 'المرافق والميزات' : 'Amenities & Features'}
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {(locale === 'ar' ? property.amenitiesAr : property.amenities).map((amenity, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
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
                <CardTitle>{locale === 'ar' ? 'الموقع' : 'Location'}</CardTitle>
                <CardDescription>
                  {locale === 'ar' ? property.locationAr : property.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="h-12 w-12 mx-auto mb-2" />
                    <p className="text-sm">{locale === 'ar' ? 'خريطة تفاعلية' : 'Interactive Map'}</p>
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
                  {locale === 'ar' ? 'اتصل بنا' : 'Contact Agent'}
                </CardTitle>
                <CardDescription>
                  {locale === 'ar'
                    ? 'تواصل معنا للحصول على المزيد من المعلومات'
                    : 'Get in touch for more information'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" size="lg">
                  <Phone className="h-4 w-4 me-2" />
                  {locale === 'ar' ? 'اتصل الآن' : 'Call Now'}
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  <MessageCircle className="h-4 w-4 me-2" />
                  {locale === 'ar' ? 'واتساب' : 'WhatsApp'}
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  <Mail className="h-4 w-4 me-2" />
                  {locale === 'ar' ? 'إرسال بريد' : 'Email'}
                </Button>
              </CardContent>
            </Card>

            {/* Property Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {locale === 'ar' ? 'تفاصيل العقار' : 'Property Details'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {locale === 'ar' ? 'رقم العقار' : 'Property ID'}
                  </span>
                  <span className="font-medium">{property.propertyId}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{locale === 'ar' ? 'النوع' : 'Type'}</span>
                  <span className="font-medium">{getPropertyTypeLabel(property.type)}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{locale === 'ar' ? 'الحالة' : 'Status'}</span>
                  <Badge variant={property.status === 'sale' ? 'default' : 'secondary'}>
                    {getStatusLabel(property.status)}
                  </Badge>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{locale === 'ar' ? 'المفروشات' : 'Furnished'}</span>
                  <span className="font-medium">
                    {property.furnished
                      ? locale === 'ar'
                        ? 'نعم'
                        : 'Yes'
                      : locale === 'ar'
                        ? 'لا'
                        : 'No'}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{locale === 'ar' ? 'سنة البناء' : 'Year Built'}</span>
                  <span className="font-medium">{property.yearBuilt}</span>
                </div>
              </CardContent>
            </Card>

            {/* Similar Properties */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {locale === 'ar' ? 'عقارات مشابهة' : 'Similar Properties'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground text-center py-8">
                  {locale === 'ar'
                    ? 'عقارات مشابهة متاحة قريباً'
                    : 'Similar properties available soon'}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
