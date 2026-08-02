import glob
import re
import urllib.request
import os
import json

os.makedirs("public/images/pulmocare", exist_ok=True)

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
}

contact_info = {}

for filepath in glob.glob("scratch/pulmocare_pages/*.html"):
    with open(filepath, "r", encoding="utf-8") as f:
        html = f.read()

    # Search for phone numbers, email, addresses
    phones = set(re.findall(r'(\+?91[\s\-]?[0-9]{10}|0[0-9]{2,4}[\s\-]?[0-9]{6,8}|[0-9]{10})', html))
    emails = set(re.findall(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}', html))

    filename = os.path.basename(filepath)
    contact_info[filename] = {
        "phones": list(phones),
        "emails": list(emails)
    }

print("=== CONTACT DATA FOUND ===")
print(json.dumps(contact_info, indent=2))

# Download Pulmo Care logo if present
logo_matches = re.findall(r'<img[^>]+src=["\']([^"\']*Logo[^"\']*)["\']', str(contact_info), re.IGNORECASE)
for filepath in glob.glob("scratch/pulmocare_pages/*.html"):
    with open(filepath, "r", encoding="utf-8") as f:
        html = f.read()
    logos = re.findall(r'<img[^>]+src=["\']([^"\']*Logo[^"\']*)["\']', html, re.IGNORECASE)
    for l in logos:
        print("Logo found:", l)
        try:
            req = urllib.request.Request(l, headers=headers)
            with urllib.request.urlopen(req) as resp, open("public/images/pulmocare/pulmocare_logo.png", "wb") as out:
                out.write(resp.read())
            print("  Successfully downloaded Pulmo Care logo!")
            break
        except Exception as e:
            print("  Failed downloading logo:", e)
