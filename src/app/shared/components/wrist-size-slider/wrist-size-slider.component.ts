import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  PLATFORM_ID,
  computed,
  inject,
  input,
  model,
  signal,
  viewChild,
} from '@angular/core';

interface SliderTick {
  cm: number;
  percent: number;
  major: boolean;
}

@Component({
  selector: 'app-wrist-size-slider',
  imports: [],
  template: `
    <div class="wrist-slider" [class.wrist-slider--dragging]="dragging()">
      <div class="wrist-slider__readout" aria-hidden="true">
        <span class="wrist-slider__value">{{ display() }}</span>
        <span class="wrist-slider__unit">cm</span>
      </div>

      <div
        class="wrist-slider__track-wrap"
        #trackRef
        role="slider"
        tabindex="0"
        [attr.aria-label]="ariaLabel()"
        [attr.aria-valuemin]="min"
        [attr.aria-valuemax]="max"
        [attr.aria-valuenow]="value()"
        [attr.aria-valuetext]="display() + ' cm'"
        (pointerdown)="onPointerDown($event)"
        (keydown)="onKeyDown($event)"
      >
        <div class="wrist-slider__rail">
          <div class="wrist-slider__fill" [style.width.%]="percent()"></div>
        </div>

        <div class="wrist-slider__ticks">
          @for (tick of ticks; track tick.cm) {
            <span
              class="wrist-slider__tick"
              [class.wrist-slider__tick--major]="tick.major"
              [style.left.%]="tick.percent"
            ></span>
          }
        </div>

        <div class="wrist-slider__thumb" [style.left.%]="percent()">
          <span class="wrist-slider__thumb-ring"></span>
          <span class="wrist-slider__thumb-dot"></span>
        </div>
      </div>

      <div class="wrist-slider__scale" aria-hidden="true">
        @for (tick of majorTicks; track tick.cm) {
          <span class="wrist-slider__scale-mark" [style.left.%]="tick.percent">
            {{ tick.cm }}
          </span>
        }
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }

      .wrist-slider {
        display: grid;
        gap: var(--space-2);
        user-select: none;
      }

      .wrist-slider__readout {
        display: flex;
        align-items: baseline;
        justify-content: center;
        gap: 0.35rem;
        color: var(--color-gold);
        font-family: var(--font-display);
        line-height: 1;
        transition: color 0.3s ease;
      }

      .wrist-slider__value {
        font-size: clamp(1.9rem, 4.5vw, 2.4rem);
        font-style: italic;
        font-weight: var(--weight-light);
        letter-spacing: -0.01em;
      }

      .wrist-slider__unit {
        color: var(--color-text-faint);
        font-family: var(--font-body);
        font-size: var(--text-sm);
        font-weight: var(--weight-medium);
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }

      .wrist-slider__track-wrap {
        position: relative;
        height: 32px;
        padding-block: 14px;
        cursor: pointer;
        touch-action: none;
        outline: none;
      }

      .wrist-slider__track-wrap:focus-visible .wrist-slider__rail {
        box-shadow: 0 0 0 3px var(--color-focus-ring);
      }

      .wrist-slider__rail {
        position: relative;
        height: 4px;
        margin-block: auto;
        border-radius: 999px;
        background: var(--color-border);
        overflow: hidden;
        transition: box-shadow 0.25s ease;
      }

      .wrist-slider__fill {
        position: absolute;
        inset-block: 0;
        inset-inline-start: 0;
        background: linear-gradient(
          90deg,
          var(--color-gold-muted),
          var(--color-gold)
        );
        transition: width 0.12s ease-out;
      }

      .wrist-slider__ticks {
        position: absolute;
        inset: 0;
        pointer-events: none;
      }

      .wrist-slider__tick {
        position: absolute;
        top: 50%;
        width: 1px;
        height: 6px;
        background: var(--color-text-faint);
        opacity: 0.45;
        transform: translate(-50%, -50%);
        pointer-events: none;
      }

      .wrist-slider__tick--major {
        height: 10px;
        opacity: 0.7;
      }

      .wrist-slider__thumb {
        position: absolute;
        top: 50%;
        display: grid;
        place-items: center;
        width: 28px;
        height: 28px;
        transform: translate(-50%, -50%);
        pointer-events: none;
        transition: transform 0.18s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .wrist-slider__thumb-ring {
        position: absolute;
        inset: 0;
        border: 1.5px solid var(--color-gold);
        border-radius: 50%;
        background: var(--color-bg-card);
        box-shadow:
          0 1px 2px rgba(0, 0, 0, 0.15),
          0 4px 14px rgba(0, 0, 0, 0.18),
          0 0 0 0 var(--color-surface-gold-tint);
        transition:
          box-shadow 0.25s ease,
          background-color 0.3s ease,
          border-color 0.3s ease;
      }

      .wrist-slider__thumb-dot {
        position: relative;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: var(--color-gold);
        opacity: 0;
        transform: scale(0.4);
        transition:
          opacity 0.25s ease,
          transform 0.25s ease;
      }

      .wrist-slider--dragging .wrist-slider__thumb,
      .wrist-slider__track-wrap:hover .wrist-slider__thumb {
        transform: translate(-50%, -50%) scale(1.12);
      }

      .wrist-slider--dragging .wrist-slider__thumb-ring,
      .wrist-slider__track-wrap:hover .wrist-slider__thumb-ring {
        box-shadow:
          0 2px 4px rgba(0, 0, 0, 0.2),
          0 8px 22px rgba(0, 0, 0, 0.25),
          0 0 0 8px var(--color-surface-gold-tint);
      }

      .wrist-slider--dragging .wrist-slider__thumb-dot,
      .wrist-slider__track-wrap:hover .wrist-slider__thumb-dot {
        opacity: 1;
        transform: scale(1);
      }

      .wrist-slider__scale {
        position: relative;
        height: 1.1rem;
      }

      .wrist-slider__scale-mark {
        position: absolute;
        top: 0;
        color: var(--color-text-faint);
        font-family: var(--font-body);
        font-size: var(--text-xs);
        letter-spacing: 0.06em;
        transform: translateX(-50%);
        pointer-events: none;
      }

      @media (max-width: 760px) {
        .wrist-slider__track-wrap {
          height: 40px;
          padding-block: 18px;
        }

        .wrist-slider__thumb {
          width: 30px;
          height: 30px;
        }

        .wrist-slider__rail {
          height: 5px;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WristSizeSliderComponent {
  private readonly platformId = inject(PLATFORM_ID);

  readonly value = model.required<number>();
  readonly ariaLabel = input<string>('Wrist size');

  readonly min = 14;
  readonly max = 25;
  readonly step = 0.5;

  readonly trackRef = viewChild<ElementRef<HTMLDivElement>>('trackRef');
  readonly dragging = signal(false);
  private activePointerId: number | null = null;

  readonly percent = computed(() => {
    const range = this.max - this.min;
    return Math.max(0, Math.min(100, ((this.value() - this.min) / range) * 100));
  });

  readonly display = computed(() => {
    const v = this.value();
    return Number.isInteger(v) ? String(v) : v.toFixed(1);
  });

  readonly ticks: SliderTick[] = this.buildTicks();

  readonly majorTicks = this.ticks.filter((tick) => tick.major);

  onPointerDown(event: PointerEvent): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const wrap = this.trackRef()?.nativeElement;
    if (!wrap) {
      return;
    }
    event.preventDefault();
    this.activePointerId = event.pointerId;
    this.dragging.set(true);
    try {
      wrap.setPointerCapture(event.pointerId);
    } catch {
      // ignore — some browsers/devices reject capture
    }
    this.updateFromPointer(event, wrap);
    wrap.focus({ preventScroll: true });
  }

  @HostListener('window:pointermove', ['$event'])
  onPointerMove(event: PointerEvent): void {
    if (!this.dragging() || event.pointerId !== this.activePointerId) {
      return;
    }
    const wrap = this.trackRef()?.nativeElement;
    if (!wrap) {
      return;
    }
    this.updateFromPointer(event, wrap);
  }

  @HostListener('window:pointerup', ['$event'])
  @HostListener('window:pointercancel', ['$event'])
  onPointerUp(event: PointerEvent): void {
    if (event.pointerId !== this.activePointerId) {
      return;
    }
    const wrap = this.trackRef()?.nativeElement;
    try {
      wrap?.releasePointerCapture(event.pointerId);
    } catch {
      // ignore
    }
    this.activePointerId = null;
    this.dragging.set(false);
  }

  onKeyDown(event: KeyboardEvent): void {
    const big = event.shiftKey ? 2 : 1;
    let next: number | null = null;

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        next = this.value() - this.step * big;
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        next = this.value() + this.step * big;
        break;
      case 'Home':
        next = this.min;
        break;
      case 'End':
        next = this.max;
        break;
      case 'PageDown':
        next = this.value() - 1;
        break;
      case 'PageUp':
        next = this.value() + 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    this.commit(next);
  }

  private updateFromPointer(event: PointerEvent, wrap: HTMLDivElement): void {
    const rect = wrap.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, x / rect.width));
    const raw = this.min + ratio * (this.max - this.min);
    this.commit(raw);
  }

  private commit(raw: number): void {
    const snapped = Math.round(raw / this.step) * this.step;
    const clamped = Math.max(this.min, Math.min(this.max, snapped));
    const rounded = Math.round(clamped * 10) / 10;
    if (rounded !== this.value()) {
      this.value.set(rounded);
    }
  }

  private buildTicks(): SliderTick[] {
    const ticks: SliderTick[] = [];
    const range = this.max - this.min;
    for (let cm = this.min; cm <= this.max; cm += 1) {
      ticks.push({
        cm,
        percent: ((cm - this.min) / range) * 100,
        major: cm % 2 === 0,
      });
    }
    return ticks;
  }
}
