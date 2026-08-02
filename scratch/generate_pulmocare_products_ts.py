import json

with open("src/data/products.json", "r", encoding="utf-8") as f:
    json_products = json.load(f)

ts_products = []

price_map = {
    "prisma-20a": 850.00,
    "prisma-smart": 750.00,
    "prisma-smart-plus": 890.00,
    "prisma-cr": 1250.00,
    "prisma-lab": 1450.00,
    "prisma-aqua": 220.00,
    "luisa-ventilator": 3400.00,
    "prisma-vent-40": 2800.00,
    "prisma-vent-50c": 3100.00,
    "inogen-rove-6": 1950.00,
    "nidek-neo-5": 980.00,
    "samoa": 1150.00,
    "scala": 1650.00,
    "sonata": 2400.00,
    "cara-full-face": 180.00,
    "joyceone-full-face": 195.00,
    "lena": 210.00,
    "cara": 145.00,
    "joyceone": 160.00,
    "prisma-25s": 1650.00,
    "prisma-25st": 1850.00,
    "elisa-800": 4800.00,
    "leon-plus": 6200.00
}

for idx, p in enumerate(json_products):
    name = p["name"]
    category = p.get("category", "Ventilation & Sleep")
    if category not in ["Ventilation & Sleep", "Diagnostic", "Surgical", "PPE & Protection", "Disinfection", "Personal Care"]:
        category = "Ventilation & Sleep"
    
    # Assign price
    matched_price = 450.00
    for k, v in price_map.items():
        if k in p["id"].lower() or k in name.lower():
            matched_price = v
            break

    orig_price = round(matched_price * 1.25, 2)
    
    # Specs
    specs = [
        {"label": "Brand", "value": "Pulmo Care"},
        {"label": "Origin", "value": "German Clinical Standard"},
        {"label": "Certification", "value": "CE / ISO 13485 Certified"},
        {"label": "Warranty", "value": "2 Years Official Warranty"}
    ]

    badge = "Top Seller" if idx % 3 == 0 else ("Pulmo Care Certified" if idx % 2 == 0 else "Featured")

    ts_item = {
        "id": p["id"],
        "name": name,
        "category": category,
        "price": matched_price,
        "originalPrice": orig_price,
        "image": p["image"],
        "rating": p.get("rating", 4.9),
        "reviewsCount": p.get("reviewsCount", 28),
        "inStock": True,
        "isFeatured": True,
        "description": p.get("description", f"Official {name} from Pulmo Care. Premium medical hardware engineered for high therapy compliance."),
        "specifications": specs,
        "badge": badge
    }
    ts_products.append(ts_item)

# Write formatted TS file
ts_content = '''import { Product } from "@/types/product";

export const PRODUCTS: Product[] = ''' + json.dumps(ts_products, indent=2, ensure_ascii=False) + ";\n"

with open("src/data/products.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

print(f"Successfully wrote {len(ts_products)} Pulmo Care products into src/data/products.ts!")
