import { Link, useNavigate } from "@tanstack/react-router";
import { Search, Bell } from "lucide-react";
import { useState } from "react";

export function SearchForm({ initial = "" }: { initial?: string }) {
  const [q, setQ] = useState(initial);
  const navigate = useNavigate();
  return (
    <form
      role="search"
      className="flex h-12 min-w-0 flex-1 border-2 border-brand bg-card focus-within:ring-2 focus-within:ring-brand-soft"
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
      <button type="submit" aria-label="Search" className="flex w-12 shrink-0 items-center justify-center bg-brand text-primary-foreground hover:bg-brand-hover sm:w-14">
        <Search className="h-5 w-5" />
      </button>
    </form>
  );
}

export function Header({ query }: { query?: string }) {
  return (
    <header className="border-b border-border bg-card">
      <div className="portal-container flex h-8 items-center justify-end gap-3 text-xs text-muted-foreground">
        <Link to="/$service" params={{ service: "account" }} className="hover:text-brand">Account</Link>
        <span aria-hidden>·</span>
        <Link to="/$service" params={{ service: "mail" }} className="relative hover:text-brand" aria-label="Notifications (demo)">
          <Bell className="h-3.5 w-3.5" />
          <span className="absolute -right-1 -top-1 h-1.5 w-1.5 rounded-full bg-alert" />
        </Link>
      </div>
      <div className="portal-container flex flex-col gap-2 pb-3 sm:flex-row sm:items-center sm:gap-6">
        <Link to="/" className="font-display text-2xl font-bold tracking-tight text-brand sm:w-40 sm:text-3xl">
          sholok<span className="text-alert">.</span>
        </Link>
        <div className="flex w-full max-w-2xl"><SearchForm key={query} initial={query} /></div>
      </div>
    </header>
  );
}
