import React from 'react';
import { ChevronRight } from 'lucide-react';

export const ACTIVITIES = [
  {
    id: 'drawing-game',
    title: 'Drawing Game',
    age: '3-6 Yrs',
    categories: ['creativity', 'games'],
    img: '/assets/activities/drawing_game.jpg',
    desc: 'Draw freely and color cute templates.',
    buttonClass: 'btn-play-orange',
    badgeClass: '',
    minigame: 'drawing'
  },
  {
    id: 'tracing-game',
    title: 'Tracing Game',
    age: '3-6 Yrs',
    categories: ['creativity', 'writing', 'games', 'math'],
    img: '/assets/activities/tracing_game.jpg',
    desc: 'Trace letters A–Z and numbers 1–20.',
    buttonClass: 'btn-play-green',
    badgeClass: '',
    minigame: 'tracing'
  },
  {
    id: 'odd-one-out',
    title: 'Odd One Out',
    age: '3-6 Yrs',
    categories: ['logic', 'creativity', 'games'],
    img: '/assets/activities/odd_one_out.jpg',
    desc: 'Find and select the one that does not belong!',
    buttonClass: 'btn-play-orange',
    badgeClass: 'badge-orange',
    minigame: 'odd-one-out'
  },
  {
    id: 'memory-development',
    title: 'Memory Development',
    age: '3-6 Yrs',
    categories: ['logic', 'creativity', 'games'],
    img: '/assets/activities/memory_development.jpg',
    desc: 'Flip, match pairs & train your memory with cute cards.',
    buttonClass: 'btn-play-blue',
    badgeClass: '',
    minigame: 'memory'
  },
  {
    id: 'build-learn',
    title: 'Build & Learn',
    age: '3-6 Yrs',
    categories: ['logic', 'creativity'],
    img: '/assets/homepage/card_build_learn.jpg',
    desc: 'Build shapes and learn about structures.',
    buttonClass: 'btn-play-green',
    badgeClass: '',
    minigame: 'blocks'
  },
  {
    id: 'letter-hunt',
    title: 'Letter Hunt',
    age: '3-6 Yrs',
    categories: ['writing', 'logic'],
    img: '/assets/homepage/card_letter_hunt.jpg',
    desc: 'Find and circle the letters on the screen.',
    buttonClass: 'btn-play-blue',
    badgeClass: '',
    minigame: 'letters'
  },
  {
    id: 'count-match',
    title: 'Count & Match',
    age: '4-6 Yrs',
    categories: ['math', 'logic'],
    img: '/assets/homepage/card_count_match.jpg',
    desc: 'Count the objects and match the numbers.',
    buttonClass: 'btn-play-orange',
    badgeClass: 'badge-orange',
    minigame: 'counting'
  },
  {
    id: 'nature-explorer',
    title: 'Nature Explorer',
    age: '4-6 Yrs',
    categories: ['science', 'movement'],
    img: '/assets/homepage/card_nature_explorer.jpg',
    desc: 'Explore nature and learn amazing facts.',
    buttonClass: 'btn-play-green',
    badgeClass: 'badge-orange',
    minigame: 'nature'
  }
];

export default function ActivityGrid({ selectedCategory, onPlayActivity }) {
  const filtered = ACTIVITIES.filter((act) => {
    if (!selectedCategory || selectedCategory === 'all') return true;
    return act.categories.includes(selectedCategory);
  });

  return (
    <div className="activities-card-grid">
      {filtered.map((act) => (
        <div key={act.id} className="activity-item-card">
          {/* Age Pill Badge */}
          <span className={`card-age-badge ${act.badgeClass}`}>{act.age}</span>

          {/* Card Artwork Image */}
          <div className="card-art-preview">
            <img src={act.img} alt={act.title} />
          </div>

          {/* Title & Description */}
          <h3 className="card-info-title">{act.title}</h3>
          <p className="card-info-desc">{act.desc}</p>

          {/* Action Button */}
          <button
            type="button"
            className={`btn-play-action ${act.buttonClass}`}
            onClick={() => onPlayActivity(act)}
          >
            <span>Play Now</span>
            <ChevronRight size={16} strokeWidth={3} />
          </button>
        </div>
      ))}
    </div>
  );
}
