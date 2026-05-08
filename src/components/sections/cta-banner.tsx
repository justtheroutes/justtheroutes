"use client";

import Container from "../layout/container";
import Button from "../ui/button";

import { useInquiryModal } from "@/hooks/use-inquiry-modal";

export default function CtaBanner() {
  const inquiryModal = useInquiryModal();

  return (
    <section className="section-padding bg-[#F8F7F3]">

      <Container>

        <div className="rounded-[3rem] bg-[#1F3A32] text-white p-10 md:p-20 text-center luxury-shadow">

          <p className="uppercase tracking-[0.3em] text-sm text-white/70 mb-6">
            Begin Your Journey
          </p>

          <h2 className="text-4xl md:text-6xl leading-tight mb-8">
            Let Kashmir
            <br />
            Surprise You
          </h2>

          <p className="max-w-2xl mx-auto text-white/70 text-lg leading-relaxed mb-10">
            Personalized journeys crafted around your travel style,
            comfort, and unforgettable experiences.
          </p>

          <Button
            size="lg"
            onClick={inquiryModal.onOpen}
          >
            Plan Your Journey
          </Button>

        </div>

      </Container>

    </section>
  );
}