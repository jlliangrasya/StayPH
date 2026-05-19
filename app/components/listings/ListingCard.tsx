import Link from "next/link"
import { MapPin, Star, Wifi, Droplets, Zap, Wind, WashingMachine } from "lucide-react"
import type { Listing } from "@/lib/types"

const BADGE_CONFIG = {
  top_pick:       { label: "👑 Top Pick",        bg: "bg-coral",          text: "text-white" },
  preferred:      { label: "⭐ Preferred",        bg: "bg-navy",           text: "text-golden" },
  site_visited:   { label: "🏘️ Site Visited",    bg: "bg-navy-light",     text: "text-white" },
  admin_verified: { label: "✅ Admin Verified",   bg: "bg-leaf",           text: "text-white" },
  basic:          { label: "☎️ Verified",         bg: "bg-warm-white-dark", text: "text-charcoal" },
}

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  wifi:        <Wifi size={10} />,
  water:       <Droplets size={10} />,
  electricity: <Zap size={10} />,
  aircon:      <Wind size={10} />,
  laundry:     <WashingMachine size={10} />,
}

const TYPE_LABELS: Record<string, string> = {
  bedspace:     "Bedspace",
  private_room: "Private Room",
  studio:       "Studio",
  apartment:    "Apartment",
}

const GENDER_LABELS: Record<string, string> = {
  male_only:   "Male Only",
  female_only: "Female Only",
  mixed:       "Mixed",
}

function getBadge(listing: Listing) {
  if (listing.is_top_pick)       return BADGE_CONFIG.top_pick
  if (listing.is_preferred)      return BADGE_CONFIG.preferred
  if (listing.is_site_visited)   return BADGE_CONFIG.site_visited
  if (listing.is_admin_verified) return BADGE_CONFIG.admin_verified
  return BADGE_CONFIG.basic
}

export default function ListingCard({ listing }: { listing: Listing }) {
  const badge = getBadge(listing)
  const coverPhoto = listing.listing_photos.find((p) => p.is_cover)?.url
  const amenities = listing.listing_amenities.map((a) => a.amenity)
  const slug = `${listing.id}-${listing.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-warm-white-dark hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Cover photo */}
      <div className="relative h-48 bg-gradient-to-br from-coral/15 to-navy/8 overflow-hidden">
        {coverPhoto ? (
          <img src={coverPhoto} alt={listing.title} className="w-full h-full object-cover" />
        ) : (
          <svg viewBox="0 0 320 192" fill="none" className="w-full h-full">
            <rect width="320" height="192" fill="transparent" />
            <rect x="90" y="88" width="140" height="100" rx="4" fill="white" fillOpacity="0.4" />
            <path d="M78 96L160 54L242 96Z" fill="white" fillOpacity="0.5" />
            <rect x="125" y="108" width="28" height="22" rx="3" fill="white" fillOpacity="0.6" />
            <rect x="167" y="108" width="28" height="22" rx="3" fill="white" fillOpacity="0.6" />
            <rect x="138" y="148" width="28" height="40" rx="3" fill="white" fillOpacity="0.5" />
          </svg>
        )}

        {/* Trust badge */}
        <div
          className={`absolute top-3 left-3 ${badge.bg} ${badge.text} text-xs font-bold px-3 py-1 rounded-full`}
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          {badge.label}
        </div>

        {/* Price */}
        <div
          className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-navy font-bold text-sm px-3 py-1.5 rounded-xl shadow-sm"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          ₱{listing.price_monthly.toLocaleString()}
          <span className="text-charcoal/50 font-normal text-xs">/mo</span>
        </div>

        {/* No slots overlay */}
        {listing.available_slots === 0 && (
          <div className="absolute inset-0 bg-charcoal/40 flex items-center justify-center">
            <span
              className="bg-white text-charcoal font-bold text-sm px-4 py-2 rounded-xl"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              No Slots Available
            </span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3
            className="text-navy font-bold text-sm leading-tight"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            {listing.title}
          </h3>
          {listing.review_count > 0 && (
            <div className="flex items-center gap-1 flex-shrink-0">
              <Star size={12} className="text-golden fill-golden" />
              <span className="text-charcoal text-xs font-semibold" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                {listing.average_rating.toFixed(1)}
              </span>
              <span className="text-charcoal/40 text-xs">({listing.review_count})</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 mb-3">
          <MapPin size={11} className="text-coral flex-shrink-0" />
          <span className="text-charcoal-light text-xs truncate" style={{ fontFamily: "var(--font-inter)" }}>
            {listing.barangay ? `${listing.barangay}, ` : ""}{listing.city}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <span
            className="bg-warm-white text-charcoal text-xs px-2 py-0.5 rounded-full border border-warm-white-dark"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {TYPE_LABELS[listing.listing_type] ?? listing.listing_type}
          </span>
          <span
            className="bg-warm-white text-charcoal text-xs px-2 py-0.5 rounded-full border border-warm-white-dark"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {GENDER_LABELS[listing.gender_policy] ?? listing.gender_policy}
          </span>
          {amenities.slice(0, 3).map((a) => (
            <span
              key={a}
              className="bg-leaf/8 text-leaf text-xs px-2 py-0.5 rounded-full flex items-center gap-1"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {AMENITY_ICONS[a]}
              {a.charAt(0).toUpperCase() + a.slice(1)}
            </span>
          ))}
          {amenities.length > 3 && (
            <span className="bg-leaf/8 text-leaf text-xs px-2 py-0.5 rounded-full" style={{ fontFamily: "var(--font-inter)" }}>
              +{amenities.length - 3}
            </span>
          )}
        </div>

        <Link
          href={`/listing/${slug}`}
          className="block w-full text-center bg-coral/8 text-coral font-semibold text-sm py-2.5 rounded-xl hover:bg-coral hover:text-white transition-all duration-200"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          View Listing
        </Link>
      </div>
    </div>
  )
}
