import re
import base64
import os

html_path = r"c:\Users\Mayank\Downloads\Hospital Equipments\HTML\medcore-monarch.html"
output_dir = r"c:\Users\Mayank\Downloads\Hospital Equipments\public\images\products"

os.makedirs(output_dir, exist_ok=True)

with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

# Find all base64 images inside img tags or CSS
pattern = r'src=["\']data:image/(png|jpeg|webp);base64,([^"\']+)["\']'
matches = re.findall(pattern, content)

print(f"Found {len(matches)} base64 images.")

# Map of images based on context/order in HTML
image_names = [
    "microscope.png",       # 1: Hero scope image
    "sanitizer.png",        # 2: Side card image
    "mask.png",             # 3: Category 1 (PPE)
    "surgical_tools.png",   # 4: Category 2 (Surgical)
    "thermometer.png",      # 5: Category 3 (Diagnostic)
    "sanitizer_thumb.png",  # 6: Product 1
    "bp_monitor.png",       # 7: Product 2
    "oximeter.png",         # 8: Product 3
    "eye_drops.png",        # 9: Product 4 / Offer
    "microscope_offer.png", # 10: Offer 1
    "mask_offer.png"        # 11: Offer 2
]

for idx, (img_type, b64_data) in enumerate(matches):
    filename = image_names[idx] if idx < len(image_names) else f"extracted_{idx+1}.png"
    filepath = os.path.join(output_dir, filename)
    with open(filepath, "wb") as img_file:
        img_file.write(base64.b64decode(b64_data))
    print(f"Saved {filename} ({len(b64_data)} bytes base64)")
