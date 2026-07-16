import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { I18nService } from './core/services/i18n.service';
import { MetaService } from './core/services/meta.service';
import { ThemeService } from './core/services/theme.service';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { VideoModalComponent } from './shared/components/video-modal/video-modal.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, VideoModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  private readonly doc = inject(DOCUMENT);
  private readonly router = inject(Router);
  readonly i18n = inject(I18nService);
  private readonly metaService = inject(MetaService);
  private readonly themeService = inject(ThemeService);

  ngOnInit(): void {
    this.doc.documentElement.lang = this.i18n.lang();
    this.themeService.init();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.metaService.resetPageImage();
      }

      if (event instanceof NavigationEnd) {
        let route = this.router.routerState.snapshot.root;

        while (route.firstChild) {
          route = route.firstChild;
        }

        const description = route?.data?.['description'];

        this.metaService.updateMeta({
          title: this.doc.title,
          description: typeof description === 'string' ? description : undefined,
          url: event.urlAfterRedirects,
        });

        const main = this.doc.getElementById('main-content');
        main?.focus({ preventScroll: true });
      }
    });
  }
}
