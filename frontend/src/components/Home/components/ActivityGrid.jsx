import React from 'react';
import { ChevronRight } from 'lucide-react';

export const ACTIVITIES = [
  {
    id: 'trace-draw',
    title: 'Trace & Draw',
    age: '3-6 Yrs',
    categories: ['creativity', 'writing'],
    img: '/assets/homepage/card_trace_draw.jpg',
    desc: 'Trace the lines and complete the picture.',
    buttonClass: 'btn-play-purple',
    badgeClass: '',
    minigame: 'drawing'
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
    id: 'healthy-habits',
    title: 'Healthy Habits',
    age: '3-6 Yrs',
    categories: ['life', 'science'],
    img: '/assets/homepage/card_healthy_habits.jpg',
    desc: 'Learn healthy habits through fun activities.',
    buttonClass: 'btn-play-pink',
    badgeClass: '',
    minigame: 'habits'
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
