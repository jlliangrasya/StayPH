import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/HowItWorks";
import TrustBadges from "@/components/landing/TrustBadges";
import FeaturedListings from "@/components/landing/FeaturedListings";
import Testimonials from "@/components/landing/Testimonials";
import ForLandlords from "@/components/landing/ForLandlords";
import CTASection from "@/components/landing/CTASection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorks />
        <TrustBadges />
        <FeaturedListings />
        <Testimonials />
        <ForLandlords />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
