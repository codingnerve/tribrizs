import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { PageHero } from "@/components/layout/PageHero";
import { images } from "@/lib/images";

const title = "Contact Our Travel Team";
const description =
  "Questions about flights or travel plans? Contact the TRIBRIZS travel team by phone, email or enquiry form and an agent will get back to you.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title: `${title} | TRIBRIZS`, description, url: "/contact" },
  twitter: { title: `${title} | TRIBRIZS`, description },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Let's Plan Your Journey"
        description="Have questions about flights or travel plans? Get in touch with our travel team."
        image={images.travelPlanning}
      />

      <section id="enquiry" className="scroll-mt-20 py-14 lg:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <ContactInfo />
          </div>
          <div className="border border-line bg-white p-5 sm:p-8 lg:col-span-8 lg:p-10">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
