export function imageSrcset(src: string, originalWidth: number): string {
  if (!src.endsWith('.webp')) {
    return `${src} ${originalWidth}w`;
  }

  const variant = (width: number) => src.replace(/\.webp$/, `-${width}.webp`);
  return `${variant(480)} 480w, ${variant(800)} 800w, ${src} ${originalWidth}w`;
}

export function thumbnailSrc(src: string): string {
  return src.endsWith('.webp') ? src.replace(/\.webp$/, '.thumb.webp') : src;
}
