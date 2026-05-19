import Image from "next/image";
import Link from "next/link";

export default function CTASection() {
  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      style={{ background: "linear-gradient(135deg, #FF6B4A 0%, #E5532F 50%, #CC3D1A 100%)" }}
    >
      {/* Background shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-white/8" />
        <div className="absolute bottom-0 -left-24 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/3" />

        {/* Decorative dots */}
        {[
          { top: "15%", left: "8%", size: 8 },
          { top: "70%", left: "5%", size: 5 },
          { top: "30%", right: "6%", size: 10 },
          { top: "80%", right: "10%", size: 6 },
          { top: "50%", left: "50%", size: 4 },
        ].map((dot, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{ top: dot.top, left: (dot as { left?: string }).left, right: (dot as { right?: string }).right, width: dot.size, height: dot.size }}
          />
        ))}
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/brand/logo-white.svg"
            alt="StayPH"
            width={120}
            height={30}
          />
        </div>

        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-tight"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Ready to find your room?
        </h2>
        <p
          className="text-white/80 text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Join thousands of Filipino students and workers who found safe, verified housing through StayPH.
          No fixers. No fake listings. Just real homes.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="#listings"
            className="w-full sm:w-auto bg-white text-coral font-bold text-base px-10 py-4 rounded-2xl hover:bg-warm-white transition-colors shadow-lg hover:shadow-xl"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Browse Listings
          </Link>
          <Link
            href="#"
            className="w-full sm:w-auto bg-transparent text-white font-bold text-base px-10 py-4 rounded-2xl border-2 border-white/50 hover:border-white hover:bg-white/10 transition-all"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            List Your Property
          </Link>
        </div>

        {/* Trust micro-copy */}
        <p
          className="mt-8 text-white/55 text-sm"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Free to browse · No account required to search · 500+ verified listings in Cebu
        </p>
      </div>
    </section>
  );
}
