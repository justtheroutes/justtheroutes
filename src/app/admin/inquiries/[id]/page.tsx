"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Link from "next/link";

import {
  useParams,
} from "next/navigation";

import {
  Check,
  ChevronRight,
  MapPinned,
  Users,
  CalendarDays,
  Car,
  Wallet,
  BedDouble,
} from "lucide-react";

import AdminNavbar from "@/components/dashboard/admin-navbar";

import Container from "@/components/layout/container";

import { supabaseClient } from "@/lib/supabase-client";

import {
  generateDayNarrative,
} from "@/lib/itinerary-brain";

import ItineraryPDF from "@/components/pdf/itinerary-pdf";

import QuotationPDF from "@/components/pdf/quotation-pdf";


const indianStates = [
  "Jammu & Kashmir",
  "Ladakh",
  "Delhi",
  "Maharashtra",
  "Karnataka",
  "Tamil Nadu",
  "Kerala",
  "Punjab",
  "Haryana",
  "Rajasthan",
  "Gujarat",
  "West Bengal",
  "Uttar Pradesh",
  "Madhya Pradesh",
  "Bihar",
  "Assam",
  "Odisha",
  "Telangana",
  "Andhra Pradesh",
  "Other",
];

const destinationOptions = [
  "Srinagar",
  "Gulmarg",
  "Pahalgam",
  "Sonmarg",
  "Doodhpathri",
  "Yusmarg",
];

const stages = [
  {
    id: "discovery",
    title: "Customer Discovery",
  },

  {
    id: "journey",
    title: "Journey Builder",
  },

  {
    id: "itinerary",
    title: "AI Itinerary",
  },

  {
    id: "quotation",
    title: "Quotation",
  },

  {
    id: "export",
    title: "Export",
  },
];

export default function InquiryDetailPage() {

  const params = useParams();

  const [
  selectedDestinations,
  setSelectedDestinations,
] = useState<any[]>([
  {
    day: 1,
    explore: "",
    stay: "",
    overnight: true,
    transfer_timing:
      "morning",
      houseboat: false,
    notes: "",
  },
]);

const [
  generatedItinerary,
  setGeneratedItinerary,
] = useState<any[]>([]);

const [
  quoteData,
  setQuoteData,
] = useState<any[]>([]);

const [
  globalQuote,
  setGlobalQuote,
] = useState({

  transport_cost: 0,

  markup: 0,

  gst: 0,
});

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [activeStage, setActiveStage] =
    useState("discovery");

  const [inquiry, setInquiry] =
    useState<any>(null);

  const [itineraries, setItineraries] =
    useState<any[]>([]);

 

  useEffect(() => {

    async function loadData() {

      try {

        const { data } =
          await supabaseClient
            .from("inquiries")
            .select("*")
            .eq("id", params.id)
            .single();

        setInquiry(data);

        if (
          data?.selected_route
        ) {
          setSelectedDestinations(
            data.selected_route
          );
        }

        const {
          data: itineraryData,
        } =
          await supabaseClient
            .from("itineraries")
            .select("*")
            .eq(
              "inquiry_id",
              params.id
            )
            .order(
              "created_at",
              {
                ascending: false,
              }
            );

        setItineraries(
          itineraryData || []
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    }

    loadData();

  }, [params.id]);

  useEffect(() => {

    if (!inquiry?.id) {
      return;
    }

    const timeout =
      setTimeout(async () => {

        await supabaseClient
          .from("inquiries")
          .update({
            ...inquiry,
            selected_route:
              selectedDestinations,
          })
          .eq(
            "id",
            inquiry.id
          );

      }, 1200);

    return () =>
      clearTimeout(timeout);

  }, [
    inquiry,
    selectedDestinations,
  ]);

  useEffect(() => {

  const generated =
    selectedDestinations.map(
      (
        day,
        index
      ) => {

        return {

            ...day,

            activities: [

                `Arrival and experiences in ${day.explore}`,

                `Local sightseeing around ${day.explore}`,

                day.houseboat
                ? "Complimentary Shikara Ride"
                : "Curated leisure experiences",

            ],

            narrative:
                generateDayNarrative(
                day,
                selectedDestinations[
                    index - 1
                ],
                selectedDestinations[
                    index + 1
                ],
                inquiry?.travel_style
                ),
            };
      }
    );

  setGeneratedItinerary(
    generated
  );

}, [
  selectedDestinations,
  inquiry?.travel_style,
]);

useEffect(() => {

  if (
    generatedItinerary.length === 0
  ) {
    return;
  }

  const initialRows =
    generatedItinerary.map(
      () => ({

        hotel_cost: 0,

        activities_cost: 0,

        complimentary: true,
      })
    );

  setQuoteData(
    initialRows
  );

}, [generatedItinerary]);


  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {

    const {
      name,
      value,
    } = e.target;

    setInquiry(
      (prev: any) => ({
        ...prev,
        [name]: value,
      })
    );
  };

  const saveInquiry =
    async () => {

      try {

        setSaving(true);

        const { error } =
          await supabaseClient
            .from("inquiries")
            .update({
              ...inquiry,
              selected_route:
                selectedDestinations,
            })
            .eq(
              "id",
              inquiry.id
            );

        if (error) {
          alert(error.message);

          return;
        }

        alert(
          "Customer workspace saved."
        );

      } catch (error) {

        console.error(error);

      } finally {

        setSaving(false);

      }
    };

  const addDay = () => {

    setSelectedDestinations(
      (prev) => [
        ...prev,
        {
        day:
            prev.length + 1,
        explore: "",
        stay: "",
        overnight: true,
        transfer_timing:
            "morning",
            houseboat: false,
        notes: "",
        },
      ]
    );
  };

  const removeDay = (
    index: number
  ) => {

    const updated =
      selectedDestinations
        .filter(
          (
            _: any,
            i: number
          ) => i !== index
        )
        .map(
          (
            item: any,
            i: number
          ) => ({
            ...item,
            day: i + 1,
          })
        );

    setSelectedDestinations(
      updated
    );
  };

  const updateJourneyField = (
    index: number,
    field: string,
    value: any
  ) => {

    const updated = [
      ...selectedDestinations,
    ];

    updated[index][field] =
      value;

    setSelectedDestinations(
      updated
    );
  };

  const completedDiscovery =
  useMemo(() => {

    if (!inquiry) {
      return false;
    }

    return Boolean(
      inquiry.name &&
      inquiry.whatsapp &&
      inquiry.trip_duration &&
      inquiry.travel_style
    );

  }, [inquiry]);

  

  if (loading) {

    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  if (!inquiry) {

    return (
      <div className="p-10">
        Inquiry not found.
      </div>
    );
  }

  return (
    <main className="bg-[#F8F7F3] min-h-screen">

      <AdminNavbar />

      <section className="py-10">

        <Container>

          <div className="grid grid-cols-12 gap-8">

            {/* LEFT SIDEBAR */}
            <div className="col-span-12 lg:col-span-2">

              <div className="sticky top-28 bg-white rounded-[2rem] p-6 luxury-shadow">

                <div className="mb-10">

                  <p className="uppercase tracking-[0.3em] text-xs text-[#1F3A32]/60 mb-3">
                    Travel CRM
                  </p>

                  <h2 className="text-3xl leading-tight text-[#222222]">
                    Customer
                    Workspace
                  </h2>

                </div>

                <div className="space-y-3">

                  {stages.map(
                    (stage) => {

                      const active =
                        activeStage ===
                        stage.id;

                      const completed =
                        stage.id ===
                          "discovery" &&
                        completedDiscovery;

                      return (
                        <button
                          key={
                            stage.id
                          }
                          onClick={() =>
                            setActiveStage(
                              stage.id
                            )
                          }
                          className={`w-full rounded-2xl px-5 py-5 transition text-left ${
                            active
                              ? "bg-[#1F3A32] text-white"
                              : "bg-[#F8F7F3] hover:bg-black/5 text-black/70"
                          }`}
                        >

                          <div className="flex items-center justify-between gap-3">

                            <span>
                              {
                                stage.title
                              }
                            </span>

                            {completed ? (
                              <Check
                                size={
                                  18
                                }
                              />
                            ) : (
                              <ChevronRight
                                size={
                                  18
                                }
                              />
                            )}

                          </div>

                        </button>
                      );
                    }
                  )}

                </div>

                <div className="pt-10">

                  <button
                    onClick={
                      saveInquiry
                    }
                    disabled={
                      saving
                    }
                    className="w-full bg-black text-white rounded-full py-4"
                  >
                    {saving
                      ? "Saving..."
                      : "Save Workspace"}
                  </button>

                </div>

              </div>

            </div>

            {/* CENTER */}
            <div className="col-span-12 lg:col-span-7">

              {/* DISCOVERY */}
              {activeStage ===
                "discovery" && (

                <div className="bg-white rounded-[2rem] p-10 luxury-shadow">

                  <div className="mb-10">

                    <p className="uppercase tracking-[0.3em] text-sm text-[#1F3A32]/70 mb-4">
                      Customer Discovery
                    </p>

                    <h1 className="text-5xl text-[#222222] leading-tight">
                      Build Travel
                      Understanding
                    </h1>

                  </div>

                  <div className="grid md:grid-cols-2 gap-6">

                    {/* NAME */}
                    <div>

                      <label className="block mb-3 text-sm text-black/60">
                        Customer Name
                      </label>

                      <input
                        type="text"
                        name="name"
                        value={
                          inquiry.name ||
                          ""
                        }
                        onChange={
                          handleChange
                        }
                        className="w-full border border-black/10 rounded-xl px-5 py-4 outline-none"
                      />

                    </div>

                    {/* WHATSAPP */}
                    <div>

                      <label className="block mb-3 text-sm text-black/60">
                        WhatsApp
                      </label>

                      <input
                        type="text"
                        name="whatsapp"
                        value={
                          inquiry.whatsapp ||
                          ""
                        }
                        onChange={
                          handleChange
                        }
                        className="w-full border border-black/10 rounded-xl px-5 py-4 outline-none"
                      />

                    </div>

                    {/* EMAIL */}
                    <div>

                      <label className="block mb-3 text-sm text-black/60">
                        Email (Optional)
                      </label>

                      <input
                        type="email"
                        name="email"
                        value={
                          inquiry.email ||
                          ""
                        }
                        onChange={
                          handleChange
                        }
                        className="w-full border border-black/10 rounded-xl px-5 py-4 outline-none"
                      />

                    </div>

                    {/* TRAVEL STYLE */}
                    <div>

                      <label className="block mb-3 text-sm text-black/60">
                        Travel Style
                      </label>

                      <select
                        name="travel_style"
                        value={
                          inquiry.travel_style ||
                          ""
                        }
                        onChange={
                          handleChange
                        }
                        className="w-full border border-black/10 rounded-xl px-5 py-4 bg-white outline-none"
                      >

                        <option value="">
                          Select
                        </option>

                        <option>
                          Honeymoon
                        </option>

                        <option>
                          Family
                        </option>

                        <option>
                          Luxury
                        </option>

                        <option>
                          Adventure
                        </option>

                        <option>
                          Leisure
                        </option>

                        <option>
                          Friends
                        </option>

                      </select>

                    </div>

                    {/* ARRIVAL */}
                    <div>

                      <label className="block mb-3 text-sm text-black/60">
                        Arrival Mode
                      </label>

                      <select
                        name="arrival_mode"
                        value={
                          inquiry.arrival_mode ||
                          ""
                        }
                        onChange={
                          handleChange
                        }
                        className="w-full border border-black/10 rounded-xl px-5 py-4 bg-white outline-none"
                      >

                        <option value="">
                          Select
                        </option>

                        <option>
                          Flight
                        </option>

                        <option>
                          Train
                        </option>

                        <option>
                          Road Trip
                        </option>

                      </select>

                    </div>

                    {/* STATE */}
                    <div>

                      <label className="block mb-3 text-sm text-black/60">
                        Travelling From
                      </label>

                      <select
                        name="travelling_from"
                        value={
                          inquiry.travelling_from ||
                          ""
                        }
                        onChange={
                          handleChange
                        }
                        className="w-full border border-black/10 rounded-xl px-5 py-4 bg-white outline-none"
                      >

                        <option value="">
                          Select State
                        </option>

                        {indianStates.map(
                          (
                            state
                          ) => (
                            <option
                              key={
                                state
                              }
                            >
                              {state}
                            </option>
                          )
                        )}

                      </select>

                    </div>

                    {/* DATES */}
                    <div>

                      <label className="block mb-3 text-sm text-black/60">
                        Travel Start Date
                      </label>

                      <input
                        type="date"
                        name="travel_start_date"
                        value={
                          inquiry.travel_start_date ||
                          ""
                        }
                        onChange={
                          handleChange
                        }
                        className="w-full border border-black/10 rounded-xl px-5 py-4 outline-none"
                      />

                    </div>

                    {/* DURATION */}
                    <div>

                      <label className="block mb-3 text-sm text-black/60">
                        Trip Duration
                      </label>

                      <select
                        name="trip_duration"
                        value={
                          inquiry.trip_duration ||
                          ""
                        }
                        onChange={
                          handleChange
                        }
                        className="w-full border border-black/10 rounded-xl px-5 py-4 bg-white outline-none"
                      >

                        <option value="">
                          Select
                        </option>

                        <option>
                          3D / 2N
                        </option>

                        <option>
                          4D / 3N
                        </option>

                        <option>
                          5D / 4N
                        </option>

                        <option>
                          6D / 5N
                        </option>

                        <option>
                          7D / 6N
                        </option>

                        <option>
                          8D / 7N
                        </option>

                        <option>
                          Custom
                        </option>

                      </select>

                        {inquiry.trip_duration ===
                        "Custom" && (

                        <input
                            type="text"
                            name="custom_trip_duration"
                            placeholder="Example: 11D / 10N"
                            value={
                            inquiry.custom_trip_duration ||
                            ""
                            }
                            onChange={handleChange}
                            className="mt-3 w-full border border-black/10 rounded-xl px-5 py-4 outline-none"
                        />

                        )}

                        </div>

                    {/* ADULTS */}
                    <div>

                      <label className="block mb-3 text-sm text-black/60">
                        Adults
                      </label>

                      <select
                        name="adults"
                        value={
                          inquiry.adults ||
                          ""
                        }
                        onChange={
                          handleChange
                        }
                        className="w-full border border-black/10 rounded-xl px-5 py-4 bg-white outline-none"
                      >

                        <option value="">
                          Select
                        </option>

                        {[
                          ...Array(
                            10
                          ),
                        ].map(
                          (
                            _,
                            i
                          ) => (
                            <option
                              key={
                                i
                              }
                            >
                              {i + 1}
                            </option>
                          )
                        )}

                        <option>
                          Custom
                        </option>

                      </select>

                        {inquiry.adults ===
                        "Custom" && (

                        <input
                            type="number"
                            name="custom_adults"
                            placeholder="Enter adults"
                            value={
                            inquiry.custom_adults ||
                            ""
                            }
                            onChange={handleChange}
                            className="mt-3 w-full border border-black/10 rounded-xl px-5 py-4 outline-none"
                        />

                        )}

                        </div>

                    {/* CHILDREN */}
                    <div>

                      <label className="block mb-3 text-sm text-black/60">
                        Children
                      </label>

                      <select
                        name="children"
                        value={
                          inquiry.children ||
                          ""
                        }
                        onChange={
                          handleChange
                        }
                        className="w-full border border-black/10 rounded-xl px-5 py-4 bg-white outline-none"
                      >

                        <option value="">
                          Select
                        </option>

                        {[
                          ...Array(
                            10
                          ),
                        ].map(
                          (
                            _,
                            i
                          ) => (
                            <option
                              key={
                                i
                              }
                            >
                              {i}
                            </option>
                          )
                        )}

                        <option>
                          Custom
                        </option>

                      </select>

                        {inquiry.children ===
                        "Custom" && (

                        <input
                            type="number"
                            name="custom_children"
                            placeholder="Enter children"
                            value={
                            inquiry.custom_children ||
                            ""
                            }
                            onChange={handleChange}
                            className="mt-3 w-full border border-black/10 rounded-xl px-5 py-4 outline-none"
                        />

                        )}

                        </div>

                    {/* CAB */}
                    <div>

                      <label className="block mb-3 text-sm text-black/60">
                        Cab Preference
                      </label>

                      <select
                        name="cab_preference"
                        value={
                          inquiry.cab_preference ||
                          ""
                        }
                        onChange={
                          handleChange
                        }
                        className="w-full border border-black/10 rounded-xl px-5 py-4 bg-white outline-none"
                      >

                        <option value="">
                          Select
                        </option>

                        <option>
                          Sedan
                          (Dzire /
                          Etios /
                          Similar)
                        </option>

                        <option>
                          MUV
                          (Innova /
                          Crysta /
                          Similar)
                        </option>

                        <option>
                          Tempo
                          Traveller
                        </option>

                        <option>
                          Urbania
                        </option>

                      </select>

                    </div>

                    {/* HOTEL */}
                    <div>

                      <label className="block mb-3 text-sm text-black/60">
                        Hotel Category
                      </label>

                      <select
                        name="hotel_category"
                        value={
                          inquiry.hotel_category ||
                          ""
                        }
                        onChange={
                          handleChange
                        }
                        className="w-full border border-black/10 rounded-xl px-5 py-4 bg-white outline-none"
                      >

                        <option value="">
                          Select
                        </option>

                        <option>
                          Budget
                        </option>

                        <option>
                          Deluxe
                        </option>

                        <option>
                          Premium
                        </option>

                        <option>
                          Luxury
                        </option>

                      </select>

                    </div>

                    {/* BUDGET */}
                    <div>

                    <label className="block mb-3 text-sm text-black/60">
                        Budget Category
                    </label>

                    <select
                        name="budget_category"
                        value={
                        inquiry.budget_category ||
                        ""
                        }
                        onChange={handleChange}
                        className="w-full border border-black/10 rounded-xl px-5 py-4 bg-white outline-none"
                    >

                        <option value="">
                        Select Budget
                        </option>

                        <option>
                        Budget
                        </option>

                        <option>
                        Deluxe
                        </option>

                        <option>
                        Premium
                        </option>

                        <option>
                        Luxury
                        </option>

                        <option>
                        Ultra Luxury
                        </option>

                        <option>
                        Custom
                        </option>

                    </select>

                    </div>
                  </div>

                  {/* NOTES */}
                  <div className="pt-8">

                    <label className="block mb-3 text-sm text-black/60">
                      Planning Notes
                    </label>

                    <textarea
                      name="planning_notes"
                      value={
                        inquiry.planning_notes ||
                        ""
                      }
                      onChange={
                        handleChange
                      }
                      rows={6}
                      placeholder="Honeymoon decor, elderly travellers, food preferences, celebrations, accessibility etc."
                      className="w-full border border-black/10 rounded-xl px-5 py-4 outline-none resize-none"
                    />

                  </div>

                  <div className="pt-10 flex justify-end">

                    <button
                      onClick={() =>
                        setActiveStage(
                          "journey"
                        )
                      }
                      className="bg-[#1F3A32] text-white px-8 py-4 rounded-full"
                    >
                      Continue to
                      Journey →
                    </button>

                  </div>

                </div>
              )}

              {/* JOURNEY */}
              {activeStage ===
                "journey" && (

                <div className="bg-white rounded-[2rem] p-10 luxury-shadow">

                  <div className="flex flex-wrap items-center justify-between gap-6 mb-10">

                    <div>

                      <p className="uppercase tracking-[0.3em] text-sm text-[#1F3A32]/70 mb-4">
                        Journey Builder
                      </p>

                      <h2 className="text-5xl text-[#222222]">
                        Design Route
                      </h2>

                    </div>

                    <button
                      onClick={addDay}
                      className="bg-[#1F3A32] text-white px-8 py-4 rounded-full"
                    >
                      + Add Day
                    </button>

                  </div>

                  <div className="space-y-8">

                    {selectedDestinations.map(
                      (
                        day,
                        index
                      ) => (

                        <div
                          key={
                            index
                          }
                          className="border border-black/5 rounded-[2rem] p-8"
                        >

                          <div className="flex items-center justify-between gap-6 mb-8">

                            <div>

                              <p className="uppercase tracking-[0.3em] text-xs text-[#1F3A32]/60 mb-3">
                                Journey Day
                              </p>

                              <h3 className="text-3xl text-[#222222]">
                                Day{" "}
                                {
                                  day.day
                                }
                              </h3>

                            </div>

                            {selectedDestinations.length >
                              1 && (

                              <button
                                onClick={() =>
                                  removeDay(
                                    index
                                  )
                                }
                                className="text-red-500"
                              >
                                Remove
                              </button>
                            )}

                          </div>

                          <div className="grid md:grid-cols-2 gap-6">

                            {/* EXPLORE */}
                            <div>

                              <label className="block mb-3 text-sm text-black/60">
                                Explore Destination
                              </label>

                              <select
                                value={
                                  day.explore
                                }
                                onChange={(
                                  e
                                ) =>
                                  updateJourneyField(
                                    index,
                                    "explore",
                                    e
                                      .target
                                      .value
                                  )
                                }
                                className="w-full border border-black/10 rounded-xl px-5 py-4 bg-white outline-none"
                              >

                                <option value="">
                                  Select
                                </option>

                                {destinationOptions.map(
                                  (
                                    destination
                                  ) => (
                                    <option
                                      key={
                                        destination
                                      }
                                    >
                                      {
                                        destination
                                      }
                                    </option>
                                  )
                                )}

                              </select>

                            </div>

                            {/* STAY */}
                            <div>

                              <label className="block mb-3 text-sm text-black/60">
                                Overnight Stay
                              </label>

                              <select
                                value={
                                  day.stay
                                }
                                onChange={(
                                  e
                                ) =>
                                  updateJourneyField(
                                    index,
                                    "stay",
                                    e
                                      .target
                                      .value
                                  )
                                }
                                className="w-full border border-black/10 rounded-xl px-5 py-4 bg-white outline-none"
                              >

                                <option value="">
                                  Select
                                </option>

                                {destinationOptions.map(
                                  (
                                    destination
                                  ) => (
                                    <option
                                      key={
                                        destination
                                      }
                                    >
                                      {
                                        destination
                                      }
                                    </option>
                                  )
                                )}

                              </select>

                            </div>

                          </div>

                          {/* TYPE */}
                          <div className="pt-6 flex gap-4">

                            <button
                              onClick={() =>
                                updateJourneyField(
                                  index,
                                  "overnight",
                                  true
                                )
                              }
                              className={`px-6 py-3 rounded-full transition ${
                                day.overnight
                                  ? "bg-[#1F3A32] text-white"
                                  : "border border-black/10"
                              }`}
                            >
                              Overnight
                              Stay
                            </button>

                            <button
                              onClick={() =>
                                updateJourneyField(
                                  index,
                                  "overnight",
                                  false
                                )
                              }
                              className={`px-6 py-3 rounded-full transition ${
                                !day.overnight
                                  ? "bg-[#1F3A32] text-white"
                                  : "border border-black/10"
                              }`}
                            >
                              Day Visit
                            </button>

                          </div>

                          {/* TRANSFER TIMING */}
                            <div className="pt-6">

                            <label className="block mb-3 text-sm text-black/60">
                                Transfer Timing
                            </label>

                            <select
                                value={
                                day.transfer_timing
                                }
                                onChange={(e) =>
                                updateJourneyField(
                                    index,
                                    "transfer_timing",
                                    e.target.value
                                )
                                }
                                className="w-full border border-black/10 rounded-xl px-5 py-4 bg-white outline-none"
                            >

                                <option value="none">
                                No Transfer
                                </option>

                                <option value="morning">
                                Morning Transfer
                                </option>

                                <option value="evening">
                                Evening Transfer
                                </option>

                            </select>

                            </div>

                            {/* HOUSEBOAT */}
                            {day.stay ===
                            "Srinagar" && (

                            <div className="pt-6">

                                <label className="flex items-center gap-3">

                                <input
                                    type="checkbox"
                                    checked={
                                    day.houseboat
                                    }
                                    onChange={(e) =>
                                    updateJourneyField(
                                        index,
                                        "houseboat",
                                        e.target.checked
                                    )
                                    }
                                />

                                <span>
                                    Include Houseboat Stay
                                    + Complimentary
                                    Shikara Ride
                                </span>

                                </label>

                            </div>
                            )}

                          {/* NOTES */}
                          <div className="pt-6">

                            <label className="block mb-3 text-sm text-black/60">
                              Experience Notes
                            </label>

                            <textarea
                              value={
                                day.notes
                              }
                              onChange={(
                                e
                              ) =>
                                updateJourneyField(
                                  index,
                                  "notes",
                                  e
                                    .target
                                    .value
                                )
                              }
                              rows={4}
                              placeholder="Gondola ride, snow activities, shopping, old city walk, river rafting etc."
                              className="w-full border border-black/10 rounded-xl px-5 py-4 outline-none resize-none"
                            />

                          </div>

                        </div>
                      )
                    )}

                  </div>

                  <div className="pt-8 flex justify-center">

                    <button
                        onClick={addDay}
                        className="bg-[#1F3A32] text-white px-8 py-4 rounded-full"
                    >
                        + Add Another Day
                    </button>

                    </div>

                  <div className="pt-10 flex justify-between">

                    <button
                      onClick={() =>
                        setActiveStage(
                          "discovery"
                        )
                      }
                      className="border border-black/10 px-8 py-4 rounded-full"
                    >
                      ← Back
                    </button>

                    <button
                    onClick={() =>
                        setActiveStage(
                        "itinerary"
                        )
                    }
                    className="bg-[#1F3A32] text-white px-8 py-4 rounded-full"
                    >
                    Generate Itinerary →
                    </button>

                  </div>

                </div>
              )}

              {/* ITINERARY */}
                {activeStage ===
                "itinerary" && (

                <div className="bg-white rounded-[2rem] p-10 luxury-shadow">

                    <div className="mb-10">

                    <p className="uppercase tracking-[0.3em] text-sm text-[#1F3A32]/70 mb-4">
                        AI Itinerary
                    </p>

                    <h2 className="text-5xl text-[#222222] leading-tight">
                        Generated Journey
                    </h2>

                    </div>

                    <div className="space-y-6">

                    {generatedItinerary.map(
                        (
                        item,
                        index
                        ) => (

                        <div
                            key={index}
                            className="border border-black/5 rounded-2xl p-6"
                        >

                            <h3 className="text-2xl text-[#222222] mb-4">
                            Day {index + 1}
                            </h3>

                            <div className="space-y-5">

                            <div className="flex flex-wrap gap-3">

                                <span className="bg-[#F8F7F3] px-4 py-2 rounded-full text-sm">
                                Explore → {item.explore}
                                </span>

                                <span className="bg-[#F8F7F3] px-4 py-2 rounded-full text-sm">
                                Stay → {item.stay}
                                </span>

                                <span className="bg-[#F8F7F3] px-4 py-2 rounded-full text-sm">
                                {
                                    item.transfer_timing ===
                                    "none"
                                    ? "No Transfer"
                                    : item.transfer_timing ===
                                        "morning"
                                    ? "Morning Transfer"
                                    : "Evening Transfer"
                                }
                                </span>

                            </div>

                            <p className="text-black/70 leading-loose">

                                {item.narrative}

                            </p>

                            </div>

                        </div>
                        )
                    )}

                    </div>

                    <div className="pt-10 flex justify-between">

                    <button
                        onClick={() =>
                        setActiveStage(
                            "journey"
                        )
                        }
                        className="border border-black/10 px-8 py-4 rounded-full"
                    >
                        ← Back
                    </button>

                    <button
                        onClick={() =>
                        setActiveStage(
                            "quotation"
                        )
                        }
                        className="bg-[#1F3A32] text-white px-8 py-4 rounded-full"
                    >
                        Continue to Quotation →
                    </button>

                    </div>

                </div>
                )}

                {/* QUOTATION */}
{activeStage ===
  "quotation" && (

  <div className="bg-white rounded-[2rem] p-10 luxury-shadow">

    <div className="mb-10">

      <p className="uppercase tracking-[0.3em] text-sm text-[#1F3A32]/70 mb-4">
        Commercial Proposal
      </p>

      <h2 className="text-5xl text-[#222222] leading-tight">
        Travel Investment
      </h2>

      <p className="text-black/55 mt-4 text-lg">
        Configure destination-wise costing, stays and curated experiences.
      </p>

    </div>

    <div className="space-y-8">

      {selectedDestinations.map(
        (
          item,
          index
        ) => (

          <div
            key={index}
            className="border border-black/5 rounded-[2rem] p-8"
          >

            <div className="flex flex-wrap items-center justify-between gap-5 mb-8">

              <div>

                <p className="uppercase tracking-[0.3em] text-xs text-[#1F3A32]/50 mb-3">
                  Day {index + 1}
                </p>

                <h3 className="text-3xl text-[#222222]">
                  {item.stay}
                </h3>

              </div>

              <div className="flex flex-wrap gap-3">

                <span className="bg-[#F8F7F3] px-4 py-2 rounded-full text-sm">
                  Explore → {item.explore}
                </span>

                {item.houseboat && (
                  <span className="bg-[#1F3A32] text-white px-4 py-2 rounded-full text-sm">
                    Houseboat Stay
                  </span>
                )}

              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <div>

                <label className="block mb-3 text-sm">
                  Hotel / Stay Cost
                </label>

                 <input
                type="number"
                value={
                    quoteData[index]
                    ?.hotel_cost || ""
                }
                onChange={(e) => {

                    const updated = [
                    ...quoteData,
                    ];

                    updated[index] = {

                    ...updated[index],

                    hotel_cost:
                        Number(
                        e.target.value
                        ),
                    };

                    setQuoteData(
                    updated
                    );
                }}
                placeholder="Enter stay amount"
                className="w-full border border-black/10 rounded-xl px-5 py-4 outline-none"
                />

              </div>

              <div>

                <label className="block mb-3 text-sm">
                  Activities / Experiences
                </label>

                <input
                type="number"
                value={
                    quoteData[index]
                    ?.activities_cost || ""
                }
                onChange={(e) => {

                    const updated = [
                    ...quoteData,
                    ];

                    updated[index] = {

                    ...updated[index],

                    activities_cost:
                        Number(
                        e.target.value
                        ),
                    };

                    setQuoteData(
                    updated
                    );
                }}
                placeholder="Enter activity amount"
                className="w-full border border-black/10 rounded-xl px-5 py-4 outline-none"
                />

              </div>

            </div>

            {item.houseboat && (

            <div className="pt-6">

                <div className="bg-[#F8F7F3] rounded-[1.5rem] p-6">

                <div className="flex items-center justify-between mb-5">

                    <h4 className="text-xl text-[#222222]">
                    Houseboat Experience
                    </h4>

                    <label className="flex items-center gap-3 text-sm">

                    <input
                        type="checkbox"
                        defaultChecked
                        onChange={() => {}}
                    />

                    Complimentary

                    </label>

                </div>

                <div className="space-y-3 text-black/70">

                    <p>
                    ✔ Traditional Shikara Ride
                    </p>

                    <p>
                    ✔ Houseboat Welcome
                    </p>

                    <p>
                    ✔ Scenic Dal Lake Experience
                    </p>

                </div>

                </div>

            </div>
            )}

          </div>
        )
      )}

      {/* TRANSPORT */}
      <div className="border border-black/5 rounded-[2rem] p-8">

        <div className="mb-6">

          <h3 className="text-3xl text-[#222222] mb-3">
            Transport
          </h3>

          <p className="text-black/55">
            Vehicle and transfer estimation.
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div>

            <label className="block mb-3 text-sm">
              Vehicle Type
            </label>

            <input
              type="text"
              value={
                inquiry.cab_preference || ""
              }
              className="w-full border border-black/10 rounded-xl px-5 py-4 outline-none bg-[#F8F7F3]"
              readOnly
            />

          </div>

          <div>

            <label className="block mb-3 text-sm">
              Transport Estimate
            </label>

            <input
            type="number"
            value={
                globalQuote.transport_cost || ""
            }
            onChange={(e) =>
            setGlobalQuote({
                ...globalQuote,
                transport_cost:
                Number(
                    e.target.value
                ),
            })
            }
            placeholder="Enter transport amount"
            className="w-full border border-black/10 rounded-xl px-5 py-4 outline-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6 pt-6">

            <div>

                <label className="block mb-3 text-sm">
                Markup
                </label>

                <input
                type="number"
                value={
                    globalQuote.markup || ""
                }
                onChange={(e) =>
                setGlobalQuote({
                    ...globalQuote,
                    markup: Number(
                    e.target.value
                    ),
                })
                }
                placeholder="Enter markup"
                className="w-full border border-black/10 rounded-xl px-5 py-4 outline-none"
                />

            </div>

            <div>

                <label className="block mb-3 text-sm">
                GST
                </label>

                <input
                type="number"
                value={
                    globalQuote.gst || ""
                }
                onChange={(e) =>
                setGlobalQuote({
                    ...globalQuote,
                    gst: Number(
                    e.target.value
                    ),
                })
                }
                placeholder="Enter GST"
                className="w-full border border-black/10 rounded-xl px-5 py-4 outline-none"
                />

            </div>

            </div>

        </div>

      </div>

      {/* TOTAL */}
      <div className="bg-[#1F3A32] text-white rounded-[2rem] p-10">

        <p className="uppercase tracking-[0.3em] text-sm text-white/60 mb-4">
          Estimated Investment
        </p>

        <h3 className="text-5xl">

            ₹
            {(() => {

            const hotelTotal =
                quoteData.reduce(
                (
                    sum,
                    item
                ) =>
                    sum +
                    Number(
                    item.hotel_cost || 0
                    ),
                0
                );

            const activityTotal =
                quoteData.reduce(
                (
                    sum,
                    item
                ) =>
                    sum +
                    Number(
                    item.activities_cost || 0
                    ),
                0
                );

            const subtotal =

                hotelTotal +

                activityTotal +

                Number(
                globalQuote.transport_cost || 0
                ) +

                Number(
                globalQuote.markup || 0
                );

            const gstAmount =
                subtotal *
                (
                Number(
                    globalQuote.gst || 0
                ) / 100
                );

            return (
                subtotal + gstAmount
            ).toLocaleString("en-IN");

            })()}
            </h3>
        <p className="text-white/70 mt-4 max-w-2xl">
          Final pricing depends on hotel category, travel season, activities and availability at the time of confirmation.
        </p>

      </div>

    </div>

    <div className="pt-10 flex flex-wrap justify-between gap-4">

      <button
        onClick={() =>
          setActiveStage(
            "itinerary"
          )
        }
        className="border border-black/10 px-8 py-4 rounded-full"
      >
        ← Back
      </button>

      <button
        onClick={() =>
          setActiveStage(
            "export"
          )
        }
        className="bg-[#1F3A32] text-white px-8 py-4 rounded-full"
      >
        Continue to Export →
      </button>

    </div>

  </div>
)}

{/* EXPORT */}
{activeStage ===
  "export" && (

  <div className="bg-white rounded-[2rem] p-10 luxury-shadow">

    <div className="mb-10">

      <p className="uppercase tracking-[0.3em] text-sm text-[#1F3A32]/70 mb-4">
        Export Proposal
      </p>

      <h2 className="text-5xl text-[#222222] leading-tight">
        Final Travel Proposal
      </h2>

    </div>

    <div className="space-y-8">

      {generatedItinerary.map(
        (
          item,
          index
        ) => (

          <div
            key={index}
            className="border border-black/5 rounded-2xl p-6"
          >

            <h3 className="text-2xl mb-4">
              Day {index + 1}
            </h3>

            <p className="text-black/70 leading-loose">
              {item.narrative}
            </p>

          </div>
        )
      )}

    </div>

    <div className="pt-10">

      <div className="bg-[#F8F7F3] rounded-[2rem] p-8 mb-8">

        <h3 className="text-2xl text-[#222222] mb-5">
          Complimentary Inclusions
        </h3>

        <div className="space-y-3 text-black/70">

          <p>
            ✔ Traditional Welcome Kahwa
          </p>

          <p>
            ✔ Dedicated Travel Assistance
          </p>

          <p>
            ✔ Shikara Ride (if applicable)
          </p>

          <p>
            ✔ Curated Local Experiences
          </p>

        </div>

      </div>

      <div className="flex flex-wrap gap-4">

       <ItineraryPDF
        itinerary={{
            days:
            generatedItinerary,
        }}
        inquiry={inquiry}
        />

  <QuotationPDF
  itinerary={{
    days:
      generatedItinerary,
  }}
  inquiry={inquiry}
  quote={{

    hotel_cost:
      quoteData.reduce(
        (
          sum,
          item
        ) =>
          sum +
          Number(
            item.hotel_cost || 0
          ),
        0
      ),

    activities_cost:
      quoteData.reduce(
        (
          sum,
          item
        ) =>
          sum +
          Number(
            item.activities_cost || 0
          ),
        0
      ),

    transport_cost:
      globalQuote.transport_cost,

    markup:
      globalQuote.markup,

    gst:
      globalQuote.gst,
  }}
/>

      </div>

    </div>

  </div>
)}

            </div>

            {/* RIGHT SIDEBAR */}
            <div className="col-span-12 lg:col-span-3">

              <div className="sticky top-28 space-y-6">

                {/* SNAPSHOT */}
                <div className="bg-white rounded-[2rem] p-8 luxury-shadow">

                  <p className="uppercase tracking-[0.3em] text-xs text-[#1F3A32]/60 mb-4">
                    Customer Snapshot
                  </p>

                  <h3 className="text-3xl text-[#222222] mb-8">
                    {
                      inquiry.name
                    }
                  </h3>

                  <div className="space-y-5 text-sm">

                    <div className="flex items-center gap-3">

                      <Users
                        size={
                          18
                        }
                      />

                      <span>
                        {
                          inquiry.adults
                        }{" "}
                        Adults ·{" "}
                        {
                          inquiry.children
                        }{" "}
                        Children
                      </span>

                    </div>

                    <div className="flex items-center gap-3">

                      <CalendarDays
                        size={
                          18
                        }
                      />

                      <span>
                        {
                          inquiry.trip_duration
                        }
                      </span>

                    </div>

                    <div className="flex items-center gap-3">

                      <Car
                        size={
                          18
                        }
                      />

                      <span>
                        {
                          inquiry.cab_preference
                        }
                      </span>

                    </div>

                    <div className="flex items-center gap-3">

                      <Wallet
                        size={
                          18
                        }
                      />

                      <span>
                        {
                          inquiry.hotel_category
                        }
                      </span>

                    </div>

                    <div className="flex items-center gap-3">

                      <BedDouble
                        size={
                          18
                        }
                      />

                      <span>
                        {
                          inquiry.travel_style
                        }
                      </span>

                    </div>

                  </div>

                </div>

                {/* JOURNEY */}
                <div className="bg-white rounded-[2rem] p-8 luxury-shadow">

                  <p className="uppercase tracking-[0.3em] text-xs text-[#1F3A32]/60 mb-6">
                    Journey Summary
                  </p>

                  <div className="space-y-6">

                    {selectedDestinations.map(
                      (
                        item,
                        index
                      ) => (

                        <div
                          key={
                            index
                          }
                          className="border-b border-black/5 pb-5"
                        >

                          <p className="text-xs uppercase tracking-[0.3em] text-black/40 mb-3">
                            Day{" "}
                            {
                              item.day
                            }
                          </p>

                          <div className="space-y-2 text-sm">

                            <div className="flex gap-2">

                              <MapPinned
                                size={
                                  16
                                }
                              />

                              <span>
                                Explore →{" "}
                                {
                                  item.explore ||
                                  "—"
                                }
                              </span>

                            </div>

                            <div className="flex gap-2">

                              <BedDouble
                                size={
                                  16
                                }
                              />

                              <span>
                                Stay →{" "}
                                {
                                  item.stay ||
                                  "—"
                                }
                              </span>

                            </div>

                          </div>

                        </div>
                      )
                    )}

                  </div>

                </div>

              </div>

            </div>

          </div>

        </Container>

      </section>

    </main>
  );
}