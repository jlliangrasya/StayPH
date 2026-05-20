import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import VisitReportClient from '@/components/verification/VisitReportClient'
import { MOCK_LISTINGS } from '@/lib/mock-data'
import { ClipboardList } from 'lucide-react'

interface PageProps {
  params: Promise<{ listingId: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { listingId } = await params
  const listing = MOCK_LISTINGS.find(l => l.id === listingId)
  return {
    title: listing ? `Visit Report — ${listing.title} — StayPH` : 'Visit Report — StayPH',
  }
}

export default async function VisitReportPage({ params }: PageProps) {
  const { listingId } = await params
  const listing = MOCK_LISTINGS.find(l => l.id === listingId)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-warm-white pt-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-navy/8 rounded-2xl flex items-center justify-center text-navy">
              <ClipboardList size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-navy" style={{ fontFamily: 'var(--font-plus-jakarta)' }}>
                Visit Report
              </h1>
              {listing ? (
                <p className="text-charcoal-light text-sm" style={{ fontFamily: 'var(--font-inter)' }}>
                  {listing.title} · {listing.address}
                </p>
              ) : (
                <p className="text-charcoal-light text-sm">Submit a site visit verification report</p>
              )}
            </div>
          </div>

          <VisitReportClient listingId={listingId} listingTitle={listing?.title ?? null} />
        </div>
      </main>
      <Footer />
    </>
  )
}
