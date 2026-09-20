// Utility to preload all core images into memory on initial load
export const PRELOAD_ASSETS = [
  '/assets/activities/alphabet_phonics.jpg',
  '/assets/activities/count_match.jpg',
  '/assets/activities/trace_draw.jpg',
  '/assets/activities/healthy_habits.jpg',
  '/assets/homepage/meadow_background.jpg',
  '/assets/homepage/user_avatar.jpg',
  '/assets/homepage/trophy.jpg',
  '/assets/homepage/parents_avatar.jpg',
  '/assets/star-mascot.jpg',
  '/assets/mascot-cursor-48.png'
];

export function preloadAllAssets() {
  if (typeof window === 'undefined') return Promise.resolve();

  return Promise.all(
    PRELOAD_ASSETS.map((src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(src);
        img.onerror = () => resolve(src); // don't block on error
      });
    })
  );
}
