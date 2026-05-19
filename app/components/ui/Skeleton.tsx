import { cn } from "@/lib/utils"

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse rounded-lg bg-warm-white-dark", className)} />
  )
}

export function ListingCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-warm-white-dark">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between gap-4">
          <Skeleton className="h-4 w-3/5" />
          <Skeleton className="h-4 w-12" />
        </div>
        <Skeleton className="h-3 w-2/5" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
        <Skeleton className="h-9 w-full rounded-xl" />
      </div>
    </div>
  )
}

export function FilterSidebarSkeleton() {
  return (
    <div className="hidden lg:block w-72 flex-shrink-0">
      <div className="bg-white rounded-2xl border border-warm-white-dark p-6 space-y-6">
        <Skeleton className="h-5 w-16" />
        {[80, 60, 72, 64, 56].map((w, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-24" />
            {[...Array(3)].map((_, j) => (
              <div key={j} className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded" />
                <Skeleton className={`h-3 w-${w === 80 ? "28" : w === 60 ? "20" : "24"}`} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function ListingDetailSkeleton() {
  return (
    <div className="min-h-screen bg-warm-white pt-16">
      {/* Photo gallery skeleton */}
      <Skeleton className="h-[400px] w-full rounded-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Skeleton className="h-4 w-32 mb-6" />
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left */}
          <div className="flex-1 space-y-6">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-9 w-3/4" />
            <Skeleton className="h-4 w-48" />
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-20 rounded-xl" />)}
            </div>
            <Skeleton className="h-px w-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
            <Skeleton className="h-px w-full" />
            <div className="grid grid-cols-3 gap-3">
              {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-14 rounded-xl" />)}
            </div>
          </div>
          {/* Right — contact card */}
          <div className="w-full lg:w-96 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-warm-white-dark p-6 space-y-4">
              <Skeleton className="h-9 w-40" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-12 w-full rounded-xl" />
              <Skeleton className="h-10 w-full rounded-xl" />
              <Skeleton className="h-px w-full" />
              <div className="space-y-2">
                {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-4 w-36" />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
