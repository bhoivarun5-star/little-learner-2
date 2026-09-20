// Comprehensive Tracing Dataset for A-Z Uppercase, a-z Lowercase, and 1-20 Numbers (Ages 3-6)

export const TRACING_MODES = [
  { id: 'uppercase', label: 'Uppercase A–Z', icon: '🔤', count: 26 },
  { id: 'lowercase', label: 'Lowercase a–z', icon: '🔡', count: 26 },
  { id: 'numbers', label: 'Numbers 1–20', icon: '🔢', count: 20 }
];

// Helper to generate stroke checkpoints from normalized coordinate segments
export function generateCheckpoints(segments) {
  const points = [];
  segments.forEach((seg) => {
    const steps = seg.steps || 6;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = seg.x1 + (seg.x2 - seg.x1) * t;
      const y = seg.y1 + (seg.y2 - seg.y1) * t;
      points.push({ x: Math.round(x), y: Math.round(y), hit: false });
    }
  });
  return points;
}

// ---------------------------------------------------------------------------
// 1. UPPERCASE A-Z
// ---------------------------------------------------------------------------
export const UPPERCASE_DATA = [
  {
    char: 'A',
    word: 'Apple',
    icon: '🍎',
    color: '#ef4444',
    soundText: 'A is for Apple! /æ/ /æ/ Apple!',
    strokes: [
      { id: 1, label: '1', start: { x: 200, y: 70 }, arrow: '⬇️', path: 'M 200 70 L 100 330' },
      { id: 2, label: '2', start: { x: 200, y: 70 }, arrow: '⬇️', path: 'M 200 70 L 300 330' },
      { id: 3, label: '3', start: { x: 140, y: 220 }, arrow: '➡️', path: 'M 140 220 L 260 220' }
    ],
    segments: [
      { x1: 200, y1: 70, x2: 100, y2: 330, steps: 8 },
      { x1: 200, y1: 70, x2: 300, y2: 330, steps: 8 },
      { x1: 140, y1: 220, x2: 260, y2: 220, steps: 6 }
    ]
  },
  {
    char: 'B',
    word: 'Butterfly',
    icon: '🦋',
    color: '#3b82f6',
    soundText: 'B is for Butterfly! /b/ /b/ Butterfly!',
    strokes: [
      { id: 1, label: '1', start: { x: 120, y: 70 }, arrow: '⬇️', path: 'M 120 70 L 120 330' },
      { id: 2, label: '2', start: { x: 120, y: 70 }, arrow: '↪️', path: 'M 120 70 C 260 70, 260 200, 120 200' },
      { id: 3, label: '3', start: { x: 120, y: 200 }, arrow: '↪️', path: 'M 120 200 C 280 200, 280 330, 120 330' }
    ],
    segments: [
      { x1: 120, y1: 70, x2: 120, y2: 330, steps: 8 },
      { x1: 120, y1: 70, x2: 230, y2: 135, steps: 5 },
      { x1: 230, y1: 135, x2: 120, y2: 200, steps: 5 },
      { x1: 120, y1: 200, x2: 240, y2: 265, steps: 5 },
      { x1: 240, y1: 265, x2: 120, y2: 330, steps: 5 }
    ]
  },
  {
    char: 'C',
    word: 'Cat',
    icon: '🐱',
    color: '#f59e0b',
    soundText: 'C is for Cat! /k/ /k/ Cat!',
    strokes: [
      { id: 1, label: '1', start: { x: 280, y: 110 }, arrow: '↩️', path: 'M 280 110 C 130 90, 110 310, 280 290' }
    ],
    segments: [
      { x1: 280, y1: 110, x2: 180, y2: 95, steps: 4 },
      { x1: 180, y1: 95, x2: 120, y2: 200, steps: 6 },
      { x1: 120, y1: 200, x2: 180, y2: 305, steps: 6 },
      { x1: 180, y1: 305, x2: 280, y2: 290, steps: 4 }
    ]
  },
  {
    char: 'D',
    word: 'Dolphin',
    icon: '🐬',
    color: '#06b6d4',
    soundText: 'D is for Dolphin! /d/ /d/ Dolphin!',
    strokes: [
      { id: 1, label: '1', start: { x: 130, y: 70 }, arrow: '⬇️', path: 'M 130 70 L 130 330' },
      { id: 2, label: '2', start: { x: 130, y: 70 }, arrow: '↪️', path: 'M 130 70 C 300 70, 300 330, 130 330' }
    ],
    segments: [
      { x1: 130, y1: 70, x2: 130, y2: 330, steps: 8 },
      { x1: 130, y1: 70, x2: 260, y2: 130, steps: 5 },
      { x1: 260, y1: 130, x2: 260, y2: 270, steps: 5 },
      { x1: 260, y1: 270, x2: 130, y2: 330, steps: 5 }
    ]
  },
  {
    char: 'E',
    word: 'Elephant',
    icon: '🐘',
    color: '#10b981',
    soundText: 'E is for Elephant! /e/ /e/ Elephant!',
    strokes: [
      { id: 1, label: '1', start: { x: 130, y: 70 }, arrow: '⬇️', path: 'M 130 70 L 130 330' },
      { id: 2, label: '2', start: { x: 130, y: 70 }, arrow: '➡️', path: 'M 130 70 L 280 70' },
      { id: 3, label: '3', start: { x: 130, y: 200 }, arrow: '➡️', path: 'M 130 200 L 250 200' },
      { id: 4, label: '4', start: { x: 130, y: 330 }, arrow: '➡️', path: 'M 130 330 L 280 330' }
    ],
    segments: [
      { x1: 130, y1: 70, x2: 130, y2: 330, steps: 8 },
      { x1: 130, y1: 70, x2: 280, y2: 70, steps: 5 },
      { x1: 130, y1: 200, x2: 250, y2: 200, steps: 5 },
      { x1: 130, y1: 330, x2: 280, y2: 330, steps: 5 }
    ]
  },
  {
    char: 'F',
    word: 'Fox',
    icon: '🦊',
    color: '#f97316',
    soundText: 'F is for Fox! /f/ /f/ Fox!',
    strokes: [
      { id: 1, label: '1', start: { x: 130, y: 70 }, arrow: '⬇️', path: 'M 130 70 L 130 330' },
      { id: 2, label: '2', start: { x: 130, y: 70 }, arrow: '➡️', path: 'M 130 70 L 280 70' },
      { id: 3, label: '3', start: { x: 130, y: 200 }, arrow: '➡️', path: 'M 130 200 L 240 200' }
    ],
    segments: [
      { x1: 130, y1: 70, x2: 130, y2: 330, steps: 8 },
      { x1: 130, y1: 70, x2: 280, y2: 70, steps: 6 },
      { x1: 130, y1: 200, x2: 240, y2: 200, steps: 5 }
    ]
  },
  {
    char: 'G',
    word: 'Giraffe',
    icon: '🦒',
    color: '#eab308',
    soundText: 'G is for Giraffe! /dʒ/ /dʒ/ Giraffe!',
    strokes: [
      { id: 1, label: '1', start: { x: 280, y: 110 }, arrow: '↩️', path: 'M 280 110 C 120 90, 100 310, 280 290' },
      { id: 2, label: '2', start: { x: 280, y: 290 }, arrow: '⬆️', path: 'M 280 290 L 280 210' },
      { id: 3, label: '3', start: { x: 280, y: 210 }, arrow: '⬅️', path: 'M 280 210 L 210 210' }
    ],
    segments: [
      { x1: 280, y1: 110, x2: 120, y2: 200, steps: 7 },
      { x1: 120, y1: 200, x2: 280, y2: 290, steps: 7 },
      { x1: 280, y1: 290, x2: 280, y2: 210, steps: 4 },
      { x1: 280, y1: 210, x2: 210, y2: 210, steps: 3 }
    ]
  },
  {
    char: 'H',
    word: 'Horse',
    icon: '🐴',
    color: '#854d0e',
    soundText: 'H is for Horse! /h/ /h/ Horse!',
    strokes: [
      { id: 1, label: '1', start: { x: 130, y: 70 }, arrow: '⬇️', path: 'M 130 70 L 130 330' },
      { id: 2, label: '2', start: { x: 270, y: 70 }, arrow: '⬇️', path: 'M 270 70 L 270 330' },
      { id: 3, label: '3', start: { x: 130, y: 200 }, arrow: '➡️', path: 'M 130 200 L 270 200' }
    ],
    segments: [
      { x1: 130, y1: 70, x2: 130, y2: 330, steps: 8 },
      { x1: 270, y1: 70, x2: 270, y2: 330, steps: 8 },
      { x1: 130, y1: 200, x2: 270, y2: 200, steps: 6 }
    ]
  },
  {
    char: 'I',
    word: 'Ice cream',
    icon: '🍦',
    color: '#ec4899',
    soundText: 'I is for Ice cream! /aɪ/ /aɪ/ Ice cream!',
    strokes: [
      { id: 1, label: '1', start: { x: 200, y: 70 }, arrow: '⬇️', path: 'M 200 70 L 200 330' },
      { id: 2, label: '2', start: { x: 140, y: 70 }, arrow: '➡️', path: 'M 140 70 L 260 70' },
      { id: 3, label: '3', start: { x: 140, y: 330 }, arrow: '➡️', path: 'M 140 330 L 260 330' }
    ],
    segments: [
      { x1: 200, y1: 70, x2: 200, y2: 330, steps: 10 },
      { x1: 140, y1: 70, x2: 260, y2: 70, steps: 5 },
      { x1: 140, y1: 330, x2: 260, y2: 330, steps: 5 }
    ]
  },
  {
    char: 'J',
    word: 'Jellyfish',
    icon: '🪼',
    color: '#8b5cf6',
    soundText: 'J is for Jellyfish! /dʒ/ /dʒ/ Jellyfish!',
    strokes: [
      { id: 1, label: '1', start: { x: 150, y: 70 }, arrow: '➡️', path: 'M 150 70 L 260 70' },
      { id: 2, label: '2', start: { x: 230, y: 70 }, arrow: '↪️', path: 'M 230 70 L 230 270 C 230 330, 140 330, 140 270' }
    ],
    segments: [
      { x1: 150, y1: 70, x2: 260, y2: 70, steps: 5 },
      { x1: 230, y1: 70, x2: 230, y2: 270, steps: 8 },
      { x1: 230, y1: 270, x2: 140, y2: 270, steps: 5 }
    ]
  },
  {
    char: 'K',
    word: 'Kite',
    icon: '🪁',
    color: '#0284c7',
    soundText: 'K is for Kite! /k/ /k/ Kite!',
    strokes: [
      { id: 1, label: '1', start: { x: 130, y: 70 }, arrow: '⬇️', path: 'M 130 70 L 130 330' },
      { id: 2, label: '2', start: { x: 260, y: 80 }, arrow: '↙️', path: 'M 260 80 L 130 200' },
      { id: 3, label: '3', start: { x: 130, y: 200 }, arrow: '↘️', path: 'M 130 200 L 270 330' }
    ],
    segments: [
      { x1: 130, y1: 70, x2: 130, y2: 330, steps: 8 },
      { x1: 260, y1: 80, x2: 130, y2: 200, steps: 6 },
      { x1: 130, y1: 200, x2: 270, y2: 330, steps: 6 }
    ]
  },
  {
    char: 'L',
    word: 'Lion',
    icon: '🦁',
    color: '#f59e0b',
    soundText: 'L is for Lion! /l/ /l/ Lion!',
    strokes: [
      { id: 1, label: '1', start: { x: 140, y: 70 }, arrow: '⬇️', path: 'M 140 70 L 140 330' },
      { id: 2, label: '2', start: { x: 140, y: 330 }, arrow: '➡️', path: 'M 140 330 L 270 330' }
    ],
    segments: [
      { x1: 140, y1: 70, x2: 140, y2: 330, steps: 10 },
      { x1: 140, y1: 330, x2: 270, y2: 330, steps: 6 }
    ]
  },
  {
    char: 'M',
    word: 'Monkey',
    icon: '🐵',
    color: '#854d0e',
    soundText: 'M is for Monkey! /m/ /m/ Monkey!',
    strokes: [
      { id: 1, label: '1', start: { x: 110, y: 330 }, arrow: '⬆️', path: 'M 110 330 L 110 70' },
      { id: 2, label: '2', start: { x: 110, y: 70 }, arrow: '↘️', path: 'M 110 70 L 200 230' },
      { id: 3, label: '3', start: { x: 200, y: 230 }, arrow: '↗️', path: 'M 200 230 L 290 70' },
      { id: 4, label: '4', start: { x: 290, y: 70 }, arrow: '⬇️', path: 'M 290 70 L 290 330' }
    ],
    segments: [
      { x1: 110, y1: 330, x2: 110, y2: 70, steps: 8 },
      { x1: 110, y1: 70, x2: 200, y2: 230, steps: 6 },
      { x1: 200, y1: 230, x2: 290, y2: 70, steps: 6 },
      { x1: 290, y1: 70, x2: 290, y2: 330, steps: 8 }
    ]
  },
  {
    char: 'N',
    word: 'Nest',
    icon: '🪺',
    color: '#10b981',
    soundText: 'N is for Nest! /n/ /n/ Nest!',
    strokes: [
      { id: 1, label: '1', start: { x: 120, y: 330 }, arrow: '⬆️', path: 'M 120 330 L 120 70' },
      { id: 2, label: '2', start: { x: 120, y: 70 }, arrow: '↘️', path: 'M 120 70 L 280 330' },
      { id: 3, label: '3', start: { x: 280, y: 330 }, arrow: '⬆️', path: 'M 280 330 L 280 70' }
    ],
    segments: [
      { x1: 120, y1: 330, x2: 120, y2: 70, steps: 8 },
      { x1: 120, y1: 70, x2: 280, y2: 330, steps: 8 },
      { x1: 280, y1: 330, x2: 280, y2: 70, steps: 8 }
    ]
  },
  {
    char: 'O',
    word: 'Owl',
    icon: '🦉',
    color: '#f97316',
    soundText: 'O is for Owl! /ɒ/ /ɒ/ Owl!',
    strokes: [
      { id: 1, label: '1', start: { x: 200, y: 70 }, arrow: '🔄', path: 'M 200 70 C 100 70, 100 330, 200 330 C 300 330, 300 70, 200 70' }
    ],
    segments: [
      { x1: 200, y1: 70, x2: 120, y2: 150, steps: 5 },
      { x1: 120, y1: 150, x2: 120, y2: 250, steps: 5 },
      { x1: 120, y1: 250, x2: 200, y2: 330, steps: 5 },
      { x1: 200, y1: 330, x2: 280, y2: 250, steps: 5 },
      { x1: 280, y1: 250, x2: 280, y2: 150, steps: 5 },
      { x1: 280, y1: 150, x2: 200, y2: 70, steps: 5 }
    ]
  },
  {
    char: 'P',
    word: 'Penguin',
    icon: '🐧',
    color: '#0284c7',
    soundText: 'P is for Penguin! /p/ /p/ Penguin!',
    strokes: [
      { id: 1, label: '1', start: { x: 130, y: 70 }, arrow: '⬇️', path: 'M 130 70 L 130 330' },
      { id: 2, label: '2', start: { x: 130, y: 70 }, arrow: '↪️', path: 'M 130 70 C 280 70, 280 200, 130 200' }
    ],
    segments: [
      { x1: 130, y1: 70, x2: 130, y2: 330, steps: 8 },
      { x1: 130, y1: 70, x2: 260, y2: 135, steps: 6 },
      { x1: 260, y1: 135, x2: 130, y2: 200, steps: 6 }
    ]
  },
  {
    char: 'Q',
    word: 'Queen',
    icon: '👑',
    color: '#ec4899',
    soundText: 'Q is for Queen! /kw/ /kw/ Queen!',
    strokes: [
      { id: 1, label: '1', start: { x: 200, y: 70 }, arrow: '🔄', path: 'M 200 70 C 100 70, 100 330, 200 330 C 300 330, 300 70, 200 70' },
      { id: 2, label: '2', start: { x: 220, y: 260 }, arrow: '↘️', path: 'M 220 260 L 290 330' }
    ],
    segments: [
      { x1: 200, y1: 70, x2: 120, y2: 200, steps: 7 },
      { x1: 120, y1: 200, x2: 200, y2: 330, steps: 7 },
      { x1: 200, y1: 330, x2: 280, y2: 200, steps: 7 },
      { x1: 280, y1: 200, x2: 200, y2: 70, steps: 7 },
      { x1: 220, y1: 260, x2: 290, y2: 330, steps: 4 }
    ]
  },
  {
    char: 'R',
    word: 'Rainbow',
    icon: '🌈',
    color: '#ef4444',
    soundText: 'R is for Rainbow! /r/ /r/ Rainbow!',
    strokes: [
      { id: 1, label: '1', start: { x: 130, y: 70 }, arrow: '⬇️', path: 'M 130 70 L 130 330' },
      { id: 2, label: '2', start: { x: 130, y: 70 }, arrow: '↪️', path: 'M 130 70 C 270 70, 270 200, 130 200' },
      { id: 3, label: '3', start: { x: 190, y: 200 }, arrow: '↘️', path: 'M 190 200 L 280 330' }
    ],
    segments: [
      { x1: 130, y1: 70, x2: 130, y2: 330, steps: 8 },
      { x1: 130, y1: 70, x2: 250, y2: 135, steps: 5 },
      { x1: 250, y1: 135, x2: 130, y2: 200, steps: 5 },
      { x1: 190, y1: 200, x2: 280, y2: 330, steps: 6 }
    ]
  },
  {
    char: 'S',
    word: 'Star',
    icon: '⭐',
    color: '#facc15',
    soundText: 'S is for Star! /s/ /s/ Star!',
    strokes: [
      { id: 1, label: '1', start: { x: 270, y: 110 }, arrow: '↩️', path: 'M 270 110 C 170 70, 110 160, 200 200 C 290 240, 230 330, 130 290' }
    ],
    segments: [
      { x1: 270, y1: 110, x2: 180, y2: 80, steps: 4 },
      { x1: 180, y1: 80, x2: 140, y2: 140, steps: 4 },
      { x1: 140, y1: 140, x2: 200, y2: 200, steps: 4 },
      { x1: 200, y1: 200, x2: 260, y2: 260, steps: 4 },
      { x1: 260, y1: 260, x2: 130, y2: 290, steps: 5 }
    ]
  },
  {
    char: 'T',
    word: 'Train',
    icon: '🚂',
    color: '#8b5cf6',
    soundText: 'T is for Train! /t/ /t/ Train!',
    strokes: [
      { id: 1, label: '1', start: { x: 110, y: 70 }, arrow: '➡️', path: 'M 110 70 L 290 70' },
      { id: 2, label: '2', start: { x: 200, y: 70 }, arrow: '⬇️', path: 'M 200 70 L 200 330' }
    ],
    segments: [
      { x1: 110, y1: 70, x2: 290, y2: 70, steps: 8 },
      { x1: 200, y1: 70, x2: 200, y2: 330, steps: 10 }
    ]
  },
  {
    char: 'U',
    word: 'Umbrella',
    icon: '☂️',
    color: '#06b6d4',
    soundText: 'U is for Umbrella! /ʌ/ /ʌ/ Umbrella!',
    strokes: [
      { id: 1, label: '1', start: { x: 130, y: 70 }, arrow: '↪️', path: 'M 130 70 L 130 260 C 130 340, 270 340, 270 260 L 270 70' }
    ],
    segments: [
      { x1: 130, y1: 70, x2: 130, y2: 260, steps: 8 },
      { x1: 130, y1: 260, x2: 200, y2: 330, steps: 5 },
      { x1: 200, y1: 330, x2: 270, y2: 260, steps: 5 },
      { x1: 270, y1: 260, x2: 270, y2: 70, steps: 8 }
    ]
  },
  {
    char: 'V',
    word: 'Van',
    icon: '🚐',
    color: '#10b981',
    soundText: 'V is for Van! /v/ /v/ Van!',
    strokes: [
      { id: 1, label: '1', start: { x: 110, y: 70 }, arrow: '↘️', path: 'M 110 70 L 200 330' },
      { id: 2, label: '2', start: { x: 200, y: 330 }, arrow: '↗️', path: 'M 200 330 L 290 70' }
    ],
    segments: [
      { x1: 110, y1: 70, x2: 200, y2: 330, steps: 10 },
      { x1: 200, y1: 330, x2: 290, y2: 70, steps: 10 }
    ]
  },
  {
    char: 'W',
    word: 'Watermelon',
    icon: '🍉',
    color: '#ec4899',
    soundText: 'W is for Watermelon! /w/ /w/ Watermelon!',
    strokes: [
      { id: 1, label: '1', start: { x: 100, y: 70 }, arrow: '↘️', path: 'M 100 70 L 150 330' },
      { id: 2, label: '2', start: { x: 150, y: 330 }, arrow: '↗️', path: 'M 150 330 L 200 170' },
      { id: 3, label: '3', start: { x: 200, y: 170 }, arrow: '↘️', path: 'M 200 170 L 250 330' },
      { id: 4, label: '4', start: { x: 250, y: 330 }, arrow: '↗️', path: 'M 250 330 L 300 70' }
    ],
    segments: [
      { x1: 100, y1: 70, x2: 150, y2: 330, steps: 6 },
      { x1: 150, y1: 330, x2: 200, y2: 170, steps: 5 },
      { x1: 200, y1: 170, x2: 250, y2: 330, steps: 5 },
      { x1: 250, y1: 330, x2: 300, y2: 70, steps: 6 }
    ]
  },
  {
    char: 'X',
    word: 'Xylophone',
    icon: '🎵',
    color: '#8b5cf6',
    soundText: 'X is for Xylophone! /ks/ /ks/ Xylophone!',
    strokes: [
      { id: 1, label: '1', start: { x: 120, y: 70 }, arrow: '↘️', path: 'M 120 70 L 280 330' },
      { id: 2, label: '2', start: { x: 280, y: 70 }, arrow: '↙️', path: 'M 280 70 L 120 330' }
    ],
    segments: [
      { x1: 120, y1: 70, x2: 280, y2: 330, steps: 10 },
      { x1: 280, y1: 70, x2: 120, y2: 330, steps: 10 }
    ]
  },
  {
    char: 'Y',
    word: 'Yacht',
    icon: '⛵',
    color: '#0284c7',
    soundText: 'Y is for Yacht! /j/ /j/ Yacht!',
    strokes: [
      { id: 1, label: '1', start: { x: 120, y: 70 }, arrow: '↘️', path: 'M 120 70 L 200 190' },
      { id: 2, label: '2', start: { x: 280, y: 70 }, arrow: '↙️', path: 'M 280 70 L 200 190' },
      { id: 3, label: '3', start: { x: 200, y: 190 }, arrow: '⬇️', path: 'M 200 190 L 200 330' }
    ],
    segments: [
      { x1: 120, y1: 70, x2: 200, y2: 190, steps: 6 },
      { x1: 280, y1: 70, x2: 200, y2: 190, steps: 6 },
      { x1: 200, y1: 190, x2: 200, y2: 330, steps: 7 }
    ]
  },
  {
    char: 'Z',
    word: 'Zebra',
    icon: '🦓',
    color: '#1e1b4b',
    soundText: 'Z is for Zebra! /z/ /z/ Zebra!',
    strokes: [
      { id: 1, label: '1', start: { x: 120, y: 70 }, arrow: '➡️', path: 'M 120 70 L 280 70' },
      { id: 2, label: '2', start: { x: 280, y: 70 }, arrow: '↙️', path: 'M 280 70 L 120 330' },
      { id: 3, label: '3', start: { x: 120, y: 330 }, arrow: '➡️', path: 'M 120 330 L 280 330' }
    ],
    segments: [
      { x1: 120, y1: 70, x2: 280, y2: 70, steps: 8 },
      { x1: 280, y1: 70, x2: 120, y2: 330, steps: 10 },
      { x1: 120, y1: 330, x2: 280, y2: 330, steps: 8 }
    ]
  }
];

// ---------------------------------------------------------------------------
// 2. LOWERCASE a-z
// ---------------------------------------------------------------------------
export const LOWERCASE_DATA = UPPERCASE_DATA.map((item) => {
  const lowerChar = item.char.toLowerCase();
  return {
    char: lowerChar,
    word: item.word,
    icon: item.icon,
    color: item.color,
    soundText: `Lowercase ${lowerChar}! ${item.word}!`,
    strokes: item.strokes,
    segments: item.segments
  };
});

// ---------------------------------------------------------------------------
// 3. NUMBERS 1-20
// ---------------------------------------------------------------------------
export const NUMBERS_DATA = [
  {
    char: '1',
    word: '1 Sun',
    icon: '☀️',
    color: '#f59e0b',
    soundText: 'Number 1! One bright shining sun!',
    strokes: [
      { id: 1, label: '1', start: { x: 150, y: 130 }, arrow: '↗️', path: 'M 150 130 L 200 80' },
      { id: 2, label: '2', start: { x: 200, y: 80 }, arrow: '⬇️', path: 'M 200 80 L 200 330' }
    ],
    segments: [
      { x1: 150, y1: 130, x2: 200, y2: 80, steps: 4 },
      { x1: 200, y1: 80, x2: 200, y2: 330, steps: 10 }
    ]
  },
  {
    char: '2',
    word: '2 Ducks',
    icon: '🦆',
    color: '#0284c7',
    soundText: 'Number 2! Two friendly ducks!',
    strokes: [
      { id: 1, label: '1', start: { x: 130, y: 130 }, arrow: '↪️', path: 'M 130 130 C 130 60, 270 60, 270 140 C 270 210, 130 270, 130 330' },
      { id: 2, label: '2', start: { x: 130, y: 330 }, arrow: '➡️', path: 'M 130 330 L 270 330' }
    ],
    segments: [
      { x1: 130, y1: 130, x2: 200, y2: 70, steps: 5 },
      { x1: 200, y1: 70, x2: 270, y2: 140, steps: 5 },
      { x1: 270, y1: 140, x2: 130, y2: 330, steps: 8 },
      { x1: 130, y1: 330, x2: 270, y2: 330, steps: 6 }
    ]
  },
  {
    char: '3',
    word: '3 Stars',
    icon: '⭐',
    color: '#eab308',
    soundText: 'Number 3! Three twinkling stars!',
    strokes: [
      { id: 1, label: '1', start: { x: 140, y: 90 }, arrow: '↪️', path: 'M 140 90 C 260 70, 260 190, 180 190' },
      { id: 2, label: '2', start: { x: 180, y: 190 }, arrow: '↪️', path: 'M 180 190 C 270 190, 270 330, 130 310' }
    ],
    segments: [
      { x1: 140, y1: 90, x2: 240, y2: 120, steps: 5 },
      { x1: 240, y1: 120, x2: 180, y2: 190, steps: 5 },
      { x1: 180, y1: 190, x2: 250, y2: 250, steps: 5 },
      { x1: 250, y1: 250, x2: 130, y2: 310, steps: 5 }
    ]
  },
  {
    char: '4',
    word: '4 Apples',
    icon: '🍎',
    color: '#ef4444',
    soundText: 'Number 4! Four crunchy red apples!',
    strokes: [
      { id: 1, label: '1', start: { x: 230, y: 70 }, arrow: '↙️', path: 'M 230 70 L 120 240' },
      { id: 2, label: '2', start: { x: 120, y: 240 }, arrow: '➡️', path: 'M 120 240 L 280 240' },
      { id: 3, label: '3', start: { x: 230, y: 150 }, arrow: '⬇️', path: 'M 230 150 L 230 330' }
    ],
    segments: [
      { x1: 230, y1: 70, x2: 120, y2: 240, steps: 7 },
      { x1: 120, y1: 240, x2: 280, y2: 240, steps: 6 },
      { x1: 230, y1: 150, x2: 230, y2: 330, steps: 7 }
    ]
  },
  {
    char: '5',
    word: '5 Balloons',
    icon: '🎈',
    color: '#ec4899',
    soundText: 'Number 5! Five floating balloons!',
    strokes: [
      { id: 1, label: '1', start: { x: 250, y: 80 }, arrow: '⬅️', path: 'M 250 80 L 150 80' },
      { id: 2, label: '2', start: { x: 150, y: 80 }, arrow: '⬇️', path: 'M 150 80 L 150 190' },
      { id: 3, label: '3', start: { x: 150, y: 190 }, arrow: '↪️', path: 'M 150 190 C 270 180, 270 330, 130 310' }
    ],
    segments: [
      { x1: 250, y1: 80, x2: 150, y2: 80, steps: 5 },
      { x1: 150, y1: 80, x2: 150, y2: 190, steps: 5 },
      { x1: 150, y1: 190, x2: 250, y2: 240, steps: 6 },
      { x1: 250, y1: 240, x2: 130, y2: 310, steps: 6 }
    ]
  },
  {
    char: '6',
    word: '6 Flowers',
    icon: '🌸',
    color: '#10b981',
    soundText: 'Number 6! Six pretty blooming flowers!',
    strokes: [
      { id: 1, label: '1', start: { x: 240, y: 80 }, arrow: '↩️', path: 'M 240 80 C 120 120, 100 330, 200 330 C 270 330, 270 210, 150 210' }
    ],
    segments: [
      { x1: 240, y1: 80, x2: 120, y2: 180, steps: 6 },
      { x1: 120, y1: 180, x2: 130, y2: 300, steps: 5 },
      { x1: 130, y1: 300, x2: 240, y2: 310, steps: 5 },
      { x1: 240, y1: 310, x2: 240, y2: 210, steps: 5 },
      { x1: 240, y1: 210, x2: 150, y2: 210, steps: 4 }
    ]
  },
  {
    char: '7',
    word: '7 Butterflies',
    icon: '🦋',
    color: '#8b5cf6',
    soundText: 'Number 7! Seven fluttering butterflies!',
    strokes: [
      { id: 1, label: '1', start: { x: 120, y: 80 }, arrow: '➡️', path: 'M 120 80 L 270 80' },
      { id: 2, label: '2', start: { x: 270, y: 80 }, arrow: '↙️', path: 'M 270 80 L 150 330' }
    ],
    segments: [
      { x1: 120, y1: 80, x2: 270, y2: 80, steps: 6 },
      { x1: 270, y1: 80, x2: 150, y2: 330, steps: 10 }
    ]
  },
  {
    char: '8',
    word: '8 Strawberries',
    icon: '🍓',
    color: '#ef4444',
    soundText: 'Number 8! Eight sweet strawberries!',
    strokes: [
      { id: 1, label: '1', start: { x: 200, y: 80 }, arrow: '🔄', path: 'M 200 80 C 130 80, 130 190, 200 190 C 270 190, 270 330, 200 330 C 130 330, 130 190, 200 190 C 270 190, 270 80, 200 80' }
    ],
    segments: [
      { x1: 200, y1: 80, x2: 140, y2: 135, steps: 4 },
      { x1: 140, y1: 135, x2: 200, y2: 190, steps: 4 },
      { x1: 200, y1: 190, x2: 260, y2: 260, steps: 4 },
      { x1: 260, y1: 260, x2: 200, y2: 330, steps: 4 },
      { x1: 200, y1: 330, x2: 140, y2: 260, steps: 4 },
      { x1: 140, y1: 260, x2: 200, y2: 190, steps: 4 },
      { x1: 200, y1: 190, x2: 260, y2: 135, steps: 4 },
      { x1: 260, y1: 135, x2: 200, y2: 80, steps: 4 }
    ]
  },
  {
    char: '9',
    word: '9 Little Fish',
    icon: '🐟',
    color: '#0ea5e9',
    soundText: 'Number 9! Nine swimming little fish!',
    strokes: [
      { id: 1, label: '1', start: { x: 240, y: 160 }, arrow: '🔄', path: 'M 240 160 C 240 80, 140 80, 140 160 C 140 230, 240 230, 240 160' },
      { id: 2, label: '2', start: { x: 240, y: 100 }, arrow: '⬇️', path: 'M 240 100 L 240 280 C 240 330, 160 330, 140 310' }
    ],
    segments: [
      { x1: 240, y1: 160, x2: 190, y2: 90, steps: 4 },
      { x1: 190, y1: 90, x2: 140, y2: 160, steps: 4 },
      { x1: 140, y1: 160, x2: 190, y2: 220, steps: 4 },
      { x1: 190, y1: 220, x2: 240, y2: 160, steps: 4 },
      { x1: 240, y1: 100, x2: 240, y2: 300, steps: 8 }
    ]
  },
  {
    char: '10',
    word: '10 Ladybugs',
    icon: '🐞',
    color: '#f43f5e',
    soundText: 'Number 10! Ten happy red ladybugs!',
    strokes: [
      { id: 1, label: '1', start: { x: 120, y: 130 }, arrow: '↗️', path: 'M 120 130 L 150 80 L 150 330' },
      { id: 2, label: '2', start: { x: 250, y: 80 }, arrow: '🔄', path: 'M 250 80 C 190 80, 190 330, 250 330 C 310 330, 310 80, 250 80' }
    ],
    segments: [
      { x1: 150, y1: 80, x2: 150, y2: 330, steps: 8 },
      { x1: 250, y1: 80, x2: 190, y2: 200, steps: 6 },
      { x1: 190, y1: 200, x2: 250, y2: 330, steps: 6 },
      { x1: 250, y1: 330, x2: 310, y2: 200, steps: 6 },
      { x1: 310, y1: 200, x2: 250, y2: 80, steps: 6 }
    ]
  },
  // Additional Numbers 11 to 20
  ...Array.from({ length: 10 }, (_, idx) => {
    const num = idx + 11;
    const icons = ['🧁', '🚗', '🐸', '🍦', '🐧', '🚀', '🐱', '⚽', '🎨', '🦁'];
    const colors = ['#f59e0b', '#3b82f6', '#10b981', '#ec4899', '#0284c7', '#8b5cf6', '#ef4444', '#14b8a6', '#f97316', '#a855f7'];
    return {
      char: String(num),
      word: `${num} Items`,
      icon: icons[idx],
      color: colors[idx],
      soundText: `Number ${num}! Let's trace number ${num}!`,
      strokes: [
        { id: 1, label: '1', start: { x: 130, y: 100 }, arrow: '⬇️', path: 'M 130 100 L 130 330' },
        { id: 2, label: '2', start: { x: 250, y: 100 }, arrow: '⬇️', path: 'M 250 100 L 250 330' }
      ],
      segments: [
        { x1: 130, y1: 100, x2: 130, y2: 330, steps: 8 },
        { x1: 250, y1: 100, x2: 250, y2: 330, steps: 8 }
      ]
    };
  })
];
