import { notFound } from "next/navigation";

import Navbar from "@/components/layout/navbar";
import Container from "@/components/layout/container";

import CloudinaryImage from "@/components/ui/cloudinary-image";
import DestinationCTA from "@/components/ui/destination-cta";

import {
  getDestinationBySlug,
} from "@/services/destination-service";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};



export default async function DestinationPage({
  params,
}: Props) {
  const { slug } = await params;

  const destination =
    await getDestinationBySlug(slug);

  if (!destination) {
    notFound();
  }

  return (
    <main className="bg-[#F8F7F3] min-h-screen">

      <Navbar />

      {/* HERO */}
      <section className="relative h-[90vh] overflow-hidden">

        <CloudinaryImage
          src={destination.image}
          alt={destination.name}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 flex items-center h-full pt-24">

          <Container>

            <div className="max-w-3xl text-white">

              <p className="uppercase tracking-[0.3em] text-sm text-white/70 mb-6">
                Kashmir Destinations
              </p>

              <h1 className="text-6xl md:text-8xl leading-none mb-8">
                {destination.name}
              </h1>

              <p className="text-2xl text-white/80 leading-relaxed mb-8">
                {destination.tagline}
              </p>

              <DestinationCTA />

            </div>

          </Container>

        </div>

      </section>

      {/* CONTENT */}
      <section className="section-padding">

        <Container>

          <div className="max-w-4xl">

            <p className="uppercase tracking-[0.3em] text-sm text-[#1F3A32]/70 mb-6">
              About The Destination
            </p>

            <h2 className="text-5xl leading-tight mb-8 text-[#222222]">
              Discover {destination.name}
            </h2>

            <p className="text-xl leading-relaxed text-[#222222]/70">
              {destination.description}
            </p>

          </div>

        </Container>

      </section>

    </main>
  );
}