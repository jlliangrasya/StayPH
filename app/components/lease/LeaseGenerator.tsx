'use client'

import { useState } from 'react'
import { FileText, Download, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { MOCK_LEASES } from '@/lib/mock-payments'
import type { LeaseAgreement } from '@/lib/types'
import { useAuth } from '@/lib/auth-context'

// ─── Lease Document Preview ───────────────────────────────────────────────────

function LeasePreview({ lease }: { lease: LeaseAgreement }) {
  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })

  const utilityLabels: Record<string, string> = {
    water: 'Water', electricity: 'Electricity', wifi: 'WiFi / Internet',
    laundry: 'Laundry', cooking: 'Cooking area', aircon: 'Air conditioning',
  }

  return (
    <div className="bg-white border border-warm-white-dark rounded-xl p-8 font-serif text-charcoal text-sm leading-relaxed space-y-6 shadow-inner">
      {/* Header */}
      <div className="text-center space-y-1 border-b border-warm-white-dark pb-6">
        <p className="text-xs text-charcoal-light uppercase tracking-widest">StayPH · Verified Lease Agreement</p>
        <h2 className="text-xl font-bold text-navy font-display">Boarding House Lease Contract</h2>
        <p className="text-xs text-charcoal-light">Generated on {formatDate(lease.created_at)}</p>
      </div>

      {/* Parties */}
      <div className="space-y-3">
        <p className="font-bold text-charcoal uppercase text-xs tracking-wide">Parties</p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <p className="text-xs text-charcoal-light font-semibold">LESSOR (Landlord)</p>
            <p className="font-semibold">{lease.landlord_name}</p>
            <p className="text-charcoal-light text-xs">{lease.landlord_phone ?? 'Phone not provided'}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-charcoal-light font-semibold">LESSEE (Tenant)</p>
            <p className="font-semibold">{lease.tenant_name}</p>
            <p className="text-charcoal-light text-xs">{lease.tenant_phone ?? 'Phone not provided'}</p>
          </div>
        </div>
      </div>

      {/* Property */}
      <div className="space-y-2">
        <p className="font-bold text-charcoal uppercase text-xs tracking-wide">Property</p>
        <p><span className="font-semibold">{lease.listing_title}</span></p>
        <p className="text-charcoal-light">{lease.listing_address}</p>
      </div>

      {/* Terms */}
      <div className="space-y-2">
        <p className="font-bold text-charcoal uppercase text-xs tracking-wide">Lease Terms</p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
          <div>
            <span className="text-charcoal-light">Lease start:</span>{' '}
            <span className="font-semibold">{formatDate(lease.lease_start)}</span>
          </div>
          <div>
            <span className="text-charcoal-light">Lease end:</span>{' '}
            <span className="font-semibold">{formatDate(lease.lease_end)}</span>
          </div>
          <div>
            <span className="text-charcoal-light">Monthly rent:</span>{' '}
            <span className="font-semibold">₱{lease.monthly_rent.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-charcoal-light">Security deposit:</span>{' '}
            <span className="font-semibold">₱{lease.deposit_amount.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-charcoal-light">Advance months:</span>{' '}
            <span className="font-semibold">{lease.advance_months} month{lease.advance_months !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>

      {/* Inclusions */}
      {lease.included_utilities.length > 0 && (
        <div className="space-y-2">
          <p className="font-bold text-charcoal uppercase text-xs tracking-wide">Included in Rent</p>
          <div className="flex flex-wrap gap-1.5">
            {lease.included_utilities.map(u => (
              <span key={u} className="text-xs bg-leaf/10 text-leaf border border-leaf/30 px-2.5 py-1 rounded-full font-medium">
                ✓ {utilityLabels[u] ?? u}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* House rules */}
      {lease.house_rules && (
        <div className="space-y-2">
          <p className="font-bold text-charcoal uppercase text-xs tracking-wide">House Rules</p>
          <p className="text-charcoal-light bg-warm-white-dark rounded-lg px-3 py-2.5 text-xs leading-relaxed">{lease.house_rules}</p>
        </div>
      )}

      {/* Standard clauses */}
      <div className="space-y-3 border-t border-warm-white-dark pt-4 text-xs text-charcoal-light leading-relaxed">
        <p className="font-bold text-charcoal uppercase tracking-wide">Standard Clauses</p>
        <p><span className="font-semibold text-charcoal">1. Payment.</span> Rent is due on the 5th day of each month. A grace period of 5 days is granted. Payments beyond the grace period incur a late fee of ₱100/day.</p>
        <p><span className="font-semibold text-charcoal">2. Deposit.</span> The security deposit is held in escrow by StayPH and released to the Lessor after the Lessee confirms move-in. Upon move-out, the deposit is refunded minus any legitimate deductions for damage beyond normal wear and tear.</p>
        <p><span className="font-semibold text-charcoal">3. Early termination.</span> Lessee must give 30 days written notice. Deposit is forfeited if the Lessee vacates without proper notice.</p>
        <p><span className="font-semibold text-charcoal">4. Disputes.</span> Any dispute between parties shall be mediated first through StayPH's dispute resolution process before escalating to any legal venue.</p>
        <p><span className="font-semibold text-charcoal">5. Modifications.</span> No alterations to the premises without written consent of the Lessor.</p>
      </div>

      {/* Signatures */}
      <div className="border-t border-warm-white-dark pt-6">
        <p className="font-bold text-charcoal uppercase text-xs tracking-wide mb-4">Signatures</p>
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-3">
            {lease.signed_by_tenant_at ? (
              <div className="space-y-0.5">
                <p className="text-xs text-leaf font-semibold">✅ Signed digitally</p>
                <p className="text-xs text-charcoal-light">{formatDate(lease.signed_by_tenant_at)}</p>
              </div>
            ) : (
              <div className="h-8 border-b border-charcoal/30" />
            )}
            <p className="text-xs text-charcoal-light">{lease.tenant_name}</p>
            <p className="text-xs text-charcoal-light">Lessee</p>
          </div>
          <div className="space-y-3">
            {lease.signed_by_landlord_at ? (
              <div className="space-y-0.5">
                <p className="text-xs text-leaf font-semibold">✅ Signed digitally</p>
                <p className="text-xs text-charcoal-light">{formatDate(lease.signed_by_landlord_at)}</p>
              </div>
            ) : (
              <div className="h-8 border-b border-charcoal/30" />
            )}
            <p className="text-xs text-charcoal-light">{lease.landlord_name}</p>
            <p className="text-xs text-charcoal-light">Lessor</p>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-charcoal-light pt-2 border-t border-warm-white-dark">
        Generated by StayPH · <span className="font-semibold">stayph.com</span> · This document serves as a binding lease agreement between the parties.
      </p>
    </div>
  )
}

// ─── Lease Generator Form ─────────────────────────────────────────────────────

interface LeaseGeneratorProps {
  listingId?: string
  listingTitle?: string
  listingAddress?: string
  monthlyRent?: number
  includedUtilities?: string[]
  houseRules?: string | null
  landlordId?: string
  landlordName?: string
  landlordPhone?: string | null
}

export default function LeaseGenerator({
  listingId = '00000000-0000-0000-0000-000000000001',
  listingTitle = "Tita Nena's Boarding House",
  listingAddress = '123 M. Velez St., Lahug, Cebu City',
  monthlyRent = 4500,
  includedUtilities = ['water', 'electricity', 'wifi'],
  houseRules = null,
  landlordId = 'landlord-001',
  landlordName = 'Nena Santos',
  landlordPhone = '09171234567',
}: LeaseGeneratorProps) {
  const { user } = useAuth()
  const [showForm, setShowForm] = useState(false)
  const [preview, setPreview] = useState<LeaseAgreement | null>(null)
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    tenantName: user?.full_name ?? '',
    tenantPhone: user?.phone ?? '',
    leaseStart: '',
    leaseEnd: '',
    depositMonths: 2,
    advanceMonths: 1,
  })

  function generateLease() {
    const lease: LeaseAgreement = {
      id: `lease-${Date.now()}`,
      listing_id: listingId,
      listing_title: listingTitle,
      listing_address: listingAddress,
      tenant_id: user?.id ?? 'guest',
      tenant_name: form.tenantName,
      tenant_phone: form.tenantPhone || null,
      landlord_id: landlordId,
      landlord_name: landlordName,
      landlord_phone: landlordPhone,
      lease_start: form.leaseStart,
      lease_end: form.leaseEnd,
      monthly_rent: monthlyRent,
      deposit_amount: monthlyRent * form.depositMonths,
      advance_months: form.advanceMonths,
      included_utilities: includedUtilities,
      house_rules: houseRules,
      status: 'draft',
      signed_by_tenant_at: null,
      signed_by_landlord_at: null,
      created_at: new Date().toISOString(),
    }
    setPreview(lease)
  }

  function saveLease() {
    if (!preview) return
    MOCK_LEASES.push({ ...preview, status: 'draft' })
    setSaved(true)
  }

  function mockDownload() {
    alert('In production, this generates and downloads a PDF of the lease agreement.')
  }

  const isFormValid = form.tenantName.trim() && form.leaseStart && form.leaseEnd

  if (!showForm && !preview) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="flex items-center gap-2 text-sm text-navy border border-navy/20 bg-navy/5 px-4 py-2.5 rounded-xl font-semibold hover:bg-navy/10 transition-colors"
      >
        <FileText size={16} /> Generate Lease Agreement
      </button>
    )
  }

  return (
    <div className="space-y-4">
      {!preview && (
        <div className="bg-white rounded-xl border border-warm-white-dark p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-charcoal font-display">Lease Agreement Details</h3>
            <button onClick={() => setShowForm(false)} className="text-xs text-charcoal-light hover:text-charcoal">
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="text-xs text-charcoal-light mb-1 block">Tenant full name *</label>
              <input
                value={form.tenantName}
                onChange={e => setForm(f => ({ ...f, tenantName: e.target.value }))}
                placeholder="e.g. Grace Anne Burila"
                className="w-full text-sm border border-warm-white-dark rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral"
              />
            </div>
            <div className="col-span-2">
              <label className="text-xs text-charcoal-light mb-1 block">Tenant phone number</label>
              <input
                value={form.tenantPhone}
                onChange={e => setForm(f => ({ ...f, tenantPhone: e.target.value }))}
                placeholder="09XX XXX XXXX"
                className="w-full text-sm border border-warm-white-dark rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral"
              />
            </div>
            <div>
              <label className="text-xs text-charcoal-light mb-1 block">Lease start *</label>
              <input
                type="date"
                value={form.leaseStart}
                onChange={e => setForm(f => ({ ...f, leaseStart: e.target.value }))}
                className="w-full text-sm border border-warm-white-dark rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral"
              />
            </div>
            <div>
              <label className="text-xs text-charcoal-light mb-1 block">Lease end *</label>
              <input
                type="date"
                value={form.leaseEnd}
                onChange={e => setForm(f => ({ ...f, leaseEnd: e.target.value }))}
                className="w-full text-sm border border-warm-white-dark rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral"
              />
            </div>
            <div>
              <label className="text-xs text-charcoal-light mb-1 block">Deposit (months)</label>
              <select
                value={form.depositMonths}
                onChange={e => setForm(f => ({ ...f, depositMonths: Number(e.target.value) }))}
                className="w-full text-sm border border-warm-white-dark rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral bg-white"
              >
                {[1,2,3].map(n => <option key={n} value={n}>{n} month{n > 1 ? 's' : ''} (₱{(monthlyRent * n).toLocaleString()})</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-charcoal-light mb-1 block">Advance (months)</label>
              <select
                value={form.advanceMonths}
                onChange={e => setForm(f => ({ ...f, advanceMonths: Number(e.target.value) }))}
                className="w-full text-sm border border-warm-white-dark rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral bg-white"
              >
                {[1,2,3].map(n => <option key={n} value={n}>{n} month{n > 1 ? 's' : ''} (₱{(monthlyRent * n).toLocaleString()})</option>)}
              </select>
            </div>
          </div>

          <div className="bg-warm-white-dark rounded-lg px-3 py-2.5 text-xs text-charcoal-light">
            Total due on move-in: <span className="font-bold text-charcoal">₱{(monthlyRent * (form.depositMonths + form.advanceMonths)).toLocaleString()}</span> ({form.depositMonths} deposit + {form.advanceMonths} advance)
          </div>

          <button
            onClick={generateLease}
            disabled={!isFormValid}
            className="w-full py-2.5 bg-navy text-white font-semibold rounded-xl text-sm hover:bg-navy/90 transition-colors disabled:opacity-50"
          >
            Preview Lease Agreement
          </button>
        </div>
      )}

      {preview && (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="font-bold text-charcoal font-display">Lease Agreement Preview</h3>
              <p className="text-xs text-charcoal-light">Review before saving or downloading.</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setPreview(null)} className="text-xs text-charcoal-light hover:text-charcoal border border-warm-white-dark px-3 py-1.5 rounded-lg">
                ← Edit
              </button>
              {!saved ? (
                <button
                  onClick={saveLease}
                  className="text-xs bg-leaf/10 text-leaf border border-leaf/30 px-3 py-1.5 rounded-lg font-semibold hover:bg-leaf/20 transition-colors flex items-center gap-1.5"
                >
                  <CheckCircle size={12} /> Save Draft
                </button>
              ) : (
                <span className="text-xs text-leaf font-semibold flex items-center gap-1">
                  <CheckCircle size={12} /> Saved
                </span>
              )}
              <button
                onClick={mockDownload}
                className="text-xs bg-navy text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-navy/90 transition-colors flex items-center gap-1.5"
              >
                <Download size={12} /> Download PDF
              </button>
            </div>
          </div>
          <LeasePreview lease={preview} />
        </div>
      )}
    </div>
  )
}
