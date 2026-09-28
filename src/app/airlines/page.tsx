import type { Metadata } from "next";

import { AirlineDirectory } from "@/components/airlines/AirlineDirectory";
import { PageHero } from "@/components/layout/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { agentHref } from "@/config/site";
import { images } from "@/lib/images";

const title = "Airline Directory";
const description =
  "Explore major U.S. and U.K. airlines, including American Airlines, Delta, United, British Airways and Virgin Atlantic, and get help finding international flights with TRIBRIZS.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/airlines" },
  openGraph: { title: `${title} | TRIBRIZS`, description, url: "/airlines" },
  twitter: { title: `${title} | TRIBRIZS`, description },
};

export default function AirlinesPage() {
  return (
    <>
      <PageHero
        eyebrow="Airlines"
        title="Airlines We Can Help You Explore"
        description="Explore major U.S. and U.K. airlines and the international destinations they serve."
        image={images.aircraftTerminal}
      />

      <section aria-label="Airline directory" className="py-14 lg:py-20">
        <div className="container-page">
          <AirlineDirectory />
        </div>
      </section>

      <section aria-labelledby="airlines-help" className="border-t border-line bg-white">
        <div className="container-page flex flex-col gap-6 py-14 md:flex-row md:items-center md:justify-between lg:py-16">
          <div className="max-w-xl">
            <h2 id="airlines-help" className="text-2xl font-bold text-navy-900">
              Not sure which airline suits your trip?
            </h2>
            <p className="mt-2 leading-relaxed text-muted">
              Tell us your route and dates and an agent can talk you through the options available.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/#flight-enquiry" size="lg">
              Request a Flight
            </ButtonLink>
            <ButtonLink href={agentHref} variant="outline" size="lg">
              Talk to an Agent
            </ButtonLink>
          </div>
        </div>
      </section>

      <p className="container-page pb-10 text-xs leading-relaxed text-muted">
        Airline information is provided for general reference and may change. TRIBRIZS is not affiliated
        with the airlines listed.
      </p>
    </>
  );
}
