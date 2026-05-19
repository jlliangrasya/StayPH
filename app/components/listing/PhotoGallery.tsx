"use client"

import { useState } from "react"
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react"
import type { ListingPhoto } from "@/lib/types"

const PHOTO_GRADIENTS = [
  "from-coral/20 to-golden/10",
  "from-navy/15 to-coral/8",
  "from-leaf/15 to-navy/8",
  "from-golden/20 to-coral/10",
  "from-coral/15 to-navy/10",
  "from-navy/20 to-leaf/8",
]

const PHOTO_LABELS = ["Living Room", "Bedroom", "Bathroom", "Common Area", "Entrance", "View"]

function PhotoPlaceholder({ index, className = "" }: { index: number; className?: string }) {
  const gradient = PHOTO_GRADIENTS[index % PHOTO_GRADIENTS.length]
  const label = PHOTO_LABELS[index % PHOTO_LABELS.length]
  return (
    <div className={`bg-gradient-to-br ${gradient} flex flex-col items-center justify-center ${className}`}>
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mb-2 opacity-40">
        <rect x="12" y="22" width="24" height="20" rx="2" fill="white" />
        <path d="M10 24L24 14L38 24Z" fill="white" />
        <rect x="19" y="28" width="6" height="6" rx="1" fill="white" fillOpacity="0.6" />
        <rect x="23" y="34" width="6" height="8" rx="1" fill="white" fillOpacity="0.5" />
      </svg>
      <span className="text-charcoal/40 text-xs font-medium">{label}</span>
    </div>
  )
}

export default function PhotoGallery({
  photos,
  title,
}: {
  photos: ListingPhoto[]
  title: string
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const count = photos.length

  const open = (i: number) => { setActiveIdx(i); setLightboxOpen(true) }
  const prev = () => setActiveIdx((i) => (i - 1 + count) % count)
  const next = () => setActiveIdx((i) => (i + 1) % count)

  return (
    <>
      {/* Grid */}
      <div className="relative h-[340px] sm:h-[420px] md:h-[480px] overflow-hidden bg-warm-white-dark">
        {count === 0 ? (
          <PhotoPlaceholder index={0} className="w-full h-full" />
        ) : count === 1 ? (
          <button onClick={() => open(0)} className="w-full h-full block">
            {photos[0].url ? (
              <img src={photos[0].url} alt={title} className="w-full h-full object-cover" />
            ) : (
              <PhotoPlaceholder index={0} className="w-full h-full" />
            )}
          </button>
        ) : (
          <div className="grid grid-cols-4 grid-rows-2 h-full gap-1">
            {/* Hero photo — spans 2 cols, 2 rows */}
            <button
              onClick={() => open(0)}
              className="col-span-2 row-span-2 overflow-hidden hover:opacity-95 transition-opacity"
            >
              {photos[0].url ? (
                <img src={photos[0].url} alt={title} className="w-full h-full object-cover" />
              ) : (
                <PhotoPlaceholder index={0} className="w-full h-full" />
              )}
            </button>
            {/* Remaining photos in 2x2 grid */}
            {[1, 2, 3, 4].map((i) => (
              <button
                key={i}
                onClick={() => open(i < count ? i : 0)}
                className="overflow-hidden hover:opacity-95 transition-opacity"
              >
                {i < count && photos[i].url ? (
                  <img src={photos[i].url} alt={`${title} photo ${i + 1}`} className="w-full h-full object-cover" />
                ) : (
                  <PhotoPlaceholder index={i} className="w-full h-full" />
                )}
              </button>
            ))}
          </div>
        )}

        {/* Show all photos button */}
        {count > 0 && (
          <button
            onClick={() => open(0)}
            className="absolute bottom-4 right-4 bg-white text-charcoal font-semibold text-sm px-4 py-2 rounded-xl shadow-md flex items-center gap-2 hover:shadow-lg transition-shadow border border-warm-white-dark"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            <Images size={16} />
            Show all {count} photos
          </button>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal/95 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 flex-shrink-0">
            <span className="text-white/70 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
              {activeIdx + 1} / {count}
            </span>
            <h2 className="text-white font-semibold text-sm" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
              {title}
            </h2>
            <button
              onClick={() => setLightboxOpen(false)}
              className="p-2 text-white/70 hover:text-white transition-colors"
            >
              <X size={22} />
            </button>
          </div>

          {/* Main photo */}
          <div className="flex-1 relative flex items-center justify-center px-12">
            {photos[activeIdx]?.url ? (
              <img
                src={photos[activeIdx].url}
                alt={`${title} photo ${activeIdx + 1}`}
                className="max-w-full max-h-full object-contain rounded-xl"
              />
            ) : (
              <PhotoPlaceholder index={activeIdx} className="w-full max-w-2xl h-96 rounded-xl" />
            )}

            <button
              onClick={prev}
              className="absolute left-2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={next}
              className="absolute right-2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Thumbnail strip */}
          <div className="flex gap-2 px-4 py-3 overflow-x-auto flex-shrink-0">
            {photos.map((p, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                  i === activeIdx ? "border-coral" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                {p.url ? (
                  <img src={p.url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <PhotoPlaceholder index={i} className="w-full h-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
