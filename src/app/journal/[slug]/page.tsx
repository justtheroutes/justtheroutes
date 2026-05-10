import type { Metadata } from "next";
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const post =
    await getBlogBySlug(slug);

  if (!post) {
    return {};
  }

  const image =
    `https://res.cloudinary.com/dqdvlpsi7/image/upload/f_auto,q_auto/${post.image}`;

  return {
    title: post.title,

    description:
      post.excerpt,

    openGraph: {
      title: post.title,

      description:
        post.excerpt,

      images: [
        {
          url: image,
          width: 1200,
          height: 630,
        },
      ],
    },

    twitter: {
      card:
        "summary_large_image",

      title: post.title,

      description:
        post.excerpt,

      images: [image],
    },
  };
}

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

const relatedBlogs =
  await getPublishedBlogs();

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

      <section className="py-24 bg-white">

  <Container>

    <div className="mb-14">

      <p className="uppercase tracking-[0.3em] text-sm text-[#1F3A32]/70 mb-4">
        Continue Reading
      </p>

      <h2 className="text-5xl text-[#222222]">
        Related Articles
      </h2>

    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

      {relatedBlogs
        .filter(
          (item: any) =>
            item.slug !== blog.slug
        )
        .slice(0, 3)
        .map((item: any) => (

          <a
            key={item.id}
            href={`/journal/${item.slug}`}
            className="group"
          >

            <div className="relative h-[320px] rounded-[2rem] overflow-hidden mb-5">

              <CloudinaryImage
                src={item.cover_image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition duration-700"
              />

              <div className="absolute inset-0 bg-black/30" />

            </div>

            <h3 className="text-2xl text-[#222222] mb-2 leading-snug">
              {item.title}
            </h3>

            <p className="text-[#222222]/70 line-clamp-2">
              {item.excerpt}
            </p>

          </a>
        ))}

    </div>

  </Container>

</section>

    </main>
  );
}