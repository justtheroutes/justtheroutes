import { notFound } from "next/navigation";

import Navbar from "@/components/layout/navbar";

import Container from "@/components/layout/container";

import CloudinaryImage from "@/components/ui/cloudinary-image";

import DestinationCTA from "@/components/ui/destination-cta";

import {
  getExperienceBySlug,
  getAllExperiences,
} from "@/services/experience-service";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const experiences =
    await getAllExperiences();

  return experiences.map(
    (item: any) => ({
      slug: item.slug,
    })
  );
}

export default async function ExperiencePage({
  params,
}: Props) {
  const { slug } = await params;

  const experience =
    await getExperienceBySlug(
      slug
    );

  if (!experience) {
    notFound();
  }

  const relatedExperiences =
    await getAllExperiences();

  return (
    <main className="bg-[#F8F7F3] min-h-screen">

      <Navbar />

      <section className="relative h-[90vh] overflow-hidden">

        <CloudinaryImage
          src={experience.image}
          alt={experience.title}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex items-center h-full pt-24">

          <Container>

            <div className="max-w-3xl text-white">

              <p className="uppercase tracking-[0.3em] text-sm text-white/70 mb-6">
                Kashmir Experience
              </p>

              <h1 className="text-6xl md:text-8xl leading-none mb-8">
                {experience.title}
              </h1>

              <p className="text-2xl text-white/80 leading-relaxed">
                {experience.tagline}
              </p>

            </div>

          </Container>

        </div>

      </section>

      <section className="py-24">

        <Container>

          <div className="max-w-4xl">

            <h2 className="text-5xl text-[#222222] mb-8">
              About This Experience
            </h2>

            <p className="text-xl leading-relaxed text-[#222222]/70 mb-12">
              {experience.description}
            </p>

            <div className="bg-white rounded-[2rem] p-10 luxury-shadow">

              <h3 className="text-3xl mb-6 text-[#222222]">
                Highlights
              </h3>

              <p className="text-lg text-[#222222]/70 leading-relaxed whitespace-pre-line">
                {experience.highlights}
              </p>

            </div>

            <div className="pt-16">

              <DestinationCTA />

            </div>

          </div>

        </Container>

      </section>

      <section className="py-24 bg-white">

        <Container>

          <div className="mb-14">

            <p className="uppercase tracking-[0.3em] text-sm text-[#1F3A32]/70 mb-4">
              Explore More
            </p>

            <h2 className="text-5xl text-[#222222]">
              Related Experiences
            </h2>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {relatedExperiences
              .filter(
                (item: any) =>
                  item.slug !==
                  experience.slug
              )
              .slice(0, 3)
              .map((item: any) => (

                <a
                  key={item.id}
                  href={`/experiences/${item.slug}`}
                  className="group"
                >

                  <div className="relative h-[320px] rounded-[2rem] overflow-hidden mb-5">

                    <CloudinaryImage
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-700"
                    />

                    <div className="absolute inset-0 bg-black/30" />

                  </div>

                  <h3 className="text-2xl text-[#222222] mb-2">
                    {item.title}
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