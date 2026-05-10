"use client";

import {
  useEffect,
  useState,
} from "react";

import AdminNavbar from "@/components/dashboard/admin-navbar";

import Container from "@/components/layout/container";

import { supabaseClient } from "@/lib/supabase-client";

export default function AdminCabsPage() {
  const [loading, setLoading] =
    useState(false);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [cabs, setCabs] =
    useState<any[]>([]);

  const [form, setForm] =
    useState({
      title: "",
      slug: "",
      tagline: "",
      description: "",
      image: "",
      seating: "",
      luggage: "",
      starting_price: "",
      features: "",
      seo_title: "",
      seo_description: "",
    });

  const fetchCabs =
    async () => {
      const { data } =
        await supabaseClient
          .from("cabs")
          .select("*")
          .order("created_at", {
            ascending: false,
          });

      setCabs(data || []);
    };

  useEffect(() => {
    fetchCabs();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement
    >
  ) => {
    const { name, value } =
      e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm({
      title: "",
      slug: "",
      tagline: "",
      description: "",
      image: "",
      seating: "",
      luggage: "",
      starting_price: "",
      features: "",
      seo_title: "",
      seo_description: "",
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

      if (editingId) {
        const response =
          await supabaseClient
            .from("cabs")
            .update(form)
            .eq("id", editingId);

        error = response.error;

      } else {
        const response =
          await supabaseClient
            .from("cabs")
            .insert({
              ...form,
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
          ? "Cab updated."
          : "Cab created."
      );

      resetForm();

      fetchCabs();

    } catch (error) {
      console.error(error);

      alert(
        "Something went wrong."
      );

    } finally {
      setLoading(false);
    }
  };

  const deleteCab =
    async (id: string) => {
      const confirmed =
        confirm(
          "Delete this cab?"
        );

      if (!confirmed) {
        return;
      }

      await supabaseClient
        .from("cabs")
        .delete()
        .eq("id", id);

      fetchCabs();
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
                Manage Cabs
              </h1>

            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-[2rem] p-8 luxury-shadow space-y-6 mb-14"
            >

              <input
                type="text"
                name="title"
                placeholder="Vehicle title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full border border-black/10 rounded-xl px-5 py-4 outline-none"
              />

              <input
                type="text"
                name="slug"
                placeholder="vehicle-slug"
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
                placeholder="Vehicle description"
                value={form.description}
                onChange={handleChange}
                rows={5}
                required
                className="w-full border border-black/10 rounded-xl px-5 py-4 outline-none resize-none"
              />

              <input
                type="text"
                name="seating"
                placeholder="Seating capacity"
                value={form.seating}
                onChange={handleChange}
                required
                className="w-full border border-black/10 rounded-xl px-5 py-4 outline-none"
              />

              <input
                type="text"
                name="luggage"
                placeholder="Luggage capacity"
                value={form.luggage}
                onChange={handleChange}
                required
                className="w-full border border-black/10 rounded-xl px-5 py-4 outline-none"
              />

              <input
                type="text"
                name="starting_price"
                placeholder="Starting from"
                value={form.starting_price}
                onChange={handleChange}
                required
                className="w-full border border-black/10 rounded-xl px-5 py-4 outline-none"
              />

              <textarea
                name="features"
                placeholder="Vehicle features"
                value={form.features}
                onChange={handleChange}
                rows={4}
                required
                className="w-full border border-black/10 rounded-xl px-5 py-4 outline-none resize-none"
              />

              <input
                type="text"
                name="seo_title"
                placeholder="SEO title"
                value={form.seo_title}
                onChange={handleChange}
                required
                className="w-full border border-black/10 rounded-xl px-5 py-4 outline-none"
              />

              <textarea
                name="seo_description"
                placeholder="SEO description"
                value={form.seo_description}
                onChange={handleChange}
                rows={4}
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

              <div className="flex flex-wrap gap-4">

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#1F3A32] text-white rounded-full px-8 py-4 hover:opacity-90 transition disabled:opacity-50"
                >
                  {loading
                    ? "Saving..."
                    : editingId
                    ? "Update Cab"
                    : "Create Cab"}
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

              {cabs.map((cab) => (
                <div
                  key={cab.id}
                  className="bg-white rounded-[2rem] p-8 luxury-shadow border border-black/5"
                >

                  <div className="mb-6">

                    <h2 className="text-3xl mb-3 text-[#222222]">
                      {cab.title}
                    </h2>

                    <p className="text-[#222222]/70 mb-4">
                      {cab.tagline}
                    </p>

                    <div className="flex flex-wrap gap-3 text-sm text-black/40 mb-4">

                      <span>
                        {cab.seating}
                      </span>

                      <span>
                        •
                      </span>

                      <span>
                        {cab.luggage}
                      </span>

                    </div>

                    <p className="text-sm text-black/40">
                      /cabs/{cab.slug}
                    </p>

                  </div>

                  <div className="flex flex-wrap gap-3">

                    <button
                      onClick={() => {
                        setEditingId(
                          cab.id
                        );

                        setForm({
                          title:
                            cab.title || "",

                          slug:
                            cab.slug || "",

                          tagline:
                            cab.tagline || "",

                          description:
                            cab.description || "",

                          image:
                            cab.image || "",

                          seating:
                            cab.seating || "",

                          luggage:
                            cab.luggage || "",

                          starting_price:
                            cab.starting_price || "",

                          features:
                            cab.features || "",

                          seo_title:
                            cab.seo_title || "",

                          seo_description:
                            cab.seo_description || "",
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
                        deleteCab(
                          cab.id
                        )
                      }
                      className="bg-red-500 text-white px-5 py-2.5 rounded-full text-sm hover:opacity-90 transition"
                    >
                      Delete
                    </button>

                  </div>

                </div>
              ))}

            </div>

          </div>

        </Container>

      </section>

    </main>
  );
}