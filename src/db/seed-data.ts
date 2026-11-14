// Sample catalog used by `npm run db:seed`.
// Photos: Unsplash (unbranded shots only). Gallery detail shots are focal-point
// crops of the main photo. Check that any new photo or crop shows no third-party logos.

import { unsplash } from "../lib/images";

type Focal = { x: number; y: number; zoom: number };
type Shot = { photo: string; alt: string; focal?: Focal };

export type SeedCategory = { slug: string; name: string };

export type SeedProduct = {
  slug: string;
  name: string;
  category: string; // category slug
  priceCents: number;
  color: string;
  badge?: string;
  description: string;
  details: string[];
  /** First shot is the listing image. */
  shots: Shot[];
  /** Quantity per size, in display order. A single `null` key means one size. */
  stock: [size: string | null, quantity: number][];
};

export const seedCategories: SeedCategory[] = [
  { slug: "bags", name: "Bags" },
  { slug: "ready-to-wear", name: "Ready-to-wear" },
  { slug: "shoes", name: "Shoes" },
  { slug: "eyewear", name: "Eyewear" },
  { slug: "watches", name: "Watches" },
  { slug: "jewelry", name: "Jewelry" },
];

export const buildImages = (shots: Shot[]) =>
  shots.map(({ photo, alt, focal }) => ({ src: unsplash(photo, { focal }), alt }));

const oneSize = (quantity: number): SeedProduct["stock"] => [[null, quantity]];

// Quantities per size keep the totals and sold-out sizes the storefront showed
// before the move to the database.
export const seedProducts: SeedProduct[] = [
  {
    slug: "atelier-top-handle-bag",
    name: "Atelier top-handle bag",
    category: "bags",
    priceCents: 248000,
    color: "Scarlet",
    badge: "New",
    stock: oneSize(2),
    description:
      "A structured top-handle bag in polished calfskin, closed with a sculpted metal turn-lock. Sized to carry the day without losing its shape.",
    details: [
      "Polished calfskin",
      "Silver-tone turn-lock closure",
      "Detachable shoulder strap",
      "W 26 × H 20 × D 11 cm",
    ],
    shots: [
      { photo: "1584917865442-de89df76afd3", alt: "Red leather top-handle bag on a plinth" },
      { photo: "1584917865442-de89df76afd3", alt: "Close-up of the rolled leather top handle", focal: { x: 0.5, y: 0.2, zoom: 2 } },
    ],
  },
  {
    slug: "riviera-woven-bag",
    name: "Riviera woven bag",
    category: "bags",
    priceCents: 189000,
    color: "Tan",
    badge: "New",
    stock: oneSize(14),
    description:
      "Hand-woven rattan meets a smooth leather flap and handle. Light enough for summer, finished well enough for evening.",
    details: ["Hand-woven rattan body", "Smooth leather flap and handle", "Cotton-lined interior", "W 30 × H 24 × D 14 cm"],
    shots: [
      { photo: "1590874103328-eac38a683ce7", alt: "Tan woven basket bag with leather flap" },
      { photo: "1590874103328-eac38a683ce7", alt: "Close-up of the woven rattan texture", focal: { x: 0.5, y: 0.85, zoom: 2.2 } },
    ],
  },
  {
    slug: "biker-leather-jacket",
    name: "Biker leather jacket",
    category: "ready-to-wear",
    priceCents: 420000,
    color: "Black",
    stock: [["XS", 2], ["S", 2], ["M", 0], ["L", 1], ["XL", 1]], // total 6
    description:
      "A classic biker cut in full-grain lambskin with asymmetric zip and notched lapels. It softens and moulds to the wearer over time.",
    details: ["Full-grain lambskin", "Asymmetric front zip", "Cupro lining", "Regular fit, true to size"],
    shots: [
      { photo: "1551028719-00167b16eac5", alt: "Black leather biker jacket with zip pockets", focal: { x: 0.3, y: 0.75, zoom: 2.2 } },
      { photo: "1520975954732-35dd22299614", alt: "Man wearing a black leather biker jacket" },
    ],
  },
  {
    slug: "satin-bomber-jacket",
    name: "Satin bomber jacket",
    category: "ready-to-wear",
    priceCents: 165000,
    color: "Terracotta",
    stock: [["XS", 2], ["S", 2], ["M", 2], ["L", 2], ["XL", 1]], // total 9
    description:
      "A lightweight bomber in fluid satin with ribbed trims and a utility sleeve pocket. Relaxed through the body.",
    details: ["Recycled polyester satin", "Rib-knit collar, cuffs and hem", "Zip sleeve pocket", "Relaxed fit"],
    shots: [
      { photo: "1591047139829-d91aecb6caea", alt: "Terracotta satin bomber jacket on a hanger" },
      { photo: "1591047139829-d91aecb6caea", alt: "Close-up of the zip front and ribbed hem", focal: { x: 0.6, y: 0.65, zoom: 2.2 } },
    ],
  },
  {
    slug: "floral-print-pump",
    name: "Floral print pump",
    category: "shoes",
    priceCents: 95000,
    color: "Blue floral",
    badge: "New",
    // total 3 (shown as "Only 3 left"); 36 and 41 sold out
    stock: [["36", 0], ["37", 1], ["38", 1], ["39", 1], ["40", 0], ["41", 0]],
    description:
      "A pointed stiletto pump wrapped in a painterly floral print satin. A 100 mm heel set on a leather sole.",
    details: ["Printed silk satin upper", "Leather sole and lining", "Heel height 100 mm", "Made in Italy"],
    shots: [
      { photo: "1543163521-1bf539c55dd2", alt: "Blue floral print stiletto pump", focal: { x: 0.4, y: 0.78, zoom: 2 } },
    ],
  },
  {
    slug: "fringed-knit-poncho",
    name: "Fringed knit poncho",
    category: "ready-to-wear",
    priceCents: 128000,
    color: "Ivory",
    stock: [["XS", 0], ["S", 0], ["M", 0], ["L", 0], ["XL", 0]],
    description:
      "An open crochet poncho in soft cotton with a long hand-knotted fringe. Layers over knits or a simple slip dress.",
    details: ["100% organic cotton", "Hand-knotted fringe", "Hand wash cold", "One relaxed size range"],
    shots: [
      { photo: "1434389677669-e08b4cac3105", alt: "Cream crochet poncho with fringe on a hanger" },
      { photo: "1434389677669-e08b4cac3105", alt: "Close-up of the crochet stitch and fringe", focal: { x: 0.5, y: 0.75, zoom: 2.2 } },
    ],
  },
  {
    slug: "pleated-jogger-trouser",
    name: "Pleated jogger trouser",
    category: "ready-to-wear",
    priceCents: 89000,
    color: "Dusty pink",
    stock: [["XS", 3], ["S", 3], ["M", 3], ["L", 2], ["XL", 0]], // total 11
    description:
      "Tailoring ease in a fluid crepe: front pleats, slant pockets and elasticated cuffs that sit just above the ankle.",
    details: ["Triacetate crepe", "Front pleats, slant pockets", "Elasticated cuffs", "Tapered fit"],
    shots: [
      { photo: "1594633312681-425c7b97ccd1", alt: "Dusty pink tapered trousers" },
      { photo: "1594633312681-425c7b97ccd1", alt: "Close-up of the waist and pleats", focal: { x: 0.5, y: 0.3, zoom: 2.2 } },
    ],
  },
  {
    slug: "round-metal-sunglasses",
    name: "Round metal sunglasses",
    category: "eyewear",
    priceCents: 52000,
    color: "Gold / green",
    stock: oneSize(20),
    description:
      "Fine round frames in gold-tone metal with mineral-glass green lenses and adjustable nose pads.",
    details: ["Gold-tone metal frame", "Mineral glass lenses, 100% UV protection", "Adjustable nose pads", "Case included"],
    shots: [
      { photo: "1511499767150-a48a237f0083", alt: "Round gold-frame sunglasses on marble" },
      { photo: "1511499767150-a48a237f0083", alt: "Close-up of the lens and bridge", focal: { x: 0.42, y: 0.55, zoom: 2.4 } },
    ],
  },
  {
    slug: "classic-leather-watch",
    name: "Classic leather-strap watch",
    category: "watches",
    priceCents: 145000,
    color: "Rose gold / taupe",
    stock: oneSize(5),
    description:
      "A clean 38 mm dial with slim baton hands, a rose gold-tone case and a soft taupe calfskin strap.",
    details: ["38 mm stainless steel case", "Swiss quartz movement", "Calfskin strap", "Water resistant to 30 m"],
    shots: [
      { photo: "1524592094714-0f0654e20314", alt: "Rose gold watch with a taupe leather strap" },
      { photo: "1524592094714-0f0654e20314", alt: "Close-up of the watch dial", focal: { x: 0.48, y: 0.5, zoom: 2.2 } },
    ],
  },
  {
    slug: "sapphire-drop-earrings",
    name: "Sapphire drop earrings",
    category: "jewelry",
    priceCents: 310000,
    color: "Silver / blue",
    stock: oneSize(1),
    description:
      "Statement drops with a pear-cut blue stone framed by baguette crystals, set in polished sterling silver.",
    details: ["Sterling silver", "Pear-cut synthetic sapphire", "Baguette crystal surround", "Post back, 5.5 cm drop"],
    shots: [
      { photo: "1535632066927-ab7c9ab60908", alt: "Crystal and sapphire drop earrings on a leaf" },
      { photo: "1535632066927-ab7c9ab60908", alt: "Close-up of the pear-cut stone", focal: { x: 0.55, y: 0.6, zoom: 2.2 } },
    ],
  },
  {
    slug: "crescent-pendant-necklace",
    name: "Crescent pendant necklace",
    category: "jewelry",
    priceCents: 98000,
    color: "Gold",
    stock: oneSize(8),
    description:
      "Two layered gold-tone chains: one with a faceted blue pendant, one finished with a studded crescent.",
    details: ["Gold-plated brass", "Faceted glass pendant", "Adjustable 42–48 cm", "Lobster clasp"],
    shots: [
      { photo: "1599643478518-a784e5dc4c8f", alt: "Layered gold necklaces with crescent pendant" },
      { photo: "1599643478518-a784e5dc4c8f", alt: "Close-up of the crescent pendant", focal: { x: 0.5, y: 0.8, zoom: 2.2 } },
    ],
  },
  {
    slug: "minimal-white-watch",
    name: "Minimal white watch",
    category: "watches",
    priceCents: 72000,
    color: "White",
    stock: oneSize(0),
    description:
      "A smooth round case on a soft silicone strap, designed to disappear on the wrist.",
    details: ["Aluminium case", "Silicone strap", "Magnetic charging", "Water resistant to 50 m"],
    shots: [
      { photo: "1523275335684-37898b6baf30", alt: "White smartwatch with silicone strap" },
      { photo: "1523275335684-37898b6baf30", alt: "Close-up of the watch face", focal: { x: 0.45, y: 0.45, zoom: 2.2 } },
    ],
  },
];
