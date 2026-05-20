export type ListingType = 'bedspace' | 'private_room' | 'studio' | 'apartment'
export type GenderPolicy = 'male_only' | 'female_only' | 'mixed'
export type ListingStatus = 'draft' | 'pending' | 'active' | 'suspended' | 'inactive'
export type UserRole = 'tenant' | 'landlord' | 'admin' | 'field_verifier'

// ─── User ────────────────────────────────────────────────────────────────────

export interface User {
  id: string
  email: string
  phone: string | null
  full_name: string
  role: UserRole
  avatar_url: string | null
  is_phone_verified: boolean
  is_id_verified: boolean
  is_suspended: boolean
  created_at: string
}

// ─── Listings ─────────────────────────────────────────────────────────────────

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

// ─── Reviews ──────────────────────────────────────────────────────────────────

export interface Review {
  id: string
  listing_id: string
  tenant_id: string
  tenant: Pick<User, 'id' | 'full_name' | 'avatar_url' | 'is_id_verified'>
  rating_overall: number
  rating_cleanliness: number | null
  rating_safety: number | null
  rating_landlord: number | null
  rating_wifi: number | null
  rating_utilities: number | null
  comment: string | null
  landlord_response: string | null
  landlord_responded_at: string | null
  stay_from: string | null
  stay_to: string | null
  is_verified_stay: boolean
  created_at: string
}

export interface ReviewFormData {
  rating_overall: number
  rating_cleanliness: number
  rating_safety: number
  rating_landlord: number
  rating_wifi: number
  rating_utilities: number
  comment: string
  stay_from: string
  stay_to: string
}

// ─── Messages ─────────────────────────────────────────────────────────────────

export interface Message {
  id: string
  conversation_id: string
  sender_id: string
  receiver_id: string
  listing_id: string | null
  content: string
  is_read: boolean
  contains_gcash_flag: boolean
  created_at: string
}

export interface Conversation {
  id: string
  listing_id: string | null
  listing_title: string | null
  listing_photo: string | null
  tenant_id: string
  landlord_id: string
  other_user: Pick<User, 'id' | 'full_name' | 'avatar_url'>
  last_message: string | null
  last_message_at: string | null
  unread_count: number
  created_at: string
}

// ─── Appointments ─────────────────────────────────────────────────────────────

export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no_show'

export interface Appointment {
  id: string
  listing_id: string
  listing_title: string
  tenant_id: string
  landlord_id: string
  other_user: Pick<User, 'id' | 'full_name' | 'avatar_url'>
  proposed_date: string
  status: AppointmentStatus
  tenant_notes: string | null
  landlord_notes: string | null
  post_visit_feedback: string | null
  created_at: string
}

// ─── Reports ──────────────────────────────────────────────────────────────────

export type ReportReason = 'scam' | 'fake_photos' | 'wrong_info' | 'outside_payment' | 'other'
export type ReportStatus = 'pending' | 'reviewed' | 'resolved' | 'dismissed'

export interface Report {
  id: string
  reporter_id: string
  listing_id: string
  listing_title: string
  reason: ReportReason
  description: string | null
  status: ReportStatus
  reviewed_by: string | null
  resolution_note: string | null
  created_at: string
}

// ─── Bookmarks ────────────────────────────────────────────────────────────────

export interface Bookmark {
  id: string
  tenant_id: string
  listing_id: string
  created_at: string
}

// ─── Verification Documents ───────────────────────────────────────────────────

export type VerificationDocType =
  | 'gov_id'
  | 'school_id'
  | 'enrollment'
  | 'company_id'
  | 'coe'
  | 'tax_declaration'
  | 'title'
  | 'lease_contract'
  | 'barangay_cert'

export type VerificationDocStatus = 'pending' | 'approved' | 'rejected'

export type VerificationDocOwner = 'tenant' | 'landlord'

export interface VerificationDocument {
  id: string
  owner_type: VerificationDocOwner
  owner_id: string
  owner_name: string
  listing_id: string | null
  listing_title: string | null
  doc_type: VerificationDocType
  file_url: string
  file_name: string
  notes: string | null
  status: VerificationDocStatus
  reviewed_by: string | null
  rejection_reason: string | null
  submitted_at: string
  reviewed_at: string | null
}

// ─── Visit Reports ─────────────────────────────────────────────────────────────

export type VisitRecommendation = 'preferred' | 'admin_verified' | 'needs_improvement' | 'reject'
export type VisitType = 'physical' | 'video_call'

export interface VisitChecklist {
  cleanliness: boolean
  ventilation: boolean
  safety_exits: boolean
  cctv_present: boolean
  water_supply: boolean
  electricity_stable: boolean
  matches_photos: boolean
  landlord_cooperative: boolean
}

export interface VisitReport {
  id: string
  listing_id: string
  listing_title: string
  verifier_id: string
  verifier_name: string
  visit_type: VisitType
  visited_at: string
  recommendation: VisitRecommendation
  checklist: VisitChecklist
  photos: string[]
  notes: string
  latitude: number | null
  longitude: number | null
  created_at: string
}

// ─── Price History ─────────────────────────────────────────────────────────────

export interface PriceHistory {
  id: string
  listing_id: string
  old_price: number | null
  new_price: number
  changed_by: string
  change_reason: string | null
  changed_at: string
}

// ─── Payments ─────────────────────────────────────────────────────────────────

export type PaymentType = 'featured_listing' | 'preferred_visit' | 'escrow_deposit'
export type PaymentStatus = 'pending' | 'paid' | 'held' | 'released' | 'refunded' | 'failed'
export type PaymentMethod = 'gcash' | 'paymongo'

export interface Payment {
  id: string
  listing_id: string
  listing_title: string
  payer_id: string
  payer_name: string
  payment_type: PaymentType
  payment_method: PaymentMethod
  amount: number
  status: PaymentStatus
  reference_number: string | null
  gcash_number: string | null
  paymongo_payment_id: string | null
  notes: string | null
  paid_at: string | null
  released_at: string | null
  refunded_at: string | null
  created_at: string
}

// ─── Lease Agreements ─────────────────────────────────────────────────────────

export type LeaseStatus = 'draft' | 'signed_tenant' | 'signed_landlord' | 'active' | 'ended' | 'disputed'

export interface LeaseAgreement {
  id: string
  listing_id: string
  listing_title: string
  listing_address: string
  tenant_id: string
  tenant_name: string
  tenant_phone: string | null
  landlord_id: string
  landlord_name: string
  landlord_phone: string | null
  lease_start: string
  lease_end: string
  monthly_rent: number
  deposit_amount: number
  advance_months: number
  included_utilities: string[]
  house_rules: string | null
  status: LeaseStatus
  signed_by_tenant_at: string | null
  signed_by_landlord_at: string | null
  created_at: string
}

// ─── Background Checks ────────────────────────────────────────────────────────

export type BackgroundCheckStatus = 'pending' | 'processing' | 'completed' | 'failed'

export interface BackgroundCheck {
  id: string
  requested_by: string
  requested_by_name: string
  tenant_id: string
  tenant_name: string
  listing_id: string
  listing_title: string
  status: BackgroundCheckStatus
  amount: number
  result_summary: string | null
  has_criminal_record: boolean | null
  has_eviction_history: boolean | null
  id_verified: boolean | null
  notes: string | null
  requested_at: string
  completed_at: string | null
}
