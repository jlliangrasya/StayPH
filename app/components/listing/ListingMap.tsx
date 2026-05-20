"use client"

import { useEffect, useRef } from "react"
import type { Landmark } from "@/lib/types"

const LANDMARK_COLORS: Record<string, string> = {
  school:    "#FFB830",
  hospital:  "#EF4444",
  mall:      "#1A2E4A",
  church:    "#34A853",
  transport: "#6366F1",
}

const LANDMARK_EMOJI: Record<string, string> = {
  school:    "🎓",
  hospital:  "🏥",
  mall:      "🛍️",
  church:    "⛪",
  transport: "🚌",
}

interface Props {
  lat: number
  lng: number
  title: string
  landmarks?: Landmark[]
}

export default function ListingMap({ lat, lng, title, landmarks = [] }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<unknown>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    let map: ReturnType<typeof import("leaflet")["map"]>

    async function initMap() {
      const L = (await import("leaflet")).default
      await import("leaflet/dist/leaflet.css")

      map = L.map(containerRef.current!, {
        center: [lat, lng],
        zoom: 15,
        zoomControl: true,
        scrollWheelZoom: false,
      })

      mapRef.current = map

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map)

      // Listing marker — coral pin
      const listingIcon = L.divIcon({
        html: `
          <div style="
            position:relative;
            display:flex;
            flex-direction:column;
            align-items:center;
          ">
            <div style="
              background:#FF6B4A;
              color:white;
              font-size:11px;
              font-weight:700;
              font-family:'Plus Jakarta Sans',sans-serif;
              padding:4px 10px;
              border-radius:20px;
              white-space:nowrap;
              box-shadow:0 2px 8px rgba(255,107,74,0.4);
              border:2px solid white;
              max-width:160px;
              overflow:hidden;
              text-overflow:ellipsis;
            ">${title}</div>
            <div style="
              width:0;height:0;
              border-left:6px solid transparent;
              border-right:6px solid transparent;
              border-top:8px solid #FF6B4A;
            "></div>
          </div>`,
        className: "",
        iconAnchor: [60, 42],
      })
      L.marker([lat, lng], { icon: listingIcon })
        .addTo(map)

      // Landmark markers
      const landmarksWithCoords = landmarks.filter(
        (lm) => lm.latitude != null && lm.longitude != null
      )
      for (const lm of landmarksWithCoords) {
        const color = LANDMARK_COLORS[lm.landmark_type] ?? "#6B7280"
        const emoji = LANDMARK_EMOJI[lm.landmark_type] ?? "📍"
        const icon = L.divIcon({
          html: `
            <div style="
              background:${color};
              color:white;
              width:30px;height:30px;
              border-radius:50%;
              display:flex;
              align-items:center;
              justify-content:center;
              font-size:14px;
              box-shadow:0 2px 6px rgba(0,0,0,0.25);
              border:2px solid white;
            ">${emoji}</div>`,
          className: "",
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        })
        L.marker([lm.latitude!, lm.longitude!], { icon })
          .addTo(map)
          .bindTooltip(
            `<strong>${lm.name}</strong><br>${lm.walking_minutes} min walk`,
            { direction: "top", offset: [0, -16] }
          )
      }

      // Fit bounds to include all points if landmarks exist
      if (landmarksWithCoords.length > 0) {
        const allPoints: [number, number][] = [
          [lat, lng],
          ...landmarksWithCoords.map((lm) => [lm.latitude!, lm.longitude!] as [number, number]),
        ]
        map.fitBounds(L.latLngBounds(allPoints), { padding: [40, 40], maxZoom: 16 })
      }
    }

    initMap()

    return () => {
      if (mapRef.current) {
        ;(mapRef.current as ReturnType<typeof import("leaflet")["map"]>).remove()
        mapRef.current = null
      }
    }
  }, [lat, lng, title, landmarks])

  return (
    <div className="rounded-2xl overflow-hidden border border-warm-white-dark shadow-sm">
      <div ref={containerRef} style={{ height: 360 }} />
      {/* Legend + Directions */}
      <div className="px-4 py-3 bg-white flex flex-wrap items-center gap-4 border-t border-warm-white-dark">
        <div className="flex flex-wrap gap-4 flex-1">
          <LegendItem color="#FF6B4A" label="This listing" />
          {["school", "hospital", "mall", "church"].map((type) => {
            if (!landmarks.some((l) => l.landmark_type === type)) return null
            return (
              <LegendItem
                key={type}
                color={LANDMARK_COLORS[type]}
                emoji={LANDMARK_EMOJI[type]}
                label={type.charAt(0).toUpperCase() + type.slice(1)}
              />
            )
          })}
        </div>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white shrink-0"
          style={{ background: "#FF6B4A", fontFamily: "var(--font-inter)" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="3 11 22 2 13 21 11 13 3 11" />
          </svg>
          Get Directions
        </a>
      </div>
    </div>
  )
}

function LegendItem({ color, emoji, label }: { color: string; emoji?: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        style={{ background: color, width: 12, height: 12, borderRadius: "50%", display: "inline-block", flexShrink: 0 }}
      />
      <span className="text-charcoal/60 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
        {emoji} {label}
      </span>
    </div>
  )
}
