import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function BankingLoading() {
  return (
    <div className="container py-8">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-8">
        <Skeleton className="h-18 w-18 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-80" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-20 mb-1" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Account Cards */}
      <div className="grid gap-4 sm:grid-cols-2 mb-8">
        <Skeleton className="h-40 rounded-2xl" />
        <Skeleton className="h-40 rounded-2xl" />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-12 rounded-lg" />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[260px] w-full rounded-lg" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-9 w-24 rounded-md" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-14 w-full rounded-lg" />
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-36" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[180px] w-full rounded-lg" />
            </CardContent>
          </Card>
          <Skeleton className="h-24 rounded-lg" />
        </div>
      </div>
    </div>
  )
}
