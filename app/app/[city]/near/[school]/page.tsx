import { notFound } from "next/navigation"
import { Suspense } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { GraduationCap, ChevronLeft } from "lucide-react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import ListingCard from "@/components/listings/ListingCard"
import FilterSidebar from "@/components/listings/FilterSidebar"
import SortBar from "@/components/listings/SortBar"
import { getListingsNearSchool } from "@/lib/listings"
import { getSchool } from "@/lib/schools"

interface PageProps {
  params: Promise<{ city: string; school: string }>
  searchParams: Promise<{
    type?: string; gender?: string; min?: string; max?: string
    amenities?: string; curfew?: string; sort?: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city, school } = await params
  const s = getSchool(school)
  if (!s) return { title: "Not found — StayPH" }
  return {
    title: `Boarding houses near ${s.shortName} in ${s.city} — StayPH`,
    description: `Find verified boarding houses and bedspaces near ${s.fullName} in ${s.city}. Affordable, safe, and human-verified listings within walking distance.`,
    openGraph: {
      title: `Boarding houses near ${s.shortName} — StayPH`,
      description: `Verified stays within walking distance of ${s.fullName}. Trusted by Filipino students.`,
    },
  }
}

export default async function NearSchoolPage({ params, searchParams }: PageProps) {
  const { city, school: schoolSlug } = await params
  const filters = await searchParams
  const school = getSchool(schoolSlug)

  if (!school) notFound()

  const listings = await getListingsNearSchool(city, schoolSlug, filters)

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
              <ChevronLeft size={14} /> {school.city}
            </Link>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 bg-golden/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <GraduationCap size={18} className="text-golden" />
              </div>
              <p className="text-golden font-semibold text-sm" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                {school.shortName} · {school.fullName}
              </p>
            </div>
            <h1
              className="text-white text-3xl sm:text-4xl font-bold"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Boarding houses near {school.shortName}
            </h1>
            <p className="text-white/50 text-sm mt-1" style={{ fontFamily: "var(--font-inter)" }}>
              Showing verified listings within 3km of campus
            </p>
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
                <SortBar count={listings.length} city={`near ${school.shortName}`} />
              </Suspense>

              {listings.length === 0 ? (
                <NearSchoolEmpty school={school.shortName} city={school.city} citySlug={city} />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {listings.map((listing) => (
                    <div key={listing.id} className="relative">
                      <ListingCard listing={listing} index={0} />
                      {/* Distance badge */}
                      <div
                        className="absolute top-52 left-3 bg-white/90 backdrop-blur-sm text-navy text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm border border-warm-white-dark"
                        style={{ fontFamily: "var(--font-plus-jakarta)" }}
                      >
                        {listing.distanceKm < 1
                          ? `${Math.round(listing.distanceKm * 1000)}m`
                          : `${listing.distanceKm.toFixed(1)}km`}{" "}
                        from {school.shortName}
                      </div>
                    </div>
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

function NearSchoolEmpty({ school, city, citySlug }: { school: string; city: string; citySlug: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 bg-golden/10 rounded-2xl flex items-center justify-center mb-5">
        <GraduationCap size={28} className="text-golden" />
      </div>
      <h3 className="text-navy font-bold text-xl mb-2" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
        No listings near {school} yet
      </h3>
      <p className="text-charcoal-light text-sm max-w-xs leading-relaxed mb-6" style={{ fontFamily: "var(--font-inter)" }}>
        We&apos;re actively adding more verified listings near {school} in {city}. Check back soon — or browse all listings in {city}.
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
