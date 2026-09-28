import { cn } from "@/lib/utils";

interface LogoMarkProps {
  className?: string;
  /** Colour of the destination point. */
  accent?: string;
}

/**
 * Three route lines of increasing length sweeping toward a single destination
 * point — "tri" + "breeze", journeys converging on one plan.
 */
export function LogoMark({ className, accent = "var(--color-coral-500)" }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M3 26.5C11 26.5 19 21 25.5 9.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M3 19.5C9 19.5 14 16.5 17.5 11" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.72" />
      <path d="M3 12.5C6 12.5 8.5 11.5 10 9.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.45" />
      <circle cx="27" cy="6" r="3" fill={accent} />
    </svg>
  );
}

interface LogoProps {
  className?: string;
  tone?: "dark" | "light";
}

export function Logo({ className, tone = "dark" }: LogoProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5",
        tone === "dark" ? "text-navy-900" : "text-white",
        className,
      )}
    >
      <LogoMark className="h-7 w-7 shrink-0" />
      <span className="text-[1.15rem] font-extrabold tracking-[0.16em]">TRIBRIZS</span>
    </span>
  );
}
