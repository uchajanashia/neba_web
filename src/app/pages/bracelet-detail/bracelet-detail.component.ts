import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { getBraceletBySlug, getRelatedBracelets } from '../../data/bracelets.data';
import { CONTENT_SIZE_OPTIONS, SIZE_OPTIONS, STRAP_OPTIONS } from '../../data/size-options.data';
import type {
  BraceletContentSize,
  BraceletSizeOption,
  BraceletStrapType,
} from '../../core/models/bracelet.model';
import { I18nService } from '../../core/services/i18n.service';
import { MetaService } from '../../core/services/meta.service';
import { BraceletCardComponent } from '../../shared/components/bracelet-card/bracelet-card.component';
import { CtaButtonsComponent } from '../../shared/components/cta-buttons/cta-buttons.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-bracelet-detail',
  imports: [
    RouterLink,
    BraceletCardComponent,
    CtaButtonsComponent,
    ScrollRevealDirective,
  ],
  template: `
    @if (bracelet(); as item) {
      <section class="detail-hero">
        <div class="container detail-hero__grid">
          <div class="gallery" appScrollReveal>
            <div class="gallery__main">
              <img
                [src]="activeVariantImage()?.src ?? activeImage().src"
                [alt]="activeVariantImage()?.alt ?? activeImage().alt"
                loading="eager"
                fetchpriority="high"
                decoding="async"
                class="gallery__main-image"
              />
            </div>
            <div class="gallery__thumbs" [attr.aria-label]="i18n.t('detail.gallery_thumbs_aria')">
              @for (image of item.images; track image.src; let i = $index) {
                <button
                  type="button"
                  class="gallery__thumb"
                  [class.gallery__thumb--active]="activeImageIndex() === i"
                  (click)="selectImage(i)"
                >
                  <img [src]="image.src" [alt]="image.alt" loading="lazy" decoding="async" />
                </button>
              }
            </div>
          </div>

          <div class="detail-info" appScrollReveal [delay]="160">
            <p class="label">{{ i18n.t('detail.label') }}</p>
            <h1>{{ item.name }}</h1>
            <p class="detail-info__en">{{ item.nameEn }}</p>
            <p class="detail-info__emotion">{{ i18n.t('bracelet.' + item.slug + '.emotionalDescription') }}</p>
            <ul class="ornament-list">
              <li>{{ i18n.t('detail.features.silver') }}</li>
              <li>{{ i18n.t('detail.features.ornament') }}</li>
              <li>{{ i18n.t('detail.features.strap') }}</li>
              <li>{{ i18n.t('detail.features.size') }}</li>
              <li>{{ i18n.t('detail.features.custom') }}</li>
            </ul>

            <div class="variant-selector">
              <div class="variant-group">
                <div class="variant-group__header">
                  <span class="variant-group__label">{{ i18n.t('variant.size.label') }}</span>
                  <span class="variant-group__hint">{{ getSizeHint() }}</span>
                </div>
                <div
                  class="variant-group__options"
                  role="group"
                  [attr.aria-label]="i18n.t('variant.size.aria')"
                >
                  @for (opt of sizeOptions; track opt.value) {
                    <button
                      type="button"
                      class="variant-btn variant-btn--size"
                      [class.variant-btn--active]="selectedSize() === opt.value"
                      (click)="selectedSize.set(opt.value)"
                      [attr.aria-pressed]="selectedSize() === opt.value"
                      [attr.aria-label]="opt.label + ' - ' + opt.cm"
                    >
                      <span class="variant-btn__main">{{ opt.label }}</span>
                      <span class="variant-btn__sub">{{ opt.cm }}</span>
                    </button>
                  }
                </div>
              </div>

              <div class="variant-group">
                <div class="variant-group__header">
                  <span class="variant-group__label">{{ i18n.t('variant.strap.label') }}</span>
                  <span class="variant-group__hint">{{ getStrapLabel() }}</span>
                </div>
                <div
                  class="variant-group__options"
                  role="group"
                  [attr.aria-label]="i18n.t('variant.strap.aria')"
                >
                  @for (opt of strapOptions; track opt.value) {
                    <button
                      type="button"
                      class="variant-btn variant-btn--strap"
                      [class.variant-btn--active]="selectedStrap() === opt.value"
                      (click)="selectedStrap.set(opt.value)"
                      [attr.aria-pressed]="selectedStrap() === opt.value"
                      [attr.aria-label]="getStrapOptionLabel(opt.value)"
                    >
                      <span class="variant-btn__swatch" [style.background]="opt.color"></span>
                      <span class="variant-btn__main">{{ getStrapOptionLabel(opt.value) }}</span>
                    </button>
                  }
                </div>
              </div>

              <div class="variant-group">
                <div class="variant-group__header">
                  <span class="variant-group__label">{{ i18n.t('variant.content_size.label') }}</span>
                </div>
                <div
                  class="variant-group__options"
                  role="group"
                  [attr.aria-label]="i18n.t('variant.content_size.aria')"
                >
                  @for (opt of contentSizeOptions; track opt.value) {
                    <button
                      type="button"
                      class="variant-btn variant-btn--content"
                      [class.variant-btn--active]="selectedContentSize() === opt.value"
                      (click)="selectedContentSize.set(opt.value)"
                      [attr.aria-pressed]="selectedContentSize() === opt.value"
                    >
                      <span class="variant-btn__main">{{ getContentSizeLabel(opt.value) }}</span>
                      <span class="variant-btn__sub">{{ getContentSizeDescription(opt.value) }}</span>
                    </button>
                  }
                </div>
              </div>
            </div>

            <app-cta-buttons layout="column" />
            <p class="fine-print">
              {{ i18n.t('detail.note') }}
            </p>
          </div>
        </div>
      </section>

      <section class="section product-story">
        <div class="container container--narrow" appScrollReveal>
          <p class="label">{{ i18n.t('detail.story.heading') }}</p>
          <h2>{{ i18n.t('bracelet.' + item.slug + '.story') }}</h2>
        </div>
      </section>

      <section class="section section--surface">
        <div class="container detail-sections">
          <div appScrollReveal>
            <h2>{{ i18n.t('detail.specs.heading') }}</h2>
            <dl class="spec-list">
              <div>
                <dt>{{ i18n.t('detail.specs.material') }}</dt>
                <dd>{{ translateDetailValue(item.details.material) }}</dd>
              </div>
              <div>
                <dt>{{ i18n.t('detail.specs.strap') }}</dt>
                <dd>{{ translateDetailValue(item.details.strap) }}</dd>
              </div>
              <div>
                <dt>{{ i18n.t('detail.specs.sizing') }}</dt>
                <dd>{{ translateDetailValue(item.details.sizing) }}</dd>
              </div>
              <div>
                <dt>{{ i18n.t('detail.specs.making') }}</dt>
                <dd>{{ translateDetailValue(item.details.making) }}</dd>
              </div>
              <div>
                <dt>{{ i18n.t('detail.specs.style') }}</dt>
                <dd>{{ translateDetailValue(item.details.style) }}</dd>
              </div>
              <div>
                <dt>{{ i18n.t('detail.specs.order') }}</dt>
                <dd>{{ translateDetailValue(item.details.order) }}</dd>
              </div>
            </dl>
          </div>

          <div appScrollReveal [delay]="120">
            <h2>{{ i18n.t('detail.material.heading') }}</h2>
            <div class="material-choice">
              <article>
                <span class="material-choice__swatch material-choice__swatch--leather"></span>
                <h3>{{ i18n.t('detail.material.leather.title') }}</h3>
                <p>{{ i18n.t('detail.material.leather.text') }}</p>
              </article>
              <article>
                <span class="material-choice__swatch material-choice__swatch--rubber"></span>
                <h3>{{ i18n.t('detail.material.rubber.title') }}</h3>
                <p>{{ i18n.t('detail.material.rubber.text') }}</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section class="section size-mini">
        <div class="container container--narrow" appScrollReveal>
          <h2>{{ i18n.t('detail.size.heading') }}</h2>
          <p>{{ i18n.t('detail.size.text') }}</p>
          <a routerLink="/guide" class="btn btn--secondary">{{ i18n.t('cta.see_guide') }}</a>
        </div>
      </section>

      <section class="section section--surface">
        <div class="container">
          <h2 class="related-title">{{ i18n.t('detail.related.heading') }}</h2>
          <div class="bracelet-grid">
            @for (related of relatedBracelets(); track related.id) {
              <app-bracelet-card [bracelet]="related" />
            }
          </div>
        </div>
      </section>
    }
  `,
  styles: [
    `
      .variant-selector {
        display: flex;
        flex-direction: column;
        gap: var(--space-6);
        margin-block: var(--space-6);
        padding-block: var(--space-6);
        border-top: 1px solid var(--color-border);
        border-bottom: 1px solid var(--color-border);
      }

      .variant-group {
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
      }

      .variant-group__header {
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        justify-content: space-between;
        gap: var(--space-3);
      }

      .variant-group__label {
        color: var(--color-text-primary);
        font-family: var(--font-body);
        font-size: var(--text-xs);
        font-weight: var(--weight-medium);
        letter-spacing: var(--tracking-normal);
        text-transform: uppercase;
      }

      .variant-group__hint {
        color: var(--color-gold);
        font-family: var(--font-body);
        font-size: var(--text-xs);
        letter-spacing: var(--tracking-normal);
      }

      .variant-group__options {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-2);
      }

      .variant-btn {
        display: flex;
        min-width: 64px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2px;
        padding: var(--space-2) var(--space-4);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        background: transparent;
        cursor: pointer;
        transition:
          border-color 0.3s ease,
          background 0.3s ease,
          box-shadow 0.3s ease;
      }

      .variant-btn__main {
        color: var(--color-text-muted);
        font-family: var(--font-body);
        font-size: var(--text-sm);
        font-weight: var(--weight-medium);
        line-height: 1.2;
        transition: color 0.3s ease;
        white-space: nowrap;
      }

      .variant-btn__sub {
        color: var(--color-text-faint);
        font-family: var(--font-body);
        font-size: var(--text-xs);
        line-height: 1.25;
        transition: color 0.3s ease;
        white-space: nowrap;
      }

      .variant-btn__swatch {
        width: 14px;
        height: 14px;
        margin-bottom: 2px;
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 50%;
      }

      .variant-btn--active {
        border-color: var(--color-gold);
        background: rgba(176, 138, 74, 0.08);
        box-shadow: 0 0 0 1px rgba(176, 138, 74, 0.2);
      }

      .variant-btn--active .variant-btn__main {
        color: var(--color-gold);
      }

      .variant-btn--active .variant-btn__sub {
        color: var(--color-text-muted);
      }

      .variant-btn:hover:not(.variant-btn--active) {
        border-color: var(--color-border-hover);
        background: rgba(200, 195, 184, 0.05);
      }

      .variant-btn:hover:not(.variant-btn--active) .variant-btn__main {
        color: var(--color-text-primary);
      }

      .variant-btn--size {
        min-width: 72px;
      }

      .variant-btn--strap {
        min-width: 130px;
        flex-direction: row;
        align-items: center;
        gap: var(--space-2);
        padding: var(--space-2) var(--space-5);
      }

      .variant-btn--content {
        min-width: 140px;
        flex: 1;
        flex-direction: row;
        justify-content: flex-start;
        gap: var(--space-3);
        padding: var(--space-3) var(--space-5);
        text-align: left;
      }

      .variant-btn--content .variant-btn__main {
        font-size: var(--text-sm);
      }

      .variant-btn--content .variant-btn__sub {
        font-size: var(--text-xs);
        white-space: normal;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BraceletDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly metaService = inject(MetaService);
  readonly i18n = inject(I18nService);

  readonly activeImageIndex = signal(0);
  readonly selectedSize = signal<BraceletSizeOption>('M');
  readonly selectedStrap = signal<BraceletStrapType>('leather-brown');
  readonly selectedContentSize = signal<BraceletContentSize>('large');
  readonly sizeOptions = SIZE_OPTIONS;
  readonly strapOptions = STRAP_OPTIONS;
  readonly contentSizeOptions = CONTENT_SIZE_OPTIONS;
  readonly slug = toSignal(this.route.paramMap.pipe(map((params) => params.get('slug') ?? '')), {
    initialValue: '',
  });
  readonly bracelet = computed(() => getBraceletBySlug(this.slug()));
  readonly activeVariantImage = computed(() => {
    const item = this.bracelet();

    if (!item || this.activeImageIndex() !== 0) {
      return null;
    }

    const variant = item.variantImages?.find(
      (variantImage) =>
        variantImage.key.size === this.selectedSize() &&
        variantImage.key.strap === this.selectedStrap() &&
        variantImage.key.contentSize === this.selectedContentSize(),
    );

    if (variant) {
      return variant;
    }

    const strapMatch = item.variantImages?.find(
      (variantImage) => variantImage.key.strap === this.selectedStrap(),
    );

    if (strapMatch) {
      return strapMatch;
    }

    return item.images[0] ?? null;
  });
  readonly activeImage = computed(() => {
    const item = this.bracelet();
    return item?.images[this.activeImageIndex()] ?? item?.images[0] ?? {
      src: '/assets/images/hero/stone-hero.jpg',
      alt: 'Georgian silver bracelet',
      role: 'hero' as const,
    };
  });
  readonly relatedBracelets = computed(() => {
    const item = this.bracelet();
    return item ? getRelatedBracelets(item) : [];
  });

  constructor() {
    let initializedVariant = false;

    effect(() => {
      this.selectedSize();
      this.selectedStrap();
      this.selectedContentSize();

      if (!initializedVariant) {
        initializedVariant = true;
        return;
      }

      this.activeImageIndex.set(0);
    });

    effect(() => {
      const item = this.bracelet();

      if (!item && this.slug()) {
        void this.router.navigateByUrl('/bracelets');
        return;
      }

      if (item) {
        this.metaService.updateMeta({
          title: `${item.nameEn} - Georgian Silver Bracelet`,
          description: this.i18n.t(`bracelet.${item.slug}.shortDescription`),
          image: item.cardImage,
        });
      }
    });
  }

  selectImage(index: number): void {
    this.activeImageIndex.set(index);
  }

  getSizeHint(): string {
    const option = this.sizeOptions.find((size) => size.value === this.selectedSize());
    return option ? option.cm : '';
  }

  getStrapLabel(): string {
    return this.getStrapOptionLabel(this.selectedStrap());
  }

  getStrapOptionLabel(value: BraceletStrapType): string {
    const keyByValue: Record<BraceletStrapType, string> = {
      'leather-brown': 'variant.strap.leather_brown',
      'leather-black': 'variant.strap.leather_black',
      rubber: 'variant.strap.rubber',
    };

    return this.i18n.t(keyByValue[value]);
  }

  getContentSizeLabel(value: BraceletContentSize): string {
    const keyByValue: Record<BraceletContentSize, string> = {
      large: 'variant.content.large',
      small: 'variant.content.small',
    };

    return this.i18n.t(keyByValue[value]);
  }

  getContentSizeDescription(value: BraceletContentSize): string {
    const keyByValue: Record<BraceletContentSize, string> = {
      large: 'variant.content.large.desc',
      small: 'variant.content.small.desc',
    };

    return this.i18n.t(keyByValue[value]);
  }

  translateDetailValue(value: string): string {
    const keyByValue: Record<string, string> = {
      'Sterling Silver': 'product.details.sterling_silver',
      'Leather or Rubber': 'product.details.leather_or_rubber',
      'Small / Medium / Large / Custom': 'product.details.sizing',
      Handcrafted: 'product.details.handcrafted',
      'Georgian Ornamental': 'product.details.georgian_ornamental',
      'Georgian Mountain-inspired': 'product.details.georgian_mountain',
      'Messenger / Instagram': 'product.details.order_channels',
    };

    return this.i18n.t(keyByValue[value] ?? value);
  }
}
