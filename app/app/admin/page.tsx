'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AdminPanel from '@/components/admin/AdminPanel'
import { useAuth } from '@/lib/auth-context'

export default function AdminPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      router.replace('/')
    }
  }, [user, isLoading, router])

  if (isLoading || !user || user.role !== 'admin') {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-warm-white pt-20 pb-16 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-coral border-t-transparent rounded-full animate-spin" />
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-warm-white pt-20 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdminPanel />
        </div>
      </main>
      <Footer />
    </>
  )
}
