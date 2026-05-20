import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import { type Listing, BADGE_STYLES } from "@/lib/mock-listings";

function HouseIllustration({ color }: { color: string }) {
  return (
    <div className={`w-full h-full bg-gradient-to-br ${color} flex items-center justify-center`}>
      <svg viewBox="0 0 280 176" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="80" y="80" width="120" height="90" rx="4" fill="white" fillOpacity="0.4" />
        <path d="M70 88L140 50L210 88Z" fill="white" fillOpacity="0.5" />
        <rect x="110" y="100" width="24" height="20" rx="3" fill="white" fillOpacity="0.6" />
        <rect x="146" y="100" width="24" height="20" rx="3" fill="white" fillOpacity="0.6" />
        <rect x="122" y="130" width="26" height="40" rx="3" fill="white" fillOpacity="0.5" />
        <circle cx="226" cy="40" r="22" fill="white" fillOpacity="0.15" />
        <circle cx="50" cy="130" r="14" fill="white" fillOpacity="0.15" />
      </svg>
    </div>
  );
}

export default function ListingCard({ listing }: { listing: Listing }) {
  const badgeStyle = BADGE_STYLES[listing.badge] ?? { bg: "bg-navy", text: "text-white" };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-warm-white-dark hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Cover */}
      <div className="relative h-44 overflow-hidden">
        <HouseIllustration color={listing.coverColor} />
        <div
          className={`absolute top-3 left-3 ${badgeStyle.bg} ${badgeStyle.text} text-xs font-bold px-3 py-1 rounded-full`}
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          {listing.badgeLabel}
        </div>
        <div
          className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-navy font-bold text-sm px-3 py-1.5 rounded-xl shadow-sm"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          ₱{listing.price.toLocaleString()}
          <span className="text-charcoal/50 font-normal text-xs">/mo</span>
        </div>
        {listing.availableSlots <= 2 && (
          <div className="absolute top-3 right-3 bg-soft-red text-white text-xs font-semibold px-2 py-0.5 rounded-full">
            {listing.availableSlots === 1 ? "Last slot!" : `${listing.availableSlots} slots left`}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3
            className="text-navy font-bold text-sm leading-tight"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            {listing.title}
          </h3>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Star size={12} className="text-golden fill-golden" />
            <span className="text-charcoal text-xs font-semibold" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
              {listing.rating}
            </span>
            <span className="text-charcoal/40 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
              ({listing.reviews})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 mb-3">
          <MapPin size={11} className="text-coral flex-shrink-0" />
          <span className="text-charcoal-light text-xs" style={{ fontFamily: "var(--font-inter)" }}>
            {listing.location} ·{" "}
            <span className="text-coral font-medium">{listing.nearSchool}</span>
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className="bg-warm-white text-charcoal text-xs px-2 py-0.5 rounded-full border border-warm-white-dark capitalize">
            {listing.type.replace("_", " ")}
          </span>
          <span className="bg-warm-white text-charcoal text-xs px-2 py-0.5 rounded-full border border-warm-white-dark capitalize">
            {listing.gender === "female_only" ? "Female Only" : listing.gender === "male_only" ? "Male Only" : "Mixed"}
          </span>
          {listing.inclusions.slice(0, 2).map((inc) => (
            <span key={inc} className="bg-leaf/10 text-leaf text-xs px-2 py-0.5 rounded-full">
              {inc}
            </span>
          ))}
          {listing.inclusions.length > 2 && (
            <span className="bg-leaf/10 text-leaf text-xs px-2 py-0.5 rounded-full">
              +{listing.inclusions.length - 2}
            </span>
          )}
        </div>

        <Link
          href={`/listing/${listing.id}`}
          className="mt-auto block w-full text-center bg-coral/8 text-coral font-semibold text-sm py-2.5 rounded-xl hover:bg-coral hover:text-white transition-all duration-200"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          View Listing
        </Link>
      </div>
    </div>
  );
}
