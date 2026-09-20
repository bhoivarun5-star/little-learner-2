import React, { useState } from 'react';
import './HomePage.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ActivitiesSection from './components/ActivitiesSection';
import DailyChallenge from './components/DailyChallenge';
import ParentsSection from './components/ParentsSection';

import AlphabetPhonicsGame from '../Games/AlphabetPhonicsGame';
import NumbersCountingGame from '../Games/NumbersCountingGame';
import ShapesColorsGame from '../Games/ShapesColorsGame';
import PuzzleGame from '../Games/PuzzleGame';
import DrawingGame from '../Creativity/DrawingGame';
import TracingGame from '../Creativity/TracingGame';
import PictureCompletionGame from '../Creativity/PictureCompletionGame';
import MemoryDevelopmentGame from '../Creativity/MemoryDevelopmentGame';
import OddOneOutGame from '../Logic And Thinking/OddOneOutGame';
import GoodHabitsGame from '../Creativity/GoodHabitsGame';
import EmotionalRecognitionGame from '../Creativity/EmotionalRecognitionGame';
import SocialSkillsGame from '../Creativity/SocialSkillsGame';

export default function HomePage({ user, onLogout, onToggleDashboard }) {
  const [stars, setStars] = useState(125);
  const [activeNavTab, setActiveNavTab] = useState('activities');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeGame, setActiveGame] = useState(null);

  const handleExploreClick = () => {
    const el = document.getElementById('activities-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavSelectTab = (tabId) => {
    setActiveNavTab(tabId);
    if (tabId === 'logic') {
      setActiveCategory('logic');
      const el = document.getElementById('activities-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (tabId === 'activities' || tabId === 'games' || tabId === 'learn') {
      if (tabId === 'games') setActiveCategory('games');
      if (tabId === 'activities') setActiveCategory('all');
      const el = document.getElementById('activities-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handlePlayActivity = (activity) => {
    if (activity.id === 'alphabet-phonics') {
      setActiveGame('alphabet-phonics');
    } else if (activity.id === 'count-match') {
      setActiveGame('count-match');
    } else if (activity.id === 'shapes-colors') {
      setActiveGame('shapes-colors');
    } else if (activity.id === 'picture-puzzles') {
      setActiveGame('picture-puzzles');
    } else if (activity.id === 'drawing-game') {
      setActiveGame('drawing-game');
    } else if (activity.id === 'tracing-game' || activity.id === 'letter-number-tracing') {
      setActiveGame('tracing-game');
    } else if (activity.id === 'picture-completion') {
      setActiveGame('picture-completion');
    } else if (activity.id === 'memory-development') {
      setActiveGame('memory-development');
    } else if (activity.id === 'odd-one-out') {
      setActiveGame('odd-one-out');
    } else if (activity.id === 'good-habits') {
      setActiveGame('good-habits');
    } else if (activity.id === 'emotional-recognition') {
      setActiveGame('emotional-recognition');
    } else if (activity.id === 'social-skills') {
      setActiveGame('social-skills');
    } else {
      setStars((prev) => prev + 5);
      alert(`🌟 Playing "${activity.title}"!\n\n${activity.description}.\nYou earned +5 stars! ⭐ Keep it up!`);
    }
  };

  const handleStartDailyChallenge = () => {
    alert("🏆 Daily Surprise Challenge:\n\nComplete today's creative drawing to earn your mystery badge!");
  };

  const handleOpenParentTips = () => {
    alert(
      "🌟 Little Learner Parent Tips:\n\n1. Play and create together for 15 minutes a day.\n2. Ask open-ended questions about their artwork.\n3. Celebrate curiosity, effort, and imagination!"
    );
  };

  if (activeGame === 'social-skills') {
    return (
      <SocialSkillsGame
        onBack={() => setActiveGame(null)}
        onEarnStars={(amount) => setStars((prev) => prev + amount)}
      />
    );
  }

  if (activeGame === 'emotional-recognition') {
    return (
      <EmotionalRecognitionGame
        onBack={() => setActiveGame(null)}
        onEarnStars={(amount) => setStars((prev) => prev + amount)}
      />
    );
  }

  if (activeGame === 'good-habits') {
    return (
      <GoodHabitsGame
        onBack={() => setActiveGame(null)}
        onEarnStars={(amount) => setStars((prev) => prev + amount)}
      />
    );
  }

  if (activeGame === 'odd-one-out') {
    return (
      <OddOneOutGame
        onBack={() => setActiveGame(null)}
        onEarnStars={(amount) => setStars((prev) => prev + amount)}
      />
    );
  }

  if (activeGame === 'memory-development') {
    return (
      <MemoryDevelopmentGame
        onHome={() => setActiveGame(null)}
        onEarnStars={(amount) => setStars((prev) => prev + amount)}
      />
    );
  }

  if (activeGame === 'picture-completion') {
    return (
      <PictureCompletionGame
        onHome={() => setActiveGame(null)}
        onEarnStars={(amount) => setStars((prev) => prev + amount)}
      />
    );
  }

  if (activeGame === 'tracing-game' || activeGame === 'letter-number-tracing') {
    return (
      <TracingGame
        onHome={() => setActiveGame(null)}
        onEarnStars={(amount) => setStars((prev) => prev + amount)}
      />
    );
  }

  if (activeGame === 'drawing-game') {
    return (
      <DrawingGame
        onHome={() => setActiveGame(null)}
        onEarnStars={(amount) => setStars((prev) => prev + amount)}
      />
    );
  }

  if (activeGame === 'picture-puzzles') {
    return (
      <PuzzleGame
        onHome={() => setActiveGame(null)}
        onEarnStars={(amount) => setStars((prev) => prev + amount)}
      />
    );
  }

  if (activeGame === 'alphabet-phonics') {
    return (
      <AlphabetPhonicsGame
        onHome={() => setActiveGame(null)}
        onEarnStars={(amount) => setStars((prev) => prev + amount)}
      />
    );
  }

  if (activeGame === 'count-match') {
    return (
      <NumbersCountingGame
        onHome={() => setActiveGame(null)}
        onEarnStars={(amount) => setStars((prev) => prev + amount)}
      />
    );
  }

  if (activeGame === 'shapes-colors') {
    return (
      <ShapesColorsGame
        onHome={() => setActiveGame(null)}
        onEarnStars={(amount) => setStars((prev) => prev + amount)}
      />
    );
  }

  return (
    <div className="home-page-container">
      {/* 1. Full-Width Top Navigation Bar */}
      <Navbar
        user={user}
        stars={stars}
        activeTab={activeNavTab}
        onSelectTab={handleNavSelectTab}
        onLogout={onLogout}
        onToggleDashboard={onToggleDashboard}
      />

      {/* Floating Meadow Clouds Backdrop */}
      <div className="home-meadow-backdrop">
        <div className="meadow-cloud cloud-1"></div>
        <div className="meadow-cloud cloud-2"></div>
      </div>

      {/* Main Page Content Body */}
      <div className="home-page-content">
        {/* 2. Hero Section: Left Title & Pitch, Right Minimized Video */}
        <HeroSection onExploreClick={handleExploreClick} />

        {/* 3. Redesigned Bright & Playful Activities Section */}
        <ActivitiesSection
          onPlayActivity={handlePlayActivity}
          selectedCategoryProp={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* 4. Bottom Features: Daily Challenge & For Parents */}
        <div className="home-bottom-feature-row">
          <DailyChallenge onStartChallenge={handleStartDailyChallenge} />
          <ParentsSection onOpenParentTips={handleOpenParentTips} />
        </div>
      </div>
    </div>
  );
}
