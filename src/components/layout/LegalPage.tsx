import type { ReactNode } from "react";

interface LegalPageProps {
  title: string;
  updated: string;
  children: ReactNode;
}

export function LegalPage({ title, updated, children }: LegalPageProps) {
  return (
    <article className="container-page max-w-3xl py-14 lg:py-20">
      <h1 className="text-[2rem] leading-tight font-extrabold tracking-[-0.02em] text-navy-900 sm:text-[2.5rem]">
        {title}
      </h1>
      <p className="mt-3 text-sm text-muted">Last updated {updated}</p>
      <div className="prose-legal mt-8">{children}</div>
    </article>
  );
}
