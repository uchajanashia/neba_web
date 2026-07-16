import { TestBed } from '@angular/core/testing';
import { I18nService } from '../../../core/services/i18n.service';
import { LanguageWelcomeComponent } from './language-welcome.component';

describe('LanguageWelcomeComponent', () => {
  const storage = new Map<string, string>();

  beforeEach(async () => {
    storage.clear();
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: {
        getItem: (key: string) => storage.get(key) ?? null,
        setItem: (key: string, value: string) => storage.set(key, value),
      },
    });

    await TestBed.configureTestingModule({
      imports: [LanguageWelcomeComponent],
    }).compileComponents();
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('shows on the first visit and confirms in the selected language', () => {
    const fixture = TestBed.createComponent(LanguageWelcomeComponent);
    fixture.detectChanges();

    const component = fixture.componentInstance;
    expect(component.visible()).toBe(true);

    component.select('en');
    fixture.detectChanges();

    expect(TestBed.inject(I18nService).lang()).toBe('en');
    expect(fixture.nativeElement.textContent).toContain(
      'You can change the language from the navigation at any time.',
    );

    component.complete();
    expect(component.visible()).toBe(false);
    expect(storage.get('bu-neba.language-welcome-complete')).toBe('1');
  });

  it('stays hidden after the welcome step has been completed', () => {
    storage.set('bu-neba.language-welcome-complete', '1');

    const fixture = TestBed.createComponent(LanguageWelcomeComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance.visible()).toBe(false);
    expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeNull();
  });
});
