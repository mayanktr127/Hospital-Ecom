import re
import json

with open(r'C:\Users\Mayank\.gemini\antigravity-ide\brain\e4a5f830-b952-454f-aeed-eba3575c2f2b\.system_generated\steps\2050\content.md', 'r', encoding='utf-8') as f:
    text = f.read()

title = re.search(r'<title>(.*?)</title>', text, re.IGNORECASE)
print('TITLE:', title.group(1) if title else '')

# Extract text paragraphs and menu items
menus = re.findall(r'<li[^>]*class=["\'][^"\']*menu-item[^"\']*["\'][^>]*>.*?<a[^>]+href=["\']([^"\']+)["\'][^>]*>(.*?)</a>', text, re.IGNORECASE | re.DOTALL)
print("\n--- MENU ITEMS ---")
for href, label in menus:
    clean_label = re.sub(r'<[^>]+>', '', label).strip()
    if clean_label:
        print(f"{clean_label} -> {href}")

print("\n--- IMAGE URLS ---")
imgs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', text, re.IGNORECASE)
for img in set(imgs):
    if 'uploads' in img:
        print(img)
