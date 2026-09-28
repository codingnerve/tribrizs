import Link from "next/link";

import { SectionHeading } from "@/components/ui/SectionHeading";

const faqs = [
  {
    q: "Is TRIBRIZS an airline?",
    a: "No. TRIBRIZS is an independent travel assistance service. We help you explore flight options across different airlines and are not affiliated with any of them.",
  },
  {
    q: "What kind of flights do you help with?",
    a: "We specialize in international travel: long-haul, overseas and multi-country trips across Europe, the Middle East, Asia, the Americas and beyond.",
  },
  {
    q: "Does it cost anything to send an enquiry?",
    a: "No. Sending an enquiry is free and doesn't commit you to anything.",
  },
  {
    q: "Is my flight booked when I submit the form?",
    a: "No. The form sends an enquiry only. An agent will contact you to discuss available options, and nothing is booked or charged without your confirmation.",
  },
  {
    q: "How will an agent contact me?",
    a: "We'll reach you by phone or email using the details you provide. You can also reach our travel assistance team directly by calling +1 (877) 370-5969.",
  },
  {
    q: "Can I call and speak to an agent directly?",
    a: "Yes! You can call our toll-free number +1 (877) 370-5969 to speak directly with an experienced travel specialist.",
  },
  {
    q: "Can you help with multi-city or group trips?",
    a: "Yes. Choose multi-city in the flight form, or use the contact form to describe your route and group size, and an agent will follow up.",
  },
  {
    q: "Which airlines can you help with?",
    a: "We can help you look at options across many airlines. Our airline directory covers major U.S. and U.K. carriers; just ask if the one you want isn't listed.",
  },
];

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

/** Native <details> accordion: keyboard accessible and works without JavaScript. */
export function FAQ() {
  return (
    <section aria-labelledby="faq-heading" className="py-20 lg:py-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading id="faq-heading" eyebrow="FAQ" title="Common Questions" />
          <p className="mt-4 leading-relaxed text-muted">
            Can&apos;t find what you&apos;re looking for?{" "}
            <Link
              href="/contact"
              className="font-semibold text-navy-900 underline decoration-navy-900/30 underline-offset-4 hover:decoration-navy-900"
            >
              Contact our team
            </Link>
            .
          </p>
        </div>

        <div className="border-t border-line lg:col-span-8">
          {faqs.map(({ q, a }) => (
            <details key={q} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-[1.0625rem] font-semibold text-navy-900 marker:hidden hover:text-navy-700 [&::-webkit-details-marker]:hidden">
                {q}
                <span
                  aria-hidden="true"
                  className="relative h-4 w-4 shrink-0 before:absolute before:top-1/2 before:left-0 before:h-0.5 before:w-4 before:-translate-y-1/2 before:bg-coral-600 after:absolute after:top-0 after:left-1/2 after:h-4 after:w-0.5 after:-translate-x-1/2 after:bg-coral-600 after:transition-transform group-open:after:scale-y-0"
                />
              </summary>
              <p className="max-w-2xl pb-6 leading-relaxed text-muted">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
