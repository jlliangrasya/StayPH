import Image from "next/image";

const listingBadges = [
  {
    img: "/brand/badge-preferred.svg",
    name: "Preferred",
    description: "A StayPH team member personally visited this property and recommends it.",
    bg: "bg-navy/5",
    border: "border-navy/10",
  },
  {
    img: "/brand/badge-top-pick.svg",
    name: "Top Pick",
    description: "Preferred + 4.8★ rating + 10+ reviews + at least 1 year on platform.",
    bg: "bg-coral/5",
    border: "border-coral/15",
  },
  {
    img: "/brand/badge-admin-verified.svg",
    name: "Admin Verified",
    description: "Documents reviewed and approved by the StayPH team. Paperwork is clean.",
    bg: "bg-leaf/5",
    border: "border-leaf/15",
  },
  {
    img: "/brand/badge-site-visited.svg",
    name: "Site Visited",
    description: "Our team physically visited the property. It exists and matches the listing.",
    bg: "bg-navy/5",
    border: "border-navy/10",
  },
];

const tenantBadges = [
  {
    img: "/brand/badge-tenant-good.svg",
    name: "Good Tenant",
    description: "Zero disputes and two or more positive landlord ratings. Proven track record.",
    bg: "bg-golden/8",
    border: "border-golden/20",
  },
];

export default function TrustBadges() {
  return (
    <section className="bg-warm-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p
            className="text-coral font-semibold text-sm uppercase tracking-widest mb-3"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Trust Built In
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold text-navy mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            What our trust badges mean
          </h2>
          <p
            className="text-charcoal-light text-base max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Every badge represents a real check — not just a green tick. Trust must flow in both
            directions: tenants need to trust listings, and landlords need to trust tenants.
          </p>
        </div>

        {/* Two-way trust intro */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto">
          <div className="bg-navy/5 border border-navy/10 rounded-2xl p-5 text-center">
            <div className="text-2xl mb-2">🏠</div>
            <h3 className="text-navy font-bold text-sm mb-1" style={{ fontFamily: "var(--font-plus-jakarta)" }}>For Listings</h3>
            <p className="text-charcoal-light text-xs" style={{ fontFamily: "var(--font-inter)" }}>Tenants can trust the listing is real and as described</p>
          </div>
          <div className="bg-golden/8 border border-golden/20 rounded-2xl p-5 text-center">
            <div className="text-2xl mb-2">👤</div>
            <h3 className="text-navy font-bold text-sm mb-1" style={{ fontFamily: "var(--font-plus-jakarta)" }}>For Tenants</h3>
            <p className="text-charcoal-light text-xs" style={{ fontFamily: "var(--font-inter)" }}>Landlords can trust who is moving into their property</p>
          </div>
        </div>

        {/* Listing badges grid */}
        <h3
          className="text-navy font-bold text-base mb-5 text-center"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          Listing Badges
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {listingBadges.map((badge) => (
            <div
              key={badge.name}
              className={`${badge.bg} border ${badge.border} rounded-2xl p-5 flex flex-col gap-3 hover:shadow-md transition-shadow duration-300 group`}
            >
              <Image
                src={badge.img}
                alt={`${badge.name} badge`}
                width={130}
                height={34}
                className="group-hover:scale-105 transition-transform duration-300"
              />
              <div>
                <h4
                  className="text-navy font-bold text-sm mb-1"
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  {badge.name}
                </h4>
                <p
                  className="text-charcoal-light text-xs leading-relaxed"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {badge.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tenant badges */}
        <h3
          className="text-navy font-bold text-base mb-5 text-center"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          Tenant Badges
        </h3>
        <div className="flex flex-wrap justify-center gap-4">
          {tenantBadges.map((badge) => (
            <div
              key={badge.name}
              className={`${badge.bg} border ${badge.border} rounded-2xl p-5 flex flex-col gap-3 hover:shadow-md transition-shadow duration-300 group max-w-xs w-full`}
            >
              <Image
                src={badge.img}
                alt={`${badge.name} badge`}
                width={148}
                height={34}
                className="group-hover:scale-105 transition-transform duration-300"
              />
              <div>
                <h4
                  className="text-navy font-bold text-sm mb-1"
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  {badge.name}
                </h4>
                <p
                  className="text-charcoal-light text-xs leading-relaxed"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {badge.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Anti-scam note */}
        <div className="mt-12 bg-coral/6 border border-coral/15 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 max-w-3xl mx-auto">
          <div className="w-12 h-12 bg-coral/15 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
              <path d="M12 2L3 7V12C3 16.55 6.84 20.74 12 22C17.16 20.74 21 16.55 21 12V7L12 2Z" stroke="#FF6B4A" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M9 12L11 14L16 9" stroke="#FF6B4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h4
              className="text-navy font-bold text-sm mb-1"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              Zero tolerance for scams
            </h4>
            <p
              className="text-charcoal-light text-xs leading-relaxed"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Every listing goes through reverse image check, government ID review, and community
              reporting. 3 reports from different users trigger automatic suspension pending review.
              All deposits are held in escrow — never sent directly to a landlord.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
