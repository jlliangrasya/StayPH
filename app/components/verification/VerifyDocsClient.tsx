'use client'

import { useState, useRef } from 'react'
import { Upload, CheckCircle, XCircle, Clock, FileText, AlertTriangle, ChevronDown } from 'lucide-react'
import type { VerificationDocument, VerificationDocType, VerificationDocOwner } from '@/lib/types'
import { MOCK_VERIFICATION_DOCS } from '@/lib/mock-phase3'
import { useAuth } from '@/lib/auth-context'

// ─── Config ───────────────────────────────────────────────────────────────────

const TENANT_DOC_TYPES: { value: VerificationDocType; label: string; hint: string }[] = [
  { value: 'gov_id',     label: 'Government ID',           hint: 'PhilSys, Passport, Driver\'s License, UMID' },
  { value: 'school_id',  label: 'School ID',                hint: 'Current academic year school ID' },
  { value: 'enrollment', label: 'Certificate of Registration', hint: 'COR or enrollment slip for current semester' },
  { value: 'company_id', label: 'Company ID',               hint: 'Valid employer-issued ID' },
  { value: 'coe',        label: 'Certificate of Employment', hint: 'Issued within the last 3 months' },
]

const LANDLORD_DOC_TYPES: { value: VerificationDocType; label: string; hint: string }[] = [
  { value: 'gov_id',        label: 'Government ID',         hint: 'PhilSys, Passport, Driver\'s License, UMID' },
  { value: 'tax_declaration', label: 'Tax Declaration',     hint: 'Most recent Amilyar / Real Property Tax' },
  { value: 'title',         label: 'Land/Property Title',   hint: 'TCT or CCT (Transfer Certificate of Title)' },
  { value: 'lease_contract', label: 'Lease Contract',       hint: 'If you are renting the property you are subletting' },
  { value: 'barangay_cert', label: 'Barangay Clearance',    hint: 'Business permit or barangay certification' },
]

const STATUS_CONFIG: Record<string, { icon: React.ReactNode; label: string; color: string; bg: string }> = {
  pending:  { icon: <Clock size={14} />,        label: 'Under Review', color: 'text-amber',     bg: 'bg-amber/10 border-amber/30' },
  approved: { icon: <CheckCircle size={14} />,  label: 'Approved',     color: 'text-leaf',      bg: 'bg-leaf/10 border-leaf/30' },
  rejected: { icon: <XCircle size={14} />,      label: 'Rejected',     color: 'text-soft-red',  bg: 'bg-soft-red/10 border-soft-red/30' },
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusPill({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status]
  if (!cfg) return null
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${cfg.color} ${cfg.bg}`}>
      {cfg.icon}
      {cfg.label}
    </span>
  )
}

function DocCard({ doc }: { doc: VerificationDocument }) {
  const DOC_LABELS: Record<string, string> = {
    gov_id: 'Government ID', school_id: 'School ID', enrollment: 'Certificate of Registration',
    company_id: 'Company ID', coe: 'Certificate of Employment', tax_declaration: 'Tax Declaration',
    title: 'Property Title', lease_contract: 'Lease Contract', barangay_cert: 'Barangay Clearance',
  }
  return (
    <div className="bg-white rounded-xl border border-warm-white-dark p-4 flex items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-navy/8 rounded-lg flex items-center justify-center shrink-0 text-navy">
          <FileText size={20} />
        </div>
        <div>
          <p className="font-semibold text-charcoal text-sm">{DOC_LABELS[doc.doc_type] ?? doc.doc_type}</p>
          <p className="text-xs text-charcoal-light mt-0.5">{doc.file_name}</p>
          {doc.listing_title && (
            <p className="text-xs text-charcoal-light mt-0.5">For: {doc.listing_title}</p>
          )}
          {doc.notes && <p className="text-xs text-charcoal/60 mt-1 italic">{doc.notes}</p>}
          {doc.rejection_reason && (
            <p className="text-xs text-soft-red mt-1 flex items-start gap-1">
              <AlertTriangle size={12} className="mt-0.5 shrink-0" />
              {doc.rejection_reason}
            </p>
          )}
          <p className="text-xs text-charcoal/40 mt-1.5">
            Submitted {new Date(doc.submitted_at).toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' })}
          </p>
        </div>
      </div>
      <StatusPill status={doc.status} />
    </div>
  )
}

// ─── Upload Form ──────────────────────────────────────────────────────────────

function UploadForm({ ownerType }: { ownerType: VerificationDocOwner }) {
  const docTypes = ownerType === 'tenant' ? TENANT_DOC_TYPES : LANDLORD_DOC_TYPES
  const [selectedType, setSelectedType] = useState<VerificationDocType>(docTypes[0].value)
  const [notes, setNotes] = useState('')
  const [fileName, setFileName] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const selectedConfig = docTypes.find(d => d.value === selectedType)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (f) setFileName(f.name)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!fileName) return
    // TODO: upload to Supabase Storage and insert into verification_documents
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setFileName(null)
    setNotes('')
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Document type select */}
      <div>
        <label className="block text-sm font-semibold text-charcoal mb-1.5">Document type</label>
        <div className="relative">
          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value as VerificationDocType)}
            className="w-full appearance-none bg-warm-white border border-warm-white-dark rounded-xl px-4 py-3 text-charcoal text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-colors"
          >
            {docTypes.map(d => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-light pointer-events-none" />
        </div>
        {selectedConfig && (
          <p className="text-xs text-charcoal-light mt-1">{selectedConfig.hint}</p>
        )}
      </div>

      {/* File upload */}
      <div>
        <label className="block text-sm font-semibold text-charcoal mb-1.5">Upload file</label>
        <div
          className="border-2 border-dashed border-warm-white-dark rounded-xl p-6 text-center cursor-pointer hover:border-coral/40 hover:bg-coral/3 transition-colors"
          onClick={() => fileRef.current?.click()}
        >
          {fileName ? (
            <div className="flex items-center justify-center gap-2 text-leaf">
              <CheckCircle size={20} />
              <span className="text-sm font-medium">{fileName}</span>
            </div>
          ) : (
            <>
              <Upload size={24} className="text-charcoal-light mx-auto mb-2" />
              <p className="text-sm text-charcoal-light">Click to upload or drag and drop</p>
              <p className="text-xs text-charcoal/40 mt-1">JPG, PNG, or PDF — max 10 MB</p>
            </>
          )}
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-semibold text-charcoal mb-1.5">Notes <span className="font-normal text-charcoal/50">(optional)</span></label>
        <input
          type="text"
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="e.g. PhilSys National ID issued 2023"
          className="w-full bg-warm-white border border-warm-white-dark rounded-xl px-4 py-3 text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-colors placeholder:text-charcoal/30"
        />
      </div>

      {submitted && (
        <div className="flex items-center gap-2 bg-leaf/10 border border-leaf/30 text-leaf rounded-xl px-4 py-3 text-sm font-semibold">
          <CheckCircle size={16} />
          Document submitted! Our team will review it within 1–2 business days.
        </div>
      )}

      <button
        type="submit"
        disabled={!fileName}
        className="w-full bg-coral text-white font-bold text-sm py-3 rounded-xl hover:bg-coral-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <Upload size={16} />
        Submit Document
      </button>
    </form>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function VerifyDocsClient() {
  const { user } = useAuth()
  const ownerType: VerificationDocOwner = (user?.role === 'landlord') ? 'landlord' : 'tenant'

  const myDocs = MOCK_VERIFICATION_DOCS.filter(d => d.owner_type === ownerType)

  const pending  = myDocs.filter(d => d.status === 'pending').length
  const approved = myDocs.filter(d => d.status === 'approved').length
  const rejected = myDocs.filter(d => d.status === 'rejected').length

  return (
    <div className="max-w-2xl mx-auto space-y-8">

      {/* Status summary */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Approved',     value: approved, color: 'text-leaf' },
          { label: 'Under Review', value: pending,  color: 'text-amber' },
          { label: 'Rejected',     value: rejected, color: 'text-soft-red' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-warm-white-dark px-4 py-3 text-center">
            <p className={`text-2xl font-bold font-display ${s.color}`}>{s.value}</p>
            <p className="text-xs text-charcoal-light mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Upload form */}
      <div className="bg-white rounded-2xl border border-warm-white-dark p-6">
        <h2 className="text-navy font-bold text-lg mb-1" style={{ fontFamily: 'var(--font-plus-jakarta)' }}>
          Submit a document
        </h2>
        <p className="text-charcoal-light text-sm mb-5">
          {ownerType === 'tenant'
            ? 'Verified tenants are more likely to be accepted by landlords.'
            : 'Property documents are required to get Admin Verified and Preferred badges.'}
        </p>
        <UploadForm ownerType={ownerType} />
      </div>

      {/* My documents */}
      {myDocs.length > 0 && (
        <div>
          <h2 className="text-navy font-bold text-lg mb-3" style={{ fontFamily: 'var(--font-plus-jakarta)' }}>
            My submitted documents
          </h2>
          <div className="space-y-3">
            {myDocs.map(doc => <DocCard key={doc.id} doc={doc} />)}
          </div>
        </div>
      )}

      {/* Info box */}
      <div className="bg-navy/5 border border-navy/15 rounded-2xl p-5">
        <h3 className="text-navy font-bold text-sm mb-2" style={{ fontFamily: 'var(--font-plus-jakarta)' }}>
          How document verification works
        </h3>
        <ul className="space-y-1.5">
          {[
            'Upload clear photos or scans of your documents.',
            'Our team reviews submissions within 1–2 business days.',
            'Approved documents unlock verification badges on your profile.',
            'Documents are stored securely and never shared with third parties.',
          ].map((step, i) => (
            <li key={i} className="text-sm text-charcoal flex items-start gap-2" style={{ fontFamily: 'var(--font-inter)' }}>
              <span className="text-coral font-bold shrink-0 mt-0.5">{i + 1}.</span>
              {step}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
