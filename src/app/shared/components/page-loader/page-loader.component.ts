import { isPlatformBrowser } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';

@Component({
  selector: 'app-page-loader',
  template: `
    @if (visible()) {
      <div class="page-loader" [@loaderFade] aria-label="Loading">
        <svg class="page-loader__logo" width="320" height="140" viewBox="0 0 320 140" aria-hidden="true">
          <text x="160" y="95" text-anchor="middle" class="page-loader__text-line">
            ნება
          </text>
        </svg>
      </div>
    }
  `,
  animations: [
    trigger('loaderFade', [
      transition(':leave', [animate('120ms ease-out', style({ opacity: 0 }))]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLoaderComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  readonly visible = signal(true);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.visible.set(false);
      return;
    }

    window.setTimeout(() => this.visible.set(false), 2500);
  }
}
