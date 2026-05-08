import Navbar from "@/components/layout/navbar";
import Container from "@/components/layout/container";

import { siteConfig } from "@/config/site";

export default function ContactPage() {
  return (
    <main className="bg-[#F8F7F3] min-h-screen">

      <Navbar light />

      <section className="pt-40 pb-24">

        <Container>

          <div className="max-w-4xl">

            <p className="uppercase tracking-[0.3em] text-sm text-[#1F3A32]/70 mb-6">
              Contact
            </p>

            <h1 className="text-6xl md:text-8xl leading-none mb-12 text-[#222222]">
              Let’s Plan
              <br />
              Your Journey
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

              <div className="bg-white rounded-[2rem] p-10 luxury-shadow">

                <h2 className="text-3xl mb-8">
                  Contact Details
                </h2>

                <div className="space-y-8 text-[#222222]/75">

                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] mb-2 text-[#1F3A32]/70">
                      Primary Number
                    </p>

                    <p className="text-xl">
                      {siteConfig.contact.phonePrimary}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] mb-2 text-[#1F3A32]/70">
                      Secondary Number
                    </p>

                    <p className="text-xl">
                      {siteConfig.contact.phoneSecondary}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] mb-2 text-[#1F3A32]/70">
                      Email
                    </p>

                    <p className="text-xl break-all">
                      {siteConfig.contact.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] mb-2 text-[#1F3A32]/70">
                      Address
                    </p>

                    <p className="text-lg leading-relaxed">
                      {siteConfig.contact.address}
                    </p>
                  </div>

                </div>

              </div>

              <div className="bg-[#1F3A32] rounded-[2rem] p-10 text-white">

                <h2 className="text-3xl mb-8">
                  Why Travel With Us
                </h2>

                <div className="space-y-6 text-white/80 leading-relaxed">

                  <p>
                    Local Kashmir-based team with on-ground expertise.
                  </p>

                  <p>
                    Personalized itineraries instead of generic packages.
                  </p>

                  <p>
                    Transparent pricing and trusted travel partners.
                  </p>

                  <p>
                    End-to-end assistance throughout your journey.
                  </p>

                  <p>
                    Carefully curated stays, experiences, and routes.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </Container>

      </section>

    </main>
  );
}