'use client'

import { useEffect, useState } from 'react'
import { MessageSquare } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import MessagesClient from '@/components/messages/MessagesClient'
import { useAuth } from '@/lib/auth-context'
import { MOCK_CONVERSATIONS } from '@/lib/mock-phase2'
import type { Conversation } from '@/lib/types'
import AuthModal from '@/components/auth/AuthModal'

export default function MessagesPage() {
  const { user, isLoading } = useAuth()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [authOpen, setAuthOpen] = useState(false)

  useEffect(() => {
    if (!user) return
    // TODO: fetch from Supabase conversations table where tenant_id or landlord_id = user.id
    const userConvs = MOCK_CONVERSATIONS.filter(
      c => c.tenant_id === user.id || c.landlord_id === user.id
    )
    setConversations(userConvs)
  }, [user])

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-warm-white pt-20 pb-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="h-96 bg-warm-white-dark rounded-2xl animate-pulse" />
          ) : !user ? (
            <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
              <div className="w-20 h-20 rounded-full bg-coral/10 flex items-center justify-center">
                <MessageSquare size={36} className="text-coral" />
              </div>
              <div>
                <p className="text-lg font-bold text-charcoal font-display">Sign in to view your messages</p>
                <p className="text-sm text-charcoal-light mt-1">All your conversations with landlords appear here.</p>
              </div>
              <button
                onClick={() => setAuthOpen(true)}
                className="px-6 py-2.5 bg-coral text-white font-semibold rounded-xl hover:bg-coral-dark transition-colors"
              >
                Sign in
              </button>
            </div>
          ) : (
            <MessagesClient conversations={conversations} />
          )}
        </div>
      </main>
      <Footer />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} defaultMode="signin" />
    </>
  )
}
