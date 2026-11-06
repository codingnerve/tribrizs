"use server";

import { headers } from "next/headers";

import { createReference, deliverLead, type Lead } from "./deliver";
import {
  hasErrors,
  normalizeContactEnquiry,
  normalizeFlightEnquiry,
  validateContactEnquiry,
  validateFlightEnquiry,
  type ContactEnquiryInput,
  type EnquiryState,
  type FlightEnquiryInput,
} from "./schema";

const DELIVERY_FAILED =
  "We couldn't send your enquiry just now. Please try again in a moment, or contact us directly.";

async function send(type: Lead["type"], data: Record<string, string>): Promise<EnquiryState<never>> {
  const reference = createReference();
  const source = (await headers()).get("referer") ?? "unknown";
  try {
    await deliverLead({ type, reference, submittedAt: new Date().toISOString(), source, data });
    return { status: "success", reference };
  } catch (error) {
    console.error(`[lead] ${type} delivery failed`, error);
    return { status: "error", message: DELIVERY_FAILED };
  }
}

export async function submitFlightEnquiry(
  _prev: EnquiryState<FlightEnquiryInput>,
  raw: FlightEnquiryInput,
): Promise<EnquiryState<FlightEnquiryInput>> {
  const { company, ...input } = normalizeFlightEnquiry(raw);
  // Bots fill every field: accept quietly and drop.
  if (company) return { status: "success", reference: createReference() };

  const fieldErrors = validateFlightEnquiry({ ...input, company });
  if (hasErrors(fieldErrors)) {
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors };
  }
  return send("flight-enquiry", { ...input });
}

export async function submitContactEnquiry(
  _prev: EnquiryState<ContactEnquiryInput>,
  raw: ContactEnquiryInput,
): Promise<EnquiryState<ContactEnquiryInput>> {
  const { company, ...input } = normalizeContactEnquiry(raw);
  if (company) return { status: "success", reference: createReference() };

  const fieldErrors = validateContactEnquiry({ ...input, company });
  if (hasErrors(fieldErrors)) {
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors };
  }
  return send("contact-enquiry", { ...input });
}
