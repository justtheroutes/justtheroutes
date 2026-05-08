import Navbar from "@/components/layout/navbar";
import Container from "@/components/layout/container";

export default function AboutPage() {
  return (
    <main className="bg-[#F8F7F3] min-h-screen">

      <Navbar light />

      <section className="pt-40 pb-24">

        <Container>

          <div className="max-w-5xl">

            <p className="uppercase tracking-[0.3em] text-sm text-[#1F3A32]/70 mb-6">
              About Us
            </p>

            <h1 className="text-6xl md:text-8xl leading-none mb-12 text-[#222222]">
              Built In Kashmir.
              <br />
              Designed With Care.
            </h1>

            <div className="space-y-10 text-lg leading-relaxed text-[#222222]/75">

              <p>
                JustTheRoutes was founded with a clear intention —
                to offer travel experiences in Kashmir that feel genuine,
                unhurried, and thoughtfully designed. We are a Kashmir-based
                travel company, built by locals who understand the land,
                its rhythms, and the responsibility that comes with welcoming travelers.
              </p>

              <p>
                For us, Kashmir is not a product or a seasonal destination.
                It is home. Every valley, road, and village carries stories
                we’ve grown up with. JustTheRoutes was created to share this deeper,
                more meaningful side of Kashmir with travelers who want more than
                surface-level sightseeing.
              </p>

              <p>
                Over the years, we noticed a gap between what travelers hoped to
                experience and what they were often offered — rushed itineraries,
                unclear pricing, and generic routes that left little room for connection.
                We believed there was a better way to travel here.
              </p>

              <div className="pt-8">

                <h2 className="text-4xl text-[#222222] mb-6">
                  Our Mission
                </h2>

                <p>
                  Our mission is simple: to design journeys across Kashmir
                  that are honest, safe, and deeply respectful of both travelers
                  and local communities. We focus on creating experiences that
                  balance comfort with exploration, and structure with flexibility.
                </p>

              </div>

              <div className="pt-8">

                <h2 className="text-4xl text-[#222222] mb-6">
                  How We Work
                </h2>

                <p>
                  Being based in Srinagar allows us to work directly with hotels,
                  drivers, and guides we personally know and trust. This direct
                  approach ensures consistent quality, fair pricing, and complete
                  clarity for our travelers.
                </p>

              </div>

              <div className="pt-8">

                <h2 className="text-4xl text-[#222222] mb-6">
                  Responsible Travel
                </h2>

                <p>
                  Kashmir’s beauty is timeless, but it is also fragile.
                  We believe tourism should support local livelihoods while
                  preserving the natural and cultural fabric of the region.
                </p>

              </div>

              <div className="pt-8">

                <h2 className="text-4xl text-[#222222] mb-6">
                  Our Promise
                </h2>

                <p>
                  When you travel with JustTheRoutes, you are choosing a team
                  that values trust, transparency, and long-term relationships
                  over quick transactions. We remain available throughout your
                  journey and take responsibility for every detail we plan.
                </p>

                <p className="pt-6">
                  Kashmir has its own pace and soul.
                  Our promise is to help you experience it the right way —
                  with care, clarity, and respect.
                </p>

              </div>

            </div>

          </div>

        </Container>

      </section>

    </main>
  );
}