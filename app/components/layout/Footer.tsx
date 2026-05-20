import Image from "next/image";
import Link from "next/link";

const forTenants = [
  { label: "Browse Listings", href: "/cebu" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Trust & Safety", href: "/#listings" },
  { label: "List Your Property", href: "/list-your-property" },
];

const forLandlords = [
  { label: "List Your Property", href: "/list-your-property" },
  { label: "Get Verified", href: "/verify-docs" },
  { label: "Request Preferred Visit", href: "/list-your-property" },
  { label: "Landlord Dashboard", href: "/dashboard" },
];

const company = [
  { label: "About StayPH", href: "/#how-it-works" },
  { label: "For Landlords", href: "/#listings" },
  { label: "Browse Cebu", href: "/cebu" },
  { label: "Contact Us", href: "/messages" },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Image
              src="/brand/logo-white.svg"
              alt="StayPH"
              width={120}
              height={30}
              className="mb-4"
            />
            <p
              className="text-white/60 text-sm leading-relaxed mb-5"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              The Philippines&apos; first verified boarding house platform. Built for
              students, workers, and the families who love them.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-coral transition-colors flex items-center justify-center"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-coral transition-colors flex items-center justify-center"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a
                href="#"
                aria-label="TikTok"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-coral transition-colors flex items-center justify-center"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.16 8.16 0 004.77 1.52V6.78a4.85 4.85 0 01-1-.09z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* For Tenants */}
          <div>
            <h4
              className="text-white font-semibold text-sm mb-4 uppercase tracking-wider"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              For Tenants
            </h4>
            <ul className="space-y-2.5">
              {forTenants.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-white/55 hover:text-white text-sm transition-colors"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Landlords */}
          <div>
            <h4
              className="text-white font-semibold text-sm mb-4 uppercase tracking-wider"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              For Landlords
            </h4>
            <ul className="space-y-2.5">
              {forLandlords.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-white/55 hover:text-white text-sm transition-colors"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4
              className="text-white font-semibold text-sm mb-4 uppercase tracking-wider"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              Company
            </h4>
            <ul className="space-y-2.5">
              {company.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-white/55 hover:text-white text-sm transition-colors"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-white/40 text-xs text-center sm:text-left"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            © 2026 StayPH · Built for the Filipino market. Starting in Cebu.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-white/40 hover:text-white/70 text-xs transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-white/40 hover:text-white/70 text-xs transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
