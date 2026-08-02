import json
import sys
from pymongo import MongoClient

sys.stdout.reconfigure(encoding='utf-8')

uri = "mongodb+srv://vaderharsh127_db_user:aRGaTdGcM0ml3NhJ@cluster0.qmqgldx.mongodb.net/pulmocare?retryWrites=true&w=majority&appName=Cluster0"

client = MongoClient(uri)
db = client.get_database("pulmocare")
products_col = db.get_collection("products")

with open('src/data/pulmocare_products.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

product_list = []
idx = 0
for cat_key, cat_obj in data.items():
    cat_name = cat_obj.get("name", "Ventilation & Sleep")
    if "products" in cat_obj and isinstance(cat_obj["products"], list):
        for p in cat_obj["products"]:
            idx += 1
            price_val = float(p.get("price", 45990))
            orig_price = float(p.get("originalPrice", round(price_val * 1.35)))
            
            doc = {
                "id": p.get("slug") or f"prod-{idx}",
                "name": p.get("title", "Medical Device"),
                "category": cat_name,
                "price": price_val,
                "originalPrice": orig_price,
                "image": p.get("image", "/images/pulmocare/pulmocare_prisma-smart.png"),
                "rating": 5,
                "reviewsCount": 4,
                "inStock": True,
                "description": p.get("tagline") or p.get("introParagraph") or "High-performance medical equipment.",
                "features": p.get("features", []),
                "specifications": p.get("specifications", []),
            }
            product_list.append(doc)

# Delete existing and seed all products
products_col.delete_many({})
result = products_col.insert_many(product_list)

print(f"Successfully seeded {len(result.inserted_ids)} existing website products directly into MongoDB Atlas cluster ('pulmocare.products')!")
