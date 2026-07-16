import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CONTACT } from '../../core/models/contact.constants';
import { I18nService } from '../../core/services/i18n.service';
import { MetaService } from '../../core/services/meta.service';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-contact',
  imports: [ScrollRevealDirective],
  template: `
    <section class="page-hero">
      <div class="page-hero__bg"></div>
      <div class="container">
        <p class="label">{{ i18n.t('contact.hero.label') }}</p>
        <h1>{{ i18n.t('contact.hero.heading') }}</h1>
        <p>{{ i18n.t('contact.hero.subtitle') }}</p>
      </div>
    </section>

    <section class="section">
      <div class="container contact-grid">
        <article class="contact-card" appScrollReveal>
          <svg aria-hidden="true" class="icon icon--large"><use href="#icon-messenger" /></svg>
          <h2>{{ i18n.t('contact.messenger.title') }}</h2>
          <p>{{ i18n.t('contact.messenger.text') }}</p>
          <a
            [href]="contact.messenger"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn--primary"
          >
            {{ i18n.t('cta.messenger') }}
          </a>
        </article>
        <article class="contact-card" appScrollReveal [delay]="140">
          <svg aria-hidden="true" class="icon icon--large"><use href="#icon-instagram" /></svg>
          <h2>{{ i18n.t('contact.instagram.title') }}</h2>
          <p>{{ i18n.t('contact.instagram.text') }}</p>
          <a
            [href]="contact.instagram"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn--secondary"
          >
            {{ i18n.t('cta.instagram') }}
          </a>
        </article>
        <article class="contact-card" appScrollReveal [delay]="280">
          <svg aria-hidden="true" class="icon icon--large"><use href="#icon-whatsapp" /></svg>
          <h2>{{ i18n.t('contact.whatsapp.title') }}</h2>
          <p>{{ i18n.t('contact.whatsapp.text') }}</p>
          <a
            [href]="whatsappHref"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn--secondary"
          >
            {{ i18n.t('cta.whatsapp') }}
          </a>
        </article>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <p class="label" appScrollReveal>{{ i18n.t('contact.process.heading') }}</p>
        <div class="steps-grid">
          @for (step of orderSteps; track step.titleKey; let i = $index) {
            <article class="step" appScrollReveal [delay]="i * 120">
              <span>{{ i + 1 }}</span>
              <h3>{{ i18n.t(step.titleKey) }}</h3>
              <p>{{ i18n.t(step.textKey) }}</p>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent implements OnInit {
  private readonly metaService = inject(MetaService);
  readonly i18n = inject(I18nService);

  readonly contact = CONTACT;
  readonly whatsappHref = `https://wa.me/${CONTACT.whatsapp_number}`;
  readonly orderSteps = [
    {
      titleKey: 'contact.process.step1.title',
      textKey: 'contact.process.step1.text',
    },
    {
      titleKey: 'contact.process.step2.title',
      textKey: 'contact.process.step2.text',
    },
    {
      titleKey: 'contact.process.step3.title',
      textKey: 'contact.process.step3.text',
    },
  ];

  ngOnInit(): void {
    this.metaService.updateMeta({
      title: 'Order & Contact — bu-neba',
      description: 'Order your handcrafted silver bracelet via Messenger, Instagram, or WhatsApp.',
    });
  }

}
