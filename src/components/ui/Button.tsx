import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "light" | "outline" | "ghost-light" | "text";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold whitespace-nowrap transition-colors duration-200 rounded-[var(--radius-md)] focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  // Coral is reserved for the one action we most want on any given screen.
  primary: "bg-coral-500 text-white hover:bg-coral-600 focus-visible:outline-coral-500",
  secondary: "bg-navy-900 text-white hover:bg-navy-700 focus-visible:outline-navy-900",
  light: "bg-white text-navy-900 hover:bg-sky-100 focus-visible:outline-white",
  outline: "border border-navy-900/25 text-navy-900 hover:border-navy-900 hover:bg-navy-900/[0.03]",
  "ghost-light": "border border-white/40 text-white hover:border-white hover:bg-white/10 focus-visible:outline-white",
  text: "text-navy-900 underline decoration-navy-900/30 underline-offset-4 hover:decoration-navy-900 px-0!",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-13 px-7 text-base",
};

interface StyleProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function buttonClasses({ variant = "primary", size = "md", className }: Omit<StyleProps, "children">) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonProps = StyleProps & ComponentPropsWithoutRef<"button">;

export function Button({ variant, size, className, children, type = "button", ...rest }: ButtonProps) {
  return (
    <button type={type} className={buttonClasses({ variant, size, className })} {...rest}>
      {children}
    </button>
  );
}

type ButtonLinkProps = StyleProps & Omit<ComponentPropsWithoutRef<typeof Link>, "className" | "children">;

export function ButtonLink({ variant, size, className, children, ...rest }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses({ variant, size, className })} {...rest}>
      {children}
    </Link>
  );
}
