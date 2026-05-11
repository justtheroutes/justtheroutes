"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "next/navigation";

import AdminNavbar from "@/components/dashboard/admin-navbar";

import Container from "@/components/layout/container";

import { supabaseClient } from "@/lib/supabase-client";

import ItineraryPDF from "@/components/pdf/itinerary-pdf";

import QuotationBuilder from "@/components/quotations/quotation-builder";

import QuotationPDF from "@/components/pdf/quotation-pdf";

export default function EditItineraryPage() {

  const params =
    useParams();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [itinerary, setItinerary] =
    useState<any>(null);

  const [quote, setQuote] =
    useState({
      hotel_cost: 0,
      transport_cost: 0,
      activities_cost: 0,
      markup: 0,
      gst: 0,
    });

  useEffect(() => {

    async function loadItinerary() {

      try {

        const { data } =
          await supabaseClient
            .from("itineraries")
            .select("*")
            .eq(
              "id",
              params.id
            )
            .single();

        if (data) {

          setItinerary(
            data.itinerary_data
          );

        }

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    }

    loadItinerary();

  }, [params.id]);

  const updateDayField = (
    index: number,
    field: string,
    value: any
  ) => {

    const updated =
      { ...itinerary };

    updated.days[index][field] =
      value;

    setItinerary(updated);
  };

  const saveChanges =
    async () => {

      try {

        setSaving(true);

        const { error } =
          await supabaseClient
            .from("itineraries")
            .update({
              itinerary_data:
                itinerary,
            })
            .eq(
              "id",
              params.id
            );

        if (error) {

          alert(error.message);

          return;

        }

        alert(
          "Changes saved."
        );

      } catch (error) {

        console.error(error);

      } finally {

        setSaving(false);

      }
    };

  if (loading) {

    return (
      <div className="p-10">
        Loading itinerary...
      </div>
    );
  }

  if (!itinerary) {

    return (
      <div className="p-10">
        Itinerary not found.
      </div>
    );
  }

  return (
    <main className="bg-[#F8F7F3] min-h-screen">

      <AdminNavbar />

      <section className="py-12">

        <Container>

          <div className="max-w-7xl mx-auto">

            <div className="flex items-center justify-between mb-12">

              <div>

                <p className="uppercase tracking-[0.3em] text-sm text-[#1F3A32]/70 mb-4">
                  Itinerary Workspace
                </p>

                <h1 className="text-5xl text-[#222222]">
                  {
                    itinerary.title
                  }
                </h1>

              </div>

              <button
                onClick={
                  saveChanges
                }
                disabled={saving}
                className="bg-[#1F3A32] text-white px-8 py-4 rounded-full"
              >
                {saving
                  ? "Saving..."
                  : "Save Changes"}
              </button>

            </div>

            <div className="grid lg:grid-cols-2 gap-10">

              {/* DAYS */}
              <div className="space-y-8">

                {itinerary.days.map(
                  (
                    day: any,
                    index: number
                  ) => (

                    <div
                      key={index}
                      className="bg-white rounded-[2rem] p-8 luxury-shadow"
                    >

                      <h2 className="text-3xl mb-8">
                        Day {day.day}
                      </h2>

                      <div className="space-y-6">

                        <input
                          type="text"
                          value={
                            day.title
                          }
                          onChange={(e) =>
                            updateDayField(
                              index,
                              "title",
                              e.target
                                .value
                            )
                          }
                          className="w-full border border-black/10 rounded-xl px-5 py-4 outline-none text-2xl"
                        />

                        <textarea
                          rows={5}
                          value={
                            day.description
                          }
                          onChange={(e) =>
                            updateDayField(
                              index,
                              "description",
                              e.target
                                .value
                            )
                          }
                          className="w-full border border-black/10 rounded-xl px-5 py-4 outline-none resize-none"
                        />

                      </div>

                    </div>
                  )
                )}

              </div>

              {/* RIGHT PANEL */}
              <div className="space-y-8 sticky top-28 h-fit">

                <QuotationBuilder
                  quote={quote}
                  setQuote={setQuote}
                />

                <div className="flex flex-wrap gap-4">

                  <ItineraryPDF
                    itinerary={
                      itinerary
                    }
                  />

                  <QuotationPDF
                    itinerary={
                      itinerary
                    }
                    quote={quote}
                  />

                </div>

              </div>

            </div>

          </div>

        </Container>

      </section>

    </main>
  );
}