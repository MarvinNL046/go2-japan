#!/usr/bin/env python3
"""Download images for go2-japan.com from Unsplash (free) with DALL-E 3 fallback."""

import json
import os
import sys
import time
import urllib.request
import urllib.error
from PIL import Image
from io import BytesIO
import subprocess
import base64

BASE_DIR = "/home/marvin/Projecten/go2-japan.com/public/images"

# Unsplash search queries for each image
IMAGES = {
    # Cities (10)
    "cities/tokyo.webp": "tokyo skyline night japan",
    "cities/kyoto.webp": "kyoto temple japan",
    "cities/osaka.webp": "osaka dotonbori japan",
    "cities/hiroshima.webp": "hiroshima peace memorial japan",
    "cities/nara.webp": "nara deer temple japan",
    "cities/hakone.webp": "hakone mount fuji lake japan",
    "cities/kamakura.webp": "kamakura great buddha japan",
    "cities/nikko.webp": "nikko shrine japan autumn",
    "cities/fukuoka.webp": "fukuoka yatai food stall japan",
    "cities/sapporo.webp": "sapporo snow festival japan",

    # Food (15)
    "food/sushi.webp": "sushi platter japanese restaurant",
    "food/ramen.webp": "japanese ramen bowl noodles",
    "food/tempura.webp": "tempura japanese fried shrimp",
    "food/okonomiyaki.webp": "okonomiyaki japanese pancake",
    "food/takoyaki.webp": "takoyaki octopus balls japan",
    "food/udon.webp": "udon noodle soup japan",
    "food/soba.webp": "soba buckwheat noodles japan",
    "food/tonkatsu.webp": "tonkatsu japanese pork cutlet",
    "food/yakitori.webp": "yakitori grilled chicken skewers japan",
    "food/mochi.webp": "mochi japanese rice cake",
    "food/wagyu.webp": "wagyu beef japanese steak",
    "food/gyoza.webp": "gyoza japanese dumplings",
    "food/onigiri.webp": "onigiri japanese rice ball",
    "food/kaiseki.webp": "kaiseki japanese fine dining",
    "food/matcha-desserts.webp": "matcha green tea dessert japan",

    # Drinks (8)
    "drinks/sake.webp": "sake japanese rice wine",
    "drinks/matcha.webp": "matcha green tea ceremony japan",
    "drinks/shochu.webp": "shochu japanese spirit drink",
    "drinks/umeshu.webp": "umeshu plum wine japan",
    "drinks/japanese-whisky.webp": "japanese whisky bottle glass",
    "drinks/ramune.webp": "ramune japanese soda bottle",
    "drinks/amazake.webp": "amazake sweet rice drink japan",
    "drinks/chuhai.webp": "chuhai japanese cocktail can",

    # Regions (5)
    "regions/kanto.webp": "tokyo tower cityscape japan",
    "regions/kansai.webp": "osaka castle cherry blossom japan",
    "regions/hokkaido.webp": "hokkaido lavender fields japan",
    "regions/kyushu.webp": "kumamoto castle japan",
    "regions/chubu-tohoku.webp": "japanese alps mountain japan",

    # Visas (4)
    "visas/visa-free.webp": "japan airport arrival passport",
    "visas/tourist-visa.webp": "japanese passport stamp visa",
    "visas/evisa.webp": "laptop travel documents japan",
    "visas/working-holiday.webp": "young travelers japan street",

    # Blog (7)
    "blog/japan-travel-guide-2026.webp": "japan travel scenery mount fuji cherry blossom",
    "blog/japan-visa-guide-2026.webp": "japan immigration airport",
    "blog/tokyo-budget-guide.webp": "tokyo street budget backpacker",
    "blog/japanese-food-guide.webp": "japanese food market variety",
    "blog/best-time-to-visit-japan.webp": "japan cherry blossom season spring",
    "blog/kyoto-temples-guide.webp": "kyoto fushimi inari shrine torii",
    "blog/japan-rail-pass-guide.webp": "shinkansen bullet train japan",
}


def search_unsplash(query, retries=2):
    """Search Unsplash and return the best image URL."""
    encoded_query = urllib.parse.quote(query)
    url = f"https://unsplash.com/napi/search/photos?query={encoded_query}&per_page=3&orientation=landscape"

    for attempt in range(retries + 1):
        try:
            req = urllib.request.Request(url, headers={
                "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
                "Accept": "application/json",
            })
            with urllib.request.urlopen(req, timeout=15) as resp:
                data = json.loads(resp.read().decode())

            results = data.get("results", [])
            if not results:
                return None

            # Pick first result, get regular size (1080px wide)
            photo = results[0]
            img_url = photo.get("urls", {}).get("regular")
            photographer = photo.get("user", {}).get("name", "Unknown")
            return {"url": img_url, "photographer": photographer}

        except Exception as e:
            if attempt < retries:
                time.sleep(1)
                continue
            print(f"    Unsplash search failed: {e}")
            return None


def download_image(url, retries=2):
    """Download image from URL and return bytes."""
    for attempt in range(retries + 1):
        try:
            req = urllib.request.Request(url, headers={
                "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
            })
            with urllib.request.urlopen(req, timeout=30) as resp:
                return resp.read()
        except Exception as e:
            if attempt < retries:
                time.sleep(1)
                continue
            print(f"    Download failed: {e}")
            return None


def convert_to_webp(image_bytes, output_path, max_width=1200, quality=82):
    """Convert image to WebP format with resizing."""
    try:
        img = Image.open(BytesIO(image_bytes))
        img = img.convert("RGB")

        # Resize if too large
        if img.width > max_width:
            ratio = max_width / img.width
            new_height = int(img.height * ratio)
            img = img.resize((max_width, new_height), Image.LANCZOS)

        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        img.save(output_path, "WEBP", quality=quality)
        size_kb = os.path.getsize(output_path) // 1024
        return size_kb
    except Exception as e:
        print(f"    Conversion failed: {e}")
        return None


def generate_with_dalle(query, output_path):
    """Fallback: generate image with DALL-E 3."""
    try:
        # Get OpenAI key
        key_cmd = """python3 -c "
line = [l for l in open('/home/marvin/Projecten/go2-vietnam.com/.env.local').readlines() if l.startswith('OPENAI_API_KEY=')][0]
key = line.split('=', 1)[1].strip().strip('\"').strip(\"'\").replace('\\\\\\\\n','').replace('\\\\n','')
print(key, end='')
" """
        openai_key = subprocess.check_output(key_cmd, shell=True).decode().strip()
        if not openai_key:
            return False

        prompt = f"Professional travel photography of {query}. Photorealistic, high quality, landscape format 16:9, magazine quality. No text, no watermarks, no UI elements."

        import json as j
        payload = j.dumps({
            "model": "dall-e-3",
            "prompt": prompt,
            "n": 1,
            "size": "1792x1024",
            "response_format": "b64_json"
        })

        req = urllib.request.Request(
            "https://api.openai.com/v1/images/generations",
            data=payload.encode(),
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {openai_key}",
            }
        )
        with urllib.request.urlopen(req, timeout=60) as resp:
            data = j.loads(resp.read().decode())

        b64 = data["data"][0]["b64_json"]
        image_bytes = base64.b64decode(b64)
        size_kb = convert_to_webp(image_bytes, output_path)
        return size_kb is not None

    except Exception as e:
        print(f"    DALL-E fallback failed: {e}")
        return False


def main():
    total = len(IMAGES)
    downloaded = 0
    generated = 0
    failed = 0
    credits = []  # Track Unsplash photographer credits

    print(f"Downloading {total} images for go2-japan.com\n")

    for rel_path, query in IMAGES.items():
        output_path = os.path.join(BASE_DIR, rel_path)

        # Skip if already exists
        if os.path.exists(output_path) and os.path.getsize(output_path) > 1000:
            print(f"  SKIP {rel_path} (already exists)")
            downloaded += 1
            continue

        print(f"  [{downloaded + generated + failed + 1}/{total}] {rel_path}")
        print(f"    Searching Unsplash: {query}")

        result = search_unsplash(query)
        if result and result["url"]:
            image_bytes = download_image(result["url"])
            if image_bytes:
                size_kb = convert_to_webp(image_bytes, output_path)
                if size_kb:
                    print(f"    OK ({size_kb} KB) - Photo by {result['photographer']}")
                    credits.append(f"{rel_path}: Photo by {result['photographer']} on Unsplash")
                    downloaded += 1
                    time.sleep(0.3)  # Be nice to Unsplash
                    continue

        # Fallback to DALL-E 3
        print(f"    Unsplash failed, trying DALL-E 3...")
        if generate_with_dalle(query, output_path):
            print(f"    OK (DALL-E 3 generated)")
            generated += 1
            time.sleep(1)  # Rate limit for DALL-E
        else:
            print(f"    FAILED - no image available")
            failed += 1

    # Create placeholder if missing
    placeholder_path = os.path.join(BASE_DIR, "placeholder.webp")
    if not os.path.exists(placeholder_path):
        print("\n  Creating placeholder.webp...")
        img = Image.new("RGB", (1200, 800), color=(245, 243, 240))
        img.save(placeholder_path, "WEBP", quality=80)
        print("    OK")

    # Save credits
    if credits:
        credits_path = os.path.join(BASE_DIR, "CREDITS.md")
        with open(credits_path, "w") as f:
            f.write("# Image Credits\n\n")
            f.write("Images sourced from [Unsplash](https://unsplash.com/) under the [Unsplash License](https://unsplash.com/license).\n\n")
            for credit in sorted(credits):
                f.write(f"- {credit}\n")
        print(f"\n  Credits saved to {credits_path}")

    print(f"\n{'='*50}")
    print(f"  Unsplash: {downloaded}")
    print(f"  DALL-E 3: {generated}")
    print(f"  Failed:   {failed}")
    print(f"  Total:    {total}")
    print(f"{'='*50}")


if __name__ == "__main__":
    main()
