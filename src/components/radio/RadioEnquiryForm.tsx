"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

import { EnquirySuccess, FormError, Spinner } from "@/components/forms/FormStatus";
import { useEnquiryForm } from "@/components/forms/useEnquiryForm";
import { Button } from "@/components/ui/Button";
import { describedBy, Field, Honeypot, Input, Select, Textarea } from "@/components/ui/Field";
import { submitRadioEnquiry } from "@/lib/enquiry/actions";
import {
  emptyRadioEnquiry,
  radioTopics,
  replyPreferences,
  validateRadioEnquiry,
  type RadioEnquiryInput,
} from "@/lib/enquiry/schema";

const MESSAGE_MAX = 2000;

export function RadioEnquiryForm() {
  const [round, setRound] = useState(0);
  return <RadioEnquiryFormInner key={round} onRestart={() => setRound((n) => n + 1)} />;
}

function RadioEnquiryFormInner({ onRestart }: { onRestart: () => void }) {
  const form = useEnquiryForm<RadioEnquiryInput>({
    initial: emptyRadioEnquiry,
    action: submitRadioEnquiry,
    validate: validateRadioEnquiry,
    leadType: "radio_enquiry",
    idPrefix: "radio",
  });
  const { values, errors, bind, setField, id, state, isPending } = form;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    form.submit();
  }

  if (state.status === "success") {
    return (
      <EnquirySuccess
        reference={state.reference}
        onRestart={onRestart}
        message="Thank you. A member of the team will review what you've told us and get back to you in the way you chose. We'll never ask for card numbers or passwords."
      />
    );
  }

  const text = (key: keyof RadioEnquiryInput & string) => ({
    id: id(key),
    ...bind(key),
    invalid: Boolean(errors[key]),
    ...describedBy(id(key), errors[key]),
  });

  const phoneRequired = values.replyPreference === "phone";

  return (
    <form onSubmit={handleSubmit} noValidate aria-labelledby="radio-form-heading" className="relative space-y-5">
      <h2 id="radio-form-heading" className="text-xl font-bold text-navy-900">
        Tell us what&apos;s going on
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
        <Field id={id("phone")} label="Phone" error={errors.phone} optional={!phoneRequired}>
          <Input {...text("phone")} type="tel" inputMode="tel" autoComplete="tel" placeholder="+1 555 000 0000" />
        </Field>
      </div>

      <Field id={id("topic")} label="What do you need help with?" error={errors.topic}>
        <Select {...text("topic")}>
          <option value="">Choose a topic</option>
          {radioTopics.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </Select>
      </Field>

      <Field
        id={id("message")}
        label="What are you seeing?"
        error={errors.message}
        hint="Include the exact message on the screen and what you've tried. Please don't include card numbers or passwords."
      >
        <Textarea
          {...text("message")}
          rows={5}
          maxLength={MESSAGE_MAX}
          placeholder="For example: the screen says “Acquiring signal” and never clears"
        />
        <p className="text-right text-xs text-muted tabular-nums" aria-hidden="true">
          {values.message.length}/{MESSAGE_MAX}
        </p>
      </Field>

      <fieldset className="border-t border-line pt-5">
        <legend className="-mt-2 mb-1 pr-2 text-xs font-bold tracking-[0.12em] text-muted uppercase">
          Vehicle details <span className="font-medium tracking-normal normal-case">(if you have them)</span>
        </legend>
        <div className="mt-3 grid gap-5 sm:grid-cols-2 sm:gap-4">
          <Field id={id("vehicle")} label="Make and model" error={errors.vehicle} optional>
            <Input {...text("vehicle")} placeholder="e.g. Ford Explorer 2021" autoComplete="off" />
          </Field>
          <Field id={id("radioProvider")} label="Radio or provider" error={errors.radioProvider} optional>
            <Input {...text("radioProvider")} placeholder="As shown on the radio" autoComplete="off" />
          </Field>
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-[0.8125rem] font-semibold text-navy-900">How should we reply?</legend>
        <div className="flex flex-wrap gap-3">
          {replyPreferences.map((p) => (
            <label
              key={p.value}
              className="flex h-11 cursor-pointer items-center gap-2.5 rounded-[var(--radius-sm)] border border-line-strong bg-white px-4 text-[0.9375rem] text-navy-900 has-[:checked]:border-navy-900 has-[:checked]:bg-navy-900/[0.03] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-sky-500/30"
            >
              <input
                type="radio"
                name="replyPreference"
                value={p.value}
                checked={values.replyPreference === p.value}
                onChange={() => setField("replyPreference", p.value)}
                className="accent-coral-500"
              />
              {p.label}
            </label>
          ))}
        </div>
      </fieldset>

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
