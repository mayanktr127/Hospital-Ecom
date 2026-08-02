import urllib.request
import re
import json
import os

urls = [
    "https://pulmocare.in/",
    "https://pulmocare.in/shop/",
    "https://pulmocare.in/contact/",
    "https://pulmocare.in/respiratory-sleep-therapy/",
    "https://pulmocare.in/bilevel-s-st-devices/",
    "https://pulmocare.in/asv-titration-devices/",
    "https://pulmocare.in/humidifiers/",
    "https://pulmocare.in/invasive-non-invasive-ventilation-devices/",
    "https://pulmocare.in/oxygen-therapy/",
    "https://pulmocare.in/sleep-diagnostics/",
    "https://pulmocare.in/masks/",
    "https://pulmocare.in/full-face-masks/",
    "https://pulmocare.in/nasal-masks/"
]

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
}

os.makedirs("scratch/pulmocare_pages", exist_ok=True)

for url in urls:
    print(f"Fetching {url}...")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
        
        slug = url.replace("https://pulmocare.in/", "").strip("/")
        if not slug:
            slug = "home"
        
        with open(f"scratch/pulmocare_pages/{slug}.html", "w", encoding="utf-8") as f:
            f.write(html)
        print(f"  Saved {slug}.html ({len(html)} bytes)")
    except Exception as e:
        print(f"  Failed {url}: {e}")

print("Done crawling pulmocare pages!")
