import React from 'react';

// Crisp, playful SVG character illustrations for each good habit
export const HABIT_ILLUSTRATIONS = {
  brushingTeeth: (
    <svg viewBox="0 0 160 160" width="100%" height="100%">
      <defs>
        <linearGradient id="foamGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e0f2fe" />
          <stop offset="100%" stopColor="#bae6fd" />
        </linearGradient>
      </defs>
      {/* Sparkle background */}
      <circle cx="80" cy="80" r="70" fill="#f0fdf4" stroke="#86efac" strokeWidth="3" />
      {/* Big happy tooth character */}
      <path
        d="M 50 50 C 45 30, 75 30, 80 45 C 85 30, 115 30, 110 50 C 115 80, 112 125, 96 125 C 88 125, 84 105, 80 105 C 76 105, 72 125, 64 125 C 48 125, 45 80, 50 50 Z"
        fill="#ffffff"
        stroke="#38bdf8"
        strokeWidth="3.5"
      />
      {/* Happy eyes */}
      <circle cx="68" cy="65" r="4.5" fill="#1e1b4b" />
      <circle cx="92" cy="65" r="4.5" fill="#1e1b4b" />
      <circle cx="70" cy="63" r="1.5" fill="#ffffff" />
      <circle cx="94" cy="63" r="1.5" fill="#ffffff" />
      {/* Rosy cheeks */}
      <circle cx="60" cy="74" r="5" fill="#fca5a5" opacity="0.6" />
      <circle cx="100" cy="74" r="5" fill="#fca5a5" opacity="0.6" />
      {/* Big smile */}
      <path d="M 70 76 Q 80 88 90 76" fill="none" stroke="#1e1b4b" strokeWidth="3" strokeLinecap="round" />
      {/* Cute blue toothbrush */}
      <g transform="rotate(-30 115 75)">
        <rect x="110" y="40" width="10" height="70" rx="5" fill="#0284c7" />
        <rect x="107" y="30" width="16" height="15" rx="3" fill="#38bdf8" />
        {/* Bristles */}
        <line x1="109" y1="28" x2="109" y2="23" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="115" y1="28" x2="115" y2="23" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="121" y1="28" x2="121" y2="23" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      {/* Foam bubbles */}
      <circle cx="48" cy="46" r="8" fill="url(#foamGrad)" stroke="#7dd3fc" strokeWidth="1.5" />
      <circle cx="112" cy="44" r="7" fill="url(#foamGrad)" stroke="#7dd3fc" strokeWidth="1.5" />
      <circle cx="80" cy="32" r="6" fill="url(#foamGrad)" stroke="#7dd3fc" strokeWidth="1.5" />
      {/* Shiny star */}
      <path d="M 50 100 L 53 108 L 61 108 L 55 113 L 57 121 L 50 116 L 43 121 L 45 113 L 39 108 L 47 108 Z" fill="#fbbf24" />
    </svg>
  ),

  washingHands: (
    <svg viewBox="0 0 160 160" width="100%" height="100%">
      {/* Background circle */}
      <circle cx="80" cy="80" r="70" fill="#f0f9ff" stroke="#7dd3fc" strokeWidth="3" />
      {/* Water tap */}
      <path d="M 35 45 L 80 45 Q 92 45 92 60 L 92 70" fill="none" stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" />
      <rect x="84" y="70" width="16" height="6" rx="2" fill="#64748b" />
      {/* Water stream */}
      <path d="M 92 76 Q 90 95 86 115" fill="none" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" strokeDasharray="3 3" />
      {/* Left Hand */}
      <ellipse cx="68" cy="100" rx="16" ry="12" fill="#fed7aa" stroke="#f97316" strokeWidth="2" transform="rotate(-15 68 100)" />
      {/* Right Hand */}
      <ellipse cx="90" cy="104" rx="16" ry="12" fill="#fed7aa" stroke="#f97316" strokeWidth="2" transform="rotate(15 90 104)" />
      {/* Soap bar */}
      <rect x="66" y="86" width="26" height="15" rx="6" fill="#ec4899" stroke="#db2777" strokeWidth="2" />
      <circle cx="79" cy="93.5" r="3" fill="#fbcfe8" />
      {/* Fluffy soap bubbles */}
      <circle cx="56" cy="85" r="9" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.8" opacity="0.9" />
      <circle cx="102" cy="90" r="11" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.8" opacity="0.9" />
      <circle cx="76" cy="68" r="8" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.8" opacity="0.9" />
      <circle cx="62" cy="116" r="6" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" opacity="0.9" />
      <circle cx="100" cy="118" r="7" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" opacity="0.9" />
      {/* Sparkling clean stars */}
      <path d="M 120 45 L 122 51 L 128 51 L 123 55 L 125 61 L 120 57 L 115 61 L 117 55 L 112 51 L 118 51 Z" fill="#fbbf24" />
    </svg>
  ),

  takingBath: (
    <svg viewBox="0 0 160 160" width="100%" height="100%">
      <circle cx="80" cy="80" r="70" fill="#faf5ff" stroke="#d8b4fe" strokeWidth="3" />
      {/* Bathtub */}
      <path d="M 30 90 L 130 90 C 130 125, 30 125, 30 90 Z" fill="#ffffff" stroke="#7c3aed" strokeWidth="3.5" />
      <rect x="25" y="86" width="110" height="7" rx="3.5" fill="#8b5cf6" />
      {/* Tub feet */}
      <path d="M 45 116 L 40 126" stroke="#7c3aed" strokeWidth="4" strokeLinecap="round" />
      <path d="M 115 116 L 120 126" stroke="#7c3aed" strokeWidth="4" strokeLinecap="round" />
      {/* Water & bubbles inside tub */}
      <path d="M 32 90 Q 55 86 80 90 Q 105 94 128 90" fill="none" stroke="#60a5fa" strokeWidth="4" />
      {/* Cute yellow rubber ducky */}
      <g transform="translate(68, 62)">
        <ellipse cx="14" cy="18" rx="14" ry="10" fill="#facc15" stroke="#ca8a04" strokeWidth="1.8" />
        <circle cx="20" cy="10" r="8" fill="#facc15" stroke="#ca8a04" strokeWidth="1.8" />
        <polygon points="26,10 33,12 26,14" fill="#ea580c" />
        <circle cx="22" cy="8" r="1.5" fill="#1e1b4b" />
      </g>
      {/* Splash bubbles */}
      <circle cx="48" cy="78" r="7" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" />
      <circle cx="60" cy="68" r="5" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" />
      <circle cx="112" cy="74" r="8" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" />
      <circle cx="102" cy="62" r="5" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" />
    </svg>
  ),

  healthyFood: (
    <svg viewBox="0 0 160 160" width="100%" height="100%">
      <circle cx="80" cy="80" r="70" fill="#fefce8" stroke="#fde047" strokeWidth="3" />
      {/* Big fresh red apple */}
      <g transform="translate(38, 48)">
        <path d="M 28 8 Q 28 0 34 0 Q 36 6 30 10 Z" fill="#15803d" />
        <line x1="28" y1="8" x2="28" y2="3" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
        <path
          d="M 12 14 C 4 14, 0 25, 0 36 C 0 54, 16 64, 27 64 C 30 64, 32 62, 34 62 C 36 62, 38 64, 41 64 C 52 64, 68 54, 68 36 C 68 25, 64 14, 56 14 C 45 14, 38 20, 34 20 C 30 20, 23 14, 12 14 Z"
          fill="#ef4444"
          stroke="#b91c1c"
          strokeWidth="2.5"
        />
        {/* Apple shiny spot */}
        <ellipse cx="18" cy="28" rx="4" ry="7" fill="#ffffff" opacity="0.4" transform="rotate(-20 18 28)" />
      </g>
      {/* Fresh Orange */}
      <circle cx="110" cy="94" r="22" fill="#f97316" stroke="#c2410c" strokeWidth="2.5" />
      <circle cx="110" cy="74" r="2.5" fill="#15803d" />
      <ellipse cx="102" cy="86" rx="3" ry="5" fill="#ffffff" opacity="0.3" />
      {/* Green leaves */}
      <path d="M 110 74 Q 120 66 122 72 Q 118 78 110 74 Z" fill="#22c55e" />
      {/* Crunchy Carrot */}
      <g transform="rotate(-35 80 115)">
        <polygon points="75,100 85,100 80,135" fill="#ea580c" stroke="#c2410c" strokeWidth="2" />
        <path d="M 80 100 L 76 90 M 80 100 L 80 88 M 80 100 L 84 90" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  ),

  organizeToys: (
    <svg viewBox="0 0 160 160" width="100%" height="100%">
      <circle cx="80" cy="80" r="70" fill="#fef3c7" stroke="#fcd34d" strokeWidth="3" />
      {/* Toy Storage Box */}
      <rect x="35" y="75" width="90" height="55" rx="10" fill="#f59e0b" stroke="#b45309" strokeWidth="3" />
      <rect x="30" y="68" width="100" height="10" rx="4" fill="#d97706" stroke="#92400e" strokeWidth="2" />
      {/* Handle */}
      <rect x="68" y="90" width="24" height="10" rx="5" fill="#78350f" />
      {/* Teddy bear peeking out */}
      <g transform="translate(48, 38)">
        {/* Ears */}
        <circle cx="12" cy="14" r="6" fill="#b45309" stroke="#78350f" strokeWidth="1.5" />
        <circle cx="12" cy="14" r="3.5" fill="#fed7aa" />
        <circle cx="36" cy="14" r="6" fill="#b45309" stroke="#78350f" strokeWidth="1.5" />
        <circle cx="36" cy="14" r="3.5" fill="#fed7aa" />
        {/* Head */}
        <circle cx="24" cy="24" r="16" fill="#d97706" stroke="#78350f" strokeWidth="2" />
        {/* Muzzle */}
        <ellipse cx="24" cy="28" rx="8" ry="6" fill="#fed7aa" />
        <circle cx="24" cy="25" r="2.5" fill="#451a03" />
        <path d="M 24 28 L 24 31 M 21 31 Q 24 33 27 31" stroke="#451a03" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        {/* Eyes */}
        <circle cx="18" cy="21" r="2.5" fill="#1e1b4b" />
        <circle cx="30" cy="21" r="2.5" fill="#1e1b4b" />
      </g>
      {/* Toy ball */}
      <circle cx="106" cy="62" r="13" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" />
      <path d="M 96 56 Q 106 62 116 56" stroke="#ef4444" strokeWidth="3" fill="none" />
      <path d="M 96 68 Q 106 62 116 68" stroke="#eab308" strokeWidth="3" fill="none" />
      {/* Star sparkles */}
      <path d="M 125 35 L 127 40 L 132 40 L 128 43 L 130 48 L 125 45 L 120 48 L 122 43 L 118 40 L 123 40 Z" fill="#f59e0b" />
    </svg>
  ),

  sayPleaseThanks: (
    <svg viewBox="0 0 160 160" width="100%" height="100%">
      <circle cx="80" cy="80" r="70" fill="#fdf2f8" stroke="#fbcfe8" strokeWidth="3" />
      {/* Friendly smiling child */}
      <circle cx="80" cy="74" r="30" fill="#fed7aa" stroke="#f97316" strokeWidth="2.5" />
      {/* Cute curly hair */}
      <path d="M 52 65 C 50 42, 66 36, 80 36 C 94 36, 110 42, 108 65 C 102 50, 90 48, 80 48 C 70 48, 58 50, 52 65 Z" fill="#78350f" />
      {/* Eyes */}
      <circle cx="70" cy="70" r="3.5" fill="#1e1b4b" />
      <circle cx="90" cy="70" r="3.5" fill="#1e1b4b" />
      {/* Cheeks */}
      <circle cx="64" cy="78" r="4" fill="#f472b6" opacity="0.6" />
      <circle cx="96" cy="78" r="4" fill="#f472b6" opacity="0.6" />
      {/* Big happy smile */}
      <path d="M 72 80 Q 80 90 88 80" fill="none" stroke="#1e1b4b" strokeWidth="2.5" strokeLinecap="round" />
      {/* Speech bubble: "Thank You!" */}
      <g transform="translate(68, 106)">
        <rect x="0" y="0" width="70" height="26" rx="8" fill="#ffffff" stroke="#ec4899" strokeWidth="2" />
        <polygon points="10,0 20,-6 20,0" fill="#ffffff" stroke="#ec4899" strokeWidth="2" />
        <line x1="11" y1="0" x2="19" y2="0" stroke="#ffffff" strokeWidth="2.5" />
        <text x="35" y="17" textAnchor="middle" fill="#be185d" fontFamily="Quicksand, Fredoka, sans-serif" fontWeight="bold" fontSize="11">
          Thank You!
        </text>
      </g>
      {/* Red heart */}
      <path d="M 36 40 C 36 34, 42 32, 45 35 C 48 32, 54 34, 54 40 C 54 48, 45 53, 45 53 C 45 53, 36 48, 36 40 Z" fill="#ef4444" />
    </svg>
  ),

  sleepOnTime: (
    <svg viewBox="0 0 160 160" width="100%" height="100%">
      <circle cx="80" cy="80" r="70" fill="#1e1b4b" stroke="#4338ca" strokeWidth="3" />
      {/* Crescent Moon */}
      <path d="M 105 35 A 35 35 0 0 1 75 95 A 38 38 0 1 0 105 35 Z" fill="#facc15" stroke="#eab308" strokeWidth="2" />
      {/* Sleeping child in bed with cozy blanket */}
      <g transform="translate(30, 95)">
        {/* Bed headboard */}
        <rect x="0" y="0" width="100" height="38" rx="6" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" />
        {/* Fluffy Pillow */}
        <ellipse cx="28" cy="8" rx="16" ry="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
        {/* Sleeping face */}
        <circle cx="28" cy="8" r="8" fill="#fed7aa" />
        {/* Closed sleeping eyes (happy curve) */}
        <path d="M 23 8 Q 25 10 27 8" fill="none" stroke="#1e1b4b" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 29 8 Q 31 10 33 8" fill="none" stroke="#1e1b4b" strokeWidth="1.5" strokeLinecap="round" />
        {/* Cozy pastel blanket */}
        <path d="M 38 8 L 98 8 Q 100 8 100 12 L 100 36 L 38 36 Z" fill="#ec4899" stroke="#db2777" strokeWidth="2" />
      </g>
      {/* Little glowing stars */}
      <circle cx="45" cy="50" r="2.5" fill="#fef08a" />
      <circle cx="58" cy="35" r="3.5" fill="#fef08a" />
      <circle cx="120" cy="80" r="2.5" fill="#fef08a" />
      <circle cx="110" cy="115" r="2" fill="#fef08a" />
      {/* "Zzz" letters */}
      <text x="48" y="85" fill="#a5b4fc" fontWeight="bold" fontSize="12" fontFamily="sans-serif">z</text>
      <text x="56" y="76" fill="#c7d2fe" fontWeight="bold" fontSize="15" fontFamily="sans-serif">Z</text>
    </svg>
  ),

  helpingOthers: (
    <svg viewBox="0 0 160 160" width="100%" height="100%">
      <circle cx="80" cy="80" r="70" fill="#f0fdfa" stroke="#5eead4" strokeWidth="3" />
      {/* Two happy children holding hands & sharing */}
      {/* Child 1 */}
      <circle cx="56" cy="65" r="16" fill="#fed7aa" stroke="#f97316" strokeWidth="2" />
      <path d="M 44 58 C 44 46, 68 46, 68 58 Z" fill="#78350f" />
      <circle cx="51" cy="64" r="2" fill="#1e1b4b" />
      <circle cx="61" cy="64" r="2" fill="#1e1b4b" />
      <path d="M 52 70 Q 56 75 60 70" fill="none" stroke="#1e1b4b" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="44" y="81" width="24" height="32" rx="6" fill="#06b6d4" stroke="#0891b2" strokeWidth="2" />

      {/* Child 2 */}
      <circle cx="104" cy="65" r="16" fill="#fed7aa" stroke="#f97316" strokeWidth="2" />
      <path d="M 92 58 C 92 46, 116 46, 116 58 Z" fill="#ca8a04" />
      <circle cx="99" cy="64" r="2" fill="#1e1b4b" />
      <circle cx="109" cy="64" r="2" fill="#1e1b4b" />
      <path d="M 100 70 Q 104 75 108 70" fill="none" stroke="#1e1b4b" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="92" y="81" width="24" height="32" rx="6" fill="#ec4899" stroke="#db2777" strokeWidth="2" />

      {/* Holding hands together */}
      <path d="M 68 90 Q 80 96 92 90" fill="none" stroke="#f97316" strokeWidth="3" strokeLinecap="round" />
      {/* Floating love heart between them */}
      <path d="M 76 44 C 76 39, 80 37, 83 40 C 86 37, 90 39, 90 44 C 90 50, 83 54, 83 54 C 83 54, 76 50, 76 44 Z" fill="#ef4444" />
    </svg>
  ),

  badLittering: (
    <svg viewBox="0 0 160 160" width="100%" height="100%">
      <circle cx="80" cy="80" r="70" fill="#fef2f2" stroke="#fca5a5" strokeWidth="3" />
      {/* Scattered trash & messy floor */}
      <rect x="35" y="110" width="90" height="6" rx="3" fill="#cbd5e1" />
      {/* Crumpled paper */}
      <circle cx="55" cy="100" r="10" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
      <path d="M 50 96 L 60 102 M 52 104 L 58 97" stroke="#64748b" strokeWidth="1.5" />
      {/* Spilled banana peel */}
      <path d="M 85 96 Q 95 85 105 102 M 90 98 Q 78 92 88 106 M 92 98 Q 108 106 98 108" fill="none" stroke="#eab308" strokeWidth="4" strokeLinecap="round" />
      {/* Discarded candy wrappers */}
      <polygon points="110,88 122,82 124,96 112,98" fill="#f43f5e" stroke="#be123c" strokeWidth="1.5" />
      {/* Red Warning Exclamation */}
      <circle cx="80" cy="50" r="16" fill="#ef4444" />
      <text x="80" y="56" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="20" fontFamily="sans-serif">!</text>
    </svg>
  ),

  badLateNight: (
    <svg viewBox="0 0 160 160" width="100%" height="100%">
      <circle cx="80" cy="80" r="70" fill="#0f172a" stroke="#334155" strokeWidth="3" />
      {/* Clock showing 1:00 AM midnight */}
      <circle cx="80" cy="55" r="24" fill="#ffffff" stroke="#ef4444" strokeWidth="3" />
      <line x1="80" y1="55" x2="80" y2="40" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="80" y1="55" x2="90" y2="55" stroke="#1e1b4b" strokeWidth="2" strokeLinecap="round" />
      {/* Tired, sleepy child watching bright screen */}
      <circle cx="80" cy="115" r="16" fill="#fed7aa" stroke="#f97316" strokeWidth="2" />
      {/* Dark circles under eyes */}
      <ellipse cx="74" cy="118" rx="4" ry="2" fill="#94a3b8" opacity="0.6" />
      <ellipse cx="86" cy="118" rx="4" ry="2" fill="#94a3b8" opacity="0.6" />
      <circle cx="74" cy="114" r="2" fill="#1e1b4b" />
      <circle cx="86" cy="114" r="2" fill="#1e1b4b" />
      {/* Sad tired mouth */}
      <path d="M 76 124 Q 80 120 84 124" fill="none" stroke="#1e1b4b" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
};

// 8 Core Habits Guide with badges
export const HABITS_GUIDE = [
  {
    id: 'brushing',
    title: 'Brushing Teeth',
    icon: '🪥',
    color: '#0284c7',
    bg: '#e0f2fe',
    tagline: 'Twice Every Day',
    desc: 'Brush your teeth every morning and before bed to keep teeth shiny, clean, and strong!'
  },
  {
    id: 'washing',
    title: 'Washing Hands',
    icon: '🧼',
    color: '#0d9488',
    bg: '#ccfbf1',
    tagline: 'With Soapy Bubbles',
    desc: 'Wash your hands with warm water and soap before meals and after playing outside!'
  },
  {
    id: 'bathing',
    title: 'Taking a Bath',
    icon: '🛁',
    color: '#7c3aed',
    bg: '#f3e8ff',
    tagline: 'Fresh & Sparkling',
    desc: 'Splish, splash! A warm bath washes away all the dirt and leaves you smelling great!'
  },
  {
    id: 'healthy-food',
    title: 'Healthy Eating',
    icon: '🥗',
    color: '#16a34a',
    bg: '#dcfce7',
    tagline: 'Fruits & Veggies',
    desc: 'Munch crunchy carrots, sweet apples, and drink water to grow big, smart, and strong!'
  },
  {
    id: 'tidy-toys',
    title: 'Tidying Toys',
    icon: '🧸',
    color: '#d97706',
    bg: '#fef3c7',
    tagline: 'Clean Room Hero',
    desc: 'Put blocks and toys back into the toy box after playtime so nobody trips over them!'
  },
  {
    id: 'manners',
    title: 'Magic Manners',
    icon: '💖',
    color: '#db2777',
    bg: '#fce7f3',
    tagline: 'Please & Thank You',
    desc: 'Use magic words like "Please" when asking and "Thank You" when receiving!'
  },
  {
    id: 'sleep',
    title: 'Sleeping on Time',
    icon: '⏰',
    color: '#4f46e5',
    bg: '#e0e7ff',
    tagline: 'Early to Bed',
    desc: 'Go to sleep on time every night to get deep rest and wake up full of energy!'
  },
  {
    id: 'helping',
    title: 'Helping Others',
    icon: '🤝',
    color: '#0284c7',
    bg: '#e0f9ff',
    tagline: 'Sharing & Caring',
    desc: 'Share your toys and help your friends or family with a bright, loving smile!'
  }
];

// Mode 1: "Good or Not Good?" Interactive Scenario Questions
export const GOOD_OR_NOT_GOOD_ROUNDS = [
  {
    id: 1,
    title: 'Brushing Teeth Daily',
    scenario: 'Brushing teeth every morning and before going to sleep at night.',
    illustrationKey: 'brushingTeeth',
    isGood: true,
    hint: 'Brushing twice a day washes away sugar bugs and keeps teeth shiny white!',
    praise: 'Super Smile Hero! ⭐ Brushing teeth protects your teeth!',
    category: 'Hygiene'
  },
  {
    id: 2,
    title: 'Messy Scattered Toys',
    scenario: 'Leaving toys and blocks scattered all over the floor after playing.',
    illustrationKey: 'badLittering',
    isGood: false,
    hint: 'Someone could trip and hurt themselves! Always put toys back into the toy box.',
    praise: 'Correct! 🌟 Leaving toys on the floor is not safe. Clean up your room!',
    category: 'Tidiness'
  },
  {
    id: 3,
    title: 'Washing Hands with Soap',
    scenario: 'Washing hands with soap and water before sitting down to eat lunch.',
    illustrationKey: 'washingHands',
    isGood: true,
    hint: 'Soap bubbles chase away tiny germs so you can eat clean food!',
    praise: 'Awesome Job! 🧼 Clean hands keep your tummy happy and healthy!',
    category: 'Hygiene'
  },
  {
    id: 4,
    title: 'Saying "Thank You!"',
    scenario: 'Saying "Thank You" with a smile when someone gives you a toy or snack.',
    illustrationKey: 'sayPleaseThanks',
    isGood: true,
    hint: 'Saying please and thank you makes everyone feel respected and happy!',
    praise: 'You have Wonderful Manners! 💖 Magic words make friends smile!',
    category: 'Manners'
  },
  {
    id: 5,
    title: 'Staying Awake Very Late',
    scenario: 'Staying awake very late at night playing games on the tablet.',
    illustrationKey: 'badLateNight',
    isGood: false,
    hint: 'Children need 10 hours of sleep so their brain and body can grow big and strong!',
    praise: 'Great Thinking! 🌙 Sleeping late makes us tired and grumpy.',
    category: 'Sleep'
  },
  {
    id: 6,
    title: 'Eating Crunchy Fruits & Veggies',
    scenario: 'Munching sweet apples, crunchy carrots, and fresh fruits for snack.',
    illustrationKey: 'healthyFood',
    isGood: true,
    hint: 'Fruits give you vitamins that help you run fast and stay healthy!',
    praise: 'Yummy & Healthy! 🍎 Fruits and veggies are superfoods for champions!',
    category: 'Nutrition'
  },
  {
    id: 7,
    title: 'Taking a Fresh Warm Bath',
    scenario: 'Taking a warm bubbly bath every day to stay clean and fresh.',
    illustrationKey: 'takingBath',
    isGood: true,
    hint: 'A good bath washes off sweat and dirt from a fun day of playing!',
    praise: 'Splish Splash! 🛁 You are squeaky clean and ready for fun!',
    category: 'Hygiene'
  },
  {
    id: 8,
    title: 'Putting Toys in the Toy Box',
    scenario: 'Tidying up blocks, cars, and dolls into the toy box after playtime.',
    illustrationKey: 'organizeToys',
    isGood: true,
    hint: 'When everything has its place, finding your favorite toy is super easy!',
    praise: 'Room Champion! 🧸 Clean rooms are happy and safe rooms!',
    category: 'Tidiness'
  },
  {
    id: 9,
    title: 'Sharing Toys with Friends',
    scenario: 'Sharing your crayons and blocks with a friend so you can play together.',
    illustrationKey: 'helpingOthers',
    isGood: true,
    hint: 'Sharing brings joy and makes friendship twice as fun!',
    praise: 'Heart of Gold! 🤝 Sharing is caring for your friends!',
    category: 'Sharing'
  },
  {
    id: 10,
    title: 'Sleeping on Time in Cozy Bed',
    scenario: 'Going to bed early at night so you can wake up happy in the morning.',
    illustrationKey: 'sleepOnTime',
    isGood: true,
    hint: 'Early to bed and early to rise makes you healthy, wealthy, and wise!',
    praise: 'Sweet Dreams! 🌟 Good sleep gives you endless energy for tomorrow!',
    category: 'Sleep'
  }
];

// Mode 2: "Put in the Right Order" Step Sequences
export const SEQUENCE_ROUTINES = [
  {
    id: 'seq-brushing',
    title: 'Brushing Teeth Routine',
    habitName: 'Brushing Teeth',
    theme: 'theme-blue',
    icon: '🪥',
    steps: [
      {
        order: 1,
        title: 'Step 1: Toothpaste',
        desc: 'Squeeze a pea-sized dot of toothpaste onto your brush',
        emoji: '🪥',
        color: '#bae6fd'
      },
      {
        order: 2,
        title: 'Step 2: Brush Circles',
        desc: 'Brush top, bottom, and back teeth in gentle round circles',
        emoji: '✨',
        color: '#fed7aa'
      },
      {
        order: 3,
        title: 'Step 3: Rinse Mouth',
        desc: 'Swish clean water in your mouth and spit it out',
        emoji: '💧',
        color: '#bbf7d0'
      },
      {
        order: 4,
        title: 'Step 4: Sparkle Smile!',
        desc: 'Smile into the mirror with clean, sparkling teeth!',
        emoji: '😁',
        color: '#fef08a'
      }
    ]
  },
  {
    id: 'seq-washing',
    title: 'Washing Hands Routine',
    habitName: 'Washing Hands',
    theme: 'theme-teal',
    icon: '🧼',
    steps: [
      {
        order: 1,
        title: 'Step 1: Wet Hands',
        desc: 'Turn on the tap and wet your hands with clean water',
        emoji: '🚰',
        color: '#bae6fd'
      },
      {
        order: 2,
        title: 'Step 2: Soap & Bubbles',
        desc: 'Rub soap all over your palms and fingers for 20 seconds',
        emoji: '🧼',
        color: '#fbcfe8'
      },
      {
        order: 3,
        title: 'Step 3: Rinse Clean',
        desc: 'Rinse away all the soapy bubbles under the running water',
        emoji: '🌊',
        color: '#bbf7d0'
      },
      {
        order: 4,
        title: 'Step 4: Dry Hands',
        desc: 'Dry your hands gently with a soft clean towel',
        emoji: '🧺',
        color: '#fde68a'
      }
    ]
  },
  {
    id: 'seq-bedtime',
    title: 'Bedtime Routine',
    habitName: 'Going to Bed',
    theme: 'theme-purple',
    icon: '🌙',
    steps: [
      {
        order: 1,
        title: 'Step 1: Cozy Pajamas',
        desc: 'Change into your soft and comfy night pajamas',
        emoji: '👕',
        color: '#fed7aa'
      },
      {
        order: 2,
        title: 'Step 2: Brush Teeth',
        desc: 'Brush your teeth so they are clean before sleeping',
        emoji: '🪥',
        color: '#bae6fd'
      },
      {
        order: 3,
        title: 'Step 3: Bedtime Story',
        desc: 'Listen to a fun, cozy story with mom or dad',
        emoji: '📖',
        color: '#fbcfe8'
      },
      {
        order: 4,
        title: 'Step 4: Sweet Dreams',
        desc: 'Close your eyes, turn off lights, and sleep on time!',
        emoji: '💤',
        color: '#c7d2fe'
      }
    ]
  },
  {
    id: 'seq-eating',
    title: 'Healthy Meal Routine',
    habitName: 'Eating Healthy',
    theme: 'theme-green',
    icon: '🥗',
    steps: [
      {
        order: 1,
        title: 'Step 1: Wash Hands',
        desc: 'Always wash hands before touching your delicious meal',
        emoji: '🧼',
        color: '#bae6fd'
      },
      {
        order: 2,
        title: 'Step 2: Sit at Table',
        desc: 'Sit down nicely at the dining table with good posture',
        emoji: '🪑',
        color: '#fef08a'
      },
      {
        order: 3,
        title: 'Step 3: Chew Veggies',
        desc: 'Chew colorful vegetables and fruits with mouth closed',
        emoji: '🥦',
        color: '#bbf7d0'
      },
      {
        order: 4,
        title: 'Step 4: Say Thank You',
        desc: 'Finish your meal and say "Thank you for the food!"',
        emoji: '🙏',
        color: '#fbcfe8'
      }
    ]
  },
  {
    id: 'seq-tidy',
    title: 'Tidying Up Toys Routine',
    habitName: 'Toy Cleanup',
    theme: 'theme-yellow',
    icon: '🧸',
    steps: [
      {
        order: 1,
        title: 'Step 1: Playtime Over',
        desc: 'Notice when playtime is finished and time to clean up',
        emoji: '⏰',
        color: '#bae6fd'
      },
      {
        order: 2,
        title: 'Step 2: Pick Up Blocks',
        desc: 'Gather toys, cars, and blocks off the floor gently',
        emoji: '🚗',
        color: '#fed7aa'
      },
      {
        order: 3,
        title: 'Step 3: Place in Toy Box',
        desc: 'Put all the toys neatly inside their storage boxes',
        emoji: '📦',
        color: '#fef08a'
      },
      {
        order: 4,
        title: 'Step 4: High Five!',
        desc: 'Celebrate your shiny, clean room with a high five!',
        emoji: '⭐',
        color: '#bbf7d0'
      }
    ]
  }
];
