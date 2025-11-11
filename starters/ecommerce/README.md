# E-commerce Starter - Complete Online Shop

A production-ready, full-featured e-commerce platform built with Next.js 14 and Noor UI components. Features complete bilingual support (English/Arabic) with RTL layout, shopping cart, and checkout flow.

## Features

### Product Catalog
- Product listing with grid layout
- Search functionality
- Category filtering
- Product ratings and reviews
- Sale badges and discounts
- Responsive design

### Shopping Cart
- Add/remove products
- Update quantities
- LocalStorage persistence (cart survives page refresh)
- Real-time total calculation
- Empty cart state

### Checkout Flow
- Shipping information form
- Payment method selection
- Order summary
- Form validation
- Order confirmation page

### Bilingual Content
- Full English and Arabic support
- RTL layout for Arabic content
- All product data bilingual
- Language-aware navigation
- Localized pricing (SAR)

### Component Showcase
This store demonstrates Noor UI components:
- ✅ **Cards** - Product display
- ✅ **Buttons** - Actions and navigation
- ✅ **Input/Label** - Forms
- ✅ **Select** - Category filtering
- ✅ **Badge** - Product tags and cart count
- ✅ **Toast** - Success notifications
- ✅ **Separator** - Visual dividers

## Getting Started

You can use this starter in two ways:

### Option 1: Copy as Standalone Project (Recommended)

Copy the entire starter folder to create your own shop:

```bash
# Copy the starter to your projects directory
cp -r starters/ecommerce ~/my-projects/my-shop

# Navigate to your new project
cd ~/my-projects/my-shop

# Install dependencies
npm install

# Run development server
npm run dev
```

### Option 2: Run from Monorepo (For Testing/Development)

If you're working within the Noor UI repository:

```bash
# From the root of the Noor UI repo
npm install

# Navigate to the starter
cd starters/ecommerce

# Run development server (from root)
cd ../..
npm run dev
```

Visit `http://localhost:3000`

## Project Structure

This starter lives in `/starters/ecommerce/` and uses shared components from `/components/`:

```
starters/ecommerce/
├── app/
│   ├── page.tsx                 # Home page with featured products
│   ├── products/
│   │   ├── page.tsx            # Products listing with filters
│   │   └── [id]/page.tsx       # Product detail page
│   ├── cart/page.tsx           # Shopping cart
│   ├── checkout/page.tsx       # Checkout form
│   ├── success/page.tsx        # Order confirmation
│   └── layout.tsx              # Root layout with CartProvider
├── lib/
│   └── products.ts             # Mock product data and utilities
├── hooks/
│   └── use-cart.tsx            # Shopping cart context and localStorage
├── package.json                # Standalone dependencies
└── README.md                   # This file

# Shared components from main library
/components/ui/
├── button.tsx                  # Buttons
├── card.tsx                    # Product cards
├── input.tsx                   # Form inputs
├── badge.tsx                   # Tags and counts
└── ...                         # Other UI components
```

## How It Works

### Shopping Cart

The cart uses React Context and localStorage for persistence:

```tsx
// Add item to cart
const { addItem } = useCart()
addItem(product, quantity)

// Update quantity
const { updateQuantity } = useCart()
updateQuantity(productId, newQuantity)

// Remove item
const { removeItem } = useCart()
removeItem(productId)

// Get cart state
const { items, total, itemCount } = useCart()
```

Cart data is automatically saved to `localStorage` and restored on page load.

### Product Data

Products are defined in `lib/products.ts`:

```tsx
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
```

### Adding Your Own Products

Edit `lib/products.ts` to add more products:

```tsx
export const products: Product[] = [
  {
    id: '9',
    name: 'Your Product',
    nameAr: 'منتجك',
    description: 'Product description',
    descriptionAr: 'وصف المنتج',
    price: 99,
    image: 'https://your-image-url.jpg',
    category: 'electronics',
    categoryAr: 'إلكترونيات',
    rating: 4.5,
    reviews: 42,
    inStock: true,
  },
  // ... more products
]
```

### Adding More Categories

Edit the `categories` array in `lib/products.ts`:

```tsx
export const categories = [
  { id: 'all', name: 'All Products', nameAr: 'جميع المنتجات' },
  { id: 'new-category', name: 'New Category', nameAr: 'فئة جديدة' },
  // ... more categories
]
```

## Customization

### Change Currency

Search and replace `SAR` with your currency in all page files:

```tsx
// Before
{product.price} SAR

// After
{product.price} USD
```

### Add Payment Integration

The checkout page is ready for payment integration. Add Stripe, PayPal, or other payment providers:

1. Install payment library: `npm install @stripe/stripe-js`
2. Add environment variables to `.env.local`
3. Update `app/checkout/page.tsx` with payment logic

### Connect to Backend

Replace mock data with API calls:

```tsx
// lib/products.ts
export async function getProducts() {
  const response = await fetch('/api/products')
  return response.json()
}

// Use in components
const products = await getProducts()
```

### Add User Authentication

Integrate with authentication (Supabase, NextAuth, etc.):

```tsx
// Add user context
import { useAuth } from '@/hooks/use-auth'

// Save orders to user account
const { user } = useAuth()
await saveOrder(user.id, orderData)
```

## Production Deployment

### 1. Optimize Images

Use Next.js Image component for better performance:

```tsx
import Image from 'next/image'

<Image
  src={product.image}
  alt={product.name}
  width={400}
  height={400}
  className="object-cover"
/>
```

### 2. Add Real Images

Replace Unsplash URLs with your own product images:

```tsx
// Store images in /public folder
image: '/products/my-product.jpg'
```

### 3. Set Up Analytics

Add Google Analytics or similar:

```bash
npm install @next/third-parties
```

### 4. Deploy

Deploy to Vercel, Netlify, or any Next.js-compatible platform:

```bash
npm run build
npm run start
```

## Future Enhancements

Extend this starter with:

- [ ] User accounts and order history
- [ ] Product reviews and ratings system
- [ ] Wishlist functionality
- [ ] Product variations (size, color)
- [ ] Inventory management
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Payment gateway integration
- [ ] Shipping calculator
- [ ] Discount codes

## Troubleshooting

### Cart not persisting
- Check browser localStorage is enabled
- Clear localStorage and try again: `localStorage.clear()`

### Images not loading
- Verify image URLs are accessible
- Check Next.js image domains in `next.config.js`

### Styles not applying
- Ensure Tailwind CSS is configured correctly
- Check `tailwind.config.ts` includes all paths

## Demo Data

The starter includes 8 sample products across 5 categories:
- Electronics (3 products)
- Fashion (2 products)
- Home & Garden (1 product)
- Books (1 product)
- Sports (1 product)

All products have bilingual names, descriptions, and categories.

## Support

For questions about this starter:

1. Check Noor UI component documentation at `/components`
2. Review the showcase page at `/examples/ecommerce`
3. Check browser console for errors

## License

This starter is part of the Noor UI project and shares the same license.

---

**Built with Noor UI** - Beautiful bilingual components for modern web applications
