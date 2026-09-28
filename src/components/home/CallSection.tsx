import Image from "next/image";

import { ButtonLink } from "@/components/ui/Button";
import { CheckIcon, ClockIcon, PhoneIcon } from "@/components/ui/Icons";
import { siteConfig } from "@/config/site";
import { images } from "@/lib/images";

const callTopics = [
  "Comparing routes, connections and travel times",
  "Questions about airlines, baggage and ticket types",
  "Planning trips with several stops or travelers",
];

/** Phone-first conversion block for visitors who would rather talk than type. */
export function CallSection() {
  const { phone, phoneHref, hours } = siteConfig.contact;

  return (
    <section aria-labelledby="call-heading" className="bg-sand">
      <div className="container-page grid items-center gap-10 py-16 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div className="relative lg:order-2 lg:col-span-6">
          <div className="relative aspect-[4/3] overflow-hidden lg:aspect-[5/4]">
            <Image
              src={images.travelAgent.src}
              alt={images.travelAgent.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              quality={70}
              placeholder="blur"
              className="object-cover object-[72%_center]"
            />
          </div>
          <p className="absolute bottom-4 left-4 inline-flex items-center gap-2 bg-white px-4 py-2.5 text-sm font-semibold text-navy-900 shadow-[0_10px_30px_-12px_rgba(7,20,39,0.45)] sm:bottom-6 sm:left-6">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            Real people, ready to help
          </p>
        </div>

        <div className="lg:order-1 lg:col-span-6">
          <p className="eyebrow">Talk to a specialist</p>
          <h2
            id="call-heading"
            className="mt-3 text-[1.75rem] leading-[1.15] font-bold tracking-[-0.015em] text-balance text-navy-900 sm:text-[2.125rem]"
          >
            Prefer to Talk It Through? Speak With a Travel Specialist
          </h2>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted">
            Some trips are easier to sort out in a conversation. Our travel team can answer your
            questions and walk you through the flight options that fit your plans.
          </p>

          <ul className="mt-7 space-y-3">
            {callTopics.map((topic) => (
              <li key={topic} className="flex items-start gap-3 text-[0.9375rem] text-navy-900">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy-900 text-[0.7rem] text-white">
                  <CheckIcon strokeWidth={2.5} />
                </span>
                {topic}
              </li>
            ))}
          </ul>

          {phone && phoneHref ? (
            <div className="mt-9 flex flex-col gap-5 border-t border-line-strong pt-7 sm:flex-row sm:items-center sm:gap-8">
              <a href={phoneHref} className="group flex items-center gap-4">
                <span className="flex h-13 w-13 items-center justify-center rounded-full bg-coral-500 text-xl text-white transition-colors group-hover:bg-coral-600">
                  <PhoneIcon />
                </span>
                <span>
                  <span className="block text-xs font-bold tracking-[0.12em] text-muted uppercase">Call us</span>
                  <span className="block text-2xl font-extrabold tracking-tight text-navy-900 group-hover:underline sm:text-[1.75rem]">
                    {phone}
                  </span>
                </span>
              </a>
              {hours && (
                <p className="flex items-center gap-2 text-sm text-muted">
                  <ClockIcon className="text-base" /> {hours}
                </p>
              )}
            </div>
          ) : (
            <div className="mt-9 flex flex-col gap-3 border-t border-line-strong pt-7 sm:flex-row">
              <ButtonLink href="/contact" size="lg">
                <PhoneIcon /> Request a Call Back
              </ButtonLink>
              <ButtonLink href="#flight-enquiry" variant="outline" size="lg">
                Send a Flight Enquiry
              </ButtonLink>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
