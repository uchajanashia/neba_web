import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export const SITE_URL = 'https://www.bu-neba.ge';
const DEFAULT_SOCIAL_IMAGE = '/assets/logo/og-image.jpg';

function toAbsoluteUrl(path: string): string {
  return path.startsWith('http') ? path : `${SITE_URL}${path}`;
}

@Injectable({ providedIn: 'root' })
export class MetaService {
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  updateMeta(options: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
  }): void {
    if (options.title) {
      this.title.setTitle(options.title);
      this.meta.updateTag({ property: 'og:title', content: options.title });
      this.meta.updateTag({ name: 'twitter:title', content: options.title });
    }

    if (options.description) {
      this.updateDescription(options.description);
      this.meta.updateTag({ property: 'og:description', content: options.description });
      this.meta.updateTag({ name: 'twitter:description', content: options.description });
    }

    if (options.image) {
      const image = toAbsoluteUrl(options.image);
      this.meta.updateTag({ property: 'og:image', content: image });
      this.meta.updateTag({ name: 'twitter:image', content: image });
    }

    if (options.url) {
      const url = toAbsoluteUrl(options.url.split(/[?#]/, 1)[0] || '/');
      this.meta.updateTag({ property: 'og:url', content: url });
      this.updateCanonical(url);
    }
  }

  resetPageImage(): void {
    const image = toAbsoluteUrl(DEFAULT_SOCIAL_IMAGE);
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ name: 'twitter:image', content: image });
  }

  updateDescription(description: string): void {
    this.meta.updateTag({ name: 'description', content: description });
  }

  private updateCanonical(url: string): void {
    let canonical = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.rel = 'canonical';
      this.document.head.appendChild(canonical);
    }

    canonical.href = url;
  }
}
