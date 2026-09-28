import type { ReactNode } from "react";

const items: { title: string; text: string; icon: ReactNode }[] = [
  {
    title: "Personalized Assistance",
    text: "Talk through your plans with an agent rather than a search box.",
    icon: <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8c.8-3.4 3.6-5.5 7-5.5s6.2 2.1 7 5.5" />,
  },
  {
    title: "Flexible Travel Options",
    text: "One-way, return or multi-city — for one traveler or a group.",
    icon: <path d="M4 17c4 0 6-10 10-10h6M16 3l4 4-4 4M4 7h3M16 13l4 4-4 4M20 17h-6" />,
  },
  {
    title: "Experienced Support",
    text: "Help comparing routes, airlines and timings before you decide.",
    icon: <path d="M12 3 4.5 6v5.5c0 4.4 3.1 8.2 7.5 9.5 4.4-1.3 7.5-5.1 7.5-9.5V6L12 3Zm-3.2 9 2.2 2.2 4.2-4.4" />,
  },
  {
    title: "Easy Enquiry Process",
    text: "Share a few details in under a minute. No payment to enquire.",
    icon: <path d="M8 4h8M8 4a2 2 0 0 0-2 2v13a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6a2 2 0 0 0-2-2M9 11h6M9 15h4" />,
  },
];

export function TrustStrip() {
  return (
    <section aria-label="Why travelers contact TRIBRIZS" className="border-b border-line bg-white">
      <ul className="container-page grid grid-cols-1 divide-y divide-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
        {items.map((item, i) => (
          <li
            key={item.title}
            className={`flex gap-4 py-6 sm:py-8 lg:px-7 lg:first:pl-0 lg:last:pr-0 ${i < 2 ? "sm:border-b sm:border-line lg:border-b-0" : ""}`}
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="mt-0.5 h-6 w-6 shrink-0 text-sky-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {item.icon}
            </svg>
            <div>
              <h3 className="text-[0.9375rem] font-bold text-navy-900">{item.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{item.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
