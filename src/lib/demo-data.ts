// All content here is fabricated demo data. It is not live news, prices, weather or markets.
export const NEWS = [
  { id: "n1", title: "Dhaka metro adds late-night service on weekends", source: "Sholok Demo Desk", topic: "City" },
  { id: "n2", title: "Rajshahi mango growers try new cold-storage co-op", source: "Sample Daily", topic: "Economy" },
  { id: "n3", title: "Students build low-cost flood sensor for river towns", source: "Demo Tech", topic: "Tech" },
  { id: "n4", title: "Book fair organisers announce extended evening hours", source: "Sample Culture", topic: "Culture" },
  { id: "n5", title: "Cricket academy opens new indoor nets in Sylhet", source: "Demo Sports", topic: "Sports" },
  { id: "n6", title: "Guide: how to read your electricity bill", source: "Sholok Demo Desk", topic: "Life" },
  { id: "n7", title: "Small cafés in Chattogram embrace local tea blends", source: "Sample Daily", topic: "Life" },
];

export const TRENDS = [
  "Pohela Boishakh recipes", "Metro rail timetable", "HSC results guide", "Hilsa season",
  "Cox's Bazar hotels", "Bangla keyboard", "Monsoon tips", "Cricket fixtures", "Rickshaw art", "Sundarbans tour",
];

export const BLOG = [
  { id: "b1", title: "Five weekend walks in Old Dhaka", excerpt: "Lanes, sweets and centuries-old mosques within an hour's stroll.", author: "Nusrat" },
  { id: "b2", title: "My first year growing chillies on a balcony", excerpt: "What worked, what wilted, and the pots I'd buy again.", author: "Rafi" },
  { id: "b3", title: "A beginner's guide to Nakshi Kantha", excerpt: "The stitches, the stories, and where to find thread.", author: "Mitu" },
  { id: "b4", title: "Budget train travel from Dhaka to Sylhet", excerpt: "Seats, snacks and the best window side for tea gardens.", author: "Tanvir" },
];

export const PRODUCTS = [
  { id: "p1", name: "Handloom cotton saree", price: "৳ 2,450" },
  { id: "p2", name: "Clay tea set (6 pcs)", price: "৳ 890" },
  { id: "p3", name: "Jute tote bag", price: "৳ 350" },
  { id: "p4", name: "Wireless earbuds", price: "৳ 1,990" },
];

export const MARKETS = [
  { name: "Sample Index A", value: "6,212.4", change: "+0.4%" , up: true },
  { name: "Sample Index B", value: "2,104.8", change: "-0.2%", up: false },
  { name: "USD/BDT (sample)", value: "118.50", change: "0.0%", up: true },
];

export const WEATHER = { city: "Dhaka", temp: "29°", desc: "Partly cloudy", hi: "32°", lo: "26°" };

export function searchAll(q: string) {
  const t = q.trim().toLowerCase();
  if (!t) return [];
  const hit = (s: string) => s.toLowerCase().includes(t);
  return [
    ...NEWS.filter((n) => hit(n.title) || hit(n.topic)).map((n) => ({ kind: "News", title: n.title, meta: n.source, to: "/news" })),
    ...BLOG.filter((b) => hit(b.title) || hit(b.excerpt)).map((b) => ({ kind: "Blog", title: b.title, meta: b.excerpt, to: "/blog" })),
    ...PRODUCTS.filter((p) => hit(p.name)).map((p) => ({ kind: "Shopping", title: p.name, meta: `${p.price} (sample price)`, to: "/shopping" })),
    ...TRENDS.filter(hit).map((x) => ({ kind: "Trend", title: x, meta: "Demo trending topic", to: "/news" })),
  ];
}
