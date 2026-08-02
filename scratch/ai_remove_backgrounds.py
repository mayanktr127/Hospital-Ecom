from PIL import Image
import os
import glob
from rembg import remove

def process_product_image(img_path):
    try:
        # Open image
        input_image = Image.open(img_path)
        
        # Remove background using rembg AI model
        output_image = remove(input_image)
        
        # Save as transparent PNG
        out_path = os.path.splitext(img_path)[0] + ".png"
        output_image.save(out_path, "PNG")
        print(f"Successfully extracted product cutout for: {os.path.basename(img_path)} -> {out_path}")
        return out_path
    except Exception as e:
        print(f"Error processing {img_path}: {e}")
        return None

# Target primary product cutouts
target_images = (
    glob.glob("public/images/pulmocare/*.*") +
    glob.glob("public/images/products/*.*")
)

print(f"Processing {len(target_images)} product cutout images with AI background removal...")

for img in target_images:
    if img.endswith(".svg"):
        continue
    process_product_image(img)

print("AI product background removal completed!")
