"use client";

import { useState } from "react";

import { airlines, regionLabels } from "@/data/airlines";
import type { AirlineRegion } from "@/types/airline";
import { cn } from "@/lib/utils";

import { AirlineGrid } from "./AirlineGrid";

const regionOrder: AirlineRegion[] = ["united-states", "united-kingdom"];

const regionNotes: Record<AirlineRegion, string> = {
  "united-states": "U.S. carriers with long-haul routes to Europe, Latin America, Asia and beyond.",
  "united-kingdom": "British airlines connecting London and Manchester with destinations worldwide.",
};

type Filter = AirlineRegion | "all";

/** Region filter + grouped directory. Plain buttons; no URL state needed for a short list. */
export function AirlineDirectory() {
  const [filter, setFilter] = useState<Filter>("all");
  const visibleRegions = filter === "all" ? regionOrder : [filter];

  const options: { value: Filter; label: string; count: number }[] = [
    { value: "all", label: "All airlines", count: airlines.length },
    ...regionOrder.map((r) => ({
      value: r,
      label: regionLabels[r],
      count: airlines.filter((a) => a.region === r).length,
    })),
  ];

  return (
    <div>
      <div role="group" aria-label="Filter airlines by country" className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => setFilter(o.value)}
              aria-pressed={filter === o.value}
              className={cn(
                "inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-semibold whitespace-nowrap transition-colors",
                filter === o.value
                  ? "border-navy-900 bg-navy-900 text-white"
                  : "border-line-strong bg-white text-navy-900 hover:border-navy-900",
              )}
            >
              {o.label}
              <span className={cn("text-xs tabular-nums", filter === o.value ? "text-white/60" : "text-muted")}>
                {o.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 space-y-16 lg:mt-14 lg:space-y-20" aria-live="polite">
        {visibleRegions.map((region) => {
          const list = airlines.filter((a) => a.region === region);
          return (
            <section key={region} aria-labelledby={`region-${region}`} className="grid gap-6 lg:grid-cols-12 lg:gap-10">
              <header className="lg:col-span-3">
                <div className="lg:sticky lg:top-28">
                  <p className="text-sm font-semibold text-coral-600 tabular-nums">
                    {String(list.length).padStart(2, "0")} {list.length === 1 ? "airline" : "airlines"}
                  </p>
                  <h2 id={`region-${region}`} className="mt-1 text-2xl font-bold text-navy-900">
                    {regionLabels[region]}
                  </h2>
                  <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-muted">{regionNotes[region]}</p>
                </div>
              </header>
              <AirlineGrid airlines={list} columns={2} className="lg:col-span-9" />
            </section>
          );
        })}
      </div>
    </div>
  );
}
