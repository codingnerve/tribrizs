import type { ReactNode } from "react";

import { ClockIcon, MailIcon, PhoneIcon } from "@/components/ui/Icons";
import { siteConfig } from "@/config/site";

function Row({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <li className="flex gap-4 border-b border-line py-5 first:pt-0">
      <span className="mt-0.5 text-xl text-coral-600">{icon}</span>
      <div>
        <p className="text-xs font-bold tracking-[0.12em] text-muted uppercase">{label}</p>
        <div className="mt-1 text-[1.0625rem] font-semibold text-navy-900">{children}</div>
      </div>
    </li>
  );
}

export function ContactInfo() {
  const { phone, phoneHref, email, hours } = siteConfig.contact;
  const hasDirectContact = Boolean(phone || email);

  return (
    <div>
      <h2 className="text-xl font-bold text-navy-900">Get in touch</h2>
      <p className="mt-3 leading-relaxed text-muted">
        Share as much or as little as you know about your trip. An agent will get back to you to talk
        through flight options — there is no obligation and no payment to enquire.
      </p>

      <ul className="mt-8">
        {phone && phoneHref && (
          <Row icon={<PhoneIcon />} label="Phone">
            <a href={phoneHref} className="hover:underline">
              {phone}
            </a>
          </Row>
        )}
        {email && (
          <Row icon={<MailIcon />} label="Email">
            <a href={`mailto:${email}`} className="break-all hover:underline">
              {email}
            </a>
          </Row>
        )}
        {hours && (
          <Row icon={<ClockIcon />} label="Business hours">
            <span className="font-medium">{hours}</span>
          </Row>
        )}
        {!hasDirectContact && (
          <Row icon={<MailIcon />} label="Enquiries">
            <span className="font-medium">Use the form and an agent will contact you directly.</span>
          </Row>
        )}
      </ul>

      <div className="mt-8 border-l-2 border-sky-500 bg-sky-100/60 px-5 py-4 text-[0.9375rem] leading-relaxed text-navy-800">
        <p className="font-semibold">What happens next?</p>
        <p className="mt-1 text-navy-800/80">
          We review your enquiry and contact you by phone or email to discuss available options. Nothing
          is booked without your confirmation.
        </p>
      </div>

      <div className="mt-6 rounded-xl border border-line bg-surface p-5 text-sm">
        <p className="text-xs font-bold tracking-[0.12em] text-muted uppercase">Operating Entity</p>
        <p className="mt-2 font-bold text-navy-950">{siteConfig.company.legalName}</p>
        <p className="text-muted">Attn: {siteConfig.company.attention}</p>
        <p className="text-muted">{siteConfig.company.country}</p>
      </div>
    </div>
  );
}
