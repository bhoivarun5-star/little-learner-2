import React from 'react';

// Friendly Character SVG Avatars
export const CharacterAvatars = {
  leo: () => (
    <svg viewBox="0 0 100 100" className="avatar-svg" aria-label="Leo the Lion Cub">
      <circle cx="50" cy="50" r="44" fill="#FDE68A" />
      {/* Mane petals */}
      <circle cx="50" cy="14" r="12" fill="#F59E0B" />
      <circle cx="75" cy="22" r="12" fill="#F59E0B" />
      <circle cx="86" cy="46" r="12" fill="#F59E0B" />
      <circle cx="78" cy="72" r="12" fill="#F59E0B" />
      <circle cx="50" cy="86" r="12" fill="#F59E0B" />
      <circle cx="22" cy="72" r="12" fill="#F59E0B" />
      <circle cx="14" cy="46" r="12" fill="#F59E0B" />
      <circle cx="25" cy="22" r="12" fill="#F59E0B" />
      {/* Head */}
      <circle cx="50" cy="50" r="32" fill="#FBBF24" />
      {/* Ears */}
      <circle cx="30" cy="26" r="8" fill="#F59E0B" />
      <circle cx="30" cy="26" r="4" fill="#FDE68A" />
      <circle cx="70" cy="26" r="8" fill="#F59E0B" />
      <circle cx="70" cy="26" r="4" fill="#FDE68A" />
      {/* Eyes */}
      <circle cx="40" cy="46" r="4.5" fill="#1F2937" />
      <circle cx="42" cy="44" r="1.5" fill="#FFFFFF" />
      <circle cx="60" cy="46" r="4.5" fill="#1F2937" />
      <circle cx="62" cy="44" r="1.5" fill="#FFFFFF" />
      {/* Cheeks */}
      <circle cx="34" cy="54" r="4" fill="#FCA5A5" opacity="0.6" />
      <circle cx="66" cy="54" r="4" fill="#FCA5A5" opacity="0.6" />
      {/* Nose & Smile */}
      <ellipse cx="50" cy="53" rx="4" ry="3" fill="#78350F" />
      <path d="M44 57 Q50 63 56 57" stroke="#78350F" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  ),
  mia: () => (
    <svg viewBox="0 0 100 100" className="avatar-svg" aria-label="Mia the Bunny">
      <circle cx="50" cy="50" r="46" fill="#FCE7F3" />
      {/* Bunny Ears */}
      <ellipse cx="36" cy="24" rx="8" ry="20" fill="#F9A8D4" transform="rotate(-10 36 24)" />
      <ellipse cx="36" cy="24" rx="4" ry="14" fill="#FDF2F8" transform="rotate(-10 36 24)" />
      <ellipse cx="64" cy="24" rx="8" ry="20" fill="#F9A8D4" transform="rotate(10 64 24)" />
      <ellipse cx="64" cy="24" rx="4" ry="14" fill="#FDF2F8" transform="rotate(10 64 24)" />
      {/* Head */}
      <circle cx="50" cy="58" r="32" fill="#FFFFFF" />
      {/* Eyes */}
      <circle cx="40" cy="54" r="4.5" fill="#1F2937" />
      <circle cx="41.5" cy="52.5" r="1.5" fill="#FFFFFF" />
      <circle cx="60" cy="54" r="4.5" fill="#1F2937" />
      <circle cx="61.5" cy="52.5" r="1.5" fill="#FFFFFF" />
      {/* Cheeks */}
      <circle cx="33" cy="62" r="5" fill="#F472B6" opacity="0.5" />
      <circle cx="67" cy="62" r="5" fill="#F472B6" opacity="0.5" />
      {/* Nose & Mouth */}
      <polygon points="50,60 46,57 54,57" fill="#F472B6" />
      <path d="M46 63 Q50 67 54 63" stroke="#DB2777" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  ),
  sam: () => (
    <svg viewBox="0 0 100 100" className="avatar-svg" aria-label="Sam the Bear Cub">
      <circle cx="50" cy="50" r="46" fill="#FEF3C7" />
      {/* Ears */}
      <circle cx="28" cy="28" r="12" fill="#B45309" />
      <circle cx="28" cy="28" r="6" fill="#FDE68A" />
      <circle cx="72" cy="28" r="12" fill="#B45309" />
      <circle cx="72" cy="28" r="6" fill="#FDE68A" />
      {/* Head */}
      <circle cx="50" cy="56" r="34" fill="#D97706" />
      {/* Muzzle */}
      <ellipse cx="50" cy="65" rx="16" ry="12" fill="#FEF3C7" />
      {/* Eyes */}
      <circle cx="39" cy="50" r="4.5" fill="#1F2937" />
      <circle cx="40.5" cy="48.5" r="1.5" fill="#FFFFFF" />
      <circle cx="61" cy="50" r="4.5" fill="#1F2937" />
      <circle cx="62.5" cy="48.5" r="1.5" fill="#FFFFFF" />
      {/* Nose & Mouth */}
      <ellipse cx="50" cy="61" rx="5" ry="3.5" fill="#451A03" />
      <path d="M45 68 Q50 72 55 68" stroke="#451A03" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  ),
  pip: () => (
    <svg viewBox="0 0 100 100" className="avatar-svg" aria-label="Pip the Puppy">
      <circle cx="50" cy="50" r="46" fill="#E0E7FF" />
      {/* Floppy Ears */}
      <ellipse cx="22" cy="46" rx="10" ry="20" fill="#6366F1" transform="rotate(15 22 46)" />
      <ellipse cx="78" cy="46" rx="10" ry="20" fill="#6366F1" transform="rotate(-15 78 46)" />
      {/* Head */}
      <circle cx="50" cy="54" r="32" fill="#818CF8" />
      {/* Eye Patch */}
      <ellipse cx="38" cy="50" rx="9" ry="10" fill="#C7D2FE" />
      {/* Eyes */}
      <circle cx="38" cy="50" r="4" fill="#1F2937" />
      <circle cx="39.5" cy="48.5" r="1.5" fill="#FFFFFF" />
      <circle cx="62" cy="50" r="4" fill="#1F2937" />
      <circle cx="63.5" cy="48.5" r="1.5" fill="#FFFFFF" />
      {/* Cheeks */}
      <circle cx="32" cy="60" r="4" fill="#FCA5A5" opacity="0.6" />
      <circle cx="68" cy="60" r="4" fill="#FCA5A5" opacity="0.6" />
      {/* Nose & Tongue */}
      <ellipse cx="50" cy="59" rx="5" ry="3.5" fill="#1E1B4B" />
      <path d="M46 64 Q50 68 54 64" stroke="#1E1B4B" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M48 66 Q50 73 52 66" fill="#F43F5E" />
    </svg>
  ),
  maya: () => (
    <svg viewBox="0 0 100 100" className="avatar-svg" aria-label="Maya the Wise Owl">
      <circle cx="50" cy="50" r="46" fill="#DCFCE7" />
      {/* Ear Tufts */}
      <polygon points="26,24 38,36 20,38" fill="#059669" />
      <polygon points="74,24 80,38 62,36" fill="#059669" />
      {/* Body / Head */}
      <circle cx="50" cy="54" r="34" fill="#10B981" />
      {/* Eye Discs */}
      <circle cx="38" cy="48" r="12" fill="#FFFFFF" />
      <circle cx="62" cy="48" r="12" fill="#FFFFFF" />
      {/* Pupils */}
      <circle cx="38" cy="48" r="5" fill="#065F46" />
      <circle cx="40" cy="46" r="2" fill="#FFFFFF" />
      <circle cx="62" cy="48" r="5" fill="#065F46" />
      <circle cx="64" cy="46" r="2" fill="#FFFFFF" />
      {/* Beak */}
      <polygon points="50,52 46,62 54,62" fill="#F59E0B" />
      {/* Cheeks */}
      <circle cx="26" cy="58" r="4" fill="#FCA5A5" opacity="0.6" />
      <circle cx="74" cy="58" r="4" fill="#FCA5A5" opacity="0.6" />
    </svg>
  )
};

// Rich Vector Scenario Visuals
export const ScenarioVisuals = {
  sharingBlocks: () => (
    <svg viewBox="0 0 240 160" className="scenario-svg">
      <rect width="240" height="160" rx="16" fill="#EFF6FF" />
      {/* Play Mat */}
      <rect x="20" y="110" width="200" height="35" rx="8" fill="#FED7AA" />
      {/* Leo Left */}
      <circle cx="60" cy="70" r="24" fill="#FBBF24" />
      <circle cx="45" cy="50" r="7" fill="#F59E0B" />
      <circle cx="75" cy="50" r="7" fill="#F59E0B" />
      <circle cx="54" cy="68" r="3.5" fill="#1E293B" />
      <circle cx="66" cy="68" r="3.5" fill="#1E293B" />
      <path d="M54 77 Q60 83 66 77" stroke="#78350F" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Hand offering block */}
      <rect x="80" y="78" width="18" height="18" rx="3" fill="#EF4444" />
      {/* Tower in Middle */}
      <rect x="105" y="90" width="28" height="24" rx="4" fill="#3B82F6" />
      <rect x="109" y="68" width="20" height="22" rx="4" fill="#10B981" />
      <polygon points="119,46 106,68 132,68" fill="#F59E0B" />
      {/* Mia Right */}
      <ellipse cx="180" cy="38" rx="5" ry="14" fill="#F9A8D4" transform="rotate(10 180 38)" />
      <circle cx="175" cy="70" r="22" fill="#FFFFFF" stroke="#F472B6" strokeWidth="3" />
      <circle cx="170" cy="68" r="3.5" fill="#1E293B" />
      <circle cx="182" cy="68" r="3.5" fill="#1E293B" />
      <path d="M171 76 Q176 81 181 76" stroke="#DB2777" strokeWidth="2" fill="none" strokeLinecap="round" />
      <rect x="140" y="78" width="18" height="18" rx="3" fill="#8B5CF6" />
      {/* Sparkles */}
      <text x="115" y="36" fontSize="18" textAnchor="middle">✨</text>
    </svg>
  ),
  takingTurnsSlide: () => (
    <svg viewBox="0 0 240 160" className="scenario-svg">
      <rect width="240" height="160" rx="16" fill="#F0FDF4" />
      {/* Playground Slide */}
      <path d="M50 140 L50 45 L75 45 L155 130 L175 130" stroke="#0284C7" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="50" y1="45" x2="50" y2="140" stroke="#0369A1" strokeWidth="6" />
      <line x1="42" y1="75" x2="58" y2="75" stroke="#38BDF8" strokeWidth="4" />
      <line x1="42" y1="105" x2="58" y2="105" stroke="#38BDF8" strokeWidth="4" />
      {/* Pip on the slide */}
      <circle cx="130" cy="85" r="16" fill="#818CF8" />
      <circle cx="126" cy="83" r="2.5" fill="#1E293B" />
      <circle cx="134" cy="83" r="2.5" fill="#1E293B" />
      <path d="M127 90 Q130 94 133 90" stroke="#1E1B4B" strokeWidth="1.5" fill="none" />
      {/* Sam waiting in line politely with smile */}
      <circle cx="30" cy="115" r="18" fill="#D97706" />
      <circle cx="26" cy="112" r="2.5" fill="#1E293B" />
      <circle cx="34" cy="112" r="2.5" fill="#1E293B" />
      <path d="M26 120 Q30 124 34 120" stroke="#451A03" strokeWidth="1.5" fill="none" />
      <text x="30" y="90" fontSize="16" textAnchor="middle">😊</text>
      <text x="135" y="65" fontSize="16" textAnchor="middle">Wheee!</text>
    </svg>
  ),
  helpingCrayons: () => (
    <svg viewBox="0 0 240 160" className="scenario-svg">
      <rect width="240" height="160" rx="16" fill="#FFFBEB" />
      {/* Table & Floor */}
      <rect x="0" y="115" width="240" height="45" fill="#FDE68A" opacity="0.5" />
      {/* Spilled crayons on floor */}
      <rect x="90" y="125" width="24" height="6" rx="3" fill="#EF4444" transform="rotate(20 90 125)" />
      <rect x="120" y="132" width="24" height="6" rx="3" fill="#3B82F6" transform="rotate(-15 120 132)" />
      <rect x="105" y="140" width="24" height="6" rx="3" fill="#10B981" transform="rotate(45 105 140)" />
      <rect x="138" y="128" width="24" height="6" rx="3" fill="#F59E0B" transform="rotate(10 138 128)" />
      {/* Maya looking surprised */}
      <circle cx="70" cy="65" r="24" fill="#10B981" />
      <circle cx="62" cy="62" r="8" fill="#FFFFFF" />
      <circle cx="78" cy="62" r="8" fill="#FFFFFF" />
      <circle cx="62" cy="62" r="3.5" fill="#065F46" />
      <circle cx="78" cy="62" r="3.5" fill="#065F46" />
      <polygon points="70,68 66,75 74,75" fill="#F59E0B" />
      {/* Pip bending to help with big smile */}
      <circle cx="175" cy="85" r="22" fill="#818CF8" />
      <circle cx="168" cy="82" r="3" fill="#1E293B" />
      <circle cx="178" cy="82" r="3" fill="#1E293B" />
      <path d="M168 91 Q173 96 178 91" stroke="#1E1B4B" strokeWidth="2" fill="none" />
      <text x="175" y="55" fontSize="16" textAnchor="middle">🤝</text>
    </svg>
  ),
  greetingSchool: () => (
    <svg viewBox="0 0 240 160" className="scenario-svg">
      <rect width="240" height="160" rx="16" fill="#F5F3FF" />
      {/* School door / Sun */}
      <circle cx="210" cy="30" r="22" fill="#FDE047" />
      <rect x="25" y="40" width="70" height="100" rx="6" fill="#C4B5FD" />
      <rect x="35" y="55" width="50" height="40" rx="4" fill="#EDE9FE" />
      {/* Teacher Maya waving */}
      <circle cx="120" cy="75" r="24" fill="#10B981" />
      <circle cx="112" cy="72" r="7" fill="#FFFFFF" />
      <circle cx="128" cy="72" r="7" fill="#FFFFFF" />
      <circle cx="112" cy="72" r="3" fill="#065F46" />
      <circle cx="128" cy="72" r="3" fill="#065F46" />
      <polygon points="120,77 117,83 123,83" fill="#F59E0B" />
      {/* Pip waving backpack */}
      <circle cx="185" cy="88" r="22" fill="#818CF8" />
      <rect x="198" y="80" width="12" height="18" rx="4" fill="#EC4899" />
      <path d="M178 95 Q183 100 188 95" stroke="#1E1B4B" strokeWidth="2" fill="none" />
      {/* Wave lines */}
      <text x="152" y="60" fontSize="18">👋</text>
      <text x="120" y="40" fontSize="13" fontWeight="bold" fill="#4B5563" textAnchor="middle">"Hello!"</text>
    </svg>
  ),
  askingPolitely: () => (
    <svg viewBox="0 0 240 160" className="scenario-svg">
      <rect width="240" height="160" rx="16" fill="#FEF2F2" />
      {/* Fire truck toy */}
      <rect x="105" y="100" width="45" height="24" rx="4" fill="#DC2626" />
      <circle cx="115" cy="126" r="6" fill="#1E293B" />
      <circle cx="140" cy="126" r="6" fill="#1E293B" />
      <rect x="132" y="90" width="12" height="10" rx="2" fill="#93C5FD" />
      <rect x="110" y="93" width="16" height="4" fill="#FBBF24" />
      {/* Leo asking with gentle hands */}
      <circle cx="65" cy="75" r="24" fill="#FBBF24" />
      <circle cx="58" cy="72" r="3" fill="#1E293B" />
      <circle cx="70" cy="72" r="3" fill="#1E293B" />
      <path d="M59 82 Q65 87 71 82" stroke="#78350F" strokeWidth="2" fill="none" />
      <text x="65" y="42" fontSize="13" fontWeight="bold" fill="#7C2D12" textAnchor="middle">"Please? 🙏"</text>
      {/* Sam smiling */}
      <circle cx="180" cy="75" r="24" fill="#D97706" />
      <circle cx="174" cy="72" r="3" fill="#1E293B" />
      <circle cx="186" cy="72" r="3" fill="#1E293B" />
      <path d="M175 83 Q180 88 185 83" stroke="#451A03" strokeWidth="2" fill="none" />
    </svg>
  ),
  sayingThankYou: () => (
    <svg viewBox="0 0 240 160" className="scenario-svg">
      <rect width="240" height="160" rx="16" fill="#FDF2F8" />
      {/* Gift box */}
      <rect x="105" y="95" width="34" height="30" rx="4" fill="#EC4899" />
      <rect x="119" y="95" width="6" height="30" fill="#FDE047" />
      <rect x="105" y="107" width="34" height="6" fill="#FDE047" />
      <ellipse cx="116" cy="92" rx="4" ry="3" fill="#FDE047" />
      <ellipse cx="128" cy="92" rx="4" ry="3" fill="#FDE047" />
      {/* Mia giving heart */}
      <circle cx="70" cy="75" r="24" fill="#FFFFFF" stroke="#F472B6" strokeWidth="3" />
      <circle cx="64" cy="72" r="3" fill="#1E293B" />
      <circle cx="74" cy="72" r="3" fill="#1E293B" />
      <path d="M64 82 Q70 87 76 82" stroke="#DB2777" strokeWidth="2" fill="none" />
      <text x="70" y="42" fontSize="13" fontWeight="bold" fill="#9D174D" textAnchor="middle">"Thank You! ❤️"</text>
      {/* Sam happy */}
      <circle cx="175" cy="75" r="24" fill="#D97706" />
      <circle cx="168" cy="72" r="3" fill="#1E293B" />
      <circle cx="180" cy="72" r="3" fill="#1E293B" />
      <path d="M169 82 Q174 88 180 82" stroke="#451A03" strokeWidth="2" fill="none" />
      <text x="122" y="70" fontSize="18" textAnchor="middle">💖</text>
    </svg>
  ),
  listeningEars: () => (
    <svg viewBox="0 0 240 160" className="scenario-svg">
      <rect width="240" height="160" rx="16" fill="#ECFDF5" />
      {/* Storybook open */}
      <path d="M50 100 Q80 90 110 100 L110 135 Q80 125 50 135 Z" fill="#60A5FA" />
      <path d="M110 100 Q140 90 170 100 L170 135 Q140 125 110 135 Z" fill="#93C5FD" />
      {/* Teacher Maya talking */}
      <circle cx="65" cy="55" r="22" fill="#10B981" />
      <circle cx="58" cy="52" r="6" fill="#FFFFFF" />
      <circle cx="72" cy="52" r="6" fill="#FFFFFF" />
      <polygon points="65,58 62,64 68,64" fill="#F59E0B" />
      <text x="65" y="24" fontSize="13" fontWeight="bold" fill="#065F46" textAnchor="middle">"Once upon a time..."</text>
      {/* Leo & Sam listening attentively */}
      <circle cx="160" cy="65" r="18" fill="#FBBF24" />
      <circle cx="155" cy="63" r="2.5" fill="#1E293B" />
      <circle cx="165" cy="63" r="2.5" fill="#1E293B" />
      <circle cx="198" cy="72" r="18" fill="#D97706" />
      <circle cx="193" cy="70" r="2.5" fill="#1E293B" />
      <circle cx="203" cy="70" r="2.5" fill="#1E293B" />
      <text x="178" y="36" fontSize="18" textAnchor="middle">👂✨</text>
    </svg>
  ),
  includingFriend: () => (
    <svg viewBox="0 0 240 160" className="scenario-svg">
      <rect width="240" height="160" rx="16" fill="#F0F9FF" />
      {/* Bench with shy little bunny */}
      <rect x="25" y="105" width="55" height="10" rx="3" fill="#94A3B8" />
      <line x1="35" y1="115" x2="35" y2="135" stroke="#64748B" strokeWidth="4" />
      <line x1="70" y1="115" x2="70" y2="135" stroke="#64748B" strokeWidth="4" />
      <circle cx="52" cy="85" r="18" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
      <circle cx="47" cy="83" r="2.5" fill="#1E293B" />
      <circle cx="55" cy="83" r="2.5" fill="#1E293B" />
      {/* Friends approaching holding hands & waving */}
      <circle cx="130" cy="75" r="20" fill="#FBBF24" />
      <circle cx="170" cy="75" r="20" fill="#818CF8" />
      <circle cx="208" cy="80" r="18" fill="#D97706" />
      <line x1="145" y1="85" x2="155" y2="85" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
      <line x1="185" y1="88" x2="195" y2="88" stroke="#6366F1" strokeWidth="4" strokeLinecap="round" />
      <text x="120" y="44" fontSize="14" fontWeight="bold" fill="#0369A1" textAnchor="middle">"Come play! 🤗"</text>
      <text x="175" y="40" fontSize="18">🎈</text>
    </svg>
  )
};

// Mode 1: What Should I Do?
export const WHAT_SHOULD_I_DO_DATA = [
  {
    id: 'wsid-1',
    category: 'sharing',
    title: 'Sharing the Blocks',
    visual: ScenarioVisuals.sharingBlocks,
    character: 'leo',
    prompt: 'Mia wants to build with blocks too. What should Leo do?',
    options: [
      {
        id: 'opt-1a',
        text: 'Share blocks & build together! 🏰',
        icon: '🏰',
        isCorrect: true,
        feedback: 'Wonderful! Building together makes a taller, happier castle!'
      },
      {
        id: 'opt-1b',
        text: 'Hide all the blocks away 🙈',
        icon: '🙈',
        isCorrect: false,
        feedback: 'When we hide toys, friends feel left out. Sharing brings more fun!'
      }
    ],
    hint: 'Think about what makes both friends smile and build something awesome together!'
  },
  {
    id: 'wsid-2',
    category: 'turns',
    title: 'The Playground Slide',
    visual: ScenarioVisuals.takingTurnsSlide,
    character: 'sam',
    prompt: 'Pip is sliding down. What should Sam do at the ladder?',
    options: [
      {
        id: 'opt-2a',
        text: 'Wait for my turn happily! 🛝',
        icon: '🛝',
        isCorrect: true,
        feedback: 'Super star! Waiting your turn keeps everyone safe and smiling!'
      },
      {
        id: 'opt-2b',
        text: 'Push ahead to go first 🛑',
        icon: '🛑',
        isCorrect: false,
        feedback: 'Pushing can hurt friends. Taking turns is the kind way!'
      }
    ],
    hint: 'Count "1, 2, 3" and cheer for your friend while you wait for your turn!'
  },
  {
    id: 'wsid-3',
    category: 'helping',
    title: 'Dropped Crayons',
    visual: ScenarioVisuals.helpingCrayons,
    character: 'pip',
    prompt: 'Maya accidentally dropped her crayons. What should Pip do?',
    options: [
      {
        id: 'opt-3a',
        text: 'Help pick them up kindly! 🖍️',
        icon: '🖍️',
        isCorrect: true,
        feedback: 'You are a helping hero! Helping a friend makes everyone warm inside!'
      },
      {
        id: 'opt-3b',
        text: 'Walk away and ignore it 🚶',
        icon: '🚶',
        isCorrect: false,
        feedback: 'Maya might feel sad cleaning alone. Lending a hand is so kind!'
      }
    ],
    hint: 'Look at the floor! Helping hands make cleaning super fast and fun!'
  },
  {
    id: 'wsid-4',
    category: 'greeting',
    title: 'Arriving at School',
    visual: ScenarioVisuals.greetingSchool,
    character: 'pip',
    prompt: 'Pip walks into class and sees teacher & friends. What should Pip do?',
    options: [
      {
        id: 'opt-4a',
        text: 'Smile & say "Good Morning!" 👋',
        icon: '👋',
        isCorrect: true,
        feedback: 'Bright greeting! A warm hello starts everyone’s day with joy!'
      },
      {
        id: 'opt-4b',
        text: 'Look down and frown 🫥',
        icon: '🫥',
        isCorrect: false,
        feedback: 'A cheerful wave or smile helps your friends know you are glad to see them!'
      }
    ],
    hint: 'Wave your hand and share a sunny smile!'
  },
  {
    id: 'wsid-5',
    category: 'magic-words',
    title: 'Asking for the Fire Truck',
    visual: ScenarioVisuals.askingPolitely,
    character: 'leo',
    prompt: 'Leo wants a turn with the fire truck toy. What should Leo say?',
    options: [
      {
        id: 'opt-5a',
        text: '"May I please have a turn next?" 🙏',
        icon: '🙏',
        isCorrect: true,
        feedback: 'Magic words work like sunshine! Asking politely makes friends happy to share!'
      },
      {
        id: 'opt-5b',
        text: '"Gimme that truck right now!" 💥',
        icon: '💥',
        isCorrect: false,
        feedback: 'Demanding or grabbing scares friends. Always use polite words!'
      }
    ],
    hint: 'Use the magic word that starts with "P"!'
  },
  {
    id: 'wsid-6',
    category: 'magic-words',
    title: 'Receiving a Sweet Gift',
    visual: ScenarioVisuals.sayingThankYou,
    character: 'mia',
    prompt: 'Sam gives Mia a lovely gift wrapped in ribbon. What should Mia say?',
    options: [
      {
        id: 'opt-6a',
        text: '"Thank you so much, Sam!" ❤️',
        icon: '❤️',
        isCorrect: true,
        feedback: 'Heartfelt manners! Saying "Thank You" shows gratitude and love!'
      },
      {
        id: 'opt-6b',
        text: 'Grab it and run off 🤐',
        icon: '🤐',
        isCorrect: false,
        feedback: 'Sam worked hard on the gift! Remembering to thank friends is polite.'
      }
    ],
    hint: 'Say the special words to thank someone who did something sweet!'
  },
  {
    id: 'wsid-7',
    category: 'listening',
    title: 'Story Time Circle',
    visual: ScenarioVisuals.listeningEars,
    character: 'sam',
    prompt: 'Teacher Maya opens an exciting fairy tale book. What should friends do?',
    options: [
      {
        id: 'opt-7a',
        text: 'Turn on listening ears & focus 👂',
        icon: '👂',
        isCorrect: true,
        feedback: 'Great listening! Quiet ears help everyone enjoy the whole magic story!'
      },
      {
        id: 'opt-7b',
        text: 'Shout and play loudly 📢',
        icon: '📢',
        isCorrect: false,
        feedback: 'Loud chatter makes it hard for others to hear the story.'
      }
    ],
    hint: 'Look at the reader with your eyes, and listen with your ears!'
  },
  {
    id: 'wsid-8',
    category: 'kindness',
    title: 'The New Friend',
    visual: ScenarioVisuals.includingFriend,
    character: 'leo',
    prompt: 'A new kid is sitting all by themselves on the bench. What should we do?',
    options: [
      {
        id: 'opt-8a',
        text: '"Come play tag with us!" 🤗',
        icon: '🤗',
        isCorrect: true,
        feedback: 'Kindness champion! Inviting someone to play can make their whole day!'
      },
      {
        id: 'opt-8b',
        text: 'Leave them alone on the bench 🙁',
        icon: '🙁',
        isCorrect: false,
        feedback: 'Being alone can feel lonely. Asking them to join is being a true friend!'
      }
    ],
    hint: 'Everyone loves to be invited to have fun together!'
  }
];

// Mode 2: Good Choice or Try Again?
export const GOOD_CHOICE_DATA = [
  {
    id: 'gc-1',
    action: 'Sharing your colors with your drawing partner',
    emoji: '🖍️',
    isGood: true,
    feedback: 'Yes! Sharing colors helps create colorful rainbows together!'
  },
  {
    id: 'gc-2',
    action: 'Snatching a toy car out of someone’s hands',
    emoji: '🚗',
    isGood: false,
    feedback: 'Try again! Snatching hurts feelings. Always ask "May I please play next?"'
  },
  {
    id: 'gc-3',
    action: 'Saying "Thank You" when someone opens the door',
    emoji: '🚪',
    isGood: true,
    feedback: 'Wonderful manners! Polite words make the world friendly!'
  },
  {
    id: 'gc-4',
    action: 'Waiting patiently in line for the swing',
    emoji: '🛝',
    isGood: true,
    feedback: 'Awesome patience! Taking turns is fair and keeps everyone safe!'
  },
  {
    id: 'gc-5',
    action: 'Interrupting loudly while the teacher is speaking',
    emoji: '📢',
    isGood: false,
    feedback: 'Try again! Raise a quiet hand and wait for your turn to speak!'
  },
  {
    id: 'gc-6',
    action: 'Giving a warm gentle hug to a friend who is crying',
    emoji: '🤗',
    isGood: true,
    feedback: 'Heart of gold! Comforting a sad friend shows deep kindness!'
  },
  {
    id: 'gc-7',
    action: 'Refusing to let another child join your ball game',
    emoji: '⚽',
    isGood: false,
    feedback: 'Try again! The more friends who play, the more fun games become!'
  },
  {
    id: 'gc-8',
    action: 'Putting blocks back in the toy bin when finished',
    emoji: '🧸',
    isGood: true,
    feedback: 'Super helper! Cleaning up together keeps our play room neat!'
  }
];

// Mode 3: Role-Play Adventures (Multi-Step Mini Stories)
export const ROLE_PLAY_STORIES = [
  {
    id: 'story-blocks',
    title: 'The Great Castle Project',
    tagline: 'Learning to Share & Cooperate',
    icon: '🏰',
    themeColor: '#3B82F6',
    steps: [
      {
        scene: 'Leo has built a tall blue tower. Mia hops over with a basket of yellow blocks.',
        dialogue: 'Mia: "Wow, Leo! Can I build a castle with you?"',
        question: 'How should Leo respond?',
        options: [
          {
            text: '"Yes! Let’s add your yellow blocks as the castle towers!" 🏰',
            isCorrect: true,
            reaction: 'Mia jumps with joy! Together you build the biggest castle in the playroom!'
          },
          {
            text: '"No, this is only my tower, go away!" 🙅',
            isCorrect: false,
            reaction: 'Mia looks sad and walks away with her head down. Let’s try being more welcoming!'
          }
        ]
      },
      {
        scene: 'Oh no! The tower wobbles and a few blocks tumble down with a gentle crash!',
        dialogue: 'Mia gasps: "Oh dear! Our wall fell down!"',
        question: 'What should Leo and Mia do now?',
        options: [
          {
            text: '"Don’t worry! We can rebuild it even stronger together!" 💪',
            isCorrect: true,
            reaction: 'High five! Mistakes happen, but teamwork fixes everything!'
          },
          {
            text: 'Get super angry and kick the remaining blocks 💥',
            isCorrect: false,
            reaction: 'Kicking blocks makes people feel scared. Taking a deep breath and trying again is much better!'
          }
        ]
      }
    ]
  },
  {
    id: 'story-friends',
    title: 'The New Friend at Recess',
    tagline: 'Making Friends & Being Kind',
    icon: '🤝',
    themeColor: '#10B981',
    steps: [
      {
        scene: 'It is recess time! Pip and Sam are playing hopscotch. A new puppy is watching from by the tree.',
        dialogue: 'Pip whispers: "Look, there is a new puppy. They look shy."',
        question: 'What should Pip and Sam do?',
        options: [
          {
            text: 'Walk over with a friendly wave: "Hi! I’m Pip. Do you want to hop with us?" 👋',
            isCorrect: true,
            reaction: 'The new puppy’s tail wags fast! "Yes, please! My name is Toby!"'
          },
          {
            text: 'Point and laugh at them 🙈',
            isCorrect: false,
            reaction: 'That would hurt their feelings. Welcoming new friends with a smile is the kind choice!'
          }
        ]
      },
      {
        scene: 'Toby has never played hopscotch before and misses a square.',
        dialogue: 'Toby blushes: "Oops, I don’t know how to jump on one foot yet."',
        question: 'How can Sam encourage Toby?',
        options: [
          {
            text: '"You did great! Watch my feet, I can teach you the hop!" 👟',
            isCorrect: true,
            reaction: 'Toby smiles broadly and tries again. You just made a best friend forever!'
          },
          {
            text: '"You lost! You cannot play with us anymore!" 🛑',
            isCorrect: false,
            reaction: 'Everyone learns at their own pace! Encouraging friends makes everyone feel safe.'
          }
        ]
      }
    ]
  },
  {
    id: 'story-turn',
    title: 'The Carousel Turn',
    tagline: 'Patience & Taking Turns',
    icon: '🎠',
    themeColor: '#F59E0B',
    steps: [
      {
        scene: 'The playground has a wonderful spinning carousel. Mia is currently riding on the white pony.',
        dialogue: 'Sam really wants to ride the pony too!',
        question: 'What should Sam do while waiting?',
        options: [
          {
            text: 'Stand in line, cheer for Mia, and wait for the bell! 🔔',
            isCorrect: true,
            reaction: 'Mia waves as she spins by: "Thanks Sam! Your turn next!"'
          },
          {
            text: 'Run up and pull Mia off the carousel horse 🛑',
            isCorrect: false,
            reaction: 'Pulling someone off a moving ride is dangerous and unkind. Waiting your turn is safe!'
          }
        ]
      },
      {
        scene: 'The carousel stops! Mia hops down with a big smile.',
        dialogue: 'Mia: "All done! It was so fast and fun!"',
        question: 'What should Sam do now?',
        options: [
          {
            text: 'Say "Thanks Mia!" and climb on smoothly for his turn! 🐎',
            isCorrect: true,
            reaction: 'The carousel spins! Both friends enjoy equal turns and huge smiles!'
          },
          {
            text: 'Refuse to ever let Mia have a turn again 🚫',
            isCorrect: false,
            reaction: 'Sharing turns equally makes the playground fun for all kids!'
          }
        ]
      }
    ]
  }
];

// Mode 4: Kindness Superpowers Guide (7 Core Habits)
export const KINDNESS_SUPERPOWERS = [
  {
    id: 'sp-share',
    title: 'Super Sharer',
    emoji: '🎁',
    badge: 'Gold Star of Sharing',
    color: '#3B82F6',
    motto: 'Sharing toys doubles the smiles!',
    tip: 'Offer a friend a toy, block, or crayon to use together.'
  },
  {
    id: 'sp-turns',
    title: 'Turn-Taking Champ',
    emoji: '🔄',
    badge: 'Patience Ribbon',
    color: '#10B981',
    motto: 'Waiting my turn keeps everyone safe!',
    tip: 'Count "1, 2, 3" and cheer for your friends while you wait.'
  },
  {
    id: 'sp-help',
    title: 'Helping Hero',
    emoji: '🤝',
    badge: 'Helping Hands Medal',
    color: '#8B5CF6',
    motto: 'Helping hands make light work!',
    tip: 'When you see someone drop something or stumble, offer to help.'
  },
  {
    id: 'sp-greet',
    title: 'Sunny Greeter',
    emoji: '👋',
    badge: 'Friendly Smile Badge',
    color: '#EC4899',
    motto: 'A warm hello brings sunny vibes!',
    tip: 'Wave and say "Good morning!" or "Hello!" to teachers and pals.'
  },
  {
    id: 'sp-magic',
    title: 'Magic Word Wizard',
    emoji: '✨',
    badge: 'Polite Manners Crown',
    color: '#F59E0B',
    motto: '"Please" and "Thank you" are magic keys!',
    tip: 'Say "Please" when asking, and "Thank you" when receiving.'
  },
  {
    id: 'sp-listen',
    title: 'Active Listener',
    emoji: '👂',
    badge: 'Listening Owl Award',
    color: '#06B6D4',
    motto: 'Listen with your heart and ears!',
    tip: 'Look at the speaker, keep calm hands, and wait before speaking.'
  },
  {
    id: 'sp-kind',
    title: 'Kindness Champion',
    emoji: '💖',
    badge: 'Golden Heart Trophy',
    color: '#EF4444',
    motto: 'Being kind is the greatest superpower!',
    tip: 'Say something nice to cheer up someone who feels sad.'
  }
];
