import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
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

// 8 Rounded Category Navigation Pills
const CATEGORY_PILLS = [
  { id: 'all', label: 'All Activities', icon: LayoutGrid },
  { id: 'logic', label: 'Logic & Thinking', icon: Lightbulb },
  { id: 'creativity', label: 'Creativity', icon: Palette },
  { id: 'games', label: 'Games', icon: Gamepad2 },
  { id: 'writing', label: 'Writing', icon: Pencil },
  { id: 'math', label: 'Math Fun', icon: Hash },
  { id: 'science', label: 'Science', icon: FlaskConical },
  { id: 'movement', label: 'Movement', icon: Activity }
];

// The Core Activities (Odd One Out is #1 featured!)
const ACTIVITIES_DATA = [
  {
    id: 'odd-one-out',
    title: 'Odd One Out',
    description: 'Find and select the one that does not belong!',
    age: '3–6 Yrs',
    image: '/assets/activities/odd_one_out.jpg',
    theme: 'theme-yellow',
    starDecor: '🔍',
    categories: ['all', 'logic', 'creativity', 'games']
  },
  {
    id: 'good-habits',
    title: 'Good Habits',
    description: 'Learn healthy routines, manners & daily good habits!',
    age: '3–6 Yrs',
    image: '/assets/activities/good_habits.jpg',
    theme: 'theme-green',
    starDecor: '🌱',
    categories: ['all', 'creativity', 'logic', 'games']
  },
  {
    id: 'emotional-recognition',
    title: 'Emotional Recognition',
    description: 'Explore feelings, recognize emotions & practice empathy!',
    age: '3–6 Yrs',
    image: '/assets/activities/emotional_recognition.jpg',
    theme: 'theme-yellow',
    starDecor: '😊',
    categories: ['all', 'creativity', 'logic', 'games']
  },
  {
    id: 'social-skills',
    title: 'Social Skills',
    description: 'Learn sharing, taking turns, manners & making friends!',
    age: '3–6 Yrs',
    image: '/assets/activities/social_skills.jpg',
    theme: 'theme-teal',
    starDecor: '🤝',
    categories: ['all', 'creativity', 'logic', 'games']
  },
  {
    id: 'memory-development',
    title: 'Memory Development',
    description: 'Flip, match pairs & train your memory with cute cards',
    age: '3–6 Yrs',
    image: '/assets/activities/memory_development.jpg',
    theme: 'theme-blue',
    starDecor: '🧠',
    categories: ['all', 'logic', 'creativity', 'games']
  },
  {
    id: 'picture-completion',
    title: 'Picture Completion',
    description: 'Find and place the missing piece to finish the picture',
    age: '3–6 Yrs',
    image: '/assets/activities/picture_completion.jpg',
    theme: 'theme-purple',
    starDecor: '🧩',
    categories: ['all', 'creativity', 'logic', 'games']
  },
  {
    id: 'drawing-game',
    title: 'Drawing Game',
    description: 'Draw freely, color cute templates & create art',
    age: '3–6 Yrs',
    image: '/assets/activities/drawing_game.jpg',
    theme: 'theme-yellow',
    starDecor: '🖌️',
    categories: ['all', 'creativity', 'games']
  },
  {
    id: 'tracing-game',
    title: 'Tracing Game',
    description: 'Trace letters A–Z and numbers 1–20 with fun guides',
    age: '3–6 Yrs',
    image: '/assets/activities/tracing_game.jpg',
    theme: 'theme-green',
    starDecor: '✏️',
    categories: ['all', 'creativity', 'writing', 'games', 'math']
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
    id: 'picture-puzzles',
    title: 'Picture Puzzles',
    description: 'Piece together animals, fruits & shapes',
    age: '3–6 Yrs',
    image: '/assets/activities/puzzle_game.jpg',
    theme: 'theme-purple',
    starDecor: '🧩',
    categories: ['all', 'games', 'logic', 'creativity']
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
  }
];

export default function ActivitiesSection({ onPlayActivity, selectedCategoryProp = 'all', onCategoryChange }) {
  const [selectedCategory, setSelectedCategory] = useState(selectedCategoryProp || 'all');
  const trackRef = useRef(null);

  // Drag-to-scroll state
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    if (selectedCategoryProp) {
      setSelectedCategory(selectedCategoryProp);
    }
  }, [selectedCategoryProp]);

  // Global mouseup listener to guarantee drag state cleanly resets even if released outside track
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDownRef.current) {
        isDownRef.current = false;
        if (trackRef.current) {
          trackRef.current.classList.remove('is-dragging');
          trackRef.current.style.scrollBehavior = 'smooth';
        }
        setTimeout(() => {
          isDraggingRef.current = false;
        }, 80);
      }
    };
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  // When category changes, reset scroll to start
  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [selectedCategory]);

  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId);
    onCategoryChange?.(catId);
  };

  // Drag-to-scroll handlers (fast, 1:1, zero lag, doesn't interfere with vertical scroll)
  const handleMouseDown = (e) => {
    if (e.button !== 0 || !trackRef.current) return;
    isDownRef.current = true;
    startXRef.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeftRef.current = trackRef.current.scrollLeft;
    isDraggingRef.current = false;
    trackRef.current.style.scrollBehavior = 'auto'; // Disable animation lag while dragging
  };

  const handleMouseMove = (e) => {
    if (!isDownRef.current || !trackRef.current) return;
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = x - startXRef.current;
    if (Math.abs(walk) > 4) {
      isDraggingRef.current = true;
      trackRef.current.classList.add('is-dragging');
      e.preventDefault(); // Prevent text/image selection
    }
    trackRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    if (!isDownRef.current) return;
    isDownRef.current = false;
    if (trackRef.current) {
      trackRef.current.classList.remove('is-dragging');
      trackRef.current.style.scrollBehavior = 'smooth';
    }
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 80);
  };

  const handleMouseLeave = () => {
    if (isDownRef.current) {
      isDownRef.current = false;
      if (trackRef.current) {
        trackRef.current.classList.remove('is-dragging');
        trackRef.current.style.scrollBehavior = 'smooth';
      }
      setTimeout(() => {
        isDraggingRef.current = false;
      }, 80);
    }
  };

  const filteredActivities = ACTIVITIES_DATA.filter((act) =>
    act.categories.includes(selectedCategory)
  );

  const activeCategoryObj = CATEGORY_PILLS.find(c => c.id === selectedCategory) || CATEGORY_PILLS[0];

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

  const handleCardClick = (activity) => {
    if (isDraggingRef.current) return;
    handleLaunch(activity);
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

      {/* 2. Rounded Category Pills (Horizontally scrollable) */}
      <div className="category-pills-bar">
        {CATEGORY_PILLS.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              className={`category-pill-btn ${isActive ? 'is-active' : ''}`}
              onClick={() => handleSelectCategory(cat.id)}
            >
              <Icon size={18} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Subheader with category badge (No navigation buttons) */}
      <div className="activities-carousel-header">
        <div className="category-status-badge">
          <span className="badge-category-icon">{activeCategoryObj.icon && <activeCategoryObj.icon size={18} />}</span>
          <span className="badge-category-name">{activeCategoryObj.label}</span>
          <span className="badge-activity-count">({filteredActivities.length} activities)</span>
        </div>
      </div>

      {/* 4. Horizontal 2-Row Scrollable Activities Track (No buttons, No scrollbar) */}
      <div className="activities-carousel-wrapper">
        <div
          ref={trackRef}
          className="activities-cards-track"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity) => (
              <div
                key={activity.id}
                className={`activity-card ${activity.theme}`}
                onClick={() => handleCardClick(activity)}
              >
                {/* Card Top: Age badge & Star decor */}
                <div className="card-top-row">
                  <span className="card-age-badge">{activity.age}</span>
                  <span className="card-star-decor">{activity.starDecor}</span>
                </div>

                {/* Colorful Illustration */}
                <div className="card-illustration-box">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="card-illustration-img"
                    loading="lazy"
                    draggable="false"
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
                    if (isDraggingRef.current) return;
                    handleLaunch(activity);
                  }}
                >
                  <span>Play Now</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            ))
          ) : (
            <div className="category-empty-card">
              <span className="category-empty-icon">🎨</span>
              <h3 className="category-empty-title">
                More {activeCategoryObj.label} Coming Soon!
              </h3>
              <p className="category-empty-desc">
                We're crafting exciting new learning games for this category. In the meantime, explore our core activities!
              </p>
              <button
                type="button"
                className="btn-back-all"
                onClick={() => handleSelectCategory('all')}
              >
                <span>Explore All Activities 🌟</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
