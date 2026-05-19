"use client"

import { MessageCircle, Calendar, Shield, Eye, Phone } from "lucide-react"
import type { ListingDetail } from "@/lib/types"

const BADGE_SUMMARY = [
  { key: "is_top_pick",       label: "👑 Top Pick",        color: "text-coral" },
  { key: "is_preferred",      label: "⭐ Preferred",        color: "text-golden" },
  { key: "is_site_visited",   label: "🏘️ Site Visited",    color: "text-navy" },
  { key: "is_admin_verified", label: "✅ Admin Verified",   color: "text-leaf" },
  { key: "is_photo_verified", label: "🖼️ Photo Verified",  color: "text-charcoal" },
  { key: "is_id_verified",    label: "🪪 ID Verified",     color: "text-charcoal" },
]

export default function ContactCard({ listing }: { listing: ListingDetail }) {
  const waNumber = listing.landlord?.phone?.replace(/\D/g, "")
  const waMessage = encodeURIComponent(
    `Hi! I saw your listing "${listing.title}" on StayPH and I'm interested. Is it still available?`
  )
  const waLink = waNumber ? `https://wa.me/63${waNumber.replace(/^0/, "")}?text=${waMessage}` : null

  const earnedBadges = BADGE_SUMMARY.filter(
    (b) => listing[b.key as keyof ListingDetail]
  )

  return (
    <div className="bg-white rounded-2xl border border-warm-white-dark shadow-sm p-6 sticky top-24">
      {/* Price */}
      <div className="flex items-end gap-1 mb-1">
        <span
          className="text-3xl font-bold text-navy"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          ₱{listing.price_monthly.toLocaleString()}
        </span>
        <span className="text-charcoal/50 text-sm mb-1" style={{ fontFamily: "var(--font-inter)" }}>
          / month
        </span>
      </div>

      {/* Slots */}
      <div className="flex items-center gap-1.5 mb-5">
        {listing.available_slots > 0 ? (
          <>
            <span className="w-2 h-2 bg-leaf rounded-full" />
            <span className="text-leaf text-sm font-medium" style={{ fontFamily: "var(--font-inter)" }}>
              {listing.available_slots} slot{listing.available_slots !== 1 ? "s" : ""} available
            </span>
          </>
        ) : (
          <>
            <span className="w-2 h-2 bg-soft-red rounded-full" />
            <span className="text-soft-red text-sm font-medium" style={{ fontFamily: "var(--font-inter)" }}>
              No slots available
            </span>
          </>
        )}
      </div>

      {/* WhatsApp CTA */}
      {waLink ? (
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 w-full bg-[#25D366] text-white font-bold text-base py-3.5 rounded-xl hover:bg-[#20BD5C] transition-colors shadow-sm mb-3"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          <MessageCircle size={20} />
          Message on WhatsApp
        </a>
      ) : (
        <button
          className="flex items-center justify-center gap-2.5 w-full bg-[#25D366] text-white font-bold text-base py-3.5 rounded-xl shadow-sm mb-3 opacity-60 cursor-not-allowed"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
          disabled
        >
          <Phone size={20} />
          Contact Landlord
        </button>
      )}

      {/* Request viewing — Phase 2 placeholder */}
      <button
        className="flex items-center justify-center gap-2 w-full bg-navy/8 text-navy font-semibold text-sm py-3 rounded-xl hover:bg-navy/15 transition-colors mb-5"
        style={{ fontFamily: "var(--font-plus-jakarta)" }}
        title="Coming in Phase 2"
        disabled
      >
        <Calendar size={16} />
        Request a Viewing
        <span className="text-xs bg-golden/20 text-golden px-2 py-0.5 rounded-full ml-1">Soon</span>
      </button>

      {/* Trust badges */}
      {earnedBadges.length > 0 && (
        <div className="border-t border-warm-white-dark pt-4 mb-4">
          <p
            className="text-charcoal/60 text-xs font-semibold uppercase tracking-wide mb-3"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Verification
          </p>
          <div className="space-y-2">
            {earnedBadges.map((b) => (
              <div key={b.key} className="flex items-center gap-2">
                <span className={`text-sm ${b.color}`}>{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Safety tip */}
      <div className="bg-amber/8 border border-amber/20 rounded-xl p-3 flex gap-2.5">
        <Shield size={16} className="text-amber flex-shrink-0 mt-0.5" />
        <p className="text-charcoal/70 text-xs leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
          Always communicate through StayPH. Never send a deposit before visiting the property in person.
        </p>
      </div>
    </div>
  )
}
