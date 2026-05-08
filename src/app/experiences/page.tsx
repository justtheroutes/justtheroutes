import Navbar from "@/components/layout/navbar";
import Container from "@/components/layout/container";

export default function ExperiencesPage() {
  return (
    <main className="bg-[#F8F7F3] min-h-screen">

      <Navbar light/>

      <section className="pt-40 pb-24">

        <Container>

          <div className="max-w-4xl">

            <p className="uppercase tracking-[0.3em] text-sm text-[#1F3A32]/70 mb-6">
              Experiences
            </p>

            <h1 className="text-6xl md:text-8xl leading-none mb-8 text-[#222222]">
              Curated
              <br />
              Experiences
            </h1>

            <p className="text-xl text-[#222222]/70 leading-relaxed max-w-2xl">
              Discover handcrafted travel experiences across Kashmir,
              from luxury retreats and snow adventures to cultural escapes
              and immersive local journeys.
            </p>

          </div>

        </Container>

      </section>

    </main>
  );
}