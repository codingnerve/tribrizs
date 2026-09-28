/** Shown briefly during route transitions; mirrors the page hero footprint to avoid layout shift. */
export default function Loading() {
  return (
    <div role="status" aria-label="Loading" className="border-b border-line bg-white">
      <div className="container-page animate-pulse py-16 lg:py-20">
        <div className="h-3 w-24 rounded bg-sand" />
        <div className="mt-5 h-10 w-full max-w-lg rounded bg-sand" />
        <div className="mt-4 h-4 w-full max-w-md rounded bg-sand" />
        <div className="mt-2 h-4 w-2/3 max-w-sm rounded bg-sand" />
      </div>
    </div>
  );
}
