export interface Collection {
  id: string;
  slug: string;
  available: boolean;
}

export const COLLECTIONS: Collection[] = [
  { id: 'bracelets', slug: 'bracelets', available: true },
  { id: 'rings', slug: 'rings', available: false },
  { id: 'pendants', slug: 'pendants', available: false },
];
