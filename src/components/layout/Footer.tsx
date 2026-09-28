import Link from "next/link";
import type { ReactNode } from "react";

import { Logo } from "@/components/brand/Logo";
import { mainNav, siteConfig } from "@/config/site";

const services = [
  { label: "Flight Assistance", href: "/#flight-enquiry" },
  { label: "Travel Planning", href: "/contact" },
  { label: "Airline Information", href: "/airlines" },
];

const legal = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="text-xs font-bold tracking-[0.14em] text-white/50 uppercase">{title}</h2>
      <ul className="mt-4 space-y-3 text-[0.9375rem]">{children}</ul>
    </div>
  );
}

const linkClass = "text-white/80 transition-colors hover:text-white";

export function Footer() {
  const { phone, phoneHref, email, hours } = siteConfig.contact;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-white">
      <div className="container-page grid gap-12 pt-16 pb-12 md:grid-cols-12 md:gap-8 lg:pt-20">
        <div className="md:col-span-5 lg:col-span-4">
          <Link href="/" aria-label="TRIBRIZS home" className="inline-block">
            <Logo tone="light" />
          </Link>
          <p className="mt-5 max-w-sm leading-relaxed text-white/65">
            TRIBRIZS is an independent travel assistance service. Tell us where you&apos;d like to go and
            our travel team will help you explore international flight options that suit your plans.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-7 lg:col-span-8 lg:grid-cols-4">
          <FooterColumn title="Navigation">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </FooterColumn>
          <FooterColumn title="Services">
            {services.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </FooterColumn>
          <FooterColumn title="Contact">
            {phone && phoneHref && (
              <li>
                <a href={phoneHref} className={linkClass}>
                  {phone}
                </a>
              </li>
            )}
            {email && (
              <li>
                <a href={`mailto:${email}`} className={`${linkClass} break-all`}>
                  {email}
                </a>
              </li>
            )}
            {hours && <li className="text-white/60">{hours}</li>}
            <li>
              <Link href="/contact" className={linkClass}>
                Send an enquiry
              </Link>
            </li>
          </FooterColumn>
          <FooterColumn title="Legal">
            {legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </FooterColumn>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-6 text-[0.8125rem] leading-relaxed text-white/50 md:flex-row md:justify-between md:gap-10">
          <p className="shrink-0">© {year} {siteConfig.company.legalName}. All rights reserved.</p>
          <p className="max-w-2xl md:text-right">
            {siteConfig.name} is operated by {siteConfig.company.legalName}. {siteConfig.name} provides
            travel enquiry and assistance services and is not an airline. Airline names are trademarks
            of their respective owners and are used for identification only; no affiliation or endorsement
            is implied. Fares and availability are confirmed by an agent and are subject to airline terms.
          </p>
        </div>
      </div>
    </footer>
  );
}
