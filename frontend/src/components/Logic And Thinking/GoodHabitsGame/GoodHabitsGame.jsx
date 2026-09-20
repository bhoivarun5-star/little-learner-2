import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  RotateCcw,
  Volume2,
  VolumeX,
  Lightbulb,
  Sparkles,
  Star,
  CheckCircle2,
  XCircle,
  Trophy,
  ArrowRight,
  ThumbsUp,
  ThumbsDown,
  ListOrdered,
  BookOpen
} from 'lucide-react';
import {
  HABIT_ILLUSTRATIONS,
  HABITS_GUIDE,
  GOOD_OR_NOT_GOOD_ROUNDS,
  SEQUENCE_ROUTINES
} from './goodHabitsData';
import { goodHabitsSounds } from './goodHabitsSounds';
import { useLanguage } from '../../../context/LanguageContext';
import './GoodHabitsGame.css';

export default function GoodHabitsGame({ onBack, onHome, onEarnStars }) {
  const { t } = useLanguage();
  const handleExit = onHome || onBack;

  // Game Modes: 'good-or-not' | 'put-in-order' | 'explore'
  const [activeMode, setActiveMode] = useState('good-or-not');

  // General state
  const [stars, setStars] = useState(0);
  const [score, setScore] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showHintModal, setShowHintModal] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);

  // Mode 1: "Good or Not Good?" state
  const [gnRoundIdx, setGnRoundIdx] = useState(0);
  const [gnFeedback, setGnFeedback] = useState(null); // 'correct' | 'wrong' | null

  // Mode 2: "Put in the Right Order" state
  const [routineIdx, setRoutineIdx] = useState(0);
  const [placedSteps, setPlacedSteps] = useState([]);
  const [availableSteps, setAvailableSteps] = useState([]);
  const [seqFeedback, setSeqFeedback] = useState(null); // 'correct' | 'wrong' | null

  // Sync sound player mute state
  useEffect(() => {
    goodHabitsSounds.enabled = soundEnabled;
  }, [soundEnabled]);

  // Initialize Mode 2 Routine shuffled steps
  const initRoutine = (rIdx) => {
    const routine = SEQUENCE_ROUTINES[rIdx];
    if (!routine) return;
    // Shuffle steps for kid to place
    const shuffled = [...routine.steps].sort(() => Math.random() - 0.5);
    setPlacedSteps([]);
    setAvailableSteps(shuffled);
    setSeqFeedback(null);
  };

  useEffect(() => {
    if (activeMode === 'put-in-order') {
      initRoutine(routineIdx);
    }
  }, [activeMode, routineIdx]);

  // Restart Current Mode
  const handleRestart = () => {
    goodHabitsSounds.playTap();
    if (activeMode === 'good-or-not') {
      setGnRoundIdx(0);
      setGnFeedback(null);
      setScore(0);
    } else if (activeMode === 'put-in-order') {
      initRoutine(routineIdx);
    }
    setShowWinModal(false);
  };

  // Toggle Sound
  const handleToggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  // =========================================================================
  // MODE 1: "Good or Not Good?" Handlers
  // =========================================================================
  const currentGnRound = GOOD_OR_NOT_GOOD_ROUNDS[gnRoundIdx];

  const handleChoice = (choseGood) => {
    if (gnFeedback === 'correct') return; // already answered

    const isCorrect = choseGood === currentGnRound.isGood;

    if (isCorrect) {
      goodHabitsSounds.playCorrect();
      setGnFeedback('correct');
      setScore((s) => s + 10);
      setStars((st) => st + 1);
      onEarnStars?.(1);

      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      goodHabitsSounds.playWrong();
      setGnFeedback('wrong');
    }
  };

  const handleNextGnRound = () => {
    goodHabitsSounds.playTap();
    setGnFeedback(null);

    if (gnRoundIdx < GOOD_OR_NOT_GOOD_ROUNDS.length - 1) {
      setGnRoundIdx((idx) => idx + 1);
    } else {
      // Game Complete Celebration!
      goodHabitsSounds.playLevelUp();
      setShowWinModal(true);
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.5 }
      });
    }
  };

  // =========================================================================
  // MODE 2: "Put in the Right Order" Handlers
  // =========================================================================
  const currentRoutine = SEQUENCE_ROUTINES[routineIdx];

  // Kid taps an available step to place into sequence
  const handleTapAvailableStep = (step) => {
    if (placedSteps.length >= 4) return;
    goodHabitsSounds.playOrderStep(placedSteps.length + 1);

    setAvailableSteps((prev) => prev.filter((s) => s.order !== step.order));
    const newPlaced = [...placedSteps, step];
    setPlacedSteps(newPlaced);

    // If 4 steps placed, auto-verify sequence!
    if (newPlaced.length === 4) {
      const isSequenceCorrect = newPlaced.every((s, index) => s.order === index + 1);

      if (isSequenceCorrect) {
        goodHabitsSounds.playLevelUp();
        setSeqFeedback('correct');
        setScore((s) => s + 20);
        setStars((st) => st + 2);
        onEarnStars?.(2);

        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } else {
        goodHabitsSounds.playWrong();
        setSeqFeedback('wrong');
      }
    }
  };

  // Kid taps a placed step to remove it back to available pool
  const handleRemovePlacedStep = (indexToRemove) => {
    if (seqFeedback === 'correct') return;
    goodHabitsSounds.playTap();
    const stepToRemove = placedSteps[indexToRemove];
    setPlacedSteps((prev) => prev.filter((_, i) => i !== indexToRemove));
    setAvailableSteps((prev) => [...prev, stepToRemove]);
    setSeqFeedback(null);
  };

  const handleNextRoutine = () => {
    goodHabitsSounds.playTap();
    if (routineIdx < SEQUENCE_ROUTINES.length - 1) {
      setRoutineIdx((idx) => idx + 1);
    } else {
      goodHabitsSounds.playLevelUp();
      setShowWinModal(true);
      confetti({
        particleCount: 160,
        spread: 95,
        origin: { y: 0.5 }
      });
    }
  };

  return (
    <div className="good-habits-game-wrapper">
      {/* 1. Fixed Full-Width Top Navigation Bar */}
      <header className="gh-header-nav">
        {/* Left: Home Button & Title Branding */}
        <div className="gh-nav-left">
          <button
            type="button"
            className="gh-btn-home"
            onClick={() => {
              goodHabitsSounds.playTap();
              handleExit?.();
            }}
          >
            <ArrowLeft size={18} />
            <span>{t('btnHome')}</span>
          </button>

          <div className="gh-game-branding">
            <span className="gh-title-icon">🌱</span>
            <span className="gh-brand-text">{t('ghTitle')}</span>
          </div>
        </div>

        {/* Center: Stars & Round Badge */}
        <div className="gh-nav-center">
          <div className="gh-stars-pill" title="Shiny Stars Collected!">
            <Star size={20} className="gh-star-icon" />
            <span>{stars}</span>
          </div>

          <div className="gh-round-pill">
            {activeMode === 'good-or-not' && (
              <span>Round {gnRoundIdx + 1} / {GOOD_OR_NOT_GOOD_ROUNDS.length}</span>
            )}
            {activeMode === 'put-in-order' && (
              <span>Routine {routineIdx + 1} / {SEQUENCE_ROUTINES.length}</span>
            )}
            {activeMode === 'explore' && (
              <span>8 Core Habits</span>
            )}
          </div>
        </div>

        {/* Right: Controls (Hint, Sound, Restart) */}
        <div className="gh-nav-right">
          <button
            type="button"
            className="gh-btn-icon is-hint"
            onClick={() => {
              goodHabitsSounds.playTap();
              setShowHintModal(true);
            }}
            title="Friendly Habit Hint"
          >
            <Lightbulb size={20} />
          </button>

          <button
            type="button"
            className="gh-btn-icon"
            onClick={handleToggleSound}
            title={soundEnabled ? 'Mute Sounds' : 'Turn On Sounds'}
          >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>

          <button
            type="button"
            className="gh-btn-icon"
            onClick={handleRestart}
            title="Restart Activity"
          >
            <RotateCcw size={20} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="gh-main-container">
        {/* 2. Mode Selector Pill Tabs */}
        <nav className="gh-mode-switcher">
          <button
            type="button"
            className={`gh-mode-btn ${activeMode === 'good-or-not' ? 'is-active' : ''}`}
            onClick={() => {
              goodHabitsSounds.playTap();
              setActiveMode('good-or-not');
            }}
          >
            <ThumbsUp size={18} />
            <span>{t('ghTabChoice')}</span>
          </button>

          <button
            type="button"
            className={`gh-mode-btn ${activeMode === 'put-in-order' ? 'is-active' : ''}`}
            onClick={() => {
              goodHabitsSounds.playTap();
              setActiveMode('put-in-order');
            }}
          >
            <ListOrdered size={18} />
            <span>{t('ghTabOrder')}</span>
          </button>

          <button
            type="button"
            className={`gh-mode-btn ${activeMode === 'explore' ? 'is-active' : ''}`}
            onClick={() => {
              goodHabitsSounds.playTap();
              setActiveMode('explore');
            }}
          >
            <BookOpen size={18} />
            <span>{t('ghTabGuide')}</span>
          </button>
        </nav>

        {/* Progress Strip */}
        <div className="gh-progress-strip">
          <div
            className="gh-progress-fill"
            style={{
              width:
                activeMode === 'good-or-not'
                  ? `${((gnRoundIdx + 1) / GOOD_OR_NOT_GOOD_ROUNDS.length) * 100}%`
                  : activeMode === 'put-in-order'
                  ? `${((routineIdx + 1) / SEQUENCE_ROUTINES.length) * 100}%`
                  : '100%'
            }}
          />
        </div>

        {/* ===================================================================
            MODE 1: "Good or Not Good?"
            =================================================================== */}
        {activeMode === 'good-or-not' && currentGnRound && (
          <div className="gh-card-challenge">
            <span className="gh-question-category">
              <Sparkles size={14} />
              <span>{currentGnRound.category} Habit</span>
            </span>

            {/* Cute Custom SVG Illustration */}
            <div className="gh-illustration-stage">
              {HABIT_ILLUSTRATIONS[currentGnRound.illustrationKey] || HABIT_ILLUSTRATIONS.brushingTeeth}
            </div>

            {/* Scenario Title & Subtitle */}
            <h2 className="gh-scenario-heading">{currentGnRound.scenario}</h2>
            <p className="gh-scenario-subtitle">{t('ghIsGoodHabit')}</p>

            {/* Choice Buttons */}
            <div className="gh-choice-actions">
              <button
                type="button"
                className="gh-btn-choice is-good"
                onClick={() => handleChoice(true)}
                disabled={gnFeedback === 'correct'}
              >
                <span className="gh-choice-icon">👍</span>
                <span>{t('ghGoodHabitBtn')}</span>
              </button>

              <button
                type="button"
                className="gh-btn-choice is-not-good"
                onClick={() => handleChoice(false)}
                disabled={gnFeedback === 'correct'}
              >
                <span className="gh-choice-icon">👎</span>
                <span>{t('ghNotGoodBtn')}</span>
              </button>
            </div>

            {/* Feedback Banner */}
            {gnFeedback && (
              <div
                className={`gh-feedback-banner ${
                  gnFeedback === 'correct' ? 'is-correct' : 'is-wrong'
                }`}
              >
                <div className="gh-feedback-text">
                  {gnFeedback === 'correct' ? (
                    <span>🎉 {currentGnRound.praise}</span>
                  ) : (
                    <span>🤔 Not quite! Remember: {currentGnRound.hint}</span>
                  )}
                </div>

                {gnFeedback === 'correct' && (
                  <button
                    type="button"
                    className="gh-btn-next-round"
                    onClick={handleNextGnRound}
                  >
                    <span>{t('btnNext')}</span>
                    <ArrowRight size={18} />
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* ===================================================================
            MODE 2: "Put in the Right Order" Routine Sequencing
            =================================================================== */}
        {activeMode === 'put-in-order' && currentRoutine && (
          <div className="gh-sequence-wrapper">
            {/* Header & Instructions */}
            <div className="gh-sequence-header">
              <h2 className="gh-sequence-title">
                <span>{currentRoutine.icon}</span>
                <span>{currentRoutine.title}</span>
              </h2>
              <p className="gh-sequence-instruction">
                {t('ghDragToOrder')}
              </p>
            </div>

            {/* Routine Selector Tabs */}
            <div className="gh-routine-selector">
              {SEQUENCE_ROUTINES.map((rot, idx) => (
                <button
                  key={rot.id}
                  type="button"
                  className={`gh-routine-tab ${idx === routineIdx ? 'is-active' : ''}`}
                  onClick={() => {
                    goodHabitsSounds.playTap();
                    setRoutineIdx(idx);
                  }}
                >
                  <span>{rot.icon}</span>
                  <span>{rot.habitName}</span>
                </button>
              ))}
            </div>

            {/* Target Slots: Step 1, 2, 3, 4 */}
            <div className="gh-slots-grid">
              {[0, 1, 2, 3].map((slotIdx) => {
                const placedStep = placedSteps[slotIdx];
                return (
                  <div
                    key={slotIdx}
                    className={`gh-slot-box ${placedStep ? 'has-card' : ''}`}
                    onClick={() => placedStep && handleRemovePlacedStep(slotIdx)}
                    title={placedStep ? 'Tap to remove step' : `Slot ${slotIdx + 1}`}
                  >
                    <span className="gh-slot-number-badge">{slotIdx + 1}</span>
                    {placedStep ? (
                      <div className="gh-step-card">
                        <span className="gh-step-emoji">{placedStep.emoji}</span>
                        <h4 className="gh-step-title">{placedStep.title}</h4>
                        <p className="gh-step-desc">{placedStep.desc}</p>
                      </div>
                    ) : (
                      <span className="gh-slot-empty-label">Step {slotIdx + 1}</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Sequence Feedback Banner */}
            {seqFeedback && (
              <div
                className={`gh-feedback-banner ${
                  seqFeedback === 'correct' ? 'is-correct' : 'is-wrong'
                }`}
              >
                <div className="gh-feedback-text">
                  {seqFeedback === 'correct' ? (
                    <span>🌟 Magnificent! You know the healthy routine step-by-step!</span>
                  ) : (
                    <span>Oops! The steps are a little mixed up. Tap a card to swap and try again!</span>
                  )}
                </div>

                {seqFeedback === 'correct' && (
                  <button
                    type="button"
                    className="gh-btn-next-round"
                    onClick={handleNextRoutine}
                  >
                    <span>Next Routine</span>
                    <ArrowRight size={18} />
                  </button>
                )}
              </div>
            )}

            {/* Available Steps Pool */}
            {availableSteps.length > 0 && (
              <div className="gh-pool-wrapper">
                <span className="gh-pool-heading">Tap cards to place into sequence:</span>
                <div className="gh-pool-cards-row">
                  {availableSteps.map((step) => (
                    <div
                      key={step.order}
                      className="gh-pool-card-item"
                      onClick={() => handleTapAvailableStep(step)}
                    >
                      <span className="gh-step-emoji">{step.emoji}</span>
                      <h4 className="gh-step-title">{step.title}</h4>
                      <p className="gh-step-desc">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reset Step button if kid wants to start routine over */}
            {placedSteps.length > 0 && seqFeedback !== 'correct' && (
              <div className="gh-sequence-controls">
                <button
                  type="button"
                  className="gh-btn-action reset"
                  onClick={() => initRoutine(routineIdx)}
                >
                  <RotateCcw size={18} />
                  <span>Start Routine Over</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* ===================================================================
            MODE 3: "Explore Habits" Visual Card Guide
            =================================================================== */}
        {activeMode === 'explore' && (
          <div className="gh-guide-grid">
            {HABITS_GUIDE.map((habit) => (
              <div
                key={habit.id}
                className="gh-guide-card"
                style={{ borderColor: habit.color }}
              >
                <div className="gh-guide-card-top">
                  <span className="gh-guide-badge">{habit.icon}</span>
                  <span
                    className="gh-guide-tagline"
                    style={{ background: habit.bg, color: habit.color }}
                  >
                    {habit.tagline}
                  </span>
                </div>
                <h3 className="gh-guide-title">{habit.title}</h3>
                <p className="gh-guide-desc">{habit.desc}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 3. Hint Modal */}
      {showHintModal && (
        <div
          className="gh-modal-overlay"
          onClick={() => setShowHintModal(false)}
        >
          <div
            className="gh-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="gh-modal-icon">💡</span>
            <h3 className="gh-modal-title">Good Habit Tip!</h3>
            <p className="gh-modal-desc">
              {activeMode === 'good-or-not'
                ? currentGnRound.hint
                : activeMode === 'put-in-order'
                ? `Think about what you do first, next, and last when ${currentRoutine.habitName}!`
                : 'Practicing these habits every day makes you a healthy, happy superstar!'}
            </p>
            <button
              type="button"
              className="gh-btn-modal-close"
              onClick={() => setShowHintModal(false)}
            >
              Got it! 👍
            </button>
          </div>
        </div>
      )}

      {/* 4. Level Completion / Win Modal */}
      {showWinModal && (
        <div className="gh-modal-overlay">
          <div className="gh-modal-box">
            <span className="gh-modal-icon">🏆</span>
            <h3 className="gh-modal-title">Superstar of Good Habits!</h3>
            <p className="gh-modal-desc">
              You completed all the challenges and earned <strong>{stars} Stars ⭐</strong>! You are a champion of healthy habits and great manners!
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                className="gh-btn-modal-close"
                onClick={handleRestart}
              >
                Play Again 🔄
              </button>
              <button
                type="button"
                className="gh-btn-modal-close"
                style={{ background: '#3b82f6' }}
                onClick={() => handleExit?.()}
              >
                Back to Activities 🌟
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
