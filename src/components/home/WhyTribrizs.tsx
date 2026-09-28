import Image from "next/image";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { images } from "@/lib/images";

const help = [
  {
    title: "Flight options",
    text: "We look at routes, connections and timings that match where and when you want to travel.",
  },
  {
    title: "Travel planning",
    text: "Help shaping the trip itself, from dates and stopovers to how long to allow between flights.",
  },
  {
    title: "Airline selection",
    text: "Plain-language guidance on how different airlines and alliances compare for your route.",
  },
  {
    title: "Flexible itineraries",
    text: "Open-jaw, multi-city or changing plans: we help you find an itinerary that works.",
  },
  {
    title: "Personalized support",
    text: "One conversation with someone who understands what matters to you on this trip.",
  },
];

export function WhyTribrizs() {
  return (
    <section aria-labelledby="why-heading" className="py-20 lg:py-28">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="relative mb-6 self-start sm:mb-10 lg:col-span-5 lg:mb-0">
          <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src={images.airportTraveler.src}
              alt={images.airportTraveler.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              quality={70}
              placeholder="blur"
              className="object-cover"
            />
          </div>
          <div className="absolute -right-3 -bottom-10 hidden w-[46%] border-[6px] border-paper sm:block lg:-right-10">
            <div className="relative aspect-square">
              <Image
                src={images.businessTraveler.src}
                alt={images.businessTraveler.alt}
                fill
                sizes="(min-width: 1024px) 20vw, 45vw"
                quality={70}
                placeholder="blur"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-6">
          <SectionHeading
            id="why-heading"
            eyebrow="Why TRIBRIZS"
            title="Travel Planning, Made Easier"
            description="Searching for flights can mean dozens of open tabs and still not feeling sure. Tell us about your trip and our travel team will help you narrow it down to options that make sense for you."
          />
          <ol className="mt-10 border-t border-line">
            {help.map((item, i) => (
              <li key={item.title} className="grid grid-cols-[2.5rem_1fr] gap-x-3 border-b border-line py-5">
                <span className="pt-0.5 text-sm font-semibold text-coral-600 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-bold text-navy-900">{item.title}</h3>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
