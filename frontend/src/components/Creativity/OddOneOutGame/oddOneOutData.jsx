import React from 'react';

// Cute, scalable vector illustration dictionary for Odd One Out
export const ODD_ICONS = {
  // Animals
  duck: {
    name: 'Duckling',
    category: 'animals',
    color: '#facc15',
    render: () => (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <ellipse cx="50" cy="65" rx="28" ry="20" fill="#facc15" />
        <circle cx="62" cy="40" r="18" fill="#facc15" />
        <ellipse cx="78" cy="43" rx="9" ry="5" fill="#fb923c" />
        <circle cx="66" cy="36" r="3.5" fill="#1e293b" />
        <circle cx="67.5" cy="34.5" r="1.2" fill="#ffffff" />
        <ellipse cx="44" cy="64" rx="14" ry="10" fill="#fde047" />
        <path d="M22 65 Q16 60 20 54 Q25 58 26 64 Z" fill="#eab308" />
      </svg>
    )
  },
  frog: {
    name: 'Little Frog',
    category: 'animals',
    color: '#4ade80',
    render: () => (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <ellipse cx="50" cy="60" rx="32" ry="24" fill="#4ade80" />
        <ellipse cx="50" cy="64" rx="20" ry="14" fill="#bbf7d0" />
        <circle cx="34" cy="38" r="12" fill="#4ade80" />
        <circle cx="66" cy="38" r="12" fill="#4ade80" />
        <circle cx="34" cy="37" r="7" fill="#ffffff" />
        <circle cx="66" cy="37" r="7" fill="#ffffff" />
        <circle cx="35" cy="37" r="3.5" fill="#0f172a" />
        <circle cx="67" cy="37" r="3.5" fill="#0f172a" />
        <path d="M38 60 Q50 68 62 60" stroke="#15803d" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* Cute crown */}
        <polygon points="42,26 46,18 50,23 54,18 58,26" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />
      </svg>
    )
  },
  cat: {
    name: 'Kitten',
    category: 'animals',
    color: '#fb923c',
    render: () => (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <circle cx="50" cy="54" r="26" fill="#fb923c" />
        <polygon points="30,34 35,16 46,30" fill="#fb923c" />
        <polygon points="70,34 65,16 54,30" fill="#fb923c" />
        <polygon points="33,32 37,20 44,29" fill="#fbcfe8" />
        <polygon points="67,32 63,20 56,29" fill="#fbcfe8" />
        <circle cx="40" cy="50" r="4" fill="#0f172a" />
        <circle cx="60" cy="50" r="4" fill="#0f172a" />
        <circle cx="41.5" cy="48.5" r="1.5" fill="#ffffff" />
        <circle cx="61.5" cy="48.5" r="1.5" fill="#ffffff" />
        <polygon points="47,57 53,57 50,60" fill="#f43f5e" />
        <path d="M44 63 Q50 67 56 63" stroke="#9a3412" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <line x1="28" y1="54" x2="16" y2="52" stroke="#fed7aa" strokeWidth="2" strokeLinecap="round" />
        <line x1="28" y1="58" x2="16" y2="60" stroke="#fed7aa" strokeWidth="2" strokeLinecap="round" />
        <line x1="72" y1="54" x2="84" y2="52" stroke="#fed7aa" strokeWidth="2" strokeLinecap="round" />
        <line x1="72" y1="58" x2="84" y2="60" stroke="#fed7aa" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  },
  puppy: {
    name: 'Puppy',
    category: 'animals',
    color: '#d97706',
    render: () => (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <ellipse cx="50" cy="55" rx="27" ry="24" fill="#f59e0b" />
        <ellipse cx="26" cy="48" rx="8" ry="16" fill="#b45309" transform="rotate(-15 26 48)" />
        <ellipse cx="74" cy="48" rx="8" ry="16" fill="#b45309" transform="rotate(15 74 48)" />
        <circle cx="41" cy="50" r="4.5" fill="#0f172a" />
        <circle cx="59" cy="50" r="4.5" fill="#0f172a" />
        <circle cx="42.5" cy="48.5" r="1.5" fill="#ffffff" />
        <circle cx="60.5" cy="48.5" r="1.5" fill="#ffffff" />
        <ellipse cx="50" cy="58" rx="5" ry="3.5" fill="#78350f" />
        <path d="M46 64 Q50 69 54 64" stroke="#78350f" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M50 66 Q50 72 47 74" stroke="#f43f5e" strokeWidth="4" strokeLinecap="round" />
      </svg>
    )
  },
  bird: {
    name: 'Little Bird',
    category: 'animals',
    color: '#38bdf8',
    render: () => (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <circle cx="50" cy="50" r="24" fill="#38bdf8" />
        <polygon points="68,48 85,53 68,58" fill="#f97316" />
        <circle cx="58" cy="43" r="3.8" fill="#0f172a" />
        <circle cx="59.5" cy="41.5" r="1.2" fill="#ffffff" />
        <ellipse cx="40" cy="54" rx="14" ry="9" fill="#0284c7" />
        <circle cx="45" cy="62" r="12" fill="#bae6fd" />
      </svg>
    )
  },
  fish: {
    name: 'Fish',
    category: 'animals',
    color: '#ec4899',
    render: () => (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <ellipse cx="52" cy="50" rx="26" ry="18" fill="#ec4899" />
        <polygon points="26,50 12,36 12,64" fill="#f472b6" />
        <circle cx="64" cy="45" r="3.5" fill="#0f172a" />
        <circle cx="65.5" cy="43.5" r="1.2" fill="#ffffff" />
        <path d="M72 52 Q76 54 72 56" stroke="#be185d" strokeWidth="2" fill="none" />
        <path d="M44 42 Q40 50 44 58" stroke="#fbcfe8" strokeWidth="2.5" fill="none" />
      </svg>
    )
  },

  // Fruits & Foods
  apple: {
    name: 'Red Apple',
    category: 'fruits',
    color: '#ef4444',
    render: () => (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <circle cx="42" cy="56" r="22" fill="#ef4444" />
        <circle cx="58" cy="56" r="22" fill="#ef4444" />
        <ellipse cx="50" cy="66" rx="22" ry="14" fill="#ef4444" />
        <path d="M50 36 Q52 24 58 20" stroke="#78350f" strokeWidth="4" strokeLinecap="round" fill="none" />
        <ellipse cx="60" cy="26" rx="7" ry="4" fill="#22c55e" transform="rotate(-25 60 26)" />
        <ellipse cx="38" cy="46" rx="5" ry="9" fill="#fca5a5" opacity="0.6" transform="rotate(-20 38 46)" />
      </svg>
    )
  },
  banana: {
    name: 'Banana',
    category: 'fruits',
    color: '#eab308',
    render: () => (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <path
          d="M26 30 C 40 45, 60 70, 78 68 C 65 78, 38 68, 22 40 Z"
          fill="#facc15"
          stroke="#ca8a04"
          strokeWidth="2"
        />
        <circle cx="25" cy="31" r="3" fill="#854d0e" />
        <circle cx="78" cy="68" r="2.5" fill="#854d0e" />
      </svg>
    )
  },
  strawberry: {
    name: 'Strawberry',
    category: 'fruits',
    color: '#f43f5e',
    render: () => (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <path
          d="M32 38 C 22 55, 36 78, 50 82 C 64 78, 78 55, 68 38 C 60 30, 40 30, 32 38 Z"
          fill="#f43f5e"
        />
        <circle cx="44" cy="46" r="1.8" fill="#fef08a" />
        <circle cx="56" cy="46" r="1.8" fill="#fef08a" />
        <circle cx="50" cy="56" r="1.8" fill="#fef08a" />
        <circle cx="42" cy="64" r="1.8" fill="#fef08a" />
        <circle cx="58" cy="64" r="1.8" fill="#fef08a" />
        <polygon points="50,26 44,34 50,32 56,34" fill="#22c55e" />
        <polygon points="38,30 46,36 38,36" fill="#16a34a" />
        <polygon points="62,30 54,36 62,36" fill="#16a34a" />
      </svg>
    )
  },
  carrot: {
    name: 'Carrot',
    category: 'fruits',
    color: '#f97316',
    render: () => (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <polygon points="40,32 60,32 52,84 48,84" fill="#f97316" />
        <ellipse cx="50" cy="32" rx="10" ry="4" fill="#ea580c" />
        <line x1="44" y1="45" x2="52" y2="45" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" />
        <line x1="48" y1="58" x2="56" y2="58" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" />
        <line x1="46" y1="70" x2="52" y2="70" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" />
        <path d="M50 30 Q46 16 38 18" stroke="#16a34a" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M50 30 Q50 14 50 14" stroke="#22c55e" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M50 30 Q54 16 62 18" stroke="#16a34a" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      </svg>
    )
  },
  watermelon: {
    name: 'Watermelon',
    category: 'fruits',
    color: '#ef4444',
    render: () => (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <path d="M20 50 A30 30 0 0 0 80 50 Z" fill="#ef4444" />
        <path d="M18 50 A32 32 0 0 0 82 50" stroke="#22c55e" strokeWidth="5" fill="none" />
        <path d="M19 50 A31 31 0 0 0 81 50" stroke="#bbf7d0" strokeWidth="2" fill="none" />
        <circle cx="38" cy="56" r="2" fill="#0f172a" />
        <circle cx="50" cy="62" r="2" fill="#0f172a" />
        <circle cx="62" cy="56" r="2" fill="#0f172a" />
      </svg>
    )
  },

  // Vehicles
  car: {
    name: 'Car',
    category: 'vehicles',
    color: '#3b82f6',
    render: () => (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <rect x="20" y="48" width="60" height="20" rx="8" fill="#3b82f6" />
        <path d="M30 48 Q36 34 50 34 Q64 34 70 48 Z" fill="#60a5fa" />
        <circle cx="35" cy="68" r="9" fill="#1e293b" />
        <circle cx="35" cy="68" r="4" fill="#94a3b8" />
        <circle cx="65" cy="68" r="9" fill="#1e293b" />
        <circle cx="65" cy="68" r="4" fill="#94a3b8" />
        <circle cx="76" cy="55" r="3" fill="#facc15" />
      </svg>
    )
  },
  airplane: {
    name: 'Airplane',
    category: 'vehicles',
    color: '#8b5cf6',
    render: () => (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <ellipse cx="50" cy="50" rx="34" ry="10" fill="#8b5cf6" />
        <polygon points="46,50 36,22 52,50" fill="#a78bfa" />
        <polygon points="46,50 36,78 52,50" fill="#a78bfa" />
        <polygon points="20,50 14,36 26,50" fill="#7c3aed" />
        <circle cx="74" cy="50" r="3.5" fill="#38bdf8" />
        <circle cx="64" cy="50" r="2.5" fill="#bae6fd" />
        <circle cx="56" cy="50" r="2.5" fill="#bae6fd" />
      </svg>
    )
  },
  boat: {
    name: 'Sailboat',
    category: 'vehicles',
    color: '#06b6d4',
    render: () => (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <path d="M22 62 L78 62 L70 76 L30 76 Z" fill="#0284c7" />
        <line x1="48" y1="62" x2="48" y2="24" stroke="#78350f" strokeWidth="3.5" strokeLinecap="round" />
        <polygon points="50,26 50,58 72,58" fill="#f43f5e" />
        <polygon points="46,32 46,58 30,58" fill="#fbbf24" />
      </svg>
    )
  },
  rocket: {
    name: 'Rocket',
    category: 'vehicles',
    color: '#ef4444',
    render: () => (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <ellipse cx="50" cy="46" rx="14" ry="26" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
        <path d="M50 20 Q56 28 50 36 Z" fill="#ef4444" />
        <polygon points="36,54 24,68 37,66" fill="#ef4444" />
        <polygon points="64,54 76,68 63,66" fill="#ef4444" />
        <circle cx="50" cy="46" r="6" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
        {/* Flame */}
        <polygon points="44,72 50,86 56,72" fill="#f59e0b" />
        <polygon points="46,72 50,80 54,72" fill="#facc15" />
      </svg>
    )
  },

  // Shapes
  circle_purple: {
    name: 'Purple Circle',
    category: 'shapes',
    color: '#a855f7',
    render: () => (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <circle cx="50" cy="50" r="32" fill="#a855f7" />
        <circle cx="40" cy="40" r="10" fill="#c084fc" opacity="0.6" />
        <circle cx="43" cy="46" r="3" fill="#ffffff" />
        <circle cx="57" cy="46" r="3" fill="#ffffff" />
        <path d="M44 56 Q50 62 56 56" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </svg>
    )
  },
  triangle_orange: {
    name: 'Orange Triangle',
    category: 'shapes',
    color: '#f97316',
    render: () => (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <polygon points="50,20 80,76 20,76" fill="#f97316" />
        <circle cx="44" cy="54" r="3" fill="#ffffff" />
        <circle cx="56" cy="54" r="3" fill="#ffffff" />
        <path d="M46 62 Q50 66 54 62" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </svg>
    )
  },
  star_yellow: {
    name: 'Yellow Star',
    category: 'shapes',
    color: '#eab308',
    render: () => (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <polygon
          points="50,18 59,38 82,40 64,56 70,78 50,66 30,78 36,56 18,40 41,38"
          fill="#facc15"
          stroke="#ca8a04"
          strokeWidth="2"
        />
        <circle cx="44" cy="46" r="3" fill="#1e293b" />
        <circle cx="56" cy="46" r="3" fill="#1e293b" />
        <path d="M45 54 Q50 58 55 54" stroke="#1e293b" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
    )
  },
  square_blue: {
    name: 'Blue Square',
    category: 'shapes',
    color: '#3b82f6',
    render: () => (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <rect x="22" y="22" width="56" height="56" rx="12" fill="#3b82f6" />
        <circle cx="42" cy="46" r="3.5" fill="#ffffff" />
        <circle cx="58" cy="46" r="3.5" fill="#ffffff" />
        <path d="M44 58 Q50 64 56 58" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </svg>
    )
  },
  heart_pink: {
    name: 'Pink Heart',
    category: 'shapes',
    color: '#ec4899',
    render: () => (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <path
          d="M50 78 C20 56, 16 34, 32 24 C 44 16, 50 30, 50 30 C 50 30, 56 16, 68 24 C 84 34, 80 56, 50 78 Z"
          fill="#ec4899"
        />
        <circle cx="42" cy="42" r="3" fill="#ffffff" />
        <circle cx="58" cy="42" r="3" fill="#ffffff" />
        <path d="M45 50 Q50 54 55 50" stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
    )
  },

  // Colors / Balloons
  balloon_blue: {
    name: 'Blue Balloon',
    category: 'colors',
    color: '#3b82f6',
    render: () => (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <ellipse cx="50" cy="46" rx="24" ry="28" fill="#3b82f6" />
        <ellipse cx="42" cy="36" rx="6" ry="10" fill="#93c5fd" opacity="0.6" />
        <polygon points="46,74 54,74 50,77" fill="#2563eb" />
        <path d="M50 77 Q52 84 48 90" stroke="#64748b" strokeWidth="2" fill="none" />
      </svg>
    )
  },
  balloon_yellow: {
    name: 'Yellow Balloon',
    category: 'colors',
    color: '#eab308',
    render: () => (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <ellipse cx="50" cy="46" rx="24" ry="28" fill="#facc15" />
        <ellipse cx="42" cy="36" rx="6" ry="10" fill="#fef08a" opacity="0.6" />
        <polygon points="46,74 54,74 50,77" fill="#ca8a04" />
        <path d="M50 77 Q52 84 48 90" stroke="#64748b" strokeWidth="2" fill="none" />
      </svg>
    )
  },
  balloon_red: {
    name: 'Red Balloon',
    category: 'colors',
    color: '#ef4444',
    render: () => (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <ellipse cx="50" cy="46" rx="24" ry="28" fill="#ef4444" />
        <ellipse cx="42" cy="36" rx="6" ry="10" fill="#fca5a5" opacity="0.6" />
        <polygon points="46,74 54,74 50,77" fill="#dc2626" />
        <path d="M50 77 Q52 84 48 90" stroke="#64748b" strokeWidth="2" fill="none" />
      </svg>
    )
  },

  // Toys
  teddy: {
    name: 'Teddy Bear',
    category: 'toys',
    color: '#b45309',
    render: () => (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <circle cx="28" cy="30" r="10" fill="#b45309" />
        <circle cx="28" cy="30" r="6" fill="#fde68a" />
        <circle cx="72" cy="30" r="10" fill="#b45309" />
        <circle cx="72" cy="30" r="6" fill="#fde68a" />
        <circle cx="50" cy="50" r="26" fill="#d97706" />
        <ellipse cx="50" cy="56" rx="14" ry="10" fill="#fef3c7" />
        <circle cx="41" cy="46" r="3.5" fill="#0f172a" />
        <circle cx="59" cy="46" r="3.5" fill="#0f172a" />
        <ellipse cx="50" cy="53" rx="4" ry="3" fill="#78350f" />
        <path d="M46 59 Q50 63 54 59" stroke="#78350f" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
    )
  },
  robot: {
    name: 'Toy Robot',
    category: 'toys',
    color: '#0284c7',
    render: () => (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <line x1="50" y1="20" x2="50" y2="30" stroke="#0284c7" strokeWidth="3" />
        <circle cx="50" cy="18" r="4" fill="#f59e0b" />
        <rect x="26" y="30" width="48" height="42" rx="8" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
        <circle cx="40" cy="44" r="5" fill="#facc15" />
        <circle cx="60" cy="44" r="5" fill="#facc15" />
        <circle cx="40" cy="44" r="2" fill="#0f172a" />
        <circle cx="60" cy="44" r="2" fill="#0f172a" />
        <rect x="36" y="56" width="28" height="6" rx="3" fill="#ffffff" />
        <rect x="18" y="44" width="8" height="14" rx="3" fill="#0284c7" />
        <rect x="74" y="44" width="8" height="14" rx="3" fill="#0284c7" />
      </svg>
    )
  }
};

/**
 * Game Rounds for Odd One Out
 * Easy: 3 cards
 * Medium: 4 cards
 * Hard: 5 cards
 */
export const ODD_ONE_OUT_ROUNDS = [
  // EASY LEVEL (3 items)
  {
    id: 'round-e1',
    level: 'easy',
    title: 'Find the odd one!',
    categoryName: 'Animals',
    hintText: 'Look for the green frog with a crown among the yellow ducklings!',
    items: [
      { id: 'item-1', key: 'duck' },
      { id: 'item-2', key: 'frog', isOdd: true },
      { id: 'item-3', key: 'duck' }
    ]
  },
  {
    id: 'round-e2',
    level: 'easy',
    title: 'Which one is different?',
    categoryName: 'Fruits',
    hintText: 'Two are red apples, and one is a sweet yellow banana!',
    items: [
      { id: 'item-1', key: 'apple' },
      { id: 'item-2', key: 'apple' },
      { id: 'item-3', key: 'banana', isOdd: true }
    ]
  },
  {
    id: 'round-e3',
    level: 'easy',
    title: 'Spot the difference!',
    categoryName: 'Vehicles',
    hintText: 'Cars drive on roads, but airplanes fly high in the sky!',
    items: [
      { id: 'item-1', key: 'car' },
      { id: 'item-2', key: 'airplane', isOdd: true },
      { id: 'item-3', key: 'car' }
    ]
  },
  {
    id: 'round-e4',
    level: 'easy',
    title: 'Which shape does not belong?',
    categoryName: 'Shapes',
    hintText: 'Find the bright triangle among the round circles!',
    items: [
      { id: 'item-1', key: 'circle_purple' },
      { id: 'item-2', key: 'circle_purple' },
      { id: 'item-3', key: 'triangle_orange', isOdd: true }
    ]
  },
  {
    id: 'round-e5',
    level: 'easy',
    title: 'Which balloon is unique?',
    categoryName: 'Colors',
    hintText: 'Find the sunny yellow balloon!',
    items: [
      { id: 'item-1', key: 'balloon_blue' },
      { id: 'item-2', key: 'balloon_yellow', isOdd: true },
      { id: 'item-3', key: 'balloon_blue' }
    ]
  },

  // MEDIUM LEVEL (4 items)
  {
    id: 'round-m1',
    level: 'medium',
    title: 'Find the odd one out!',
    categoryName: 'Animals',
    hintText: 'Kittens purr, but the cute puppy barks!',
    items: [
      { id: 'item-1', key: 'cat' },
      { id: 'item-2', key: 'cat' },
      { id: 'item-3', key: 'puppy', isOdd: true },
      { id: 'item-4', key: 'cat' }
    ]
  },
  {
    id: 'round-m2',
    level: 'medium',
    title: 'Spot the different fruit!',
    categoryName: 'Fruits & Food',
    hintText: 'Find the crunchy orange carrot among the red strawberries!',
    items: [
      { id: 'item-1', key: 'strawberry' },
      { id: 'item-2', key: 'carrot', isOdd: true },
      { id: 'item-3', key: 'strawberry' },
      { id: 'item-4', key: 'strawberry' }
    ]
  },
  {
    id: 'round-m3',
    level: 'medium',
    title: 'Which vehicle is different?',
    categoryName: 'Vehicles',
    hintText: 'Boats float on water, but the rocket flies to outer space!',
    items: [
      { id: 'item-1', key: 'boat' },
      { id: 'item-2', key: 'boat' },
      { id: 'item-3', key: 'boat' },
      { id: 'item-4', key: 'rocket', isOdd: true }
    ]
  },
  {
    id: 'round-m4',
    level: 'medium',
    title: 'Which toy is not like the others?',
    categoryName: 'Toys',
    hintText: 'Three cuddly teddy bears and one cool beep-boop robot!',
    items: [
      { id: 'item-1', key: 'teddy' },
      { id: 'item-2', key: 'robot', isOdd: true },
      { id: 'item-3', key: 'teddy' },
      { id: 'item-4', key: 'teddy' }
    ]
  },
  {
    id: 'round-m5',
    level: 'medium',
    title: 'Find the odd shape!',
    categoryName: 'Shapes',
    hintText: 'Find the blue square among the shiny stars!',
    items: [
      { id: 'item-1', key: 'star_yellow' },
      { id: 'item-2', key: 'star_yellow' },
      { id: 'item-3', key: 'square_blue', isOdd: true },
      { id: 'item-4', key: 'star_yellow' }
    ]
  },

  // HARD LEVEL (5 items)
  {
    id: 'round-h1',
    level: 'hard',
    title: 'Spot the odd one!',
    categoryName: 'Animals',
    hintText: 'Birds fly in the air, but the little pink fish swims in water!',
    items: [
      { id: 'item-1', key: 'bird' },
      { id: 'item-2', key: 'bird' },
      { id: 'item-3', key: 'fish', isOdd: true },
      { id: 'item-4', key: 'bird' },
      { id: 'item-5', key: 'bird' }
    ]
  },
  {
    id: 'round-h2',
    level: 'hard',
    title: 'Which food is different?',
    categoryName: 'Fruits & Food',
    hintText: 'Find the delicious juicy watermelon slice among the red apples!',
    items: [
      { id: 'item-1', key: 'apple' },
      { id: 'item-2', key: 'watermelon', isOdd: true },
      { id: 'item-3', key: 'apple' },
      { id: 'item-4', key: 'apple' },
      { id: 'item-5', key: 'apple' }
    ]
  },
  {
    id: 'round-h3',
    level: 'hard',
    title: 'Which shape does not match?',
    categoryName: 'Shapes',
    hintText: 'Look for the pink heart among the blue squares!',
    items: [
      { id: 'item-1', key: 'square_blue' },
      { id: 'item-2', key: 'square_blue' },
      { id: 'item-3', key: 'square_blue' },
      { id: 'item-4', key: 'square_blue' },
      { id: 'item-5', key: 'heart_pink', isOdd: true }
    ]
  },
  {
    id: 'round-h4',
    level: 'hard',
    title: 'Which vehicle stands out?',
    categoryName: 'Vehicles',
    hintText: 'Find the blue car among the high-flying airplanes!',
    items: [
      { id: 'item-1', key: 'airplane' },
      { id: 'item-2', key: 'airplane' },
      { id: 'item-3', key: 'airplane' },
      { id: 'item-4', key: 'car', isOdd: true },
      { id: 'item-5', key: 'airplane' }
    ]
  },
  {
    id: 'round-h5',
    level: 'hard',
    title: 'Color challenge!',
    categoryName: 'Colors',
    hintText: 'Find the bright red balloon among the blue ones!',
    items: [
      { id: 'item-1', key: 'balloon_blue' },
      { id: 'item-2', key: 'balloon_blue' },
      { id: 'item-3', key: 'balloon_red', isOdd: true },
      { id: 'item-4', key: 'balloon_blue' },
      { id: 'item-5', key: 'balloon_blue' }
    ]
  }
];

export const DIFFICULTY_LEVELS = [
  { id: 'easy', label: 'Easy', emoji: '🌱', count: 3, rounds: 5 },
  { id: 'medium', label: 'Medium', emoji: '🌟', count: 4, rounds: 5 },
  { id: 'hard', label: 'Hard', emoji: '🚀', count: 5, rounds: 5 }
];
