"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { X } from "lucide-react";

const TYPES = [
  { value: "bedspace", label: "Bedspace" },
  { value: "private_room", label: "Private Room" },
  { value: "studio", label: "Studio" },
  { value: "apartment", label: "Apartment" },
];

const GENDERS = [
  { value: "female_only", label: "Female Only" },
  { value: "male_only", label: "Male Only" },
  { value: "mixed", label: "Mixed" },
];

const INCLUSIONS = ["WiFi", "Water", "Electricity", "Aircon", "Laundry"];

const BADGES = [
  { value: "preferred", label: "⭐ Preferred" },
  { value: "top_pick", label: "👑 Top Pick" },
  { value: "site_visited", label: "🏘️ Site Visited" },
  { value: "admin_verified", label: "✅ Admin Verified" },
];

const PRICE_MAX = [
  { value: "3000", label: "Up to ₱3,000" },
  { value: "5000", label: "Up to ₱5,000" },
  { value: "7000", label: "Up to ₱7,000" },
  { value: "10000", label: "Up to ₱10,000" },
];

type Props = { onClose?: () => void };

export default function ListingsFilter({ onClose }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  const toggleArrayParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const existing = params.getAll(key);
      if (existing.includes(value)) {
        params.delete(key);
        existing.filter((v) => v !== value).forEach((v) => params.append(key, v));
      } else {
        params.append(key, value);
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  const clearAll = useCallback(() => {
    router.push(pathname);
  }, [router, pathname]);

  const hasFilters = searchParams.toString() !== "";
  const activeInclusions = searchParams.getAll("inc");

  return (
    <aside className="bg-white rounded-2xl border border-warm-white-dark p-5 sticky top-24">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-navy font-bold text-base" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
          Filters
        </h2>
        <div className="flex items-center gap-2">
          {hasFilters && (
            <button
              onClick={clearAll}
              className="text-coral text-xs font-semibold hover:underline"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Clear all
            </button>
          )}
          {onClose && (
            <button onClick={onClose} className="text-charcoal/50 hover:text-charcoal p-1">
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Price */}
      <div className="mb-5">
        <p className="text-navy font-semibold text-sm mb-2.5" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
          Max price / month
        </p>
        <div className="flex flex-col gap-1.5">
          {PRICE_MAX.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="price"
                value={opt.value}
                checked={searchParams.get("price") === opt.value}
                onChange={() => updateParam("price", opt.value)}
                className="accent-coral w-4 h-4"
              />
              <span
                className="text-charcoal text-sm group-hover:text-coral transition-colors"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {opt.label}
              </span>
            </label>
          ))}
          {searchParams.get("price") && (
            <button
              onClick={() => updateParam("price", null)}
              className="text-xs text-charcoal/50 hover:text-coral text-left mt-0.5"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <hr className="border-warm-white-dark mb-5" />

      {/* Type */}
      <div className="mb-5">
        <p className="text-navy font-semibold text-sm mb-2.5" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
          Room type
        </p>
        <div className="flex flex-col gap-1.5">
          {TYPES.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="type"
                value={opt.value}
                checked={searchParams.get("type") === opt.value}
                onChange={() => updateParam("type", opt.value)}
                className="accent-coral w-4 h-4"
              />
              <span
                className="text-charcoal text-sm group-hover:text-coral transition-colors"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {opt.label}
              </span>
            </label>
          ))}
          {searchParams.get("type") && (
            <button
              onClick={() => updateParam("type", null)}
              className="text-xs text-charcoal/50 hover:text-coral text-left mt-0.5"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <hr className="border-warm-white-dark mb-5" />

      {/* Gender */}
      <div className="mb-5">
        <p className="text-navy font-semibold text-sm mb-2.5" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
          Gender policy
        </p>
        <div className="flex flex-col gap-1.5">
          {GENDERS.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="gender"
                value={opt.value}
                checked={searchParams.get("gender") === opt.value}
                onChange={() => updateParam("gender", opt.value)}
                className="accent-coral w-4 h-4"
              />
              <span
                className="text-charcoal text-sm group-hover:text-coral transition-colors"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {opt.label}
              </span>
            </label>
          ))}
          {searchParams.get("gender") && (
            <button
              onClick={() => updateParam("gender", null)}
              className="text-xs text-charcoal/50 hover:text-coral text-left mt-0.5"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <hr className="border-warm-white-dark mb-5" />

      {/* Inclusions */}
      <div className="mb-5">
        <p className="text-navy font-semibold text-sm mb-2.5" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
          Inclusions
        </p>
        <div className="flex flex-col gap-1.5">
          {INCLUSIONS.map((inc) => (
            <label key={inc} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={activeInclusions.includes(inc)}
                onChange={() => toggleArrayParam("inc", inc)}
                className="accent-coral w-4 h-4 rounded"
              />
              <span
                className="text-charcoal text-sm group-hover:text-coral transition-colors"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {inc}
              </span>
            </label>
          ))}
        </div>
      </div>

      <hr className="border-warm-white-dark mb-5" />

      {/* Badge */}
      <div className="mb-2">
        <p className="text-navy font-semibold text-sm mb-2.5" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
          Verification level
        </p>
        <div className="flex flex-col gap-1.5">
          {BADGES.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="badge"
                value={opt.value}
                checked={searchParams.get("badge") === opt.value}
                onChange={() => updateParam("badge", opt.value)}
                className="accent-coral w-4 h-4"
              />
              <span
                className="text-charcoal text-sm group-hover:text-coral transition-colors"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {opt.label}
              </span>
            </label>
          ))}
          {searchParams.get("badge") && (
            <button
              onClick={() => updateParam("badge", null)}
              className="text-xs text-charcoal/50 hover:text-coral text-left mt-0.5"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
