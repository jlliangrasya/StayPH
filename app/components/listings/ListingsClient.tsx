"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import ListingCard from "@/components/listings/ListingCard";
import ListingsFilter from "@/components/listings/ListingsFilter";
import type { Listing } from "@/lib/types";

type Props = {
  listings: Listing[];
  total: number;
};

export default function ListingsClient({ listings, total }: Props) {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-charcoal text-sm" style={{ fontFamily: "var(--font-inter)" }}>
          <span className="font-bold text-navy">{listings.length}</span> of {total} listings
        </p>
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="lg:hidden flex items-center gap-2 border border-warm-white-dark rounded-xl px-4 py-2 text-sm text-charcoal hover:border-coral hover:text-coral transition-colors"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          <SlidersHorizontal size={15} />
          Filters
        </button>
      </div>

      <div className="flex gap-8 items-start">
        {/* Desktop sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <ListingsFilter />
        </div>

        {/* Listing grid */}
        <div className="flex-1 min-w-0">
          {listings.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">🏘️</p>
              <p className="text-navy font-bold text-lg mb-2" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                No listings found
              </p>
              <p className="text-charcoal-light text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                Try adjusting your filters or search query.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {listings.map((listing, i) => (
                <ListingCard key={listing.id} listing={listing} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-warm-white overflow-y-auto p-4">
            <ListingsFilter onClose={() => setMobileFilterOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
