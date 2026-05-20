import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ListingsClient from "@/components/listings/ListingsClient";
import { mockListings } from "@/lib/mock-listings";
import { Search, MapPin } from "lucide-react";

type SearchParams = {
  q?: string;
  type?: string;
  gender?: string;
  price?: string;
  badge?: string;
  inc?: string | string[];
};

export const metadata = {
  title: "Browse Listings — StayPH",
  description: "Find verified boarding houses and bedspaces near top Philippine universities.",
};

function filterListings(params: SearchParams) {
  let results = [...mockListings];

  if (params.q) {
    const q = params.q.toLowerCase();
    results = results.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        l.location.toLowerCase().includes(q) ||
        l.barangay.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q) ||
        l.nearSchool.toLowerCase().includes(q)
    );
  }

  if (params.type) {
    results = results.filter((l) => l.type === params.type);
  }

  if (params.gender) {
    results = results.filter((l) => l.gender === params.gender);
  }

  if (params.price) {
    const max = parseInt(params.price);
    results = results.filter((l) => l.price <= max);
  }

  if (params.badge) {
    results = results.filter((l) => l.badge === params.badge);
  }

  const inclusions = Array.isArray(params.inc)
    ? params.inc
    : params.inc
    ? [params.inc]
    : [];
  if (inclusions.length > 0) {
    results = results.filter((l) =>
      inclusions.every((inc) => l.inclusions.includes(inc))
    );
  }

  return results;
}

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const filtered = filterListings(params);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-warm-white pt-16">
        {/* Search header */}
        <div className="bg-navy py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <h1
              className="text-white font-bold text-2xl md:text-3xl mb-5"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              Verified Boarding Houses &amp; Bedspaces
            </h1>
            <form method="GET" action="/listings" className="flex gap-2">
              <div className="flex-1 bg-white rounded-xl flex items-center gap-2 px-4 py-3 max-w-lg">
                <MapPin size={16} className="text-coral flex-shrink-0" />
                <input
                  type="text"
                  name="q"
                  defaultValue={params.q ?? ""}
                  placeholder="City, university, or barangay..."
                  className="flex-1 text-charcoal placeholder-charcoal/40 text-sm bg-transparent outline-none"
                  style={{ fontFamily: "var(--font-inter)" }}
                />
              </div>
              <button
                type="submit"
                className="bg-coral text-white font-semibold text-sm px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-coral-dark transition-colors"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                <Search size={15} />
                Search
              </button>
            </form>

            {/* Quick filter chips */}
            <div className="flex flex-wrap gap-2 mt-4">
              {["Near USC", "Near UV Visayas", "Near CIT-U", "Female Only", "₱3,000 & below"].map((tag) => {
                const href =
                  tag === "Female Only"
                    ? "/listings?gender=female_only"
                    : tag === "₱3,000 & below"
                    ? "/listings?price=3000"
                    : `/listings?q=${encodeURIComponent(tag)}`;
                return (
                  <a
                    key={tag}
                    href={href}
                    className="bg-white/10 hover:bg-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/20 transition-colors"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {tag}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results */}
        <Suspense fallback={<div className="py-20 text-center text-charcoal-light">Loading...</div>}>
          <ListingsClient listings={filtered} total={mockListings.length} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
