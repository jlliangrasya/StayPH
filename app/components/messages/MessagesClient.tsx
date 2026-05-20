'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, AlertTriangle, ChevronLeft, MessageSquare } from 'lucide-react'
import type { Conversation, Message } from '@/lib/types'
import { MOCK_MESSAGES } from '@/lib/mock-phase2'
import { detectsGCash } from '@/lib/mock-phase2'
import { useAuth } from '@/lib/auth-context'
import Link from 'next/link'

// ─── Conversation List Item ───────────────────────────────────────────────────

function ConvItem({ conv, isActive, onClick }: { conv: Conversation; isActive: boolean; onClick: () => void }) {
  const initials = conv.other_user.full_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  return (
    <button
      onClick={onClick}
      className={`w-full text-left flex items-start gap-3 px-4 py-3.5 transition-colors border-b border-warm-white-dark last:border-0 ${
        isActive ? 'bg-coral/5' : 'hover:bg-warm-white-dark'
      }`}
    >
      <span className="w-10 h-10 rounded-full bg-navy text-white text-sm font-bold flex items-center justify-center shrink-0">
        {initials}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-semibold text-charcoal truncate">{conv.other_user.full_name}</p>
          {conv.last_message_at && (
            <span className="text-xs text-charcoal-light shrink-0">
              {new Date(conv.last_message_at).toLocaleDateString('en-PH', { month: 'short', day: 'numeric' })}
            </span>
          )}
        </div>
        {conv.listing_title && (
          <p className="text-xs text-coral truncate">{conv.listing_title}</p>
        )}
        <div className="flex items-center justify-between gap-2 mt-0.5">
          <p className="text-xs text-charcoal-light truncate">{conv.last_message ?? 'No messages yet'}</p>
          {conv.unread_count > 0 && (
            <span className="shrink-0 w-5 h-5 rounded-full bg-coral text-white text-xs font-bold flex items-center justify-center">
              {conv.unread_count}
            </span>
          )}
        </div>
      </div>
    </button>
  )
}

// ─── Message Bubble ───────────────────────────────────────────────────────────

function MessageBubble({ msg, isMine }: { msg: Message; isMine: boolean }) {
  return (
    <div className={`flex flex-col gap-1 ${isMine ? 'items-end' : 'items-start'}`}>
      {msg.contains_gcash_flag && (
        <div className="flex items-center gap-1.5 text-xs text-amber bg-amber/10 border border-amber/30 px-3 py-1.5 rounded-lg max-w-xs">
          <AlertTriangle size={13} />
          GCash number detected — all payments must go through StayPH.
        </div>
      )}
      <div className={`max-w-xs sm:max-w-sm px-4 py-2.5 rounded-2xl text-sm ${
        isMine
          ? 'bg-coral text-white rounded-br-sm'
          : 'bg-white border border-warm-white-dark text-charcoal rounded-bl-sm'
      }`}>
        {msg.content}
      </div>
      <span className="text-xs text-charcoal-light px-1">
        {new Date(msg.created_at).toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' })}
      </span>
    </div>
  )
}

// ─── Thread View ──────────────────────────────────────────────────────────────

function ThreadView({ conv, currentUserId, onBack }: { conv: Conversation; currentUserId: string; onBack: () => void }) {
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES[conv.id] ?? [])
  const [input, setInput] = useState('')
  const [gcashWarning, setGcashWarning] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function handleSend(e: React.FormEvent) {
    e.preventDefault()
    const content = input.trim()
    if (!content) return

    const hasGCash = detectsGCash(content)
    if (hasGCash) setGcashWarning(true)
    else setGcashWarning(false)

    // TODO: insert message via Supabase realtime
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      conversation_id: conv.id,
      sender_id: currentUserId,
      receiver_id: conv.other_user.id,
      listing_id: conv.listing_id,
      content,
      is_read: false,
      contains_gcash_flag: hasGCash,
      created_at: new Date().toISOString(),
    }
    setMessages(m => [...m, newMsg])
    setInput('')
  }

  const initials = conv.other_user.full_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div className="flex flex-col h-full">
      {/* Thread header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-warm-white-dark bg-white shrink-0">
        <button onClick={onBack} className="md:hidden p-1.5 rounded-lg hover:bg-warm-white-dark text-charcoal-light">
          <ChevronLeft size={20} />
        </button>
        <span className="w-9 h-9 rounded-full bg-navy text-white text-sm font-bold flex items-center justify-center shrink-0">
          {initials}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-charcoal">{conv.other_user.full_name}</p>
          {conv.listing_title && (
            <Link href={`/listing/${conv.listing_id}`} className="text-xs text-coral hover:underline truncate block">
              {conv.listing_title}
            </Link>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.length === 0 && (
          <p className="text-center text-sm text-charcoal-light py-8">No messages yet. Say hello!</p>
        )}
        {messages.map(msg => (
          <MessageBubble key={msg.id} msg={msg} isMine={msg.sender_id === currentUserId} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* GCash warning banner */}
      {gcashWarning && (
        <div className="mx-4 mb-2 flex items-start gap-2 text-xs bg-amber/10 border border-amber/30 text-amber px-3 py-2.5 rounded-xl">
          <AlertTriangle size={14} className="shrink-0 mt-0.5" />
          <span>Your message contains a phone number. All payments must go through StayPH escrow — never send money via GCash to a landlord directly.</span>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSend} className="flex items-end gap-2 px-4 py-3 border-t border-warm-white-dark bg-white shrink-0">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(e as unknown as React.FormEvent) } }}
          placeholder="Type a message…"
          rows={1}
          className="flex-1 text-sm border border-warm-white-dark rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral resize-none max-h-28 overflow-y-auto"
          style={{ fieldSizing: 'content' } as React.CSSProperties}
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="shrink-0 w-10 h-10 rounded-xl bg-coral hover:bg-coral-dark disabled:opacity-40 text-white flex items-center justify-center transition-colors"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  )
}

// ─── Main Messages Client ─────────────────────────────────────────────────────

interface MessagesClientProps {
  conversations: Conversation[]
}

export default function MessagesClient({ conversations }: MessagesClientProps) {
  const { user } = useAuth()
  const [selected, setSelected] = useState<Conversation | null>(conversations[0] ?? null)
  const [mobileShowThread, setMobileShowThread] = useState(false)

  if (!user) return null

  function selectConv(conv: Conversation) {
    setSelected(conv)
    setMobileShowThread(true)
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] border border-warm-white-dark rounded-2xl overflow-hidden bg-white">
      {/* Sidebar */}
      <div className={`w-full md:w-80 shrink-0 border-r border-warm-white-dark flex flex-col ${mobileShowThread ? 'hidden md:flex' : 'flex'}`}>
        <div className="px-4 py-4 border-b border-warm-white-dark">
          <h2 className="font-bold text-charcoal font-display">Messages</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-3 py-16 px-6 text-center">
              <MessageSquare size={36} className="text-warm-white-dark" />
              <p className="text-sm text-charcoal-light">No conversations yet. Find a listing and message the landlord!</p>
            </div>
          )}
          {conversations.map(c => (
            <ConvItem key={c.id} conv={c} isActive={selected?.id === c.id} onClick={() => selectConv(c)} />
          ))}
        </div>
      </div>

      {/* Thread */}
      <div className={`flex-1 ${mobileShowThread ? 'flex' : 'hidden md:flex'} flex-col`}>
        {selected ? (
          <ThreadView
            conv={selected}
            currentUserId={user.id}
            onBack={() => setMobileShowThread(false)}
          />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center px-8">
            <MessageSquare size={40} className="text-warm-white-dark" />
            <p className="text-sm text-charcoal-light">Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </div>
  )
}
