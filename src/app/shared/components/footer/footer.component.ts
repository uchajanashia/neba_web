import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CONTACT } from '../../../core/models/contact.constants';
import { NAV_ITEMS } from '../../../core/models/navigation.model';
import { I18nService } from '../../../core/services/i18n.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, NgOptimizedImage],
  template: `
    <footer class="footer" role="contentinfo">
      <div class="ornament-line"></div>
      <div class="footer__inner">
        <div class="footer__brand">
          <a routerLink="/" aria-label="ნება — მთავარი გვერდი">
            <img
              ngSrc="/assets/logo/logo-full.png"
              alt="ნება"
              width="200"
              height="200"
              class="footer__logo"
            />
          </a>
          <p class="footer__tagline">{{ i18n.t('footer.tagline') }}</p>
        </div>

        <nav class="footer__nav" [attr.aria-label]="i18n.t('footer.nav_aria')">
          @for (item of navItems; track item.route) {
            <a [routerLink]="item.route">{{ navLabel(item.route) }}</a>
          }
        </nav>

        <div class="footer__contact">
          <p class="label">{{ i18n.t('footer.contact') }}</p>
          <a [href]="contact.messenger" target="_blank" rel="noopener noreferrer">
            Facebook Messenger
          </a>
          <a [href]="contact.instagram" target="_blank" rel="noopener noreferrer">
            Instagram {{ contact.instagram_handle }}
          </a>
        </div>
      </div>
      <div class="footer__bottom">
        <p>&copy; {{ year }} Georgian Silver. {{ i18n.t('footer.rights') }}</p>
      </div>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  readonly i18n = inject(I18nService);
  readonly navItems = NAV_ITEMS;
  readonly contact = CONTACT;
  readonly year = new Date().getFullYear();

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
