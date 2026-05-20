'use client'

// Client-side bookmark store backed by localStorage.
// TODO: swap get/add/remove calls for Supabase CRUD on the bookmarks table.

import { MOCK_BOOKMARKS } from '@/lib/mock-phase2'
import type { Bookmark } from '@/lib/types'

const STORAGE_KEY = 'stayph_bookmarks'

function load(userId: string): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY}_${userId}`)
    if (raw) return JSON.parse(raw) as string[]
  } catch {}
  // Seed from mock data on first load
  const seeded = MOCK_BOOKMARKS.filter(b => b.tenant_id === userId).map(b => b.listing_id)
  save(userId, seeded)
  return seeded
}

function save(userId: string, ids: string[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(`${STORAGE_KEY}_${userId}`, JSON.stringify(ids))
}

export function getBookmarkedIds(userId: string): string[] {
  return load(userId)
}

export function isBookmarked(userId: string, listingId: string): boolean {
  return load(userId).includes(listingId)
}

export function addBookmark(userId: string, listingId: string): void {
  const ids = load(userId)
  if (!ids.includes(listingId)) {
    save(userId, [...ids, listingId])
  }
}

export function removeBookmark(userId: string, listingId: string): void {
  const ids = load(userId).filter(id => id !== listingId)
  save(userId, ids)
}

export function toggleBookmark(userId: string, listingId: string): boolean {
  if (isBookmarked(userId, listingId)) {
    removeBookmark(userId, listingId)
    return false
  } else {
    addBookmark(userId, listingId)
    return true
  }
}
