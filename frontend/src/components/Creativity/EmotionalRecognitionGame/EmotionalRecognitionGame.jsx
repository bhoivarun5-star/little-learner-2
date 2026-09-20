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
  Trophy,
  ArrowRight,
  Smile,
  HeartHandshake,
  LayoutGrid,
  BookOpen
} from 'lucide-react';
import {
  EMOTION_ILLUSTRATIONS,
  EMOTIONS_CATALOG,
  GUESS_THE_EMOTION_ROUNDS,
  SITUATION_ROUNDS,
  MATCH_EMOTION_ROUNDS
} from './emotionalRecognitionData';
import { emotionalRecognitionSounds } from './emotionalRecognitionSounds';
import { useLanguage } from '../../../context/LanguageContext';
import './EmotionalRecognitionGame.css';

export default function EmotionalRecognitionGame({ onBack, onHome, onEarnStars }) {
  const handleExit = onHome || onBack;

  // Active Modes: 'guess' | 'situations' | 'match' | 'guide'
  const [activeMode, setActiveMode] = useState('guess');

  // General State
  const [stars, setStars] = useState(0);
  const [score, setScore] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showHintModal, setShowHintModal] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);

  // Mode 1: Guess the Emotion
  const [guessRoundIdx, setGuessRoundIdx] = useState(0);
  const [guessFeedback, setGuessFeedback] = useState(null); // 'correct' | 'wrong' | null

  // Mode 2: How Do They Feel?
  const [sitRoundIdx, setSitRoundIdx] = useState(0);
  const [sitFeedback, setSitFeedback] = useState(null);

  // Mode 3: Match Emotions
  const [matchRoundIdx, setMatchRoundIdx] = useState(0);
  const [selectedFaceId, setSelectedFaceId] = useState(null);
  const [selectedWordId, setSelectedWordId] = useState(null);
  const [matchedIds, setMatchedIds] = useState([]);

  // Sync sound player mute state
  useEffect(() => {
    emotionalRecognitionSounds.enabled = soundEnabled;
  }, [soundEnabled]);

  const handleToggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  const handleRestart = () => {
    emotionalRecognitionSounds.playTap();
    if (activeMode === 'guess') {
      setGuessRoundIdx(0);
      setGuessFeedback(null);
    } else if (activeMode === 'situations') {
      setSitRoundIdx(0);
      setSitFeedback(null);
    } else if (activeMode === 'match') {
      setSelectedFaceId(null);
      setSelectedWordId(null);
      setMatchedIds([]);
    }
    setShowWinModal(false);
  };

  // =========================================================================
  // MODE 1: "Guess the Emotion" Handlers
  // =========================================================================
  const currentGuessRound = GUESS_THE_EMOTION_ROUNDS[guessRoundIdx];

  const handleGuessChoice = (emotionId) => {
    if (guessFeedback === 'correct') return;

    const isCorrect = emotionId === currentGuessRound.correctEmotionId;

    if (isCorrect) {
      emotionalRecognitionSounds.playCorrect();
      setGuessFeedback('correct');
      setScore((s) => s + 10);
      setStars((st) => st + 1);
      onEarnStars?.(1);

      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      emotionalRecognitionSounds.playWrong();
      setGuessFeedback('wrong');
    }
  };

  const handleNextGuessRound = () => {
    emotionalRecognitionSounds.playTap();
    setGuessFeedback(null);

    if (guessRoundIdx < GUESS_THE_EMOTION_ROUNDS.length - 1) {
      setGuessRoundIdx((idx) => idx + 1);
    } else {
      emotionalRecognitionSounds.playLevelUp();
      setShowWinModal(true);
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.5 }
      });
    }
  };

  // =========================================================================
  // MODE 2: "How Do They Feel?" Situations Handlers
  // =========================================================================
  const currentSitRound = SITUATION_ROUNDS[sitRoundIdx];

  const handleSitChoice = (emotionId) => {
    if (sitFeedback === 'correct') return;

    const isCorrect = emotionId === currentSitRound.correctEmotionId;

    if (isCorrect) {
      emotionalRecognitionSounds.playCorrect();
      setSitFeedback('correct');
      setScore((s) => s + 10);
      setStars((st) => st + 1);
      onEarnStars?.(1);

      confetti({
        particleCount: 80,
        spread: 75,
        origin: { y: 0.6 }
      });
    } else {
      emotionalRecognitionSounds.playWrong();
      setSitFeedback('wrong');
    }
  };

  const handleNextSitRound = () => {
    emotionalRecognitionSounds.playTap();
    setSitFeedback(null);

    if (sitRoundIdx < SITUATION_ROUNDS.length - 1) {
      setSitRoundIdx((idx) => idx + 1);
    } else {
      emotionalRecognitionSounds.playLevelUp();
      setShowWinModal(true);
      confetti({
        particleCount: 160,
        spread: 95,
        origin: { y: 0.5 }
      });
    }
  };

  // =========================================================================
  // MODE 3: "Match Emotions" Handlers
  // =========================================================================
  const currentMatchRound = MATCH_EMOTION_ROUNDS[matchRoundIdx];

  const handleSelectFace = (id) => {
    if (matchedIds.includes(id)) return;
    emotionalRecognitionSounds.playTap();

    if (selectedWordId) {
      // Check match
      if (selectedWordId === id) {
        emotionalRecognitionSounds.playMatchSuccess();
        const newMatched = [...matchedIds, id];
        setMatchedIds(newMatched);
        setSelectedFaceId(null);
        setSelectedWordId(null);
        setStars((st) => st + 1);
        onEarnStars?.(1);

        if (newMatched.length === currentMatchRound.pairs.length) {
          emotionalRecognitionSounds.playLevelUp();
          confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
        }
      } else {
        emotionalRecognitionSounds.playWrong();
        setSelectedFaceId(id);
        setSelectedWordId(null);
      }
    } else {
      setSelectedFaceId(id);
    }
  };

  const handleSelectWord = (id) => {
    if (matchedIds.includes(id)) return;
    emotionalRecognitionSounds.playTap();

    if (selectedFaceId) {
      // Check match
      if (selectedFaceId === id) {
        emotionalRecognitionSounds.playMatchSuccess();
        const newMatched = [...matchedIds, id];
        setMatchedIds(newMatched);
        setSelectedFaceId(null);
        setSelectedWordId(null);
        setStars((st) => st + 1);
        onEarnStars?.(1);

        if (newMatched.length === currentMatchRound.pairs.length) {
          emotionalRecognitionSounds.playLevelUp();
          confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
        }
      } else {
        emotionalRecognitionSounds.playWrong();
        setSelectedWordId(id);
        setSelectedFaceId(null);
      }
    } else {
      setSelectedWordId(id);
    }
  };

  const handleNextMatchRound = () => {
    emotionalRecognitionSounds.playTap();
    if (matchRoundIdx < MATCH_EMOTION_ROUNDS.length - 1) {
      setMatchRoundIdx((idx) => idx + 1);
      setMatchedIds([]);
      setSelectedFaceId(null);
      setSelectedWordId(null);
    } else {
      emotionalRecognitionSounds.playLevelUp();
      setShowWinModal(true);
      confetti({ particleCount: 160, spread: 95, origin: { y: 0.5 } });
    }
  };

  return (
    <div className="emotional-game-wrapper">
      {/* 1. Fixed Full-Width Top Navigation Bar */}
      <header className="er-header-nav">
        {/* Left: Home Button & Branding */}
        <div className="er-nav-left">
          <button
            type="button"
            className="er-btn-home"
            onClick={() => {
              emotionalRecognitionSounds.playTap();
              handleExit?.();
            }}
          >
            <ArrowLeft size={18} />
            <span>{t('btnHome')}</span>
          </button>

          <div className="er-game-branding">
            <span className="er-title-icon">😊</span>
            <span className="er-brand-text">Emotional Recognition</span>
          </div>
        </div>

        {/* Center: Stars & Round Counter */}
        <div className="er-nav-center">
          <div className="er-stars-pill" title="Shiny Stars Collected!">
            <Star size={20} className="er-star-icon" />
            <span>{stars}</span>
          </div>

          <div className="er-round-pill">
            {activeMode === 'guess' && (
              <span>Round {guessRoundIdx + 1} / {GUESS_THE_EMOTION_ROUNDS.length}</span>
            )}
            {activeMode === 'situations' && (
              <span>Story {sitRoundIdx + 1} / {SITUATION_ROUNDS.length}</span>
            )}
            {activeMode === 'match' && (
              <span>Matching {matchRoundIdx + 1} / {MATCH_EMOTION_ROUNDS.length}</span>
            )}
            {activeMode === 'guide' && (
              <span>7 Core Emotions</span>
            )}
          </div>
        </div>

        {/* Right: Controls (Hint, Sound, Restart) */}
        <div className="er-nav-right">
          <button
            type="button"
            className="er-btn-icon is-hint"
            onClick={() => {
              emotionalRecognitionSounds.playTap();
              setShowHintModal(true);
            }}
            title="Friendly Feeling Hint"
          >
            <Lightbulb size={20} />
          </button>

          <button
            type="button"
            className="er-btn-icon"
            onClick={handleToggleSound}
            title={soundEnabled ? 'Mute Sounds' : 'Turn On Sounds'}
          >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>

          <button
            type="button"
            className="er-btn-icon"
            onClick={handleRestart}
            title="Restart Mode"
          >
            <RotateCcw size={20} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="er-main-container">
        {/* 2. Mode Selector Pill Tabs */}
        <nav className="er-mode-switcher">
          <button
            type="button"
            className={`er-mode-btn ${activeMode === 'guess' ? 'is-active' : ''}`}
            onClick={() => {
              emotionalRecognitionSounds.playTap();
              setActiveMode('guess');
            }}
          >
            <Smile size={18} />
            <span>Guess Emotion</span>
          </button>

          <button
            type="button"
            className={`er-mode-btn ${activeMode === 'situations' ? 'is-active' : ''}`}
            onClick={() => {
              emotionalRecognitionSounds.playTap();
              setActiveMode('situations');
            }}
          >
            <HeartHandshake size={18} />
            <span>How Do They Feel?</span>
          </button>

          <button
            type="button"
            className={`er-mode-btn ${activeMode === 'match' ? 'is-active' : ''}`}
            onClick={() => {
              emotionalRecognitionSounds.playTap();
              setActiveMode('match');
            }}
          >
            <LayoutGrid size={18} />
            <span>Match Emotion</span>
          </button>

          <button
            type="button"
            className={`er-mode-btn ${activeMode === 'guide' ? 'is-active' : ''}`}
            onClick={() => {
              emotionalRecognitionSounds.playTap();
              setActiveMode('guide');
            }}
          >
            <BookOpen size={18} />
            <span>Emotion Guide</span>
          </button>
        </nav>

        {/* Progress Strip */}
        <div className="er-progress-strip">
          <div
            className="er-progress-fill"
            style={{
              width:
                activeMode === 'guess'
                  ? `${((guessRoundIdx + 1) / GUESS_THE_EMOTION_ROUNDS.length) * 100}%`
                  : activeMode === 'situations'
                  ? `${((sitRoundIdx + 1) / SITUATION_ROUNDS.length) * 100}%`
                  : activeMode === 'match'
                  ? `${(matchedIds.length / currentMatchRound.pairs.length) * 100}%`
                  : '100%'
            }}
          />
        </div>

        {/* ===================================================================
            MODE 1: "Guess the Emotion"
            =================================================================== */}
        {activeMode === 'guess' && currentGuessRound && (
          <div className="er-card-challenge">
            <span className="er-badge-topic">
              <Sparkles size={14} />
              <span>Face Clue</span>
            </span>

            {/* Expressive SVG Character Face */}
            <div className="er-illustration-stage">
              {EMOTION_ILLUSTRATIONS[currentGuessRound.illustrationKey]}
            </div>

            {/* Question Text */}
            <h2 className="er-question-heading">{currentGuessRound.question}</h2>

            {/* Option Buttons */}
            <div className="er-choices-grid">
              {currentGuessRound.options.map((optId) => {
                const emotionObj = EMOTIONS_CATALOG.find((e) => e.id === optId) || {
                  name: optId,
                  emoji: '✨'
                };
                return (
                  <button
                    key={optId}
                    type="button"
                    className="er-btn-emotion-choice"
                    onClick={() => handleGuessChoice(optId)}
                    disabled={guessFeedback === 'correct'}
                  >
                    <span className="er-choice-emoji">{emotionObj.emoji}</span>
                    <span>{emotionObj.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Feedback Banner */}
            {guessFeedback && (
              <div
                className={`er-feedback-banner ${
                  guessFeedback === 'correct' ? 'is-correct' : 'is-wrong'
                }`}
              >
                <div className="er-feedback-text">
                  {guessFeedback === 'correct' ? (
                    <span>🎉 {currentGuessRound.praise}</span>
                  ) : (
                    <span>🤔 Not quite! Hint: {currentGuessRound.hint}</span>
                  )}
                </div>

                {guessFeedback === 'correct' && (
                  <button
                    type="button"
                    className="er-btn-next"
                    onClick={handleNextGuessRound}
                  >
                    <span>Next</span>
                    <ArrowRight size={18} />
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* ===================================================================
            MODE 2: "How Do They Feel?" Everyday Situations
            =================================================================== */}
        {activeMode === 'situations' && currentSitRound && (
          <div className="er-card-challenge">
            <span className="er-badge-topic">
              <Sparkles size={14} />
              <span>Real-Life Story</span>
            </span>

            {/* Scenario Artwork */}
            <div className="er-illustration-stage">
              {EMOTION_ILLUSTRATIONS[currentSitRound.illustrationKey]}
            </div>

            {/* Story Prompt */}
            <p className="er-story-text">"{currentSitRound.story}"</p>
            <h2 className="er-question-heading">{currentSitRound.question}</h2>

            {/* Option Buttons */}
            <div className="er-choices-grid">
              {currentSitRound.options.map((optId) => {
                const emotionObj = EMOTIONS_CATALOG.find((e) => e.id === optId) || {
                  name: optId,
                  emoji: '✨'
                };
                return (
                  <button
                    key={optId}
                    type="button"
                    className="er-btn-emotion-choice"
                    onClick={() => handleSitChoice(optId)}
                    disabled={sitFeedback === 'correct'}
                  >
                    <span className="er-choice-emoji">{emotionObj.emoji}</span>
                    <span>{emotionObj.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Feedback Banner */}
            {sitFeedback && (
              <div
                className={`er-feedback-banner ${
                  sitFeedback === 'correct' ? 'is-correct' : 'is-wrong'
                }`}
              >
                <div className="er-feedback-text">
                  {sitFeedback === 'correct' ? (
                    <span>🌟 {currentSitRound.praise}</span>
                  ) : (
                    <span>Hint: {currentSitRound.hint}</span>
                  )}
                </div>

                {sitFeedback === 'correct' && (
                  <button
                    type="button"
                    className="er-btn-next"
                    onClick={handleNextSitRound}
                  >
                    <span>Next Story</span>
                    <ArrowRight size={18} />
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* ===================================================================
            MODE 3: "Match Emotions"
            =================================================================== */}
        {activeMode === 'match' && currentMatchRound && (
          <div className="er-match-container">
            <h2 className="er-match-title">Match the Faces to Their Emotion Names!</h2>
            <p className="er-match-instruction">
              Tap a face on the left, then tap its matching emotion name on the right!
            </p>

            <div className="er-match-columns">
              {/* Column 1: Faces */}
              <div className="er-match-column">
                <span className="er-match-col-header">Faces</span>
                {currentMatchRound.pairs.map((pair) => {
                  const isMatched = matchedIds.includes(pair.id);
                  const isSelected = selectedFaceId === pair.id;
                  return (
                    <div
                      key={`face-${pair.id}`}
                      className={`er-match-item-card ${isMatched ? 'is-matched' : ''} ${
                        isSelected ? 'is-selected' : ''
                      }`}
                      onClick={() => handleSelectFace(pair.id)}
                    >
                      <span style={{ fontSize: '2.5rem' }}>{pair.emoji}</span>
                      <span>{isMatched ? '✓ Matched!' : 'Face'}</span>
                    </div>
                  );
                })}
              </div>

              {/* Column 2: Words (Shuffled display) */}
              <div className="er-match-column">
                <span className="er-match-col-header">Emotion Words</span>
                {[...currentMatchRound.pairs]
                  .reverse()
                  .map((pair) => {
                    const isMatched = matchedIds.includes(pair.id);
                    const isSelected = selectedWordId === pair.id;
                    return (
                      <div
                        key={`word-${pair.id}`}
                        className={`er-match-item-card ${isMatched ? 'is-matched' : ''} ${
                          isSelected ? 'is-selected' : ''
                        }`}
                        onClick={() => handleSelectWord(pair.id)}
                      >
                        <span style={{ color: pair.color }}>{pair.name}</span>
                        {isMatched && <CheckCircle2 size={18} color="#15803d" />}
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Match Complete Banner */}
            {matchedIds.length === currentMatchRound.pairs.length && (
              <div className="er-feedback-banner is-correct">
                <span className="er-feedback-text">
                  🎉 Fantastic! All emotions matched successfully!
                </span>
                <button
                  type="button"
                  className="er-btn-next"
                  onClick={handleNextMatchRound}
                >
                  <span>Next Round</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ===================================================================
            MODE 4: "Emotion Guide"
            =================================================================== */}
        {activeMode === 'guide' && (
          <div className="er-guide-grid">
            {EMOTIONS_CATALOG.map((emo) => (
              <div
                key={emo.id}
                className="er-guide-card"
                style={{ borderColor: emo.color }}
              >
                <div className="er-guide-card-top">
                  <span className="er-guide-badge">{emo.emoji}</span>
                  <span
                    className="er-guide-tagline"
                    style={{ background: emo.bg, color: emo.color }}
                  >
                    {emo.tagline}
                  </span>
                </div>
                <h3 className="er-guide-title">{emo.name}</h3>
                <p className="er-guide-desc">{emo.description}</p>
                <p className="er-guide-when">
                  <strong>When we feel this:</strong> {emo.whenFeel}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 3. Hint Modal */}
      {showHintModal && (
        <div
          className="er-modal-overlay"
          onClick={() => setShowHintModal(false)}
        >
          <div
            className="er-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="er-modal-icon">💡</span>
            <h3 className="er-modal-title">Emotion Clue!</h3>
            <p className="er-modal-desc">
              {activeMode === 'guess'
                ? currentGuessRound.hint
                : activeMode === 'situations'
                ? currentSitRound.hint
                : 'All feelings are natural and okay! Look closely at the eyebrows, eyes, and mouth to know how someone feels!'}
            </p>
            <button
              type="button"
              className="er-btn-modal-close"
              onClick={() => setShowHintModal(false)}
            >
              Got it! 👍
            </button>
          </div>
        </div>
      )}

      {/* 4. Win / Trophy Modal */}
      {showWinModal && (
        <div className="er-modal-overlay">
          <div className="er-modal-box">
            <span className="er-modal-icon">🏆</span>
            <h3 className="er-modal-title">Emotions Master!</h3>
            <p className="er-modal-desc">
              Amazing job! You identified all the emotions, earned <strong>{stars} Stars ⭐</strong>, and learned how to understand feelings with empathy!
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                className="er-btn-modal-close"
                onClick={handleRestart}
              >
                Play Again 🔄
              </button>
              <button
                type="button"
                className="er-btn-modal-close"
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
