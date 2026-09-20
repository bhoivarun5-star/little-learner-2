// Shapes & Colors Learning Game Data (Ages 3–6)

export const COLORS_DATA = [
  {
    id: 'red',
    name: 'Red',
    hex: '#ef4444',
    borderHex: '#dc2626',
    lightBg: '#fee2e2',
    accentColor: '#991b1b',
    iconEmoji: '🔴',
    soundDesc: 'Red! Like a juicy red apple or a red firetruck!',
    items: [
      { name: 'Red Apple', emoji: '🍎', colorId: 'red' },
      { name: 'Red Strawberry', emoji: '🍓', colorId: 'red' },
      { name: 'Red Car', emoji: '🚗', colorId: 'red' },
      { name: 'Red Rose', emoji: '🌹', colorId: 'red' }
    ]
  },
  {
    id: 'blue',
    name: 'Blue',
    hex: '#3b82f6',
    borderHex: '#2563eb',
    lightBg: '#dbeafe',
    accentColor: '#1e40af',
    iconEmoji: '🔵',
    soundDesc: 'Blue! Like the beautiful blue ocean and sweet blueberries!',
    items: [
      { name: 'Blueberries', emoji: '🫐', colorId: 'blue' },
      { name: 'Blue Whale', emoji: '🐳', colorId: 'blue' },
      { name: 'Ocean Wave', emoji: '🌊', colorId: 'blue' },
      { name: 'Blue Butterfly', emoji: '🦋', colorId: 'blue' }
    ]
  },
  {
    id: 'yellow',
    name: 'Yellow',
    hex: '#eab308',
    borderHex: '#ca8a04',
    lightBg: '#fef9c3',
    accentColor: '#854d0e',
    iconEmoji: '🟡',
    soundDesc: 'Yellow! Like the warm smiling sunshine and a sweet banana!',
    items: [
      { name: 'Bright Sun', emoji: '☀️', colorId: 'yellow' },
      { name: 'Yellow Banana', emoji: '🍌', colorId: 'yellow' },
      { name: 'Cute Duckling', emoji: '🐤', colorId: 'yellow' },
      { name: 'Fresh Lemon', emoji: '🍋', colorId: 'yellow' }
    ]
  },
  {
    id: 'green',
    name: 'Green',
    hex: '#22c55e',
    borderHex: '#16a34a',
    lightBg: '#dcfce7',
    accentColor: '#166534',
    iconEmoji: '🟢',
    soundDesc: 'Green! Like a little hopping frog and fresh green leaves!',
    items: [
      { name: 'Green Frog', emoji: '🐸', colorId: 'green' },
      { name: 'Green Leaf', emoji: '🍃', colorId: 'green' },
      { name: 'Cute Turtle', emoji: '🐢', colorId: 'green' },
      { name: 'Green Broccoli', emoji: '🥦', colorId: 'green' }
    ]
  },
  {
    id: 'orange',
    name: 'Orange',
    hex: '#f97316',
    borderHex: '#ea580c',
    lightBg: '#ffedd5',
    accentColor: '#9a3412',
    iconEmoji: '🟠',
    soundDesc: 'Orange! Like a juicy sweet orange and a crunchy carrot!',
    items: [
      { name: 'Juicy Orange', emoji: '🍊', colorId: 'orange' },
      { name: 'Crunchy Carrot', emoji: '🥕', colorId: 'orange' },
      { name: 'Playful Fox', emoji: '🦊', colorId: 'orange' },
      { name: 'Basketball', emoji: '🏀', colorId: 'orange' }
    ]
  },
  {
    id: 'purple',
    name: 'Purple',
    hex: '#a855f7',
    borderHex: '#9333ea',
    lightBg: '#f3e8ff',
    accentColor: '#6b21a8',
    iconEmoji: '🟣',
    soundDesc: 'Purple! Like delicious purple grapes and magic flowers!',
    items: [
      { name: 'Sweet Grapes', emoji: '🍇', colorId: 'purple' },
      { name: 'Purple Eggplant', emoji: '🍆', colorId: 'purple' },
      { name: 'Magic Crystal', emoji: '🔮', colorId: 'purple' },
      { name: 'Purple Flower', emoji: '🪻', colorId: 'purple' }
    ]
  },
  {
    id: 'pink',
    name: 'Pink',
    hex: '#ec4899',
    borderHex: '#db2777',
    lightBg: '#fce7f3',
    accentColor: '#9d174d',
    iconEmoji: '🌸',
    soundDesc: 'Pink! Like a pretty pink flamingo and cherry blossoms!',
    items: [
      { name: 'Pink Flamingo', emoji: '🦩', colorId: 'pink' },
      { name: 'Cherry Blossom', emoji: '🌸', colorId: 'pink' },
      { name: 'Pink Ribbon', emoji: '🎀', colorId: 'pink' },
      { name: 'Little Piggy', emoji: '🐷', colorId: 'pink' }
    ]
  }
];

export const SHAPES_DATA = [
  {
    id: 'circle',
    name: 'Circle',
    pronunciation: 'SUR-kuhl',
    description: 'Round and smooth with no sharp corners!',
    defaultColor: '#3b82f6',
    realWorld: [
      { name: 'Soccer Ball', emoji: '⚽' },
      { name: 'Golden Coin', emoji: '🪙' },
      { name: 'Wall Clock', emoji: '⏰' },
      { name: 'Yummy Cookie', emoji: '🍪' }
    ]
  },
  {
    id: 'square',
    name: 'Square',
    pronunciation: 'SKWAIR',
    description: 'Four equal sides and four straight corners!',
    defaultColor: '#ef4444',
    realWorld: [
      { name: 'Toy Box', emoji: '📦' },
      { name: 'Glass Window', emoji: '🪟' },
      { name: 'Rolling Dice', emoji: '🎲' },
      { name: 'Tasty Waffle', emoji: '🧇' }
    ]
  },
  {
    id: 'triangle',
    name: 'Triangle',
    pronunciation: 'TRY-ang-guhl',
    description: 'Three straight sides and three pointy corners!',
    defaultColor: '#eab308',
    realWorld: [
      { name: 'Pizza Slice', emoji: '🍕' },
      { name: 'Camping Tent', emoji: '⛺' },
      { name: 'Triangle Ruler', emoji: '📐' },
      { name: 'Watermelon Slice', emoji: '🍉' }
    ]
  },
  {
    id: 'rectangle',
    name: 'Rectangle',
    pronunciation: 'REK-tang-guhl',
    description: 'Two long sides and two short sides!',
    defaultColor: '#22c55e',
    realWorld: [
      { name: 'Front Door', emoji: '🚪' },
      { name: 'Smartphone', emoji: '📱' },
      { name: 'Chocolate Bar', emoji: '🍫' },
      { name: 'School Bus', emoji: '🚌' }
    ]
  },
  {
    id: 'star',
    name: 'Star',
    pronunciation: 'STAHR',
    description: 'Five magical twinkling points that shine bright!',
    defaultColor: '#f97316',
    realWorld: [
      { name: 'Night Sky Star', emoji: '⭐' },
      { name: 'Sea Starfish', emoji: '🌟' },
      { name: 'Winner Medal', emoji: '🏅' },
      { name: 'Magic Wand', emoji: '🪄' }
    ]
  },
  {
    id: 'oval',
    name: 'Oval',
    pronunciation: 'OH-vuhl',
    description: 'Like a stretched circle or a smooth egg!',
    defaultColor: '#a855f7',
    realWorld: [
      { name: 'Breakfast Egg', emoji: '🥚' },
      { name: 'Football', emoji: '🏈' },
      { name: 'Oval Mirror', emoji: '🪞' },
      { name: 'Green Avocado', emoji: '🥑' }
    ]
  },
  {
    id: 'heart',
    name: 'Heart',
    pronunciation: 'HAHRT',
    description: 'Two soft curves at the top and a sweet point below!',
    defaultColor: '#ec4899',
    realWorld: [
      { name: 'Love Note', emoji: '💌' },
      { name: 'Heart Balloon', emoji: '🎈' },
      { name: 'Sweet Cupcake', emoji: '🧁' },
      { name: 'Red Strawberry', emoji: '🍓' }
    ]
  }
];

// SVG Shape Renderer definitions
export function renderShapeSVG(shapeId, colorHex = '#3b82f6', size = 160) {
  const strokeColor = 'rgba(0, 0, 0, 0.15)';
  const strokeWidth = 5;

  switch (shapeId) {
    case 'circle':
      return (
        <svg width={size} height={size} viewBox="0 0 160 160" className="shape-svg-element">
          <circle
            cx="80"
            cy="80"
            r="68"
            fill={colorHex}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
          {/* Smiling Face */}
          <circle cx="62" cy="70" r="7" fill="#1e1b4b" />
          <circle cx="98" cy="70" r="7" fill="#1e1b4b" />
          <circle cx="59" cy="67" r="2.5" fill="#ffffff" />
          <circle cx="95" cy="67" r="2.5" fill="#ffffff" />
          <circle cx="53" cy="80" r="5" fill="#fb7185" opacity="0.6" />
          <circle cx="107" cy="80" r="5" fill="#fb7185" opacity="0.6" />
          <path
            d="M 64 88 Q 80 102 96 88"
            stroke="#1e1b4b"
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );

    case 'square':
      return (
        <svg width={size} height={size} viewBox="0 0 160 160" className="shape-svg-element">
          <rect
            x="20"
            y="20"
            width="120"
            height="120"
            rx="18"
            fill={colorHex}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
          {/* Smiling Face */}
          <circle cx="62" cy="70" r="7" fill="#1e1b4b" />
          <circle cx="98" cy="70" r="7" fill="#1e1b4b" />
          <circle cx="59" cy="67" r="2.5" fill="#ffffff" />
          <circle cx="95" cy="67" r="2.5" fill="#ffffff" />
          <circle cx="53" cy="80" r="5" fill="#fb7185" opacity="0.6" />
          <circle cx="107" cy="80" r="5" fill="#fb7185" opacity="0.6" />
          <path
            d="M 64 88 Q 80 102 96 88"
            stroke="#1e1b4b"
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );

    case 'triangle':
      return (
        <svg width={size} height={size} viewBox="0 0 160 160" className="shape-svg-element">
          <polygon
            points="80,18 146,138 14,138"
            fill={colorHex}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          {/* Smiling Face */}
          <circle cx="67" cy="86" r="6.5" fill="#1e1b4b" />
          <circle cx="93" cy="86" r="6.5" fill="#1e1b4b" />
          <circle cx="64" cy="83" r="2.2" fill="#ffffff" />
          <circle cx="90" cy="83" r="2.2" fill="#ffffff" />
          <circle cx="58" cy="94" r="4.5" fill="#fb7185" opacity="0.6" />
          <circle cx="102" cy="94" r="4.5" fill="#fb7185" opacity="0.6" />
          <path
            d="M 70 100 Q 80 110 90 100"
            stroke="#1e1b4b"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );

    case 'rectangle':
      return (
        <svg width={size} height={size} viewBox="0 0 160 160" className="shape-svg-element">
          <rect
            x="14"
            y="35"
            width="132"
            height="90"
            rx="16"
            fill={colorHex}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
          {/* Smiling Face */}
          <circle cx="62" cy="70" r="7" fill="#1e1b4b" />
          <circle cx="98" cy="70" r="7" fill="#1e1b4b" />
          <circle cx="59" cy="67" r="2.5" fill="#ffffff" />
          <circle cx="95" cy="67" r="2.5" fill="#ffffff" />
          <circle cx="53" cy="80" r="5" fill="#fb7185" opacity="0.6" />
          <circle cx="107" cy="80" r="5" fill="#fb7185" opacity="0.6" />
          <path
            d="M 66 88 Q 80 100 94 88"
            stroke="#1e1b4b"
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );

    case 'star':
      return (
        <svg width={size} height={size} viewBox="0 0 160 160" className="shape-svg-element">
          {/* 5-point star path */}
          <polygon
            points="80,14 98,58 146,62 108,94 120,142 80,116 40,142 52,94 14,62 62,58"
            fill={colorHex}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          {/* Smiling Face */}
          <circle cx="68" cy="80" r="6" fill="#1e1b4b" />
          <circle cx="92" cy="80" r="6" fill="#1e1b4b" />
          <circle cx="66" cy="78" r="2" fill="#ffffff" />
          <circle cx="90" cy="78" r="2" fill="#ffffff" />
          <circle cx="61" cy="88" r="4" fill="#fb7185" opacity="0.6" />
          <circle cx="99" cy="88" r="4" fill="#fb7185" opacity="0.6" />
          <path
            d="M 72 92 Q 80 101 88 92"
            stroke="#1e1b4b"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );

    case 'oval':
      return (
        <svg width={size} height={size} viewBox="0 0 160 160" className="shape-svg-element">
          <ellipse
            cx="80"
            cy="80"
            rx="68"
            ry="48"
            fill={colorHex}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
          {/* Smiling Face */}
          <circle cx="62" cy="72" r="7" fill="#1e1b4b" />
          <circle cx="98" cy="72" r="7" fill="#1e1b4b" />
          <circle cx="59" cy="69" r="2.5" fill="#ffffff" />
          <circle cx="95" cy="69" r="2.5" fill="#ffffff" />
          <circle cx="53" cy="82" r="5" fill="#fb7185" opacity="0.6" />
          <circle cx="107" cy="82" r="5" fill="#fb7185" opacity="0.6" />
          <path
            d="M 66 89 Q 80 100 94 89"
            stroke="#1e1b4b"
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );

    case 'heart':
      return (
        <svg width={size} height={size} viewBox="0 0 160 160" className="shape-svg-element">
          <path
            d="M 80,140 C 20,95 10,48 45,28 C 65,18 78,32 80,38 C 82,32 95,18 115,28 C 150,48 140,95 80,140 Z"
            fill={colorHex}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          {/* Smiling Face */}
          <circle cx="65" cy="68" r="6.5" fill="#1e1b4b" />
          <circle cx="95" cy="68" r="6.5" fill="#1e1b4b" />
          <circle cx="62" cy="65" r="2.2" fill="#ffffff" />
          <circle cx="92" cy="65" r="2.2" fill="#ffffff" />
          <circle cx="56" cy="78" r="4.5" fill="#fb7185" opacity="0.6" />
          <circle cx="104" cy="78" r="4.5" fill="#fb7185" opacity="0.6" />
          <path
            d="M 68 86 Q 80 97 92 86"
            stroke="#1e1b4b"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );

    default:
      return null;
  }
}
