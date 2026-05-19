"use client"

import { useState } from "react"
import { ChevronRight, ChevronLeft, Check, Upload, MapPin, Home, DollarSign, ListChecks, Camera, Eye } from "lucide-react"

const STEPS = [
  { id: 1, label: "Property",  icon: <Home size={18} /> },
  { id: 2, label: "Location",  icon: <MapPin size={18} /> },
  { id: 3, label: "Pricing",   icon: <DollarSign size={18} /> },
  { id: 4, label: "Details",   icon: <ListChecks size={18} /> },
  { id: 5, label: "Photos",    icon: <Camera size={18} /> },
  { id: 6, label: "Review",    icon: <Eye size={18} /> },
]

const AMENITY_OPTIONS = [
  { value: "wifi",        label: "WiFi" },
  { value: "water",       label: "Water" },
  { value: "electricity", label: "Electricity" },
  { value: "aircon",      label: "Aircon" },
  { value: "laundry",     label: "Laundry Area" },
  { value: "parking",     label: "Parking" },
  { value: "ref",         label: "Ref / Refrigerator" },
  { value: "tv",          label: "TV" },
]

const LEASE_OPTIONS = [
  { value: "monthly",    label: "Monthly" },
  { value: "semestral",  label: "Semestral (6 months)" },
  { value: "annual",     label: "Annual (1 year)" },
]

interface FormData {
  title: string
  description: string
  listing_type: string
  gender_policy: string
  total_slots: string
  address: string
  barangay: string
  city: string
  province: string
  price_monthly: string
  deposit_months: string
  advance_months: string
  lease_terms: string[]
  amenities: string[]
  has_curfew: boolean
  curfew_time: string
  cooking_allowed: boolean
  pets_allowed: boolean
  house_rules: string
  photos: File[]
}

const INITIAL: FormData = {
  title: "", description: "", listing_type: "", gender_policy: "", total_slots: "1",
  address: "", barangay: "", city: "Cebu City", province: "Cebu",
  price_monthly: "", deposit_months: "1", advance_months: "1", lease_terms: [],
  amenities: [], has_curfew: false, curfew_time: "10:00 PM", cooking_allowed: false,
  pets_allowed: false, house_rules: "", photos: [],
}

function inputClass(error?: boolean) {
  return `w-full border ${error ? "border-soft-red" : "border-warm-white-dark"} rounded-xl px-4 py-3 text-charcoal text-sm bg-white focus:outline-none focus:border-coral placeholder-charcoal/30`
}

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-navy font-semibold text-sm mb-1.5" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
      {children} {required && <span className="text-coral">*</span>}
    </label>
  )
}

export default function CreateListingForm() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormData>(INITIAL)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const set = (key: keyof FormData, value: unknown) =>
    setForm((f) => ({ ...f, [key]: value }))

  const toggleArray = (key: "amenities" | "lease_terms", value: string) => {
    setForm((f) => {
      const arr = f[key] as string[]
      return { ...f, [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value] }
    })
  }

  const validate = (s: number): boolean => {
    const e: typeof errors = {}
    if (s === 1) {
      if (!form.title.trim())         e.title = "Required"
      if (!form.listing_type)         e.listing_type = "Required"
      if (!form.gender_policy)        e.gender_policy = "Required"
    }
    if (s === 2) {
      if (!form.address.trim())       e.address = "Required"
      if (!form.city.trim())          e.city = "Required"
    }
    if (s === 3) {
      if (!form.price_monthly)        e.price_monthly = "Required"
      if (form.lease_terms.length === 0) e.lease_terms = "Select at least one"
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => {
    if (validate(step)) setStep((s) => Math.min(s + 1, STEPS.length))
  }
  const back = () => setStep((s) => Math.max(s - 1, 1))

  const handleSubmit = async () => {
    if (!validate(step)) return
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1200))
    setSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) return <SuccessScreen />

  return (
    <div className="max-w-2xl mx-auto">
      {/* Step indicator */}
      <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                  step > s.id
                    ? "bg-leaf text-white"
                    : step === s.id
                    ? "bg-coral text-white shadow-md"
                    : "bg-warm-white-dark text-charcoal/40"
                }`}
              >
                {step > s.id ? <Check size={16} /> : s.icon}
              </div>
              <span
                className={`text-xs font-medium hidden sm:block ${step === s.id ? "text-coral" : "text-charcoal/50"}`}
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`h-0.5 w-8 sm:w-16 mx-1 ${step > s.id ? "bg-leaf" : "bg-warm-white-dark"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="bg-white rounded-2xl border border-warm-white-dark p-6 sm:p-8">
        {step === 1 && <StepProperty form={form} set={set} errors={errors} />}
        {step === 2 && <StepLocation form={form} set={set} errors={errors} />}
        {step === 3 && <StepPricing form={form} set={set} toggleArray={toggleArray} errors={errors} />}
        {step === 4 && <StepDetails form={form} set={set} toggleArray={toggleArray} />}
        {step === 5 && <StepPhotos form={form} set={set} />}
        {step === 6 && <StepReview form={form} />}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-warm-white-dark">
          <button
            onClick={back}
            disabled={step === 1}
            className="flex items-center gap-2 text-charcoal font-semibold text-sm px-5 py-2.5 rounded-xl border border-warm-white-dark hover:border-coral hover:text-coral transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            <ChevronLeft size={16} /> Back
          </button>

          {step < STEPS.length ? (
            <button
              onClick={next}
              className="flex items-center gap-2 bg-coral text-white font-bold text-sm px-6 py-2.5 rounded-xl hover:bg-coral-dark transition-colors shadow-sm"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              Continue <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex items-center gap-2 bg-leaf text-white font-bold text-sm px-6 py-2.5 rounded-xl hover:bg-leaf-light transition-colors shadow-sm disabled:opacity-60"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              {submitting ? "Submitting…" : "Submit for Review"}
              {!submitting && <Check size={16} />}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Step components ─────────────────────────────────────────── */

function StepHeader({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-navy font-bold text-xl mb-1" style={{ fontFamily: "var(--font-plus-jakarta)" }}>{title}</h2>
      <p className="text-charcoal/60 text-sm" style={{ fontFamily: "var(--font-inter)" }}>{sub}</p>
    </div>
  )
}

function Error({ msg }: { msg?: string }) {
  if (!msg) return null
  return <p className="text-soft-red text-xs mt-1" style={{ fontFamily: "var(--font-inter)" }}>{msg}</p>
}

function StepProperty({ form, set, errors }: { form: FormData; set: (k: keyof FormData, v: unknown) => void; errors: Record<string, string> }) {
  return (
    <>
      <StepHeader title="Property Details" sub="Tell tenants what kind of space you're offering." />
      <div className="space-y-4">
        <div>
          <Label required>Listing Title</Label>
          <input className={inputClass(!!errors.title)} placeholder='e.g. "Tita Nena\'s Boarding House in Lahug"'
            value={form.title} onChange={(e) => set("title", e.target.value)} style={{ fontFamily: "var(--font-inter)" }} />
          <Error msg={errors.title} />
        </div>
        <div>
          <Label>Description</Label>
          <textarea className={inputClass()} rows={4} placeholder="Describe your property — location, feel, who it's best for…"
            value={form.description} onChange={(e) => set("description", e.target.value)}
            style={{ fontFamily: "var(--font-inter)" }} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label required>Room Type</Label>
            <select className={inputClass(!!errors.listing_type)} value={form.listing_type}
              onChange={(e) => set("listing_type", e.target.value)} style={{ fontFamily: "var(--font-inter)" }}>
              <option value="">Select…</option>
              <option value="bedspace">Bedspace</option>
              <option value="private_room">Private Room</option>
              <option value="studio">Studio</option>
              <option value="apartment">Apartment</option>
            </select>
            <Error msg={errors.listing_type} />
          </div>
          <div>
            <Label required>Gender Policy</Label>
            <select className={inputClass(!!errors.gender_policy)} value={form.gender_policy}
              onChange={(e) => set("gender_policy", e.target.value)} style={{ fontFamily: "var(--font-inter)" }}>
              <option value="">Select…</option>
              <option value="female_only">Female Only</option>
              <option value="male_only">Male Only</option>
              <option value="mixed">Mixed</option>
            </select>
            <Error msg={errors.gender_policy} />
          </div>
        </div>
        <div>
          <Label required>Total Slots / Beds Available</Label>
          <input type="number" min="1" className={inputClass()} value={form.total_slots}
            onChange={(e) => set("total_slots", e.target.value)} style={{ fontFamily: "var(--font-inter)" }} />
        </div>
      </div>
    </>
  )
}

function StepLocation({ form, set, errors }: { form: FormData; set: (k: keyof FormData, v: unknown) => void; errors: Record<string, string> }) {
  return (
    <>
      <StepHeader title="Location" sub="Exact address helps tenants find you and improves search visibility." />
      <div className="space-y-4">
        <div>
          <Label required>Street Address</Label>
          <input className={inputClass(!!errors.address)} placeholder='e.g. "123 M. Velez St."'
            value={form.address} onChange={(e) => set("address", e.target.value)} style={{ fontFamily: "var(--font-inter)" }} />
          <Error msg={errors.address} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Barangay</Label>
            <input className={inputClass()} placeholder='e.g. "Lahug"'
              value={form.barangay} onChange={(e) => set("barangay", e.target.value)} style={{ fontFamily: "var(--font-inter)" }} />
          </div>
          <div>
            <Label required>City</Label>
            <select className={inputClass(!!errors.city)} value={form.city}
              onChange={(e) => set("city", e.target.value)} style={{ fontFamily: "var(--font-inter)" }}>
              <option value="Cebu City">Cebu City</option>
              <option value="Mandaue City">Mandaue City</option>
              <option value="Lapu-Lapu City">Lapu-Lapu City</option>
              <option value="Talisay City">Talisay City</option>
              <option value="Davao City">Davao City</option>
              <option value="Iloilo City">Iloilo City</option>
              <option value="Bacolod City">Bacolod City</option>
            </select>
            <Error msg={errors.city} />
          </div>
        </div>
        <div className="bg-coral/5 border border-coral/15 rounded-xl p-4">
          <p className="text-charcoal text-sm" style={{ fontFamily: "var(--font-inter)" }}>
            📍 <strong>Map pin coming soon.</strong> After your listing is approved, the StayPH team will verify and pin your exact location on the map.
          </p>
        </div>
      </div>
    </>
  )
}

function StepPricing({ form, set, toggleArray, errors }: {
  form: FormData; set: (k: keyof FormData, v: unknown) => void
  toggleArray: (k: "lease_terms", v: string) => void; errors: Record<string, string>
}) {
  return (
    <>
      <StepHeader title="Pricing & Lease Terms" sub="Be transparent about costs — hidden fees reduce trust and bookings." />
      <div className="space-y-5">
        <div>
          <Label required>Monthly Rent (₱)</Label>
          <input type="number" className={inputClass(!!errors.price_monthly)} placeholder="e.g. 4500"
            value={form.price_monthly} onChange={(e) => set("price_monthly", e.target.value)} style={{ fontFamily: "var(--font-inter)" }} />
          <Error msg={errors.price_monthly} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Deposit (months)</Label>
            <select className={inputClass()} value={form.deposit_months}
              onChange={(e) => set("deposit_months", e.target.value)} style={{ fontFamily: "var(--font-inter)" }}>
              {[1,2,3].map(n => <option key={n} value={n}>{n} month{n > 1 ? "s" : ""}</option>)}
            </select>
          </div>
          <div>
            <Label>Advance (months)</Label>
            <select className={inputClass()} value={form.advance_months}
              onChange={(e) => set("advance_months", e.target.value)} style={{ fontFamily: "var(--font-inter)" }}>
              {[1,2,3].map(n => <option key={n} value={n}>{n} month{n > 1 ? "s" : ""}</option>)}
            </select>
          </div>
        </div>
        <div>
          <Label required>Lease Terms Accepted</Label>
          <div className="grid grid-cols-3 gap-2 mt-1">
            {LEASE_OPTIONS.map((opt) => (
              <label key={opt.value} className={`flex items-center gap-2 p-3 border rounded-xl cursor-pointer transition-all ${
                form.lease_terms.includes(opt.value)
                  ? "border-coral bg-coral/5 text-coral"
                  : "border-warm-white-dark text-charcoal hover:border-coral/50"
              }`}>
                <input type="checkbox" className="sr-only" checked={form.lease_terms.includes(opt.value)}
                  onChange={() => toggleArray("lease_terms", opt.value)} />
                <span className="text-xs font-medium" style={{ fontFamily: "var(--font-plus-jakarta)" }}>{opt.label}</span>
              </label>
            ))}
          </div>
          <Error msg={errors.lease_terms} />
        </div>
      </div>
    </>
  )
}

function StepDetails({ form, set, toggleArray }: {
  form: FormData; set: (k: keyof FormData, v: unknown) => void
  toggleArray: (k: "amenities", v: string) => void
}) {
  return (
    <>
      <StepHeader title="Inclusions & House Rules" sub="Tenants make decisions based on what's included. Be specific." />
      <div className="space-y-5">
        <div>
          <Label>What's Included in the Rent</Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1">
            {AMENITY_OPTIONS.map((opt) => (
              <label key={opt.value} className={`flex items-center gap-2 p-2.5 border rounded-xl cursor-pointer transition-all text-sm ${
                form.amenities.includes(opt.value)
                  ? "border-leaf bg-leaf/5 text-leaf"
                  : "border-warm-white-dark text-charcoal hover:border-leaf/50"
              }`}>
                <input type="checkbox" className="sr-only" checked={form.amenities.includes(opt.value)}
                  onChange={() => toggleArray("amenities", opt.value)} />
                <span style={{ fontFamily: "var(--font-inter)" }}>{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Curfew</Label>
            <div className="flex items-center gap-3 mt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.has_curfew} onChange={(e) => set("has_curfew", e.target.checked)}
                  className="w-4 h-4 accent-[#FF6B4A]" />
                <span className="text-charcoal text-sm" style={{ fontFamily: "var(--font-inter)" }}>Has curfew</span>
              </label>
            </div>
            {form.has_curfew && (
              <input className={`${inputClass()} mt-2`} placeholder="e.g. 10:00 PM" value={form.curfew_time}
                onChange={(e) => set("curfew_time", e.target.value)} style={{ fontFamily: "var(--font-inter)" }} />
            )}
          </div>
          <div>
            <Label>Other Rules</Label>
            <div className="flex flex-col gap-2 mt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.cooking_allowed} onChange={(e) => set("cooking_allowed", e.target.checked)}
                  className="w-4 h-4 accent-[#FF6B4A]" />
                <span className="text-charcoal text-sm" style={{ fontFamily: "var(--font-inter)" }}>Cooking allowed</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.pets_allowed} onChange={(e) => set("pets_allowed", e.target.checked)}
                  className="w-4 h-4 accent-[#FF6B4A]" />
                <span className="text-charcoal text-sm" style={{ fontFamily: "var(--font-inter)" }}>Pets allowed</span>
              </label>
            </div>
          </div>
        </div>
        <div>
          <Label>House Rules</Label>
          <textarea className={inputClass()} rows={4}
            placeholder="e.g. No overnight guests. Curfew at 10 PM. Keep common areas clean."
            value={form.house_rules} onChange={(e) => set("house_rules", e.target.value)}
            style={{ fontFamily: "var(--font-inter)" }} />
        </div>
      </div>
    </>
  )
}

function StepPhotos({ form, set }: { form: FormData; set: (k: keyof FormData, v: unknown) => void }) {
  return (
    <>
      <StepHeader title="Photos" sub="Listings with 5+ clear photos get 3× more inquiries. Show every room." />
      <div className="space-y-4">
        <label className="block border-2 border-dashed border-warm-white-dark hover:border-coral rounded-2xl p-10 text-center cursor-pointer transition-colors group">
          <input type="file" multiple accept="image/*" className="sr-only"
            onChange={(e) => set("photos", Array.from(e.target.files ?? []))} />
          <Upload size={32} className="mx-auto text-charcoal/30 group-hover:text-coral mb-3 transition-colors" />
          <p className="text-charcoal font-semibold text-sm mb-1" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            {form.photos.length > 0 ? `${form.photos.length} photo${form.photos.length > 1 ? "s" : ""} selected` : "Click to upload photos"}
          </p>
          <p className="text-charcoal/50 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
            JPG, PNG up to 10MB each · Minimum 5 photos recommended
          </p>
        </label>
        <div className="bg-golden/8 border border-golden/20 rounded-xl p-4">
          <p className="text-charcoal text-sm font-semibold mb-2" style={{ fontFamily: "var(--font-plus-jakarta)" }}>📸 Photo tips</p>
          <ul className="text-charcoal/70 text-sm space-y-1" style={{ fontFamily: "var(--font-inter)" }}>
            <li>· Take photos during the day with natural light</li>
            <li>· Include: bedroom, bathroom, common area, entrance, neighborhood</li>
            <li>· Clean and declutter before shooting</li>
            <li>· Avoid blurry or dark photos — tenants skip them</li>
          </ul>
        </div>
      </div>
    </>
  )
}

function StepReview({ form }: { form: FormData }) {
  const amenityLabels: Record<string, string> = {
    wifi: "WiFi", water: "Water", electricity: "Electricity", aircon: "Aircon",
    laundry: "Laundry", parking: "Parking", ref: "Ref", tv: "TV",
  }
  const typeLabels: Record<string, string> = {
    bedspace: "Bedspace", private_room: "Private Room", studio: "Studio", apartment: "Apartment",
  }
  const genderLabels: Record<string, string> = {
    male_only: "Male Only", female_only: "Female Only", mixed: "Mixed",
  }

  return (
    <>
      <StepHeader title="Review & Submit" sub="Check everything before submitting for review. Our team will verify within 24–48 hours." />
      <div className="space-y-4">
        <ReviewRow label="Title"       value={form.title || "—"} />
        <ReviewRow label="Type"        value={typeLabels[form.listing_type] ?? "—"} />
        <ReviewRow label="Gender"      value={genderLabels[form.gender_policy] ?? "—"} />
        <ReviewRow label="Location"    value={[form.address, form.barangay, form.city].filter(Boolean).join(", ") || "—"} />
        <ReviewRow label="Rent"        value={form.price_monthly ? `₱${Number(form.price_monthly).toLocaleString()}/month` : "—"} />
        <ReviewRow label="Deposit"     value={`${form.deposit_months} month(s)`} />
        <ReviewRow label="Lease Terms" value={form.lease_terms.join(", ") || "—"} />
        <ReviewRow label="Inclusions"  value={form.amenities.map(a => amenityLabels[a] ?? a).join(", ") || "None"} />
        <ReviewRow label="Curfew"      value={form.has_curfew ? form.curfew_time : "None"} />
        <ReviewRow label="Photos"      value={`${form.photos.length} selected`} />
        <div className="bg-leaf/8 border border-leaf/20 rounded-xl p-4 mt-2">
          <p className="text-charcoal text-sm" style={{ fontFamily: "var(--font-inter)" }}>
            ✅ After submitting, our team will review your listing within <strong>24–48 hours</strong>. You'll receive an SMS once it goes live. No payment required for basic listing.
          </p>
        </div>
      </div>
    </>
  )
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start py-2 border-b border-warm-white-dark last:border-0">
      <span className="text-charcoal/60 text-sm flex-shrink-0 w-28" style={{ fontFamily: "var(--font-inter)" }}>{label}</span>
      <span className="text-charcoal font-medium text-sm text-right" style={{ fontFamily: "var(--font-plus-jakarta)" }}>{value}</span>
    </div>
  )
}

function SuccessScreen() {
  return (
    <div className="flex flex-col items-center text-center py-16 max-w-md mx-auto">
      <div className="w-20 h-20 bg-leaf/15 rounded-full flex items-center justify-center mb-6">
        <Check size={36} className="text-leaf" />
      </div>
      <h2 className="text-navy font-bold text-2xl mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
        Listing submitted!
      </h2>
      <p className="text-charcoal-light leading-relaxed mb-8" style={{ fontFamily: "var(--font-inter)" }}>
        Our team will review your listing within <strong>24–48 hours</strong>. You'll receive an SMS once it's live on StayPH. In the meantime, prepare your government ID for the verification step.
      </p>
      <div className="bg-warm-white border border-warm-white-dark rounded-2xl p-5 w-full text-left space-y-3 mb-8">
        <p className="text-navy font-semibold text-sm" style={{ fontFamily: "var(--font-plus-jakarta)" }}>What happens next:</p>
        {[
          "Team reviews your listing and photos",
          "ID verification request sent via SMS",
          "Listing goes live as Pending Verification",
          "Request a Preferred visit to stand out",
        ].map((s, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="w-5 h-5 bg-coral/15 text-coral text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
            <span className="text-charcoal text-sm" style={{ fontFamily: "var(--font-inter)" }}>{s}</span>
          </div>
        ))}
      </div>
      <a href="/cebu" className="bg-coral text-white font-bold px-8 py-3 rounded-xl hover:bg-coral-dark transition-colors shadow-sm"
        style={{ fontFamily: "var(--font-plus-jakarta)" }}>
        Browse Listings
      </a>
    </div>
  )
}
