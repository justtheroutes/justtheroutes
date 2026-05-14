import Link from "next/link";

import {
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

import Container from "./container";
import CloudinaryImage from "../ui/cloudinary-image";

export default function Footer() {

  return (

    <footer className="relative bg-[#0B1814] text-white overflow-hidden">

      {/* BACKGROUND GLOW */}

      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">

        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full border border-white" />

      </div>

      <Container>

        {/* MAIN FOOTER */}

        <div className="pt-20 pb-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr] gap-16">

          {/* BRAND */}

          <div>

            <div className="mb-6">

            <CloudinaryImage
            src="justtheroutes/hero/footer"
            alt="JustTheRoutes"
            width={150}
            height={150}
            className="w-auto h-auto object-contain mb-6 opacity-95"
          />

          </div>

            <p className="text-white/60 leading-loose mb-8">

              Curated Kashmir journeys, premium stays and deeply local travel experiences crafted with care.
            </p>

          </div>

          {/* EXPLORE */}

          <div className="lg:pl-10">

            <h3 className="text-lg uppercase tracking-[0.25em] text-white/40 mb-8">
              Explore
            </h3>

            <div className="space-y-5">

              <Link
                href="/destinations"
                className="block text-white/65 hover:text-white transition"
              >
                Destinations
              </Link>

              <Link
                href="/experiences"
                className="block text-white/65 hover:text-white transition"
              >
                Experiences
              </Link>

              <Link
                href="/stays"
                className="block text-white/65 hover:text-white transition"
              >
                Stays
              </Link>

              <Link
                href="/heritage-shop"
                className="block text-white/65 hover:text-white transition"
              >
                Heritage Shop
              </Link>

              <Link
                href="/journal"
                className="block text-white/65 hover:text-white transition"
              >
                Journal
              </Link>

            </div>

          </div>

          {/* DESTINATIONS */}

          <div>

            <h3 className="text-lg uppercase tracking-[0.25em] text-white/40 mb-8">
              Popular Destinations
            </h3>

            <div className="space-y-5">

              <Link
                href="/destinations/srinagar"
                className="block text-white/65 hover:text-white transition"
              >
                Srinagar
              </Link>

              <Link
                href="/destinations/gulmarg"
                className="block text-white/65 hover:text-white transition"
              >
                Gulmarg
              </Link>

              <Link
                href="/destinations/pahalgam"
                className="block text-white/65 hover:text-white transition"
              >
                Pahalgam
              </Link>

              <Link
                href="/destinations/sonmarg"
                className="block text-white/65 hover:text-white transition"
              >
                Sonmarg
              </Link>

            </div>

          </div>

          {/* CONTACT */}

          <div>

            <h3 className="text-lg uppercase tracking-[0.25em] text-white/40 mb-8">
              Contact
            </h3>

            <div className="space-y-5">

  <a
    href="tel:+918492939394"
    className="flex items-center gap-3 text-white/65 hover:text-white transition-all duration-300"
  >
    <span>
      +91 8492939394
    </span>
  </a>

  <a
    href="mailto:justtheroutes@gmail.com"
    className="flex items-center gap-3 text-white/65 hover:text-white transition-all duration-300"
  >
    <span>
      justtheroutes@gmail.com
    </span>
  </a>

  <a
    href="https://maps.google.com"
    target="_blank"
    className="block leading-loose text-white/65 hover:text-white transition-all duration-300"
  >
    Srinagar,
    Kashmir,
    India
  </a>

  <div className="flex flex-col gap-4 pt-3">

    <Link
      href="https://instagram.com/justtheroutes"
      target="_blank"
      className="flex items-center gap-3 text-white/65 hover:text-white transition-all duration-300"
    >

      <FaInstagram size={16} />

      <span>
        Instagram
      </span>

    </Link>

    <Link
      href="https://wa.me/918492939394"
      target="_blank"
      className="flex items-center gap-3 text-white/65 hover:text-white transition-all duration-300"
    >

      <FaWhatsapp size={16} />

      <span>
        WhatsApp
      </span>

    </Link>

  </div>

</div>
          </div>

        </div>

        {/* BOTTOM */}

        <div className="py-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-5 text-sm text-white/35">

          <p>
            © 2023 JustTheRoutes. All rights reserved.
          </p>

          <p>
            Built in Kashmir.
          </p>

          <Link
            href="/login"
            className="hover:text-white transition"
          >
            Partner Login
          </Link>

        </div>

      </Container>

    </footer>

  );
}