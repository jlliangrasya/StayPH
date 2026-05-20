'use client'

import { useState } from 'react'
import { X, ShieldCheck, Clock, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'
import { MOCK_BACKGROUND_CHECKS } from '@/lib/mock-payments'
import type { BackgroundCheck, User } from '@/lib/types'
import { useAuth } from '@/lib/auth-context'

interface BackgroundCheckModalProps {
  isOpen: boolean
  onClose: () => void
  tenant: Pick<User, 'id' | 'full_name' | 'is_id_verified' | 'is_phone_verified'>
  listingId: string
  listingTitle: string
}

const AMOUNT = 150

export default function BackgroundCheckModal({
  isOpen,
  onClose,
  tenant,
  listingId,
  listingTitle,
}: BackgroundCheckModalProps) {
  const { user } = useAuth()
  const [step, setStep] = useState<'info' | 'confirm' | 'processing' | 'result'>('info')
  const [result, setResult] = useState<BackgroundCheck | null>(null)

  if (!isOpen) return null

  const existing = MOCK_BACKGROUND_CHECKS.find(
    bc => bc.tenant_id === tenant.id && bc.listing_id === listingId
  )

  async function runCheck() {
    if (!user) return
    setStep('processing')
    await new Promise(r => setTimeout(r, 2000))

    const check: BackgroundCheck = {
      id: `bgcheck-${Date.now()}`,
      requested_by: user.id,
      requested_by_name: user.full_name,
      tenant_id: tenant.id,
      tenant_name: tenant.full_name,
      listing_id: listingId,
      listing_title: listingTitle,
      status: 'completed',
      amount: AMOUNT,
      result_summary: 'No criminal record found. No eviction history detected. Identity verified via PhilSys National ID.',
      has_criminal_record: false,
      has_eviction_history: false,
      id_verified: tenant.is_id_verified,
      notes: null,
      requested_at: new Date().toISOString(),
      completed_at: new Date().toISOString(),
    }

    MOCK_BACKGROUND_CHECKS.push(check)
    setResult(check)
    setStep('result')
  }

  function handleClose() {
    setStep('info')
    setResult(null)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative w-full max-w-md bg-warm-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-warm-white-dark">
          <div>
            <h2 className="text-lg font-bold font-display text-navy">🔍 Background Check</h2>
            <p className="text-sm text-charcoal-light mt-0.5">For: {tenant.full_name}</p>
          </div>
          <button onClick={handleClose} className="p-2 rounded-full hover:bg-warm-white-dark text-charcoal-light">
            <X size={20} />
          </button>
        </div>

        {/* Existing result shortcut */}
        {existing && existing.status === 'completed' && step === 'info' && (
          <div className="px-6 py-4">
            <div className="bg-leaf/10 border border-leaf/30 rounded-xl p-4 space-y-2">
              <p className="text-sm font-semibold text-leaf">✅ Background check already completed</p>
              <p className="text-xs text-charcoal-light">
                Checked on {new Date(existing.completed_at ?? existing.requested_at).toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' })}
              </p>
              <button
                onClick={() => { setResult(existing); setStep('result') }}
                className="text-xs text-coral hover:underline font-semibold"
              >
                View previous result →
              </button>
            </div>
          </div>
        )}

        {/* Step: Info */}
        {step === 'info' && (
          <div className="px-6 py-5 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-navy/8 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck size={22} className="text-navy" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-charcoal">{tenant.full_name}</p>
                <div className="flex gap-2">
                  {tenant.is_phone_verified && (
                    <span className="text-xs bg-leaf/10 text-leaf px-2 py-0.5 rounded-full font-medium">📱 Phone verified</span>
                  )}
                  {tenant.is_id_verified && (
                    <span className="text-xs bg-leaf/10 text-leaf px-2 py-0.5 rounded-full font-medium">🪪 ID verified</span>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2 text-sm text-charcoal-light">
              <p className="font-semibold text-charcoal">What this check covers:</p>
              <ul className="space-y-1.5 text-sm">
                {[
                  'Criminal record check (National Bureau of Investigation)',
                  'Eviction history (court records)',
                  'Identity verification against submitted ID',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-leaf mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-warm-white-dark rounded-xl px-4 py-3 flex items-center justify-between">
              <span className="text-sm text-charcoal-light">One-time fee</span>
              <span className="text-xl font-bold text-navy font-display">₱{AMOUNT}</span>
            </div>

            <p className="text-xs text-charcoal-light">
              Results are available within 1–2 minutes (mock). In production, NBI and court checks may take 1–3 business days.
            </p>

            {!existing && (
              <button
                onClick={() => setStep('confirm')}
                className="w-full py-2.5 bg-navy text-white font-semibold rounded-xl text-sm hover:bg-navy/90 transition-colors"
              >
                Run background check — ₱{AMOUNT}
              </button>
            )}
          </div>
        )}

        {/* Step: Confirm */}
        {step === 'confirm' && (
          <div className="px-6 py-5 space-y-4">
            <div className="bg-amber/10 border border-amber/30 rounded-xl px-4 py-3 text-sm text-charcoal">
              ⚠️ By proceeding, you authorize StayPH to conduct a background check on <span className="font-semibold">{tenant.full_name}</span> for the purpose of rental screening. The tenant's data is processed under our Privacy Policy.
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b border-warm-white-dark">
                <span className="text-charcoal-light">Tenant</span>
                <span className="font-semibold text-charcoal">{tenant.full_name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-warm-white-dark">
                <span className="text-charcoal-light">Listing</span>
                <span className="font-semibold text-charcoal text-right max-w-48">{listingTitle}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-charcoal-light">Fee</span>
                <span className="font-bold text-navy">₱{AMOUNT}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={runCheck}
                className="flex-1 py-2.5 bg-navy text-white font-semibold rounded-xl text-sm hover:bg-navy/90 transition-colors"
              >
                Confirm & run check
              </button>
              <button onClick={() => setStep('info')} className="px-4 py-2.5 text-sm text-charcoal-light hover:text-charcoal border border-warm-white-dark rounded-xl">
                Back
              </button>
            </div>
          </div>
        )}

        {/* Step: Processing */}
        {step === 'processing' && (
          <div className="px-6 py-16 flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-navy/10 flex items-center justify-center">
              <Clock size={32} className="text-navy animate-pulse" />
            </div>
            <div>
              <p className="text-lg font-bold text-charcoal font-display">Running check…</p>
              <p className="text-sm text-charcoal-light mt-1">Querying NBI records and eviction databases. This usually takes under 30 seconds.</p>
            </div>
          </div>
        )}

        {/* Step: Result */}
        {step === 'result' && result && (
          <div className="px-6 py-5 space-y-4">
            <div className={`rounded-xl p-4 space-y-1 ${
              !result.has_criminal_record && !result.has_eviction_history
                ? 'bg-leaf/10 border border-leaf/30'
                : 'bg-soft-red/10 border border-soft-red/30'
            }`}>
              <p className={`text-sm font-bold ${!result.has_criminal_record && !result.has_eviction_history ? 'text-leaf' : 'text-soft-red'}`}>
                {!result.has_criminal_record && !result.has_eviction_history ? '✅ Clear' : '⚠️ Issues found'}
              </p>
              <p className="text-xs text-charcoal">{result.result_summary}</p>
            </div>

            <div className="space-y-2">
              {[
                { label: 'Criminal record', value: result.has_criminal_record, good: false },
                { label: 'Eviction history', value: result.has_eviction_history, good: false },
                { label: 'ID verified', value: result.id_verified, good: true },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between py-2 border-b border-warm-white-dark">
                  <span className="text-sm text-charcoal-light">{item.label}</span>
                  {item.value === null ? (
                    <span className="text-xs text-charcoal-light">N/A</span>
                  ) : item.value === item.good ? (
                    <span className="flex items-center gap-1 text-xs text-leaf font-semibold"><CheckCircle size={13} /> {item.good ? 'Yes' : 'None found'}</span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs text-soft-red font-semibold"><XCircle size={13} /> {item.good ? 'Not verified' : 'Found'}</span>
                  )}
                </div>
              ))}
            </div>

            <p className="text-xs text-charcoal-light">
              Checked on {new Date(result.completed_at ?? result.requested_at).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <button onClick={handleClose} className="w-full py-2.5 bg-coral text-white font-semibold rounded-xl text-sm hover:bg-coral-dark transition-colors">
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
