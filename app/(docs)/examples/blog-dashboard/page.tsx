import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CodeBlock } from '@/components/docs/code-block'
import {
  FileText,
  Lock,
  Upload,
  Languages,
  Database,
  Edit3,
  Search,
  ExternalLink,
  CheckCircle2,
  ArrowRight
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog Dashboard Starter - Noor UI',
  description: 'Full-featured bilingual blog platform with Supabase authentication, rich text editing, and complete CRUD operations',
}

export default function BlogDashboardPage() {
  const features = [
    {
      icon: Lock,
      title: 'Authentication',
      titleAr: 'المصادقة',
      description: 'Complete auth system with Supabase',
      descriptionAr: 'نظام مصادقة كامل مع Supabase',
      items: ['Email/password signup & login', 'Protected routes', 'Auto profile creation', 'User menu with logout']
    },
    {
      icon: Edit3,
      title: 'Rich Content Editor',
      titleAr: 'محرر محتوى غني',
      description: 'TipTap editor with full formatting',
      descriptionAr: 'محرر TipTap مع تنسيق كامل',
      items: ['Bold, italic, underline', 'Headings & lists', 'Text alignment', 'Color picker']
    },
    {
      icon: FileText,
      title: 'Post Management',
      titleAr: 'إدارة المقالات',
      description: 'Full CRUD operations for blog posts',
      descriptionAr: 'عمليات CRUD كاملة للمقالات',
      items: ['Create & edit posts', 'Draft/publish workflow', 'Delete with confirmation', 'Post statistics']
    },
    {
      icon: Upload,
      title: 'Image Uploads',
      titleAr: 'رفع الصور',
      description: 'Featured images with Supabase Storage',
      descriptionAr: 'صور مميزة مع Supabase Storage',
      items: ['Drag & drop upload', 'Image preview', 'Cloud storage', 'CDN delivery']
    },
    {
      icon: Search,
      title: 'Search & Filter',
      titleAr: 'البحث والتصفية',
      description: 'Find posts quickly',
      descriptionAr: 'ابحث عن المقالات بسرعة',
      items: ['Real-time search', 'Filter by status', 'Sort options', 'Responsive design']
    },
    {
      icon: Languages,
      title: 'Bilingual Content',
      titleAr: 'محتوى ثنائي اللغة',
      description: 'Full English & Arabic support',
      descriptionAr: 'دعم كامل للإنجليزية والعربية',
      items: ['Separate EN/AR fields', 'RTL layout', 'Language switching', 'Localized dates']
    }
  ]

  const techStack = [
    { name: 'Next.js 14', description: 'App Router with Server Components' },
    { name: 'Supabase', description: 'Auth, Database, and Storage' },
    { name: 'TipTap', description: 'Rich text editor' },
    { name: 'Noor UI', description: 'All dashboard components' },
    { name: 'TypeScript', description: 'Fully typed codebase' },
    { name: 'Tailwind CSS', description: 'Styling with RTL support' }
  ]

  const setupCode = `# 1. Copy the starter
cp -r starters/blog-dashboard my-blog

# 2. Install dependencies
cd my-blog
npm install

# 3. Set up Supabase
# - Create project at supabase.com
# - Run schema.sql in SQL Editor
# - Create 'post-images' storage bucket

# 4. Configure environment
cp .env.local.example .env.local
# Add your Supabase URL and key

# 5. Run development server
npm run dev`

  const supabaseSchema = `-- Posts table with bilingual fields
create table public.posts (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  title_ar text not null,
  content text not null,
  content_ar text not null,
  excerpt text not null,
  excerpt_ar text not null,
  slug text unique not null,
  featured_image text,
  author_id uuid references public.profiles(id),
  status text check (status in ('draft', 'published', 'archived')),
  published_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Row Level Security policies
alter table public.posts enable row level security;

create policy "Published posts viewable by everyone"
  on public.posts for select
  using (status = 'published' or author_id = auth.uid());

create policy "Users can manage own posts"
  on public.posts for all
  using (auth.uid() = author_id);`

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="default">Production Ready</Badge>
          <Badge variant="secondary">Supabase</Badge>
          <Badge variant="secondary">Bilingual</Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Blog Dashboard Starter
        </h1>
        <p className="text-xl text-muted-foreground mb-6">
          A complete, production-ready blog platform with authentication, rich content editing,
          and full bilingual support. Built with Noor UI components and Supabase.
        </p>
        <div className="flex gap-4">
          <Button size="lg" asChild>
            <Link href="/starters/blog-dashboard">
              <FileText className="h-5 w-5 me-2" />
              View Documentation
              <ExternalLink className="h-4 w-4 ms-2" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a
              href="https://github.com/yourusername/noor-ui/tree/main/starters/blog-dashboard"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
              <ExternalLink className="h-4 w-4 ms-2" />
            </a>
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Features</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <feature.icon className="h-8 w-8 mb-2 text-primary" />
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Technology Stack</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {techStack.map((tech, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-1">{tech.name}</h3>
                <p className="text-sm text-muted-foreground">{tech.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* What You Get */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">What&apos;s Included</h2>
        <Card>
          <CardContent className="p-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  Backend & Database
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                    Complete Supabase schema (posts, profiles)
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                    Row Level Security policies
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                    Storage bucket configuration
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                    TypeScript types generation
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Pages & Components
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                    Login & signup pages
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                    Dashboard with statistics
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                    Posts list with search/filter
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                    Create & edit post pages
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                    All using Noor UI components
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Quick Setup */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Quick Setup</h2>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>1. Copy & Install</CardTitle>
              <CardDescription>Get the starter and install dependencies</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock language="bash" code={setupCode} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Database Schema</CardTitle>
              <CardDescription>Run this SQL in your Supabase project</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock language="sql" code={supabaseSchema} />
              <p className="text-sm text-muted-foreground mt-4">
                Complete schema available in <code className="text-xs bg-muted px-1 py-0.5 rounded">starters/blog-dashboard/lib/supabase/schema.sql</code>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Configure & Run</CardTitle>
              <CardDescription>Add your Supabase credentials and start developing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm">
                  Update <code className="text-xs bg-muted px-1 py-0.5 rounded">.env.local</code> with your Supabase credentials:
                </p>
                <CodeBlock
                  language="bash"
                  code={`NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key`}
                />
                <p className="text-sm text-muted-foreground">
                  Find these values in your Supabase project settings under API.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Links */}
      <section className="mb-12">
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-lg mb-1">Ready to get started?</h3>
                <p className="text-sm text-muted-foreground">
                  View the complete documentation with detailed setup instructions,
                  troubleshooting, and customization guide.
                </p>
              </div>
              <Button size="lg" asChild>
                <Link href="/starters/blog-dashboard">
                  Complete Documentation
                  <ArrowRight className="h-4 w-4 ms-2" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Component Usage */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Noor UI Components Used</h2>
        <Card>
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-semibold mb-3">Layout & Navigation</h3>
                <ul className="space-y-1 text-sm">
                  <li>• DashboardShell</li>
                  <li>• UserMenu</li>
                  <li>• NotificationCenter</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Content & Forms</h3>
                <ul className="space-y-1 text-sm">
                  <li>• RichTextEditor</li>
                  <li>• FileUpload</li>
                  <li>• Input, Label, Select</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Data Display</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Card, Badge</li>
                  <li>• Table</li>
                  <li>• Tabs</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Feedback</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Toast notifications</li>
                  <li>• Alert</li>
                  <li>• Loading states</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
