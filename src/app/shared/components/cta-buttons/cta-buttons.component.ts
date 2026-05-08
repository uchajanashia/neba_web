import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { CONTACT } from '../../../core/models/contact.constants';
import { I18nService } from '../../../core/services/i18n.service';

@Component({
  selector: 'app-cta-buttons',
  template: `
    <div class="cta-buttons" [class]="'cta-buttons cta-buttons--' + layout()">
      <a
        [href]="contact.messenger"
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn--primary btn--lg btn--shine"
      >
        <svg aria-hidden="true" class="icon"><use href="#icon-messenger" /></svg>
        {{ i18n.t('cta.messenger') }}
      </a>
      <a
        [href]="contact.instagram"
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn--secondary btn--lg"
      >
        <svg aria-hidden="true" class="icon"><use href="#icon-instagram" /></svg>
        {{ i18n.t('cta.instagram') }}
      </a>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CtaButtonsComponent {
  readonly i18n = inject(I18nService);
  readonly layout = input<'row' | 'column'>('row');
  readonly contact = CONTACT;
}
