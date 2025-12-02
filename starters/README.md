# Noor UI Starters

Complete, production-ready applications built with Noor UI components. These starters showcase real-world usage patterns and serve as templates for your own projects.

## Available Starters

### 📝 [Kitab - Blog Starter](https://github.com/ositaka/kitab--noorui-blog-starter)
A production-ready multilingual blog with 4 languages, MDX support, and Arabic typography.

**Live Demo:** [kitab.noorui.com](https://kitab.noorui.com)

**Features:**
- 🌍 4 languages: English, Arabic, French, Urdu
- 📝 MDX with custom components (callouts, pull quotes, code blocks)
- 🗄️ Supabase CMS backend
- ✍️ Arabic typography (Noto Naskh)
- 🔍 Full-text search with PostgreSQL
- 💬 Comment system with reactions
- 📊 Admin dashboard with Google OAuth
- 🎨 Syntax highlighting & Table of Contents
- 📱 Fully responsive RTL/LTR layouts

**Stack:**
- Next.js 16
- Supabase (Auth + Database + Storage)
- MDX with rehype/remark plugins
- Noor UI Components
- TypeScript

**[View on GitHub →](https://github.com/ositaka/kitab--noorui-blog-starter)** | **[Live Demo →](https://kitab.noorui.com)**

### 🛒 [E-commerce Shop](./ecommerce)
A complete online shop with product catalog, shopping cart, and checkout flow.

**Features:**
- 🛍️ Product catalog with search & filters
- 🛒 Shopping cart (localStorage persistence)
- 💳 Checkout flow with order confirmation
- ⭐ Product ratings and reviews
- 🌍 Complete bilingual support (English/Arabic)
- 📱 Fully responsive design
- 🎨 Dark mode support

**Stack:**
- Next.js 14
- LocalStorage (no backend needed!)
- React Context
- Noor UI Components

**[View Documentation →](./ecommerce/README.md)**

## Coming Soon

- 🚀 **SaaS Starter** - Multi-tenant SaaS application with billing
- 📄 **Landing Page** - Marketing site with forms and analytics
- 📊 **Analytics Dashboard** - Data visualization and reporting

## How to Use Starters

Each starter is a complete, standalone application that demonstrates how to build real-world projects with Noor UI components.

### Method 1: Copy the Starter (Recommended for New Projects)

```bash
# Copy the starter you want
cp -r starters/blog-dashboard my-blog-app

# Navigate to your new project
cd my-blog-app

# Install dependencies (they're already in the root package.json)
npm install

# Follow the starter's README for setup
```

### Method 2: Run from Monorepo (For Development/Testing)

The starters are part of the Noor UI monorepo and can be run directly:

```bash
# All starters share the same components from /components
# This means updates to components affect all starters

npm run dev
# Then navigate to the starter route (e.g., /dashboard for blog-dashboard)
```

## Starter Structure

Each starter follows this structure:

```
starters/
└── starter-name/
    ├── app/              # Next.js pages specific to this starter
    ├── lib/              # Starter-specific utilities
    ├── hooks/            # Starter-specific hooks
    ├── .env.local.example # Environment variables template
    └── README.md         # Complete setup guide
```

**Important:** Starters use components from the main `/components` directory:

```tsx
// Starters import from the shared component library
import { Button } from '@/components/ui/button'
import { DashboardShell } from '@/components/ui/dashboard-shell'
```

## Benefits of Starters

### 🎓 Learning
- See real-world usage of Noor UI components
- Learn best practices for bilingual applications
- Understand RTL layout implementation
- Study authentication and database patterns

### ⚡ Quick Start
- Skip the boilerplate setup
- Get a working application immediately
- Focus on customization, not infrastructure
- Production-ready code out of the box

### 📚 Reference
- Code examples for common patterns
- Component integration demonstrations
- Bilingual content management
- State management patterns

## Creating Your Own Starter

Want to contribute a starter? Follow these guidelines:

1. **Structure**: Follow the existing starter pattern
2. **Documentation**: Include comprehensive README.md
3. **Components**: Use components from `/components`
4. **Bilingual**: Support both English and Arabic
5. **RTL**: Proper RTL layout support
6. **TypeScript**: Fully typed code
7. **Best Practices**: Follow Next.js and React patterns
8. **Environment**: Use .env.local.example for configuration

## Support

- **Component Documentation**: Visit `/components` in the main app
- **Starter Issues**: Check individual starter READMEs
- **Questions**: Open an issue on GitHub

## License

All starters are part of the Noor UI project and share the same license.

---

**Built with Noor UI** - Beautiful bilingual components for modern web applications
