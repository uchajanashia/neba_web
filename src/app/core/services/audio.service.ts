import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

const FALLBACK_EVENTS = [
  'pointerdown',
  'pointermove',
  'keydown',
  'touchstart',
  'scroll',
  'wheel',
] as const;

@Injectable({ providedIn: 'root' })
export class AudioService {
  private readonly platformId = inject(PLATFORM_ID);
  private audio?: HTMLAudioElement;
  private autoplayAttempted = false;
  private detachFallback?: () => void;

  readonly isPlaying = signal(false);

  private ensureAudio(): HTMLAudioElement {
    if (!this.audio) {
      this.audio = new Audio('/background_music.mp3');
      this.audio.loop = true;
      this.audio.volume = 0.01;
      this.audio.preload = 'auto';
    }
    return this.audio;
  }

  tryAutoplay(): void {
    if (!isPlatformBrowser(this.platformId) || this.autoplayAttempted) {
      return;
    }
    this.autoplayAttempted = true;
    const audio = this.ensureAudio();
    audio
      .play()
      .then(() => this.isPlaying.set(true))
      .catch(() => this.registerInteractionFallback());
  }

  private registerInteractionFallback(): void {
    if (this.detachFallback) {
      return;
    }
    const handler = () => {
      const audio = this.ensureAudio();
      audio
        .play()
        .then(() => {
          this.detachFallback?.();
          this.isPlaying.set(true);
        })
        .catch(() => undefined);
    };
    const cleanup = () => {
      for (const event of FALLBACK_EVENTS) {
        document.removeEventListener(event, handler);
      }
      this.detachFallback = undefined;
    };
    this.detachFallback = cleanup;
    for (const event of FALLBACK_EVENTS) {
      document.addEventListener(event, handler, { once: true, passive: true });
    }
  }

  toggle(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const audio = this.ensureAudio();

    if (this.isPlaying()) {
      audio.pause();
      this.isPlaying.set(false);
      return;
    }

    this.detachFallback?.();
    audio
      .play()
      .then(() => this.isPlaying.set(true))
      .catch(() => this.isPlaying.set(false));
  }
}
