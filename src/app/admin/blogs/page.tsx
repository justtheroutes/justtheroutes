"use client";

import { useState } from "react";

import AdminNavbar from "@/components/dashboard/admin-navbar";
import Container from "@/components/layout/container";

import { supabaseClient } from "@/lib/supabase-client";

export default function AdminBlogsPage() {
  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      cover_image: "",
      seo_title: "",
      seo_description: "",
      keywords: "",
      published: true,
    });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
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
          .from("blog_posts")
          .insert({
            ...form,

            keywords:
              form.keywords
                .split(",")
                .map((item) =>
                  item.trim()
                ),
          });

      if (error) {
        alert(error.message);

        return;
      }

      alert("Blog published.");

      setForm({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        cover_image: "",
        seo_title: "",
        seo_description: "",
        keywords: "",
        published: true,
      });
    } catch (error) {
      console.error(error);

      alert("Failed to publish.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#F8F7F3] min-h-screen">

      <AdminNavbar />
      
      <section className="pt-40 pb-24">

        <Container>

          <div className="max-w-4xl">

            <div className="mb-16">

              <p className="uppercase tracking-[0.3em] text-sm text-[#1F3A32]/70 mb-6">
                Admin CMS
              </p>

              <h1 className="text-6xl leading-none mb-8 text-[#222222]">
                Publish
                <br />
                Journal Article
              </h1>

              <p className="text-xl text-[#222222]/70 leading-relaxed">
                Create SEO-focused travel content and destination guides.
              </p>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-8"
            >

              <div>
                <label className="block mb-3 text-sm">
                  Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-black/10 px-6 py-4 outline-none"
                />
              </div>

              <div>
                <label className="block mb-3 text-sm">
                  Slug
                </label>

                <input
                  type="text"
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  placeholder="best-time-to-visit-kashmir"
                  className="w-full rounded-2xl border border-black/10 px-6 py-4 outline-none"
                />
              </div>

              <div>
                <label className="block mb-3 text-sm">
                  Excerpt
                </label>

                <textarea
                  name="excerpt"
                  value={form.excerpt}
                  onChange={handleChange}
                  rows={4}
                  className="w-full rounded-2xl border border-black/10 px-6 py-4 outline-none"
                />
              </div>

              <div>
                <label className="block mb-3 text-sm">
                  Cover Image Public ID
                </label>

                <input
                  type="text"
                  name="cover_image"
                  value={form.cover_image}
                  onChange={handleChange}
                  placeholder="justtheroutes/journal/kashmir-guide"
                  className="w-full rounded-2xl border border-black/10 px-6 py-4 outline-none"
                />
              </div>

              <div>
                <label className="block mb-3 text-sm">
                  SEO Title
                </label>

                <input
                  type="text"
                  name="seo_title"
                  value={form.seo_title}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-black/10 px-6 py-4 outline-none"
                />
              </div>

              <div>
                <label className="block mb-3 text-sm">
                  SEO Description
                </label>

                <textarea
                  name="seo_description"
                  value={form.seo_description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full rounded-2xl border border-black/10 px-6 py-4 outline-none"
                />
              </div>

              <div>
                <label className="block mb-3 text-sm">
                  Keywords
                </label>

                <input
                  type="text"
                  name="keywords"
                  value={form.keywords}
                  onChange={handleChange}
                  placeholder="kashmir travel, gulmarg trip, kashmir tourism"
                  className="w-full rounded-2xl border border-black/10 px-6 py-4 outline-none"
                />
              </div>

              <div>
                <label className="block mb-3 text-sm">
                  Content
                </label>

                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  rows={16}
                  className="w-full rounded-2xl border border-black/10 px-6 py-4 outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-[#1F3A32] text-white rounded-full px-8 py-4 hover:opacity-90 transition disabled:opacity-50"
              >
                {loading
                  ? "Publishing..."
                  : "Publish Article"}
              </button>

            </form>

          </div>

        </Container>

      </section>

    </main>
  );
}