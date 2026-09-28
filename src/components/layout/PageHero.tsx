import Image from "next/image";
import type { ReactNode } from "react";

import type { SiteImage } from "@/lib/images";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: ReactNode;
  image: SiteImage;
  children?: ReactNode;
}

/** Inner-page hero: shorter than the homepage, text on the left, photo on the right. */
export function PageHero({ eyebrow, title, description, image, children }: PageHeroProps) {
  return (
    <section className="border-b border-line bg-white">
      <div className="container-page grid items-center gap-10 py-12 md:grid-cols-12 md:py-16 lg:py-20">
        <div className="animate-rise md:col-span-7 lg:col-span-6">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-3 text-[2.125rem] leading-[1.1] font-extrabold tracking-[-0.02em] text-balance text-navy-900 sm:text-[2.625rem] lg:text-[3rem]">
            {title}
          </h1>
          <p className="mt-5 max-w-lg text-[1.0625rem] leading-relaxed text-muted sm:text-lg">{description}</p>
          {children}
        </div>
        <div className="relative hidden aspect-[4/3] md:col-span-5 md:block lg:col-span-5 lg:col-start-8">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            preload
            sizes="(min-width: 768px) 40vw, 0px"
            quality={70}
            placeholder="blur"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
