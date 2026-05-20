'use client'

import { useState } from 'react'
import { LayoutDashboard, CreditCard, FileText, ShieldCheck, CheckCircle, Clock, AlertTriangle } from 'lucide-react'
import { MOCK_PAYMENTS, MOCK_LEASES, MOCK_BACKGROUND_CHECKS } from '@/lib/mock-payments'
import { MOCK_USERS } from '@/lib/mock-phase2'
import { useAuth } from '@/lib/auth-context'
import BackgroundCheckModal from '@/components/background-check/BackgroundCheckModal'
import LeaseGenerator from '@/components/lease/LeaseGenerator'
import PaymentModal from '@/components/payments/PaymentModal'
import Link from 'next/link'
import type { Payment, LeaseAgreement, User } from '@/lib/types'

type Tab = 'payments' | 'leases' | 'background_checks'

const PAYMENT_TYPE_LABELS: Record<string, string> = {
  featured_listing: '⭐ Featured Listing',
  preferred_visit: '🏘️ Preferred Visit',
  escrow_deposit: '🔒 Escrow Deposit',
}

const PAYMENT_STATUS_COLORS: Record<string, string> = {
  paid:     'bg-leaf/10 text-leaf border-leaf/30',
  held:     'bg-navy/8 text-navy border-navy/20',
  released: 'bg-leaf/10 text-leaf border-leaf/30',
  refunded: 'bg-amber/10 text-amber border-amber/30',
  pending:  'bg-amber/10 text-amber border-amber/30',
  failed:   'bg-soft-red/10 text-soft-red border-soft-red/30',
}

const LEASE_STATUS_COLORS: Record<string, string> = {
  draft:            'bg-charcoal/8 text-charcoal-light border-charcoal/15',
  signed_tenant:    'bg-amber/10 text-amber border-amber/30',
  signed_landlord:  'bg-amber/10 text-amber border-amber/30',
  active:           'bg-leaf/10 text-leaf border-leaf/30',
  ended:            'bg-charcoal/8 text-charcoal-light border-charcoal/15',
  disputed:         'bg-soft-red/10 text-soft-red border-soft-red/30',
}

function StatusChip({ status, colorMap }: { status: string; colorMap: Record<string, string> }) {
  return (
    <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border capitalize ${colorMap[status] ?? ''}`}>
      {status.replace(/_/g, ' ')}
    </span>
  )
}

export default function LandlordDashboard() {
  const { user } = useAuth()
  const [tab, setTab] = useState<Tab>('payments')
  const [bgCheckTarget, setBgCheckTarget] = useState<User | null>(null)
  const [bgCheckListingId, setBgCheckListingId] = useState('')
  const [bgCheckListingTitle, setBgCheckListingTitle] = useState('')
  const [paymentModal, setPaymentModal] = useState<{ type: 'featured_listing' | 'preferred_visit'; listingId: string; listingTitle: string } | null>(null)

  if (!user) {
    return (
      <div className="text-center py-16 text-charcoal-light">
        <p className="text-lg font-semibold">Sign in to view your dashboard</p>
      </div>
    )
  }

  const payments = MOCK_PAYMENTS
  const leases = MOCK_LEASES
  const bgChecks = MOCK_BACKGROUND_CHECKS

  const tenantUsers = MOCK_USERS.filter(u => u.role === 'tenant')

  const TABS = [
    { key: 'payments' as Tab, label: 'Payments', count: payments.length, icon: <CreditCard size={15} /> },
    { key: 'leases' as Tab, label: 'Leases', count: leases.length, icon: <FileText size={15} /> },
    { key: 'background_checks' as Tab, label: 'Background Checks', count: bgChecks.length, icon: <ShieldCheck size={15} /> },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <LayoutDashboard size={24} className="text-coral" />
        <div>
          <h1 className="text-2xl font-bold font-display text-navy">Landlord Dashboard</h1>
          <p className="text-sm text-charcoal-light">Payments, leases, and tenant management</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-xl border border-warm-white-dark px-4 py-3">
          <p className="text-2xl font-bold text-navy font-display">
            ₱{payments.filter(p => p.status === 'paid' || p.status === 'released').reduce((s, p) => s + p.amount, 0).toLocaleString()}
          </p>
          <p className="text-xs text-charcoal-light mt-0.5">Total received</p>
        </div>
        <div className="bg-white rounded-xl border border-warm-white-dark px-4 py-3">
          <p className="text-2xl font-bold text-leaf font-display">{leases.filter(l => l.status === 'active').length}</p>
          <p className="text-xs text-charcoal-light mt-0.5">Active leases</p>
        </div>
        <div className="bg-white rounded-xl border border-warm-white-dark px-4 py-3">
          <p className="text-2xl font-bold text-amber font-display">
            {payments.filter(p => p.status === 'held').length}
          </p>
          <p className="text-xs text-charcoal-light mt-0.5">Held in escrow</p>
        </div>
      </div>

      {/* Quick actions */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setPaymentModal({ type: 'featured_listing', listingId: '00000000-0000-0000-0000-000000000001', listingTitle: "Tita Nena's Boarding House" })}
          className="text-sm bg-coral/10 text-coral border border-coral/30 px-4 py-2 rounded-xl font-semibold hover:bg-coral/20 transition-colors"
        >
          ⭐ Feature a listing
        </button>
        <button
          onClick={() => setPaymentModal({ type: 'preferred_visit', listingId: '00000000-0000-0000-0000-000000000001', listingTitle: "Tita Nena's Boarding House" })}
          className="text-sm bg-golden/10 text-golden border border-golden/30 px-4 py-2 rounded-xl font-semibold hover:bg-golden/20 transition-colors"
        >
          🏘️ Request Preferred visit
        </button>
        <Link
          href="/appointments"
          className="text-sm bg-navy/8 text-navy border border-navy/20 px-4 py-2 rounded-xl font-semibold hover:bg-navy/15 transition-colors"
        >
          📅 View appointments
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-warm-white-dark rounded-xl w-fit">
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              tab === t.key ? 'bg-white text-charcoal shadow-sm' : 'text-charcoal-light hover:text-charcoal'
            }`}
          >
            {t.icon} {t.label}
            {t.count > 0 && (
              <span className="w-5 h-5 rounded-full bg-navy/10 text-navy text-xs font-bold flex items-center justify-center">{t.count}</span>
            )}
          </button>
        ))}
      </div>

      {/* Payments Tab */}
      {tab === 'payments' && (
        <div className="space-y-3">
          {payments.length === 0 && (
            <p className="text-sm text-charcoal-light text-center py-12">No payments yet.</p>
          )}
          {payments.map(p => (
            <div key={p.id} className="bg-white rounded-xl border border-warm-white-dark p-4 flex items-center justify-between gap-3 flex-wrap">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-charcoal">{PAYMENT_TYPE_LABELS[p.payment_type] ?? p.payment_type}</span>
                  <StatusChip status={p.status} colorMap={PAYMENT_STATUS_COLORS} />
                </div>
                <p className="text-xs text-charcoal-light mt-0.5 truncate">{p.listing_title}</p>
                <p className="text-xs text-charcoal-light">
                  {p.payment_method === 'gcash' ? '📱 GCash' : '💳 PayMongo'} ·{' '}
                  {new Date(p.created_at).toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' })}
                </p>
                {p.reference_number && (
                  <p className="text-xs font-mono text-charcoal-light mt-0.5">Ref: {p.reference_number}</p>
                )}
              </div>
              <span className="text-lg font-bold text-navy font-display">₱{p.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      )}

      {/* Leases Tab */}
      {tab === 'leases' && (
        <div className="space-y-6">
          {leases.length === 0 && (
            <p className="text-sm text-charcoal-light text-center py-12">No lease agreements yet.</p>
          )}
          {leases.map(l => (
            <div key={l.id} className="bg-white rounded-xl border border-warm-white-dark p-4 space-y-3">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-charcoal">{l.listing_title}</span>
                    <StatusChip status={l.status} colorMap={LEASE_STATUS_COLORS} />
                  </div>
                  <p className="text-xs text-charcoal-light mt-0.5">
                    Tenant: <span className="font-semibold text-charcoal">{l.tenant_name}</span>
                  </p>
                  <p className="text-xs text-charcoal-light">
                    {new Date(l.lease_start).toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' })} →{' '}
                    {new Date(l.lease_end).toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-navy font-display">₱{l.monthly_rent.toLocaleString()}<span className="text-xs font-normal text-charcoal-light">/mo</span></p>
                  <p className="text-xs text-charcoal-light">Deposit: ₱{l.deposit_amount.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-charcoal-light">
                {l.signed_by_tenant_at
                  ? <span className="flex items-center gap-1 text-leaf"><CheckCircle size={11} /> Tenant signed</span>
                  : <span className="flex items-center gap-1 text-amber"><Clock size={11} /> Awaiting tenant</span>
                }
                {l.signed_by_landlord_at
                  ? <span className="flex items-center gap-1 text-leaf"><CheckCircle size={11} /> You signed</span>
                  : <span className="flex items-center gap-1 text-amber"><Clock size={11} /> Awaiting your signature</span>
                }
              </div>
            </div>
          ))}

          <div className="pt-2">
            <p className="text-xs font-semibold text-charcoal-light uppercase tracking-wide mb-3">Generate new lease</p>
            <LeaseGenerator />
          </div>
        </div>
      )}

      {/* Background Checks Tab */}
      {tab === 'background_checks' && (
        <div className="space-y-4">
          <div className="space-y-3">
            {bgChecks.length === 0 && (
              <p className="text-sm text-charcoal-light text-center py-8">No background checks yet.</p>
            )}
            {bgChecks.map(bc => (
              <div key={bc.id} className="bg-white rounded-xl border border-warm-white-dark p-4 space-y-2">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <p className="text-sm font-semibold text-charcoal">{bc.tenant_name}</p>
                    <p className="text-xs text-charcoal-light">{bc.listing_title}</p>
                    <p className="text-xs text-charcoal-light">
                      {new Date(bc.requested_at).toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {bc.status === 'completed' && !bc.has_criminal_record && !bc.has_eviction_history ? (
                      <span className="flex items-center gap-1 text-xs font-semibold text-leaf"><CheckCircle size={12} /> Clear</span>
                    ) : bc.status === 'completed' ? (
                      <span className="flex items-center gap-1 text-xs font-semibold text-soft-red"><AlertTriangle size={12} /> Issues found</span>
                    ) : (
                      <span className="text-xs text-charcoal-light">Pending</span>
                    )}
                    <span className="text-xs text-charcoal-light">₱{bc.amount}</span>
                  </div>
                </div>
                {bc.result_summary && (
                  <p className="text-xs text-charcoal-light bg-warm-white-dark rounded-lg px-3 py-2">{bc.result_summary}</p>
                )}
              </div>
            ))}
          </div>

          <div className="border-t border-warm-white-dark pt-4">
            <p className="text-xs font-semibold text-charcoal-light uppercase tracking-wide mb-3">Run a new background check</p>
            <p className="text-sm text-charcoal-light mb-3">Select a tenant to check before approving their application.</p>
            <div className="space-y-2">
              {tenantUsers.map(t => (
                <div key={t.id} className="flex items-center justify-between bg-white rounded-xl border border-warm-white-dark px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-full bg-navy text-white text-sm font-bold flex items-center justify-center">
                      {t.full_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-charcoal">{t.full_name}</p>
                      <div className="flex gap-1.5 mt-0.5">
                        {t.is_phone_verified && <span className="text-xs text-leaf">📱 Phone</span>}
                        {t.is_id_verified && <span className="text-xs text-leaf">🪪 ID</span>}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setBgCheckTarget(t)
                      setBgCheckListingId('00000000-0000-0000-0000-000000000001')
                      setBgCheckListingTitle("Tita Nena's Boarding House")
                    }}
                    className="text-xs bg-navy/8 text-navy border border-navy/20 px-3 py-1.5 rounded-lg font-semibold hover:bg-navy/15 transition-colors"
                  >
                    🔍 Check — ₱150
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {bgCheckTarget && (
        <BackgroundCheckModal
          isOpen={true}
          onClose={() => setBgCheckTarget(null)}
          tenant={bgCheckTarget}
          listingId={bgCheckListingId}
          listingTitle={bgCheckListingTitle}
        />
      )}

      {paymentModal && (
        <PaymentModal
          isOpen={true}
          onClose={() => setPaymentModal(null)}
          paymentType={paymentModal.type}
          listingId={paymentModal.listingId}
          listingTitle={paymentModal.listingTitle}
        />
      )}
    </div>
  )
}
