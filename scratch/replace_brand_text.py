import os
import json
import re

files_to_update = [
    "src/data/company/about_us.txt",
    "src/data/company/compliance.txt",
    "src/data/company/job_openings.txt",
    "src/data/company/manufacturer_service.txt",
    "src/data/company/our_values.txt",
    "src/data/company/quality_management.txt",
    "src/data/legal/gtcs.txt",
    "src/data/legal/legal_notice.txt",
    "src/data/legal/privacy_policy.txt",
    "src/data/legal/sitemap.txt",
    "src/data/professionals/academy.txt",
    "src/data/professionals/purchasing_dealer.txt",
    "src/data/professionals/supplier_form.txt",
    "src/app/legal-notice/page.tsx",
    "src/app/privacy-policy/page.tsx"
]

for filepath in files_to_update:
    if os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Replacements
        content = content.replace("Löwenstein Medical SE & Co. KG", "Pulmo Care")
        content = content.replace("Löwenstein Medical Germany", "Pulmo Care India")
        content = content.replace("Löwenstein Medical", "Pulmo Care")
        content = content.replace("Löwenstein", "Pulmo Care")
        content = content.replace("Arzbacher Straße 80", "#85, 20th Main Rd, 1st N Block")
        content = content.replace("56130 Bad Ems", "Rajajinagar, Bengaluru, Karnataka 560010")
        content = content.replace("Germany", "India")
        content = content.replace("+49 2603 9600-0", "+91 9343444428")
        content = content.replace("info@loewensteinmedical.com", "enquiry@pulmocare.in")
        content = content.replace("loewensteinmedical.com", "pulmocare.in")

        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated {filepath}")

# Update structured_products.json
sp_path = "src/data/product_pages/structured_products.json"
if os.path.exists(sp_path):
    with open(sp_path, "r", encoding="utf-8") as f:
        sp_data = json.load(f)
    
    for key, val in sp_data.items():
        if isinstance(val, dict):
            for k in ["introText", "bannerHeading", "bannerParagraph"]:
                if k in val and isinstance(val[k], str):
                    val[k] = val[k].replace("Löwenstein Medical", "Pulmo Care").replace("Löwenstein", "Pulmo Care")
            if "accordionItems" in val:
                for item in val["accordionItems"]:
                    item["title"] = item["title"].replace("Löwenstein Medical", "Pulmo Care").replace("Löwenstein", "Pulmo Care")
                    item["content"] = item["content"].replace("Löwenstein Medical", "Pulmo Care").replace("Löwenstein", "Pulmo Care")
    
    with open(sp_path, "w", encoding="utf-8") as f:
        json.dump(sp_data, f, indent=2, ensure_ascii=False)
    print("Updated structured_products.json with Pulmo Care branding!")

print("All brand text replacement finished!")
