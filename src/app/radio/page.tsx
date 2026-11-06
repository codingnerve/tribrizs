import type { Metadata } from "next";

import { PageHero } from "@/components/layout/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { CheckIcon, PhoneIcon } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { images } from "@/lib/images";

const title = "In-Car Satellite Radio Help";
const description =
  "Independent help with in-car satellite radio: activation, signal drops, missing channels and subscription questions. Call us and we'll point you to the next step.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/radio" },
  openGraph: { title: `${title} | TRIBRIZS`, description, url: "/radio" },
  twitter: { title: `${title} | TRIBRIZS`, description },
};

const { phone, phoneHref } = siteConfig.contact;

const services = [
  {
    title: "Radio activation",
    text: "A new or second-hand car, or a radio that has never been switched on. We explain what the receiver needs before it can play.",
  },
  {
    title: "Signal & reception",
    text: "\"Acquiring signal\" that never clears, or audio that drops under bridges and in built-up areas. We help you rule out the usual causes.",
  },
  {
    title: "Missing channels",
    text: "Channels that vanished after a trial ended, or a lineup that looks smaller than it should. We help you work out why.",
  },
  {
    title: "Subscription questions",
    text: "Renewal messages, plan changes and unexpected on-screen notices explained in plain English.",
  },
];

const steps = [
  {
    title: "Give us a call",
    text: "Mention the message on the screen and anything you've already tried.",
  },
  {
    title: "We listen and ask questions",
    text: "A member of the team talks through what you're seeing and what the radio is doing.",
  },
  {
    title: "We work through the next step",
    text: "We walk you through what to check, and who to contact if the fix needs your provider or dealer.",
  },
];

const issues = [
  {
    title: "\"Acquiring signal\" stays on screen",
    text: "Often down to antenna placement, parking location or a receiver that has not been activated.",
  },
  {
    title: "A subscription message replaces the music",
    text: "Usually a lapsed trial or plan. It helps to know the exact wording on the display.",
  },
  {
    title: "Channels disappear after a trial",
    text: "A trial ending can remove part of the lineup even though the radio itself still works.",
  },
  {
    title: "Audio cuts out in certain places",
    text: "Tunnels, garages and tall buildings block the signal. A drop in the same spot every time is a clue.",
  },
  {
    title: "Second-hand car, unknown account",
    text: "Radios can stay linked to a previous owner's account. We explain how to find out what applies to yours.",
  },
  {
    title: "Radio works at home but not in the car",
    text: "Points to the vehicle receiver or antenna rather than your account.",
  },
];

const commitments = [
  "We are independent and are not affiliated with any satellite radio provider or car manufacturer.",
  "We never ask for card numbers or passwords. Please don't share them on a call.",
  "You speak to a real person, not a menu of recordings.",
  "You get plain-English next steps, not jargon.",
  "We only use what you tell us to answer your question.",
];

const wontDo = [
  "Activate your radio for you",
  "Change or cancel your subscription",
  "Repair hardware remotely",
  "Promise a particular outcome",
];

const faqs = [
  {
    q: "Are you a satellite radio provider?",
    a: "No. We are an independent assistance service. We are not affiliated with any satellite radio provider or vehicle manufacturer, and we cannot change your account.",
  },
  {
    q: "What can you actually help with?",
    a: "We help you understand what you're seeing and what to try next, whether that is activation, a weak signal, missing channels or a subscription message. If the fix needs your provider or dealer, we tell you so.",
  },
  {
    q: "Does it cost anything to call?",
    a: "No. Calling us doesn't commit you to anything.",
  },
  {
    q: "What should I have ready when I call?",
    a: "Your car's make and model, the radio or provider if you know it, the exact message on the screen, and what you've already tried. Never share card numbers or passwords.",
  },
  {
    q: "What does \"acquiring signal\" mean?",
    a: "The receiver is still searching for the satellite signal. It can happen because of where you're parked, an antenna problem, or a radio that isn't activated.",
  },
  {
    q: "Why did my channels disappear?",
    a: "The most common reason is a trial or plan ending, which can remove channels from the lineup. A receiver that has lost its activation can do the same.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function RadioPage() {
  return (
    <>
      <PageHero
        eyebrow="Satellite radio help"
        title="Get your car's satellite radio sorted, with straight answers."
        description="Activation trouble, signal drops, missing channels or a confusing renewal? Call us and we'll help you work out the next step."
        image={images.travelAgent}
      >
        {phone && phoneHref && (
          <div className="mt-8">
            <ButtonLink href={phoneHref} size="lg">
              <PhoneIcon /> Call {phone}
            </ButtonLink>
          </div>
        )}
        <ul className="mt-8 space-y-2 text-[0.9375rem] text-navy-900">
          {[
            "Independent, not a satellite radio provider",
            "Talk to a real person by phone",
            "We never ask for card numbers or passwords",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <CheckIcon className="mt-1 shrink-0 text-coral-600" /> {item}
            </li>
          ))}
        </ul>
      </PageHero>

      <section id="services" aria-labelledby="services-heading" className="py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            id="services-heading"
            eyebrow="How we can help"
            title="Four things drivers ask us about most"
          />
          <ul className="mt-10 grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <li key={s.title} className="border-r border-b border-line bg-white p-6">
                <span className="text-sm font-semibold text-coral-600 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-lg font-bold text-navy-900">{s.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{s.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="how-it-works" aria-labelledby="how-heading" className="bg-navy-950 py-20 text-white lg:py-28">
        <div className="container-page">
          <SectionHeading id="how-heading" tone="light" eyebrow="How support works" title="Three simple steps" />
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="border-t border-white/25 pt-5">
                <span className="text-sm font-semibold text-sky-400 tabular-nums">Step {i + 1}</span>
                <h3 className="mt-2 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-white/75">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="issues-heading" className="py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            id="issues-heading"
            eyebrow="Common radio issues"
            title="Does any of this sound familiar?"
            description="These are the situations we hear about most. If yours isn't here, call us anyway."
          />
          <ul className="mt-10 grid gap-x-12 border-t border-line md:grid-cols-2">
            {issues.map((issue) => (
              <li key={issue.title} className="border-b border-line py-5">
                <h3 className="font-bold text-navy-900">{issue.title}</h3>
                <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{issue.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="why-radio-heading" className="border-y border-line bg-white py-20 lg:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading id="why-radio-heading" eyebrow="Our promise" title="Independent, plain-spoken and careful with your data" />
            <ul className="mt-8 space-y-3">
              {commitments.map((c) => (
                <li key={c} className="flex items-start gap-3 leading-relaxed text-navy-900">
                  <CheckIcon className="mt-1 shrink-0 text-coral-600" /> {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <h3 className="text-xl font-bold text-navy-900">What we don&apos;t do</h3>
            <p className="mt-2 text-muted">So you know what to expect before you get in touch. We won&apos;t:</p>
            <ul className="mt-5 divide-y divide-line border-y border-line">
              {wontDo.map((item) => (
                <li key={item} className="py-3 text-navy-900">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="radio-faq-heading" className="py-20 lg:py-28">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading id="radio-faq-heading" eyebrow="Troubleshooting FAQ" title="Quick answers" />
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

      <section aria-labelledby="radio-cta-heading" className="bg-navy-950">
        <div className="container-page py-20 text-white lg:py-24">
          <div className="max-w-xl">
            <h2 id="radio-cta-heading" className="text-[1.875rem] leading-[1.12] font-bold tracking-[-0.015em] text-balance sm:text-[2.25rem]">
              Ready for straight answers?
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-white/80">
              Tell us what your radio is doing and we&apos;ll help you find the next step.
            </p>
            {phone && phoneHref && (
              <div className="mt-8">
                <ButtonLink href={phoneHref} size="lg">
                  <PhoneIcon /> Call {phone}
                </ButtonLink>
              </div>
            )}
            <p className="mt-8 text-sm leading-relaxed text-white/60">
              TRIBRIZS is an independent assistance service and is not a satellite radio provider. It is not affiliated with
              any provider or vehicle manufacturer.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
