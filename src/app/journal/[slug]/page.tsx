import { notFound } from "next/navigation";

import Navbar from "@/components/layout/navbar";
import Container from "@/components/layout/container";

import CloudinaryImage from "@/components/ui/cloudinary-image";
import DestinationCTA from "@/components/ui/destination-cta";

import { getBlogBySlug } from "@/services/blog-service";
import { getPublishedBlogs } from "@/services/blog-service";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const blogs =
    await getPublishedBlogs();

  return blogs.map((blog: any) => ({
    slug: blog.slug,
  }));
}

export default async function BlogPage({
  params,
}: Props) {
  const { slug } = await params;

  const blog =
    await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <main className="bg-[#F8F7F3] min-h-screen">

      <Navbar light />

      {/* HERO */}
      <section className="pt-32 pb-12">

        <Container>

          <div className="max-w-4xl mx-auto">

            <p className="uppercase tracking-[0.3em] text-sm text-[#1F3A32]/70 mb-6">
              Journal Article
            </p>

            <h1 className="text-5xl md:text-7xl leading-tight mb-8 text-[#222222]">
              {blog.title}
            </h1>

            <p className="text-xl text-[#222222]/70 leading-relaxed mb-12">
              {blog.excerpt}
            </p>

          </div>

        </Container>

      </section>

      {/* COVER IMAGE */}
      <section className="pb-16">

        <Container>

          <div className="relative h-[500px] rounded-[2rem] overflow-hidden">

            <CloudinaryImage
              src={blog.cover_image}
              alt={blog.title}
              fill
              priority
              className="object-cover"
            />

          </div>

        </Container>

      </section>

      {/* CONTENT */}
      <section className="pb-24">

        <Container>

          <div className="max-w-4xl mx-auto">

            <article className="max-w-none text-[#222222]/75 text-lg leading-relaxed space-y-8">

              <div className="space-y-8">

  {blog.content
        .split("\n")
        .filter(
        (paragraph: string) =>
            paragraph.trim() !== ""
        )
        .map(
        (
            paragraph: string,
            index: number
        ) => (
            <p
            key={index}
            className="leading-loose"
            >
            {paragraph}
            </p>
        )
        )}

    </div>

            </article>

            <div className="pt-16">

              <DestinationCTA />

            </div>

          </div>

        </Container>

      </section>

    </main>
  );
}