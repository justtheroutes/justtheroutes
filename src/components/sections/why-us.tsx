import Container from "../layout/container";
import SectionTitle from "../ui/section-title";

const features = [
  {
    title: "Local Expertise",
    description:
      "Built from the heart of Kashmir with deep regional insight and trusted local connections.",
  },

  {
    title: "Curated Experiences",
    description:
      "Every journey is thoughtfully designed for comfort, emotion, and unforgettable memories.",
  },

  {
    title: "Personalized Planning",
    description:
      "No generic itineraries. Every trip is tailored around your pace, interests, and travel style.",
  },

  {
    title: "Seamless Support",
    description:
      "From planning to return, our team stays connected throughout your journey.",
  },
];

export default function WhyUs() {
  return (
    <section className="section-padding bg-white">

      <Container>

        <SectionTitle
          eyebrow="Why JustTheRoutes"
          title="Travel Designed With Intention"
          description="Blending local knowledge, refined hospitality, and immersive experiences to create journeys that feel effortless and memorable."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {features.map((item) => (
            <div
              key={item.title}
              className="p-10 rounded-[2rem] border border-black/5 luxury-shadow bg-[#F8F7F3]"
            >

              <h3 className="text-2xl mb-4">
                {item.title}
              </h3>

              <p className="text-[#222222]/70 leading-relaxed text-lg">
                {item.description}
              </p>

            </div>
          ))}

        </div>

      </Container>

    </section>
  );
}