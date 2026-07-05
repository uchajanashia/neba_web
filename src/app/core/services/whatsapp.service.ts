import { Injectable, inject } from '@angular/core';
import { CONTACT } from '../models/contact.constants';
import { SITE_URL } from './meta.service';
import { I18nService } from './i18n.service';
import type {
  Bracelet,
  BraceletStrapType,
  BraceletContentSize,
} from '../models/bracelet.model';

const STRAP_KEY: Record<BraceletStrapType, string> = {
  'leather-brown': 'variant.strap.leather_brown',
  'leather-black': 'variant.strap.leather_black',
  rubber: 'variant.strap.rubber',
};

const CONTENT_KEY: Record<BraceletContentSize, string> = {
  large: 'variant.content.large',
  small: 'variant.content.small',
};

@Injectable({ providedIn: 'root' })
export class WhatsAppService {
  private readonly i18n = inject(I18nService);

  buildOrderLink(
    bracelet: Bracelet,
    wristCm: number,
    selectedStrap: BraceletStrapType,
    selectedContentSize: BraceletContentSize | null,
  ): string {
    const cm = Number.isInteger(wristCm) ? String(wristCm) : wristCm.toFixed(1);
    const lines = [
      `🦉 ბუ-ნება — ${bracelet.name}`,
      `${this.i18n.t('variant.size.label')}: ${cm} cm`,
      `${this.i18n.t('variant.strap.label')}: ${this.i18n.t(STRAP_KEY[selectedStrap])}`,
    ];

    if (selectedContentSize) {
      lines.push(
        `${this.i18n.t('variant.content_size.label')}: ${this.i18n.t(CONTENT_KEY[selectedContentSize])}`,
      );
    }

    lines.push('', `${SITE_URL}/bracelets/${bracelet.slug}`);

    return this.toWaLink(lines.join('\n'));
  }

  buildGenericLink(): string {
    return this.toWaLink(`🦉 ბუ-ნება\n${SITE_URL}`);
  }

  private toWaLink(message: string): string {
    return `https://wa.me/${CONTACT.whatsapp_number}?text=${encodeURIComponent(message)}`;
  }
}
