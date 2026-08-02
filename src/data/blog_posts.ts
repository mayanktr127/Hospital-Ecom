export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: "Sleep Therapy" | "Ventilation" | "Oxygen Care" | "Diagnostics" | "Masks";
  author: string;
  date: string;
  readTime: string;
  image: string;
  content: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "understanding-cpap-apap-bilevel-therapy",
    title: "Understanding CPAP, APAP, and BiLevel Therapy for Obstructive & Complex Sleep Apnea",
    excerpt: "Discover how modern continuous, auto-adjusting, and bi-level positive airway pressure devices deliver tailored therapy for patients with obstructive sleep apnea (OSA) and respiratory insufficiency.",
    category: "Sleep Therapy",
    author: "Dr. Aris Thorne, MD (Pulmonology)",
    date: "August 1, 2026",
    readTime: "6 min read",
    image: "/images/pulmocare/pulmocare_prisma-smart.png",
    content: [
      "Obstructive Sleep Apnea (OSA) affects millions worldwide, leading to chronic daytime fatigue, cardiovascular strain, and impaired quality of life. Positive Airway Pressure (PAP) therapy remains the gold standard treatment for maintaining upper airway patency during sleep.",
      "Fixed CPAP (Continuous Positive Airway Pressure) delivers a constant pre-set pressure throughout the night. In contrast, APAP (Auto CPAP) devices like the Pulmo Care Prisma SMART continuously monitor breath-by-breath flow limitations and automatically titrate pressure algorithmically to optimal therapeutic levels.",
      "For patients requiring differential pressures during inspiration and expiration, or those with neuromuscular respiratory weakness, BiLevel S and ST systems (such as Prisma 25ST) provide separate IPAP (Inspiratory Positive Airway Pressure) and EPAP (Expiratory Positive Airway Pressure) settings to ease breathing effort."
    ]
  },
  {
    slug: "home-non-invasive-ventilation-guide",
    title: "Comprehensive Guide to Home Non-Invasive Ventilation (NIV) and Life-Support Systems",
    excerpt: "An in-depth review of home ventilator technology, volume-targeted pressure support, and life-support emergency ventilation systems like LUISA and PrismaVENT.",
    category: "Ventilation",
    author: "Elena Rostova, Clinical Respiratory Therapist",
    date: "July 28, 2026",
    readTime: "8 min read",
    image: "/images/pulmocare/pulmocare_luisa-ventilator.png",
    content: [
      "Non-Invasive Ventilation (NIV) has transformed the management of chronic hypercapnic respiratory failure, COPD exacerbations, and neuromuscular conditions like ALS or SMA in outpatient and homecare settings.",
      "Advanced home ventilators such as LUISA provide flexible circuit options (single-pipe with valve, dual-pipe, or leak circuits) and support both invasive tracheostomy and non-invasive mask therapy without compromising patient comfort.",
      "Modern volume-targeted pressure support modes continuously monitor tidal volume delivery, compensating for mask leaks while protecting pulmonary mechanics."
    ]
  },
  {
    slug: "choosing-the-right-cpap-mask",
    title: "How to Choose the Right CPAP Mask: Full Face vs Nasal vs Nasal Pillow Interfaces",
    excerpt: "Selecting the correct mask seal and headgear is essential for compliance. Explore seal mechanics, leak mitigation, and silent exhalation technology in LENA and CARA masks.",
    category: "Masks",
    author: "Marcus Vance, Clinical Specialist",
    date: "July 20, 2026",
    readTime: "5 min read",
    image: "/images/pulmocare/pulmo_l-wenstein-lena.png",
    content: [
      "Patient compliance in sleep apnea therapy depends fundamentally on interface fit and comfort. A poorly fitting mask leads to air leaks, dry mouth, skin redness, and abandoned treatment.",
      "Full Face masks (like LENA and CARA Full Face) cover both the mouth and nose, making them ideal for mouth breathers or patients requiring higher pressure settings above 15 cmH2O.",
      "Nasal interfaces provide a smaller footprint for active sleepers who breathe predominantly through their nose. Modern ball-and-socket joints and 360-degree rotating elbows eliminate hose pull during sleep position changes."
    ]
  },
  {
    slug: "portable-oxygen-concentrators-maintenance",
    title: "Portable & Stationary Oxygen Concentrators: Usage, Maintenance, and Travel Rules",
    excerpt: "Key guidelines for pulse-dose and continuous flow oxygen therapy using Inogen Rove 6 and Nidek Neo 5 concentrators for COPD and pulmonary fibrosis patients.",
    category: "Oxygen Care",
    author: "Dr. Aris Thorne, MD (Pulmonology)",
    date: "July 14, 2026",
    readTime: "7 min read",
    image: "/images/pulmocare/pulmocare_inogen-rove-6.png",
    content: [
      "Supplemental oxygen therapy improves survival, exercise tolerance, and organ function in patients with severe hypoxemia.",
      "Portable Oxygen Concentrators (POCs) like the Inogen Rove 6 utilize Pulse-Dose delivery technology to conserve oxygen, supplying precise boluses upon detecting patient inspiration.",
      "Routine maintenance includes weekly cleaning of particle intake filters, avoiding moisture exposure near sieve beds, and utilizing FAA-approved batteries during airline travel."
    ]
  },
  {
    slug: "sleep-diagnostics-polysomnography-innovations",
    title: "Innovations in Sleep Diagnostics: From Clinical Polysomnography to Home Polygraphy",
    excerpt: "Explore high-precision diagnostic sleep systems, esophageal catheter pressure monitoring, and portable screening devices like Samoa and Sonata.",
    category: "Diagnostics",
    author: "Dr. Claire Sterling, Sleep Medicine Specialist",
    date: "July 5, 2026",
    readTime: "6 min read",
    image: "/images/pulmocare/pulmocare_polygraphy-devices-samoa.png",
    content: [
      "Accurate diagnosis of sleep-disordered breathing requires objective measurement of respiratory effort, air flow, oxygen saturation, and neurophysiological arousal.",
      "Home Sleep Apnea Testing (HSAT) using compact polygraphy systems like Samoa allows comfortable diagnostic screening in the patient's natural home environment.",
      "In clinical sleep laboratories, multi-channel polysomnography (PSG) platforms like Sonata incorporate EEG, EOG, EMG, ECG, thoracic-abdominal effort bands, and esophageal catheter measurements for differential diagnosis of central vs obstructive apneas."
    ]
  },
  {
    slug: "clearing-airways-secretion-management",
    title: "Effective Airway Clearance: Modern Secretion Management and Mechanical Cough Assist",
    excerpt: "Understanding mechanical insufflation-exsufflation and airway clearance techniques for patients with impaired cough reflex and retained secretions.",
    category: "Ventilation",
    author: "Elena Rostova, Clinical Respiratory Therapist",
    date: "June 26, 2026",
    readTime: "5 min read",
    image: "/images/pulmocare/pulmocare_prisma-cr.png",
    content: [
      "Retained bronchial secretions increase airway resistance, compromise gas exchange, and heighten pulmonary infection risks in non-ambulatory and neuromuscular patients.",
      "Mechanical Insufflation-Exsufflation (MIE) devices simulate a natural cough by gradually inflating the lungs with positive pressure followed by a rapid shift to negative pressure.",
      "Integrating oscillation features during inspiration and expiration mobilizes mucus plugs from lower peripheral airways into the trachea for safe evacuation."
    ]
  }
];
