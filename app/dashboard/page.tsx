'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import { useDirection } from '@/components/providers/direction-provider'
import { supabase } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Plus, Eye, Edit2 } from 'lucide-react'

interface Post {
  id: string
  title: string
  title_ar: string
  excerpt: string
  excerpt_ar: string
  status: 'draft' | 'published' | 'archived'
  published_at: string | null
  created_at: string
}

export default function DashboardPage() {
  const { user } = useAuth()
  const { locale } = useDirection()
  const router = useRouter()

  const [posts, setPosts] = React.useState<Post[]>([])
  const [loading, setLoading] = React.useState(true)

  const text = {
    en: {
      welcome: 'Welcome back',
      subtitle: 'Manage your blog posts and content',
      recentPosts: 'Recent Posts',
      noPosts: 'No posts yet',
      createFirst: 'Create your first blog post to get started',
      newPost: 'New Post',
      viewAll: 'View All Posts',
      stats: 'Statistics',
      total: 'Total Posts',
      published: 'Published',
      drafts: 'Drafts',
      draft: 'Draft',
      edit: 'Edit',
    },
    ar: {
      welcome: 'مرحباً بعودتك',
      subtitle: 'إدارة مقالاتك ومحتواك',
      recentPosts: 'المقالات الأخيرة',
      noPosts: 'لا توجد مقالات بعد',
      createFirst: 'أنشئ أول مقالة لك للبدء',
      newPost: 'مقالة جديدة',
      viewAll: 'عرض جميع المقالات',
      stats: 'الإحصائيات',
      total: 'إجمالي المقالات',
      published: 'المنشورة',
      drafts: 'المسودات',
      draft: 'مسودة',
      edit: 'تعديل',
    },
  }
  const t = text[locale]

  React.useEffect(() => {
    if (user) {
      fetchPosts()
    }
  }, [user])

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('id, title, title_ar, excerpt, excerpt_ar, status, published_at, created_at')
        .order('created_at', { ascending: false })
        .limit(5)

      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const totalPosts = posts.length
  const publishedPosts = posts.filter((p) => p.status === 'published').length
  const draftPosts = posts.filter((p) => p.status === 'draft').length

  return (
    <div className="container py-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t.welcome}, {user?.user_metadata?.full_name || user?.email?.split('@')[0]}!
        </h1>
        <p className="text-muted-foreground mt-2">{t.subtitle}</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.total}</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPosts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.published}</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publishedPosts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.drafts}</CardTitle>
            <Edit2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{draftPosts}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Posts */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{t.recentPosts}</CardTitle>
              <CardDescription className="mt-2">
                {loading ? (locale === 'ar' ? 'جاري التحميل...' : 'Loading...') : ''}
              </CardDescription>
            </div>
            <Button onClick={() => router.push('/dashboard/posts/new')}>
              <Plus className="h-4 w-4 me-2" />
              {t.newPost}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">{t.noPosts}</p>
              <p className="text-muted-foreground mb-6">{t.createFirst}</p>
              <Button onClick={() => router.push('/dashboard/posts/new')}>
                <Plus className="h-4 w-4 me-2" />
                {t.newPost}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer"
                  onClick={() => router.push(`/dashboard/posts/${post.id}`)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">
                        {locale === 'ar' ? post.title_ar : post.title}
                      </h3>
                      {post.status === 'draft' && (
                        <span className="text-xs px-2 py-0.5 bg-muted rounded-full">
                          {t.draft}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {locale === 'ar' ? post.excerpt_ar : post.excerpt}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(post.created_at).toLocaleDateString(
                        locale === 'ar' ? 'ar-SA' : 'en-US'
                      )}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      router.push(`/dashboard/posts/${post.id}`)
                    }}
                  >
                    {t.edit}
                  </Button>
                </div>
              ))}
              {posts.length >= 5 && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => router.push('/dashboard/posts')}
                >
                  {t.viewAll}
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
