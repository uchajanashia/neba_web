export interface NavItem {
  label: string;
  route: string;
  exact?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', route: '/', exact: true },
  { label: 'Collection', route: '/bracelets' },
  { label: 'Craft', route: '/craft' },
  { label: 'Guide', route: '/guide' },
  { label: 'Contact', route: '/contact' },
];
