import Link from "next/link";

import Navbar from "@/components/layout/navbar";
import Container from "@/components/layout/container";

import CloudinaryImage from "@/components/ui/cloudinary-image";

import { getPublishedBlogs } from "@/services/blog-service";

export default async function JournalPage() {
  const blogs =
    await getPublishedBlogs();

  return (
    <main className="bg-[#F8F7F3] min-h-screen">

      <Navbar light />

      <section className="pt-40 pb-24">

        <Container>

          <div className="max-w-4xl mb-20">

            <p className="uppercase tracking-[0.3em] text-sm text-[#1F3A32]/70 mb-6">
              Journal
            </p>

            <h1 className="text-6xl md:text-8xl leading-none mb-8 text-[#222222]">
              Travel Stories
              <br />
              & Insights
            </h1>

            <p className="text-xl text-[#222222]/70 leading-relaxed max-w-2xl">
              Explore destination guides, itineraries, seasonal travel advice,
              and curated stories from Kashmir.
            </p>

          </div>

          {blogs.length === 0 ? (
            <div className="bg-white rounded-[2rem] p-12 text-center luxury-shadow">

              <h2 className="text-3xl mb-4">
                No Articles Yet
              </h2>

              <p className="text-[#222222]/60">
                Your journal articles will appear here once published.
              </p>

            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

              {blogs.map((blog: any) => (
                <Link
                  key={blog.id}
                  href={`/journal/${blog.slug}`}
                  className="group bg-white rounded-[2rem] overflow-hidden luxury-shadow block"
                >

                  <div className="relative h-[320px] overflow-hidden">

                    <CloudinaryImage
                      src={blog.cover_image}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                  </div>

                  <div className="p-8">

                    <h2 className="text-3xl leading-tight mb-4 text-[#222222]">
                      {blog.title}
                    </h2>

                    <p className="text-[#222222]/70 leading-relaxed">
                      {blog.excerpt}
                    </p>

                  </div>

                </Link>
              ))}

            </div>
          )}

        </Container>

      </section>

    </main>
  );
}