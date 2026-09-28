"use client";

import Image from "next/image";

import { ArrowRightIcon } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { requestDestination } from "@/lib/enquiry/events";
import { destinationImages, type SiteImage } from "@/lib/images";
import { cn } from "@/lib/utils";

interface Destination {
  city: string;
  country: string;
  image: SiteImage;
  /** Wide tiles have room for a text label; narrow ones show an arrow only. */
  wide?: boolean;
  /** Grid placement on large screens (4-column, 3-row mosaic). */
  layout: string;
}

const destinations: Destination[] = [
  { city: "Paris", country: "France", image: destinationImages.paris, wide: true, layout: "col-span-2 lg:row-span-2" },
  { city: "London", country: "United Kingdom", image: destinationImages.london, layout: "" },
  { city: "Dubai", country: "United Arab Emirates", image: destinationImages.dubai, layout: "lg:row-span-2" },
  { city: "Tokyo", country: "Japan", image: destinationImages.tokyo, layout: "" },
  { city: "Rome", country: "Italy", image: destinationImages.rome, wide: true, layout: "lg:col-span-2" },
  { city: "Bali", country: "Indonesia", image: destinationImages.bali, wide: true, layout: "col-span-2" },
];

export function PopularDestinations() {
  return (
    <section aria-labelledby="destinations-heading" className="pb-20 lg:pb-28">
      <div className="container-page">
        <SectionHeading
          id="destinations-heading"
          eyebrow="Popular destinations"
          title="Where Would You Like to Go?"
          description="A few of the places travelers often ask us about. Choose one to start your enquiry, or tell us anywhere else you have in mind."
        />

        <ul className="mt-12 grid auto-rows-[11rem] grid-cols-2 gap-3 sm:auto-rows-[14rem] lg:grid-cols-4 lg:gap-4">
          {destinations.map((d, i) => (
            <li key={d.city} className={cn("relative", d.layout)}>
              <a
                href="#flight-enquiry"
                onClick={() => requestDestination(d.city)}
                aria-label={`Ask about flights to ${d.city}, ${d.country}`}
                className="group relative block h-full overflow-hidden bg-navy-900 focus-visible:outline-offset-4"
              >
                <Image
                  src={d.image.src}
                  alt={d.image.alt}
                  fill
                  sizes={i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                  quality={70}
                  placeholder="blur"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,20,39,0)_40%,rgba(7,20,39,0.78)_100%)]"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-white sm:p-5">
                  <div>
                    <p className={cn("font-bold", i === 0 ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl")}>{d.city}</p>
                    <p className="text-[0.8125rem] text-white/75">{d.country}</p>
                  </div>
                  {d.wide && (
                    <span className="hidden items-center gap-1.5 text-sm font-semibold whitespace-nowrap opacity-90 transition-opacity group-hover:opacity-100 sm:inline-flex">
                      Ask about flights
                      <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
                    </span>
                  )}
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/40 transition-colors group-hover:border-white group-hover:bg-white group-hover:text-navy-900",
                      d.wide && "sm:hidden",
                    )}
                  >
                    <ArrowRightIcon />
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
