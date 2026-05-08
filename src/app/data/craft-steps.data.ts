export interface CraftStep {
  number: number;
  title: string;
  description: string;
}

export const CRAFT_STEPS: CraftStep[] = [
  {
    number: 1,
    title: 'Idea',
    description:
      'Everything begins with a form, a symbol, and a feeling. We search for the line that carries Georgian character.',
  },
  {
    number: 2,
    title: 'Ornament',
    description:
      'The ornament is created so that it never loses its traditional spirit, yet remains a contemporary object.',
  },
  {
    number: 3,
    title: 'Silver',
    description:
      "Silver is worked by hand, with full attention to detail and preservation of the material's natural beauty.",
  },
  {
    number: 4,
    title: 'Strap',
    description:
      "Leather or rubber is chosen according to the bracelet's character - classic, everyday, or visually stronger.",
  },
  {
    number: 5,
    title: 'Finish',
    description:
      'In the final stage the bracelet is cleaned, checked, and prepared for its new owner.',
  },
];
