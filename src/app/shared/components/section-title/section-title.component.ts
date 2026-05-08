import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { OrnamentDividerComponent } from '../ornament-divider/ornament-divider.component';

@Component({
  selector: 'app-section-title',
  imports: [OrnamentDividerComponent, ScrollRevealDirective],
  template: `
    <div class="section-title" [class]="'section-title section-title--' + align()">
      <h2 class="section-title__heading" appScrollReveal>{{ title() }}</h2>
      @if (subtitle()) {
        <p class="section-title__subtitle" appScrollReveal [delay]="120">{{ subtitle() }}</p>
      }
      @if (showDivider()) {
        <app-ornament-divider [variant]="align() === 'center' ? 'center' : 'short'" />
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionTitleComponent {
  readonly title = input.required<string>();
  readonly subtitle = input('');
  readonly align = input<'left' | 'center'>('left');
  readonly showDivider = input(true);
}
