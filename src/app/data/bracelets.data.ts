import { Bracelet } from '../core/models/bracelet.model';

export const BRACELETS: Bracelet[] = [
  {
    id: 'bracelet-001',
    slug: 'pesvi',
    name: 'უსასრულობა',
    cardImage: '/assets/images/bracelets/pesvi/hero.webp',
    ogImage: '/assets/images/bracelets/pesvi/og.jpg',
    nameEn: 'Usasruloba - Infinity',
    images: [
      {
        src: '/assets/images/bracelets/pesvi/1.webp',
        alt: 'ფესვი bracelet photo 1',
        role: 'hero',
      },
      {
        src: '/assets/images/bracelets/pesvi/2.webp',
        alt: 'ფესვი bracelet photo 2',
        role: 'on-wrist',
      },
      {
        src: '/assets/images/bracelets/pesvi/3.webp',
        alt: 'ფესვი bracelet photo 3',
        role: 'detail',
      },
      {
        src: '/assets/images/bracelets/pesvi/4.webp',
        alt: 'ფესვი bracelet photo 4',
        role: 'back',
      },
      {
        src: '/assets/images/bracelets/pesvi/5.webp',
        alt: 'ფესვი bracelet photo 5',
        role: 'material',
      },
    ],
    variantImages: [
      {
        key: { strap: 'leather-brown', contentSize: 'large' },
        src: '/assets/images/bracelets/pesvi/1.webp',
        alt: 'ფესვი - Brown leather strap with large silver piece',
      },
      {
        key: { strap: 'leather-black', contentSize: 'large' },
        src: '/assets/images/bracelets/pesvi/2.webp',
        alt: 'ფესვი - Black leather strap with large silver piece',
      },
      {
        key: { strap: 'rubber', contentSize: 'large' },
        src: '/assets/images/bracelets/pesvi/3.webp',
        alt: 'ფესვი - Rubber strap with large silver piece',
      },
      {
        key: { strap: 'leather-brown', contentSize: 'small' },
        src: '/assets/images/bracelets/pesvi/4.webp',
        alt: 'ფესვი - Brown leather strap with small silver piece',
      },
    ],
    details: {
      material: 'Sterling Silver',
      strap: 'Leather or Rubber',
      sizing: 'Made to wrist measurement',
      making: 'Handcrafted',
      style: 'Georgian Ornamental',
      order: 'Messenger / Instagram / WhatsApp',
    },
    featured: true,
    order: 1,
    relatedSlugs: ['mcveli', 'mtis-kvali'],
  },
  {
    id: 'bracelet-002',
    slug: 'mcveli',
    name: 'მცველი',
    contentSizes: ['large'],
    cardImage: '/assets/images/bracelets/mcveli/hero.webp',
    ogImage: '/assets/images/bracelets/mcveli/og.jpg',
    nameEn: 'Mcveli - Guardian',
    images: [
      {
        src: '/assets/images/bracelets/mcveli/1.webp',
        alt: 'მცველი bracelet photo 1',
        role: 'hero',
      },
      {
        src: '/assets/images/bracelets/mcveli/2.webp',
        alt: 'მცველი bracelet photo 2',
        role: 'on-wrist',
      },
      {
        src: '/assets/images/bracelets/mcveli/3.webp',
        alt: 'მცველი bracelet photo 3',
        role: 'detail',
      },
      {
        src: '/assets/images/bracelets/mcveli/4.webp',
        alt: 'მცველი bracelet photo 4',
        role: 'back',
      },
      {
        src: '/assets/images/bracelets/mcveli/5.webp',
        alt: 'მცველი bracelet photo 5',
        role: 'material',
      },
    ],
    variantImages: [
      {
        key: { strap: 'leather-brown', contentSize: 'large' },
        src: '/assets/images/bracelets/mcveli/1.webp',
        alt: 'მცველი - Brown leather strap with large silver piece',
      },
      {
        key: { strap: 'leather-black', contentSize: 'large' },
        src: '/assets/images/bracelets/mcveli/2.webp',
        alt: 'მცველი - Black leather strap with large silver piece',
      },
      {
        key: { strap: 'rubber', contentSize: 'large' },
        src: '/assets/images/bracelets/mcveli/3.webp',
        alt: 'მცველი - Rubber strap with large silver piece',
      },
    ],
    details: {
      material: 'Sterling Silver',
      strap: 'Leather or Rubber',
      sizing: 'Made to wrist measurement',
      making: 'Handcrafted',
      style: 'Georgian Ornamental',
      order: 'Messenger / Instagram / WhatsApp',
    },
    featured: true,
    order: 2,
    relatedSlugs: ['pesvi', 'mtis-kvali'],
  },
  {
    id: 'bracelet-003',
    slug: 'mtis-kvali',
    name: 'მთის კვალი',
    cardImage: '/assets/images/bracelets/mtis-kvali/hero.webp',
    ogImage: '/assets/images/bracelets/mtis-kvali/og.jpg',
    nameEn: "Mtis Kvali - Mountain's Trace",
    images: [
      {
        src: '/assets/images/bracelets/mtis-kvali/1.webp',
        alt: 'მთის კვალი bracelet photo 1',
        role: 'hero',
      },
      {
        src: '/assets/images/bracelets/mtis-kvali/2.webp',
        alt: 'მთის კვალი bracelet photo 2',
        role: 'on-wrist',
      },
      {
        src: '/assets/images/bracelets/mtis-kvali/3.webp',
        alt: 'მთის კვალი bracelet photo 3',
        role: 'detail',
      },
      {
        src: '/assets/images/bracelets/mtis-kvali/4.webp',
        alt: 'მთის კვალი bracelet photo 4',
        role: 'back',
      },
      {
        src: '/assets/images/bracelets/mtis-kvali/5.webp',
        alt: 'მთის კვალი bracelet photo 5',
        role: 'material',
      },
    ],
    variantImages: [
      {
        key: { strap: 'leather-brown', contentSize: 'large' },
        src: '/assets/images/bracelets/mtis-kvali/1.webp',
        alt: 'მთის კვალი - Brown leather strap with large silver piece',
      },
      {
        key: { strap: 'leather-black', contentSize: 'large' },
        src: '/assets/images/bracelets/mtis-kvali/2.webp',
        alt: 'მთის კვალი - Black leather strap with large silver piece',
      },
      {
        key: { strap: 'rubber', contentSize: 'large' },
        src: '/assets/images/bracelets/mtis-kvali/3.webp',
        alt: 'მთის კვალი - Rubber strap with large silver piece',
      },
      {
        key: { strap: 'leather-brown', contentSize: 'small' },
        src: '/assets/images/bracelets/mtis-kvali/4.webp',
        alt: 'მთის კვალი - Brown leather strap with small silver piece',
      },
    ],
    details: {
      material: 'Sterling Silver',
      strap: 'Leather or Rubber',
      sizing: 'Made to wrist measurement',
      making: 'Handcrafted',
      style: 'Georgian Mountain-inspired',
      order: 'Messenger / Instagram / WhatsApp',
    },
    featured: true,
    order: 3,
    relatedSlugs: ['pesvi', 'mcveli'],
  },
];

export const FEATURED_BRACELETS = BRACELETS.filter((bracelet) => bracelet.featured);

export function getBraceletBySlug(slug: string): Bracelet | undefined {
  return BRACELETS.find((bracelet) => bracelet.slug === slug);
}

export function getRelatedBracelets(bracelet: Bracelet): Bracelet[] {
  return bracelet.relatedSlugs
    .map((slug) => getBraceletBySlug(slug))
    .filter((item): item is Bracelet => item !== undefined);
}
