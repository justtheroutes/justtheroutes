"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

import Container from "./container";

import Button from "../ui/button";

import { siteConfig } from "@/config/site";

import { useInquiryModal } from "@/hooks/use-inquiry-modal";

type Props = {
  light?: boolean;
};

export default function Navbar({
  light,
}: Props) {
  const inquiryModal = useInquiryModal();

  const [scrolled, setScrolled] =
    useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  const solidNavbar =
    light || scrolled;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        solidNavbar
          ? "bg-white/90 backdrop-blur-md border-b border-black/5"
          : "bg-transparent"
      }`}
    >

      <Container>

        <div className="flex items-center justify-between h-24">

          <Link
            href="/"
            className={`text-2xl transition ${
              solidNavbar
                ? "text-[#111111]"
                : "text-white"
            }`}
          >
            JustTheRoutes
          </Link>

          <nav className="hidden md:flex items-center gap-10">

            {siteConfig.navigation.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={`text-sm tracking-wide transition ${
                  solidNavbar
                    ? "text-[#222222]/70 hover:text-[#111111]"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {item.title}
              </Link>
            ))}

          </nav>

          <div className="flex items-center gap-4">

            <Link
              href="/login"
              className={`text-sm transition ${
                solidNavbar
                  ? "text-[#222222]/70 hover:text-[#111111]"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Login
            </Link>

            <Button
              onClick={inquiryModal.onOpen}
            >
              Plan Your Journey
            </Button>

          </div>

        </div>

      </Container>

    </header>
  );
}