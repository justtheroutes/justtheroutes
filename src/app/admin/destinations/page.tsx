"use client";

import { useEffect, useState } from "react";

import Container from "@/components/layout/container";

import AdminNavbar from "@/components/dashboard/admin-navbar";

import { supabaseClient } from "@/lib/supabase-client";

export default function AdminDestinationsPage() {
  const [loading, setLoading] =
    useState(false);

  const [destinations, setDestinations] =
    useState<any[]>([]);

  const [form, setForm] =
    useState({
      name: "",
      slug: "",
      tagline: "",
      description: "",
      image: "",
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

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { error } =
        await supabaseClient
          .from("destinations")
          .insert({
            ...form,
            featured: true,
          });

      if (error) {
        alert(error.message);

        return;
      }

      alert(
        "Destination created."
      );

      setForm({
        name: "",
        slug: "",
        tagline: "",
        description: "",
        image: "",
      });

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

          <div className="max-w-5xl">

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
              className="bg-white rounded-[2rem] p-8 luxury-shadow space-y-6 mb-12"
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

              <input
                type="text"
                name="image"
                placeholder="Cloudinary public ID"
                value={form.image}
                onChange={handleChange}
                required
                className="w-full border border-black/10 rounded-xl px-5 py-4 outline-none"
              />

              <button
                type="submit"
                disabled={loading}
                className="bg-[#1F3A32] text-white rounded-full px-8 py-4 hover:opacity-90 transition disabled:opacity-50"
              >
                {loading
                  ? "Creating..."
                  : "Create Destination"}
              </button>

            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {destinations.map(
                (destination) => (
                  <div
                    key={destination.id}
                    className="bg-white rounded-[2rem] p-8 luxury-shadow"
                  >

                    <h2 className="text-3xl mb-3 text-[#222222]">
                      {destination.name}
                    </h2>

                    <p className="text-[#222222]/70 mb-6">
                      {destination.tagline}
                    </p>

                    <button
                      onClick={() =>
                        deleteDestination(
                          destination.id
                        )
                      }
                      className="text-red-500"
                    >
                      Delete
                    </button>

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