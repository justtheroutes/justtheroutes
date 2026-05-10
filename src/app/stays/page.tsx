import Link from "next/link";

import Navbar from "@/components/layout/navbar";

import Container from "@/components/layout/container";

import CloudinaryImage from "@/components/ui/cloudinary-image";

import {
  getAllStays,
} from "@/services/stay-service";

export default async function StaysPage() {
  const stays =
    await getAllStays();

  return (
    <main className="bg-[#F8F7F3] min-h-screen">

      <Navbar light />

      <section className="pt-40 pb-24">

        <Container>

          <div className="max-w-4xl mb-20">

            <p className="uppercase tracking-[0.3em] text-sm text-[#1F3A32]/70 mb-6">
              Stays & Houseboats
            </p>

            <h1 className="text-6xl md:text-8xl leading-none mb-8 text-[#222222]">

              Curated
              <br />
              Kashmir Stays

            </h1>

            <p className="text-xl text-[#222222]/70 leading-relaxed max-w-2xl">

              Handpicked luxury stays, boutique hotels, mountain retreats, and iconic Kashmiri houseboats.

            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {stays.map((stay: any) => (
              <Link
                key={stay.id}
                href={`/stays/${stay.slug}`}
                className="group bg-white rounded-[2rem] overflow-hidden luxury-shadow block"
              >

                <div className="relative h-[320px] overflow-hidden">

                  <CloudinaryImage
                    src={stay.image}
                    alt={stay.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                </div>

                <div className="p-8">

                  <div className="flex items-center justify-between mb-4">

                    <h2 className="text-3xl text-[#222222]">
                      {stay.title}
                    </h2>

                    <span className="text-sm bg-[#1F3A32]/10 text-[#1F3A32] px-4 py-2 rounded-full">
                      From {stay.starting_price}
                    </span>

                  </div>

                  <p className="text-[#222222]/70 leading-relaxed mb-6">
                    {stay.tagline}
                  </p>

                  <div className="flex gap-4 text-sm text-black/50">

                    <span>
                      {stay.location}
                    </span>

                    <span>
                      {stay.category}
                    </span>

                  </div>

                </div>

              </Link>
            ))}

          </div>

        </Container>

      </section>

    </main>
  );
}