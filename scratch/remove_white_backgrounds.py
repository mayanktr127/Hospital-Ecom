from PIL import Image
import os
import glob
from collections import deque

def process_image(img_path):
    try:
        img = Image.open(img_path).convert("RGBA")
        width, height = img.size
        pixels = img.load()

        # Check if corner pixels are near-white / light gray
        # Threshold for light background
        def is_bg(r, g, b):
            return r > 215 and g > 215 and b > 215

        visited = set()
        queue = deque()

        # Seed corners
        corners = [(0, 0), (width - 1, 0), (0, height - 1), (width - 1, height - 1)]
        for cx, cy in corners:
            r, g, b, a = pixels[cx, cy]
            if is_bg(r, g, b):
                queue.append((cx, cy))
                visited.add((cx, cy))

        # BFS Flood Fill from outer edges to remove background without touching product interior
        # Add all border pixels if they look like background
        for x in range(width):
            for y in [0, height - 1]:
                if (x, y) not in visited:
                    r, g, b, a = pixels[x, y]
                    if is_bg(r, g, b):
                        queue.append((x, y))
                        visited.add((x, y))

        for y in range(height):
            for x in [0, width - 1]:
                if (x, y) not in visited:
                    r, g, b, a = pixels[x, y]
                    if is_bg(r, g, b):
                        queue.append((x, y))
                        visited.add((x, y))

        count = 0
        while queue:
            x, y = queue.popleft()
            pixels[x, y] = (255, 255, 255, 0) # Make completely transparent
            count += 1

            for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nx, ny = x + dx, y + dy
                if 0 <= nx < width and 0 <= ny < height and (nx, ny) not in visited:
                    r, g, b, a = pixels[nx, ny]
                    if is_bg(r, g, b):
                        visited.add((nx, ny))
                        queue.append((nx, ny))

        if count > 0:
            # Save PNG transparent file
            out_path = os.path.splitext(img_path)[0] + ".png"
            img.save(out_path, "PNG")
            print(f"Processed {os.path.basename(img_path)} -> {count} background pixels made transparent!")
            return out_path
    except Exception as e:
        print(f"Error processing {img_path}: {e}")
    return None

# Process all images in public/images/pulmocare and public/images/site
image_files = (
    glob.glob("public/images/pulmocare/*.*") +
    glob.glob("public/images/site/*.*") +
    glob.glob("public/images/products/*.*")
)

print(f"Starting background removal on {len(image_files)} image files...")
out_map = {}

for img_file in image_files:
    if img_file.endswith(".svg"):
        continue
    new_path = process_image(img_file)
    if new_path:
        out_map[img_file.replace("\\", "/")] = new_path.replace("\\", "/")

print(f"\nSuccessfully finished background removal on all images!")
