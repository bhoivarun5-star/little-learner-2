import React, { useState } from 'react';
import './HomePage.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ActivitiesSection from './components/ActivitiesSection';
import DailyChallenge from './components/DailyChallenge';
import ParentsSection from './components/ParentsSection';

import AlphabetPhonicsGame from '../Games/AlphabetPhonicsGame';

export default function HomePage({ user, onLogout, onToggleDashboard }) {
  const [stars, setStars] = useState(125);
  const [activeNavTab, setActiveNavTab] = useState('activities');
  const [activeGame, setActiveGame] = useState(null);

  const handleExploreClick = () => {
    const el = document.getElementById('activities-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavSelectTab = (tabId) => {
    setActiveNavTab(tabId);
    if (tabId === 'activities' || tabId === 'games' || tabId === 'learn') {
      const el = document.getElementById('activities-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handlePlayActivity = (activity) => {
    if (activity.id === 'alphabet-phonics') {
      setActiveGame('alphabet-phonics');
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

  if (activeGame === 'alphabet-phonics') {
    return (
      <AlphabetPhonicsGame
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
        <ActivitiesSection onPlayActivity={handlePlayActivity} />

        {/* 4. Bottom Features: Daily Challenge & For Parents */}
        <div className="home-bottom-feature-row">
          <DailyChallenge onStartChallenge={handleStartDailyChallenge} />
          <ParentsSection onOpenParentTips={handleOpenParentTips} />
        </div>
      </div>
    </div>
  );
}
