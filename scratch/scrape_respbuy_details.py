import urllib.request
import json
import re
from bs4 import BeautifulSoup
import os
import sys

# Force UTF-8 stdout
sys.stdout.reconfigure(encoding='utf-8')

target_urls = {
    "prisma-20a": "https://respbuy.com/product/loewenstein-prisma-20a-auto-cpap-machine/",
    "prisma-smart": "https://respbuy.com/product/loewenstein-prisma-smart-auto-cpap/",
    "prisma-smart-plus": "https://respbuy.com/product/loewenstein-prisma-smart-plus-auto-cpap/",
    "prisma-25-st": "https://respbuy.com/product/loewenstein-prisma-25st-bipap/",
    "prisma-25s": "https://respbuy.com/product/lowenstein-prisma-25s-bipap/",
    "prisma-30-st": "https://respbuy.com/product/loewenstein-prisma-30st-bipap/",
    "prisma-lab": "https://respbuy.com/product/lowenstein-prismalab-bipap/",
    "prisma-aqua": "https://respbuy.com/product/loewenstein-prismaaqua-heated-humidifier/",
    "inogen-rove-6": "https://respbuy.com/product/inogen-rove-6-portable-oxygen-concentrator/",
    "nidek-neo-5": "https://respbuy.com/product/nidek-neo-5lpm/",
    "cara-full-face": "https://respbuy.com/product/lowenstein-cara-full-face-bipap-mask/",
    "cara-nasal": "https://respbuy.com/product/lowenstein-cara-nasal-cpap-mask/"
}

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}

scraped_details = {}

for slug, url in target_urls.items():
    print(f"Fetching {slug} => {url}")
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            soup = BeautifulSoup(html, 'html.parser')
            
            # Extract title
            title_el = soup.find('h1', class_=re.compile(r'product_title|entry-title'))
            title = title_el.get_text(strip=True) if title_el else ""

            # Extract prices
            price_ins = soup.find('ins')
            price_del = soup.find('del')
            price_amount = soup.find('p', class_=re.compile(r'price'))
            
            sale_price = price_ins.get_text(strip=True) if price_ins else (price_amount.get_text(strip=True) if price_amount else "")
            orig_price = price_del.get_text(strip=True) if price_del else ""

            # Extract description / content
            desc_el = soup.find('div', class_=re.compile(r'description|summary|content|woocommerce-Tabs-panel'))
            desc_text = desc_el.get_text('\n', strip=True) if desc_el else ""

            # Extract features / lists
            features = []
            for li in soup.find_all('li'):
                txt = li.get_text(strip=True)
                if len(txt) > 8 and len(txt) < 300:
                    features.append(txt)

            # Extract specifications table
            specs = []
            tables = soup.find_all('table')
            for table in tables:
                rows = table.find_all('tr')
                for tr in rows:
                    cols = tr.find_all(['td', 'th'])
                    if len(cols) == 2:
                        k = cols[0].get_text(strip=True)
                        v = cols[1].get_text(strip=True)
                        if k and v:
                            specs.append({'key': k, 'value': v})

            scraped_details[slug] = {
                "title": title,
                "url": url,
                "sale_price": sale_price,
                "orig_price": orig_price,
                "description": desc_text[:1500],
                "features": features[:15],
                "specifications": specs
            }
            print(f"   -> Extracted: {title} | Sale: {sale_price} | Specs: {len(specs)} | Features: {len(features)}")
    except Exception as e:
        print(f"Error fetching {slug}: {e}")

os.makedirs('scratch', exist_ok=True)
with open('scratch/respbuy_scraped_details.json', 'w', encoding='utf-8') as f:
    json.dump(scraped_details, f, indent=2, ensure_ascii=False)
