import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { AudioService } from './core/services/audio.service';
import { I18nService } from './core/services/i18n.service';
import { MetaService } from './core/services/meta.service';
import { ThemeService } from './core/services/theme.service';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { PageLoaderComponent } from './shared/components/page-loader/page-loader.component';
import { VideoModalComponent } from './shared/components/video-modal/video-modal.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, PageLoaderComponent, VideoModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit, AfterViewInit {
  private readonly doc = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly i18n = inject(I18nService);
  private readonly metaService = inject(MetaService);
  private readonly audioService = inject(AudioService);
  private readonly themeService = inject(ThemeService);
  private readonly platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    this.doc.documentElement.lang = this.i18n.lang();
    this.themeService.init();

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        const route = this.router.routerState.snapshot.root.firstChild;
        const description = route?.data?.['description'];

        if (typeof description === 'string') {
          this.metaService.updateDescription(description);
        }
      });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.setTimeout(() => this.audioService.tryAutoplay(), 4000);
    }
  }
}
