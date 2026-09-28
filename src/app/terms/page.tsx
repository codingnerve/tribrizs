import type { Metadata } from "next";

import { LegalPage } from "@/components/layout/LegalPage";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms that apply to using the TRIBRIZS website and travel enquiry service.",
  alternates: { canonical: "/terms" },
};

// Baseline terms. Have them reviewed by counsel before launch.
export default function TermsPage() {
  const { legalName, attention, country } = siteConfig.company;
  const { email } = siteConfig.contact;

  return (
    <LegalPage title="Terms & Conditions" updated="September 2026">
      <p>
        By using the {siteConfig.name} website, operated by <strong>{legalName}</strong> (&ldquo;Company&rdquo;,
        &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), you agree to these terms. Please
        read them alongside our Privacy Policy.
      </p>

      <h2>Our service</h2>
      <p>
        {siteConfig.name} provides travel enquiry and assistance services. Submitting an enquiry on this website
        does not create a booking, reserve a seat or guarantee a fare. An agent will contact you to discuss
        available options.
      </p>

      <h2>Bookings</h2>
      <p>
        Any booking made following an enquiry is subject to confirmation, availability and the terms and
        conditions of the airline or travel supplier concerned, which will be provided to you before you
        commit.
      </p>

      <h2>Airline information</h2>
      <p>
        Airline information on this website is provided for general reference and may change without
        notice. {siteConfig.name} is not an airline and is not affiliated with or endorsed by the airlines
        mentioned. Airline names and marks belong to their respective owners.
      </p>

      <h2>Use of this website</h2>
      <p>
        You agree to provide accurate information when submitting an enquiry and not to misuse the
        website or its forms.
      </p>

      <h2>Liability</h2>
      <p>
        We take care to keep the information on this website accurate, but we cannot guarantee it is
        complete or current. To the extent permitted by law, we are not liable for losses arising from
        reliance on it.
      </p>

      <h2>Contact &amp; notices</h2>
      <p>For legal notices or questions regarding these terms, please contact:</p>
      <div className="rounded-xl border border-line bg-surface p-5 text-sm leading-relaxed text-navy-900">
        <p className="font-bold text-base text-navy-950">{legalName}</p>
        <p className="text-muted">Attn: {attention}</p>
        <p className="text-muted">{country}</p>
        {email && (
          <p className="mt-2">
            Email:{" "}
            <a href={`mailto:${email}`} className="font-semibold text-navy-900 underline">
              {email}
            </a>
          </p>
        )}
      </div>

      <h2>Changes</h2>
      <p>We may update these terms from time to time. The date at the top shows when they were last revised.</p>
    </LegalPage>
  );
}
