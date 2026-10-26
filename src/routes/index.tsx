import { createFileRoute } from "@tanstack/react-router";
import {
  NewsModule, TopicsModule, BlogModule, ShoppingModule,
  AccountModule, TrendingSearches, WeatherModule, FinanceModule, QuickLinks,
} from "@/components/portal/Modules";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sholok — Search, news and services in one portal" },
      { name: "description", content: "Search Sholok and jump to news, blogs, shopping, weather and more from one compact homepage." },
      { property: "og:title", content: "Sholok — Search portal" },
      { property: "og:description", content: "Search, services and information in one compact portal." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-5">
      <div className="flex min-w-0 flex-col gap-3">
        <NewsModule />
        <TopicsModule />
        <BlogModule />
        <ShoppingModule />
      </div>
      <aside className="flex min-w-0 flex-col gap-3" aria-label="Sidebar">
        <AccountModule />
        <TrendingSearches />
        <WeatherModule />
        <FinanceModule />
        <QuickLinks />
      </aside>
    </div>
  );
}
