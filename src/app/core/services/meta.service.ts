import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class MetaService {
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
    }

    if (options.description) {
      this.updateDescription(options.description);
      this.meta.updateTag({ property: 'og:description', content: options.description });
    }

    if (options.image) {
      this.meta.updateTag({ property: 'og:image', content: options.image });
    }

    if (options.url) {
      this.meta.updateTag({ property: 'og:url', content: options.url });
    }
  }

  updateDescription(description: string): void {
    this.meta.updateTag({ name: 'description', content: description });
  }
}
