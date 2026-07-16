export type LangCode = 'ka' | 'en' | 'ru';

export interface Language {
  code: LangCode;
  label: string;
  shortLabel: string;
  dir: 'ltr' | 'rtl';
}

export const LANGUAGES: Language[] = [
  { code: 'ka', label: 'ქართული', shortLabel: 'ქარ', dir: 'ltr' },
  { code: 'en', label: 'English', shortLabel: 'ENG', dir: 'ltr' },
  { code: 'ru', label: 'Русский', shortLabel: 'РУС', dir: 'ltr' },
];

export const DEFAULT_LANG: LangCode = 'ka';
