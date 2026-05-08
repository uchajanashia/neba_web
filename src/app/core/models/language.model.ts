export type LangCode = 'ka' | 'en' | 'ru';

export interface Language {
  code: LangCode;
  label: string;
  dir: 'ltr' | 'rtl';
}

export const LANGUAGES: Language[] = [
  { code: 'ka', label: 'ქართული', dir: 'ltr' },
  { code: 'en', label: 'English', dir: 'ltr' },
  { code: 'ru', label: 'Русский', dir: 'ltr' },
];

export const DEFAULT_LANG: LangCode = 'ka';
