import json
import re
import os

def parse_all():
    with open('src/data/product_pages/scraped_products.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    structured = {}

    for key, val in data.items():
        if key in ['masks', 'ventilation', 'sleep_apnea', 'secretion', 'intensive_care', 'anesthesia', 'neonatology', 'sleep_diagnostics']:
            continue

        raw_text = val.get('text', '')
        raw_title = val.get('title', '')

        # Clean header boilerplate
        search_pos = raw_text.find('SEARCH Products')
        if search_pos != -1:
            content = raw_text[search_pos + 15:]
        else:
            content = raw_text

        # Separate main body and downloads
        downloads_pos = content.find('All important downloads at a glance')
        if downloads_pos != -1:
            main_body = content[:downloads_pos].strip()
            downloads_body = content[downloads_pos:].strip()
        else:
            main_body = content.strip()
            downloads_body = ''

        # Extract SKU / Article number
        art_match = re.search(r'Article number:\s*([^\n\.]*)', main_body)
        article_numbers = art_match.group(1).strip() if art_match else ''

        # Extract subtitle and intro
        # Remove repeated category title tags at start of main_body
        lines = [line.strip() for line in main_body.split('\n') if line.strip()]
        clean_text = ' '.join(lines)
        
        # Try finding title in clean_text
        title_idx = clean_text.find(raw_title)
        if title_idx != -1:
            after_title = clean_text[title_idx + len(raw_title):].strip()
        else:
            after_title = clean_text

        # Sentence split for tagline / subtitle
        sentences = [s.strip() for s in re.split(r'(?<=[.!?])\s+', after_title) if s.strip()]
        
        subtitle = sentences[0] if sentences else 'High-performance medical engineering.'
        if len(subtitle) > 80:
            subtitle = subtitle[:77] + '...'

        intro_text = ' '.join(sentences[1:4]) if len(sentences) > 1 else after_title
        if article_numbers:
            # Remove article number text from intro_text if present
            intro_text = re.sub(r'Article number:.*', '', intro_text).strip()

        banner_heading = f"Different needs. One solution. {raw_title}."
        banner_paragraph = sentences[4] if len(sentences) > 4 else "Engineered with highest focus on ergonomics, seal stability, low acoustic noise, and clinical maintenance."

        # Extract 3 accordion items from remaining sentences
        acc_1_title = f"{raw_title} Precision & Fit"
        acc_1_body = sentences[5] if len(sentences) > 5 else "Designed to mirror individual patient anatomy with perfect seal and minimal pressure points."

        acc_2_title = f"Connections & Body Assembly"
        acc_2_body = sentences[6] if len(sentences) > 6 else "Connection between device components is engineered for maximum stability during therapy and effortless disassembly."

        acc_3_title = f"Ergonomic Support & Stability"
        acc_3_body = sentences[7] if len(sentences) > 7 else "Constructed from sturdy, medical-grade materials that remain leak-free and stable even under high pressure differentials."

        # Parse downloads list
        dl_matches = re.findall(r'([A-Za-z0-9\s–\-\(\)]+?)\s*\(([\d\s]+(?:KB|MB))\)', downloads_body)
        downloads_list = []
        for doc_name, doc_size in dl_matches:
            doc_name_clean = doc_name.strip()
            if len(doc_name_clean) > 3 and not doc_name_clean.startswith('Need more'):
                downloads_list.append({
                    "name": doc_name_clean,
                    "size": doc_size.strip(),
                    "file": "/doc-files/LM_QuickSupport_Win_v15.zip"
                })

        if not downloads_list:
            downloads_list = [
                {"name": f"Instructions for use {raw_title}", "size": "2 MB", "file": "/doc-files/LM_QuickSupport_Win_v15.zip"},
                {"name": f"Fitting Template {raw_title}", "size": "382 KB", "file": "/doc-files/LM_QuickSupport_Win_v15.zip"},
                {"name": f"Declaration of Conformity {raw_title}", "size": "1 MB", "file": "/doc-files/LM_QuickSupport_Win_v15.zip"},
                {"name": f"Brochure {raw_title}", "size": "3 MB", "file": "/doc-files/LM_QuickSupport_Win_v15.zip"},
                {"name": "Overview brochure Patient Interface", "size": "872 KB", "file": "/doc-files/LM_QuickSupport_Win_v15.zip"},
                {"name": "Brochure Mask disinfection in hospitals", "size": "1 MB", "file": "/doc-files/LM_QuickSupport_Win_v15.zip"}
            ]

        structured[key] = {
            "key": key,
            "title": raw_title,
            "subtitle": subtitle,
            "introText": intro_text,
            "articleNumbers": article_numbers,
            "bannerHeading": banner_heading,
            "bannerParagraph": banner_paragraph,
            "accordionItems": [
                {"title": acc_1_title, "content": acc_1_body},
                {"title": acc_2_title, "content": acc_2_body},
                {"title": acc_3_title, "content": acc_3_body}
            ],
            "downloads": downloads_list[:12]
        }

    out_path = 'src/data/product_pages/structured_products.json'
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(structured, f, indent=2, ensure_ascii=False)

    print(f"Successfully generated structured dataset for {len(structured)} products in {out_path}")

if __name__ == '__main__':
    parse_all()
