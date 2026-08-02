import json
import os
import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

# Load scraped details
with open('scratch/respbuy_scraped_details.json', 'r', encoding='utf-8') as f:
    scraped = json.load(f)

# Load pulmocare_products.json
with open('src/data/pulmocare_products.json', 'r', encoding='utf-8') as f:
    pulmocare = json.load(f)

def parse_price(price_str):
    if not price_str:
        return None
    clean = price_str.replace('₹', '').replace(',', '').strip()
    match = re.search(r'\d+(\.\d+)?', clean)
    if match:
        try:
            return float(match.group(0))
        except:
            return None
    return None

updated_count = 0

for cat_key, cat in pulmocare.items():
    if 'products' in cat and isinstance(cat['products'], list):
        for p in cat['products']:
            slug = p.get('slug')
            if slug in scraped:
                info = scraped[slug]
                s_price = parse_price(info.get('sale_price'))
                o_price = parse_price(info.get('orig_price'))
                
                if s_price:
                    p['price'] = s_price
                    p['originalPrice'] = o_price if o_price else round(s_price * 1.35)
                
                if info.get('specifications') and len(info['specifications']) > 0:
                    p['specifications'] = info['specifications']
                
                if info.get('features') and len(info['features']) > 0:
                    p['features'] = info['features'][:8]

                updated_count += 1
                print(f"Updated {slug} -> Price: ₹{p.get('price')} | Specs: {len(p.get('specifications', []))}")

# Save updated pulmocare_products.json
with open('src/data/pulmocare_products.json', 'w', encoding='utf-8') as f:
    json.dump(pulmocare, f, indent=2, ensure_ascii=False)

print(f"\nSuccessfully enriched {updated_count} matching products in pulmocare_products.json!")
