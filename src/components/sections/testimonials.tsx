import Container from "../layout/container";

const testimonials = [
  {
    name: "Aarav Mehta",

    location: "Mumbai",

    review:
      "The journey felt thoughtful from start to finish. Everything was paced perfectly and the local recommendations made the experience unforgettable.",
  },

  {
    name: "Sana Khan",

    location: "Bangalore",

    review:
      "We booked our honeymoon through JustTheRoutes and honestly the experience felt incredibly smooth and personal throughout the trip.",
  },

  {
    name: "Ritika Sharma",

    location: "Delhi",

    review:
      "Unlike rushed tour packages, this felt calm, curated, and genuinely local. The team stayed available throughout the journey.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-[#1F3A32] text-white">

      <Container>

        <div className="max-w-4xl mb-20">

          <p className="uppercase tracking-[0.3em] text-sm text-white/60 mb-6">
            Reviews
          </p>

          <h2 className="text-5xl md:text-7xl leading-none mb-8">
            Trusted By
            <br />
            Travelers
          </h2>

          <p className="text-xl text-white/70 leading-relaxed max-w-2xl">
            Journeys designed around trust, thoughtful planning,
            and meaningful travel experiences across Kashmir.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {testimonials.map(
            (testimonial, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-[2rem] p-8"
              >

                <div className="flex items-center gap-1 mb-6 text-[#D4A84F] text-xl">

                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>

                </div>

                <p className="text-white/80 leading-loose mb-8">
                  “{testimonial.review}”
                </p>

                <div className="pt-6 border-t border-white/10">

                  <h3 className="text-xl mb-1">
                    {testimonial.name}
                  </h3>

                  <p className="text-white/50">
                    {testimonial.location}
                  </p>

                </div>

              </div>
            )
          )}

        </div>

      </Container>

    </section>
  );
}