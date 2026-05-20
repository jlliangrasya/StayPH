import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import VerifyDocsClient from '@/components/verification/VerifyDocsClient'
import { ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Verify My Documents — StayPH',
  description: 'Submit your government ID and supporting documents to get verified on StayPH.',
}

export default function VerifyDocsPage() {
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

          <VerifyDocsClient />
        </div>
      </main>
      <Footer />
    </>
  )
}
