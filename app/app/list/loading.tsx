import { Skeleton } from "@/components/ui/Skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-warm-white pt-16">
      <div className="bg-navy py-10 px-4">
        <div className="max-w-2xl mx-auto text-center space-y-2">
          <Skeleton className="h-3 w-20 mx-auto bg-white/20" />
          <Skeleton className="h-10 w-64 mx-auto bg-white/20" />
          <Skeleton className="h-4 w-80 mx-auto bg-white/20" />
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl border border-warm-white-dark p-8 space-y-6">
          {/* Step indicator */}
          <div className="flex items-center justify-between">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center">
                <Skeleton className="w-9 h-9 rounded-full" />
                {i < 5 && <Skeleton className="h-0.5 w-8 sm:w-16 mx-1" />}
              </div>
            ))}
          </div>
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-72" />
          <div className="space-y-4">
            <Skeleton className="h-12 rounded-xl" />
            <Skeleton className="h-24 rounded-xl" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-12 rounded-xl" />
              <Skeleton className="h-12 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
