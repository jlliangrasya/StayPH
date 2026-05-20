'use client'

import { useState } from 'react'
import {
  CheckCircle, XCircle, Clock, Eye, AlertTriangle,
  LayoutDashboard, FileText, ClipboardList, ScanSearch,
} from 'lucide-react'
import { MOCK_LISTINGS } from '@/lib/mock-data'
import { MOCK_REPORTS } from '@/lib/mock-phase2'
import {
  MOCK_VERIFICATION_DOCS,
  MOCK_VISIT_REPORTS,
  FLAGGED_PHOTO_LISTINGS,
} from '@/lib/mock-phase3'
import type {
  Report, ReportStatus, ListingStatus,
  VerificationDocument, VerificationDocStatus,
} from '@/lib/types'
import { BadgeRow } from '@/components/listing/TrustBadges'
import Link from 'next/link'

type AdminTab = 'listings' | 'reports' | 'id_docs' | 'property_docs' | 'visit_reports'

// ─── Status chip ──────────────────────────────────────────────────────────────

function StatusChip({ status }: { status: string }) {
  const map: Record<string, string> = {
    active:        'bg-leaf/10 text-leaf border-leaf/30',
    pending:       'bg-amber/10 text-amber border-amber/30',
    draft:         'bg-navy/8 text-navy border-navy/20',
    suspended:     'bg-soft-red/10 text-soft-red border-soft-red/30',
    inactive:      'bg-charcoal-light/10 text-charcoal-light border-charcoal-light/20',
    reviewed:      'bg-navy/8 text-navy border-navy/20',
    resolved:      'bg-leaf/10 text-leaf border-leaf/30',
    dismissed:     'bg-charcoal-light/10 text-charcoal-light border-charcoal-light/20',
    approved:      'bg-leaf/10 text-leaf border-leaf/30',
    rejected:      'bg-soft-red/10 text-soft-red border-soft-red/30',
  }
  return (
    <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border capitalize ${map[status] ?? ''}`}>
      {status === 'pending' ? 'Under Review' : status}
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
                {FLAGGED_PHOTO_LISTINGS.has(listing.id) && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold bg-soft-red/10 text-soft-red border border-soft-red/30 px-2 py-0.5 rounded-full">
                    <ScanSearch size={11} /> Stolen photo flag
                  </span>
                )}
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

// ─── Verification Docs Queue (shared for ID + Property docs) ─────────────────

const DOC_LABELS: Record<string, string> = {
  gov_id: 'Government ID', school_id: 'School ID', enrollment: 'Certificate of Registration',
  company_id: 'Company ID', coe: 'Certificate of Employment', tax_declaration: 'Tax Declaration',
  title: 'Property Title', lease_contract: 'Lease Contract', barangay_cert: 'Barangay Clearance',
}

function VerificationDocsQueue({ ownerType }: { ownerType: 'tenant' | 'landlord' }) {
  const [docs, setDocs] = useState<VerificationDocument[]>(
    MOCK_VERIFICATION_DOCS.filter(d => d.owner_type === ownerType)
  )
  const [rejectInput, setRejectInput] = useState<Record<string, string>>({})
  const [showRejectFor, setShowRejectFor] = useState<string | null>(null)

  function setDocStatus(id: string, status: VerificationDocStatus, reason?: string) {
    // TODO: update via Supabase
    setDocs(ds => ds.map(d => d.id === id ? { ...d, status, rejection_reason: reason ?? d.rejection_reason } : d))
    setShowRejectFor(null)
  }

  if (docs.length === 0) {
    return <p className="text-sm text-charcoal-light text-center py-12">No documents to review.</p>
  }

  return (
    <div className="space-y-3">
      {docs.map(doc => (
        <div key={doc.id} className="bg-white rounded-xl border border-warm-white-dark p-4 space-y-3">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="flex-1 min-w-0 flex items-start gap-3">
              <div className="w-10 h-10 bg-navy/8 rounded-lg flex items-center justify-center shrink-0 text-navy mt-0.5">
                <FileText size={18} />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-charcoal">{DOC_LABELS[doc.doc_type] ?? doc.doc_type}</span>
                  <StatusChip status={doc.status} />
                </div>
                <p className="text-xs text-charcoal-light mt-0.5">
                  {doc.owner_name}
                  {doc.listing_title && <> · <Link href={`/listing/${doc.listing_id ?? ''}`} className="text-coral hover:underline">{doc.listing_title}</Link></>}
                </p>
                <p className="text-xs text-charcoal-light">{doc.file_name}</p>
                {doc.notes && <p className="text-xs text-charcoal/60 italic mt-0.5">{doc.notes}</p>}
                {doc.rejection_reason && (
                  <p className="text-xs text-soft-red mt-1 flex items-start gap-1">
                    <AlertTriangle size={12} className="mt-0.5 shrink-0" />
                    {doc.rejection_reason}
                  </p>
                )}
                <p className="text-xs text-charcoal/40 mt-1">
                  Submitted {new Date(doc.submitted_at).toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' })}
                </p>
              </div>
            </div>
          </div>

          {doc.status === 'pending' && (
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setDocStatus(doc.id, 'approved')}
                className="text-xs bg-leaf/10 text-leaf border border-leaf/30 px-3 py-1.5 rounded-lg font-semibold hover:bg-leaf/20 transition-colors flex items-center gap-1.5"
              >
                <CheckCircle size={12} /> Approve
              </button>
              <button
                onClick={() => setShowRejectFor(showRejectFor === doc.id ? null : doc.id)}
                className="text-xs bg-soft-red/10 text-soft-red border border-soft-red/30 px-3 py-1.5 rounded-lg font-semibold hover:bg-soft-red/20 transition-colors flex items-center gap-1.5"
              >
                <XCircle size={12} /> Reject
              </button>
            </div>
          )}

          {showRejectFor === doc.id && (
            <div className="flex gap-2 items-start">
              <input
                type="text"
                placeholder="Reason for rejection (shown to user)…"
                value={rejectInput[doc.id] ?? ''}
                onChange={e => setRejectInput(r => ({ ...r, [doc.id]: e.target.value }))}
                className="flex-1 bg-warm-white border border-warm-white-dark rounded-lg px-3 py-2 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral"
              />
              <button
                onClick={() => setDocStatus(doc.id, 'rejected', rejectInput[doc.id])}
                className="text-xs bg-soft-red text-white px-3 py-2 rounded-lg font-semibold hover:bg-soft-red/80 transition-colors whitespace-nowrap"
              >
                Confirm Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Visit Reports Queue ──────────────────────────────────────────────────────

const CHECKLIST_LABELS: Record<string, string> = {
  cleanliness: 'Cleanliness',
  ventilation: 'Ventilation',
  safety_exits: 'Safety exits',
  cctv_present: 'CCTV',
  water_supply: 'Water supply',
  electricity_stable: 'Stable electricity',
  matches_photos: 'Matches listing photos',
  landlord_cooperative: 'Landlord cooperative',
}

const RECOMMENDATION_CONFIG: Record<string, { emoji: string; label: string; color: string }> = {
  preferred:         { emoji: '⭐', label: 'Preferred',         color: 'text-golden' },
  admin_verified:    { emoji: '✅', label: 'Admin Verified',    color: 'text-leaf' },
  needs_improvement: { emoji: '⚠️', label: 'Needs Improvement', color: 'text-amber' },
  reject:            { emoji: '❌', label: 'Reject',            color: 'text-soft-red' },
}

function VisitReportsQueue() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div className="space-y-3">
      {MOCK_VISIT_REPORTS.length === 0 && (
        <p className="text-sm text-charcoal-light text-center py-12">No visit reports yet.</p>
      )}
      {MOCK_VISIT_REPORTS.map(report => {
        const rec = RECOMMENDATION_CONFIG[report.recommendation]
        const checklist = Object.entries(report.checklist) as [string, boolean][]
        const passed = checklist.filter(([, v]) => v).length
        const isOpen = expanded === report.id

        return (
          <div key={report.id} className="bg-white rounded-xl border border-warm-white-dark p-4 space-y-3">
            {/* Header row */}
            <div
              className="flex items-start justify-between gap-3 flex-wrap cursor-pointer"
              onClick={() => setExpanded(isOpen ? null : report.id)}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <Link
                    href={`/listing/${report.listing_id}`}
                    className="font-semibold text-charcoal hover:text-coral text-sm transition-colors"
                    onClick={e => e.stopPropagation()}
                  >
                    {report.listing_title}
                  </Link>
                  <span className={`text-xs font-semibold ${rec.color}`}>{rec.emoji} {rec.label}</span>
                </div>
                <p className="text-xs text-charcoal-light mt-0.5">
                  {report.visit_type === 'physical' ? '🏘️ Physical visit' : '📹 Video call'} by {report.verifier_name}
                  {' · '}
                  {new Date(report.visited_at).toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' })}
                </p>
                <p className="text-xs text-charcoal-light">
                  Checklist: <span className={passed >= 6 ? 'text-leaf font-semibold' : 'text-amber font-semibold'}>{passed}/{checklist.length} passed</span>
                </p>
              </div>
              <span className="text-charcoal-light text-xs">{isOpen ? '▲ collapse' : '▼ expand'}</span>
            </div>

            {/* Expanded detail */}
            {isOpen && (
              <div className="space-y-4 pt-1 border-t border-warm-white-dark">
                {/* Checklist grid */}
                <div>
                  <p className="text-xs font-semibold text-charcoal-light uppercase tracking-wide mb-2">Checklist</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {checklist.map(([key, val]) => (
                      <div key={key} className={`flex items-center gap-2 text-xs px-2.5 py-1.5 rounded-lg ${val ? 'bg-leaf/8 text-leaf' : 'bg-soft-red/8 text-soft-red'}`}>
                        {val ? <CheckCircle size={12} /> : <XCircle size={12} />}
                        {CHECKLIST_LABELS[key] ?? key}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                {report.notes && (
                  <div>
                    <p className="text-xs font-semibold text-charcoal-light uppercase tracking-wide mb-1.5">Verifier notes</p>
                    <p className="text-sm text-charcoal bg-warm-white-dark rounded-lg px-3 py-2.5 leading-relaxed">{report.notes}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 flex-wrap">
                  {report.recommendation === 'preferred' && (
                    <button className="text-xs bg-golden/10 text-golden border border-golden/30 px-3 py-1.5 rounded-lg font-semibold hover:bg-golden/20 transition-colors">
                      ⭐ Grant Preferred
                    </button>
                  )}
                  {(report.recommendation === 'preferred' || report.recommendation === 'admin_verified') && (
                    <button className="text-xs bg-leaf/10 text-leaf border border-leaf/30 px-3 py-1.5 rounded-lg font-semibold hover:bg-leaf/20 transition-colors">
                      ✅ Mark Admin Verified
                    </button>
                  )}
                  {report.recommendation === 'needs_improvement' && (
                    <button className="text-xs bg-amber/10 text-amber border border-amber/30 px-3 py-1.5 rounded-lg font-semibold hover:bg-amber/20 transition-colors">
                      📩 Send improvement notice
                    </button>
                  )}
                  {report.recommendation === 'reject' && (
                    <button className="text-xs bg-soft-red/10 text-soft-red border border-soft-red/30 px-3 py-1.5 rounded-lg font-semibold hover:bg-soft-red/20 transition-colors">
                      🚫 Suspend listing
                    </button>
                  )}
                  <Link
                    href={`/visit-report/${report.listing_id}`}
                    className="text-xs bg-navy/8 text-navy border border-navy/20 px-3 py-1.5 rounded-lg font-semibold hover:bg-navy/15 transition-colors"
                  >
                    📋 View full report
                  </Link>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Main Admin Panel ─────────────────────────────────────────────────────────

export default function AdminPanel() {
  const [tab, setTab] = useState<AdminTab>('listings')

  const pendingListings    = MOCK_LISTINGS.filter(l => !l.is_admin_verified).length
  const pendingReports     = MOCK_REPORTS.filter(r => r.status === 'pending').length
  const pendingIdDocs      = MOCK_VERIFICATION_DOCS.filter(d => d.owner_type === 'tenant' && d.status === 'pending').length
  const pendingPropDocs    = MOCK_VERIFICATION_DOCS.filter(d => d.owner_type === 'landlord' && d.status === 'pending').length
  const pendingVisits      = MOCK_VISIT_REPORTS.filter(r => r.recommendation !== 'needs_improvement').length
  const flaggedPhotos      = FLAGGED_PHOTO_LISTINGS.size

  const TABS = [
    { key: 'listings'      as AdminTab, label: 'Listings',       badge: pendingListings },
    { key: 'reports'       as AdminTab, label: 'Reports',         badge: pendingReports },
    { key: 'id_docs'       as AdminTab, label: 'ID Docs',         badge: pendingIdDocs },
    { key: 'property_docs' as AdminTab, label: 'Property Docs',   badge: pendingPropDocs },
    { key: 'visit_reports' as AdminTab, label: 'Visit Reports',   badge: pendingVisits },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <LayoutDashboard size={24} className="text-coral" />
        <div>
          <h1 className="text-2xl font-bold font-display text-navy">Admin Panel</h1>
          <p className="text-sm text-charcoal-light">Verification queue, reports, and visit reports</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: 'Total listings',      value: MOCK_LISTINGS.length,                             color: 'text-navy' },
          { label: 'Awaiting review',      value: pendingListings,                                  color: 'text-amber' },
          { label: 'Open reports',         value: pendingReports,                                   color: 'text-soft-red' },
          { label: 'Preferred listings',   value: MOCK_LISTINGS.filter(l => l.is_preferred).length, color: 'text-golden' },
          { label: 'Pending docs',         value: pendingIdDocs + pendingPropDocs,                  color: 'text-amber' },
          { label: 'Photo flags',          value: flaggedPhotos,                                    color: 'text-soft-red' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-warm-white-dark px-4 py-3">
            <p className={`text-2xl font-bold font-display ${s.color}`}>{s.value}</p>
            <p className="text-xs text-charcoal-light mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 p-1 bg-warm-white-dark rounded-xl w-fit">
        {TABS.map(t => (
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
      {tab === 'listings'       && <ListingsQueue />}
      {tab === 'reports'        && <ReportsQueue />}
      {tab === 'id_docs'        && (
        <div>
          <p className="text-sm text-charcoal-light mb-4">Tenant identity documents submitted for verification.</p>
          <VerificationDocsQueue ownerType="tenant" />
        </div>
      )}
      {tab === 'property_docs'  && (
        <div>
          <p className="text-sm text-charcoal-light mb-4">Landlord property documents (title, tax declaration, barangay clearance, etc.).</p>
          <VerificationDocsQueue ownerType="landlord" />
        </div>
      )}
      {tab === 'visit_reports'  && (
        <div>
          <p className="text-sm text-charcoal-light mb-4">Field verifier visit reports — click a card to expand and act.</p>
          <VisitReportsQueue />
        </div>
      )}
    </div>
  )
}
