export interface School {
  slug: string
  shortName: string
  fullName: string
  city: string
  citySlug: string
  latitude: number
  longitude: number
}

export const SCHOOLS: School[] = [
  { slug: "usc",   shortName: "USC",   fullName: "University of San Carlos",                  city: "Cebu City", citySlug: "cebu", latitude: 10.3157, longitude: 123.8854 },
  { slug: "uv",    shortName: "UV",    fullName: "University of the Visayas",                  city: "Cebu City", citySlug: "cebu", latitude: 10.2934, longitude: 123.9015 },
  { slug: "cit-u", shortName: "CIT-U", fullName: "Cebu Institute of Technology - University", city: "Cebu City", citySlug: "cebu", latitude: 10.3634, longitude: 123.9197 },
  { slug: "cnu",   shortName: "CNU",   fullName: "Cebu Normal University",                    city: "Cebu City", citySlug: "cebu", latitude: 10.3002, longitude: 123.8981 },
  { slug: "uc",    shortName: "UC",    fullName: "University of Cebu",                        city: "Cebu City", citySlug: "cebu", latitude: 10.2939, longitude: 123.9002 },
  { slug: "swu",   shortName: "SWU",   fullName: "Southwestern University PHINMA",            city: "Cebu City", citySlug: "cebu", latitude: 10.2856, longitude: 123.8744 },
]

export function getSchool(slug: string): School | undefined {
  return SCHOOLS.find((s) => s.slug === slug.toLowerCase())
}

/** Straight-line distance in km between two coordinates (Haversine). */
export function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371
  const toRad = (d: number) => (d * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.asin(Math.sqrt(a))
}

/** Resolve a raw search query to a StayPH URL path. */
export function resolveSearchQuery(raw: string): string {
  const q = raw.trim().toLowerCase()
  if (!q) return "/cebu"

  // School patterns → /[city]/near/[school]
  const schoolMap: Record<string, string> = {
    usc: "/cebu/near/usc", "san carlos": "/cebu/near/usc",
    "uv": "/cebu/near/uv", "university of the visayas": "/cebu/near/uv", "uv visayas": "/cebu/near/uv",
    "cit-u": "/cebu/near/cit-u", citu: "/cebu/near/cit-u", "cebu institute": "/cebu/near/cit-u",
    cnu: "/cebu/near/cnu", "cebu normal": "/cebu/near/cnu",
    "uc": "/cebu/near/uc", "university of cebu": "/cebu/near/uc",
    swu: "/cebu/near/swu", southwestern: "/cebu/near/swu",
  }
  for (const [pattern, path] of Object.entries(schoolMap)) {
    if (q.includes(pattern)) return path
  }

  // Barangay patterns → /[city]/[barangay]
  const barangayMap: Record<string, string> = {
    lahug: "/cebu/lahug", talamban: "/cebu/talamban", banilad: "/cebu/banilad",
    mabolo: "/cebu/mabolo", apas: "/cebu/apas", pardo: "/cebu/pardo",
    parian: "/cebu/parian", colon: "/cebu/parian", mandaue: "/mandaue",
  }
  for (const [pattern, path] of Object.entries(barangayMap)) {
    if (q.includes(pattern)) return path
  }

  // City patterns → /[city]
  const cityMap: Record<string, string> = {
    cebu: "/cebu", davao: "/davao", iloilo: "/iloilo",
    bacolod: "/bacolod", baguio: "/baguio", manila: "/manila", cdo: "/cdo",
  }
  for (const [pattern, path] of Object.entries(cityMap)) {
    if (q.includes(pattern)) return path
  }

  // Fallback: default city
  return "/cebu"
}
