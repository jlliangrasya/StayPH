import type { Listing, LandlordProfile } from '@/lib/types'

interface BadgeConfig {
  label: string
  emoji: string
  color: string
  bg: string
}

const BADGE_MAP: Record<string, BadgeConfig> = {
  is_top_pick:      { label: 'Top Pick',       emoji: '👑', color: 'text-golden',  bg: 'bg-golden/10 border-golden/30' },
  is_preferred:     { label: 'Preferred',       emoji: '⭐', color: 'text-golden',  bg: 'bg-golden/10 border-golden/30' },
  is_site_visited:  { label: 'Site Visited',    emoji: '🏘️', color: 'text-leaf',    bg: 'bg-leaf/10 border-leaf/30' },
  is_admin_verified:{ label: 'Admin Verified',  emoji: '✅', color: 'text-leaf',    bg: 'bg-leaf/10 border-leaf/30' },
  is_photo_verified:{ label: 'Photo Verified',  emoji: '🖼️', color: 'text-navy',    bg: 'bg-navy/8 border-navy/20' },
  is_id_verified:   { label: 'ID Verified',     emoji: '🪪', color: 'text-navy',    bg: 'bg-navy/8 border-navy/20' },
}

const BADGE_ORDER = ['is_top_pick', 'is_preferred', 'is_site_visited', 'is_admin_verified', 'is_photo_verified', 'is_id_verified'] as const

interface TrustBadgeProps {
  type: keyof typeof BADGE_MAP
  size?: 'sm' | 'md'
}

export function TrustBadge({ type, size = 'md' }: TrustBadgeProps) {
  const cfg = BADGE_MAP[type]
  if (!cfg) return null
  return (
    <span className={`inline-flex items-center gap-1 border rounded-full font-semibold ${cfg.bg} ${cfg.color} ${
      size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs px-2.5 py-1'
    }`}>
      <span>{cfg.emoji}</span>
      {cfg.label}
    </span>
  )
}

interface BadgeRowProps {
  listing: Pick<Listing, 'is_top_pick' | 'is_preferred' | 'is_site_visited' | 'is_admin_verified' | 'is_photo_verified' | 'is_id_verified'>
  max?: number
  size?: 'sm' | 'md'
}

export function BadgeRow({ listing, max, size = 'md' }: BadgeRowProps) {
  const active = BADGE_ORDER.filter(k => listing[k])
  const shown = max ? active.slice(0, max) : active
  const hidden = max ? active.length - shown.length : 0

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {shown.map(k => <TrustBadge key={k} type={k} size={size} />)}
      {hidden > 0 && (
        <span className="text-xs text-charcoal-light">+{hidden} more</span>
      )}
    </div>
  )
}

interface LandlordBadgesProps {
  landlord: Pick<LandlordProfile, 'is_phone_verified' | 'is_id_verified'>
  memberSince: string
}

export function LandlordBadges({ landlord, memberSince }: LandlordBadgesProps) {
  const year = new Date(memberSince).getFullYear()
  return (
    <div className="flex flex-wrap gap-2">
      {landlord.is_phone_verified && (
        <span className="inline-flex items-center gap-1 text-xs bg-leaf/10 border border-leaf/30 text-leaf px-2.5 py-1 rounded-full font-semibold">
          ☎️ Phone Verified
        </span>
      )}
      {landlord.is_id_verified && (
        <span className="inline-flex items-center gap-1 text-xs bg-leaf/10 border border-leaf/30 text-leaf px-2.5 py-1 rounded-full font-semibold">
          🪪 ID Verified
        </span>
      )}
      <span className="inline-flex items-center gap-1 text-xs bg-navy/8 border border-navy/20 text-navy px-2.5 py-1 rounded-full font-semibold">
        📅 Member since {year}
      </span>
    </div>
  )
}
