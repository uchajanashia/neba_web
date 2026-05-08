import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { SYMBOLS } from '../../data/symbols.data';
import { I18nService } from '../../core/services/i18n.service';
import { MetaService } from '../../core/services/meta.service';
import { OrnamentDividerComponent } from '../../shared/components/ornament-divider/ornament-divider.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-symbols',
  imports: [OrnamentDividerComponent, ScrollRevealDirective],
  template: `
    <section class="page-hero">
      <div class="page-hero__bg"></div>
      <div class="container">
        <p class="label">{{ i18n.t('symbols.hero.label') }}</p>
        <h1>{{ i18n.t('symbols.hero.heading') }}</h1>
        <p>{{ i18n.t('symbols.hero.subtitle') }}</p>
      </div>
    </section>

    <section class="section symbols-list">
      <div class="container container--narrow">
        @for (symbol of symbols; track symbol.id; let i = $index) {
          <article class="symbol-panel" appScrollReveal [delay]="i * 120">
            <svg class="symbol-panel__icon" viewBox="0 0 120 120" aria-hidden="true">
              <use [attr.href]="symbol.id === 'cross' ? '#ornament-cross' : '#ornament-knot'" />
            </svg>
            <h2>{{ i18n.t(symbolTitleKey(symbol.id)) }}</h2>
            <p>{{ i18n.t(symbolTextKey(symbol.id)) }}</p>
          </article>
          @if (i < symbols.length - 1) {
            <app-ornament-divider variant="center" />
          }
        }
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SymbolsComponent implements OnInit {
  private readonly metaService = inject(MetaService);
  readonly i18n = inject(I18nService);

  readonly symbols = SYMBOLS;

  symbolTitleKey(id: string): string {
    const keyById: Record<string, string> = {
      'georgian-line': 'symbols.line.title',
      cross: 'symbols.cross.title',
      'nature-trace': 'symbols.nature.title',
    };

    return keyById[id] ?? id;
  }

  symbolTextKey(id: string): string {
    const keyById: Record<string, string> = {
      'georgian-line': 'symbols.line.text',
      cross: 'symbols.cross.text',
      'nature-trace': 'symbols.nature.text',
    };

    return keyById[id] ?? id;
  }

  ngOnInit(): void {
    this.metaService.updateMeta({
      title: 'Georgian Ornament & Symbols',
      description:
        'The meaning behind the Georgian ornamental lines, cross symbolism, and nature traces used in our silver bracelets.',
    });
  }
}
