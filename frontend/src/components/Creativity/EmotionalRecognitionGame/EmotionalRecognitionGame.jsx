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
  BookOpen,
  Lock
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
import StudentSwitcher from '../../StudentSwitcher';
import './EmotionalRecognitionGame.css';

export default function EmotionalRecognitionGame({ onBack, onHome, onEarnStars, onToggleDashboard }) {
  const { t, speak, language, isMuted, soundEnabled, toggleMute } = useLanguage();
  const isMarathi = language === 'mr';
  const handleExit = onHome || onBack;

  // Level Locking Progression:
  // Level 1: "Guess Emotion" ('guess') -> Unlocked by default
  // Level 2: "How They Feel?" ('situations') -> Locked until Level 1 complete
  // Level 3: "Match Emotion" ('match') -> Locked until Level 2 complete
  const [unlockedLevel, setUnlockedLevel] = useState(() => {
    try {
      const saved = localStorage.getItem('little_learner_er_unlocked_level');
      const val = parseInt(saved, 10);
      return val >= 1 && val <= 3 ? val : 1;
    } catch {
      return 1;
    }
  });

  // Active Modes: 'guess' | 'situations' | 'match' | 'guide'
  const [activeMode, setActiveMode] = useState('guess');
  const [completedMode, setCompletedMode] = useState(null);
  const [lockToast, setLockToast] = useState(null);

  // General State
  const [stars, setStars] = useState(0);
  const [score, setScore] = useState(0);
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
    toggleMute();
  };

  const handleSelectMode = (mode) => {
    if (mode === 'situations' && unlockedLevel < 2) {
      emotionalRecognitionSounds.playWrong();
      const msg = isMarathi
        ? '🔒 ही पातळी बंद आहे! उघडण्यासाठी प्रथम "भावना ओळखा" (पातळी १) पूर्ण करा!'
        : '🔒 Level Locked! Complete "Guess Emotion" (Level 1) first to unlock!';
      setLockToast(msg);
      if (speak) speak(isMarathi ? 'प्रथम आधीची पातळी पूर्ण करा' : 'Please complete the first level first');
      setTimeout(() => setLockToast(null), 3500);
      return;
    }

    if (mode === 'match' && unlockedLevel < 3) {
      emotionalRecognitionSounds.playWrong();
      const msg = isMarathi
        ? '🔒 ही पातळी बंद आहे! उघडण्यासाठी प्रथम "त्यांना कसे वाटते?" (पातळी २) पूर्ण करा!'
        : '🔒 Level Locked! Complete "How They Feel?" (Level 2) first to unlock!';
      setLockToast(msg);
      if (speak) speak(isMarathi ? 'प्रथम आधीची पातळी पूर्ण करा' : 'Please complete the previous level first');
      setTimeout(() => setLockToast(null), 3500);
      return;
    }

    emotionalRecognitionSounds.playTap();
    setLockToast(null);
    setActiveMode(mode);
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

  const handleProceedToNextLevel = (nextMode) => {
    emotionalRecognitionSounds.playTap();
    setShowWinModal(false);
    setActiveMode(nextMode);
    if (nextMode === 'situations') {
      setSitRoundIdx(0);
      setSitFeedback(null);
    } else if (nextMode === 'match') {
      setMatchRoundIdx(0);
      setSelectedFaceId(null);
      setSelectedWordId(null);
      setMatchedIds([]);
    }
  };

  // =========================================================================
  // MODE 1: "Guess the Emotion" Handlers
  // =========================================================================
  const currentGuessRound = GUESS_THE_EMOTION_ROUNDS[guessRoundIdx];

  const handleGuessChoice = (emotionId) => {
    if (guessFeedback === 'correct') return;

    const isCorrect = emotionId === currentGuessRound.correctEmotionId;
    const emotionObj = EMOTIONS_CATALOG.find((e) => e.id === emotionId);
    const emotionName = isMarathi ? (emotionObj?.nameMr || emotionObj?.name) : emotionObj?.name;

    if (isCorrect) {
      emotionalRecognitionSounds.playCorrect();
      setGuessFeedback('correct');
      setScore((s) => s + 10);
      setStars((st) => st + 1);
      onEarnStars?.(1);

      if (speak && emotionName) speak(emotionName);

      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      emotionalRecognitionSounds.playWrong();
      setGuessFeedback('wrong');
      if (speak) speak(isMarathi ? 'पुन्हा प्रयत्न करा' : 'Try again');
    }
  };

  const handleNextGuessRound = () => {
    emotionalRecognitionSounds.playTap();
    setGuessFeedback(null);

    if (guessRoundIdx < GUESS_THE_EMOTION_ROUNDS.length - 1) {
      setGuessRoundIdx((idx) => idx + 1);
    } else {
      // Completed Level 1 -> Unlock Level 2 ("How They Feel?")
      setUnlockedLevel((prev) => {
        const next = Math.max(prev, 2);
        try {
          localStorage.setItem('little_learner_er_unlocked_level', String(next));
        } catch {}
        return next;
      });
      setCompletedMode('guess');
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
    const emotionObj = EMOTIONS_CATALOG.find((e) => e.id === emotionId);
    const emotionName = isMarathi ? (emotionObj?.nameMr || emotionObj?.name) : emotionObj?.name;

    if (isCorrect) {
      emotionalRecognitionSounds.playCorrect();
      setSitFeedback('correct');
      setScore((s) => s + 10);
      setStars((st) => st + 1);
      onEarnStars?.(1);

      if (speak && emotionName) speak(emotionName);

      confetti({
        particleCount: 80,
        spread: 75,
        origin: { y: 0.6 }
      });
    } else {
      emotionalRecognitionSounds.playWrong();
      setSitFeedback('wrong');
      if (speak) speak(isMarathi ? 'पुन्हा प्रयत्न करा' : 'Try again');
    }
  };

  const handleNextSitRound = () => {
    emotionalRecognitionSounds.playTap();
    setSitFeedback(null);

    if (sitRoundIdx < SITUATION_ROUNDS.length - 1) {
      setSitRoundIdx((idx) => idx + 1);
    } else {
      // Completed Level 2 -> Unlock Level 3 ("Match Emotion")
      setUnlockedLevel((prev) => {
        const next = Math.max(prev, 3);
        try {
          localStorage.setItem('little_learner_er_unlocked_level', String(next));
        } catch {}
        return next;
      });
      setCompletedMode('situations');
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

    const emotionObj = EMOTIONS_CATALOG.find((e) => e.id === id);
    const emotionName = isMarathi ? (emotionObj?.nameMr || emotionObj?.name) : emotionObj?.name;
    if (speak && emotionName) speak(emotionName);

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
      // Completed Level 3 (Final Level)
      setCompletedMode('match');
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
            <span className="er-brand-text">{t('erTitle')}</span>
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
              <span>{isMarathi ? `फेरी ${guessRoundIdx + 1} / ${GUESS_THE_EMOTION_ROUNDS.length}` : `Round ${guessRoundIdx + 1} / ${GUESS_THE_EMOTION_ROUNDS.length}`}</span>
            )}
            {activeMode === 'situations' && (
              <span>{isMarathi ? `गोष्ट ${sitRoundIdx + 1} / ${SITUATION_ROUNDS.length}` : `Story ${sitRoundIdx + 1} / ${SITUATION_ROUNDS.length}`}</span>
            )}
            {activeMode === 'match' && (
              <span>{isMarathi ? `जोड्या ${matchRoundIdx + 1} / ${MATCH_EMOTION_ROUNDS.length}` : `Matching ${matchRoundIdx + 1} / ${MATCH_EMOTION_ROUNDS.length}`}</span>
            )}
            {activeMode === 'guide' && (
              <span>{isMarathi ? '७ मुख्य भावना' : '7 Core Emotions'}</span>
            )}
          </div>
        </div>

        {/* Right: Controls (Switcher, Hint, Sound, Restart) */}
        <div className="er-nav-right">
          <StudentSwitcher compact={true} onOpenDashboard={onToggleDashboard} />
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
          {/* Level 1: Guess Emotion */}
          <button
            type="button"
            className={`er-mode-btn ${activeMode === 'guess' ? 'is-active' : ''}`}
            onClick={() => handleSelectMode('guess')}
          >
            <Smile size={18} />
            <span>{t('erTabGuess')}</span>
            <span className="er-lvl-tag">{isMarathi ? 'पातळी १' : 'Level 1'}</span>
          </button>

          {/* Level 2: How They Feel? (Locked until Level 1 completed) */}
          <button
            type="button"
            className={`er-mode-btn ${activeMode === 'situations' ? 'is-active' : ''} ${unlockedLevel < 2 ? 'is-locked' : ''}`}
            onClick={() => handleSelectMode('situations')}
            title={unlockedLevel < 2 ? (isMarathi ? 'पातळी १ पूर्ण केल्यावर उघडेल' : 'Complete Level 1 to unlock') : ''}
          >
            {unlockedLevel < 2 ? <Lock size={16} className="er-lock-icon" /> : <HeartHandshake size={18} />}
            <span>{t('erTabSituations')}</span>
            <span className="er-lvl-tag">
              {unlockedLevel < 2 ? '🔒' : (isMarathi ? 'पातळी २' : 'Level 2')}
            </span>
          </button>

          {/* Level 3: Match Emotion (Locked until Level 2 completed) */}
          <button
            type="button"
            className={`er-mode-btn ${activeMode === 'match' ? 'is-active' : ''} ${unlockedLevel < 3 ? 'is-locked' : ''}`}
            onClick={() => handleSelectMode('match')}
            title={unlockedLevel < 3 ? (isMarathi ? 'पातळी २ पूर्ण केल्यावर उघडेल' : 'Complete Level 2 to unlock') : ''}
          >
            {unlockedLevel < 3 ? <Lock size={16} className="er-lock-icon" /> : <LayoutGrid size={18} />}
            <span>{t('erTabMatch')}</span>
            <span className="er-lvl-tag">
              {unlockedLevel < 3 ? '🔒' : (isMarathi ? 'पातळी ३' : 'Level 3')}
            </span>
          </button>

          {/* Guide Reference */}
          <button
            type="button"
            className={`er-mode-btn ${activeMode === 'guide' ? 'is-active' : ''}`}
            onClick={() => handleSelectMode('guide')}
          >
            <BookOpen size={18} />
            <span>{t('erTabGuide')}</span>
          </button>
        </nav>

        {/* Level Lock Alert Toast */}
        {lockToast && (
          <div className="er-lock-toast">
            <Lock size={18} className="er-lock-toast-icon" />
            <span>{lockToast}</span>
          </div>
        )}

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
              <span>{isMarathi ? 'चेहऱ्याचा इशारा' : 'Face Clue'}</span>
            </span>

            {/* Expressive SVG Character Face */}
            <div className="er-illustration-stage">
              {EMOTION_ILLUSTRATIONS[currentGuessRound.illustrationKey]}
            </div>

            {/* Question Text */}
            <h2 className="er-question-heading">
              {isMarathi ? (currentGuessRound.questionMr || currentGuessRound.question) : currentGuessRound.question}
            </h2>

            {/* Option Buttons */}
            <div className="er-choices-grid">
              {currentGuessRound.options.map((optId) => {
                const emotionObj = EMOTIONS_CATALOG.find((e) => e.id === optId) || {
                  name: optId,
                  nameMr: optId,
                  emoji: '✨'
                };
                const emotionName = isMarathi ? (emotionObj.nameMr || emotionObj.name) : emotionObj.name;
                return (
                  <button
                    key={optId}
                    type="button"
                    className="er-btn-emotion-choice"
                    onClick={() => handleGuessChoice(optId)}
                    disabled={guessFeedback === 'correct'}
                  >
                    <span className="er-choice-emoji">{emotionObj.emoji}</span>
                    <span>{emotionName}</span>
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
                    <span>🎉 {isMarathi ? (currentGuessRound.praiseMr || currentGuessRound.praise) : currentGuessRound.praise}</span>
                  ) : (
                    <span>🤔 {isMarathi ? `अरेरे! इशारा: ${currentGuessRound.hintMr || currentGuessRound.hint}` : `Not quite! Hint: ${currentGuessRound.hint}`}</span>
                  )}
                </div>

                {guessFeedback === 'correct' && (
                  <button
                    type="button"
                    className="er-btn-next"
                    onClick={handleNextGuessRound}
                  >
                    <span>{isMarathi ? 'पुढे' : 'Next'}</span>
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
              <span>{isMarathi ? 'दैनंदिन प्रसंग' : 'Real-Life Story'}</span>
            </span>

            {/* Scenario Artwork */}
            <div className="er-illustration-stage">
              {EMOTION_ILLUSTRATIONS[currentSitRound.illustrationKey]}
            </div>

            {/* Story Prompt */}
            <p className="er-story-text">"{isMarathi ? (currentSitRound.storyMr || currentSitRound.story) : currentSitRound.story}"</p>
            <h2 className="er-question-heading">
              {isMarathi ? (currentSitRound.questionMr || currentSitRound.question) : currentSitRound.question}
            </h2>

            {/* Option Buttons */}
            <div className="er-choices-grid">
              {currentSitRound.options.map((optId) => {
                const emotionObj = EMOTIONS_CATALOG.find((e) => e.id === optId) || {
                  name: optId,
                  nameMr: optId,
                  emoji: '✨'
                };
                const emotionName = isMarathi ? (emotionObj.nameMr || emotionObj.name) : emotionObj.name;
                return (
                  <button
                    key={optId}
                    type="button"
                    className="er-btn-emotion-choice"
                    onClick={() => handleSitChoice(optId)}
                    disabled={sitFeedback === 'correct'}
                  >
                    <span className="er-choice-emoji">{emotionObj.emoji}</span>
                    <span>{emotionName}</span>
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
                    <span>🌟 {isMarathi ? (currentSitRound.praiseMr || currentSitRound.praise) : currentSitRound.praise}</span>
                  ) : (
                    <span>{isMarathi ? `इशारा: ${currentSitRound.hintMr || currentSitRound.hint}` : `Hint: ${currentSitRound.hint}`}</span>
                  )}
                </div>

                {sitFeedback === 'correct' && (
                  <button
                    type="button"
                    className="er-btn-next"
                    onClick={handleNextSitRound}
                  >
                    <span>{isMarathi ? 'पुढील गोष्ट' : 'Next Story'}</span>
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
            <h2 className="er-match-title">
              {isMarathi ? 'चेहरे आणि त्यांच्या भावनांच्या नावांच्या जोड्या लावा!' : 'Match the Faces to Their Emotion Names!'}
            </h2>
            <p className="er-match-instruction">
              {isMarathi ? (currentMatchRound.promptMr || 'डावीकडील चेहऱ्यावर टॅप करा, नंतर उजवीकडील भावनांच्या योग्य नावावर टॅप करा!') : currentMatchRound.prompt}
            </p>

            <div className="er-match-columns">
              {/* Column 1: Faces */}
              <div className="er-match-column">
                <span className="er-match-col-header">{isMarathi ? 'चेहरे' : 'Faces'}</span>
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
                      <span>{isMatched ? (isMarathi ? '✓ जोडी जुळली!' : '✓ Matched!') : (isMarathi ? 'चेहरा' : 'Face')}</span>
                    </div>
                  );
                })}
              </div>

              {/* Column 2: Words (Shuffled display) */}
              <div className="er-match-column">
                <span className="er-match-col-header">{isMarathi ? 'भावनेचे शब्द' : 'Emotion Words'}</span>
                {[...currentMatchRound.pairs]
                  .reverse()
                  .map((pair) => {
                    const isMatched = matchedIds.includes(pair.id);
                    const isSelected = selectedWordId === pair.id;
                    const emotionName = isMarathi ? (pair.nameMr || pair.name) : pair.name;
                    return (
                      <div
                        key={`word-${pair.id}`}
                        className={`er-match-item-card ${isMatched ? 'is-matched' : ''} ${
                          isSelected ? 'is-selected' : ''
                        }`}
                        onClick={() => handleSelectWord(pair.id)}
                      >
                        <span style={{ color: pair.color }}>{emotionName}</span>
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
                  {isMarathi ? '🎉 अप्रतिम! सर्व भावनांच्या योग्य जोड्या जुळल्या!' : '🎉 Fantastic! All emotions matched successfully!'}
                </span>
                <button
                  type="button"
                  className="er-btn-next"
                  onClick={handleNextMatchRound}
                >
                  <span>{isMarathi ? 'पुढील फेरी' : 'Next Round'}</span>
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
                    {isMarathi ? (emo.taglineMr || emo.tagline) : emo.tagline}
                  </span>
                </div>
                <h3 className="er-guide-title">{isMarathi ? (emo.nameMr || emo.name) : emo.name}</h3>
                <p className="er-guide-desc">{isMarathi ? (emo.descriptionMr || emo.description) : emo.description}</p>
                <p className="er-guide-when">
                  <strong>{isMarathi ? 'जेव्हा आपल्याला हे वाटते:' : 'When we feel this:'}</strong> {isMarathi ? (emo.whenFeelMr || emo.whenFeel) : emo.whenFeel}
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
            <h3 className="er-modal-title">{isMarathi ? 'भावनेचा इशारा!' : 'Emotion Clue!'}</h3>
            <p className="er-modal-desc">
              {activeMode === 'guess'
                ? (isMarathi ? (currentGuessRound.hintMr || currentGuessRound.hint) : currentGuessRound.hint)
                : activeMode === 'situations'
                ? (isMarathi ? (currentSitRound.hintMr || currentSitRound.hint) : currentSitRound.hint)
                : (isMarathi ? 'सर्व भावना स्वाभाविक आहेत! भुवया, डोळे आणि तोंड पाहा म्हणजे भावना समजेल!' : 'All feelings are natural and okay! Look closely at the eyebrows, eyes, and mouth to know how someone feels!')}
            </p>
            <button
              type="button"
              className="er-btn-modal-close"
              onClick={() => setShowHintModal(false)}
            >
              {isMarathi ? 'समजले! 👍' : 'Got it! 👍'}
            </button>
          </div>
        </div>
      )}

      {/* 4. Win / Trophy Modal */}
      {showWinModal && (
        <div className="er-modal-overlay">
          <div className="er-modal-box">
            <span className="er-modal-icon">
              {completedMode === 'guess' ? '🌟' : completedMode === 'situations' ? '🎉' : '🏆'}
            </span>

            {completedMode === 'guess' && (
              <>
                <h3 className="er-modal-title">
                  {isMarathi ? 'पातळी १ पूर्ण! 🔓 पातळी २ खुली झाली!' : 'Level 1 Complete! 🔓 Level 2 Unlocked!'}
                </h3>
                <p className="er-modal-desc">
                  {isMarathi
                    ? `अप्रतिम! तुम्ही सर्व भावना योग्य ओळखल्या आणि तारे मिळवले ⭐! आता पातळी २ "त्यांना कसे वाटते?" खेळा!`
                    : `Superb! You correctly identified all the emotions and earned shiny stars ⭐! Level 2 "How They Feel?" is now unlocked!`}
                </p>
                <div className="er-modal-actions">
                  <button
                    type="button"
                    className="er-btn-modal-close is-primary"
                    onClick={() => handleProceedToNextLevel('situations')}
                  >
                    {isMarathi ? 'पातळी २ खेळा 🔓 ➡️' : 'Play Level 2 🔓 ➡️'}
                  </button>
                  <button
                    type="button"
                    className="er-btn-modal-close is-secondary"
                    onClick={handleRestart}
                  >
                    {isMarathi ? 'पुन्हा खेळा 🔄' : 'Replay Level 1 🔄'}
                  </button>
                </div>
              </>
            )}

            {completedMode === 'situations' && (
              <>
                <h3 className="er-modal-title">
                  {isMarathi ? 'पातळी २ पूर्ण! 🔓 पातळी ३ खुली झाली!' : 'Level 2 Complete! 🔓 Level 3 Unlocked!'}
                </h3>
                <p className="er-modal-desc">
                  {isMarathi
                    ? `उत्तम! तुम्ही इतरांच्या भावना समजून घेतल्या ⭐! आता पातळी ३ "भावनांच्या जोड्या जुळवा" खुली झाली आहे!`
                    : `Wonderful! You showed great empathy understanding how people feel ⭐! Level 3 "Match Emotion" is now unlocked!`}
                </p>
                <div className="er-modal-actions">
                  <button
                    type="button"
                    className="er-btn-modal-close is-primary"
                    onClick={() => handleProceedToNextLevel('match')}
                  >
                    {isMarathi ? 'पातळी ३ खेळा 🔓 ➡️' : 'Play Level 3 🔓 ➡️'}
                  </button>
                  <button
                    type="button"
                    className="er-btn-modal-close is-secondary"
                    onClick={handleRestart}
                  >
                    {isMarathi ? 'पुन्हा खेळा 🔄' : 'Replay Level 2 🔄'}
                  </button>
                </div>
              </>
            )}

            {completedMode === 'match' && (
              <>
                <h3 className="er-modal-title">
                  {isMarathi ? 'भावनांचे महाविजेते! 🏆' : 'Emotions Grand Champion! 🏆'}
                </h3>
                <p className="er-modal-desc">
                  {isMarathi
                    ? `अप्रतिम कामगिरी! तुम्ही सर्व पातळी यशस्वीरीत्या पूर्ण केल्या, ${stars} तारे मिळवले ⭐ आणि सहानुभूतीने भावना समजून घेणे शिकलात!`
                    : `Incredible job! You mastered all levels, matched all emotions, earned ${stars} Stars ⭐, and learned to understand feelings with empathy!`}
                </p>
                <div className="er-modal-actions">
                  <button
                    type="button"
                    className="er-btn-modal-close is-primary"
                    onClick={handleRestart}
                  >
                    {isMarathi ? 'पुन्हा खेळा 🔄' : 'Play Again 🔄'}
                  </button>
                  <button
                    type="button"
                    className="er-btn-modal-close is-secondary"
                    style={{ background: '#3b82f6', color: '#ffffff', borderColor: '#2563eb' }}
                    onClick={() => handleExit?.()}
                  >
                    {isMarathi ? 'सर्व खेळ 🌟' : 'Back to Activities 🌟'}
                  </button>
                </div>
              </>
            )}

            {!['guess', 'situations', 'match'].includes(completedMode) && (
              <>
                <h3 className="er-modal-title">{isMarathi ? 'भावनांचे जादूगार! 🏆' : 'Emotions Master!'}</h3>
                <p className="er-modal-desc">
                  {isMarathi ? `अप्रतिम कामगिरी! तुम्ही ${stars} तारे मिळवले ⭐!` : `Amazing job! You earned ${stars} Stars ⭐!`}
                </p>
                <div className="er-modal-actions">
                  <button
                    type="button"
                    className="er-btn-modal-close is-primary"
                    onClick={handleRestart}
                  >
                    {isMarathi ? 'पुन्हा खेळा 🔄' : 'Play Again 🔄'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
