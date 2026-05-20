'use client'

import { useState } from 'react'
import { X, Flag, CheckCircle } from 'lucide-react'
import type { ReportReason } from '@/lib/types'
import { useAuth } from '@/lib/auth-context'
import { MOCK_REPORTS } from '@/lib/mock-phase2'

const REASONS: { value: ReportReason; label: string; description: string }[] = [
  { value: 'scam',            label: '🚨 Scam',             description: 'Listing is fraudulent or asking for deposit outside the platform' },
  { value: 'fake_photos',     label: '🖼️ Fake photos',      description: 'Photos don\'t match the actual property' },
  { value: 'wrong_info',      label: '❌ Wrong information', description: 'Amenities, price, or details are incorrect' },
  { value: 'outside_payment', label: '💸 Outside payment',  description: 'Landlord asked for GCash payment directly' },
  { value: 'other',           label: '📝 Other',             description: 'Something else is wrong with this listing' },
]

interface ReportModalProps {
  isOpen: boolean
  onClose: () => void
  listingId: string
  listingTitle: string
  onAuthRequired: () => void
}

export default function ReportModal({ isOpen, onClose, listingId, listingTitle, onAuthRequired }: ReportModalProps) {
  const { user } = useAuth()
  const [reason, setReason] = useState<ReportReason | null>(null)
  const [description, setDescription] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  if (!isOpen) return null

  if (!user) {
    onAuthRequired()
    onClose()
    return null
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!reason) return
    setIsLoading(true)
    // TODO: insert into reports table via Supabase
    await new Promise(r => setTimeout(r, 500))
    MOCK_REPORTS.push({
      id: `report-${Date.now()}`,
      reporter_id: user!.id,
      listing_id: listingId,
      listing_title: listingTitle,
      reason,
      description: description.trim() || null,
      status: 'pending',
      reviewed_by: null,
      resolution_note: null,
      created_at: new Date().toISOString(),
    })
    setIsLoading(false)
    setSubmitted(true)
  }

  function handleClose() {
    setReason(null)
    setDescription('')
    setSubmitted(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative w-full max-w-md bg-warm-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-warm-white-dark">
          <div>
            <h2 className="text-lg font-bold font-display text-navy flex items-center gap-2">
              <Flag size={18} className="text-soft-red" /> Report Listing
            </h2>
            <p className="text-sm text-charcoal-light mt-0.5 truncate max-w-72">{listingTitle}</p>
          </div>
          <button onClick={handleClose} className="p-2 rounded-full hover:bg-warm-white-dark text-charcoal-light">
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="px-6 py-10 flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-leaf/15 flex items-center justify-center">
              <CheckCircle size={36} className="text-leaf" />
            </div>
            <div>
              <p className="text-lg font-bold text-charcoal font-display">Report submitted</p>
              <p className="text-sm text-charcoal-light mt-1">Our team will review this within 24 hours. Thank you for helping keep StayPH safe.</p>
            </div>
            <p className="text-xs text-charcoal-light bg-warm-white-dark rounded-lg px-4 py-3">
              If 3 different users report the same listing, it will be automatically suspended pending review.
            </p>
            <button onClick={handleClose} className="w-full py-2.5 bg-coral text-white font-semibold rounded-xl text-sm hover:bg-coral-dark transition-colors">
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
            <p className="text-sm text-charcoal-light">What's wrong with this listing?</p>

            <div className="space-y-2">
              {REASONS.map(r => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setReason(r.value)}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                    reason === r.value
                      ? 'border-soft-red/50 bg-soft-red/5 text-charcoal'
                      : 'border-warm-white-dark hover:border-soft-red/30 text-charcoal'
                  }`}
                >
                  <p className="font-semibold">{r.label}</p>
                  <p className="text-xs text-charcoal-light mt-0.5">{r.description}</p>
                </button>
              ))}
            </div>

            <div>
              <label className="text-sm font-semibold text-charcoal mb-1.5 block">Additional details (optional)</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Tell us more about the issue…"
                rows={3}
                className="w-full text-sm border border-warm-white-dark rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-soft-red/30 focus:border-soft-red resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={!reason || isLoading}
              className="w-full py-2.5 bg-soft-red text-white font-semibold rounded-xl text-sm hover:bg-soft-red/90 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Submitting…' : 'Submit report'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
