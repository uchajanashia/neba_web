import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Bracelet } from '../../../core/models/bracelet.model';
import { CONTACT } from '../../../core/models/contact.constants';
import { I18nService } from '../../../core/services/i18n.service';
import { HoverShineDirective } from '../../directives/hover-shine.directive';

@Component({
  selector: 'app-bracelet-card',
  imports: [RouterLink, NgOptimizedImage, HoverShineDirective],
  template: `
    <article
      class="bracelet-card"
      [class]="'bracelet-card bracelet-card--' + variant()"
      appHoverShine
    >
      <a [routerLink]="['/bracelets', bracelet().slug]" class="bracelet-card__image-link">
        <span class="bracelet-card__image-wrap">
          <img
            [ngSrc]="heroImage().src"
            [alt]="heroImage().alt"
            fill
            sizes="(max-width: 760px) 92vw, 33vw"
            [priority]="variant() === 'featured'"
            class="bracelet-card__image"
          />
        </span>
      </a>
      <div class="bracelet-card__content">
        <p class="label">{{ bracelet().nameEn }}</p>
        <a [routerLink]="['/bracelets', bracelet().slug]">
          <h3 class="bracelet-card__name">{{ bracelet().name }}</h3>
        </a>
        <p class="bracelet-card__tagline">{{ localizedContent().tagline }}</p>
        <p class="bracelet-card__material">
          {{ i18n.t('card.material_label') }}:
          {{ translateDetailValue(bracelet().details.material) }} /
          {{ translateDetailValue(bracelet().details.strap) }}
        </p>
        <div class="bracelet-card__actions">
          <a [routerLink]="['/bracelets', bracelet().slug]" class="btn btn--secondary">
            {{ i18n.t('card.btn.view') }}
          </a>
          <a
            [href]="messengerUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn--ghost"
          >
            {{ i18n.t('card.btn.order') }}
          </a>
        </div>
      </div>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BraceletCardComponent {
  readonly i18n = inject(I18nService);
  readonly bracelet = input.required<Bracelet>();
  readonly variant = input<'grid' | 'featured'>('grid');
  readonly messengerUrl = CONTACT.messenger;
  readonly heroImage = computed(() => this.bracelet().images[0]);
  readonly localizedContent = computed(
    () => this.bracelet().content[this.i18n.lang()] ?? this.bracelet().content.en,
  );

  translateDetailValue(value: string): string {
    const keyByValue: Record<string, string> = {
      'Sterling Silver': 'product.details.sterling_silver',
      'Leather or Rubber': 'product.details.leather_or_rubber',
    };

    return this.i18n.t(keyByValue[value] ?? value);
  }
}
