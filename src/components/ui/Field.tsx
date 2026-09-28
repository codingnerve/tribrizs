import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

const controlBase =
  "block w-full rounded-[var(--radius-sm)] border bg-white px-3.5 text-[0.9375rem] text-ink placeholder:text-muted/70 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-sky-500/30 disabled:bg-sand";

function controlClasses(invalid: boolean, className?: string) {
  return cn(
    controlBase,
    invalid ? "border-danger focus:border-danger" : "border-line-strong hover:border-navy-600 focus:border-sky-500",
    className,
  );
}

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  className?: string;
  children: ReactNode;
}

/** Visible label above the control, hint or error below — no floating labels. */
export function Field({ id, label, error, hint, optional, className, children }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-[0.8125rem] font-semibold text-navy-900">
        {label}
        {optional && <span className="ml-1 font-normal text-muted">(optional)</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-[0.8125rem] leading-snug text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-[0.8125rem] leading-snug text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/** aria wiring shared by every control rendered inside a Field. */
export function describedBy(id: string, error?: string, hint?: string) {
  return {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : hint ? `${id}-hint` : undefined,
  } as const;
}

type InputProps = ComponentPropsWithoutRef<"input"> & { invalid?: boolean };

export function Input({ invalid = false, className, ...rest }: InputProps) {
  return <input className={controlClasses(invalid, cn("h-12", className))} {...rest} />;
}

/** Native date picker: best keyboard, screen reader and mobile support. */
export function DateInput({ invalid = false, className, ...rest }: Omit<InputProps, "type">) {
  return <input type="date" className={controlClasses(invalid, cn("h-12 pr-2", className))} {...rest} />;
}

type SelectProps = ComponentPropsWithoutRef<"select"> & { invalid?: boolean };

export function Select({ invalid = false, className, children, ...rest }: SelectProps) {
  return (
    <div className="relative">
      <select className={controlClasses(invalid, cn("h-12 appearance-none pr-10", className))} {...rest}>
        {children}
      </select>
      <svg
        viewBox="0 0 20 20"
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-muted"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      >
        <path d="m5 7.5 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

type TextareaProps = ComponentPropsWithoutRef<"textarea"> & { invalid?: boolean };

export function Textarea({ invalid = false, className, ...rest }: TextareaProps) {
  return <textarea className={controlClasses(invalid, cn("min-h-32 resize-y py-3", className))} {...rest} />;
}

/** Off-screen field that only bots fill in. */
export function Honeypot({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Company
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
}
