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
import MemoryDevelopmentGame from '../Logic And Thinking/MemoryDevelopmentGame';
import OddOneOutGame from '../Logic And Thinking/OddOneOutGame';
import GoodHabitsGame from '../Logic And Thinking/GoodHabitsGame';
import EmotionalRecognitionGame from '../Logic And Thinking/EmotionalRecognitionGame';
import SocialSkillsGame from '../Logic And Thinking/SocialSkillsGame';
import { useStudent } from '../../context/StudentContext';
import StudentSwitcher from '../StudentSwitcher';


export default function HomePage({ user, onLogout, onToggleDashboard }) {
  const [activeNavTab, setActiveNavTab] = useState('activities');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeGame, setActiveGame] = useState(null);

  const { activeStudent, recordGameProgress } = useStudent();

  // Accurate real star count directly from active student (starts at 0)
  const realStars = activeStudent?.total_stars ?? 0;

  // Helper to record stars and scores directly to currently active student ID
  const handleEarnStars = (gameId, amount = 1, gameTitle = '', customScore = null) => {
    const starsNum = Math.max(1, Number(amount) || 1);
    const scoreNum = (customScore !== null && customScore !== undefined) ? Number(customScore) : starsNum * 10;
    recordGameProgress(gameId, scoreNum, starsNum, gameTitle);
  };

  const handleExploreClick = () => {
    const el = document.getElementById('activities-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavSelectTab = (tabId) => {
    setActiveNavTab(tabId);
    if (tabId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tabId === 'logic') {
      setActiveCategory('logic');
      const el = document.getElementById('activities-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (tabId === 'activities' || tabId === 'games' || tabId === 'learn' || tabId === 'stories' || tabId === 'more') {
      if (tabId === 'games') setActiveCategory('games');
      else if (tabId === 'activities') setActiveCategory('all');
      else if (tabId === 'learn') setActiveCategory('writing');
      else if (tabId === 'stories') setActiveCategory('creativity');
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
      handleEarnStars(activity.id || 'general-activity', 5, activity.title, 50);
      alert(`🌟 Playing "${activity.title}"!\n\n${activity.description}.\nYou earned +5 stars for ${activeStudent?.name || 'Learner'} (${activeStudent?.student_id || 'STU-001'})! ⭐ Keep it up!`);
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

  if (activeGame) {
    let GameComponent = null;

    if (activeGame === 'social-skills') {
      GameComponent = (
        <SocialSkillsGame
          onBack={() => setActiveGame(null)}
          onEarnStars={(amount, score) => handleEarnStars('social-skills', amount, 'Social Skills & Empathy', score)}
          onToggleDashboard={onToggleDashboard}
        />
      );
    } else if (activeGame === 'emotional-recognition') {
      GameComponent = (
        <EmotionalRecognitionGame
          onBack={() => setActiveGame(null)}
          onEarnStars={(amount, score) => handleEarnStars('emotional-recognition', amount, 'Emotional Recognition', score)}
          onToggleDashboard={onToggleDashboard}
        />
      );
    } else if (activeGame === 'good-habits') {
      GameComponent = (
        <GoodHabitsGame
          onBack={() => setActiveGame(null)}
          onEarnStars={(amount, score) => handleEarnStars('good-habits', amount, 'Good Habits & Manners', score)}
          onToggleDashboard={onToggleDashboard}
        />
      );
    } else if (activeGame === 'odd-one-out') {
      GameComponent = (
        <OddOneOutGame
          onBack={() => setActiveGame(null)}
          onEarnStars={(amount, score) => handleEarnStars('odd-one-out', amount, 'Odd One Out', score)}
          onToggleDashboard={onToggleDashboard}
        />
      );
    } else if (activeGame === 'memory-development') {
      GameComponent = (
        <MemoryDevelopmentGame
          onHome={() => setActiveGame(null)}
          onEarnStars={(amount, score) => handleEarnStars('memory-development', amount, 'Memory Development', score)}
          onToggleDashboard={onToggleDashboard}
        />
      );
    } else if (activeGame === 'picture-completion') {
      GameComponent = (
        <PictureCompletionGame
          onHome={() => setActiveGame(null)}
          onEarnStars={(amount, score) => handleEarnStars('picture-completion', amount, 'Picture Completion', score)}
          onToggleDashboard={onToggleDashboard}
        />
      );
    } else if (activeGame === 'tracing-game' || activeGame === 'letter-number-tracing') {
      GameComponent = (
        <TracingGame
          onHome={() => setActiveGame(null)}
          onEarnStars={(amount, score) => handleEarnStars('tracing-game', amount, 'Letter & Number Tracing', score)}
          onToggleDashboard={onToggleDashboard}
        />
      );
    } else if (activeGame === 'drawing-game') {
      GameComponent = (
        <DrawingGame
          onHome={() => setActiveGame(null)}
          onEarnStars={(amount, score) => handleEarnStars('drawing-game', amount, 'Creative Drawing Canvas', score)}
          onToggleDashboard={onToggleDashboard}
        />
      );
    } else if (activeGame === 'picture-puzzles') {
      GameComponent = (
        <PuzzleGame
          onHome={() => setActiveGame(null)}
          onEarnStars={(amount, score) => handleEarnStars('picture-puzzles', amount, 'Picture Puzzles', score)}
          onToggleDashboard={onToggleDashboard}
        />
      );
    } else if (activeGame === 'alphabet-phonics') {
      GameComponent = (
        <AlphabetPhonicsGame
          onHome={() => setActiveGame(null)}
          onEarnStars={(amount, score) => handleEarnStars('alphabet-phonics', amount, 'Alphabet & Phonics', score)}
          onToggleDashboard={onToggleDashboard}
        />
      );
    } else if (activeGame === 'count-match') {
      GameComponent = (
        <NumbersCountingGame
          onHome={() => setActiveGame(null)}
          onEarnStars={(amount, score) => handleEarnStars('count-match', amount, 'Numbers & Counting', score)}
          onToggleDashboard={onToggleDashboard}
        />
      );
    } else if (activeGame === 'shapes-colors') {
      GameComponent = (
        <ShapesColorsGame
          onHome={() => setActiveGame(null)}
          onEarnStars={(amount, score) => handleEarnStars('shapes-colors', amount, 'Shapes & Colors', score)}
          onToggleDashboard={onToggleDashboard}
        />
      );
    }

    return (
      <div className="in-game-tracker-viewport" style={{ position: 'relative', minHeight: '100vh' }}>
        {GameComponent}
      </div>
    );
  }

  return (
    <div className="home-page-container">
      {/* 1. Full-Width Top Navigation Bar */}
      <Navbar
        user={user}
        stars={realStars}
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
