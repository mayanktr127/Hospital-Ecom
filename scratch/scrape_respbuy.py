import urllib.request
import urllib.parse
import json
import re
import os

query_terms = [
    'Prisma 20A',
    'Prisma SMART',
    'Prisma 25ST',
    'Prisma 25S',
    'Prisma 30ST',
    'Prisma CR',
    'Prisma LAB',
    'Prisma AQUA',
    'Luisa',
    'Prisma VENT 40',
    'Prisma VENT 50C',
    'Inogen Rove 6',
    'Nidek',
    'Samoa',
    'Scala',
    'Sonata',
    'CARA Full Face',
    'JOYCEone',
    'LENA',
    'CARA Nasal'
]

results = {}

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}

for term in query_terms:
    search_url = 'https://respbuy.com/?s=' + urllib.parse.quote(term) + '&post_type=product'
    req = urllib.request.Request(search_url, headers=headers)
    try:
        with urllib.request.urlopen(req) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            # Extract product hrefs
            matches = re.findall(r'href="(https://respbuy\.com/product/[^"]+)"[^>]*>([^<]+)</a>', html)
            products = []
            seen = set()
            for href, text in matches:
                clean_text = text.strip()
                if href not in seen and clean_text and len(clean_text) > 3:
                    seen.add(href)
                    products.append({'name': clean_text, 'href': href})
            print(f'Query: {term} -> Found {len(products)} match links')
            for p in products[:3]:
                print(f"   * {p['name']} => {p['href']}")
            results[term] = products
    except Exception as e:
        print(f'Error searching {term}: {e}')

os.makedirs('scratch', exist_ok=True)
with open('scratch/respbuy_search_results.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, indent=2)
