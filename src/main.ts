import { bootstrapApplication } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { inject as injectVercelAnalytics } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';
import { filter, firstValueFrom, take } from 'rxjs';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { AudioService } from './app/core/services/audio.service';

const splashStartedAt = performance.now();
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const minimumSplashMs = reducedMotion ? 150 : 2600;

function nextPaint(): Promise<void> {
  return new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
}

async function releaseSplash(): Promise<void> {
  const remaining = Math.max(0, minimumSplashMs - (performance.now() - splashStartedAt));
  if (remaining > 0) {
    await new Promise((resolve) => window.setTimeout(resolve, remaining));
  }

  const root = document.querySelector('app-root');
  const loader = document.getElementById('app-shell-loader');
  root?.removeAttribute('inert');
  root?.setAttribute('aria-busy', 'false');
  document.documentElement.classList.remove('app-loading');
  loader?.classList.add('page-loader--leaving');
  window.setTimeout(() => loader?.remove(), reducedMotion ? 0 : 180);
}

bootstrapApplication(App, appConfig)
  .then(async (appRef) => {
    const router = appRef.injector.get(Router);
    if (!router.navigated) {
      await firstValueFrom(
        router.events.pipe(
          filter((event): event is NavigationEnd => event instanceof NavigationEnd),
          take(1),
        ),
      );
    }

    await nextPaint();
    await releaseSplash();
    appRef.injector.get(AudioService).tryAutoplay();

    const loadInsights = () => {
      injectVercelAnalytics();
      injectSpeedInsights();
    };
    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(loadInsights);
    } else {
      globalThis.setTimeout(loadInsights, 0);
    }
  })
  .catch((err) => {
    console.error(err);
    void releaseSplash();
  });
