import Link from "next/link";

import { ArrowRightIcon } from "@/components/ui/Icons";
import type { Airline } from "@/types/airline";
import { cn } from "@/lib/utils";

import { AirlineMark } from "./AirlineMark";

interface AirlineCardProps {
  airline: Airline;
  /** "Learn More" on the homepage preview, "View Airline" in the directory. */
  ctaLabel?: string;
  headingLevel?: "h3" | "h2";
  className?: string;
}

/**
 * Directory entry. Rendered inside a hairline grid (see AirlineGrid), so it has
 * no card chrome of its own — the whole cell is one link target.
 */
export function AirlineCard({ airline, ctaLabel = "View Airline", headingLevel: Heading = "h3", className }: AirlineCardProps) {
  return (
    <article className={cn("group relative flex h-full flex-col bg-white p-6 transition-colors hover:bg-[#fcfbf8] sm:p-7", className)}>
      <div className="flex items-start justify-between gap-4">
        <AirlineMark airline={airline} />
        <p className="pt-1 text-right text-xs leading-5 font-semibold tracking-[0.08em] text-muted uppercase">
          {airline.country}
        </p>
      </div>
      <Heading className="mt-6 text-lg font-bold text-navy-900">
        <Link href={`/airlines/${airline.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
          {airline.name}
        </Link>
      </Heading>
      <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-muted">{airline.shortDescription}</p>
      <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-line pt-4 text-[0.8125rem]">
        <div>
          <dt className="text-muted">Main hub</dt>
          <dd className="mt-0.5 font-semibold text-navy-900">{airline.hub}</dd>
        </div>
        <div>
          <dt className="text-muted">Alliance</dt>
          <dd className="mt-0.5 font-semibold text-navy-900">{airline.alliance ?? "Independent"}</dd>
        </div>
      </dl>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900">
        {ctaLabel}
        <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-1" />
      </span>
      {/* Focus ring for the stretched link */}
      <span className="pointer-events-none absolute inset-0 ring-sky-500 ring-inset group-has-[a:focus-visible]:ring-2" />
    </article>
  );
}
