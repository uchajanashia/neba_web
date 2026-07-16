import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LANGUAGES, type LangCode } from '../../../core/models/language.model';
import { I18nService } from '../../../core/services/i18n.service';

@Component({
  selector: 'app-lang-switcher',
  imports: [],
  template: `
    <div class="lang-switcher" role="group" [attr.aria-label]="i18n.t('language.select')">
      @for (lang of languages; track lang.code) {
        <button
          type="button"
          class="lang-switcher__option"
          [class.lang-switcher__option--active]="i18n.lang() === lang.code"
          [attr.aria-pressed]="i18n.lang() === lang.code"
          [attr.aria-label]="lang.label"
          [attr.title]="lang.label"
          [attr.lang]="lang.code"
          (click)="select(lang.code)"
        >
          {{ lang.shortLabel }}
        </button>
      }
    </div>
  `,
  styles: [
    `
      .lang-switcher {
        display: flex;
        align-items: center;
        gap: 0.35rem;
      }

      .lang-switcher__option {
        display: grid;
        width: 2.75rem;
        height: 2.75rem;
        flex: 0 0 2.75rem;
        place-items: center;
        padding: 0;
        border: 1px solid var(--color-border);
        border-radius: 50%;
        background: var(--color-icon-btn-bg);
        color: var(--color-text-muted);
        font-family: var(--font-body);
        font-size: 0.62rem;
        font-weight: var(--weight-medium);
        letter-spacing: 0.02em;
        cursor: pointer;
        transition:
          border-color 180ms ease,
          background-color 180ms ease,
          color 180ms ease,
          transform 180ms ease;
      }

      .lang-switcher__option:hover {
        border-color: var(--color-border-hover);
        color: var(--color-text-primary);
        transform: translateY(-1px);
      }

      .lang-switcher__option--active {
        border-color: rgba(183, 146, 80, 0.7);
        background: rgba(183, 146, 80, 0.12);
        color: var(--color-gold);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LangSwitcherComponent {
  readonly i18n = inject(I18nService);
  readonly languages = LANGUAGES;

  select(code: LangCode): void {
    this.i18n.setLang(code);
  }
}
