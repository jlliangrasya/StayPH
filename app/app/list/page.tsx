import type { Metadata } from "next"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import CreateListingForm from "@/components/list/CreateListingForm"

export const metadata: Metadata = {
  title: "List Your Property — StayPH",
  description: "List your boarding house or bedspace on StayPH for free. Reach thousands of verified students and working professionals.",
}

export default function ListPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-warm-white pt-16">
        {/* Header */}
        <div className="bg-navy py-10 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-white/50 text-sm mb-2" style={{ fontFamily: "var(--font-inter)" }}>
              For Landlords
            </p>
            <h1 className="text-white text-3xl sm:text-4xl font-bold mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
              List your property
            </h1>
            <p className="text-white/70 text-sm leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
              Free to list. Our team reviews every submission. Verified listings get 5× more inquiries.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <CreateListingForm />
        </div>
      </main>
      <Footer />
    </>
  )
}
