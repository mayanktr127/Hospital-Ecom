import urllib.request
import re
import os
import json
from html import unescape

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

os.makedirs("public/images/pulmocare", exist_ok=True)

# List of all shop URLs to crawl for products
urls_to_crawl = [
    "https://pulmocare.in/shop/",
    "https://pulmocare.in/shop/page/2/",
    "https://pulmocare.in/shop/page/3/",
    "https://pulmocare.in/shop/page/4/",
    "https://pulmocare.in/respiratory-sleep-therapy/",
    "https://pulmocare.in/bilevel-s-st-devices/",
    "https://pulmocare.in/asv-titration-devices/",
    "https://pulmocare.in/humidifiers/",
    "https://pulmocare.in/invasive-non-invasive-ventilation-devices/",
    "https://pulmocare.in/oxygen-therapy/",
    "https://pulmocare.in/sleep-diagnostics/",
    "https://pulmocare.in/masks/",
    "https://pulmocare.in/full-face-masks/",
    "https://pulmocare.in/nasal-masks/"
]

all_products = {}

for url in urls_to_crawl:
    print(f"Fetching products from {url}...")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp:
            html = resp.read().decode('utf-8', errors='ignore')

        # Find all product containers
        # Woostify / WooCommerce product items
        items = re.findall(r'<li[^>]*class=["\'][^"\']*product[^"\']*["\'][^>]*>(.*?)</li>', html, re.IGNORECASE | re.DOTALL)
        print(f"  Found {len(items)} product blocks")

        for item_html in items:
            # Title
            t_match = re.search(r'<h[234][^>]*class=["\'][^"\']*woocommerce-loop-product__title[^"\']*["\'][^>]*>(.*?)</h[234]>', item_html, re.IGNORECASE | re.DOTALL)
            if not t_match:
                t_match = re.search(r'<a[^>]+class=["\'][^"\']*woocommerce-LoopProduct-link[^"\']*["\'][^>]*>(.*?)</a>', item_html, re.IGNORECASE | re.DOTALL)
            
            if not t_match:
                continue

            raw_title = unescape(re.sub(r'<[^>]+>', '', t_match.group(1)).strip())
            if not raw_title or len(raw_title) < 2:
                continue

            # Link
            l_match = re.search(r'<a[^>]+href=["\']([^"\']+)["\']', item_html, re.IGNORECASE)
            link = l_match.group(1) if l_match else ""

            # Image
            img_match = re.search(r'<img[^>]+src=["\']([^"\']+)["\']', item_html, re.IGNORECASE)
            img_url = img_match.group(1) if img_match else ""
            if not img_url:
                img_data = re.search(r'data-src=["\']([^"\']+)["\']', item_html, re.IGNORECASE)
                img_url = img_data.group(1) if img_data else ""

            # Price
            p_match = re.search(r'<span[^>]*class=["\'][^"\']*woocommerce-Price-amount[^"\']*["\'][^>]*>(.*?)</span>', item_html, re.IGNORECASE | re.DOTALL)
            if p_match:
                price_str = unescape(re.sub(r'<[^>]+>', '', p_match.group(1)).strip())
            else:
                price_str = "Call for Price"

            # Category inference from title
            cat = "Ventilation & Sleep"
            lower_t = raw_title.lower()
            if "mask" in lower_t or "cara" in lower_t or "joyce" in lower_t or "lena" in lower_t or "julia" in lower_t:
                cat = "PPE & Protection"
            elif "cpap" in lower_t or "apap" in lower_t or "bilevel" in lower_t or "prisma" in lower_t or "luisa" in lower_t:
                cat = "Ventilation & Sleep"
            elif "anesthesia" in lower_t or "leon" in lower_t:
                cat = "Surgical"
            elif "samoa" in lower_t or "scala" in lower_t or "sonata" in lower_t or "diagnostics" in lower_t:
                cat = "Diagnostic"
            elif "oxygen" in lower_t or "humidifier" in lower_t or "aircon" in lower_t:
                cat = "Emergency"

            # Unique key
            slug = re.sub(r'[^a-z0-9]+', '-', raw_title.lower()).strip('-')

            if slug not in all_products:
                # Save local image
                local_img = "/images/products/mask.png"
                if img_url:
                    clean_filename = f"pulmo_{slug}.jpg"
                    local_path = f"public/images/pulmocare/{clean_filename}"
                    local_img = f"/images/pulmocare/{clean_filename}"
                    if not os.path.exists(local_path):
                        try:
                            img_req = urllib.request.Request(img_url, headers=headers)
                            with urllib.request.urlopen(img_req) as img_resp, open(local_path, "wb") as out:
                                out.write(img_resp.read())
                            print(f"    Downloaded image for {raw_title}: {clean_filename}")
                        except Exception as e:
                            print(f"    Failed image {img_url}: {e}")

                all_products[slug] = {
                    "id": slug,
                    "name": raw_title,
                    "category": cat,
                    "price": price_str,
                    "rating": 4.9,
                    "reviewsCount": 24,
                    "image": local_img,
                    "originalUrl": link,
                    "description": f"Official {raw_title} from Pulmo Care. High-performance hospital & home healthcare medical equipment with German engineering precision.",
                    "inStock": True,
                    "isFeatured": True,
                    "specs": {
                        "Manufacturer": "Pulmo Care",
                        "Compliance": "CE / ISO 13485 Certified",
                        "Warranty": "2 Years Official Warranty",
                        "Origin": "Germany / India"
                    }
                }
    except Exception as e:
        print(f"  Failed crawling {url}: {e}")

print(f"\nTotal unique Pulmo Care products scraped: {len(all_products)}")

# Convert dictionary to list
product_list = list(all_products.values())

out_file = "src/data/products.json"
with open(out_file, "w", encoding="utf-8") as f:
    json.dump(product_list, f, indent=2, ensure_ascii=False)

print(f"Successfully saved {len(product_list)} Pulmo Care products to {out_file}!")
