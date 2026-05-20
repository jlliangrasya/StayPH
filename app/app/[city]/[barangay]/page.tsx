import { notFound } from "next/navigation"
import { Suspense } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { MapPin, ChevronLeft } from "lucide-react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import ListingCard from "@/components/listings/ListingCard"
import FilterSidebar from "@/components/listings/FilterSidebar"
import SortBar from "@/components/listings/SortBar"
import { getListingsByBarangay } from "@/lib/listings"

const CITY_NAMES: Record<string, string> = {
  cebu: "Cebu City", davao: "Davao City", iloilo: "Iloilo City",
  bacolod: "Bacolod City", cdo: "Cagayan de Oro", baguio: "Baguio City", manila: "Manila",
}

// Segments that should NOT be treated as barangays
const RESERVED = new Set(["near", "listing", "list", "login", "signup"])

interface PageProps {
  params: Promise<{ city: string; barangay: string }>
  searchParams: Promise<{
    type?: string; gender?: string; min?: string; max?: string
    amenities?: string; curfew?: string; sort?: string
  }>
}

function barangayLabel(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city, barangay } = await params
  const cityName = CITY_NAMES[city.toLowerCase()] ?? city.replace(/-/g, " ")
  const label = barangayLabel(barangay)
  return {
    title: `Boarding houses in ${label}, ${cityName} — StayPH`,
    description: `Find verified boarding houses and bedspaces in ${label}, ${cityName}. Affordable, safe, and human-verified listings.`,
  }
}

export default async function BarangayPage({ params, searchParams }: PageProps) {
  const { city, barangay } = await params
  const filters = await searchParams

  if (RESERVED.has(barangay.toLowerCase())) notFound()

  const cityName = CITY_NAMES[city.toLowerCase()] ?? city.replace(/-/g, " ")
  const label = barangayLabel(barangay)
  const listings = await getListingsByBarangay(city, barangay, filters)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-warm-white pt-16">
        {/* Header */}
        <div className="bg-navy py-10 px-4">
          <div className="max-w-7xl mx-auto">
            <Link
              href={`/${city}`}
              className="inline-flex items-center gap-1.5 text-white/50 hover:text-white text-sm mb-3 transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <ChevronLeft size={14} /> {cityName}
            </Link>
            <div className="flex items-center gap-2 mb-1">
              <MapPin size={16} className="text-coral" />
              <p className="text-coral font-semibold text-sm" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                {cityName}
              </p>
            </div>
            <h1
              className="text-white text-3xl sm:text-4xl font-bold"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Boarding houses in {label}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8 items-start">
            <Suspense>
              <FilterSidebar />
            </Suspense>

            <div className="flex-1 min-w-0">
              <Suspense>
                <SortBar count={listings.length} city={`${label}, ${cityName}`} />
              </Suspense>

              {listings.length === 0 ? (
                <BarangayEmpty label={label} city={cityName} citySlug={city} />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {listings.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

function BarangayEmpty({ label, city, citySlug }: { label: string; city: string; citySlug: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 bg-coral/10 rounded-2xl flex items-center justify-center mb-5">
        <MapPin size={28} className="text-coral" />
      </div>
      <h3 className="text-navy font-bold text-xl mb-2" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
        No listings in {label} yet
      </h3>
      <p className="text-charcoal-light text-sm max-w-xs leading-relaxed mb-6" style={{ fontFamily: "var(--font-inter)" }}>
        We&apos;re growing in {label}, {city}. Check back soon, or browse all listings in {city}.
      </p>
      <Link
        href={`/${citySlug}`}
        className="bg-coral text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-coral-dark transition-colors"
        style={{ fontFamily: "var(--font-plus-jakarta)" }}
      >
        Browse all {city} listings
      </Link>
    </div>
  )
}
