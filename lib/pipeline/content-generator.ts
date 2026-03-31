import { generateContent, type AiModel } from "./ai-provider";
import { generateBlogImage } from "./image-generator";
import { scrapeTopicContext } from "./scraper";
import fs from "fs";
import path from "path";

// -------------------------------------------------------------------
// Types
// -------------------------------------------------------------------

export type PostCategory =
  | "city-guide"
  | "food"
  | "activities"
  | "practical"
  | "budget"
  | "seasonal";

export interface BlogPostOptions {
  topic?: string;
  category?: PostCategory;
  model?: AiModel;
  generateImage?: boolean;
  scrapeContext?: boolean;
  scrapeUrls?: string[];
}

interface QueuedTopic {
  topic: string;
  category: PostCategory;
  targetKeyword: string;
  searchVolume: number;
  scrapeUrls: string[];
  priority: number;
}

export interface GeneratedPost {
  title: string;
  slug: string;
  date: string;
  author: { name: string };
  category: PostCategory;
  tags: string[];
  image: string;
  imageBase64?: string;
  description: string;
  featured: boolean;
  readingTime: number;
  lastUpdated: string;
  sources: Array<{ name: string; url: string }>;
  content: string;
  scrapeData?: string;
}

export interface TranslatedPost {
  locale: string;
  content: string;
}

// -------------------------------------------------------------------
// Topic bank — Japan travel topics rotating across categories
// -------------------------------------------------------------------

const TOPIC_BANK: Record<PostCategory, string[]> = {
  "city-guide": [
    "Hidden Gems in Tokyo That Most Tourists Miss",
    "Kyoto Beyond Temples: A Local's Guide to the Ancient Capital",
    "Osaka Day Trip: Dotonbori, Street Food & Osaka Castle",
    "Hiroshima Walking Tour: Peace Memorial, Miyajima & Local Culture",
    "Nara Day Trip: Deer Park, Todai-ji & Ancient Temples",
    "Hakone Day Trip from Tokyo: Hot Springs & Mount Fuji Views",
    "Kamakura Travel Guide: The Great Buddha & Seaside Temples",
    "Nikko Travel Guide: Japan's Ornate Mountain Shrine Town",
    "Fukuoka Travel Guide: Hakata Ramen & Kyushu Gateway",
    "Sapporo Travel Guide: Snow Festivals & Hokkaido Adventures",
  ],
  food: [
    "Best Sushi Restaurants and Markets in Tokyo You Must Visit",
    "Ramen Guide: Regional Styles from Hokkaido to Kyushu",
    "Guide to Tempura: Crispy Perfection from Street Stalls to Fine Dining",
    "Okonomiyaki: Osaka vs Hiroshima Style — The Ultimate Comparison",
    "Takoyaki in Osaka: Where to Find the Best Octopus Balls",
    "Udon vs Soba: Understanding Japan's Essential Noodles",
    "Tonkatsu Guide: Japan's Perfect Breaded Pork Cutlet",
    "Yakitori Alleys of Tokyo: A Complete Street Food Guide",
    "Mochi and Wagashi: A Guide to Japanese Traditional Sweets",
    "Matcha Everything: Japan's Green Tea Culture Guide",
    "Wagyu Beef: Where to Eat Japan's World-Famous Beef",
    "Gyoza in Japan: Dumpling Destinations from Utsunomiya to Hakata",
    "Onigiri: Japan's Perfect Convenience Store Snack Guide",
    "Kaiseki: Understanding Japan's Exquisite Multi-Course Dining",
    "Japanese Convenience Store Food: A Konbini Food Guide",
  ],
  activities: [
    "Best Temple and Shrine Walks in Kyoto",
    "Onsen Etiquette and Best Hot Springs in Japan",
    "Cherry Blossom Viewing: Best Hanami Spots Across Japan",
    "Hiking Mount Fuji: Routes, Seasons & What to Expect",
    "Skiing and Snowboarding in Japan: Niseko, Hakuba & Beyond",
    "Sumo Wrestling: Where to Watch and How to Attend a Tournament",
    "Japanese Tea Ceremony: Where to Experience Chado",
    "Martial Arts in Japan: Kendo, Judo & Karate Experiences for Travelers",
    "Day Trips from Tokyo: Best Excursions Within 2 Hours",
    "Island Hopping in Okinawa: Japan's Tropical Paradise",
  ],
  practical: [
    "Japan Rail Pass Guide 2026: Is It Worth It & How to Use It",
    "Pocket WiFi vs eSIM in Japan: Which Is Better in 2026?",
    "IC Cards in Japan: Suica, Pasmo & How to Use Them",
    "Japanese Etiquette Guide: Do's and Don'ts for Visitors",
    "Cash Culture in Japan: Why You Still Need Yen in 2026",
    "Japan Visa Guide 2026: E-Visa, Exemptions & Requirements",
    "Getting Around Japan: Shinkansen, Buses & Local Trains",
    "Airport to City: Best Transfer Options for Tokyo, Osaka & Kyoto",
  ],
  budget: [
    "Japan on $50 Per Day: A Realistic Budget Travel Guide",
    "Free Things to Do in Tokyo (No Entry Fee Needed)",
    "Cheapest Way to Travel Between Japanese Cities",
    "Konbini Food Guide: Eating Well in Japan for Under $10 a Day",
    "Capsule Hotels in Japan: Everything You Need to Know",
    "Free Things to Do in Kyoto",
    "Japan Budget vs Luxury Travel: What's Worth Splurging On",
  ],
  seasonal: [
    "Cherry Blossom Season Guide 2026: Best Spots & Forecast",
    "Autumn Foliage in Japan: Best Momiji Viewing Spots",
    "Summer Festivals in Japan: Matsuri, Fireworks & Bon Odori",
    "Winter Illuminations in Japan: Tokyo, Osaka & Kobe Light Shows",
    "Golden Week in Japan: What Travelers Need to Know",
    "Japan in December: Snow, Lights & New Year Traditions",
    "Typhoon Season in Japan: What Travelers Need to Know",
  ],
};

const TRANSLATION_LOCALES = ["nl"] as const;
export type TranslationLocale = (typeof TRANSLATION_LOCALES)[number];

// -------------------------------------------------------------------
// Topic queue
// -------------------------------------------------------------------

async function getExistingSlugsFromGitHub(): Promise<Set<string>> {
  const slugs = new Set<string>();
  try {
    const token = process.env.GITHUB_TOKEN;
    if (!token) throw new Error("No GITHUB_TOKEN");

    const res = await fetch(
      "https://api.github.com/repos/MarvinNL046/go2-japan.com/contents/content/blog/en",
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
        signal: AbortSignal.timeout(8000),
      }
    );
    if (!res.ok) throw new Error(`GitHub API: ${res.status}`);

    const files = (await res.json()) as Array<{ name: string }>;
    for (const f of files) {
      if (f.name.endsWith(".md")) {
        slugs.add(f.name.replace(".md", ""));
      }
    }
    console.log(`[content-generator] Found ${slugs.size} existing slugs from GitHub`);
  } catch (err) {
    console.warn("[content-generator] GitHub slug check failed, falling back to filesystem:", err);
    const enDir = path.join(process.cwd(), "content", "blog", "en");
    if (fs.existsSync(enDir)) {
      for (const f of fs.readdirSync(enDir)) {
        if (f.endsWith(".md")) slugs.add(f.replace(".md", ""));
      }
    }
  }
  return slugs;
}

async function getNextQueuedTopic(): Promise<(QueuedTopic & { category: PostCategory }) | null> {
  try {
    const queuePath = path.join(process.cwd(), "content", "topic-queue.json");
    if (!fs.existsSync(queuePath)) return null;

    const queue = JSON.parse(fs.readFileSync(queuePath, "utf-8")) as { topics: QueuedTopic[] };
    const existingSlugs = await getExistingSlugsFromGitHub();

    const sorted = [...queue.topics].sort((a, b) => {
      if (a.priority !== b.priority) return a.priority - b.priority;
      return b.searchVolume - a.searchVolume;
    });

    const STOP_WORDS = new Set(["in", "the", "a", "an", "of", "for", "to", "and", "or", "is", "vs", "at", "on", "per", "your", "you", "best", "top", "guide", "complete", "ultimate", "2026", "2025"]);
    const existingSlugList = [...existingSlugs];

    for (const item of sorted) {
      const keywordWords = item.targetKeyword
        .toLowerCase()
        .split(/\s+/)
        .filter((w) => !STOP_WORDS.has(w) && w.length > 1);

      const topicWords = item.topic
        .toLowerCase()
        .split(/[\s:—\-,]+/)
        .filter((w) => !STOP_WORDS.has(w) && w.length > 2);

      const alreadyPublished = existingSlugList.some((slug) => {
        const allKeywordsMatch = keywordWords.length > 0 && keywordWords.every((word) => slug.includes(word));
        const topicMatchCount = topicWords.filter((word) => slug.includes(word)).length;
        const topicMatchRatio = topicWords.length > 0 ? topicMatchCount / topicWords.length : 0;
        return allKeywordsMatch || (topicMatchCount >= 3 && topicMatchRatio >= 0.5);
      });

      if (!alreadyPublished) {
        console.log(`[content-generator] Queue: "${item.topic}" not yet published (keywords: ${keywordWords.join(",")})`);
        return item;
      } else {
        console.log(`[content-generator] Queue: "${item.topic}" already published (keywords: ${keywordWords.join(",")})`);
      }
    }

    return null;
  } catch (err) {
    console.warn("[content-generator] Failed to read topic queue:", err);
    return null;
  }
}

// -------------------------------------------------------------------
// Topic selection
// -------------------------------------------------------------------

export async function selectTopic(
  existingTitles: string[] = [],
  preferredCategory?: PostCategory
): Promise<{ topic: string; category: PostCategory; scrapeUrls?: string[] }> {
  const queued = await getNextQueuedTopic();
  if (queued) {
    console.log(`[content-generator] Using queued topic: "${queued.topic}" (priority ${queued.priority}, volume: ${queued.searchVolume})`);
    return { topic: queued.topic, category: queued.category, scrapeUrls: queued.scrapeUrls };
  }

  const category = preferredCategory || randomFrom(Object.keys(TOPIC_BANK) as PostCategory[]);

  const candidates = TOPIC_BANK[category].filter(
    (t) => !existingTitles.some((existing) => existing.toLowerCase() === t.toLowerCase())
  );

  if (candidates.length === 0) {
    const otherCategory = randomFrom(
      (Object.keys(TOPIC_BANK) as PostCategory[]).filter((c) => c !== category)
    );
    const otherCandidates = TOPIC_BANK[otherCategory].filter(
      (t) => !existingTitles.some((existing) => existing.toLowerCase() === t.toLowerCase())
    );
    const topic = randomFrom(otherCandidates.length > 0 ? otherCandidates : TOPIC_BANK[otherCategory]);
    return { topic, category: otherCategory };
  }

  return { topic: randomFrom(candidates), category };
}

// -------------------------------------------------------------------
// Main blog post generation
// -------------------------------------------------------------------

export async function generateBlogPost(
  options: BlogPostOptions = {}
): Promise<GeneratedPost> {
  const model = options.model || "claude-haiku";
  const doScrape = options.scrapeContext !== false;
  const doImage = options.generateImage !== false;

  let topic = options.topic;
  let category = options.category;
  let scrapeUrls = options.scrapeUrls;

  if (!topic) {
    const selected = await selectTopic([], category);
    topic = selected.topic;
    category = selected.category;
    if (selected.scrapeUrls) scrapeUrls = selected.scrapeUrls;
  } else if (!category) {
    category = detectCategory(topic);
  }

  console.log(`[content-generator] Topic: "${topic}" | Category: ${category}`);

  let scrapeData: string | null = null;
  if (doScrape) {
    try {
      scrapeData = await scrapeTopicContext(topic, scrapeUrls);
      console.log(`[content-generator] Scraped ${scrapeData.length} chars of context`);
    } catch (err) {
      console.warn("[content-generator] Context scrape failed:", err);
    }
  }

  const sitemapLinks = await loadSitemapLinks();

  const prompt = buildPrompt(topic, category!, sitemapLinks, scrapeData);
  const rawResponse = await generateContent(prompt, {
    model,
    maxTokens: 16384,
    temperature: 0.5,
  });

  const post = parseGeneratedPost(rawResponse, topic, category!);

  if (scrapeData) {
    post.scrapeData = scrapeData;
  }

  if (doImage) {
    try {
      const imageResult = await generateBlogImage(post.title, post.category, post.slug);
      post.image = imageResult.publicPath;
      post.imageBase64 = imageResult.base64;
      console.log(`[content-generator] Image generated: ${imageResult.publicPath}`);
    } catch (err) {
      console.warn("[content-generator] Image generation failed:", err);
      post.image = `/images/blog/${post.slug}.webp`;
    }
  }

  return post;
}

// -------------------------------------------------------------------
// Translation
// -------------------------------------------------------------------

export async function translatePost(
  post: GeneratedPost,
  targetLocale: TranslationLocale,
  model: AiModel = "claude-haiku"
): Promise<TranslatedPost> {
  const localeNames: Record<TranslationLocale, string> = {
    nl: "Dutch",
  };

  const localeName = localeNames[targetLocale];

  const prompt = `You are a professional travel content translator specializing in Japanese tourism content.

Translate the following blog post from English to ${localeName}.

STRICT RULES:
1. Translate ALL body text naturally and idiomatically — do NOT be literal
2. Translate: title, description, tags (in the YAML frontmatter), and all Markdown body content
3. Keep UNCHANGED: slug, date, author, category, image path, all URLs (both internal go2-japan.com links and external affiliate links), lastUpdated, sources (names and URLs)
4. Preserve ALL Markdown formatting: headers, bold, italic, tables, blockquotes, code blocks, links
5. Keep affiliate link text in ${localeName} but keep the URL exactly as-is
6. Do NOT add or remove any content — translate only, do not summarize
7. Respond ONLY with the complete translated Markdown — no explanation, no preamble

DUTCH TRANSLATION QUALITY:
- Write natural, native-level Dutch — NOT literal translations from English
- Use informal "je/jouw" tone (not formal "u")
- Common travel terms: strand, duiken, snorkelen, nachtleven, backpacken, budgetreiziger

BLOG POST TO TRANSLATE:
${post.content}`;

  const translatedContent = await generateContent(prompt, {
    model,
    maxTokens: 16384,
    temperature: 0.3,
  });

  return {
    locale: targetLocale,
    content: translatedContent.trim(),
  };
}

// -------------------------------------------------------------------
// Sitemap internal link loader
// -------------------------------------------------------------------

const buildAnchor = (url: string, section: string): string => {
  const parts = url.split("/").filter(Boolean);
  const lastPart = parts[parts.length - 1] || section;
  const name = lastPart.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase());
  const sectionLabels: Record<string, string> = {
    city: "travel guide", islands: "island guide", food: "food guide",
    blog: "", compare: "comparison", region: "region guide",
    visa: "", "practical-info": "",
  };
  const label = sectionLabels[section];
  if (label && !name.toLowerCase().includes("guide") && !name.toLowerCase().includes(section)) {
    return `${name} ${label}`;
  }
  return name;
};

async function loadSitemapLinks(): Promise<string> {
  const siteUrl = "https://go2-japan.com";

  try {
    const localSitemapPath = path.join(process.cwd(), "public", "sitemap.xml");
    let xml: string;

    if (fs.existsSync(localSitemapPath)) {
      xml = fs.readFileSync(localSitemapPath, "utf-8");
    } else {
      const response = await fetch(`${siteUrl}/sitemap.xml`, {
        signal: AbortSignal.timeout(10000),
      });
      if (!response.ok) return FALLBACK_INTERNAL_LINKS;
      xml = await response.text();
    }

    const urlMatches = xml.match(/<loc>([^<]+)<\/loc>/g) || [];
    const allUrls = urlMatches
      .map((m) => m.replace(/<\/?loc>/g, ""))
      .filter((url) => url.startsWith(siteUrl))
      .filter((url) => {
        const p = url.replace(siteUrl, "");
        return !p.match(/^\/(nl|en)\//);
      });

    const groups: Record<string, string[]> = {};
    for (const url of allUrls) {
      const p = url.replace(siteUrl, "");
      if (!p || p === "/") continue;
      const section = p.split("/")[1] || "other";
      if (!groups[section]) groups[section] = [];
      if (groups[section].length < 15) {
        groups[section].push(url);
      }
    }

    let result = "";
    for (const [section, urls] of Object.entries(groups)) {
      if (urls.length === 0) continue;
      result += `${section}:\n`;
      for (const url of urls) {
        const anchor = buildAnchor(url, section);
        result += `- [${anchor}](${url})\n`;
      }
      result += "\n";
    }
    return result || FALLBACK_INTERNAL_LINKS;
  } catch {
    return FALLBACK_INTERNAL_LINKS;
  }
}

const FALLBACK_INTERNAL_LINKS = `
city:
- [Tokyo](https://go2-japan.com/city/tokyo/)
- [Kyoto](https://go2-japan.com/city/kyoto/)
- [Osaka](https://go2-japan.com/city/osaka/)
- [Hiroshima](https://go2-japan.com/city/hiroshima/)
- [Nara](https://go2-japan.com/city/nara/)
- [Hakone](https://go2-japan.com/city/hakone/)
- [Kamakura](https://go2-japan.com/city/kamakura/)
- [Nikko](https://go2-japan.com/city/nikko/)
- [Fukuoka](https://go2-japan.com/city/fukuoka/)
- [Sapporo](https://go2-japan.com/city/sapporo/)

food:
- [Japanese Food Guide](https://go2-japan.com/food/)
- [Sushi](https://go2-japan.com/food/sushi/)
- [Ramen](https://go2-japan.com/food/ramen/)
- [Tempura](https://go2-japan.com/food/tempura/)
- [Okonomiyaki](https://go2-japan.com/food/okonomiyaki/)
- [Takoyaki](https://go2-japan.com/food/takoyaki/)
- [Udon](https://go2-japan.com/food/udon/)
- [Soba](https://go2-japan.com/food/soba/)
- [Tonkatsu](https://go2-japan.com/food/tonkatsu/)

drinks:
- [Japanese Drinks](https://go2-japan.com/drinks/)
- [Matcha](https://go2-japan.com/drinks/matcha/)
- [Sake](https://go2-japan.com/drinks/sake/)

practical-info:
- [Practical Info](https://go2-japan.com/practical-info/)
- [Japan Weather](https://go2-japan.com/weather/)

region:
- [Regions Overview](https://go2-japan.com/region/)

blog:
- [Blog](https://go2-japan.com/blog/)
`;

// -------------------------------------------------------------------
// Prompt builder
// -------------------------------------------------------------------

function buildPrompt(
  topic: string,
  category: PostCategory,
  sitemapLinks: string,
  scrapeData: string | null
): string {
  const siteUrl = "https://go2-japan.com";
  const today = new Date().toISOString().split("T")[0];
  const year = new Date().getFullYear();

  let widgetReference: string = '';
  try {
    const refPath = path.join(process.cwd(), 'content', 'writer-reference.md');
    if (fs.existsSync(refPath)) {
      widgetReference = fs.readFileSync(refPath, 'utf-8');
    }
    const affRefPath = path.join(process.cwd(), 'content', 'affiliate-reference.txt');
    if (fs.existsSync(affRefPath)) {
      widgetReference += '\n\n---\nFULL AFFILIATE & WIDGET REFERENCE:\n' + fs.readFileSync(affRefPath, 'utf-8');
    }
  } catch { /* ignore */ }

  const categoryInstructions: Record<PostCategory, string> = {
    "city-guide":
      "Write an in-depth city/destination guide. Cover neighborhoods, top sights, where to eat, where to stay, and practical tips. Structure chronologically or by area. Include a 1-day and 3-day itinerary suggestion.",
    food: "Write a comprehensive Japanese food guide. Explain the dish/cuisine with cultural context, regional variations, where to find the best versions, and how to order like a local. Include a comparison table of similar dishes.",
    activities:
      "Write a detailed activities/experiences guide. Compare options (operators, prices, locations), give honest pros/cons, and include a practical booking guide at the end.",
    practical:
      "Write a thorough practical travel guide. Cover all scenarios, give exact prices and steps, and anticipate common questions. Accuracy is critical — cite official sources where possible.",
    budget:
      "Write a realistic budget travel guide with exact costs in Japanese Yen (JPY) and USD. Include sample day budgets, money-saving tips, and where to splurge vs. save.",
    seasonal:
      "Write a seasonal/festival travel guide. Cover what happens, when, where the best locations are, and how to plan. Include practical tips for crowds and booking.",
  };

  const contextSection: string = scrapeData
    ? `\nREFERENCE DATA — THIS IS YOUR PRIMARY SOURCE OF TRUTH:
Use ONLY the facts, prices, statistics, and details from the data below. If a fact is NOT in this reference data, do NOT include it — leave it out rather than guess.
Every price, statistic, and specific claim MUST come from this data or a cited external source. When in doubt, say "prices vary" rather than inventing a number.

${scrapeData.slice(0, 6000)}\n`
    : "";

  return `You are a senior Japan travel writer for go2-japan.com, a comprehensive Japan travel resource.
You and your team have lived in and traveled Japan extensively — Tokyo for 2 years, explored the Kansai region, hiked the Japanese Alps, and navigated Osaka as locals. You write from genuine first-hand experience.

Write a comprehensive, SEO-optimized blog post about: "${topic}"

${categoryInstructions[category]}

---

CONTENT REQUIREMENTS:

1. FRONTMATTER (YAML):
Generate valid YAML frontmatter with these exact fields:
\`\`\`yaml
---
title: "The Full Post Title"
slug: "url-friendly-slug"
date: "${today}"
author:
  name: "Go2Japan Team"
category: "${category}"
tags: ["tag1", "tag2", "tag3", "tag4"]
image: "/images/blog/SLUG.webp"
description: "Compelling meta description under 155 characters"
featured: false
readingTime: 8
lastUpdated: "${today}"
sources:
  - name: "Japan National Tourism Organization"
    url: "https://www.japan.travel/en/"
  - name: "Lonely Planet Japan"
    url: "https://www.lonelyplanet.com/japan"
  - name: "Japan Times"
    url: "https://www.japantimes.co.jp/"
---
\`\`\`
Replace SLUG in the image path with the actual slug value.
Add 2-3 more relevant sources. Include 4-6 specific, relevant tags.

2. OPENING PARAGRAPH:
Hook the reader immediately. Start with a compelling fact, scene-setting description, or provocative question. **Bold the primary keyword** on first mention. 2-3 sentences max before the Key Takeaways table.

3. KEY TAKEAWAYS TABLE (immediately after intro):
\`\`\`markdown
## Key Takeaways

| Question | Answer |
|----------|--------|
| **What is the best time to visit?** | Answer with **bold keyword** |
| **How much does it cost?** | Average costs in JPY and USD |
| **How do I get there?** | Best transport option |
| **Is it safe?** | Honest safety assessment |
| **What should I book in advance?** | Specific recommendations |
\`\`\`
5-7 rows covering the key questions readers have.

4. BODY SECTIONS (8-10 numbered H2 sections):
Each section must have:
- Numbered H2: ## 1. Section Title
- 2 opening paragraphs with **bold keywords** on first mention
- 2 H3 subheadings (### Subheading) with 1-2 paragraphs each
- At least half the sections: a bullet list with 3-5 items. Start each item with a bold descriptive label like: **Best Spot:** or **Pro Tip:** or **Budget Option:** (use a REAL descriptive label, NEVER write the literal words "Bold Label")
- First-person experience signals ("When we visited...", "In our experience...", "During our time in...")

5. DID YOU KNOW CALLOUTS (2-3 throughout the article):
\`\`\`markdown
> **Did You Know?** The actual interesting fact with a specific statistic here.
>
> *Source: [Source Name](https://source-url.com)*
\`\`\`

6. COMPARISON TABLE (at least one):
\`\`\`markdown
| Option | Best For | Cost | Rating |
|--------|----------|------|--------|
| **Option A** | Description | JPY X | stars |
| **Option B** | Description | JPY X | stars |
\`\`\`

7. WIDGET PLACEMENT (MANDATORY — place 3-5 widgets throughout the article):
Place these HTML comment placeholders in your output where you want a styled widget box to appear.
They will be automatically replaced with beautiful styled components.

CRITICAL FORMAT RULE: ALWAYS use EXACTLY the HTML comment syntax shown below.
NEVER write WIDGET as plain text, a list item, or markdown. NEVER write "- WIDGET:booking" or "WIDGET:booking" on its own.
The ONLY correct format is:

<!-- WIDGET:booking -->

Place the widget on its own line, with a blank line above and below it. Example of correct placement:

...end of a paragraph about hotels in Tokyo.

<!-- WIDGET:booking -->

## 3. Next Section Title

Available widgets (copy EXACTLY as shown, including the comment syntax):
- <!-- WIDGET:booking --> — after mentioning hotels, accommodation, where to stay
- <!-- WIDGET:klook --> — after mentioning tours, activities, cooking classes, day trips
- <!-- WIDGET:getyourguide --> — after mentioning guided tours, food tours, walking tours
- <!-- WIDGET:12go --> — after mentioning buses, trains, ferries, transport between cities
- <!-- WIDGET:saily --> — after mentioning SIM cards, eSIM, internet, staying connected
- <!-- WIDGET:trip --> — after mentioning flights, airports, flying
- <!-- WIDGET:tip:Your practical tip text here --> — for non-commercial travel advice

RULES:
- Place widgets AFTER a relevant paragraph, before the next section
- Never place two widgets back-to-back — always have text between them
- Minimum: 1x booking + 1x activity (klook or getyourguide) + 1 other
- Maximum: 5 widgets total
- The tip widget text should be a short, practical piece of advice (1-2 sentences max)
- ALWAYS use HTML comment syntax <!-- WIDGET:type --> — NEVER write WIDGET as plain text, list item, or markdown

8. FAQ SECTION (end of article):
\`\`\`markdown
## Frequently Asked Questions

### Question one here?
Answer here.

### Question two here?
Answer here.
\`\`\`
5-7 questions targeting Google "People Also Ask" queries. Each answer must be concise (2-4 sentences) and include at least one specific fact, price, or actionable detail.

9. CONCLUSION:
Summarize key points, include a clear CTA linking to a relevant go2-japan.com page, and a trust statement.

---

INTERNAL LINKING (critical for SEO — MANDATORY: include 10-15 internal links naturally woven throughout the body):
- Spread links across the article — do NOT put all links in the conclusion
- EVERY H2 section MUST contain at least 1 internal link
- Use keyword-rich anchor text (e.g., "our Tokyo travel guide", "Kyoto temple walking guide") — NEVER "click here" or bare city names
- No duplicate anchor text — each internal link must have a unique anchor phrase
- EVERY internal link MUST have a full URL on go2-japan.com. NEVER write [Link Text] without (https://go2-japan.com/...). If you're unsure of the URL, use the closest match from the sitemap above or omit the link entirely.
- Link city mentions to city guide pages: e.g., [our Tokyo travel guide](https://go2-japan.com/city/tokyo/)
- Link food mentions to food pages: e.g., [complete Japanese food guide](https://go2-japan.com/food/)
- Link practical mentions to practical info: [getting around Japan by train](https://go2-japan.com/practical-info/)
- Pick additional RELEVANT links from the sitemap below

Available internal links (use the most relevant ones):
${sitemapLinks}
${widgetReference ? `\nWRITER REFERENCE (additional context):\n${widgetReference}\n` : ''}
---

E-E-A-T SIGNALS (critical for Google trust and AdSense approval):
- EXPERIENCE: Reference hands-on visits ("When we explored...", "Our team spent a week...") — every 2-3 sections must have at least one first-person experience signal
- EXPERTISE: Use precise, accurate details — prices in JPY, distances in km, specific venue names
- AUTHORITATIVENESS: Cite credible sources (JNTO, Lonely Planet, Japan Times) in Did You Know callouts
- TRUSTWORTHINESS: Be honest about negatives and tourist traps. Say "avoid" when necessary.
- Every statistic MUST have a source cited.
- Include a brief affiliate disclosure sentence near the top of the article (after the Key Takeaways table): "*Some links in this article are affiliate links — if you book through them, we earn a small commission at no extra cost to you. This helps us keep go2-japan.com free and up to date.*"

EXTERNAL LINKING:
Include 3-5 credible external links (JNTO, Lonely Planet, Japan Times, official venue websites).

---

ANTI-HALLUCINATION RULES (CRITICAL — FOLLOW EXACTLY):
1. NEVER invent prices, statistics, percentages, or specific numbers. Use ONLY data from the REFERENCE DATA section below or well-known public facts.
2. If you don't have a specific price from the reference data, write "prices vary" or "check the latest prices" with a link. Do NOT guess.
3. NEVER fabricate quotes, testimonials, or specific venue details you're unsure about.
4. Specific venue names, addresses, and operating hours MUST come from the reference data. If unsure, describe the area/neighborhood instead of naming a specific place.
5. For historical facts and cultural context, use only widely known, verifiable information.
6. If the reference data contradicts common assumptions, ALWAYS prefer the reference data.
7. Every "Did You Know" callout MUST have a real, verifiable source link — not a made-up one.
8. Be honest: "Based on our research..." is better than fabricating a firsthand experience you don't have data for.
9. NEVER output meta-instructions, content strategy notes, or behind-the-scenes commentary. Your output must be ONLY the blog post that a reader would see.
10. NEVER mention "Booking.com", "Klook", "GetYourGuide", "12Go Asia", "Saily", or "Trip.com" by brand name. Just describe the travel action naturally — the brand names and links are added automatically after your writing.

---

TARGET LENGTH: 2500-3500 words of body content (excluding frontmatter).
TONE: Knowledgeable, warm, practical — like advice from a well-traveled friend who knows Japan deeply.
ANTI-AI DETECTION: Vary sentence length (mix short punchy sentences with longer descriptive ones). Avoid starting consecutive paragraphs with the same word. Use contractions naturally ("don't", "we've", "it's"). Avoid overused AI filler phrases like "delve into", "it's worth noting", "nestled in", "a testament to", "vibrant tapestry". Write with personality and occasional mild humor.
${contextSection}

RESPOND WITH THE COMPLETE BLOG POST — frontmatter + Markdown body only. No preamble, no explanation.`;
}

// -------------------------------------------------------------------
// Response parser
// -------------------------------------------------------------------

function parseGeneratedPost(
  rawResponse: string,
  topic: string,
  category: PostCategory
): GeneratedPost {
  const today = new Date().toISOString().split("T")[0];

  let content = rawResponse.trim();

  content = content.replace(/^```yaml\s*\n?/, "");
  content = content.replace(/^```(?:markdown|md)?\s*\n?/, "");
  content = content.replace(/^yaml\s*\n/, "");
  content = content.replace(/\n?\s*```\s*$/, "");
  content = content.replace(/^(---\s*\n[\s\S]*?\n---)\s*\n```\s*\n/, "$1\n");
  content = content.replace(/```(?:markdown|md|)?\s*\n((?:[^\n]*\|[^\n]*\n)+)```/g, "$1");

  const instructionPatterns = [
    /^#+\s*Affiliate Integration Points.*$/gim,
    /^#+\s*Internal [Ll]inking.*$/gim,
    /\((?:in-text reference|link[s]? injected|links? will be injected|naturally woven)[^)]*\)/gi,
    /\([^)]*will be injected[^)]*\)/gi,
    /\([^)]*injected on publish[^)]*\)/gi,
    /^[-*]\s*(?:Hotel\/accommodation|Tour\/activity|Transport tips|eSIM\/SIM|City:|Food:|Hotels:|Attractions:|Weather:)\s*:.*(?:injected|woven|links?).*$/gim,
    /^[-*]\s*(?:City|Food|Hotels|Attractions|Weather):\s*.+$/gim,
    /^Internal linking woven through the article:?\s*$/gim,
    /^Examples? in context:?\s*$/gim,
    /^#+\s*Opening paragraph\s*$/gim,
    /^Opening paragraph\s*$/gim,
    /^#+?\s*External links?:?\s*$/gim,
    /^Note:\s+Prices and opening hours.*$/gim,
    /^#+?\s*External links?\s*(?:for further reading)?\s*$/gim,
    /^[-*]?\s*Internal links?(?:\s+to\b|\s*:).*$/gim,
    /^Bold the primary keyword.*$/gim,
    /^Respond with the complete.*$/gim,
    /^Practical Info:\s*https?:\/\/.*$/gim,
    /^(?:Sushi|Ramen|Tempura|Udon|Soba).*https?:\/\/go2-japan\.com.*$/gim,
  ];

  for (const pattern of instructionPatterns) {
    content = content.replace(pattern, '');
  }

  content = content.replace(/\*?\*?Bold Label:\s*/g, '**');
  content = content.replace(/^([-*]\s*)Bold Label:\s*(.+?):\s*/gm, '$1**$2:** ');
  content = content.replace(/^(---[\s\S]*?---)\s*\n+```(?:markdown|md)?\s*\n/m, '$1\n\n');
  content = content.replace(/\n{4,}/g, '\n\n\n');

  const fmMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);

  let title = topic;
  let slug = slugify(topic);
  let description = "";
  let postCategory: PostCategory = category;
  let tags: string[] = [];
  let image = `/images/blog/${slug}.webp`;
  let readingTime = 8;
  let sources: Array<{ name: string; url: string }> = [];

  if (fmMatch) {
    const fm = fmMatch[1];

    const titleMatch = fm.match(/^title:\s*["']?(.+?)["']?\s*$/m);
    const slugMatch = fm.match(/^slug:\s*["']?(.+?)["']?\s*$/m);
    const descMatch = fm.match(/^description:\s*["']?(.+?)["']?\s*$/m);
    const catMatch = fm.match(/^category:\s*["']?(.+?)["']?\s*$/m);
    const imageMatch = fm.match(/^image:\s*["']?(.+?)["']?\s*$/m);
    const rtMatch = fm.match(/^readingTime:\s*(\d+)/m);

    if (titleMatch) title = titleMatch[1].trim();
    if (slugMatch) slug = slugMatch[1].trim();
    if (descMatch) description = descMatch[1].trim().slice(0, 155);
    if (catMatch) postCategory = (catMatch[1].trim() as PostCategory) || category;
    if (imageMatch) image = imageMatch[1].trim();
    if (rtMatch) readingTime = parseInt(rtMatch[1], 10);

    const tagsMatch = fm.match(/^tags:\s*\[([^\]]+)\]/m);
    if (tagsMatch) {
      tags = tagsMatch[1].split(",").map((t) => t.trim().replace(/^["']|["']$/g, ""));
    }

    const sourceMatches = [...fm.matchAll(/- name:\s*["']?(.+?)["']?\s*\n\s*url:\s*["']?(.+?)["']?\s*$/gm)];
    sources = sourceMatches.map((m) => ({ name: m[1].trim(), url: m[2].trim() }));
  }

  if (!image || image === "/images/blog/SLUG.webp") {
    image = `/images/blog/${slug}.webp`;
  } else {
    image = image.replace("/SLUG.webp", `/${slug}.webp`);
  }

  return {
    title,
    slug,
    date: today,
    author: { name: "Go2Japan Team" },
    category: postCategory,
    tags,
    image,
    description,
    featured: false,
    readingTime,
    lastUpdated: today,
    sources,
    content,
  };
}

// -------------------------------------------------------------------
// Utilities
// -------------------------------------------------------------------

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function detectCategory(topic: string): PostCategory {
  const lower = topic.toLowerCase();
  if (lower.includes("food") || lower.includes("eat") || lower.includes("restaurant") || lower.includes("street food") || lower.includes("sushi") || lower.includes("ramen") || lower.includes("tempura") || lower.includes("udon") || lower.includes("soba") || lower.includes("okonomiyaki") || lower.includes("takoyaki") || lower.includes("tonkatsu") || lower.includes("yakitori") || lower.includes("wagyu") || lower.includes("gyoza") || lower.includes("onigiri") || lower.includes("kaiseki") || lower.includes("matcha") || lower.includes("mochi")) return "food";
  if (lower.includes("visa") || lower.includes("money") || lower.includes("scam") || lower.includes("sim") || lower.includes("esim") || lower.includes("insurance") || lower.includes("transport") || lower.includes("rail pass") || lower.includes("jr pass") || lower.includes("ic card") || lower.includes("suica") || lower.includes("pasmo") || lower.includes("etiquette") || lower.includes("cash") || lower.includes("pocket wifi")) return "practical";
  if (lower.includes("budget") || lower.includes("cheap") || lower.includes("free") || lower.includes("$") || lower.includes("konbini") || lower.includes("capsule hotel")) return "budget";
  if (lower.includes("festival") || lower.includes("cherry blossom") || lower.includes("hanami") || lower.includes("season") || lower.includes("autumn") || lower.includes("foliage") || lower.includes("momiji") || lower.includes("golden week") || lower.includes("illumination") || lower.includes("matsuri") || lower.includes("typhoon")) return "seasonal";
  if (lower.includes("temple") || lower.includes("shrine") || lower.includes("onsen") || lower.includes("hot spring") || lower.includes("hiking") || lower.includes("skiing") || lower.includes("sumo") || lower.includes("tea ceremony") || lower.includes("martial art") || lower.includes("diving") || lower.includes("snorkeling")) return "activities";
  return "city-guide";
}
