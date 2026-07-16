import { imageSrcset, thumbnailSrc } from './image-srcset';

describe('responsive image helpers', () => {
  it('builds WebP width candidates', () => {
    expect(imageSrcset('/photo.webp', 1200)).toBe(
      '/photo-480.webp 480w, /photo-800.webp 800w, /photo.webp 1200w',
    );
  });

  it('uses a dedicated thumbnail without changing non-WebP assets', () => {
    expect(thumbnailSrc('/photo.webp')).toBe('/photo.thumb.webp');
    expect(thumbnailSrc('/social.jpg')).toBe('/social.jpg');
  });
});
