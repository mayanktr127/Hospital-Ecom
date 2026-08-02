import json

with open("src/data/pulmocare_products.json", "r", encoding="utf-8") as f:
    cat_data = json.load(f)

structured_map = {}

for cat_slug, cat_info in cat_data.items():
    category_name = cat_info["name"]
    for p in cat_info["products"]:
        slug = p["slug"]
        title = p["title"]

        # Form keys for lookup: cat_item and item
        full_key = f"{cat_slug.replace('-', '_')}_{slug.replace('-', '_')}"
        item_key = slug.replace('-', '_')

        specs_list = []
        for k, v in p.get("specs", {}).items():
            specs_list.append({"label": k, "value": v})

        accordion_formatted = []
        for acc in p.get("accordion", []):
            accordion_formatted.append({
                "title": acc.get("title", f"{title} Features"),
                "content": acc.get("content", f"High quality medical engineering of {title} from Pulmo Care.")
            })

        downloads_formatted = []
        for dl in p.get("downloads", []):
            downloads_formatted.append({
                "title": dl.get("title", f"{title} Technical Specification PDF"),
                "size": dl.get("size", "2.1 MB"),
                "url": dl.get("url", "/downloads")
            })

        prod_record = {
            "title": title,
            "subtitle": p.get("tagline", f"Clinical excellence in {category_name} therapy."),
            "introText": p.get("introParagraph", f"Official {title} medical hardware from Pulmo Care. Engineered according to strict German quality standards."),
            "articleNumbers": f"REF {slug.upper()}-01 | REF {slug.upper()}-02 | REF {slug.upper()}-03",
            "bannerHeading": f"Official {title} for hospital and homecare.",
            "bannerParagraph": f"Engineered for maximum therapy compliance, quiet operation, and patient safety in {category_name.lower()}.",
            "image": p["image"],
            "specifications": specs_list,
            "accordionItems": accordion_formatted,
            "downloadsList": downloads_formatted
        }

        structured_map[full_key] = prod_record
        structured_map[item_key] = prod_record
        structured_map[slug] = prod_record

out_path = "src/data/product_pages/structured_products.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(structured_map, f, indent=2, ensure_ascii=False)

print(f"Successfully populated {len(structured_map)} structured product mappings in {out_path}!")
