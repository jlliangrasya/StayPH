"use client"

import { useState } from "react"
import { MessageCircle, Calendar, Shield, Phone, MessageSquare, Lock, Star } from "lucide-react"
import type { ListingDetail } from "@/lib/types"
import { useAuth } from "@/lib/auth-context"
import { BadgeRow } from "@/components/listing/TrustBadges"
import RequestViewingModal from "@/components/listing/RequestViewingModal"
import AuthModal from "@/components/auth/AuthModal"
import PaymentModal from "@/components/payments/PaymentModal"
import Link from "next/link"

export default function ContactCard({ listing }: { listing: ListingDetail }) {
  const { user } = useAuth()
  const [viewingOpen, setViewingOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const [paymentType, setPaymentType] = useState<'escrow_deposit' | 'featured_listing' | 'preferred_visit' | null>(null)

  const isLandlord = user?.role === 'landlord' || user?.id === listing.landlord.id

  const waNumber = listing.landlord?.phone?.replace(/\D/g, "")
  const waMessage = encodeURIComponent(
    `Hi! I saw your listing "${listing.title}" on StayPH and I'm interested. Is it still available?`
  )
  const waLink = waNumber ? `https://wa.me/63${waNumber.replace(/^0/, "")}?text=${waMessage}` : null

  return (
    <>
      <div className="bg-white rounded-2xl border border-warm-white-dark shadow-sm p-6 sticky top-24">
        {/* Price */}
        <div className="flex items-end gap-1 mb-1">
          <span className="text-3xl font-bold text-navy" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            ₱{listing.price_monthly.toLocaleString()}
          </span>
          <span className="text-charcoal/50 text-sm mb-1" style={{ fontFamily: "var(--font-inter)" }}>/ month</span>
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

        {/* In-app message button (if signed in) or WhatsApp */}
        {user ? (
          <Link
            href="/messages"
            className="flex items-center justify-center gap-2.5 w-full bg-coral text-white font-bold text-base py-3.5 rounded-xl hover:bg-coral-dark transition-colors shadow-sm mb-3"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            <MessageSquare size={20} />
            Message Landlord
          </Link>
        ) : waLink ? (
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
            disabled
          >
            <Phone size={20} />
            Contact Landlord
          </button>
        )}

        {/* Request viewing */}
        <button
          onClick={() => user ? setViewingOpen(true) : setAuthOpen(true)}
          className="flex items-center justify-center gap-2 w-full bg-navy/8 text-navy font-semibold text-sm py-3 rounded-xl hover:bg-navy/15 transition-colors mb-3"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          <Calendar size={16} />
          Request a Viewing
        </button>

        {/* Escrow deposit (tenant) */}
        {user && !isLandlord && listing.available_slots > 0 && (
          <button
            onClick={() => setPaymentType('escrow_deposit')}
            className="flex items-center justify-center gap-2 w-full bg-leaf/10 text-leaf border border-leaf/30 font-semibold text-sm py-3 rounded-xl hover:bg-leaf/20 transition-colors mb-5"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            <Lock size={16} />
            Pay Deposit via Escrow
          </button>
        )}

        {/* Landlord tools */}
        {isLandlord && (
          <div className="mb-5 space-y-2">
            {!listing.is_preferred && (
              <button
                onClick={() => setPaymentType('preferred_visit')}
                className="flex items-center justify-center gap-2 w-full bg-golden/10 text-golden border border-golden/30 font-semibold text-sm py-2.5 rounded-xl hover:bg-golden/20 transition-colors"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                <Star size={15} />
                Request Preferred Visit — ₱499
              </button>
            )}
            <button
              onClick={() => setPaymentType('featured_listing')}
              className="flex items-center justify-center gap-2 w-full bg-coral/10 text-coral border border-coral/30 font-semibold text-sm py-2.5 rounded-xl hover:bg-coral/20 transition-colors"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              ⭐ Feature this listing — ₱299/mo
            </button>
          </div>
        )}

        {/* Trust badges */}
        <div className="border-t border-warm-white-dark pt-4 mb-4">
          <p className="text-charcoal/60 text-xs font-semibold uppercase tracking-wide mb-3" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            Verification
          </p>
          <BadgeRow listing={listing} size="sm" />
        </div>

        {/* Safety tip */}
        <div className="bg-amber/8 border border-amber/20 rounded-xl p-3 flex gap-2.5">
          <Shield size={16} className="text-amber shrink-0 mt-0.5" />
          <p className="text-charcoal/70 text-xs leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
            Always communicate through StayPH. Never send a deposit before visiting the property in person.
          </p>
        </div>
      </div>

      <RequestViewingModal
        isOpen={viewingOpen}
        onClose={() => setViewingOpen(false)}
        listingId={listing.id}
        listingTitle={listing.title}
        landlordId={listing.landlord.id}
        landlordName={listing.landlord.full_name}
        onAuthRequired={() => { setViewingOpen(false); setAuthOpen(true) }}
      />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} defaultMode="signin" />
      {paymentType && (
        <PaymentModal
          isOpen={true}
          onClose={() => setPaymentType(null)}
          paymentType={paymentType}
          listingId={listing.id}
          listingTitle={listing.title}
          depositAmount={listing.price_monthly * 2}
        />
      )}
    </>
  )
}
