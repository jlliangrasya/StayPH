import { createClient } from "@/lib/supabase/server"
import { MOCK_LISTINGS } from "@/lib/mock-data"
import { getSchool, haversineKm } from "@/lib/schools"
import type { Listing, ListingDetail } from "@/lib/types"

interface BrowseParams {
  city: string
  type?: string
  gender?: string
  min?: string
  max?: string
  amenities?: string
  curfew?: string
  sort?: string
}

function applyMockFilters(listings: ListingDetail[], params: BrowseParams): ListingDetail[] {
  const cityName = params.city.replace(/-/g, " ").toLowerCase()
  let result = listings.filter((l) => l.city.toLowerCase().includes(cityName))

  if (params.type)          result = result.filter((l) => l.listing_type === params.type)
  if (params.gender)        result = result.filter((l) => l.gender_policy === params.gender)
  if (params.min)           result = result.filter((l) => l.price_monthly >= Number(params.min))
  if (params.max)           result = result.filter((l) => l.price_monthly <= Number(params.max))
  if (params.curfew === "false") result = result.filter((l) => !l.has_curfew)

  if (params.amenities) {
    const required = params.amenities.split(",").filter(Boolean)
    result = result.filter((l) => {
      const has = new Set(l.listing_amenities.map((a) => a.amenity))
      return required.every((r) => has.has(r))
    })
  }

  switch (params.sort ?? "preferred") {
    case "price_asc":
      result.sort((a, b) => a.price_monthly - b.price_monthly)
      break
    case "price_desc":
      result.sort((a, b) => b.price_monthly - a.price_monthly)
      break
    case "rating":
      result.sort((a, b) => b.average_rating - a.average_rating)
      break
    case "newest":
      break
    default:
      result.sort((a, b) => {
        const scoreA = (a.is_top_pick ? 4 : 0) + (a.is_preferred ? 3 : 0) + (a.is_admin_verified ? 2 : 0) + a.average_rating * 0.2
        const scoreB = (b.is_top_pick ? 4 : 0) + (b.is_preferred ? 3 : 0) + (b.is_admin_verified ? 2 : 0) + b.average_rating * 0.2
        return scoreB - scoreA
      })
  }

  return result
}

export async function getListings(params: BrowseParams): Promise<Listing[]> {
  const supabase = await createClient()

  if (!supabase) {
    return applyMockFilters(MOCK_LISTINGS, params) as Listing[]
  }

  const CITY_NAMES: Record<string, string> = {
    cebu: "Cebu City", davao: "Davao City", iloilo: "Iloilo City",
    bacolod: "Bacolod City", cdo: "Cagayan de Oro", baguio: "Baguio City", manila: "Manila",
  }
  const cityName = CITY_NAMES[params.city.toLowerCase()] ?? params.city.replace(/-/g, " ")

  let query = supabase
    .from("listings")
    .select(`
      id, title, listing_type, gender_policy, address, barangay, city,
      price_monthly, available_slots, has_curfew, cooking_allowed,
      is_preferred, is_top_pick, is_admin_verified, is_site_visited,
      is_photo_verified, is_id_verified, average_rating, review_count, status,
      listing_photos ( url, is_cover ),
      listing_amenities ( amenity )
    `)
    .eq("status", "active")
    .ilike("city", `%${cityName}%`)

  if (params.type)           query = query.eq("listing_type", params.type)
  if (params.gender)         query = query.eq("gender_policy", params.gender)
  if (params.min)            query = query.gte("price_monthly", Number(params.min))
  if (params.max)            query = query.lte("price_monthly", Number(params.max))
  if (params.curfew === "false") query = query.eq("has_curfew", false)

  switch (params.sort ?? "preferred") {
    case "price_asc":  query = query.order("price_monthly", { ascending: true }); break
    case "price_desc": query = query.order("price_monthly", { ascending: false }); break
    case "rating":     query = query.order("average_rating", { ascending: false }); break
    default:
      query = query
        .order("is_top_pick",       { ascending: false })
        .order("is_preferred",      { ascending: false })
        .order("is_admin_verified", { ascending: false })
        .order("average_rating",    { ascending: false })
  }

  const { data, error } = await query
  if (error) { console.error("[StayPH]", error.message); return [] }

  let listings = (data ?? []) as unknown as Listing[]
  if (params.amenities) {
    const required = params.amenities.split(",").filter(Boolean)
    listings = listings.filter((l) => {
      const has = new Set(l.listing_amenities.map((a) => a.amenity))
      return required.every((r) => has.has(r))
    })
  }
  return listings
}

export async function getListingsNearSchool(
  citySlug: string,
  schoolSlug: string,
  filters: Omit<BrowseParams, "city"> = {}
): Promise<Array<Listing & { distanceKm: number }>> {
  const school = getSchool(schoolSlug)
  if (!school) return []

  const all = (await getListings({ city: citySlug, ...filters })) as ListingDetail[]

  return all
    .filter((l) => l.latitude != null && l.longitude != null)
    .map((l) => ({
      ...l,
      distanceKm: haversineKm(l.latitude!, l.longitude!, school.latitude, school.longitude),
    }))
    .filter((l) => l.distanceKm <= 3)
    .sort((a, b) => a.distanceKm - b.distanceKm)
}

export async function getListingsByBarangay(
  citySlug: string,
  barangaySlug: string,
  filters: Omit<BrowseParams, "city"> = {}
): Promise<Listing[]> {
  const barangayName = barangaySlug.replace(/-/g, " ").toLowerCase()
  const all = (await getListings({ city: citySlug, ...filters })) as ListingDetail[]
  return all.filter((l) => l.barangay?.toLowerCase() === barangayName)
}

export async function getListing(id: string): Promise<ListingDetail | null> {
  const supabase = await createClient()

  if (!supabase) {
    return MOCK_LISTINGS.find((l) => l.id === id) ?? null
  }

  const { data, error } = await supabase
    .from("listings")
    .select(`
      *,
      listing_photos ( url, is_cover, sort_order ),
      listing_amenities ( amenity ),
      listing_landmarks ( name, landmark_type, distance_meters, walking_minutes ),
      landlord:users!landlord_id ( id, full_name, avatar_url, phone, is_phone_verified, is_id_verified, created_at )
    `)
    .eq("id", id)
    .eq("status", "active")
    .single()

  if (error || !data) return null

  return {
    ...data,
    landmarks: data.listing_landmarks ?? [],
    landlord:  data.landlord ?? null,
  } as unknown as ListingDetail
}
