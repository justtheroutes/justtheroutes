"use client";

import Link from "next/link";

export default function Topbar() {
  return (
    <div className="bg-[#16352D] text-white overflow-hidden border-b border-white/10 h-[40px] flex items-center">

      <div className="marquee whitespace-nowrap text-sm tracking-wide">

        <div className="marquee-content flex items-center gap-16">

          <Link
            href="tel:+918492939394"
            className="hover:text-[#C8A96B] transition"
          >
            Call Us: +91 8492939394
          </Link>

          <Link
            href="https://wa.me/918492939394"
            target="_blank"
            className="hover:text-[#C8A96B] transition"
          >
            WhatsApp Support
          </Link>

          <Link
            href="https://instagram.com/justtheroutes"
            target="_blank"
            className="hover:text-[#C8A96B] transition"
          >
            Instagram @justtheroutes
          </Link>

          <span>
            Luxury Kashmir Experiences
          </span>

          <span>
            Curated Houseboats & Stays
          </span>

          <span>
            Chauffeur Driven Cabs
          </span>

        </div>

      </div>

    </div>
  );
}