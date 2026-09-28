/**
 * Lets any part of the page pre-fill the hero flight form's destination
 * (e.g. clicking a destination tile) without sharing React state.
 */
export const SET_DESTINATION_EVENT = "tribrizs:set-destination";

export function requestDestination(city: string) {
  window.dispatchEvent(new CustomEvent<string>(SET_DESTINATION_EVENT, { detail: city }));
}
