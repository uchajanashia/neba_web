import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { SIZE_GUIDE } from '../../data/size-guide.data';
import { I18nService } from '../../core/services/i18n.service';
import { MetaService } from '../../core/services/meta.service';
import { CtaButtonsComponent } from '../../shared/components/cta-buttons/cta-buttons.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-guide',
  imports: [CtaButtonsComponent, ScrollRevealDirective],
  template: `
    <section class="page-hero">
      <div class="page-hero__bg"></div>
      <div class="container">
        <p class="label">{{ i18n.t('guide.hero.label') }}</p>
        <h1>{{ i18n.t('guide.hero.heading') }}</h1>
        <p>{{ i18n.t('guide.hero.subtitle') }}</p>
      </div>
    </section>

    <section class="section">
      <div class="container guide-grid">
        <div appScrollReveal>
          <p class="label">{{ i18n.t('guide.size.label') }}</p>
          <h2>{{ i18n.t('guide.size.heading') }}</h2>
          <p>{{ i18n.t('guide.size.text') }}</p>
          <p class="fine-print">{{ i18n.t('guide.size.note') }}</p>
        </div>
        <div class="size-table" appScrollReveal [delay]="140">
          <div class="size-table__head">
            <span>{{ i18n.t('guide.size.col.wrist') }}</span>
            <span>{{ i18n.t('guide.size.col.rec') }}</span>
          </div>
          @for (row of rows; track row.wristSize) {
            <div>
              <span>{{ row.wristSize }}</span>
              <strong>{{ recommendationLabel(row.recommendation) }}</strong>
            </div>
          }
        </div>
      </div>
    </section>

    <section class="section section--surface">
      <div class="container guide-grid">
        <article appScrollReveal>
          <p class="label">{{ i18n.t('guide.material.label') }}</p>
          <h2>{{ i18n.t('guide.material.heading') }}</h2>
        </article>
        <div class="material-choice">
          <article appScrollReveal [delay]="100">
            <span class="material-choice__swatch material-choice__swatch--leather"></span>
            <h3>{{ i18n.t('guide.material.leather.title') }}</h3>
            <p>{{ i18n.t('guide.material.leather.text') }}</p>
          </article>
          <article appScrollReveal [delay]="180">
            <span class="material-choice__swatch material-choice__swatch--rubber"></span>
            <h3>{{ i18n.t('guide.material.rubber.title') }}</h3>
            <p>{{ i18n.t('guide.material.rubber.text') }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container guide-grid">
        <div appScrollReveal>
          <p class="label">{{ i18n.t('guide.care.label') }}</p>
          <h2>{{ i18n.t('guide.silver.heading') }}</h2>
          <p>{{ i18n.t('guide.silver.text') }}</p>
        </div>
        <ul class="ornament-list ornament-list--large" appScrollReveal [delay]="140">
          <li>{{ i18n.t('guide.silver.tip1') }}</li>
          <li>{{ i18n.t('guide.silver.tip2') }}</li>
          <li>{{ i18n.t('guide.silver.tip3') }}</li>
          <li>{{ i18n.t('guide.silver.tip4') }}</li>
          <li>{{ i18n.t('guide.silver.tip5') }}</li>
        </ul>
      </div>
    </section>

    <section class="section final-cta final-cta--compact">
      <div class="container container--narrow">
        <h2>{{ i18n.t('guide.help.heading') }}</h2>
        <p>{{ i18n.t('guide.help.text') }}</p>
        <app-cta-buttons />
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuideComponent implements OnInit {
  private readonly metaService = inject(MetaService);
  readonly i18n = inject(I18nService);

  readonly rows = SIZE_GUIDE;

  recommendationLabel(value: string): string {
    const keyByValue: Record<string, string> = {
      Small: 'guide.size.rec.small',
      Medium: 'guide.size.rec.medium',
      Large: 'guide.size.rec.large',
      'Custom - contact us': 'guide.size.rec.custom',
    };

    return this.i18n.t(keyByValue[value] ?? value);
  }

  ngOnInit(): void {
    this.metaService.updateMeta({
      title: 'Size Guide & Care - Georgian Silver Bracelets',
      description:
        'How to measure your wrist, choose the right size, and care for your handcrafted silver bracelet.',
    });
  }
}
