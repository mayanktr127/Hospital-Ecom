import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

image_map = {
    'prisma-20a': '/images/pulmocare/pulmocare_prisma-20a.png',
    'prisma-smart': '/images/pulmocare/pulmocare_prisma-smart.png',
    'prisma-smart-plus': '/images/pulmocare/pulmocare_prisma-smart-plus.png',
    'prisma-25-st': '/images/pulmocare/pulmocare_prisma-25-st.png',
    'prisma-25s': '/images/pulmocare/pulmocare_prisma-25s.png',
    'prisma-30-st': '/images/pulmocare/pulmocare_prisma-30-st.png',
    'prisma-cr': '/images/pulmocare/pulmocare_prisma-cr.png',
    'prisma-lab': '/images/pulmocare/pulmocare_prisma-lab.png',
    'prisma-aqua': '/images/pulmocare/pulmocare_prisma-aqua.png',
    'luisa-ventilator': '/images/pulmocare/pulmocare_luisa-ventilator.png',
    'prisma-vent-40': '/images/pulmocare/pulmocare_prisma-vent-40.png',
    'prisma-vent-50c': '/images/pulmocare/pulmocare_prisma-vent-50c.png',
    'inogen-rove-6': '/images/pulmocare/pulmocare_inogen-rove-6.png',
    'nidek-neo-5': '/images/pulmocare/pulmocare_nidek-neo-5.png',
    'polygraphy-devices-samoa': '/images/site/sleep_diagnostics_csm_samoa_sleep_diagnostics_device_frontal_dba1194f3b.png',
    'polygraphy-devices-scala': '/images/site/sleep_diag_scala_csm_The_polygraphy_devices_Samoa_and_Scala_76fa602c10.png',
    'polysomnography-devices-sonata': '/images/pulmocare/pulmocare_polysomnography-devices-sonata.png',
    'cara-full-face': '/images/site/masks_cara_full_face_csm_cara_mask_patient_interface_fullface_right_3bfbc3e771.png',
    'joyceone-full-face': '/images/site/masks_joyceone_full_face_csm_joyceone_mask_patient_interface_fullface_vented_right_9753e5619b.png',
    'lena': '/images/pulmocare/pulmo_l-wenstein-lena.png',
    'cara-nasal': '/images/site/masks_cara_csm_cara_mask_patient_interface_nasal_right_eb6a30efad.png'
}

with open('src/data/pulmocare_products.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

cnt = 0
for cat_key, cat in data.items():
    if 'products' in cat and isinstance(cat['products'], list):
        for p in cat['products']:
            slug = p.get('slug')
            if slug in image_map:
                p['image'] = image_map[slug]
                cnt += 1
                print(f"Updated {slug} image -> {image_map[slug]}")

with open('src/data/pulmocare_products.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"\nSuccessfully updated image paths for {cnt} products!")
