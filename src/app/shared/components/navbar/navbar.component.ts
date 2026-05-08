import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CONTACT } from '../../../core/models/contact.constants';
import { NAV_ITEMS } from '../../../core/models/navigation.model';
import { AudioService } from '../../../core/services/audio.service';
import { I18nService } from '../../../core/services/i18n.service';
import { LangSwitcherComponent } from '../lang-switcher/lang-switcher.component';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, NgOptimizedImage, LangSwitcherComponent],
  template: `
    <header class="navbar" [class.navbar--scrolled]="isScrolled()" role="banner">
      <div class="navbar__inner">
        <a routerLink="/" class="navbar__logo" aria-label="ნება — მთავარი გვერდი">
          <img
            ngSrc="/assets/logo/logo-icon.png"
            alt="ნება"
            width="1476"
            height="620"
            class="navbar__logo-img"
            priority
          />
        </a>

        <nav class="navbar__nav" [attr.aria-label]="i18n.t('nav.main_aria')">
          <ul class="navbar__nav-list">
            @for (item of navItems; track item.route) {
              <li>
                <a
                  [routerLink]="item.route"
                  routerLinkActive="navbar__nav-link--active"
                  [routerLinkActiveOptions]="{ exact: item.exact ?? false }"
                  class="navbar__nav-link"
                >
                  {{ navLabel(item.route) }}
                </a>
              </li>
            }
          </ul>
        </nav>

        <div class="navbar__actions">
          <button
            class="navbar__audio-btn"
            type="button"
            (click)="toggleAudio()"
            [attr.aria-label]="audioOn() ? i18n.t('nav.audio.mute') : i18n.t('nav.audio.enable')"
            [class.navbar__audio-btn--on]="audioOn()"
          >
            <svg aria-hidden="true" class="icon">
              <use [attr.href]="audioOn() ? '#icon-sound-on' : '#icon-sound-off'" />
            </svg>
          </button>

          <app-lang-switcher />

          <a
            [href]="messengerUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn--primary navbar__cta"
          >
            {{ i18n.t('nav.cta') }}
          </a>

          <button
            class="navbar__hamburger"
            type="button"
            (click)="toggleMenu()"
            [attr.aria-expanded]="menuOpen()"
            aria-controls="mobile-menu"
            [attr.aria-label]="i18n.t('nav.toggle')"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      @if (menuOpen()) {
        <nav id="mobile-menu" class="navbar__mobile" [@mobileMenuAnimation]>
          @for (item of navItems; track item.route) {
            <a [routerLink]="item.route" class="navbar__mobile-link" (click)="closeMenu()">
              {{ navLabel(item.route) }}
            </a>
          }
        </nav>
      }
    </header>

    <div class="mobile-sticky-cta">
      <a [href]="messengerUrl" target="_blank" rel="noopener noreferrer" class="btn btn--primary">
        {{ i18n.t('cta.messenger') }}
      </a>
    </div>
  `,
  animations: [
    trigger('mobileMenuAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-12px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('220ms ease-in', style({ opacity: 0, transform: 'translateY(-8px)' })),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly audioService = inject(AudioService);
  readonly i18n = inject(I18nService);

  readonly navItems = NAV_ITEMS;
  readonly messengerUrl = CONTACT.messenger;
  readonly isScrolled = signal(false);
  readonly menuOpen = signal(false);
  readonly audioOn = this.audioService.isPlaying;

  @HostListener('window:scroll')
  onScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isScrolled.set(window.scrollY > 40);
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isScrolled.set(window.scrollY > 40);
    }
  }

  toggleMenu(): void {
    this.menuOpen.update((value) => !value);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  toggleAudio(): void {
    this.audioService.toggle();
  }

  navLabel(route: string): string {
    const keyByRoute: Record<string, string> = {
      '/': 'nav.home',
      '/bracelets': 'nav.collection',
      '/craft': 'nav.craft',
      '/about': 'nav.about',
      '/guide': 'nav.guide',
      '/symbols': 'nav.symbols',
      '/contact': 'nav.contact',
    };

    return this.i18n.t(keyByRoute[route] ?? route);
  }
}
