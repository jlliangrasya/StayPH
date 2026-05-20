'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, Clock, Flag, Eye, AlertTriangle, LayoutDashboard } from 'lucide-react'
import { MOCK_LISTINGS } from '@/lib/mock-data'
import { MOCK_REPORTS } from '@/lib/mock-phase2'
import type { Report, ReportStatus, ListingStatus } from '@/lib/types'
import { BadgeRow } from '@/components/listing/TrustBadges'
import Link from 'next/link'

type AdminTab = 'listings' | 'reports'

// ─── Status chip ──────────────────────────────────────────────────────────────

function StatusChip({ status }: { status: ListingStatus | ReportStatus }) {
  const map: Record<string, string> = {
    active:    'bg-leaf/10 text-leaf border-leaf/30',
    pending:   'bg-amber/10 text-amber border-amber/30',
    draft:     'bg-navy/8 text-navy border-navy/20',
    suspended: 'bg-soft-red/10 text-soft-red border-soft-red/30',
    inactive:  'bg-charcoal-light/10 text-charcoal-light border-charcoal-light/20',
    reviewed:  'bg-navy/8 text-navy border-navy/20',
    resolved:  'bg-leaf/10 text-leaf border-leaf/30',
    dismissed: 'bg-charcoal-light/10 text-charcoal-light border-charcoal-light/20',
  }
  return (
    <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border capitalize ${map[status] ?? ''}`}>
      {status}
    </span>
  )
}

// ─── Listings Queue ───────────────────────────────────────────────────────────

function ListingsQueue() {
  const [statuses, setStatuses] = useState<Record<string, ListingStatus>>(
    Object.fromEntries(MOCK_LISTINGS.map(l => [l.id, l.status]))
  )

  function setStatus(id: string, next: ListingStatus) {
    // TODO: update via Supabase
    setStatuses(s => ({ ...s, [id]: next }))
  }

  return (
    <div className="space-y-3">
      {MOCK_LISTINGS.map(listing => (
        <div key={listing.id} className="bg-white rounded-xl border border-warm-white-dark p-4 space-y-3">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <Link href={`/listing/${listing.id}`} className="font-semibold text-charcoal hover:text-coral text-sm transition-colors">
                  {listing.title}
                </Link>
                <StatusChip status={statuses[listing.id]} />
              </div>
              <p className="text-xs text-charcoal-light mt-0.5">{listing.address} · {listing.city}</p>
              <p className="text-xs text-charcoal-light">₱{listing.price_monthly.toLocaleString()}/mo · {listing.listing_type.replace('_', ' ')} · {listing.gender_policy.replace('_', ' ')}</p>
            </div>
            <div className="flex items-center gap-2">
              <Link href={`/listing/${listing.id}`} className="p-2 rounded-lg hover:bg-warm-white-dark text-charcoal-light hover:text-charcoal transition-colors" title="View listing">
                <Eye size={16} />
              </Link>
              <button onClick={() => setStatus(listing.id, 'active')} className="p-2 rounded-lg hover:bg-leaf/10 text-charcoal-light hover:text-leaf transition-colors" title="Approve">
                <CheckCircle size={16} />
              </button>
              <button onClick={() => setStatus(listing.id, 'suspended')} className="p-2 rounded-lg hover:bg-soft-red/10 text-charcoal-light hover:text-soft-red transition-colors" title="Suspend">
                <XCircle size={16} />
              </button>
            </div>
          </div>

          {/* Verification badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-charcoal-light font-medium">Badges:</span>
            <BadgeRow listing={listing} size="sm" />
            {!listing.is_admin_verified && !listing.is_id_verified && (
              <span className="text-xs text-amber flex items-center gap-1"><AlertTriangle size={12} /> No verification</span>
            )}
          </div>

          {/* Review actions */}
          <div className="flex gap-2 flex-wrap pt-1">
            <button className="text-xs bg-leaf/10 text-leaf border border-leaf/30 px-3 py-1.5 rounded-lg font-semibold hover:bg-leaf/20 transition-colors">
              ✅ Mark Admin Verified
            </button>
            <button className="text-xs bg-golden/10 text-golden border border-golden/30 px-3 py-1.5 rounded-lg font-semibold hover:bg-golden/20 transition-colors">
              ⭐ Tag as Preferred
            </button>
            <button className="text-xs bg-navy/8 text-navy border border-navy/20 px-3 py-1.5 rounded-lg font-semibold hover:bg-navy/15 transition-colors">
              📝 Request more docs
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Reports Queue ────────────────────────────────────────────────────────────

function ReportsQueue() {
  const [reports, setReports] = useState<Report[]>(MOCK_REPORTS)

  function setStatus(id: string, status: ReportStatus) {
    // TODO: update via Supabase
    setReports(rs => rs.map(r => r.id === id ? { ...r, status } : r))
  }

  const REASON_LABELS: Record<string, string> = {
    scam: '🚨 Scam',
    fake_photos: '🖼️ Fake photos',
    wrong_info: '❌ Wrong info',
    outside_payment: '💸 Outside payment',
    other: '📝 Other',
  }

  return (
    <div className="space-y-3">
      {reports.length === 0 && (
        <p className="text-sm text-charcoal-light text-center py-12">No reports to review.</p>
      )}
      {reports.map(report => (
        <div key={report.id} className="bg-white rounded-xl border border-warm-white-dark p-4 space-y-3">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold text-charcoal">{REASON_LABELS[report.reason]}</span>
                <StatusChip status={report.status} />
              </div>
              <p className="text-xs text-charcoal-light mt-0.5">
                Listing: <Link href={`/listing/${report.listing_id}`} className="text-coral hover:underline">{report.listing_title}</Link>
              </p>
              <p className="text-xs text-charcoal-light">
                Reported {new Date(report.created_at).toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' })}
              </p>
            </div>
          </div>

          {report.description && (
            <p className="text-sm text-charcoal bg-warm-white-dark rounded-lg px-3 py-2.5">{report.description}</p>
          )}

          <div className="flex gap-2 flex-wrap">
            <button onClick={() => setStatus(report.id, 'reviewed')} className="text-xs bg-navy/8 text-navy border border-navy/20 px-3 py-1.5 rounded-lg font-semibold hover:bg-navy/15 transition-colors flex items-center gap-1.5">
              <Clock size={12} /> Mark reviewed
            </button>
            <button onClick={() => setStatus(report.id, 'resolved')} className="text-xs bg-leaf/10 text-leaf border border-leaf/30 px-3 py-1.5 rounded-lg font-semibold hover:bg-leaf/20 transition-colors flex items-center gap-1.5">
              <CheckCircle size={12} /> Resolve
            </button>
            <button onClick={() => setStatus(report.id, 'dismissed')} className="text-xs bg-charcoal-light/10 text-charcoal-light border border-charcoal-light/20 px-3 py-1.5 rounded-lg font-semibold hover:bg-charcoal-light/20 transition-colors flex items-center gap-1.5">
              <XCircle size={12} /> Dismiss
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Main Admin Panel ─────────────────────────────────────────────────────────

export default function AdminPanel() {
  const [tab, setTab] = useState<AdminTab>('listings')

  const pendingListings = MOCK_LISTINGS.filter(l => !l.is_admin_verified).length
  const pendingReports = MOCK_REPORTS.filter(r => r.status === 'pending').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <LayoutDashboard size={24} className="text-coral" />
        <div>
          <h1 className="text-2xl font-bold font-display text-navy">Admin Panel</h1>
          <p className="text-sm text-charcoal-light">Listing verification and reports queue</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total listings', value: MOCK_LISTINGS.length, color: 'text-navy' },
          { label: 'Awaiting verification', value: pendingListings, color: 'text-amber' },
          { label: 'Open reports', value: pendingReports, color: 'text-soft-red' },
          { label: 'Preferred listings', value: MOCK_LISTINGS.filter(l => l.is_preferred).length, color: 'text-golden' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-warm-white-dark px-4 py-3">
            <p className={`text-2xl font-bold font-display ${s.color}`}>{s.value}</p>
            <p className="text-xs text-charcoal-light mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-warm-white-dark rounded-xl w-fit">
        {([
          { key: 'listings', label: 'Listing Queue', badge: pendingListings },
          { key: 'reports',  label: 'Reports',       badge: pendingReports },
        ] as const).map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              tab === t.key ? 'bg-white text-charcoal shadow-sm' : 'text-charcoal-light hover:text-charcoal'
            }`}
          >
            {t.label}
            {t.badge > 0 && (
              <span className="w-5 h-5 rounded-full bg-coral text-white text-xs font-bold flex items-center justify-center">
                {t.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === 'listings' ? <ListingsQueue /> : <ReportsQueue />}
    </div>
  )
}
