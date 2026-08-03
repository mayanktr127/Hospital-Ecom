from pymongo import MongoClient

uri = 'mongodb+srv://vaderharsh127_db_user:aRGaTdGcM0ml3NhJ@cluster0.qmqgldx.mongodb.net/pulmocare?retryWrites=true&w=majority&appName=Cluster0'
client = MongoClient(uri)
db = client.pulmocare
products = db.products

price_updates = {
    'prisma-20a': (65000.0, 85000.0),
    'prisma-smart': (45990.0, 65000.0),
    'prisma-smart-plus': (52500.0, 72000.0),
    'prisma-25st': (70300.0, 95000.0),
    'prisma-25s': (70000.0, 92000.0),
    'prisma-30st': (79690.0, 110000.0),
    'prisma-cr': (165000.0, 210000.0),
    'prisma-lab': (180000.0, 240000.0),
    'prisma-aqua': (12180.0, 16500.0),
    'luisa': (485000.0, 620000.0),
    'prisma-vent-40': (245000.0, 310000.0),
    'prisma-vent-50c': (315000.0, 410000.0),
    'rove-6': (195000.0, 245000.0),
    'nidek-neo-5': (42000.0, 58000.0),
    'samoa': (185000.0, 235000.0),
    'scala': (240000.0, 310000.0),
    'sonata': (450000.0, 580000.0),
    'cara-fullface': (5800.0, 8200.0),
    'joyceone': (6500.0, 9000.0),
    'lena': (7200.0, 9800.0),
    'cara-nasal': (5620.0, 7800.0),
}

updated_count = 0
for doc in products.find():
    doc_id = str(doc.get('id', '')).lower()
    doc_name = str(doc.get('name', '')).lower()
    for key, (p, orig) in price_updates.items():
        if key in doc_id or key in doc_name:
            products.update_one({'_id': doc['_id']}, {'$set': {'price': p, 'originalPrice': orig}})
            updated_count += 1
            print(f"Updated {doc.get('name')}: price={p}, orig={orig}")
            break

print(f"Done! Total updated: {updated_count}")
