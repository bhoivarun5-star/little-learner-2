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
  AlertCircle
} from 'lucide-react';
import {
  ODD_ICONS,
  ODD_ONE_OUT_ROUNDS,
  DIFFICULTY_LEVELS
} from './oddOneOutData';
import { oddSounds } from './oddOneOutSounds';
import { useLanguage } from '../../../context/LanguageContext';
import './OddOneOutGame.css';

export default function OddOneOutGame({ onBack }) {
  const { t, speak, language } = useLanguage();
  const isMarathi = language === 'mr';
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
  const [muted, setMuted] = useState(false);

  // Filter rounds for current difficulty
  const activeRounds = ODD_ONE_OUT_ROUNDS.filter(r => r.level === difficulty);
  const currentRound = activeRounds[roundIndex] || activeRounds[0];

  // Sound toggle handler
  const handleToggleSound = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    oddSounds.setMuted(nextMuted);
  };

  // Switch difficulty
  const handleSelectDifficulty = (newDiff) => {
    oddSounds.playTap();
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

      // If last round in level, trigger celebration
      if (roundIndex === activeRounds.length - 1) {
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
              return (
                <button
                  key={lvl.id}
                  type="button"
                  className={`odd-diff-pill ${difficulty === lvl.id ? 'active' : ''}`}
                  onClick={() => handleSelectDifficulty(lvl.id)}
                >
                  <span>{lvl.emoji}</span>
                  <span>{diffLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Right: Stars, Hints, Audio, Restart */}
          <div className="odd-header-right">
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
              title={muted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
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
            <div className="odd-modal-trophy">🏆</div>
            <h3 className="odd-modal-title">{t('oddSpectacular')}</h3>
            <p className="odd-modal-desc">
              {t('oddCompletedAll')}
            </p>

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
              {difficulty !== 'hard' && (
                <button
                  type="button"
                  className="odd-next-btn"
                  onClick={() => {
                    const next = difficulty === 'easy' ? 'medium' : 'hard';
                    handleSelectDifficulty(next);
                    setShowCelebration(false);
                  }}
                >
                  <span>{difficulty === 'easy' ? t('oddPlayMedium') : t('oddPlayHard')}</span>
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
                  style={{ padding: '0.75rem 1.5rem', borderRadius: '9999px' }}
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
