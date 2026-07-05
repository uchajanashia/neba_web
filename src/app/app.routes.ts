import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'bu-neba — Georgian Handcrafted Silver Bracelets',
    data: {
      description:
        'Premium handcrafted silver bracelets inspired by Georgian ornament, tradition and nature. Order via Messenger or Instagram.',
    },
  },
  {
    path: 'bracelets',
    loadComponent: () =>
      import('./pages/collection/collection.component').then((m) => m.CollectionComponent),
    title: 'Silver Bracelet Collection — bu-neba',
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
    title: 'The Craft — How Our Bracelets Are Made',
    data: {
      description:
        'Discover the handcrafting process behind every bu-neba silver bracelet.',
    },
  },
  {
    path: 'about',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'guide',
    loadComponent: () => import('./pages/guide/guide.component').then((m) => m.GuideComponent),
    title: 'Size Guide & Care — bu-neba',
    data: {
      description:
        'How to measure your wrist, choose the right size, and care for your handcrafted silver bracelet.',
    },
  },
  {
    path: 'symbols',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then((m) => m.ContactComponent),
    title: 'Order & Contact — bu-neba',
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
