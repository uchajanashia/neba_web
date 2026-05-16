export type BraceletMaterial = 'leather' | 'rubber' | 'both';
export type BraceletSize = 'small' | 'medium' | 'large' | 'custom';
export type BraceletSizeOption = 'S' | 'M' | 'L' | 'XL';
export type BraceletStrapType = 'leather-brown' | 'leather-black' | 'rubber';
export type BraceletContentSize = 'large' | 'small';

export interface BraceletVariantKey {
  size: BraceletSizeOption;
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

export interface BraceletLocalized {
  tagline: string;
  shortDescription: string;
  emotionalDescription: string;
  story: string;
}

export interface Bracelet {
  id: string;
  slug: string;
  name: string;
  cardImage: string;
  nameEn: string;
  tagline: string;
  shortDescription: string;
  emotionalDescription: string;
  story: string;
  content: {
    ka: BraceletLocalized;
    en: BraceletLocalized;
    ru: BraceletLocalized;
  };
  materials: BraceletMaterial;
  sizes: BraceletSize[];
  images: BraceletImage[];
  variantImages?: BraceletVariantImage[];
  details: BraceletDetail;
  featured: boolean;
  order: number;
  relatedSlugs: string[];
}
