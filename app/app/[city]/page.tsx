import { Suspense } from "react"
import type { Metadata } from "next"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import ListingCard from "@/components/listings/ListingCard"
import FilterSidebar from "@/components/listings/FilterSidebar"
import SortBar from "@/components/listings/SortBar"
import { getListings } from "@/lib/listings"

const CITY_NAMES: Record<string, string> = {
  cebu:    "Cebu City",
  davao:   "Davao City",
  iloilo:  "Iloilo City",
  bacolod: "Bacolod City",
  cdo:     "Cagayan de Oro",
  baguio:  "Baguio City",
  manila:  "Manila",
}

interface PageProps {
  params: Promise<{ city: string }>
  searchParams: Promise<{
    type?: string; gender?: string; min?: string; max?: string
    amenities?: string; curfew?: string; sort?: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params
  const cityName = CITY_NAMES[city.toLowerCase()] ?? city.replace(/-/g, " ")
  return {
    title: `Boarding houses in ${cityName} — StayPH`,
    description: `Find verified boarding houses and bedspaces in ${cityName}. Affordable, safe, and human-verified listings near top universities.`,
  }
}

export default async function BrowsePage({ params, searchParams }: PageProps) {
  const { city } = await params
  const filters = await searchParams
  const listings = await getListings({ city, ...filters })
  const cityName = CITY_NAMES[city.toLowerCase()] ?? city.replace(/-/g, " ")

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-warm-white pt-16">
        {/* Page header */}
        <div className="bg-navy py-10 px-4">
          <div className="max-w-7xl mx-auto">
            <p className="text-white/50 text-sm mb-1" style={{ fontFamily: "var(--font-inter)" }}>
              Browse Listings
            </p>
            <h1
              className="text-white text-3xl sm:text-4xl font-bold"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Boarding houses in {cityName}
            </h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8 items-start">
            <Suspense>
              <FilterSidebar />
            </Suspense>

            <div className="flex-1 min-w-0">
              <Suspense>
                <SortBar count={listings.length} city={city} />
              </Suspense>

              {listings.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="w-16 h-16 bg-coral/10 rounded-2xl flex items-center justify-center mb-5">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <path d="M4 28V14L16 4L28 14V28H20V20H12V28H4Z" stroke="#FF6B4A" strokeWidth="2" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-navy font-bold text-xl mb-2" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                    No listings found
                  </h3>
                  <p className="text-charcoal-light text-sm max-w-xs leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                    We&apos;re growing in {cityName}! Try adjusting your filters or check back soon.
                  </p>
                </div>
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
