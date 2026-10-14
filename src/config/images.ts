/**
 * Photo slots. Replace these with real photos of the venue for the best result:
 * put files in /public/photos/ and use paths like './photos/table.jpg'.
 *
 * Every slot has designed fallback art, so an empty string ('') is safe:
 * the illustrated scene is shown instead of a photo.
 */
export const images = {
  /** Hero background photo. Empty = the rendered cinematic table scene. */
  hero: '',
  table: '',
  crew: '',
  cafeMain: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=70',
  cafeDrink: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=70',
  cafeBite: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=70',
} as const;
