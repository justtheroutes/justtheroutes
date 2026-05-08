"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useRef } from "react";

type Props = {
  children: React.ReactNode;
};

export default function HorizontalScroll({
  children,
}: Props) {
  const scrollRef =
    useRef<HTMLDivElement>(null);

  const scroll = (
    direction: "left" | "right"
  ) => {
    if (!scrollRef.current) {
      return;
    }

    const amount = 400;

    scrollRef.current.scrollBy({
      left:
        direction === "left"
          ? -amount
          : amount,

      behavior: "smooth",
    });
  };

  return (
    <div className="relative">

      {/* LEFT BUTTON */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center hover:scale-105 transition"
      >
        <ChevronLeft size={20} />
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center hover:scale-105 transition"
      >
        <ChevronRight size={20} />
      </button>

      {/* SCROLL AREA */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-6 md:px-10 pb-4"
      >
        {children}
      </div>

    </div>
  );
}