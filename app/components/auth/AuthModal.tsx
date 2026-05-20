'use client'

import { useState } from 'react'
import { X, Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

type Mode = 'signin' | 'signup'
type SignupRole = 'tenant' | 'landlord'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultMode?: Mode
}

export default function AuthModal({ isOpen, onClose, defaultMode = 'signin' }: AuthModalProps) {
  const { signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth()

  const [mode, setMode] = useState<Mode>(defaultMode)
  const [role, setRole] = useState<SignupRole>('tenant')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  if (!isOpen) return null

  function reset() {
    setError(null)
    setFullName('')
    setEmail('')
    setPassword('')
    setShowPassword(false)
    setIsLoading(false)
  }

  function switchMode(next: Mode) {
    reset()
    setMode(next)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    try {
      if (mode === 'signin') {
        const { error } = await signInWithEmail(email, password)
        if (error) { setError(error); return }
      } else {
        if (!fullName.trim()) { setError('Please enter your full name.'); return }
        const { error } = await signUpWithEmail(email, password, fullName.trim(), role)
        if (error) { setError(error); return }
      }
      reset()
      onClose()
    } finally {
      setIsLoading(false)
    }
  }

  async function handleGoogle() {
    setError(null)
    setIsLoading(true)
    try {
      const { error } = await signInWithGoogle()
      if (error) { setError(error); return }
      reset()
      onClose()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-warm-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-warm-white-dark">
          <div>
            <h2 className="text-xl font-bold font-display text-navy">
              {mode === 'signin' ? 'Welcome back' : 'Create your account'}
            </h2>
            <p className="text-sm text-charcoal-light mt-0.5">
              {mode === 'signin'
                ? 'Sign in to access your StayPH account'
                : 'Find your home away from home'}
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-warm-white-dark text-charcoal-light transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          {/* Role selector — signup only */}
          {mode === 'signup' && (
            <div className="grid grid-cols-2 gap-2 p-1 bg-warm-white-dark rounded-xl">
              {(['tenant', 'landlord'] as const).map(r => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`py-2 rounded-lg text-sm font-semibold transition-all ${
                    role === r
                      ? 'bg-white text-coral shadow-sm'
                      : 'text-charcoal-light hover:text-charcoal'
                  }`}
                >
                  {r === 'tenant' ? '🏠 I\'m looking' : '🔑 I\'m a landlord'}
                </button>
              ))}
            </div>
          )}

          {/* Google button */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-warm-white-dark rounded-xl text-charcoal font-medium text-sm hover:bg-warm-white-dark transition-colors disabled:opacity-50"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
              <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-warm-white-dark" />
            <span className="text-xs text-charcoal-light">or</span>
            <div className="flex-1 h-px bg-warm-white-dark" />
          </div>

          {/* Email form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === 'signup' && (
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-light" />
                <input
                  type="text"
                  placeholder="Full name"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  required
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-warm-white-dark rounded-xl text-sm text-charcoal placeholder:text-charcoal-light/60 focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral"
                />
              </div>
            )}

            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-light" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-warm-white-dark rounded-xl text-sm text-charcoal placeholder:text-charcoal-light/60 focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral"
              />
            </div>

            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-light" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full pl-9 pr-10 py-2.5 bg-white border border-warm-white-dark rounded-xl text-sm text-charcoal placeholder:text-charcoal-light/60 focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral"
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-light hover:text-charcoal"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {error && (
              <p className="text-sm text-soft-red bg-soft-red/10 px-3 py-2 rounded-lg">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-coral hover:bg-coral-dark text-white font-semibold rounded-xl text-sm transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'}
            </button>
          </form>

          {/* Phone OTP hint */}
          {mode === 'signup' && (
            <p className="text-xs text-charcoal-light text-center">
              📱 You can add your phone number after signing up to get OTP verified.
            </p>
          )}

          {/* Switch mode */}
          <p className="text-sm text-center text-charcoal-light">
            {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={() => switchMode(mode === 'signin' ? 'signup' : 'signin')}
              className="text-coral font-semibold hover:underline"
            >
              {mode === 'signin' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
