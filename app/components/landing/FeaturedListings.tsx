import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";

const mockListings = [
  {
    id: 1,
    title: "Tita Nena's Boarding House",
    location: "Lahug, Cebu City",
    nearSchool: "Near USC",
    price: 4500,
    type: "Bedspace",
    gender: "Female Only",
    rating: 4.9,
    reviews: 24,
    badge: "preferred",
    badgeLabel: "⭐ Preferred",
    badgeBg: "bg-navy",
    badgeText: "text-golden",
    inclusions: ["WiFi", "Water", "Electricity"],
    coverColor: "from-coral/20 to-golden/10",
  },
  {
    id: 2,
    title: "Casa Verde Bedspace",
    location: "Talamban, Cebu City",
    nearSchool: "Near CIT-U",
    price: 3800,
    type: "Bedspace",
    gender: "Mixed",
    rating: 4.7,
    reviews: 18,
    badge: "admin-verified",
    badgeLabel: "✅ Admin Verified",
    badgeBg: "bg-leaf",
    badgeText: "text-white",
    inclusions: ["WiFi", "Water"],
    coverColor: "from-leaf/20 to-navy/10",
  },
  {
    id: 3,
    title: "Kuya Ben's Studio Room",
    location: "Banilad, Cebu City",
    nearSchool: "Near UV Visayas",
    price: 6500,
    type: "Private Room",
    gender: "Male Only",
    rating: 4.8,
    reviews: 11,
    badge: "site-visited",
    badgeLabel: "🏘️ Site Visited",
    badgeBg: "bg-navy-light",
    badgeText: "text-white",
    inclusions: ["WiFi", "Water", "Electricity", "Aircon"],
    coverColor: "from-navy/15 to-coral/8",
  },
  {
    id: 4,
    title: "Mabolo Bedspace for Girls",
    location: "Mabolo, Cebu City",
    nearSchool: "Near Cebu Normal",
    price: 3200,
    type: "Bedspace",
    gender: "Female Only",
    rating: 4.6,
    reviews: 32,
    badge: "preferred",
    badgeLabel: "⭐ Preferred",
    badgeBg: "bg-navy",
    badgeText: "text-golden",
    inclusions: ["WiFi", "Water"],
    coverColor: "from-golden/20 to-coral/10",
  },
  {
    id: 5,
    title: "Urgello Monthly Room",
    location: "Urgello, Cebu City",
    nearSchool: "Near Cebu Doc",
    price: 5500,
    type: "Private Room",
    gender: "Mixed",
    rating: 4.5,
    reviews: 8,
    badge: "admin-verified",
    badgeLabel: "✅ Admin Verified",
    badgeBg: "bg-leaf",
    badgeText: "text-white",
    inclusions: ["WiFi", "Water", "Electricity"],
    coverColor: "from-coral/15 to-navy/8",
  },
  {
    id: 6,
    title: "Mandaue Working Adults House",
    location: "Centro, Mandaue City",
    nearSchool: "Business District",
    price: 4200,
    type: "Bedspace",
    gender: "Mixed",
    rating: 4.8,
    reviews: 15,
    badge: "top-pick",
    badgeLabel: "👑 Top Pick",
    badgeBg: "bg-coral",
    badgeText: "text-white",
    inclusions: ["WiFi", "Water", "Electricity", "Laundry"],
    coverColor: "from-coral/25 to-golden/15",
  },
];

function ListingCard({ listing }: { listing: typeof mockListings[0] }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-warm-white-dark hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex-shrink-0 w-72 sm:w-auto">
      {/* Cover photo (illustrated placeholder) */}
      <div className={`relative h-44 bg-gradient-to-br ${listing.coverColor} overflow-hidden`}>
        <svg viewBox="0 0 280 176" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect width="280" height="176" fill="transparent"/>
          {/* Simple house illustration */}
          <rect x="80" y="80" width="120" height="90" rx="4" fill="white" fillOpacity="0.4"/>
          <path d="M70 88L140 50L210 88Z" fill="white" fillOpacity="0.5"/>
          <rect x="110" y="100" width="24" height="20" rx="3" fill="white" fillOpacity="0.6"/>
          <rect x="146" y="100" width="24" height="20" rx="3" fill="white" fillOpacity="0.6"/>
          <rect x="122" y="130" width="26" height="40" rx="3" fill="white" fillOpacity="0.5"/>
          <circle cx="226" cy="40" r="22" fill="white" fillOpacity="0.15"/>
          <circle cx="50" cy="130" r="14" fill="white" fillOpacity="0.15"/>
        </svg>
        {/* Badge */}
        <div className={`absolute top-3 left-3 ${listing.badgeBg} ${listing.badgeText} text-xs font-bold px-3 py-1 rounded-full`}
          style={{ fontFamily: "var(--font-plus-jakarta)" }}>
          {listing.badgeLabel}
        </div>
        {/* Price */}
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-navy font-bold text-sm px-3 py-1.5 rounded-xl shadow-sm"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}>
          ₱{listing.price.toLocaleString()}<span className="text-charcoal/50 font-normal text-xs">/mo</span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3
            className="text-navy font-bold text-sm leading-tight"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            {listing.title}
          </h3>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Star size={12} className="text-golden fill-golden" />
            <span className="text-charcoal text-xs font-semibold" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
              {listing.rating}
            </span>
            <span className="text-charcoal/40 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
              ({listing.reviews})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 mb-3">
          <MapPin size={11} className="text-coral flex-shrink-0" />
          <span className="text-charcoal-light text-xs" style={{ fontFamily: "var(--font-inter)" }}>
            {listing.location} · <span className="text-coral font-medium">{listing.nearSchool}</span>
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className="bg-warm-white text-charcoal text-xs px-2 py-0.5 rounded-full border border-warm-white-dark"
            style={{ fontFamily: "var(--font-inter)" }}>
            {listing.type}
          </span>
          <span className="bg-warm-white text-charcoal text-xs px-2 py-0.5 rounded-full border border-warm-white-dark"
            style={{ fontFamily: "var(--font-inter)" }}>
            {listing.gender}
          </span>
          {listing.inclusions.slice(0, 2).map((inc) => (
            <span key={inc} className="bg-leaf/8 text-leaf text-xs px-2 py-0.5 rounded-full"
              style={{ fontFamily: "var(--font-inter)" }}>
              {inc}
            </span>
          ))}
          {listing.inclusions.length > 2 && (
            <span className="bg-leaf/8 text-leaf text-xs px-2 py-0.5 rounded-full"
              style={{ fontFamily: "var(--font-inter)" }}>
              +{listing.inclusions.length - 2}
            </span>
          )}
        </div>

        <Link
          href="#"
          className="block w-full text-center bg-coral/8 text-coral font-semibold text-sm py-2.5 rounded-xl hover:bg-coral hover:text-white transition-all duration-200"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          View Listing
        </Link>
      </div>
    </div>
  );
}

export default function FeaturedListings() {
  return (
    <section id="listings" className="bg-warm-white-dark/40 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <p
              className="text-coral font-semibold text-sm uppercase tracking-widest mb-2"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              Verified Listings
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-navy"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Rooms near top schools
            </h2>
          </div>
          <Link
            href="#"
            className="text-coral font-semibold text-sm flex items-center gap-1.5 hover:gap-3 transition-all duration-200 flex-shrink-0"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            View all listings →
          </Link>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
          {mockListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>

        {/* CTA below listings */}
        <div className="text-center mt-10">
          <Link
            href="#"
            className="inline-flex items-center gap-2 bg-navy text-white font-semibold text-sm px-8 py-3.5 rounded-xl hover:bg-navy-light transition-colors shadow-sm"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Browse all verified listings
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
