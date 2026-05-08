import Container from "../layout/container";

const items = [
  "Local Travel Experts",
  "Curated Luxury Experiences",
  "Handpicked Stays",
  "24/7 On-Trip Support",
];

export default function TrustStrip() {
  return (
    <section className="bg-[#1F3A32] text-white py-6 overflow-hidden">
      <Container>

        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-sm uppercase tracking-[0.2em] text-white/80">

          {items.map((item) => (
            <span key={item}>
              {item}
            </span>
          ))}

        </div>

      </Container>
    </section>
  );
}