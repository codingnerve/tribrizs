/**
 * Enquiry field definitions and validation, shared by the client forms (for
 * instant feedback) and the server actions (as the source of truth).
 * Kept dependency-free on purpose — swap for zod later if the forms grow.
 */

export const tripTypes = [
  { value: "return", label: "Return" },
  { value: "one-way", label: "One way" },
  { value: "multi-city", label: "Multi-city" },
] as const;

export type TripType = (typeof tripTypes)[number]["value"];

export const travelerOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9+"] as const;

export interface FlightEnquiryInput {
  tripType: TripType;
  from: string;
  to: string;
  departDate: string;
  returnDate: string;
  travelers: string;
  preferredAirline: string;
  name: string;
  email: string;
  phone: string;
  /** Honeypot — real visitors never see or fill this. */
  company: string;
}

export interface ContactEnquiryInput {
  name: string;
  email: string;
  phone: string;
  from: string;
  to: string;
  travelDate: string;
  message: string;
  company: string;
}

export type FieldErrors<T> = Partial<Record<keyof T, string>>;

export const emptyFlightEnquiry: FlightEnquiryInput = {
  tripType: "return",
  from: "",
  to: "",
  departDate: "",
  returnDate: "",
  travelers: "1",
  preferredAirline: "",
  name: "",
  email: "",
  phone: "",
  company: "",
};

export const emptyContactEnquiry: ContactEnquiryInput = {
  name: "",
  email: "",
  phone: "",
  from: "",
  to: "",
  travelDate: "",
  message: "",
  company: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_CHARS_RE = /^[+\d\s().-]+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function clean(value: unknown, max = 200): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/** One day of slack so visitors ahead of the server's timezone aren't rejected. */
function isBeforeToday(date: string): boolean {
  const cutoff = new Date();
  cutoff.setUTCHours(0, 0, 0, 0);
  cutoff.setUTCDate(cutoff.getUTCDate() - 1);
  return new Date(`${date}T00:00:00Z`) < cutoff;
}

function validateName(value: string): string | undefined {
  if (!value) return "Please enter your name.";
  if (value.length < 2) return "Please enter your full name.";
}

function validateEmail(value: string): string | undefined {
  if (!value) return "Please enter your email address.";
  if (!EMAIL_RE.test(value)) return "Please enter a valid email, e.g. name@example.com.";
}

function validatePhone(value: string): string | undefined {
  if (!value) return "Please enter a phone number so an agent can reach you.";
  const digits = value.replace(/\D/g, "");
  if (!PHONE_CHARS_RE.test(value) || digits.length < 7 || digits.length > 15) {
    return "Please enter a valid phone number, with country code if outside the U.S.";
  }
}

function validateDate(value: string, label: string, required: boolean): string | undefined {
  if (!value) return required ? `Please choose a ${label}.` : undefined;
  if (!DATE_RE.test(value) || Number.isNaN(Date.parse(value))) return `Please choose a valid ${label}.`;
  if (isBeforeToday(value)) return `The ${label} can't be in the past.`;
}

function sameCity(a: string, b: string): boolean {
  return a.length > 0 && a.toLowerCase() === b.toLowerCase();
}

export function normalizeFlightEnquiry(raw: unknown): FlightEnquiryInput {
  const r = (raw ?? {}) as Record<string, unknown>;
  const tripType = tripTypes.some((t) => t.value === r.tripType) ? (r.tripType as TripType) : "return";
  const travelers = (travelerOptions as readonly unknown[]).includes(r.travelers) ? (r.travelers as string) : "1";
  return {
    tripType,
    from: clean(r.from, 120),
    to: clean(r.to, 120),
    departDate: clean(r.departDate, 10),
    returnDate: tripType === "return" ? clean(r.returnDate, 10) : "",
    travelers,
    preferredAirline: clean(r.preferredAirline, 80),
    name: clean(r.name, 120),
    email: clean(r.email, 160),
    phone: clean(r.phone, 40),
    company: clean(r.company, 120),
  };
}

export function normalizeContactEnquiry(raw: unknown): ContactEnquiryInput {
  const r = (raw ?? {}) as Record<string, unknown>;
  return {
    name: clean(r.name, 120),
    email: clean(r.email, 160),
    phone: clean(r.phone, 40),
    from: clean(r.from, 120),
    to: clean(r.to, 120),
    travelDate: clean(r.travelDate, 10),
    message: clean(r.message, 3000),
    company: clean(r.company, 120),
  };
}

/** Step one of the flight enquiry: where and when. */
export function validateTripDetails(v: FlightEnquiryInput): FieldErrors<FlightEnquiryInput> {
  const errors: FieldErrors<FlightEnquiryInput> = {};
  if (!v.from) errors.from = "Where are you flying from?";
  if (!v.to) errors.to = "Where would you like to go?";
  else if (sameCity(v.from, v.to)) errors.to = "Destination should be different from departure.";

  const depart = validateDate(v.departDate, "departure date", true);
  if (depart) errors.departDate = depart;

  if (v.tripType === "return") {
    const ret = validateDate(v.returnDate, "return date", true);
    if (ret) errors.returnDate = ret;
    else if (!depart && v.returnDate < v.departDate) {
      errors.returnDate = "Return date should be on or after the departure date.";
    }
  }
  return errors;
}

/** Step two of the flight enquiry: who to contact. */
export function validateTravelerDetails(v: FlightEnquiryInput): FieldErrors<FlightEnquiryInput> {
  const errors: FieldErrors<FlightEnquiryInput> = {};
  const name = validateName(v.name);
  const email = validateEmail(v.email);
  const phone = validatePhone(v.phone);
  if (name) errors.name = name;
  if (email) errors.email = email;
  if (phone) errors.phone = phone;
  return errors;
}

export function validateFlightEnquiry(v: FlightEnquiryInput): FieldErrors<FlightEnquiryInput> {
  return { ...validateTripDetails(v), ...validateTravelerDetails(v) };
}

export function validateContactEnquiry(v: ContactEnquiryInput): FieldErrors<ContactEnquiryInput> {
  const errors: FieldErrors<ContactEnquiryInput> = {};
  const name = validateName(v.name);
  const email = validateEmail(v.email);
  const phone = validatePhone(v.phone);
  const date = validateDate(v.travelDate, "travel date", false);
  if (name) errors.name = name;
  if (email) errors.email = email;
  if (phone) errors.phone = phone;
  if (date) errors.travelDate = date;
  if (sameCity(v.from, v.to)) errors.to = "Destination should be different from departure.";
  if (!v.message) errors.message = "Tell us a little about your trip or question.";
  else if (v.message.length < 10) errors.message = "Please add a few more details so we can help.";
  return errors;
}

export function hasErrors(errors: object): boolean {
  return Object.keys(errors).length > 0;
}

export type EnquiryState<T> =
  | { status: "idle" }
  | { status: "success"; reference: string }
  | { status: "error"; message: string; fieldErrors?: FieldErrors<T> };
