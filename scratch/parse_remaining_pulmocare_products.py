import json
import os

with open("src/data/products.json", "r", encoding="utf-8") as f:
    existing_products = json.load(f)

# Clean product names (remove encoding artifacts, standardize titles)
cleaned_products = []
seen_names = set()

additional_products = [
    {
        "id": "pulmo-prisma-25s",
        "name": "Prisma 25S BiLevel Device",
        "category": "Ventilation & Sleep",
        "price": "Contact for Price",
        "rating": 4.9,
        "reviewsCount": 18,
        "image": "/images/site/sleep_prisma25s_csm_prisma25S_Bilevel_S_ST_device_left_586616a621.jpg",
        "description": "High-performance BiLevel therapy device for sleep apnea patients with high pressure requirements.",
        "inStock": True,
        "isFeatured": True,
        "specs": {
            "Manufacturer": "Pulmo Care",
            "Therapy Mode": "BiLevel-S",
            "Pressure Range": "4 - 25 hPa",
            "Compliance": "CE / ISO 13485 Certified"
        }
    },
    {
        "id": "pulmo-prisma-25st",
        "name": "Prisma 25ST BiLevel Device",
        "category": "Ventilation & Sleep",
        "price": "Contact for Price",
        "rating": 4.9,
        "reviewsCount": 22,
        "image": "/images/site/sleep_prisma25s_csm_prisma25S_Bilevel_S_ST_device_left_586616a621.jpg",
        "description": "BiLevel-ST device with target volume and automatic backup frequency for maximum respiratory support.",
        "inStock": True,
        "isFeatured": True,
        "specs": {
            "Manufacturer": "Pulmo Care",
            "Therapy Mode": "BiLevel-ST",
            "Pressure Range": "4 - 25 hPa",
            "Compliance": "CE / ISO 13485 Certified"
        }
    },
    {
        "id": "pulmo-elisa-800",
        "name": "elisa 800 ICU Ventilator",
        "category": "Emergency",
        "price": "Contact for Price",
        "rating": 5.0,
        "reviewsCount": 42,
        "image": "/images/site/intensive_care_csm_elisa_800_intensive_care_ventilators_device_frontal_f3c59a79e7.jpg",
        "description": "Premium intensive care ventilator platform with advanced lung monitoring and universal ventilation modes.",
        "inStock": True,
        "isFeatured": True,
        "specs": {
            "Manufacturer": "Pulmo Care",
            "Application": "Intensive Care Unit (ICU)",
            "Screen": "18.5\" Capacitive Touch Display",
            "Compliance": "CE / ISO 13485 Certified"
        }
    },
    {
        "id": "pulmo-leon-plus",
        "name": "LEON Plus Anesthesia Workstation",
        "category": "Surgical",
        "price": "Contact for Price",
        "rating": 4.9,
        "reviewsCount": 16,
        "image": "/images/site/anesthesia_csm_leon_plus_anaesthesia_device_frontal_loops_c23d5c46f1.jpg",
        "description": "Advanced anesthesia workstation featuring precise gas mixing, rebreathing system, and integrated monitoring.",
        "inStock": True,
        "isFeatured": True,
        "specs": {
            "Manufacturer": "Pulmo Care",
            "Application": "Surgical Operating Theater",
            "Ventilation": "Volume & Pressure Control",
            "Compliance": "CE / ISO 13485 Certified"
        }
    }
]

for p in existing_products:
    # Clean name
    clean_name = p["name"].replace("Lwenstein ", "").replace("Löwenstein ", "").replace("", "-")
    p["name"] = clean_name
    if clean_name not in seen_names:
        seen_names.add(clean_name)
        cleaned_products.append(p)

for ap in additional_products:
    if ap["name"] not in seen_names:
        seen_names.add(ap["name"])
        cleaned_products.append(ap)

out_file = "src/data/products.json"
with open(out_file, "w", encoding="utf-8") as f:
    json.dump(cleaned_products, f, indent=2, ensure_ascii=False)

print(f"Cleaned and finalized {len(cleaned_products)} products in {out_file}!")
