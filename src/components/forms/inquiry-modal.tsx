"use client";

import { useState } from "react";

import { X } from "lucide-react";

import Button from "@/components/ui/button";

import { useInquiryModal } from "@/hooks/use-inquiry-modal";

import { supabaseClient } from "@/lib/supabase-client";

export default function InquiryModal() {
  const inquiryModal =
    useInquiryModal();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      name: "",
      whatsapp: "",
      travel_month: "",
      travellers: "",
      trip_type: "",
      notes: "",
    });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { error } =
        await supabaseClient
          .from("inquiries")
          .insert(form);

      if (error) {
        alert(error.message);

        return;
      }

      alert(
        "Inquiry submitted successfully."
      );

      inquiryModal.onClose();

      setForm({
        name: "",
        whatsapp: "",
        travel_month: "",
        travellers: "",
        trip_type: "",
        notes: "",
      });
    } catch (error) {
      console.error(error);

      alert(
        "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!inquiryModal.isOpen) {
    return null;
  }

  return (
  <div className="fixed inset-0 z-[999] bg-black/60 flex items-center justify-center px-4">

    <div className="bg-white rounded-[2rem] w-full max-w-3xl p-6 md:p-8 relative">

      <button
        onClick={inquiryModal.onClose}
        className="absolute top-5 right-5 text-black/60 hover:text-black transition"
      >
        <X size={20} />
      </button>

      <div className="mb-8">

        <p className="uppercase tracking-[0.3em] text-xs text-[#1F3A32]/70 mb-3">
          Start Your Journey
        </p>

        <h2 className="text-3xl md:text-4xl leading-tight text-[#222222] mb-3">
          Plan Your Kashmir Trip
        </h2>

        <p className="text-[#222222]/65">
          Quick details so we can curate the right experience.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-black/10 rounded-xl px-5 py-3.5 outline-none"
          />

          <input
            type="text"
            name="whatsapp"
            placeholder="WhatsApp Number"
            value={form.whatsapp}
            onChange={handleChange}
            required
            className="w-full border border-black/10 rounded-xl px-5 py-3.5 outline-none"
          />

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <select
            name="travel_month"
            value={form.travel_month}
            onChange={handleChange}
            required
            className="w-full border border-black/10 rounded-xl px-5 py-3.5 outline-none bg-white"
          >

            <option value="">
              Travel Month
            </option>

            <option value="January">
              January
            </option>

            <option value="February">
              February
            </option>

            <option value="March">
              March
            </option>

            <option value="April">
              April
            </option>

            <option value="May">
              May
            </option>

            <option value="June">
              June
            </option>

            <option value="July">
              July
            </option>

            <option value="August">
              August
            </option>

            <option value="September">
              September
            </option>

            <option value="October">
              October
            </option>

            <option value="November">
              November
            </option>

            <option value="December">
              December
            </option>

          </select>

          <select
            name="travellers"
            value={form.travellers}
            onChange={handleChange}
            required
            className="w-full border border-black/10 rounded-xl px-5 py-3.5 outline-none bg-white"
          >

            <option value="">
              Travellers
            </option>

            <option value="1 Traveller">
              1 Traveller
            </option>

            <option value="2 Travellers">
              2 Travellers
            </option>

            <option value="3-5 Travellers">
              3-5 Travellers
            </option>

            <option value="6-10 Travellers">
              6-10 Travellers
            </option>

            <option value="10+ Travellers">
              10+ Travellers
            </option>

          </select>

        </div>

        <select
          name="trip_type"
          value={form.trip_type}
          onChange={handleChange}
          required
          className="w-full border border-black/10 rounded-xl px-5 py-3.5 outline-none bg-white"
        >

          <option value="">
            Trip Type
          </option>

          <option value="Family Trip">
            Family Trip
          </option>

          <option value="Honeymoon">
            Honeymoon
          </option>

          <option value="Friends Trip">
            Friends Trip
          </option>

          <option value="Luxury Travel">
            Luxury Travel
          </option>

          <option value="Adventure Travel">
            Adventure Travel
          </option>

          <option value="Custom Journey">
            Custom Journey
          </option>

        </select>

        <textarea
          name="notes"
          placeholder="Anything specific you'd like us to know?"
          value={form.notes}
          onChange={handleChange}
          rows={3}
          className="w-full border border-black/10 rounded-xl px-5 py-3.5 outline-none resize-none"
        />

        <Button
          type="submit"
          disabled={loading}
          className="w-full"
          size="lg"
        >
          {loading
            ? "Submitting..."
            : "Submit Inquiry"}
        </Button>

      </form>

    </div>

  </div>
);
}