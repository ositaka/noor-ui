# 🌍 Multilingual Content Management Strategy

## 🎯 Goal

Enable content creation and management in multiple languages (starting with EN + AR) with:
- ✅ Clean database structure
- ✅ Intuitive admin UI
- ✅ Translation status tracking
- ✅ Easy to add more languages later

---

## 📊 Database Architecture (Supabase)

### **Chosen Approach: JSONB with Translation Tracking**

**Why this approach:**
- ✅ Scales to many languages without schema changes
- ✅ Clean queries with Supabase's JSONB operators
- ✅ Translation status tracking built-in
- ✅ Flexible for different content types
- ❌ Slightly more complex queries (but Supabase handles it well)

---

## 🗄️ Database Schema Examples

### Example 1: Blog Articles

```sql
-- Articles table
create table articles (
  id uuid primary key default uuid_generate_v4(),
  author_id uuid references auth.users(id) not null,

  -- Metadata
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  published_at timestamptz,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),

  -- Multilingual content (JSONB)
  translations jsonb not null default '{}'::jsonb,

  -- Translation tracking
  available_locales text[] not null default array['en'],
  default_locale text not null default 'en',
  translation_status jsonb not null default '{"en": "complete"}'::jsonb,

  -- Searchable fields (auto-generated from translations)
  title_search text generated always as (
    coalesce(
      translations->>'en'->>'title',
      translations->>'ar'->>'title'
    )
  ) stored,

  -- SEO
  slug text unique,

  -- Stats
  views_count int default 0,

  -- Indexes
  constraint slug_format check (slug ~ '^[a-z0-9-]+$')
);

-- Indexes for performance
create index articles_translations_gin on articles using gin(translations);
create index articles_author_id on articles(author_id);
create index articles_status on articles(status);
create index articles_published_at on articles(published_at desc);
create index articles_title_search on articles using gin(to_tsvector('english', title_search));

-- Auto-update updated_at
create trigger articles_updated_at
  before update on articles
  for each row
  execute function update_updated_at_column();
```

### Translation Object Structure

```typescript
// TypeScript type for translations field
interface ArticleTranslations {
  en?: {
    title: string
    slug: string
    excerpt: string
    content: string // Rich text HTML
    seo_title?: string
    seo_description?: string
    status: 'complete' | 'incomplete' | 'needs_review'
    updated_at: string
  }
  ar?: {
    title: string
    slug: string
    excerpt: string
    content: string
    seo_title?: string
    seo_description?: string
    status: 'complete' | 'incomplete' | 'needs_review'
    updated_at: string
  }
  // More languages...
}

// Full article type
interface Article {
  id: string
  author_id: string
  created_at: string
  updated_at: string
  published_at: string | null
  status: 'draft' | 'published' | 'archived'
  translations: ArticleTranslations
  available_locales: string[]
  default_locale: string
  translation_status: {
    en: 'complete' | 'incomplete' | 'needs_review'
    ar: 'complete' | 'incomplete' | 'needs_review'
  }
  slug: string
  views_count: number
}
```

---

### Example 2: Real Estate Listings

```sql
-- Properties table
create table properties (
  id uuid primary key default uuid_generate_v4(),
  agency_id uuid references agencies(id) not null,

  -- Metadata
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  status text not null default 'draft' check (status in ('draft', 'active', 'sold', 'archived')),

  -- Language-agnostic data
  price decimal(12,2) not null,
  bedrooms int,
  bathrooms int,
  area_sqm decimal(10,2),
  latitude decimal(10,8),
  longitude decimal(11,8),

  -- Media
  images jsonb not null default '[]'::jsonb,
  video_url text,
  virtual_tour_url text,

  -- Multilingual content
  translations jsonb not null default '{}'::jsonb,
  available_locales text[] not null default array['en'],
  default_locale text not null default 'en',
  translation_status jsonb not null default '{"en": "complete"}'::jsonb,

  -- Stats
  views_count int default 0,
  inquiries_count int default 0
);

-- Indexes
create index properties_agency_id on properties(agency_id);
create index properties_status on properties(status);
create index properties_price on properties(price);
create index properties_location on properties using gist(point(longitude, latitude));
```

```typescript
// Property translations structure
interface PropertyTranslations {
  en?: {
    title: string
    description: string
    address: string
    neighborhood: string
    city: string
    amenities: string[]
    status: 'complete' | 'incomplete' | 'needs_review'
  }
  ar?: {
    title: string
    description: string
    address: string
    neighborhood: string
    city: string
    amenities: string[]
    status: 'complete' | 'incomplete' | 'needs_review'
  }
}
```

---

## 🎨 Admin UI Patterns

### Pattern 1: Tabbed Language Switcher

```tsx
// Edit Article Component
export function ArticleEditor({ article }: { article: Article }) {
  const [currentLocale, setCurrentLocale] = useState<'en' | 'ar'>('en')
  const { direction } = useDirection()

  const currentTranslation = article.translations[currentLocale]

  return (
    <div className="space-y-6">
      {/* Language Tabs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Edit Article</CardTitle>

            {/* Language Selector */}
            <Tabs value={currentLocale} onValueChange={setCurrentLocale}>
              <TabsList>
                <TabsTrigger value="en">
                  🇬🇧 English
                  {article.translation_status.en === 'complete' && <CheckCircle className="ms-2 h-4 w-4 text-green-600" />}
                  {article.translation_status.en === 'needs_review' && <AlertCircle className="ms-2 h-4 w-4 text-yellow-600" />}
                </TabsTrigger>
                <TabsTrigger value="ar">
                  🇸🇦 العربية
                  {article.translation_status.ar === 'complete' && <CheckCircle className="ms-2 h-4 w-4 text-green-600" />}
                  {article.translation_status.ar === 'needs_review' && <AlertCircle className="ms-2 h-4 w-4 text-yellow-600" />}
                  {!article.translations.ar && <Plus className="ms-2 h-4 w-4" />}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>

        <CardContent dir={currentLocale === 'ar' ? 'rtl' : 'ltr'}>
          {!currentTranslation ? (
            // No translation exists yet
            <EmptyState
              title={`No ${currentLocale.toUpperCase()} translation`}
              description="Create a translation to make this content available in this language"
              action={
                <Button onClick={() => createTranslation(currentLocale)}>
                  <Plus className="me-2 h-4 w-4" />
                  Create Translation
                </Button>
              }
            />
          ) : (
            // Translation form
            <form className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={currentTranslation.title}
                  onChange={(e) => updateTranslation(currentLocale, 'title', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={currentTranslation.slug}
                  onChange={(e) => updateTranslation(currentLocale, 'slug', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={currentTranslation.excerpt}
                  onChange={(e) => updateTranslation(currentLocale, 'excerpt', e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="content">Content</Label>
                <RichTextEditor
                  value={currentTranslation.content}
                  onChange={(value) => updateTranslation(currentLocale, 'content', value)}
                  direction={currentLocale === 'ar' ? 'rtl' : 'ltr'}
                />
              </div>

              <Separator />

              <div>
                <Label htmlFor="translation-status">Translation Status</Label>
                <Select
                  value={currentTranslation.status}
                  onValueChange={(value) => updateTranslation(currentLocale, 'status', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="complete">Complete</SelectItem>
                    <SelectItem value="incomplete">Incomplete</SelectItem>
                    <SelectItem value="needs_review">Needs Professional Review</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-1">
                  Mark as "Needs Review" if you want a native speaker to check this
                </p>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
```

---

### Pattern 2: Side-by-Side Comparison View

```tsx
// Useful for translators
export function TranslationCompare({ article }: { article: Article }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {/* English (Source) */}
      <Card>
        <CardHeader>
          <CardTitle>🇬🇧 English (Source)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <p className="font-medium">{article.translations.en?.title}</p>
            </div>
            <div>
              <Label>Content</Label>
              <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: article.translations.en?.content || '' }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Arabic (Translation) */}
      <Card>
        <CardHeader>
          <CardTitle>🇸🇦 العربية (Translation)</CardTitle>
        </CardHeader>
        <CardContent dir="rtl">
          {article.translations.ar ? (
            <div className="space-y-4">
              <div>
                <Label>العنوان</Label>
                <Input
                  value={article.translations.ar.title}
                  onChange={(e) => updateTranslation('ar', 'title', e.target.value)}
                />
              </div>
              <div>
                <Label>المحتوى</Label>
                <RichTextEditor
                  value={article.translations.ar.content}
                  onChange={(value) => updateTranslation('ar', 'content', value)}
                  direction="rtl"
                />
              </div>
            </div>
          ) : (
            <EmptyState title="لا توجد ترجمة" />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
```

---

### Pattern 3: Translation Status Dashboard

```tsx
// Dashboard to track translation coverage
export function TranslationDashboard() {
  const stats = useTranslationStats()

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <StatsCard
          label="Fully Translated"
          value={stats.complete}
          percentage={stats.completePercentage}
          icon={<CheckCircle />}
          trend="success"
        />
        <StatsCard
          label="Needs Review"
          value={stats.needsReview}
          percentage={stats.needsReviewPercentage}
          icon={<AlertCircle />}
          trend="warning"
        />
        <StatsCard
          label="Missing Translation"
          value={stats.missing}
          percentage={stats.missingPercentage}
          icon={<XCircle />}
          trend="danger"
        />
      </div>

      {/* Articles needing translation */}
      <Card>
        <CardHeader>
          <CardTitle>Articles Needing Translation</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={stats.articlesNeedingTranslation}
            columns={[
              { id: 'title', header: 'Title', accessorKey: 'title' },
              { id: 'en_status', header: 'English', cell: (row) => <StatusBadge status={row.en_status} /> },
              { id: 'ar_status', header: 'Arabic', cell: (row) => <StatusBadge status={row.ar_status} /> },
              { id: 'actions', header: 'Actions', cell: (row) => <Button size="sm">Translate</Button> },
            ]}
          />
        </CardContent>
      </Card>
    </div>
  )
}
```

---

## 🔍 Supabase Query Examples

### Fetch article with fallback locale

```typescript
// Fetch article, prefer 'ar' but fallback to 'en' if not available
const { data: article } = await supabase
  .from('articles')
  .select('*')
  .eq('slug', slug)
  .single()

// Client-side logic for locale selection
const translation = article.translations[preferredLocale]
  || article.translations[article.default_locale]
  || Object.values(article.translations)[0]
```

### Query articles by translation status

```typescript
// Get all articles where Arabic translation needs review
const { data: articles } = await supabase
  .from('articles')
  .select('*')
  .contains('translation_status', { ar: 'needs_review' })
```

### Full-text search in specific language

```typescript
// Search English titles
const { data: articles } = await supabase
  .from('articles')
  .select('*')
  .textSearch('title_search', searchTerm, {
    type: 'websearch',
    config: 'english'
  })
```

---

## 🛠️ Utility Functions

### Save translation helper

```typescript
async function saveArticleTranslation(
  articleId: string,
  locale: 'en' | 'ar',
  translation: Partial<ArticleTranslations['en']>
) {
  const { data: article } = await supabase
    .from('articles')
    .select('translations, available_locales, translation_status')
    .eq('id', articleId)
    .single()

  // Update translations object
  const updatedTranslations = {
    ...article.translations,
    [locale]: {
      ...article.translations[locale],
      ...translation,
      updated_at: new Date().toISOString(),
    }
  }

  // Update available locales
  const availableLocales = Array.from(
    new Set([...article.available_locales, locale])
  )

  // Update translation status
  const translationStatus = {
    ...article.translation_status,
    [locale]: translation.status || 'incomplete'
  }

  // Save to database
  const { error } = await supabase
    .from('articles')
    .update({
      translations: updatedTranslations,
      available_locales: availableLocales,
      translation_status: translationStatus,
      updated_at: new Date().toISOString(),
    })
    .eq('id', articleId)

  if (error) throw error
}
```

---

## 📦 Content Management Workflow

### Editorial Workflow States

```typescript
// Article lifecycle with translations
type ArticleLifecycle =
  | 'draft'           // Not published, being worked on
  | 'ready_en'        // English complete, pending translation
  | 'translating'     // Translation in progress
  | 'review'          // Translation needs review
  | 'ready_publish'   // All translations complete
  | 'published'       // Live on website
  | 'archived'        // No longer active

// Automatic state transitions
function getArticleLifecycleState(article: Article): ArticleLifecycle {
  if (article.status === 'published') return 'published'
  if (article.status === 'archived') return 'archived'

  const hasEnglish = article.translation_status.en === 'complete'
  const hasArabic = article.translations.ar && article.translation_status.ar === 'complete'
  const needsReview = Object.values(article.translation_status).some(s => s === 'needs_review')

  if (!hasEnglish) return 'draft'
  if (hasEnglish && !article.translations.ar) return 'ready_en'
  if (article.translations.ar && !hasArabic) return 'translating'
  if (needsReview) return 'review'
  if (hasEnglish && hasArabic) return 'ready_publish'

  return 'draft'
}
```

---

## 🎯 Best Practices

### ✅ DO:
- Store language-agnostic data separately (prices, dates, IDs)
- Track translation status for each locale
- Provide fallback to default locale
- Use proper text direction (RTL/LTR) in forms
- Auto-save drafts while translating
- Show visual indicators for translation completeness

### ❌ DON'T:
- Store numbers/dates as translated strings (use proper formatting)
- Force all languages to have translations before publishing
- Lose data when switching languages (auto-save!)
- Mix content and metadata in translations object
- Forget to index JSONB fields for performance

---

## 🚀 Adding a New Language

```typescript
// 1. Add to app config
const SUPPORTED_LOCALES = ['en', 'ar', 'fr', 'pt'] as const

// 2. Add to i18n config
// (No database changes needed!)

// 3. Update UI to show new language option
<TabsTrigger value="fr">
  🇫🇷 Français
</TabsTrigger>

// 4. Start translating content
// Translation status will automatically track the new locale
```

---

## 📊 Translation Coverage Metrics

Track these KPIs in your dashboard:
- % of articles fully translated
- % of articles needing review
- % of articles with missing translations
- Average time to translate
- Most translated content types

---

*Last Updated: 2025-11-10*
*Next Review: When building first multilingual dashboard*
