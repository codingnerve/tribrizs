import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-start justify-center py-20">
      <p className="eyebrow">Page not found</p>
      <h1 className="mt-3 max-w-xl text-[2rem] leading-tight font-extrabold tracking-[-0.02em] text-navy-900 sm:text-[2.5rem]">
        This page seems to have taken a different route.
      </h1>
      <p className="mt-4 max-w-lg text-lg text-muted">
        The page you were looking for doesn&apos;t exist or has moved. Our travel team is still here to help.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/" size="lg">
          Back to homepage
        </ButtonLink>
        <ButtonLink href="/airlines" variant="outline" size="lg">
          Browse airlines
        </ButtonLink>
      </div>
    </section>
  );
}
