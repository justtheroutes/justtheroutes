"use client";

import { useState } from "react";

import {
  ChevronDown,
} from "lucide-react";

type FAQ = {
  question: string;
  answer: string;
};

type Props = {
  faqs: FAQ[];
};

export default function FAQSection({
  faqs,
}: Props) {

  const [
    openItems,
    setOpenItems,
  ] = useState<number[]>(
    []
  );

  const toggleItem = (
    index: number
  ) => {

    setOpenItems(
      (prev) =>

        prev.includes(index)
          ? prev.filter(
              (item) =>
                item !== index
            )
          : [
              ...prev,
              index,
            ]
    );

  };

  if (!faqs?.length) {
    return null;
  }

  return (

    <section className="py-24 bg-[#F8F7F3] border-t border-black/5">

      <div className="max-w-5xl mx-auto px-6">

        <div className="mb-14">

          <div className="mb-5">

            <span className="inline-flex items-center rounded-full bg-[#1F3A32]/10 text-[#1F3A32] px-5 py-2 text-sm tracking-[0.25em] uppercase font-semibold">

                FAQ • Frequently Asked Questions

            </span>

            </div>

            <h2 className="text-6xl md:text-7xl font-semibold leading-[0.95] text-[#222222] max-w-4xl">
            Everything You Need
            <br />
            Before You Travel
            </h2>

        </div>

        <div className="space-y-5">

          {faqs.map(
            (
              item,
              index
            ) => {

              const isOpen =
                openItems.includes(
                  index
                );

              return (

                <div
                  key={index}
                  className="bg-white rounded-[2rem] luxury-shadow overflow-hidden"
                >

                  <button
                    onClick={() =>
                      toggleItem(
                        index
                      )
                    }
                    className="w-full flex items-center justify-between gap-6 text-left p-8"
                  >

                    <h3 className="text-2xl text-[#222222] leading-snug">
                      {item.question}
                    </h3>

                    <ChevronDown
                      className={`min-w-5 transition-transform duration-300 ${
                        isOpen
                          ? "rotate-180"
                          : ""
                      }`}
                    />

                  </button>

                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >

                    <div className="px-8 pb-8">

                      <p className="text-lg text-[#222222]/70 leading-loose">
                        {item.answer}
                      </p>

                    </div>

                  </div>

                </div>

              );
            }
          )}

        </div>

      </div>

    </section>
  );
}   