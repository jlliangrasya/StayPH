import Link from "next/link";
import { CheckCircle } from "lucide-react";

const benefits = [
  {
    title: "Free to list",
    description: "Your first listing is completely free. No setup fees, no hidden charges.",
  },
  {
    title: "Fast verification",
    description: "Document review within 24 hours. Your listing goes live quickly.",
  },
  {
    title: "Analytics dashboard",
    description: "See views, inquiries, and conversion rate. Know what works.",
  },
  {
    title: "Preferred tag",
    description: "Get a team visit for ₱499. Preferred listings fill rooms 3× faster.",
  },
];

export default function ForLandlords() {
  return (
    <section id="landlords" className="bg-navy py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — text */}
          <div>
            <p
              className="text-coral font-semibold text-sm uppercase tracking-widest mb-4"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              For Landlords
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-white mb-5"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Fill your rooms faster. Reach verified tenants.
            </h2>
            <p
              className="text-white/60 text-base leading-relaxed mb-8"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Stop relying on tarpaulins and Facebook groups. StayPH connects you with
              students and workers who are actively looking — with identity verified before
              they message you.
            </p>

            <ul className="space-y-4 mb-8">
              {benefits.map((b) => (
                <li key={b.title} className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-leaf mt-0.5 flex-shrink-0" />
                  <div>
                    <span
                      className="text-white font-semibold text-sm"
                      style={{ fontFamily: "var(--font-plus-jakarta)" }}
                    >
                      {b.title}
                    </span>
                    <span
                      className="text-white/55 text-sm ml-1.5"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      — {b.description}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <Link
              href="#"
              className="inline-flex items-center gap-2 bg-white text-navy font-bold text-sm px-8 py-3.5 rounded-xl hover:bg-warm-white transition-colors shadow-md"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              List Your Property Free
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* Right — illustrated stats card */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              {/* Main card */}
              <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl p-7 space-y-4">
                {/* Listing mockup header */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-coral/20 rounded-xl flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                      <path d="M3 9.5L12 3L21 9.5V21H15V15H9V21H3V9.5Z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-plus-jakarta)" }}>My Listing Dashboard</div>
                    <div className="text-white/50 text-xs" style={{ fontFamily: "var(--font-inter)" }}>Tita Nena · Lahug, Cebu</div>
                  </div>
                  <div className="ml-auto bg-leaf/20 text-leaf text-xs font-bold px-2.5 py-1 rounded-full" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                    Active
                  </div>
                </div>

                {/* Stats */}
                {[
                  { label: "Views this week", value: "248", delta: "+34%", positive: true },
                  { label: "Inquiries", value: "12", delta: "+8", positive: true },
                  { label: "Rooms available", value: "2 / 6", delta: "2 open", positive: null },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between py-3 border-b border-white/8 last:border-0">
                    <span className="text-white/55 text-sm" style={{ fontFamily: "var(--font-inter)" }}>{stat.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-plus-jakarta)" }}>{stat.value}</span>
                      {stat.delta && (
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${stat.positive === true ? "bg-leaf/20 text-leaf" : "bg-white/10 text-white/50"}`}
                          style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                          {stat.delta}
                        </span>
                      )}
                    </div>
                  </div>
                ))}

                {/* Preferred badge */}
                <div className="flex items-center gap-3 bg-golden/15 border border-golden/25 rounded-xl p-3">
                  <span className="text-2xl">⭐</span>
                  <div>
                    <p className="text-golden font-bold text-xs" style={{ fontFamily: "var(--font-plus-jakarta)" }}>Preferred Tag Active</p>
                    <p className="text-white/50 text-xs" style={{ fontFamily: "var(--font-inter)" }}>Renews in 4 months</p>
                  </div>
                </div>
              </div>

              {/* Floating notification */}
              <div className="absolute -top-5 -right-4 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2.5 w-52">
                <div className="w-9 h-9 bg-coral/15 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                    <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" stroke="#FF6B4A" strokeWidth="1.5"/>
                    <path d="M2 7l8 5 8-5" stroke="#FF6B4A" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <p className="text-navy text-xs font-bold leading-tight" style={{ fontFamily: "var(--font-plus-jakarta)" }}>New inquiry!</p>
                  <p className="text-charcoal/55 text-xs" style={{ fontFamily: "var(--font-inter)" }}>Maria V. — ID Verified</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
