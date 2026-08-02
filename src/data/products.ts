import { Product } from "@/types/product";

export interface CategoryItem {
  id: string;
  name: string;
  count: string;
  image: string;
  bg: string;
}

export const CATEGORIES: CategoryItem[] = [
  {
    id: "cat-1",
    name: "Ventilation & Sleep Therapy",
    count: "14 Devices",
    image: "/images/site/home_csm_luisa_home_ventilation_bedside_horizontal_wide_angle_81fcaaeec1.png",
    bg: "#f6f4fb",
  },
  {
    id: "cat-2",
    name: "Sleep Diagnostics",
    count: "4 Systems",
    image: "/images/site/anesthesia_csm_leolytics_anaesthesia_software_surgery_leon_plus_56a81bb987.png",
    bg: "#f6f4fb",
  },
  {
    id: "cat-3",
    name: "Masks & Patient Interfaces",
    count: "12 Models",
    image: "/images/site/masks_lena_csm_lena_mask_patient_interface_fullface_right_65ae40c267.png",
    bg: "#f6f4fb",
  },
];

export const PRODUCTS: Product[] = [
  {
    "id": "l-wenstein-prisma-20a",
    "name": "Prisma 20A",
    "category": "Ventilation & Sleep",
    "price": 850.0,
    "originalPrice": 1062.5,
    "image": "/images/pulmocare/pulmo_l-wenstein-prisma-20a.png",
    "rating": 4.9,
    "reviewsCount": 24,
    "inStock": true,
    "isFeatured": true,
    "description": "Official Löwenstein Prisma 20A from Pulmo Care. High-performance hospital & home healthcare medical equipment with German engineering precision.",
    "specifications": [
      {
        "label": "Brand",
        "value": "Pulmo Care"
      },
      {
        "label": "Origin",
        "value": "German Clinical Standard"
      },
      {
        "label": "Certification",
        "value": "CE / ISO 13485 Certified"
      },
      {
        "label": "Warranty",
        "value": "2 Years Official Warranty"
      }
    ],
    "badge": "Top Seller"
  },
  {
    "id": "l-wenstein-prisma-smart",
    "name": "Prisma Smart",
    "category": "Ventilation & Sleep",
    "price": 750.0,
    "originalPrice": 937.5,
    "image": "/images/pulmocare/pulmo_l-wenstein-prisma-smart.png",
    "rating": 4.9,
    "reviewsCount": 24,
    "inStock": true,
    "isFeatured": true,
    "description": "Official Löwenstein Prisma Smart from Pulmo Care. High-performance hospital & home healthcare medical equipment with German engineering precision.",
    "specifications": [
      {
        "label": "Brand",
        "value": "Pulmo Care"
      },
      {
        "label": "Origin",
        "value": "German Clinical Standard"
      },
      {
        "label": "Certification",
        "value": "CE / ISO 13485 Certified"
      },
      {
        "label": "Warranty",
        "value": "2 Years Official Warranty"
      }
    ],
    "badge": "Featured"
  },
  {
    "id": "l-wenstein-prisma-smart-plus",
    "name": "Prisma Smart Plus",
    "category": "Ventilation & Sleep",
    "price": 750.0,
    "originalPrice": 937.5,
    "image": "/images/pulmocare/pulmo_l-wenstein-prisma-smart-plus.png",
    "rating": 4.9,
    "reviewsCount": 24,
    "inStock": true,
    "isFeatured": true,
    "description": "Official Löwenstein Prisma Smart Plus from Pulmo Care. High-performance hospital & home healthcare medical equipment with German engineering precision.",
    "specifications": [
      {
        "label": "Brand",
        "value": "Pulmo Care"
      },
      {
        "label": "Origin",
        "value": "German Clinical Standard"
      },
      {
        "label": "Certification",
        "value": "CE / ISO 13485 Certified"
      },
      {
        "label": "Warranty",
        "value": "2 Years Official Warranty"
      }
    ],
    "badge": "Pulmo Care Certified"
  },
  {
    "id": "l-wenstein-prisma-cr",
    "name": "Prisma CR",
    "category": "Ventilation & Sleep",
    "price": 1250.0,
    "originalPrice": 1562.5,
    "image": "/images/pulmocare/pulmo_l-wenstein-prisma-cr.png",
    "rating": 4.9,
    "reviewsCount": 24,
    "inStock": true,
    "isFeatured": true,
    "description": "Official Löwenstein Prisma CR from Pulmo Care. High-performance hospital & home healthcare medical equipment with German engineering precision.",
    "specifications": [
      {
        "label": "Brand",
        "value": "Pulmo Care"
      },
      {
        "label": "Origin",
        "value": "German Clinical Standard"
      },
      {
        "label": "Certification",
        "value": "CE / ISO 13485 Certified"
      },
      {
        "label": "Warranty",
        "value": "2 Years Official Warranty"
      }
    ],
    "badge": "Top Seller"
  },
  {
    "id": "l-wenstein-prisma-lab",
    "name": "Prisma LAB",
    "category": "Ventilation & Sleep",
    "price": 1450.0,
    "originalPrice": 1812.5,
    "image": "/images/pulmocare/pulmo_l-wenstein-prisma-lab.png",
    "rating": 4.9,
    "reviewsCount": 24,
    "inStock": true,
    "isFeatured": true,
    "description": "Official Löwenstein Prisma LAB from Pulmo Care. High-performance hospital & home healthcare medical equipment with German engineering precision.",
    "specifications": [
      {
        "label": "Brand",
        "value": "Pulmo Care"
      },
      {
        "label": "Origin",
        "value": "German Clinical Standard"
      },
      {
        "label": "Certification",
        "value": "CE / ISO 13485 Certified"
      },
      {
        "label": "Warranty",
        "value": "2 Years Official Warranty"
      }
    ],
    "badge": "Pulmo Care Certified"
  },
  {
    "id": "l-wenstein-prisma-aqua",
    "name": "Prisma AQUA",
    "category": "Ventilation & Sleep",
    "price": 220.0,
    "originalPrice": 275.0,
    "image": "/images/pulmocare/pulmo_l-wenstein-prisma-aqua.png",
    "rating": 4.9,
    "reviewsCount": 24,
    "inStock": true,
    "isFeatured": true,
    "description": "Official Löwenstein Prisma AQUA from Pulmo Care. High-performance hospital & home healthcare medical equipment with German engineering precision.",
    "specifications": [
      {
        "label": "Brand",
        "value": "Pulmo Care"
      },
      {
        "label": "Origin",
        "value": "German Clinical Standard"
      },
      {
        "label": "Certification",
        "value": "CE / ISO 13485 Certified"
      },
      {
        "label": "Warranty",
        "value": "2 Years Official Warranty"
      }
    ],
    "badge": "Featured"
  },
  {
    "id": "l-wenstein-luisa-ventilator",
    "name": "Luisa -–- Ventilator",
    "category": "Ventilation & Sleep",
    "price": 3400.0,
    "originalPrice": 4250.0,
    "image": "/images/pulmocare/pulmo_l-wenstein-luisa-ventilator.png",
    "rating": 4.9,
    "reviewsCount": 24,
    "inStock": true,
    "isFeatured": true,
    "description": "Official Löwenstein Luisa – Ventilator from Pulmo Care. High-performance hospital & home healthcare medical equipment with German engineering precision.",
    "specifications": [
      {
        "label": "Brand",
        "value": "Pulmo Care"
      },
      {
        "label": "Origin",
        "value": "German Clinical Standard"
      },
      {
        "label": "Certification",
        "value": "CE / ISO 13485 Certified"
      },
      {
        "label": "Warranty",
        "value": "2 Years Official Warranty"
      }
    ],
    "badge": "Top Seller"
  },
  {
    "id": "l-wenstein-prisma-vent-40",
    "name": "Prisma Vent 40",
    "category": "Ventilation & Sleep",
    "price": 2800.0,
    "originalPrice": 3500.0,
    "image": "/images/pulmocare/pulmo_l-wenstein-prisma-vent-40.png",
    "rating": 4.9,
    "reviewsCount": 24,
    "inStock": true,
    "isFeatured": true,
    "description": "Official Löwenstein Prisma Vent 40 from Pulmo Care. High-performance hospital & home healthcare medical equipment with German engineering precision.",
    "specifications": [
      {
        "label": "Brand",
        "value": "Pulmo Care"
      },
      {
        "label": "Origin",
        "value": "German Clinical Standard"
      },
      {
        "label": "Certification",
        "value": "CE / ISO 13485 Certified"
      },
      {
        "label": "Warranty",
        "value": "2 Years Official Warranty"
      }
    ],
    "badge": "Featured"
  },
  {
    "id": "l-wenstein-prisma-vent-50c",
    "name": "Prisma Vent 50C",
    "category": "Ventilation & Sleep",
    "price": 3100.0,
    "originalPrice": 3875.0,
    "image": "/images/pulmocare/pulmo_l-wenstein-prisma-vent-50c.png",
    "rating": 4.9,
    "reviewsCount": 24,
    "inStock": true,
    "isFeatured": true,
    "description": "Official Löwenstein Prisma Vent 50C from Pulmo Care. High-performance hospital & home healthcare medical equipment with German engineering precision.",
    "specifications": [
      {
        "label": "Brand",
        "value": "Pulmo Care"
      },
      {
        "label": "Origin",
        "value": "German Clinical Standard"
      },
      {
        "label": "Certification",
        "value": "CE / ISO 13485 Certified"
      },
      {
        "label": "Warranty",
        "value": "2 Years Official Warranty"
      }
    ],
    "badge": "Pulmo Care Certified"
  },
  {
    "id": "inogen-rove-6",
    "name": "Inogen Rove 6",
    "category": "Ventilation & Sleep",
    "price": 1950.0,
    "originalPrice": 2437.5,
    "image": "/images/pulmocare/pulmo_inogen-rove-6.png",
    "rating": 4.9,
    "reviewsCount": 24,
    "inStock": true,
    "isFeatured": true,
    "description": "Official Inogen Rove 6 from Pulmo Care. High-performance hospital & home healthcare medical equipment with German engineering precision.",
    "specifications": [
      {
        "label": "Brand",
        "value": "Pulmo Care"
      },
      {
        "label": "Origin",
        "value": "German Clinical Standard"
      },
      {
        "label": "Certification",
        "value": "CE / ISO 13485 Certified"
      },
      {
        "label": "Warranty",
        "value": "2 Years Official Warranty"
      }
    ],
    "badge": "Top Seller"
  },
  {
    "id": "nidek-neo-5",
    "name": "Nidek Neo 5",
    "category": "Ventilation & Sleep",
    "price": 980.0,
    "originalPrice": 1225.0,
    "image": "/images/pulmocare/pulmo_nidek-neo-5.png",
    "rating": 4.9,
    "reviewsCount": 24,
    "inStock": true,
    "isFeatured": true,
    "description": "Official Nidek Neo 5 from Pulmo Care. High-performance hospital & home healthcare medical equipment with German engineering precision.",
    "specifications": [
      {
        "label": "Brand",
        "value": "Pulmo Care"
      },
      {
        "label": "Origin",
        "value": "German Clinical Standard"
      },
      {
        "label": "Certification",
        "value": "CE / ISO 13485 Certified"
      },
      {
        "label": "Warranty",
        "value": "2 Years Official Warranty"
      }
    ],
    "badge": "Pulmo Care Certified"
  },
  {
    "id": "l-wenstein-polygraphy-devices-samoa",
    "name": "Polygraphy Devices -–- Samoa",
    "category": "Diagnostic",
    "price": 1150.0,
    "originalPrice": 1437.5,
    "image": "/images/pulmocare/pulmo_l-wenstein-polygraphy-devices-samoa.png",
    "rating": 4.9,
    "reviewsCount": 24,
    "inStock": true,
    "isFeatured": true,
    "description": "Official Löwenstein Polygraphy Devices – Samoa from Pulmo Care. High-performance hospital & home healthcare medical equipment with German engineering precision.",
    "specifications": [
      {
        "label": "Brand",
        "value": "Pulmo Care"
      },
      {
        "label": "Origin",
        "value": "German Clinical Standard"
      },
      {
        "label": "Certification",
        "value": "CE / ISO 13485 Certified"
      },
      {
        "label": "Warranty",
        "value": "2 Years Official Warranty"
      }
    ],
    "badge": "Featured"
  },
  {
    "id": "l-wenstein-polygraphy-devices-scala",
    "name": "Polygraphy Devices -–- Scala",
    "category": "Diagnostic",
    "price": 1650.0,
    "originalPrice": 2062.5,
    "image": "/images/pulmocare/pulmo_l-wenstein-polygraphy-devices-scala.png",
    "rating": 4.9,
    "reviewsCount": 24,
    "inStock": true,
    "isFeatured": true,
    "description": "Official Löwenstein Polygraphy Devices – Scala from Pulmo Care. High-performance hospital & home healthcare medical equipment with German engineering precision.",
    "specifications": [
      {
        "label": "Brand",
        "value": "Pulmo Care"
      },
      {
        "label": "Origin",
        "value": "German Clinical Standard"
      },
      {
        "label": "Certification",
        "value": "CE / ISO 13485 Certified"
      },
      {
        "label": "Warranty",
        "value": "2 Years Official Warranty"
      }
    ],
    "badge": "Top Seller"
  },
  {
    "id": "l-wenstein-polysomnography-devices-sonata",
    "name": "Polysomnography Devices -–- Sonata",
    "category": "Diagnostic",
    "price": 2400.0,
    "originalPrice": 3000.0,
    "image": "/images/pulmocare/pulmo_l-wenstein-polysomnography-devices-sonata.png",
    "rating": 4.9,
    "reviewsCount": 24,
    "inStock": true,
    "isFeatured": true,
    "description": "Official Löwenstein Polysomnography Devices – Sonata from Pulmo Care. High-performance hospital & home healthcare medical equipment with German engineering precision.",
    "specifications": [
      {
        "label": "Brand",
        "value": "Pulmo Care"
      },
      {
        "label": "Origin",
        "value": "German Clinical Standard"
      },
      {
        "label": "Certification",
        "value": "CE / ISO 13485 Certified"
      },
      {
        "label": "Warranty",
        "value": "2 Years Official Warranty"
      }
    ],
    "badge": "Featured"
  },
  {
    "id": "l-wenstein-cara-full-face",
    "name": "CARA Full Face",
    "category": "PPE & Protection",
    "price": 180.0,
    "originalPrice": 225.0,
    "image": "/images/pulmocare/pulmo_l-wenstein-cara-full-face.png",
    "rating": 4.9,
    "reviewsCount": 24,
    "inStock": true,
    "isFeatured": true,
    "description": "Official Löwenstein CARA Full Face from Pulmo Care. High-performance hospital & home healthcare medical equipment with German engineering precision.",
    "specifications": [
      {
        "label": "Brand",
        "value": "Pulmo Care"
      },
      {
        "label": "Origin",
        "value": "German Clinical Standard"
      },
      {
        "label": "Certification",
        "value": "CE / ISO 13485 Certified"
      },
      {
        "label": "Warranty",
        "value": "2 Years Official Warranty"
      }
    ],
    "badge": "Pulmo Care Certified"
  },
  {
    "id": "l-wenstein-joyceone-full-face",
    "name": "JOYCEone Full Face",
    "category": "PPE & Protection",
    "price": 195.0,
    "originalPrice": 243.75,
    "image": "/images/pulmocare/pulmo_l-wenstein-joyceone-full-face.png",
    "rating": 4.9,
    "reviewsCount": 24,
    "inStock": true,
    "isFeatured": true,
    "description": "Official Löwenstein JOYCEone Full Face from Pulmo Care. High-performance hospital & home healthcare medical equipment with German engineering precision.",
    "specifications": [
      {
        "label": "Brand",
        "value": "Pulmo Care"
      },
      {
        "label": "Origin",
        "value": "German Clinical Standard"
      },
      {
        "label": "Certification",
        "value": "CE / ISO 13485 Certified"
      },
      {
        "label": "Warranty",
        "value": "2 Years Official Warranty"
      }
    ],
    "badge": "Top Seller"
  },
  {
    "id": "l-wenstein-lena",
    "name": "LENA",
    "category": "PPE & Protection",
    "price": 210.0,
    "originalPrice": 262.5,
    "image": "/images/pulmocare/pulmo_l-wenstein-lena.png",
    "rating": 4.9,
    "reviewsCount": 24,
    "inStock": true,
    "isFeatured": true,
    "description": "Official Löwenstein LENA from Pulmo Care. High-performance hospital & home healthcare medical equipment with German engineering precision.",
    "specifications": [
      {
        "label": "Brand",
        "value": "Pulmo Care"
      },
      {
        "label": "Origin",
        "value": "German Clinical Standard"
      },
      {
        "label": "Certification",
        "value": "CE / ISO 13485 Certified"
      },
      {
        "label": "Warranty",
        "value": "2 Years Official Warranty"
      }
    ],
    "badge": "Pulmo Care Certified"
  },
  {
    "id": "l-wenstein-cara",
    "name": "CARA",
    "category": "PPE & Protection",
    "price": 145.0,
    "originalPrice": 181.25,
    "image": "/images/pulmocare/pulmo_l-wenstein-cara.png",
    "rating": 4.9,
    "reviewsCount": 24,
    "inStock": true,
    "isFeatured": true,
    "description": "Official Löwenstein CARA from Pulmo Care. High-performance hospital & home healthcare medical equipment with German engineering precision.",
    "specifications": [
      {
        "label": "Brand",
        "value": "Pulmo Care"
      },
      {
        "label": "Origin",
        "value": "German Clinical Standard"
      },
      {
        "label": "Certification",
        "value": "CE / ISO 13485 Certified"
      },
      {
        "label": "Warranty",
        "value": "2 Years Official Warranty"
      }
    ],
    "badge": "Featured"
  },
  {
    "id": "l-wenstein-joyceone",
    "name": "JOYCEone",
    "category": "PPE & Protection",
    "price": 160.0,
    "originalPrice": 200.0,
    "image": "/images/pulmocare/pulmo_l-wenstein-joyceone.png",
    "rating": 4.9,
    "reviewsCount": 24,
    "inStock": true,
    "isFeatured": true,
    "description": "Official Löwenstein JOYCEone from Pulmo Care. High-performance hospital & home healthcare medical equipment with German engineering precision.",
    "specifications": [
      {
        "label": "Brand",
        "value": "Pulmo Care"
      },
      {
        "label": "Origin",
        "value": "German Clinical Standard"
      },
      {
        "label": "Certification",
        "value": "CE / ISO 13485 Certified"
      },
      {
        "label": "Warranty",
        "value": "2 Years Official Warranty"
      }
    ],
    "badge": "Top Seller"
  },
  {
    "id": "pulmo-prisma-25s",
    "name": "Prisma 25S BiLevel Device",
    "category": "Ventilation & Sleep",
    "price": 1650.0,
    "originalPrice": 2062.5,
    "image": "/images/site/sleep_prisma25s_csm_prisma25S_Bilevel_S_ST_device_left_586616a621.jpg",
    "rating": 4.9,
    "reviewsCount": 18,
    "inStock": true,
    "isFeatured": true,
    "description": "High-performance BiLevel therapy device for sleep apnea patients with high pressure requirements.",
    "specifications": [
      {
        "label": "Brand",
        "value": "Pulmo Care"
      },
      {
        "label": "Origin",
        "value": "German Clinical Standard"
      },
      {
        "label": "Certification",
        "value": "CE / ISO 13485 Certified"
      },
      {
        "label": "Warranty",
        "value": "2 Years Official Warranty"
      }
    ],
    "badge": "Featured"
  },
  {
    "id": "pulmo-prisma-25st",
    "name": "Prisma 25ST BiLevel Device",
    "category": "Ventilation & Sleep",
    "price": 1650.0,
    "originalPrice": 2062.5,
    "image": "/images/site/sleep_prisma25s_csm_prisma25S_Bilevel_S_ST_device_left_586616a621.jpg",
    "rating": 4.9,
    "reviewsCount": 22,
    "inStock": true,
    "isFeatured": true,
    "description": "BiLevel-ST device with target volume and automatic backup frequency for maximum respiratory support.",
    "specifications": [
      {
        "label": "Brand",
        "value": "Pulmo Care"
      },
      {
        "label": "Origin",
        "value": "German Clinical Standard"
      },
      {
        "label": "Certification",
        "value": "CE / ISO 13485 Certified"
      },
      {
        "label": "Warranty",
        "value": "2 Years Official Warranty"
      }
    ],
    "badge": "Pulmo Care Certified"
  },
  {
    "id": "pulmo-elisa-800",
    "name": "elisa 800 ICU Ventilator",
    "category": "Ventilation & Sleep",
    "price": 4800.0,
    "originalPrice": 6000.0,
    "image": "/images/site/intensive_care_csm_elisa_800_intensive_care_ventilators_device_frontal_f3c59a79e7.png",
    "rating": 5.0,
    "reviewsCount": 42,
    "inStock": true,
    "isFeatured": true,
    "description": "Premium intensive care ventilator platform with advanced lung monitoring and universal ventilation modes.",
    "specifications": [
      {
        "label": "Brand",
        "value": "Pulmo Care"
      },
      {
        "label": "Origin",
        "value": "German Clinical Standard"
      },
      {
        "label": "Certification",
        "value": "CE / ISO 13485 Certified"
      },
      {
        "label": "Warranty",
        "value": "2 Years Official Warranty"
      }
    ],
    "badge": "Top Seller"
  },
  {
    "id": "pulmo-leon-plus",
    "name": "LEON Plus Anesthesia Workstation",
    "category": "Surgical",
    "price": 6200.0,
    "originalPrice": 7750.0,
    "image": "/images/site/anesthesia_csm_leon_plus_anaesthesia_device_frontal_loops_c23d5c46f1.png",
    "rating": 4.9,
    "reviewsCount": 16,
    "inStock": true,
    "isFeatured": true,
    "description": "Advanced anesthesia workstation featuring precise gas mixing, rebreathing system, and integrated monitoring.",
    "specifications": [
      {
        "label": "Brand",
        "value": "Pulmo Care"
      },
      {
        "label": "Origin",
        "value": "German Clinical Standard"
      },
      {
        "label": "Certification",
        "value": "CE / ISO 13485 Certified"
      },
      {
        "label": "Warranty",
        "value": "2 Years Official Warranty"
      }
    ],
    "badge": "Pulmo Care Certified"
  }
];