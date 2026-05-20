"use client";

import { useState } from "react";
import { Check, ChevronRight, ChevronLeft, Upload, Home, DollarSign, BookOpen, Camera, Eye } from "lucide-react";

type FormData = {
  // Step 1 — Basic info
  title: string;
  type: string;
  gender: string;
  address: string;
  barangay: string;
  city: string;
  nearSchool: string;
  description: string;
  // Step 2 — Pricing
  price: string;
  inclusions: string[];
  leaseTerms: string[];
  availableSlots: string;
  totalSlots: string;
  // Step 3 — Rules
  hasCurfew: boolean;
  curfewTime: string;
  cookingAllowed: boolean;
  petsAllowed: boolean;
  houseRules: string;
  // Step 4 — Photos (UI only)
  photoCount: number;
  // Step 5 — Contact
  landlordName: string;
  landlordPhone: string;
};

const INITIAL: FormData = {
  title: "",
  type: "bedspace",
  gender: "mixed",
  address: "",
  barangay: "",
  city: "Cebu City",
  nearSchool: "",
  description: "",
  price: "",
  inclusions: [],
  leaseTerms: ["monthly"],
  availableSlots: "",
  totalSlots: "",
  hasCurfew: false,
  curfewTime: "10:00 PM",
  cookingAllowed: false,
  petsAllowed: false,
  houseRules: "",
  photoCount: 0,
  landlordName: "",
  landlordPhone: "",
};

const STEPS = [
  { icon: Home, label: "Basic Info" },
  { icon: DollarSign, label: "Pricing" },
  { icon: BookOpen, label: "Rules" },
  { icon: Camera, label: "Photos" },
  { icon: Eye, label: "Review" },
];

const INCLUSIONS_OPTIONS = ["WiFi", "Water", "Electricity", "Aircon", "Laundry", "Cooking"];
const LEASE_OPTIONS = ["monthly", "semestral", "annual"];
const CITIES = ["Cebu City", "Mandaue City", "Lapu-Lapu City", "Davao City", "Iloilo City"];
const SCHOOLS = [
  "Near USC", "Near UV Visayas", "Near CIT-U", "Near Cebu Normal",
  "Near Cebu Doc", "Near SWU", "Near IT Park", "Business District",
];

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {STEPS.map((step, i) => {
        const Icon = step.icon;
        const done = i < current;
        const active = i === current;
        return (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                  ${done ? "bg-leaf text-white" : active ? "bg-coral text-white shadow-lg" : "bg-warm-white-dark text-charcoal/40"}`}
              >
                {done ? <Check size={18} /> : <Icon size={18} />}
              </div>
              <span
                className={`text-xs mt-1 hidden sm:block transition-colors ${active ? "text-coral font-semibold" : done ? "text-leaf" : "text-charcoal/40"}`}
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {step.label}
              </span>
            </div>
            {i < total - 1 && (
              <div className={`w-12 h-0.5 mx-1 mb-4 sm:mb-6 transition-colors ${i < current ? "bg-leaf" : "bg-warm-white-dark"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-navy font-semibold text-sm mb-1.5" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
      {children}
      {required && <span className="text-coral ml-1">*</span>}
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full border border-warm-white-dark rounded-xl px-4 py-3 text-sm text-charcoal placeholder-charcoal/40 bg-white outline-none focus:border-coral focus:ring-2 focus:ring-coral/20 transition-all ${props.className ?? ""}`}
      style={{ fontFamily: "var(--font-inter)" }}
    />
  );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full border border-warm-white-dark rounded-xl px-4 py-3 text-sm text-charcoal bg-white outline-none focus:border-coral focus:ring-2 focus:ring-coral/20 transition-all ${props.className ?? ""}`}
      style={{ fontFamily: "var(--font-inter)" }}
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full border border-warm-white-dark rounded-xl px-4 py-3 text-sm text-charcoal placeholder-charcoal/40 bg-white outline-none focus:border-coral focus:ring-2 focus:ring-coral/20 transition-all resize-none ${props.className ?? ""}`}
      style={{ fontFamily: "var(--font-inter)" }}
    />
  );
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${checked ? "bg-coral" : "bg-warm-white-dark"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0"}`}
        />
      </button>
      <span className="text-charcoal text-sm" style={{ fontFamily: "var(--font-inter)" }}>{label}</span>
    </label>
  );
}

// Step 1 — Basic Info
function Step1({ data, set }: { data: FormData; set: (k: keyof FormData, v: unknown) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <Label required>Listing title</Label>
        <Input
          placeholder="e.g. Tita Nena's Boarding House for Girls"
          value={data.title}
          onChange={(e) => set("title", e.target.value)}
        />
        <p className="text-charcoal/40 text-xs mt-1" style={{ fontFamily: "var(--font-inter)" }}>
          Be descriptive — this is the first thing renters see.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label required>Room type</Label>
          <Select value={data.type} onChange={(e) => set("type", e.target.value)}>
            <option value="bedspace">Bedspace</option>
            <option value="private_room">Private Room</option>
            <option value="studio">Studio</option>
            <option value="apartment">Apartment</option>
          </Select>
        </div>
        <div>
          <Label required>Gender policy</Label>
          <Select value={data.gender} onChange={(e) => set("gender", e.target.value)}>
            <option value="female_only">Female Only</option>
            <option value="male_only">Male Only</option>
            <option value="mixed">Mixed</option>
          </Select>
        </div>
      </div>

      <div>
        <Label required>Full address</Label>
        <Input
          placeholder="e.g. 123 Gorordo Ave, Lahug, Cebu City"
          value={data.address}
          onChange={(e) => set("address", e.target.value)}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label required>Barangay</Label>
          <Input
            placeholder="e.g. Lahug"
            value={data.barangay}
            onChange={(e) => set("barangay", e.target.value)}
          />
        </div>
        <div>
          <Label required>City</Label>
          <Select value={data.city} onChange={(e) => set("city", e.target.value)}>
            {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </Select>
        </div>
      </div>

      <div>
        <Label>Nearest school or landmark</Label>
        <Select value={data.nearSchool} onChange={(e) => set("nearSchool", e.target.value)}>
          <option value="">Select nearest landmark</option>
          {SCHOOLS.map((s) => <option key={s} value={s}>{s}</option>)}
        </Select>
      </div>

      <div>
        <Label required>Description</Label>
        <Textarea
          rows={5}
          placeholder="Describe your place — the vibe, what makes it special, who it's best for. Write like you're talking to a student who just moved to Cebu."
          value={data.description}
          onChange={(e) => set("description", e.target.value)}
        />
      </div>
    </div>
  );
}

// Step 2 — Pricing
function Step2({ data, set }: { data: FormData; set: (k: keyof FormData, v: unknown) => void }) {
  const toggleInclusion = (inc: string) => {
    const updated = data.inclusions.includes(inc)
      ? data.inclusions.filter((i) => i !== inc)
      : [...data.inclusions, inc];
    set("inclusions", updated);
  };

  const toggleLease = (term: string) => {
    const updated = data.leaseTerms.includes(term)
      ? data.leaseTerms.filter((t) => t !== term)
      : [...data.leaseTerms, term];
    set("leaseTerms", updated);
  };

  return (
    <div className="space-y-5">
      <div>
        <Label required>Monthly price (₱)</Label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/50 text-sm font-semibold">₱</span>
          <Input
            type="number"
            placeholder="0"
            className="pl-8"
            value={data.price}
            onChange={(e) => set("price", e.target.value)}
          />
        </div>
        <p className="text-charcoal/40 text-xs mt-1" style={{ fontFamily: "var(--font-inter)" }}>
          Set a fair price. Listings 50% below area average are flagged for review.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label required>Available slots</Label>
          <Input
            type="number"
            placeholder="e.g. 2"
            value={data.availableSlots}
            onChange={(e) => set("availableSlots", e.target.value)}
          />
        </div>
        <div>
          <Label required>Total slots</Label>
          <Input
            type="number"
            placeholder="e.g. 8"
            value={data.totalSlots}
            onChange={(e) => set("totalSlots", e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label>What's included in the price?</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
          {INCLUSIONS_OPTIONS.map((inc) => {
            const active = data.inclusions.includes(inc);
            return (
              <button
                key={inc}
                type="button"
                onClick={() => toggleInclusion(inc)}
                className={`py-2.5 px-3 rounded-xl text-sm font-medium border-2 transition-all ${
                  active ? "border-coral bg-coral/8 text-coral" : "border-warm-white-dark bg-white text-charcoal hover:border-coral/40"
                }`}
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {active && <Check size={12} className="inline mr-1.5" />}
                {inc}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <Label>Lease terms accepted</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {LEASE_OPTIONS.map((term) => {
            const active = data.leaseTerms.includes(term);
            return (
              <button
                key={term}
                type="button"
                onClick={() => toggleLease(term)}
                className={`py-2 px-4 rounded-xl text-sm font-medium border-2 capitalize transition-all ${
                  active ? "border-coral bg-coral/8 text-coral" : "border-warm-white-dark bg-white text-charcoal hover:border-coral/40"
                }`}
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {active && <Check size={12} className="inline mr-1.5" />}
                {term}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Step 3 — Rules
function Step3({ data, set }: { data: FormData; set: (k: keyof FormData, v: unknown) => void }) {
  return (
    <div className="space-y-5">
      <div className="bg-warm-white rounded-xl p-4 space-y-4">
        <Toggle
          checked={data.hasCurfew}
          onChange={(v) => set("hasCurfew", v)}
          label="Has a curfew"
        />
        {data.hasCurfew && (
          <div>
            <Label>Curfew time</Label>
            <Input
              type="text"
              placeholder="e.g. 10:00 PM"
              value={data.curfewTime}
              onChange={(e) => set("curfewTime", e.target.value)}
            />
          </div>
        )}
        <Toggle
          checked={data.cookingAllowed}
          onChange={(v) => set("cookingAllowed", v)}
          label="Cooking allowed"
        />
        <Toggle
          checked={data.petsAllowed}
          onChange={(v) => set("petsAllowed", v)}
          label="Pets allowed"
        />
      </div>

      <div>
        <Label>House rules</Label>
        <Textarea
          rows={6}
          placeholder={"No visitors after 8PM.\nKeep common areas clean.\nNo loud music after 10PM.\nNo smoking on premises."}
          value={data.houseRules}
          onChange={(e) => set("houseRules", e.target.value)}
        />
        <p className="text-charcoal/40 text-xs mt-1" style={{ fontFamily: "var(--font-inter)" }}>
          Write each rule on a new line. Clear rules = fewer disputes later.
        </p>
      </div>

      <div>
        <Label required>Your name (landlord)</Label>
        <Input
          placeholder="e.g. Nena Reyes"
          value={data.landlordName}
          onChange={(e) => set("landlordName", e.target.value)}
        />
      </div>

      <div>
        <Label required>WhatsApp / contact number</Label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/50 text-sm">+63</span>
          <Input
            className="pl-12"
            placeholder="9171234567"
            value={data.landlordPhone}
            onChange={(e) => set("landlordPhone", e.target.value)}
          />
        </div>
        <p className="text-charcoal/40 text-xs mt-1" style={{ fontFamily: "var(--font-inter)" }}>
          Tenants will contact you via WhatsApp. This will be hidden until a viewing is confirmed.
        </p>
      </div>
    </div>
  );
}

// Step 4 — Photos
function Step4({ data, set }: { data: FormData; set: (k: keyof FormData, v: unknown) => void }) {
  const slots = Array.from({ length: 15 }, (_, i) => i);
  const filled = data.photoCount;

  return (
    <div className="space-y-5">
      <div className="bg-amber/10 border border-amber/30 rounded-xl p-4">
        <p className="text-charcoal font-semibold text-sm mb-1" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
          📸 Photo tips
        </p>
        <ul className="text-charcoal-light text-xs space-y-1" style={{ fontFamily: "var(--font-inter)" }}>
          <li>• Minimum 5 photos required before your listing goes live</li>
          <li>• Include: room, bathroom, common area, entrance, neighborhood</li>
          <li>• Natural lighting is your best friend — open the windows</li>
          <li>• Clean and declutter before shooting</li>
          <li>• Stolen photos are detected automatically — always use your own</li>
        </ul>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <Label>Photos ({filled}/15 — min. 5 required)</Label>
          {filled >= 5 && (
            <span className="text-leaf text-xs font-semibold flex items-center gap-1">
              <Check size={12} /> Minimum met
            </span>
          )}
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {slots.map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => set("photoCount", i < filled ? filled - 1 : filled + 1)}
              className={`aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-all text-xs
                ${i < filled
                  ? "border-coral bg-coral/8 text-coral"
                  : "border-warm-white-dark bg-white text-charcoal/30 hover:border-coral/40 hover:text-coral/50"
                }`}
            >
              {i < filled ? (
                <Check size={20} />
              ) : (
                <Upload size={16} />
              )}
            </button>
          ))}
        </div>
        <p className="text-charcoal/40 text-xs mt-2" style={{ fontFamily: "var(--font-inter)" }}>
          Click squares to simulate adding photos. Actual upload requires Supabase setup.
        </p>
      </div>

      <div className="bg-warm-white rounded-xl p-4">
        <p className="text-navy font-semibold text-sm mb-2" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
          Video walkthrough (optional but recommended)
        </p>
        <p className="text-charcoal-light text-xs mb-3" style={{ fontFamily: "var(--font-inter)" }}>
          A 1–2 minute video showing the room, bathroom, common areas, and entrance dramatically increases inquiries.
        </p>
        <button
          type="button"
          className="flex items-center gap-2 border border-warm-white-dark bg-white text-charcoal text-sm px-4 py-2.5 rounded-xl hover:border-coral hover:text-coral transition-colors"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <Upload size={14} />
          Upload video
        </button>
      </div>
    </div>
  );
}

// Step 5 — Review
function Step5({ data }: { data: FormData }) {
  const genderLabel =
    data.gender === "female_only" ? "Female Only" : data.gender === "male_only" ? "Male Only" : "Mixed";
  const typeLabel =
    data.type === "private_room" ? "Private Room" : data.type === "bedspace" ? "Bedspace" : data.type === "studio" ? "Studio" : "Apartment";

  const rows = [
    { label: "Title", value: data.title || "—" },
    { label: "Type", value: typeLabel },
    { label: "Gender policy", value: genderLabel },
    { label: "Address", value: data.address || "—" },
    { label: "City", value: data.city },
    { label: "Near", value: data.nearSchool || "—" },
    { label: "Monthly price", value: data.price ? `₱${parseInt(data.price).toLocaleString()}` : "—" },
    { label: "Slots", value: data.availableSlots && data.totalSlots ? `${data.availableSlots} available of ${data.totalSlots}` : "—" },
    { label: "Inclusions", value: data.inclusions.length ? data.inclusions.join(", ") : "None" },
    { label: "Lease terms", value: data.leaseTerms.join(", ") },
    { label: "Curfew", value: data.hasCurfew ? `Yes — ${data.curfewTime}` : "No" },
    { label: "Cooking", value: data.cookingAllowed ? "Allowed" : "Not allowed" },
    { label: "Pets", value: data.petsAllowed ? "Allowed" : "Not allowed" },
    { label: "Photos", value: `${data.photoCount} uploaded` },
    { label: "Landlord", value: data.landlordName || "—" },
    { label: "Contact", value: data.landlordPhone ? `+63${data.landlordPhone}` : "—" },
  ];

  return (
    <div className="space-y-5">
      <div className="bg-leaf/8 border border-leaf/30 rounded-xl p-4">
        <p className="text-leaf font-semibold text-sm" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
          ✅ Almost there! Review your listing before submitting.
        </p>
        <p className="text-charcoal-light text-xs mt-1" style={{ fontFamily: "var(--font-inter)" }}>
          Our team will review it within 24–48 hours. Your listing will appear as "Pending" in the meantime.
        </p>
      </div>

      <div className="bg-white border border-warm-white-dark rounded-xl overflow-hidden">
        {rows.map(({ label, value }, i) => (
          <div
            key={label}
            className={`flex items-start gap-4 px-4 py-3 ${i % 2 === 0 ? "bg-warm-white/50" : ""}`}
          >
            <span className="text-charcoal/50 text-sm w-32 flex-shrink-0" style={{ fontFamily: "var(--font-inter)" }}>
              {label}
            </span>
            <span className="text-charcoal text-sm font-medium" style={{ fontFamily: "var(--font-inter)" }}>
              {value}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-amber/10 border border-amber/30 rounded-xl p-4 text-xs text-charcoal-light" style={{ fontFamily: "var(--font-inter)" }}>
        By submitting, you confirm that all information is accurate and that you have the right to rent this property. Misrepresentation may result in account suspension.
      </div>
    </div>
  );
}

export default function ListingFormWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof FormData, value: unknown) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const canAdvance = () => {
    if (step === 0) return data.title.trim() && data.address.trim() && data.city && data.description.trim();
    if (step === 1) return data.price && data.availableSlots && data.totalSlots;
    if (step === 2) return data.landlordName.trim() && data.landlordPhone.trim();
    if (step === 3) return data.photoCount >= 5;
    return true;
  };

  if (submitted) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-leaf/15 rounded-full flex items-center justify-center mx-auto mb-5">
          <Check size={36} className="text-leaf" />
        </div>
        <h2 className="text-navy font-bold text-2xl mb-3" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
          Listing submitted!
        </h2>
        <p className="text-charcoal-light text-sm max-w-md mx-auto mb-6" style={{ fontFamily: "var(--font-inter)" }}>
          Our team will review your listing within 24–48 hours. You'll receive an SMS and email when it's approved.
        </p>
        <div className="inline-flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => { setSubmitted(false); setStep(0); setData(INITIAL); }}
            className="bg-coral text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-coral-dark transition-colors"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            List another property
          </button>
          <a
            href="/listings"
            className="border border-warm-white-dark text-charcoal font-semibold text-sm px-6 py-3 rounded-xl hover:border-coral hover:text-coral transition-colors"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Browse listings
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <StepIndicator current={step} total={STEPS.length} />

      <div className="min-h-[400px]">
        {step === 0 && <Step1 data={data} set={set} />}
        {step === 1 && <Step2 data={data} set={set} />}
        {step === 2 && <Step3 data={data} set={set} />}
        {step === 3 && <Step4 data={data} set={set} />}
        {step === 4 && <Step5 data={data} />}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-warm-white-dark">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="flex items-center gap-2 text-charcoal-light text-sm font-semibold px-5 py-2.5 rounded-xl border border-warm-white-dark hover:border-coral hover:text-coral transition-colors disabled:opacity-30 disabled:pointer-events-none"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          <ChevronLeft size={16} />
          Back
        </button>

        <span className="text-charcoal/40 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
          Step {step + 1} of {STEPS.length}
        </span>

        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
            disabled={!canAdvance()}
            className="flex items-center gap-2 bg-coral text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-coral-dark transition-colors disabled:opacity-40 disabled:pointer-events-none"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Continue
            <ChevronRight size={16} />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            className="flex items-center gap-2 bg-leaf text-white font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-leaf-light transition-colors"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            <Check size={16} />
            Submit listing
          </button>
        )}
      </div>
    </div>
  );
}
