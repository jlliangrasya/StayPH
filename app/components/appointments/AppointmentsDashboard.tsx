'use client'

import { useState } from 'react'
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, MessageSquare, MapPin } from 'lucide-react'
import { MOCK_APPOINTMENTS } from '@/lib/mock-phase2'
import { useAuth } from '@/lib/auth-context'
import type { Appointment, AppointmentStatus } from '@/lib/types'
import Link from 'next/link'

const STATUS_CONFIG: Record<AppointmentStatus, { label: string; color: string; icon: React.ReactNode }> = {
  pending:   { label: 'Awaiting confirmation', color: 'bg-amber/10 text-amber border-amber/30',         icon: <Clock size={12} /> },
  confirmed: { label: 'Confirmed',             color: 'bg-leaf/10 text-leaf border-leaf/30',            icon: <CheckCircle size={12} /> },
  cancelled: { label: 'Cancelled',             color: 'bg-soft-red/10 text-soft-red border-soft-red/30', icon: <XCircle size={12} /> },
  completed: { label: 'Completed',             color: 'bg-navy/8 text-navy border-navy/20',             icon: <CheckCircle size={12} /> },
  no_show:   { label: 'No-show',               color: 'bg-charcoal/10 text-charcoal border-charcoal/20', icon: <AlertCircle size={12} /> },
}

interface FeedbackModalProps {
  appointment: Appointment
  onSubmit: (feedback: string) => void
  onClose: () => void
}

function FeedbackModal({ appointment, onSubmit, onClose }: FeedbackModalProps) {
  const [text, setText] = useState('')
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-warm-white rounded-2xl shadow-2xl p-6 space-y-4">
        <h3 className="font-bold text-charcoal font-display">Post-visit feedback</h3>
        <p className="text-sm text-charcoal-light">How was your visit to <span className="font-semibold text-charcoal">{appointment.listing_title}</span>?</p>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Share what you noticed — was it as described? Any concerns?"
          rows={4}
          className="w-full text-sm border border-warm-white-dark rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral resize-none"
        />
        <div className="flex gap-3">
          <button
            onClick={() => { if (text.trim()) onSubmit(text.trim()) }}
            disabled={!text.trim()}
            className="flex-1 py-2.5 bg-coral text-white font-semibold rounded-xl text-sm hover:bg-coral-dark transition-colors disabled:opacity-50"
          >
            Submit feedback
          </button>
          <button onClick={onClose} className="px-4 py-2.5 text-sm text-charcoal-light hover:text-charcoal border border-warm-white-dark rounded-xl">
            Skip
          </button>
        </div>
      </div>
    </div>
  )
}

interface LandlordNotesModalProps {
  appointment: Appointment
  onSubmit: (notes: string) => void
  onClose: () => void
}

function LandlordNotesModal({ appointment, onSubmit, onClose }: LandlordNotesModalProps) {
  const [notes, setNotes] = useState(appointment.landlord_notes ?? '')
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-warm-white rounded-2xl shadow-2xl p-6 space-y-4">
        <h3 className="font-bold text-charcoal font-display">Add note for tenant</h3>
        <p className="text-sm text-charcoal-light">Confirm the viewing and optionally add a note for <span className="font-semibold text-charcoal">{appointment.other_user.full_name}</span>.</p>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="e.g. I'll be here from 8 AM. Just message me when you arrive."
          rows={3}
          className="w-full text-sm border border-warm-white-dark rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral resize-none"
        />
        <div className="flex gap-3">
          <button
            onClick={() => onSubmit(notes)}
            className="flex-1 py-2.5 bg-leaf text-white font-semibold rounded-xl text-sm hover:bg-leaf/90 transition-colors"
          >
            Confirm viewing
          </button>
          <button onClick={onClose} className="px-4 py-2.5 text-sm text-charcoal-light hover:text-charcoal border border-warm-white-dark rounded-xl">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AppointmentsDashboard() {
  const { user } = useAuth()
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS)
  const [feedbackFor, setFeedbackFor] = useState<Appointment | null>(null)
  const [confirmFor, setConfirmFor] = useState<Appointment | null>(null)
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming')

  if (!user) {
    return (
      <div className="text-center py-16 text-charcoal-light">
        <p className="text-lg font-semibold">Sign in to view your appointments</p>
      </div>
    )
  }

  function updateStatus(id: string, status: AppointmentStatus, extra?: Partial<Appointment>) {
    setAppointments(prev =>
      prev.map(a => a.id === id ? { ...a, status, ...extra } : a)
    )
  }

  function handleConfirm(appt: Appointment, notes: string) {
    updateStatus(appt.id, 'confirmed', { landlord_notes: notes || null })
    setConfirmFor(null)
  }

  function handleFeedback(appt: Appointment, feedback: string) {
    updateStatus(appt.id, 'completed', { post_visit_feedback: feedback })
    setFeedbackFor(null)
  }

  const isLandlord = user.role === 'landlord' || user.role === 'admin'
  const matched = appointments.filter(a =>
    isLandlord ? a.landlord_id === user.id : a.tenant_id === user.id
  )
  // Demo fallback: show all mock appointments when user has none (mock IDs don't match real user IDs)
  const userAppts = matched.length > 0 ? matched : appointments

  const now = new Date()
  const upcoming = userAppts.filter(a => ['pending', 'confirmed'].includes(a.status) && new Date(a.proposed_date) >= now)
  const past = userAppts.filter(a => !['pending', 'confirmed'].includes(a.status) || new Date(a.proposed_date) < now)

  const displayed = tab === 'upcoming' ? upcoming : past

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-navy">Viewing Appointments</h1>
        <p className="text-sm text-charcoal-light mt-1">Manage your property viewing schedule</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-warm-white-dark rounded-xl w-fit">
        {(['upcoming', 'past'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${
              tab === t ? 'bg-white text-charcoal shadow-sm' : 'text-charcoal-light hover:text-charcoal'
            }`}
          >
            {t} {t === 'upcoming' ? `(${upcoming.length})` : `(${past.length})`}
          </button>
        ))}
      </div>

      {displayed.length === 0 && (
        <div className="text-center py-16 text-charcoal-light">
          <Calendar size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-semibold">No {tab} appointments</p>
          {tab === 'upcoming' && (
            <p className="text-sm mt-1">Browse listings and request a viewing to get started.</p>
          )}
        </div>
      )}

      <div className="space-y-4">
        {displayed.map(appt => {
          const cfg = STATUS_CONFIG[appt.status]
          const date = new Date(appt.proposed_date)
          const isPast = date < now
          const isTenant = appt.tenant_id === user.id
          const isLandlordAppt = appt.landlord_id === user.id

          return (
            <div key={appt.id} className="bg-white rounded-xl border border-warm-white-dark p-5 space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="flex-1 min-w-0">
                  <Link href={`/listing/${appt.listing_id}`} className="font-semibold text-charcoal hover:text-coral text-sm transition-colors">
                    {appt.listing_title}
                  </Link>
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    <span className="flex items-center gap-1.5 text-xs text-charcoal-light">
                      <Calendar size={12} />
                      {date.toLocaleDateString('en-PH', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-charcoal-light">
                      <Clock size={12} />
                      {date.toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-xs text-charcoal-light mt-1">
                    {isTenant ? `With: ${appt.other_user.full_name}` : `Tenant: ${appt.other_user.full_name}`}
                  </p>
                </div>
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${cfg.color}`}>
                  {cfg.icon} {cfg.label}
                </span>
              </div>

              {/* Notes */}
              {appt.tenant_notes && (
                <div className="bg-warm-white-dark rounded-lg px-3 py-2.5 text-sm text-charcoal">
                  <span className="text-xs font-semibold text-charcoal-light block mb-0.5">Tenant notes</span>
                  {appt.tenant_notes}
                </div>
              )}
              {appt.landlord_notes && (
                <div className="bg-golden/10 border border-golden/30 rounded-lg px-3 py-2.5 text-sm text-charcoal">
                  <span className="text-xs font-semibold text-charcoal-light block mb-0.5">Landlord note</span>
                  {appt.landlord_notes}
                </div>
              )}
              {appt.post_visit_feedback && (
                <div className="bg-leaf/8 border border-leaf/20 rounded-lg px-3 py-2.5 text-sm text-charcoal">
                  <span className="text-xs font-semibold text-leaf block mb-0.5">Post-visit feedback</span>
                  {appt.post_visit_feedback}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 flex-wrap pt-1">
                {/* Landlord: confirm pending */}
                {appt.status === 'pending' && !isPast && (
                  <button
                    onClick={() => setConfirmFor(appt)}
                    className="text-xs bg-leaf/10 text-leaf border border-leaf/30 px-3 py-1.5 rounded-lg font-semibold hover:bg-leaf/20 transition-colors flex items-center gap-1.5"
                  >
                    <CheckCircle size={12} /> Confirm viewing
                  </button>
                )}

                {/* Either: cancel if pending/confirmed */}
                {['pending', 'confirmed'].includes(appt.status) && !isPast && (
                  <button
                    onClick={() => updateStatus(appt.id, 'cancelled')}
                    className="text-xs bg-soft-red/10 text-soft-red border border-soft-red/30 px-3 py-1.5 rounded-lg font-semibold hover:bg-soft-red/20 transition-colors flex items-center gap-1.5"
                  >
                    <XCircle size={12} /> Cancel
                  </button>
                )}

                {/* Tenant: leave feedback after confirmed + past */}
                {appt.status === 'confirmed' && isPast && isTenant && !appt.post_visit_feedback && (
                  <button
                    onClick={() => setFeedbackFor(appt)}
                    className="text-xs bg-coral/10 text-coral border border-coral/30 px-3 py-1.5 rounded-lg font-semibold hover:bg-coral/20 transition-colors flex items-center gap-1.5"
                  >
                    <MessageSquare size={12} /> Leave feedback
                  </button>
                )}

                {/* Mark no-show */}
                {appt.status === 'confirmed' && isPast && (
                  <button
                    onClick={() => updateStatus(appt.id, 'no_show')}
                    className="text-xs bg-charcoal/8 text-charcoal-light border border-charcoal/15 px-3 py-1.5 rounded-lg font-semibold hover:bg-charcoal/15 transition-colors flex items-center gap-1.5"
                  >
                    <AlertCircle size={12} /> Mark no-show
                  </button>
                )}

                <Link
                  href={`/listing/${appt.listing_id}`}
                  className="text-xs bg-warm-white-dark text-charcoal-light border border-warm-white-dark px-3 py-1.5 rounded-lg font-semibold hover:text-charcoal transition-colors flex items-center gap-1.5"
                >
                  <MapPin size={12} /> View listing
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      {feedbackFor && (
        <FeedbackModal
          appointment={feedbackFor}
          onSubmit={fb => handleFeedback(feedbackFor, fb)}
          onClose={() => setFeedbackFor(null)}
        />
      )}
      {confirmFor && (
        <LandlordNotesModal
          appointment={confirmFor}
          onSubmit={notes => handleConfirm(confirmFor, notes)}
          onClose={() => setConfirmFor(null)}
        />
      )}
    </div>
  )
}
