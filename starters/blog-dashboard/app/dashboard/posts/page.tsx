'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/starters/blog-dashboard/hooks/use-auth'
import { useDirection } from '@/components/providers/direction-provider'
import { supabase } from '@/starters/blog-dashboard/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, Trash2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

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

export default function PostsPage() {
  const { user } = useAuth()
  const { locale } = useDirection()
  const router = useRouter()
  const { toast } = useToast()

  const [posts, setPosts] = React.useState<Post[]>([])
  const [loading, setLoading] = React.useState(true)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [statusFilter, setStatusFilter] = React.useState<string>('all')

  const text = {
    en: {
      title: 'All Posts',
      search: 'Search posts...',
      status: 'Status',
      all: 'All',
      draft: 'Draft',
      published: 'Published',
      archived: 'Archived',
      newPost: 'New Post',
      noPosts: 'No posts found',
      delete: 'Delete',
      deleteSuccess: 'Post deleted successfully',
      deleteError: 'Failed to delete post',
    },
    ar: {
      title: 'جميع المقالات',
      search: 'بحث في المقالات...',
      status: 'الحالة',
      all: 'الكل',
      draft: 'مسودة',
      published: 'منشورة',
      archived: 'مؤرشفة',
      newPost: 'مقالة جديدة',
      noPosts: 'لم يتم العثور على مقالات',
      delete: 'حذف',
      deleteSuccess: 'تم حذف المقالة بنجاح',
      deleteError: 'فشل حذف المقالة',
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
      setLoading(true)
      const { data, error } = await supabase
        .from('posts')
        .select('id, title, title_ar, excerpt, excerpt_ar, status, published_at, created_at')
        .order('created_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (postId: string, e: React.MouseEvent) => {
    e.stopPropagation()

    if (!confirm(locale === 'ar' ? 'هل أنت متأكد من حذف هذه المقالة؟' : 'Are you sure you want to delete this post?')) {
      return
    }

    try {
      const { error } = await supabase.from('posts').delete().eq('id', postId)

      if (error) throw error

      toast({
        title: t.deleteSuccess,
      })

      fetchPosts()
    } catch (error) {
      toast({
        title: t.deleteError,
        variant: 'destructive',
      })
    }
  }

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.title_ar.includes(searchQuery) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt_ar.includes(searchQuery)

    const matchesStatus = statusFilter === 'all' || post.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="container py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
        <Button onClick={() => router.push('/dashboard/posts/new')}>
          <Plus className="h-4 w-4 me-2" />
          {t.newPost}
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t.search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="ps-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder={t.status} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.all}</SelectItem>
            <SelectItem value="draft">{t.draft}</SelectItem>
            <SelectItem value="published">{t.published}</SelectItem>
            <SelectItem value="archived">{t.archived}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Posts List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            {locale === 'ar' ? 'جاري التحميل...' : 'Loading...'}
          </p>
        </div>
      ) : filteredPosts.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-lg text-muted-foreground">{t.noPosts}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredPosts.map((post) => (
            <Card
              key={post.id}
              className="hover:bg-accent transition-colors cursor-pointer"
              onClick={() => router.push(`/dashboard/posts/${post.id}`)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg truncate">
                        {locale === 'ar' ? post.title_ar : post.title}
                      </h3>
                      <Badge
                        variant={
                          post.status === 'published'
                            ? 'default'
                            : post.status === 'draft'
                            ? 'secondary'
                            : 'outline'
                        }
                      >
                        {t[post.status]}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {locale === 'ar' ? post.excerpt_ar : post.excerpt}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(post.created_at).toLocaleDateString(
                        locale === 'ar' ? 'ar-SA' : 'en-US',
                        { year: 'numeric', month: 'long', day: 'numeric' }
                      )}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => handleDelete(post.id, e)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
