import type { StaticImageData } from "next/image";

import heroWingClouds from "../../public/images/hero-wing-clouds.jpg";
import travelerDepartures from "../../public/images/traveler-departures.jpg";
import aircraftGateSunset from "../../public/images/aircraft-gate-sunset.jpg";
import familyBeachSunset from "../../public/images/family-beach-sunset.jpg";
import veniceRialto from "../../public/images/venice-rialto.jpg";
import travelPlanningMap from "../../public/images/travel-planning-map.jpg";
import aircraftTerminal from "../../public/images/aircraft-terminal.jpg";
import businessTravelerLounge from "../../public/images/business-traveler-lounge.jpg";
import mountainLake from "../../public/images/mountain-lake.jpg";
import windowSunset from "../../public/images/window-sunset.jpg";
import agentHeadset from "../../public/images/agent-headset.jpg";
import destParis from "../../public/images/dest-paris.jpg";
import destLondon from "../../public/images/dest-london.jpg";
import destDubai from "../../public/images/dest-dubai.jpg";
import destTokyo from "../../public/images/dest-tokyo.jpg";
import destRome from "../../public/images/dest-rome.jpg";
import destBali from "../../public/images/dest-bali.jpg";

export interface SiteImage {
  src: StaticImageData;
  alt: string;
}

/**
 * Every photograph used on the site lives here so it can be swapped in one place.
 * Current files are from Unsplash (Unsplash License); replace with licensed brand
 * photography when available — keep the same keys.
 */
export const images = {
  hero: {
    src: heroWingClouds,
    alt: "Aircraft wing above a layer of clouds in warm evening light",
  },
  airportTraveler: {
    src: travelerDepartures,
    alt: "Traveller with a backpack reading the departures board in an airport terminal",
  },
  aircraftAtGate: {
    src: aircraftGateSunset,
    alt: "Passenger jet parked at the gate as the sun sets over the airfield",
  },
  familyTravel: {
    src: familyBeachSunset,
    alt: "A family walking hand in hand along a beach at sunset",
  },
  international: {
    src: veniceRialto,
    alt: "The Rialto Bridge over the Grand Canal in Venice",
  },
  travelPlanning: {
    src: travelPlanningMap,
    alt: "A paper map with field notes, a camera and a backpack laid out for trip planning",
  },
  aircraftTerminal: {
    src: aircraftTerminal,
    alt: "Wide-body aircraft on the apron in front of a modern airport terminal",
  },
  businessTraveler: {
    src: businessTravelerLounge,
    alt: "Traveller relaxing in an airport lounge while a plane takes off outside",
  },
  destination: {
    src: mountainLake,
    alt: "Wooden boat on a clear alpine lake surrounded by mountains",
  },
  windowView: {
    src: windowSunset,
    alt: "View of the sunset through an aircraft window",
  },
  travelAgent: {
    src: agentHeadset,
    alt: "Smiling travel agent wearing a headset at her desk in a contact centre",
  },
} satisfies Record<string, SiteImage>;

/** Destination photography, keyed by city. */
export const destinationImages = {
  paris: { src: destParis, alt: "The Eiffel Tower and the Seine in Paris at dusk" },
  london: { src: destLondon, alt: "Aerial view of the River Thames and Tower Bridge in London" },
  dubai: { src: destDubai, alt: "The Dubai skyline with the Burj Khalifa at sunset" },
  tokyo: { src: destTokyo, alt: "A busy, neon-lit shopping street in Tokyo" },
  rome: { src: destRome, alt: "The Colosseum in Rome in early evening light" },
  bali: { src: destBali, alt: "A lakeside temple in Bali surrounded by mist and trees" },
} satisfies Record<string, SiteImage>;
