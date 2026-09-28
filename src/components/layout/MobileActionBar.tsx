import Link from "next/link";

import { PhoneIcon } from "@/components/ui/Icons";
import { siteConfig } from "@/config/site";

/**
 * Persistent bottom bar on small screens so paid-traffic visitors always have
 * a one-tap way to reach an agent. Hidden from md up, where the header CTA is visible.
 */
export function MobileActionBar() {
  const { phone, phoneHref } = siteConfig.contact;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 px-4 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] backdrop-blur-sm md:hidden">
      <div className="flex gap-2.5">
        {phone && phoneHref && (
          <a
            href={phoneHref}
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-[var(--radius-md)] border border-navy-900/25 text-[0.9375rem] font-semibold text-navy-900"
          >
            <PhoneIcon /> Call
          </a>
        )}
        <Link
          href="/#flight-enquiry"
          className="inline-flex h-12 flex-[2] items-center justify-center rounded-[var(--radius-md)] bg-coral-500 text-[0.9375rem] font-semibold text-white active:bg-coral-600"
        >
          Request a Flight
        </Link>
      </div>
    </div>
  );
}
