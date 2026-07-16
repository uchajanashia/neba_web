import { LANGUAGES } from './language.model';

describe('language navigation labels', () => {
  it('uses compact labels in each language script', () => {
    expect(LANGUAGES.map(({ code, shortLabel }) => ({ code, shortLabel }))).toEqual([
      { code: 'ka', shortLabel: 'ქარ' },
      { code: 'en', shortLabel: 'ENG' },
      { code: 'ru', shortLabel: 'РУС' },
    ]);
  });
});
