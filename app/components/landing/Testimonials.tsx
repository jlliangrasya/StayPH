const testimonials = [
  {
    quote:
      "Nag-move ako sa Cebu para mag-aral sa USC. Di ako makahanap ng boarding house na safe at abot-kaya. StayPH nalang ang nag-save sa akin — nakita ko yung Preferred listing ni Tita Nena at doon na ako umuwi every night.",
    name: "Maricel D.",
    role: "2nd Year Nursing, USC Cebu",
    initials: "MD",
    color: "bg-coral",
  },
  {
    quote:
      "I was worried about my daughter moving to Cebu for college. StayPH gave me peace of mind — I could see the photos, read the verified reviews, and even video call the landlord through the platform. First time I felt okay about the distance.",
    name: "Natividad L.",
    role: "OFW Parent, Saudi Arabia",
    initials: "NL",
    color: "bg-navy",
  },
  {
    quote:
      "My rooms were empty for 3 weeks after I put up the tarpaulin. A friend told me about StayPH, I listed for free, and within 5 days I had 3 inquiries. The Preferred visit was worth every peso — it built trust I couldn't build alone.",
    name: "Ben O.",
    role: "Boarding House Owner, Banilad",
    initials: "BO",
    color: "bg-golden",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-warm-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p
            className="text-coral font-semibold text-sm uppercase tracking-widest mb-3"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Real Stories
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold text-navy mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            They found their home on StayPH
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-warm-white-dark shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
              style={{ borderLeft: "4px solid" }}
            >
              {/* Quote mark */}
              <div
                className="text-5xl font-bold text-coral/20 leading-none mb-2 select-none"
                style={{ fontFamily: "var(--font-playfair)" }}
                aria-hidden
              >
                &ldquo;
              </div>

              <blockquote
                className="text-charcoal text-sm leading-relaxed flex-1 mb-6 italic"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {t.quote}
              </blockquote>

              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 ${t.color} rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  {t.initials}
                </div>
                <div>
                  <p
                    className="text-navy font-bold text-sm"
                    style={{ fontFamily: "var(--font-plus-jakarta)" }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-charcoal-light text-xs"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "500+", label: "Verified Listings", color: "text-coral" },
            { value: "1,200+", label: "Students Housed", color: "text-navy" },
            { value: "4.8★", label: "Average Rating", color: "text-golden" },
            { value: "24h", label: "Scam Report Response", color: "text-leaf" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className={`text-3xl sm:text-4xl font-extrabold ${stat.color} mb-1`}
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                {stat.value}
              </div>
              <div
                className="text-charcoal-light text-xs sm:text-sm"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
