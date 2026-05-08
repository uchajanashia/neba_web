import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CONTACT } from '../../core/models/contact.constants';
import { I18nService } from '../../core/services/i18n.service';
import { MetaService } from '../../core/services/meta.service';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, ScrollRevealDirective],
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
      </div>
    </section>

    <section class="section section--surface">
      <div class="container form-layout">
        <div appScrollReveal>
          <p class="label">{{ i18n.t('contact.form.heading') }}</p>
          <h2>{{ i18n.t('contact.form.intro.heading') }}</h2>
          <p>{{ i18n.t('contact.form.intro.text') }}</p>
        </div>

        <form class="contact-form" [formGroup]="form" (ngSubmit)="submit()" appScrollReveal [delay]="140">
          <label>
            {{ i18n.t('contact.form.name') }}
            <input
              type="text"
              formControlName="fullName"
              [placeholder]="i18n.t('contact.form.placeholder.name')"
            />
          </label>
          <label>
            {{ i18n.t('contact.form.phone') }}
            <input
              type="tel"
              formControlName="phone"
              [placeholder]="i18n.t('contact.form.placeholder.phone')"
            />
          </label>
          <label>
            {{ i18n.t('contact.form.bracelet') }}
            <input
              type="text"
              formControlName="preferredBracelet"
              [placeholder]="i18n.t('contact.form.placeholder.bracelet')"
            />
          </label>
          <label>
            {{ i18n.t('contact.form.wrist') }}
            <input
              type="number"
              formControlName="wristSize"
              [placeholder]="i18n.t('contact.form.placeholder.wrist')"
            />
          </label>
          <fieldset>
            <legend>{{ i18n.t('contact.form.material') }}</legend>
            @for (material of materials; track material) {
              <label>
                <input type="radio" formControlName="material" [value]="material" />
                {{ materialLabel(material) }}
              </label>
            }
          </fieldset>
          <label class="contact-form__full">
            {{ i18n.t('contact.form.notes') }}
            <textarea
              formControlName="notes"
              rows="5"
              [placeholder]="i18n.t('contact.form.placeholder.notes')"
            ></textarea>
          </label>
          <button type="submit" class="btn btn--primary btn--lg">
            {{ i18n.t('contact.form.submit') }}
          </button>
          @if (submittedMessage()) {
            <p class="form-success">{{ submittedMessage() }}</p>
          }
        </form>
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
  private readonly fb = inject(FormBuilder);
  private readonly metaService = inject(MetaService);
  private readonly platformId = inject(PLATFORM_ID);
  readonly i18n = inject(I18nService);

  readonly contact = CONTACT;
  readonly materials = ['Leather', 'Rubber', 'Not sure'];
  readonly submittedMessage = signal('');
  readonly form = this.fb.nonNullable.group({
    fullName: ['', Validators.required],
    phone: [''],
    preferredBracelet: [''],
    wristSize: [''],
    material: ['Not sure'],
    notes: [''],
  });
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
      title: 'Order & Contact - Georgian Silver Bracelets',
      description: 'Order your handcrafted silver bracelet via Messenger or Instagram.',
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const message = [
      this.i18n.t('contact.message.title'),
      `${this.i18n.t('contact.message.name')}: ${value.fullName}`,
      `${this.i18n.t('contact.message.phone')}: ${value.phone || '-'}`,
      `${this.i18n.t('contact.message.bracelet')}: ${value.preferredBracelet || '-'}`,
      `${this.i18n.t('contact.message.wrist')}: ${value.wristSize || '-'} cm`,
      `${this.i18n.t('contact.message.material')}: ${this.materialLabel(value.material)}`,
      `${this.i18n.t('contact.message.notes')}: ${value.notes || '-'}`,
    ].join('\n');

    this.submittedMessage.set(this.i18n.t('contact.form.success'));

    if (isPlatformBrowser(this.platformId)) {
      window.open(this.contact.messenger, '_blank', 'noopener,noreferrer');
      void navigator.clipboard?.writeText(message).catch(() => undefined);
    }
  }

  materialLabel(material: string): string {
    const keyByMaterial: Record<string, string> = {
      Leather: 'contact.form.material.leather',
      Rubber: 'contact.form.material.rubber',
      'Not sure': 'contact.form.material.not_sure',
    };

    return this.i18n.t(keyByMaterial[material] ?? material);
  }
}
