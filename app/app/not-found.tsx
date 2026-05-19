import Link from "next/link"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-warm-white pt-16 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          {/* Illustration */}
          <div className="w-24 h-24 bg-coral/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path
                d="M6 42V22L24 6L42 22V42H30V30H18V42H6Z"
                stroke="#FF6B4A"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <circle cx="24" cy="28" r="3" fill="#FF6B4A" fillOpacity="0.4" />
              <path d="M24 20V25" stroke="#FF6B4A" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>

          <p
            className="text-coral font-bold text-sm uppercase tracking-widest mb-3"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            404 — Page not found
          </p>
          <h1
            className="text-navy text-3xl font-bold mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            This room doesn&apos;t exist
          </h1>
          <p
            className="text-charcoal-light leading-relaxed mb-8"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            The listing or page you&apos;re looking for may have been removed, or the link might be wrong.
            Try searching for a verified boarding house near your school.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/cebu"
              className="bg-coral text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-coral-dark transition-colors shadow-sm"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              Browse Cebu Listings
            </Link>
            <Link
              href="/"
              className="bg-white text-navy font-semibold text-sm px-6 py-3 rounded-xl border border-warm-white-dark hover:border-coral hover:text-coral transition-colors"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              Go Home
            </Link>
          </div>

          {/* Quick links */}
          <div className="mt-10 pt-8 border-t border-warm-white-dark">
            <p className="text-charcoal/50 text-xs mb-4" style={{ fontFamily: "var(--font-inter)" }}>
              Popular searches
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                { label: "Near USC",   href: "/cebu/near/usc" },
                { label: "Near CIT-U", href: "/cebu/near/cit-u" },
                { label: "Near UV",    href: "/cebu/near/uv" },
                { label: "Lahug",      href: "/cebu/lahug" },
                { label: "Talamban",   href: "/cebu/talamban" },
              ].map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-xs bg-warm-white border border-warm-white-dark text-charcoal px-3 py-1.5 rounded-full hover:border-coral hover:text-coral transition-colors"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
