import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AudioService {
  private readonly platformId = inject(PLATFORM_ID);
  private audio?: HTMLAudioElement;

  readonly isPlaying = signal(false);

  toggle(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.audio ??= new Audio('/assets/audio/ambient.wav');
    this.audio.loop = true;
    this.audio.volume = 0.15;

    if (this.isPlaying()) {
      this.audio.pause();
      this.isPlaying.set(false);
      return;
    }

    this.audio
      .play()
      .then(() => this.isPlaying.set(true))
      .catch(() => this.isPlaying.set(false));
  }
}
