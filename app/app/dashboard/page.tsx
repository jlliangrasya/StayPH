import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import LandlordDashboard from '@/components/dashboard/LandlordDashboard'

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-warm-white pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <LandlordDashboard />
        </div>
      </main>
      <Footer />
    </>
  )
}
