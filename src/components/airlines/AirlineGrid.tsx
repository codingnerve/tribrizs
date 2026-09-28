import type { Airline } from "@/types/airline";
import { cn } from "@/lib/utils";

import { AirlineCard } from "./AirlineCard";

interface AirlineGridProps {
  airlines: Airline[];
  ctaLabel?: string;
  /** Maximum columns on large screens. */
  columns?: 2 | 3;
  className?: string;
}

/** Directory grid with shared hairline rules instead of separate floating cards. */
export function AirlineGrid({ airlines, ctaLabel, columns = 3, className }: AirlineGridProps) {
  return (
    <ul
      className={cn(
        "grid border-t border-l border-line sm:grid-cols-2",
        columns === 3 && "lg:grid-cols-3",
        className,
      )}
    >
      {airlines.map((airline) => (
        <li key={airline.slug} className="border-r border-b border-line">
          <AirlineCard airline={airline} ctaLabel={ctaLabel} />
        </li>
      ))}
    </ul>
  );
}
