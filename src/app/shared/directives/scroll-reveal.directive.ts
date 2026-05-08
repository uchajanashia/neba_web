import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  inject,
  input,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appScrollReveal]',
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;

  readonly delay = input(0);
  readonly distance = input(32);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const element = this.el.nativeElement;
    element.style.opacity = '0';
    element.style.transform = `translateY(${this.distance()}px)`;
    element.style.transition = `opacity 850ms ease ${this.delay()}ms, transform 850ms ease ${this.delay()}ms`;

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            this.observer?.unobserve(element);
          }
        }
      },
      { threshold: 0.14 },
    );

    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
