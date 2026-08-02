import json
import re

with open("src/data/pulmocare_products.json", "r", encoding="utf-8") as f:
    cat_data = json.load(f)

# Add masks products into category 'masks'
mask_products = [
    {
        "id": "cara-full-face",
        "title": "CARA Full Face",
        "slug": "cara-full-face",
        "categoryName": "Masks",
        "categorySlug": "masks",
        "url": "https://pulmocare.in/product/cara-full-face/",
        "image": "/images/pulmocare/pulmocare_cara-full-face.jpg",
        "tagline": "Lightweight full face mask with soft cushion and quiet exhalation system.",
        "introParagraph": "The CARA Full Face mask offers high therapy comfort, lightweight fit, and ultra-quiet exhalation for full face respiratory therapy.",
        "specs": {
            "Manufacturer": "Pulmo Care",
            "Type": "Full Face Mask",
            "Weight": "Under 90 grams",
            "Compliance": "CE / ISO 13485 Certified"
        },
        "accordion": [
            {
                "title": "Main Features & Benefits",
                "content": "Soft anatomical cushion, 360-degree ball-and-socket joint, and diffuse quiet exhalation valve."
            }
        ],
        "downloads": [
            {
                "title": "CARA Full Face Brochure (PDF)",
                "size": "1.8 MB",
                "url": "/downloads"
            }
        ]
    },
    {
        "id": "joyceone-full-face",
        "title": "JOYCEone Full Face",
        "slug": "joyceone-full-face",
        "categoryName": "Masks",
        "categorySlug": "masks",
        "url": "https://pulmocare.in/product/joyceone-full-face/",
        "image": "/images/pulmocare/pulmocare_joyceone-full-face.jpg",
        "tagline": "One size fits all full face mask with SilkTec coating.",
        "introParagraph": "JOYCEone Full Face features an auto-adjusting forehead cushion and SilkTec coating for effortless fitting.",
        "specs": {
            "Manufacturer": "Pulmo Care",
            "Type": "Full Face Mask",
            "Coating": "SilkTec Soft Finish",
            "Compliance": "CE / ISO 13485 Certified"
        },
        "accordion": [
            {
                "title": "Main Features & Benefits",
                "content": "One size fits nearly all patient facial contours effortlessly."
            }
        ],
        "downloads": [
            {
                "title": "JOYCEone Full Face Brochure (PDF)",
                "size": "2.1 MB",
                "url": "/downloads"
            }
        ]
    },
    {
        "id": "lena",
        "title": "LENA Full Face",
        "slug": "lena",
        "categoryName": "Masks",
        "categorySlug": "masks",
        "url": "https://pulmocare.in/product/lena/",
        "image": "/images/pulmocare/pulmocare_lena.jpg",
        "tagline": "Clinical hospital and home ventilation full face mask.",
        "introParagraph": "LENA was specially developed for clinical high-pressure ventilation and nocturnal homecare therapy.",
        "specs": {
            "Manufacturer": "Pulmo Care",
            "Type": "Full Face Ventilation Mask",
            "Pressure Range": "Up to 40 hPa",
            "Compliance": "CE / ISO 13485 Certified"
        },
        "accordion": [
            {
                "title": "Main Features & Benefits",
                "content": "Stable seal at high pressures with double cushion technology."
            }
        ],
        "downloads": [
            {
                "title": "LENA Product Brochure (PDF)",
                "size": "2.5 MB",
                "url": "/downloads"
            }
        ]
    },
    {
        "id": "cara-nasal",
        "title": "CARA Nasal",
        "slug": "cara-nasal",
        "categoryName": "Masks",
        "categorySlug": "masks",
        "url": "https://pulmocare.in/product/cara-nasal/",
        "image": "/images/pulmocare/pulmocare_cara.jpg",
        "tagline": "Award-winning lightweight nasal mask.",
        "introParagraph": "CARA Nasal combines lightness, soft cushion materials, and quiet exhalation for sleep apnea therapy.",
        "specs": {
            "Manufacturer": "Pulmo Care",
            "Type": "Nasal Mask",
            "Weight": "59 grams",
            "Compliance": "CE / ISO 13485 Certified"
        },
        "accordion": [
            {
                "title": "Main Features & Benefits",
                "content": "Minimalist design with quiet diffuse exhalation system."
            }
        ],
        "downloads": [
            {
                "title": "CARA Nasal Brochure (PDF)",
                "size": "1.5 MB",
                "url": "/downloads"
            }
        ]
    }
]

if "masks" in cat_data:
    cat_data["masks"]["products"] = mask_products

# Clean all product titles (remove encoding glitches)
flat_products = {}

for cat_slug, cat_info in cat_data.items():
    for p in cat_info["products"]:
        clean_title = p["title"].replace("Löwenstein ", "").replace("Lwenstein ", "").replace("", "-")
        p["title"] = clean_title
        p["id"] = p["slug"]
        flat_products[p["slug"]] = p

# Save structured dataset
with open("src/data/pulmocare_products.json", "w", encoding="utf-8") as f:
    json.dump(cat_data, f, indent=2, ensure_ascii=False)

with open("src/data/structured_products.json", "w", encoding="utf-8") as f:
    json.dump(flat_products, f, indent=2, ensure_ascii=False)

print(f"Successfully organized Pulmo Care catalog with {len(flat_products)} total products across {len(cat_data)} categories!")
