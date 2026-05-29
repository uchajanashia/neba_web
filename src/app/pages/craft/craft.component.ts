import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CRAFT_STEPS } from '../../data/craft-steps.data';
import { I18nService } from '../../core/services/i18n.service';
import { MetaService } from '../../core/services/meta.service';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-craft',
  imports: [NgOptimizedImage, SectionTitleComponent, ScrollRevealDirective],
  template: `
    <section class="page-hero page-hero--image">
      <div class="page-hero__image">
        <img
          ngSrc="/assets/images/craft/2.png"
          alt="Silver craft tools arranged on the workbench, ready for the start of the process"
          fill
          priority
          sizes="100vw"
        />
      </div>
      <div class="container">
        <p class="label">{{ i18n.t('craft.hero.label') }}</p>
        <h1>{{ i18n.t('craft.hero.heading') }}</h1>
        <p>{{ i18n.t('craft.hero.subtitle') }}</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <app-section-title [title]="i18n.t('craft.process.heading')" align="center" />
        <div class="timeline">
          @for (step of steps; track step.number) {
            <article class="timeline__item" appScrollReveal [delay]="step.number * 90">
              <img
                class="timeline__bg"
                [ngSrc]="'/assets/images/craft/steps/step-' + step.number + '.jpg'"
                [alt]="i18n.t('craft.step' + step.number + '.title')"
                fill
                sizes="100vw"
              />
              <div class="timeline__overlay"></div>
              <div class="timeline__body">
                <span>{{ step.number }}</span>
                <div>
                  <h2>{{ i18n.t('craft.step' + step.number + '.title') }}</h2>
                  <p>{{ i18n.t('craft.step' + step.number + '.text') }}</p>
                </div>
              </div>
            </article>
          }
        </div>
      </div>
    </section>

    <section class="section section--surface">
      <div class="container split">
        <div class="split__content" appScrollReveal>
          <p class="label">{{ i18n.t('craft.handmade.label') }}</p>
          <h2>{{ i18n.t('craft.handmade.heading') }}</h2>
          <p>{{ i18n.t('craft.handmade.text') }}</p>
        </div>
        <figure class="wide-photo" appScrollReveal [delay]="140">
          <img
            ngSrc="/assets/images/craft/7.png"
            alt="Artisan inspecting the finished handcrafted Georgian silver bracelet in his hands"
            fill
            sizes="(max-width: 760px) 90vw, 44vw"
          />
        </figure>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <app-section-title [title]="i18n.t('craft.gallery.heading')" align="center" />
        <div class="masonry">
          @for (photo of gallery; track photo.src; let i = $index) {
            <figure appScrollReveal [delay]="i * 90">
              <img [ngSrc]="photo.src" [alt]="photo.alt" fill sizes="(max-width: 760px) 90vw, 30vw" />
            </figure>
          }
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CraftComponent implements OnInit {
  private readonly metaService = inject(MetaService);
  readonly i18n = inject(I18nService);

  readonly steps = CRAFT_STEPS;
  readonly gallery = [
    { src: '/assets/images/craft/3.png', alt: 'Silver detail being polished by hand to bring back its shine' },
    { src: '/assets/images/craft/4.png', alt: 'Leather strap being prepared and shaped by hand' },
    { src: '/assets/images/craft/5.png', alt: 'Small silver details being attached onto the leather strap' },
    { src: '/assets/images/craft/6.png', alt: 'Central silver ornament being assembled onto the bracelet' },
    { src: '/assets/images/craft/10.png', alt: 'Finished handcrafted bracelet worn on a wrist, back side view' },
    { src: '/assets/images/craft/8.png', alt: 'Back side fastening detail of the handcrafted bracelet' },
  ];

  ngOnInit(): void {
    this.metaService.updateMeta({
      title: 'The Craft - Georgian Silver Bracelets',
      description:
        'Discover the handcrafting process behind every Georgian silver bracelet.',
    });
  }
}
