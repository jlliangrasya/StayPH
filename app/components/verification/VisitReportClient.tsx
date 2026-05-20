'use client'

import { useState, useRef } from 'react'
import { Upload, CheckCircle, MapPin, Camera, ChevronDown } from 'lucide-react'
import type { VisitChecklist, VisitRecommendation, VisitType } from '@/lib/types'
import { MOCK_VISIT_REPORTS } from '@/lib/mock-phase3'
import Link from 'next/link'

// ─── Config ───────────────────────────────────────────────────────────────────

const CHECKLIST_ITEMS: { key: keyof VisitChecklist; label: string; description: string }[] = [
  { key: 'cleanliness',          label: 'Cleanliness',                description: 'Common areas, rooms, bathrooms are clean' },
  { key: 'ventilation',          label: 'Ventilation',                description: 'Rooms have adequate airflow and natural light' },
  { key: 'safety_exits',         label: 'Safety exits',               description: 'Clear emergency exits and fire extinguishers present' },
  { key: 'cctv_present',         label: 'CCTV / security',            description: 'Cameras or security guard on-site' },
  { key: 'water_supply',         label: 'Water supply',               description: '24/7 running water confirmed' },
  { key: 'electricity_stable',   label: 'Stable electricity',         description: 'No flickering, proper outlets in rooms' },
  { key: 'matches_photos',       label: 'Matches listing photos',     description: 'Property condition matches what is shown online' },
  { key: 'landlord_cooperative', label: 'Landlord cooperative',       description: 'Landlord was present and cooperative during visit' },
]

const RECOMMENDATION_OPTIONS: { value: VisitRecommendation; emoji: string; label: string; description: string }[] = [
  { value: 'preferred',         emoji: '⭐', label: 'Preferred',          description: 'Excellent property — grant Preferred badge' },
  { value: 'admin_verified',    emoji: '✅', label: 'Admin Verified',     description: 'Good property — meets verification standards' },
  { value: 'needs_improvement', emoji: '⚠️', label: 'Needs Improvement',  description: 'Issues found — notify landlord before badge grant' },
  { value: 'reject',            emoji: '❌', label: 'Reject',             description: 'Serious issues — recommend suspension' },
]

const EMPTY_CHECKLIST: VisitChecklist = {
  cleanliness: false, ventilation: false, safety_exits: false, cctv_present: false,
  water_supply: false, electricity_stable: false, matches_photos: false, landlord_cooperative: false,
}

// ─── Prior reports for this listing ──────────────────────────────────────────

function PriorReports({ listingId }: { listingId: string }) {
  const prior = MOCK_VISIT_REPORTS.filter(r => r.listing_id === listingId)
  if (prior.length === 0) return null

  const REC_LABEL: Record<string, { emoji: string; label: string }> = {
    preferred: { emoji: '⭐', label: 'Preferred' },
    admin_verified: { emoji: '✅', label: 'Admin Verified' },
    needs_improvement: { emoji: '⚠️', label: 'Needs Improvement' },
    reject: { emoji: '❌', label: 'Reject' },
  }

  return (
    <div className="bg-navy/5 border border-navy/15 rounded-2xl p-5 mb-6">
      <h3 className="text-navy font-bold text-sm mb-3" style={{ fontFamily: 'var(--font-plus-jakarta)' }}>
        Previous visit reports ({prior.length})
      </h3>
      <div className="space-y-2">
        {prior.map(r => {
          const rec = REC_LABEL[r.recommendation]
          return (
            <div key={r.id} className="flex items-start justify-between gap-3 text-sm py-2 border-b border-navy/10 last:border-0">
              <div>
                <p className="text-charcoal font-medium">
                  {rec.emoji} {rec.label} by {r.verifier_name}
                </p>
                <p className="text-xs text-charcoal-light mt-0.5">
                  {r.visit_type === 'physical' ? '🏘️ Physical' : '📹 Video'} · {new Date(r.visited_at).toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' })}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Main Form ────────────────────────────────────────────────────────────────

export default function VisitReportClient({
  listingId,
  listingTitle,
}: {
  listingId: string
  listingTitle: string | null
}) {
  const [visitType, setVisitType] = useState<VisitType>('physical')
  const [visitDate, setVisitDate] = useState('')
  const [visitTime, setVisitTime] = useState('')
  const [checklist, setChecklist] = useState<VisitChecklist>({ ...EMPTY_CHECKLIST })
  const [recommendation, setRecommendation] = useState<VisitRecommendation>('admin_verified')
  const [notes, setNotes] = useState('')
  const [photoNames, setPhotoNames] = useState<string[]>([])
  const [useGeo, setUseGeo] = useState(false)
  const [geoStatus, setGeoStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const photoRef = useRef<HTMLInputElement>(null)

  const passedCount = Object.values(checklist).filter(Boolean).length

  function toggleCheck(key: keyof VisitChecklist) {
    setChecklist(c => ({ ...c, [key]: !c[key] }))
  }

  function handlePhotos(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    setPhotoNames(files.map(f => f.name))
  }

  function handleGeolocate() {
    if (!navigator.geolocation) return
    setGeoStatus('loading')
    navigator.geolocation.getCurrentPosition(
      pos => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        setGeoStatus('done')
        setUseGeo(true)
      },
      () => setGeoStatus('error'),
    )
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO: insert into visit_reports via Supabase, upload photos to Storage
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-warm-white-dark p-8 text-center space-y-4">
        <div className="w-16 h-16 bg-leaf/10 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle size={32} className="text-leaf" />
        </div>
        <h2 className="text-navy font-bold text-xl" style={{ fontFamily: 'var(--font-plus-jakarta)' }}>
          Visit report submitted!
        </h2>
        <p className="text-charcoal-light text-sm" style={{ fontFamily: 'var(--font-inter)' }}>
          Your report has been sent to the admin team for review. They will act on your recommendation within 24 hours.
        </p>
        <div className="flex gap-3 justify-center pt-2">
          <Link
            href="/admin"
            className="bg-navy text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-navy/90 transition-colors"
          >
            Back to Admin
          </Link>
          <button
            onClick={() => {
              setSubmitted(false)
              setChecklist({ ...EMPTY_CHECKLIST })
              setNotes('')
              setPhotoNames([])
              setCoords(null)
              setGeoStatus('idle')
            }}
            className="bg-warm-white-dark text-charcoal text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-warm-white-dark/80 transition-colors"
          >
            New report
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PriorReports listingId={listingId} />

      {/* Visit type + date/time */}
      <div className="bg-white rounded-2xl border border-warm-white-dark p-6 space-y-4">
        <h2 className="text-navy font-bold text-base" style={{ fontFamily: 'var(--font-plus-jakarta)' }}>
          Visit details
        </h2>

        <div className="flex gap-3">
          {(['physical', 'video_call'] as VisitType[]).map(type => (
            <button
              key={type}
              type="button"
              onClick={() => setVisitType(type)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                visitType === type
                  ? 'bg-navy text-white border-navy'
                  : 'bg-warm-white text-charcoal border-warm-white-dark hover:border-navy/30'
              }`}
            >
              {type === 'physical' ? '🏘️ Physical visit' : '📹 Video call'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-semibold text-charcoal mb-1.5">Visit date</label>
            <input
              type="date"
              value={visitDate}
              onChange={e => setVisitDate(e.target.value)}
              required
              className="w-full bg-warm-white border border-warm-white-dark rounded-xl px-4 py-3 text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-charcoal mb-1.5">Time</label>
            <input
              type="time"
              value={visitTime}
              onChange={e => setVisitTime(e.target.value)}
              required
              className="w-full bg-warm-white border border-warm-white-dark rounded-xl px-4 py-3 text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-colors"
            />
          </div>
        </div>

        {/* Geotag */}
        {visitType === 'physical' && (
          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-charcoal">Geotag location</label>
              <button
                type="button"
                onClick={handleGeolocate}
                disabled={geoStatus === 'loading'}
                className="text-xs bg-navy/8 text-navy border border-navy/20 px-3 py-1.5 rounded-lg font-semibold hover:bg-navy/15 transition-colors flex items-center gap-1.5 disabled:opacity-50"
              >
                <MapPin size={12} />
                {geoStatus === 'loading' ? 'Getting location…' : geoStatus === 'done' ? 'Location captured' : 'Use my location'}
              </button>
            </div>
            {geoStatus === 'done' && coords && (
              <p className="text-xs text-leaf mt-1.5 flex items-center gap-1">
                <CheckCircle size={12} />
                {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}
              </p>
            )}
            {geoStatus === 'error' && (
              <p className="text-xs text-soft-red mt-1.5">Location access denied. Please enable location permissions.</p>
            )}
          </div>
        )}
      </div>

      {/* Checklist */}
      <div className="bg-white rounded-2xl border border-warm-white-dark p-6 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-navy font-bold text-base" style={{ fontFamily: 'var(--font-plus-jakarta)' }}>
            Verification checklist
          </h2>
          <span className={`text-sm font-semibold ${passedCount >= 6 ? 'text-leaf' : passedCount >= 4 ? 'text-amber' : 'text-soft-red'}`}>
            {passedCount} / {CHECKLIST_ITEMS.length} passed
          </span>
        </div>

        <div className="space-y-2">
          {CHECKLIST_ITEMS.map(item => (
            <label key={item.key} className="flex items-start gap-3 cursor-pointer group">
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 shrink-0 transition-all ${
                  checklist[item.key]
                    ? 'bg-leaf border-leaf'
                    : 'border-warm-white-dark group-hover:border-leaf/50'
                }`}
                onClick={() => toggleCheck(item.key)}
              >
                {checklist[item.key] && <CheckCircle size={12} className="text-white" />}
              </div>
              <div onClick={() => toggleCheck(item.key)}>
                <p className="text-sm font-semibold text-charcoal">{item.label}</p>
                <p className="text-xs text-charcoal-light">{item.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Photo upload */}
      <div className="bg-white rounded-2xl border border-warm-white-dark p-6 space-y-3">
        <h2 className="text-navy font-bold text-base" style={{ fontFamily: 'var(--font-plus-jakarta)' }}>
          Photos <span className="text-charcoal-light font-normal text-sm">(optional but strongly recommended)</span>
        </h2>
        <div
          className="border-2 border-dashed border-warm-white-dark rounded-xl p-6 text-center cursor-pointer hover:border-coral/40 hover:bg-coral/3 transition-colors"
          onClick={() => photoRef.current?.click()}
        >
          {photoNames.length > 0 ? (
            <div className="space-y-1">
              {photoNames.map((n, i) => (
                <p key={i} className="text-sm text-leaf font-medium flex items-center justify-center gap-2">
                  <Camera size={14} /> {n}
                </p>
              ))}
            </div>
          ) : (
            <>
              <Camera size={24} className="text-charcoal-light mx-auto mb-2" />
              <p className="text-sm text-charcoal-light">Upload geotagged photos from the visit</p>
              <p className="text-xs text-charcoal/40 mt-1">JPG or PNG — multiple files allowed</p>
            </>
          )}
        </div>
        <input
          ref={photoRef}
          type="file"
          accept="image/jpeg,image/png"
          multiple
          onChange={handlePhotos}
          className="hidden"
        />
      </div>

      {/* Recommendation */}
      <div className="bg-white rounded-2xl border border-warm-white-dark p-6 space-y-3">
        <h2 className="text-navy font-bold text-base" style={{ fontFamily: 'var(--font-plus-jakarta)' }}>
          Recommendation
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {RECOMMENDATION_OPTIONS.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setRecommendation(opt.value)}
              className={`p-3 rounded-xl border text-left transition-all ${
                recommendation === opt.value
                  ? 'border-coral bg-coral/5'
                  : 'border-warm-white-dark hover:border-coral/30 bg-warm-white'
              }`}
            >
              <p className="text-sm font-semibold text-charcoal">{opt.emoji} {opt.label}</p>
              <p className="text-xs text-charcoal-light mt-0.5">{opt.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="bg-white rounded-2xl border border-warm-white-dark p-6 space-y-3">
        <h2 className="text-navy font-bold text-base" style={{ fontFamily: 'var(--font-plus-jakarta)' }}>
          Verifier notes
        </h2>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          required
          rows={5}
          placeholder="Describe what you observed during the visit. Include any issues, notable features, or reasons for your recommendation…"
          className="w-full bg-warm-white border border-warm-white-dark rounded-xl px-4 py-3 text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-colors placeholder:text-charcoal/30 resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-coral text-white font-bold text-base py-4 rounded-xl hover:bg-coral-dark transition-colors flex items-center justify-center gap-2 shadow-sm"
      >
        <Upload size={18} />
        Submit Visit Report
      </button>
    </form>
  )
}
