import { isPlatformBrowser } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  PLATFORM_ID,
  computed,
  effect,
  inject,
  viewChild,
} from '@angular/core';
import { I18nService } from '../../../core/services/i18n.service';
import { VideoModalService } from '../../../core/services/video-modal.service';

@Component({
  selector: 'app-video-modal',
  imports: [],
  template: `
    @if (isOpen()) {
      <div
        class="video-modal"
        role="dialog"
        aria-modal="true"
        [attr.aria-label]="i18n.t('detail.size.video.cta')"
        [@modalFade]
        (click)="onBackdropClick()"
      >
        <div #stage class="video-modal__stage" [@stageScale] (click)="$event.stopPropagation()">
          <button
            #closeButton
            type="button"
            class="video-modal__close"
            (click)="close()"
            [attr.aria-label]="i18n.t('modal.close')"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <video
            class="video-modal__player"
            [src]="src() || ''"
            controls
            autoplay
            playsinline
            preload="metadata"
            controlsList="nodownload"
          ></video>
        </div>
      </div>
    }
  `,
  styles: [
    `
      :host {
        position: fixed;
        inset: 0;
        z-index: 1000;
        pointer-events: none;
      }

      :host:has(.video-modal) {
        pointer-events: auto;
      }

      .video-modal {
        position: fixed;
        inset: 0;
        display: grid;
        place-items: center;
        padding: var(--space-5);
        background: rgba(8, 8, 7, 0.78);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        cursor: pointer;
      }

      .video-modal__stage {
        position: relative;
        width: min(960px, 92vw);
        max-height: 84vh;
        cursor: default;
        border-radius: var(--radius-md);
        overflow: hidden;
        box-shadow:
          0 24px 64px rgba(0, 0, 0, 0.5),
          0 0 0 1px var(--color-surface-gold-tint);
      }

      .video-modal__player {
        display: block;
        width: 100%;
        max-height: 84vh;
        background: #000;
        border-radius: var(--radius-md);
      }

      .video-modal__close {
        position: absolute;
        top: var(--space-3);
        right: var(--space-3);
        z-index: 2;
        display: grid;
        place-items: center;
        width: 2.4rem;
        height: 2.4rem;
        border: 1px solid rgba(245, 243, 237, 0.22);
        border-radius: 50%;
        background: rgba(11, 11, 9, 0.62);
        color: rgba(245, 243, 237, 0.92);
        backdrop-filter: blur(10px);
        cursor: pointer;
        transition:
          background-color 0.3s ease,
          border-color 0.3s ease,
          color 0.3s ease,
          transform 0.2s ease;
      }

      .video-modal__close:hover {
        border-color: var(--color-gold);
        background: rgba(11, 11, 9, 0.82);
        color: var(--color-gold);
        transform: scale(1.06);
      }

      .video-modal__close svg {
        width: 1.05rem;
        height: 1.05rem;
      }

      @media (max-width: 760px) {
        .video-modal {
          padding: var(--space-3);
        }

        .video-modal__stage {
          width: 100%;
          max-height: 78vh;
        }

        .video-modal__player {
          max-height: 78vh;
        }

        .video-modal__close {
          width: 2.2rem;
          height: 2.2rem;
        }
      }
    `,
  ],
  animations: [
    trigger('modalFade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('220ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('180ms ease-in', style({ opacity: 0 })),
      ]),
    ]),
    trigger('stageScale', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.94)' }),
        animate('260ms cubic-bezier(0.2, 0.85, 0.3, 1)', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('180ms ease-in', style({ opacity: 0, transform: 'scale(0.96)' })),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoModalComponent {
  private readonly modalService = inject(VideoModalService);
  private readonly platformId = inject(PLATFORM_ID);
  readonly i18n = inject(I18nService);

  readonly src = this.modalService.currentSrc;
  readonly isOpen = computed(() => this.src() !== null);
  readonly closeButton = viewChild<ElementRef<HTMLButtonElement>>('closeButton');
  readonly stage = viewChild<ElementRef<HTMLElement>>('stage');
  private previouslyFocused: HTMLElement | null = null;
  private wasOpen = false;

  constructor() {
    effect(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }
      const open = this.isOpen();
      const closeButton = this.closeButton()?.nativeElement;
      const body = document.body;

      if (open) {
        if (!this.wasOpen) {
          this.previouslyFocused = document.activeElement as HTMLElement | null;
        }

        body.dataset['scrollY'] = String(window.scrollY);
        body.style.overflow = 'hidden';

        if (closeButton) {
          queueMicrotask(() => closeButton.focus());
        }
      } else if (this.wasOpen) {
        body.style.overflow = '';
        this.previouslyFocused?.focus();
        this.previouslyFocused = null;
      }

      this.wasOpen = open;
    });
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (!this.isOpen()) {
      return;
    }

    if (event.key === 'Escape') {
      this.close();
      return;
    }

    if (event.key !== 'Tab') {
      return;
    }

    const focusable = Array.from(
      this.stage()?.nativeElement.querySelectorAll<HTMLElement>(
        'button:not([disabled]), video[controls], [href], [tabindex]:not([tabindex="-1"])',
      ) ?? [],
    );

    if (focusable.length === 0) {
      event.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  onBackdropClick(): void {
    this.close();
  }

  close(): void {
    this.modalService.close();
  }
}
