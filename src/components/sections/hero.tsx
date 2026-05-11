"use client";

import { useEffect, useState } from "react";

import Navbar from "../layout/navbar";
import Container from "../layout/container";
import Button from "../ui/button";
import CloudinaryImage from "../ui/cloudinary-image";

import FadeIn from "../animations/fade-in";

import { useInquiryModal } from "@/hooks/use-inquiry-modal";

const slides = [

  {
    type: "image",

    image:
      "justtheroutes/hero/hero-kashmir",

    layout: "left",

    eyebrow:
      "CURATED KASHMIR EXPERIENCES",

    title:
      "Explore Kashmir Beyond The Ordinary",

    fancy:
      "Luxury journeys crafted across timeless Himalayan landscapes.",

    description:
      "Handcrafted travel experiences blending luxury stays, local culture and unforgettable scenic escapes.",

    primaryCta:
      "Plan Your Journey",

    secondaryCta:
      "Explore Experiences",
  },

  {
    type: "video",

    layout: "center",

    video:
"https://res.cloudinary.com/dqdvlpsi7/video/upload/v1778524633/justtheroutes/hero/hero-kashmir-video.mp4",

    eyebrow:
      "PRIVATE KASHMIR ESCAPES",

    title:
      "Travel Through Kashmir Cinematically",

    fancy:
      "Moments designed to feel unforgettable.",

    description:
      "Luxury houseboats, scenic drives and curated experiences designed around emotion and comfort.",

    primaryCta:
      "Get Quote Now",

    secondaryCta:
      "View Premium Stays",
  },

  {
    type: "image",

    image:
      "justtheroutes/hero/hero-ladakh",

    layout: "right",

    eyebrow:
      "LADAKH ROAD EXPEDITIONS",

    title:
      "Road Journeys Across The Himalayas",

    fancy:
      "Adventure, altitude and cinematic landscapes.",

    description:
      "Experience high-altitude passes, remote valleys and immersive Himalayan routes crafted beyond ordinary tourism.",

    primaryCta:
      "Build My Ladakh Route",

    secondaryCta:
      "Explore Road Trips",
  },

  {
    type: "image",

    image:
      "justtheroutes/hero/hero-honeymoon",

    layout: "split",

    eyebrow:
      "LUXURY HONEYMOON ESCAPES",

    title:
      "Journeys Crafted Around Emotion",

    fancy:
      "Private stays, slow mornings and unforgettable moments.",

    description:
      "Romantic experiences designed around luxury, intimacy and timeless Kashmir landscapes.",

    primaryCta:
      "Design My Escape",

    secondaryCta:
      "View Honeymoon Experiences",
  },
];

export default function HeroSection() {

  const inquiryModal =
    useInquiryModal();

  const [
    activeSlide,
    setActiveSlide,
  ] = useState(0);

  useEffect(() => {

  const slideDuration =
    slides[
      activeSlide
    ].type === "video"
      ? 20000
      : 12000;

  const interval =
    setInterval(() => {

      setActiveSlide(
        (prev) =>
          (prev + 1) %
          slides.length
      );

    }, slideDuration);

  return () =>
    clearInterval(
      interval
    );

}, [activeSlide]);

  return (

    <section className="relative min-h-screen overflow-hidden bg-black">

      {/* BACKGROUND SLIDES */}

      <div className="absolute inset-0">

        {slides.map(
          (
            slide,
            index
          ) => (

            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out will-change-opacity ${
                activeSlide === index
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0"
              }`}
            >

              {/* IMAGE */}

              {slide.type ===
                "image" && (

                <CloudinaryImage
                src={slide.image || ""}
                alt={slide.title}
                width={1920}
                height={1080}
                priority
                className="w-full h-full object-cover scale-105"
                />

              )}

              {/* VIDEO */}

              {slide.type ===
                "video" && (

                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover scale-105"
                >

                  <source
                    src={slide.video}
                    type="video/mp4"
                  />

                </video>

              )}

              {/* OVERLAY */}

              <div className="absolute inset-0 bg-black/45" />

              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

            </div>
          )
        )}

      </div>

      {/* NAVBAR */}

      <div className="relative z-30">

        <Navbar />

      </div>

      {/* HERO CONTENT */}

      <div
        key={activeSlide}
        className="relative z-20 flex items-center min-h-screen pt-24"
        >

        <Container>

          
            <div
                className={`
                    text-white
                    ${
                    slides[
                        activeSlide
                    ].layout === "center"
                        ? "max-w-3xl mx-auto text-center"
                        : slides[
                            activeSlide
                        ].layout === "right"
                        ? "max-w-4xl ml-auto text-right"
                        : "max-w-4xl"
                    }
                `}
                >

                <p className="uppercase tracking-[0.4em] text-xs md:text-sm text-white/60 mb-6">

                    {
                    slides[
                        activeSlide
                    ].eyebrow
                    }

                </p>

                {/* FANCY TEXT */}

                <p className="text-[#D6B36A] italic text-xl md:text-2xl mb-5 font-light">

                    {
                    slides[
                        activeSlide
                    ].fancy
                    }

                </p>

                {/* TITLE */}

                <h1 className="text-5xl md:text-7xl xl:text-8xl leading-[0.92] mb-8 max-w-5xl font-light">

                    {
                    slides[
                        activeSlide
                    ].title
                    }

                </h1>

                {/* DESCRIPTION */}

                <p className="text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl mb-12">

                    {
                    slides[
                        activeSlide
                    ].description
                    }

                </p>

                {/* CTA + MINI FORM */}

                <div
                className={`
                    flex flex-col sm:flex-row gap-4 items-center
                    ${
                    slides[
                        activeSlide
                    ].layout ===
                    "center"
                        ? "justify-center"
                        : slides[
                            activeSlide
                        ].layout ===
                        "right"
                        ? "justify-end"
                        : ""
                    }
                `}
                >

                <Button
                    size="lg"
                    onClick={
                    inquiryModal.onOpen
                    }
                >

                    {
                    slides[
                        activeSlide
                    ].primaryCta
                    }

                </Button>

                <a
                    href="/destinations"
                    className="border border-white/20 bg-white/5 backdrop-blur-md rounded-full px-8 py-4 text-white hover:bg-white hover:text-black transition-all duration-300 text-center"
                >

                    {
                    slides[
                        activeSlide
                    ].secondaryCta
                    }

                </a>

                </div>

                
                {/* DOTS */}

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4">

                {slides.map(
                    (
                    slide,
                    index
                    ) => (

                    <button
                        key={index}
                        onClick={() =>
                        setActiveSlide(
                            index
                        )
                        }
                        className={`group relative transition-all duration-500 ${
                        activeSlide ===
                        index
                            ? "w-14"
                            : "w-3"
                        }`}
                    >

                        <div
                        className={`h-[3px] rounded-full transition-all duration-500 ${
                            activeSlide ===
                            index
                            ? "bg-white"
                            : "bg-white/40 group-hover:bg-white/70"
                        }`}
                        />

                    </button>

                    )
                )}

                </div>
                </div>

        </Container>

      </div>

    </section>
  );
}