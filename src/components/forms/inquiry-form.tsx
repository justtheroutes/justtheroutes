"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { supabaseClient } from "@/lib/supabase-client";

type FormData = {
  name: string;
  phone: string;
  destination: string;
  travelers: string;
  travelDate: string;
  message: string;
};

export default function InquiryForm() {
  const [step, setStep] = useState(1);

  const [loading, setLoading] =
    useState(false);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FormData>();

  const onSubmit = async (
    data: FormData
  ) => {
    try {
      setLoading(true);

      const { error } = await supabaseClient
        .from("inquiries")
        .insert([
          {
            name: data.name,
            phone: data.phone,
            destination: data.destination,
            travelers: data.travelers,
            travel_date: data.travelDate,
            message: data.message,
          },
        ]);

      if (error) {
        console.error(error);

        alert("Something went wrong.");
      } else {
        alert(
          "Inquiry submitted successfully!"
        );

        reset();

        setStep(1);
      }
    } catch (error) {
      console.error(error);

      alert("Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
    >

      <div className="flex items-center gap-3">

        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className={`h-2 flex-1 rounded-full transition-all ${
              step >= item
                ? "bg-[#1F3A32]"
                : "bg-black/10"
            }`}
          />
        ))}

      </div>

      {step === 1 && (
        <div className="space-y-6">

          <div>
            <label className="block mb-2 text-sm">
              Full Name
            </label>

            <input
              {...register("name")}
              placeholder="Your name"
              className="w-full rounded-2xl border border-black/10 px-5 py-4 outline-none focus:border-[#1F3A32]"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">
              Phone Number
            </label>

            <input
              {...register("phone")}
              placeholder="Your phone number"
              className="w-full rounded-2xl border border-black/10 px-5 py-4 outline-none focus:border-[#1F3A32]"
            />
          </div>

          <button
            type="button"
            onClick={() => setStep(2)}
            className="w-full bg-[#1F3A32] text-white rounded-full py-4 hover:opacity-90 transition"
          >
            Continue
          </button>

        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">

          <div>
            <label className="block mb-2 text-sm">
              Destination
            </label>

            <select
              {...register("destination")}
              className="w-full rounded-2xl border border-black/10 px-5 py-4 outline-none focus:border-[#1F3A32]"
            >
              <option value="">
                Select Destination
              </option>

              <option value="Kashmir">
                Kashmir
              </option>

              <option value="Gulmarg">
                Gulmarg
              </option>

              <option value="Pahalgam">
                Pahalgam
              </option>

              <option value="Leh">
                Leh
              </option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm">
              Approx Travel Date
            </label>

            <input
              type="date"
              {...register("travelDate")}
              className="w-full rounded-2xl border border-black/10 px-5 py-4 outline-none focus:border-[#1F3A32]"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">
              Number of Travelers
            </label>

            <input
              {...register("travelers")}
              placeholder="2 Adults"
              className="w-full rounded-2xl border border-black/10 px-5 py-4 outline-none focus:border-[#1F3A32]"
            />
          </div>

          <div className="flex gap-4">

            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex-1 border border-black/10 rounded-full py-4"
            >
              Back
            </button>

            <button
              type="button"
              onClick={() => setStep(3)}
              className="flex-1 bg-[#1F3A32] text-white rounded-full py-4 hover:opacity-90 transition"
            >
              Continue
            </button>

          </div>

        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">

          <div>
            <label className="block mb-2 text-sm">
              Tell Us About Your Ideal Journey
            </label>

            <textarea
              {...register("message")}
              rows={5}
              placeholder="Luxury stays, honeymoon, snowfall, adventure, family trip..."
              className="w-full rounded-2xl border border-black/10 px-5 py-4 outline-none focus:border-[#1F3A32] resize-none"
            />
          </div>

          <div className="flex gap-4">

            <button
              type="button"
              onClick={() => setStep(2)}
              className="flex-1 border border-black/10 rounded-full py-4"
            >
              Back
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#1F3A32] text-white rounded-full py-4 hover:opacity-90 transition disabled:opacity-50"
            >
              {loading
                ? "Submitting..."
                : "Submit Inquiry"}
            </button>

          </div>

        </div>
      )}

    </form>
  );
}