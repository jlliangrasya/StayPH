import type { User, Review, Conversation, Message, Appointment, Report, Bookmark } from '@/lib/types'

// ─── Mock Users ───────────────────────────────────────────────────────────────

export const MOCK_USERS: User[] = [
  {
    id: 'user-tenant-001',
    email: 'grace@example.com',
    phone: '09171111111',
    full_name: 'Grace Burila',
    role: 'tenant',
    avatar_url: null,
    is_phone_verified: true,
    is_id_verified: true,
    is_suspended: false,
    created_at: '2025-01-10T00:00:00Z',
  },
  {
    id: 'user-tenant-002',
    email: 'juan@example.com',
    phone: '09172222222',
    full_name: 'Juan dela Cruz',
    role: 'tenant',
    avatar_url: null,
    is_phone_verified: true,
    is_id_verified: false,
    is_suspended: false,
    created_at: '2025-03-01T00:00:00Z',
  },
  {
    id: 'user-tenant-003',
    email: 'maria@example.com',
    phone: '09173333333',
    full_name: 'Maria Santos',
    role: 'tenant',
    avatar_url: null,
    is_phone_verified: true,
    is_id_verified: true,
    is_suspended: false,
    created_at: '2025-02-15T00:00:00Z',
  },
  {
    id: 'user-admin-001',
    email: 'admin@stayph.com',
    phone: '09170000001',
    full_name: 'StayPH Admin',
    role: 'admin',
    avatar_url: null,
    is_phone_verified: true,
    is_id_verified: true,
    is_suspended: false,
    created_at: '2024-12-01T00:00:00Z',
  },
]

// ─── Mock Reviews ─────────────────────────────────────────────────────────────

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'review-001',
    listing_id: '00000000-0000-0000-0000-000000000001',
    tenant_id: 'user-tenant-001',
    tenant: { id: 'user-tenant-001', full_name: 'Grace B.', avatar_url: null, is_id_verified: true },
    rating_overall: 5,
    rating_cleanliness: 5,
    rating_safety: 5,
    rating_landlord: 5,
    rating_wifi: 4,
    rating_utilities: 5,
    comment: 'Tita Nena is the best landlord I\'ve ever had. The room is spotless and she actually cares about the tenants. WiFi could be a bit faster but everything else is perfect. Highly recommend to female students near USC!',
    landlord_response: 'Thank you so much Grace! It was a pleasure having you as a tenant. Come back anytime!',
    landlord_responded_at: '2025-04-02T08:00:00Z',
    stay_from: '2024-08-01',
    stay_to: '2025-03-31',
    is_verified_stay: true,
    created_at: '2025-04-01T10:00:00Z',
  },
  {
    id: 'review-002',
    listing_id: '00000000-0000-0000-0000-000000000001',
    tenant_id: 'user-tenant-003',
    tenant: { id: 'user-tenant-003', full_name: 'Maria S.', avatar_url: null, is_id_verified: true },
    rating_overall: 5,
    rating_cleanliness: 5,
    rating_safety: 5,
    rating_landlord: 5,
    rating_wifi: 5,
    rating_utilities: 4,
    comment: 'Safe, clean, and super close to USC. The curfew is strict but it makes you feel secure. Tita Nena replaced my broken desk lamp on the same day I reported it. Water pressure is amazing.',
    landlord_response: null,
    landlord_responded_at: null,
    stay_from: '2025-01-01',
    stay_to: null,
    is_verified_stay: true,
    created_at: '2025-05-10T14:00:00Z',
  },
  {
    id: 'review-003',
    listing_id: '00000000-0000-0000-0000-000000000006',
    tenant_id: 'user-tenant-002',
    tenant: { id: 'user-tenant-002', full_name: 'Juan D.', avatar_url: null, is_id_verified: false },
    rating_overall: 5,
    rating_cleanliness: 5,
    rating_safety: 5,
    rating_landlord: 4,
    rating_wifi: 5,
    rating_utilities: 5,
    comment: 'Best room near IT Park. The internet is fiber — zero lag for gaming and WFH. CCTV everywhere, security guard 24/7. A bit pricey but 100% worth it for the peace of mind.',
    landlord_response: 'Thanks for the kind words! We\'re always here if you need anything.',
    landlord_responded_at: '2025-05-02T09:30:00Z',
    stay_from: '2024-11-01',
    stay_to: null,
    is_verified_stay: true,
    created_at: '2025-05-01T16:00:00Z',
  },
  {
    id: 'review-004',
    listing_id: '00000000-0000-0000-0000-000000000002',
    tenant_id: 'user-tenant-001',
    tenant: { id: 'user-tenant-001', full_name: 'Grace B.', avatar_url: null, is_id_verified: true },
    rating_overall: 4,
    rating_cleanliness: 4,
    rating_safety: 4,
    rating_landlord: 5,
    rating_wifi: 4,
    rating_utilities: 4,
    comment: 'Great value for money in Talamban. The study area is a lifesaver during exam season. Manang Rosie is very approachable and responds quickly. Only wish the bathroom tiles were newer.',
    landlord_response: null,
    landlord_responded_at: null,
    stay_from: '2024-06-01',
    stay_to: '2024-12-31',
    is_verified_stay: true,
    created_at: '2025-01-05T11:00:00Z',
  },
]

// ─── Mock Conversations ───────────────────────────────────────────────────────

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-001',
    listing_id: '00000000-0000-0000-0000-000000000001',
    listing_title: "Tita Nena's Boarding House",
    listing_photo: null,
    tenant_id: 'user-tenant-001',
    landlord_id: 'landlord-001',
    other_user: { id: 'landlord-001', full_name: 'Nena Santos', avatar_url: null },
    last_message: 'Yes, the room is still available! When would you like to visit?',
    last_message_at: '2025-05-19T14:30:00Z',
    unread_count: 1,
    created_at: '2025-05-18T09:00:00Z',
  },
  {
    id: 'conv-002',
    listing_id: '00000000-0000-0000-0000-000000000006',
    listing_title: 'IT Park Residences',
    listing_photo: null,
    tenant_id: 'user-tenant-001',
    landlord_id: 'landlord-006',
    other_user: { id: 'landlord-006', full_name: 'Jerome Alcantara', avatar_url: null },
    last_message: 'Hi! Is the room still available for June?',
    last_message_at: '2025-05-17T10:00:00Z',
    unread_count: 0,
    created_at: '2025-05-17T10:00:00Z',
  },
]

export const MOCK_MESSAGES: Record<string, Message[]> = {
  'conv-001': [
    {
      id: 'msg-001',
      conversation_id: 'conv-001',
      sender_id: 'user-tenant-001',
      receiver_id: 'landlord-001',
      listing_id: '00000000-0000-0000-0000-000000000001',
      content: 'Hi po Tita Nena! I saw your listing on StayPH. Is the bedspace still available? I\'m a 2nd year nursing student at USC.',
      is_read: true,
      contains_gcash_flag: false,
      created_at: '2025-05-18T09:00:00Z',
    },
    {
      id: 'msg-002',
      conversation_id: 'conv-001',
      sender_id: 'landlord-001',
      receiver_id: 'user-tenant-001',
      listing_id: '00000000-0000-0000-0000-000000000001',
      content: 'Hello anak! Yes, may available pa akong 2 slots. Nursing ka pala — dito maraming nursing students. Maayos ka ba?',
      is_read: true,
      contains_gcash_flag: false,
      created_at: '2025-05-18T09:15:00Z',
    },
    {
      id: 'msg-003',
      conversation_id: 'conv-001',
      sender_id: 'user-tenant-001',
      receiver_id: 'landlord-001',
      listing_id: '00000000-0000-0000-0000-000000000001',
      content: 'Yes po! My parents are from Cebu too. Pwede po ba mag-visit this Saturday morning?',
      is_read: true,
      contains_gcash_flag: false,
      created_at: '2025-05-18T09:20:00Z',
    },
    {
      id: 'msg-004',
      conversation_id: 'conv-001',
      sender_id: 'landlord-001',
      receiver_id: 'user-tenant-001',
      listing_id: '00000000-0000-0000-0000-000000000001',
      content: 'Yes, the room is still available! When would you like to visit?',
      is_read: false,
      contains_gcash_flag: false,
      created_at: '2025-05-19T14:30:00Z',
    },
  ],
  'conv-002': [
    {
      id: 'msg-005',
      conversation_id: 'conv-002',
      sender_id: 'user-tenant-001',
      receiver_id: 'landlord-006',
      listing_id: '00000000-0000-0000-0000-000000000006',
      content: 'Hi! Is the room still available for June?',
      is_read: true,
      contains_gcash_flag: false,
      created_at: '2025-05-17T10:00:00Z',
    },
  ],
}

// ─── Mock Appointments ────────────────────────────────────────────────────────

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'appt-001',
    listing_id: '00000000-0000-0000-0000-000000000001',
    listing_title: "Tita Nena's Boarding House",
    tenant_id: 'user-tenant-001',
    landlord_id: 'landlord-001',
    other_user: { id: 'landlord-001', full_name: 'Nena Santos', avatar_url: null },
    proposed_date: '2025-05-24T09:00:00Z',
    status: 'confirmed',
    tenant_notes: 'I\'ll be coming with my mom. We\'d like to see the available rooms.',
    landlord_notes: 'I\'ll be here from 8 AM. Just message me when you arrive.',
    post_visit_feedback: null,
    created_at: '2025-05-19T15:00:00Z',
  },
]

// ─── Mock Reports ─────────────────────────────────────────────────────────────

export const MOCK_REPORTS: Report[] = [
  {
    id: 'report-001',
    reporter_id: 'user-tenant-002',
    listing_id: '00000000-0000-0000-0000-000000000007',
    listing_title: 'Colon Budget Bedspace',
    reason: 'wrong_info',
    description: 'The listing says WiFi is included but when I visited there was none. The landlord said I need to pay extra.',
    status: 'pending',
    reviewed_by: null,
    resolution_note: null,
    created_at: '2025-05-15T11:00:00Z',
  },
  {
    id: 'report-002',
    reporter_id: 'user-tenant-003',
    listing_id: '00000000-0000-0000-0000-000000000007',
    listing_title: 'Colon Budget Bedspace',
    reason: 'fake_photos',
    description: 'The photos on the listing look much better than the actual rooms. The real rooms are much smaller and more rundown.',
    status: 'reviewed',
    reviewed_by: 'user-admin-001',
    resolution_note: null,
    created_at: '2025-05-16T08:00:00Z',
  },
]

// ─── Mock Bookmarks ───────────────────────────────────────────────────────────

export const MOCK_BOOKMARKS: Bookmark[] = [
  {
    id: 'bookmark-001',
    tenant_id: 'user-tenant-001',
    listing_id: '00000000-0000-0000-0000-000000000001',
    created_at: '2025-05-10T12:00:00Z',
  },
  {
    id: 'bookmark-002',
    tenant_id: 'user-tenant-001',
    listing_id: '00000000-0000-0000-0000-000000000006',
    created_at: '2025-05-11T09:00:00Z',
  },
]

// ─── GCash pattern detection ──────────────────────────────────────────────────
// Detects GCash numbers (09xxxxxxxxx) in messages
const GCASH_PATTERN = /\b09\d{9}\b/

export function detectsGCash(text: string): boolean {
  return GCASH_PATTERN.test(text)
}
