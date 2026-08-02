import os
import re

def clean_str(text):
    if not isinstance(text, str):
        return text
    if "-" not in text:
        return text
    if re.search(r'-[A-Za-z0-9]-', text):
        res = text.replace("-", "")
        res = re.sub(r'[\u2013\u2014\u201c\u201d]', ' ', res)
        res = re.sub(r'\s+', ' ', res).strip()
        return res
    return text

src_dir = r"c:\Users\user1\Desktop\Cyborgspient Projects\New folder\Hospital-Ecom\src"

cleaned_files_count = 0

for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith((".ts", ".tsx", ".json")):
            filepath = os.path.join(root, file)
            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()

            if re.search(r'-[A-Za-z0-9]-', content):
                # Clean occurrences of hyphenated single letters
                lines = content.splitlines()
                new_lines = []
                for line in lines:
                    if re.search(r'-[A-Za-z0-9]-', line):
                        line = re.sub(r'"(-[A-Za-z0-9\s–—-]+)"', lambda m: f'"{clean_str(m.group(1))}"', line)
                    new_lines.append(line)
                
                final_content = "\n".join(new_lines)
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(final_content)
                cleaned_files_count += 1
                print(f"Cleaned: {filepath}")

print(f"Cleaned {cleaned_files_count} files in total!")
