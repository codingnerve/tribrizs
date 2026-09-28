"use client";

import { useEffect, useRef } from "react";

import { siteConfig } from "@/config/site";
import { CheckIcon, PhoneIcon } from "@/components/ui/Icons";

interface EnquirySuccessProps {
  reference: string;
  onRestart: () => void;
}

/** Shown after a successful submission. Never implies a booking was made. */
export function EnquirySuccess({ reference, onRestart }: EnquirySuccessProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { phone, phoneHref } = siteConfig.contact;

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div className="animate-rise py-2" role="status">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-success/10 text-xl text-success">
        <CheckIcon />
      </span>
      <h3 ref={headingRef} tabIndex={-1} className="mt-5 text-xl font-bold text-navy-900 focus:outline-none">
        Your enquiry has been received.
      </h3>
      <p className="mt-2 leading-relaxed text-muted">
        Thank you. A travel agent will contact you to talk through suitable flight options for your
        trip. Nothing has been booked or charged.
      </p>
      <p className="mt-4 text-sm text-muted">
        Enquiry reference: <span className="font-semibold tracking-wide text-navy-900">{reference}</span>
      </p>
      {phone && phoneHref && (
        <a
          href={phoneHref}
          className="mt-5 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-navy-900 underline decoration-navy-900/30 underline-offset-4 hover:decoration-navy-900"
        >
          <PhoneIcon /> Prefer to talk now? Call {phone}
        </a>
      )}
      <div className="mt-6 border-t border-line pt-5">
        <button
          type="button"
          onClick={onRestart}
          className="text-sm font-semibold text-sky-500 underline-offset-4 hover:underline"
        >
          Send another enquiry
        </button>
      </div>
    </div>
  );
}

export function FormError({ message }: { message: string }) {
  return (
    <p role="alert" className="rounded-[var(--radius-sm)] border border-danger/25 bg-danger/5 px-3.5 py-3 text-sm text-danger">
      {message}
    </p>
  );
}

export function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
    />
  );
}
