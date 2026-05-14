"use client";

import Link from "next/link";

import {
  Mail,
  Phone,
} from "lucide-react";

import {
  FaWhatsapp,
  FaInstagram,
} from "react-icons/fa";

import Container from "./container";

export default function Topbar() {

  return (

    <div className="bg-[#102821] text-white border-b border-white/10 h-[40px] hidden md:flex items-center">

      <Container>

        <div className="flex items-center justify-between text-[13px]">

          {/* LEFT */}

          <div className="flex items-center gap-6">

            <Link
              href="tel:+918492939394"
              className="flex items-center gap-2 text-white/70 hover:text-white transition-all duration-300"
            >

              <Phone size={13} />

              <span>
                +91 8492939394
              </span>

            </Link>

            <Link
              href="mailto:justtheroutes@gmail.com"
              className="flex items-center gap-2 text-white/70 hover:text-white transition-all duration-300"
            >

              <Mail size={13} />

              <span>
                justtheroutes@gmail.com
              </span>

            </Link>

          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-5">

            <Link
              href="https://instagram.com/justtheroutes"
              target="_blank"
              className="text-white/65 hover:text-white hover:-translate-y-[1px] transition-all duration-300"
            >

              <FaInstagram size={16} />

            </Link>

            <Link
              href="https://wa.me/918492939394"
              target="_blank"
              className="text-white/65 hover:text-white hover:-translate-y-[1px] transition-all duration-300"
            >

              <FaWhatsapp size={16} />

            </Link>

          </div>

        </div>

      </Container>

    </div>

  );
}