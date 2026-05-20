'use client'

import { useState } from 'react'
import { Flag } from 'lucide-react'
import type { ListingDetail } from '@/lib/types'
import { MOCK_REVIEWS } from '@/lib/mock-phase2'
import SaveButton from '@/components/listing/SaveButton'
import RequestViewingModal from '@/components/listing/RequestViewingModal'
import ReportModal from '@/components/listing/ReportModal'
import { ReviewList } from '@/components/listing/Reviews'
import { BadgeRow, LandlordBadges } from '@/components/listing/TrustBadges'
import AuthModal from '@/components/auth/AuthModal'

interface ListingDetailClientProps {
  listing: ListingDetail
}

export default function ListingDetailClient({ listing }: ListingDetailClientProps) {
  const [viewingOpen, setViewingOpen] = useState(false)
  const [reportOpen, setReportOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)

  const reviews = MOCK_REVIEWS.filter(r => r.listing_id === listing.id)

  return (
    <>
      {/* ── Save + Report row ─────────────────────────────── */}
      <div className="flex items-center justify-between gap-3 mt-3 mb-1">
        <BadgeRow listing={listing} size="sm" />
        <div className="flex items-center gap-2">
          <SaveButton listingId={listing.id} variant="full" onAuthRequired={() => setAuthOpen(true)} />
          <button
            onClick={() => setReportOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-warm-white-dark text-xs font-semibold text-charcoal-light hover:text-soft-red hover:border-soft-red/30 transition-all"
          >
            <Flag size={13} /> Report
          </button>
        </div>
      </div>

      {/* ── Request Viewing button (mobile — shown above contact card on small screens) ── */}
      <div className="lg:hidden mt-4">
        <button
          onClick={() => setViewingOpen(true)}
          className="w-full py-3 bg-coral hover:bg-coral-dark text-white font-bold rounded-xl text-sm transition-colors shadow-sm"
        >
          📅 Request a Viewing
        </button>
      </div>

      {/* ── Landlord badges (enhanced) ─────────────────────── */}
      <div className="mt-4">
        <LandlordBadges landlord={listing.landlord} memberSince={listing.landlord.created_at} />
      </div>

      {/* ── Reviews section ────────────────────────────────── */}
      <div className="mt-2">
        <ReviewList
          reviews={reviews}
          listingId={listing.id}
          averageRating={listing.average_rating}
          reviewCount={listing.review_count}
        />
      </div>

      {/* ── Modals ─────────────────────────────────────────── */}
      <RequestViewingModal
        isOpen={viewingOpen}
        onClose={() => setViewingOpen(false)}
        listingId={listing.id}
        listingTitle={listing.title}
        landlordId={listing.landlord.id}
        landlordName={listing.landlord.full_name}
        onAuthRequired={() => { setViewingOpen(false); setAuthOpen(true) }}
      />
      <ReportModal
        isOpen={reportOpen}
        onClose={() => setReportOpen(false)}
        listingId={listing.id}
        listingTitle={listing.title}
        onAuthRequired={() => { setReportOpen(false); setAuthOpen(true) }}
      />
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        defaultMode="signin"
      />
    </>
  )
}
