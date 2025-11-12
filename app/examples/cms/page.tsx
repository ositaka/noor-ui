'use client'

import * as React from 'react'
import { DashboardShell } from '@/components/ui/dashboard-shell'
import { RichTextEditor } from '@/components/ui/rich-text-editor'
import { FileUpload } from '@/components/ui/file-upload'
import { UserMenu } from '@/components/ui/user-menu'
import { NotificationCenter } from '@/components/ui/notification-center'
import { DataTable } from '@/components/ui/data-table'
import { StatsCard } from '@/components/dashboard/stats-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { useDirection } from '@/components/providers/direction-provider'
import {
  FileText,
  Eye,
  MessageSquare,
  TrendingUp,
  Plus,
  Search,
  Edit,
  Trash2,
  MoreHorizontal,
  Calendar,
  User,
  Tag,
  Globe,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// Mock data
const mockPosts = [
  {
    id: '1',
    title: 'Getting Started with Noor UI',
    titleAr: 'البدء مع نور UI',
    author: 'Ahmed Hassan',
    status: 'published',
    category: 'Tutorial',
    views: 1234,
    comments: 45,
    publishedAt: '2025-11-01',
    language: 'both',
  },
  {
    id: '2',
    title: 'Building RTL-First Applications',
    titleAr: 'بناء تطبيقات RTL أولاً',
    author: 'Fatima Al-Said',
    status: 'draft',
    category: 'Guide',
    views: 0,
    comments: 0,
    publishedAt: null,
    language: 'both',
  },
  {
    id: '3',
    title: 'Design Tokens in Action',
    titleAr: 'رموز التصميم في العمل',
    author: 'Omar Khalid',
    status: 'published',
    category: 'Design',
    views: 876,
    comments: 23,
    publishedAt: '2025-10-28',
    language: 'both',
  },
  {
    id: '4',
    title: 'Accessibility Best Practices',
    titleAr: 'أفضل ممارسات إمكانية الوصول',
    author: 'Layla Rahman',
    status: 'published',
    category: 'Tutorial',
    views: 2103,
    comments: 67,
    publishedAt: '2025-10-25',
    language: 'both',
  },
  {
    id: '5',
    title: 'Component Architecture',
    titleAr: 'بنية المكونات',
    author: 'Ahmed Hassan',
    status: 'scheduled',
    category: 'Technical',
    views: 0,
    comments: 0,
    publishedAt: '2025-11-15',
    language: 'both',
  },
]

const mockNotifications = [
  {
    id: '1',
    title: 'New comment on your post',
    description: 'Omar commented on "Getting Started with Noor UI"',
    time: '5 minutes ago',
    read: false,
    type: 'comment' as const,
  },
  {
    id: '2',
    title: 'Post published successfully',
    description: 'Your post "Building RTL-First Applications" is now live',
    time: '1 hour ago',
    read: false,
    type: 'success' as const,
  },
  {
    id: '3',
    title: 'Scheduled post reminder',
    description: '"Component Architecture" will be published in 4 days',
    time: '2 hours ago',
    read: true,
    type: 'info' as const,
  },
]

export default function CMSPage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const [activeView, setActiveView] = React.useState<'posts' | 'create' | 'analytics'>('posts')
  const [selectedPost, setSelectedPost] = React.useState<typeof mockPosts[0] | null>(null)
  const [editorContent, setEditorContent] = React.useState('')
  const [uploadedFiles, setUploadedFiles] = React.useState<File[]>([])

  // DataTable columns
  const columns = [
    {
      key: 'title' as const,
      header: isRTL ? 'العنوان' : 'Title',
      cell: (row: typeof mockPosts[0]) => (
        <div>
          <div className="font-medium">{isRTL ? row.titleAr : row.title}</div>
          <div className="flex items-center gap-2 mt-1">
            <Globe className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {row.language === 'both' ? (isRTL ? 'ثنائي اللغة' : 'Bilingual') : row.language}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: 'author' as const,
      header: isRTL ? 'المؤلف' : 'Author',
      cell: (row: typeof mockPosts[0]) => (
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span>{row.author}</span>
        </div>
      ),
    },
    {
      key: 'status' as const,
      header: isRTL ? 'الحالة' : 'Status',
      cell: (row: typeof mockPosts[0]) => {
        const statusConfig = {
          published: {
            label: isRTL ? 'منشور' : 'Published',
            variant: 'default' as const,
            className: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20'
          },
          draft: {
            label: isRTL ? 'مسودة' : 'Draft',
            variant: 'outline' as const,
            className: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20'
          },
          scheduled: {
            label: isRTL ? 'مجدول' : 'Scheduled',
            variant: 'outline' as const,
            className: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20'
          },
        }
        const config = statusConfig[row.status as keyof typeof statusConfig]
        return (
          <Badge variant={config.variant} className={config.className}>
            <span className="flex items-center gap-1.5">
              <span className={cn(
                'h-1.5 w-1.5 rounded-full',
                row.status === 'published' && 'bg-green-500',
                row.status === 'draft' && 'bg-yellow-500',
                row.status === 'scheduled' && 'bg-blue-500'
              )} />
              {config.label}
            </span>
          </Badge>
        )
      },
    },
    {
      key: 'category' as const,
      header: isRTL ? 'الفئة' : 'Category',
      cell: (row: typeof mockPosts[0]) => (
        <div className="flex items-center gap-1">
          <Tag className="h-3 w-3 text-muted-foreground" />
          <span className="text-sm">{row.category}</span>
        </div>
      ),
    },
    {
      key: 'views' as const,
      header: isRTL ? 'المشاهدات' : 'Views',
      cell: (row: typeof mockPosts[0]) => (
        <div className="flex items-center gap-1">
          <Eye className="h-4 w-4 text-muted-foreground" />
          <span>{row.views.toLocaleString()}</span>
        </div>
      ),
    },
    {
      key: 'comments' as const,
      header: isRTL ? 'التعليقات' : 'Comments',
      cell: (row: typeof mockPosts[0]) => (
        <div className="flex items-center gap-1">
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
          <span>{row.comments}</span>
        </div>
      ),
    },
    {
      key: 'actions' as const,
      header: '',
      cell: (row: typeof mockPosts[0]) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">{isRTL ? 'فتح القائمة' : 'Open menu'}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={isRTL ? 'start' : 'end'}>
            <DropdownMenuItem onClick={() => {
              setSelectedPost(row)
              window.location.hash = '#create'
            }}>
              <Edit className="h-4 w-4 me-2" />
              {isRTL ? 'تحرير' : 'Edit'}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Eye className="h-4 w-4 me-2" />
              {isRTL ? 'معاينة' : 'Preview'}
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="h-4 w-4 me-2" />
              {isRTL ? 'حذف' : 'Delete'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  const handleFileChange = (files: File[]) => {
    setUploadedFiles(files)
  }

  const navItems = [
    {
      title: 'Posts',
      titleAr: 'المنشورات',
      href: '#posts',
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: 'Create New',
      titleAr: 'إنشاء جديد',
      href: '#create',
      icon: <Plus className="h-5 w-5" />,
    },
    {
      title: 'Analytics',
      titleAr: 'التحليلات',
      href: '#analytics',
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      title: 'Settings',
      titleAr: 'الإعدادات',
      href: '#settings',
      icon: <User className="h-5 w-5" />,
    },
  ]

  // Handle navigation clicks
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      if (hash === 'posts' || !hash) setActiveView('posts')
      else if (hash === 'create') setActiveView('create')
      else if (hash === 'analytics') setActiveView('analytics')
    }

    // Set default hash if none exists
    if (!window.location.hash) {
      window.location.hash = '#posts'
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return (
    <div className="min-h-screen bg-background" dir={direction}>
      <DashboardShell
        navItems={navItems}
        user={{
          name: 'Ahmed Hassan',
          email: 'ahmed@noorui.com',
        }}
        notifications={mockNotifications}
        relative={true}
      >
        <div className="p-6 space-y-6">
          {/* Page Header with Quick Actions */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight">
                {isRTL ? 'نظام إدارة المحتوى' : 'Content Management System'}
              </h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{isRTL ? 'إدارة منشوراتك والمحتوى' : 'Manage your posts and content'}</span>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-1">
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">⌘</span>K
                  </kbd>
                  <span>{isRTL ? 'للبحث السريع' : 'Quick search'}</span>
                </div>
              </div>
            </div>
            {activeView === 'posts' && (
              <Button onClick={() => (window.location.hash = '#create')} size="lg" className="gap-2">
                <Plus className="h-5 w-5" />
                {isRTL ? 'منشور جديد' : 'New Post'}
              </Button>
            )}
          </div>

          {/* Analytics View */}
          {activeView === 'analytics' && (
          <div className="space-y-6">
            <div className="flex items-center justify-end">
              <Select defaultValue="30days">
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">{isRTL ? 'آخر 7 أيام' : 'Last 7 days'}</SelectItem>
                  <SelectItem value="30days">{isRTL ? 'آخر 30 يوم' : 'Last 30 days'}</SelectItem>
                  <SelectItem value="90days">{isRTL ? 'آخر 90 يوم' : 'Last 90 days'}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatsCard
                icon={FileText}
                label={isRTL ? 'إجمالي المنشورات' : 'Total Posts'}
                value="24"
                trend={{ value: 12, direction: 'up' }}
                description={isRTL ? '+3 هذا الشهر' : '+3 this month'}
              />
              <StatsCard
                icon={Eye}
                label={isRTL ? 'إجمالي المشاهدات' : 'Total Views'}
                value="12.4K"
                trend={{ value: 8.2, direction: 'up' }}
                description={isRTL ? '+892 هذا الأسبوع' : '+892 this week'}
              />
              <StatsCard
                icon={MessageSquare}
                label={isRTL ? 'التعليقات' : 'Comments'}
                value="342"
                trend={{ value: 5.1, direction: 'up' }}
                description={isRTL ? '+28 اليوم' : '+28 today'}
              />
              <StatsCard
                icon={TrendingUp}
                label={isRTL ? 'معدل المشاركة' : 'Engagement Rate'}
                value="68%"
                trend={{ value: 2.3, direction: 'up' }}
                description={isRTL ? 'أعلى من المتوسط' : 'Above average'}
              />
            </div>

            {/* Top Posts */}
            <Card>
              <CardHeader>
                <CardTitle>{isRTL ? 'أفضل المنشورات' : 'Top Performing Posts'}</CardTitle>
                <CardDescription>
                  {isRTL ? 'المنشورات الأكثر مشاهدة في آخر 30 يوماً' : 'Most viewed posts in the last 30 days'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPosts
                    .filter(p => p.status === 'published')
                    .sort((a, b) => b.views - a.views)
                    .slice(0, 5)
                    .map((post, index) => (
                      <div key={post.id} className="flex items-center gap-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{isRTL ? post.titleAr : post.title}</p>
                          <p className="text-sm text-muted-foreground">{post.author}</p>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span>{post.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{post.comments}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Posts List View */}
        {activeView === 'posts' && (
          <div className="space-y-6">
            {/* Filters */}
            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-end">
                  <div className="flex-1">
                    <Label htmlFor="search" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {isRTL ? 'بحث' : 'Search'}
                    </Label>
                    <div className="relative mt-2">
                      <Search className="absolute start-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="search"
                        placeholder={isRTL ? 'ابحث في المنشورات...' : 'Search posts...'}
                        className="ps-9 h-11"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-[180px]">
                    <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {isRTL ? 'الحالة' : 'Status'}
                    </Label>
                    <Select defaultValue="all">
                      <SelectTrigger className="mt-2 h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{isRTL ? 'الكل' : 'All'}</SelectItem>
                        <SelectItem value="published">{isRTL ? 'منشور' : 'Published'}</SelectItem>
                        <SelectItem value="draft">{isRTL ? 'مسودة' : 'Draft'}</SelectItem>
                        <SelectItem value="scheduled">{isRTL ? 'مجدول' : 'Scheduled'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-full md:w-[180px]">
                    <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {isRTL ? 'الفئة' : 'Category'}
                    </Label>
                    <Select defaultValue="all">
                      <SelectTrigger className="mt-2 h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{isRTL ? 'الكل' : 'All'}</SelectItem>
                        <SelectItem value="tutorial">{isRTL ? 'دروس' : 'Tutorial'}</SelectItem>
                        <SelectItem value="guide">{isRTL ? 'أدلة' : 'Guide'}</SelectItem>
                        <SelectItem value="design">{isRTL ? 'تصميم' : 'Design'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Posts Table */}
            <Card>
              <CardContent className="p-0">
                <DataTable
                  data={mockPosts}
                  columns={columns}
                  searchable
                  searchPlaceholder={isRTL ? 'بحث...' : 'Search...'}
                  emptyState={{
                    title: isRTL ? 'لا توجد منشورات' : 'No posts found',
                    description: isRTL ? 'ابدأ بإنشاء منشورك الأول' : 'Start by creating your first post',
                  }}
                />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Create/Edit Post View */}
        {activeView === 'create' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              {selectedPost && (
                <p className="text-sm text-muted-foreground">
                  {isRTL ? `تحرير: ${selectedPost.titleAr}` : `Editing: ${selectedPost.title}`}
                </p>
              )}
              <div className="flex gap-2 ms-auto">
                <Button variant="outline" onClick={() => (window.location.hash = '#posts')}>
                  {isRTL ? 'إلغاء' : 'Cancel'}
                </Button>
                <Button variant="outline">
                  {isRTL ? 'حفظ كمسودة' : 'Save Draft'}
                </Button>
                <Button>{isRTL ? 'نشر' : 'Publish'}</Button>
              </div>
            </div>

            <Tabs defaultValue="en" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="en">English</TabsTrigger>
                <TabsTrigger value="ar">العربية</TabsTrigger>
              </TabsList>

              <TabsContent value="en" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{isRTL ? 'تفاصيل المنشور (English)' : 'Post Details (English)'}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title-en">Title</Label>
                      <Input
                        id="title-en"
                        placeholder="Enter post title in English..."
                        defaultValue={selectedPost?.title}
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="category-en">Category</Label>
                        <Select defaultValue={selectedPost?.category.toLowerCase() || 'tutorial'}>
                          <SelectTrigger id="category-en">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tutorial">Tutorial</SelectItem>
                            <SelectItem value="guide">Guide</SelectItem>
                            <SelectItem value="design">Design</SelectItem>
                            <SelectItem value="technical">Technical</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="status-en">Status</Label>
                        <Select defaultValue={selectedPost?.status || 'draft'}>
                          <SelectTrigger id="status-en">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="scheduled">Scheduled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Content</Label>
                      <RichTextEditor
                        content={editorContent}
                        onChange={setEditorContent}
                        placeholder="Write your post content in English..."
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Featured Image</CardTitle>
                    <CardDescription>Upload a cover image for your post</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FileUpload
                      accept="image/*,.png,.jpg,.jpeg,.webp"
                      maxFiles={1}
                      maxSize={5 * 1024 * 1024} // 5MB
                      onChange={handleFileChange}
                      multiple={false}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ar" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{isRTL ? 'تفاصيل المنشور (العربية)' : 'Post Details (Arabic)'}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title-ar">العنوان</Label>
                      <Input
                        id="title-ar"
                        placeholder="أدخل عنوان المنشور بالعربية..."
                        dir="rtl"
                        defaultValue={selectedPost?.titleAr}
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="category-ar">الفئة</Label>
                        <Select defaultValue={selectedPost?.category.toLowerCase() || 'tutorial'}>
                          <SelectTrigger id="category-ar">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tutorial">دروس</SelectItem>
                            <SelectItem value="guide">أدلة</SelectItem>
                            <SelectItem value="design">تصميم</SelectItem>
                            <SelectItem value="technical">تقني</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="status-ar">الحالة</Label>
                        <Select defaultValue={selectedPost?.status || 'draft'}>
                          <SelectTrigger id="status-ar">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">مسودة</SelectItem>
                            <SelectItem value="published">منشور</SelectItem>
                            <SelectItem value="scheduled">مجدول</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>المحتوى</Label>
                      <RichTextEditor
                        content={editorContent}
                        onChange={setEditorContent}
                        placeholder="اكتب محتوى منشورك بالعربية..."
                        dir="rtl"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>الصورة المميزة</CardTitle>
                    <CardDescription>قم بتحميل صورة الغلاف للمنشور</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FileUpload
                      accept="image/*,.png,.jpg,.jpeg,.webp"
                      maxFiles={1}
                      maxSize={5 * 1024 * 1024} // 5MB
                      onChange={handleFileChange}
                      multiple={false}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
        </div>
      </DashboardShell>
    </div>
  )
}
