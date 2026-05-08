import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { I18nService } from '../../core/services/i18n.service';
import { MetaService } from '../../core/services/meta.service';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-about',
  imports: [NgOptimizedImage, ScrollRevealDirective],
  template: `
    <section class="page-hero">
      <div class="page-hero__bg"></div>
      <div class="container">
        <p class="label">{{ i18n.t('about.hero.label') }}</p>
        <h1>{{ i18n.t('about.hero.heading') }}</h1>
        <p>{{ i18n.t('about.hero.subtitle') }}</p>
      </div>
    </section>

    <section class="section">
      <div class="container split split--center">
        <div class="split__content" appScrollReveal>
          <p class="label">{{ i18n.t('about.idea.heading') }}</p>
          <h2>{{ i18n.t('about.idea.heading2') }}</h2>
          <p>{{ i18n.t('about.idea.text') }}</p>
        </div>
        <figure class="wide-photo" appScrollReveal [delay]="140">
          <img
            ngSrc="/assets/images/craft/wrist-fitting.jpg"
            alt="Artisan fitting handcrafted Georgian silver bracelet"
            fill
            sizes="(max-width: 760px) 90vw, 44vw"
          />
        </figure>
      </div>
    </section>

    <section class="section section--surface">
      <div class="container">
        <div class="values-grid">
          @for (value of values; track value.titleKey; let i = $index) {
            <article appScrollReveal [delay]="i * 130">
              <p class="label">{{ i18n.t(value.titleKey) }}</p>
              <h2>{{ i18n.t(value.headingKey) }}</h2>
              <p>{{ i18n.t(value.textKey) }}</p>
            </article>
          }
        </div>
      </div>
    </section>

    <section class="brand-statement">
      <div class="container container--narrow" appScrollReveal>
        <h2>{{ i18n.t('about.statement') }}</h2>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <p class="label" appScrollReveal>{{ i18n.t('about.photos.heading') }}</p>
        <div class="masonry masonry--short">
          @for (photo of photos; track photo.src; let i = $index) {
            <figure appScrollReveal [delay]="i * 100">
              <img [ngSrc]="photo.src" [alt]="photo.alt" fill sizes="(max-width: 760px) 90vw, 30vw" />
            </figure>
          }
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent implements OnInit {
  private readonly metaService = inject(MetaService);
  readonly i18n = inject(I18nService);

  readonly values = [
    {
      titleKey: 'about.values.purity.title',
      headingKey: 'about.values.purity.heading',
      textKey: 'about.values.purity.text',
    },
    {
      titleKey: 'about.values.nature.title',
      headingKey: 'about.values.nature.heading',
      textKey: 'about.values.nature.text',
    },
    {
      titleKey: 'about.values.craft.title',
      headingKey: 'about.values.craft.heading',
      textKey: 'about.values.craft.text',
    },
  ];
  readonly photos = [
    { src: '/assets/images/craft/workbench.jpg', alt: 'Artisan silver work table' },
    { src: '/assets/images/craft/silver-detail.jpg', alt: 'Silver detail extreme close-up' },
    { src: '/assets/images/bracelets/mtis-kvali/material.jpg', alt: 'Bracelet placed on natural stone' },
  ];

  ngOnInit(): void {
    this.metaService.updateMeta({
      title: 'About Us - Georgian Silver Craft',
      description:
        'We are artisans who love Georgian ornament, nature, silver, and the silence where real craft is born.',
    });
  }
}
