export type BraceletStrapType = 'leather-brown' | 'leather-black' | 'rubber';
export type BraceletContentSize = 'large' | 'small';

export interface BraceletVariantKey {
  strap: BraceletStrapType;
  contentSize: BraceletContentSize;
}

export interface BraceletVariantImage {
  key: BraceletVariantKey;
  src: string;
  alt: string;
}

export interface BraceletImage {
  src: string;
  alt: string;
  role: 'hero' | 'on-wrist' | 'detail' | 'back' | 'material';
}

export interface BraceletDetail {
  material: string;
  strap: string;
  sizing: string;
  making: string;
  style: string;
  order: string;
}

export interface Bracelet {
  id: string;
  slug: string;
  name: string;
  /** Available silver-piece sizes; omit for both. A single entry hides the selector. */
  contentSizes?: BraceletContentSize[];
  cardImage: string;
  /** JPEG version for social link previews — some crawlers don't render WebP og:image */
  ogImage?: string;
  nameEn: string;
  images: BraceletImage[];
  variantImages?: BraceletVariantImage[];
  details: BraceletDetail;
  featured: boolean;
  order: number;
  relatedSlugs: string[];
}
