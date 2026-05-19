const steps = [
  {
    number: "01",
    title: "Search by school or city",
    description:
      "Find rooms near your university, workplace, or barangay. Filter by price, gender policy, inclusions, and more.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <circle cx="22" cy="22" r="13" stroke="white" strokeWidth="3"/>
        <path d="M31 31L40 40" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M18 22H26M22 18V26" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
    color: "bg-coral",
  },
  {
    number: "02",
    title: "Read verified reviews & badges",
    description:
      "Every listing shows real trust badges — from Phone Verified to Site Visited. Read honest reviews from verified tenants.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <path d="M24 6L28 16H39L30.5 22.5L34 33L24 26.5L14 33L17.5 22.5L9 16H20L24 6Z" stroke="white" strokeWidth="2.5" strokeLinejoin="round"/>
        <path d="M17 36L24 31.5L31 36" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
    color: "bg-golden",
  },
  {
    number: "03",
    title: "Book a viewing & pay safely",
    description:
      "Request a viewing directly in the app. Deposit goes through escrow — released to the landlord only after you move in.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <rect x="8" y="12" width="32" height="28" rx="4" stroke="white" strokeWidth="2.5"/>
        <path d="M8 20H40" stroke="white" strokeWidth="2.5"/>
        <path d="M16 8V16M32 8V16" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="30" cy="33" r="8" fill="white" fillOpacity="0.15"/>
        <path d="M26 33L29 36L35 30" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: "bg-navy",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-navy py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p
            className="text-coral font-semibold text-sm uppercase tracking-widest mb-3"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Simple Process
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            How StayPH works
          </h2>
          <p
            className="text-white/60 text-base max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            From search to move-in, everything is designed to protect you — tenant and landlord alike.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-10 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-white/10" style={{ left: "20%", right: "20%" }} />

          {steps.map((step, i) => (
            <div
              key={i}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Icon circle */}
              <div className={`relative z-10 w-20 h-20 rounded-2xl ${step.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                {step.icon}
                <span
                  className="absolute -top-2 -right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center text-navy text-xs font-extrabold shadow-md"
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  {i + 1}
                </span>
              </div>

              <h3
                className="text-white font-bold text-lg mb-3"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                {step.title}
              </h3>
              <p
                className="text-white/55 text-sm leading-relaxed max-w-xs mx-auto"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
