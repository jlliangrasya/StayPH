'use client'

import { useState, useEffect } from 'react'
import { Bookmark } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { isBookmarked, toggleBookmark } from '@/lib/bookmark-store'

interface SaveButtonProps {
  listingId: string
  /** 'icon' = just the icon (for cards), 'full' = icon + label (for detail page) */
  variant?: 'icon' | 'full'
  onAuthRequired?: () => void
}

export default function SaveButton({ listingId, variant = 'icon', onAuthRequired }: SaveButtonProps) {
  const { user } = useAuth()
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (user) setSaved(isBookmarked(user.id, listingId))
  }, [user, listingId])

  function handleClick(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (!user) {
      onAuthRequired?.()
      return
    }
    const next = toggleBookmark(user.id, listingId)
    setSaved(next)
  }

  if (variant === 'full') {
    return (
      <button
        onClick={handleClick}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
          saved
            ? 'bg-coral/10 border-coral/30 text-coral'
            : 'bg-white border-warm-white-dark text-charcoal hover:border-coral/30 hover:text-coral'
        }`}
      >
        <Bookmark size={16} className={saved ? 'fill-coral' : ''} />
        {saved ? 'Saved' : 'Save'}
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      title={saved ? 'Remove from saved' : 'Save listing'}
      className={`p-2 rounded-full transition-all ${
        saved
          ? 'bg-coral/10 text-coral'
          : 'bg-white/80 text-charcoal-light hover:text-coral hover:bg-coral/10'
      }`}
    >
      <Bookmark size={17} className={saved ? 'fill-coral' : ''} />
    </button>
  )
}
