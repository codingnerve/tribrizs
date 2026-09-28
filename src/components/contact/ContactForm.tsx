"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

import { EnquirySuccess, FormError, Spinner } from "@/components/forms/FormStatus";
import { useEnquiryForm } from "@/components/forms/useEnquiryForm";
import { Button } from "@/components/ui/Button";
import { DateInput, describedBy, Field, Honeypot, Input, Textarea } from "@/components/ui/Field";
import { submitContactEnquiry } from "@/lib/enquiry/actions";
import { emptyContactEnquiry, validateContactEnquiry, type ContactEnquiryInput } from "@/lib/enquiry/schema";
import { todayIso } from "@/lib/utils";

export function ContactForm() {
  const [round, setRound] = useState(0);
  return <ContactFormInner key={round} onRestart={() => setRound((n) => n + 1)} />;
}

function ContactFormInner({ onRestart }: { onRestart: () => void }) {
  const form = useEnquiryForm<ContactEnquiryInput>({
    initial: emptyContactEnquiry,
    action: submitContactEnquiry,
    validate: validateContactEnquiry,
    leadType: "contact_enquiry",
    idPrefix: "contact",
  });
  const { values, errors, bind, setField, id, state, isPending } = form;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    form.submit();
  }

  if (state.status === "success") {
    return <EnquirySuccess reference={state.reference} onRestart={onRestart} />;
  }

  const text = (key: keyof ContactEnquiryInput & string) => ({
    id: id(key),
    ...bind(key),
    invalid: Boolean(errors[key]),
    ...describedBy(id(key), errors[key]),
  });

  return (
    <form onSubmit={handleSubmit} noValidate aria-labelledby="contact-form-heading" className="relative space-y-5">
      <h2 id="contact-form-heading" className="text-xl font-bold text-navy-900">
        Send us your enquiry
      </h2>
      {state.status === "error" && <FormError message={state.message} />}
      <Honeypot value={values.company} onChange={(v) => setField("company", v)} />

      <Field id={id("name")} label="Full name" error={errors.name}>
        <Input {...text("name")} autoComplete="name" placeholder="Your name" />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2 sm:gap-4">
        <Field id={id("email")} label="Email" error={errors.email}>
          <Input {...text("email")} type="email" inputMode="email" autoComplete="email" placeholder="name@example.com" />
        </Field>
        <Field id={id("phone")} label="Phone" error={errors.phone}>
          <Input {...text("phone")} type="tel" inputMode="tel" autoComplete="tel" placeholder="+1 555 000 0000" />
        </Field>
      </div>

      <fieldset className="border-t border-line pt-5">
        <legend className="-mt-2 mb-1 pr-2 text-xs font-bold tracking-[0.12em] text-muted uppercase">
          Trip details <span className="font-medium tracking-normal normal-case">(if you have them)</span>
        </legend>
        <div className="mt-3 grid gap-5 sm:grid-cols-3 sm:gap-4">
          <Field id={id("from")} label="Travel from" error={errors.from} optional>
            <Input {...text("from")} placeholder="City or airport" autoComplete="off" />
          </Field>
          <Field id={id("to")} label="Travel to" error={errors.to} optional>
            <Input {...text("to")} placeholder="City or airport" autoComplete="off" />
          </Field>
          <Field id={id("travelDate")} label="Travel date" error={errors.travelDate} optional>
            <DateInput {...text("travelDate")} min={todayIso()} />
          </Field>
        </div>
      </fieldset>

      <Field id={id("message")} label="Message" error={errors.message} hint="For example: number of travelers, flexible dates, preferred airline.">
        <Textarea {...text("message")} rows={5} placeholder="Tell us about your trip or question" />
      </Field>

      <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={isPending} aria-busy={isPending} className="sm:min-w-48">
          {isPending ? (
            <>
              <Spinner /> Sending…
            </>
          ) : (
            "Send Enquiry"
          )}
        </Button>
        <p className="text-xs leading-relaxed text-muted sm:max-w-64 sm:text-right">
          We only use your details to reply to your enquiry. See our{" "}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-navy-900">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
