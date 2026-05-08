import { cn } from "@/lib/utils";

type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  light?: boolean;
};

export default function SectionTitle({
  eyebrow,
  title,
  description,
  light,
}: SectionTitleProps) {
  return (
    <div className="max-w-3xl mb-16">

      {eyebrow && (
        <p
          className={cn(
            "uppercase tracking-[0.3em] text-sm mb-4",
            light
              ? "text-white/70"
              : "text-[#1F3A32]/70"
          )}
        >
          {eyebrow}
        </p>
      )}

      <h2
        className={cn(
          "text-4xl md:text-5xl leading-tight mb-6",
          light ? "text-white" : "text-[#222222]"
        )}
      >
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            "text-lg leading-relaxed",
            light
              ? "text-white/70"
              : "text-[#222222]/70"
          )}
        >
          {description}
        </p>
      )}

    </div>
  );
}