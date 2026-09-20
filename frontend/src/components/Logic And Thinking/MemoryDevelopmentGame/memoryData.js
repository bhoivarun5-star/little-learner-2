// Comprehensive Memory Development Game Dataset (Ages 3-6)

export const GAME_MODES = [
  { id: 'match', label: 'Memory Match', icon: '🃏', desc: 'Flip and find matching pairs!' },
  { id: 'remember', label: 'Remember & Find', icon: '🔍', desc: 'Memorize objects and find them!' }
];

export const DIFFICULTY_PRESETS = [
  {
    id: 'easy',
    label: 'Easy (4 Pairs)',
    badge: '🌱 Easy',
    pairs: 4,
    gridCols: 4,
    targetCount: 2,
    optionCount: 6,
    showDuration: 5000
  },
  {
    id: 'medium',
    label: 'Medium (6 Pairs)',
    badge: '🌟 Medium',
    pairs: 6,
    gridCols: 4,
    targetCount: 3,
    optionCount: 8,
    showDuration: 5000
  },
  {
    id: 'hard',
    label: 'Hard (8 Pairs)',
    badge: '🚀 Hard',
    pairs: 8,
    gridCols: 4,
    targetCount: 4,
    optionCount: 10,
    showDuration: 4000
  }
];

export const MEMORY_THEMES = [
  { id: 'all', label: 'All Items', icon: '🌈' },
  { id: 'animals', label: 'Animals', icon: '🐶' },
  { id: 'fruits', label: 'Fruits', icon: '🍎' },
  { id: 'shapes', label: 'Shapes', icon: '⭐' },
  { id: 'colors', label: 'Colors', icon: '🎨' },
  { id: 'numbers', label: 'Numbers', icon: '🔢' }
];

// Rich library of cute illustrated cards for preschoolers
export const CARD_ITEMS = [
  // Animals
  { id: 'lion', name: 'Lion', icon: '🦁', category: 'animals', bg: '#fef3c7', border: '#f59e0b', color: '#b45309' },
  { id: 'puppy', name: 'Puppy', icon: '🐶', category: 'animals', bg: '#ffedd5', border: '#f97316', color: '#c2410c' },
  { id: 'kitten', name: 'Kitten', icon: '🐱', category: 'animals', bg: '#fce7f3', border: '#ec4899', color: '#be185d' },
  { id: 'frog', name: 'Frog', icon: '🐸', category: 'animals', bg: '#dcfce7', border: '#10b981', color: '#047857' },
  { id: 'panda', name: 'Panda', icon: '🐼', category: 'animals', bg: '#f1f5f9', border: '#64748b', color: '#1e293b' },
  { id: 'elephant', name: 'Elephant', icon: '🐘', category: 'animals', bg: '#e0f2fe', border: '#0284c7', color: '#0369a1' },
  { id: 'monkey', name: 'Monkey', icon: '🐵', category: 'animals', bg: '#fef9c3', border: '#eab308', color: '#854d0e' },
  { id: 'bunny', name: 'Bunny', icon: '🐰', category: 'animals', bg: '#fae8ff', border: '#c084fc', color: '#7e22ce' },

  // Fruits
  { id: 'apple', name: 'Apple', icon: '🍎', category: 'fruits', bg: '#fee2e2', border: '#ef4444', color: '#b91c1c' },
  { id: 'strawberry', name: 'Strawberry', icon: '🍓', category: 'fruits', bg: '#ffe4e6', border: '#f43f5e', color: '#be123c' },
  { id: 'banana', name: 'Banana', icon: '🍌', category: 'fruits', bg: '#fef08a', border: '#eab308', color: '#854d0e' },
  { id: 'watermelon', name: 'Watermelon', icon: '🍉', category: 'fruits', bg: '#dcfce7', border: '#22c55e', color: '#15803d' },
  { id: 'grapes', name: 'Grapes', icon: '🍇', category: 'fruits', bg: '#ede9fe', border: '#8b5cf6', color: '#6d28d9' },
  { id: 'orange', name: 'Orange', icon: '🍊', category: 'fruits', bg: '#ffedd5', border: '#f97316', color: '#c2410c' },
  { id: 'cherry', name: 'Cherry', icon: '🍒', category: 'fruits', bg: '#fee2e2', border: '#dc2626', color: '#991b1b' },
  { id: 'pineapple', name: 'Pineapple', icon: '🍍', category: 'fruits', bg: '#fef9c3', border: '#ca8a04', color: '#713f12' },

  // Shapes
  { id: 'star', name: 'Star', icon: '⭐', category: 'shapes', bg: '#fef08a', border: '#eab308', color: '#854d0e' },
  { id: 'heart', name: 'Heart', icon: '❤️', category: 'shapes', bg: '#fee2e2', border: '#ef4444', color: '#b91c1c' },
  { id: 'diamond', name: 'Diamond', icon: '🔷', category: 'shapes', bg: '#e0f2fe', border: '#0284c7', color: '#0369a1' },
  { id: 'flower', name: 'Flower', icon: '🌸', category: 'shapes', bg: '#fce7f3', border: '#ec4899', color: '#be185d' },
  { id: 'sun', name: 'Sun', icon: '☀️', category: 'shapes', bg: '#fef3c7', border: '#f59e0b', color: '#b45309' },
  { id: 'moon', name: 'Moon', icon: '🌙', category: 'shapes', bg: '#ede9fe', border: '#7c3aed', color: '#5b21b6' },

  // Colors & Numbers
  { id: 'red_ball', name: 'Red Gem', icon: '🔴', category: 'colors', bg: '#fee2e2', border: '#ef4444', color: '#b91c1c' },
  { id: 'blue_ball', name: 'Blue Gem', icon: '🔵', category: 'colors', bg: '#dbeafe', border: '#3b82f6', color: '#1d4ed8' },
  { id: 'green_ball', name: 'Green Gem', icon: '🟢', category: 'colors', bg: '#dcfce7', border: '#10b981', color: '#047857' },
  { id: 'yellow_ball', name: 'Yellow Gem', icon: '🟡', category: 'colors', bg: '#fef9c3', border: '#eab308', color: '#854d0e' },
  { id: 'purple_ball', name: 'Purple Gem', icon: '🟣', category: 'colors', bg: '#f3e8ff', border: '#a855f7', color: '#7e22ce' },
  { id: 'num_1', name: 'One 1', icon: '1️⃣', category: 'numbers', bg: '#e0f2fe', border: '#0284c7', color: '#0369a1' },
  { id: 'num_2', name: 'Two 2', icon: '2️⃣', category: 'numbers', bg: '#dcfce7', border: '#10b981', color: '#047857' },
  { id: 'num_3', name: 'Three 3', icon: '3️⃣', category: 'numbers', bg: '#fef3c7', border: '#f59e0b', color: '#b45309' },
  { id: 'num_4', name: 'Four 4', icon: '4️⃣', category: 'numbers', bg: '#fae8ff', border: '#c084fc', color: '#7e22ce' },
  { id: 'num_5', name: 'Five 5', icon: '5️⃣', category: 'numbers', bg: '#fee2e2', border: '#ef4444', color: '#b91c1c' }
];

// Helper to generate a shuffled deck of paired cards for Memory Match
export function generateMemoryDeck(pairCount, category = 'all') {
  let pool = CARD_ITEMS;
  if (category !== 'all') {
    const catPool = CARD_ITEMS.filter((item) => item.category === category);
    if (catPool.length >= pairCount) {
      pool = catPool;
    }
  }

  // Shuffle pool and select pairCount items
  const shuffledPool = [...pool].sort(() => Math.random() - 0.5);
  const selectedItems = shuffledPool.slice(0, pairCount);

  // Duplicate each into a pair
  const cards = [];
  selectedItems.forEach((item) => {
    cards.push({
      cardId: `${item.id}-a`,
      matchId: item.id,
      item
    });
    cards.push({
      cardId: `${item.id}-b`,
      matchId: item.id,
      item
    });
  });

  // Shuffle the final deck
  return cards.sort(() => Math.random() - 0.5);
}

// Helper to generate a round for Remember & Find
export function generateRememberRound(targetCount, optionCount, category = 'all') {
  let pool = CARD_ITEMS;
  if (category !== 'all') {
    const catPool = CARD_ITEMS.filter((item) => item.category === category);
    if (catPool.length >= optionCount) {
      pool = catPool;
    }
  }

  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const options = shuffled.slice(0, optionCount);
  const targets = options.slice(0, targetCount).sort(() => Math.random() - 0.5);

  return {
    targets,
    options: [...options].sort(() => Math.random() - 0.5)
  };
}
