'use client'

import { useEffect, useState } from 'react'
import { Bookmark } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ListingCard from '@/components/listings/ListingCard'
import { useAuth } from '@/lib/auth-context'
import { getBookmarkedIds } from '@/lib/bookmark-store'
import { MOCK_LISTINGS } from '@/lib/mock-data'
import type { Listing } from '@/lib/types'
import AuthModal from '@/components/auth/AuthModal'

export default function SavedPage() {
  const { user, isLoading } = useAuth()
  const [savedListings, setSavedListings] = useState<Listing[]>([])
  const [authOpen, setAuthOpen] = useState(false)

  useEffect(() => {
    if (!user) return
    // TODO: fetch from Supabase bookmarks table where tenant_id = user.id
    const ids = getBookmarkedIds(user.id)
    const found = MOCK_LISTINGS.filter(l => ids.includes(l.id))
    setSavedListings(found)
  }, [user])

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-warm-white pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Bookmark size={24} className="text-coral" />
            <div>
              <h1 className="text-2xl font-bold font-display text-navy">Saved Listings</h1>
              <p className="text-sm text-charcoal-light">Your bookmarked boarding houses</p>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-64 bg-warm-white-dark rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : !user ? (
            <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
              <div className="w-20 h-20 rounded-full bg-coral/10 flex items-center justify-center">
                <Bookmark size={36} className="text-coral" />
              </div>
              <div>
                <p className="text-lg font-bold text-charcoal font-display">Sign in to see your saved listings</p>
                <p className="text-sm text-charcoal-light mt-1">Create an account or sign in to bookmark listings.</p>
              </div>
              <button
                onClick={() => setAuthOpen(true)}
                className="px-6 py-2.5 bg-coral text-white font-semibold rounded-xl hover:bg-coral-dark transition-colors"
              >
                Sign in
              </button>
            </div>
          ) : savedListings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
              <div className="w-20 h-20 rounded-full bg-warm-white-dark flex items-center justify-center">
                <Bookmark size={36} className="text-charcoal-light" />
              </div>
              <div>
                <p className="text-lg font-bold text-charcoal font-display">No saved listings yet</p>
                <p className="text-sm text-charcoal-light mt-1">Tap the bookmark icon on any listing to save it here.</p>
              </div>
            </div>
          ) : (
            <>
              <p className="text-sm text-charcoal-light mb-5">{savedListings.length} saved listing{savedListings.length !== 1 ? 's' : ''}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {savedListings.map(listing => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} defaultMode="signin" />
    </>
  )
}
