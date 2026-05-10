import Navbar from "@/components/layout/navbar";

import Hero from "@/components/sections/hero";
import TrustStrip from "@/components/sections/trust-strip";
import FeaturedExperiences from "@/components/sections/featured-experiences";
import WhyUs from "@/components/sections/why-us";
import Testimonials from "@/components/sections/testimonials";
import InstagramSection from "@/components/sections/instagram-section";
import CtaBanner from "@/components/sections/cta-banner";
import MarqueeStrip from "@/components/sections/marquee-strip";
import CinematicVideo from "@/components/sections/cinematic-video";


export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <MarqueeStrip />
      <FeaturedExperiences />
      <TrustStrip />
      <WhyUs />
      <CinematicVideo />
      <Testimonials />
      <InstagramSection />
      <CtaBanner />
    </main>
  );
}