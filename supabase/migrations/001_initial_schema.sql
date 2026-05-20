-- StayPH Initial Schema
-- Run this in your Supabase SQL editor at:
-- https://supabase.com/dashboard/project/_/sql

-- ============================================================
-- USERS
-- ============================================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  phone TEXT UNIQUE,
  full_name TEXT NOT NULL,
  role TEXT CHECK (role IN ('tenant', 'landlord', 'admin', 'field_verifier')) DEFAULT 'tenant',
  avatar_url TEXT,
  is_phone_verified BOOLEAN DEFAULT FALSE,
  is_id_verified BOOLEAN DEFAULT FALSE,
  is_suspended BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- UNIVERSITIES (powers near-school search)
-- ============================================================
CREATE TABLE universities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  short_name TEXT,
  city TEXT NOT NULL,
  latitude DECIMAL(9,6) NOT NULL,
  longitude DECIMAL(9,6) NOT NULL,
  type TEXT CHECK (type IN ('university', 'college', 'technical', 'graduate_school'))
);

-- Seed Cebu universities
INSERT INTO universities (name, short_name, city, latitude, longitude, type) VALUES
  ('University of San Carlos', 'USC', 'Cebu City', 10.3157, 123.8854, 'university'),
  ('University of the Visayas', 'UV', 'Cebu City', 10.2934, 123.9015, 'university'),
  ('Cebu Institute of Technology - University', 'CIT-U', 'Cebu City', 10.3310, 123.9122, 'university'),
  ('Cebu Normal University', 'CNU', 'Cebu City', 10.3002, 123.8981, 'university'),
  ('University of Cebu', 'UC', 'Cebu City', 10.2939, 123.9002, 'university'),
  ('Southwestern University PHINMA', 'SWU', 'Cebu City', 10.3068, 123.8912, 'university');

-- ============================================================
-- LISTINGS
-- ============================================================
CREATE TABLE listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  landlord_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  listing_type TEXT CHECK (listing_type IN ('bedspace', 'private_room', 'studio', 'apartment')),
  gender_policy TEXT CHECK (gender_policy IN ('male_only', 'female_only', 'mixed')),
  address TEXT NOT NULL,
  barangay TEXT,
  city TEXT NOT NULL,
  province TEXT NOT NULL,
  latitude DECIMAL(9,6),
  longitude DECIMAL(9,6),
  price_monthly DECIMAL(10,2) NOT NULL,
  available_slots INT DEFAULT 1,
  total_slots INT DEFAULT 1,
  has_curfew BOOLEAN DEFAULT FALSE,
  curfew_time TIME,
  cooking_allowed BOOLEAN DEFAULT FALSE,
  pets_allowed BOOLEAN DEFAULT FALSE,
  lease_terms TEXT[],
  house_rules TEXT,
  status TEXT CHECK (status IN ('draft', 'pending', 'active', 'suspended', 'inactive')) DEFAULT 'pending',

  -- Verification levels
  is_phone_verified BOOLEAN DEFAULT FALSE,
  is_id_verified BOOLEAN DEFAULT FALSE,
  is_property_verified BOOLEAN DEFAULT FALSE,
  is_photo_verified BOOLEAN DEFAULT FALSE,
  is_video_verified BOOLEAN DEFAULT FALSE,
  is_admin_verified BOOLEAN DEFAULT FALSE,
  is_site_visited BOOLEAN DEFAULT FALSE,
  is_preferred BOOLEAN DEFAULT FALSE,
  is_top_pick BOOLEAN DEFAULT FALSE,

  -- Preferred tag details
  preferred_note TEXT,
  preferred_by UUID REFERENCES users(id),
  preferred_at TIMESTAMPTZ,
  preferred_expires_at TIMESTAMPTZ,

  -- Stats
  view_count INT DEFAULT 0,
  inquiry_count INT DEFAULT 0,
  average_rating DECIMAL(3,2) DEFAULT 0,
  review_count INT DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- LISTING PHOTOS
-- ============================================================
CREATE TABLE listing_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  caption TEXT,
  photo_type TEXT CHECK (photo_type IN ('room', 'bathroom', 'common_area', 'entrance', 'neighborhood', 'other')),
  is_cover BOOLEAN DEFAULT FALSE,
  geo_lat DECIMAL(9,6),
  geo_lng DECIMAL(9,6),
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- LISTING AMENITIES
-- ============================================================
CREATE TABLE listing_amenities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  amenity TEXT NOT NULL  -- 'wifi', 'water', 'electricity', 'laundry', 'cooking', 'parking', 'aircon', 'ref', 'tv'
);

-- ============================================================
-- LISTING LANDMARKS
-- ============================================================
CREATE TABLE listing_landmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  landmark_type TEXT,
  distance_meters INT,
  walking_minutes INT
);

-- ============================================================
-- REVIEWS
-- ============================================================
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES users(id) ON DELETE SET NULL,
  rating_overall DECIMAL(3,2) NOT NULL CHECK (rating_overall BETWEEN 1 AND 5),
  rating_cleanliness DECIMAL(3,2) CHECK (rating_cleanliness BETWEEN 1 AND 5),
  rating_safety DECIMAL(3,2) CHECK (rating_safety BETWEEN 1 AND 5),
  rating_landlord DECIMAL(3,2) CHECK (rating_landlord BETWEEN 1 AND 5),
  rating_wifi DECIMAL(3,2) CHECK (rating_wifi BETWEEN 1 AND 5),
  rating_utilities DECIMAL(3,2) CHECK (rating_utilities BETWEEN 1 AND 5),
  comment TEXT,
  landlord_response TEXT,
  landlord_responded_at TIMESTAMPTZ,
  stay_from DATE,
  stay_to DATE,
  is_visible BOOLEAN DEFAULT TRUE,
  is_verified_stay BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- CONVERSATIONS & MESSAGES
-- ============================================================
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID REFERENCES listings(id) ON DELETE SET NULL,
  tenant_id UUID REFERENCES users(id) ON DELETE CASCADE,
  landlord_id UUID REFERENCES users(id) ON DELETE CASCADE,
  last_message_at TIMESTAMPTZ,
  is_archived_by_tenant BOOLEAN DEFAULT FALSE,
  is_archived_by_landlord BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES users(id) ON DELETE SET NULL,
  receiver_id UUID REFERENCES users(id) ON DELETE SET NULL,
  listing_id UUID REFERENCES listings(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  contains_gcash_flag BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- VIEWING APPOINTMENTS
-- ============================================================
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES users(id) ON DELETE CASCADE,
  landlord_id UUID REFERENCES users(id) ON DELETE CASCADE,
  proposed_date TIMESTAMPTZ NOT NULL,
  status TEXT CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed', 'no_show')) DEFAULT 'pending',
  tenant_notes TEXT,
  landlord_notes TEXT,
  post_visit_feedback TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- BOOKMARKS
-- ============================================================
CREATE TABLE bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES users(id) ON DELETE CASCADE,
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tenant_id, listing_id)
);

-- ============================================================
-- REPORTS
-- ============================================================
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID REFERENCES users(id) ON DELETE SET NULL,
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  reason TEXT CHECK (reason IN ('scam', 'fake_photos', 'wrong_info', 'outside_payment', 'other')),
  description TEXT,
  status TEXT CHECK (status IN ('pending', 'reviewed', 'resolved', 'dismissed')) DEFAULT 'pending',
  reviewed_by UUID REFERENCES users(id),
  resolution_note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PAYMENTS & ESCROW
-- ============================================================
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID REFERENCES listings(id),
  tenant_id UUID REFERENCES users(id),
  landlord_id UUID REFERENCES users(id),
  amount DECIMAL(10,2) NOT NULL,
  payment_type TEXT CHECK (payment_type IN ('deposit', 'advance', 'monthly')),
  status TEXT CHECK (status IN ('pending', 'held', 'released', 'refunded', 'disputed')) DEFAULT 'pending',
  paymongo_payment_id TEXT,
  moved_in_confirmed_at TIMESTAMPTZ,
  released_at TIMESTAMPTZ,
  refunded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- DISPUTES
-- ============================================================
CREATE TABLE disputes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_id UUID REFERENCES payments(id),
  listing_id UUID REFERENCES listings(id),
  tenant_id UUID REFERENCES users(id),
  landlord_id UUID REFERENCES users(id),
  opened_by TEXT CHECK (opened_by IN ('tenant', 'landlord')),
  reason TEXT NOT NULL,
  description TEXT,
  status TEXT CHECK (status IN ('open', 'under_review', 'resolved_tenant', 'resolved_landlord', 'escalated')) DEFAULT 'open',
  resolved_by UUID REFERENCES users(id),
  resolution_note TEXT,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- VERIFICATION DOCUMENTS (Landlord)
-- ============================================================
CREATE TABLE verification_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  doc_type TEXT CHECK (doc_type IN ('government_id', 'tax_declaration', 'title', 'lease_contract', 'barangay_cert', 'other')),
  url TEXT NOT NULL,
  status TEXT CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  reviewed_by UUID REFERENCES users(id),
  review_note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TENANT VERIFICATION DOCUMENTS
-- ============================================================
CREATE TABLE tenant_verification_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  doc_type TEXT CHECK (doc_type IN ('government_id', 'school_id', 'enrollment_form', 'company_id', 'coe', 'other')),
  url TEXT NOT NULL,
  status TEXT CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  reviewed_by UUID REFERENCES users(id),
  review_note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ADMIN / FIELD VISIT REPORTS
-- ============================================================
CREATE TABLE visit_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  verifier_id UUID REFERENCES users(id),
  visit_type TEXT CHECK (visit_type IN ('physical', 'video_call')),
  visit_date TIMESTAMPTZ,
  checklist JSONB,
  photos TEXT[],
  notes TEXT,
  recommendation TEXT CHECK (recommendation IN ('preferred', 'admin_verified', 'needs_improvement', 'reject')),
  approved_by UUID REFERENCES users(id),
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- LEASE AGREEMENTS
-- ============================================================
CREATE TABLE lease_agreements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID REFERENCES listings(id),
  tenant_id UUID REFERENCES users(id),
  landlord_id UUID REFERENCES users(id),
  lease_start DATE NOT NULL,
  lease_end DATE NOT NULL,
  monthly_rent DECIMAL(10,2) NOT NULL,
  deposit_amount DECIMAL(10,2),
  advance_months INT DEFAULT 1,
  status TEXT CHECK (status IN ('draft', 'signed_tenant', 'signed_landlord', 'active', 'ended', 'disputed')) DEFAULT 'draft',
  pdf_url TEXT,
  signed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROOM BOOKINGS
-- ============================================================
CREATE TABLE room_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES users(id) ON DELETE CASCADE,
  lease_id UUID REFERENCES lease_agreements(id),
  move_in_date DATE NOT NULL,
  move_out_date DATE,
  status TEXT CHECK (status IN ('confirmed', 'active', 'ended', 'cancelled')) DEFAULT 'confirmed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- NOTIFICATIONS
-- ============================================================
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type TEXT,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PRICE HISTORY
-- ============================================================
CREATE TABLE price_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  old_price DECIMAL(10,2),
  new_price DECIMAL(10,2),
  changed_by UUID REFERENCES users(id),
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SAVED SEARCHES
-- ============================================================
CREATE TABLE saved_searches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES users(id) ON DELETE CASCADE,
  city TEXT,
  university_id UUID REFERENCES universities(id),
  max_price DECIMAL(10,2),
  listing_type TEXT,
  gender_policy TEXT,
  notify_by_email BOOLEAN DEFAULT TRUE,
  notify_by_sms BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ADMIN AUDIT LOG
-- ============================================================
CREATE TABLE admin_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES users(id),
  action TEXT NOT NULL,
  target_type TEXT,
  target_id UUID,
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INDEXES (performance)
-- ============================================================
CREATE INDEX idx_listings_city ON listings(city);
CREATE INDEX idx_listings_status ON listings(status);
CREATE INDEX idx_listings_price ON listings(price_monthly);
CREATE INDEX idx_listings_preferred ON listings(is_preferred DESC, is_top_pick DESC);
CREATE INDEX idx_listings_rating ON listings(average_rating DESC);
CREATE INDEX idx_listing_amenities_listing ON listing_amenities(listing_id);
CREATE INDEX idx_listing_photos_listing ON listing_photos(listing_id);
CREATE INDEX idx_messages_conversation ON messages(conversation_id);
CREATE INDEX idx_notifications_user ON notifications(user_id, is_read);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_documents ENABLE ROW LEVEL SECURITY;

-- Active listings are publicly readable (for browse page)
CREATE POLICY "Public can read active listings"
  ON listings FOR SELECT
  USING (status = 'active');

CREATE POLICY "Public can read listing photos"
  ON listing_photos FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM listings WHERE id = listing_id AND status = 'active')
  );

CREATE POLICY "Public can read listing amenities"
  ON listing_amenities FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM listings WHERE id = listing_id AND status = 'active')
  );

CREATE POLICY "Public can read reviews"
  ON reviews FOR SELECT
  USING (is_visible = TRUE);

-- Landlords can manage their own listings
CREATE POLICY "Landlords can insert their listings"
  ON listings FOR INSERT
  WITH CHECK (auth.uid() = landlord_id);

CREATE POLICY "Landlords can update their listings"
  ON listings FOR UPDATE
  USING (auth.uid() = landlord_id);

-- Authenticated users can manage their bookmarks
CREATE POLICY "Users can manage their bookmarks"
  ON bookmarks FOR ALL
  USING (auth.uid() = tenant_id);

-- Users can read their own notifications
CREATE POLICY "Users can read their notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

-- Users can read their own conversations
CREATE POLICY "Users can read their conversations"
  ON conversations FOR SELECT
  USING (auth.uid() = tenant_id OR auth.uid() = landlord_id);

CREATE POLICY "Users can read their messages"
  ON messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM conversations
      WHERE id = conversation_id
      AND (tenant_id = auth.uid() OR landlord_id = auth.uid())
    )
  );
