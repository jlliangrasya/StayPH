import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, ShieldCheck, Eye } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-warm-white pt-16">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #FF6B4A, transparent)" }}
        />
        <div
          className="absolute top-1/2 -left-24 w-72 h-72 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #FFB830, transparent)" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #1A2E4A, transparent)" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — copy */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 bg-coral/10 border border-coral/20 text-coral px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}>
              <span className="w-2 h-2 bg-coral rounded-full animate-pulse" />
              Now live in Cebu City
            </div>

            {/* Headline */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy leading-tight mb-5"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Find your{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-coral">home away</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="10"
                  viewBox="0 0 200 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 8 Q50 2 100 6 Q150 10 200 4"
                    stroke="#FF6B4A"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.5"
                  />
                </svg>
              </span>
              {" "}from home.
            </h1>

            {/* Subheadline */}
            <p
              className="text-charcoal-light text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Verified boarding houses and bedspaces near your university or workplace.
              Every listing is reviewed by a real person — not just an algorithm.
            </p>

            {/* Search bar */}
            <div className="bg-white rounded-2xl shadow-lg border border-warm-white-dark p-2 flex flex-col sm:flex-row gap-2 mb-6 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2 flex-1 px-3 py-2">
                <MapPin size={18} className="text-coral flex-shrink-0" />
                <input
                  type="text"
                  placeholder="City, university, or barangay..."
                  className="flex-1 text-charcoal placeholder-charcoal/40 text-sm bg-transparent outline-none"
                  style={{ fontFamily: "var(--font-inter)" }}
                />
              </div>
              <Link
                href="#listings"
                className="bg-coral text-white font-semibold text-sm px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-coral-dark transition-colors shadow-sm flex-shrink-0"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                <Search size={16} />
                Search
              </Link>
            </div>

            {/* Quick filters */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-8">
              {["Near USC Cebu", "Near UV Visayas", "Near CIT-U", "Female Only", "₱3,000 & below"].map((tag) => (
                <button
                  key={tag}
                  className="bg-warm-white border border-warm-white-dark text-charcoal text-xs font-medium px-3 py-1.5 rounded-full hover:border-coral hover:text-coral transition-colors"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 justify-center lg:justify-start">
              <div className="flex items-center gap-1.5 text-sm text-charcoal-light" style={{ fontFamily: "var(--font-inter)" }}>
                <ShieldCheck size={16} className="text-leaf" />
                <span>500+ Verified Listings</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-charcoal/20 rounded-full" />
              <div className="flex items-center gap-1.5 text-sm text-charcoal-light" style={{ fontFamily: "var(--font-inter)" }}>
                <Eye size={16} className="text-coral" />
                <span>Human-Verified</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-charcoal/20 rounded-full" />
              <div className="flex items-center gap-1.5 text-sm text-charcoal-light" style={{ fontFamily: "var(--font-inter)" }}>
                <span className="text-golden text-base">★</span>
                <span>Free to Browse</span>
              </div>
            </div>
          </div>

          {/* Right — illustration */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-full">
              <Image
                src="/brand/hero-illustration.svg"
                alt="Philippine boarding houses at dusk — StayPH"
                width={680}
                height={425}
                priority
                className="w-full h-auto drop-shadow-sm"
              />

              {/* Floating stats cards */}
              <div className="absolute -bottom-4 -left-4 sm:left-2 bg-white rounded-2xl shadow-lg border border-warm-white-dark p-3 flex items-center gap-2.5">
                <div className="w-10 h-10 bg-leaf/15 rounded-xl flex items-center justify-center flex-shrink-0">
                  <ShieldCheck size={20} className="text-leaf" />
                </div>
                <div>
                  <p className="text-xs text-charcoal/60 leading-none mb-0.5" style={{ fontFamily: "var(--font-inter)" }}>Listings verified</p>
                  <p className="text-navy font-bold text-sm" style={{ fontFamily: "var(--font-plus-jakarta)" }}>500+ this month</p>
                </div>
              </div>

              <div className="absolute -top-4 right-2 sm:right-4 bg-white rounded-2xl shadow-lg border border-warm-white-dark p-3 flex items-center gap-2.5">
                <div className="w-10 h-10 bg-golden/15 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-golden text-xl font-bold">★</span>
                </div>
                <div>
                  <p className="text-xs text-charcoal/60 leading-none mb-0.5" style={{ fontFamily: "var(--font-inter)" }}>Average rating</p>
                  <p className="text-navy font-bold text-sm" style={{ fontFamily: "var(--font-plus-jakarta)" }}>4.8 / 5.0</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-8 md:h-12">
          <path d="M0 60V30Q360 0 720 20Q1080 40 1440 10V60H0Z" fill="#1A2E4A" fillOpacity="0.06"/>
        </svg>
      </div>
    </section>
  );
}
