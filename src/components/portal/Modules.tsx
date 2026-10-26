import { Link } from "@tanstack/react-router";
import { ChevronRight, CloudSun } from "lucide-react";
import type { ReactNode } from "react";
import { NEWS, TRENDS, BLOG, PRODUCTS, MARKETS, WEATHER, DEMO_MEDIA } from "@/lib/demo-data";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/services";

export function Module({ title, to, children }: { title: string; to?: string; children: ReactNode }) {
  return (
    <section className="module" aria-label={title}>
      <div className="module-head">
        <h2 className="flex items-center gap-2">{title} <span className="demo-tag">Demo</span></h2>
        {to && (
          <Link to="/$service" params={{ service: to }} className="flex items-center text-xs font-normal text-muted-foreground hover:text-brand">
            More <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

const Thumb = ({ size = "h-16 w-24", index = 0, product = false, alt = "Demo editorial photograph" }: { size?: string; index?: number; product?: boolean; alt?: string }) => (
  <div className={`${size} media-tile ${["crop-0", "crop-1", "crop-2", "crop-3"][index] ?? "crop-0"} shrink-0 rounded-sm`}>
    <img src={product ? DEMO_MEDIA.products : DEMO_MEDIA.editorial} alt={alt} loading="lazy" width={1024} height={1024} />
  </div>
);

export function NewsModule({ limit = 7 }: { limit?: number }) {
  const [lead, ...rest] = NEWS.slice(0, limit);
  if (!lead) return null;
  return (
    <Module title="Newsstand" to="news">
      <div className="mx-4 mt-3 flex items-center gap-3 bg-muted px-3 py-2 text-xs">
        <Link to="/$service" params={{ service: "news" }} className="shrink-0 font-bold hover:text-brand">All news</Link>
        <span className="h-3 border-l border-border" />
        <Link to="/search" search={{ q: lead.title }} className="truncate hover:text-brand">{lead.title}</Link>
      </div>
      <div className="grid grid-cols-3 border-b border-border px-4 py-3 sm:grid-cols-6">
        {NEWS.slice(0, 6).map(n => <Link key={n.id} to="/search" search={{ q: n.topic }} className="flex h-12 items-center justify-center border border-border text-xs font-bold hover:bg-brand-soft hover:text-brand">{n.topic}</Link>)}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <Link to="/search" search={{ q: lead.title }} className="flex gap-3 border-b border-border p-4 hover:text-brand sm:border-b-0 sm:border-r">
          <Thumb size="h-24 w-28" alt="Generated demo photograph of a Dhaka metro train" />
          <div className="min-w-0"><span className="text-xs text-brand">{lead.topic}</span><h3 className="mt-1 font-bold leading-snug">{lead.title}</h3><p className="mt-1 text-[11px] text-muted-foreground">{lead.source}</p></div>
        </Link>
        <ul className="divide-y divide-border px-4 py-2">
          {rest.map(n => <li key={n.id} className="py-1.5"><Link to="/search" search={{ q: n.title }} className="flex items-baseline justify-between gap-2 hover:text-brand"><span className="truncate text-[13px]">{n.title}</span><span className="shrink-0 text-[10px] text-muted-foreground">{n.topic}</span></Link></li>)}
        </ul>
      </div>
    </Module>
  );
}

export function TopicsModule() {
  return (
    <Module title="Trending topics">
      <div className="flex flex-wrap gap-1.5 p-3.5">
        {TRENDS.slice(0, 8).map((t) => (
          <Link key={t} to="/search" search={{ q: t }} className="rounded-sm border border-border px-2 py-0.5 text-[13px] hover:border-brand hover:text-brand">
            #{t}
          </Link>
        ))}
      </div>
    </Module>
  );
}

export function BlogModule() {
  return (
    <Module title="Blog" to="blog">
      <ul className="grid grid-cols-[minmax(0,1fr)] divide-y divide-border sm:grid-cols-2 sm:divide-y-0">
        {BLOG.map((b, i) => (
          <li key={b.id} className={`flex gap-3 p-3.5 ${i > 1 ? "sm:border-t" : ""} ${i % 2 === 0 ? "sm:border-r" : ""} border-border`}>
            <Thumb index={[1, 2, 1, 3][i] ?? 0} alt={`Generated demo photograph for ${b.title}`} />
            <div className="min-w-0">
              <h3 className="line-clamp-2 font-medium"><Link to="/search" search={{ q: b.title }} className="hover:text-brand">{b.title}</Link></h3>
              <p className="line-clamp-2 text-xs text-muted-foreground">{b.excerpt}</p>
              <p className="text-[11px] text-muted-foreground">by {b.author}</p>
            </div>
          </li>
        ))}
      </ul>
    </Module>
  );
}

export function ShoppingModule() {
  return (
    <Module title="Shopping highlights" to="shopping">
      <ul className="grid grid-cols-2 gap-3 p-3.5 sm:grid-cols-4">
        {PRODUCTS.map((p, i) => (
          <li key={p.id} className="min-w-0">
            <Link to="/search" search={{ q: p.name }}><Thumb size="aspect-[1.25] w-full" index={i} product alt={`Generated demo image of ${p.name}`} /></Link>
            <p className="mt-1.5 truncate text-[13px]">{p.name}</p>
            <p className="text-[13px] font-bold">{p.price} <span className="text-[10px] font-normal text-muted-foreground">sample</span></p>
          </li>
        ))}
      </ul>
    </Module>
  );
}

export function AccountModule() {
  return (
    <section className="module p-4" aria-label="Account">
      <p className="text-center text-[13px] text-muted-foreground">Your Sholok account <span className="demo-tag ml-1">Demo</span></p>
      <Button asChild className="mt-3 h-12 w-full rounded-sm font-bold shadow-none"><Link to="/$service" params={{ service: "account" }}>sholok · Account preview</Link></Button>
      <div className="mt-2.5 flex justify-center gap-4 text-xs text-muted-foreground">
        <Link to="/$service" params={{ service: "mail" }} className="hover:text-brand">Mail <span className="font-bold text-alert">3</span></Link>
        <Link to="/$service" params={{ service: "pay" }} className="hover:text-brand">Pay</Link>
        <Link to="/$service" params={{ service: "cafe" }} className="hover:text-brand">Cafe</Link>
      </div>
    </section>
  );
}

export function TrendingSearches() {
  return (
    <Module title="Trending searches">
      <ol className="grid grid-cols-2 gap-x-4 px-3.5 py-2">
        {TRENDS.map((t, i) => (
          <li key={t} className="flex min-w-0 items-center gap-2 py-1 text-[13px]">
            <span className={`w-4 shrink-0 font-bold ${"text-brand"}`}>{i + 1}</span>
            <Link to="/search" search={{ q: t }} className="truncate hover:text-brand">{t}</Link>
          </li>
        ))}
      </ol>
    </Module>
  );
}

export function WeatherModule() {
  return (
    <Module title="Weather" to="weather">
      <div className="flex items-center gap-3 p-3.5">
        <CloudSun className="h-9 w-9 text-brand" aria-hidden />
        <div>
          <p><span className="text-2xl font-bold">{WEATHER.temp}</span> <span className="text-[13px]">{WEATHER.desc}</span></p>
          <p className="text-xs text-muted-foreground">{WEATHER.city} · H {WEATHER.hi} / L {WEATHER.lo} · sample values</p>
        </div>
      </div>
    </Module>
  );
}

export function FinanceModule() {
  return (
    <Module title="Finance" to="finance">
      <ul className="divide-y divide-border px-3.5">
        {MARKETS.map((m) => (
          <li key={m.name} className="flex justify-between gap-2 py-1.5 text-[13px]">
            <span className="truncate">{m.name}</span>
            <span className="shrink-0"><b>{m.value}</b> <span className={m.up ? "text-alert" : "text-brand"}>{m.change}</span></span>
          </li>
        ))}
      </ul>
      <p className="px-3.5 pb-2 text-[11px] text-muted-foreground">Illustrative figures, not live market data.</p>
    </Module>
  );
}

const QUICK = ["mail", "maps", "dictionary", "translator", "finance", "sports", "videos", "account"];
export function QuickLinks() {
  return (
    <section className="module" aria-label="Quick links">
      <div className="module-head"><h2>Quick links</h2></div>
      <ul className="grid grid-cols-4">
        {SERVICES.filter((s) => QUICK.includes(s.slug)).map((s) => {
          const Icon = s.icon;
          return (
            <li key={s.slug}>
              <Link to="/$service" params={{ service: s.slug }} className="flex flex-col items-center gap-1 py-2.5 text-xs hover:text-brand">
                <Icon className="h-4 w-4 text-brand" aria-hidden />
                <span className="truncate">{s.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
