import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import dynamic from "next/dynamic"
import {
  MapPin, Star, Users, BedDouble, ShieldCheck,
  Clock, UtensilsCrossed, Wifi, Droplets, Zap, Wind,
  WashingMachine, PawPrint, ChevronLeft,
} from "lucide-react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import PhotoGallery from "@/components/listing/PhotoGallery"
import ContactCard from "@/components/listing/ContactCard"
import { getListing } from "@/lib/listings"
import type { ListingDetail } from "@/lib/types"

const ListingMap = dynamic(() => import("@/components/listing/ListingMap"), { ssr: false })

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const listing = await getListing(slug.substring(0, 36))
  if (!listing) return { title: "Listing not found — StayPH" }
  return {
    title: `${listing.title} in ${listing.city} — StayPH`,
    description: `${listing.listing_type === "bedspace" ? "Bedspace" : "Room"} in ${listing.barangay ?? listing.city}. ₱${listing.price_monthly.toLocaleString()}/month. ${listing.is_preferred ? "⭐ Preferred by StayPH team." : ""}`,
  }
}

const TYPE_LABELS: Record<string, string> = {
  bedspace: "Bedspace", private_room: "Private Room", studio: "Studio", apartment: "Apartment",
}
const GENDER_LABELS: Record<string, string> = {
  male_only: "Male Only", female_only: "Female Only", mixed: "Mixed",
}
const AMENITY_DISPLAY: Record<string, { icon: React.ReactNode; label: string }> = {
  wifi:        { icon: <Wifi size={20} />,          label: "WiFi included" },
  water:       { icon: <Droplets size={20} />,      label: "Water included" },
  electricity: { icon: <Zap size={20} />,           label: "Electricity included" },
  aircon:      { icon: <Wind size={20} />,           label: "Aircon" },
  laundry:     { icon: <WashingMachine size={20} />, label: "Laundry area" },
  cooking:     { icon: <UtensilsCrossed size={20} />, label: "Cooking allowed" },
  parking:     { icon: <ShieldCheck size={20} />,   label: "Parking available" },
}
const LANDMARK_ICONS: Record<string, string> = {
  school: "🎓", hospital: "🏥", mall: "🛍️", church: "⛪", transport: "🚌",
}

export default async function ListingPage({ params }: PageProps) {
  const { slug } = await params
  const listing = await getListing(slug.substring(0, 36))

  if (!listing) notFound()

  const citySlug = listing.city.toLowerCase().replace(/\s+/g, "-").replace("city", "").replace(/-$/, "").trim() || "cebu"

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-warm-white pt-16">
        {/* Photo gallery */}
        <PhotoGallery photos={listing.listing_photos} title={listing.title} />

        {/* Back breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">
          <Link
            href={`/${citySlug}`}
            className="inline-flex items-center gap-1.5 text-charcoal-light text-sm hover:text-coral transition-colors"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <ChevronLeft size={16} />
            Back to {listing.city} listings
          </Link>
        </div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-10 items-start">

            {/* ── Left column ─────────────────────────────────── */}
            <div className="flex-1 min-w-0">

              {/* Title + trust badge */}
              <div className="mb-2">
                <TrustBadgePill listing={listing} />
                <h1
                  className="text-2xl sm:text-3xl font-bold text-navy mt-3 mb-2 leading-tight"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {listing.title}
                </h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <div className="flex items-center gap-1">
                    <MapPin size={14} className="text-coral" />
                    <span className="text-charcoal-light text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                      {listing.barangay ? `${listing.barangay}, ` : ""}{listing.city}
                    </span>
                  </div>
                  {listing.review_count > 0 && (
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-golden fill-golden" />
                      <span className="text-charcoal font-semibold text-sm" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                        {listing.average_rating.toFixed(1)}
                      </span>
                      <span className="text-charcoal/50 text-sm">({listing.review_count} reviews)</span>
                    </div>
                  )}
                </div>
              </div>

              <hr className="border-warm-white-dark my-6" />

              {/* Quick stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <StatChip icon={<BedDouble size={18} />} label="Room Type" value={TYPE_LABELS[listing.listing_type]} />
                <StatChip icon={<Users size={18} />} label="Gender Policy" value={GENDER_LABELS[listing.gender_policy]} />
                <StatChip
                  icon={<Clock size={18} />}
                  label="Curfew"
                  value={listing.has_curfew ? listing.curfew_time ?? "Yes" : "No Curfew"}
                  valueClass={listing.has_curfew ? "" : "text-leaf"}
                />
                <StatChip
                  icon={<Users size={18} />}
                  label="Slots"
                  value={`${listing.available_slots} of ${listing.total_slots} open`}
                  valueClass={listing.available_slots > 0 ? "text-leaf" : "text-soft-red"}
                />
              </div>

              <hr className="border-warm-white-dark my-6" />

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-navy font-bold text-lg mb-3" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                  About this listing
                </h2>
                <p className="text-charcoal leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                  {listing.description}
                </p>
              </div>

              <hr className="border-warm-white-dark my-6" />

              {/* Inclusions */}
              <div className="mb-6">
                <h2 className="text-navy font-bold text-lg mb-4" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                  What&apos;s included
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {listing.listing_amenities.map(({ amenity }) => {
                    const a = AMENITY_DISPLAY[amenity]
                    if (!a) return null
                    return (
                      <div key={amenity} className="flex items-center gap-3 p-3 bg-warm-white rounded-xl border border-warm-white-dark">
                        <span className="text-leaf">{a.icon}</span>
                        <span className="text-charcoal text-sm font-medium" style={{ fontFamily: "var(--font-inter)" }}>
                          {a.label}
                        </span>
                      </div>
                    )
                  })}
                  {listing.cooking_allowed && !listing.listing_amenities.find(a => a.amenity === "cooking") && (
                    <div className="flex items-center gap-3 p-3 bg-warm-white rounded-xl border border-warm-white-dark">
                      <span className="text-leaf"><UtensilsCrossed size={20} /></span>
                      <span className="text-charcoal text-sm font-medium" style={{ fontFamily: "var(--font-inter)" }}>Cooking allowed</span>
                    </div>
                  )}
                  {listing.pets_allowed && (
                    <div className="flex items-center gap-3 p-3 bg-warm-white rounded-xl border border-warm-white-dark">
                      <span className="text-leaf"><PawPrint size={20} /></span>
                      <span className="text-charcoal text-sm font-medium" style={{ fontFamily: "var(--font-inter)" }}>Pets allowed</span>
                    </div>
                  )}
                </div>
              </div>

              {/* House rules */}
              {listing.house_rules && (
                <>
                  <hr className="border-warm-white-dark my-6" />
                  <div className="mb-6">
                    <h2 className="text-navy font-bold text-lg mb-3" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                      House rules
                    </h2>
                    <div className="bg-warm-white rounded-xl border border-warm-white-dark p-4">
                      {listing.house_rules.split("\n").filter(Boolean).map((rule, i) => (
                        <p key={i} className="text-charcoal text-sm leading-relaxed mb-2 last:mb-0 flex gap-2" style={{ fontFamily: "var(--font-inter)" }}>
                          <span className="text-coral mt-0.5 flex-shrink-0">·</span>
                          {rule.replace(/^[·•\-]\s*/, "")}
                        </p>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Nearby landmarks */}
              {listing.landmarks?.length > 0 && (
                <>
                  <hr className="border-warm-white-dark my-6" />
                  <div className="mb-6">
                    <h2 className="text-navy font-bold text-lg mb-4" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                      What&apos;s nearby
                    </h2>
                    <div className="space-y-3">
                      {listing.landmarks.map((lm, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-warm-white-dark last:border-0">
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{LANDMARK_ICONS[lm.landmark_type] ?? "📍"}</span>
                            <div>
                              <p className="text-charcoal font-medium text-sm" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                                {lm.name}
                              </p>
                              <p className="text-charcoal/50 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                                {lm.landmark_type.charAt(0).toUpperCase() + lm.landmark_type.slice(1)}
                              </p>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-charcoal font-semibold text-sm" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                              {lm.walking_minutes} min walk
                            </p>
                            <p className="text-charcoal/50 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                              {lm.distance_meters < 1000
                                ? `${lm.distance_meters}m`
                                : `${(lm.distance_meters / 1000).toFixed(1)}km`}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Map */}
              {listing.latitude && listing.longitude && (
                <>
                  <hr className="border-warm-white-dark my-6" />
                  <div className="mb-6">
                    <h2 className="text-navy font-bold text-lg mb-4" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                      Location
                    </h2>
                    <ListingMap
                      lat={listing.latitude}
                      lng={listing.longitude}
                      title={listing.title}
                      landmarks={listing.landmarks}
                    />
                    <p className="text-charcoal/50 text-xs mt-2" style={{ fontFamily: "var(--font-inter)" }}>
                      📍 Exact address shared after viewing appointment is confirmed.
                    </p>
                  </div>
                </>
              )}

              {/* Preferred note */}
              {listing.is_preferred && listing.preferred_note && (
                <>
                  <hr className="border-warm-white-dark my-6" />
                  <div className="bg-navy/5 border border-navy/15 rounded-2xl p-5 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">⭐</span>
                      <span className="text-navy font-bold text-sm" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                        StayPH Preferred
                      </span>
                    </div>
                    <p className="text-charcoal text-sm leading-relaxed italic" style={{ fontFamily: "var(--font-inter)" }}>
                      &ldquo;{listing.preferred_note}&rdquo;
                    </p>
                    <p className="text-charcoal/50 text-xs mt-2" style={{ fontFamily: "var(--font-inter)" }}>
                      — StayPH Verification Team
                    </p>
                  </div>
                </>
              )}

              {/* Landlord profile */}
              {listing.landlord && (
                <>
                  <hr className="border-warm-white-dark my-6" />
                  <div className="mb-6">
                    <h2 className="text-navy font-bold text-lg mb-4" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                      Your landlord
                    </h2>
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className="w-14 h-14 bg-coral/15 rounded-full flex items-center justify-center flex-shrink-0 text-coral font-bold text-xl" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                        {listing.landlord.full_name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-navy font-bold" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                          {listing.landlord.full_name}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-1.5">
                          {listing.landlord.is_phone_verified && (
                            <span className="text-xs bg-leaf/10 text-leaf px-2 py-0.5 rounded-full" style={{ fontFamily: "var(--font-inter)" }}>
                              ☎️ Phone Verified
                            </span>
                          )}
                          {listing.landlord.is_id_verified && (
                            <span className="text-xs bg-leaf/10 text-leaf px-2 py-0.5 rounded-full" style={{ fontFamily: "var(--font-inter)" }}>
                              🪪 ID Verified
                            </span>
                          )}
                        </div>
                        <p className="text-charcoal/50 text-xs mt-1.5" style={{ fontFamily: "var(--font-inter)" }}>
                          Member since {new Date(listing.landlord.created_at).getFullYear()}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* ── Right column — sticky contact card ─────────── */}
            <div className="w-full lg:w-96 flex-shrink-0">
              <ContactCard listing={listing} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

function TrustBadgePill({ listing }: { listing: ListingDetail }) {
  if (listing.is_top_pick)
    return <span className="inline-flex items-center gap-1.5 bg-coral text-white text-xs font-bold px-3 py-1.5 rounded-full" style={{ fontFamily: "var(--font-plus-jakarta)" }}>👑 Top Pick</span>
  if (listing.is_preferred)
    return <span className="inline-flex items-center gap-1.5 bg-navy text-golden text-xs font-bold px-3 py-1.5 rounded-full" style={{ fontFamily: "var(--font-plus-jakarta)" }}>⭐ Preferred</span>
  if (listing.is_site_visited)
    return <span className="inline-flex items-center gap-1.5 bg-navy-light text-white text-xs font-bold px-3 py-1.5 rounded-full" style={{ fontFamily: "var(--font-plus-jakarta)" }}>🏘️ Site Visited</span>
  if (listing.is_admin_verified)
    return <span className="inline-flex items-center gap-1.5 bg-leaf text-white text-xs font-bold px-3 py-1.5 rounded-full" style={{ fontFamily: "var(--font-plus-jakarta)" }}>✅ Admin Verified</span>
  return <span className="inline-flex items-center gap-1.5 bg-warm-white-dark text-charcoal text-xs font-bold px-3 py-1.5 rounded-full" style={{ fontFamily: "var(--font-plus-jakarta)" }}>☎️ Verified</span>
}

function StatChip({ icon, label, value, valueClass = "" }: {
  icon: React.ReactNode; label: string; value: string; valueClass?: string
}) {
  return (
    <div className="bg-warm-white rounded-xl border border-warm-white-dark p-3">
      <div className="flex items-center gap-2 mb-1 text-coral">{icon}</div>
      <p className="text-charcoal/50 text-xs mb-0.5" style={{ fontFamily: "var(--font-inter)" }}>{label}</p>
      <p className={`text-charcoal font-semibold text-sm ${valueClass}`} style={{ fontFamily: "var(--font-plus-jakarta)" }}>
        {value}
      </p>
    </div>
  )
}
