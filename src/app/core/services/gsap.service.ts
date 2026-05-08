import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GsapService {
  private readonly platformId = inject(PLATFORM_ID);
  private gsapInstance?: typeof import('gsap').gsap;
  private scrollTriggerPlugin?: typeof import('gsap/ScrollTrigger').ScrollTrigger;

  async init(): Promise<void> {
    if (!isPlatformBrowser(this.platformId) || this.gsapInstance) {
      return;
    }

    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);
    this.gsapInstance = gsap;
    this.scrollTriggerPlugin = ScrollTrigger;
  }

  get instance(): typeof import('gsap').gsap | undefined {
    return this.gsapInstance;
  }

  get scrollTrigger(): typeof import('gsap/ScrollTrigger').ScrollTrigger | undefined {
    return this.scrollTriggerPlugin;
  }
}
