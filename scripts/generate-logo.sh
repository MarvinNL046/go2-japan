#!/bin/bash
# Generate go2-japan.com logo using XAI Grok Image API
set -e

XAI_KEY=$(grep "^XAI_API_KEY=" /home/marvin/Projecten/go2-vietnam.com/.env.local | cut -d= -f2-)

if [ -z "$XAI_KEY" ]; then
  echo "ERROR: XAI_API_KEY not found"
  exit 1
fi

PROMPT="Create a clean, modern travel website logo for 'Go2Japan'. Design requirements:
- Text: 'Go2Japan' or 'Go2 Japan' in a clean, modern sans-serif font
- Icon element: A minimal, elegant torii gate silhouette OR a stylized Mount Fuji shape OR a cherry blossom
- Color palette: Cherry blossom pink (#E8A0BF or similar soft pink) combined with deep indigo/navy (#1A1B4B)
- Style: Flat, minimal, professional — suitable for a travel website header
- Background: Transparent or white
- The logo should be recognizable at small sizes (favicon) and large sizes (header)
- NO photographic elements, NO gradients, NO 3D effects — just clean vector-style flat design
- Aspect ratio: Roughly 3:1 wide (horizontal logo)"

echo "Generating logo with Grok Imagine..."

RESPONSE=$(curl -s -X POST "https://api.x.ai/v1/images/generations" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $XAI_KEY" \
  -d "$(jq -n \
    --arg prompt "$PROMPT" \
    --arg model "grok-2-image" \
    --argjson n 1 \
    '{model: $model, prompt: $prompt, n: $n, response_format: "b64_json"}')")

# Check for errors
ERROR=$(echo "$RESPONSE" | jq -r '.error.message // empty' 2>/dev/null)
if [ -n "$ERROR" ]; then
  echo "API Error: $ERROR"
  echo "Full response: $RESPONSE"
  exit 1
fi

# Extract base64 image
B64=$(echo "$RESPONSE" | jq -r '.data[0].b64_json // empty' 2>/dev/null)
if [ -z "$B64" ]; then
  echo "No image data in response"
  echo "Response: $(echo "$RESPONSE" | head -c 500)"
  exit 1
fi

# Save as PNG
mkdir -p /home/marvin/Projecten/go2-japan.com/public/images
echo "$B64" | base64 -d > /home/marvin/Projecten/go2-japan.com/public/images/logo-generated.png
echo "Logo saved to public/images/logo-generated.png"

# Also generate a favicon version
FAVICON_PROMPT="Create a minimal square icon for 'Go2Japan' travel website. Design:
- A simple, bold torii gate symbol in cherry blossom pink (#E8A0BF) on deep indigo (#1A1B4B) background
- OR a stylized 'G2J' monogram with Japanese aesthetic
- Must be clear and recognizable at 32x32 pixels
- Square format, no text except possibly initials
- Flat, minimal design — NO gradients, NO 3D"

echo "Generating favicon with Grok Imagine..."

FAVICON_RESPONSE=$(curl -s -X POST "https://api.x.ai/v1/images/generations" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $XAI_KEY" \
  -d "$(jq -n \
    --arg prompt "$FAVICON_PROMPT" \
    --arg model "grok-2-image" \
    --argjson n 1 \
    '{model: $model, prompt: $prompt, n: $n, response_format: "b64_json"}')")

FAVICON_B64=$(echo "$FAVICON_RESPONSE" | jq -r '.data[0].b64_json // empty' 2>/dev/null)
if [ -n "$FAVICON_B64" ]; then
  echo "$FAVICON_B64" | base64 -d > /home/marvin/Projecten/go2-japan.com/public/images/favicon-generated.png
  echo "Favicon saved to public/images/favicon-generated.png"
else
  echo "Favicon generation failed, continuing with logo only"
fi

echo "Done!"
