import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutGrid, X } from "lucide-react";
import { useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { SERVICES, CATEGORIES, STATUS_LABEL, activeServiceSlug, type ServiceCategory, type ServiceStatus } from "@/lib/services";
import { cn } from "@/lib/utils";

export function StatusBadge({ status }: { status: ServiceStatus }) {
  return (
    <span className={cn(
      "rounded-sm px-1.5 text-[10px] font-semibold leading-4",
      status === "active" && "bg-brand-soft text-brand",
      status === "preview" && "bg-alert-soft text-alert",
      status === "coming-soon" && "bg-muted text-muted-foreground",
    )}>{STATUS_LABEL[status]}</span>
  );
}

export function ServiceNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const active = activeServiceSlug(pathname);
  return (
    <nav aria-label="Sholok services" className="border-b border-border bg-card">
      <div className="portal-container flex items-stretch">
        <ul className="no-scrollbar flex min-w-0 flex-1 overflow-x-auto">
          {SERVICES.map((s) => {
            const on = s.slug === active;
            const Icon = s.icon;
            return (
              <li key={s.slug} className="shrink-0">
                <Link
                  to="/$service"
                  params={{ service: s.slug }}
                  aria-current={on ? "page" : undefined}
                  className={cn(
                    "flex h-11 items-center gap-1.5 border-b-2 px-2.5 text-[13px] whitespace-nowrap",
                    on ? "border-brand font-bold text-brand" : "border-transparent text-foreground hover:text-brand",
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                  {s.name}
                </Link>
              </li>
            );
          })}
        </ul>
        <AllServices />
      </div>
    </nav>
  );
}

function AllServices() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<ServiceCategory | "All">("All");
  const [open, setOpen] = useState(false);
  const list = useMemo(() => SERVICES.filter((s) =>
    (cat === "All" || s.category === cat) &&
    (s.name + " " + s.description).toLowerCase().includes(q.trim().toLowerCase())), [q, cat]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="flex h-11 shrink-0 items-center gap-1.5 border-l border-border pl-3 text-[13px] font-medium hover:text-brand">
        <LayoutGrid className="h-4 w-4" aria-hidden /> <span className="hidden sm:inline">All Services</span>
        <span className="sr-only sm:hidden">All Services</span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-foreground/30" />
        <Dialog.Content className="fixed inset-x-0 top-0 z-50 mx-auto flex max-h-[100dvh] w-full max-w-3xl flex-col border border-border bg-card sm:top-16 sm:max-h-[80vh] sm:rounded">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <Dialog.Title className="text-base font-bold">All Services</Dialog.Title>
            <Dialog.Close aria-label="Close" className="p-1 hover:text-brand"><X className="h-5 w-5" /></Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">Browse and filter Sholok services</Dialog.Description>
          <div className="space-y-2 border-b border-border px-4 py-3">
            <label htmlFor="svc-q" className="sr-only">Filter services</label>
            <input id="svc-q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Find a service"
              className="h-9 w-full border border-border px-3 outline-none focus:border-brand" />
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Category">
              {(["All", ...CATEGORIES] as const).map((c) => (
                <button key={c} type="button" onClick={() => setCat(c)} aria-pressed={cat === c}
                  className={cn("rounded-sm border px-2 py-0.5 text-xs", cat === c ? "border-brand bg-brand text-primary-foreground" : "border-border hover:border-brand")}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <ul className="grid flex-1 grid-cols-1 overflow-y-auto sm:grid-cols-2">
            {list.map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.slug} className="border-b border-border sm:odd:border-r">
                  <Link to="/$service" params={{ service: s.slug }} onClick={() => setOpen(false)} className="flex items-start gap-3 px-4 py-2.5 hover:bg-brand-soft">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2 font-medium">{s.name} <StatusBadge status={s.status} /></span>
                      <span className="block text-xs text-muted-foreground">{s.description}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
            {list.length === 0 && <li className="px-4 py-6 text-muted-foreground">No services match.</li>}
          </ul>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
