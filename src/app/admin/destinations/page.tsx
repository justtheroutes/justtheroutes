"use client";

import { useEffect, useState } from "react";

import Container from "@/components/layout/container";

import AdminNavbar from "@/components/dashboard/admin-navbar";

import { supabaseClient } from "@/lib/supabase-client";

export default function AdminDestinationsPage() {
  const [loading, setLoading] =
    useState(false);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [destinations, setDestinations] =
    useState<any[]>([]);

  const [form, setForm] =
    useState({
      name: "",
      slug: "",
      tagline: "",
      description: "",
      image: "",
      best_time: "",
      trip_duration: "",
      how_to_reach: "",
      highlights: "",
      seo_description: "",
      faqs: "",
    });

  const fetchDestinations =
    async () => {
      const { data } =
        await supabaseClient
          .from("destinations")
          .select("*")
          .order("created_at", {
            ascending: false,
          });

      setDestinations(data || []);
    };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm({
      name: "",
      slug: "",
      tagline: "",
      description: "",
      image: "",
      best_time: "",
      trip_duration: "",
      how_to_reach: "",
      highlights: "",
      seo_description: "",
      faqs: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      let error = null;

      const payload = {
        ...form,

        faqs:
          form.faqs
            ? JSON.parse(form.faqs)
            : [],
      };

      if (editingId) {
        const response =
          await supabaseClient
            .from("destinations")
            .update(payload)
            .eq("id", editingId);

        error = response.error;

      } else {
        const response =
          await supabaseClient
            .from("destinations")
            .insert({
              ...payload,
              featured: true,
            });

        error = response.error;
      }

      if (error) {
        alert(error.message);

        return;
      }

      alert(
        editingId
          ? "Destination updated."
          : "Destination created."
      );

      resetForm();

      fetchDestinations();

    } catch (error) {
      console.error(error);

      alert(
        "Something went wrong."
      );

    } finally {
      setLoading(false);
    }
  };

  const deleteDestination =
    async (id: string) => {
      const confirmed =
        confirm(
          "Delete this destination?"
        );

      if (!confirmed) {
        return;
      }

      await supabaseClient
        .from("destinations")
        .delete()
        .eq("id", id);

      fetchDestinations();
    };

  return (
    <main className="bg-[#F8F7F3] min-h-screen">

      <AdminNavbar />

      <section className="py-12">

        <Container>

          <div className="max-w-6xl mx-auto">

            <div className="mb-14">

              <p className="uppercase tracking-[0.3em] text-sm text-[#1F3A32]/70 mb-4">
                Admin CMS
              </p>

              <h1 className="text-5xl leading-none text-[#222222]">
                Manage Destinations
              </h1>

            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-[2rem] p-8 luxury-shadow space-y-6 mb-14"
            >

              <input
                type="text"
                name="name"
                placeholder="Destination Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border border-black/10 rounded-xl px-5 py-4 outline-none"
              />

              <input
                type="text"
                name="slug"
                placeholder="destination-slug"
                value={form.slug}
                onChange={handleChange}
                required
                className="w-full border border-black/10 rounded-xl px-5 py-4 outline-none"
              />

              <input
                type="text"
                name="tagline"
                placeholder="Short tagline"
                value={form.tagline}
                onChange={handleChange}
                required
                className="w-full border border-black/10 rounded-xl px-5 py-4 outline-none"
              />

              <textarea
                name="description"
                placeholder="Destination description"
                value={form.description}
                onChange={handleChange}
                rows={5}
                required
                className="w-full border border-black/10 rounded-xl px-5 py-4 outline-none resize-none"
              />

              <textarea
                name="best_time"
                placeholder="Best time to visit"
                value={form.best_time}
                onChange={handleChange}
                rows={3}
                required
                className="w-full border border-black/10 rounded-xl px-5 py-4 outline-none resize-none"
              />

              <input
                type="text"
                name="trip_duration"
                placeholder="Ideal trip duration"
                value={form.trip_duration}
                onChange={handleChange}
                required
                className="w-full border border-black/10 rounded-xl px-5 py-4 outline-none"
              />

              <textarea
                name="how_to_reach"
                placeholder="How to reach"
                value={form.how_to_reach}
                onChange={handleChange}
                rows={3}
                required
                className="w-full border border-black/10 rounded-xl px-5 py-4 outline-none resize-none"
              />

              <textarea
                name="highlights"
                placeholder="Destination highlights"
                value={form.highlights}
                onChange={handleChange}
                rows={3}
                required
                className="w-full border border-black/10 rounded-xl px-5 py-4 outline-none resize-none"
              />

              <textarea
                name="seo_description"
                placeholder="SEO description"
                value={form.seo_description}
                onChange={handleChange}
                rows={3}
                required
                className="w-full border border-black/10 rounded-xl px-5 py-4 outline-none resize-none"
              />

              <textarea
              name="faqs"
              placeholder='[{"question":"...","answer":"..."}]'
              value={form.faqs}
              onChange={handleChange}
              rows={12}
              className="w-full border border-black/10 rounded-xl px-5 py-4 outline-none resize-none font-mono text-sm"
            />

              <input
                type="text"
                name="image"
                placeholder="Cloudinary public ID"
                value={form.image}
                onChange={handleChange}
                required
                className="w-full border border-black/10 rounded-xl px-5 py-4 outline-none"
              />

              <div className="flex flex-wrap gap-4">

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#1F3A32] text-white rounded-full px-8 py-4 hover:opacity-90 transition disabled:opacity-50"
                >
                  {loading
                    ? editingId
                      ? "Updating..."
                      : "Creating..."
                    : editingId
                    ? "Update Destination"
                    : "Create Destination"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-black/5 text-[#222222] rounded-full px-8 py-4 hover:bg-black/10 transition"
                  >
                    Cancel Editing
                  </button>
                )}

              </div>

            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {destinations.map(
                (destination) => (
                  <div
                    key={destination.id}
                    className="bg-white rounded-[2rem] p-8 luxury-shadow border border-black/5"
                  >

                    <div className="mb-6">

                      <h2 className="text-3xl mb-3 text-[#222222]">
                        {destination.name}
                      </h2>

                      <p className="text-[#222222]/70 mb-4">
                        {destination.tagline}
                      </p>

                      <p className="text-sm text-black/40">
                        /destinations/{destination.slug}
                      </p>

                    </div>

                    <div className="flex flex-wrap gap-3">

                      <button
                        onClick={() => {
                          setEditingId(
                            destination.id
                          );

                          setForm({
                            name:
                              destination.name || "",

                            slug:
                              destination.slug || "",

                            tagline:
                              destination.tagline || "",

                            description:
                              destination.description || "",

                            image:
                              destination.image || "",

                            best_time:
                              destination.best_time || "",

                            trip_duration:
                              destination.trip_duration || "",

                            how_to_reach:
                              destination.how_to_reach || "",

                            highlights:
                              destination.highlights || "",

                            seo_description:
                              destination.seo_description || "",

                            faqs:
                            JSON.stringify(
                              destination.faqs || [],
                              null,
                              2
                            ),
                          });

                          window.scrollTo({
                            top: 0,
                            behavior:
                              "smooth",
                          });
                        }}
                        className="bg-[#1F3A32] text-white px-5 py-2.5 rounded-full text-sm hover:opacity-90 transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteDestination(
                            destination.id
                          )
                        }
                        className="bg-red-500 text-white px-5 py-2.5 rounded-full text-sm hover:opacity-90 transition"
                      >
                        Delete
                      </button>

                    </div>

                  </div>
                )
              )}

            </div>

          </div>

        </Container>

      </section>

    </main>
  );
}