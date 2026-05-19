"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"

const SORT_OPTIONS = [
  { value: "preferred",  label: "Preferred First" },
  { value: "rating",     label: "Highest Rated" },
  { value: "price_asc",  label: "Lowest Price" },
  { value: "price_desc", label: "Highest Price" },
  { value: "newest",     label: "Newest" },
]

export default function SortBar({ count, city }: { count: number; city: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentSort = searchParams.get("sort") ?? "preferred"

  const updateSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("sort", value)
    router.push(`${pathname}?${params.toString()}`)
  }

  const cityLabel = city.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
      <p className="text-charcoal text-sm" style={{ fontFamily: "var(--font-inter)" }}>
        <span className="font-semibold text-navy">{count.toLocaleString()}</span>{" "}
        {count === 1 ? "listing" : "listings"} in{" "}
        <span className="font-semibold text-navy">{cityLabel}</span>
      </p>
      <div className="flex items-center gap-2">
        <span
          className="text-charcoal/60 text-xs flex-shrink-0"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Sort:
        </span>
        <select
          value={currentSort}
          onChange={(e) => updateSort(e.target.value)}
          className="bg-white border border-warm-white-dark text-charcoal text-sm px-3 py-2 rounded-xl focus:outline-none focus:border-coral cursor-pointer"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
