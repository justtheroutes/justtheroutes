export default function CinematicVideo() {
  return (
    <section className="relative h-[80vh] overflow-hidden">

      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >

        <source
          src="/videos/kashmir-cinematic.mp4"
          type="video/mp4"
        />

      </video>

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 h-full flex items-center justify-center text-center px-6">

        <div className="max-w-4xl text-white">

          <p className="uppercase tracking-[0.35em] text-sm text-white/70 mb-6">
            Experience Kashmir
          </p>

          <h2 className="text-5xl md:text-7xl leading-tight mb-8">

            More Than A Destination.
            <br />
            A Feeling.

          </h2>

          <p className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">

            Slow mornings on houseboats,
            snow-covered valleys,
            mountain silence,
            and journeys crafted with care.

          </p>

        </div>

      </div>

    </section>
  );
}