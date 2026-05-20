import { Skeleton, ListingCardSkeleton, FilterSidebarSkeleton } from "@/components/ui/Skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-warm-white pt-16">
      {/* Header */}
      <div className="bg-navy py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <Skeleton className="h-3 w-24 bg-white/20 mb-2" />
          <Skeleton className="h-10 w-72 bg-white/20" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8 items-start">
          <FilterSidebarSkeleton />

          <div className="flex-1 min-w-0">
            {/* Sort bar */}
            <div className="flex items-center justify-between mb-6">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-9 w-44 rounded-xl" />
            </div>
            {/* Listing grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => (
                <ListingCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
