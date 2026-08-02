import json

with open('src/data/product_pages/structured_products.json', 'r', encoding='utf-8') as f:
    structured = json.load(f)

# Update CARA Full Face
structured['masks_cara_full_face'] = {
    "key": "masks_cara_full_face",
    "title": "CARA Full Face",
    "subtitle": "Sleep soundly.",
    "introText": "CARA Full Face, the successful homecare full face mask from Löwenstein Medical, wins patients over with its lightness, the gently fitting, precise mask cushion, the small, quiet, and diffuse exhalation system, adjustable headgear, excellent fit, and other clever details. By using fewer parts, handling is simplified, weight is reduced, and the environment is less burdened by material production and waste.",
    "articleNumbers": "WM 25630 (S) | WM 25640 (M) | WM 25650 (L) | WM 25680 (XL) | WM 25338 (XL-headgear) | WM 25623 (quick-release cord)",
    "bannerHeading": "May we introduce you to CARA Full Face?",
    "bannerParagraph": "Our CARA Full Face mask offers the right solution for almost every mask wearer and impresses patients and users with its numerous benefits. Night after night.",
    "accordionItems": [
        {
            "title": "Mask cushion – precise with perfect fit.",
            "content": "The mask makes a good first impression that lasts. The soft and supple mask cushion precisely conforms to the individual facial contours – perfect for long lasting comfort, without the need for forehead cushion."
        },
        {
            "title": "Quiet and diffuse exhalation system.",
            "content": "CARA Full Face is impeccably quiet. The exhalation system, perfected over decades, provides a diffuse airflow that does not disturb the patient or bed partner. Additionally, the exhalation system offers a closed upper part to prevent airflow towards the eyes."
        },
        {
            "title": "3D Ball-and-socket joint & Lightweight design.",
            "content": "Ball-and-socket joint with 360° and 3D rotation for unlimited freedom of movement while sleeping. The mask's lightweight design ensures a comfortable wearing experience and exceptional comfort."
        }
    ],
    "downloads": [
        {"name": "Instructions for use CARA Full Face", "size": "1 MB", "file": "/doc-files/LM_QuickSupport_Win_v15.zip"},
        {"name": "Fitting Template CARA", "size": "131 KB", "file": "/doc-files/LM_QuickSupport_Win_v15.zip"},
        {"name": "Instructions for use CARA Full Face", "size": "2 MB", "file": "/doc-files/LM_QuickSupport_Win_v15.zip"},
        {"name": "Mask Order Overview", "size": "1 MB", "file": "/doc-files/LM_QuickSupport_Win_v15.zip"},
        {"name": "Cleaning instructions brochure", "size": "1 MB", "file": "/doc-files/LM_QuickSupport_Win_v15.zip"},
        {"name": "Declaration of conformity CARA Full Face", "size": "87 KB", "file": "/doc-files/LM_QuickSupport_Win_v15.zip"},
        {"name": "Brochure CARA", "size": "940 KB", "file": "/doc-files/LM_QuickSupport_Win_v15.zip"},
        {"name": "Overview brochure Patient Interface", "size": "872 KB", "file": "/doc-files/LM_QuickSupport_Win_v15.zip"},
        {"name": "Brochure Mask disinfection in hospitals", "size": "1 MB", "file": "/doc-files/LM_QuickSupport_Win_v15.zip"}
    ]
}

# Update JOYCEone Full Face
structured['masks_joyceone_full_face'] = {
    "key": "masks_joyceone_full_face",
    "title": "JOYCEone Full Face",
    "subtitle": "Made for you.",
    "introText": "Do you need a full face mask with forehead support that is quickly and efficiently adjustable? We offer you JOYCEone Full Face, the breathing mask in a size that fits almost everyone. Decades of mask expertise make this possible. Are you taking care of sleep apnea patients at home? Use JOYCEone Full Face, as you can almost always manage with just one size.",
    "articleNumbers": "WM 25290 | WM 25270 (NV) | WM 25338 (XL-headgear) | WM 15864 (endoscope adapter NV)",
    "bannerHeading": "The advantages of JOYCEone Full Face.",
    "bannerParagraph": "This full face mask from Löwenstein Medical combines all the advantages of the successful JOYCEone series: lightweight, compact, high wearing comfort, extremely durable materials, as well as easy handling and cleaning.",
    "accordionItems": [
        {
            "title": "Hand in hand: comfort and treatment success.",
            "content": "With its flexible spring design, the forehead support ensures that it always rests stably and comfortably on the forehead at the therapy-appropriate distance. The single-layer mask cushion automatically finds the ideal position regardless of facial size."
        },
        {
            "title": "Well thought out in every aspect.",
            "content": "Patients will love JOYCEone Full Face from the very first contact! This is because Löwenstein Medical's full face mask not only stands out with its precise fit and wearing comfort, but also ease of use: thanks to the unmistakable colour coding of the headgear and headgear clips."
        },
        {
            "title": "Efficiency in a modern way.",
            "content": "The intelligent JOYCEone Full Face principle helps you make the most use of your time without compromising on patient care."
        }
    ],
    "downloads": [
        {"name": "Instructions for use JOYCEone Full Face", "size": "1 MB", "file": "/doc-files/LM_QuickSupport_Win_v15.zip"},
        {"name": "Instructions for use JOYCEone Full Face NV", "size": "2 MB", "file": "/doc-files/LM_QuickSupport_Win_v15.zip"},
        {"name": "Mask Order Overview", "size": "1 MB", "file": "/doc-files/LM_QuickSupport_Win_v15.zip"},
        {"name": "Cleaning instructions brochure", "size": "1 MB", "file": "/doc-files/LM_QuickSupport_Win_v15.zip"},
        {"name": "Overview brochure Patient Interface", "size": "872 KB", "file": "/doc-files/LM_QuickSupport_Win_v15.zip"},
        {"name": "Brochure Mask disinfection in hospitals", "size": "1 MB", "file": "/doc-files/LM_QuickSupport_Win_v15.zip"}
    ]
}

# Update JOYCEeasy Full Face
structured['masks_joyceeasy_full_face'] = {
    "key": "masks_joyceeasy_full_face",
    "title": "JOYCEeasy Full Face",
    "subtitle": "Easy to Fit. Easy to Use.",
    "introText": "Do you need a full-face mask that can be securely fixed to the forehead? Then choose JOYCEeasy Full Face - our proven full-face mask with balanced features. The JOYCEeasy Full Face is available in three sizes. For many years the mask has won over users with its reliable seal and fit, as well as its pleasantly quiet outflow of air, the freedom of movement provided by the ball-and-socket joint and the easy handling when cleaning the mask.",
    "articleNumbers": "WM 25910 (S) | WM 25920 (M) | WM 25930 (L) | WM 25338 (XL-headwear) | WM 25275 (elbow set Full Face NV)",
    "bannerHeading": "JOYCEeasy Full Face - ingenious simplicity.",
    "bannerParagraph": "As a result of continuous product development, the successful JOYCEeasy Full Face mask from Löwenstein Medical impresses in many areas.",
    "accordionItems": [
        {
            "title": "Well-thought-out details.",
            "content": "The JOYCEeasy Full Face scores points with its ball-and-socket joint for unlimited freedom of movement and the quiet and diffuse exhalation system for undisturbed sleep. JOYCEeasy Full Face is available in vented and non-vented versions."
        },
        {
            "title": "More therapy compliance.",
            "content": "Thanks to its good fit, leaks and pressure points are reduced to a minimum. The JOYCEeasy Full Face mask is particularly suitable for slim to narrow faces."
        },
        {
            "title": "Easy handling & effortless cleaning.",
            "content": "It couldn't be easier: effortlessly put on and taken off, even with one hand, simplifying clinical maintenance and cleaning."
        }
    ],
    "downloads": [
        {"name": "Instructions for use JOYCEeasy Full Face", "size": "1 MB", "file": "/doc-files/LM_QuickSupport_Win_v15.zip"},
        {"name": "Fitting Template JOYCEeasy", "size": "134 KB", "file": "/doc-files/LM_QuickSupport_Win_v15.zip"},
        {"name": "Instructions for use JOYCEeasy (next) Full Face", "size": "2 MB", "file": "/doc-files/LM_QuickSupport_Win_v15.zip"},
        {"name": "Cleaning instructions brochure", "size": "1 MB", "file": "/doc-files/LM_QuickSupport_Win_v15.zip"},
        {"name": "Declaration of Conformity JOYCEeasy (X) Full Face", "size": "1 MB", "file": "/doc-files/LM_QuickSupport_Win_v15.zip"},
        {"name": "Declaration of Conformity Endoscopy adapter", "size": "99 KB", "file": "/doc-files/LM_QuickSupport_Win_v15.zip"},
        {"name": "Overview brochure Patient Interface", "size": "872 KB", "file": "/doc-files/LM_QuickSupport_Win_v15.zip"}
    ]
}

# Update JOYCEeasy next Full Face
structured['masks_joyceeasy_next_full_face'] = {
    "key": "masks_joyceeasy_next_full_face",
    "title": "JOYCEeasy next Full Face",
    "subtitle": "For higher sleep therapy pressures.",
    "introText": "JOYCEeasy next Full Face is based on JOYCEeasy Full Face and differs in two details. The mask cushion is wider and longer. The headgear is less flexible. These two features allow for a more stable fit on the patient's face at higher therapy pressures in the sleep apnea therapy. JOYCEeasy next Full Face is available in vented and non-vented versions.",
    "articleNumbers": "WM 25109 (S) | WM 25119 (M) | WM 25129 (L) | WM 25159 (S) NV | WM 25169 (M) NV | WM 25179 (L) NV | WM 25338 (XL-headgear) | WM 25275 (elbow set Full Face NV)",
    "bannerHeading": "Revised and even better.",
    "bannerParagraph": "The revised successor to Löwenstein Medical’s successful JOYCEeasy Full Face features an optimized mask cushion and a new headgear, both designed specifically for high pressures. The smooth, ergonomically shaped headgear clip allows for easy handling of the mask. Particularly suitable for ventilation and sleep apnea patients with normal to larger faces.",
    "accordionItems": [
        {
            "title": "Comfortable and stable under pressure.",
            "content": "The JOYCEeasy next Full Face impresses with an entirely redesigned, larger mask cushion that fits comfortably and stably even at higher pressures."
        },
        {
            "title": "Ergonomic headgear clip design.",
            "content": "The attaching clip of the pressure-stable headgear offers the right mix of materials. Its ergonomic design makes it easy to detach from the mask."
        },
        {
            "title": "Correct fit & pressure relief.",
            "content": "The good fit of the mask reduces leaks and pressure points to a minimum. The forehead support of the JOYCEeasy next Full Face also relieves pressure on the bridge of the nose."
        }
    ],
    "downloads": [
        {"name": "Fitting Template JOYCEeasy", "size": "134 KB", "file": "/doc-files/LM_QuickSupport_Win_v15.zip"},
        {"name": "Instructions for use JOYCEeasy Full Face", "size": "1 MB", "file": "/doc-files/LM_QuickSupport_Win_v15.zip"},
        {"name": "Instructions for use JOYCEeasy (next) Full Face", "size": "2 MB", "file": "/doc-files/LM_QuickSupport_Win_v15.zip"},
        {"name": "Mask Order Overview", "size": "1 MB", "file": "/doc-files/LM_QuickSupport_Win_v15.zip"},
        {"name": "Overview brochure Patient Interface", "size": "872 KB", "file": "/doc-files/LM_QuickSupport_Win_v15.zip"}
    ]
}

with open('src/data/product_pages/structured_products.json', 'w', encoding='utf-8') as f:
    json.dump(structured, f, indent=2, ensure_ascii=False)

print("Successfully updated 4 Full Face Mask entries in structured_products.json with verbatim official text and downloads.")
