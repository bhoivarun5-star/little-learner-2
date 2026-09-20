import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  ArrowRight,
  LayoutGrid,
  Gamepad2,
  Palette,
  Lightbulb,
  Pencil,
  Hash,
  FlaskConical,
  Activity
} from 'lucide-react';
import './ActivitiesSection.css';

// 8 Rounded Category Navigation Pills as requested
export const CATEGORY_PILLS = [
  { id: 'all', label: 'All Activities', icon: LayoutGrid },
  { id: 'games', label: 'Games', icon: Gamepad2 },
  { id: 'creativity', label: 'Creativity', icon: Palette },
  { id: 'logic', label: 'Logic & Thinking', icon: Lightbulb },
  { id: 'writing', label: 'Writing', icon: Pencil },
  { id: 'math', label: 'Math Fun', icon: Hash },
  { id: 'science', label: 'Science', icon: FlaskConical },
  { id: 'movement', label: 'Movement', icon: Activity }
];

// The 4 Core Activities
export const ACTIVITIES_DATA = [
  {
    id: 'alphabet-phonics',
    title: 'Alphabet & Phonics',
    description: 'Learn letters and sounds',
    age: '3–6 Yrs',
    image: '/assets/activities/alphabet_phonics.jpg',
    theme: 'theme-blue',
    starDecor: '⭐',
    categories: ['all', 'games', 'writing']
  },
  {
    id: 'count-match',
    title: 'Count & Match',
    description: 'Learn numbers and counting',
    age: '3–6 Yrs',
    image: '/assets/activities/count_match.jpg',
    theme: 'theme-yellow',
    starDecor: '✨',
    categories: ['all', 'games', 'math', 'logic']
  },
  {
    id: 'shapes-colors',
    title: 'Shapes & Colors',
    description: 'Explore shapes, colors & mini-games',
    age: '3–6 Yrs',
    image: '/assets/activities/shapes_colors.jpg',
    theme: 'theme-pink',
    starDecor: '🎨',
    categories: ['all', 'games', 'creativity', 'logic']
  },
  {
    id: 'trace-draw',
    title: 'Trace & Draw',
    description: 'Practice drawing and creativity',
    age: '3–6 Yrs',
    image: '/assets/activities/trace_draw.jpg',
    theme: 'theme-purple',
    starDecor: '🌟',
    categories: ['all', 'creativity', 'writing']
  },
  {
    id: 'healthy-habits',
    title: 'Healthy Habits',
    description: 'Learn healthy daily habits',
    age: '3–6 Yrs',
    image: '/assets/activities/healthy_habits.jpg',
    theme: 'theme-green',
    starDecor: '🍎',
    categories: ['all', 'science', 'movement']
  }
];

export default function ActivitiesSection({ onPlayActivity }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredActivities = ACTIVITIES_DATA.filter((act) =>
    act.categories.includes(selectedCategory)
  );

  const handleLaunch = (activity) => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    if (onPlayActivity) {
      onPlayActivity(activity);
    } else {
      alert(`🎉 Let's play ${activity.title}!\n\n${activity.description}. Get ready to collect shiny stars! ⭐`);
    }
  };

  return (
    <section id="activities-section" className="activities-section-wrapper">
      {/* 1. Large Playful Heading & Short Subtitle */}
      <div className="activities-header-box">
        <h2 className="activities-main-heading">
          <span>Explore & Learn</span>
          <span className="heading-sparkle">🌟</span>
        </h2>
        <p className="activities-sub-heading">
          Discover fun games, creative activities, and playful challenges made just for you!
        </p>
      </div>

      {/* 2. Rounded Category Pills (Horizontally scrollable on mobile) */}
      <div className="category-pills-bar">
        {CATEGORY_PILLS.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              className={`category-pill-btn ${isActive ? 'is-active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <Icon size={18} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. 4 Activity Cards Grid (4 on desktop, 2 on tablet, 1 on mobile) */}
      <div className="activities-cards-grid">
        {filteredActivities.length > 0 ? (
          filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className={`activity-card ${activity.theme}`}
              onClick={() => handleLaunch(activity)}
            >
              {/* Card Top: Age badge & Star decor */}
              <div className="card-top-row">
                <span className="card-age-badge">{activity.age}</span>
                <span className="card-star-decor">{activity.starDecor}</span>
              </div>

              {/* Large Colorful Illustration */}
              <div className="card-illustration-box">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="card-illustration-img"
                  loading="lazy"
                />
              </div>

              {/* Title & Description */}
              <div className="card-content-body">
                <h3 className="activity-card-title">{activity.title}</h3>
                <p className="activity-card-desc">{activity.description}</p>
              </div>

              {/* Large, Bold, Rounded "Play Now →" Button */}
              <button
                type="button"
                className="btn-play-now"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLaunch(activity);
                }}
              >
                <span>Play Now</span>
                <ArrowRight size={20} />
              </button>
            </div>
          ))
        ) : (
          <div className="category-empty-card">
            <span className="category-empty-icon">🎨</span>
            <h3 className="category-empty-title">
              More {CATEGORY_PILLS.find((c) => c.id === selectedCategory)?.label} Coming Soon!
            </h3>
            <p className="category-empty-desc">
              We're crafting exciting new learning games for this category. In the meantime, explore our core activities!
            </p>
            <button
              type="button"
              className="btn-back-all"
              onClick={() => setSelectedCategory('all')}
            >
              <span>Explore All Activities 🌟</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
