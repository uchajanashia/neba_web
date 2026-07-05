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
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
