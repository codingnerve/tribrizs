import type { Metadata } from "next";

import { AirlinePreview } from "@/components/home/AirlinePreview";
import { CallSection } from "@/components/home/CallSection";
import { FAQ } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";
import { FlightAssistance } from "@/components/home/FlightAssistance";
import { Hero } from "@/components/home/Hero";
import { PopularDestinations } from "@/components/home/PopularDestinations";
import { TrustStrip } from "@/components/home/TrustStrip";
import { TripTypes } from "@/components/home/TripTypes";
import { WhyTribrizs } from "@/components/home/WhyTribrizs";

export const metadata: Metadata = {
  title: { absolute: "Flight Booking Assistance & Travel Services | TRIBRIZS" },
  description:
    "Get personalized assistance with international flights and travel planning. Contact TRIBRIZS to explore flight options and travel services.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Flight Booking Assistance & Travel Services | TRIBRIZS",
    description:
      "Get personalized assistance with international flights and travel planning. Contact TRIBRIZS to explore flight options and travel services.",
    url: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <WhyTribrizs />
      <PopularDestinations />
      <FlightAssistance />
      <TripTypes />
      <AirlinePreview />
      <CallSection />
      <FAQ />
      <FinalCTA />
    </>
  );
}
