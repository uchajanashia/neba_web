import { isPlatformBrowser } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';

@Component({
  selector: 'app-page-loader',
  template: `
    @if (visible()) {
      <div class="page-loader" [@loaderFade]>
        <img
          src="/assets/logo/favicon.png"
          alt=""
          aria-hidden="true"
          width="128"
          height="128"
          class="page-loader__owl"
        />
      </div>
    }
  `,
  animations: [
    trigger('loaderFade', [
      transition(':leave', [animate('650ms 150ms ease-out', style({ opacity: 0 }))]),
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

    window.setTimeout(() => this.visible.set(false), 1100);
  }
}
