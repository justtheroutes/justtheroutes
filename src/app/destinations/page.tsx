import Link from "next/link";

import Navbar from "@/components/layout/navbar";
import Container from "@/components/layout/container";

import CloudinaryImage from "@/components/ui/cloudinary-image";

import {
  getFeaturedDestinations,
} from "@/services/destination-service";

export default async function DestinationsPage() {
  const destinations =
    await getFeaturedDestinations();

  return (
    <main className="bg-[#F8F7F3] min-h-screen">

      <Navbar light />

      <section className="pt-40 pb-24">

        <Container>

          <div className="max-w-4xl mb-20">

            <p className="uppercase tracking-[0.3em] text-sm text-[#1F3A32]/70 mb-6">
              Destinations
            </p>

            <h1 className="text-6xl md:text-8xl leading-none mb-8 text-[#222222]">
              Explore
              <br />
              Kashmir
            </h1>

            <p className="text-xl text-[#222222]/70 leading-relaxed max-w-2xl">
              Curated destinations across Kashmir designed for meaningful travel experiences.
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {destinations.map(
              (destination: any) => (
                <Link
                  key={destination.id}
                  href={`/destinations/${destination.slug}`}
                  className="group bg-white rounded-[2rem] overflow-hidden luxury-shadow block"
                >

                  <div className="relative h-[400px] overflow-hidden">

                    <CloudinaryImage
                      src={destination.image}
                      alt={destination.name}
                      fill
                      priority
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                  </div>

                  <div className="p-8">

                    <h2 className="text-4xl mb-4 text-[#222222]">
                      {destination.name}
                    </h2>

                    <p className="text-[#222222]/70 leading-relaxed">
                      {destination.tagline}
                    </p>

                  </div>

                </Link>
              )
            )}

          </div>

        </Container>

      </section>

    </main>
  );
}