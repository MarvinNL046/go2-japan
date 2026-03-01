// -------------------------------------------------------------------
// Affiliate link injection for go2-japan.com blog posts
// -------------------------------------------------------------------
// Partners and their tracking URLs:
//   Booking.com   → https://booking.tpo.lv/2PT1kR82
//   Klook         → https://klook.tpo.lv/7Dt6WApj
//   GetYourGuide  → https://getyourguide.tpo.lv/GuAFfGGK
//   12Go Asia     → https://12go.tpo.lv/tNA80urD
//   Saily eSIM    → https://saily.tpo.lv/rf9lidnE
//   Trip.com      → https://trip.tpo.lv/TmObooZ5
//   Viator        → https://viator.tpo.lv/TUcQTS5u
//   NordVPN       → https://nordvpn.tpo.lv/ekHF1i55
//   NordPass      → https://nordvpn.tpo.lv/tp12zNjC
// -------------------------------------------------------------------

export const AFFILIATE_LINKS = {
  booking: "https://booking.tpo.lv/2PT1kR82",
  klook: "https://klook.tpo.lv/7Dt6WApj",
  getyourguide: "https://getyourguide.tpo.lv/GuAFfGGK",
  "12go": "https://12go.tpo.lv/tNA80urD",
  saily: "https://saily.tpo.lv/rf9lidnE",
  trip: "https://trip.tpo.lv/TmObooZ5",
  viator: "https://viator.tpo.lv/TUcQTS5u",
  nordvpn: "https://nordvpn.tpo.lv/ekHF1i55",
  nordpass: "https://nordvpn.tpo.lv/tp12zNjC",
} as const;

export type AffiliatePartner = keyof typeof AFFILIATE_LINKS;

export const SPECIFIC_AFFILIATE_LINKS = {
  "booking-deals": "https://booking.tpo.lv/pDNjHJA1",
  "booking-flights": "https://booking.tpo.lv/LUkugxWF",
  "booking-car-rental": "https://booking.tpo.lv/Nmm5XgwI",
  "trip-trains": "https://trip.tpo.lv/gNIdNBmi",
  "trip-bundles": "https://trip.tpo.lv/L83mcBdE",
  "trip-airport-transfers": "https://trip.tpo.lv/hY8hOUey",
  "trip-car-rental": "https://trip.tpo.lv/zGKhdcce",
} as const;

// -------------------------------------------------------------------
// Keyword → affiliate mapping
// -------------------------------------------------------------------

interface AffiliateRule {
  pattern: RegExp;
  partner: AffiliatePartner;
  linkText: string;
  overrideUrl?: string;
}

const AFFILIATE_RULES: AffiliateRule[] = [
  {
    pattern: /\b(car rental|rent a car|hire a car|rental car)\b/i,
    partner: "booking" as AffiliatePartner,
    linkText: "Rent a Car on Booking.com",
    overrideUrl: "https://booking.tpo.lv/Nmm5XgwI",
  },
  {
    pattern: /\b(airport transfer|airport shuttle|airport taxi|airport pickup|airport drop|Narita Express|Haruka Express|limousine bus)\b/i,
    partner: "trip" as AffiliatePartner,
    linkText: "Book Airport Transfer",
    overrideUrl: "https://trip.tpo.lv/hY8hOUey",
  },
  {
    pattern: /\b(shinkansen|bullet train|JR Pass|Japan Rail Pass|train to|train from|Japanese train|railway|train route|train station|Tokaido|Sanyo|Hokuriku)\b/i,
    partner: "trip" as AffiliatePartner,
    linkText: "Book Train on Trip.com",
    overrideUrl: "https://trip.tpo.lv/gNIdNBmi",
  },
  {
    pattern: /\b(hotel.*deal|travel deal|best deal|discount hotel|cheap hotel|hotel offer|last.?minute)\b/i,
    partner: "booking" as AffiliatePartner,
    linkText: "See Deals on Booking.com",
    overrideUrl: "https://booking.tpo.lv/pDNjHJA1",
  },
  {
    pattern: /\b(eSIM|e-SIM|SIM card|data SIM|travel SIM|mobile data|internet connection|stay connected|pocket WiFi|pocket wifi)\b/i,
    partner: "saily",
    linkText: "Get Saily eSIM",
  },
  {
    pattern: /\b(bus ticket|bus ride|highway bus|night bus|overnight bus|ferry|ferry ride|boat ticket|boat ride|train ticket|train ride|train journey|book.*transport|book.*transfer|12Go|Willer Express)\b/i,
    partner: "12go",
    linkText: "Book on 12Go",
  },
  {
    pattern: /\b(flight|flights|book.*flight|search.*flight|airline|trip\.com|cheap flight|domestic flight|fly to)\b/i,
    partner: "trip",
    linkText: "Search on Trip.com",
  },
  {
    pattern: /\b(cooking class|snorkeling tour|snorkeling|diving course|scuba diving|day trip|bike tour|Klook|boat tour|island tour|temple tour|tea ceremony|sumo tournament|onsen experience|kimono rental)\b/i,
    partner: "klook",
    linkText: "Book on Klook",
  },
  {
    pattern: /\b(Viator|Tripadvisor tour|TripAdvisor experience)\b/i,
    partner: "viator",
    linkText: "Book on Viator",
  },
  {
    pattern: /\b(guided tour|walking tour|food tour|group tour|tour operator|activities|excursion|experience|GetYourGuide)\b/i,
    partner: "getyourguide",
    linkText: "Book on GetYourGuide",
  },
  {
    pattern: /\b(hotel|hotels|hostel|resort|ryokan|minshuku|capsule hotel|accommodation|accommodations|where to stay|book.*stay|Booking\.com|place to stay|lodging|guesthouse|guest house)\b/i,
    partner: "booking",
    linkText: "Book on Booking.com",
  },
];

// -------------------------------------------------------------------
// CTA box templates
// -------------------------------------------------------------------

interface CtaBox {
  partner: AffiliatePartner;
  emoji: string;
  heading: string;
  body: string;
  cta: string;
  overrideUrl?: string;
}

const CTA_BOXES: CtaBox[] = [
  {
    partner: "booking",
    emoji: "\u{1F3E8}",
    heading: "Book Your Stay",
    body: "Compare hotels, ryokans, and hostels across Japan with free cancellation on most bookings.",
    cta: "Search Hotels on Booking.com \u2192",
  },
  {
    partner: "klook",
    emoji: "\u{1F392}",
    heading: "Book Tours & Activities",
    body: "Skip the hassle \u2014 book Japan day trips, temple tours, tea ceremonies, and experiences in advance with instant confirmation.",
    cta: "Browse Activities on Klook \u2192",
  },
  {
    partner: "12go",
    emoji: "\u{1F68C}",
    heading: "Book Transport in Japan",
    body: "Book highway buses, ferries, and transfers between Japanese cities easily online. Compare routes and prices.",
    cta: "Book Transport on 12Go \u2192",
  },
  {
    partner: "saily",
    emoji: "\u{1F4F1}",
    heading: "Stay Connected in Japan",
    body: "Get a Japan eSIM before you land. No physical SIM needed \u2014 activate instantly on your phone.",
    cta: "Get Saily eSIM for Japan \u2192",
  },
  {
    partner: "getyourguide",
    emoji: "\u{1F5FA}\uFE0F",
    heading: "Explore Japan with a Guide",
    body: "Discover the best guided tours and activities in Tokyo, Kyoto, Osaka and beyond.",
    cta: "Browse Tours on GetYourGuide \u2192",
  },
  {
    partner: "trip",
    emoji: "\u2708\uFE0F",
    heading: "Find Flights to Japan",
    body: "Search and compare flights to Tokyo, Osaka, Kyoto and Sapporo at the best prices.",
    cta: "Search Flights on Trip.com \u2192",
  },
  {
    partner: "viator",
    emoji: "\u{1F3DB}\uFE0F",
    heading: "Popular Tours by Viator",
    body: "Browse top-rated Japan tours and experiences curated by Tripadvisor's Viator.",
    cta: "Explore Tours on Viator \u2192",
  },
  {
    partner: "nordvpn",
    emoji: "\u{1F512}",
    heading: "Stay Secure Online While Traveling",
    body: "Protect your connection on public WiFi in Japan. NordVPN keeps your data private wherever you are.",
    cta: "Get NordVPN \u2192",
  },
  {
    partner: "nordpass",
    emoji: "\u{1F511}",
    heading: "Manage Your Passwords Safely",
    body: "Travel stress-free with NordPass \u2014 a secure password manager that keeps all your accounts safe.",
    cta: "Get NordPass \u2192",
  },
  {
    partner: "booking" as AffiliatePartner,
    emoji: "\u{1F697}",
    heading: "Rent a Car in Japan",
    body: "Compare car rental prices across Japan. Pick up at airports or city locations with flexible cancellation.",
    cta: "Compare Car Rentals \u2192",
    overrideUrl: "https://booking.tpo.lv/Nmm5XgwI",
  },
  {
    partner: "trip" as AffiliatePartner,
    emoji: "\u{1F682}",
    heading: "Book Shinkansen Tickets",
    body: "Bullet train tickets from Tokyo to Kyoto, Osaka, Hiroshima, and beyond. Book online, skip the queue.",
    cta: "Book Train Tickets \u2192",
    overrideUrl: "https://trip.tpo.lv/gNIdNBmi",
  },
  {
    partner: "trip" as AffiliatePartner,
    emoji: "\u{1F695}",
    heading: "Airport Transfers in Japan",
    body: "Pre-book your airport pickup in Tokyo Narita, Haneda, or Osaka Kansai. No haggling, fixed prices.",
    cta: "Book Airport Transfer \u2192",
    overrideUrl: "https://trip.tpo.lv/hY8hOUey",
  },
];

// -------------------------------------------------------------------
// Inline link injection
// -------------------------------------------------------------------

export function injectInlineLinks(content: string): string {
  const injected = new Set<AffiliatePartner>();
  const { frontmatter, body } = splitFrontmatter(content);
  let processedBody = body;

  for (const rule of AFFILIATE_RULES) {
    if (injected.has(rule.partner)) continue;
    const url = rule.overrideUrl || AFFILIATE_LINKS[rule.partner];
    const match = rule.pattern.exec(processedBody);
    if (!match) continue;
    const matchIndex = match.index;
    if (isInsideLink(processedBody, matchIndex)) continue;
    if (isInsideCodeBlock(processedBody, matchIndex)) continue;

    const originalText = match[0];
    const linkedText = `[${originalText}](${url})`;
    processedBody = processedBody.slice(0, matchIndex) + linkedText + processedBody.slice(matchIndex + originalText.length);
    injected.add(rule.partner);
  }

  return frontmatter + processedBody;
}

// -------------------------------------------------------------------
// CTA box injection
// -------------------------------------------------------------------

export function injectCtaBoxes(content: string, count: number = 3): string {
  const { frontmatter, body } = splitFrontmatter(content);
  const selectedBoxes = selectRelevantCtaBoxes(body, count);
  if (selectedBoxes.length === 0) return content;

  const h2Positions = findH2Positions(body);
  if (h2Positions.length < 2) {
    const ctaMarkdown = selectedBoxes.map(renderCtaBox).join("\n\n");
    return frontmatter + body.trimEnd() + "\n\n" + ctaMarkdown + "\n";
  }

  const insertPositions = pickInsertPositions(h2Positions, selectedBoxes.length);
  let processedBody = body;
  for (let i = insertPositions.length - 1; i >= 0; i--) {
    const pos = insertPositions[i];
    const box = renderCtaBox(selectedBoxes[i]);
    processedBody = processedBody.slice(0, pos) + "\n\n" + box + "\n\n" + processedBody.slice(pos);
  }

  return frontmatter + processedBody;
}

// -------------------------------------------------------------------
// Main entry point
// -------------------------------------------------------------------

export interface InjectionOptions {
  inlineLinks?: boolean;
  ctaBoxes?: boolean;
  ctaCount?: number;
  processWidgets?: boolean;
}

export function injectAffiliateLinks(content: string, options: InjectionOptions = {}): string {
  const { inlineLinks = true, ctaBoxes = true, ctaCount = 2, processWidgets = true } = options;
  let result = content;

  if (processWidgets) result = processWidgetPlaceholders(result);
  if (inlineLinks) result = injectInlineLinks(result);
  if (ctaBoxes) result = injectCtaBoxes(result, ctaCount);

  return result;
}

// -------------------------------------------------------------------
// Helpers
// -------------------------------------------------------------------

function renderCtaBox(box: CtaBox): string {
  const url = box.overrideUrl || AFFILIATE_LINKS[box.partner];

  const colors: Record<AffiliatePartner, { bg: string; border: string; btn: string; btnHover: string }> = {
    booking: { bg: '#EFF6FF', border: '#3B82F6', btn: '#2563EB', btnHover: '#1D4ED8' },
    klook: { bg: '#F0FDF4', border: '#22C55E', btn: '#16A34A', btnHover: '#15803D' },
    getyourguide: { bg: '#FFF7ED', border: '#F97316', btn: '#EA580C', btnHover: '#C2410C' },
    '12go': { bg: '#FFFBEB', border: '#F59E0B', btn: '#D97706', btnHover: '#B45309' },
    saily: { bg: '#FAF5FF', border: '#A855F7', btn: '#9333EA', btnHover: '#7E22CE' },
    trip: { bg: '#F0F9FF', border: '#0EA5E9', btn: '#0284C7', btnHover: '#0369A1' },
    viator: { bg: '#F0FDF4', border: '#059669', btn: '#047857', btnHover: '#065F46' },
    nordvpn: { bg: '#EFF6FF', border: '#4338CA', btn: '#4338CA', btnHover: '#3730A3' },
    nordpass: { bg: '#FDF2F8', border: '#DB2777', btn: '#BE185D', btnHover: '#9D174D' },
  };

  const qrCodes: Record<AffiliatePartner, string> = {
    booking: '/images/qrcodes/qrcode-booking.com.jpeg',
    klook: '/images/qrcodes/qrcode-klook.jpeg',
    getyourguide: '/images/qrcodes/qrcode-gyg-1.jpeg',
    '12go': '/images/qrcodes/qrcode-12go.jpeg',
    saily: '/images/qrcodes/qrcode-saily-1.jpeg',
    trip: '',
    viator: '/images/qrcodes/qrcode-viator.jpeg',
    nordvpn: '/images/qrcodes/qrcode-nordvpn.jpeg',
    nordpass: '/images/qrcodes/qrcode-nordpass.jpeg',
  };

  const c = colors[box.partner];
  const qr = qrCodes[box.partner];

  const qrHtml = qr ? `
    <a href="${url}" target="_blank" rel="noopener noreferrer sponsored" style="flex-shrink:0;text-align:center;text-decoration:none;">
      <img src="${qr}" alt="Scan to visit ${box.heading}" style="width:72px;height:72px;border-radius:8px;border:1px solid ${c.border}33;" />
      <span style="display:block;font-size:10px;color:#6B7280;margin-top:4px;">Scan me</span>
    </a>` : '';

  return `<div data-widget-fallback style="background:${c.bg};border-left:4px solid ${c.border};border-radius:12px;padding:20px 24px;margin:32px 0;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
  <div style="display:flex;align-items:flex-start;gap:16px;">
    <div style="flex:1;">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
        <span style="font-size:28px;line-height:1;">${box.emoji}</span>
        <strong style="font-size:18px;color:#1F2937;">${box.heading}</strong>
      </div>
      <p style="color:#4B5563;margin:0 0 12px 0;font-size:15px;line-height:1.5;">${box.body}</p>
      <a href="${url}" target="_blank" rel="noopener noreferrer sponsored" style="display:inline-block;background:${c.btn};color:white;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">${box.cta}</a>
    </div>${qrHtml}
  </div>
</div>`;
}

export function processWidgetPlaceholders(content: string): string {
  const { frontmatter, body } = splitFrontmatter(content);
  let processedBody = body;

  processedBody = processedBody.replace(/^[-*]\s*WIDGET:(\w+)\s*$/gm, '<!-- WIDGET:$1 -->');
  processedBody = processedBody.replace(/^WIDGET:(\w+)\s*$/gm, '<!-- WIDGET:$1 -->');
  processedBody = processedBody.replace(/^[-*]\s*WIDGET:\[.*?\]\(.*?\)\s*$/gm, '');
  processedBody = processedBody.replace(/^[-*]\s*WIDGET:tip:(.+)$/gm, '<!-- WIDGET:tip:$1 -->');

  for (const box of CTA_BOXES) {
    const placeholder = `<!-- WIDGET:${box.partner} -->`;
    if (processedBody.includes(placeholder)) {
      const fallbackHtml = renderCtaBox(box);
      const widgetHtml = `<div data-widget="${box.partner}" style="margin:32px 0;">${fallbackHtml}</div>`;
      processedBody = processedBody.replace(placeholder, widgetHtml);
    }
  }

  processedBody = processedBody.replace(
    /<!-- WIDGET:tip:(.+?) -->/g,
    (_, tipText) => {
      return `<div style="background:#FEF3C7;border-left:4px solid #F59E0B;border-radius:12px;padding:20px 24px;margin:32px 0;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
  <div style="display:flex;align-items:flex-start;gap:12px;">
    <span style="font-size:28px;line-height:1;">\u{1F4A1}</span>
    <div style="flex:1;">
      <strong style="font-size:18px;color:#92400E;display:block;margin-bottom:6px;">Pro Tip</strong>
      <p style="color:#78350F;margin:0;font-size:15px;line-height:1.5;">${tipText}</p>
    </div>
  </div>
</div>`;
    }
  );

  return frontmatter + processedBody;
}

function selectRelevantCtaBoxes(body: string, count: number): CtaBox[] {
  const lower = body.toLowerCase();
  const scored = CTA_BOXES.map((box) => {
    let score = 0;
    if (box.partner === "booking" && (lower.includes("hotel") || lower.includes("stay") || lower.includes("accommodation") || lower.includes("ryokan") || lower.includes("capsule"))) score += 3;
    if (box.partner === "klook" && (lower.includes("tour") || lower.includes("activity") || lower.includes("tea ceremony") || lower.includes("temple") || lower.includes("onsen") || lower.includes("kimono"))) score += 3;
    if (box.partner === "12go" && (lower.includes("bus") || lower.includes("ferry") || lower.includes("train") || lower.includes("transport") || lower.includes("transfer") || lower.includes("shinkansen"))) score += 3;
    if (box.partner === "saily" && (lower.includes("esim") || lower.includes("sim") || lower.includes("data") || lower.includes("internet") || lower.includes("connected") || lower.includes("pocket wifi"))) score += 3;
    if (box.partner === "getyourguide" && (lower.includes("tour") || lower.includes("guide") || lower.includes("excursion"))) score += 2;
    if (box.partner === "trip" && (lower.includes("flight") || lower.includes("airport") || lower.includes("fly"))) score += 3;
    if (box.partner === "booking") score += 1;
    if (box.partner === "klook") score += 1;
    return { box, score };
  });

  return scored.sort((a, b) => b.score - a.score).slice(0, count).map((s) => s.box);
}

function findH2Positions(body: string): number[] {
  const positions: number[] = [];
  const lines = body.split("\n");
  let charPos = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    charPos += line.length + 1;
    if (line.match(/^## /)) {
      let endPos = charPos;
      for (let j = i + 1; j < lines.length && j < i + 20; j++) {
        const nextLine = lines[j];
        endPos += nextLine.length + 1;
        if (nextLine.match(/^#{1,3} /) && j > i + 3) break;
      }
      positions.push(endPos);
    }
  }

  return positions;
}

function pickInsertPositions(positions: number[], count: number): number[] {
  if (positions.length <= count) return positions.slice(1);
  const step = Math.floor(positions.length / (count + 1));
  return Array.from({ length: count }, (_, i) => positions[(i + 1) * step]);
}

function isInsideLink(text: string, pos: number): boolean {
  const before = text.slice(Math.max(0, pos - 200), pos);
  const after = text.slice(pos, Math.min(text.length, pos + 200));
  const openBracket = before.lastIndexOf("[");
  const closeBracket = after.indexOf("](");
  return openBracket !== -1 && closeBracket !== -1 && openBracket > before.lastIndexOf("]");
}

function isInsideCodeBlock(text: string, pos: number): boolean {
  const before = text.slice(0, pos);
  const codeBlockCount = (before.match(/```/g) || []).length;
  return codeBlockCount % 2 === 1;
}

function splitFrontmatter(content: string): { frontmatter: string; body: string } {
  const match = content.match(/^(---[\s\S]*?---\n?)([\s\S]*)$/);
  if (match) return { frontmatter: match[1], body: match[2] };
  return { frontmatter: "", body: content };
}
