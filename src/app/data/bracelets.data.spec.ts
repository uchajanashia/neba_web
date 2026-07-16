import { BRACELETS, getBraceletBySlug, getRelatedBracelets } from './bracelets.data';

describe('bracelet catalogue', () => {
  it('uses unique identifiers and slugs', () => {
    expect(new Set(BRACELETS.map(({ id }) => id)).size).toBe(BRACELETS.length);
    expect(new Set(BRACELETS.map(({ slug }) => slug)).size).toBe(BRACELETS.length);
  });

  it('keeps five unique WebP gallery images for every bracelet', () => {
    for (const bracelet of BRACELETS) {
      expect(bracelet.images).toHaveLength(5);
      expect(new Set(bracelet.images.map(({ src }) => src)).size).toBe(5);
      expect(bracelet.images.every(({ src }) => src.endsWith('.webp'))).toBe(true);
    }
  });

  it('contains only real related products', () => {
    for (const bracelet of BRACELETS) {
      expect(getBraceletBySlug(bracelet.slug)).toBe(bracelet);
      expect(getRelatedBracelets(bracelet)).toHaveLength(bracelet.relatedSlugs.length);
      expect(bracelet.relatedSlugs).not.toContain(bracelet.slug);
    }
  });

  it('does not retain obsolete S/M/L variant keys', () => {
    for (const variant of BRACELETS.flatMap(({ variantImages = [] }) => variantImages)) {
      expect(Object.keys(variant.key).sort()).toEqual(['contentSize', 'strap']);
    }
  });
});
