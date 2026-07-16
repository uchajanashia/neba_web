import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

type Theme = 'dark' | 'light';

const STORAGE_KEY = 'bu-neba.theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly doc = inject(DOCUMENT);

  readonly theme = signal<Theme>('dark');

  init(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const stored = this.readStoredTheme();
    const initial: Theme = stored === 'light' || stored === 'dark' ? stored : 'dark';
    this.apply(initial);
  }

  toggle(): void {
    this.apply(this.theme() === 'dark' ? 'light' : 'dark');
  }

  private apply(next: Theme): void {
    this.theme.set(next);

    const root = this.doc.documentElement;
    if (next === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
    }

    if (isPlatformBrowser(this.platformId)) {
      this.writeStoredTheme(next);
    }
  }

  private readStoredTheme(): Theme | null {
    try {
      return typeof window.localStorage?.getItem === 'function'
        ? (window.localStorage.getItem(STORAGE_KEY) as Theme | null)
        : null;
    } catch {
      return null;
    }
  }

  private writeStoredTheme(theme: Theme): void {
    try {
      if (typeof window.localStorage?.setItem === 'function') {
        window.localStorage.setItem(STORAGE_KEY, theme);
      }
    } catch {
      // The visual theme still changes when storage is unavailable.
    }
  }
}
