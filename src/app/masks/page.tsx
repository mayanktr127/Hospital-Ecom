"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";

export default function CategoryOverviewPage() {
  const products: any[] = [
  {
    "id": "cara-full-face",
    "title": "-C-A-R-A- -F-u-l-l- -F-a-c-e-",
    "slug": "cara-full-face",
    "categoryName": "Masks",
    "categorySlug": "masks",
    "url": "https://pulmocare.in/product/cara-full-face/",
    "image": "/images/pulmocare/pulmocare_cara-full-face.jpg",
    "tagline": "Lightweight full face mask with soft cushion and quiet exhalation system.",
    "introParagraph": "The CARA Full Face mask offers high therapy comfort, lightweight fit, and ultra-quiet exhalation for full face respiratory therapy.",
    "specs": {
      "Manufacturer": "Pulmo Care",
      "Type": "Full Face Mask",
      "Weight": "Under 90 grams",
      "Compliance": "CE / ISO 13485 Certified"
    },
    "accordion": [
      {
        "title": "Main Features & Benefits",
        "content": "Soft anatomical cushion, 360-degree ball-and-socket joint, and diffuse quiet exhalation valve."
      }
    ],
    "downloads": [
      {
        "title": "CARA Full Face Brochure (PDF)",
        "size": "1.8 MB",
        "url": "/downloads"
      }
    ]
  },
  {
    "id": "joyceone-full-face",
    "title": "-J-O-Y-C-E-o-n-e- -F-u-l-l- -F-a-c-e-",
    "slug": "joyceone-full-face",
    "categoryName": "Masks",
    "categorySlug": "masks",
    "url": "https://pulmocare.in/product/joyceone-full-face/",
    "image": "/images/pulmocare/pulmocare_joyceone-full-face.jpg",
    "tagline": "One size fits all full face mask with SilkTec coating.",
    "introParagraph": "JOYCEone Full Face features an auto-adjusting forehead cushion and SilkTec coating for effortless fitting.",
    "specs": {
      "Manufacturer": "Pulmo Care",
      "Type": "Full Face Mask",
      "Coating": "SilkTec Soft Finish",
      "Compliance": "CE / ISO 13485 Certified"
    },
    "accordion": [
      {
        "title": "Main Features & Benefits",
        "content": "One size fits nearly all patient facial contours effortlessly."
      }
    ],
    "downloads": [
      {
        "title": "JOYCEone Full Face Brochure (PDF)",
        "size": "2.1 MB",
        "url": "/downloads"
      }
    ]
  },
  {
    "id": "lena",
    "title": "-L-E-N-A- -F-u-l-l- -F-a-c-e-",
    "slug": "lena",
    "categoryName": "Masks",
    "categorySlug": "masks",
    "url": "https://pulmocare.in/product/lena/",
    "image": "/images/pulmocare/pulmocare_lena.jpg",
    "tagline": "Clinical hospital and home ventilation full face mask.",
    "introParagraph": "LENA was specially developed for clinical high-pressure ventilation and nocturnal homecare therapy.",
    "specs": {
      "Manufacturer": "Pulmo Care",
      "Type": "Full Face Ventilation Mask",
      "Pressure Range": "Up to 40 hPa",
      "Compliance": "CE / ISO 13485 Certified"
    },
    "accordion": [
      {
        "title": "Main Features & Benefits",
        "content": "Stable seal at high pressures with double cushion technology."
      }
    ],
    "downloads": [
      {
        "title": "LENA Product Brochure (PDF)",
        "size": "2.5 MB",
        "url": "/downloads"
      }
    ]
  },
  {
    "id": "cara-nasal",
    "title": "-C-A-R-A- -N-a-s-a-l-",
    "slug": "cara-nasal",
    "categoryName": "Masks",
    "categorySlug": "masks",
    "url": "https://pulmocare.in/product/cara-nasal/",
    "image": "/images/pulmocare/pulmocare_cara.jpg",
    "tagline": "Award-winning lightweight nasal mask.",
    "introParagraph": "CARA Nasal combines lightness, soft cushion materials, and quiet exhalation for sleep apnea therapy.",
    "specs": {
      "Manufacturer": "Pulmo Care",
      "Type": "Nasal Mask",
      "Weight": "59 grams",
      "Compliance": "CE / ISO 13485 Certified"
    },
    "accordion": [
      {
        "title": "Main Features & Benefits",
        "content": "Minimalist design with quiet diffuse exhalation system."
      }
    ],
    "downloads": [
      {
        "title": "CARA Nasal Brochure (PDF)",
        "size": "1.5 MB",
        "url": "/downloads"
      }
    ]
  }
];

  return (
    <div className="min-h-[100dvh] flex flex-col bg-white text-[#003865] font-inter">
      <Navbar />

      <main className="w-full mx-auto px-4 md:px-12 py-10 max-w-[1280px] flex-1">
        {/* Category Header */}
        <div className="mb-12 max-w-4xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#007AC1] block mb-2 font-inter">
            Pulmo Care Catalog
          </span>
          <h1 className="font-archivo font-extrabold text-4xl md:text-5xl text-[#003865] mb-3 tracking-tight">
            Masks
          </h1>
          <div className="w-12 h-1 bg-[#007AC1] mb-6 rounded-full" />
          <p className="text-sm md:text-base text-[#4A607A] leading-relaxed font-inter">
            High-performance medical hardware engineered for clinical hospital and homecare respiratory therapy. Certified to international CE and ISO 13485 quality standards.
          </p>
        </div>

        {/* Product Grid */}
        <section className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((item: any) => (
              <Link
                key={item.slug}
                href={`/masks/${item.slug}`}
                className="group bg-white border border-[#003865]/10 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-[#007AC1]/40 transition-all duration-300 flex flex-col items-center justify-between text-center"
              >
                <div className="w-full h-48 mb-6 flex items-center justify-center p-2">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-h-full max-w-full object-contain mix-blend-multiply drop-shadow-md group-hover:scale-108 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/products/mask.png";
                    }}
                  />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#007AC1] tracking-wider block mb-1">
                    German Engineering
                  </span>
                  <h3 className="font-archivo font-bold text-xl text-[#003865] group-hover:text-[#007AC1] transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#4A607A] leading-relaxed line-clamp-2 mb-4 font-inter">
                    {item.introParagraph}
                  </p>
                </div>
                <div className="w-full pt-3 border-t border-[#003865]/08 text-xs font-bold text-[#007AC1] group-hover:underline">
                  View Details &rarr;
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
