import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;

  className?: string;

  size?: "default" | "lg";

  onClick?: () => void;

  type?: "button" | "submit";

  disabled?: boolean;
};

export default function Button({
  children,
  className,
  size = "default",
  onClick,
  type = "button",
  disabled,
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "rounded-full transition-all duration-300 font-medium",

        "bg-[#1F3A32] text-white hover:opacity-90",

        size === "default" &&
          "px-6 py-3 text-sm",

        size === "lg" &&
          "px-8 py-4 text-base",

        disabled &&
          "opacity-50 cursor-not-allowed",

        className
      )}
    >
      {children}
    </button>
  );
}