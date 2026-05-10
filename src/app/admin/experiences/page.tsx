"use client";

import {
  useEffect,
  useState,
} from "react";

import AdminNavbar from "@/components/dashboard/admin-navbar";

import Container from "@/components/layout/container";

import { supabaseClient } from "@/lib/supabase-client";

export default function AdminExperiencesPage() {
  const [loading, setLoading] =
    useState(false);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [experiences, setExperiences] =
    useState<any[]>([]);

  const [form, setForm] =
    useState({
      title: "",
      slug: "",
      tagline: "",
      description: "",
      image: "",
      seo_title: "",
      seo_description: "",
      highlights: "",
    });

  const fetchExperiences =
    async () => {
      const { data } =
        await supabaseClient
          .from("experiences")
          .select("*")
          .order("created_at", {
            ascending: false,
          });

      setExperiences(data || []);
    };

  useEffect(() => {
    fetchExperiences();
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
      seo_title: "",
      seo_description: "",
      highlights: "",
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
            .from("experiences")
            .update(form)
            .eq("id", editingId);

        error = response.error;

      } else {
        const response =
          await supabaseClient
            .from("experiences")
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
          ? "Experience updated."
          : "Experience created."
      );

      resetForm();

      fetchExperiences();

    } catch (error) {
      console.error(error);

      alert(
        "Something went wrong."
      );

    } finally {
      setLoading(false);
    }
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
                Manage Experiences
              </h1>

            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-[2rem] p-8 luxury-shadow space-y-6 mb-14"
            >

              <input
                type="text"
                name="title"
                placeholder="Experience title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full border border-black/10 rounded-xl px-5 py-4 outline-none"
              />

              <input
                type="text"
                name="slug"
                placeholder="experience-slug"
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
                placeholder="Experience description"
                value={form.description}
                onChange={handleChange}
                rows={5}
                required
                className="w-full border border-black/10 rounded-xl px-5 py-4 outline-none resize-none"
              />

              <textarea
                name="highlights"
                placeholder="Experience highlights"
                value={form.highlights}
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

              <button
                type="submit"
                disabled={loading}
                className="bg-[#1F3A32] text-white rounded-full px-8 py-4"
              >
                {loading
                  ? "Saving..."
                  : editingId
                  ? "Update Experience"
                  : "Create Experience"}
              </button>

            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {experiences.map(
                (item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-[2rem] p-8 luxury-shadow"
                  >

                    <h2 className="text-3xl mb-3 text-[#222222]">
                      {item.title}
                    </h2>

                    <p className="text-[#222222]/70 mb-4">
                      {item.tagline}
                    </p>

                    <p className="text-sm text-black/40 mb-6">
                      /experiences/{item.slug}
                    </p>

                    <div className="flex gap-3">

                      <button
                        onClick={() => {
                          setEditingId(
                            item.id
                          );

                          setForm({
                            title:
                              item.title || "",

                            slug:
                              item.slug || "",

                            tagline:
                              item.tagline || "",

                            description:
                              item.description || "",

                            image:
                              item.image || "",

                            seo_title:
                              item.seo_title || "",

                            seo_description:
                              item.seo_description || "",

                            highlights:
                              item.highlights || "",
                          });

                          window.scrollTo({
                            top: 0,
                            behavior:
                              "smooth",
                          });
                        }}
                        className="bg-[#1F3A32] text-white px-5 py-2 rounded-full text-sm"
                      >
                        Edit
                      </button>

                      <button
                        onClick={async () => {
                          const confirmed =
                            confirm(
                              "Delete this experience?"
                            );

                          if (
                            !confirmed
                          ) {
                            return;
                          }

                          await supabaseClient
                            .from(
                              "experiences"
                            )
                            .delete()
                            .eq(
                              "id",
                              item.id
                            );

                          fetchExperiences();
                        }}
                        className="bg-red-500 text-white px-5 py-2 rounded-full text-sm"
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