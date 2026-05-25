import { isPlatformBrowser } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';

@Component({
  selector: 'app-page-loader',
  template: `
    @if (visible()) {
      <div class="page-loader" [@loaderFade] aria-label="Loading">
        <div class="page-loader__stage">
          <img
            class="page-loader__owl"
            src="/assets/logo/owl.svg"
            alt=""
            aria-hidden="true"
            draggable="false"
          />
          <svg class="page-loader__logo" width="300" height="170" viewBox="0 0 300 170" aria-hidden="true">
            <text x="150" y="120" text-anchor="middle" class="page-loader__text-line">
              ნება
            </text>
          </svg>
          <svg
            class="page-loader__branch"
            viewBox="0 0 400 50"
            preserveAspectRatio="none"
            overflow="visible"
            aria-hidden="true"
          >
            <path
              class="page-loader__branch-line"
              pathLength="1"
              d="M 0 32 C 50 22 110 38 170 30 C 220 24 280 38 340 28 C 360 25 380 34 400 30"
            />
            <path class="page-loader__branch-line page-loader__branch-line--twig" pathLength="1" d="M 70 30 C 74 22 78 16 80 12" />
            <path class="page-loader__branch-line page-loader__branch-line--twig" pathLength="1" d="M 150 28 C 156 20 160 14 162 10" />
            <path class="page-loader__branch-line page-loader__branch-line--twig" pathLength="1" d="M 230 30 C 236 22 240 16 242 12" />
            <path class="page-loader__branch-line page-loader__branch-line--twig" pathLength="1" d="M 310 28 C 316 20 320 14 322 10" />
            <path class="page-loader__branch-line page-loader__branch-line--twig" pathLength="1" d="M 370 30 C 374 22 378 16 380 12" />
            <path class="page-loader__branch-line page-loader__branch-line--leaf" pathLength="1" d="M 80 12 C 73 10 70 4 76 2 C 82 0 86 8 80 12 Z" />
            <path class="page-loader__branch-line page-loader__branch-line--leaf" pathLength="1" d="M 162 10 C 156 7 156 0 162 0 C 168 0 170 8 162 10 Z" />
            <path class="page-loader__branch-line page-loader__branch-line--leaf" pathLength="1" d="M 242 12 C 248 10 252 2 246 0 C 240 -2 236 6 242 12 Z" />
            <path class="page-loader__branch-line page-loader__branch-line--leaf" pathLength="1" d="M 322 10 C 316 7 316 0 322 0 C 328 0 330 8 322 10 Z" />
            <path class="page-loader__branch-line page-loader__branch-line--leaf" pathLength="1" d="M 380 12 C 374 10 372 2 378 0 C 384 -2 388 8 380 12 Z" />
          </svg>
        </div>
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

    window.setTimeout(() => this.visible.set(false), 4000);
  }
}
