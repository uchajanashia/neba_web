import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Georgian Handcrafted Silver Bracelets',
    data: {
      description:
        'Premium handcrafted silver bracelets inspired by Georgian ornament, tradition and nature. Order via Messenger or Instagram.',
    },
  },
  {
    path: 'bracelets',
    loadComponent: () =>
      import('./pages/collection/collection.component').then((m) => m.CollectionComponent),
    title: 'Silver Bracelet Collection - Georgian Handcrafted',
    data: {
      description:
        'Browse handcrafted silver bracelets with Georgian ornamental designs and natural materials.',
    },
  },
  {
    path: 'bracelets/:slug',
    loadComponent: () =>
      import('./pages/bracelet-detail/bracelet-detail.component').then(
        (m) => m.BraceletDetailComponent,
      ),
  },
  {
    path: 'craft',
    loadComponent: () => import('./pages/craft/craft.component').then((m) => m.CraftComponent),
    title: 'The Craft - How Our Bracelets Are Made',
    data: {
      description:
        'Discover the handcrafting process behind every Georgian silver bracelet.',
    },
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent),
    title: 'About Us - Georgian Silver Craft',
    data: {
      description:
        'We are artisans who love Georgian ornament, nature, silver, and the silence where real craft is born.',
    },
  },
  {
    path: 'guide',
    loadComponent: () => import('./pages/guide/guide.component').then((m) => m.GuideComponent),
    title: 'Size Guide & Care - Georgian Silver Bracelets',
    data: {
      description:
        'How to measure your wrist, choose the right size, and care for your handcrafted silver bracelet.',
    },
  },
  {
    path: 'symbols',
    loadComponent: () => import('./pages/symbols/symbols.component').then((m) => m.SymbolsComponent),
    title: 'Georgian Ornament & Symbols',
    data: {
      description:
        'The meaning behind the Georgian ornamental lines, cross symbolism, and nature traces used in our silver bracelets.',
    },
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then((m) => m.ContactComponent),
    title: 'Order & Contact - Georgian Silver Bracelets',
    data: {
      description:
        'Order your handcrafted silver bracelet via Messenger or Instagram.',
    },
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
