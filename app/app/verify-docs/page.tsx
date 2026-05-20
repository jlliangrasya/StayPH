'use client'

import { useState } from 'react'
import { ShieldCheck } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import VerifyDocsClient from '@/components/verification/VerifyDocsClient'
import AuthModal from '@/components/auth/AuthModal'
import { useAuth } from '@/lib/auth-context'

export default function VerifyDocsPage() {
  const { user, isLoading } = useAuth()
  const [authOpen, setAuthOpen] = useState(false)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-warm-white pt-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-coral/10 rounded-2xl flex items-center justify-center text-coral">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-navy" style={{ fontFamily: 'var(--font-plus-jakarta)' }}>
                Document Verification
              </h1>
              <p className="text-charcoal-light text-sm" style={{ fontFamily: 'var(--font-inter)' }}>
                Submit your ID and supporting documents for verification
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="h-64 bg-warm-white-dark rounded-2xl animate-pulse" />
          ) : !user ? (
            <div className="flex flex-col items-center justify-center py-20 gap-5 text-center bg-white rounded-2xl border border-warm-white-dark">
              <div className="w-16 h-16 bg-coral/10 rounded-full flex items-center justify-center">
                <ShieldCheck size={30} className="text-coral" />
              </div>
              <div>
                <p className="text-lg font-bold text-charcoal" style={{ fontFamily: 'var(--font-plus-jakarta)' }}>
                  Sign in to verify your documents
                </p>
                <p className="text-sm text-charcoal-light mt-1">
                  Create a free account to submit your ID and unlock trust badges.
                </p>
              </div>
              <button
                onClick={() => setAuthOpen(true)}
                className="px-6 py-2.5 bg-coral text-white font-semibold rounded-xl hover:bg-coral-dark transition-colors text-sm"
              >
                Sign in or Sign up
              </button>
            </div>
          ) : (
            <VerifyDocsClient />
          )}
        </div>
      </main>
      <Footer />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} defaultMode="signin" />
    </>
  )
}
