'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User, Phone, Mail, Shield, CheckCircle, LogOut, ChevronRight } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useAuth } from '@/lib/auth-context'
import Link from 'next/link'

export default function ProfilePage() {
  const { user, isLoading, signOut } = useAuth()
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) router.replace('/')
  }, [user, isLoading, router])

  useEffect(() => {
    if (user) {
      setFullName(user.full_name)
      setPhone(user.phone ?? '')
    }
  }, [user])

  if (isLoading || !user) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-warm-white pt-20 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-coral border-t-transparent rounded-full animate-spin" />
        </main>
        <Footer />
      </>
    )
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!user) return
    // Demo: update in-memory user object
    user.full_name = fullName.trim() || user.full_name
    user.phone = phone.trim() || null
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const initials = user.full_name
    .split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  const quickLinks = [
    { label: 'Saved Listings',    href: '/saved',      icon: '🔖' },
    { label: 'Messages',          href: '/messages',   icon: '💬' },
    { label: 'Appointments',      href: '/appointments', icon: '📅' },
    { label: 'Verify Documents',  href: '/verify-docs', icon: '🪪' },
    ...(user.role === 'landlord' || user.role === 'admin'
      ? [{ label: 'Landlord Dashboard', href: '/dashboard', icon: '🏠' }]
      : []),
    ...(user.role === 'admin'
      ? [{ label: 'Admin Panel', href: '/admin', icon: '⚙️' }]
      : []),
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-warm-white pt-20 pb-16">
        <div className="max-w-xl mx-auto px-4 sm:px-6 space-y-6">

          {/* Avatar + role */}
          <div className="flex items-center gap-5 bg-white rounded-2xl border border-warm-white-dark p-6">
            <div className="w-16 h-16 rounded-full bg-coral text-white text-2xl font-bold flex items-center justify-center shrink-0"
              style={{ fontFamily: 'var(--font-plus-jakarta)' }}>
              {initials}
            </div>
            <div>
              <h1 className="text-xl font-bold text-navy" style={{ fontFamily: 'var(--font-plus-jakarta)' }}>
                {user.full_name}
              </h1>
              <p className="text-sm text-charcoal-light" style={{ fontFamily: 'var(--font-inter)' }}>
                {user.email}
              </p>
              <span className="inline-block mt-1.5 text-xs bg-coral/10 text-coral px-2.5 py-0.5 rounded-full font-semibold capitalize">
                {user.role}
              </span>
            </div>
          </div>

          {/* Verification status */}
          <div className="bg-white rounded-2xl border border-warm-white-dark p-5 space-y-3">
            <h2 className="text-sm font-bold text-charcoal uppercase tracking-wide" style={{ fontFamily: 'var(--font-plus-jakarta)' }}>
              Verification
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm ${user.is_id_verified ? 'bg-leaf/8 border-leaf/20 text-leaf' : 'bg-warm-white-dark border-warm-white-dark text-charcoal-light'}`}>
                <Shield size={15} />
                <span className="font-semibold">ID {user.is_id_verified ? 'Verified' : 'Not verified'}</span>
              </div>
              <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm ${user.is_phone_verified ? 'bg-leaf/8 border-leaf/20 text-leaf' : 'bg-warm-white-dark border-warm-white-dark text-charcoal-light'}`}>
                <Phone size={15} />
                <span className="font-semibold">Phone {user.is_phone_verified ? 'Verified' : 'Not verified'}</span>
              </div>
            </div>
            {!user.is_id_verified && (
              <Link
                href="/verify-docs"
                className="flex items-center justify-between px-4 py-3 bg-coral/8 border border-coral/20 rounded-xl text-sm font-semibold text-coral hover:bg-coral/15 transition-colors"
              >
                <span>🪪 Verify your identity to unlock trust badges</span>
                <ChevronRight size={16} />
              </Link>
            )}
          </div>

          {/* Edit profile form */}
          <div className="bg-white rounded-2xl border border-warm-white-dark p-6">
            <h2 className="text-sm font-bold text-charcoal uppercase tracking-wide mb-4" style={{ fontFamily: 'var(--font-plus-jakarta)' }}>
              Edit Profile
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-1.5">Full name</label>
                <div className="relative">
                  <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-light" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 border border-warm-white-dark rounded-xl text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-1.5">Phone number</label>
                <div className="relative">
                  <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-light" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="09XX XXX XXXX"
                    className="w-full pl-9 pr-4 py-2.5 border border-warm-white-dark rounded-xl text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-1.5">Email address</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-light" />
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full pl-9 pr-4 py-2.5 border border-warm-white-dark rounded-xl text-sm text-charcoal-light bg-warm-white cursor-not-allowed"
                  />
                </div>
                <p className="text-xs text-charcoal-light mt-1">Email cannot be changed.</p>
              </div>

              {saved && (
                <div className="flex items-center gap-2 bg-leaf/10 border border-leaf/30 text-leaf rounded-xl px-4 py-2.5 text-sm font-semibold">
                  <CheckCircle size={16} /> Profile updated!
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-coral text-white font-semibold rounded-xl text-sm hover:bg-coral-dark transition-colors"
              >
                Save changes
              </button>
            </form>
          </div>

          {/* Quick links */}
          <div className="bg-white rounded-2xl border border-warm-white-dark overflow-hidden">
            <h2 className="text-sm font-bold text-charcoal uppercase tracking-wide px-5 pt-5 pb-3" style={{ fontFamily: 'var(--font-plus-jakarta)' }}>
              Quick links
            </h2>
            {quickLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-between px-5 py-3 text-sm text-charcoal hover:bg-warm-white-dark transition-colors ${i < quickLinks.length - 1 ? 'border-b border-warm-white-dark' : ''}`}
              >
                <span>{link.icon} {link.label}</span>
                <ChevronRight size={15} className="text-charcoal-light" />
              </Link>
            ))}
          </div>

          {/* Sign out */}
          <button
            onClick={async () => { await signOut(); router.replace('/') }}
            className="w-full flex items-center justify-center gap-2 py-3 border border-soft-red/30 text-soft-red font-semibold rounded-xl text-sm hover:bg-soft-red/5 transition-colors"
          >
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </main>
      <Footer />
    </>
  )
}
