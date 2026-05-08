export interface Collection {
  id: string;
  slug: string;
  label: string;
  description: string;
  available: boolean;
}

export const COLLECTIONS: Collection[] = [
  {
    id: 'bracelets',
    slug: 'bracelets',
    label: 'Bracelets',
    description: 'Handcrafted silver bracelets with Georgian ornamental designs.',
    available: true,
  },
  {
    id: 'rings',
    slug: 'rings',
    label: 'Rings',
    description: 'Coming soon.',
    available: false,
  },
  {
    id: 'pendants',
    slug: 'pendants',
    label: 'Pendants',
    description: 'Coming soon.',
    available: false,
  },
];
