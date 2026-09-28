import Link from "next/link";

import { AirlineGrid } from "@/components/airlines/AirlineGrid";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFeaturedAirlines } from "@/data/airlines";

export function AirlinePreview() {
  return (
    <section aria-labelledby="airlines-heading" className="py-20 lg:py-28">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="airlines-heading"
            eyebrow="Airlines"
            title="Explore Popular Airlines"
            description="Major U.S. and U.K. airlines with international networks. We can help you look at flights on these and many other carriers."
          />
          <Link
            href="/airlines"
            className="group inline-flex shrink-0 items-center gap-1.5 font-semibold text-navy-900 underline decoration-navy-900/25 underline-offset-4 hover:decoration-navy-900"
          >
            View all airlines
            <ArrowRightIcon className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <AirlineGrid airlines={getFeaturedAirlines()} ctaLabel="Learn More" className="mt-12" />
      </div>
    </section>
  );
}
