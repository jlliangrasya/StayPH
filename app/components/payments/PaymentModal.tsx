'use client'

import { useState } from 'react'
import { X, CheckCircle, Smartphone, CreditCard, Shield, Copy, Check } from 'lucide-react'
import { MOCK_PAYMENTS, generateRef } from '@/lib/mock-payments'
import type { Payment, PaymentType } from '@/lib/types'
import { useAuth } from '@/lib/auth-context'

// ─── Config per payment type ──────────────────────────────────────────────────

const PAYMENT_CONFIG: Record<PaymentType, {
  title: string
  description: string
  amount: number
  method: 'gcash' | 'paymongo' | 'both'
  icon: string
  color: string
}> = {
  featured_listing: {
    title: 'Featured Listing',
    description: 'Your listing appears at the top of search results for 1 month.',
    amount: 299,
    method: 'gcash',
    icon: '⭐',
    color: 'text-golden',
  },
  preferred_visit: {
    title: 'Request Preferred Visit',
    description: 'A StayPH team member will visit your property within 5 business days. If it passes, you get the ⭐ Preferred badge. If not, full refund + written feedback.',
    amount: 499,
    method: 'gcash',
    icon: '🏘️',
    color: 'text-coral',
  },
  escrow_deposit: {
    title: 'Security Deposit (Escrow)',
    description: 'Your deposit is held securely by StayPH. It is released to the landlord only after you confirm move-in. Full refund if you cancel 7+ days before move-in.',
    amount: 0,
    method: 'paymongo',
    icon: '🔒',
    color: 'text-navy',
  },
}

const STAYPH_GCASH = '09XX XXX XXXX'
const STAYPH_GCASH_NAME = 'StayPH Collections'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  paymentType: PaymentType
  listingId: string
  listingTitle: string
  depositAmount?: number
  onSuccess?: (payment: Payment) => void
}

export default function PaymentModal({
  isOpen,
  onClose,
  paymentType,
  listingId,
  listingTitle,
  depositAmount,
  onSuccess,
}: PaymentModalProps) {
  const { user } = useAuth()
  const [step, setStep] = useState<'info' | 'pay' | 'confirm' | 'success'>('info')
  const [gcashNum, setGcashNum] = useState('')
  const [refNum, setRefNum] = useState('')
  const [cardNum, setCardNum] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'gcash' | 'card'>('gcash')

  if (!isOpen) return null

  const cfg = PAYMENT_CONFIG[paymentType]
  const amount = paymentType === 'escrow_deposit' ? (depositAmount ?? 0) : cfg.amount

  function copyGCash() {
    navigator.clipboard.writeText(STAYPH_GCASH.replace(/\s/g, ''))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function handleConfirm() {
    if (!user) return
    setIsLoading(true)
    await new Promise(r => setTimeout(r, 800))

    const payment: Payment = {
      id: `pay-${Date.now()}`,
      listing_id: listingId,
      listing_title: listingTitle,
      payer_id: user.id,
      payer_name: user.full_name,
      payment_type: paymentType,
      payment_method: paymentType === 'escrow_deposit' ? 'paymongo' : 'gcash',
      amount,
      status: paymentType === 'escrow_deposit' ? 'held' : 'paid',
      reference_number: refNum || generateRef(),
      gcash_number: paymentType !== 'escrow_deposit' ? gcashNum : null,
      paymongo_payment_id: paymentType === 'escrow_deposit' ? `pm_${Date.now()}` : null,
      notes: null,
      paid_at: new Date().toISOString(),
      released_at: null,
      refunded_at: null,
      created_at: new Date().toISOString(),
    }

    MOCK_PAYMENTS.push(payment)
    setIsLoading(false)
    setStep('success')
    onSuccess?.(payment)
  }

  function handleClose() {
    setStep('info')
    setGcashNum('')
    setRefNum('')
    setCardNum('')
    setExpiry('')
    setCvv('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative w-full max-w-md bg-warm-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-warm-white-dark sticky top-0 bg-warm-white">
          <div>
            <h2 className="text-lg font-bold font-display text-navy">
              {cfg.icon} {cfg.title}
            </h2>
            <p className="text-sm text-charcoal-light mt-0.5 truncate max-w-72">{listingTitle}</p>
          </div>
          <button onClick={handleClose} className="p-2 rounded-full hover:bg-warm-white-dark text-charcoal-light">
            <X size={20} />
          </button>
        </div>

        {/* Step: Info */}
        {step === 'info' && (
          <div className="px-6 py-5 space-y-4">
            <p className="text-sm text-charcoal leading-relaxed">{cfg.description}</p>

            <div className="bg-warm-white-dark rounded-xl px-4 py-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-charcoal">Amount</span>
              <span className="text-xl font-bold text-navy font-display">₱{amount.toLocaleString()}</span>
            </div>

            {paymentType === 'escrow_deposit' && (
              <div className="bg-navy/5 border border-navy/15 rounded-xl px-4 py-3 text-xs text-charcoal space-y-1.5">
                <p className="font-semibold text-navy">🔒 How escrow works</p>
                <p>Your deposit is held by StayPH — not paid directly to the landlord.</p>
                <p>The landlord only receives it after you confirm move-in.</p>
                <p className="text-leaf font-semibold">Cancel 7+ days before move-in → 100% refund.</p>
              </div>
            )}

            {paymentType === 'preferred_visit' && (
              <div className="bg-coral/5 border border-coral/20 rounded-xl px-4 py-3 text-xs text-charcoal space-y-1">
                <p className="font-semibold text-coral">🏘️ What happens next</p>
                <p>Our team schedules a visit within 5 business days.</p>
                <p>If the property passes → ⭐ Preferred badge applied immediately.</p>
                <p className="text-leaf font-semibold">If it fails → 100% refund + written improvement report.</p>
              </div>
            )}

            <button
              onClick={() => setStep('pay')}
              className="w-full py-3 bg-coral text-white font-semibold rounded-xl text-sm hover:bg-coral-dark transition-colors"
            >
              Proceed to payment
            </button>
          </div>
        )}

        {/* Step: Pay */}
        {step === 'pay' && (
          <div className="px-6 py-5 space-y-4">
            {/* GCash flow */}
            {paymentType !== 'escrow_deposit' && (
              <>
                <div className="bg-[#0066FF]/8 border border-[#0066FF]/20 rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Smartphone size={18} className="text-[#0066FF]" />
                    <p className="font-semibold text-charcoal text-sm">Send via GCash</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-charcoal-light">Send to:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-charcoal">{STAYPH_GCASH}</span>
                        <button onClick={copyGCash} className="text-[#0066FF] hover:text-[#0044cc] transition-colors">
                          {copied ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-charcoal-light">Name:</span>
                      <span className="font-semibold text-charcoal">{STAYPH_GCASH_NAME}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-charcoal-light">Amount:</span>
                      <span className="font-bold text-navy">₱{amount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-charcoal-light text-center">After sending, enter your GCash number and the transaction reference number below.</p>

                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-semibold text-charcoal mb-1.5 block">Your GCash number *</label>
                    <input
                      type="tel"
                      placeholder="09XX XXX XXXX"
                      value={gcashNum}
                      onChange={e => setGcashNum(e.target.value)}
                      className="w-full text-sm border border-warm-white-dark rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-charcoal mb-1.5 block">GCash reference number *</label>
                    <input
                      type="text"
                      placeholder="e.g. 1234567890"
                      value={refNum}
                      onChange={e => setRefNum(e.target.value)}
                      className="w-full text-sm border border-warm-white-dark rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral"
                    />
                  </div>
                </div>

                <button
                  disabled={!gcashNum.trim() || !refNum.trim()}
                  onClick={() => setStep('confirm')}
                  className="w-full py-2.5 bg-coral text-white font-semibold rounded-xl text-sm hover:bg-coral-dark transition-colors disabled:opacity-50"
                >
                  I've sent the payment →
                </button>
              </>
            )}

            {/* PayMongo / card flow */}
            {paymentType === 'escrow_deposit' && (
              <>
                {/* Method toggle */}
                <div className="flex gap-1 p-1 bg-warm-white-dark rounded-xl">
                  <button
                    onClick={() => setPaymentMethod('gcash')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all ${paymentMethod === 'gcash' ? 'bg-white text-charcoal shadow-sm' : 'text-charcoal-light'}`}
                  >
                    <Smartphone size={14} /> GCash
                  </button>
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all ${paymentMethod === 'card' ? 'bg-white text-charcoal shadow-sm' : 'text-charcoal-light'}`}
                  >
                    <CreditCard size={14} /> Card
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs text-charcoal-light">
                  <Shield size={12} className="text-leaf" />
                  <span>Secured by PayMongo · Your card is never stored by StayPH</span>
                </div>

                {paymentMethod === 'gcash' && (
                  <div className="space-y-3">
                    <div className="bg-[#0066FF]/8 border border-[#0066FF]/20 rounded-xl p-3 text-xs text-charcoal-light">
                      A GCash payment request for <span className="font-bold text-charcoal">₱{amount.toLocaleString()}</span> will be sent to your registered GCash number via PayMongo.
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-charcoal mb-1.5 block">GCash number *</label>
                      <input
                        type="tel"
                        placeholder="09XX XXX XXXX"
                        value={gcashNum}
                        onChange={e => setGcashNum(e.target.value)}
                        className="w-full text-sm border border-warm-white-dark rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-semibold text-charcoal mb-1.5 block">Card number *</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={cardNum}
                        onChange={e => setCardNum(e.target.value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim())}
                        maxLength={19}
                        className="w-full text-sm border border-warm-white-dark rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-semibold text-charcoal mb-1.5 block">Expiry *</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={expiry}
                          onChange={e => {
                            const v = e.target.value.replace(/\D/g, '').slice(0, 4)
                            setExpiry(v.length > 2 ? `${v.slice(0,2)}/${v.slice(2)}` : v)
                          }}
                          maxLength={5}
                          className="w-full text-sm border border-warm-white-dark rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-charcoal mb-1.5 block">CVV *</label>
                        <input
                          type="password"
                          placeholder="•••"
                          value={cvv}
                          onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                          maxLength={4}
                          className="w-full text-sm border border-warm-white-dark rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-warm-white-dark rounded-xl px-4 py-3 flex items-center justify-between">
                  <span className="text-sm text-charcoal-light">Total to pay</span>
                  <span className="text-xl font-bold text-navy font-display">₱{amount.toLocaleString()}</span>
                </div>

                <button
                  disabled={paymentMethod === 'gcash' ? !gcashNum.trim() : (!cardNum || !expiry || !cvv)}
                  onClick={() => setStep('confirm')}
                  className="w-full py-2.5 bg-navy text-white font-semibold rounded-xl text-sm hover:bg-navy/90 transition-colors disabled:opacity-50"
                >
                  Review payment
                </button>
              </>
            )}
          </div>
        )}

        {/* Step: Confirm */}
        {step === 'confirm' && (
          <div className="px-6 py-5 space-y-4">
            <div className="bg-amber/10 border border-amber/30 rounded-xl px-4 py-3 text-sm text-charcoal">
              ⚠️ Please review your payment details before confirming.
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b border-warm-white-dark">
                <span className="text-charcoal-light">Service</span>
                <span className="font-semibold text-charcoal">{cfg.title}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-warm-white-dark">
                <span className="text-charcoal-light">Listing</span>
                <span className="font-semibold text-charcoal text-right max-w-48">{listingTitle}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-warm-white-dark">
                <span className="text-charcoal-light">Amount</span>
                <span className="font-bold text-navy">₱{amount.toLocaleString()}</span>
              </div>
              {paymentType !== 'escrow_deposit' && gcashNum && (
                <div className="flex justify-between py-2 border-b border-warm-white-dark">
                  <span className="text-charcoal-light">GCash number</span>
                  <span className="font-semibold text-charcoal">{gcashNum}</span>
                </div>
              )}
              {paymentType !== 'escrow_deposit' && refNum && (
                <div className="flex justify-between py-2">
                  <span className="text-charcoal-light">Reference</span>
                  <span className="font-mono font-semibold text-charcoal">{refNum}</span>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleConfirm}
                disabled={isLoading}
                className="flex-1 py-2.5 bg-coral text-white font-semibold rounded-xl text-sm hover:bg-coral-dark transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Processing…' : 'Confirm payment'}
              </button>
              <button onClick={() => setStep('pay')} className="px-4 py-2.5 text-sm text-charcoal-light hover:text-charcoal border border-warm-white-dark rounded-xl">
                Back
              </button>
            </div>
          </div>
        )}

        {/* Step: Success */}
        {step === 'success' && (
          <div className="px-6 py-10 flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-leaf/15 flex items-center justify-center">
              <CheckCircle size={36} className="text-leaf" />
            </div>
            <div>
              <p className="text-lg font-bold text-charcoal font-display">Payment received!</p>
              <p className="text-sm text-charcoal-light mt-1">
                {paymentType === 'featured_listing' && 'Your listing will be featured in search results within 24 hours.'}
                {paymentType === 'preferred_visit' && 'Our team will contact you within 2 business days to schedule the visit.'}
                {paymentType === 'escrow_deposit' && 'Your deposit is held securely. The landlord will be notified. Confirm move-in to release payment.'}
              </p>
            </div>
            <div className="bg-warm-white-dark rounded-xl px-4 py-3 text-sm text-charcoal w-full text-left space-y-1">
              <p><span className="font-semibold">Amount:</span> ₱{amount.toLocaleString()}</p>
              <p><span className="font-semibold">Status:</span> {paymentType === 'escrow_deposit' ? '🔒 Held in escrow' : '✅ Paid'}</p>
              <p className="text-xs text-charcoal-light mt-1">A confirmation has been logged to your payment history.</p>
            </div>
            <button onClick={handleClose} className="w-full py-2.5 bg-coral text-white font-semibold rounded-xl text-sm hover:bg-coral-dark transition-colors">
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
