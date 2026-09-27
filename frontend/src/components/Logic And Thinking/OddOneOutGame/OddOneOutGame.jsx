import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Home,
  RotateCcw,
  Lightbulb,
  Volume2,
  VolumeX,
  ArrowRight,
  Trophy,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Lock
} from 'lucide-react';
import {
  ODD_ICONS,
  ODD_ONE_OUT_ROUNDS,
  DIFFICULTY_LEVELS
} from './oddOneOutData';
import { oddSounds } from './oddOneOutSounds';
import { useLanguage } from '../../../context/LanguageContext';
import StudentSwitcher from '../../StudentSwitcher';
import './OddOneOutGame.css';

export default function OddOneOutGame({ onBack, onHome, onEarnStars, onToggleDashboard }) {
  const { t, speak, language, isMuted, soundEnabled, toggleMute } = useLanguage();
  const isMarathi = language === 'mr';

  // Level Progression:
  // Level 1: 'easy' -> Unlocked by default
  // Level 2: 'medium' -> Locked until Level 1 complete
  // Level 3: 'hard' -> Locked until Level 2 complete
  const [unlockedLevel, setUnlockedLevel] = useState(() => {
    try {
      const saved = localStorage.getItem('little_learner_ooo_unlocked_level');
      const val = parseInt(saved, 10);
      return val >= 1 && val <= 3 ? val : 1;
    } catch {
      return 1;
    }
  });

  const [difficulty, setDifficulty] = useState('easy');
  const [roundIndex, setRoundIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState(0);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [wrongCardId, setWrongCardId] = useState(null);
  const [isHinted, setIsHinted] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [lockToast, setLockToast] = useState(null);

  // Filter rounds for current difficulty
  const activeRounds = ODD_ONE_OUT_ROUNDS.filter(r => r.level === difficulty);
  const currentRound = activeRounds[roundIndex] || activeRounds[0];

  // Sound toggle handler
  const handleToggleSound = () => {
    toggleMute();
  };

  // Switch difficulty with level locking protection
  const handleSelectDifficulty = (newDiff) => {
    if (newDiff === 'medium' && unlockedLevel < 2) {
      oddSounds.playWrong();
      const msg = isMarathi
        ? '🔒 ही पातळी बंद आहे! उघडण्यासाठी प्रथम "सोपे" (पातळी १) पूर्ण करा!'
        : '🔒 Level Locked! Complete "Easy" (Level 1) first to unlock!';
      setLockToast(msg);
      if (speak) speak(isMarathi ? 'प्रथम सोपी पातळी पूर्ण करा' : 'Please complete Easy level first');
      setTimeout(() => setLockToast(null), 3500);
      return;
    }

    if (newDiff === 'hard' && unlockedLevel < 3) {
      oddSounds.playWrong();
      const msg = isMarathi
        ? '🔒 ही पातळी बंद आहे! उघडण्यासाठी प्रथम "मध्यम" (पातळी २) पूर्ण करा!'
        : '🔒 Level Locked! Complete "Medium" (Level 2) first to unlock!';
      setLockToast(msg);
      if (speak) speak(isMarathi ? 'प्रथम मध्यम पातळी पूर्ण करा' : 'Please complete Medium level first');
      setTimeout(() => setLockToast(null), 3500);
      return;
    }

    oddSounds.playTap();
    setLockToast(null);
    setDifficulty(newDiff);
    setRoundIndex(0);
    resetTurnState();
  };

  const resetTurnState = () => {
    setSelectedCardId(null);
    setIsCorrect(false);
    setWrongCardId(null);
    setIsHinted(false);
    setFeedback(null);
  };

  // Handle card click
  const handleCardClick = (item) => {
    if (isCorrect) return; // Prevent extra clicks after winning round

    oddSounds.playTap();
    setSelectedCardId(item.id);

    const iconObj = ODD_ICONS[item.key] || { name: 'Item', nameMr: 'वस्तू' };
    const itemName = isMarathi ? (iconObj.nameMr || iconObj.name) : iconObj.name;

    if (item.isOdd) {
      // Correct!
      setIsCorrect(true);
      setWrongCardId(null);
      setScore(prev => prev + 25);
      setStars(prev => prev + 3);
      onEarnStars?.(3, 25);
      const correctMsg = t('oddCorrectMsg');
      setFeedback({
        type: 'correct',
        text: correctMsg
      });

      oddSounds.playCorrect();
      if (speak) speak(itemName);

      // Confetti burst
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (_) {}

      // If last round in level, trigger celebration and unlock next level
      if (roundIndex === activeRounds.length - 1) {
        if (difficulty === 'easy') {
          setUnlockedLevel((prev) => {
            const next = Math.max(prev, 2);
            try {
              localStorage.setItem('little_learner_ooo_unlocked_level', String(next));
            } catch (_) {}
            return next;
          });
        } else if (difficulty === 'medium') {
          setUnlockedLevel((prev) => {
            const next = Math.max(prev, 3);
            try {
              localStorage.setItem('little_learner_ooo_unlocked_level', String(next));
            } catch (_) {}
            return next;
          });
        }

        setTimeout(() => {
          oddSounds.playVictory();
          setShowCelebration(true);
        }, 800);
      }
    } else {
      // Wrong card
      setWrongCardId(item.id);
      oddSounds.playWrong();
      const wrongMsg = t('oddWrongMsg');
      setFeedback({
        type: 'wrong',
        text: wrongMsg
      });
      if (speak) speak(wrongMsg);

      // Clear wobble after animation
      setTimeout(() => {
        setWrongCardId(null);
      }, 700);
    }
  };

  // Handle Hint
  const handleUseHint = () => {
    if (isCorrect) return;
    oddSounds.playHint();
    setIsHinted(true);
    const hintMsg = isMarathi
      ? (currentRound.hintTextMr || currentRound.hintText || t('oddHintMsg'))
      : (currentRound.hintText || t('oddHintMsg'));
    setFeedback({
      type: 'hint',
      text: hintMsg
    });
    if (speak) speak(hintMsg);
  };

  // Next Round
  const handleNextRound = () => {
    oddSounds.playTap();
    if (roundIndex < activeRounds.length - 1) {
      setRoundIndex(prev => prev + 1);
      resetTurnState();
    } else {
      if (difficulty === 'easy') {
        setUnlockedLevel((prev) => {
          const next = Math.max(prev, 2);
          try {
            localStorage.setItem('little_learner_ooo_unlocked_level', String(next));
          } catch (_) {}
          return next;
        });
      } else if (difficulty === 'medium') {
        setUnlockedLevel((prev) => {
          const next = Math.max(prev, 3);
          try {
            localStorage.setItem('little_learner_ooo_unlocked_level', String(next));
          } catch (_) {}
          return next;
        });
      }
      setShowCelebration(true);
    }
  };

  // Restart Current Level
  const handleRestart = () => {
    oddSounds.playTap();
    setRoundIndex(0);
    setScore(0);
    setShowCelebration(false);
    resetTurnState();
  };

  const progressPct = ((roundIndex + (isCorrect ? 1 : 0)) / activeRounds.length) * 100;

  return (
    <div className="odd-game-container">
      {/* 1. FIXED FULL-WIDTH HEADER NAVBAR */}
      <header className="odd-game-header">
        <div className="odd-header-inner">
          {/* Left: Home + Title Badge */}
          <div className="odd-header-left">
            <button
              type="button"
              className="odd-home-btn"
              onClick={onBack}
              title="Return to Home"
            >
              <Home size={18} />
              <span>{t('btnHome')}</span>
            </button>

            <div className="odd-game-title-badge">
              <span>🔍</span>
              <span>{t('oddTitle')}</span>
            </div>
          </div>

          {/* Center: Difficulty Selector */}
          <div className="odd-diff-group">
            {DIFFICULTY_LEVELS.map((lvl) => {
              const diffKey = `odd${lvl.id.charAt(0).toUpperCase() + lvl.id.slice(1)}`;
              const diffLabel = t(diffKey) || lvl.label;
              const isLocked = (lvl.id === 'medium' && unlockedLevel < 2) || (lvl.id === 'hard' && unlockedLevel < 3);

              return (
                <button
                  key={lvl.id}
                  type="button"
                  className={`odd-diff-pill ${difficulty === lvl.id ? 'active' : ''} ${isLocked ? 'is-locked' : ''}`}
                  onClick={() => handleSelectDifficulty(lvl.id)}
                  title={isLocked ? (isMarathi ? 'आधीची पातळी पूर्ण केल्यावर उघडेल' : 'Complete previous level to unlock') : ''}
                >
                  {isLocked ? <Lock size={14} className="odd-diff-lock-icon" /> : <span>{lvl.emoji}</span>}
                  <span>{diffLabel}</span>
                  <span className="odd-diff-tag">
                    {lvl.id === 'easy' ? (isMarathi ? 'पातळी १' : 'Lvl 1') : lvl.id === 'medium' ? (isLocked ? '🔒' : (isMarathi ? 'पातळी २' : 'Lvl 2')) : (isLocked ? '🔒' : (isMarathi ? 'पातळी ३' : 'Lvl 3'))}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Stars, Hints, Audio, Restart */}
          <div className="odd-header-right">
            <StudentSwitcher compact={true} onOpenDashboard={onToggleDashboard} />
            <div className="odd-hud-pill stars-pill" title="Earned Stars">
              <span>⭐</span>
              <span>{stars}</span>
            </div>

            <div className="odd-hud-pill" title="Current Round">
              <span>{roundIndex + 1}/{activeRounds.length}</span>
            </div>

            <button
              type="button"
              className="odd-action-btn hint-btn"
              onClick={handleUseHint}
              title="Need a Hint?"
            >
              <Lightbulb size={19} />
            </button>

            <button
              type="button"
              className="odd-action-btn"
              onClick={handleRestart}
              title="Restart Level"
            >
              <RotateCcw size={18} />
            </button>

            <button
              type="button"
              className="odd-action-btn"
              onClick={handleToggleSound}
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX size={18} color="#ef4444" /> : <Volume2 size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* 2. PROGRESS BAR */}
      <div className="odd-progress-wrap">
        <div className="odd-progress-bar-bg">
          <div
            className="odd-progress-bar-fill"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Level Lock Alert Toast */}
      {lockToast && (
        <div className="odd-lock-toast">
          <Lock size={18} className="odd-lock-toast-icon" />
          <span>{lockToast}</span>
        </div>
      )}

      {/* 3. MAIN GAMEPLAY STAGE */}
      <main className="odd-main-stage">
        {/* Question Banner */}
        <div className="odd-question-banner">
          <h2 className="odd-question-title">
            <span>{isMarathi ? (currentRound.titleMr || currentRound.title) : currentRound.title}</span>
          </h2>
          <p className="odd-question-subtitle">
            {t('oddCategory')}: <strong>{isMarathi ? (currentRound.categoryNameMr || currentRound.categoryName) : currentRound.categoryName}</strong> • {t('oddSubtitle')}
          </p>
        </div>

        {/* Cards Grid */}
        <div className={`odd-cards-grid cards-${currentRound.items.length}`}>
          {currentRound.items.map((item) => {
            const iconObj = ODD_ICONS[item.key] || { name: 'Item', nameMr: 'वस्तू', render: () => null };
            const itemName = isMarathi ? (iconObj.nameMr || iconObj.name) : iconObj.name;
            const isItemCorrect = isCorrect && item.isOdd;
            const isItemWrong = wrongCardId === item.id;
            const isItemHinted = isHinted && item.isOdd;

            return (
              <button
                key={item.id}
                type="button"
                className={`odd-card-button ${isItemCorrect ? 'is-correct' : ''} ${
                  isItemWrong ? 'is-wrong' : ''
                } ${isItemHinted ? 'is-hinted' : ''}`}
                onClick={() => handleCardClick(item)}
                disabled={isCorrect}
                aria-label={itemName}
              >
                <div className="odd-card-svg-wrap">
                  {iconObj.render()}
                </div>
                <span className="odd-card-label">{itemName}</span>
              </button>
            );
          })}
        </div>

        {/* Feedback Banner & Next Button */}
        <div className="odd-bottom-bar">
          {feedback && (
            <div className={`odd-feedback-toast ${feedback.type}`}>
              {feedback.type === 'correct' && <CheckCircle2 size={20} />}
              {feedback.type === 'wrong' && <AlertCircle size={20} />}
              {feedback.type === 'hint' && <Lightbulb size={20} />}
              <span>{feedback.text}</span>
            </div>
          )}

          {isCorrect && (
            <button
              type="button"
              className="odd-next-btn"
              onClick={handleNextRound}
            >
              <span>{roundIndex === activeRounds.length - 1 ? t('btnFinishLevel') : t('btnNext')}</span>
              <ArrowRight size={20} strokeWidth={2.8} />
            </button>
          )}
        </div>
      </main>

      {/* 4. CELEBRATION MODAL */}
      {showCelebration && (
        <div className="odd-modal-backdrop">
          <div className="odd-modal-content">
            <div className="odd-modal-trophy">{difficulty === 'hard' ? '🏆' : '🌟'}</div>

            {difficulty === 'easy' && (
              <>
                <h3 className="odd-modal-title">
                  {isMarathi ? 'सोपी पातळी पूर्ण! 🔓 मध्यम पातळी खुली झाली!' : 'Easy Level Complete! 🔓 Medium Level Unlocked!'}
                </h3>
                <p className="odd-modal-desc">
                  {isMarathi
                    ? 'खूप छान! तुमच्या तीक्ष्ण नजरेने सर्व वेगळ्या वस्तू ओळखल्या! आता पातळी २ (मध्यम) चे आव्हान स्वीकारा!'
                    : 'Super eagle eyes! You spotted all the odd items! Level 2 (Medium - 4 cards) is now unlocked!'}
                </p>
              </>
            )}

            {difficulty === 'medium' && (
              <>
                <h3 className="odd-modal-title">
                  {isMarathi ? 'मध्यम पातळी पूर्ण! 🔓 कठीण पातळी खुली झाली!' : 'Medium Level Complete! 🔓 Hard Level Unlocked!'}
                </h3>
                <p className="odd-modal-desc">
                  {isMarathi
                    ? 'अप्रतिम निरीक्षण! तुम्ही मध्यम पातळी पूर्ण केली! आता पातळी ३ (कठीण) चे आव्हान स्वीकारा!'
                    : 'Incredible observation! You mastered the medium level! Level 3 (Hard - 5 cards) is now unlocked!'}
                </p>
              </>
            )}

            {difficulty === 'hard' && (
              <>
                <h3 className="odd-modal-title">
                  {isMarathi ? 'वेगळा घटक ओळखा - महाविजेते! 🏆' : 'Odd One Out Grand Champion! 🏆'}
                </h3>
                <p className="odd-modal-desc">
                  {t('oddCompletedAll')}
                </p>
              </>
            )}

            <div className="odd-modal-stats">
              <div className="odd-stat-card">
                <div className="odd-stat-value">⭐ {stars}</div>
                <div className="odd-stat-label">{t('totalStars')}</div>
              </div>
              <div className="odd-stat-card">
                <div className="odd-stat-value">🎯 {score}</div>
                <div className="odd-stat-label">{t('score')}</div>
              </div>
            </div>

            <div className="odd-modal-actions">
              {difficulty === 'easy' && (
                <button
                  type="button"
                  className="odd-next-btn"
                  onClick={() => {
                    handleSelectDifficulty('medium');
                    setShowCelebration(false);
                  }}
                >
                  <span>{isMarathi ? 'मध्यम पातळी खेळा 🔓 ➡️' : 'Play Medium Level 🔓 ➡️'}</span>
                  <ArrowRight size={18} />
                </button>
              )}

              {difficulty === 'medium' && (
                <button
                  type="button"
                  className="odd-next-btn"
                  onClick={() => {
                    handleSelectDifficulty('hard');
                    setShowCelebration(false);
                  }}
                >
                  <span>{isMarathi ? 'कठीण पातळी खेळा 🔓 ➡️' : 'Play Hard Level 🔓 ➡️'}</span>
                  <ArrowRight size={18} />
                </button>
              )}

              <button
                type="button"
                className="odd-home-btn"
                style={{ padding: '0.75rem 1.5rem', borderRadius: '9999px' }}
                onClick={handleRestart}
              >
                <RotateCcw size={18} />
                <span>{t('btnPlayAgain')}</span>
              </button>

              <button
                type="button"
                className="odd-home-btn"
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '9999px',
                  background: difficulty === 'hard' ? '#3b82f6' : '#ffffff',
                  color: difficulty === 'hard' ? '#ffffff' : '#334155',
                  borderColor: difficulty === 'hard' ? '#2563eb' : '#e2e8f0'
                }}
                onClick={onBack}
              >
                <Home size={18} />
                <span>{t('btnHome')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
