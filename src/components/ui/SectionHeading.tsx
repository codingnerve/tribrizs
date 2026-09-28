import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  id?: string;
  tone?: "dark" | "light";
  className?: string;
}

export function SectionHeading({ eyebrow, title, description, id, tone = "dark", className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow && <p className={cn("eyebrow", tone === "light" && "text-sky-400")}>{eyebrow}</p>}
      <h2
        id={id}
        className={cn(
          "mt-3 text-[1.75rem] leading-[1.15] font-bold tracking-[-0.015em] text-balance sm:text-[2.125rem]",
          tone === "dark" ? "text-navy-900" : "text-white",
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-[1.0625rem] leading-relaxed", tone === "dark" ? "text-muted" : "text-white/75")}>
          {description}
        </p>
      )}
    </div>
  );
}
