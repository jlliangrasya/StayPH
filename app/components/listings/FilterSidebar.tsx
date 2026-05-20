"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"
import { X, SlidersHorizontal } from "lucide-react"

const ROOM_TYPES = [
  { value: "bedspace",     label: "Bedspace" },
  { value: "private_room", label: "Private Room" },
  { value: "studio",       label: "Studio" },
  { value: "apartment",    label: "Apartment" },
]

const GENDER_OPTIONS = [
  { value: "",            label: "All Genders" },
  { value: "female_only", label: "Female Only" },
  { value: "male_only",   label: "Male Only" },
  { value: "mixed",       label: "Mixed" },
]

const AMENITIES = [
  { value: "wifi",        label: "WiFi" },
  { value: "water",       label: "Water Included" },
  { value: "electricity", label: "Electricity Included" },
  { value: "aircon",      label: "Aircon" },
  { value: "laundry",     label: "Laundry" },
  { value: "cooking",     label: "Cooking Allowed" },
]

export default function FilterSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [mobileOpen, setMobileOpen] = useState(false)

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      router.push(`${pathname}?${params.toString()}`)
    },
    [router, pathname, searchParams]
  )

  const toggleAmenity = useCallback(
    (amenity: string) => {
      const params = new URLSearchParams(searchParams.toString())
      const current = params.get("amenities")?.split(",").filter(Boolean) ?? []
      const updated = current.includes(amenity)
        ? current.filter((a) => a !== amenity)
        : [...current, amenity]
      if (updated.length) {
        params.set("amenities", updated.join(","))
      } else {
        params.delete("amenities")
      }
      router.push(`${pathname}?${params.toString()}`)
    },
    [router, pathname, searchParams]
  )

  const clearAll = useCallback(() => {
    router.push(pathname)
  }, [router, pathname])

  const selectedType = searchParams.get("type") ?? ""
  const selectedGender = searchParams.get("gender") ?? ""
  const selectedAmenities = searchParams.get("amenities")?.split(",").filter(Boolean) ?? []
  const minPrice = searchParams.get("min") ?? ""
  const maxPrice = searchParams.get("max") ?? ""
  const noCurfew = searchParams.get("curfew") === "false"
  const activeCount = [...searchParams.keys()].filter((k) => k !== "sort").length

  function FilterContent() {
    return (
      <div className="space-y-6">
        {/* Price range */}
        <div>
          <h3
            className="text-navy font-semibold text-sm mb-3"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Monthly Price (₱)
          </h3>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              placeholder="Min"
              defaultValue={minPrice}
              onBlur={(e) => updateFilter("min", e.target.value)}
              className="w-full border border-warm-white-dark rounded-lg px-3 py-2 text-sm text-charcoal bg-white focus:outline-none focus:border-coral placeholder-charcoal/30"
              style={{ fontFamily: "var(--font-inter)" }}
            />
            <span className="text-charcoal/40 text-sm flex-shrink-0">—</span>
            <input
              type="number"
              placeholder="Max"
              defaultValue={maxPrice}
              onBlur={(e) => updateFilter("max", e.target.value)}
              className="w-full border border-warm-white-dark rounded-lg px-3 py-2 text-sm text-charcoal bg-white focus:outline-none focus:border-coral placeholder-charcoal/30"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>
        </div>

        {/* Room type */}
        <div>
          <h3
            className="text-navy font-semibold text-sm mb-3"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Room Type
          </h3>
          <div className="space-y-2.5">
            {ROOM_TYPES.map((type) => (
              <label key={type.value} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedType === type.value}
                  onChange={() =>
                    updateFilter("type", selectedType === type.value ? "" : type.value)
                  }
                  className="w-4 h-4 rounded border-warm-white-dark accent-[#FF6B4A]"
                />
                <span
                  className="text-charcoal text-sm group-hover:text-coral transition-colors"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {type.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Gender policy */}
        <div>
          <h3
            className="text-navy font-semibold text-sm mb-3"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Gender Policy
          </h3>
          <div className="space-y-2.5">
            {GENDER_OPTIONS.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="radio"
                  name="gender"
                  checked={selectedGender === opt.value}
                  onChange={() => updateFilter("gender", opt.value)}
                  className="w-4 h-4 accent-[#FF6B4A]"
                />
                <span
                  className="text-charcoal text-sm group-hover:text-coral transition-colors"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div>
          <h3
            className="text-navy font-semibold text-sm mb-3"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Inclusions
          </h3>
          <div className="space-y-2.5">
            {AMENITIES.map((amenity) => (
              <label key={amenity.value} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedAmenities.includes(amenity.value)}
                  onChange={() => toggleAmenity(amenity.value)}
                  className="w-4 h-4 rounded border-warm-white-dark accent-[#FF6B4A]"
                />
                <span
                  className="text-charcoal text-sm group-hover:text-coral transition-colors"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {amenity.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Curfew */}
        <div>
          <h3
            className="text-navy font-semibold text-sm mb-3"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            House Rules
          </h3>
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="checkbox"
              checked={noCurfew}
              onChange={() => updateFilter("curfew", noCurfew ? "" : "false")}
              className="w-4 h-4 rounded border-warm-white-dark accent-[#FF6B4A]"
            />
            <span
              className="text-charcoal text-sm group-hover:text-coral transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              No Curfew
            </span>
          </label>
        </div>

        {/* Clear all */}
        {activeCount > 0 && (
          <button
            onClick={clearAll}
            className="w-full text-center text-coral font-semibold text-sm py-2.5 rounded-xl border border-coral/30 hover:bg-coral/8 transition-colors"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Clear All Filters ({activeCount})
          </button>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Mobile toggle button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 bg-white border border-warm-white-dark text-charcoal font-semibold text-sm px-4 py-2.5 rounded-xl shadow-sm hover:border-coral hover:text-coral transition-colors"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          <SlidersHorizontal size={16} />
          Filters
          {activeCount > 0 && (
            <span className="bg-coral text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-charcoal/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-navy font-bold text-lg"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                Filters
              </h2>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg hover:bg-warm-white-dark transition-colors"
              >
                <X size={20} className="text-charcoal" />
              </button>
            </div>
            <FilterContent />
            <button
              onClick={() => setMobileOpen(false)}
              className="mt-6 w-full bg-coral text-white font-semibold text-sm py-3 rounded-xl hover:bg-coral-dark transition-colors"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              Show Results
            </button>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:block w-72 flex-shrink-0">
        <div className="bg-white rounded-2xl border border-warm-white-dark p-6 sticky top-24">
          <div className="flex items-center justify-between mb-6">
            <h2
              className="text-navy font-bold text-base"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              Filters
            </h2>
            {activeCount > 0 && (
              <button
                onClick={clearAll}
                className="text-coral text-xs font-semibold hover:underline"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                Clear all
              </button>
            )}
          </div>
          <FilterContent />
        </div>
      </div>
    </>
  )
}
