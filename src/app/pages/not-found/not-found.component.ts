import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/services/i18n.service';
import { MetaService } from '../../core/services/meta.service';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <section class="not-found">
      <div class="not-found__glow" aria-hidden="true"></div>
      <div class="container container--narrow not-found__content">
        <span class="not-found__code" aria-hidden="true">404</span>
        <p class="label">{{ i18n.t('not_found.eyebrow') }}</p>
        <h1>{{ i18n.t('not_found.heading') }}</h1>
        <p class="not-found__text">{{ i18n.t('not_found.text') }}</p>
        <div class="not-found__actions">
          <a routerLink="/" class="btn btn--primary">{{ i18n.t('not_found.home') }}</a>
          <a routerLink="/bracelets" class="btn btn--secondary">
            {{ i18n.t('not_found.collection') }}
          </a>
        </div>
      </div>
    </section>
  `,
  styles: `
    .not-found {
      position: relative;
      display: grid;
      min-height: min(780px, 100svh);
      place-items: center;
      overflow: hidden;
      padding-block: 9rem 6rem;
      isolation: isolate;
    }

    .not-found__glow {
      position: absolute;
      z-index: -1;
      width: min(42rem, 90vw);
      aspect-ratio: 1;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(176, 138, 74, 0.16), transparent 66%);
      filter: blur(18px);
    }

    .not-found__content {
      display: grid;
      justify-items: center;
      text-align: center;
    }

    .not-found__code {
      margin-block-end: -1.5rem;
      color: transparent;
      font-family: var(--font-display);
      font-size: clamp(7rem, 24vw, 15rem);
      font-weight: 300;
      line-height: 0.75;
      -webkit-text-stroke: 1px rgba(200, 195, 184, 0.18);
      user-select: none;
    }

    h1 {
      max-width: 13ch;
      margin-block: var(--space-4);
    }

    .not-found__text {
      max-width: 58ch;
      color: var(--color-text-muted);
    }

    .not-found__actions {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: var(--space-3);
      margin-block-start: var(--space-8);
    }

    @media (max-width: 520px) {
      .not-found__actions,
      .not-found__actions .btn {
        width: 100%;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent implements OnInit {
  private readonly metaService = inject(MetaService);
  readonly i18n = inject(I18nService);

  ngOnInit(): void {
    this.metaService.updateMeta({
      title: '404 — bu-neba',
      description: 'The requested page could not be found.',
    });
  }
}
