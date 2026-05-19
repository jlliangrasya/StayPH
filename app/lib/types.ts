export type ListingType = 'bedspace' | 'private_room' | 'studio' | 'apartment'
export type GenderPolicy = 'male_only' | 'female_only' | 'mixed'
export type ListingStatus = 'draft' | 'pending' | 'active' | 'suspended' | 'inactive'

export interface ListingPhoto {
  url: string
  is_cover: boolean
}

export interface ListingAmenity {
  amenity: string
}

export interface Listing {
  id: string
  title: string
  listing_type: ListingType
  gender_policy: GenderPolicy
  address: string
  barangay: string | null
  city: string
  latitude: number | null
  longitude: number | null
  price_monthly: number
  available_slots: number
  has_curfew: boolean
  cooking_allowed: boolean
  is_preferred: boolean
  is_top_pick: boolean
  is_admin_verified: boolean
  is_site_visited: boolean
  is_photo_verified: boolean
  is_id_verified: boolean
  average_rating: number
  review_count: number
  status: ListingStatus
  listing_photos: ListingPhoto[]
  listing_amenities: ListingAmenity[]
}

export interface BrowseFilters {
  type?: ListingType
  gender?: GenderPolicy
  minPrice?: number
  maxPrice?: number
  amenities?: string[]
  curfew?: boolean
  sort?: 'preferred' | 'price_asc' | 'price_desc' | 'rating' | 'newest'
}

export interface Landmark {
  name: string
  landmark_type: string
  distance_meters: number
  walking_minutes: number
  latitude?: number
  longitude?: number
}

export interface LandlordProfile {
  id: string
  full_name: string
  avatar_url: string | null
  phone: string | null
  is_phone_verified: boolean
  is_id_verified: boolean
  created_at: string
}

export interface ListingDetail extends Listing {
  description: string
  address: string
  province: string
  curfew_time: string | null
  pets_allowed: boolean
  lease_terms: string[]
  house_rules: string | null
  total_slots: number
  preferred_note: string | null
  landlord: LandlordProfile
  landmarks: Landmark[]
}
