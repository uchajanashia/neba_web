import { RenderMode, ServerRoute } from '@angular/ssr';
import { BRACELETS } from './data/bracelets.data';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'bracelets/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return BRACELETS.map(({ slug }) => ({ slug }));
    },
  },
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'bracelets',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'craft',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'guide',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'contact',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'about',
    renderMode: RenderMode.Server,
    status: 308,
  },
  {
    path: 'symbols',
    renderMode: RenderMode.Server,
    status: 308,
  },
  {
    path: '404',
    renderMode: RenderMode.Server,
    status: 404,
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
    status: 404,
  },
];
