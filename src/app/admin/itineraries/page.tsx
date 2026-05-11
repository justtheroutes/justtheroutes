"use client";

import { useState } from "react";

import {
  useSearchParams,
} from "next/navigation";

import AdminNavbar from "@/components/dashboard/admin-navbar";

import Container from "@/components/layout/container";

import { supabaseClient } from "@/lib/supabase-client";

import { generateItinerary } from "@/lib/generate-itinerary";

import ItineraryPDF from "@/components/pdf/itinerary-pdf";

import QuotationBuilder from "@/components/quotations/quotation-builder";

import QuotationPDF from "@/components/pdf/quotation-pdf";

export default function AdminItinerariesPage() {

  const searchParams =
    useSearchParams();

  const inquiryId =
    searchParams.get("inquiry");

  const routeData =
    searchParams.get("route");

  const parsedRoute =
    routeData
      ? JSON.parse(routeData)
      : [];

  const [loading, setLoading] =
    useState(false);

  const [customerName, setCustomerName] =
    useState(
      searchParams.get("name") || ""
    );

  const [tripType, setTripType] =
    useState(
      searchParams.get("tripType") || ""
    );

  const [route, setRoute] =
    useState<any[]>(parsedRoute);

  const [generated, setGenerated] =
    useState<any>(null);

  const [quote, setQuote] =
    useState({
      hotel_cost: 0,
      transport_cost: 0,
      activities_cost: 0,
      markup: 0,
      gst: 0,
    });

  const buildDescription = (
    destination: string,
    overnight: boolean,
    style: string
  ) => {

    const descriptions: any = {

      Srinagar:
        overnight
          ? "Arrive in Srinagar and immerse yourself in Kashmir’s timeless charm with serene lake experiences, Mughal gardens, local cuisine, heritage walks, and a relaxing overnight stay surrounded by the beauty of the valley."
          : "Explore Srinagar’s iconic Mughal gardens, Dal Lake experiences, bustling local markets, and old city culture while soaking in the timeless beauty of Kashmir.",

      Gulmarg:
        overnight
          ? "Journey through scenic Himalayan landscapes toward Gulmarg, Kashmir’s iconic alpine retreat. Experience pine forests, breathtaking Gondola views, snow-covered meadows, and a peaceful overnight mountain stay."
          : "Discover Gulmarg’s stunning mountain scenery, Gondola rides, snow activities, and alpine beauty before returning for a relaxed evening.",

      Pahalgam:
        overnight
          ? "Travel through saffron fields and picturesque valleys into the heart of Pahalgam, where riverside landscapes, pine forests, and tranquil surroundings create a memorable overnight escape."
          : "Enjoy the scenic beauty of Pahalgam with riverside landscapes, lush valleys, local sightseeing, and peaceful Himalayan surroundings.",

      Sonmarg:
        overnight
          ? "Experience the dramatic beauty of Sonmarg with glacier views, mountain meadows, alpine scenery, and an unforgettable overnight stay amidst nature."
          : "Visit Sonmarg’s breathtaking meadows, mountain passes, glacier viewpoints, and scenic Himalayan landscapes.",
    };

    return (
      descriptions[destination] ||
      `Experience the beauty of ${destination} with curated sightseeing, local experiences, and comfortable travel arrangements by JustTheRoutes.`
    );
  };

  const buildActivities = (
    destination: string
  ) => {

    const activities: any = {

      Srinagar: [
        "Dal Lake Shikara Experience",
        "Mughal Garden Sightseeing",
        "Local Market Exploration",
      ],

      Gulmarg: [
        "Gulmarg Gondola Ride",
        "Snow & Meadow Experiences",
        "Scenic Himalayan Photography",
      ],

      Pahalgam: [
        "Betaab Valley Excursion",
        "Riverside Leisure Time",
        "Pine Forest Experiences",
      ],

      Sonmarg: [
        "Glacier View Excursion",
        "Mountain Meadow Exploration",
        "Scenic Valley Photography",
      ],
    };

    return (
      activities[destination] || [
        "Local Sightseeing",
        "Leisure Experiences",
      ]
    );
  };

const handleGenerate = () => {

  const totalDays =
    route.length;

  const days = route.map(
    (
      item,
      index
    ) => {

      const isFirst =
        index === 0;

      const isLast =
        index ===
        totalDays - 1;

      let title = "";
      let description = "";
      let activities: string[] =
        [];

      // DAY 1
      if (isFirst) {

        title =
          `Arrival in ${item.name}`;

        description =
          `Welcome to Kashmir. Upon arrival, begin your scenic journey into ${item.name}, where breathtaking landscapes, refreshing mountain air, and the warmth of Kashmiri hospitality create the perfect beginning to your holiday. Enjoy light local experiences and relaxed sightseeing depending on arrival time before settling into your stay.`;

        activities = [
          "Airport / Railway Station Pickup",
          "Relaxed Local Sightseeing",
          "Evening Leisure Experience",
        ];

      }

      // LAST DAY
      else if (isLast) {

        title =
          `Departure from ${item.name}`;

        description =
          `Enjoy a relaxed morning surrounded by the beauty of ${item.name} before beginning your return journey. Depending on departure timing, explore local experiences and scenic surroundings before transfer assistance to the airport or railway station for your onward journey with unforgettable Kashmir memories.`;

        activities = [
          "Breakfast & Checkout",
          "Optional Local Sightseeing",
          "Airport / Railway Transfer",
        ];

      }

      // MIDDLE DAYS
      else {

        title =
          item.overnight
            ? `${item.name} Overnight Experience`
            : `${item.name} Excursion`;

        description =
          buildDescription(
            item.name,
            item.overnight,
            tripType
          );

        activities =
          buildActivities(
            item.name
          );
      }

      return {

        day: index + 1,

        title,

        stay:
          item.name,

        description,

        activities,
      };
    }
  );

  setGenerated({

    customerName,

    tripType,

    title:
      `${customerName} Kashmir Journey`,

    days,
  });
};

  const updateDayField = (
    index: number,
    field: string,
    value: any
  ) => {

    const updated = {
      ...generated,
    };

    updated.days[index][field] =
      value;

    setGenerated(updated);
  };

  const updateActivity = (
    dayIndex: number,
    activityIndex: number,
    value: string
  ) => {

    const updated = {
      ...generated,
    };

    updated.days[dayIndex]
      .activities[
        activityIndex
      ] = value;

    setGenerated(updated);
  };

  const addActivity = (
    dayIndex: number
  ) => {

    const updated = {
      ...generated,
    };

    updated.days[dayIndex]
      .activities.push("");

    setGenerated(updated);
  };

  const removeActivity = (
    dayIndex: number,
    activityIndex: number
  ) => {

    const updated = {
      ...generated,
    };

    updated.days[dayIndex]
      .activities.splice(
        activityIndex,
        1
      );

    setGenerated(updated);
  };

  const addDay = () => {

    const updated = {
      ...generated,
    };

    updated.days.push({
      day:
        updated.days.length + 1,

      title:
        "New Journey Day",

      stay: "",

      description: "",

      activities: [],
    });

    setGenerated(updated);
  };

  const removeDay = (
    index: number
  ) => {

    const updated = {
      ...generated,
    };

    updated.days.splice(index, 1);

    updated.days =
      updated.days.map(
        (
          day: any,
          i: number
        ) => ({
          ...day,
          day: i + 1,
        })
      );

    setGenerated(updated);
  };

  const saveItinerary =
    async () => {

      if (!generated) {
        return;
      }

      try {

        setLoading(true);

        const { error } =
          await supabaseClient
            .from("itineraries")
            .insert({

              customer_name:
                customerName,

              total_days:
                generated.days.length,

              destinations:
                route.map(
                  (item) =>
                    item.name
                ),

              itinerary_data:
                generated,

              inquiry_id:
                inquiryId,
            });

        if (error) {

          alert(error.message);

          return;
        }

        alert(
          "Itinerary saved successfully."
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }
    };

  return (
    <main className="bg-[#F8F7F3] min-h-screen">

      <AdminNavbar />

      <section className="py-12">

        <Container>

          <div className="max-w-7xl mx-auto">

            <div className="mb-12">

                <div className="bg-white rounded-[2rem] p-8 luxury-shadow mb-10">

                <div className="flex flex-wrap gap-4">

                    <div className="px-5 py-3 rounded-full bg-[#1F3A32]/10 text-[#1F3A32]">
                    {customerName || "Guest"}
                    </div>

                    <div className="px-5 py-3 rounded-full bg-black/5 text-black/70">
                    {tripType || "Travel Journey"}
                    </div>

                    <div className="px-5 py-3 rounded-full bg-black/5 text-black/70">
                    {route.length} Stops
                    </div>

                </div>

                </div>

              <p className="uppercase tracking-[0.3em] text-sm text-[#1F3A32]/70 mb-4">
                Travel CRM
              </p>

              <h1 className="text-5xl text-[#222222]">
                Itinerary Workspace
              </h1>

            </div>

            <div className="grid lg:grid-cols-2 gap-10 mb-12">

              {/* LEFT */}
              <div className="bg-white rounded-[2rem] p-10 luxury-shadow">

                <div className="space-y-8">

                  <div>

                    <label className="block mb-3 text-sm text-black/60">
                      Customer Name
                    </label>

                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) =>
                        setCustomerName(
                          e.target.value
                        )
                      }
                      className="w-full border border-black/10 rounded-xl px-5 py-4 outline-none"
                    />

                  </div>

                  <div>

                    <label className="block mb-3 text-sm text-black/60">
                      Travel Style
                    </label>

                    <input
                      type="text"
                      value={tripType}
                      onChange={(e) =>
                        setTripType(
                          e.target.value
                        )
                      }
                      className="w-full border border-black/10 rounded-xl px-5 py-4 outline-none"
                    />

                  </div>

                  <div>

                    <label className="block mb-3 text-sm text-black/60">
                      Journey Route
                    </label>

                    <div className="space-y-4">

                      {route.map(
                        (
                          item,
                          index
                        ) => (

                          <div
                            key={index}
                            className="border border-black/10 rounded-2xl p-5 bg-[#F8F7F3]"
                          >

                            <div className="flex items-center justify-between gap-5">

                              <div>

                                <p className="text-sm text-black/50 mb-2">
                                  Day {index + 1}
                                </p>

                                <h3 className="text-2xl text-[#222222]">
                                  {item.name}
                                </h3>

                              </div>

                              <div
                                className={`px-4 py-2 rounded-full text-sm ${
                                  item.overnight
                                    ? "bg-[#1F3A32] text-white"
                                    : "bg-black/5 text-black/70"
                                }`}
                              >

                                {item.overnight
                                  ? "Overnight Stay"
                                  : "Day Visit"}

                              </div>

                            </div>

                          </div>
                        )
                      )}

                    </div>

                  </div>

                  <div className="flex gap-4 pt-4">

                    <button
                      onClick={handleGenerate}
                      className="bg-[#1F3A32] text-white px-8 py-4 rounded-full"
                    >
                      Generate Journey
                    </button>

                    <button
                      onClick={saveItinerary}
                      disabled={loading}
                      className="border border-black/10 px-8 py-4 rounded-full"
                    >
                      {loading
                        ? "Saving..."
                        : "Save"}
                    </button>

                  </div>

                </div>

              </div>

              {/* RIGHT */}
              <div className="bg-white rounded-[2rem] p-10 luxury-shadow">

                <div className="mb-8">

                  <p className="uppercase tracking-[0.3em] text-sm text-[#1F3A32]/70 mb-4">
                    Route Intelligence
                  </p>

                  <h2 className="text-4xl text-[#222222]">
                    Journey Overview
                  </h2>

                </div>

                <div className="space-y-6 text-black/70 leading-relaxed">

                  <p>
                    Your customer route and overnight flow now automatically powers itinerary generation.
                  </p>

                  <p>
                    The system uses selected destinations and overnight stays to create structured daily experiences instead of generic placeholder text.
                  </p>

                  <p>
                    Next phase will include:
                  </p>

                  <ul className="list-disc pl-6 space-y-3">
                    <li>Dynamic destination intelligence</li>
                    <li>Luxury & honeymoon narrative tones</li>
                    <li>Smart routing suggestions</li>
                    <li>Hotel integration</li>
                    <li>Quote automation</li>
                  </ul>

                </div>

              </div>

            </div>

            {generated && (

              <div className="space-y-8">

                <div className="bg-white rounded-[2rem] p-10 luxury-shadow">

                  <div className="mb-10">

                    <h2 className="text-4xl text-[#222222] mb-3">
                      Generated Journey
                    </h2>

                    <p className="text-black/55">
                      Edit, refine and personalise the itinerary before sending to customer.
                    </p>

                  </div>

                  <div className="space-y-8">

                    {generated.days.map(
                      (
                        day: any,
                        index: number
                      ) => (

                        <div
                          key={index}
                          className="border border-black/10 rounded-[2rem] p-8"
                        >

                          <div className="flex items-center justify-between mb-8">

                            <h3 className="text-3xl text-[#222222]">
                              Day {day.day}
                            </h3>

                            <button
                              onClick={() =>
                                removeDay(index)
                              }
                              className="text-red-500"
                            >
                              Delete Day
                            </button>

                          </div>

                          <div className="space-y-6">

                            <input
                              type="text"
                              value={day.title}
                              onChange={(e) =>
                                updateDayField(
                                  index,
                                  "title",
                                  e.target.value
                                )
                              }
                              className="w-full border border-black/10 rounded-xl px-5 py-4 outline-none text-2xl"
                            />

                            <textarea
                              rows={5}
                              value={day.description}
                              onChange={(e) =>
                                updateDayField(
                                  index,
                                  "description",
                                  e.target.value
                                )
                              }
                              className="w-full border border-black/10 rounded-xl px-5 py-4 outline-none resize-none"
                            />

                            <div className="space-y-4">

                              {day.activities.map(
                                (
                                  activity: string,
                                  activityIndex: number
                                ) => (

                                  <div
                                    key={activityIndex}
                                    className="flex gap-3"
                                  >

                                    <input
                                      type="text"
                                      value={activity}
                                      onChange={(e) =>
                                        updateActivity(
                                          index,
                                          activityIndex,
                                          e.target.value
                                        )
                                      }
                                      className="flex-1 border border-black/10 rounded-xl px-5 py-4 outline-none"
                                    />

                                    <button
                                      onClick={() =>
                                        removeActivity(
                                          index,
                                          activityIndex
                                        )
                                      }
                                      className="px-5 rounded-xl border border-red-200 text-red-500"
                                    >
                                      Remove
                                    </button>

                                  </div>
                                )
                              )}

                            </div>

                            <button
                              onClick={() =>
                                addActivity(index)
                              }
                              className="border border-black/10 px-5 py-3 rounded-full"
                            >
                              + Add Activity
                            </button>

                          </div>

                        </div>
                      )
                    )}

                  </div>

                  <div className="pt-10">

                    <button
                      onClick={addDay}
                      className="bg-[#1F3A32] text-white px-8 py-4 rounded-full"
                    >
                      Add Day
                    </button>

                    <div className="pt-10">

                      <QuotationBuilder
                        quote={quote}
                        setQuote={setQuote}
                      />

                    </div>

                    <div className="flex flex-wrap gap-4 pt-8">

                      <ItineraryPDF
                        itinerary={generated}
                      />

                      <QuotationPDF
                        itinerary={generated}
                        quote={quote}
                      />

                    </div>

                  </div>

                </div>

              </div>
            )}

          </div>

        </Container>

      </section>

    </main>
  );
}