# 🏠 Property Comparison Platform - Live Demo Roadmap

**Example Page:** `/app/examples/property-compare/page.tsx`
**Started:** 2026-01-12
**Status:** 🚧 In Development

---

## 📋 Project Overview

Building an advanced **Property Comparison Platform** for the GCC real estate market, showcasing Noor UI components with real-world functionality including mortgage calculations, ROI analysis, and unlimited property comparisons.

---

## 🎯 Core Features

### 1. **Property Comparison Lists Manager**
- Create multiple comparison lists (Dubai, Abu Dhabi, Riyadh, Jeddah, etc.)
- Each list can hold **unlimited properties**
- Quick switch between lists via Tabs component
- Save lists to localStorage
- Each property includes:
  - **Interest/Love percentage** (0-100%) with slider
  - Personal notes
  - Color coding based on interest level

### 2. **Mortgage Calculator Component** (`components/ui/mortgage-calculator.tsx`)
Based on Portuguese design (Idealista/Crédito Habitação):

**Inputs:**
- **Property Price Slider** (Preço do imóvel) - Range: 100k - 50M AED
- **Down Payment Slider** (Entrada inicial) - Shows amount + percentage (default: 30%)
- **Loan Term Slider** (Prazo em anos) - 1-40 years
- **Property Type Radio** (Tipo de habitação):
  - Primary Residence (Principal)
  - Investment Property (Secundária)
- **Interest Rate Radio** (Taxa de juro):
  - Fixed (Fixa)
  - Variable (Variável)
  - Rate adjuster with +/- buttons (2-10% range)

**Calculated Outputs:**
- Taxes and fees (Impostos e despesas)
- Loan amount (Montante do empréstimo)
- **Monthly payment** (A tua prestação mensal) - **Highlighted**
- Button: "Find Mortgage Options" (Encontrar crédito habitação)

**Features:**
- Real-time calculations as user adjusts sliders
- Full RTL support with CSS logical properties
- Bilingual labels (English/Arabic)
- Responsive design

### 3. **Advanced Comparison DataTable**
- **Columns:** Property cards (unlimited)
- **Rows organized by categories:**

#### Basic Information
- Title
- Type (Villa, Apartment, Townhouse, Penthouse)
- Status (Sale/Rent)
- Location (City + District)

#### Pricing & Investment Metrics
- Price
- Price per sqm (AED/sqm)
- Annual Rent Yield (%)
- ROI Percentage
- Market comparison indicator

#### Specifications
- Bedrooms
- Bathrooms
- Area (sqm/sqft)
- Parking spaces
- Year Built
- Furnished status

#### Amenities
- Checkmarks for available features
- Private pool, Garden, Gym, etc.

#### Location Score
- Distance to key places (visual bars)
- Proximity scores (0-10)

#### Investment Metrics
- ROI calculations
- Appreciation potential
- Rental yield
- Break-even period

#### Interest Rating
- User's love percentage
- Color-coded indicators

### 4. **Price per Square Meter Calculator**
- Formula: `Price ÷ Area = AED/sqm`
- Compare against area average
- Visual indicator:
  - 🟢 Below market average (good deal)
  - 🟡 At market average
  - 🔴 Above market average
- Show in AED and convert to:
  - USD/sqm (international comparison)
  - SAR/sqm (Saudi buyers)

### 5. **Nearby Places Identification**
For each property, show distance to:

| Category | Places | Range |
|----------|--------|-------|
| 🏫 **Education** | International schools, nurseries, universities | 0-5 km |
| 🏥 **Healthcare** | Hospitals, clinics, pharmacies | 0-10 km |
| ☕ **Lifestyle** | Cafes, restaurants, shopping malls | 0-2 km |
| 🚇 **Transport** | Metro stations, bus stops, highways | 0-3 km |
| 🏖️ **Leisure** | Beaches, parks, entertainment venues | 0-10 km |
| 🕌 **Religious** | Mosques, churches, temples | 0-2 km |

**Display Options:**
- List view with distances
- Visual radar chart showing proximity scores
- Interactive map with markers (in property modal)

### 6. **ROI Calculator for Investors**

**Inputs:**
- Purchase price
- Estimated annual rent
- Service charges (annual)
- Property management fees (%)
- Expected appreciation rate (%)
- Holding period (years)
- Down payment (%)
- Mortgage interest rate (%)

**Calculated Outputs:**
- **Annual Rental Yield:** `(Annual Rent - Expenses) ÷ Purchase Price × 100`
- **Cash-on-Cash Return:** Return on actual cash invested
- **Total ROI after X years:** Including appreciation
- **Break-even period:** When rental income covers purchase
- **Projected property value:** After X years
- **Total income vs investment:** Net profit calculation

**Display:**
- StatsCard grid for key metrics
- Detailed breakdown table
- Visual chart (line graph showing value over time)
- Comparison with other investment options (stocks, bonds)

---

## 🎨 Components to Create/Use

### **New Components to Build:**

1. **`components/ui/mortgage-calculator.tsx`**
   - Standalone mortgage calculator
   - Exact replica of Portuguese design
   - Reusable across site

2. **`components/ui/property-comparison-table.tsx`**
   - Enhanced DataTable for side-by-side comparison
   - Horizontal scrolling for unlimited properties
   - Category grouping with Accordion

3. **`components/ui/roi-calculator.tsx`**
   - Investment analysis tool
   - Interactive inputs
   - Real-time calculations

4. **`components/ui/nearby-places-map.tsx`**
   - Interactive map with markers
   - Integration with property locations
   - Filter by category

5. **`components/ui/interest-rating.tsx`**
   - Love percentage slider
   - Heart icon with fill percentage
   - Color-coded (red → yellow → green)

### **Existing Noor UI Components Used:**

- ✅ **DataTable** (sortable, filterable comparison)
- ✅ **Card, StatsCard, FeatureCard**
- ✅ **Slider, RangeSlider**
- ✅ **RadioGroup, Checkbox**
- ✅ **Tabs** (for list switching)
- ✅ **Dialog** (property details, contact forms)
- ✅ **Badge** (property features, status)
- ✅ **Button, ButtonArrow**
- ✅ **Input, Select, NumberInput**
- ✅ **Accordion** (expandable comparison rows)
- ✅ **Tooltip** (feature explanations)
- ✅ **Progress** (visual indicators)
- ✅ **Separator**
- ✅ **Alert** (helpful tips)
- ✅ **Form** components

---

## 📊 Data Structure

```typescript
interface PropertyComparisonList {
  id: string
  name: string // "Dubai Villas", "Abu Dhabi Apartments"
  city: string // "Dubai", "Abu Dhabi", "Riyadh", "Jeddah"
  properties: PropertyWithRating[]
  createdAt: Date
  updatedAt: Date
}

interface PropertyWithRating extends Property {
  // User customization
  userInterest: number // 0-100% love/interest rating
  notes: string // Personal notes
  addedToListAt: Date

  // Calculated fields
  pricePerSqm: number
  nearbyPlaces: NearbyPlace[]
  investmentMetrics: ROIMetrics
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

  // Specifications
  bedrooms: number
  bathrooms: number
  area: number // sqm
  type: 'villa' | 'apartment' | 'townhouse' | 'penthouse'
  status: 'sale' | 'rent'
  furnished: boolean
  parking: number
  yearBuilt: number

  // Features
  amenities: string[]
  amenitiesAr: string[]
  featured: boolean

  // Investment data
  estimatedRent?: number // Annual rent (for sale properties)
  serviceCharges?: number // Annual
  appreciationRate?: number // Expected % per year

  // Media
  imageUrl: string
  images?: string[]
  virtualTourUrl?: string

  // Location coordinates (for map)
  latitude?: number
  longitude?: number
}

interface NearbyPlace {
  type: 'school' | 'hospital' | 'cafe' | 'restaurant' | 'mall' | 'transport' | 'beach' | 'park' | 'mosque' | 'church'
  name: string
  nameAr: string
  distance: number // in km
  walkTime: number // in minutes
  icon?: string
}

interface ROIMetrics {
  // Input values
  purchasePrice: number
  annualRent: number
  serviceCharges: number
  managementFees: number // percentage
  appreciationRate: number // percentage per year
  holdingPeriod: number // years
  downPayment: number
  mortgageRate: number // percentage

  // Calculated values
  rentalYield: number // percentage
  cashOnCashReturn: number // percentage
  totalROI: number // percentage after holding period
  breakEvenYears: number
  projectedValue: number // after holding period
  totalIncome: number
  netProfit: number
}

interface MortgageCalculation {
  propertyPrice: number
  downPayment: number
  downPaymentPercent: number
  loanAmount: number
  interestRate: number
  rateType: 'fixed' | 'variable'
  termYears: number
  propertyType: 'primary' | 'investment'

  // Calculated
  monthlyPayment: number
  totalInterest: number
  totalPayment: number
  taxesAndFees: number
}
```

---

## 🏗️ Page Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ [Header + Breadcrumb + DirectionToggle]                      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ [Hero Section]                                                │
│ Property Comparison Platform                                  │
│ Compare unlimited properties side-by-side                    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ [Tabs: Comparison Lists Selector]                            │
│ ┌──────┬───────────┬─────────┬────────┬───────────┐         │
│ │Dubai │Abu Dhabi  │ Riyadh  │Jeddah  │+ New List │         │
│ │(5)   │(3)        │(7)      │(2)     │           │         │
│ └──────┴───────────┴─────────┴────────┴───────────┘         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ [Selected List Management]                                    │
│ [Add Properties] [Remove Selected] [Export Comparison]       │
│                                                               │
│ Property Search & Selection DataTable                        │
│ (Sortable, filterable, checkbox selection)                   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ [Horizontal Property Cards with Interest Rating]             │
│ ┌────────────┬────────────┬────────────┬────────────┐       │
│ │ Property 1 │ Property 2 │ Property 3 │ Property 4 │ ...   │
│ │  ❤️ 85%    │  ❤️ 72%    │  ❤️ 90%    │  ❤️ 45%    │       │
│ │ [Image]    │ [Image]    │ [Image]    │ [Image]    │       │
│ │ 3BR Villa  │ 2BR Apt    │ 4BR Villa  │ 1BR Apt    │       │
│ │ 4.5M AED   │ 1.2M AED   │ 6.8M AED   │ 850K AED   │       │
│ │ [Remove]   │ [Remove]   │ [Remove]   │ [Remove]   │       │
│ └────────────┴────────────┴────────────┴────────────┘       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ [Comparison Categories - Accordion]                           │
│                                                               │
│ ▼ Basic Information                                          │
│   ┌──────────────────┬──────┬──────┬──────┬──────┐          │
│   │ Title            │ P1   │ P2   │ P3   │ P4   │          │
│   │ Type             │ Villa│ Apt  │ Villa│ Apt  │          │
│   │ Location         │ DXB  │ DXB  │ AUH  │ DXB  │          │
│   └──────────────────┴──────┴──────┴──────┴──────┘          │
│                                                               │
│ ▼ Pricing & Investment Metrics                              │
│   ┌──────────────────┬─────────┬─────────┬─────────┬───┐    │
│   │ Price            │ 4.5M 🏆 │ 1.2M 🏆 │ 6.8M    │   │    │
│   │ Price/sqm        │ 1,500   │ 1,200 🏆│ 1,800   │   │    │
│   │ ROI (5yr)        │ 45% 🏆  │ 38%     │ 42%     │   │    │
│   │ Rental Yield     │ 6.2%    │ 5.8%    │ 7.1% 🏆 │   │    │
│   └──────────────────┴─────────┴─────────┴─────────┴───┘    │
│   [Calculate Mortgage] [Show ROI Details]                    │
│                                                               │
│ ▼ Specifications                                             │
│   ┌──────────────────┬──────┬──────┬──────┬──────┐          │
│   │ Bedrooms         │ 3    │ 2    │ 4 🏆 │ 1    │          │
│   │ Bathrooms        │ 4    │ 2    │ 5 🏆 │ 1    │          │
│   │ Area (sqm)       │ 3000 │ 1000 │ 3800 │ 700  │          │
│   │ Parking          │ 2    │ 1    │ 3 🏆 │ 1    │          │
│   └──────────────────┴──────┴──────┴──────┴──────┘          │
│                                                               │
│ ▼ Amenities                                                  │
│   ┌──────────────────┬──────┬──────┬──────┬──────┐          │
│   │ Pool             │ ✓    │ ✓    │ ✓    │ ✓    │          │
│   │ Gym              │ ✓    │ ✓    │ ✓    │ ✗    │          │
│   │ Garden           │ ✓    │ ✗    │ ✓    │ ✗    │          │
│   │ Smart Home       │ ✓    │ ✗    │ ✓    │ ✗    │          │
│   └──────────────────┴──────┴──────┴──────┴──────┘          │
│                                                               │
│ ▼ Location & Nearby Places                                  │
│   ┌──────────────────┬──────────────────────────────┐       │
│   │ 🏫 Schools       │ ████████ 0.8km               │       │
│   │ 🏥 Hospital      │ ████████████ 2.5km           │       │
│   │ ☕ Cafes         │ ██████ 0.5km 🏆              │       │
│   │ 🚇 Metro         │ ████████████████ 3.2km       │       │
│   │ 🏖️ Beach         │ ██████████ 1.8km 🏆          │       │
│   └──────────────────┴──────────────────────────────┘       │
│   [View on Map] buttons                                      │
│                                                               │
│ ▼ Mortgage Estimation                                        │
│   Side-by-side monthly payments for each property           │
│   [Open Calculator] buttons                                  │
│                                                               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ [Action Buttons]                                              │
│ [Export as PDF] [Share Comparison] [Schedule Viewing]        │
└─────────────────────────────────────────────────────────────┘
```

---

## 🌍 GCC-Specific Features

### **Cities Coverage:**

#### Dubai
- Districts: Marina, Downtown, JBR, Palm Jumeirah, Arabian Ranches, Dubai Hills, Business Bay
- Key landmarks: Dubai Mall, Burj Khalifa, Dubai Marina Mall

#### Abu Dhabi
- Districts: Reem Island, Yas Island, Saadiyat Island, Al Raha Beach
- Key landmarks: Yas Mall, The Galleria, Corniche

#### Riyadh
- Districts: Diplomatic Quarter, Al Malqa, Olaya, Al Nakheel
- Key landmarks: Kingdom Centre, Riyadh Park Mall

#### Jeddah
- Districts: North Obhur, Al Hamra, Al Shati, Al Rawdah
- Key landmarks: Red Sea Mall, Jeddah Corniche

### **Nearby Places Database (Mock Data)**

#### Dubai
- **Schools:** GEMS Wellington, JESS, Dubai English Speaking School, Swiss International School
- **Hospitals:** American Hospital Dubai, Mediclinic City Hospital, Saudi German Hospital
- **Metro:** Red Line (Marina, JBR, DIFC), Green Line
- **Beaches:** JBR Beach, Kite Beach, La Mer, Black Palace Beach
- **Malls:** Dubai Mall, Mall of the Emirates, Marina Mall, Ibn Battuta

#### Abu Dhabi
- **Schools:** GEMS American Academy, Repton School, Al Yasmina School
- **Hospitals:** Cleveland Clinic, Burjeel Hospital, Mediclinic
- **Beaches:** Saadiyat Beach, Corniche Beach, Yas Beach
- **Malls:** Yas Mall, Marina Mall, The Galleria, Al Wahda Mall

### **Currency:**
- Primary: **AED (د.إ)**
- Secondary conversions: USD, EUR, SAR, GBP

### **Mortgage Rates (GCC Market):**
- Fixed Rate: 3.5% - 5.5%
- Variable Rate: 2.5% - 4.5%
- Down Payment: Typically 20-25% (UAE), up to 30% for investment properties

---

## ✅ Implementation Checklist

### Phase 1: Core Components
- [ ] Create `mortgage-calculator.tsx` component
- [ ] Create `interest-rating.tsx` component
- [ ] Create `roi-calculator.tsx` component
- [ ] Create property comparison data structure

### Phase 2: List Management
- [ ] Build comparison lists manager (Tabs interface)
- [ ] Implement localStorage persistence
- [ ] Add/remove properties functionality
- [ ] List creation/deletion

### Phase 3: Comparison Table
- [ ] Build main comparison DataTable
- [ ] Implement category accordion sections
- [ ] Add winner badges logic
- [ ] Horizontal scrolling for unlimited properties

### Phase 4: Calculations
- [ ] Price per sqm calculator
- [ ] ROI calculations and display
- [ ] Mortgage integration per property
- [ ] Market comparison logic

### Phase 5: Location Features
- [ ] Nearby places data structure
- [ ] Distance calculations
- [ ] Proximity score visualization
- [ ] Map integration (modal)

### Phase 6: Property Selection
- [ ] Search and filter DataTable
- [ ] Checkbox selection
- [ ] Add to list functionality
- [ ] Property cards display

### Phase 7: UI/UX Polish
- [ ] Bilingual content (EN/AR)
- [ ] RTL/LTR testing
- [ ] Responsive design
- [ ] Loading states
- [ ] Empty states
- [ ] Error handling

### Phase 8: Integration
- [ ] Main page integration
- [ ] Navigation and routing
- [ ] Modals and dialogs
- [ ] Export functionality
- [ ] Contact forms

### Phase 9: Testing
- [ ] RTL/LTR switching
- [ ] All calculations accurate
- [ ] Mobile responsiveness
- [ ] Browser compatibility
- [ ] Performance optimization

---

## 🎨 Design Guidelines

### Color Coding
- **Interest Rating:**
  - 0-33%: `text-red-500` (Low interest)
  - 34-66%: `text-yellow-500` (Medium interest)
  - 67-100%: `text-green-500` (High interest)

- **Price Comparison:**
  - Below market: `bg-green-100 text-green-800`
  - At market: `bg-yellow-100 text-yellow-800`
  - Above market: `bg-red-100 text-red-800`

### Winner Badges
- Show 🏆 emoji for best in category
- Categories: Lowest price, Best ROI, Best location score, Most space

### Visual Indicators
- Use `Progress` component for proximity bars
- Use `Badge` for property features
- Use `StatsCard` for key metrics
- Use `Tooltip` for explanations

---

## 📝 i18n Requirements (English/Arabic)

### Mortgage Calculator
- Property price / سعر العقار
- Down payment / الدفعة الأولى
- Loan term / مدة القرض
- Interest rate / سعر الفائدة
- Monthly payment / القسط الشهري
- Primary residence / سكن أساسي
- Investment property / عقار استثماري
- Fixed rate / سعر ثابت
- Variable rate / سعر متغير

### Comparison Terms
- Compare properties / مقارنة العقارات
- Add to list / إضافة إلى القائمة
- Interest rating / تقييم الاهتمام
- Price per sqm / السعر للمتر المربع
- ROI / العائد على الاستثمار
- Rental yield / عائد الإيجار
- Nearby places / الأماكن القريبة
- Winner / الأفضل

### Investment Terms
- Purchase price / سعر الشراء
- Annual rent / الإيجار السنوي
- Service charges / رسوم الخدمة
- Management fees / رسوم الإدارة
- Appreciation rate / معدل الزيادة
- Break-even / نقطة التعادل
- Cash return / العائد النقدي

---

## 🚀 Launch Checklist

- [ ] Dev server running
- [ ] All components built and tested
- [ ] Bilingual content complete
- [ ] RTL fully functional
- [ ] Responsive on mobile/tablet/desktop
- [ ] Calculations verified
- [ ] Mock data realistic and comprehensive
- [ ] Navigation working
- [ ] No console errors
- [ ] Performance optimized
- [ ] Ready for demo

---

## 📚 Technical Notes

### localStorage Schema
```typescript
const STORAGE_KEY = 'noorui-property-comparison-lists'

interface StoredData {
  lists: PropertyComparisonList[]
  lastUpdated: string
}
```

### Calculation Formulas

**Monthly Mortgage Payment:**
```
M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
Where:
M = Monthly payment
P = Principal (loan amount)
i = Monthly interest rate (annual rate / 12)
n = Number of payments (years × 12)
```

**Rental Yield:**
```
Yield = (Annual Rent - Annual Expenses) / Property Price × 100
```

**ROI:**
```
ROI = (Gain - Cost) / Cost × 100
```

**Price per SQM:**
```
Price/SQM = Total Price / Area in SQM
```

---

## 🎯 Success Criteria

1. ✅ Users can create unlimited comparison lists
2. ✅ Each list can hold unlimited properties
3. ✅ All calculations are accurate and real-time
4. ✅ Full bilingual support (EN/AR)
5. ✅ Complete RTL/LTR functionality
6. ✅ Mortgage calculator matches Portuguese design exactly
7. ✅ ROI calculator provides investor insights
8. ✅ Nearby places add location value
9. ✅ Interest rating personalizes comparison
10. ✅ Responsive and performant
11. ✅ Showcases 20+ Noor UI components

---

## 📅 Timeline

- **Day 1:** Components (Mortgage Calculator, Interest Rating, ROI)
- **Day 2:** List management, DataTable comparison
- **Day 3:** Calculations, nearby places, integration
- **Day 4:** Polish, testing, i18n, documentation

---

**Last Updated:** 2026-01-12
**Developer:** Claude Code + Nuno Marques
**Status:** Ready to build! 🚀
