"use client";

import Link from "next/link";

import {
  Menu,
  X,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

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
  const inquiryModal =
    useInquiryModal();

  const [scrolled, setScrolled] =
    useState(false);

  const [menuOpen, setMenuOpen] =
    useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(
        window.scrollY > 40
      );
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
    light ||
    scrolled ||
    menuOpen;

  return (
    <header
      className={`fixed left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "top-0"
          : "top-[40px]"
      } ${
        solidNavbar
          ? "bg-white/90 backdrop-blur-xl border-b border-black/5"
          : "bg-transparent"
      }`}
    >

      <Container>

        <div className="flex items-center justify-between h-24">

          <Link
            href="/"
            className={`transition ${
              solidNavbar
                ? "text-[#111111]"
                : "text-white"
            }`}
          >

            <div className="leading-none">

              <div className="text-[28px] font-medium tracking-tight">
                JustTheRoutes
              </div>

              <div className="text-[10px] tracking-[0.35em] mt-2 opacity-60 uppercase">
                Kashmir
              </div>

            </div>

          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">

            {siteConfig.navigation.map(
              (item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`text-[15px] tracking-wide transition duration-300 hover:opacity-60 whitespace-nowrap ${
                    solidNavbar
                      ? "text-[#222222]/75 hover:text-[#111111]"
                      : "text-white/85 hover:text-white"
                  }`}
                >
                  {item.title}
                </Link>
              )
            )}

          </nav>

          {/* DESKTOP CTA */}
          <div className="hidden lg:flex items-center gap-5">

            <Button
              onClick={
                inquiryModal.onOpen
              }
            >
              Plan Your Journey
            </Button>

          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() =>
              setMenuOpen(
                !menuOpen
              )
            }
            className={`lg:hidden transition ${
              solidNavbar
                ? "text-[#111111]"
                : "text-white"
            }`}
          >

            {menuOpen ? (
              <X size={30} />
            ) : (
              <Menu size={30} />
            )}

          </button>

        </div>

      </Container>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="lg:hidden bg-[#F8F7F3]/98 backdrop-blur-2xl border-t border-black/5 min-h-screen">

          <Container>

            <div className="flex flex-col py-8">

              {siteConfig.navigation.map(
                (item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={() =>
                      setMenuOpen(
                        false
                      )
                    }
                    className="py-6 text-3xl tracking-tight text-[#1F3A32] border-b border-black/5"
                  >
                    {item.title}
                  </Link>
                )
              )}

    

              <div className="pt-8">

                <Button
                  size="lg"
                  className="w-full text-lg py-6"
                  onClick={() => {
                    inquiryModal.onOpen();

                    setMenuOpen(
                      false
                    );
                  }}
                >
                  Plan Your Journey
                </Button>

              </div>

            </div>

          </Container>

        </div>
      )}

    </header>
  );
}