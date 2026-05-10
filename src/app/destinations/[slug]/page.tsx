import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Navbar from "@/components/layout/navbar";
import Container from "@/components/layout/container";

import CloudinaryImage from "@/components/ui/cloudinary-image";
import DestinationCTA from "@/components/ui/destination-cta";

import {
  getDestinationBySlug,
  getAllDestinations,
} from "@/services/destination-service";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const destination =
    await getDestinationBySlug(slug);

  if (!destination) {
    return {};
  }

  const title =
    `${destination.name} Travel Guide`;

  const description =
    destination.seo_description ||
    destination.description;

  const image =
    `https://res.cloudinary.com/dqdvlpsi7/image/upload/f_auto,q_auto/${destination.image}`;

  return {
    title,

    description,

    openGraph: {
      title,

      description,

      images: [
        {
          url: image,
          width: 1200,
          height: 630,
        },
      ],
    },

    twitter: {
      card:
        "summary_large_image",

      title,

      description,

      images: [image],
    },
  };
}

export default async function DestinationPage({
  params,
}: Props) {
  const { slug } = await params;

  const destination =
    await getDestinationBySlug(slug);

    const relatedDestinations =
  await getAllDestinations();

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

      {/* OVERVIEW */}
<section className="section-padding">

  <Container>

    <div className="max-w-5xl">

      <p className="uppercase tracking-[0.3em] text-sm text-[#1F3A32]/70 mb-6">
        Destination Overview
      </p>

      <h2 className="text-5xl md:text-7xl leading-none mb-10 text-[#222222]">
        Discover {destination.name}
      </h2>

      <p className="text-xl leading-loose text-[#222222]/70 max-w-4xl">
        {destination.description}
      </p>

    </div>

  </Container>

</section>

{/* INFO GRID */}
<section className="pb-32">

  <Container>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

      <div className="bg-white rounded-[2rem] p-10 border border-black/5">

        <p className="uppercase tracking-[0.3em] text-sm text-[#1F3A32]/60 mb-5">
          Best Time To Visit
        </p>

        <p className="text-xl leading-loose text-[#222222]/75">
          {destination.best_time}
        </p>

      </div>

      <div className="bg-white rounded-[2rem] p-10 border border-black/5">

        <p className="uppercase tracking-[0.3em] text-sm text-[#1F3A32]/60 mb-5">
          Ideal Trip Duration
        </p>

        <p className="text-xl leading-loose text-[#222222]/75">
          {destination.trip_duration}
        </p>

      </div>

      <div className="bg-white rounded-[2rem] p-10 border border-black/5">

        <p className="uppercase tracking-[0.3em] text-sm text-[#1F3A32]/60 mb-5">
          How To Reach
        </p>

        <p className="text-xl leading-loose text-[#222222]/75">
          {destination.how_to_reach}
        </p>

      </div>

      <div className="bg-[#1F3A32] text-white rounded-[2rem] p-10">

        <p className="uppercase tracking-[0.3em] text-sm text-white/60 mb-5">
          Highlights
        </p>

        <p className="text-xl leading-loose text-white/80">
          {destination.highlights}
        </p>

      </div>

    </div>

  </Container>

</section>

{/* RELATED DESTINATIONS */}
<section className="py-24 bg-white">

  <Container>

    <div className="mb-14">

      <p className="uppercase tracking-[0.3em] text-sm text-[#1F3A32]/70 mb-4">
        Explore More
      </p>

      <h2 className="text-5xl text-[#222222]">
        More Destinations
      </h2>

    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

      {relatedDestinations
        .filter(
          (item: any) =>
            item.slug !==
            destination.slug
        )
        .slice(0, 3)
        .map((item: any) => (

          <a
            key={item.id}
            href={`/destinations/${item.slug}`}
            className="group"
          >

            <div className="relative h-[320px] rounded-[2rem] overflow-hidden mb-5">

              <CloudinaryImage
                src={item.image}
                alt={item.name}
                fill
                className="object-cover group-hover:scale-105 transition duration-700"
              />

              <div className="absolute inset-0 bg-black/30" />

            </div>

            <h3 className="text-2xl text-[#222222] mb-2">
              {item.name}
            </h3>

            <p className="text-[#222222]/70">
              {item.tagline}
            </p>

          </a>
        ))}

    </div>

  </Container>

</section>

    </main>
    
  );
}