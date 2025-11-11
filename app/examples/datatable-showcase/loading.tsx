import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'

export default function DataTableShowcaseLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <div className="border-b">
        <div className="container py-8">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div>
                  <Skeleton className="h-8 w-64 mb-2" />
                  <Skeleton className="h-5 w-96" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-28" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards Skeleton */}
      <div className="container py-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-9 w-20" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Main DataTable Skeleton */}
      <div className="container pb-12">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-full max-w-xl" />
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search Bar */}
            <Skeleton className="h-10 w-full max-w-sm" />

            {/* Table Header */}
            <div className="flex gap-4 border-b pb-3">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-48" />
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 flex-1" />
            </div>

            {/* Table Rows */}
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex gap-4 items-center">
                <Skeleton className="h-12 w-32" />
                <Skeleton className="h-12 w-48" />
                <Skeleton className="h-12 w-24" />
                <Skeleton className="h-12 w-24" />
                <Skeleton className="h-12 flex-1" />
              </div>
            ))}

            {/* Pagination */}
            <div className="mt-4 flex justify-center">
              <Skeleton className="h-10 w-80" />
            </div>
          </CardContent>
        </Card>

        {/* Features Grid Skeleton */}
        <div className="mt-8 space-y-6">
          <div>
            <Skeleton className="h-8 w-48 mb-4" />
            <Separator className="mb-6" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(9)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-5 w-32" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
