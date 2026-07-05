import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class VideoModalService {
  readonly currentSrc = signal<string | null>(null);

  open(src: string): void {
    this.currentSrc.set(src);
  }

  close(): void {
    this.currentSrc.set(null);
  }
}
