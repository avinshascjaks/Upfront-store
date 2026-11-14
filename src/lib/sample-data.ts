// Static homepage and navigation content. Products live in ./catalog.
// Photos: Unsplash (unbranded shots only).

import { unsplash, type Image } from "./images";

export type Collection = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  image: Image;
};

export type Category = { slug: string; title: string; image: Image };

export const hero = {
  eyebrow: "Autumn–Winter 2026",
  title: "Quiet Weight",
  description:
    "Structured outerwear, considered leather and the pieces that carry a season.",
  cta: { label: "Discover the collection", href: "/collections/autumn-winter" },
  secondaryCta: { label: "Shop women", href: "/collections/women" },
  images: [
    {
      src: unsplash("1539109136881-3be0616acf4b"),
      alt: "Woman in a pale blue wool coat standing in a cathedral square",
    },
    {
      src: unsplash("1483985988355-763728e1935b"),
      alt: "Woman in a burgundy coat and sunglasses carrying shopping bags",
    },
  ] satisfies Image[],
};

export const categories: Category[] = [
  {
    slug: "women",
    title: "Women",
    image: { src: unsplash("1509631179647-0177331693ae"), alt: "Woman in striped wide-leg trousers against a teal wall" },
  },
  {
    slug: "men",
    title: "Men",
    image: { src: unsplash("1617137968427-85924c800a22"), alt: "Man in a navy suit walking past glass windows" },
  },
  {
    slug: "bags",
    title: "Bags",
    image: { src: unsplash("1584917865442-de89df76afd3"), alt: "Red leather top-handle bag on a plinth" },
  },
  {
    slug: "jewelry",
    title: "Jewelry",
    image: { src: unsplash("1599643478518-a784e5dc4c8f"), alt: "Gold pendant necklaces with a crescent charm" },
  },
];

export const featuredCollections: Collection[] = [
  {
    slug: "outerwear",
    eyebrow: "The coat edit",
    title: "Outerwear",
    description: "Double-faced wool, tartan and tailored lines for the cold months.",
    image: { src: unsplash("1485968579580-b6d095142e6e"), alt: "Woman in a tartan wool coat holding a bag" },
  },
  {
    slug: "tailoring",
    eyebrow: "Menswear",
    title: "Tailoring",
    description: "Sharp shoulders, fine wool and a fit made to be lived in.",
    image: { src: unsplash("1507679799987-c73779587ccf"), alt: "Man buttoning a navy suit jacket" },
  },
];

export const editorial = {
  eyebrow: "The leather story",
  title: "Made to soften with time",
  description:
    "Each jacket is cut from full-grain hide and finished by hand, so it wears in rather than wears out.",
  cta: { label: "Shop leather", href: "/collections/leather" },
  image: { src: unsplash("1520975954732-35dd22299614"), alt: "Man in a black leather jacket crouching on a brick ledge" },
};

export const services = [
  { title: "Complimentary shipping", body: "On every order, delivered in signature packaging." },
  { title: "Returns within 30 days", body: "Free collection from your door or return in store." },
  { title: "Book an appointment", body: "Shop with a client advisor in store or by video." },
];

export const navigation = [
  { label: "New in", href: "/collections/new" },
  { label: "Women", href: "/collections/women" },
  { label: "Men", href: "/collections/men" },
  { label: "Bags", href: "/collections/bags" },
  { label: "Jewelry", href: "/collections/jewelry" },
  { label: "Gifts", href: "/collections/gifts" },
];

export const footerColumns = [
  {
    title: "Client services",
    links: ["Contact us", "Shipping", "Returns", "FAQ"],
  },
  {
    title: "Company",
    links: ["About", "Sustainability", "Careers", "Stores"],
  },
  {
    title: "Legal",
    links: ["Terms", "Privacy", "Cookies", "Accessibility"],
  },
];
