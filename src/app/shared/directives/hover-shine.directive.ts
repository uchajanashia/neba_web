import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, HostListener, PLATFORM_ID, inject } from '@angular/core';

@Directive({
  selector: '[appHoverShine]',
  host: { class: 'hover-shine-host' },
})
export class HoverShineDirective {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);

  @HostListener('mouseenter')
  onEnter(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.el.nativeElement.classList.add('hover-shine-active');
    }
  }

  @HostListener('mouseleave')
  onLeave(): void {
    this.el.nativeElement.classList.remove('hover-shine-active');
  }
}
