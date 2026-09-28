export type AirlineRegion = "united-states" | "united-kingdom";

export interface Airline {
  name: string;
  slug: string;
  /** Two-letter IATA designator, used for the monogram mark. */
  iata: string;
  /**
   * Path to an approved logo file under /public (e.g. "/airlines/emirates.svg").
   * Leave undefined to render the neutral IATA monogram instead.
   */
  logo?: string;
  /** Brand colour used for the monogram mark. */
  brandColor: string;
  country: string;
  region: AirlineRegion;
  hub: string;
  alliance: "oneworld" | "SkyTeam" | "Star Alliance" | null;
  shortDescription: string;
  description: string[];
  popularDestinations: string[];
}
