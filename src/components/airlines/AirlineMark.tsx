import Image from "next/image";

import type { Airline } from "@/types/airline";
import { cn } from "@/lib/utils";

interface AirlineMarkProps {
  airline: Pick<Airline, "name" | "iata" | "logo" | "brandColor">;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: { box: "h-11 w-11", text: "text-[0.9375rem]", px: 44 },
  md: { box: "h-14 w-14", text: "text-lg", px: 56 },
  lg: { box: "h-20 w-20 sm:h-24 sm:w-24", text: "text-2xl sm:text-3xl", px: 96 },
};

/**
 * Shows an approved airline logo when one is provided in the data, otherwise a
 * neutral IATA-code tile. The tile deliberately doesn't imitate airline branding.
 */
export function AirlineMark({ airline, size = "md", className }: AirlineMarkProps) {
  const s = sizes[size];

  if (airline.logo) {
    return (
      <span className={cn("relative flex shrink-0 items-center justify-center bg-white p-1.5", s.box, className)}>
        <Image src={airline.logo} alt={`${airline.name} logo`} width={s.px} height={s.px} className="h-full w-full object-contain" />
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-[var(--radius-sm)] border border-line bg-white font-extrabold tracking-wide text-navy-900",
        s.box,
        s.text,
        className,
      )}
    >
      {airline.iata}
      <span className="absolute inset-x-0 bottom-0 h-1" style={{ backgroundColor: airline.brandColor }} />
    </span>
  );
}
