import { notFound } from "next/navigation";

import Navbar from "@/components/layout/navbar";

import Container from "@/components/layout/container";

import CloudinaryImage from "@/components/ui/cloudinary-image";

import DestinationCTA from "@/components/ui/destination-cta";

import {
  getStayBySlug,
  getAllStays,
} from "@/services/stay-service";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const stays =
    await getAllStays();

  return stays.map((stay: any) => ({
    slug: stay.slug,
  }));
}

export default async function StayPage({
  params,
}: Props) {
  const { slug } = await params;

  const stay =
    await getStayBySlug(slug);

  if (!stay) {
    notFound();
  }

  return (
    <main className="bg-[#F8F7F3] min-h-screen">

      <Navbar />

      <section className="relative h-[85vh] overflow-hidden">

        <CloudinaryImage
          src={stay.image}
          alt={stay.title}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 h-full flex items-center">

          <Container>

            <div className="max-w-3xl text-white">

              <p className="uppercase tracking-[0.3em] text-sm text-white/70 mb-6">
                Curated Stay
              </p>

              <h1 className="text-6xl md:text-8xl leading-none mb-8">
                {stay.title}
              </h1>

              <p className="text-2xl text-white/80 leading-relaxed">
                {stay.tagline}
              </p>

            </div>

          </Container>

        </div>

      </section>

      <section className="py-24">

        <Container>

          <div className="max-w-4xl">

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">

              <div className="bg-white rounded-[2rem] p-6 luxury-shadow">

                <p className="text-sm text-black/40 mb-2">
                  Location
                </p>

                <h3 className="text-2xl text-[#222222]">
                  {stay.location}
                </h3>

              </div>

              <div className="bg-white rounded-[2rem] p-6 luxury-shadow">

                <p className="text-sm text-black/40 mb-2">
                  Category
                </p>

                <h3 className="text-2xl text-[#222222]">
                  {stay.category}
                </h3>

              </div>

              <div className="bg-white rounded-[2rem] p-6 luxury-shadow">

                <p className="text-sm text-black/40 mb-2">
                  Starting From
                </p>

                <h3 className="text-2xl text-[#222222]">
                  {stay.starting_price}
                </h3>

              </div>

              <div className="bg-white rounded-[2rem] p-6 luxury-shadow">

                <p className="text-sm text-black/40 mb-2">
                  Hospitality
                </p>

                <h3 className="text-2xl text-[#222222]">
                  Premium
                </h3>

              </div>

            </div>

            <h2 className="text-5xl text-[#222222] mb-8">
              About This Stay
            </h2>

            <p className="text-xl leading-relaxed text-[#222222]/70 mb-12">
              {stay.description}
            </p>

            <div className="bg-white rounded-[2rem] p-10 luxury-shadow">

              <h3 className="text-3xl mb-6 text-[#222222]">
                Amenities
              </h3>

              <p className="text-lg text-[#222222]/70 leading-relaxed whitespace-pre-line">
                {stay.amenities}
              </p>

            </div>

            <div className="pt-16">

              <DestinationCTA />

            </div>

          </div>

        </Container>

      </section>

    </main>
  );
}