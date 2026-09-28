"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { CloseIcon, MenuIcon, PhoneIcon } from "@/components/ui/Icons";
import { mainNav, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { phone, phoneHref } = siteConfig.contact;

  // Close the menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <div className="container-page flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
        <Link href="/" aria-label="TRIBRIZS home" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className={cn(
                    "relative py-2 text-[0.9375rem] font-medium transition-colors",
                    "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-coral-500 after:transition-transform",
                    isActive(pathname, item.href)
                      ? "text-navy-900 after:scale-x-100"
                      : "text-muted hover:text-navy-900 hover:after:scale-x-100",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          {phone && phoneHref && (
            <a
              href={phoneHref}
              className="hidden items-center gap-2 text-[0.9375rem] font-semibold text-navy-900 hover:text-navy-700 lg:inline-flex"
            >
              <PhoneIcon className="text-coral-600" /> {phone}
            </a>
          )}
          <ButtonLink href="/contact" variant="secondary">
            Talk to an Agent
          </ButtonLink>
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-sm)] text-2xl text-navy-900 md:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-paper md:hidden"
        >
          <nav aria-label="Mobile" className="container-page flex min-h-full flex-col pt-4 pb-8">
            <ul className="divide-y divide-line border-b border-line">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between py-4 text-lg font-semibold",
                      isActive(pathname, item.href) ? "text-navy-900" : "text-navy-800/80",
                    )}
                  >
                    {item.label}
                    {isActive(pathname, item.href) && <span className="h-1.5 w-1.5 rounded-full bg-coral-500" />}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3">
              <ButtonLink href="/contact" size="lg">
                Talk to an Agent
              </ButtonLink>
              {phone && phoneHref && (
                <a
                  href={phoneHref}
                  className="inline-flex h-13 items-center justify-center gap-2 rounded-[var(--radius-md)] border border-navy-900/25 font-semibold text-navy-900"
                >
                  <PhoneIcon /> Call {phone}
                </a>
              )}
            </div>
            <p className="mt-auto pt-10 text-sm text-muted">{siteConfig.tagline}</p>
          </nav>
        </div>
      )}
    </header>
  );
}
