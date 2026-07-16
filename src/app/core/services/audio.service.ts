import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

const FALLBACK_EVENTS = ['pointerdown', 'keydown', 'touchstart'] as const;

@Injectable({ providedIn: 'root' })
export class AudioService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly doc = inject(DOCUMENT);
  private audio?: HTMLAudioElement;
  private autoplayAttempted = false;
  private userToggled = false;
  private detachFallback?: () => void;

  readonly isPlaying = signal(false);

  private ensureAudio(): HTMLAudioElement {
    if (!this.audio) {
      this.audio = new Audio('/new_sound.mp3');
      this.audio.loop = true;
      this.audio.preload = 'auto';
      this.audio.addEventListener('play', () => this.isPlaying.set(true));
      this.audio.addEventListener('pause', () => this.isPlaying.set(false));
      this.audio.addEventListener('error', () => this.isPlaying.set(false));
    }
    return this.audio;
  }

  tryAutoplay(): void {
    if (!isPlatformBrowser(this.platformId) || this.autoplayAttempted || this.userToggled) {
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
        this.doc.removeEventListener(event, handler);
      }
      this.detachFallback = undefined;
    };
    this.detachFallback = cleanup;
    for (const event of FALLBACK_EVENTS) {
      this.doc.addEventListener(event, handler, { passive: true });
    }
  }

  toggle(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const audio = this.ensureAudio();
    this.userToggled = true;

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
