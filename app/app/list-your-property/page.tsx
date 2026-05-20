import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ListingFormWizard from "@/components/listings/ListingFormWizard";
import { ShieldCheck, Clock, Star } from "lucide-react";

export const metadata = {
  title: "List Your Property — StayPH",
  description: "List your boarding house or bedspace on StayPH. Reach thousands of students and workers looking for safe, verified housing.",
};

export default function ListYourPropertyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-warm-white pt-16">
        {/* Hero */}
        <div className="bg-navy py-10 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1
              className="text-white font-bold text-2xl md:text-3xl mb-3"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              List your property on StayPH
            </h1>
            <p className="text-white/70 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
              Reach thousands of verified students and workers looking for their next home.
              Free to list — we only earn when you do.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mt-6">
              {[
                { icon: ShieldCheck, text: "Verified tenants only" },
                { icon: Clock, text: "Live within 48 hours" },
                { icon: Star, text: "Free Preferred visit for early listers" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-white/80 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                  <Icon size={14} className="text-golden" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <div className="bg-white rounded-2xl border border-warm-white-dark shadow-sm p-6 md:p-10">
            <ListingFormWizard />
          </div>

          {/* Trust note */}
          <div className="mt-6 bg-amber/10 border border-amber/30 rounded-xl p-4 text-xs text-charcoal-light" style={{ fontFamily: "var(--font-inter)" }}>
            <strong className="text-charcoal">What happens after you submit?</strong> Our team reviews every listing
            within 24–48 hours. We check your ID, verify photos are real (no stock images), and confirm the property
            details. Once approved, your listing goes live with an "Admin Verified" badge. Want the ⭐ Preferred tag?
            Request a team visit for ₱499 — full refund if you don't pass.
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
