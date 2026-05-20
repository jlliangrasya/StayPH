import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { MOCK_PRICE_HISTORY } from '@/lib/mock-phase3'

export default function PriceHistory({ listingId }: { listingId: string }) {
  const history = MOCK_PRICE_HISTORY[listingId]
  if (!history || history.length === 0) return null

  // Show newest first
  const sorted = [...history].sort(
    (a, b) => new Date(b.changed_at).getTime() - new Date(a.changed_at).getTime()
  )

  return (
    <div>
      <h2 className="text-navy font-bold text-lg mb-4" style={{ fontFamily: 'var(--font-plus-jakarta)' }}>
        Price history
      </h2>
      <div className="rounded-xl border border-warm-white-dark overflow-hidden">
        {sorted.map((entry, i) => {
          const isFirst = i === sorted.length - 1
          const priceDiff = entry.old_price !== null ? entry.new_price - entry.old_price : null
          const Icon = priceDiff === null ? null : priceDiff > 0 ? TrendingUp : priceDiff < 0 ? TrendingDown : Minus
          const diffColor = priceDiff === null ? '' : priceDiff > 0 ? 'text-soft-red' : priceDiff < 0 ? 'text-leaf' : 'text-charcoal-light'

          return (
            <div
              key={entry.id}
              className={`flex items-center justify-between gap-4 px-4 py-3 ${
                i !== sorted.length - 1 ? 'border-b border-warm-white-dark' : ''
              } ${i === 0 ? 'bg-warm-white' : 'bg-white'}`}
            >
              <div className="flex items-center gap-3 min-w-0">
                {Icon && (
                  <span className={`shrink-0 ${diffColor}`}>
                    <Icon size={16} />
                  </span>
                )}
                {!Icon && <span className="w-4 shrink-0" />}
                <div className="min-w-0">
                  <p className="text-charcoal font-semibold text-sm" style={{ fontFamily: 'var(--font-plus-jakarta)' }}>
                    ₱{entry.new_price.toLocaleString()}
                    {i === 0 && (
                      <span className="ml-2 text-xs font-normal text-charcoal/50">current</span>
                    )}
                  </p>
                  {entry.change_reason && (
                    <p className="text-xs text-charcoal-light truncate">{entry.change_reason}</p>
                  )}
                </div>
              </div>

              <div className="text-right shrink-0">
                {entry.old_price !== null && priceDiff !== null && (
                  <p className={`text-xs font-semibold ${diffColor}`}>
                    {priceDiff > 0 ? '+' : ''}₱{priceDiff.toLocaleString()}
                  </p>
                )}
                {isFirst && (
                  <p className="text-xs text-charcoal/40">Initial price</p>
                )}
                <p className="text-xs text-charcoal/40 mt-0.5">
                  {new Date(entry.changed_at).toLocaleDateString('en-PH', {
                    year: 'numeric', month: 'short',
                  })}
                </p>
              </div>
            </div>
          )
        })}
      </div>
      <p className="text-xs text-charcoal/40 mt-2" style={{ fontFamily: 'var(--font-inter)' }}>
        All price changes are logged and visible to tenants for transparency.
      </p>
    </div>
  )
}
