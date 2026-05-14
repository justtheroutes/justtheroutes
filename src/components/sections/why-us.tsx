import Container from "../layout/container";

const features = [
  {
    stat: "Since 2016",
    title: "Nearly A Decade Of Kashmir Expertise",
    description:
      "Built from within Kashmir with years of on-ground travel planning and trusted local relationships.",
    bg: "bg-[#1F3A32]",
    text: "text-white",
    muted: "text-white/65",
  },

  {
    stat: "500+ Journeys",
    title: "Curated Across Every Season",
    description:
      "From luxury escapes and honeymoons to immersive family journeys and slow travel experiences.",
    bg: "bg-[#F3EEE4]",
    text: "text-[#222222]",
    muted: "text-[#222222]/65",
  },

  {
    stat: "Kashmir Based",
    title: "Locally Rooted Operations",
    description:
      "Direct local coordination, carefully selected stays and personalized on-ground assistance throughout your trip.",
    bg: "bg-[#E7EFEA]",
    text: "text-[#222222]",
    muted: "text-[#222222]/65",
  },

  {
    stat: "Tailored Planning",
    title: "No Generic Package Templates",
    description:
      "Every itinerary is designed around your pace, preferences, season and travel style.",
    bg: "bg-[#111111]",
    text: "text-white",
    muted: "text-white/65",
  },
];

export default function WhyUs() {

  return (

    <section className="py-32 bg-white overflow-hidden">

      <Container>

        {/* INTRO */}

        <div className="flex items-end justify-between mb-20 gap-10">

  <div>

    <h2 className="text-4xl md:text-6xl leading-tight text-[#222222]">

      Why JustTheRoutes?

    </h2>

    <div className="w-24 h-[2px] bg-[#1F3A32] mt-8 rounded-full" />

  </div>

  <p className="hidden lg:block text-sm uppercase tracking-[0.35em] text-[#222222]/35 whitespace-nowrap">

    Kashmir • Since 2016

  </p>

</div>

        {/* FEATURE STRIP */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {features.map((item) => (

            <div
              key={item.title}
              className={`${item.bg} ${item.text} rounded-[2.5rem] p-10 min-h-[360px] flex flex-col justify-between transition-all duration-500 hover:-translate-y-[4px]`}
            >

              <div>

                <p className="text-4xl md:text-5xl leading-none mb-10 font-medium tracking-tight">

                  {item.stat}

                </p>

                <h3 className="text-2xl leading-tight mb-6">

                  {item.title}

                </h3>

              </div>

              <p className={`${item.muted} leading-loose text-[17px]`}>

                {item.description}

              </p>

            </div>

          ))}

        </div>

      </Container>

    </section>

  );
}