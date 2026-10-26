import {
  Search, Mail, Newspaper, PenLine, Coffee, ShoppingBag, Store, Wallet, Map, HelpCircle,
  BookOpen, Library, PlayCircle, Music, Languages, BookA, LineChart, Trophy, CloudSun, User,
  type LucideIcon,
} from "lucide-react";

export type ServiceStatus = "active" | "preview" | "coming-soon";
export type ServiceCategory = "Essentials" | "Content" | "Commerce" | "Tools" | "Info";

export interface Service {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
  category: ServiceCategory;
  status: ServiceStatus;
}

/** Single source of truth for every Sholok service. Routes are `/${slug}`. */
export const SERVICES: Service[] = [
  { slug: "search", name: "Search", description: "Search across Sholok", icon: Search, category: "Essentials", status: "active" },
  { slug: "mail", name: "Mail", description: "Demo inbox preview", icon: Mail, category: "Essentials", status: "preview" },
  { slug: "news", name: "News", description: "Demo headlines by topic", icon: Newspaper, category: "Info", status: "active" },
  { slug: "blog", name: "Blog", description: "Posts from the community", icon: PenLine, category: "Content", status: "active" },
  { slug: "cafe", name: "Cafe", description: "Interest communities", icon: Coffee, category: "Content", status: "coming-soon" },
  { slug: "shopping", name: "Shopping", description: "Demo product highlights", icon: ShoppingBag, category: "Commerce", status: "active" },
  { slug: "smartstore", name: "Smart Store", description: "Open your own store", icon: Store, category: "Commerce", status: "coming-soon" },
  { slug: "pay", name: "Pay", description: "Payments wallet", icon: Wallet, category: "Commerce", status: "coming-soon" },
  { slug: "maps", name: "Maps", description: "Places and directions", icon: Map, category: "Tools", status: "coming-soon" },
  { slug: "knowledge", name: "Knowledge iN", description: "Ask and answer questions", icon: HelpCircle, category: "Content", status: "coming-soon" },
  { slug: "webtoon", name: "Webtoon", description: "Digital comics", icon: BookOpen, category: "Content", status: "coming-soon" },
  { slug: "series", name: "Series", description: "Novels and series", icon: Library, category: "Content", status: "coming-soon" },
  { slug: "videos", name: "Videos", description: "Short and long videos", icon: PlayCircle, category: "Content", status: "coming-soon" },
  { slug: "music", name: "Music", description: "Streaming and charts", icon: Music, category: "Content", status: "coming-soon" },
  { slug: "translator", name: "Translator", description: "Bangla ⇄ English", icon: Languages, category: "Tools", status: "coming-soon" },
  { slug: "dictionary", name: "Dictionary", description: "Word lookup", icon: BookA, category: "Tools", status: "coming-soon" },
  { slug: "finance", name: "Finance", description: "Illustrative market data", icon: LineChart, category: "Info", status: "preview" },
  { slug: "sports", name: "Sports", description: "Scores and fixtures", icon: Trophy, category: "Info", status: "coming-soon" },
  { slug: "weather", name: "Weather", description: "Sample forecast preview", icon: CloudSun, category: "Info", status: "preview" },
  { slug: "account", name: "My Account", description: "Demo account preview", icon: User, category: "Essentials", status: "preview" },
];

export const CATEGORIES: ServiceCategory[] = ["Essentials", "Content", "Commerce", "Tools", "Info"];

export const STATUS_LABEL: Record<ServiceStatus, string> = {
  active: "Active",
  preview: "Preview",
  "coming-soon": "Coming Soon",
};

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

/** Which service is active for a pathname. Only exact service segments match. */
export function activeServiceSlug(pathname: string): string | null {
  const first = pathname.split("/").filter(Boolean)[0];
  if (!first) return null;
  return getService(first)?.slug ?? null;
}
