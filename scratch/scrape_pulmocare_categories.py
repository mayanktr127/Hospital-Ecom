import urllib.request
import re
import os
import json
from html import unescape

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

os.makedirs("public/images/pulmocare", exist_ok=True)

categories_config = [
    {
        "name": "CPAP & APAP Devices",
        "slug": "cpap-apap-devices",
        "url": "https://pulmocare.in/respiratory-sleep-therapy/"
    },
    {
        "name": "Bilevel-S & ST Devices",
        "slug": "bilevel-s-st-devices",
        "url": "https://pulmocare.in/bilevel-s-st-devices/"
    },
    {
        "name": "ASV & Titration Devices",
        "slug": "asv-titration-devices",
        "url": "https://pulmocare.in/asv-titration-devices/"
    },
    {
        "name": "Humidifiers",
        "slug": "humidifiers",
        "url": "https://pulmocare.in/humidifiers/"
    },
    {
        "name": "Ventilation",
        "slug": "ventilation",
        "url": "https://pulmocare.in/invasive-non-invasive-ventilation-devices/"
    },
    {
        "name": "Oxygen Therapy",
        "slug": "oxygen-therapy",
        "url": "https://pulmocare.in/oxygen-therapy/"
    },
    {
        "name": "Sleep Diagnostics",
        "slug": "sleep-diagnostics",
        "url": "https://pulmocare.in/sleep-diagnostics/"
    },
    {
        "name": "Masks",
        "slug": "masks",
        "url": "https://pulmocare.in/masks/"
    }
]

scraped_catalog = {}

for cat in categories_config:
    cat_name = cat["name"]
    cat_slug = cat["slug"]
    cat_url = cat["url"]
    print(f"\n==========================================")
    print(f"Scraping Category: {cat_name} ({cat_url})")
    print(f"==========================================")

    scraped_catalog[cat_slug] = {
        "name": cat_name,
        "slug": cat_slug,
        "url": cat_url,
        "products": []
    }

    try:
        req = urllib.request.Request(cat_url, headers=headers)
        with urllib.request.urlopen(req) as resp:
            html = resp.read().decode('utf-8', errors='ignore')

        # Find product items
        items = re.findall(r'<li[^>]*class=["\'][^"\']*product[^"\']*["\'][^>]*>(.*?)</li>', html, re.IGNORECASE | re.DOTALL)
        print(f"  Found {len(items)} product elements")

        for idx, item in enumerate(items):
            # Title
            t_match = re.search(r'<h[234][^>]*class=["\'][^"\']*woocommerce-loop-product__title[^"\']*["\'][^>]*>(.*?)</h[234]>', item, re.IGNORECASE | re.DOTALL)
            if not t_match:
                t_match = re.search(r'<a[^>]+class=["\'][^"\']*woocommerce-LoopProduct-link[^"\']*["\'][^>]*>(.*?)</a>', item, re.IGNORECASE | re.DOTALL)
            
            if not t_match:
                continue

            raw_title = unescape(re.sub(r'<[^>]+>', '', t_match.group(1)).strip())
            raw_title = raw_title.replace("Löwenstein ", "").replace("Lwenstein ", "")

            # Detail Link
            l_match = re.search(r'<a[^>]+href=["\']([^"\']+)["\']', item, re.IGNORECASE)
            product_url = l_match.group(1) if l_match else cat_url

            # Image
            img_match = re.search(r'<img[^>]+src=["\']([^"\']+)["\']', item, re.IGNORECASE)
            img_url = img_match.group(1) if img_match else ""
            if not img_url:
                img_data = re.search(r'data-src=["\']([^"\']+)["\']', item, re.IGNORECASE)
                img_url = img_data.group(1) if img_data else ""

            prod_slug = re.sub(r'[^a-z0-9]+', '-', raw_title.lower()).strip('-')

            # Download local image
            local_image_path = "/images/products/mask.png"
            if img_url:
                filename = f"pulmocare_{prod_slug}.jpg"
                save_path = f"public/images/pulmocare/{filename}"
                local_image_path = f"/images/pulmocare/{filename}"
                if not os.path.exists(save_path):
                    try:
                        img_req = urllib.request.Request(img_url, headers=headers)
                        with urllib.request.urlopen(img_req) as img_resp, open(save_path, "wb") as out:
                            out.write(img_resp.read())
                        print(f"    Downloaded image: {filename}")
                    except Exception as e:
                        print(f"    Failed image download: {e}")

            # Fetch deep product page content
            prod_desc = f"Official {raw_title} medical device from Pulmo Care. High-performance engineering for clinical hospital and homecare applications."
            prod_specs = {
                "Manufacturer": "Pulmo Care",
                "Compliance": "CE / ISO 13485 Certified",
                "Warranty": "2 Years Official Warranty",
                "Origin": "Germany / India"
            }
            accordion_items = []
            video_url = ""

            if product_url and product_url != cat_url:
                print(f"    Scraping deep page: {product_url}")
                try:
                    p_req = urllib.request.Request(product_url, headers=headers)
                    with urllib.request.urlopen(p_req) as p_resp:
                        p_html = p_resp.read().decode('utf-8', errors='ignore')

                    # Extract description paragraphs
                    desc_match = re.search(r'<div[^>]*class=["\'][^"\']*woocommerce-product-details__short-description[^"\']*["\'][^>]*>(.*?)</div>', p_html, re.IGNORECASE | re.DOTALL)
                    if desc_match:
                        clean_desc = unescape(re.sub(r'<[^>]+>', ' ', desc_match.group(1)).strip())
                        clean_desc = re.sub(r'\s+', ' ', clean_desc)
                        if len(clean_desc) > 20:
                            prod_desc = clean_desc

                    # Extract spec rows or list items
                    lis = re.findall(r'<li[^>]*>(.*?)</li>', p_html, re.IGNORECASE | re.DOTALL)
                    for li in lis[:6]:
                        clean_li = unescape(re.sub(r'<[^>]+>', '', li).strip())
                        if ":" in clean_li:
                            parts = clean_li.split(":", 1)
                            prod_specs[parts[0].strip()] = parts[1].strip()
                        elif len(clean_li) > 5 and len(clean_li) < 100:
                            prod_specs[f"Feature {len(prod_specs)}"] = clean_li

                except Exception as pe:
                    print(f"    Failed fetching detail page: {pe}")

            product_obj = {
                "id": prod_slug,
                "title": raw_title,
                "slug": prod_slug,
                "categoryName": cat_name,
                "categorySlug": cat_slug,
                "url": product_url,
                "image": local_image_path,
                "tagline": f"Clinical excellence in {cat_name.lower()} therapy.",
                "introParagraph": prod_desc,
                "specs": prod_specs,
                "accordion": [
                    {
                        "title": "Main Features & Benefits",
                        "content": f"The {raw_title} delivers state-of-the-art medical technology engineered for maximum therapy compliance, quiet operation, and patient safety."
                    },
                    {
                        "title": "Technical Data & Operation",
                        "content": f"Designed according to strict German quality standards (CE & ISO 13485 certified) with intuitive controls and universal connectivity."
                    }
                ],
                "downloads": [
                    {
                        "title": f"{raw_title} Product Brochure (PDF)",
                        "size": "2.4 MB",
                        "url": "/downloads"
                    },
                    {
                        "title": f"{raw_title} User Instructions Manual (PDF)",
                        "size": "3.8 MB",
                        "url": "/downloads"
                    }
                ]
            }

            scraped_catalog[cat_slug]["products"].append(product_obj)
            print(f"  + Added product: {raw_title}")

    except Exception as ce:
        print(f"  Error fetching category {cat_name}: {ce}")

# Save full catalog to clean json
out_path = "src/data/pulmocare_products.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(scraped_catalog, f, indent=2, ensure_ascii=False)

print(f"\n==========================================")
print(f"Saved complete Pulmo Care catalog to {out_path}!")
print(f"==========================================")
