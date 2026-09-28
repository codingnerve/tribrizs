"use client";

import { useActionState, useEffect, useState, useTransition, type ChangeEvent } from "react";

import type { EnquiryState, FieldErrors } from "@/lib/enquiry/schema";

type Action<T> = (prev: EnquiryState<T>, input: T) => Promise<EnquiryState<T>>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Controlled form state + server action submission. Values stay in React state
 * so nothing is lost if the server returns field errors, and validation shown
 * to the visitor uses the same rules the server enforces.
 */
export function useEnquiryForm<T extends object>({
  initial,
  action,
  validate,
  leadType,
  idPrefix,
}: {
  initial: T;
  action: Action<T>;
  validate: (values: T) => FieldErrors<T>;
  /** Pushed to window.dataLayer on success for ad conversion tracking. */
  leadType: string;
  /** Namespaces element ids so two forms can live on one page. */
  idPrefix: string;
}) {
  const [values, setValues] = useState<T>(initial);
  const [errors, setErrors] = useState<FieldErrors<T>>({});
  const [state, dispatch, isPending] = useActionState<EnquiryState<T>, T>(action, { status: "idle" });
  const [, startTransition] = useTransition();

  // Adopt field errors returned by the server once per response.
  const [seenState, setSeenState] = useState(state);
  if (state !== seenState) {
    setSeenState(state);
    if (state.status === "error" && state.fieldErrors) setErrors(state.fieldErrors);
  }

  useEffect(() => {
    if (state.status === "success") {
      window.dataLayer?.push({ event: "generate_lead", lead_type: leadType });
    }
  }, [state, leadType]);

  function setField<K extends keyof T>(key: K, value: T[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    // Clear a field's error as soon as the visitor edits it.
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  /** Change handler for inputs/selects/textareas whose `name` matches a key of T. */
  function bind<K extends keyof T & string>(key: K) {
    return {
      name: key,
      value: values[key] as string,
      onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
        setField(key, e.target.value as T[K]),
    };
  }

  /** Validate a subset of fields (e.g. one step); returns true when valid. */
  function check(partial: (values: T) => FieldErrors<T> = validate): boolean {
    const found = Object.fromEntries(
      Object.entries(partial(values)).filter(([, message]) => Boolean(message)),
    ) as FieldErrors<T>;
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) document.getElementById(id(first as keyof T & string))?.focus();
    return !first;
  }

  function submit() {
    if (!check()) return;
    startTransition(() => dispatch(values));
  }

  function id(name: keyof T & string) {
    return `${idPrefix}-${name}`;
  }

  function reset() {
    setValues(initial);
    setErrors({});
  }

  return { values, errors, setField, bind, check, submit, reset, id, state, isPending };
}
