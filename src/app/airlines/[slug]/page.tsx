import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AirlineGrid } from "@/components/airlines/AirlineGrid";
import { AirlineMark } from "@/components/airlines/AirlineMark";
import { LeadForm } from "@/components/home/LeadForm";
import { ArrowLeftIcon, PhoneIcon } from "@/components/ui/Icons";
import { siteConfig } from "@/config/site";
import { airlines, getAirlineBySlug, getRelatedAirlines } from "@/data/airlines";

export const dynamicParams = false;

export function generateStaticParams() {
  return airlines.map((airline) => ({ slug: airline.slug }));
}

export async function generateMetadata({ params }: PageProps<"/airlines/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const airline = getAirlineBySlug(slug);
  if (!airline) return {};

  const title = `${airline.name} Flights & Information`;
  const description = `${airline.shortDescription} Learn about ${airline.name} and get help exploring flight options with TRIBRIZS.`;
  const path = `/airlines/${airline.slug}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | TRIBRIZS`, description, url: path },
    twitter: { title: `${title} | TRIBRIZS`, description },
  };
}

export default async function AirlinePage({ params }: PageProps<"/airlines/[slug]">) {
  const { slug } = await params;
  const airline = getAirlineBySlug(slug);
  if (!airline) notFound();

  const related = getRelatedAirlines(airline);
  const { phone, phoneHref } = siteConfig.contact;

  const facts = [
    { label: "Country", value: airline.country },
    { label: "Main hub", value: airline.hub },
    { label: "Alliance", value: airline.alliance ?? "Not an alliance member" },
  ];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Airlines", item: `${siteConfig.url}/airlines` },
      { "@type": "ListItem", position: 3, name: airline.name, item: `${siteConfig.url}/airlines/${airline.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="border-b border-line bg-white">
        <div className="container-page py-10 lg:py-14">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-muted">
              <li>
                <Link href="/airlines" className="inline-flex items-center gap-1.5 font-medium hover:text-navy-900">
                  <ArrowLeftIcon /> Airlines
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="truncate text-navy-900">
                {airline.name}
              </li>
            </ol>
          </nav>

          <div className="animate-rise mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
            <AirlineMark airline={airline} size="lg" />
            <div>
              <p className="eyebrow">
                {airline.country}
              </p>
              <h1 className="mt-2 text-[2.125rem] leading-[1.1] font-extrabold tracking-[-0.02em] text-navy-900 sm:text-[2.75rem]">
                {airline.name}
              </h1>
              <p className="mt-3 max-w-2xl text-[1.0625rem] leading-relaxed text-muted">{airline.shortDescription}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container-page grid gap-14 py-14 lg:grid-cols-12 lg:gap-16 lg:py-20">
        <div className="lg:col-span-7">
          <section aria-labelledby="about-heading">
            <h2 id="about-heading" className="text-2xl font-bold text-navy-900">
              About {airline.name}
            </h2>
            <div className="mt-4 space-y-4 text-[1.0625rem] leading-relaxed text-muted">
              {airline.description.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>

            <dl className="mt-10 grid border-t border-l border-line bg-white sm:grid-cols-3">
              {facts.map((fact) => (
                <div key={fact.label} className="border-r border-b border-line px-4 py-4">
                  <dt className="text-xs font-bold tracking-[0.1em] text-muted uppercase">{fact.label}</dt>
                  <dd className="mt-1 font-semibold text-navy-900">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="destinations-heading" className="mt-14">
            <h2 id="destinations-heading" className="text-2xl font-bold text-navy-900">
              Popular destinations
            </h2>
            <p className="mt-2 text-muted">A few of the cities served on the {airline.name} network.</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {airline.popularDestinations.map((city) => (
                <li
                  key={city}
                  className="rounded-full border border-line-strong bg-white px-4 py-2 text-[0.9375rem] font-medium text-navy-900"
                >
                  {city}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-muted">
              Routes and schedules change seasonally. An agent can confirm current options for your dates.
            </p>
          </section>
        </div>

        <aside aria-labelledby="flight-form-heading" className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <div id="flight-enquiry" className="scroll-mt-24">
              <LeadForm
                heading={`Flights on ${airline.name}`}
                submitLabel="Ask About Flights"
                preferredAirline={airline.name}
                className="border border-line shadow-none"
              />
            </div>
            {phone && phoneHref && (
              <a
                href={phoneHref}
                className="mt-4 flex items-center justify-center gap-2 text-[0.9375rem] font-semibold text-navy-900 hover:underline"
              >
                <PhoneIcon /> Or call {phone}
              </a>
            )}
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="border-t border-line py-14 lg:py-20">
          <div className="container-page">
            <h2 id="related-heading" className="text-2xl font-bold text-navy-900">
              Other airlines from {airline.country}
            </h2>
            <AirlineGrid airlines={related} className="mt-8" />
          </div>
        </section>
      )}
    </>
  );
}
