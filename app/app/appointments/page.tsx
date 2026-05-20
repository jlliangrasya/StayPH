import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AppointmentsDashboard from '@/components/appointments/AppointmentsDashboard'

export default function AppointmentsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-warm-white pt-20 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AppointmentsDashboard />
        </div>
      </main>
      <Footer />
    </>
  )
}
