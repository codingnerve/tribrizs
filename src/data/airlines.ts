import type { Airline, AirlineRegion } from "@/types/airline";

export const regionLabels: Record<AirlineRegion, string> = {
  "united-states": "United States",
  "united-kingdom": "United Kingdom",
};

/**
 * Reference information about airlines. The directory is intentionally limited
 * to U.S. and U.K. carriers. TRIBRIZS is an independent travel assistance
 * service and is not affiliated with any airline listed here. Keep entries
 * factual; avoid fares, rankings or claims that date quickly.
 */
export const airlines: Airline[] = [
  {
    name: "American Airlines",
    slug: "american-airlines",
    iata: "AA",
    brandColor: "#0078D2",
    country: "United States",
    region: "united-states",
    hub: "Dallas/Fort Worth (DFW)",
    alliance: "oneworld",
    shortDescription:
      "Major U.S. carrier with international routes to Europe, Latin America, the Caribbean and Asia.",
    description: [
      "American Airlines is one of the largest airlines in the United States, headquartered in Fort Worth, Texas. Its largest hub is Dallas/Fort Worth International Airport, with international gateways including Miami, New York JFK and Philadelphia.",
      "Its international network links the United States with Latin America, the Caribbean, Europe and Asia. American is a member of the oneworld alliance.",
    ],
    popularDestinations: ["London", "Madrid", "Dublin", "Cancún", "São Paulo", "Tokyo"],
  },
  {
    name: "Delta Air Lines",
    slug: "delta-air-lines",
    iata: "DL",
    brandColor: "#C8102E",
    country: "United States",
    region: "united-states",
    hub: "Atlanta (ATL)",
    alliance: "SkyTeam",
    shortDescription:
      "Atlanta-based carrier with long-haul routes to Europe, Asia, Latin America and Africa.",
    description: [
      "Delta Air Lines is headquartered in Atlanta, Georgia, where Hartsfield–Jackson Atlanta International Airport serves as its main hub. Other international gateways include New York JFK, Detroit and Los Angeles.",
      "Delta was a founding member of the SkyTeam alliance and flies to destinations across Europe, Asia, Latin America and Africa.",
    ],
    popularDestinations: ["Paris", "Amsterdam", "London", "Rome", "Seoul", "Mexico City"],
  },
  {
    name: "United Airlines",
    slug: "united-airlines",
    iata: "UA",
    brandColor: "#005DAA",
    country: "United States",
    region: "united-states",
    hub: "Chicago O'Hare (ORD)",
    alliance: "Star Alliance",
    shortDescription: "U.S. airline with an extensive network across the Atlantic and Pacific.",
    description: [
      "United Airlines is headquartered in Chicago, Illinois. Its international gateways include Newark, San Francisco, Washington Dulles, Chicago O'Hare and Houston.",
      "A founding member of Star Alliance, United operates long-haul routes to Europe, Asia, Oceania and Latin America.",
    ],
    popularDestinations: ["London", "Frankfurt", "Tokyo", "Sydney", "Singapore", "Mexico City"],
  },
  {
    name: "JetBlue",
    slug: "jetblue",
    iata: "B6",
    brandColor: "#003876",
    country: "United States",
    region: "united-states",
    hub: "New York JFK",
    alliance: null,
    shortDescription: "New York-based airline flying to the Caribbean, Latin America and Europe.",
    description: [
      "JetBlue is headquartered in New York, with its largest operation at John F. Kennedy International Airport and a further focus city in Boston.",
      "Its international network covers the Caribbean and Latin America, along with transatlantic flights to cities including London, Paris, Amsterdam and Dublin.",
    ],
    popularDestinations: ["London", "Paris", "Amsterdam", "Dublin", "Cancún", "Aruba"],
  },
  {
    name: "British Airways",
    slug: "british-airways",
    iata: "BA",
    brandColor: "#075AAA",
    country: "United Kingdom",
    region: "united-kingdom",
    hub: "London Heathrow (LHR)",
    alliance: "oneworld",
    shortDescription: "The UK's flag carrier, flying from London Heathrow to destinations worldwide.",
    description: [
      "British Airways is the flag carrier of the United Kingdom, with its main hub at London Heathrow and further operations at London Gatwick.",
      "A founding member of the oneworld alliance, British Airways connects London with cities across Europe, North America, Africa, the Middle East and Asia.",
    ],
    popularDestinations: ["New York", "Dubai", "Johannesburg", "Barcelona", "Singapore", "Tokyo"],
  },
  {
    name: "Virgin Atlantic",
    slug: "virgin-atlantic",
    iata: "VS",
    brandColor: "#DA0530",
    country: "United Kingdom",
    region: "united-kingdom",
    hub: "London Heathrow (LHR)",
    alliance: "SkyTeam",
    shortDescription: "British long-haul airline focused on transatlantic and leisure routes.",
    description: [
      "Virgin Atlantic is a British airline operating long-haul flights from London Heathrow and Manchester.",
      "Its network is centred on the United States and the Caribbean, with additional routes to destinations in Africa, Asia and the Middle East. Virgin Atlantic joined the SkyTeam alliance in 2023.",
    ],
    popularDestinations: ["New York", "Los Angeles", "Orlando", "Barbados", "Johannesburg", "Lagos"],
  },
];

/** Airlines shown on the homepage preview, in display order. */
export const featuredAirlineSlugs = [
  "american-airlines",
  "delta-air-lines",
  "united-airlines",
  "british-airways",
  "virgin-atlantic",
  "jetblue",
] as const;

export function getAirlineBySlug(slug: string): Airline | undefined {
  return airlines.find((airline) => airline.slug === slug);
}

export function getFeaturedAirlines(): Airline[] {
  return featuredAirlineSlugs
    .map((slug) => getAirlineBySlug(slug))
    .filter((airline): airline is Airline => Boolean(airline));
}

export function getRelatedAirlines(airline: Airline, limit = 3): Airline[] {
  return airlines
    .filter((other) => other.region === airline.region && other.slug !== airline.slug)
    .slice(0, limit);
}
