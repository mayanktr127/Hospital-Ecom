import urllib.request
import json
import os
import re

urls = {
    "masks_cara_full_face": "https://loewensteinmedical.com/en/masks/cara-full-face/",
    "masks_joyceone_full_face": "https://loewensteinmedical.com/en/masks/joyceone-full-face/",
    "masks_joyceeasy_full_face": "https://loewensteinmedical.com/en/masks/joyceeasy-full-face/",
    "masks_joyceeasy_next_full_face": "https://loewensteinmedical.com/en/masks/joyceeasy-next-full-face/"
}

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

os.makedirs("public/images/site", exist_ok=True)

scraped_full_face = {}

for key, url in urls.items():
    print(f"Scraping {key} from {url}...")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp:
            html = resp.read().decode('utf-8', errors='ignore')

        # Clean HTML tags
        # Extract title <title>
        t_match = re.search(r'<title>(.*?)</title>', html, re.IGNORECASE)
        page_title = t_match.group(1).split('|')[0].strip() if t_match else key.replace("masks_", "").replace("_", " ").title()

        # Extract H1
        h1_match = re.search(r'<h1[^>]*>(.*?)</h1>', html, re.IGNORECASE | re.DOTALL)
        h1_text = re.sub(r'<[^>]+>', '', h1_match.group(1)).strip() if h1_match else page_title

        # Article number SKU
        art_match = re.search(r'Article number:\s*([^\n<]*)', html, re.IGNORECASE)
        art_num = art_match.group(1).strip() if art_match else ""

        # Extract all image URLs
        img_urls = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', html, re.IGNORECASE)
        saved_imgs = []
        for idx, src in enumerate(img_urls):
            if any(k in src for k in ['media', 'processed', 'uploads', 'csm_', 'mask', 'cara', 'joyce']):
                if src.startswith('/'):
                    full_img_url = "https://loewensteinmedical.com" + src
                elif not src.startswith('http'):
                    full_img_url = "https://loewensteinmedical.com/" + src
                else:
                    full_img_url = src

                clean_filename = f"{key}_{idx}_{os.path.basename(src.split('?')[0])}"
                local_path = f"public/images/site/{clean_filename}"
                rel_path = f"/images/site/{clean_filename}"

                if not os.path.exists(local_path):
                    try:
                        img_req = urllib.request.Request(full_img_url, headers=headers)
                        with urllib.request.urlopen(img_req) as img_resp, open(local_path, 'wb') as out_f:
                            out_f.write(img_resp.read())
                        print(f"  Downloaded image: {clean_filename}")
                    except Exception as e:
                        print(f"  Failed image {full_img_url}: {e}")
                saved_imgs.append(rel_path)

        # Extract paragraphs <p>...</p>
        raw_ps = re.findall(r'<p[^>]*>(.*?)</p>', html, re.IGNORECASE | re.DOTALL)
        clean_ps = []
        for p in raw_ps:
            txt = re.sub(r'<[^>]+>', '', p).strip()
            if len(txt) > 15 and not txt.startswith("Copyright") and not txt.startswith("Legal Notice"):
                clean_ps.append(txt)

        # Extract H2, H3
        raw_hs = re.findall(r'<h[23][^>]*>(.*?)</h[23]>', html, re.IGNORECASE | re.DOTALL)
        clean_hs = [re.sub(r'<[^>]+>', '', h).strip() for h in raw_hs if len(re.sub(r'<[^>]+>', '', h).strip()) > 2]

        scraped_full_face[key] = {
            "key": key,
            "title": h1_text,
            "url": url,
            "articleNumbers": art_num,
            "clean_ps": clean_ps,
            "clean_hs": clean_hs,
            "images": saved_imgs
        }
        print(f"  Extracted {len(clean_ps)} paragraphs, {len(clean_hs)} headings, {len(saved_imgs)} images.")

    except Exception as e:
        print(f"Error scraping {key}: {e}")

out_file = 'src/data/product_pages/scraped_full_face.json'
with open(out_file, 'w', encoding='utf-8') as f:
    json.dump(scraped_full_face, f, indent=2, ensure_ascii=False)

print(f"Scraped 4 full face mask pages into {out_file} successfully.")
