import type { NextApiRequest, NextApiResponse } from "next";
import { generateBlogPost } from "../../../lib/pipeline/content-generator";
import { injectAffiliateLinks } from "../../../lib/pipeline/affiliate-injector";
import { commitFilesToGitHub } from "../../../lib/pipeline/github-commit";
import fs from "fs";
import path from "path";

export const config = {
  maxDuration: 300,
};

interface FoodTopic {
  topic: string;
  category: "food";
  targetKeyword: string;
  searchVolume: number;
  scrapeUrls: string[];
  priority: number;
}

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
    console.log(`[food-blog] Found ${slugs.size} existing slugs from GitHub`);
  } catch (err) {
    console.warn("[food-blog] GitHub slug check failed, falling back to filesystem:", err);
    const enDir = path.join(process.cwd(), "content", "blog", "en");
    if (fs.existsSync(enDir)) {
      for (const f of fs.readdirSync(enDir)) {
        if (f.endsWith(".md")) slugs.add(f.replace(".md", ""));
      }
    }
  }
  return slugs;
}

async function getNextFoodTopic(): Promise<FoodTopic | null> {
  try {
    const queuePath = path.join(process.cwd(), "content", "food-topic-queue.json");
    if (!fs.existsSync(queuePath)) return null;

    const queue = JSON.parse(fs.readFileSync(queuePath, "utf-8")) as { topics: FoodTopic[] };
    const existingSlugs = await getExistingSlugsFromGitHub();

    const sorted = [...queue.topics].sort((a, b) => {
      if (a.priority !== b.priority) return a.priority - b.priority;
      return b.searchVolume - a.searchVolume;
    });

    const STOP_WORDS = new Set(["in", "the", "a", "an", "of", "for", "to", "and", "or", "is", "vs", "at", "on"]);
    const existingSlugList = [...existingSlugs];

    for (const item of sorted) {
      const keywordWords = item.targetKeyword
        .toLowerCase()
        .split(/\s+/)
        .filter((w) => !STOP_WORDS.has(w) && w.length > 1);

      const alreadyPublished = existingSlugList.some((slug) => {
        return keywordWords.every((word) => slug.includes(word));
      });

      if (!alreadyPublished) {
        console.log(`[food-blog] Queue: "${item.topic}" not yet published (words: ${keywordWords.join(",")})`);
        return item;
      } else {
        console.log(`[food-blog] Queue: "${item.topic}" already published (words: ${keywordWords.join(",")})`);
      }
    }

    return null;
  } catch (err) {
    console.warn("[food-blog] Failed to read food topic queue:", err);
    return null;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || req.headers.authorization !== `Bearer ${cronSecret}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    console.log("[cron/generate-food-blog] Starting food blog generation...");

    const nextTopic = await getNextFoodTopic();

    if (!nextTopic) {
      console.log("[cron/generate-food-blog] No unpublished food topics remaining");
      return res.status(200).json({
        success: true,
        message: "No unpublished food topics remaining in queue",
      });
    }

    const post = await generateBlogPost({
      topic: nextTopic.topic,
      category: "food",
      model: "claude-haiku",
      generateImage: true,
      scrapeContext: true,
      scrapeUrls: nextTopic.scrapeUrls.length > 0 ? nextTopic.scrapeUrls : undefined,
    });

    console.log(`[cron/generate-food-blog] Generated: "${post.title}" (slug: ${post.slug})`);

    const filesToCommit: Array<{ path: string; content: string; encoding?: "utf-8" | "base64" }> = [];

    const contentWithAffiliates = injectAffiliateLinks(post.content, {
      inlineLinks: true,
      ctaBoxes: true,
      ctaCount: 3,
    });
    post.content = contentWithAffiliates;

    filesToCommit.push({
      path: `content/blog/en/${post.slug}.md`,
      content: post.content,
      encoding: "utf-8",
    });

    if (post.imageBase64) {
      filesToCommit.push({
        path: `public/images/blog/${post.slug}.webp`,
        content: post.imageBase64,
        encoding: "base64",
      });
      console.log("[cron/generate-food-blog] Image queued for commit");
    }

    const commitResult = await commitFilesToGitHub(
      filesToCommit,
      `Add food blog post: ${post.title}\n\nAuto-generated food content. Category: food`
    );

    console.log(`[cron/generate-food-blog] Committed ${filesToCommit.length} files: ${commitResult.sha}`);

    return res.status(200).json({
      success: true,
      slug: post.slug,
      title: post.title,
      category: post.category,
      commitSha: commitResult.sha,
    });
  } catch (error) {
    console.error("[cron/generate-food-blog] Error:", error);
    return res.status(500).json({
      error: "Food blog cron job failed",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
