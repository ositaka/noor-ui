import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default function ComponentLoading() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-6 w-96" />
      </div>

      <Separator />

      {/* Tabs Skeleton */}
      <div className="flex gap-4 border-b">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>

      {/* Content Skeleton */}
      <div className="space-y-6">
        {/* Section Title */}
        <Skeleton className="h-8 w-48" />

        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>

        {/* Code Block Skeleton */}
        <Card className="overflow-hidden">
          <CardHeader className="border-b bg-muted/30 px-4 py-2">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-7 w-20" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Skeleton className="h-64 w-full rounded-none" />
          </CardContent>
        </Card>

        {/* Component Preview Skeleton */}
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-40 w-full" />
          </CardContent>
        </Card>

        {/* Another Code Block */}
        <Card className="overflow-hidden">
          <CardHeader className="border-b bg-muted/30 px-4 py-2">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-7 w-20" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Skeleton className="h-48 w-full rounded-none" />
          </CardContent>
        </Card>

        {/* Props Table Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-32" />
          <Card>
            <CardContent className="p-6 space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex gap-4">
                  <Skeleton className="h-10 w-1/4" />
                  <Skeleton className="h-10 w-1/4" />
                  <Skeleton className="h-10 w-2/4" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
