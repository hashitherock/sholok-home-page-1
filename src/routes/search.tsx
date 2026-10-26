import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { searchAll } from "@/lib/demo-data";
import { SERVICES } from "@/lib/services";

export const Route = createFileRoute("/search")({
  validateSearch: z.object({ q: z.string().optional().catch("") }),
  head: () => ({
    meta: [
      { title: "Search — Sholok" },
      { name: "description", content: "Search Sholok demo news, blogs, shopping and services." },
      { property: "og:title", content: "Search — Sholok" },
      { property: "og:description", content: "Search Sholok demo content and services." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q = "" } = Route.useSearch();
  const term = q.trim();
  const results = searchAll(term);
  const services = term ? SERVICES.filter((s) => s.name.toLowerCase().includes(term.toLowerCase())) : [];

  if (!term) {
    return <p className="module p-4 text-muted-foreground">Type something in the search box above to search Sholok.</p>;
  }
  return (
    <div className="module">
      <div className="module-head">
        <h1>Results for “{term}” <span className="ml-1 font-normal text-muted-foreground">({results.length + services.length})</span></h1>
        <span className="demo-tag">Demo search</span>
      </div>
      <ul className="divide-y divide-border">
        {services.map((s) => (
          <li key={s.slug} className="px-4 py-2.5">
            <span className="text-xs text-brand">Service</span>
            <Link to="/$service" params={{ service: s.slug }} className="block font-medium hover:text-brand">{s.name}</Link>
            <p className="text-xs text-muted-foreground">{s.description}</p>
          </li>
        ))}
        {results.map((r, i) => (
          <li key={i} className="px-4 py-2.5">
            <span className="text-xs text-brand">{r.kind}</span>
            <a href={r.to} className="block font-medium hover:text-brand">{r.title}</a>
            <p className="text-xs text-muted-foreground">{r.meta}</p>
          </li>
        ))}
        {results.length + services.length === 0 && (
          <li className="px-4 py-6 text-muted-foreground">No demo results found. Try “Dhaka”, “tea” or “cricket”.</li>
        )}
      </ul>
    </div>
  );
}
