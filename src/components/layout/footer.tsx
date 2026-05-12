import Link from "next/link";

import Container from "./container";

import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white pt-20 pb-10">

      <Container>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-white/10">

          <div className="md:col-span-2">

            <h2 className="text-4xl mb-6">
              JustTheRoutes
            </h2>

            <p className="text-white/70 leading-relaxed max-w-md">
              Curated journeys through Kashmir designed with care,
              local expertise, and meaningful travel experiences.
            </p>

          </div>

          <div>

            <h3 className="text-lg mb-6">
              Navigation
            </h3>

            <div className="space-y-4">

              {siteConfig.navigation.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="block text-white/70 hover:text-white transition"
                >
                  {item.title}
                </Link>
              ))}

            </div>

          </div>

          <div>

            <h3 className="text-lg mb-6">
              Contact
            </h3>

            <div className="space-y-4 text-white/70">

              <p>
                {siteConfig.contact.phonePrimary}
              </p>

              <p>
                {siteConfig.contact.email}
              </p>

              <p className="leading-relaxed">
                {siteConfig.contact.address}
              </p>

            </div>

          </div>

        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">

          <p>
            © 2026 JustTheRoutes. All rights reserved.
          </p>

          <p>
            Built in Kashmir.
          </p>

          <Link
            href="/login"
            className="text-sm text-white/40 hover:text-white transition"
            >
            Partner Login
            </Link>

        </div>

      </Container>

    </footer>
  );
}