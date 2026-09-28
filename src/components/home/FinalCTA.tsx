import Image from "next/image";

import { ButtonLink } from "@/components/ui/Button";
import { agentHref } from "@/config/site";
import { images } from "@/lib/images";

export function FinalCTA() {
  return (
    <section aria-labelledby="cta-heading" className="relative isolate overflow-hidden bg-navy-950">
      <Image
        src={images.familyTravel.src}
        alt=""
        fill
        sizes="100vw"
        quality={70}
        placeholder="blur"
        className="-z-10 object-cover object-[center_60%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,20,39,0.85)_0%,rgba(7,20,39,0.55)_60%,rgba(7,20,39,0.25)_100%)]"
      />
      <div className="container-page py-24 text-white lg:py-32">
        <div className="max-w-xl">
          <h2
            id="cta-heading"
            className="text-[1.875rem] leading-[1.12] font-bold tracking-[-0.015em] text-balance sm:text-[2.5rem]"
          >
            Ready to Plan Your Next Trip?
          </h2>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-white/80 sm:text-lg">
            Tell us your travel plans and let our team help you explore your options.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={agentHref} size="lg">
              Talk to an Agent
            </ButtonLink>
            <ButtonLink href="/contact" variant="ghost-light" size="lg">
              Contact Us
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
