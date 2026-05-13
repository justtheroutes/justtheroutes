import Link from "next/link";

import Navbar from "@/components/layout/navbar";
import Container from "@/components/layout/container";

import CloudinaryImage from "@/components/ui/cloudinary-image";
import FAQSection from "@/components/sections/faq-section";

import {
  getFeaturedDestinations,
} from "@/services/destination-service";

const faqs = [
  {
    question:
      "Is Kashmir safe for tourists right now?",

    answer:
      "Yes. Tourist areas across Kashmir remain active, welcoming and carefully monitored for visitor safety. At JustTheRoutes, we stay closely connected locally and curate routes, stays and experiences with comfort and safety as a priority.",
  },

  {
    question:
      "What is the best time to visit Kashmir?",

    answer:
      "Kashmir transforms beautifully across every season — spring for tulips, summer for pleasant weather, autumn for golden landscapes and winter for snowfall experiences in Gulmarg and Sonmarg.",
  },

  {
    question:
      "How many days are enough for a Kashmir trip?",

    answer:
      "A 5 to 7 day itinerary is ideal to comfortably experience Srinagar, Gulmarg, Pahalgam and Sonmarg without rushing through the journey.",
  },

  {
    question:
      "Do you provide customised Kashmir tour packages?",

    answer:
      "Yes. Every itinerary can be personalised around your travel style, preferred hotels, honeymoon plans, family travel, luxury stays or adventure experiences.",
  },

  {
    question:
      "Is Kashmir good for honeymoon trips?",

    answer:
      "Kashmir remains one of India’s most romantic destinations with luxury stays, private Shikara experiences, mountain retreats and scenic escapes ideal for couples.",
  },

  {
    question:
      "Do I need a local travel operator in Kashmir?",

    answer:
      "A local travel operator helps significantly in Kashmir through better route planning, reliable transportation, local coordination and real-time weather or travel guidance.",
  },

  {
    question:
      "Are flights to Srinagar available throughout the year?",

    answer:
      "Yes. Srinagar is well connected with regular flights from Delhi, Mumbai, Bangalore, Hyderabad and other major Indian cities throughout the year.",
  },

  {
    question:
      "What kind of hotels do you offer in Kashmir packages?",

    answer:
      "We offer premium houseboats, boutique stays, luxury resorts and comfortable family-friendly hotels across major destinations in Kashmir.",
  },
];

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

        <FAQSection
          faqs={faqs}
        />

      </section>

    </main>
  );
}