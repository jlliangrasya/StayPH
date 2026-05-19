# 🏘️ StayPH — Masterplan
### The Philippines' First Trusted Boarding House & Bedspace Platform

> **Vision:** A platform where every Filipino student, worker, and transient can find safe, verified, and affordable long-term housing — and where every landlord can fill their rooms with trusted tenants.

---

## 📌 Table of Contents

1. [The Problem](#the-problem)
2. [The Solution](#the-solution)
3. [Brand Kit](#brand-kit)
4. [Target Market](#target-market)
5. [Core Features](#core-features)
6. [Verification System](#verification-system)
7. [Cancellation & Dispute Policy](#cancellation--dispute-policy)
8. [The "Preferred" / Admin Verified System](#the-preferred--admin-verified-system)
9. [Tech Stack](#tech-stack)
10. [Database Schema](#database-schema)
11. [System Architecture](#system-architecture)
12. [Business Model](#business-model)
13. [Go-To-Market Strategy](#go-to-market-strategy)
14. [SEO & URL Structure](#seo--url-structure)
15. [Roadmap](#roadmap)
16. [Competitive Edge](#competitive-edge)
17. [Team Structure](#team-structure)
18. [Customer Support Plan](#customer-support-plan)
19. [Risk & Mitigation](#risk--mitigation)

---

## The Problem

Filipino students, workers, and transients currently find boarding houses through:
- Tarpaulins stapled to electric posts
- Unstructured Facebook group posts
- Word of mouth from classmates
- Fixers who charge ₱500–₱2,000 to "find" a room

**The consequences:**
- Scammers post fake listings and collect GCash deposits then disappear
- Students arrive in a new city with no safe place to stay
- Parents cannot verify if their child's boarding house is safe
- Landlords leave rooms empty for weeks because tarpaulins only reach the nearest street
- Pricing is opaque — hidden charges appear after move-in
- No reviews, no accountability, no recourse

---

## The Solution

**StayPH** is a verified, structured, and culturally-aware boarding house discovery and booking platform built specifically for the Filipino market.

It is **not** an Airbnb clone — it is built around:
- Long-term stays (monthly, semestral, annual)
- Filipino boarding house culture (curfews, house rules, caretakers, shared bathrooms)
- Hyperlocal search (by university, by barangay, by jeepney route)
- Human verification — not just algorithms
- Trust badges that mean something real

---

## Brand Kit

### Brand Personality
**Trustworthy · Warm · Local · Modern**

StayPH is the platform that Filipino students, workers, and families trust to find a real home — not just a room. Every design and copy decision should feel like a warm, knowledgeable friend who knows the city, not a cold algorithm.

### Tagline
> **"Find your home away from home."**

Alternatives:
- "Verified stays. Trusted neighbors."
- "Your room. Your city. Your terms."

### Color Palette

| Role | Name | Hex | Why |
|---|---|---|---|
| **Primary** | Coral Sunset | `#FF6B4A` | Warm, energetic, stands out vs. blue-heavy competitors |
| **Secondary** | Deep Navy | `#1A2E4A` | Trust, authority, professional depth |
| **Accent** | Golden Yellow | `#FFB830` | Optimism, highlights the "Preferred" tag |
| **Background** | Warm White | `#FDF8F4` | Soft, inviting — not sterile or clinical |
| **Text** | Charcoal | `#2D2D2D` | Highly readable, warm feel |
| **Success / Verified** | Leaf Green | `#34A853` | Verification badges, availability indicators |
| **Warning** | Amber | `#F59E0B` | Pending states, caution notices |
| **Error** | Soft Red | `#EF4444` | Errors, suspensions, scam flags |

### Typography

| Use | Font | Where |
|---|---|---|
| **Headings** | Plus Jakarta Sans | Page titles, section headers, card titles |
| **Body** | Inter | Paragraphs, descriptions, forms, UI labels |
| **Accent** | Playfair Display | Taglines, testimonial quotes, hero statements |

All fonts are free on Google Fonts. Plus Jakarta Sans gives a modern Filipino startup feel — used by top PH tech companies.

### Logo Direction
A stylized rooftop/house silhouette merged with a location pin, rendered in **Coral Sunset**. Wordmark "StayPH" in **Deep Navy**, with "PH" slightly bolder to assert local identity. The logo should work at 16px (favicon) and 300px (header) without losing clarity.

### Iconography Style
- **Rounded, filled icons** (not outline-only) — warm and approachable, like Airbnb
- Use [Phosphor Icons](https://phosphoricons.com/) or [Heroicons](https://heroicons.com/) (both free, React-compatible)
- Verification badges use emoji-style icons for quick recognition at a glance

### Tone of Voice
- Write in **conversational Filipino English** — warm, direct, never corporate
- Use **"you"** and **"your"** — never "the user" or "the tenant"
- Reference real local context: "near USC," "in Lahug," "Tita Nena"
- Be honest about how things work — Filipinos distrust vague language
- Celebrate the human verification layer — it is the product's soul

### UI Patterns (Airbnb-inspired)
- Card-based listing grid with cover photo, price, location, and trust badges visible at a glance
- Full-bleed hero photo on listing detail page
- Sticky booking/inquiry panel on desktop (sidebar), bottom sheet on mobile
- Step-by-step guided forms for listing creation and onboarding
- Verified badges rendered as pill chips (e.g., `✅ Admin Verified`, `⭐ Preferred`)

---

## Target Market

### Primary Users

| Segment | Profile | Pain Point |
|---|---|---|
| **College Students** | 18–24, relocating to a new city for school | Don't know safe, affordable places near their university |
| **Working Adults** | 22–35, relocating for work or OJT | Need a monthly room near their workplace fast |
| **OFW Families** | Parents sending kids to study in the city | Want to verify safety remotely before their child moves in |
| **Landlords / Bedspace Owners** | Property owners with spare rooms | Rooms sit empty for weeks; rely on tarpaulins |

### Market Size (Philippines)
- 1,900+ universities and colleges nationwide
- ~3.5 million college students enrolled annually
- Estimated 60%+ live away from home during school year
- 20+ major university cities (Cebu, Davao, Iloilo, CDO, Manila, Bacolod, etc.)

---

## Core Features

### 🔍 For Tenants

#### Smart Search & Discovery
- Search by city, barangay, or **near a specific school** (e.g., "near USC Cebu")
- Filter by:
  - Monthly price range
  - Gender policy (Male only / Female only / Mixed)
  - Inclusions (WiFi, water, electricity, laundry, cooking allowed)
  - Room type (bedspace, private room, studio)
  - Lease term (monthly, semestral, annual)
  - Verified level (Admin Verified, Site Visited, Preferred)
  - Curfew (with curfew / no curfew)
  - Floor level, with / without elevator
- Sort by: Nearest, Lowest Price, Highest Rated, Newest, Preferred First

#### Listing Detail Page
- Full photo gallery (interior, bathroom, common areas, entrance, neighborhood)
- Video walkthrough embed
- Exact address with map pin
- Clear price breakdown (what's included, what's extra)
- House rules listed explicitly
- Availability calendar — how many slots are open
- Landlord profile — name, verified badge, response rate, response time
- Tenant reviews with structured ratings
- Nearby landmarks auto-pulled (schools, hospitals, malls, transport)
- Estimated commute to top schools in the city

#### Viewing Appointment System
- Request a viewing schedule directly in the app
- Landlord confirms or proposes another time
- Both identities are verified before meeting
- Auto-reminder 1 hour before the appointment
- Post-viewing feedback form

#### Save & Compare
- Bookmark listings to a "Saved" list
- Compare up to 3 listings side by side (price, inclusions, ratings, distance)
- Share a listing as a link with parents or friends

#### In-App Messaging
- All communication stays inside the platform
- System detects and warns if GCash numbers are shared in chat
- Landlord phone number hidden until viewing is confirmed
- Message templates for common questions (Is WiFi stable? Is cooking allowed?)

#### Tenant Dashboard
- Active booking / current residence details
- Rent due reminders
- Renewal alerts
- Lease document storage
- Payment history

---

### 🏠 For Landlords

#### Listing Management
- Create listing with guided form (step-by-step, no confusion)
- Upload up to 15 photos with drag-and-drop
- Upload video walkthrough
- Set room availability and open slots
- Edit price, inclusions, and house rules anytime
- All price changes are logged and visible to tenants (no surprise hikes)

#### Verification Dashboard
- See current verification level and what's needed to level up
- Upload documents for verification (ID, property proof)
- Schedule a site visit for Preferred tag

#### Tenant Management
- View all current and past tenants
- Receive and respond to inquiries in one place
- Access tenant background check reports
- Generate digital lease agreements
- Mark tenant as verified (paid deposit, moved in)

#### Analytics Dashboard
- How many people viewed your listing this week
- How many inquiries received
- Conversion rate (views to inquiries)
- Average days to fill a room
- Revenue tracking per room

#### Notification Center
- New inquiry alerts
- Viewing schedule reminders
- Room slot almost full warnings
- Permit renewal reminders (annually)
- New review posted alerts

---

### 👑 Admin / Team Panel

#### Listing Verification Queue
- All new listings pending review
- Checklist per listing: ID check, document check, photo review, reverse image check
- Assign listings to field verifiers for site visits
- Approve, reject, or request more documents

#### Preferred Tag Management
- Field visit report submission form
- Photo upload with geo-tag as proof of visit
- Approve or deny Preferred tag
- Set expiry date for tag (6 months or 1 year)
- Log of who tagged what and when

#### Scam Detection Panel
- Listings flagged by reverse image search
- Listings reported by users (threshold: 3 reports = auto-suspend)
- Price outlier alerts (50% below area average)
- New account + same-day listing flags
- Manual review and resolution tools

#### User Management
- View all landlords and tenants
- Suspend or ban accounts
- Handle disputes between landlords and tenants
- Manage refunds for escrow payments

#### Content Moderation
- Review reports on listings, reviews, and messages
- Flag inappropriate content
- Approve or reject landlord responses to reviews

---

## Verification System

### Trust Badge Levels — Listings (Landlord Side)

| Badge | How Earned | What It Signals |
|---|---|---|
| ☎️ Phone Verified | OTP confirmed on signup | Real phone number attached |
| 🪪 ID Verified | Government ID reviewed by team | Real person, not anonymous |
| 🏠 Property Verified | Tax declaration or title uploaded | Legitimate right to rent the space |
| 🖼️ Photo Verified | Photos reviewed + reverse image checked | Photos are real and not stolen |
| 🎥 Video Verified | Live video walkthrough submitted | Place is real and matches photos |
| ✅ Admin Verified | All documents reviewed and approved | Paperwork is clean and complete |
| 🏘️ Site Visited | Team physically visited the property | Place is real and as described |
| ⭐ Preferred | Site visited + excellent condition + great landlord | Team personally recommends |
| 👑 Top Pick | Preferred + 4.8+ rating + 10+ reviews + 1 year | The best of the best |

### Trust Badge Levels — Tenants (Two-Way Trust)

Airbnb's core insight: trust must flow in **both directions**. Landlords need confidence in who is moving into their property just as much as tenants need confidence in the listing. StayPH mirrors this with a parallel tenant verification system.

| Badge | How Earned | What It Signals to Landlords |
|---|---|---|
| 📱 Phone Verified | OTP confirmed on signup | Real person, not a bot |
| 🪪 ID Verified | Government ID reviewed by team | Real identity, traceable if issues arise |
| 🎓 Student Verified | School ID + current enrollment form | Enrolled student, stable stay duration |
| 💼 Employment Verified | Company ID or Certificate of Employment | Employed adult, reliable income |
| ⭐ Good Tenant | Zero disputes + 2+ positive landlord ratings | Proven track record as a responsible tenant |

**How it works:**
- Tenants can message landlords with just a phone-verified account
- Landlords can filter their inquiry queue by tenant verification level
- Tenants with ID Verified or higher get a "Trusted Tenant" chip on their profile
- Good Tenant badge is awarded by the system after 2 completed stays with no disputes

### Anti-Scam Layers

**Automated:**
- Phone OTP on account creation
- Reverse image search on all uploaded photos (Google Vision API)
- Price outlier detection (flag listings 50%+ below area average)
- New account + immediate listing flag
- GCash number detection in chat messages

**Manual (Team):**
- Government ID review before listing goes live
- Document verification (property proof)
- Video walkthrough review
- Community reports reviewed within 24 hours

**Community:**
- Report button on every listing, review, and message
- 3 reports from different accounts = automatic suspension pending review
- Verified tenants only can leave reviews (prevented fake positivity)
- Landlords can respond to reviews (one response per review)

**Payment Protection:**
- All deposits go through platform escrow
- Landlord only receives payment after tenant confirms move-in
- Full refund if tenant never moves in
- No external GCash payments allowed (system warns and logs attempts)

---

## Cancellation & Dispute Policy

One of Airbnb's most trust-building features is its clear, predictable cancellation policy. StayPH needs the same — tenants need to know what happens if plans change, and landlords need protection against no-shows.

### Tenant Cancellation Policy

| Scenario | Refund |
|---|---|
| Cancel **7+ days before** move-in date | 100% deposit refund |
| Cancel **within 7 days** of move-in date | 50% deposit refund |
| No-show (did not move in, no cancellation) | No refund |
| Landlord cancels or listing is misrepresented | 100% refund + listing suspension review |

> All cancellations are processed within **3–5 business days** back to the original payment method.

### Dispute Resolution

When a tenant and landlord disagree — about conditions, about refunds, about house rules — StayPH acts as the neutral mediator.

**How to open a dispute:**
1. Either party taps "Open Dispute" on the booking
2. Both parties submit their side in writing (with photos if relevant)
3. StayPH admin reviews within **24 hours**
4. Resolution decision issued within **5 business days**

**Escalation path:**
```
Field Verifier (initial review)
  → Senior Admin (escalated or complex cases)
    → Founder (appeals or high-value disputes)
```

**Resolution outcomes:**
- Resolved in favor of tenant → full or partial refund issued
- Resolved in favor of landlord → deposit released to landlord
- Partial resolution → agreed split, both parties notified
- Fraud confirmed → listing suspended, account banned, report filed

### What StayPH Does NOT Cover
- Disputes over verbal agreements made outside the platform
- Damage claims beyond the deposit amount (no insurance product yet)
- Disputes opened more than 30 days after move-out

---

## The "Preferred" / Admin Verified System

### What It Means
A **Preferred** listing means a real member of the StayPH team has personally vetted this property — not just a system check. It is a human recommendation backed by a physical or live-video visit.

### Who Can Tag

| Role | Permissions |
|---|---|
| Founder | Full access — tag, untag, override |
| Senior Admin | Approve Preferred tag after field report |
| Field Verifier | Submit visit report + photos, recommend for Preferred |
| Community Partner | Barangay officials or school housing offices — vouch for property |

### Checklist Before Tagging "Preferred"

**Physical Visit:**
- [ ] Team member physically visited the property
- [ ] Photos in listing match actual place
- [ ] Room condition is as described or better
- [ ] Landlord met in person — appears legitimate and responsive
- [ ] Location is safe, accessible, and well-lit
- [ ] Common areas (bathroom, kitchen, hallway) are clean

**Remote Verification (If no visit possible):**
- [ ] Live video call with landlord inside the property
- [ ] Every room shown in real time
- [ ] ID verified and matches property documents
- [ ] At least 2 existing tenants contacted separately and confirmed
- [ ] Zero complaints or active reports on record

### Preferred Tag on the Listing

```
⭐ PREFERRED — Visited by StayPH Team · March 2025
"Our team visited on March 15. Rooms are clean and well-ventilated.
Tita Nena is responsive and fair with house rules. Highly recommended
for female students near USC."
— Jay, StayPH Field Verifier
```

### Tag Maintenance (Not Forever)
- Preferred tag expires after **6 months** — requires re-verification
- Auto-removed if rating drops below 4.0
- Auto-removed if 3 or more complaints filed
- Landlord must notify StayPH of any major changes (new rules, renovations, caretaker change)

### Monetization of the Preferred Tag
- Landlords can **request a Preferred visit** for ₱499
- StayPH team schedules a visit within 5 business days
- If the property passes — Preferred tag is applied
- If it fails — full refund + written feedback on what to improve
- This creates a self-funding verification system

---

## Tech Stack

### Why This Stack

| Decision | Choice | Reason |
|---|---|---|
| **Frontend** | React + Next.js 14 (App Router) | SEO-friendly, fast, full-stack capability, best ecosystem |
| **Styling** | Tailwind CSS + shadcn/ui | Fast to build, consistent, mobile-first |
| **Backend** | Supabase | Postgres + Auth + Storage + Realtime in one free platform |
| **Database** | PostgreSQL (via Supabase) | Relational, reliable, supports GIS for location queries |
| **Authentication** | Supabase Auth | Handles email, OTP, Google login out of the box |
| **File Storage** | Supabase Storage | Free 1GB, handles photo and document uploads |
| **Hosting** | Vercel | Free tier, auto-deploys from GitHub, perfect for Next.js |
| **Email** | Resend | 3,000 free emails/month, simple API |
| **SMS** | Semaphore PH | Philippine SMS provider, pay per SMS only |
| **Payments** | GCash Business → PayMongo | Start with GCash manually, upgrade to PayMongo API |
| **Maps** | Leaflet.js + OpenStreetMap | 100% free, no API billing surprises |
| **Image Optimization** | browser-image-compression | Compress before upload, saves storage |
| **Image CDN** | Cloudflare Images | 500+ listings × 15 photos needs a CDN; $5/month flat |
| **Reverse Image Check** | Google Vision API | Free 1,000 requests/month |
| **Search** | Supabase FTS → Meilisearch (Phase 3+) | Fast listing search; migrate when volume grows |
| **Product Analytics** | PostHog (free cloud tier) | Track funnels, drop-off, feature adoption |
| **Error Monitoring** | Sentry (free tier) | Catch bugs before users report them |
| **Email Templates** | React Email + Resend | Beautiful, responsive transactional emails |
| **PWA** | next-pwa | Mobile-first Add to Home Screen before React Native |
| **Caching** | Vercel ISR + Edge Caching | Cache popular city/school search pages |

### Full Stack Overview

```
┌─────────────────────────────────────────────┐
│                   FRONTEND                  │
│         Next.js 14 + React + Tailwind        │
│              Hosted on Vercel                │
└────────────────────┬────────────────────────┘
                     │
┌────────────────────▼────────────────────────┐
│                  SUPABASE                   │
│  ┌──────────┐ ┌──────────┐ ┌─────────────┐ │
│  │ PostgreSQL│ │   Auth   │ │   Storage   │ │
│  │ Database  │ │ OTP/OAuth│ │Photos/Docs  │ │
│  └──────────┘ └──────────┘ └─────────────┘ │
│  ┌──────────┐ ┌──────────┐                  │
│  │ Realtime │ │Edge Funcs│                  │
│  │ (Chat)   │ │(Webhooks)│                  │
│  └──────────┘ └──────────┘                  │
└─────────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────┐
│              EXTERNAL SERVICES              │
│  Resend (Email) · Semaphore (SMS)           │
│  PayMongo (Payments) · Google Vision (AI)   │
│  OpenStreetMap (Maps)                       │
└─────────────────────────────────────────────┘
```

---

## Database Schema

### Core Tables

```sql
-- Users (both landlords and tenants)
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

-- Listings (boarding houses / bedspaces)
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
  price_includes TEXT[], -- ['water', 'electricity', 'wifi', 'laundry']
  available_slots INT DEFAULT 1,
  total_slots INT DEFAULT 1,
  has_curfew BOOLEAN DEFAULT FALSE,
  curfew_time TIME,
  cooking_allowed BOOLEAN DEFAULT FALSE,
  pets_allowed BOOLEAN DEFAULT FALSE,
  lease_terms TEXT[], -- ['monthly', 'semestral', 'annual']
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

-- Listing Photos
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

-- Nearby Landmarks (auto-pulled or manually added)
CREATE TABLE listing_landmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  landmark_type TEXT, -- 'school', 'hospital', 'mall', 'transport', 'church'
  distance_meters INT,
  walking_minutes INT
);

-- Reviews
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

-- Viewing Appointments
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

-- Messages
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL,
  sender_id UUID REFERENCES users(id) ON DELETE SET NULL,
  receiver_id UUID REFERENCES users(id) ON DELETE SET NULL,
  listing_id UUID REFERENCES listings(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  contains_gcash_flag BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bookmarks / Saved Listings
CREATE TABLE bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES users(id) ON DELETE CASCADE,
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tenant_id, listing_id)
);

-- Reports (Scam / Abuse)
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

-- Escrow / Payments
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

-- Verification Documents (uploaded by landlords)
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

-- Admin / Field Visit Reports
CREATE TABLE visit_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  verifier_id UUID REFERENCES users(id),
  visit_type TEXT CHECK (visit_type IN ('physical', 'video_call')),
  visit_date TIMESTAMPTZ,
  checklist JSONB, -- stores all checklist item results
  photos TEXT[], -- geo-tagged proof photos
  notes TEXT,
  recommendation TEXT CHECK (recommendation IN ('preferred', 'admin_verified', 'needs_improvement', 'reject')),
  approved_by UUID REFERENCES users(id),
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type TEXT, -- 'new_inquiry', 'viewing_confirmed', 'new_review', 'preferred_tag', etc.
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Price History (for transparency)
CREATE TABLE price_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  old_price DECIMAL(10,2),
  new_price DECIMAL(10,2),
  changed_by UUID REFERENCES users(id),
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

-- Conversations (thread container — messages link to this)
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

-- Lease Agreements
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

-- Tenant Verification Documents (mirrors verification_documents for landlords)
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

-- Universities / Schools (powers near-school search)
CREATE TABLE universities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  short_name TEXT,                          -- 'USC', 'UV', 'CIT-U'
  city TEXT NOT NULL,
  latitude DECIMAL(9,6) NOT NULL,
  longitude DECIMAL(9,6) NOT NULL,
  type TEXT CHECK (type IN ('university', 'college', 'technical', 'graduate_school'))
);

-- Listing Amenities (normalized — replaces unreliable text arrays)
CREATE TABLE listing_amenities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  amenity TEXT NOT NULL                     -- 'wifi', 'water', 'electricity', 'laundry', 'cooking', 'parking', 'aircon', 'ref', 'tv'
);

-- Room Bookings / Occupancy Periods
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

-- Disputes (separate from payments for clean audit trail)
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

-- Saved Searches / Listing Alerts
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

-- Admin Audit Log (who did what and when — prevents Preferred tag abuse)
CREATE TABLE admin_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES users(id),
  action TEXT NOT NULL,                     -- 'suspend_listing', 'approve_preferred', 'reject_document'
  target_type TEXT,                         -- 'listing', 'user', 'review', 'report'
  target_id UUID,
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

### Key PostgreSQL Features Used
- **PostGIS extension** — for distance-based search ("listings within 1km of USC")
- **Full-text search** — fast keyword search across listing titles and descriptions
- **Row Level Security (RLS)** — Supabase enforces data access rules per user role
- **JSONB** — flexible storage for visit report checklists
- **Indexes** — on city, barangay, price, status, and geo coordinates for fast queries

---

## System Architecture

### User Flows

#### Tenant Flow
```
Sign Up → Verify Phone → Browse Listings → Filter & Search
→ View Listing Detail → Save / Compare → Request Viewing
→ Landlord Confirms → Visit Property → Pay Deposit (Escrow)
→ Confirm Move-In → Payment Released to Landlord
→ Leave Review After 2 Weeks
```

#### Landlord Flow
```
Sign Up → Verify Phone → Create Listing (Guided Form)
→ Upload Photos + Video → Submit Documents for Verification
→ Team Reviews → Listing Goes Live (Admin Verified)
→ Request Preferred Visit (Optional, ₱499)
→ Receive Inquiries → Confirm Viewings → Accept Tenant
→ Receive Deposit via Escrow → Manage Tenants
```

#### Admin Flow
```
Listing Submitted → Review Documents → Approve / Reject
→ Assign to Field Verifier (if Preferred requested)
→ Field Verifier Submits Report → Senior Admin Approves
→ Preferred Tag Applied → Monitor Reviews & Reports
→ Handle Disputes → Manage Scam Reports
```

### Onboarding Flows

First impressions determine whether a user stays or churns. Both tenant and landlord onboarding must feel effortless and immediately rewarding.

#### Tenant Onboarding (5 steps, ~3 minutes)

```
Step 1 → Sign up with phone number (OTP via Semaphore)
Step 2 → Set preferences: city, nearby school, max budget, gender policy
Step 3 → Personalized listing feed shown immediately — no empty state
Step 4 → Upload ID (optional, but nudged with "Unlock messaging with landlords")
Step 5 → First message sent — guided with suggested templates
```

**Key principle:** Show value *before* asking for verification. Tenants see real listings before they're required to do anything.

#### Landlord Onboarding (6 steps, ~10 minutes)

```
Step 1 → Sign up with phone number (OTP)
Step 2 → "Let's list your property" — guided form starts immediately
Step 3 → Upload 5–15 photos (minimum of 5 enforced, with tips shown inline)
Step 4 → Submit government ID for review
Step 5 → Listing goes live as "Pending Verification" with soft visibility
Step 6 → Team approves → listing fully active → SMS + email confirmation sent
```

**Key principle:** The landlord's listing is live (in a pending state) almost immediately. Waiting for verification doesn't mean waiting to be seen — it builds momentum.

#### Empty States
- New tenant with no nearby listings: "We're growing in [city]! Be the first to know when listings near [school] go live." → Saved Search prompt
- New landlord before first inquiry: "Your listing is live. Here's how to make it stand out." → Verification nudge checklist

---

## Business Model

### Revenue Streams

| Stream | Detail | Price | When |
|---|---|---|---|
| **Featured Listing** | Appears at top of search results | ₱299/month | Phase 2 |
| **Verified Badge (Paid)** | Fast-track document review | ₱199 one-time | Phase 2 |
| **Preferred Visit** | Team physically visits, tags Preferred | ₱499 per visit | Phase 2 |
| **Transaction Fee** | 3–5% of deposit paid through platform | % of deposit | Phase 3 |
| **Background Check** | Landlord checks tenant identity | ₱150 per check | Phase 3 |
| **Digital Lease Generator** | Auto-generate PDF lease contract | ₱99 per contract | Phase 3 |
| **Premium Landlord Plan** | Unlimited featured + analytics + priority support | ₱599/month | Phase 4 |
| **Insurance Partnership** | Room contents insurance, renter's insurance | Commission | Phase 4 |
| **School Partnerships** | Universities pay to have verified listings shown to their students | Monthly retainer | Phase 4 |

### Unit Economics (Target by End of Year 1)
- 500 active listings in Cebu
- 20% on Featured Listing plan = ₱29,900/month
- 50 Preferred visits/month = ₱24,950/month
- 30 transactions/month at avg ₱3,000 deposit = ₱4,500/month
- **Target MRR by Month 12: ₱50,000–₱80,000**

---

## Go-To-Market Strategy

### Phase 1 — Cebu City Only (Months 1–3)

**Supply Side (Get Landlords First):**
- Walk streets near USC, UV, UC, CIT-U, Cebu Normal — photograph every tarpaulin
- Call those landlords, offer free listing and free Preferred visit for early adopters
- Partner with Cebu City housing offices and barangay officials
- Post in landlord Facebook groups

**Demand Side (Get Tenants):**
- Post in university Facebook groups (USC Official, UV Students, etc.)
- Leave flyers at university bulletin boards
- Partner with student organizations (free featured listings for their members)
- Create content: "We visited 20 boarding houses near USC — here's what we found" (viral)

**Content Marketing:**
- Facebook page with real boarding house reviews
- "StayPH Visits" video series — team visits a boarding house, honest review
- Barangay-level guides: "Best boarding houses in Lahug", "Cheapest bedspace in Talamban"

### Phase 2 — Expand to Other Cebu Cities + 1 New Metro (Months 4–8)
- Mandaue, Talisay, Lapu-Lapu
- Davao City (2nd largest student city)
- Repeat the walk-and-list approach with local field verifiers

### Phase 3 — National Expansion (Months 9–18)
- Iloilo, Bacolod, Cagayan de Oro, Baguio
- Partner with CHED regional offices
- Hire city-level Community Managers who earn per verified listing

---

## SEO & URL Structure

Organic search is StayPH's most powerful free growth channel. Airbnb dominates Google because every city, neighborhood, and category has a dedicated, indexable page full of real listings. StayPH must do the same from launch.

### URL Structure

```
/                                     → Homepage (hero search, featured listings)
/[city]                               → e.g., /cebu, /davao, /iloilo
/[city]/[barangay]                    → e.g., /cebu/lahug, /cebu/talamban
/[city]/near/[school-slug]            → e.g., /cebu/near/usc, /cebu/near/uv-visayas
/[city]/bedspace                      → Category filter page
/[city]/private-room                  → Category filter page
/[city]/female-only                   → Gender policy filter page
/listing/[id]-[slug]                  → e.g., /listing/abc123-tita-nena-bedspace-lahug
/landlord/[id]                        → Landlord public profile
/blog/[slug]                          → SEO content articles
```

### Key SEO Pages to Auto-Generate at Launch

Each page is **server-rendered (Next.js SSR/ISR)** with real listings and a unique meta title + description:

| Page Template | Example |
|---|---|
| "Boarding house near [School] in [City]" | Boarding house near USC Cebu |
| "Bedspace in [Barangay], [City]" | Bedspace in Lahug, Cebu City |
| "Female-only boarding house in [City]" | Female-only boarding house in Cebu |
| "Cheapest boarding house near [School]" | Cheapest boarding house near CIT-U Cebu |
| "Monthly room for rent in [City]" | Monthly room for rent in Davao City |

These pages are generated dynamically from the `universities` and listing data — no manual writing needed. When a new listing is added in Lahug, it auto-populates the `/cebu/lahug` page.

### Content SEO (Blog)

A lightweight blog targeting long-tail searches:
- "How to find a boarding house in Cebu as a freshman"
- "What to look for in a boarding house near USC"
- "Best bedspaces in Talamban under ₱3,000"
- "How StayPH verifies boarding houses"

These articles drive trust AND search traffic. Each article links to relevant listing pages.

### Technical SEO Checklist
- [ ] `sitemap.xml` auto-generated from all active listings and city/school pages
- [ ] `robots.txt` configured to allow all indexing
- [ ] Open Graph meta tags on every listing page (for Facebook/Messenger sharing)
- [ ] Structured data (`schema.org/Accommodation`) on listing pages for rich results
- [ ] Canonical URLs on all filter/sorted pages to avoid duplicate content
- [ ] Fast Core Web Vitals — Next.js ISR + Cloudflare CDN for images

---

## Roadmap

### Phase 1 — MVP (Month 1–2) · ₱0 Budget
- [ ] Supabase project setup (free)
- [ ] Vercel deployment (free)
- [ ] Basic listing creation form
- [ ] Browse and filter listings
- [ ] Contact landlord via WhatsApp button (no in-app chat yet)
- [ ] Manual admin review via Supabase dashboard
- [ ] Facebook page + first 10 listings from field walk
- [ ] **PWA setup (next-pwa)** — "Add to Home Screen" for Android users from Day 1; zero extra cost

### Phase 2 — Core Platform (Month 3–4)
- [ ] User accounts (Supabase Auth)
- [ ] In-app messaging
- [ ] Photo upload (Supabase Storage)
- [ ] Review system (verified tenants only)
- [ ] Viewing appointment system
- [ ] Report button + admin reports queue
- [ ] Admin panel (basic)
- [ ] Trust badge display on listings

### Phase 3 — Verification & Trust (Month 5–6)
- [ ] Government ID upload + review workflow
- [ ] Property document upload + review
- [ ] Reverse image check integration
- [ ] Preferred tag system + visit report form
- [ ] Price history log
- [ ] GCash detection in messages

### Phase 4 — Monetization (Month 7–9)
- [ ] Featured listing payments (GCash Business)
- [ ] Preferred visit booking + payment
- [ ] Escrow payments via PayMongo
- [ ] Digital lease agreement generator
- [ ] Background check integration

### Phase 5 — Scale & Intelligence (Month 10–18)
- [ ] Commute estimator (jeep routes, distance)
- [ ] Price recommendation for landlords (based on area averages)
- [ ] Saved search alerts ("notify me when a room near USC under ₱3,000 is listed")
- [ ] Mobile app (React Native)
- [ ] School partnership portal
- [ ] Insurance integration
- [ ] Multi-language (Filipino, Bisaya, Ilocano)

---

## Competitive Edge

| Feature | Facebook Groups | OLX | Airbnb | StayPH |
|---|---|---|---|---|
| Verified listings | ❌ | ❌ | Partial | ✅ |
| Human site visits | ❌ | ❌ | ❌ | ✅ |
| "Preferred" tag | ❌ | ❌ | ❌ | ✅ |
| Filipino-specific filters | ❌ | ❌ | ❌ | ✅ |
| Long-term stays | ❌ | Partial | ❌ | ✅ |
| Structured reviews | ❌ | ❌ | ✅ | ✅ |
| Escrow payment protection | ❌ | ❌ | ✅ | ✅ |
| Near-university search | ❌ | ❌ | ❌ | ✅ |
| Gender policy filter | ❌ | ❌ | ❌ | ✅ |
| Curfew / house rules | ❌ | ❌ | ❌ | ✅ |
| Admin panel + scam detection | ❌ | Minimal | Partial | ✅ |
| Price history transparency | ❌ | ❌ | ❌ | ✅ |

**StayPH's unfair advantage:** Deep Filipino cultural context + human verification layer + trust that no algorithm alone can build.

---

## Team Structure

### Solo Developer Launch (Month 1–3)
- **You** — Full-stack developer + founder + first field verifier
- Facebook page manager (can be you)
- Cost: ₱0

### Small Team (Month 4–8, funded by first revenue)
- 1 Part-time Admin / Verifier (handles document review, reports)
- 1 Field Verifier per city (commission-based: earn ₱200 per verified listing)

### Growth Team (Month 9+)
- Full-time Operations Manager
- City-level Community Managers (Cebu, Davao, Iloilo)
- Customer support (handles disputes)
- 1 Additional developer

---

## Customer Support Plan

Trust platforms live and die by how fast and fairly they resolve problems. StayPH needs a clear support structure from Day 1, even when it is a one-person operation.

### Support Channels by Phase

| Phase | Channel | Tool |
|---|---|---|
| **Phase 1 (MVP)** | Facebook Messenger + support@stayph.com | Manual, founder-handled |
| **Phase 2** | In-app help widget | Crisp or Tawk.to (both free tiers) |
| **Phase 3+** | In-app ticketing + live chat | Crisp paid or Intercom |

### Response SLAs

| Issue Type | Acknowledge | Resolve |
|---|---|---|
| Scam report / fraud | Within 4 hours | Within 24 hours |
| Payment dispute | Within 24 hours | Within 5 business days |
| Listing report | Within 24 hours | Within 48 hours |
| Account suspension appeal | Within 24 hours | Within 3 business days |
| General inquiry | Within 48 hours | Within 72 hours |

### Self-Service Resources (Phase 2)
- **FAQ page** covering: How does verification work? What if my landlord doesn't return my deposit? How do I report a fake listing?
- **Landlord Help Center**: How to list a property, how to get verified, how to manage tenants
- **Tenant Guide**: How to search safely, what the badges mean, how escrow works

### Escalation Path
```
Tenant/Landlord opens issue
  → Auto-reply with ticket number + SLA
    → Admin reviews
      → Resolution OR escalation to Senior Admin
        → Appeals: Founder reviews final decision
```

---

## Risk & Mitigation

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Scammers still find a way in | Medium | High | Layered verification, escrow, rapid report resolution |
| Landlords don't want to verify | Medium | Medium | Make verification free + show that verified = faster bookings |
| Low initial listings (cold start) | High | High | Team manually lists first 50 properties from tarpaulin walk |
| Facebook group competition | High | Medium | Our value is trust — FB groups can never offer human verification |
| Supabase free tier limits | Low | Medium | Only hit limits at 50,000 MAU — you'll have revenue long before then |
| Fake reviews from landlords | Medium | High | Reviews only unlocked after verified 2-week stay |
| Preferred tag corruption (tagging for money/favors) | Low | High | Approval requires Senior Admin sign-off + full audit log |
| PayMongo / payment failures | Low | High | Manual GCash fallback always available during early phases |

---

## Summary

**StayPH is not just a listing site.**

It is a trust infrastructure for Filipino housing — where students can find safe homes, parents can verify remotely, and landlords can fill rooms with confidence.

The technology is simple. The verification is human. The cultural understanding is deep.

And none of that can be copied by a Facebook group.

---

*Masterplan v2.0 — May 2026*
*Built for the Filipino market. Starting in Cebu.*
*Airbnb for long-term stays — verified, local, trusted.*
