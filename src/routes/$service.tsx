import { createFileRoute, notFound } from "@tanstack/react-router";
import { getService } from "@/lib/services";
import { StatusBadge } from "@/components/portal/ServiceNav";
import {
  NewsModule, BlogModule, ShoppingModule, WeatherModule, FinanceModule, AccountModule, QuickLinks,
} from "@/components/portal/Modules";

export const Route = createFileRoute("/$service")({
  loader: ({ params }) => {
    const s = getService(params.service);
    if (!s) throw notFound();
    return { name: s.name, description: s.description };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — Sholok` },
          { name: "description", content: `Sholok ${loaderData.name}: ${loaderData.description}.` },
          { property: "og:title", content: `${loaderData.name} — Sholok` },
          { property: "og:description", content: loaderData.description },
          { property: "og:type", content: "website" },
          { name: "twitter:card", content: "summary" },
        ]
      : [{ title: "Unavailable — Sholok" }, { name: "robots", content: "noindex" }],
  }),
  component: ServicePage,
});

const BODY: Record<string, () => React.ReactNode> = {
  news: () => <NewsModule />,
  blog: () => <BlogModule />,
  shopping: () => <ShoppingModule />,
  weather: () => <WeatherModule />,
  finance: () => <FinanceModule />,
  account: () => <AccountModule />,
  mail: () => (
    <section className="module">
      <div className="module-head"><h2>Inbox <span className="demo-tag">Demo</span></h2></div>
      <ul className="divide-y divide-border">
        {["Welcome to Sholok Mail", "Your weekly digest (sample)", "Book fair reminder (sample)"].map((m) => (
          <li key={m} className="px-4 py-2.5">{m}</li>
        ))}
      </ul>
    </section>
  ),
};

function ServicePage() {
  const { service } = Route.useParams();
  const s = getService(service)!;
  const Icon = s.icon;
  const Body = BODY[s.slug];
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-5">
      <div className="flex min-w-0 flex-col gap-3">
        <div className="module flex items-center gap-3 p-4">
          <Icon className="h-6 w-6 text-brand" aria-hidden />
          <div className="min-w-0">
            <h1 className="flex items-center gap-2 text-lg font-bold">{s.name} <StatusBadge status={s.status} /></h1>
            <p className="text-[13px] text-muted-foreground">{s.description}</p>
          </div>
        </div>
        {Body ? <Body /> : (
          <p className="module p-6 text-center text-muted-foreground">{s.name} is coming soon to Sholok.</p>
        )}
      </div>
      <aside className="min-w-0" aria-label="Sidebar"><QuickLinks /></aside>
    </div>
  );
}
