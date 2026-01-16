'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { StatsCard } from '@/components/ui/stats-card'
import { Separator } from '@/components/ui/separator'
import { InterestRating, InterestRatingCompact } from '@/components/ui/interest-rating'
import { MortgageCalculator } from '@/components/ui/mortgage-calculator'
import { ROICalculator } from '@/components/ui/roi-calculator'
import { Progress } from '@/components/ui/progress'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Building2,
  Home,
  MapPin,
  Bed,
  Bath,
  Square,
  TrendingUp,
  TrendingDown,
  Search,
  Plus,
  X,
  Calculator,
  Heart,
  CheckCircle2,
  School,
  Cross,
  Coffee,
  ShoppingCart,
  Train,
  Waves,
  Church,
  DollarSign,
  Percent,
  Download,
  Share2,
  Calendar,
  Info,
  Award,
} from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'
import { DirectionToggle } from '@/components/docs/direction-toggle'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

// ============================================================================
// Data Types
// ============================================================================

interface NearbyPlace {
  type: 'school' | 'hospital' | 'cafe' | 'restaurant' | 'mall' | 'transport' | 'beach' | 'park' | 'mosque' | 'church'
  name: string
  nameAr: string
  distance: number // km
  walkTime: number // minutes
}

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
  district: string
  districtAr: string
  bedrooms: number
  bathrooms: number
  area: number // sqm
  type: 'villa' | 'apartment' | 'townhouse' | 'penthouse'
  status: 'sale' | 'rent'
  furnished: boolean
  parking: number
  yearBuilt: number
  amenities: string[]
  amenitiesAr: string[]
  featured: boolean
  estimatedRent?: number // Annual rent
  serviceCharges?: number
  appreciationRate?: number
  imageUrl: string
  nearbyPlaces: NearbyPlace[]
}

interface PropertyWithRating extends Property {
  userInterest: number // 0-100%
  notes: string
  addedToListAt: Date
  pricePerSqm: number
}

interface ComparisonList {
  id: string
  name: string
  city: string
  properties: PropertyWithRating[]
  createdAt: Date
  updatedAt: Date
}

// ============================================================================
// Mock Data Generator
// ============================================================================

const generateProperties = (): Property[] => {
  const properties: Property[] = [
    {
      id: 'prop-dubai-1',
      title: 'Luxury 3BR Villa with Pool',
      titleAr: 'فيلا فاخرة 3 غرف نوم مع مسبح',
      description: 'Stunning 3-bedroom villa with private pool in Dubai Hills Estate',
      descriptionAr: 'فيلا مذهلة من 3 غرف نوم مع مسبح خاص في دبي هيلز استيت',
      price: 4500000,
      location: 'Dubai Hills Estate, Dubai',
      locationAr: 'دبي هيلز استيت، دبي',
      city: 'Dubai',
      cityAr: 'دبي',
      district: 'Dubai Hills',
      districtAr: 'دبي هيلز',
      bedrooms: 3,
      bathrooms: 4,
      area: 3000,
      type: 'villa',
      status: 'sale',
      furnished: true,
      parking: 2,
      yearBuilt: 2022,
      amenities: ['Private Pool', 'Garden', 'Maid Room', 'Smart Home', 'Gym Access', 'Security'],
      amenitiesAr: ['مسبح خاص', 'حديقة', 'غرفة خادمة', 'منزل ذكي', 'صالة رياضية', 'أمن'],
      featured: true,
      estimatedRent: 240000,
      serviceCharges: 45000,
      appreciationRate: 6,
      imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
      nearbyPlaces: [
        { type: 'school', name: 'GEMS Wellington Academy', nameAr: 'أكاديمية جيمس ويلينغتون', distance: 0.8, walkTime: 10 },
        { type: 'hospital', name: 'Mediclinic Parkview', nameAr: 'ميدكلينيك بارك فيو', distance: 2.5, walkTime: 30 },
        { type: 'cafe', name: 'Starbucks', nameAr: 'ستاربكس', distance: 0.5, walkTime: 6 },
        { type: 'mall', name: 'Dubai Hills Mall', nameAr: 'دبي هيلز مول', distance: 1.2, walkTime: 15 },
        { type: 'transport', name: 'Metro Station (Red Line)', nameAr: 'محطة مترو (الخط الأحمر)', distance: 3.2, walkTime: 40 },
        { type: 'mosque', name: 'Dubai Hills Mosque', nameAr: 'مسجد دبي هيلز', distance: 0.3, walkTime: 4 },
      ],
    },
    {
      id: 'prop-dubai-2',
      title: '2BR Modern Apartment in Downtown',
      titleAr: 'شقة عصرية 2 غرف نوم في وسط المدينة',
      description: 'Contemporary 2-bedroom apartment with Burj Khalifa views',
      descriptionAr: 'شقة معاصرة من غرفتي نوم مع إطلالة على برج خليفة',
      price: 1850000,
      location: 'Downtown Dubai',
      locationAr: 'وسط مدينة دبي',
      city: 'Dubai',
      cityAr: 'دبي',
      district: 'Downtown',
      districtAr: 'وسط المدينة',
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      type: 'apartment',
      status: 'sale',
      furnished: false,
      parking: 1,
      yearBuilt: 2020,
      amenities: ['Pool', 'Gym', 'Concierge', 'Balcony', 'Security'],
      amenitiesAr: ['مسبح', 'صالة رياضية', 'خدمة الكونسيرج', 'شرفة', 'أمن'],
      featured: true,
      estimatedRent: 120000,
      serviceCharges: 28000,
      appreciationRate: 5,
      imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      nearbyPlaces: [
        { type: 'school', name: 'Dubai International Academy', nameAr: 'أكاديمية دبي الدولية', distance: 2.1, walkTime: 25 },
        { type: 'hospital', name: 'Mediclinic City Hospital', nameAr: 'مستشفى مدينة ميدكلينيك', distance: 1.8, walkTime: 22 },
        { type: 'cafe', name: 'The Sum of Us', nameAr: 'ذا سَم أوف أَس', distance: 0.2, walkTime: 2 },
        { type: 'mall', name: 'Dubai Mall', nameAr: 'دبي مول', distance: 0.6, walkTime: 8 },
        { type: 'transport', name: 'Burj Khalifa Metro', nameAr: 'مترو برج خليفة', distance: 0.5, walkTime: 6 },
        { type: 'mosque', name: 'Downtown Mosque', nameAr: 'مسجد وسط المدينة', distance: 0.4, walkTime: 5 },
      ],
    },
    {
      id: 'prop-abudhabi-1',
      title: '4BR Waterfront Villa on Yas Island',
      titleAr: 'فيلا 4 غرف على الواجهة المائية في جزيرة ياس',
      description: 'Spacious 4-bedroom villa with direct beach access',
      descriptionAr: 'فيلا واسعة من 4 غرف نوم مع إمكانية الوصول المباشر إلى الشاطئ',
      price: 6800000,
      location: 'Yas Island, Abu Dhabi',
      locationAr: 'جزيرة ياس، أبوظبي',
      city: 'Abu Dhabi',
      cityAr: 'أبوظبي',
      district: 'Yas Island',
      districtAr: 'جزيرة ياس',
      bedrooms: 4,
      bathrooms: 5,
      area: 4200,
      type: 'villa',
      status: 'sale',
      furnished: true,
      parking: 3,
      yearBuilt: 2023,
      amenities: ['Private Beach', 'Pool', 'Garden', 'Smart Home', 'Maid Room', 'Security', 'Marina Access'],
      amenitiesAr: ['شاطئ خاص', 'مسبح', 'حديقة', 'منزل ذكي', 'غرفة خادمة', 'أمن', 'وصول للمارينا'],
      featured: true,
      estimatedRent: 320000,
      serviceCharges: 68000,
      appreciationRate: 7,
      imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      nearbyPlaces: [
        { type: 'school', name: 'Aldar Academy', nameAr: 'أكاديمية الدار', distance: 1.5, walkTime: 18 },
        { type: 'hospital', name: 'Burjeel Day Surgery Center', nameAr: 'مركز برجيل للجراحة النهارية', distance: 2.3, walkTime: 28 },
        { type: 'cafe', name: 'Jones the Grocer', nameAr: 'جونز ذا جروسر', distance: 0.8, walkTime: 10 },
        { type: 'mall', name: 'Yas Mall', nameAr: 'ياس مول', distance: 1.0, walkTime: 12 },
        { type: 'beach', name: 'Yas Beach', nameAr: 'شاطئ ياس', distance: 0.3, walkTime: 4 },
        { type: 'mosque', name: 'Yas Island Mosque', nameAr: 'مسجد جزيرة ياس', distance: 0.9, walkTime: 11 },
      ],
    },
    {
      id: 'prop-riyadh-1',
      title: '3BR Contemporary Townhouse',
      titleAr: 'تاون هاوس عصري 3 غرف نوم',
      description: 'Modern 3-bedroom townhouse in prestigious Diplomatic Quarter',
      descriptionAr: 'تاون هاوس حديث من 3 غرف نوم في الحي الدبلوماسي المرموق',
      price: 2800000,
      location: 'Diplomatic Quarter, Riyadh',
      locationAr: 'الحي الدبلوماسي، الرياض',
      city: 'Riyadh',
      cityAr: 'الرياض',
      district: 'Diplomatic Quarter',
      districtAr: 'الحي الدبلوماسي',
      bedrooms: 3,
      bathrooms: 3,
      area: 2400,
      type: 'townhouse',
      status: 'sale',
      furnished: false,
      parking: 2,
      yearBuilt: 2021,
      amenities: ['Community Pool', 'Park', 'BBQ Area', 'Security', 'Playground'],
      amenitiesAr: ['مسبح مشترك', 'حديقة', 'منطقة شواء', 'أمن', 'ملعب'],
      featured: false,
      estimatedRent: 150000,
      serviceCharges: 24000,
      appreciationRate: 4,
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      nearbyPlaces: [
        { type: 'school', name: 'British International School', nameAr: 'المدرسة البريطانية الدولية', distance: 1.2, walkTime: 15 },
        { type: 'hospital', name: 'King Faisal Specialist Hospital', nameAr: 'مستشفى الملك فيصل التخصصي', distance: 3.5, walkTime: 42 },
        { type: 'cafe', name: 'Brew92', nameAr: 'بريو92', distance: 0.6, walkTime: 7 },
        { type: 'mall', name: 'Granada Center', nameAr: 'مركز غرناطة', distance: 2.8, walkTime: 34 },
        { type: 'mosque', name: 'DQ Central Mosque', nameAr: 'مسجد الحي الدبلوماسي المركزي', distance: 0.4, walkTime: 5 },
      ],
    },
    {
      id: 'prop-dubai-3',
      title: '4BR Penthouse in Marina',
      titleAr: 'بنتهاوس 4 غرف نوم في المارينا',
      description: 'Stunning penthouse with panoramic marina and sea views',
      descriptionAr: 'بنتهاوس مذهل مع إطلالات بانورامية على المارينا والبحر',
      price: 8500000,
      location: 'Dubai Marina',
      locationAr: 'دبي مارينا',
      city: 'Dubai',
      cityAr: 'دبي',
      district: 'Dubai Marina',
      districtAr: 'دبي مارينا',
      bedrooms: 4,
      bathrooms: 5,
      area: 4500,
      type: 'penthouse',
      status: 'sale',
      furnished: true,
      parking: 3,
      yearBuilt: 2023,
      amenities: ['Private Terrace', 'Sea View', 'Gym', 'Pool', 'Concierge', 'Parking', 'Jacuzzi'],
      amenitiesAr: ['شرفة خاصة', 'إطلالة بحرية', 'صالة رياضية', 'مسبح', 'خدمة الكونسيرج', 'موقف سيارات', 'جاكوزي'],
      featured: true,
      estimatedRent: 450000,
      serviceCharges: 95000,
      appreciationRate: 8,
      imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
      nearbyPlaces: [
        { type: 'school', name: 'Dubai British School', nameAr: 'مدرسة دبي البريطانية', distance: 2.5, walkTime: 30 },
        { type: 'hospital', name: 'Emirates Hospital', nameAr: 'مستشفى الإمارات', distance: 1.8, walkTime: 22 },
        { type: 'cafe', name: 'Tom & Serg', nameAr: 'توم أند سيرج', distance: 0.3, walkTime: 4 },
        { type: 'mall', name: 'Marina Mall', nameAr: 'مارينا مول', distance: 0.5, walkTime: 6 },
        { type: 'transport', name: 'DMCC Metro', nameAr: 'مترو مركز دبي للسلع', distance: 0.8, walkTime: 10 },
        { type: 'beach', name: 'JBR Beach', nameAr: 'شاطئ جي بي آر', distance: 1.2, walkTime: 15 },
        { type: 'mosque', name: 'Marina Mosque', nameAr: 'مسجد المارينا', distance: 0.6, walkTime: 7 },
      ],
    },
    {
      id: 'prop-dubai-4',
      title: '5BR Ultra Luxury Villa on Palm',
      titleAr: 'فيلا فاخرة جداً 5 غرف نوم على النخلة',
      description: 'Exclusive beachfront villa on Palm Jumeirah with private beach',
      descriptionAr: 'فيلا حصرية على الشاطئ في نخلة جميرا مع شاطئ خاص',
      price: 15000000,
      location: 'Palm Jumeirah, Dubai',
      locationAr: 'نخلة جميرا، دبي',
      city: 'Dubai',
      cityAr: 'دبي',
      district: 'Palm Jumeirah',
      districtAr: 'نخلة جميرا',
      bedrooms: 5,
      bathrooms: 6,
      area: 6000,
      type: 'villa',
      status: 'sale',
      furnished: true,
      parking: 4,
      yearBuilt: 2024,
      amenities: ['Private Beach', 'Infinity Pool', 'Cinema Room', 'Gym', 'Wine Cellar', 'Smart Home', 'Elevator', 'Sauna'],
      amenitiesAr: ['شاطئ خاص', 'مسبح لا متناهي', 'غرفة سينما', 'صالة رياضية', 'قبو نبيذ', 'منزل ذكي', 'مصعد', 'ساونا'],
      featured: true,
      estimatedRent: 750000,
      serviceCharges: 180000,
      appreciationRate: 10,
      imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop',
      nearbyPlaces: [
        { type: 'school', name: 'Dubai International Academy', nameAr: 'أكاديمية دبي الدولية', distance: 3.5, walkTime: 42 },
        { type: 'hospital', name: 'Saudi German Hospital', nameAr: 'المستشفى السعودي الألماني', distance: 4.2, walkTime: 50 },
        { type: 'restaurant', name: 'Nobu', nameAr: 'نوبو', distance: 0.8, walkTime: 10 },
        { type: 'mall', name: 'Nakheel Mall', nameAr: 'نخيل مول', distance: 2.5, walkTime: 30 },
        { type: 'beach', name: 'Private Beach', nameAr: 'شاطئ خاص', distance: 0.05, walkTime: 1 },
        { type: 'mosque', name: 'Palm Jumeirah Mosque', nameAr: 'مسجد نخلة جميرا', distance: 1.5, walkTime: 18 },
      ],
    },
    {
      id: 'prop-abudhabi-2',
      title: '3BR Luxury Apartment in Reem Island',
      titleAr: 'شقة فاخرة 3 غرف نوم في جزيرة الريم',
      description: 'Modern apartment with stunning sea views and premium amenities',
      descriptionAr: 'شقة عصرية مع إطلالات بحرية خلابة ووسائل راحة متميزة',
      price: 2200000,
      location: 'Al Reem Island, Abu Dhabi',
      locationAr: 'جزيرة الريم، أبوظبي',
      city: 'Abu Dhabi',
      cityAr: 'أبوظبي',
      district: 'Reem Island',
      districtAr: 'جزيرة الريم',
      bedrooms: 3,
      bathrooms: 3,
      area: 2000,
      type: 'apartment',
      status: 'sale',
      furnished: false,
      parking: 2,
      yearBuilt: 2021,
      amenities: ['Sea View', 'Pool', 'Gym', 'Balcony', 'Security', 'Parking'],
      amenitiesAr: ['إطلالة بحرية', 'مسبح', 'صالة رياضية', 'شرفة', 'أمن', 'موقف سيارات'],
      featured: false,
      estimatedRent: 140000,
      serviceCharges: 35000,
      appreciationRate: 5,
      imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      nearbyPlaces: [
        { type: 'school', name: 'Reem Academy', nameAr: 'أكاديمية الريم', distance: 0.9, walkTime: 11 },
        { type: 'hospital', name: 'Lifecare Hospital', nameAr: 'مستشفى لايف كير', distance: 1.5, walkTime: 18 },
        { type: 'cafe', name: 'Caribou Coffee', nameAr: 'كاريبو كوفي', distance: 0.3, walkTime: 4 },
        { type: 'mall', name: 'Reem Mall', nameAr: 'ريم مول', distance: 0.7, walkTime: 8 },
        { type: 'beach', name: 'Reem Beach', nameAr: 'شاطئ الريم', distance: 0.5, walkTime: 6 },
        { type: 'mosque', name: 'Reem Island Mosque', nameAr: 'مسجد جزيرة الريم', distance: 0.4, walkTime: 5 },
      ],
    },
  ]

  return properties
}

// ============================================================================
// Main Component
// ============================================================================

export default function PropertyComparePage() {
  const { locale, direction } = useDirection()
  const isArabic = locale === 'ar'

  // State
  const [allProperties] = React.useState<Property[]>(generateProperties())
  const [comparisonLists, setComparisonLists] = React.useState<ComparisonList[]>(() => {
    // Load from localStorage or create default
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('noorui-property-comparison-lists')
      if (stored) {
        try {
          return JSON.parse(stored)
        } catch (e) {
          console.error('Failed to parse stored lists', e)
        }
      }
    }
    return [
      {
        id: 'list-dubai',
        name: isArabic ? 'عقارات دبي' : 'Dubai Properties',
        city: 'Dubai',
        properties: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'list-abudhabi',
        name: isArabic ? 'عقارات أبوظبي' : 'Abu Dhabi Properties',
        city: 'Abu Dhabi',
        properties: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'list-riyadh',
        name: isArabic ? 'عقارات الرياض' : 'Riyadh Properties',
        city: 'Riyadh',
        properties: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
  })

  const [activeListId, setActiveListId] = React.useState<string>(comparisonLists[0]?.id || '')
  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedCity, setSelectedCity] = React.useState('all')
  const [selectedType, setSelectedType] = React.useState('all')
  const [showAddDialog, setShowAddDialog] = React.useState(false)
  const [showMortgageDialog, setShowMortgageDialog] = React.useState(false)
  const [showROIDialog, setShowROIDialog] = React.useState(false)
  const [selectedProperty, setSelectedProperty] = React.useState<PropertyWithRating | null>(null)

  // Get active list
  const activeList = comparisonLists.find((l) => l.id === activeListId)

  // Save to localStorage whenever lists change
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('noorui-property-comparison-lists', JSON.stringify(comparisonLists))
    }
  }, [comparisonLists])

  // Add property to list
  const addPropertyToList = (property: Property) => {
    if (!activeList) return

    const propertyWithRating: PropertyWithRating = {
      ...property,
      userInterest: 50,
      notes: '',
      addedToListAt: new Date(),
      pricePerSqm: property.price / property.area,
    }

    const updatedLists = comparisonLists.map((list) =>
      list.id === activeListId
        ? {
            ...list,
            properties: [...list.properties, propertyWithRating],
            updatedAt: new Date(),
          }
        : list
    )

    setComparisonLists(updatedLists)
  }

  // Remove property from list
  const removePropertyFromList = (propertyId: string) => {
    const updatedLists = comparisonLists.map((list) =>
      list.id === activeListId
        ? {
            ...list,
            properties: list.properties.filter((p) => p.id !== propertyId),
            updatedAt: new Date(),
          }
        : list
    )

    setComparisonLists(updatedLists)
  }

  // Update property interest
  const updatePropertyInterest = (propertyId: string, interest: number) => {
    const updatedLists = comparisonLists.map((list) =>
      list.id === activeListId
        ? {
            ...list,
            properties: list.properties.map((p) =>
              p.id === propertyId ? { ...p, userInterest: interest } : p
            ),
            updatedAt: new Date(),
          }
        : list
    )

    setComparisonLists(updatedLists)
  }

  // Filter properties for add dialog
  const filteredProperties = allProperties.filter((p) => {
    const alreadyInList = activeList?.properties.some((lp) => lp.id === p.id)
    if (alreadyInList) return false

    const matchesSearch =
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.titleAr.includes(searchQuery) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCity = selectedCity === 'all' || p.city === selectedCity
    const matchesType = selectedType === 'all' || p.type === selectedType

    return matchesSearch && matchesCity && matchesType
  })

  // Format currency
  const formatCurrency = (value: number) => {
    const formatted = new Intl.NumberFormat(isArabic ? 'ar-AE' : 'en-AE').format(value)
    return isArabic ? `${formatted} د.إ` : `${formatted} AED`
  }

  // Get property type label
  const getPropertyTypeLabel = (type: string) => {
    const types = {
      villa: { en: 'Villa', ar: 'فيلا' },
      apartment: { en: 'Apartment', ar: 'شقة' },
      townhouse: { en: 'Townhouse', ar: 'تاون هاوس' },
      penthouse: { en: 'Penthouse', ar: 'بنتهاوس' },
    }
    return isArabic ? types[type as keyof typeof types].ar : types[type as keyof typeof types].en
  }

  // Get winner badge for best in category
  const getWinner = (properties: PropertyWithRating[], key: keyof PropertyWithRating, mode: 'min' | 'max' = 'max') => {
    if (properties.length === 0) return null
    const sorted = [...properties].sort((a, b) => {
      const aVal = typeof a[key] === 'number' ? a[key] : 0
      const bVal = typeof b[key] === 'number' ? b[key] : 0
      return mode === 'max' ? (bVal as number) - (aVal as number) : (aVal as number) - (bVal as number)
    })
    return sorted[0]?.id
  }

  const lowestPriceWinner = getWinner(activeList?.properties || [], 'price', 'min')
  const highestROIWinner = getWinner(activeList?.properties || [], 'userInterest', 'max')
  const lowestPricePerSqmWinner = getWinner(activeList?.properties || [], 'pricePerSqm', 'min')

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b bg-background">
        <div className="container py-3">
          <nav aria-label="Breadcrumb">
            <div className="flex items-center justify-between gap-4">
              <ol className="flex items-center gap-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-foreground transition-colors">
                    {isArabic ? 'الرئيسية' : 'Home'}
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/examples" className="hover:text-foreground transition-colors">
                    {isArabic ? 'الأمثلة' : 'Examples'}
                  </Link>
                </li>
                <li>/</li>
                <li className="text-foreground font-medium">
                  {isArabic ? 'مقارنة العقارات' : 'Property Comparison'}
                </li>
              </ol>
              <DirectionToggle />
            </div>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="border-b bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="container py-8">
          <div className="flex items-start gap-4">
            <div className="p-4 bg-primary/10 rounded-lg">
              <Building2 className="h-10 w-10 text-primary" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold tracking-tight mb-2">
                {isArabic ? 'منصة مقارنة العقارات' : 'Property Comparison Platform'}
              </h1>
              <p className="text-xl text-muted-foreground mb-4">
                {isArabic
                  ? 'قارن عدد غير محدود من العقارات جنباً إلى جنب مع التحليل الاستثماري'
                  : 'Compare unlimited properties side-by-side with investment analysis'}
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">{isArabic ? 'مقارنة متقدمة' : 'Advanced Comparison'}</Badge>
                <Badge variant="outline">{isArabic ? 'حاسبة الرهن العقاري' : 'Mortgage Calculator'}</Badge>
                <Badge variant="outline">{isArabic ? 'تحليل العائد على الاستثمار' : 'ROI Analysis'}</Badge>
                <Badge variant="outline">GCC</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Lists Tabs */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{isArabic ? 'قوائم المقارنة' : 'Comparison Lists'}</CardTitle>
            <CardDescription>
              {isArabic
                ? 'قم بإنشاء قوائم متعددة لمقارنة العقارات حسب المدينة أو التفضيلات'
                : 'Create multiple lists to compare properties by city or preference'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeListId} onValueChange={setActiveListId}>
              <TabsList className="grid w-full grid-cols-3">
                {comparisonLists.map((list) => (
                  <TabsTrigger key={list.id} value={list.id}>
                    {list.name}
                    {list.properties.length > 0 && (
                      <Badge variant="secondary" className="ms-2">
                        {list.properties.length}
                      </Badge>
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        {/* Add Properties Section */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>
                  {isArabic ? 'إدارة القائمة' : 'List Management'}
                  {activeList && (
                    <span className="text-muted-foreground text-base font-normal ms-2">
                      - {activeList.name}
                    </span>
                  )}
                </CardTitle>
                <CardDescription>
                  {isArabic
                    ? `${activeList?.properties.length || 0} عقار في هذه القائمة`
                    : `${activeList?.properties.length || 0} properties in this list`}
                </CardDescription>
              </div>
              <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 me-2" />
                    {isArabic ? 'إضافة عقارات' : 'Add Properties'}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{isArabic ? 'إضافة عقارات للمقارنة' : 'Add Properties to Compare'}</DialogTitle>
                    <DialogDescription>
                      {isArabic
                        ? 'اختر العقارات التي تريد إضافتها إلى قائمة المقارنة'
                        : 'Select properties to add to your comparison list'}
                    </DialogDescription>
                  </DialogHeader>

                  {/* Filters */}
                  <div className="grid gap-4 md:grid-cols-3 py-4">
                    <Input
                      placeholder={isArabic ? 'البحث...' : 'Search...'}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Select value={selectedCity} onValueChange={setSelectedCity}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{isArabic ? 'جميع المدن' : 'All Cities'}</SelectItem>
                        <SelectItem value="Dubai">{isArabic ? 'دبي' : 'Dubai'}</SelectItem>
                        <SelectItem value="Abu Dhabi">{isArabic ? 'أبوظبي' : 'Abu Dhabi'}</SelectItem>
                        <SelectItem value="Riyadh">{isArabic ? 'الرياض' : 'Riyadh'}</SelectItem>
                        <SelectItem value="Jeddah">{isArabic ? 'جدة' : 'Jeddah'}</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{isArabic ? 'جميع الأنواع' : 'All Types'}</SelectItem>
                        <SelectItem value="villa">{isArabic ? 'فيلا' : 'Villa'}</SelectItem>
                        <SelectItem value="apartment">{isArabic ? 'شقة' : 'Apartment'}</SelectItem>
                        <SelectItem value="townhouse">{isArabic ? 'تاون هاوس' : 'Townhouse'}</SelectItem>
                        <SelectItem value="penthouse">{isArabic ? 'بنتهاوس' : 'Penthouse'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Available Properties */}
                  <div className="space-y-4">
                    {filteredProperties.map((property) => (
                      <Card key={property.id} className="hover:shadow-lg transition-all duration-300 overflow-hidden group">
                        <CardContent className="p-0">
                          <div className="flex items-start gap-4">
                            <div className="relative w-48 h-32 flex-shrink-0 overflow-hidden">
                              <img
                                src={property.imageUrl}
                                alt={isArabic ? property.titleAr : property.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              {property.featured && (
                                <Badge className="absolute top-2 start-2" variant="default" size="sm">
                                  <Award className="h-3 w-3 me-1" />
                                  {isArabic ? 'مميز' : 'Featured'}
                                </Badge>
                              )}
                            </div>
                            <div className="flex-1 py-4 pe-4">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <h3 className="font-semibold text-lg mb-1">
                                    {isArabic ? property.titleAr : property.title}
                                  </h3>
                                  <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                                    <MapPin className="h-3 w-3" />
                                    {isArabic ? property.locationAr : property.location}
                                  </p>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-2 mb-3">
                                <Badge variant="outline">
                                  <Bed className="h-3 w-3 me-1" />
                                  {property.bedrooms} {isArabic ? 'غرف' : 'BR'}
                                </Badge>
                                <Badge variant="outline">
                                  <Bath className="h-3 w-3 me-1" />
                                  {property.bathrooms} {isArabic ? 'حمام' : 'Bath'}
                                </Badge>
                                <Badge variant="outline">
                                  <Square className="h-3 w-3 me-1" />
                                  {property.area.toLocaleString()} {isArabic ? 'م²' : 'sqm'}
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <p className="text-2xl font-bold text-primary">{formatCurrency(property.price)}</p>
                                <Button
                                  onClick={() => {
                                    addPropertyToList(property)
                                    setShowAddDialog(false)
                                  }}
                                >
                                  <Plus className="h-4 w-4 me-2" />
                                  {isArabic ? 'إضافة' : 'Add'}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {filteredProperties.length === 0 && (
                      <div className="text-center py-12 text-muted-foreground">
                        {isArabic ? 'لا توجد عقارات متاحة' : 'No properties available'}
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
        </Card>

        {/* Comparison Display */}
        {activeList && activeList.properties.length > 0 ? (
          <>
            {/* Property Cards with Interest Rating */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {isArabic ? 'العقارات المحددة' : 'Selected Properties'}
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {activeList.properties.map((property) => (
                  <Card key={property.id} className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
                    <div className="absolute top-2 end-2 z-10">
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removePropertyFromList(property.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={property.imageUrl}
                        alt={isArabic ? property.titleAr : property.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                      {property.featured && (
                        <Badge className="absolute top-3 start-3" variant="default">
                          <Award className="h-3 w-3 me-1" />
                          {isArabic ? 'مميز' : 'Featured'}
                        </Badge>
                      )}
                    </div>

                    <CardHeader>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <Badge variant="outline">{getPropertyTypeLabel(property.type)}</Badge>
                        {property.id === lowestPriceWinner && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Award className="h-5 w-5 text-yellow-500" />
                              </TooltipTrigger>
                              <TooltipContent>
                                {isArabic ? 'أقل سعر' : 'Lowest Price'}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                        {property.id === lowestPricePerSqmWinner && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Award className="h-5 w-5 text-green-500" />
                              </TooltipTrigger>
                              <TooltipContent>
                                {isArabic ? 'أفضل قيمة للمتر المربع' : 'Best Value per sqm'}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                      <CardTitle className="text-lg line-clamp-2">
                        {isArabic ? property.titleAr : property.title}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {isArabic ? property.locationAr : property.location}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold">{formatCurrency(property.price)}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatCurrency(property.pricePerSqm)}/{isArabic ? 'م²' : 'sqm'}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">
                          <Bed className="h-3 w-3 me-1" />
                          {property.bedrooms}
                        </Badge>
                        <Badge variant="secondary">
                          <Bath className="h-3 w-3 me-1" />
                          {property.bathrooms}
                        </Badge>
                        <Badge variant="secondary">
                          <Square className="h-3 w-3 me-1" />
                          {property.area}
                        </Badge>
                      </div>

                      <InterestRating
                        value={property.userInterest}
                        onValueChange={(value) => updatePropertyInterest(property.id, value)}
                        label={isArabic ? 'مستوى الاهتمام' : 'Interest Level'}
                        size="sm"
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Detailed Comparison Table */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{isArabic ? 'مقارنة تفصيلية' : 'Detailed Comparison'}</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="multiple" defaultValue={['basic', 'pricing']} className="w-full">
                  {/* Basic Information */}
                  <AccordionItem value="basic">
                    <AccordionTrigger className="text-lg font-semibold">
                      {isArabic ? 'المعلومات الأساسية' : 'Basic Information'}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[200px]">{isArabic ? 'الخاصية' : 'Property'}</TableHead>
                              {activeList.properties.map((property) => (
                                <TableHead key={property.id} className="text-center min-w-[200px]">
                                  {isArabic ? property.titleAr : property.title}
                                </TableHead>
                              ))}
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">{isArabic ? 'النوع' : 'Type'}</TableCell>
                              {activeList.properties.map((property) => (
                                <TableCell key={property.id} className="text-center">
                                  {getPropertyTypeLabel(property.type)}
                                </TableCell>
                              ))}
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">{isArabic ? 'الموقع' : 'Location'}</TableCell>
                              {activeList.properties.map((property) => (
                                <TableCell key={property.id} className="text-center">
                                  <div className="flex items-center justify-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {isArabic ? property.districtAr : property.district}
                                  </div>
                                </TableCell>
                              ))}
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">{isArabic ? 'سنة البناء' : 'Year Built'}</TableCell>
                              {activeList.properties.map((property) => (
                                <TableCell key={property.id} className="text-center">
                                  {property.yearBuilt}
                                </TableCell>
                              ))}
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">{isArabic ? 'مفروش' : 'Furnished'}</TableCell>
                              {activeList.properties.map((property) => (
                                <TableCell key={property.id} className="text-center">
                                  {property.furnished ? (
                                    <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                                  ) : (
                                    <X className="h-5 w-5 text-muted-foreground/30 mx-auto" />
                                  )}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Pricing */}
                  <AccordionItem value="pricing">
                    <AccordionTrigger className="text-lg font-semibold">
                      {isArabic ? 'التسعير' : 'Pricing & Investment'}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[200px]">{isArabic ? 'المقياس' : 'Metric'}</TableHead>
                              {activeList.properties.map((property) => (
                                <TableHead key={property.id} className="text-center min-w-[200px]">
                                  <InterestRatingCompact value={property.userInterest} />
                                </TableHead>
                              ))}
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">{isArabic ? 'السعر' : 'Price'}</TableCell>
                              {activeList.properties.map((property) => (
                                <TableCell key={property.id} className="text-center">
                                  <div className="flex items-center justify-center gap-2">
                                    <span className="font-bold">{formatCurrency(property.price)}</span>
                                    {property.id === lowestPriceWinner && (
                                      <Award className="h-4 w-4 text-yellow-500" />
                                    )}
                                  </div>
                                </TableCell>
                              ))}
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">
                                {isArabic ? 'السعر/م²' : 'Price per sqm'}
                              </TableCell>
                              {activeList.properties.map((property) => (
                                <TableCell key={property.id} className="text-center">
                                  <div className="flex items-center justify-center gap-2">
                                    <span>{formatCurrency(property.pricePerSqm)}</span>
                                    {property.id === lowestPricePerSqmWinner && (
                                      <Award className="h-4 w-4 text-green-500" />
                                    )}
                                  </div>
                                </TableCell>
                              ))}
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">
                                {isArabic ? 'الإيجار السنوي المتوقع' : 'Est. Annual Rent'}
                              </TableCell>
                              {activeList.properties.map((property) => (
                                <TableCell key={property.id} className="text-center">
                                  {property.estimatedRent ? formatCurrency(property.estimatedRent) : '-'}
                                </TableCell>
                              ))}
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">
                                {isArabic ? 'عائد الإيجار' : 'Rental Yield'}
                              </TableCell>
                              {activeList.properties.map((property) => (
                                <TableCell key={property.id} className="text-center">
                                  {property.estimatedRent
                                    ? `${((property.estimatedRent / property.price) * 100).toFixed(2)}%`
                                    : '-'}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Specifications */}
                  <AccordionItem value="specs">
                    <AccordionTrigger className="text-lg font-semibold">
                      {isArabic ? 'المواصفات' : 'Specifications'}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="overflow-x-auto">
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium w-[200px]">
                                {isArabic ? 'غرف النوم' : 'Bedrooms'}
                              </TableCell>
                              {activeList.properties.map((property) => (
                                <TableCell key={property.id} className="text-center min-w-[200px]">
                                  {property.bedrooms}
                                </TableCell>
                              ))}
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">{isArabic ? 'الحمامات' : 'Bathrooms'}</TableCell>
                              {activeList.properties.map((property) => (
                                <TableCell key={property.id} className="text-center">
                                  {property.bathrooms}
                                </TableCell>
                              ))}
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">{isArabic ? 'المساحة (م²)' : 'Area (sqm)'}</TableCell>
                              {activeList.properties.map((property) => (
                                <TableCell key={property.id} className="text-center">
                                  {property.area.toLocaleString()}
                                </TableCell>
                              ))}
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">{isArabic ? 'المواقف' : 'Parking'}</TableCell>
                              {activeList.properties.map((property) => (
                                <TableCell key={property.id} className="text-center">
                                  {property.parking}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Nearby Places */}
                  <AccordionItem value="nearby">
                    <AccordionTrigger className="text-lg font-semibold">
                      {isArabic ? 'الأماكن القريبة' : 'Nearby Places'}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-6">
                        {[
                          { type: 'school', icon: School, label: isArabic ? 'المدارس' : 'Schools' },
                          { type: 'hospital', icon: Cross, label: isArabic ? 'المستشفيات' : 'Hospitals' },
                          { type: 'cafe', icon: Coffee, label: isArabic ? 'المقاهي' : 'Cafes' },
                          { type: 'mall', icon: ShoppingCart, label: isArabic ? 'المراكز التجارية' : 'Malls' },
                          { type: 'transport', icon: Train, label: isArabic ? 'المواصلات' : 'Transport' },
                          { type: 'mosque', icon: Church, label: isArabic ? 'المساجد' : 'Mosques' },
                        ].map(({ type, icon: Icon, label }) => {
                          const distances = activeList.properties.map((property) => {
                            const place = property.nearbyPlaces.find((p) => p.type === type)
                            return place?.distance || 999
                          })
                          const maxDistance = Math.max(...distances.filter((d) => d < 999))

                          return (
                            <div key={type}>
                              <div className="flex items-center gap-2 mb-3">
                                <Icon className="h-5 w-5 text-primary" />
                                <h4 className="font-semibold">{label}</h4>
                              </div>
                              <div className="grid gap-2">
                                {activeList.properties.map((property) => {
                                  const place = property.nearbyPlaces.find((p) => p.type === type)
                                  const distance = place?.distance || 999
                                  const percentage = maxDistance > 0 ? (distance / maxDistance) * 100 : 0

                                  return (
                                    <div key={property.id} className="space-y-1">
                                      <div className="flex items-center justify-between text-sm">
                                        <span className="truncate max-w-[200px]">
                                          {isArabic ? property.titleAr.substring(0, 30) : property.title.substring(0, 30)}...
                                        </span>
                                        <span className="font-medium">
                                          {distance < 999 ? `${distance.toFixed(1)} ${isArabic ? 'كم' : 'km'}` : '-'}
                                        </span>
                                      </div>
                                      <Progress value={distance < 999 ? 100 - percentage : 0} className="h-2" />
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Calculators */}
            <div className="grid gap-8 lg:grid-cols-2 mb-8">
              {/* Mortgage Calculator */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    {isArabic ? 'حاسبة القرض العقاري' : 'Mortgage Calculator'}
                  </CardTitle>
                  <CardDescription>
                    {isArabic
                      ? 'احسب الأقساط الشهرية لكل عقار'
                      : 'Calculate monthly payments for each property'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Dialog open={showMortgageDialog} onOpenChange={setShowMortgageDialog}>
                    <DialogTrigger asChild>
                      <Button className="w-full" variant="outline">
                        {isArabic ? 'فتح الحاسبة' : 'Open Calculator'}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <MortgageCalculator defaultPrice={activeList.properties[0]?.price || 2000000} />
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              {/* ROI Calculator */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    {isArabic ? 'حاسبة العائد على الاستثمار' : 'ROI Calculator'}
                  </CardTitle>
                  <CardDescription>
                    {isArabic
                      ? 'قم بتحليل العائد الاستثماري لكل عقار'
                      : 'Analyze investment returns for each property'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Dialog open={showROIDialog} onOpenChange={setShowROIDialog}>
                    <DialogTrigger asChild>
                      <Button className="w-full" variant="outline">
                        {isArabic ? 'فتح الحاسبة' : 'Open Calculator'}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <ROICalculator
                        defaultPurchasePrice={activeList.properties[0]?.price || 2000000}
                        defaultAnnualRent={activeList.properties[0]?.estimatedRent || 120000}
                      />
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </div>
          </>
        ) : (
          <Card className="p-12">
            <div className="text-center">
              <Building2 className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {isArabic ? 'لا توجد عقارات للمقارنة' : 'No Properties to Compare'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {isArabic
                  ? 'ابدأ بإضافة عقارات إلى قائمتك لمقارنتها جنباً إلى جنب'
                  : 'Start by adding properties to your list to compare them side-by-side'}
              </p>
              <Button onClick={() => setShowAddDialog(true)}>
                <Plus className="h-4 w-4 me-2" />
                {isArabic ? 'إضافة أول عقار' : 'Add First Property'}
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
