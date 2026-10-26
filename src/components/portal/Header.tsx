import { Link, useNavigate } from "@tanstack/react-router";
import { Search, Bell, Wallet } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function SearchForm({ initial = "" }: { initial?: string }) {
  const [q, setQ] = useState(initial);
  const navigate = useNavigate();
  return (
    <form
      role="search"
      className="flex h-[52px] min-w-0 flex-1 rounded border border-brand bg-card focus-within:ring-2 focus-within:ring-brand-soft"
      onSubmit={(e) => {
        e.preventDefault();
        navigate({ to: "/search", search: { q: q.trim() } });
      }}
    >
      <label htmlFor="sholok-q" className="sr-only">Search Sholok</label>
      <input
        id="sholok-q"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search news, blogs, shopping…"
        className="min-w-0 flex-1 bg-transparent px-3 text-base outline-none placeholder:text-muted-foreground"
      />
      <Button type="submit" aria-label="Search" variant="ghost" className="h-full w-14 shrink-0 rounded-none text-brand hover:bg-brand-soft [&_svg]:size-6">
        <Search className="h-5 w-5" />
      </Button>
    </form>
  );
}

export function Header({ query }: { query?: string }) {
  return (
    <header className="bg-card">
      <div className="portal-container flex h-12 items-center justify-between gap-3 text-xs text-muted-foreground">
        <Link to="/$service" params={{ service: "pay" }} className="flex items-center gap-1.5 hover:text-brand"><Wallet className="h-4 w-4" /> Sholok Pay</Link>
        <div className="flex items-center gap-4"><Link to="/$service" params={{ service: "account" }} className="hover:text-brand">My Account</Link>
        
        <Link to="/$service" params={{ service: "mail" }} className="relative hover:text-brand" aria-label="Notifications (demo)">
          <Bell className="h-3.5 w-3.5" />
          <span className="absolute -right-1 -top-1 h-1.5 w-1.5 rounded-full bg-alert" />
        </Link></div>
      </div>
      <div className="portal-container flex flex-col gap-2 pb-2 pt-1 sm:flex-row sm:items-center sm:justify-center sm:gap-5">
        <Link to="/" className="font-display text-3xl font-bold text-brand sm:text-4xl">
          sholok<span className="text-brand">.</span>
        </Link>
        <div className="flex w-full max-w-[650px]"><SearchForm key={query} initial={query} /></div>
      </div>
    </header>
  );
}
