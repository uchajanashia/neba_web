import { Bracelet } from '../core/models/bracelet.model';

export const BRACELETS: Bracelet[] = [
  {
    id: 'bracelet-001',
    slug: 'pesvi',
    name: 'უსასრულობა',
    cardImage: '/assets/images/bracelets/pesvi/hero.webp',
    ogImage: '/assets/images/bracelets/pesvi/og.jpg',
    nameEn: 'Usasruloba - Infinity',
    materials: 'both',
    sizes: ['small', 'medium', 'large', 'custom'],
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
        key: { size: 'M', strap: 'leather-brown', contentSize: 'large' },
        src: '/assets/images/bracelets/pesvi/1.webp',
        alt: 'ფესვი - Brown leather strap, large silver piece, M size',
      },
      {
        key: { size: 'M', strap: 'leather-black', contentSize: 'large' },
        src: '/assets/images/bracelets/pesvi/2.webp',
        alt: 'ფესვი - Black leather strap, large silver piece, M size',
      },
      {
        key: { size: 'M', strap: 'rubber', contentSize: 'large' },
        src: '/assets/images/bracelets/pesvi/3.webp',
        alt: 'ფესვი - Rubber strap, large silver piece, M size',
      },
      {
        key: { size: 'M', strap: 'leather-brown', contentSize: 'small' },
        src: '/assets/images/bracelets/pesvi/4.webp',
        alt: 'ფესვი - Brown leather strap, small silver piece, M size',
      },
    ],
    details: {
      material: 'Sterling Silver',
      strap: 'Leather or Rubber',
      sizing: 'Small / Medium / Large / Custom',
      making: 'Handcrafted',
      style: 'Georgian Ornamental',
      order: 'Messenger / Instagram',
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
    materials: 'both',
    sizes: ['small', 'medium', 'large', 'custom'],
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
        key: { size: 'M', strap: 'leather-brown', contentSize: 'large' },
        src: '/assets/images/bracelets/mcveli/1.webp',
        alt: 'მცველი - Brown leather strap, large silver piece, M size',
      },
      {
        key: { size: 'M', strap: 'leather-black', contentSize: 'large' },
        src: '/assets/images/bracelets/mcveli/2.webp',
        alt: 'მცველი - Black leather strap, large silver piece, M size',
      },
      {
        key: { size: 'M', strap: 'rubber', contentSize: 'large' },
        src: '/assets/images/bracelets/mcveli/3.webp',
        alt: 'მცველი - Rubber strap, large silver piece, M size',
      },
    ],
    details: {
      material: 'Sterling Silver',
      strap: 'Leather or Rubber',
      sizing: 'Small / Medium / Large / Custom',
      making: 'Handcrafted',
      style: 'Georgian Ornamental',
      order: 'Messenger / Instagram',
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
    materials: 'both',
    sizes: ['small', 'medium', 'large', 'custom'],
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
        key: { size: 'M', strap: 'leather-brown', contentSize: 'large' },
        src: '/assets/images/bracelets/mtis-kvali/1.webp',
        alt: 'მთის კვალი - Brown leather strap, large silver piece, M size',
      },
      {
        key: { size: 'M', strap: 'leather-black', contentSize: 'large' },
        src: '/assets/images/bracelets/mtis-kvali/2.webp',
        alt: 'მთის კვალი - Black leather strap, large silver piece, M size',
      },
      {
        key: { size: 'M', strap: 'rubber', contentSize: 'large' },
        src: '/assets/images/bracelets/mtis-kvali/3.webp',
        alt: 'მთის კვალი - Rubber strap, large silver piece, M size',
      },
      {
        key: { size: 'M', strap: 'leather-brown', contentSize: 'small' },
        src: '/assets/images/bracelets/mtis-kvali/4.webp',
        alt: 'მთის კვალი - Brown leather strap, small silver piece, M size',
      },
    ],
    details: {
      material: 'Sterling Silver',
      strap: 'Leather or Rubber',
      sizing: 'Small / Medium / Large / Custom',
      making: 'Handcrafted',
      style: 'Georgian Mountain-inspired',
      order: 'Messenger / Instagram',
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
