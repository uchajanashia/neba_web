import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-ornament-divider',
  template: `
    <div
      class="ornament-divider"
      [class]="'ornament-divider ornament-divider--' + variant()"
      aria-hidden="true"
    >
      @if (variant() === 'center') {
        <span class="ornament-divider__symbol">✦</span>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrnamentDividerComponent {
  readonly variant = input<'full' | 'center' | 'short'>('full');
}
