import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
import { type LangCode } from '../../../core/models/language.model';
import { I18nService } from '../../../core/services/i18n.service';

const STORAGE_KEY = 'bu-neba.language-welcome-complete';

const LANGUAGE_CHOICES: ReadonlyArray<{
  code: LangCode;
  shortLabel: string;
  prompt: string;
}> = [
  { code: 'ka', shortLabel: 'ქარ', prompt: 'ქართული' },
  { code: 'en', shortLabel: 'ENG', prompt: 'English' },
  { code: 'ru', shortLabel: 'РУС', prompt: 'Русский' },
];

@Component({
  selector: 'app-language-welcome',
  imports: [],
  template: `
    @if (visible()) {
      <div class="language-welcome" role="presentation" (click)="dismiss()">
        <section
          class="language-welcome__dialog"
          role="dialog"
          aria-modal="true"
          [attr.aria-label]="
            phase() === 'choose'
              ? 'ენა · Language · Язык'
              : i18n.t('language.welcome.selected_heading')
          "
          aria-live="polite"
          (click)="$event.stopPropagation()"
        >
          <button
            type="button"
            class="language-welcome__close"
            [attr.aria-label]="i18n.t('language.welcome.close')"
            (click)="dismiss()"
          >
            <span aria-hidden="true">×</span>
          </button>

          @if (phase() === 'choose') {
            <div
              class="language-welcome__choices"
              role="group"
              aria-label="ენა · Language · Язык"
            >
              @for (choice of choices; track choice.code) {
                <button
                  type="button"
                  class="language-welcome__choice"
                  [attr.lang]="choice.code"
                  (click)="select(choice.code)"
                >
                  <span class="language-welcome__code">{{ choice.shortLabel }}</span>
                  <span>{{ choice.prompt }}</span>
                  <span class="language-welcome__arrow" aria-hidden="true">→</span>
                </button>
              }
            </div>
          } @else {
            <p class="label">{{ i18n.t('language.welcome.selected_label') }}</p>
            <h2>{{ i18n.t('language.welcome.selected_heading') }}</h2>
            <p class="language-welcome__intro">
              {{ i18n.t('language.welcome.navigation_hint') }}
            </p>
            <button type="button" class="btn btn--primary" (click)="complete()">
              {{ i18n.t('language.welcome.continue') }}
            </button>
          }
        </section>
      </div>
    }
  `,
  styles: `
    :host {
      position: relative;
      z-index: calc(var(--z-loader) - 1);
    }

    .language-welcome {
      position: fixed;
      inset: 0;
      z-index: calc(var(--z-loader) - 1);
      display: grid;
      place-items: start center;
      padding: clamp(5.5rem, 12vh, 8rem) var(--container-pad) var(--space-6);
      background: rgba(7, 8, 7, 0.68);
      backdrop-filter: blur(8px);
      animation: languageBackdropIn 240ms ease-out both;
    }

    .language-welcome__dialog {
      position: relative;
      width: min(29rem, 100%);
      overflow: hidden;
      padding: clamp(1.6rem, 5vw, 2.5rem);
      border: 1px solid var(--color-border-hover);
      border-radius: var(--radius-md);
      background:
        radial-gradient(circle at 8% 0%, rgba(183, 146, 80, 0.12), transparent 44%),
        var(--color-bg-elevated);
      box-shadow: 0 28px 80px rgba(0, 0, 0, 0.52);
      animation: languageDialogDrop 460ms cubic-bezier(0.2, 0.85, 0.3, 1) both;
    }

    .language-welcome__close {
      position: absolute;
      inset-block-start: var(--space-3);
      inset-inline-end: var(--space-3);
      display: grid;
      width: 2.75rem;
      height: 2.75rem;
      place-items: center;
      border: 0;
      border-radius: 50%;
      background: transparent;
      color: var(--color-text-muted);
      font-size: 1.5rem;
      cursor: pointer;
      transition: color 180ms ease, background-color 180ms ease;
    }

    .language-welcome__close:hover {
      background: var(--color-surface-soft);
      color: var(--color-text-primary);
    }

    h2 {
      max-width: 13ch;
      margin-block: var(--space-3);
      font-size: clamp(2rem, 7vw, 2.75rem);
    }

    .language-welcome__intro {
      max-width: 39ch;
      color: var(--color-text-muted);
    }

    .language-welcome__choices {
      display: grid;
      gap: var(--space-2);
      margin-block-start: var(--space-5);
    }

    .language-welcome__choice {
      display: grid;
      grid-template-columns: 2.75rem minmax(0, 1fr) auto;
      gap: var(--space-3);
      align-items: center;
      min-height: 3.6rem;
      padding: var(--space-2) var(--space-3);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-sm);
      background: transparent;
      color: var(--color-text-primary);
      font: inherit;
      text-align: start;
      cursor: pointer;
      transition:
        border-color 180ms ease,
        background-color 180ms ease,
        transform 180ms ease;
    }

    .language-welcome__choice:hover {
      border-color: rgba(183, 146, 80, 0.58);
      background: rgba(183, 146, 80, 0.07);
      transform: translateX(3px);
    }

    .language-welcome__code {
      display: grid;
      width: 2.55rem;
      height: 2.55rem;
      place-items: center;
      border: 1px solid var(--color-border-hover);
      border-radius: 50%;
      color: var(--color-gold);
      font-size: 0.63rem;
      font-weight: var(--weight-semi);
      letter-spacing: 0.02em;
    }

    .language-welcome__arrow {
      color: var(--color-text-faint);
      transition: transform 180ms ease, color 180ms ease;
    }

    .language-welcome__choice:hover .language-welcome__arrow {
      color: var(--color-gold);
      transform: translateX(2px);
    }

    .language-welcome .btn {
      margin-block-start: var(--space-7);
    }

    @keyframes languageBackdropIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes languageDialogDrop {
      from {
        opacity: 0;
        transform: translateY(-2rem) scale(0.98);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @media (max-width: 520px) {
      .language-welcome {
        place-items: center;
        padding-block: var(--space-5) calc(4.8rem + var(--space-5));
      }

      .language-welcome__dialog {
        max-height: calc(100svh - 7rem);
        overflow-y: auto;
      }

      .language-welcome .btn {
        width: 100%;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageWelcomeComponent implements OnInit, OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);
  readonly i18n = inject(I18nService);

  readonly choices = LANGUAGE_CHOICES;
  readonly visible = signal(false);
  readonly phase = signal<'choose' | 'confirmed'>('choose');
  private previouslyFocused: HTMLElement | null = null;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId) || this.wasCompleted()) {
      return;
    }

    this.previouslyFocused = this.document.activeElement as HTMLElement | null;
    this.visible.set(true);
    this.document.body.style.overflow = 'hidden';
    this.focusFirst('button.language-welcome__choice');
  }

  ngOnDestroy(): void {
    this.unlockPage();
  }

  select(code: LangCode): void {
    this.i18n.setLang(code);
    this.phase.set('confirmed');
    this.focusFirst('.language-welcome .btn');
  }

  complete(): void {
    this.rememberCompletion();
    this.hide();
  }

  dismiss(): void {
    this.rememberCompletion();
    this.hide();
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (!this.visible()) {
      return;
    }

    if (event.key === 'Escape') {
      this.dismiss();
      return;
    }

    if (event.key !== 'Tab') {
      return;
    }

    const focusable = Array.from(
      this.host.nativeElement.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
      ),
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (!first || !last) {
      event.preventDefault();
    } else if (event.shiftKey && this.document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && this.document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  private hide(): void {
    this.visible.set(false);
    this.unlockPage();
    this.previouslyFocused?.focus();
    this.previouslyFocused = null;
  }

  private unlockPage(): void {
    if (isPlatformBrowser(this.platformId) && this.document.body.style.overflow === 'hidden') {
      this.document.body.style.overflow = '';
    }
  }

  private focusFirst(selector: string): void {
    window.setTimeout(() => {
      this.host.nativeElement.querySelector<HTMLElement>(selector)?.focus();
    });
  }

  private wasCompleted(): boolean {
    try {
      return window.localStorage?.getItem(STORAGE_KEY) === '1';
    } catch {
      return false;
    }
  }

  private rememberCompletion(): void {
    try {
      window.localStorage?.setItem(STORAGE_KEY, '1');
    } catch {
      // The dialog still closes when storage is unavailable.
    }
  }
}
