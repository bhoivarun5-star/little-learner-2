import React from 'react';

export const CATEGORIES = [
  { id: 'animals', label: 'Animals', labelMr: 'प्राणी', icon: '🦁', color: '#f59e0b', bg: '#fef3c7' },
  { id: 'fruits', label: 'Fruits', labelMr: 'फळे', icon: '🍓', color: '#ef4444', bg: '#fee2e2' },
  { id: 'vehicles', label: 'Vehicles', labelMr: 'वाहने', icon: '🚀', color: '#3b82f6', bg: '#dbeafe' },
  { id: 'numbers', label: 'Numbers', labelMr: 'अंक', icon: '🔢', color: '#10b981', bg: '#d1fae5' },
  { id: 'shapes', label: 'Shapes', labelMr: 'आकार', icon: '⭐', color: '#8b5cf6', bg: '#ede9fe' }
];

export const DIFFICULTY_LEVELS = [
  { id: 'easy2', label: '2 Pieces', labelMr: '२ तुकडे', pieces: 2, rows: 1, cols: 2, badge: '🟢 Very Easy', badgeMr: '🟢 अतिशय सोपे', age: '3 Yrs', ageMr: '३ वर्षे' },
  { id: 'easy4', label: '4 Pieces', labelMr: '४ तुकडे', pieces: 4, rows: 2, cols: 2, badge: '🟢 Easy', badgeMr: '🟢 सोपे', age: '3–4 Yrs', ageMr: '३–४ वर्षे' },
  { id: 'medium', label: '6 Pieces', labelMr: '६ तुकडे', pieces: 6, rows: 2, cols: 3, badge: '🟡 Medium', badgeMr: '🟡 मध्यम', age: '4–5 Yrs', ageMr: '४–५ वर्षे' },
  { id: 'hard', label: '9 Pieces', labelMr: '९ तुकडे', pieces: 9, rows: 3, cols: 3, badge: '🔴 Hard', badgeMr: '🔴 कठीण', age: '5–6 Yrs', ageMr: '५–६ वर्षे' }
];

export const PUZZLES_DATA = [
  // ==========================================
  // ANIMALS
  // ==========================================
  {
    id: 'lion',
    category: 'animals',
    name: 'Friendly Lion',
    nameMr: 'मैत्रीपूर्ण सिंह',
    subtitle: 'The brave and happy king of the jungle!',
    subtitleMr: 'जंगलाचा शूर आणि आनंदी राजा!',
    funFact: 'Lions love to play and take long sunny cat naps!',
    funFactMr: 'सिंहांना खेळायला आणि उन्हात छान झोपायला आवडते!',
    badgeColor: '#f59e0b',
    bgGradient: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    renderArt: () => (
      <svg viewBox="0 0 400 400" className="puzzle-vector-svg">
        <defs>
          <radialGradient id="lionMane" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </radialGradient>
          <linearGradient id="lionBody" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#facc15" />
          </linearGradient>
        </defs>
        {/* Soft Background Cloud and Grass */}
        <circle cx="200" cy="200" r="185" fill="#fef9c3" />
        <ellipse cx="200" cy="360" rx="160" ry="40" fill="#86efac" />
        {/* Mane (cute puffy scalloped petals) */}
        <g fill="url(#lionMane)">
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const cx = 200 + 105 * Math.cos(rad);
            const cy = 185 + 105 * Math.sin(rad);
            return <circle key={angle} cx={cx} cy={cy} r="42" />;
          })}
        </g>
        {/* Ears */}
        <circle cx="120" cy="115" r="28" fill="#f59e0b" />
        <circle cx="120" cy="115" r="16" fill="#fbcfe8" />
        <circle cx="280" cy="115" r="28" fill="#f59e0b" />
        <circle cx="280" cy="115" r="16" fill="#fbcfe8" />
        {/* Head */}
        <circle cx="200" cy="185" r="95" fill="url(#lionBody)" />
        {/* Rosy Cheeks */}
        <circle cx="140" cy="210" r="18" fill="#f43f5e" opacity="0.4" />
        <circle cx="260" cy="210" r="18" fill="#f43f5e" opacity="0.4" />
        {/* Cute Big Eyes */}
        <ellipse cx="160" cy="175" rx="14" ry="18" fill="#1e1b4b" />
        <circle cx="164" cy="169" r="6" fill="#ffffff" />
        <circle cx="156" cy="182" r="2.5" fill="#ffffff" />
        <ellipse cx="240" cy="175" rx="14" ry="18" fill="#1e1b4b" />
        <circle cx="244" cy="169" r="6" fill="#ffffff" />
        <circle cx="236" cy="182" r="2.5" fill="#ffffff" />
        {/* Cute Nose */}
        <polygon points="200,215 185,195 215,195" fill="#92400e" rx="4" />
        {/* Smiling Mouth */}
        <path d="M 200 215 Q 185 240 170 230" fill="none" stroke="#92400e" strokeWidth="4" strokeLinecap="round" />
        <path d="M 200 215 Q 215 240 230 230" fill="none" stroke="#92400e" strokeWidth="4" strokeLinecap="round" />
        {/* Whiskers */}
        <line x1="125" y1="205" x2="85" y2="198" stroke="#d97706" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="125" y1="220" x2="80" y2="225" stroke="#d97706" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="275" y1="205" x2="315" y2="198" stroke="#d97706" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="275" y1="220" x2="320" y2="225" stroke="#d97706" strokeWidth="3.5" strokeLinecap="round" />
        {/* Golden Little Crown */}
        <path d="M 165 95 L 180 65 L 200 85 L 220 65 L 235 95 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="3" />
        <circle cx="180" cy="63" r="5" fill="#ef4444" />
        <circle cx="200" cy="83" r="5" fill="#3b82f6" />
        <circle cx="220" cy="63" r="5" fill="#ef4444" />
        {/* Sparkles */}
        <path d="M 60 80 Q 75 80 75 65 Q 75 80 90 80 Q 75 80 75 95 Q 75 80 60 80 Z" fill="#fbbf24" />
        <path d="M 320 80 Q 335 80 335 65 Q 335 80 350 80 Q 335 80 335 95 Q 335 80 320 80 Z" fill="#fbbf24" />
      </svg>
    )
  },
  {
    id: 'elephant',
    category: 'animals',
    name: 'Happy Elephant',
    nameMr: 'आनंदी हत्ती',
    subtitle: 'Big flappy ears and a cheerful swinging trunk!',
    subtitleMr: 'मोठे कान आणि आनंदाने डोलणारी सोंड!',
    funFact: 'Elephants can spray water with their trunk like a garden hose!',
    funFactMr: 'हत्ती आपल्या सोंडेने पाण्याचे फवारे उडवू शकतात!',
    badgeColor: '#0284c7',
    bgGradient: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
    renderArt: () => (
      <svg viewBox="0 0 400 400" className="puzzle-vector-svg">
        <circle cx="200" cy="200" r="185" fill="#f0f9ff" />
        <ellipse cx="200" cy="360" rx="160" ry="35" fill="#a7f3d0" />
        {/* Big Flappy Ears */}
        <ellipse cx="100" cy="180" rx="65" ry="80" fill="#93c5fd" />
        <ellipse cx="100" cy="180" rx="42" ry="55" fill="#fbcfe8" />
        <ellipse cx="300" cy="180" rx="65" ry="80" fill="#93c5fd" />
        <ellipse cx="300" cy="180" rx="42" ry="55" fill="#fbcfe8" />
        {/* Head */}
        <circle cx="200" cy="190" r="95" fill="#60a5fa" />
        {/* Cheeks */}
        <circle cx="145" cy="225" r="16" fill="#f472b6" opacity="0.4" />
        <circle cx="255" cy="225" r="16" fill="#f472b6" opacity="0.4" />
        {/* Big Twinkly Eyes */}
        <circle cx="160" cy="170" r="16" fill="#1e1b4b" />
        <circle cx="164" cy="164" r="6" fill="#ffffff" />
        <circle cx="156" cy="176" r="2.5" fill="#ffffff" />
        <circle cx="240" cy="170" r="16" fill="#1e1b4b" />
        <circle cx="244" cy="164" r="6" fill="#ffffff" />
        <circle cx="236" cy="176" r="2.5" fill="#ffffff" />
        {/* Happy Curved Trunk */}
        <path
          d="M 185 220 C 180 270, 160 305, 200 320 C 230 330, 245 285, 235 270 C 230 260, 215 265, 218 280"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="32"
          strokeLinecap="round"
        />
        {/* Water Droplets from trunk */}
        <circle cx="240" cy="235" r="8" fill="#38bdf8" />
        <circle cx="265" cy="215" r="11" fill="#38bdf8" />
        <circle cx="290" cy="195" r="7" fill="#38bdf8" />
        <path d="M 185 105 Q 200 85 215 105" stroke="#3b82f6" strokeWidth="5" fill="none" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'panda',
    category: 'animals',
    name: 'Playful Panda',
    nameMr: 'खोडकर पांडा',
    subtitle: 'A sweet cuddly panda enjoying tasty bamboo!',
    subtitleMr: 'गोड बांबू खाणारा गोंडस पांडा!',
    funFact: 'Pandas love munching on crunchy green bamboo shoots all day!',
    funFactMr: 'पांडांना दिवसभर कुरकुरीत हिरवा बांबू खायला आवडतो!',
    badgeColor: '#10b981',
    bgGradient: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
    renderArt: () => (
      <svg viewBox="0 0 400 400" className="puzzle-vector-svg">
        <circle cx="200" cy="200" r="185" fill="#f0fdf4" />
        {/* Bamboo Stalks in background */}
        <rect x="50" y="30" width="18" height="340" rx="9" fill="#4ade80" />
        <line x1="50" y1="120" x2="68" y2="120" stroke="#16a34a" strokeWidth="3" />
        <line x1="50" y1="210" x2="68" y2="210" stroke="#16a34a" strokeWidth="3" />
        <path d="M 68 120 Q 95 105 110 125 Q 85 135 68 120 Z" fill="#22c55e" />
        {/* Panda Ears */}
        <circle cx="125" cy="115" r="35" fill="#1f2937" />
        <circle cx="275" cy="115" r="35" fill="#1f2937" />
        {/* Head */}
        <ellipse cx="200" cy="195" rx="100" ry="90" fill="#ffffff" stroke="#e5e7eb" strokeWidth="4" />
        {/* Black Eye Patches */}
        <ellipse cx="155" cy="180" rx="26" ry="32" transform="rotate(-15 155 180)" fill="#1f2937" />
        <ellipse cx="245" cy="180" rx="26" ry="32" transform="rotate(15 245 180)" fill="#1f2937" />
        {/* Eyes */}
        <circle cx="156" cy="178" r="10" fill="#ffffff" />
        <circle cx="158" cy="178" r="6" fill="#111827" />
        <circle cx="159" cy="176" r="2.5" fill="#ffffff" />
        <circle cx="244" cy="178" r="10" fill="#ffffff" />
        <circle cx="242" cy="178" r="6" fill="#111827" />
        <circle cx="241" cy="176" r="2.5" fill="#ffffff" />
        {/* Pink Cheeks */}
        <circle cx="130" cy="225" r="16" fill="#f472b6" opacity="0.45" />
        <circle cx="270" cy="225" r="16" fill="#f472b6" opacity="0.45" />
        {/* Nose & Smile */}
        <ellipse cx="200" cy="215" rx="14" ry="10" fill="#1f2937" />
        <path d="M 200 225 L 200 235" stroke="#1f2937" strokeWidth="3.5" />
        <path d="M 185 235 Q 200 250 215 235" fill="none" stroke="#1f2937" strokeWidth="3.5" strokeLinecap="round" />
        {/* Little Bamboo in Paw */}
        <path d="M 280 270 Q 320 230 330 170" stroke="#22c55e" strokeWidth="12" fill="none" strokeLinecap="round" />
        <path d="M 315 200 Q 340 190 350 210 Q 330 220 315 200 Z" fill="#16a34a" />
      </svg>
    )
  },

  // ==========================================
  // FRUITS
  // ==========================================
  {
    id: 'strawberry',
    category: 'fruits',
    name: 'Sweet Strawberry',
    nameMr: 'गोड स्ट्रॉबेरी',
    subtitle: 'Bright red, juicy, and packed with sweet sunshine!',
    subtitleMr: 'लालभडक, रसाळ आणि गोड स्ट्रॉबेरी!',
    funFact: 'Strawberries are the only fruit that wear their seeds on the outside!',
    funFactMr: 'स्ट्रॉबेरी हे एकमेव फळ आहे ज्याच्या बिया बाहेर असतात!',
    badgeColor: '#ef4444',
    bgGradient: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
    renderArt: () => (
      <svg viewBox="0 0 400 400" className="puzzle-vector-svg">
        <circle cx="200" cy="200" r="185" fill="#fff1f2" />
        {/* Big Strawberry Body */}
        <path
          d="M 200 350 C 130 320, 80 250, 95 170 C 105 110, 160 110, 200 125 C 240 110, 295 110, 305 170 C 320 250, 270 320, 200 350 Z"
          fill="#ef4444"
          stroke="#dc2626"
          strokeWidth="5"
        />
        {/* Strawberry Highlight */}
        <path
          d="M 130 170 C 120 210, 135 260, 155 290"
          stroke="#f87171"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />
        {/* Seeds (cute little golden dots) */}
        {[
          [150, 170], [200, 160], [250, 170],
          [130, 220], [170, 210], [230, 210], [270, 220],
          [150, 265], [200, 260], [250, 265],
          [180, 305], [220, 305]
        ].map(([x, y], idx) => (
          <ellipse key={idx} cx={x} cy={y} rx="4.5" ry="7" fill="#fef08a" transform={`rotate(${idx % 2 === 0 ? 10 : -10} ${x} ${y})`} />
        ))}
        {/* Cute Face */}
        <circle cx="165" cy="210" r="9" fill="#1e1b4b" />
        <circle cx="168" cy="207" r="3.5" fill="#ffffff" />
        <circle cx="235" cy="210" r="9" fill="#1e1b4b" />
        <circle cx="238" cy="207" r="3.5" fill="#ffffff" />
        <circle cx="145" cy="225" r="12" fill="#f43f5e" opacity="0.6" />
        <circle cx="255" cy="225" r="12" fill="#f43f5e" opacity="0.6" />
        <path d="M 185 225 Q 200 245 215 225" fill="none" stroke="#1e1b4b" strokeWidth="4" strokeLinecap="round" />
        {/* Green Leafy Crown */}
        <path d="M 200 120 C 190 70, 160 55, 140 70 C 160 95, 175 110, 190 122" fill="#22c55e" stroke="#16a34a" strokeWidth="3" />
        <path d="M 200 120 C 210 70, 240 55, 260 70 C 240 95, 225 110, 210 122" fill="#22c55e" stroke="#16a34a" strokeWidth="3" />
        <path d="M 200 120 C 200 65, 200 50, 200 45" stroke="#15803d" strokeWidth="12" strokeLinecap="round" fill="none" />
        <ellipse cx="200" cy="115" rx="45" ry="15" fill="#4ade80" />
      </svg>
    )
  },
  {
    id: 'banana',
    category: 'fruits',
    name: 'Golden Banana',
    nameMr: 'पिवळे केळे',
    subtitle: 'Sweet, sunny, and super yummy energy booster!',
    subtitleMr: 'गोड, चवदार आणि भरपूर ताकद देणारे केळे!',
    funFact: 'Bananas naturally smile with a happy curved curve!',
    funFactMr: 'केळ्याचा सुंदर आकार हसऱ्या चेहऱ्यासारखा दिसतो!',
    badgeColor: '#eab308',
    bgGradient: 'linear-gradient(135deg, #fefce8 0%, #fef08a 100%)',
    renderArt: () => (
      <svg viewBox="0 0 400 400" className="puzzle-vector-svg">
        <circle cx="200" cy="200" r="185" fill="#fefce8" />
        {/* Banana Body */}
        <path
          d="M 90 120 C 130 90, 260 80, 310 200 C 330 250, 310 320, 270 340 C 230 355, 180 330, 130 270 C 90 220, 75 160, 90 120 Z"
          fill="#fde047"
          stroke="#ca8a04"
          strokeWidth="6"
        />
        {/* Banana Inner Curve Shade */}
        <path
          d="M 120 150 C 150 120, 240 120, 270 210 C 290 250, 270 300, 240 315"
          fill="none"
          stroke="#facc15"
          strokeWidth="16"
          strokeLinecap="round"
        />
        {/* Stem and Tip */}
        <path d="M 90 120 L 70 95 C 65 90, 75 80, 85 85 L 105 105 Z" fill="#84cc16" stroke="#4d7c0f" strokeWidth="3" />
        <circle cx="270" cy="340" r="8" fill="#713f12" />
        {/* Cute Face on Banana */}
        <circle cx="190" cy="180" r="9" fill="#1e1b4b" />
        <circle cx="193" cy="177" r="3.5" fill="#ffffff" />
        <circle cx="240" cy="195" r="9" fill="#1e1b4b" />
        <circle cx="243" cy="192" r="3.5" fill="#ffffff" />
        <circle cx="175" cy="200" r="11" fill="#f43f5e" opacity="0.45" />
        <circle cx="250" cy="215" r="11" fill="#f43f5e" opacity="0.45" />
        <path d="M 205 205 Q 220 225 235 215" fill="none" stroke="#713f12" strokeWidth="4" strokeLinecap="round" />
        {/* Sparkles */}
        <path d="M 110 260 Q 120 260 120 250 Q 120 260 130 260 Q 120 260 120 270 Q 120 260 110 260 Z" fill="#ca8a04" />
        <path d="M 280 110 Q 295 110 295 95 Q 295 110 310 110 Q 295 110 295 125 Q 295 110 280 110 Z" fill="#ca8a04" />
      </svg>
    )
  },
  {
    id: 'apple',
    category: 'fruits',
    name: 'Crunchy Apple',
    nameMr: 'कुरकुरीत सफरचंद',
    subtitle: 'A sweet rosy apple that keeps the doctor away!',
    subtitleMr: 'आरोग्यदायी आणि गोड लाल सफरचंद!',
    funFact: 'Apples float in water because 25% of their volume is fresh air!',
    funFactMr: 'सफरचंद पाण्यात तरंगते कारण त्यात हवा असते!',
    badgeColor: '#dc2626',
    bgGradient: 'linear-gradient(135deg, #fee2e2 0%, #fca5a5 100%)',
    renderArt: () => (
      <svg viewBox="0 0 400 400" className="puzzle-vector-svg">
        <circle cx="200" cy="200" r="185" fill="#fff5f5" />
        {/* Apple Body */}
        <path
          d="M 200 130 C 140 100, 70 140, 80 230 C 90 310, 150 350, 195 345 C 200 345, 205 345, 210 345 C 255 350, 315 310, 325 230 C 335 140, 265 100, 200 130 Z"
          fill="#ef4444"
          stroke="#b91c1c"
          strokeWidth="6"
        />
        {/* Apple Gloss Highlight */}
        <path d="M 120 170 C 105 210, 110 260, 130 290" stroke="#fca5a5" strokeWidth="12" strokeLinecap="round" fill="none" />
        {/* Stem */}
        <path d="M 200 135 Q 205 90 225 65" stroke="#78350f" strokeWidth="9" strokeLinecap="round" fill="none" />
        {/* Green Leaf */}
        <path d="M 215 95 Q 260 70 280 90 Q 260 125 215 95 Z" fill="#22c55e" stroke="#15803d" strokeWidth="3" />
        {/* Cute Face */}
        <circle cx="160" cy="215" r="10" fill="#1e1b4b" />
        <circle cx="164" cy="211" r="4" fill="#ffffff" />
        <circle cx="240" cy="215" r="10" fill="#1e1b4b" />
        <circle cx="244" cy="211" r="4" fill="#ffffff" />
        <circle cx="135" cy="235" r="14" fill="#fda4af" opacity="0.7" />
        <circle cx="265" cy="235" r="14" fill="#fda4af" opacity="0.7" />
        <path d="M 185 235 Q 200 255 215 235" fill="none" stroke="#1e1b4b" strokeWidth="4.5" strokeLinecap="round" />
      </svg>
    )
  },

  // ==========================================
  // VEHICLES
  // ==========================================
  {
    id: 'rocket',
    category: 'vehicles',
    name: 'Space Rocket',
    nameMr: 'अवकाश रॉकेट',
    subtitle: '3, 2, 1... Blast off to the shining stars!',
    subtitleMr: '३, २, १... चमचमणाऱ्या ताऱ्यांकडे उड्डाण!',
    funFact: 'Rockets travel faster than a speeding shooting star!',
    funFactMr: 'रॉकेट ताऱ्यांपेक्षाही वेगाने प्रवास करतात!',
    badgeColor: '#3b82f6',
    bgGradient: 'linear-gradient(135deg, #eff6ff 0%, #bfdbfe 100%)',
    renderArt: () => (
      <svg viewBox="0 0 400 400" className="puzzle-vector-svg">
        <circle cx="200" cy="200" r="185" fill="#0f172a" />
        {/* Little Background Stars & Planets */}
        <circle cx="80" cy="90" r="3" fill="#ffffff" />
        <circle cx="120" cy="50" r="2" fill="#ffffff" />
        <circle cx="310" cy="70" r="3" fill="#ffffff" />
        <circle cx="340" cy="140" r="2" fill="#ffffff" />
        <circle cx="70" cy="300" r="16" fill="#ec4899" opacity="0.7" />
        <circle cx="320" cy="310" r="22" fill="#8b5cf6" opacity="0.7" />
        {/* Rocket Flames */}
        <path d="M 175 285 Q 200 375 225 285 Z" fill="#f59e0b" />
        <path d="M 185 285 Q 200 345 215 285 Z" fill="#ef4444" />
        {/* Rocket Fins */}
        <path d="M 160 220 L 115 275 L 160 270 Z" fill="#ef4444" stroke="#b91c1c" strokeWidth="3" />
        <path d="M 240 220 L 285 275 L 240 270 Z" fill="#ef4444" stroke="#b91c1c" strokeWidth="3" />
        {/* Rocket Main Hull */}
        <path
          d="M 200 65 C 240 120, 245 220, 240 285 L 160 285 C 155 220, 160 120, 200 65 Z"
          fill="#f8fafc"
          stroke="#94a3b8"
          strokeWidth="4"
        />
        {/* Rocket Cone Red Top */}
        <path d="M 200 65 C 220 95, 225 125, 227 135 L 173 135 C 175 125, 180 95, 200 65 Z" fill="#ef4444" />
        {/* Round Porthole Window */}
        <circle cx="200" cy="185" r="32" fill="#0284c7" stroke="#38bdf8" strokeWidth="6" />
        <circle cx="200" cy="185" r="24" fill="#67e8f9" />
        {/* Smiling Alien in Porthole */}
        <circle cx="200" cy="187" r="14" fill="#22c55e" />
        <circle cx="196" cy="184" r="2.5" fill="#1e1b4b" />
        <circle cx="204" cy="184" r="2.5" fill="#1e1b4b" />
        <path d="M 197 192 Q 200 196 203 192" stroke="#15803d" strokeWidth="1.5" fill="none" />
      </svg>
    )
  },
  {
    id: 'train',
    category: 'vehicles',
    name: 'Choo-Choo Train',
    nameMr: 'आगगाडी (छुक छुक)',
    subtitle: 'Puffing white steam along the joyful countryside!',
    subtitleMr: 'छुक छुक करत धूर सोडत धावणारी आगगाडी!',
    funFact: 'Trains travel on long steel rails across hills and bridges!',
    funFactMr: 'आगगाड्या रुळांवरून डोंगर आणि पुलांवरून धावतात!',
    badgeColor: '#8b5cf6',
    bgGradient: 'linear-gradient(135deg, #f5f3ff 0%, #ddd6fe 100%)',
    renderArt: () => (
      <svg viewBox="0 0 400 400" className="puzzle-vector-svg">
        <circle cx="200" cy="200" r="185" fill="#ede9fe" />
        {/* Steam Clouds */}
        <circle cx="130" cy="90" r="20" fill="#ffffff" opacity="0.9" />
        <circle cx="105" cy="70" r="26" fill="#ffffff" opacity="0.9" />
        <circle cx="75" cy="55" r="32" fill="#ffffff" opacity="0.9" />
        {/* Track */}
        <line x1="40" y1="335" x2="360" y2="335" stroke="#78350f" strokeWidth="8" />
        {[70, 110, 150, 190, 230, 270, 310].map((x) => (
          <line key={x} x1={x} y1="325" x2={x} y2="345" stroke="#92400e" strokeWidth="6" />
        ))}
        {/* Train Cab (Back) */}
        <rect x="220" y="160" width="110" height="130" rx="14" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="4" />
        {/* Cab Roof */}
        <rect x="210" y="145" width="130" height="20" rx="8" fill="#ef4444" />
        {/* Cab Window */}
        <rect x="240" y="180" width="70" height="45" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="3" />
        {/* Train Boiler (Front) */}
        <rect x="90" y="195" width="140" height="95" rx="16" fill="#ef4444" stroke="#b91c1c" strokeWidth="4" />
        {/* Cowcatcher / Front Grill */}
        <polygon points="65,290 90,240 90,290" fill="#f59e0b" stroke="#d97706" strokeWidth="3" />
        {/* Chimney */}
        <rect x="120" y="140" width="30" height="60" fill="#f59e0b" rx="4" />
        <ellipse cx="135" cy="140" rx="20" ry="8" fill="#d97706" />
        {/* Big Headlight */}
        <circle cx="85" cy="225" r="14" fill="#fef08a" stroke="#ca8a04" strokeWidth="3" />
        {/* Wheels */}
        <circle cx="130" cy="305" r="26" fill="#1e293b" stroke="#64748b" strokeWidth="5" />
        <circle cx="130" cy="305" r="10" fill="#94a3b8" />
        <circle cx="190" cy="305" r="26" fill="#1e293b" stroke="#64748b" strokeWidth="5" />
        <circle cx="190" cy="305" r="10" fill="#94a3b8" />
        <circle cx="275" cy="300" r="32" fill="#1e293b" stroke="#64748b" strokeWidth="6" />
        <circle cx="275" cy="300" r="12" fill="#94a3b8" />
      </svg>
    )
  },

  // ==========================================
  // NUMBERS
  // ==========================================
  {
    id: 'num1',
    category: 'numbers',
    name: 'Number 1 & Sun',
    nameMr: 'अंक १ आणि सूर्य',
    subtitle: 'One bright shining sun warming up the sky!',
    subtitleMr: 'आकाशात चमकणारा एक तेजस्वी सूर्य!',
    funFact: 'There is only 1 sun in our solar system!',
    funFactMr: 'आपल्या सूर्यमालेत फक्त १ सूर्य आहे!',
    badgeColor: '#10b981',
    bgGradient: 'linear-gradient(135deg, #ecfdf5 0%, #a7f3d0 100%)',
    renderArt: () => (
      <svg viewBox="0 0 400 400" className="puzzle-vector-svg">
        <circle cx="200" cy="200" r="185" fill="#f0fdf4" />
        {/* Radiant Sun in Top-Right */}
        <g>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((ang) => (
            <line
              key={ang}
              x1="290"
              y1="110"
              x2={290 + 55 * Math.cos((ang * Math.PI) / 180)}
              y2={110 + 55 * Math.sin((ang * Math.PI) / 180)}
              stroke="#f59e0b"
              strokeWidth="6"
              strokeLinecap="round"
            />
          ))}
          <circle cx="290" cy="110" r="38" fill="#fde047" stroke="#eab308" strokeWidth="4" />
          <circle cx="278" cy="105" r="4" fill="#713f12" />
          <circle cx="302" cy="105" r="4" fill="#713f12" />
          <path d="M 284 118 Q 290 126 296 118" stroke="#713f12" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
        {/* Giant Number 1 with Cute Cartoon Face */}
        <path
          d="M 140 160 L 190 100 L 220 100 L 220 310 L 250 310 L 250 340 L 140 340 L 140 310 L 175 310 L 175 145 L 140 170 Z"
          fill="#10b981"
          stroke="#047857"
          strokeWidth="6"
          strokeLinejoin="round"
        />
        {/* Face on Number 1 */}
        <circle cx="195" cy="180" r="6" fill="#ffffff" />
        <circle cx="196" cy="180" r="3.5" fill="#064e3b" />
        <circle cx="185" cy="195" r="7" fill="#6ee7b7" opacity="0.6" />
        <path d="M 190 205 Q 198 215 206 205" stroke="#064e3b" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* Cute Butterfly Flying by */}
        <circle cx="100" cy="270" r="8" fill="#f43f5e" />
        <ellipse cx="90" cy="260" rx="14" ry="10" fill="#fb7185" />
        <ellipse cx="90" cy="280" rx="11" ry="8" fill="#fb7185" />
      </svg>
    )
  },
  {
    id: 'num2',
    category: 'numbers',
    name: 'Number 2 & Ducks',
    nameMr: 'अंक २ आणि बदके',
    subtitle: 'Two yellow ducklings swimming in the pond!',
    subtitleMr: 'तलावात पोहणारी दोन पिवळी बदके!',
    funFact: 'Ducklings say quack quack and love warm pond splashes!',
    funFactMr: 'बदके क्वॅक क्वॅक करतात आणि पाण्यात पोहतात!',
    badgeColor: '#0ea5e9',
    bgGradient: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
    renderArt: () => (
      <svg viewBox="0 0 400 400" className="puzzle-vector-svg">
        <circle cx="200" cy="200" r="185" fill="#e0f2fe" />
        {/* Pond Water Waves */}
        <ellipse cx="200" cy="330" rx="160" ry="40" fill="#38bdf8" opacity="0.4" />
        {/* Bold Number 2 */}
        <path
          d="M 100 130 C 100 80, 200 70, 200 130 C 200 175, 120 230, 95 280 L 210 280 L 210 320 L 70 320 C 70 270, 155 210, 160 145 C 160 115, 125 115, 115 130 Z"
          fill="#3b82f6"
          stroke="#1d4ed8"
          strokeWidth="6"
          strokeLinejoin="round"
        />
        {/* Duckling 1 */}
        <g transform="translate(210, 130)">
          <ellipse cx="40" cy="45" rx="30" ry="22" fill="#facc15" stroke="#ca8a04" strokeWidth="3" />
          <circle cx="55" cy="25" r="18" fill="#facc15" stroke="#ca8a04" strokeWidth="3" />
          <polygon points="70,25 88,28 70,33" fill="#f97316" />
          <circle cx="60" cy="22" r="3.5" fill="#1e1b4b" />
          <circle cx="61" cy="21" r="1" fill="#ffffff" />
        </g>
        {/* Duckling 2 */}
        <g transform="translate(230, 220)">
          <ellipse cx="40" cy="45" rx="34" ry="24" fill="#facc15" stroke="#ca8a04" strokeWidth="3" />
          <circle cx="58" cy="22" r="20" fill="#facc15" stroke="#ca8a04" strokeWidth="3" />
          <polygon points="75,22 95,26 75,32" fill="#f97316" />
          <circle cx="64" cy="18" r="4" fill="#1e1b4b" />
          <circle cx="65" cy="17" r="1.5" fill="#ffffff" />
        </g>
      </svg>
    )
  },

  // ==========================================
  // SHAPES
  // ==========================================
  {
    id: 'star',
    category: 'shapes',
    name: 'Sparkling Star',
    nameMr: 'चमकती चांदणी',
    subtitle: 'Twinkle, twinkle little star, shining in the night!',
    subtitleMr: 'चांदोबाच्या देशातील चमकणारी सुंदर चांदणी!',
    funFact: 'Stars shine bright across the nighttime galaxy!',
    funFactMr: 'चांदण्या रात्रीच्या आकाशात लखलखतात!',
    badgeColor: '#f59e0b',
    bgGradient: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    renderArt: () => (
      <svg viewBox="0 0 400 400" className="puzzle-vector-svg">
        <circle cx="200" cy="200" r="185" fill="#1e1b4b" />
        {/* Star Glow */}
        <circle cx="200" cy="200" r="130" fill="#fbbf24" opacity="0.25" />
        {/* Big Cheerful 5-Point Star */}
        <polygon
          points="200,60 238,148 335,155 260,218 284,312 200,260 116,312 140,218 65,155 162,148"
          fill="#fde047"
          stroke="#f59e0b"
          strokeWidth="8"
          strokeLinejoin="round"
        />
        {/* Blushing Cheeks */}
        <circle cx="150" cy="210" r="16" fill="#f43f5e" opacity="0.6" />
        <circle cx="250" cy="210" r="16" fill="#f43f5e" opacity="0.6" />
        {/* Big Happy Eyes */}
        <circle cx="170" cy="185" r="12" fill="#1e1b4b" />
        <circle cx="174" cy="181" r="4" fill="#ffffff" />
        <circle cx="230" cy="185" r="12" fill="#1e1b4b" />
        <circle cx="234" cy="181" r="4" fill="#ffffff" />
        {/* Big Smile */}
        <path d="M 185 205 Q 200 228 215 205" stroke="#b45309" strokeWidth="5" fill="none" strokeLinecap="round" />
        {/* Twinkle Dust */}
        <path d="M 60 70 Q 70 70 70 60 Q 70 70 80 70 Q 70 70 70 80 Q 70 70 60 70 Z" fill="#ffffff" />
        <path d="M 330 290 Q 340 290 340 280 Q 340 290 350 290 Q 340 290 340 300 Q 340 290 330 290 Z" fill="#ffffff" />
      </svg>
    )
  },
  {
    id: 'heart',
    category: 'shapes',
    name: 'Lovely Heart',
    nameMr: 'सुंदर हृदय',
    subtitle: 'A sweet pink heart full of love and warm hugs!',
    subtitleMr: 'प्रेम आणि आपुलकीचे सुंदर हृदय!',
    funFact: 'Hearts remind us to share kindness and love with our friends!',
    funFactMr: 'हृदय आपल्याला सर्वांशी प्रेमाने वागण्याची आठवण करून देते!',
    badgeColor: '#ec4899',
    bgGradient: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)',
    renderArt: () => (
      <svg viewBox="0 0 400 400" className="puzzle-vector-svg">
        <circle cx="200" cy="200" r="185" fill="#fff1f2" />
        {/* Heart Glow */}
        <circle cx="200" cy="200" r="140" fill="#f43f5e" opacity="0.15" />
        {/* Big Heart Shape */}
        <path
          d="M 200 135 C 170 80, 80 85, 75 175 C 70 240, 150 295, 200 345 C 250 295, 330 240, 325 175 C 320 85, 230 80, 200 135 Z"
          fill="#f43f5e"
          stroke="#be123c"
          strokeWidth="7"
          strokeLinejoin="round"
        />
        {/* Gloss highlight */}
        <path d="M 115 160 C 105 190, 115 225, 135 245" stroke="#fda4af" strokeWidth="10" strokeLinecap="round" fill="none" />
        {/* Cute Face */}
        <circle cx="160" cy="195" r="10" fill="#1e1b4b" />
        <circle cx="163" cy="191" r="3.5" fill="#ffffff" />
        <circle cx="240" cy="195" r="10" fill="#1e1b4b" />
        <circle cx="243" cy="191" r="3.5" fill="#ffffff" />
        <circle cx="138" cy="215" r="14" fill="#fb7185" opacity="0.6" />
        <circle cx="262" cy="215" r="14" fill="#fb7185" opacity="0.6" />
        <path d="M 185 215 Q 200 235 215 215" stroke="#881337" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      </svg>
    )
  }
];
