import Image from "next/image";

import { ButtonLink } from "@/components/ui/Button";
import { PhoneIcon } from "@/components/ui/Icons";
import { agentHref, siteConfig } from "@/config/site";
import { images } from "@/lib/images";

import { LeadForm } from "./LeadForm";

export function Hero() {
  const { phone } = siteConfig.contact;

  return (
    <section aria-labelledby="hero-heading" className="relative isolate bg-navy-950">
      <Image
        src={images.hero.src}
        alt={images.hero.alt}
        fill
        preload
        sizes="100vw"
        quality={70}
        placeholder="blur"
        className="-z-10 object-cover object-[70%_center] lg:object-center"
      />
      {/* Photographic scrim for legibility — darker on the text side only */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(7,20,39,0.78)_0%,rgba(7,20,39,0.55)_55%,rgba(7,20,39,0.85)_100%)] lg:bg-[linear-gradient(90deg,rgba(7,20,39,0.88)_0%,rgba(7,20,39,0.62)_45%,rgba(7,20,39,0.15)_100%)]"
      />

      <div className="container-page grid gap-10 pt-12 pb-10 sm:pt-16 lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-20 xl:py-24">
        <div className="animate-rise text-white lg:col-span-6 xl:col-span-6">
          <p className="text-[0.8125rem] font-semibold tracking-[0.14em] text-sky-400 uppercase">
            International flights · Travel planning
          </p>
          <h1
            id="hero-heading"
            className="mt-4 max-w-xl text-[2.25rem] leading-[1.08] font-extrabold tracking-[-0.02em] text-balance sm:text-[2.875rem] lg:text-[3.25rem]"
          >
            Your Journey Starts With the Right Flight
          </h1>
          <p className="mt-5 max-w-lg text-[1.0625rem] leading-relaxed text-white/80 sm:text-lg">
            Get personalized help finding international flights and travel options that fit your plans and budget.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={agentHref} variant="light" size="lg">
              {phone && <PhoneIcon />}
              Talk to a Travel Agent
            </ButtonLink>
            <ButtonLink href="#flight-enquiry" variant="ghost-light" size="lg" className="lg:hidden">
              Request a Flight
            </ButtonLink>
          </div>
          <ul className="mt-9 hidden gap-x-6 gap-y-2 text-sm text-white/70 sm:flex sm:flex-wrap">
            <li className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-coral-500" /> Speak with a real person
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-coral-500" /> International flights worldwide
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-coral-500" /> No payment to enquire
            </li>
          </ul>
        </div>

        <div id="flight-enquiry" className="scroll-mt-24 lg:col-span-6 lg:pl-4 xl:col-span-5 xl:col-start-8 xl:pl-0">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
