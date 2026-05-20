'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type { User } from '@/lib/types'
import { MOCK_USERS } from '@/lib/mock-phase2'

// When Supabase is wired up, replace mock* functions with real Supabase Auth calls.

interface AuthContextValue {
  user: User | null
  isLoading: boolean
  signInWithEmail: (email: string, password: string) => Promise<{ error: string | null }>
  signUpWithEmail: (email: string, password: string, fullName: string, role: 'tenant' | 'landlord') => Promise<{ error: string | null }>
  signInWithGoogle: () => Promise<{ error: string | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

const STORAGE_KEY = 'stayph_mock_user_id'
const STORAGE_USER_KEY = 'stayph_mock_user_data'

function mockSignIn(email: string): User | null {
  // Check in-memory list first, then localStorage-persisted custom users
  const inMemory = MOCK_USERS.find(u => u.email === email)
  if (inMemory) return inMemory
  try {
    const raw = localStorage.getItem(STORAGE_USER_KEY)
    if (raw) {
      const users: User[] = JSON.parse(raw)
      return users.find(u => u.email === email) ?? null
    }
  } catch {}
  return null
}

function saveCustomUser(newUser: User) {
  try {
    const raw = localStorage.getItem(STORAGE_USER_KEY)
    const users: User[] = raw ? JSON.parse(raw) : []
    if (!users.find(u => u.id === newUser.id)) users.push(newUser)
    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(users))
  } catch {}
}

function loadCustomUser(id: string): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_USER_KEY)
    if (raw) {
      const users: User[] = JSON.parse(raw)
      return users.find(u => u.id === id) ?? null
    }
  } catch {}
  return null
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Rehydrate session from localStorage (mock only)
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      // First check mock users, then localStorage-persisted custom users
      const found = MOCK_USERS.find(u => u.id === stored) ?? loadCustomUser(stored)
      setUser(found)
    }
    setIsLoading(false)
  }, [])

  const signInWithEmail = useCallback(async (email: string, _password: string) => {
    // TODO: replace with supabase.auth.signInWithPassword({ email, password })
    const found = mockSignIn(email)
    if (!found) return { error: 'No account found with that email.' }
    setUser(found)
    localStorage.setItem(STORAGE_KEY, found.id)
    return { error: null }
  }, [])

  const signUpWithEmail = useCallback(async (email: string, _password: string, fullName: string, role: 'tenant' | 'landlord') => {
    // TODO: replace with supabase.auth.signUp then insert into users table
    const existing = mockSignIn(email)
    if (existing) return { error: 'An account with that email already exists.' }
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      phone: null,
      full_name: fullName,
      role,
      avatar_url: null,
      is_phone_verified: false,
      is_id_verified: false,
      is_suspended: false,
      created_at: new Date().toISOString(),
    }
    MOCK_USERS.push(newUser)
    saveCustomUser(newUser)
    setUser(newUser)
    localStorage.setItem(STORAGE_KEY, newUser.id)
    return { error: null }
  }, [])

  const signInWithGoogle = useCallback(async () => {
    // TODO: replace with supabase.auth.signInWithOAuth({ provider: 'google' })
    // For mock, sign in as first tenant
    const mockGoogleUser = MOCK_USERS[0]
    setUser(mockGoogleUser)
    localStorage.setItem(STORAGE_KEY, mockGoogleUser.id)
    return { error: null }
  }, [])

  const signOut = useCallback(async () => {
    // TODO: replace with supabase.auth.signOut()
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, signInWithEmail, signUpWithEmail, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
