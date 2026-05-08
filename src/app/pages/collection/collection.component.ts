import { ChangeDetectionStrategy, Component, OnInit, computed, signal, inject } from '@angular/core';
import { BRACELETS } from '../../data/bracelets.data';
import { COLLECTIONS } from '../../data/collections.data';
import { BraceletCardComponent } from '../../shared/components/bracelet-card/bracelet-card.component';
import { CtaButtonsComponent } from '../../shared/components/cta-buttons/cta-buttons.component';
import { I18nService } from '../../core/services/i18n.service';
import { MetaService } from '../../core/services/meta.service';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

type FilterKey = 'all' | 'silver' | 'leather' | 'rubber' | 'large' | 'small';

interface FilterOption {
  key: FilterKey;
  labelKey: string;
}

@Component({
  selector: 'app-collection',
  imports: [BraceletCardComponent, CtaButtonsComponent, ScrollRevealDirective],
  template: `
    <section class="page-hero collection-hero">
      <div class="page-hero__bg"></div>
      <div class="container">
        <p class="label">{{ i18n.t('nav.collection') }}</p>
        <h1>{{ i18n.t('collection.heading') }}</h1>
        <p>{{ i18n.t('collection.subtitle') }}</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="collection-tabs" role="tablist" aria-label="Product collections" appScrollReveal>
          @for (col of collections; track col.id) {
            <button
              type="button"
              class="collection-tab"
              [class.collection-tab--active]="activeCollection() === col.id"
              [class.collection-tab--unavailable]="!col.available"
              [disabled]="!col.available"
              (click)="col.available && setCollection(col.id)"
              role="tab"
              [attr.aria-selected]="activeCollection() === col.id"
            >
              {{ collectionLabel(col.id) }}
              @if (!col.available) {
                <span class="collection-tab__badge">{{ i18n.t('collection.soon') }}</span>
              }
            </button>
          }
        </div>



        <div class="bracelet-grid collection-grid">
          @for (bracelet of filteredBracelets(); track bracelet.id; let i = $index) {
            <app-bracelet-card [bracelet]="bracelet" appScrollReveal [delay]="i * 120" />
          }
        </div>
      </div>
    </section>

    <section class="section final-cta final-cta--compact">
      <div class="container container--narrow">
        <h2>{{ i18n.t('collection.help.heading') }}</h2>
        <p>{{ i18n.t('collection.help.text') }}</p>
        <app-cta-buttons />
      </div>
    </section>
  `,
  styles: [
    `
      .collection-hero {
        min-height: unset;
        padding-block: clamp(5rem, 8vw, 7rem);
      }

      .collection-tabs {
        display: flex;
        gap: var(--space-3);
        margin-bottom: var(--space-8);
        overflow-x: auto;
        border-bottom: 1px solid var(--color-border);
      }

      .collection-tab {
        position: relative;
        flex: 0 0 auto;
        margin-bottom: -1px;
        padding: var(--space-3) var(--space-6);
        border: 0;
        border-bottom: 2px solid transparent;
        color: var(--color-text-muted);
        background: transparent;
        font-family: var(--font-body);
        font-size: var(--text-sm);
        font-weight: var(--weight-medium);
        letter-spacing: var(--tracking-normal);
        text-transform: uppercase;
        cursor: pointer;
        transition:
          color 0.3s ease,
          border-color 0.3s ease;
      }

      .collection-tab--active {
        border-bottom-color: var(--color-gold);
        color: var(--color-text-primary);
      }

      .collection-tab--unavailable {
        opacity: 0.4;
        cursor: not-allowed;
      }

      .collection-tab__badge {
        display: inline-block;
        margin-left: var(--space-2);
        padding: 2px 6px;
        border: 1px solid rgba(176, 138, 74, 0.3);
        border-radius: 20px;
        background: rgba(176, 138, 74, 0.15);
        color: var(--color-gold);
        font-size: 0.6rem;
        letter-spacing: var(--tracking-normal);
        vertical-align: middle;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionComponent implements OnInit {
  private readonly metaService = inject(MetaService);
  readonly i18n = inject(I18nService);

  readonly filters: FilterOption[] = [
    { key: 'all', labelKey: 'collection.filter.all' },
    { key: 'silver', labelKey: 'collection.filter.silver' },
    { key: 'leather', labelKey: 'collection.filter.leather' },
    { key: 'rubber', labelKey: 'collection.filter.rubber' },
    { key: 'large', labelKey: 'collection.filter.large' },
    { key: 'small', labelKey: 'collection.filter.small' },
  ];
  readonly collections = COLLECTIONS;
  readonly activeCollection = signal<string>('bracelets');
  readonly activeFilter = signal<FilterKey>('all');
  readonly filteredBracelets = computed(() => {
    const filter = this.activeFilter();

    if (filter === 'all' || filter === 'silver') {
      return BRACELETS;
    }

    if (filter === 'leather') {
      return BRACELETS.filter((bracelet) => bracelet.materials !== 'rubber');
    }

    if (filter === 'rubber') {
      return BRACELETS.filter((bracelet) => bracelet.materials !== 'leather');
    }

    return BRACELETS.filter((bracelet) => bracelet.sizes.includes(filter));
  });

  ngOnInit(): void {
    this.metaService.updateMeta({
      title: 'Silver Bracelet Collection - Georgian Handcrafted',
      description:
        'Browse handcrafted silver bracelets with Georgian ornamental designs and natural materials.',
    });
  }

  setFilter(filter: FilterKey): void {
    this.activeFilter.set(filter);
  }

  setCollection(id: string): void {
    this.activeCollection.set(id);
  }

  collectionLabel(id: string): string {
    return this.i18n.t(`collection.tab.${id}`);
  }
}
