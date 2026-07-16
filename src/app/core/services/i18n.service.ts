import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { en, ka, ru } from '../../data/translations';
import type { TranslationMap } from '../../data/translations/translation.types';
import { DEFAULT_LANG, type LangCode } from '../models/language.model';

const TRANSLATIONS: Record<LangCode, TranslationMap> = { ka, en, ru };
const STORAGE_KEY = 'lang';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly currentLang = signal<LangCode>(this.getInitialLang());
  private readonly map = computed<TranslationMap>(() => TRANSLATIONS[this.currentLang()]);

  readonly lang = this.currentLang.asReadonly();

  t(key: string): string {
    return this.map()[key] ?? key;
  }

  setLang(code: LangCode): void {
    this.currentLang.set(code);

    if (isPlatformBrowser(this.platformId)) {
      this.writeStoredLang(code);
      document.documentElement.lang = code;
    }
  }

  private getInitialLang(): LangCode {
    if (isPlatformBrowser(this.platformId)) {
      const stored = this.readStoredLang();

      if (stored === 'ka' || stored === 'en' || stored === 'ru') {
        return stored;
      }
    }

    return DEFAULT_LANG;
  }

  private readStoredLang(): string | null {
    try {
      return typeof window.localStorage?.getItem === 'function'
        ? window.localStorage.getItem(STORAGE_KEY)
        : null;
    } catch {
      return null;
    }
  }

  private writeStoredLang(code: LangCode): void {
    try {
      if (typeof window.localStorage?.setItem === 'function') {
        window.localStorage.setItem(STORAGE_KEY, code);
      }
    } catch {
      // Language selection still works when storage is unavailable.
    }
  }
}
