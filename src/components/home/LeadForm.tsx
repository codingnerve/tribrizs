"use client";

import Link from "next/link";
import { useEffect, useEffectEvent, useState, type FormEvent } from "react";

import { EnquirySuccess, FormError, Spinner } from "@/components/forms/FormStatus";
import { useEnquiryForm } from "@/components/forms/useEnquiryForm";
import { Button } from "@/components/ui/Button";
import { DateInput, describedBy, Field, Honeypot, Input, Select } from "@/components/ui/Field";
import { ArrowLeftIcon, SwapIcon } from "@/components/ui/Icons";
import { submitFlightEnquiry } from "@/lib/enquiry/actions";
import { SET_DESTINATION_EVENT } from "@/lib/enquiry/events";
import {
  emptyFlightEnquiry,
  travelerOptions,
  tripTypes,
  validateFlightEnquiry,
  validateTripDetails,
  type FlightEnquiryInput,
} from "@/lib/enquiry/schema";
import { cn, todayIso } from "@/lib/utils";

interface LeadFormProps {
  /** Pre-fills the destination, e.g. from an airline page. */
  defaultTo?: string;
  /** Recorded with the enquiry when sent from an airline page. */
  preferredAirline?: string;
  submitLabel?: string;
  heading?: string;
  className?: string;
}

/**
 * Two-step flight enquiry: trip details first (low effort, high intent),
 * then contact details. It collects an enquiry — it is not a booking engine.
 */
export function LeadForm(props: LeadFormProps) {
  // Remounting gives a clean form (and a fresh action state) after "Send another enquiry".
  const [round, setRound] = useState(0);
  return <LeadFormInner key={round} {...props} onRestart={() => setRound((n) => n + 1)} />;
}

function LeadFormInner({
  defaultTo = "",
  preferredAirline = "",
  submitLabel = "Get Flight Assistance",
  heading = "Request flight assistance",
  className,
  onRestart,
}: LeadFormProps & { onRestart: () => void }) {
  const [step, setStep] = useState<1 | 2>(1);
  const form = useEnquiryForm<FlightEnquiryInput>({
    initial: { ...emptyFlightEnquiry, to: defaultTo, preferredAirline },
    action: submitFlightEnquiry,
    validate: validateFlightEnquiry,
    leadType: "flight_enquiry",
    idPrefix: "flight",
  });
  const { values, errors, bind, setField, id, state, isPending } = form;
  const today = todayIso();

  // Destination tiles elsewhere on the page pre-fill "To" and hand focus to "From".
  const onDestination = useEffectEvent((city: string) => {
    setField("to", city);
    setStep(1);
    requestAnimationFrame(() => {
      const next = document.getElementById(id(values.from ? "departDate" : "from"));
      next?.focus({ preventScroll: true });
    });
  });

  useEffect(() => {
    const handler = (e: Event) => onDestination((e as CustomEvent<string>).detail);
    window.addEventListener(SET_DESTINATION_EVENT, handler);
    return () => window.removeEventListener(SET_DESTINATION_EVENT, handler);
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step === 1) {
      if (form.check(validateTripDetails)) {
        setStep(2);
        requestAnimationFrame(() => document.getElementById(id("name"))?.focus());
      }
      return;
    }
    form.submit();
  }

  // Sits beside the departure date on one-way trips, on its own row otherwise.
  const travelersField = (
    <Field id={id("travelers")} label="Travelers">
      <Select id={id("travelers")} {...bind("travelers")}>
        {travelerOptions.map((n) => (
          <option key={n} value={n}>
            {n} {n === "1" ? "traveler" : "travelers"}
          </option>
        ))}
      </Select>
    </Field>
  );

  const shell = cn("relative bg-white text-ink shadow-[0_24px_60px_-28px_rgba(7,20,39,0.55)] rounded-[var(--radius-md)]", className);

  if (state.status === "success") {
    return (
      <div className={cn(shell, "p-6 sm:p-8")}>
        <EnquirySuccess reference={state.reference} onRestart={onRestart} />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-labelledby="flight-form-heading" className={shell}>
      <div className="flex items-baseline justify-between gap-4 border-b border-line px-5 pt-5 pb-4 sm:px-7">
        <h2 id="flight-form-heading" className="text-lg font-bold text-navy-900">
          {heading}
        </h2>
        <p className="shrink-0 text-xs font-semibold tracking-wide text-muted uppercase" aria-live="polite">
          Step {step} of 2
        </p>
      </div>

      <div className="space-y-5 px-5 pt-5 pb-6 sm:px-7">
        {state.status === "error" && <FormError message={state.message} />}
        <Honeypot value={values.company} onChange={(v) => setField("company", v)} />

        {step === 1 ? (
          <>
            <fieldset>
              <legend className="sr-only">Trip type</legend>
              <div className="grid grid-cols-3 gap-1 rounded-[var(--radius-sm)] bg-sand p-1">
                {tripTypes.map((t) => (
                  <label
                    key={t.value}
                    className={cn(
                      "cursor-pointer rounded-[2px] py-2 text-center text-[0.8125rem] font-semibold transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-sky-500",
                      values.tripType === t.value ? "bg-white text-navy-900 shadow-sm" : "text-muted hover:text-navy-900",
                    )}
                  >
                    <input
                      type="radio"
                      name="tripType"
                      value={t.value}
                      checked={values.tripType === t.value}
                      onChange={() => setField("tripType", t.value)}
                      className="sr-only"
                    />
                    {t.label}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="relative grid gap-4 sm:grid-cols-2 sm:gap-3">
              <Field id={id("from")} label="From" error={errors.from}>
                <Input
                  id={id("from")}
                  {...bind("from")}
                  placeholder="City or airport"
                  autoComplete="off"
                  invalid={Boolean(errors.from)}
                  {...describedBy(id("from"), errors.from)}
                />
              </Field>
              <button
                type="button"
                onClick={() => {
                  setField("from", values.to);
                  setField("to", values.from);
                }}
                aria-label="Swap departure and destination"
                className="absolute top-[1.85rem] right-3 z-10 hidden h-8 w-8 items-center justify-center rounded-full border border-line-strong bg-white text-muted transition-colors hover:border-navy-900 hover:text-navy-900 sm:left-1/2 sm:right-auto sm:flex sm:-translate-x-1/2"
              >
                <SwapIcon />
              </button>
              <Field id={id("to")} label="To" error={errors.to}>
                <Input
                  id={id("to")}
                  {...bind("to")}
                  placeholder="City or airport"
                  autoComplete="off"
                  className="sm:pl-6"
                  invalid={Boolean(errors.to)}
                  {...describedBy(id("to"), errors.to)}
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field id={id("departDate")} label="Departure date" error={errors.departDate}>
                <DateInput
                  id={id("departDate")}
                  {...bind("departDate")}
                  min={today}
                  invalid={Boolean(errors.departDate)}
                  {...describedBy(id("departDate"), errors.departDate)}
                />
              </Field>
              {values.tripType === "return" ? (
                <Field id={id("returnDate")} label="Return date" error={errors.returnDate}>
                  <DateInput
                    id={id("returnDate")}
                    {...bind("returnDate")}
                    min={values.departDate || today}
                    invalid={Boolean(errors.returnDate)}
                    {...describedBy(id("returnDate"), errors.returnDate)}
                  />
                </Field>
              ) : (
                travelersField
              )}
            </div>

            {values.tripType === "return" && travelersField}
            {values.tripType === "multi-city" && (
              <p className="text-[0.8125rem] leading-snug text-muted">
                Add your first flight here — you can share the rest of your route with your agent.
              </p>
            )}

            <Button type="submit" size="lg" className="w-full">
              {submitLabel}
            </Button>
          </>
        ) : (
          <>
            <div className="flex items-start justify-between gap-3 rounded-[var(--radius-sm)] bg-sand px-3.5 py-3 text-sm">
              <p className="text-navy-900">
                <span className="font-semibold">
                  {values.from} → {values.to}
                </span>
                <span className="block text-muted">
                  {formatDate(values.departDate)}
                  {values.tripType === "return" && ` – ${formatDate(values.returnDate)}`} · {values.travelers}{" "}
                  {values.travelers === "1" ? "traveler" : "travelers"}
                </span>
              </p>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex shrink-0 items-center gap-1 font-semibold text-sky-500 hover:underline"
              >
                <ArrowLeftIcon /> Edit
              </button>
            </div>

            <Field id={id("name")} label="Full name" error={errors.name}>
              <Input
                id={id("name")}
                {...bind("name")}
                autoComplete="name"
                placeholder="Your name"
                invalid={Boolean(errors.name)}
                {...describedBy(id("name"), errors.name)}
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-3">
              <Field id={id("email")} label="Email" error={errors.email}>
                <Input
                  id={id("email")}
                  type="email"
                  inputMode="email"
                  {...bind("email")}
                  autoComplete="email"
                  placeholder="name@example.com"
                  invalid={Boolean(errors.email)}
                  {...describedBy(id("email"), errors.email)}
                />
              </Field>
              <Field id={id("phone")} label="Phone" error={errors.phone}>
                <Input
                  id={id("phone")}
                  type="tel"
                  inputMode="tel"
                  {...bind("phone")}
                  autoComplete="tel"
                  placeholder="+1 555 000 0000"
                  invalid={Boolean(errors.phone)}
                  {...describedBy(id("phone"), errors.phone)}
                />
              </Field>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={isPending} aria-busy={isPending}>
              {isPending ? (
                <>
                  <Spinner /> Sending…
                </>
              ) : (
                "Send Enquiry"
              )}
            </Button>
            <p className="text-xs leading-relaxed text-muted">
              We&apos;ll only use your details to respond to this enquiry. See our{" "}
              <Link href="/privacy" className="underline underline-offset-2 hover:text-navy-900">
                Privacy Policy
              </Link>
              .
            </p>
          </>
        )}

        {step === 1 && (
          <p className="text-[0.8125rem] leading-snug text-muted">
            Speak with a travel specialist about available flight options. This is an enquiry, not a
            booking — no payment is taken.
          </p>
        )}
      </div>
    </form>
  );
}

function formatDate(iso: string): string {
  if (!iso) return "";
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
