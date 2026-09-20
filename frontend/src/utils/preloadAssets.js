// Utility to preload all core images into memory on initial load
export const PRELOAD_ASSETS = [
  '/assets/activities/alphabet_phonics.jpg',
  '/assets/activities/puzzle_game.jpg',
  '/assets/activities/drawing_game.jpg',
  '/assets/activities/tracing_game.jpg',
  '/assets/activities/picture_completion.jpg',
  '/assets/activities/memory_development.jpg',
  '/assets/activities/odd_one_out.jpg',
  '/assets/activities/good_habits.jpg',
  '/assets/activities/emotional_recognition.jpg',
  '/assets/activities/social_skills.jpg',
  '/assets/activities/count_match.jpg',
  '/assets/activities/shapes_colors.jpg',
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
