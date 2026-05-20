'use client'

import { useState } from 'react'
import { Star, MessageSquare, ShieldAlert } from 'lucide-react'
import type { Review, ReviewFormData } from '@/lib/types'
import { useAuth } from '@/lib/auth-context'
import { MOCK_REVIEWS } from '@/lib/mock-phase2'

// ─── Star Rating Input ────────────────────────────────────────────────────────

interface StarInputProps {
  value: number
  onChange: (v: number) => void
  label: string
}

function StarInput({ value, onChange, label }: StarInputProps) {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-charcoal-light">{label}</span>
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map(n => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            onMouseEnter={() => setHovered(n)}
            onMouseLeave={() => setHovered(0)}
            className="p-0.5"
          >
            <Star
              size={20}
              className={`transition-colors ${n <= (hovered || value) ? 'fill-golden text-golden' : 'text-warm-white-dark'}`}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Star Display ─────────────────────────────────────────────────────────────

function StarDisplay({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(n => (
        <Star
          key={n}
          size={size}
          className={n <= Math.round(rating) ? 'fill-golden text-golden' : 'text-warm-white-dark'}
        />
      ))}
    </div>
  )
}

// ─── Review Card ──────────────────────────────────────────────────────────────

interface ReviewCardProps {
  review: Review
  onRespond?: (reviewId: string, response: string) => void
  isLandlord?: boolean
}

export function ReviewCard({ review, onRespond, isLandlord }: ReviewCardProps) {
  const [responding, setResponding] = useState(false)
  const [responseText, setResponseText] = useState('')
  const [localResponse, setLocalResponse] = useState(review.landlord_response)

  const initials = review.tenant.full_name
    .split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  const subRatings = [
    { label: 'Cleanliness', value: review.rating_cleanliness },
    { label: 'Safety', value: review.rating_safety },
    { label: 'Landlord', value: review.rating_landlord },
    { label: 'WiFi', value: review.rating_wifi },
    { label: 'Utilities', value: review.rating_utilities },
  ].filter(r => r.value !== null) as { label: string; value: number }[]

  function handleRespond() {
    if (!responseText.trim()) return
    const response = responseText.trim()
    onRespond?.(review.id, response)
    setLocalResponse(response)
    setResponding(false)
    setResponseText('')
  }

  return (
    <div className="bg-white rounded-xl border border-warm-white-dark p-5 space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-full bg-navy text-white text-sm font-bold flex items-center justify-center shrink-0">
            {initials}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-charcoal text-sm">{review.tenant.full_name}</p>
              {review.tenant.is_id_verified && (
                <span className="text-xs bg-leaf/10 text-leaf px-1.5 py-0.5 rounded-full font-medium">🪪 Verified</span>
              )}
            </div>
            <p className="text-xs text-charcoal-light">
              {review.stay_from
                ? `Stayed ${new Date(review.stay_from).toLocaleDateString('en-PH', { month: 'short', year: 'numeric' })}${review.stay_to ? ` – ${new Date(review.stay_to).toLocaleDateString('en-PH', { month: 'short', year: 'numeric' })}` : ' – present'}`
                : 'Former tenant'}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-1.5">
            <StarDisplay rating={review.rating_overall} size={15} />
            <span className="text-sm font-bold text-charcoal">{review.rating_overall.toFixed(1)}</span>
          </div>
          {review.is_verified_stay && (
            <span className="text-xs bg-leaf/10 text-leaf px-1.5 py-0.5 rounded-full font-medium">✅ Verified stay</span>
          )}
        </div>
      </div>

      {/* Sub-ratings */}
      {subRatings.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1 py-2 border-t border-b border-warm-white-dark">
          {subRatings.map(r => (
            <div key={r.label} className="flex items-center justify-between gap-2">
              <span className="text-xs text-charcoal-light">{r.label}</span>
              <div className="flex items-center gap-1">
                <StarDisplay rating={r.value} size={11} />
                <span className="text-xs text-charcoal font-medium">{r.value}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Comment */}
      {review.comment && (
        <p className="text-sm text-charcoal leading-relaxed">{review.comment}</p>
      )}

      {/* Landlord response */}
      {localResponse && (
        <div className="bg-warm-white-dark rounded-lg px-4 py-3 border-l-2 border-coral">
          <p className="text-xs font-semibold text-coral mb-1">🏠 Landlord's response</p>
          <p className="text-sm text-charcoal">{localResponse}</p>
        </div>
      )}

      {/* Landlord respond button */}
      {isLandlord && !localResponse && !responding && (
        <button
          onClick={() => setResponding(true)}
          className="flex items-center gap-1.5 text-xs text-charcoal-light hover:text-coral transition-colors"
        >
          <MessageSquare size={13} /> Respond to this review
        </button>
      )}
      {responding && (
        <div className="space-y-2">
          <textarea
            value={responseText}
            onChange={e => setResponseText(e.target.value)}
            placeholder="Write a response to this review…"
            rows={3}
            className="w-full text-sm border border-warm-white-dark rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral resize-none"
          />
          <div className="flex gap-2">
            <button onClick={handleRespond} className="text-xs bg-coral text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-coral-dark transition-colors">Post response</button>
            <button onClick={() => setResponding(false)} className="text-xs text-charcoal-light hover:text-charcoal px-3 py-1.5">Cancel</button>
          </div>
        </div>
      )}

      <p className="text-xs text-charcoal-light">
        {new Date(review.created_at).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
    </div>
  )
}

// ─── Review Form ──────────────────────────────────────────────────────────────

interface ReviewFormProps {
  listingId: string
  onSubmit: (data: ReviewFormData) => void
  onCancel: () => void
}

const EMPTY_FORM: ReviewFormData = {
  rating_overall: 0,
  rating_cleanliness: 0,
  rating_safety: 0,
  rating_landlord: 0,
  rating_wifi: 0,
  rating_utilities: 0,
  comment: '',
  stay_from: '',
  stay_to: '',
}

export function ReviewForm({ onSubmit, onCancel }: ReviewFormProps) {
  const [form, setForm] = useState<ReviewFormData>(EMPTY_FORM)
  const [error, setError] = useState<string | null>(null)

  function setRating(key: keyof ReviewFormData, value: number) {
    setForm(f => ({ ...f, [key]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (form.rating_overall === 0) { setError('Please give an overall rating.'); return }
    if (!form.comment.trim()) { setError('Please write a comment.'); return }
    setError(null)
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-warm-white-dark p-5 space-y-4">
      <h3 className="font-bold text-charcoal font-display">Write a Review</h3>

      <StarInput value={form.rating_overall} onChange={v => setRating('rating_overall', v)} label="Overall rating *" />

      <div className="border-t border-warm-white-dark pt-3 space-y-2">
        <p className="text-xs font-semibold text-charcoal-light uppercase tracking-wide">Detailed ratings</p>
        <StarInput value={form.rating_cleanliness} onChange={v => setRating('rating_cleanliness', v)} label="Cleanliness" />
        <StarInput value={form.rating_safety} onChange={v => setRating('rating_safety', v)} label="Safety" />
        <StarInput value={form.rating_landlord} onChange={v => setRating('rating_landlord', v)} label="Landlord" />
        <StarInput value={form.rating_wifi} onChange={v => setRating('rating_wifi', v)} label="WiFi" />
        <StarInput value={form.rating_utilities} onChange={v => setRating('rating_utilities', v)} label="Utilities" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-charcoal-light mb-1 block">Move-in date</label>
          <input type="month" value={form.stay_from} onChange={e => setForm(f => ({ ...f, stay_from: e.target.value }))}
            className="w-full text-sm border border-warm-white-dark rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral" />
        </div>
        <div>
          <label className="text-xs text-charcoal-light mb-1 block">Move-out date (if applicable)</label>
          <input type="month" value={form.stay_to} onChange={e => setForm(f => ({ ...f, stay_to: e.target.value }))}
            className="w-full text-sm border border-warm-white-dark rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral" />
        </div>
      </div>

      <div>
        <label className="text-xs text-charcoal-light mb-1 block">Your review *</label>
        <textarea
          value={form.comment}
          onChange={e => setForm(f => ({ ...f, comment: e.target.value }))}
          placeholder="Share your experience — what was great, what could be better…"
          rows={4}
          className="w-full text-sm border border-warm-white-dark rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral resize-none"
        />
      </div>

      {error && <p className="text-sm text-soft-red">{error}</p>}

      <div className="flex gap-3">
        <button type="submit" className="flex-1 bg-coral text-white font-semibold py-2.5 rounded-xl text-sm hover:bg-coral-dark transition-colors">
          Submit review
        </button>
        <button type="button" onClick={onCancel} className="px-4 py-2.5 text-sm text-charcoal-light hover:text-charcoal border border-warm-white-dark rounded-xl">
          Cancel
        </button>
      </div>
    </form>
  )
}

// ─── Review List ──────────────────────────────────────────────────────────────

interface ReviewListProps {
  reviews: Review[]
  listingId: string
  averageRating: number
  reviewCount: number
}

export function ReviewList({ reviews, listingId, averageRating, reviewCount }: ReviewListProps) {
  const { user } = useAuth()
  const [showForm, setShowForm] = useState(false)
  const [localReviews, setLocalReviews] = useState<Review[]>(reviews)
  const [submitted, setSubmitted] = useState(false)

  // Only phone-verified users can write reviews; ID-verified gets "Verified stay" badge
  const canReview = user && user.is_phone_verified
  const alreadyReviewed = user ? localReviews.some(r => r.tenant_id === user.id) : false

  function handleSubmit(data: ReviewFormData) {
    if (!user) return
    const newReview: Review = {
      id: `review-${Date.now()}`,
      listing_id: listingId,
      tenant_id: user.id,
      tenant: { id: user.id, full_name: user.full_name, avatar_url: user.avatar_url, is_id_verified: user.is_id_verified },
      rating_overall: data.rating_overall,
      rating_cleanliness: data.rating_cleanliness || null,
      rating_safety: data.rating_safety || null,
      rating_landlord: data.rating_landlord || null,
      rating_wifi: data.rating_wifi || null,
      rating_utilities: data.rating_utilities || null,
      comment: data.comment,
      landlord_response: null,
      landlord_responded_at: null,
      stay_from: data.stay_from || null,
      stay_to: data.stay_to || null,
      is_verified_stay: user.is_id_verified,
      created_at: new Date().toISOString(),
    }
    // Persist to mock store so admin sees it
    MOCK_REVIEWS.push(newReview)
    setLocalReviews(r => [newReview, ...r])
    setShowForm(false)
    setSubmitted(true)
  }

  const subRatingAverages = [
    { label: 'Cleanliness', key: 'rating_cleanliness' as const },
    { label: 'Safety', key: 'rating_safety' as const },
    { label: 'Landlord', key: 'rating_landlord' as const },
    { label: 'WiFi', key: 'rating_wifi' as const },
    { label: 'Utilities', key: 'rating_utilities' as const },
  ].map(({ label, key }) => {
    const vals = localReviews.map(r => r[key]).filter((v): v is number => v !== null)
    return { label, avg: vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null }
  })

  return (
    <section className="space-y-5">
      {/* Summary */}
      <div className="flex items-start gap-6 flex-wrap">
        <div className="flex flex-col items-center">
          <span className="text-5xl font-bold text-charcoal font-display">{averageRating.toFixed(1)}</span>
          <StarDisplay rating={averageRating} size={18} />
          <span className="text-sm text-charcoal-light mt-1">{reviewCount} reviews</span>
        </div>
        <div className="flex-1 min-w-48 space-y-2">
          {subRatingAverages.filter(r => r.avg !== null).map(r => (
            <div key={r.label} className="flex items-center gap-3">
              <span className="text-xs text-charcoal-light w-20 shrink-0">{r.label}</span>
              <div className="flex-1 h-1.5 bg-warm-white-dark rounded-full overflow-hidden">
                <div className="h-full bg-golden rounded-full" style={{ width: `${((r.avg ?? 0) / 5) * 100}%` }} />
              </div>
              <span className="text-xs font-medium text-charcoal w-6 text-right">{r.avg?.toFixed(1)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Submission success */}
      {submitted && (
        <div className="bg-leaf/10 border border-leaf/30 rounded-xl px-4 py-3 text-sm text-leaf font-semibold">
          ✅ Your review has been submitted! It will appear once verified.
        </div>
      )}

      {/* Write review CTA */}
      {!submitted && !showForm && (
        <>
          {!user && (
            <p className="text-sm text-charcoal-light text-center py-3 border border-warm-white-dark rounded-xl">
              <span className="text-coral font-semibold">Sign in</span> to leave a review
            </p>
          )}
          {user && !canReview && (
            <div className="flex items-start gap-3 py-3 px-4 border border-amber/30 bg-amber/8 rounded-xl text-sm text-charcoal">
              <ShieldAlert size={16} className="text-amber shrink-0 mt-0.5" />
              <span>Verify your phone number to write a review.</span>
            </div>
          )}
          {canReview && alreadyReviewed && (
            <p className="text-sm text-charcoal-light text-center py-3 border border-warm-white-dark rounded-xl">
              You've already reviewed this listing.
            </p>
          )}
          {canReview && !alreadyReviewed && (
            <button
              onClick={() => setShowForm(true)}
              className="w-full py-3 border-2 border-dashed border-warm-white-dark rounded-xl text-sm text-charcoal-light hover:border-coral/40 hover:text-coral transition-colors"
            >
              + Write a review
            </button>
          )}
        </>
      )}

      {showForm && (
        <ReviewForm listingId={listingId} onSubmit={handleSubmit} onCancel={() => setShowForm(false)} />
      )}

      {/* Reviews */}
      <div className="space-y-4">
        {localReviews.map(r => <ReviewCard key={r.id} review={r} />)}
        {localReviews.length === 0 && (
          <p className="text-sm text-charcoal-light text-center py-6">No reviews yet. Be the first!</p>
        )}
      </div>
    </section>
  )
}
