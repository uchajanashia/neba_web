import { NgOptimizedImage } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FEATURED_BRACELETS } from '../../data/bracelets.data';
import { CONTACT } from '../../core/models/contact.constants';
import { GsapService } from '../../core/services/gsap.service';
import { I18nService } from '../../core/services/i18n.service';
import { MetaService } from '../../core/services/meta.service';
import { BraceletCardComponent } from '../../shared/components/bracelet-card/bracelet-card.component';
import { CtaButtonsComponent } from '../../shared/components/cta-buttons/cta-buttons.component';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    NgOptimizedImage,
    BraceletCardComponent,
    CtaButtonsComponent,
    SectionTitleComponent,
    ScrollRevealDirective,
  ],
  template: `
    <section class="hero hero--home">
      <div class="hero__media">
        <img
          ngSrc="/assets/images/hero/stone-hero.jpg"
          alt="Georgian silver bracelet on a dark stone workshop surface"
          fill
          priority
          sizes="100vw"
        />
      </div>
      <div class="hero-ornament-bg" aria-hidden="true"></div>
      <div class="hero__overlay"></div>
      <div class="hero__content">
        <p class="label anim-fade-in-up">Georgian Silver</p>
        <h1 class="hero__title anim-fade-in-up anim-fade-in-up--delay-1">
          {{ i18n.t('home.hero.heading') }}
        </h1>
        <p class="hero__subtitle anim-fade-in-up anim-fade-in-up--delay-2">
          {{ i18n.t('home.hero.subheading') }}
        </p>
        <div class="hero__actions anim-fade-in-up anim-fade-in-up--delay-3">
          <a routerLink="/bracelets" class="btn btn--primary btn--lg btn--shine">
            {{ i18n.t('cta.view_collection') }}
          </a>
          <a
            [href]="messengerUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn--secondary btn--lg"
          >
            {{ i18n.t('nav.cta') }}
          </a>
        </div>
        <p class="hero__caption anim-fade-in-up anim-fade-in-up--delay-4">
          {{ i18n.t('home.hero.caption') }}
        </p>
      </div>
      <a
        href="#pillars"
        class="scroll-cue anim-bounce"
        [attr.aria-label]="i18n.t('home.scroll_aria')"
      >
        <span></span>
      </a>
    </section>

    <section id="pillars" class="section pillars">
      <div class="container">
        <p class="label section-kicker" appScrollReveal>{{ i18n.t('home.pillars.label') }}</p>
        <div class="pillars__grid">
          @for (pillar of pillars; track pillar.titleKey; let i = $index) {
            <article class="pillar" appScrollReveal [delay]="i * 140">
              <svg class="pillar__icon" viewBox="0 0 64 64" aria-hidden="true">
                <use [attr.href]="pillar.icon" />
              </svg>
              <h2>{{ i18n.t(pillar.titleKey) }}</h2>
              <p>{{ i18n.t(pillar.textKey) }}</p>
            </article>
          }
        </div>
      </div>
    </section>

    <section class="section section--surface">
      <div class="container">
        <app-section-title
          [title]="i18n.t('home.featured.heading')"
          [subtitle]="i18n.t('home.featured.subtitle')"
          align="center"
        />
        <div class="bracelet-grid bracelet-grid--featured">
          @for (bracelet of featuredBracelets; track bracelet.id) {
            <app-bracelet-card [bracelet]="bracelet" variant="featured" />
          }
        </div>
        <div class="section-action">
          <a routerLink="/bracelets" class="btn btn--secondary btn--lg">
            {{ i18n.t('home.featured.btn') }}
          </a>
        </div>
      </div>
    </section>

    <section class="section craft-teaser">
      <div class="container split">
        <div class="split__content" appScrollReveal>
          <p class="label">{{ i18n.t('home.craft.label') }}</p>
          <h2>{{ i18n.t('home.craft.heading') }}</h2>
          <p>{{ i18n.t('home.craft.text') }}</p>
          <a routerLink="/craft" class="btn btn--ghost">{{ i18n.t('home.craft.btn') }}</a>
        </div>
        <div class="photo-grid photo-grid--craft" appScrollReveal [delay]="180">
          @for (photo of craftPhotos; track photo.src) {
            <figure>
              <img [ngSrc]="photo.src" [alt]="photo.alt" fill sizes="(max-width: 760px) 90vw, 28vw" />
            </figure>
          }
        </div>
      </div>
    </section>

    <section class="section order-steps section--surface">
      <div class="container">
        <app-section-title [title]="i18n.t('home.order.heading')" align="center" />
        <div class="steps-grid">
          @for (step of orderSteps; track step.titleKey; let i = $index) {
            <article class="step" appScrollReveal [delay]="i * 140">
              <span>{{ i + 1 }}</span>
              <h3>{{ i18n.t(step.titleKey) }}</h3>
              <p>{{ i18n.t(step.textKey) }}</p>
            </article>
          }
        </div>
        <app-cta-buttons />
      </div>
    </section>

    <section class="final-cta">
      <div class="container container--narrow" appScrollReveal>
        <h2>{{ i18n.t('home.final_cta.heading') }}</h2>
        <p>{{ i18n.t('home.final_cta.subtitle') }}</p>
        <a routerLink="/bracelets" class="btn btn--primary btn--lg btn--shine">
          {{ i18n.t('cta.view_collection') }}
        </a>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly metaService = inject(MetaService);
  private readonly gsapService = inject(GsapService);
  readonly i18n = inject(I18nService);

  readonly messengerUrl = CONTACT.messenger;
  readonly featuredBracelets = FEATURED_BRACELETS;
  readonly pillars = [
    {
      icon: '#ornament-diamond',
      titleKey: 'home.pillars.tradition.title',
      textKey: 'home.pillars.tradition.text',
    },
    {
      icon: '#ornament-tools',
      titleKey: 'home.pillars.craft.title',
      textKey: 'home.pillars.craft.text',
    },
    {
      icon: '#ornament-heart',
      titleKey: 'home.pillars.love.title',
      textKey: 'home.pillars.love.text',
    },
  ];
  readonly craftPhotos = [
    {
      src: '/assets/images/craft/silver-detail.jpg',
      alt: 'Close-up silver detail on handcrafted Georgian bracelet',
    },
    {
      src: '/assets/images/craft/workbench.jpg',
      alt: 'Dark wooden work surface with silver craft tools',
    },
    {
      src: '/assets/images/craft/wrist-fitting.jpg',
      alt: 'Handcrafted Georgian silver bracelet fitted on wrist',
    },
  ];
  readonly orderSteps = [
    {
      titleKey: 'home.order.step1.title',
      textKey: 'home.order.step1.text',
    },
    {
      titleKey: 'home.order.step2.title',
      textKey: 'home.order.step2.text',
    },
    {
      titleKey: 'home.order.step3.title',
      textKey: 'home.order.step3.text',
    },
  ];

  ngOnInit(): void {
    this.metaService.updateMeta({
      title: 'Georgian Handcrafted Silver Bracelets',
      description:
        'Premium handcrafted silver bracelets inspired by Georgian ornament, tradition and nature. Order via Messenger or Instagram.',
      image: '/assets/images/hero/stone-hero.jpg',
    });
  }

  async ngAfterViewInit(): Promise<void> {
    await this.gsapService.init();
    const gsap = this.gsapService.instance;

    if (!gsap) {
      return;
    }

    gsap.to('.hero--home .hero__media', {
      scale: 1.055,
      duration: 12,
      ease: 'power1.inOut',
    });

    gsap.to('.hero--home .hero__media', {
      yPercent: 16,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero--home',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  ngOnDestroy(): void {
    this.gsapService.scrollTrigger?.getAll().forEach((trigger) => trigger.kill());
  }
}
