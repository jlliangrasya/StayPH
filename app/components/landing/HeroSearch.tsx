"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, MapPin } from "lucide-react"
import { resolveSearchQuery } from "@/lib/schools"

const QUICK_FILTERS = [
  { label: "Near USC Cebu",   href: "/cebu/near/usc" },
  { label: "Near UV Visayas", href: "/cebu/near/uv" },
  { label: "Near CIT-U",      href: "/cebu/near/cit-u" },
  { label: "Female Only",     href: "/cebu?gender=female_only" },
  { label: "₱3,000 & below",  href: "/cebu?max=3000" },
]

export default function HeroSearch() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearch = () => {
    const path = resolveSearchQuery(query)
    router.push(path)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch()
  }

  return (
    <div>
      {/* Search bar */}
      <div className="bg-white rounded-2xl shadow-lg border border-warm-white-dark p-2 flex flex-col sm:flex-row gap-2 mb-6 max-w-lg mx-auto lg:mx-0">
        <div className="flex items-center gap-2 flex-1 px-3 py-2">
          <MapPin size={18} className="text-coral flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="City, university, or barangay..."
            className="flex-1 text-charcoal placeholder-charcoal/40 text-sm bg-transparent outline-none"
            style={{ fontFamily: "var(--font-inter)" }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-charcoal/30 hover:text-charcoal/60 transition-colors text-lg leading-none"
              aria-label="Clear"
            >
              ×
            </button>
          )}
        </div>
        <button
          onClick={handleSearch}
          className="bg-coral text-white font-semibold text-sm px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-coral-dark transition-colors shadow-sm flex-shrink-0"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          <Search size={16} />
          Search
        </button>
      </div>

      {/* Quick filters */}
      <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
        {QUICK_FILTERS.map((f) => (
          <a
            key={f.label}
            href={f.href}
            className="bg-warm-white border border-warm-white-dark text-charcoal text-xs font-medium px-3 py-1.5 rounded-full hover:border-coral hover:text-coral transition-colors"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {f.label}
          </a>
        ))}
      </div>
    </div>
  )
}
