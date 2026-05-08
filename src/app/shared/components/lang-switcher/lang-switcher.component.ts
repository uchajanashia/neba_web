import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { LANGUAGES, type LangCode } from '../../../core/models/language.model';
import { I18nService } from '../../../core/services/i18n.service';

@Component({
  selector: 'app-lang-switcher',
  imports: [],
  template: `
    <div class="lang-switcher" [class.lang-switcher--open]="open()">
      <button
        class="lang-switcher__trigger"
        type="button"
        (click)="toggle()"
        [attr.aria-expanded]="open()"
        aria-haspopup="listbox"
        [attr.aria-label]="i18n.t('language.select')"
      >
        <span class="lang-switcher__current">{{ currentLabel() }}</span>
        <svg class="lang-switcher__arrow" viewBox="0 0 10 6" aria-hidden="true">
          <path
            d="M1 1l4 4 4-4"
            stroke="currentColor"
            stroke-width="1.5"
            fill="none"
            stroke-linecap="round"
          />
        </svg>
      </button>

      @if (open()) {
        <ul
          class="lang-switcher__dropdown"
          role="listbox"
          [attr.aria-label]="i18n.t('language.select')"
          (mouseleave)="open.set(false)"
        >
          @for (lang of languages; track lang.code) {
            <li
              class="lang-switcher__option"
              [class.lang-switcher__option--active]="i18n.lang() === lang.code"
              role="option"
              [attr.aria-selected]="i18n.lang() === lang.code"
              (click)="select(lang.code)"
            >
              {{ lang.label }}
            </li>
          }
        </ul>
      }
    </div>
  `,
  styles: [
    `
      .lang-switcher {
        position: relative;
        z-index: var(--z-dropdown);
      }

      .lang-switcher__trigger {
        display: flex;
        align-items: center;
        gap: var(--space-1);
        padding: var(--space-2) var(--space-3);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        background: transparent;
        color: var(--color-text-muted);
        font-family: var(--font-body);
        font-size: var(--text-xs);
        font-weight: var(--weight-medium);
        letter-spacing: var(--tracking-normal);
        cursor: pointer;
        transition:
          border-color 0.3s ease,
          color 0.3s ease;
      }

      .lang-switcher__trigger:hover {
        border-color: var(--color-border-hover);
        color: var(--color-text-primary);
      }

      .lang-switcher__arrow {
        width: 10px;
        height: 6px;
        flex-shrink: 0;
        transition: transform 0.3s ease;
      }

      .lang-switcher--open .lang-switcher__arrow {
        transform: rotate(180deg);
      }

      .lang-switcher__dropdown {
        position: absolute;
        top: calc(100% + var(--space-2));
        right: 0;
        min-width: 130px;
        padding: var(--space-2) 0;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        background: var(--color-bg-elevated);
        box-shadow: var(--shadow-lg);
        list-style: none;
        animation: fadeInDown 0.2s ease-out both;
      }

      .lang-switcher__option {
        padding: var(--space-2) var(--space-4);
        color: var(--color-text-muted);
        font-family: var(--font-body);
        font-size: var(--text-sm);
        cursor: pointer;
        transition:
          background 0.2s ease,
          color 0.2s ease;
      }

      .lang-switcher__option:hover {
        background: rgba(200, 195, 184, 0.06);
        color: var(--color-text-primary);
      }

      .lang-switcher__option--active {
        color: var(--color-gold);
        font-weight: var(--weight-medium);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LangSwitcherComponent {
  readonly i18n = inject(I18nService);
  readonly languages = LANGUAGES;
  readonly open = signal(false);
  readonly currentLabel = computed(
    () => LANGUAGES.find((language) => language.code === this.i18n.lang())?.label ?? 'ქართული',
  );

  select(code: LangCode): void {
    this.i18n.setLang(code);
    this.open.set(false);
  }

  toggle(): void {
    this.open.update((value) => !value);
  }
}
