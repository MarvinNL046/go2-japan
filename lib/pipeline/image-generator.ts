const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_IMAGE_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent";

export interface GeneratedImage {
  base64: string;
  mimeType: string;
  prompt: string;
  filePath?: string;
}

const JAPAN_STYLE_MAP: Record<string, string> = {
  "city-guide":
    "vibrant Japanese cityscape, neon lights of Shibuya, cherry blossoms, traditional meets modern architecture, warm golden hour lighting",
  food: "colorful Japanese cuisine, sushi platter, ramen steaming bowls, izakaya atmosphere, fresh sashimi, bustling market",
  activities:
    "adventurous Japan activities, ancient temples, bamboo groves, snow-capped Mount Fuji, serene gardens",
  practical:
    "traveler in Japan, bullet train shinkansen, convenience stores, helpful signage, authentic Japanese details",
  budget:
    "backpacker in Japan, capsule hotel, konbini food, local trains, simple but beautiful Japanese scenery",
  seasonal:
    "Japanese seasonal celebration, cherry blossoms hanami, autumn momiji foliage, summer matsuri fireworks, winter illumination",
  temples:
    "Japanese Buddhist temple, Shinto shrine, torii gates, zen garden, incense smoke, serene atmosphere",
  default:
    "beautiful Japan landscape, Mount Fuji, cherry blossoms, torii gates, zen gardens, vibrant colors",
};

export async function generateImage(prompt: string): Promise<GeneratedImage> {
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const response = await fetch(`${GEMINI_IMAGE_URL}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseModalities: ["IMAGE"] },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Gemini image API error ${response.status}: ${errorBody}`);
  }

  const data = await response.json();
  const parts = data.candidates?.[0]?.content?.parts;
  if (!parts) throw new Error("No content in Gemini response");

  const imagePart = parts.find(
    (p: { inline_data?: { mime_type: string; data: string }; inlineData?: { mimeType: string; data: string } }) =>
      p.inline_data || p.inlineData
  );

  if (imagePart?.inlineData) {
    return { base64: imagePart.inlineData.data, mimeType: imagePart.inlineData.mimeType || "image/png", prompt };
  }
  if (imagePart?.inline_data) {
    return { base64: imagePart.inline_data.data, mimeType: imagePart.inline_data.mime_type || "image/png", prompt };
  }

  throw new Error("No image generated in Gemini response");
}

export async function generateBlogImage(
  title: string,
  category: string,
  slug: string
): Promise<GeneratedImage & { publicPath: string }> {
  const style = JAPAN_STYLE_MAP[category] || JAPAN_STYLE_MAP["default"];

  const prompt = `Create a professional, photorealistic travel photography blog header image for an article titled "${title}".
Visual style: ${style}.
Composition: Wide landscape format (16:9 aspect ratio), high resolution, magazine quality.
Must be evocative of Japan travel — Mount Fuji, cherry blossoms, torii gates, zen gardens, bullet trains, neon cityscapes, bamboo forests, or traditional architecture depending on context.
Lighting: Natural, golden hour, or vibrant urban neon.
CRITICAL RULE: The image must contain ZERO text, ZERO letters, ZERO numbers, ZERO words, ZERO labels, ZERO watermarks, ZERO captions, ZERO UI elements. No characters of any language or alphabet whatsoever. Only use photographic visual elements, scenery, people (from behind or distance), architecture, food, and nature.`;

  const image = await generateImage(prompt);
  const publicPath = `/images/blog/${slug}.webp`;

  console.log(`[image-generator] Image generated for: ${slug} (not saved to disk — will be committed via GitHub API)`);

  return { ...image, publicPath };
}

export function toDataUrl(image: GeneratedImage): string {
  return `data:${image.mimeType};base64,${image.base64}`;
}
