import "server-only";

export interface Lead {
  type: "flight-enquiry" | "contact-enquiry";
  reference: string;
  submittedAt: string;
  /** Page the enquiry was sent from (useful for ad campaign attribution). */
  source: string;
  data: Record<string, string>;
}

export class LeadDeliveryError extends Error {}

/**
 * Single integration point for enquiries. Point LEAD_WEBHOOK_URL at a CRM
 * webhook, an automation (Zapier/Make) or your own endpoint that emails the
 * team via Resend — the payload is the same `Lead` JSON in every case.
 */
export async function deliverLead(lead: Lead): Promise<void> {
  const url = process.env.LEAD_WEBHOOK_URL?.trim();

  if (!url) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[lead] LEAD_WEBHOOK_URL not set; logging enquiry instead of delivering it:\n", lead);
      return;
    }
    // Never tell a visitor their enquiry was received when it went nowhere.
    throw new LeadDeliveryError("LEAD_WEBHOOK_URL is not configured");
  }

  const secret = process.env.LEAD_WEBHOOK_SECRET?.trim();
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(secret ? { Authorization: `Bearer ${secret}` } : {}),
    },
    body: JSON.stringify(lead),
    signal: AbortSignal.timeout(10_000),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new LeadDeliveryError(`Lead webhook responded with ${response.status}`);
  }
}

export function createReference(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  return `TRZ-${Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("")}`;
}
