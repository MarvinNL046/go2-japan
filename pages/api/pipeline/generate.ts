import type { NextApiRequest, NextApiResponse } from "next";
import { generateBlogPost } from "../../../lib/pipeline/content-generator";
import { injectAffiliateLinks } from "../../../lib/pipeline/affiliate-injector";
import { commitFilesToGitHub } from "../../../lib/pipeline/github-commit";
import type { AiModel } from "../../../lib/pipeline/ai-provider";

export const config = {
  maxDuration: 300,
};

function validatePipelineKey(req: NextApiRequest): boolean {
  const key = req.headers["x-pipeline-key"] || req.headers["x-admin-key"];
  return key === process.env.PIPELINE_SECRET;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!validatePipelineKey(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { topic, model = "claude-haiku", publish = false } = req.body as {
      topic?: string;
      model?: AiModel;
      publish?: boolean;
    };

    console.log(`[pipeline/generate] Starting generation. Topic: "${topic || "auto"}", Model: ${model}`);

    const post = await generateBlogPost({
      topic,
      model,
      generateImage: true,
      scrapeContext: true,
    });

    console.log(`[pipeline/generate] Generated: "${post.title}" (slug: ${post.slug})`);

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
      console.log(`[pipeline/generate] Image queued for commit`);
    }

    const savedLocales: string[] = ["en"];

    const commitResult = await commitFilesToGitHub(
      filesToCommit,
      `Add blog post: ${post.title}\n\nAuto-generated. Locales: ${savedLocales.join(", ")}`
    );

    console.log(`[pipeline/generate] Committed ${filesToCommit.length} files to GitHub: ${commitResult.sha}`);

    return res.status(200).json({
      success: true,
      slug: post.slug,
      title: post.title,
      category: post.category,
      locales: savedLocales,
      commitSha: commitResult.sha,
      publish,
    });
  } catch (error) {
    console.error("[pipeline/generate] Error:", error);
    return res.status(500).json({
      error: "Generation failed",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
