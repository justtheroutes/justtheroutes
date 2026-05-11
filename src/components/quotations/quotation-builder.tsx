"use client";

import { useMemo } from "react";

type Props = {
  quote: any;

  setQuote: any;
};

export default function QuotationBuilder({
  quote,
  setQuote,
}: Props) {

  const total =
    useMemo(() => {

      const hotel =
        Number(
          quote.hotel_cost || 0
        );

      const transport =
        Number(
          quote.transport_cost || 0
        );

      const activities =
        Number(
          quote.activities_cost || 0
        );

      const markup =
        Number(
          quote.markup || 0
        );

      const gst =
        Number(
          quote.gst || 0
        );

      return (
        hotel +
        transport +
        activities +
        markup +
        gst
      );

    }, [quote]);

  return (
    <div className="bg-white rounded-[2rem] p-8 luxury-shadow">

      <div className="mb-8">

        <h2 className="text-3xl text-[#222222] mb-3">
          Quotation Builder
        </h2>

        <p className="text-[#222222]/60">
          Build customer quotation and pricing breakdown.
        </p>

      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <div>

          <label className="block mb-3 text-sm">
            Hotel Cost
          </label>

          <input
            type="number"
            value={
              quote.hotel_cost
            }
            onChange={(e) =>
              setQuote({
                ...quote,
                hotel_cost:
                  e.target.value,
              })
            }
            className="w-full border border-black/10 rounded-xl px-5 py-4 outline-none"
          />

        </div>

        <div>

          <label className="block mb-3 text-sm">
            Transport Cost
          </label>

          <input
            type="number"
            value={
              quote.transport_cost
            }
            onChange={(e) =>
              setQuote({
                ...quote,
                transport_cost:
                  e.target.value,
              })
            }
            className="w-full border border-black/10 rounded-xl px-5 py-4 outline-none"
          />

        </div>

        <div>

          <label className="block mb-3 text-sm">
            Activities Cost
          </label>

          <input
            type="number"
            value={
              quote.activities_cost
            }
            onChange={(e) =>
              setQuote({
                ...quote,
                activities_cost:
                  e.target.value,
              })
            }
            className="w-full border border-black/10 rounded-xl px-5 py-4 outline-none"
          />

        </div>

        <div>

          <label className="block mb-3 text-sm">
            Markup
          </label>

          <input
            type="number"
            value={
              quote.markup
            }
            onChange={(e) =>
              setQuote({
                ...quote,
                markup:
                  e.target.value,
              })
            }
            className="w-full border border-black/10 rounded-xl px-5 py-4 outline-none"
          />

        </div>

        <div>

          <label className="block mb-3 text-sm">
            GST
          </label>

          <input
            type="number"
            value={quote.gst}
            onChange={(e) =>
              setQuote({
                ...quote,
                gst:
                  e.target.value,
              })
            }
            className="w-full border border-black/10 rounded-xl px-5 py-4 outline-none"
          />

        </div>

      </div>

      <div className="mt-10 border-t border-black/5 pt-8">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm uppercase tracking-[0.25em] text-[#1F3A32]/60 mb-3">
              Total Investment
            </p>

            <h3 className="text-5xl text-[#1F3A32]">
              ₹
              {total.toLocaleString()}
            </h3>

          </div>

        </div>

      </div>

    </div>
  );
}