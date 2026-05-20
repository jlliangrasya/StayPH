'use client'

import { useState } from 'react'
import { X, Calendar, Clock, CheckCircle } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { MOCK_APPOINTMENTS } from '@/lib/mock-phase2'

interface RequestViewingModalProps {
  isOpen: boolean
  onClose: () => void
  listingId: string
  listingTitle: string
  landlordId: string
  landlordName: string
  onAuthRequired: () => void
}

export default function RequestViewingModal({
  isOpen,
  onClose,
  listingId,
  listingTitle,
  landlordId,
  landlordName,
  onAuthRequired,
}: RequestViewingModalProps) {
  const { user } = useAuth()
  const [date, setDate] = useState('')
  const [time, setTime] = useState('09:00')
  const [notes, setNotes] = useState('')
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
    if (!date || !user) return
    setIsLoading(true)
    await new Promise(r => setTimeout(r, 500))

    MOCK_APPOINTMENTS.push({
      id: `appt-${Date.now()}`,
      listing_id: listingId,
      listing_title: listingTitle,
      tenant_id: user.id,
      landlord_id: landlordId,
      other_user: { id: landlordId, full_name: landlordName, avatar_url: null },
      proposed_date: `${date}T${time}:00Z`,
      status: 'pending',
      tenant_notes: notes || null,
      landlord_notes: null,
      post_visit_feedback: null,
      created_at: new Date().toISOString(),
    })

    setIsLoading(false)
    setSubmitted(true)
  }

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-warm-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-warm-white-dark">
          <div>
            <h2 className="text-lg font-bold font-display text-navy">Request a Viewing</h2>
            <p className="text-sm text-charcoal-light mt-0.5 truncate max-w-72">{listingTitle}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-warm-white-dark text-charcoal-light">
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="px-6 py-10 flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-leaf/15 flex items-center justify-center">
              <CheckCircle size={36} className="text-leaf" />
            </div>
            <div>
              <p className="text-lg font-bold text-charcoal font-display">Request sent!</p>
              <p className="text-sm text-charcoal-light mt-1">
                {landlordName} will confirm or propose another time. You'll be notified when they respond.
              </p>
            </div>
            <div className="bg-warm-white-dark rounded-xl px-4 py-3 text-sm text-charcoal w-full text-left">
              <p><span className="font-semibold">Date:</span> {new Date(`${date}T${time}`).toLocaleDateString('en-PH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p><span className="font-semibold">Time:</span> {new Date(`${date}T${time}`).toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            <p className="text-xs text-charcoal-light">Both you and the landlord are verified — your contact details will be shared after confirmation.</p>
            <button onClick={onClose} className="w-full py-2.5 bg-coral text-white font-semibold rounded-xl text-sm hover:bg-coral-dark transition-colors">
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
            <div className="bg-golden/10 border border-golden/30 rounded-xl px-4 py-3 text-sm text-charcoal">
              📋 Both identities are verified before meeting. The landlord's phone number will be shared only after they confirm.
            </div>

            <div>
              <label className="text-sm font-semibold text-charcoal mb-1.5 block">
                <Calendar size={14} className="inline mr-1.5 text-charcoal-light" />
                Preferred date *
              </label>
              <input
                type="date"
                min={minDate}
                value={date}
                onChange={e => setDate(e.target.value)}
                required
                className="w-full text-sm border border-warm-white-dark rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-charcoal mb-1.5 block">
                <Clock size={14} className="inline mr-1.5 text-charcoal-light" />
                Preferred time *
              </label>
              <select
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-full text-sm border border-warm-white-dark rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral bg-white"
              >
                {['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'].map(t => {
                  const [h, m] = t.split(':').map(Number)
                  const label = new Date(2000, 0, 1, h, m).toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' })
                  return <option key={t} value={t}>{label}</option>
                })}
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-charcoal mb-1.5 block">Notes for the landlord (optional)</label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="e.g. I'll be coming with my mom. We'd like to see the available rooms."
                rows={3}
                className="w-full text-sm border border-warm-white-dark rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !date}
              className="w-full py-2.5 bg-coral text-white font-semibold rounded-xl text-sm hover:bg-coral-dark transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Sending request…' : 'Send viewing request'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
