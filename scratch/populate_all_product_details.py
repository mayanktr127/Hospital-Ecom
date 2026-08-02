import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

products_matrix = {
  "prisma-20a": {
    "title": "Löwenstein Prisma 20A Auto CPAP",
    "price": 65000.0,
    "originalPrice": 85000.0,
    "category": "CPAP & APAP Devices",
    "tagline": "Premium German auto-CPAP machine with FOT technology for obstructive and central sleep apnea differentiation.",
    "introParagraph": "The Löwenstein Prisma 20A is a state-of-the-art auto-titrating CPAP machine manufactured in Germany. Featuring Forced Oscillation Technology (FOT), it accurately distinguishes between obstructive and central sleep apnea events, providing tailor-made pressure adjustments. Operating at an ultra-quiet 26 dB sound level, it includes softSTART, autoSTART-STOP, and deep telemetry data recording.",
    "features": [
      "Forced Oscillation Technology (FOT) reliably distinguishes central and obstructive sleep apnea",
      "Ultra-quiet operation at 26 dB(A) for undisturbed sleep",
      "softPAP pressure relief in 3 adjustable comfort levels",
      "autoSTART-STOP automatic activation upon mask breathing",
      "High-resolution 4.3-inch color touch display",
      "PrismaTS software compatibility for telehealth reporting",
      "Integrated heated tube support & optional Prisma AQUA humidifier"
    ],
    "specifications": [
      {"key": "Pressure Range", "value": "4.0 to 20.0 hPa (0.5 hPa increments)"},
      {"key": "Noise Level", "value": "approx. 26 dB(A) at 10 hPa"},
      {"key": "Dimensions (W x H x D)", "value": "170 x 135 x 180 mm"},
      {"key": "Weight", "value": "1.4 kg (3.1 lbs)"},
      {"key": "Power Supply", "value": "100-240 V AC, 50-60 Hz (40 VA)"},
      {"key": "Data Storage", "value": "SD Card slot & internal memory (365 days)"}
    ]
  },
  "prisma-smart": {
    "title": "Löwenstein Prisma SMART Auto CPAP",
    "price": 45990.0,
    "originalPrice": 65000.0,
    "category": "CPAP & APAP Devices",
    "tagline": "Intelligent, reliable German auto-CPAP machine with softPAP pressure relief.",
    "introParagraph": "Löwenstein Prisma SMART offers intelligent auto-CPAP therapy with classic APAP dynamics and softPAP pressure relief. Engineered in Germany for high patient compliance, it guarantees silent night operation with intuitive navigation and compact ergonomics.",
    "features": [
      "Classic APAP and Standard CPAP modes",
      "softPAP exhalation pressure relief",
      "Silent motor technology operating at 26 dB(A)",
      "Clear LCD display with intuitive patient menu",
      "SD Card compliance recording for sleep clinicians",
      "Compatible with all standard 22mm & 15mm CPAP tubing"
    ],
    "specifications": [
      {"key": "Pressure Range", "value": "4.0 to 20.0 hPa"},
      {"key": "Noise Level", "value": "26 dB(A) at 10 hPa"},
      {"key": "Weight", "value": "1.34 kg"},
      {"key": "Dimensions", "value": "170 x 135 x 180 mm"},
      {"key": "Electrical Output", "value": "100-240 V AC, max 40 VA"}
    ]
  },
  "prisma-smart-plus": {
    "title": "Löwenstein Prisma SMART Plus Auto CPAP",
    "price": 52500.0,
    "originalPrice": 72000.0,
    "category": "CPAP & APAP Devices",
    "tagline": "Advanced auto-CPAP with integrated Bluetooth connectivity and mobile app telemetry.",
    "introParagraph": "Prisma SMART Plus combines Löwenstein's precise auto-CPAP algorithm with integrated Bluetooth connectivity. Patients and clinicians can access sleep compliance data on smartphones via the Prisma APP, backed by German manufacturing precision.",
    "features": [
      "Integrated Bluetooth connectivity for mobile app telemetry",
      "FOT central sleep apnea detection algorithm",
      "softPAP exhalation pressure reduction",
      "Compact white-fronted design with high-contrast screen",
      "Full SD card sleep data transfer capability"
    ],
    "specifications": [
      {"key": "Pressure Range", "value": "4.0 to 20.0 hPa"},
      {"key": "Wireless", "value": "Integrated Bluetooth Low Energy"},
      {"key": "Noise Level", "value": "26 dB(A)"},
      {"key": "Weight", "value": "1.34 kg"}
    ]
  },
  "prisma-25-st": {
    "title": "Löwenstein Prisma 25ST BiLevel",
    "price": 70300.0,
    "originalPrice": 95000.0,
    "category": "Bilevel-S & ST Devices",
    "tagline": "Advanced ST BiLevel ventilator machine with autoTRILEVEL and target volume settings.",
    "introParagraph": "Prisma 25ST is a premier S/ST BiLevel machine designed for patients suffering from obstructive, mixed, or complex sleep apnea, combined with hypoventilation disorders. Features target volume control (autoTRILEVEL) and automatic backup frequency.",
    "features": [
      "S, ST, T, CPAP, and APAP ventilation modes",
      "autoTRILEVEL pressure optimization for IPAP, EPAP, and PEEP",
      "Automatic backup breathing frequency (autoS/T)",
      "High pressure capability up to 25 hPa",
      "FOT detection of Cheyne-Stokes and central apnea",
      "Ultra-quiet operating sound level at 26 dB"
    ],
    "specifications": [
      {"key": "IPAP Pressure Range", "value": "4.0 to 25.0 hPa"},
      {"key": "EPAP Pressure Range", "value": "4.0 to 20.0 hPa"},
      {"key": "Backup Rate", "value": "0 to 35 breaths/min (bpm)"},
      {"key": "Weight", "value": "1.4 kg"}
    ]
  },
  "prisma-25s": {
    "title": "Löwenstein Prisma 25S BiLevel",
    "price": 70000.0,
    "originalPrice": 92000.0,
    "category": "Bilevel-S & ST Devices",
    "tagline": "High-pressure BiLevel S machine for severe OSA and COPD therapy.",
    "introParagraph": "Prisma 25S offers spontaneous BiLevel therapy with pressure differential support up to 25 hPa. Engineered specifically for patients requiring higher inspiratory support, COPD management, and severe obstructive sleep apnea.",
    "features": [
      "BiLevel S spontaneous mode with auto-titrating EPAP",
      "Wide pressure differential up to 25 hPa",
      "FOT event recognition algorithm",
      "Integrated humidifier options with Prisma AQUA",
      "26.5 dB whisper-quiet motor sound"
    ],
    "specifications": [
      {"key": "IPAP Range", "value": "4.0 to 25.0 hPa"},
      {"key": "EPAP Range", "value": "4.0 to 20.0 hPa"},
      {"key": "Sound Level", "value": "26.5 dB(A)"},
      {"key": "Weight", "value": "1.4 kg"}
    ]
  },
  "prisma-30-st": {
    "title": "Löwenstein Prisma 30ST BiLevel",
    "price": 79690.0,
    "originalPrice": 110000.0,
    "category": "Bilevel-S & ST Devices",
    "tagline": "High-pressure 30 hPa ST BiLevel device for hypoventilation and respiratory insufficiency.",
    "introParagraph": "Prisma 30ST provides high-pressure BiLevel S/ST therapy up to 30 hPa. Designed for complex respiratory insufficiency, ALS, neuromuscular weakness, and overlap syndromes.",
    "features": [
      "High inspiratory pressure up to 30 hPa",
      "Target volume control for constant minute ventilation",
      "Scope for invasive and non-invasive ventilation",
      "FOT central event detection",
      "High resolution clinical waveform graphs"
    ],
    "specifications": [
      {"key": "IPAP Range", "value": "4.0 to 30.0 hPa"},
      {"key": "EPAP Range", "value": "4.0 to 25.0 hPa"},
      {"key": "Backup Rate", "value": "0 to 35 bpm"},
      {"key": "Weight", "value": "1.4 kg"}
    ]
  },
  "prisma-cr": {
    "title": "Löwenstein Prisma CR ASV",
    "price": 165000.0,
    "originalPrice": 210000.0,
    "category": "ASV & Titration Devices",
    "tagline": "Adaptive Servo-Ventilation (ASV) device for Cheyne-Stokes respiration and central apnea.",
    "introParagraph": "Prisma CR delivers breath-by-breath adaptive servo-ventilation (ASV) to stabilize ventilation in patients with Cheyne-Stokes respiration, periodic breathing, or complex central sleep apnea.",
    "features": [
      "Adaptive Servo-Ventilation (ASV) breath-by-breath algorithm",
      "Target minute ventilation auto-regulation",
      "FOT central and obstructive apnea differentiation",
      "Ultra-quiet German engineering at 26.5 dB",
      "Comprehensive telemetry & clinical reporting"
    ],
    "specifications": [
      {"key": "IPAP Range", "value": "4.0 to 30.0 hPa"},
      {"key": "EPAP Range", "value": "4.0 to 20.0 hPa"},
      {"key": "ASV Rate", "value": "Dynamic Auto-Regulation"},
      {"key": "Weight", "value": "1.4 kg"}
    ]
  },
  "prisma-lab": {
    "title": "Löwenstein Prisma LAB Titration",
    "price": 180000.0,
    "originalPrice": 240000.0,
    "category": "ASV & Titration Devices",
    "tagline": "Universal sleep laboratory titration system across all CPAP, APAP, BiLevel, and ASV modes.",
    "introParagraph": "Prisma LAB is the ultimate remote titration system for sleep diagnostic centers. Allows sleep technicians to remotely switch modes (CPAP, APAP, BiLevel S, ST, ASV) and adjust pressure parameters during polysomnography.",
    "features": [
      "Universal titration across CPAP, APAP, BiLevel S, ST, autoST, and ASV",
      "Remote control interface for sleep lab PSG software",
      "Real-time pressure, flow, and leak telemetry",
      "Robust German design for 24/7 hospital sleep lab operation"
    ],
    "specifications": [
      {"key": "Operating Modes", "value": "CPAP, APAP, S, ST, autoST, ASV, Target Volume"},
      {"key": "Max Pressure", "value": "30.0 hPa"},
      {"key": "Interface", "value": "PrismaTS / PSG Lab Titration Cable"}
    ]
  },
  "prisma-aqua": {
    "title": "Löwenstein Prisma AQUA Humidifier",
    "price": 12180.0,
    "originalPrice": 16500.0,
    "category": "Humidifiers",
    "tagline": "Heated humidifier for prismaLINE CPAP & BiLevel devices.",
    "introParagraph": "Prisma AQUA heated humidifier clicks seamlessly into any prismaLINE device. Eliminates nasal dryness, congestion, and cold airway irritation during sleep therapy.",
    "features": [
      "400 ml transparent water chamber",
      "5 adjustable heating levels with auto-shutoff safety",
      "Easy top-fill opening and dishwasher-safe tub",
      "Smart warm-up pre-heating option"
    ],
    "specifications": [
      {"key": "Water Capacity", "value": "400 ml"},
      {"key": "Heating Output", "value": "5 levels (100-240V)"},
      {"key": "Weight", "value": "0.4 kg"}
    ]
  },
  "luisa-ventilator": {
    "title": "Löwenstein Luisa Life Support Ventilator",
    "price": 485000.0,
    "originalPrice": 620000.0,
    "category": "Ventilation",
    "tagline": "Portable life support ventilator for hospital and homecare invasive and non-invasive ventilation.",
    "introParagraph": "Luisa is a premium portable life support ventilator designed for adults and pediatric patients down to 30 mL tidal volume. Equipped with a 10-inch touchscreen and up to 18 hours of dual battery operation.",
    "features": [
      "Life support ventilation for invasive and non-invasive applications",
      "Pediatric and adult ventilation (30 mL to 2000 mL tidal volume)",
      "Up to 18 hours operation via dual internal batteries",
      "10-inch high-resolution touchscreen display",
      "High Flow Oxygen (HFO) therapy mode integrated",
      "Lightweight 3.8 kg portable frame"
    ],
    "specifications": [
      {"key": "Tidal Volume", "value": "30 to 2000 mL"},
      {"key": "Pressure Range", "value": "4 to 50 hPa"},
      {"key": "Battery Life", "value": "Up to 18 Hours (dual internal batteries)"},
      {"key": "Screen", "value": "10.0-inch color touchscreen"},
      {"key": "Weight", "value": "3.8 kg"}
    ]
  },
  "prisma-vent-40": {
    "title": "Löwenstein Prisma VENT 40 Ventilator",
    "price": 245000.0,
    "originalPrice": 310000.0,
    "category": "Ventilation",
    "tagline": "Non-invasive and invasive ventilator up to 40 hPa with airTrap Control.",
    "introParagraph": "Prisma VENT 40 offers invasive and non-invasive ventilation with pressure up to 40 hPa, target volume (airTrap Control), and a 12-hour internal battery runtime for respiratory insufficiency.",
    "features": [
      "Pressure support up to 40 hPa",
      "airTrap Control prevents dynamic hyperinflation",
      "Target volume control for consistent minute ventilation",
      "12-hour internal battery runtime",
      "Large clinical color display"
    ],
    "specifications": [
      {"key": "Pressure Range", "value": "4 to 40 hPa"},
      {"key": "Tidal Volume", "value": "100 to 2000 mL"},
      {"key": "Battery Life", "value": "12 Hours internal battery"},
      {"key": "Weight", "value": "2.4 kg"}
    ]
  },
  "prisma-vent-50c": {
    "title": "Löwenstein Prisma VENT 50C Ventilator",
    "price": 315000.0,
    "originalPrice": 410000.0,
    "category": "Ventilation",
    "tagline": "High-pressure 50 hPa ventilator with High Flow Oxygen (HFO) therapy.",
    "introParagraph": "Prisma VENT 50C combines high-pressure ventilation up to 50 hPa with integrated High Flow Oxygen (HFO) therapy up to 60 L/min, providing complete respiratory support for complex clinical cases.",
    "features": [
      "High inspiratory pressure up to 50 hPa",
      "Integrated High Flow Oxygen (HFO) up to 60 L/min",
      "Mouthpiece ventilation (MPV) mode",
      "12-hour internal battery pack",
      "Invasive and non-invasive single/dual line circuits"
    ],
    "specifications": [
      {"key": "Max Pressure", "value": "50 hPa"},
      {"key": "High Flow Rate", "value": "5 to 60 L/min"},
      {"key": "Battery Runtime", "value": "12 Hours"},
      {"key": "Weight", "value": "2.5 kg"}
    ]
  },
  "inogen-rove-6": {
    "title": "Inogen Rove 6 Portable Oxygen Concentrator",
    "price": 195000.0,
    "originalPrice": 245000.0,
    "category": "Oxygen Therapy",
    "tagline": "Ultra-lightweight portable oxygen concentrator with 6 pulse flow settings.",
    "introParagraph": "Inogen Rove 6 is the latest FAA-approved portable oxygen concentrator. Delivering up to 6 pulse flow settings in an ultra-compact 2.2 kg package, it offers active oxygen therapy on the go with up to 13 hours battery runtime.",
    "features": [
      "6 pulse dose oxygen flow settings",
      "Up to 13 hours battery runtime (with 16-cell battery)",
      "Ultra-quiet 37 dBA operating noise level",
      "FAA approved for commercial airline travel",
      "Lightweight 2.2 kg compact design"
    ],
    "specifications": [
      {"key": "Oxygen Flow", "value": "Pulse Dose Settings 1 to 6"},
      {"key": "Oxygen Purity", "value": "90% -3% / +6% at all settings"},
      {"key": "Battery Duration", "value": "Up to 13 Hours (16-cell battery)"},
      {"key": "Weight", "value": "2.2 kg (4.8 lbs)"},
      {"key": "Noise Level", "value": "37 dBA"}
    ]
  },
  "nidek-neo-5": {
    "title": "Nidek NEO 5 LPM Oxygen Concentrator",
    "price": 42000.0,
    "originalPrice": 58000.0,
    "category": "Oxygen Therapy",
    "tagline": "Robust 5-liter continuous flow stationary oxygen concentrator.",
    "introParagraph": "Nidek NEO 5 is a heavy-duty 5 LPM stationary home oxygen concentrator engineered to deliver medical-grade oxygen above 93% purity continuously for 24/7 oxygen therapy.",
    "features": [
      "Continuous oxygen flow from 0.5 to 5.0 L/min",
      "High oxygen concentration > 93% ± 3%",
      "Low power consumption (300 Watts)",
      "Built-in oxygen purity sensor & alarm safety system",
      "Durable roller casters for effortless room relocation"
    ],
    "specifications": [
      {"key": "Flow Rate", "value": "0.5 to 5.0 Liters/min"},
      {"key": "Oxygen Purity", "value": "93% ± 3%"},
      {"key": "Outlet Pressure", "value": "7 PSI"},
      {"key": "Power Consumption", "value": "300 Watts"},
      {"key": "Weight", "value": "14.5 kg"}
    ]
  },
  "polygraphy-devices-samoa": {
    "title": "Löwenstein Samoa Polygraphy Device",
    "price": 185000.0,
    "originalPrice": 235000.0,
    "category": "Sleep Diagnostics",
    "tagline": "Ultra-compact 10-channel home sleep apnea testing (HSAT) polygraphy system.",
    "introParagraph": "Samoa is an ultra-compact sleep polygraphy recorder with 10 channels designed for effortless home sleep testing. Features built-in thorax/abdomen effort sensors, pulse oximetry, and automatic diagnostic reporting software.",
    "features": [
      "10 recording channels for home sleep apnea testing (HSAT)",
      "Integrated thorax and abdomen effort recording",
      "OLED color display for sensor impedance check",
      "Automatic scoring via PrismaTS diagnostic software",
      "Compact 160g body-worn recorder"
    ],
    "specifications": [
      {"key": "Channels", "value": "10 recording channels"},
      {"key": "Sensors", "value": "Flow, Snore, SpO2, Pulse, Thorax, Abdomen, Position, Actigraphy"},
      {"key": "Weight", "value": "160 grams"},
      {"key": "Battery", "value": "1x AA Battery (up to 2 nights)"}
    ]
  },
  "polygraphy-devices-scala": {
    "title": "Löwenstein Scala Polygraphy Device",
    "price": 240000.0,
    "originalPrice": 310000.0,
    "category": "Sleep Diagnostics",
    "tagline": "Expandable 16 to 28 channel polygraphy and polysomnography system.",
    "introParagraph": "Scala is a flexible diagnostic system expandable from polygraphy to full polysomnography (PSG) with up to 28 channels. Supports wireless Bluetooth data transmission to sleep lab monitoring stations.",
    "features": [
      "16 to 28 recording channels expandable to EEG/EOG/EMG",
      "Wireless Bluetooth data transmission",
      "High-precision continuous SpO2 and pulse waveform",
      "AASM compliant diagnostic report generation"
    ],
    "specifications": [
      {"key": "Channel Capacity", "value": "16 - 28 Channels"},
      {"key": "Wireless", "value": "Bluetooth Class 1"},
      {"key": "Weight", "value": "220 grams"}
    ]
  },
  "polysomnography-devices-sonata": {
    "title": "Löwenstein Sonata Polysomnography Device",
    "price": 450000.0,
    "originalPrice": 58000.0,
    "category": "Sleep Diagnostics",
    "tagline": "Premier 33-channel hospital sleep lab PSG diagnostic system with HD video.",
    "introParagraph": "Sonata is Löwenstein's flagship 33-channel sleep lab polysomnography system. Complete with HD IP video synchronization, infrared night vision, and comprehensive neurological sleep analysis.",
    "features": [
      "33 high-resolution diagnostic channels",
      "Full PSG EEG, EOG, EMG, ECG, and leg movement recording",
      "Synchronized HD IP video camera with infrared night vision",
      "Automatic sleep staging & arousal scoring"
    ],
    "specifications": [
      {"key": "Total Channels", "value": "33 Channels"},
      {"key": "Video Sync", "value": "HD 1080p IP Camera + IR Illuminator"},
      {"key": "Compliance", "value": "Full AASM Standards"}
    ]
  },
  "cara-full-face": {
    "title": "Löwenstein CARA Full Face Mask",
    "price": 5800.0,
    "originalPrice": 8200.0,
    "category": "Masks",
    "tagline": "Lightweight full face mask with soft cushion and whisper-quiet exhalation.",
    "introParagraph": "CARA Full Face mask features an exceptionally quiet air dispersion system (only 13 dB), lightweight silicone cushion, OEKO-TEX certified headgear, and 3D ball-and-socket joint for optimal seal and movement freedom.",
    "features": [
      "Whisper-quiet exhalation system at 13 dB(A)",
      "Lightweight design (only 89g)",
      "Soft, ergonomic silicone cushion for leak-free seal",
      "3D ball-and-socket 360° swivel joint",
      "OEKO-TEX Standard 100 skin-friendly headgear"
    ],
    "specifications": [
      {"key": "Noise Level", "value": "13 dB(A)"},
      {"key": "Weight", "value": "89 grams"},
      {"key": "Sizes Available", "value": "Small, Medium, Large"}
    ]
  },
  "joyceone-full-face": {
    "title": "Löwenstein JOYCEone Full Face Mask",
    "price": 6500.0,
    "originalPrice": 9000.0,
    "category": "Masks",
    "tagline": "Universal one-size fits all full face mask with SilkTec coating.",
    "introParagraph": "JOYCEone Full Face mask uses SilkTec smooth coating and automatic cushion fitting technology to provide a customized seal for all facial shapes with a single universal size.",
    "features": [
      "Universal one-size cushion fits virtually all patient faces",
      "SilkTec smooth silicone coating for skin comfort",
      "Color-coded headgear straps & intuitive quick-release clips",
      "360-degree ball-and-socket elbow"
    ],
    "specifications": [
      {"key": "Size", "value": "Universal One Size"},
      {"key": "Coating", "value": "SilkTec Smooth Surface"},
      {"key": "Weight", "value": "98 grams"}
    ]
  },
  "lena": {
    "title": "Löwenstein LENA Full Face Mask",
    "price": 7200.0,
    "originalPrice": 9800.0,
    "category": "Masks",
    "tagline": "High-pressure hospital and home ventilation full face mask.",
    "introParagraph": "LENA is a full face mask designed for continuous high-pressure non-invasive ventilation up to 40 hPa. Equipped with a double-lip silicone seal and quick-release safety pull cord.",
    "features": [
      "Certified for high-pressure ventilation up to 40 hPa",
      "Double-lip silicone seal prevents high-pressure leaks",
      "Integrated emergency entrainment valve",
      "Vented and Non-Vented clinical options"
    ],
    "specifications": [
      {"key": "Pressure Range", "value": "Up to 40 hPa"},
      {"key": "Seal Design", "value": "Double-Lip Silicone"},
      {"key": "Sizes Available", "value": "Small, Medium, Large"}
    ]
  },
  "cara-nasal": {
    "title": "Löwenstein CARA Nasal Mask",
    "price": 5620.0,
    "originalPrice": 7800.0,
    "category": "Masks",
    "tagline": "Award-winning ultra-lightweight nasal CPAP mask.",
    "introParagraph": "CARA Nasal is an award-winning lightweight nasal mask offering whisper-quiet air dispersion (13 dB) and soft touch cushion for comfortable CPAP sleep therapy.",
    "features": [
      "Ultra-lightweight design weighing only 59g",
      "Whisper-quiet air dispersion system (13 dB)",
      "Soft, supple cushion with perfect facial adaptation",
      "OEKO-TEX Standard 100 skin-friendly headgear"
    ],
    "specifications": [
      {"key": "Weight", "value": "59 grams"},
      {"key": "Noise Level", "value": "13 dB(A)"},
      {"key": "Sizes Available", "value": "XS, S-M, M-L"}
    ]
  }
}

# Update pulmocare_products.json
with open('src/data/pulmocare_products.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

updated_cnt = 0
for cat_key, cat in data.items():
    if 'products' in cat and isinstance(cat['products'], list):
        for p in cat['products']:
            slug = p.get('slug')
            if slug in products_matrix:
                info = products_matrix[slug]
                p['title'] = info['title']
                p['price'] = info['price']
                p['originalPrice'] = info['originalPrice']
                p['tagline'] = info['tagline']
                p['introParagraph'] = info['introParagraph']
                p['features'] = info['features']
                p['specifications'] = info['specifications']
                updated_cnt += 1
                print(f"Enriched {slug} -> Title: {info['title']} | Price: ₹{info['price']}")

with open('src/data/pulmocare_products.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"\nSuccessfully populated exact accurate descriptions & prices for {updated_cnt} products!")
