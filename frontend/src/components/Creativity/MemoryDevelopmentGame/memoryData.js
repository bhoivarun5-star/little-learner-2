// Comprehensive Memory Development Game Dataset (Ages 3-6)

export const GAME_MODES = [
  {
    id: 'match',
    label: 'Memory Match',
    labelMr: 'जोड्या लावा',
    icon: '🃏',
    desc: 'Flip and find matching pairs!',
    descMr: 'जुळणाऱ्या जोड्या शोधण्यासाठी कार्ड उलटा!'
  },
  {
    id: 'remember',
    label: 'Remember & Find',
    labelMr: 'लक्षात ठेवा आणि शोधा',
    icon: '🔍',
    desc: 'Memorize objects and find them!',
    descMr: 'वस्तू लक्षात ठेवा आणि शोधा!'
  }
];

export const DIFFICULTY_PRESETS = [
  {
    id: 'easy',
    label: 'Easy (4 Pairs)',
    labelMr: 'सोपे (४ जोड्या)',
    badge: '🌱 Easy',
    badgeMr: '🌱 सोपे',
    pairs: 4,
    gridCols: 4,
    targetCount: 2,
    optionCount: 6,
    showDuration: 5000
  },
  {
    id: 'medium',
    label: 'Medium (6 Pairs)',
    labelMr: 'मध्यम (६ जोड्या)',
    badge: '🌟 Medium',
    badgeMr: '🌟 मध्यम',
    pairs: 6,
    gridCols: 4,
    targetCount: 3,
    optionCount: 8,
    showDuration: 5000
  },
  {
    id: 'hard',
    label: 'Hard (8 Pairs)',
    labelMr: 'कठीण (८ जोड्या)',
    badge: '🚀 Hard',
    badgeMr: '🚀 कठीण',
    pairs: 8,
    gridCols: 4,
    targetCount: 4,
    optionCount: 10,
    showDuration: 4000
  }
];

export const MEMORY_THEMES = [
  { id: 'all', label: 'All Items', labelMr: 'सर्व वस्तू', icon: '🌈' },
  { id: 'animals', label: 'Animals', labelMr: 'प्राणी', icon: '🐶' },
  { id: 'fruits', label: 'Fruits', labelMr: 'फळे', icon: '🍎' },
  { id: 'shapes', label: 'Shapes', labelMr: 'आकार', icon: '⭐' },
  { id: 'colors', label: 'Colors', labelMr: 'रंग', icon: '🎨' },
  { id: 'numbers', label: 'Numbers', labelMr: 'अंक', icon: '🔢' }
];

// Rich library of cute illustrated cards for preschoolers with Marathi names
export const CARD_ITEMS = [
  // Animals
  { id: 'lion', name: 'Lion', nameMr: 'सिंह', icon: '🦁', category: 'animals', bg: '#fef3c7', border: '#f59e0b', color: '#b45309' },
  { id: 'puppy', name: 'Puppy', nameMr: 'कुत्र्याचे पिल्लू', icon: '🐶', category: 'animals', bg: '#ffedd5', border: '#f97316', color: '#c2410c' },
  { id: 'kitten', name: 'Kitten', nameMr: 'मांजराचे पिल्लू', icon: '🐱', category: 'animals', bg: '#fce7f3', border: '#ec4899', color: '#be185d' },
  { id: 'frog', name: 'Frog', nameMr: 'बेडूक', icon: '🐸', category: 'animals', bg: '#dcfce7', border: '#10b981', color: '#047857' },
  { id: 'panda', name: 'Panda', nameMr: 'पांडा', icon: '🐼', category: 'animals', bg: '#f1f5f9', border: '#64748b', color: '#1e293b' },
  { id: 'elephant', name: 'Elephant', nameMr: 'हत्ती', icon: '🐘', category: 'animals', bg: '#e0f2fe', border: '#0284c7', color: '#0369a1' },
  { id: 'monkey', name: 'Monkey', nameMr: 'माकड', icon: '🐵', category: 'animals', bg: '#fef9c3', border: '#eab308', color: '#854d0e' },
  { id: 'bunny', name: 'Bunny', nameMr: 'ससा', icon: '🐰', category: 'animals', bg: '#fae8ff', border: '#c084fc', color: '#7e22ce' },

  // Fruits
  { id: 'apple', name: 'Apple', nameMr: 'सफरचंद', icon: '🍎', category: 'fruits', bg: '#fee2e2', border: '#ef4444', color: '#b91c1c' },
  { id: 'strawberry', name: 'Strawberry', nameMr: 'स्ट्रॉबेरी', icon: '🍓', category: 'fruits', bg: '#ffe4e6', border: '#f43f5e', color: '#be123c' },
  { id: 'banana', name: 'Banana', nameMr: 'केळे', icon: '🍌', category: 'fruits', bg: '#fef08a', border: '#eab308', color: '#854d0e' },
  { id: 'watermelon', name: 'Watermelon', nameMr: 'कलिंगड', icon: '🍉', category: 'fruits', bg: '#dcfce7', border: '#22c55e', color: '#15803d' },
  { id: 'grapes', name: 'Grapes', nameMr: 'द्राक्षे', icon: '🍇', category: 'fruits', bg: '#ede9fe', border: '#8b5cf6', color: '#6d28d9' },
  { id: 'orange', name: 'Orange', nameMr: 'संत्री', icon: '🍊', category: 'fruits', bg: '#ffedd5', border: '#f97316', color: '#c2410c' },
  { id: 'cherry', name: 'Cherry', nameMr: 'चेरी', icon: '🍒', category: 'fruits', bg: '#fee2e2', border: '#dc2626', color: '#991b1b' },
  { id: 'pineapple', name: 'Pineapple', nameMr: 'अननस', icon: '🍍', category: 'fruits', bg: '#fef9c3', border: '#ca8a04', color: '#713f12' },

  // Shapes
  { id: 'star', name: 'Star', nameMr: 'चांदणी', icon: '⭐', category: 'shapes', bg: '#fef08a', border: '#eab308', color: '#854d0e' },
  { id: 'heart', name: 'Heart', nameMr: 'हृदय', icon: '❤️', category: 'shapes', bg: '#fee2e2', border: '#ef4444', color: '#b91c1c' },
  { id: 'diamond', name: 'Diamond', nameMr: 'हिरा', icon: '🔷', category: 'shapes', bg: '#e0f2fe', border: '#0284c7', color: '#0369a1' },
  { id: 'flower', name: 'Flower', nameMr: 'फूल', icon: '🌸', category: 'shapes', bg: '#fce7f3', border: '#ec4899', color: '#be185d' },
  { id: 'sun', name: 'Sun', nameMr: 'सूर्य', icon: '☀️', category: 'shapes', bg: '#fef3c7', border: '#f59e0b', color: '#b45309' },
  { id: 'moon', name: 'Moon', nameMr: 'चंद्र', icon: '🌙', category: 'shapes', bg: '#ede9fe', border: '#7c3aed', color: '#5b21b6' },

  // Colors & Numbers
  { id: 'red_ball', name: 'Red Gem', nameMr: 'लाल रत्न', icon: '🔴', category: 'colors', bg: '#fee2e2', border: '#ef4444', color: '#b91c1c' },
  { id: 'blue_ball', name: 'Blue Gem', nameMr: 'निळा रत्न', icon: '🔵', category: 'colors', bg: '#dbeafe', border: '#3b82f6', color: '#1d4ed8' },
  { id: 'green_ball', name: 'Green Gem', nameMr: 'हिरवा रत्न', icon: '🟢', category: 'colors', bg: '#dcfce7', border: '#10b981', color: '#047857' },
  { id: 'yellow_ball', name: 'Yellow Gem', nameMr: 'पिवळा रत्न', icon: '🟡', category: 'colors', bg: '#fef9c3', border: '#eab308', color: '#854d0e' },
  { id: 'purple_ball', name: 'Purple Gem', nameMr: 'जांभळा रत्न', icon: '🟣', category: 'colors', bg: '#f3e8ff', border: '#a855f7', color: '#7e22ce' },
  { id: 'num_1', name: 'One 1', nameMr: 'एक १', icon: '1️⃣', category: 'numbers', bg: '#e0f2fe', border: '#0284c7', color: '#0369a1' },
  { id: 'num_2', name: 'Two 2', nameMr: 'दोन २', icon: '2️⃣', category: 'numbers', bg: '#dcfce7', border: '#10b981', color: '#047857' },
  { id: 'num_3', name: 'Three 3', nameMr: 'तीन ३', icon: '3️⃣', category: 'numbers', bg: '#fef3c7', border: '#f59e0b', color: '#b45309' },
  { id: 'num_4', name: 'Four 4', nameMr: 'चार ४', icon: '4️⃣', category: 'numbers', bg: '#fae8ff', border: '#c084fc', color: '#7e22ce' },
  { id: 'num_5', name: 'Five 5', nameMr: 'पाच ५', icon: '5️⃣', category: 'numbers', bg: '#fee2e2', border: '#ef4444', color: '#b91c1c' }
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
