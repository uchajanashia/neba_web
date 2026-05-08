import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { I18nService } from './core/services/i18n.service';
import { MetaService } from './core/services/meta.service';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { PageLoaderComponent } from './shared/components/page-loader/page-loader.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, PageLoaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  private readonly doc = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly i18n = inject(I18nService);
  private readonly metaService = inject(MetaService);

  ngOnInit(): void {
    this.doc.documentElement.lang = this.i18n.lang();

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
}
