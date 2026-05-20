import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { mockListings, BADGE_STYLES } from "@/lib/mock-listings";
import {
  MapPin,
  Star,
  Wifi,
  Droplets,
  Zap,
  Wind,
  WashingMachine,
  Clock,
  ChefHat,
  PawPrint,
  Users,
  CheckCircle,
  Flag,
  MessageCircle,
  ChevronLeft,
} from "lucide-react";

export async function generateStaticParams() {
  return mockListings.map((l) => ({ id: l.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = mockListings.find((l) => l.id === id);
  if (!listing) return {};
  return {
    title: `${listing.title} — StayPH`,
    description: listing.description.slice(0, 150),
  };
}

const INCLUSION_ICONS: Record<string, React.ReactNode> = {
  WiFi: <Wifi size={15} />,
  Water: <Droplets size={15} />,
  Electricity: <Zap size={15} />,
  Aircon: <Wind size={15} />,
  Laundry: <WashingMachine size={15} />,
};

function PhotoGallery({ photos, title }: { photos: { label: string; color: string }[]; title: string }) {
  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-2 h-72 md:h-96 rounded-2xl overflow-hidden">
      {/* Main large photo */}
      <div className={`col-span-2 row-span-2 bg-gradient-to-br ${photos[0]?.color ?? "from-coral/20 to-golden/10"} relative`}>
        <svg viewBox="0 0 400 300" fill="none" className="w-full h-full">
          <rect x="100" y="100" width="200" height="160" rx="6" fill="white" fillOpacity="0.3" />
          <path d="M85 115L200 60L315 115Z" fill="white" fillOpacity="0.4" />
          <rect x="145" y="135" width="40" height="35" rx="5" fill="white" fillOpacity="0.5" />
          <rect x="215" y="135" width="40" height="35" rx="5" fill="white" fillOpacity="0.5" />
          <rect x="175" y="195" width="50" height="65" rx="5" fill="white" fillOpacity="0.4" />
          <circle cx="340" cy="55" r="30" fill="white" fillOpacity="0.12" />
        </svg>
        <div className="absolute bottom-3 left-3 bg-black/40 text-white text-xs px-2 py-1 rounded-lg backdrop-blur-sm">
          {photos[0]?.label ?? "Room"}
        </div>
      </div>
      {/* Smaller photos */}
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className={`col-span-2 row-span-1 bg-gradient-to-br ${photos[i]?.color ?? "from-navy/15 to-coral/8"} relative ${i === 2 ? "col-span-1" : "col-span-2 md:col-span-2"}`}
        >
          <svg viewBox="0 0 200 100" fill="none" className="w-full h-full">
            <rect x="50" y="20" width="100" height="75" rx="4" fill="white" fillOpacity="0.25" />
            <path d="M40 30L100 5L160 30Z" fill="white" fillOpacity="0.3" />
            <circle cx="170" cy="15" r="15" fill="white" fillOpacity="0.1" />
          </svg>
          {photos[i] && (
            <div className="absolute bottom-2 left-2 bg-black/40 text-white text-xs px-2 py-0.5 rounded-lg backdrop-blur-sm">
              {photos[i].label}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = mockListings.find((l) => l.id === id);

  if (!listing) notFound();

  const badgeStyle = BADGE_STYLES[listing.badge] ?? { bg: "bg-navy", text: "text-white" };
  const whatsappUrl = `https://wa.me/${listing.landlord.phone}?text=${encodeURIComponent(
    `Hi! I saw your listing "${listing.title}" on StayPH and I'm interested. Is it still available?`
  )}`;

  const genderLabel =
    listing.gender === "female_only"
      ? "Female Only"
      : listing.gender === "male_only"
      ? "Male Only"
      : "Mixed";

  const typeLabel =
    listing.type === "private_room"
      ? "Private Room"
      : listing.type === "bedspace"
      ? "Bedspace"
      : listing.type === "studio"
      ? "Studio"
      : "Apartment";

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-warm-white pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back */}
          <Link
            href="/listings"
            className="inline-flex items-center gap-1.5 text-charcoal-light text-sm hover:text-coral transition-colors mb-5"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <ChevronLeft size={16} />
            Back to listings
          </Link>

          {/* Photo gallery */}
          <PhotoGallery photos={listing.photos} title={listing.title} />

          <div className="mt-8 grid lg:grid-cols-3 gap-8">
            {/* Left column — details */}
            <div className="lg:col-span-2 space-y-7">
              {/* Title block */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span
                    className={`${badgeStyle.bg} ${badgeStyle.text} text-xs font-bold px-3 py-1 rounded-full`}
                    style={{ fontFamily: "var(--font-plus-jakarta)" }}
                  >
                    {listing.badgeLabel}
                  </span>
                  <span className="bg-warm-white-dark text-charcoal text-xs px-3 py-1 rounded-full">
                    {typeLabel}
                  </span>
                  <span className="bg-warm-white-dark text-charcoal text-xs px-3 py-1 rounded-full">
                    {genderLabel}
                  </span>
                </div>

                <h1
                  className="text-navy font-bold text-2xl md:text-3xl mb-2"
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  {listing.title}
                </h1>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-coral" />
                    <span className="text-charcoal-light text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                      {listing.address}
                    </span>
                  </div>
                  <span className="text-coral font-semibold text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                    {listing.nearSchool}
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <Star size={14} className="text-golden fill-golden" />
                  <span className="text-charcoal font-bold text-sm" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                    {listing.rating}
                  </span>
                  <span className="text-charcoal/50 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                    ({listing.reviews} reviews)
                  </span>
                  <span className="text-charcoal/30">·</span>
                  <span className="text-charcoal-light text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                    {listing.availableSlots} of {listing.totalSlots} slots available
                  </span>
                </div>
              </div>

              <hr className="border-warm-white-dark" />

              {/* Description */}
              <div>
                <h2
                  className="text-navy font-bold text-lg mb-3"
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  About this place
                </h2>
                <p className="text-charcoal leading-relaxed text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                  {listing.description}
                </p>
              </div>

              <hr className="border-warm-white-dark" />

              {/* Inclusions */}
              <div>
                <h2
                  className="text-navy font-bold text-lg mb-4"
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  What's included
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {listing.inclusions.map((inc) => (
                    <div
                      key={inc}
                      className="flex items-center gap-2.5 bg-leaf/8 text-leaf px-3 py-2.5 rounded-xl"
                    >
                      {INCLUSION_ICONS[inc] ?? <CheckCircle size={15} />}
                      <span className="text-sm font-medium" style={{ fontFamily: "var(--font-inter)" }}>
                        {inc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <hr className="border-warm-white-dark" />

              {/* Policies */}
              <div>
                <h2
                  className="text-navy font-bold text-lg mb-4"
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  Policies
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 bg-white rounded-xl border border-warm-white-dark p-3.5">
                    <Clock size={18} className={listing.hasCurfew ? "text-amber" : "text-leaf"} />
                    <div>
                      <p className="text-charcoal font-semibold text-sm" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                        Curfew
                      </p>
                      <p className="text-charcoal-light text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                        {listing.hasCurfew ? `Yes — ${listing.curfewTime}` : "No curfew"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white rounded-xl border border-warm-white-dark p-3.5">
                    <ChefHat size={18} className={listing.cookingAllowed ? "text-leaf" : "text-soft-red"} />
                    <div>
                      <p className="text-charcoal font-semibold text-sm" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                        Cooking
                      </p>
                      <p className="text-charcoal-light text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                        {listing.cookingAllowed ? "Allowed" : "Not allowed"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white rounded-xl border border-warm-white-dark p-3.5">
                    <PawPrint size={18} className={listing.petsAllowed ? "text-leaf" : "text-soft-red"} />
                    <div>
                      <p className="text-charcoal font-semibold text-sm" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                        Pets
                      </p>
                      <p className="text-charcoal-light text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                        {listing.petsAllowed ? "Allowed" : "Not allowed"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white rounded-xl border border-warm-white-dark p-3.5">
                    <Users size={18} className="text-navy" />
                    <div>
                      <p className="text-charcoal font-semibold text-sm" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                        Lease terms
                      </p>
                      <p className="text-charcoal-light text-xs capitalize" style={{ fontFamily: "var(--font-inter)" }}>
                        {listing.leaseTerms.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-warm-white-dark" />

              {/* House rules */}
              <div>
                <h2
                  className="text-navy font-bold text-lg mb-3"
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  House rules
                </h2>
                <ul className="space-y-2">
                  {listing.houseRules.split(". ").filter(Boolean).map((rule, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-charcoal" style={{ fontFamily: "var(--font-inter)" }}>
                      <CheckCircle size={15} className="text-leaf flex-shrink-0 mt-0.5" />
                      {rule.replace(/\.$/, "")}
                    </li>
                  ))}
                </ul>
              </div>

              <hr className="border-warm-white-dark" />

              {/* Report */}
              <div>
                <button className="flex items-center gap-2 text-charcoal/50 hover:text-soft-red text-sm transition-colors" style={{ fontFamily: "var(--font-inter)" }}>
                  <Flag size={14} />
                  Report this listing
                </button>
              </div>
            </div>

            {/* Right column — sticky booking panel */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-2xl border border-warm-white-dark shadow-lg p-6">
                {/* Price */}
                <div className="mb-5">
                  <span
                    className="text-navy font-bold text-3xl"
                    style={{ fontFamily: "var(--font-plus-jakarta)" }}
                  >
                    ₱{listing.price.toLocaleString()}
                  </span>
                  <span className="text-charcoal/50 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                    /month
                  </span>
                </div>

                {/* Availability */}
                <div className="bg-warm-white rounded-xl p-3.5 mb-5 flex items-center justify-between">
                  <span className="text-charcoal text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                    Available slots
                  </span>
                  <span
                    className={`font-bold text-sm ${listing.availableSlots <= 2 ? "text-soft-red" : "text-leaf"}`}
                    style={{ fontFamily: "var(--font-plus-jakarta)" }}
                  >
                    {listing.availableSlots} / {listing.totalSlots}
                  </span>
                </div>

                {/* WhatsApp CTA */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold text-sm py-3.5 rounded-xl transition-colors shadow-sm mb-3"
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.121 1.532 5.855L.057 23.882a.75.75 0 00.921.921l6.027-1.475A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75A9.75 9.75 0 012.25 12 9.75 9.75 0 0112 2.25 9.75 9.75 0 0121.75 12 9.75 9.75 0 0112 21.75z"/>
                  </svg>
                  Message on WhatsApp
                </a>

                <button
                  className="flex items-center justify-center gap-2 w-full border-2 border-coral text-coral font-bold text-sm py-3.5 rounded-xl hover:bg-coral hover:text-white transition-all duration-200"
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  <MessageCircle size={16} />
                  Request a Viewing
                </button>

                <p className="text-center text-charcoal/40 text-xs mt-4" style={{ fontFamily: "var(--font-inter)" }}>
                  Free to inquire. No payment required yet.
                </p>

                <hr className="border-warm-white-dark my-5" />

                {/* Landlord */}
                <div>
                  <p className="text-navy font-bold text-sm mb-3" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                    Your landlord
                  </p>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-coral/30 to-golden/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-navy font-bold text-base">
                        {listing.landlord.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-charcoal font-semibold text-sm" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                        {listing.landlord.name}
                      </p>
                      {listing.landlord.verified && (
                        <p className="text-leaf text-xs flex items-center gap-1" style={{ fontFamily: "var(--font-inter)" }}>
                          <CheckCircle size={11} /> ID Verified
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                    <div className="bg-warm-white rounded-lg p-2.5 text-center">
                      <p className="text-charcoal/50 mb-0.5">Response rate</p>
                      <p className="text-navy font-bold">{listing.landlord.responseRate}</p>
                    </div>
                    <div className="bg-warm-white rounded-lg p-2.5 text-center">
                      <p className="text-charcoal/50 mb-0.5">Responds</p>
                      <p className="text-navy font-bold">{listing.landlord.responseTime}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
