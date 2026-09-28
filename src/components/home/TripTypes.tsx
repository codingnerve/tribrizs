import Image from "next/image";

import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images, type SiteImage } from "@/lib/images";

const trips: { title: string; text: string; image: SiteImage }[] = [
  {
    title: "Family trips",
    text: "Flights and timings that work for the whole family, including travel with young children.",
    image: images.familyTravel,
  },
  {
    title: "Business travel",
    text: "Schedules planned around your meetings, with help understanding ticket flexibility.",
    image: images.businessTraveler,
  },
  {
    title: "Multi-city & long-haul",
    text: "Routes with stopovers, open-jaw itineraries and connections across different airlines.",
    image: images.windowView,
  },
  {
    title: "Groups & special occasions",
    text: "Weddings, reunions, tours or team travel: help coordinating flights for larger groups.",
    image: images.international,
  },
];

export function TripTypes() {
  return (
    <section aria-labelledby="trips-heading" className="border-y border-line bg-white py-20 lg:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              id="trips-heading"
              eyebrow="Trips we help with"
              title="Every Kind of Journey"
              description="Whether it's a single long-haul flight or an overseas trip with several stops, share what you're planning and we'll help you work through the options."
            />
            <ButtonLink href="#flight-enquiry" variant="secondary" className="mt-8">
              Start an Enquiry
            </ButtonLink>
          </div>
        </div>

        <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:col-span-8">
          {trips.map((trip, i) => (
            <li key={trip.title} className={i % 2 === 1 ? "sm:mt-16" : undefined}>
              <div className="group relative aspect-[4/3] overflow-hidden">
                <Image
                  src={trip.image.src}
                  alt={trip.image.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                  quality={70}
                  placeholder="blur"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <h3 className="mt-5 text-lg font-bold text-navy-900">{trip.title}</h3>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{trip.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
