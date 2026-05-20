import type { Payment, LeaseAgreement, BackgroundCheck } from '@/lib/types'

// ─── Mock Payments ────────────────────────────────────────────────────────────

export const MOCK_PAYMENTS: Payment[] = [
  {
    id: 'pay-001',
    listing_id: '00000000-0000-0000-0000-000000000001',
    listing_title: "Tita Nena's Boarding House",
    payer_id: 'landlord-001',
    payer_name: 'Nena Santos',
    payment_type: 'featured_listing',
    payment_method: 'gcash',
    amount: 299,
    status: 'paid',
    reference_number: 'GCB-20250101-001',
    gcash_number: '09171234567',
    paymongo_payment_id: null,
    notes: 'Featured for January 2025',
    paid_at: '2025-01-01T08:00:00Z',
    released_at: null,
    refunded_at: null,
    created_at: '2025-01-01T08:00:00Z',
  },
  {
    id: 'pay-002',
    listing_id: '00000000-0000-0000-0000-000000000001',
    listing_title: "Tita Nena's Boarding House",
    payer_id: 'landlord-001',
    payer_name: 'Nena Santos',
    payment_type: 'preferred_visit',
    payment_method: 'gcash',
    amount: 499,
    status: 'paid',
    reference_number: 'GCB-20250110-002',
    gcash_number: '09171234567',
    paymongo_payment_id: null,
    notes: 'Preferred site visit — resulted in Preferred tag March 2025',
    paid_at: '2025-01-10T09:00:00Z',
    released_at: null,
    refunded_at: null,
    created_at: '2025-01-10T09:00:00Z',
  },
  {
    id: 'pay-003',
    listing_id: '00000000-0000-0000-0000-000000000001',
    listing_title: "Tita Nena's Boarding House",
    payer_id: 'user-tenant-001',
    payer_name: 'Grace Burila',
    payment_type: 'escrow_deposit',
    payment_method: 'paymongo',
    amount: 9000,
    status: 'released',
    reference_number: null,
    gcash_number: null,
    paymongo_payment_id: 'pm_pay_abc123',
    notes: '2-month deposit (₱4,500 × 2)',
    paid_at: '2025-08-01T10:00:00Z',
    released_at: '2025-08-15T10:00:00Z',
    refunded_at: null,
    created_at: '2025-08-01T10:00:00Z',
  },
]

// ─── Mock Lease Agreements ────────────────────────────────────────────────────

export const MOCK_LEASES: LeaseAgreement[] = [
  {
    id: 'lease-001',
    listing_id: '00000000-0000-0000-0000-000000000001',
    listing_title: "Tita Nena's Boarding House",
    listing_address: '123 M. Velez St., Lahug, Cebu City',
    tenant_id: 'user-tenant-001',
    tenant_name: 'Grace Burila',
    tenant_phone: '09171111111',
    landlord_id: 'landlord-001',
    landlord_name: 'Nena Santos',
    landlord_phone: '09171234567',
    lease_start: '2024-08-01',
    lease_end: '2025-07-31',
    monthly_rent: 4500,
    deposit_amount: 9000,
    advance_months: 1,
    included_utilities: ['water', 'electricity', 'wifi'],
    house_rules: 'No overnight male guests. Curfew at 10 PM on weekdays, 11 PM on weekends. No loud music after 9 PM.',
    status: 'active',
    signed_by_tenant_at: '2024-07-28T10:00:00Z',
    signed_by_landlord_at: '2024-07-29T14:00:00Z',
    created_at: '2024-07-28T10:00:00Z',
  },
]

// ─── Mock Background Checks ───────────────────────────────────────────────────

export const MOCK_BACKGROUND_CHECKS: BackgroundCheck[] = [
  {
    id: 'bgcheck-001',
    requested_by: 'landlord-001',
    requested_by_name: 'Nena Santos',
    tenant_id: 'user-tenant-001',
    tenant_name: 'Grace Burila',
    listing_id: '00000000-0000-0000-0000-000000000001',
    listing_title: "Tita Nena's Boarding House",
    status: 'completed',
    amount: 150,
    result_summary: 'No criminal record found. No eviction history. Identity verified via PhilSys.',
    has_criminal_record: false,
    has_eviction_history: false,
    id_verified: true,
    notes: null,
    requested_at: '2024-07-25T08:00:00Z',
    completed_at: '2024-07-26T09:00:00Z',
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function generateRef(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  return 'GCB-' + Array.from({ length: 10 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}
