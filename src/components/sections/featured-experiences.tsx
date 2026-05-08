import Link from "next/link";

import Container from "../layout/container";

import CloudinaryImage from "../ui/cloudinary-image";
import HorizontalScroll from "../ui/horizontal-scroll";

import {
  getFeaturedDestinations,
} from "@/services/destination-service";

export default async function FeaturedExperiences() {
  const destinations =
    await getFeaturedDestinations();

  return (
    <section className="section-padding bg-[#F8F7F3] overflow-hidden">

      <Container>

        <div className="max-w-4xl mb-14">

          <p className="uppercase tracking-[0.3em] text-sm text-[#1F3A32]/70 mb-6">
            Destinations
          </p>

          <h2 className="text-5xl md:text-7xl leading-none mb-8 text-[#222222]">
            Curated Across
            <br />
            Kashmir
          </h2>

          <p className="text-xl text-[#222222]/70 leading-relaxed max-w-2xl">
            Explore destinations designed around authentic experiences,
            thoughtful pacing, and meaningful journeys.
          </p>

        </div>

      </Container>

      <HorizontalScroll>

  {destinations.map(
    (destination: any) => (
      <Link
        key={destination.id}
        href={`/destinations/${destination.slug}`}
        className="group relative w-[320px] md:w-[380px] h-[500px] rounded-[2rem] overflow-hidden flex-shrink-0 luxury-shadow"
      >

        <CloudinaryImage
          src={destination.image}
          alt={destination.name}
          fill
          priority
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute bottom-0 left-0 p-8 text-white">

          <h3 className="text-4xl mb-3">
            {destination.name}
          </h3>

          <p className="text-white/80 leading-relaxed max-w-sm">
            {destination.tagline}
          </p>

        </div>

      </Link>
    )
  )}

</HorizontalScroll>

    </section>
  );
}