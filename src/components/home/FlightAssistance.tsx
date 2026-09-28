import Image from "next/image";

import { ButtonLink } from "@/components/ui/Button";
import { images } from "@/lib/images";

const steps = [
  { title: "Share your plans", text: "Tell us your route, dates and who is travelling." },
  { title: "Talk it through", text: "An agent contacts you to discuss suitable options." },
  { title: "Decide with confidence", text: "Nothing is booked until you are happy to go ahead." },
];

export function FlightAssistance() {
  return (
    <section aria-labelledby="assist-heading" className="bg-navy-900 text-white">
      <div className="grid lg:grid-cols-2">
        <div className="relative aspect-[16/10] lg:order-2 lg:aspect-auto lg:min-h-[36rem]">
          <Image
            src={images.aircraftAtGate.src}
            alt={images.aircraftAtGate.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            quality={70}
            placeholder="blur"
            className="object-cover"
          />
        </div>

        <div className="flex items-center px-5 py-16 sm:px-8 lg:order-1 lg:py-24 lg:pr-16 lg:pl-[max(2rem,calc((100vw-76rem)/2+2rem))]">
          <div className="max-w-xl">
            <p className="eyebrow text-sky-400">Flight assistance</p>
            <h2
              id="assist-heading"
              className="mt-3 text-[1.75rem] leading-[1.15] font-bold tracking-[-0.015em] sm:text-[2.125rem]"
            >
              Looking for the Right Flight?
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-white/75">
              Tell us where you&apos;re going and when you plan to travel. Our travel team can help you
              explore suitable flight options.
            </p>

            <ol className="mt-10 space-y-6">
              {steps.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/25 text-sm font-semibold text-sky-400">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="mt-0.5 text-[0.9375rem] text-white/65">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <ButtonLink href="#flight-enquiry" size="lg" className="mt-10">
              Request Flight Assistance
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
