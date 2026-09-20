import React from 'react';

// Categories for Picture Completion Game
export const COMPLETION_CATEGORIES = [
  { id: 'all', label: 'All Pictures', icon: '🎨' },
  { id: 'animals', label: 'Animals', icon: '🦁' },
  { id: 'fruits', label: 'Fruits', icon: '🍓' },
  { id: 'vehicles', label: 'Vehicles', icon: '🚗' },
  { id: 'houses', label: 'Houses', icon: '🏡' },
  { id: 'flowers', label: 'Flowers', icon: '🌻' },
  { id: 'nature', label: 'Nature', icon: '🌈' }
];

export const DIFFICULTY_MODES = [
  { id: 'easy', label: 'Easy', badge: '🌱 Easy', choices: 3, ghostHint: true },
  { id: 'medium', label: 'Medium', badge: '🌟 Medium', choices: 4, ghostHint: false },
  { id: 'hard', label: 'Hard', badge: '🚀 Hard', choices: 4, ghostHint: false }
];

// Helper for SVGs
export const PICTURE_SCENES = [
  // =========================================================================
  // 1. ANIMALS: Friendly Lion
  // =========================================================================
  {
    id: 'lion',
    category: 'animals',
    title: 'Friendly Lion',
    prompt: "Place the lion's missing right ear!",
    speech: "The friendly lion is missing his right ear! Can you find it?",
    successSpeech: "Roar! You completed the lion's ear! Great job!",
    themeColor: '#f59e0b',
    slot: { cx: 285, cy: 110, r: 32 },
    renderBase: (isCompleted) => (
      <svg viewBox="0 0 400 400" className="picture-completion-svg">
        <defs>
          <radialGradient id="lionBg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#fde68a" />
          </radialGradient>
        </defs>
        {/* Backdrop */}
        <rect width="400" height="400" rx="28" fill="url(#lionBg)" />
        <ellipse cx="200" cy="360" rx="170" ry="35" fill="#86efac" />
        {/* Scalloped mane circles */}
        <g fill="#f59e0b">
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const cx = 200 + 105 * Math.cos(rad);
            const cy = 190 + 105 * Math.sin(rad);
            return <circle key={deg} cx={cx} cy={cy} r="40" />;
          })}
        </g>
        {/* Left ear (fixed) */}
        <circle cx="115" cy="110" r="30" fill="#f59e0b" />
        <circle cx="115" cy="110" r="18" fill="#fbcfe8" />
        {/* Head */}
        <circle cx="200" cy="190" r="92" fill="#fde047" />
        {/* Eyes & Cheeks */}
        <ellipse cx="165" cy="170" rx="10" ry="14" fill="#1e1b4b" />
        <circle cx="168" cy="165" r="4" fill="#ffffff" />
        <ellipse cx="235" cy="170" rx="10" ry="14" fill="#1e1b4b" />
        <circle cx="238" cy="165" r="4" fill="#ffffff" />
        <circle cx="150" cy="195" r="14" fill="#fca5a5" opacity="0.6" />
        <circle cx="250" cy="195" r="14" fill="#fca5a5" opacity="0.6" />
        {/* Cute nose & smile */}
        <polygon points="190,195 210,195 200,207" fill="#b45309" />
        <path d="M 185 212 Q 200 226 200 207 Q 200 226 215 212" fill="none" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />

        {/* Completed piece in slot */}
        {isCompleted && (
          <g className="piece-placed-animation">
            <circle cx="285" cy="110" r="30" fill="#f59e0b" />
            <circle cx="285" cy="110" r="18" fill="#fbcfe8" />
          </g>
        )}
      </svg>
    ),
    options: {
      easy: [
        { id: 'correct', isCorrect: true, label: "Lion's Ear", color: '#f59e0b', render: () => (
          <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="38" fill="#f59e0b" /><circle cx="50" cy="50" r="22" fill="#fbcfe8" /></svg>
        )},
        { id: 'distract1', isCorrect: false, label: 'Blue Star', color: '#3b82f6', render: () => (
          <svg viewBox="0 0 100 100"><polygon points="50,15 61,38 86,40 67,58 73,83 50,70 27,83 33,58 14,40 39,38" fill="#3b82f6" /></svg>
        )},
        { id: 'distract2', isCorrect: false, label: 'Green Leaf', color: '#10b981', render: () => (
          <svg viewBox="0 0 100 100"><path d="M 20 80 Q 20 20 80 20 Q 80 80 20 80 Z" fill="#10b981" /></svg>
        )}
      ],
      medium: [
        { id: 'correct', isCorrect: true, label: "Lion's Ear", color: '#f59e0b', render: () => (
          <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="38" fill="#f59e0b" /><circle cx="50" cy="50" r="22" fill="#fbcfe8" /></svg>
        )},
        { id: 'distract1', isCorrect: false, label: 'Purple Ear', color: '#8b5cf6', render: () => (
          <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="38" fill="#8b5cf6" /><circle cx="50" cy="50" r="22" fill="#fbcfe8" /></svg>
        )},
        { id: 'distract2', isCorrect: false, label: 'Small Yellow Ear', color: '#facc15', render: () => (
          <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="22" fill="#facc15" /><circle cx="50" cy="50" r="12" fill="#fbcfe8" /></svg>
        )},
        { id: 'distract3', isCorrect: false, label: 'Bear Ear', color: '#78350f', render: () => (
          <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="38" fill="#78350f" /><circle cx="50" cy="50" r="22" fill="#fed7aa" /></svg>
        )}
      ],
      hard: [
        { id: 'correct', isCorrect: true, label: "Lion's Ear", color: '#f59e0b', render: () => (
          <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="38" fill="#f59e0b" /><circle cx="50" cy="50" r="22" fill="#fbcfe8" /></svg>
        )},
        { id: 'distract1', isCorrect: false, label: 'Upside-down Ear', color: '#f59e0b', render: () => (
          <svg viewBox="0 0 100 100"><circle cx="50" cy="65" r="38" fill="#f59e0b" /><circle cx="50" cy="75" r="22" fill="#fbcfe8" /></svg>
        )},
        { id: 'distract2', isCorrect: false, label: 'Striped Ear', color: '#ea580c', render: () => (
          <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="38" fill="#ea580c" /><circle cx="50" cy="50" r="22" fill="#ffedd5" /></svg>
        )},
        { id: 'distract3', isCorrect: false, label: 'Pointy Ear', color: '#f59e0b', render: () => (
          <svg viewBox="0 0 100 100"><polygon points="50,15 85,85 15,85" fill="#f59e0b" /><polygon points="50,35 70,80 30,80" fill="#fbcfe8" /></svg>
        )}
      ]
    }
  },

  // =========================================================================
  // 2. FRUITS: Sweet Strawberry
  // =========================================================================
  {
    id: 'strawberry',
    category: 'fruits',
    title: 'Sweet Strawberry',
    prompt: "Place the leafy green crown on top!",
    speech: "The sweet strawberry is missing its green leaves! Can you put them on?",
    successSpeech: "Yum! That strawberry looks delicious with its green leaves!",
    themeColor: '#ef4444',
    slot: { cx: 200, cy: 95, r: 36 },
    renderBase: (isCompleted) => (
      <svg viewBox="0 0 400 400" className="picture-completion-svg">
        <rect width="400" height="400" rx="28" fill="#fee2e2" />
        {/* Big Strawberry Body */}
        <path
          d="M 120 150 C 100 240, 160 330, 200 350 C 240 330, 300 240, 280 150 C 270 120, 130 120, 120 150 Z"
          fill="#ef4444"
        />
        {/* Seeds */}
        {[
          [160, 180], [200, 175], [240, 180],
          [145, 220], [180, 215], [220, 215], [255, 220],
          [165, 260], [200, 255], [235, 260],
          [185, 295], [215, 295],
          [200, 325]
        ].map(([sx, sy], i) => (
          <ellipse key={i} cx={sx} cy={sy} rx="3" ry="5" fill="#fef08a" transform={`rotate(10 ${sx} ${sy})`} />
        ))}
        {/* Smiling face on strawberry */}
        <circle cx="175" cy="225" r="6" fill="#7f1d1d" />
        <circle cx="225" cy="225" r="6" fill="#7f1d1d" />
        <path d="M 190 235 Q 200 245 210 235" fill="none" stroke="#7f1d1d" strokeWidth="3" strokeLinecap="round" />
        {/* Cheeks */}
        <circle cx="165" cy="235" r="8" fill="#fca5a5" opacity="0.6" />
        <circle cx="235" cy="235" r="8" fill="#fca5a5" opacity="0.6" />

        {isCompleted && (
          <g className="piece-placed-animation">
            {/* Green Leafy Crown */}
            <path
              d="M 150 110 Q 170 135 185 115 Q 200 80 200 70 Q 200 80 215 115 Q 230 135 250 110 Q 240 145 200 130 Q 160 145 150 110 Z"
              fill="#10b981"
            />
            {/* Little stem */}
            <path d="M 200 75 Q 195 50 185 45" fill="none" stroke="#047857" strokeWidth="6" strokeLinecap="round" />
          </g>
        )}
      </svg>
    ),
    options: {
      easy: [
        { id: 'correct', isCorrect: true, label: 'Green Leaves', color: '#10b981', render: () => (
          <svg viewBox="0 0 100 100">
            <path d="M 20 60 Q 40 85 50 65 Q 50 30 50 20 Q 50 30 50 65 Q 60 85 80 60 Q 70 95 50 80 Q 30 95 20 60 Z" fill="#10b981" />
            <path d="M 50 25 Q 45 5 35 2" fill="none" stroke="#047857" strokeWidth="4" strokeLinecap="round" />
          </svg>
        )},
        { id: 'distract1', isCorrect: false, label: 'Orange Carrot Top', color: '#f97316', render: () => (
          <svg viewBox="0 0 100 100"><polygon points="50,20 75,80 25,80" fill="#f97316" /></svg>
        )},
        { id: 'distract2', isCorrect: false, label: 'Blue Button', color: '#3b82f6', render: () => (
          <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="35" fill="#3b82f6" /></svg>
        )}
      ],
      medium: [
        { id: 'correct', isCorrect: true, label: 'Green Leaves', color: '#10b981', render: () => (
          <svg viewBox="0 0 100 100">
            <path d="M 20 60 Q 40 85 50 65 Q 50 30 50 20 Q 50 30 50 65 Q 60 85 80 60 Q 70 95 50 80 Q 30 95 20 60 Z" fill="#10b981" />
            <path d="M 50 25 Q 45 5 35 2" fill="none" stroke="#047857" strokeWidth="4" strokeLinecap="round" />
          </svg>
        )},
        { id: 'distract1', isCorrect: false, label: 'Yellow Leaves', color: '#facc15', render: () => (
          <svg viewBox="0 0 100 100">
            <path d="M 20 60 Q 40 85 50 65 Q 50 30 50 20 Q 50 30 50 65 Q 60 85 80 60 Q 70 95 50 80 Q 30 95 20 60 Z" fill="#facc15" />
          </svg>
        )},
        { id: 'distract2', isCorrect: false, label: 'Single Leaf', color: '#10b981', render: () => (
          <svg viewBox="0 0 100 100"><ellipse cx="50" cy="50" rx="35" ry="18" fill="#10b981" transform="rotate(-30 50 50)" /></svg>
        )},
        { id: 'distract3', isCorrect: false, label: 'Purple Flower', color: '#a855f7', render: () => (
          <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="30" fill="#a855f7" /><circle cx="50" cy="50" r="12" fill="#facc15" /></svg>
        )}
      ],
      hard: [
        { id: 'correct', isCorrect: true, label: 'Green Leaves', color: '#10b981', render: () => (
          <svg viewBox="0 0 100 100">
            <path d="M 20 60 Q 40 85 50 65 Q 50 30 50 20 Q 50 30 50 65 Q 60 85 80 60 Q 70 95 50 80 Q 30 95 20 60 Z" fill="#10b981" />
            <path d="M 50 25 Q 45 5 35 2" fill="none" stroke="#047857" strokeWidth="4" strokeLinecap="round" />
          </svg>
        )},
        { id: 'distract1', isCorrect: false, label: 'Tiny Leaves', color: '#10b981', render: () => (
          <svg viewBox="0 0 100 100">
            <path d="M 35 65 Q 45 75 50 65 Q 50 45 50 35 Q 50 45 50 65 Q 55 75 65 65 Q 60 80 50 72 Q 40 80 35 65 Z" fill="#10b981" />
          </svg>
        )},
        { id: 'distract2', isCorrect: false, label: 'Upside-down Leaves', color: '#10b981', render: () => (
          <svg viewBox="0 0 100 100">
            <path d="M 20 40 Q 40 15 50 35 Q 50 70 50 80 Q 50 70 50 35 Q 60 15 80 40 Q 70 5 50 20 Q 30 5 20 40 Z" fill="#10b981" />
          </svg>
        )},
        { id: 'distract3', isCorrect: false, label: 'Pale Mint Crown', color: '#6ee7b7', render: () => (
          <svg viewBox="0 0 100 100">
            <path d="M 20 60 Q 40 85 50 65 Q 50 30 50 20 Q 50 30 50 65 Q 60 85 80 60 Q 70 95 50 80 Q 30 95 20 60 Z" fill="#6ee7b7" />
          </svg>
        )}
      ]
    }
  },

  // =========================================================================
  // 3. VEHICLES: Beep-Beep Car
  // =========================================================================
  {
    id: 'car',
    category: 'vehicles',
    title: 'Beep-Beep Car',
    prompt: "Place the front spinning wheel on the car!",
    speech: "Beep beep! The cheerful car is missing its front wheel! Can you fix it?",
    successSpeech: "Vroom vroom! The car is all ready to zoom down the road!",
    themeColor: '#3b82f6',
    slot: { cx: 285, cy: 280, r: 35 },
    renderBase: (isCompleted) => (
      <svg viewBox="0 0 400 400" className="picture-completion-svg">
        <rect width="400" height="400" rx="28" fill="#e0f2fe" />
        {/* Road & Clouds */}
        <rect x="0" y="300" width="400" height="100" fill="#64748b" />
        <line x1="20" y1="350" x2="80" y2="350" stroke="#fde047" strokeWidth="6" strokeDasharray="14 14" />
        <line x1="120" y1="350" x2="280" y2="350" stroke="#fde047" strokeWidth="6" strokeDasharray="14 14" />
        <line x1="320" y1="350" x2="380" y2="350" stroke="#fde047" strokeWidth="6" strokeDasharray="14 14" />
        {/* Car Body */}
        <path
          d="M 50 270 L 60 210 Q 110 205 130 150 L 250 150 Q 280 205 340 215 L 350 270 Q 340 280 320 280 Q 300 240 265 280 L 160 280 Q 140 240 100 280 Z"
          fill="#3b82f6"
        />
        {/* Windows */}
        <path d="M 135 160 L 190 160 L 190 205 L 115 205 Z" fill="#bae6fd" />
        <path d="M 200 160 L 245 160 L 265 205 L 200 205 Z" fill="#bae6fd" />
        {/* Headlight */}
        <ellipse cx="345" cy="235" rx="8" ry="12" fill="#facc15" />
        {/* Rear Wheel (fixed) */}
        <circle cx="115" cy="280" r="32" fill="#1e293b" />
        <circle cx="115" cy="280" r="16" fill="#cbd5e1" />
        <circle cx="115" cy="280" r="6" fill="#3b82f6" />

        {isCompleted && (
          <g className="piece-placed-animation">
            <circle cx="285" cy="280" r="32" fill="#1e293b" />
            <circle cx="285" cy="280" r="16" fill="#cbd5e1" />
            <circle cx="285" cy="280" r="6" fill="#3b82f6" />
          </g>
        )}
      </svg>
    ),
    options: {
      easy: [
        { id: 'correct', isCorrect: true, label: 'Car Wheel', color: '#1e293b', render: () => (
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="#1e293b" />
            <circle cx="50" cy="50" r="20" fill="#cbd5e1" />
            <circle cx="50" cy="50" r="8" fill="#3b82f6" />
          </svg>
        )},
        { id: 'distract1', isCorrect: false, label: 'Square Block', color: '#ec4899', render: () => (
          <svg viewBox="0 0 100 100"><rect x="15" y="15" width="70" height="70" rx="14" fill="#ec4899" /></svg>
        )},
        { id: 'distract2', isCorrect: false, label: 'Green Apple', color: '#10b981', render: () => (
          <svg viewBox="0 0 100 100"><circle cx="50" cy="55" r="35" fill="#10b981" /></svg>
        )}
      ],
      medium: [
        { id: 'correct', isCorrect: true, label: 'Car Wheel', color: '#1e293b', render: () => (
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="#1e293b" />
            <circle cx="50" cy="50" r="20" fill="#cbd5e1" />
            <circle cx="50" cy="50" r="8" fill="#3b82f6" />
          </svg>
        )},
        { id: 'distract1', isCorrect: false, label: 'Yellow Wheel', color: '#eab308', render: () => (
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="#eab308" />
            <circle cx="50" cy="50" r="20" fill="#fef08a" />
          </svg>
        )},
        { id: 'distract2', isCorrect: false, label: 'Small Wheel', color: '#1e293b', render: () => (
          <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="20" fill="#1e293b" /></svg>
        )},
        { id: 'distract3', isCorrect: false, label: 'Donut', color: '#d97706', render: () => (
          <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="38" fill="#d97706" /><circle cx="50" cy="50" r="14" fill="#ffffff" /></svg>
        )}
      ],
      hard: [
        { id: 'correct', isCorrect: true, label: 'Car Wheel', color: '#1e293b', render: () => (
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="#1e293b" />
            <circle cx="50" cy="50" r="20" fill="#cbd5e1" />
            <circle cx="50" cy="50" r="8" fill="#3b82f6" />
          </svg>
        )},
        { id: 'distract1', isCorrect: false, label: 'Bicycle Wheel', color: '#64748b', render: () => (
          <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke="#64748b" strokeWidth="8" /><circle cx="50" cy="50" r="6" fill="#64748b" /></svg>
        )},
        { id: 'distract2', isCorrect: false, label: 'Red Rim Wheel', color: '#1e293b', render: () => (
          <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#1e293b" /><circle cx="50" cy="50" r="20" fill="#ef4444" /></svg>
        )},
        { id: 'distract3', isCorrect: false, label: 'Spiked Cog', color: '#475569', render: () => (
          <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="35" fill="#475569" stroke="#94a3b8" strokeDasharray="8 8" strokeWidth="6" /></svg>
        )}
      ]
    }
  },

  // =========================================================================
  // 4. HOUSES: Cozy Cottage
  // =========================================================================
  {
    id: 'cottage',
    category: 'houses',
    title: 'Cozy Cottage',
    prompt: "Place the red roof on top of the house!",
    speech: "The cozy cottage needs its warm roof! Can you put it in place?",
    successSpeech: "Wonderful! The cottage is warm and cozy with its red roof!",
    themeColor: '#ef4444',
    slot: { cx: 200, cy: 115, r: 40 },
    renderBase: (isCompleted) => (
      <svg viewBox="0 0 400 400" className="picture-completion-svg">
        <rect width="400" height="400" rx="28" fill="#ecfdf5" />
        <ellipse cx="200" cy="370" rx="180" ry="40" fill="#86efac" />
        {/* House Walls */}
        <rect x="100" y="190" width="200" height="150" rx="8" fill="#fed7aa" stroke="#ea580c" strokeWidth="3" />
        {/* Door & Windows */}
        <rect x="165" y="240" width="50" height="100" rx="25" fill="#b45309" />
        <circle cx="205" cy="290" r="4" fill="#fef08a" />
        <rect x="115" y="220" width="35" height="45" rx="4" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" />
        <rect x="235" y="220" width="35" height="45" rx="4" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" />
        {/* Chimney */}
        <rect x="240" y="80" width="30" height="50" fill="#b91c1c" />
        {/* Puff of smoke */}
        <circle cx="255" cy="60" r="10" fill="#e2e8f0" opacity="0.8" />
        <circle cx="265" cy="42" r="14" fill="#e2e8f0" opacity="0.8" />

        {isCompleted && (
          <g className="piece-placed-animation">
            <polygon points="70,195 200,80 330,195" fill="#ef4444" stroke="#b91c1c" strokeWidth="3" />
          </g>
        )}
      </svg>
    ),
    options: {
      easy: [
        { id: 'correct', isCorrect: true, label: 'Red Roof', color: '#ef4444', render: () => (
          <svg viewBox="0 0 100 100"><polygon points="10,80 50,20 90,80" fill="#ef4444" /></svg>
        )},
        { id: 'distract1', isCorrect: false, label: 'Blue Circle', color: '#3b82f6', render: () => (
          <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="35" fill="#3b82f6" /></svg>
        )},
        { id: 'distract2', isCorrect: false, label: 'Green Bush', color: '#10b981', render: () => (
          <svg viewBox="0 0 100 100"><ellipse cx="50" cy="50" rx="35" ry="25" fill="#10b981" /></svg>
        )}
      ],
      medium: [
        { id: 'correct', isCorrect: true, label: 'Red Roof', color: '#ef4444', render: () => (
          <svg viewBox="0 0 100 100"><polygon points="10,80 50,20 90,80" fill="#ef4444" /></svg>
        )},
        { id: 'distract1', isCorrect: false, label: 'Flat Roof', color: '#78350f', render: () => (
          <svg viewBox="0 0 100 100"><rect x="10" y="35" width="80" height="30" rx="4" fill="#78350f" /></svg>
        )},
        { id: 'distract2', isCorrect: false, label: 'Yellow Roof', color: '#eab308', render: () => (
          <svg viewBox="0 0 100 100"><polygon points="10,80 50,20 90,80" fill="#eab308" /></svg>
        )},
        { id: 'distract3', isCorrect: false, label: 'Arch Window', color: '#38bdf8', render: () => (
          <svg viewBox="0 0 100 100"><path d="M 25 80 L 25 50 Q 50 15 75 50 L 75 80 Z" fill="#38bdf8" /></svg>
        )}
      ],
      hard: [
        { id: 'correct', isCorrect: true, label: 'Red Roof', color: '#ef4444', render: () => (
          <svg viewBox="0 0 100 100"><polygon points="10,80 50,20 90,80" fill="#ef4444" /></svg>
        )},
        { id: 'distract1', isCorrect: false, label: 'Inverted Roof', color: '#ef4444', render: () => (
          <svg viewBox="0 0 100 100"><polygon points="10,20 50,80 90,20" fill="#ef4444" /></svg>
        )},
        { id: 'distract2', isCorrect: false, label: 'Orange Tile Roof', color: '#f97316', render: () => (
          <svg viewBox="0 0 100 100"><polygon points="10,80 50,20 90,80" fill="#f97316" stroke="#c2410c" strokeDasharray="4 4" strokeWidth="3" /></svg>
        )},
        { id: 'distract3', isCorrect: false, label: 'Steep Roof', color: '#b91c1c', render: () => (
          <svg viewBox="0 0 100 100"><polygon points="25,85 50,10 75,85" fill="#b91c1c" /></svg>
        )}
      ]
    }
  },

  // =========================================================================
  // 5. FLOWERS: Sunny Sunflower
  // =========================================================================
  {
    id: 'sunflower',
    category: 'flowers',
    title: 'Sunny Sunflower',
    prompt: "Place the smiling brown center of the flower!",
    speech: "The sunflower is missing its warm smiling center! Can you place it?",
    successSpeech: "Yay! The sunflower is smiling bright in the sun!",
    themeColor: '#eab308',
    slot: { cx: 200, cy: 170, r: 42 },
    renderBase: (isCompleted) => (
      <svg viewBox="0 0 400 400" className="picture-completion-svg">
        <rect width="400" height="400" rx="28" fill="#fefce8" />
        {/* Stem & Big Leaves */}
        <path d="M 200 240 Q 195 320 190 380" fill="none" stroke="#15803d" strokeWidth="12" strokeLinecap="round" />
        <path d="M 195 290 Q 140 270 120 310 Q 160 330 195 300 Z" fill="#22c55e" />
        <path d="M 195 320 Q 250 300 275 330 Q 230 350 195 330 Z" fill="#22c55e" />
        {/* Radiating Petals (12 petals) */}
        <g fill="#facc15">
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const px = 200 + 75 * Math.cos(rad);
            const py = 170 + 75 * Math.sin(rad);
            return (
              <ellipse
                key={deg}
                cx={px}
                cy={py}
                rx="35"
                ry="18"
                transform={`rotate(${deg} ${px} ${py})`}
              />
            );
          })}
        </g>

        {isCompleted && (
          <g className="piece-placed-animation">
            <circle cx="200" cy="170" r="48" fill="#78350f" />
            <circle cx="185" cy="160" r="6" fill="#fef08a" />
            <circle cx="215" cy="160" r="6" fill="#fef08a" />
            <path d="M 190 178 Q 200 192 210 178" fill="none" stroke="#fef08a" strokeWidth="4" strokeLinecap="round" />
            {/* Cheeks */}
            <circle cx="175" cy="175" r="7" fill="#f87171" opacity="0.6" />
            <circle cx="225" cy="175" r="7" fill="#f87171" opacity="0.6" />
          </g>
        )}
      </svg>
    ),
    options: {
      easy: [
        { id: 'correct', isCorrect: true, label: 'Smiling Center', color: '#78350f', render: () => (
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="#78350f" />
            <circle cx="38" cy="42" r="5" fill="#fef08a" />
            <circle cx="62" cy="42" r="5" fill="#fef08a" />
            <path d="M 40 58 Q 50 70 60 58" fill="none" stroke="#fef08a" strokeWidth="4" strokeLinecap="round" />
          </svg>
        )},
        { id: 'distract1', isCorrect: false, label: 'Purple Gem', color: '#9333ea', render: () => (
          <svg viewBox="0 0 100 100"><polygon points="50,15 85,50 50,85 15,50" fill="#9333ea" /></svg>
        )},
        { id: 'distract2', isCorrect: false, label: 'Pink Bow', color: '#ec4899', render: () => (
          <svg viewBox="0 0 100 100"><circle cx="35" cy="50" r="18" fill="#ec4899" /><circle cx="65" cy="50" r="18" fill="#ec4899" /><circle cx="50" cy="50" r="10" fill="#f43f5e" /></svg>
        )}
      ],
      medium: [
        { id: 'correct', isCorrect: true, label: 'Smiling Center', color: '#78350f', render: () => (
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="#78350f" />
            <circle cx="38" cy="42" r="5" fill="#fef08a" />
            <circle cx="62" cy="42" r="5" fill="#fef08a" />
            <path d="M 40 58 Q 50 70 60 58" fill="none" stroke="#fef08a" strokeWidth="4" strokeLinecap="round" />
          </svg>
        )},
        { id: 'distract1', isCorrect: false, label: 'Green Disc', color: '#16a34a', render: () => (
          <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#16a34a" /></svg>
        )},
        { id: 'distract2', isCorrect: false, label: 'Yellow Petal', color: '#facc15', render: () => (
          <svg viewBox="0 0 100 100"><ellipse cx="50" cy="50" rx="35" ry="18" fill="#facc15" /></svg>
        )},
        { id: 'distract3', isCorrect: false, label: 'Brown Ring', color: '#78350f', render: () => (
          <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke="#78350f" strokeWidth="12" /></svg>
        )}
      ],
      hard: [
        { id: 'correct', isCorrect: true, label: 'Smiling Center', color: '#78350f', render: () => (
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="#78350f" />
            <circle cx="38" cy="42" r="5" fill="#fef08a" />
            <circle cx="62" cy="42" r="5" fill="#fef08a" />
            <path d="M 40 58 Q 50 70 60 58" fill="none" stroke="#fef08a" strokeWidth="4" strokeLinecap="round" />
          </svg>
        )},
        { id: 'distract1', isCorrect: false, label: 'Plain Brown Disc', color: '#78350f', render: () => (
          <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#78350f" /></svg>
        )},
        { id: 'distract2', isCorrect: false, label: 'Dark Charcoal Disc', color: '#27272a', render: () => (
          <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#27272a" /></svg>
        )},
        { id: 'distract3', isCorrect: false, label: 'Winking Center', color: '#78350f', render: () => (
          <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#78350f" /><line x1="32" y1="42" x2="44" y2="42" stroke="#fef08a" strokeWidth="4" /><circle cx="62" cy="42" r="5" fill="#fef08a" /></svg>
        )}
      ]
    }
  },

  // =========================================================================
  // 6. NATURE: Magical Rainbow
  // =========================================================================
  {
    id: 'rainbow',
    category: 'nature',
    title: 'Magical Rainbow',
    prompt: "Place the shining golden star in the sky!",
    speech: "The magical rainbow is missing its sparkling golden star! Can you place it?",
    successSpeech: "Magical! The rainbow is glowing brightly with the golden star!",
    themeColor: '#8b5cf6',
    slot: { cx: 200, cy: 90, r: 35 },
    renderBase: (isCompleted) => (
      <svg viewBox="0 0 400 400" className="picture-completion-svg">
        <rect width="400" height="400" rx="28" fill="#eff6ff" />
        {/* Big Rainbow Arcs */}
        <g fill="none" strokeWidth="18" strokeLinecap="round">
          <path d="M 60 300 A 140 140 0 0 1 340 300" stroke="#ef4444" />
          <path d="M 78 300 A 122 122 0 0 1 322 300" stroke="#f97316" />
          <path d="M 96 300 A 104 104 0 0 1 304 300" stroke="#facc15" />
          <path d="M 114 300 A 86 86 0 0 1 286 300" stroke="#10b981" />
          <path d="M 132 300 A 68 68 0 0 1 268 300" stroke="#06b6d4" />
          <path d="M 150 300 A 50 50 0 0 1 250 300" stroke="#8b5cf6" />
        </g>
        {/* Fluffy Clouds at ends */}
        <g fill="#ffffff" filter="drop-shadow(0 4px 10px rgba(0,0,0,0.06))">
          <circle cx="70" cy="300" r="30" />
          <circle cx="95" cy="285" r="25" />
          <circle cx="120" cy="305" r="26" />
          <circle cx="280" cy="305" r="26" />
          <circle cx="305" cy="285" r="25" />
          <circle cx="330" cy="300" r="30" />
        </g>

        {isCompleted && (
          <g className="piece-placed-animation">
            <polygon
              points="200,55 212,78 238,82 219,101 224,126 200,113 176,126 181,101 162,82 188,78"
              fill="#facc15"
              stroke="#eab308"
              strokeWidth="2"
            />
            {/* Sparkle circles around star */}
            <circle cx="160" cy="65" r="3" fill="#facc15" />
            <circle cx="240" cy="65" r="3" fill="#facc15" />
            <circle cx="200" cy="140" r="3" fill="#facc15" />
          </g>
        )}
      </svg>
    ),
    options: {
      easy: [
        { id: 'correct', isCorrect: true, label: 'Golden Star', color: '#facc15', render: () => (
          <svg viewBox="0 0 100 100">
            <polygon points="50,15 62,38 88,42 69,61 74,86 50,73 26,86 31,61 12,42 38,38" fill="#facc15" />
          </svg>
        )},
        { id: 'distract1', isCorrect: false, label: 'Brown Acorn', color: '#78350f', render: () => (
          <svg viewBox="0 0 100 100"><ellipse cx="50" cy="55" rx="25" ry="30" fill="#78350f" /></svg>
        )},
        { id: 'distract2', isCorrect: false, label: 'Blue Drop', color: '#0284c7', render: () => (
          <svg viewBox="0 0 100 100"><path d="M 50 15 C 30 50, 30 75, 50 85 C 70 75, 70 50, 50 15 Z" fill="#0284c7" /></svg>
        )}
      ],
      medium: [
        { id: 'correct', isCorrect: true, label: 'Golden Star', color: '#facc15', render: () => (
          <svg viewBox="0 0 100 100">
            <polygon points="50,15 62,38 88,42 69,61 74,86 50,73 26,86 31,61 12,42 38,38" fill="#facc15" />
          </svg>
        )},
        { id: 'distract1', isCorrect: false, label: 'Silver Star', color: '#cbd5e1', render: () => (
          <svg viewBox="0 0 100 100"><polygon points="50,15 62,38 88,42 69,61 74,86 50,73 26,86 31,61 12,42 38,38" fill="#cbd5e1" /></svg>
        )},
        { id: 'distract2', isCorrect: false, label: '4-Point Star', color: '#facc15', render: () => (
          <svg viewBox="0 0 100 100"><polygon points="50,15 60,40 85,50 60,60 50,85 40,60 15,50 40,40" fill="#facc15" /></svg>
        )},
        { id: 'distract3', isCorrect: false, label: 'Crescent Moon', color: '#fbbf24', render: () => (
          <svg viewBox="0 0 100 100"><path d="M 60 20 A 35 35 0 1 0 75 75 A 28 28 0 0 1 60 20 Z" fill="#fbbf24" /></svg>
        )}
      ],
      hard: [
        { id: 'correct', isCorrect: true, label: 'Golden Star', color: '#facc15', render: () => (
          <svg viewBox="0 0 100 100">
            <polygon points="50,15 62,38 88,42 69,61 74,86 50,73 26,86 31,61 12,42 38,38" fill="#facc15" />
          </svg>
        )},
        { id: 'distract1', isCorrect: false, label: 'Upside-down Star', color: '#facc15', render: () => (
          <svg viewBox="0 0 100 100"><polygon points="50,85 62,62 88,58 69,39 74,14 50,27 26,14 31,39 12,58 38,62" fill="#facc15" /></svg>
        )},
        { id: 'distract2', isCorrect: false, label: 'Orange Star', color: '#f97316', render: () => (
          <svg viewBox="0 0 100 100"><polygon points="50,15 62,38 88,42 69,61 74,86 50,73 26,86 31,61 12,42 38,38" fill="#f97316" /></svg>
        )},
        { id: 'distract3', isCorrect: false, label: '6-Point Star', color: '#facc15', render: () => (
          <svg viewBox="0 0 100 100"><polygon points="50,15 75,70 25,70" fill="#facc15" /><polygon points="50,85 75,30 25,30" fill="#facc15" /></svg>
        )}
      ]
    }
  }
];
