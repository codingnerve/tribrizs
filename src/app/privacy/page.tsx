import type { Metadata } from "next";

import { LegalPage } from "@/components/layout/LegalPage";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How TRIBRIZS collects and uses the information you share when you send a travel enquiry.",
  alternates: { canonical: "/privacy" },
};

// Baseline policy for a lead-generation site. Have it reviewed against the
// jurisdictions you advertise in (e.g. GDPR, CCPA) before launch.
export default function PrivacyPage() {
  const { email } = siteConfig.contact;
  return (
    <LegalPage title="Privacy Policy" updated="September 2026">
      <p>
        This policy explains what information TRIBRIZS collects when you use this website and how that
        information is used.
      </p>

      <h2>Information we collect</h2>
      <p>When you submit an enquiry, we collect the details you provide, which may include:</p>
      <ul>
        <li>Your name, email address and phone number</li>
        <li>Travel details such as departure and destination cities, dates and number of travelers</li>
        <li>Any message you choose to include</li>
      </ul>
      <p>
        We also collect limited technical information, such as the page you submitted the enquiry from,
        to understand how visitors find us.
      </p>

      <h2>How we use your information</h2>
      <p>
        We use your details to respond to your enquiry and to contact you about the travel options you
        asked about. We do not sell your personal information.
      </p>

      <h2>Sharing</h2>
      <p>
        Your information may be processed by service providers that help us operate this website and
        manage enquiries (for example, hosting, email and customer relationship tools). If you choose to
        proceed with a booking, relevant details will be shared with airlines or travel suppliers as
        needed to arrange your travel.
      </p>

      <h2>Retention</h2>
      <p>We keep enquiry information only for as long as needed to respond and for legitimate business records.</p>

      <h2>Your choices</h2>
      <p>
        You can ask us to access, correct or delete the personal information we hold about you
        {email ? (
          <>
            {" "}
            by emailing <a href={`mailto:${email}`} className="font-semibold text-navy-900 underline">{email}</a>
          </>
        ) : (
          " by contacting us through the contact page"
        )}
        .
      </p>

      <h2>Changes</h2>
      <p>We may update this policy from time to time. The date at the top shows when it was last revised.</p>
    </LegalPage>
  );
}
