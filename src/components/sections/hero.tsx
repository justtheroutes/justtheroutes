"use client";

import Navbar from "../layout/navbar";
import Container from "../layout/container";
import Button from "../ui/button";
import CloudinaryImage from "../ui/cloudinary-image";

import FadeIn from "../animations/fade-in";

import { useInquiryModal } from "@/hooks/use-inquiry-modal";

export default function HeroSection() {
  const inquiryModal = useInquiryModal();

  return (
    <section className="relative min-h-screen overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0">

        <CloudinaryImage
          src="justtheroutes/hero/hero-kashmir"
          alt="Kashmir Landscape"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />

      </div>

      {/* Navbar */}
      <div className="relative z-30">
        <Navbar />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 flex items-center min-h-screen pt-24">

        <Container>

          <FadeIn>

            <div className="max-w-4xl text-white">

              <p className="uppercase tracking-[0.3em] text-sm text-white/70 mb-6">
                Curated Journeys Through Kashmir
              </p>

              <h1 className="text-6xl md:text-8xl leading-none mb-8">
                Explore Kashmir
                <br />
                Beyond The Ordinary
              </h1>

              <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl mb-10">
                Handcrafted travel experiences designed around luxury,
                culture, adventure, and unforgettable Himalayan landscapes.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">

                <Button
                  size="lg"
                  onClick={inquiryModal.onOpen}
                >
                  Plan Your Journey
                </Button>

                <a
                  href="/destinations"
                  className="border border-white/30 rounded-full px-8 py-4 text-white hover:bg-white hover:text-black transition text-center"
                >
                  Explore Destinations
                </a>

              </div>

            </div>

          </FadeIn>

        </Container>

      </div>

    </section>
  );
}