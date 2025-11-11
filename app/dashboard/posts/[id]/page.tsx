'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import { useDirection } from '@/components/providers/direction-provider'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RichTextEditor } from '@/components/ui/rich-text-editor'
import { FileUpload } from '@/components/ui/file-upload'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { ArrowLeft, Save, Eye, Loader2 } from 'lucide-react'

export default function EditPostPage({ params }: { params: { id: string } }) {
  const { user } = useAuth()
  const { locale } = useDirection()
  const router = useRouter()
  const { toast } = useToast()

  const [loading, setLoading] = React.useState(false)
  const [uploadingImage, setUploadingImage] = React.useState(false)
  const [fetchingPost, setFetchingPost] = React.useState(true)

  // English fields
  const [title, setTitle] = React.useState('')
  const [excerpt, setExcerpt] = React.useState('')
  const [content, setContent] = React.useState('')

  // Arabic fields
  const [titleAr, setTitleAr] = React.useState('')
  const [excerptAr, setExcerptAr] = React.useState('')
  const [contentAr, setContentAr] = React.useState('')

  // Common fields
  const [slug, setSlug] = React.useState('')
  const [featuredImage, setFeaturedImage] = React.useState<string | null>(null)
  const [status, setStatus] = React.useState<'draft' | 'published' | 'archived'>('draft')

  const text = {
    en: {
      title: 'Edit Post',
      description: 'Update your blog post in both English and Arabic',
      back: 'Back',
      save: 'Save Changes',
      publish: 'Publish',
      saving: 'Saving...',
      loading: 'Loading post...',
      english: 'English',
      arabic: 'Arabic (العربية)',
      postTitle: 'Title',
      postExcerpt: 'Excerpt',
      postContent: 'Content',
      slug: 'URL Slug',
      slugPlaceholder: 'my-awesome-post',
      featuredImage: 'Featured Image',
      statusLabel: 'Status',
      draft: 'Draft',
      published: 'Published',
      archived: 'Archived',
      successSaved: 'Post updated successfully',
      successPublished: 'Post published successfully',
      error: 'Failed to update post',
      uploadingImage: 'Uploading image...',
      notFound: 'Post not found',
    },
    ar: {
      title: 'تعديل المقالة',
      description: 'قم بتحديث مقالتك باللغتين الإنجليزية والعربية',
      back: 'رجوع',
      save: 'حفظ التغييرات',
      publish: 'نشر',
      saving: 'جاري الحفظ...',
      loading: 'جاري تحميل المقالة...',
      english: 'الإنجليزية (English)',
      arabic: 'العربية',
      postTitle: 'العنوان',
      postExcerpt: 'المقتطف',
      postContent: 'المحتوى',
      slug: 'عنوان URL',
      slugPlaceholder: 'my-awesome-post',
      featuredImage: 'الصورة المميزة',
      statusLabel: 'الحالة',
      draft: 'مسودة',
      published: 'منشورة',
      archived: 'مؤرشفة',
      successSaved: 'تم تحديث المقالة بنجاح',
      successPublished: 'تم نشر المقالة بنجاح',
      error: 'فشل تحديث المقالة',
      uploadingImage: 'جاري رفع الصورة...',
      notFound: 'المقالة غير موجودة',
    },
  }
  const t = text[locale]

  React.useEffect(() => {
    if (user && params.id) {
      fetchPost()
    }
  }, [user, params.id])

  const fetchPost = async () => {
    try {
      setFetchingPost(true)
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', params.id)
        .single()

      if (error) throw error

      if (data) {
        setTitle(data.title)
        setTitleAr(data.title_ar)
        setExcerpt(data.excerpt)
        setExcerptAr(data.excerpt_ar)
        setContent(data.content)
        setContentAr(data.content_ar)
        setSlug(data.slug)
        setFeaturedImage(data.featured_image)
        setStatus(data.status)
      }
    } catch (error) {
      console.error('Error fetching post:', error)
      toast({
        title: t.notFound,
        variant: 'destructive',
      })
      router.push('/dashboard/posts')
    } finally {
      setFetchingPost(false)
    }
  }

  const handleImageUpload = async (files: File[]) => {
    if (!files.length || !user) return

    setUploadingImage(true)
    const file = files[0]
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `${user.id}/${fileName}`

    try {
      const { error: uploadError } = await supabase.storage
        .from('post-images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const {
        data: { publicUrl },
      } = supabase.storage.from('post-images').getPublicUrl(filePath)

      setFeaturedImage(publicUrl)
      toast({
        title: locale === 'ar' ? 'تم رفع الصورة بنجاح' : 'Image uploaded successfully',
      })
    } catch (error) {
      console.error('Error uploading image:', error)
      toast({
        title: locale === 'ar' ? 'فشل رفع الصورة' : 'Failed to upload image',
        variant: 'destructive',
      })
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSubmit = async (publishNow: boolean = false) => {
    if (!user || !title || !titleAr || !content || !contentAr || !slug) {
      toast({
        title: locale === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill in all required fields',
        variant: 'destructive',
      })
      return
    }

    setLoading(true)

    try {
      const postData = {
        title,
        title_ar: titleAr,
        excerpt: excerpt || content.substring(0, 150),
        excerpt_ar: excerptAr || contentAr.substring(0, 150),
        content,
        content_ar: contentAr,
        slug,
        featured_image: featuredImage,
        status: publishNow ? 'published' : status,
        published_at: publishNow && status !== 'published' ? new Date().toISOString() : undefined,
        updated_at: new Date().toISOString(),
      }

      const { error } = await supabase
        .from('posts')
        .update(postData)
        .eq('id', params.id)

      if (error) throw error

      toast({
        title: publishNow ? t.successPublished : t.successSaved,
      })

      router.push('/dashboard/posts')
    } catch (error: any) {
      console.error('Error updating post:', error)
      toast({
        title: t.error,
        description: error.message,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  if (fetchingPost) {
    return (
      <div className="container py-6 max-w-5xl">
        <div className="text-center py-12">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">{t.loading}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 me-2" />
            {t.back}
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
          <p className="text-muted-foreground mt-2">{t.description}</p>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-6">
        {/* Featured Image */}
        <Card>
          <CardHeader>
            <CardTitle>{t.featuredImage}</CardTitle>
          </CardHeader>
          <CardContent>
            {uploadingImage ? (
              <div className="text-center py-8">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">{t.uploadingImage}</p>
              </div>
            ) : featuredImage ? (
              <div className="space-y-4">
                <img
                  src={featuredImage}
                  alt="Featured"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <Button
                  variant="outline"
                  onClick={() => setFeaturedImage(null)}
                  className="w-full"
                >
                  {locale === 'ar' ? 'تغيير الصورة' : 'Change Image'}
                </Button>
              </div>
            ) : (
              <FileUpload
                accept="image/*"
                maxFiles={1}
                onUpload={handleImageUpload}
                onChange={() => {}}
              />
            )}
          </CardContent>
        </Card>

        {/* Bilingual Content */}
        <Card>
          <CardHeader>
            <CardTitle>{locale === 'ar' ? 'المحتوى' : 'Content'}</CardTitle>
            <CardDescription>{t.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="english" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="english">{t.english}</TabsTrigger>
                <TabsTrigger value="arabic">{t.arabic}</TabsTrigger>
              </TabsList>

              {/* English Content */}
              <TabsContent value="english" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">{t.postTitle}</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter post title..."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">{t.postExcerpt}</Label>
                  <Input
                    id="excerpt"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Short description (optional)"
                  />
                </div>

                <div className="space-y-2">
                  <Label>{t.postContent}</Label>
                  <RichTextEditor value={content} onChange={setContent} />
                </div>
              </TabsContent>

              {/* Arabic Content */}
              <TabsContent value="arabic" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title-ar">{t.postTitle}</Label>
                  <Input
                    id="title-ar"
                    value={titleAr}
                    onChange={(e) => setTitleAr(e.target.value)}
                    placeholder="أدخل عنوان المقالة..."
                    dir="rtl"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt-ar">{t.postExcerpt}</Label>
                  <Input
                    id="excerpt-ar"
                    value={excerptAr}
                    onChange={(e) => setExcerptAr(e.target.value)}
                    placeholder="وصف قصير (اختياري)"
                    dir="rtl"
                  />
                </div>

                <div className="space-y-2">
                  <Label>{t.postContent}</Label>
                  <RichTextEditor value={contentAr} onChange={setContentAr} />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle>{locale === 'ar' ? 'الإعدادات' : 'Settings'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="slug">{t.slug}</Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder={t.slugPlaceholder}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">{t.statusLabel}</Label>
              <Select value={status} onValueChange={(v: any) => setStatus(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">{t.draft}</SelectItem>
                  <SelectItem value="published">{t.published}</SelectItem>
                  <SelectItem value="archived">{t.archived}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            onClick={() => handleSubmit(false)}
            disabled={loading}
            variant="outline"
            className="flex-1"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 me-2 animate-spin" />
                {t.saving}
              </>
            ) : (
              <>
                <Save className="h-4 w-4 me-2" />
                {t.save}
              </>
            )}
          </Button>
          {status !== 'published' && (
            <Button
              onClick={() => handleSubmit(true)}
              disabled={loading}
              className="flex-1"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 me-2 animate-spin" />
                  {t.saving}
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 me-2" />
                  {t.publish}
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
