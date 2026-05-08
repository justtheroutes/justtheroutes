import Link from "next/link";

import Container from "../layout/container";

import CloudinaryImage from "../ui/cloudinary-image";
import HorizontalScroll from "../ui/horizontal-scroll";

const instagramPosts = [
  {
    image:
      "justtheroutes/instagram/insta-1",
  },

  {
    image:
      "justtheroutes/instagram/insta-2",
  },

  {
    image:
      "justtheroutes/instagram/insta-3",
  },

  {
    image:
      "justtheroutes/instagram/insta-4",
  },

  {
    image:
      "justtheroutes/instagram/insta-5",
  },
];

export default function InstagramSection() {
  return (
    <section className="section-padding bg-white overflow-hidden">

      <Container>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">

          <div className="max-w-3xl">

            <p className="uppercase tracking-[0.3em] text-sm text-[#1F3A32]/70 mb-6">
              Instagram
            </p>

            <h2 className="text-5xl md:text-7xl leading-none mb-8 text-[#222222]">
              Kashmir
              <br />
              Through Our Lens
            </h2>

            <p className="text-xl text-[#222222]/70 leading-relaxed max-w-2xl">
              Follow our journeys, experiences, landscapes,
              and moments captured across Kashmir.
            </p>

          </div>

            <Link
            href="https://instagram.com/justtheroutes"
            target="_blank"
            className="inline-flex items-center gap-4 bg-[#1F3A32] text-white px-6 py-4 rounded-full hover:opacity-90 transition"
            >

            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">

            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
            >
                <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm0 1.5h8.5a4.25 4.25 0 014.25 4.25v8.5a4.25 4.25 0 01-4.25 4.25h-8.5a4.25 4.25 0 01-4.25-4.25v-8.5A4.25 4.25 0 017.75 3.5zm8.75 1a.75.75 0 100 1.5.75.75 0 000-1.5zM12 6.5A5.5 5.5 0 106.5 12 5.5 5.5 0 0012 6.5zm0 1.5A4 4 0 118 12a4 4 0 014-4z" />
            </svg>

            </div>

            <div>

                <p className="text-xs uppercase tracking-[0.2em] text-white/60 mb-1">
                Follow Us
                </p>

                <p className="text-lg">
                @justtheroutes
                </p>

            </div>

            </Link>

        </div>

      </Container>

      <HorizontalScroll>

  {instagramPosts.map(
    (post, index) => (
      <Link
        key={index}
        href="https://instagram.com/justtheroutes"
        target="_blank"
        className="group relative w-[280px] md:w-[320px] h-[380px] rounded-[2rem] overflow-hidden flex-shrink-0"
      >

        <CloudinaryImage
          src={post.image}
          alt="Instagram Post"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition" />

      </Link>
    )
  )}

</HorizontalScroll>

    </section>
  );
}