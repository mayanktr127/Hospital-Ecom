import json
import os
import re

def swap_ext_to_png(img_url):
    if not img_url:
        return img_url
    base, ext = os.path.splitext(img_url)
    if ext.lower() in [".jpg", ".jpeg"]:
        potential_png = base + ".png"
        # Check if local file exists
        local_path = "public" + potential_png
        if os.path.exists(local_path):
            return potential_png
    return img_url

# Update products.json
with open("src/data/products.json", "r", encoding="utf-8") as f:
    products = json.load(f)

for p in products:
    p["image"] = swap_ext_to_png(p["image"])

with open("src/data/products.json", "w", encoding="utf-8") as f:
    json.dump(products, f, indent=2, ensure_ascii=False)

# Update products.ts
with open("src/data/products.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Replace .jpg image paths in products.ts
def replace_match(m):
    original_path = m.group(1)
    new_path = swap_ext_to_png(original_path)
    return f'"{new_path}"'

new_content = re.sub(r'"(/images/[^"]+\.jpg)"', replace_match, content)

with open("src/data/products.ts", "w", encoding="utf-8") as f:
    f.write(new_content)

# Update pulmocare_products.json
with open("src/data/pulmocare_products.json", "r", encoding="utf-8") as f:
    cat_data = json.load(f)

for cat_slug, cat_info in cat_data.items():
    for p in cat_info["products"]:
        p["image"] = swap_ext_to_png(p["image"])

with open("src/data/pulmocare_products.json", "w", encoding="utf-8") as f:
    json.dump(cat_data, f, indent=2, ensure_ascii=False)

# Update structured_products.json
with open("src/data/product_pages/structured_products.json", "r", encoding="utf-8") as f:
    struct_data = json.load(f)

for key, p in struct_data.items():
    if "image" in p:
        p["image"] = swap_ext_to_png(p["image"])

with open("src/data/product_pages/structured_products.json", "w", encoding="utf-8") as f:
    json.dump(struct_data, f, indent=2, ensure_ascii=False)

print("Successfully updated all product dataset image references to transparent PNG assets!")
