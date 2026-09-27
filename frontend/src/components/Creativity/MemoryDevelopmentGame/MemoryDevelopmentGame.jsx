import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Home,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  Star,
  Trophy,
  Award,
  Timer,
  CheckCircle2,
  HelpCircle,
  Eye,
  Layers,
  ChevronRight,
  Lock
} from 'lucide-react';
import {
  GAME_MODES,
  DIFFICULTY_PRESETS,
  MEMORY_THEMES,
  generateMemoryDeck,
  generateRememberRound
} from './memoryData';
import { memorySounds } from './memorySounds';
import { useLanguage } from '../../../context/LanguageContext';
import StudentSwitcher from '../../StudentSwitcher';
import './MemoryDevelopmentGame.css';

export default function MemoryDevelopmentGame({ onHome, onEarnStars, onToggleDashboard }) {
  const { t, speak, language, isMuted, soundEnabled, toggleMute } = useLanguage();
  const isMarathi = language === 'mr';

  // Level Progression:
  // Level 1: 'easy' -> Unlocked by default
  // Level 2: 'medium' -> Locked until Level 1 complete
  // Level 3: 'hard' -> Locked until Level 2 complete
  const [unlockedLevel, setUnlockedLevel] = useState(() => {
    try {
      const saved = localStorage.getItem('little_learner_mem_unlocked_level');
      const val = parseInt(saved, 10);
      return val >= 1 && val <= 3 ? val : 1;
    } catch {
      return 1;
    }
  });

  // Navigation & Settings
  const [activeMode, setActiveMode] = useState('match'); // 'match' | 'remember'
  const [difficulty, setDifficulty] = useState('easy'); // 'easy' | 'medium' | 'hard'
  const [activeTheme, setActiveTheme] = useState('all');
  const [lockToast, setLockToast] = useState(null);

  // Player Stats
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState(125);
  const [moves, setMoves] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  // Mode 1: Memory Match State
  const [deck, setDeck] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]); // array of card objects
  const [matchedIds, setMatchedIds] = useState(new Set());
  const [mismatchedCardIds, setMismatchedCardIds] = useState([]);
  const [isBoardLocked, setIsBoardLocked] = useState(false);

  // Mode 2: Remember & Find State
  const [rememberRound, setRememberRound] = useState(null); // { targets, options }
  const [rememberPhase, setRememberPhase] = useState('preview'); // 'preview' | 'find'
  const [rememberTimeLeft, setRememberTimeLeft] = useState(100); // percentage for timer bar
  const [foundTargetIds, setFoundTargetIds] = useState(new Set());

  const timerRef = useRef(null);
  const currentDiffPreset =
    DIFFICULTY_PRESETS.find((d) => d.id === difficulty) || DIFFICULTY_PRESETS[0];

  // Initialize Game on Mount or Settings Change
  useEffect(() => {
    startNewGame();
    return () => clearInterval(timerRef.current);
  }, [activeMode, difficulty, activeTheme]);

  // Elapsed Time Clock
  useEffect(() => {
    const clockInterval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  // Sound toggle
  const toggleSound = () => {
    toggleMute();
  };

  // Start / Restart Game
  const startNewGame = () => {
    setShowCelebration(false);
    setMoves(0);
    setElapsedSeconds(0);

    if (activeMode === 'match') {
      const newDeck = generateMemoryDeck(currentDiffPreset.pairs, activeTheme);
      setDeck(newDeck);
      setFlippedCards([]);
      setMatchedIds(new Set());
      setMismatchedCardIds([]);
      setIsBoardLocked(false);
    } else {
      // Remember & Find mode setup
      initRememberRound();
    }
  };

  // Setup Remember & Find Round
  const initRememberRound = () => {
    const roundData = generateRememberRound(
      currentDiffPreset.targetCount,
      currentDiffPreset.optionCount,
      activeTheme
    );
    setRememberRound(roundData);
    setRememberPhase('preview');
    setFoundTargetIds(new Set());
    setRememberTimeLeft(100);

    // Countdown timer for preview phase
    const duration = currentDiffPreset.showDuration || 5000;
    const intervalTime = 50;
    let elapsed = 0;

    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      elapsed += intervalTime;
      const remainingPct = Math.max(0, 100 - (elapsed / duration) * 100);
      setRememberTimeLeft(remainingPct);

      if (elapsed >= duration) {
        clearInterval(timerRef.current);
        setRememberPhase('find');
        memorySounds.playPop();
      }
    }, intervalTime);
  };

  // -------------------------------------------------------------------------
  // Memory Match Card Click Handler
  // -------------------------------------------------------------------------
  const handleCardClick = (card) => {
    if (isBoardLocked) return;
    if (matchedIds.has(card.matchId)) return;
    if (flippedCards.some((c) => c.cardId === card.cardId)) return;

    memorySounds.playCardFlip();
    const itemName = isMarathi ? (card.item.nameMr || card.item.name) : card.item.name;
    speak(itemName);

    const newFlipped = [...flippedCards, card];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = newFlipped;

      if (first.matchId === second.matchId) {
        // MATCH FOUND!
        setIsBoardLocked(true);
        setTimeout(() => {
          memorySounds.playMatchChime();
          const nextMatched = new Set([...matchedIds, first.matchId]);
          setMatchedIds(nextMatched);
          setFlippedCards([]);
          setIsBoardLocked(false);
          setScore((s) => s + 25);

          // Check Win Condition
          if (nextMatched.size === currentDiffPreset.pairs) {
            handleWin();
          }
        }, 400);
      } else {
        // MISMATCH
        setIsBoardLocked(true);
        setMismatchedCardIds([first.cardId, second.cardId]);
        setTimeout(() => {
          memorySounds.playMismatchBoing();
        }, 200);

        setTimeout(() => {
          setFlippedCards([]);
          setMismatchedCardIds([]);
          setIsBoardLocked(false);
        }, 1100);
      }
    }
  };

  // -------------------------------------------------------------------------
  // Remember & Find Option Click Handler
  // -------------------------------------------------------------------------
  const handleRememberOptionClick = (option) => {
    if (rememberPhase !== 'find') return;
    if (foundTargetIds.has(option.id)) return;

    const optName = isMarathi ? (option.nameMr || option.name) : option.name;
    speak(optName);

    setMoves((m) => m + 1);
    const isTarget = rememberRound.targets.some((t) => t.id === option.id);

    if (isTarget) {
      memorySounds.playMatchChime();
      const nextFound = new Set([...foundTargetIds, option.id]);
      setFoundTargetIds(nextFound);
      setScore((s) => s + 20);

      // Check if all targets found
      if (nextFound.size === rememberRound.targets.length) {
        handleWin();
      }
    } else {
      memorySounds.playMismatchBoing();
    }
  };

  // Difficulty Selection with Level Locking
  const handleSelectDifficulty = (newDiff) => {
    if (newDiff === 'medium' && unlockedLevel < 2) {
      memorySounds.playMismatchBoing();
      const msg = isMarathi
        ? '🔒 ही पातळी बंद आहे! उघडण्यासाठी प्रथम "सोपे" (पातळी १) पूर्ण करा!'
        : '🔒 Level Locked! Complete "Easy" (Level 1) first to unlock!';
      setLockToast(msg);
      if (speak) speak(isMarathi ? 'प्रथम सोपी पातळी पूर्ण करा' : 'Please complete Easy level first');
      setTimeout(() => setLockToast(null), 3500);
      return;
    }

    if (newDiff === 'hard' && unlockedLevel < 3) {
      memorySounds.playMismatchBoing();
      const msg = isMarathi
        ? '🔒 ही पातळी बंद आहे! उघडण्यासाठी प्रथम "मध्यम" (पातळी २) पूर्ण करा!'
        : '🔒 Level Locked! Complete "Medium" (Level 2) first to unlock!';
      setLockToast(msg);
      if (speak) speak(isMarathi ? 'प्रथम मध्यम पातळी पूर्ण करा' : 'Please complete Medium level first');
      setTimeout(() => setLockToast(null), 3500);
      return;
    }

    memorySounds.playPop();
    setLockToast(null);
    setDifficulty(newDiff);
  };

  // Win / Completion Celebration
  const handleWin = () => {
    memorySounds.playVictoryFanfare();
    confetti({
      particleCount: 110,
      spread: 80,
      origin: { y: 0.6 }
    });

    setStars((st) => st + 3);
    if (onEarnStars) {
      onEarnStars(3);
    }

    if (difficulty === 'easy') {
      setUnlockedLevel((prev) => {
        const next = Math.max(prev, 2);
        try {
          localStorage.setItem('little_learner_mem_unlocked_level', String(next));
        } catch {}
        return next;
      });
    } else if (difficulty === 'medium') {
      setUnlockedLevel((prev) => {
        const next = Math.max(prev, 3);
        try {
          localStorage.setItem('little_learner_mem_unlocked_level', String(next));
        } catch {}
        return next;
      });
    }

    setTimeout(() => {
      setShowCelebration(true);
    }, 800);
  };

  // Advance Difficulty / Next Round
  const handleNextLevel = () => {
    if (difficulty === 'easy') {
      handleSelectDifficulty('medium');
    } else if (difficulty === 'medium') {
      handleSelectDifficulty('hard');
    } else {
      memorySounds.playPop();
      startNewGame();
    }
  };

  // Format Elapsed Time MM:SS
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="memory-game-container">
      {/* 1. Header Navigation Bar - Full Width & Fixed */}
      <header className="memory-header">
        <div className="memory-header-inner">
          {/* Left: Home Button */}
          <button
            type="button"
            className="memory-btn-home"
            onClick={() => {
              memorySounds.playPop();
              onHome();
            }}
            title={isMarathi ? "मुख्यपृष्ठावर परत जा" : "Back to Home"}
            id="btn-memory-home"
          >
            <Home size={20} />
            <span>{t('btnHome')}</span>
          </button>

          {/* Center: Mode Switcher */}
          <div className="memory-mode-bar">
            {GAME_MODES.map((mode) => (
              <button
                key={mode.id}
                className={`memory-mode-btn ${activeMode === mode.id ? 'active' : ''}`}
                onClick={() => {
                  memorySounds.playPop();
                  setActiveMode(mode.id);
                }}
                id={`btn-mode-${mode.id}`}
              >
                <span>{mode.icon}</span>
                <span>{isMarathi ? (mode.labelMr || mode.label) : mode.label}</span>
              </button>
            ))}
          </div>

          {/* Right: Stats (Moves, Timer, Stars, Sound) */}
          <div className="memory-stats-group">
            <StudentSwitcher compact={true} onOpenDashboard={onToggleDashboard} />
            <div className="memory-stat-pill" title={isMarathi ? "चाली मोजणी" : "Moves Counter"}>
              <span>{isMarathi ? 'चाली' : t('memMoves')}:</span>
              <strong>{moves}</strong>
            </div>

            <div className="memory-stat-pill" title={isMarathi ? "वेळ" : "Timer"}>
              <Timer size={16} />
              <span>{formatTime(elapsedSeconds)}</span>
            </div>

            <div className="memory-stat-pill stars" title={isMarathi ? "एकूण तारे" : "Total Stars"}>
              <Star size={16} className="memory-star-glow" />
              <span>{stars}</span>
            </div>

            <button
              type="button"
              className="memory-sound-btn"
              onClick={toggleSound}
              title={soundEnabled ? (isMarathi ? 'आवाज बंद करा' : 'Mute Audio') : (isMarathi ? 'आवाज सुरू करा' : 'Unmute Audio')}
              id="btn-memory-sound"
            >
              {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* 2. Sub-Bar: Difficulty & Theme Selectors */}
      <div className="memory-sub-bar">
        {/* Difficulty Chips */}
        <div className="memory-difficulty-row">
          {DIFFICULTY_PRESETS.map((diff) => {
            const isLocked = (diff.id === 'medium' && unlockedLevel < 2) || (diff.id === 'hard' && unlockedLevel < 3);

            return (
              <button
                key={diff.id}
                className={`memory-diff-chip ${difficulty === diff.id ? 'active' : ''} ${isLocked ? 'is-locked' : ''}`}
                onClick={() => handleSelectDifficulty(diff.id)}
                title={isLocked ? (isMarathi ? 'आधीची पातळी पूर्ण केल्यावर उघडेल' : 'Complete previous level to unlock') : ''}
                id={`chip-diff-${diff.id}`}
              >
                {isLocked && <Lock size={14} className="memory-diff-lock-icon" />}
                <span>{isMarathi ? (diff.badgeMr || diff.badge) : diff.badge}</span>
                <span className="memory-diff-tag">
                  {diff.id === 'easy' ? (isMarathi ? 'पातळी १' : 'Lvl 1') : diff.id === 'medium' ? (isLocked ? '🔒' : (isMarathi ? 'पातळी २' : 'Lvl 2')) : (isLocked ? '🔒' : (isMarathi ? 'पातळी ३' : 'Lvl 3'))}
                </span>
              </button>
            );
          })}
        </div>

        {/* Theme Chips */}
        <div className="memory-theme-row">
          {MEMORY_THEMES.map((th) => (
            <button
              key={th.id}
              className={`memory-theme-chip ${activeTheme === th.id ? 'active' : ''}`}
              onClick={() => {
                memorySounds.playPop();
                setActiveTheme(th.id);
              }}
              id={`chip-theme-${th.id}`}
            >
              <span>{th.icon}</span>
              <span>{isMarathi ? (th.labelMr || th.label) : th.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Level Lock Alert Toast */}
      {lockToast && (
        <div className="memory-lock-toast">
          <Lock size={18} className="memory-lock-toast-icon" />
          <span>{lockToast}</span>
        </div>
      )}

      {/* 3. Main Stage Arena */}
      <main className="memory-stage-arena">
        {/* Status Bar */}
        <div className="memory-prompt-bar">
          <h2 className="memory-prompt-text">
            {activeMode === 'match' ? (
              <>
                <span>{isMarathi ? 'जुळणाऱ्या जोड्या शोधा!' : 'Flip & Find the Matching Pairs!'}</span>
                <span>✨</span>
              </>
            ) : rememberPhase === 'preview' ? (
              <>
                <span>{isMarathi ? 'या वस्तू लक्षात ठेवा!' : 'Memorize these objects!'}</span>
                <span>🧠</span>
              </>
            ) : (
              <>
                <span>{isMarathi ? 'आता पाहिलेल्या वस्तू शोधा!' : 'Now find the items you saw!'}</span>
                <span>🔍</span>
              </>
            )}
          </h2>

          <div className="memory-pairs-counter">
            {activeMode === 'match' ? (
              <span>{isMarathi ? 'जोड्या' : 'Pairs'}: {matchedIds.size} / {currentDiffPreset.pairs}</span>
            ) : (
              <span>{isMarathi ? 'सापडल्या' : 'Found'}: {foundTargetIds.size} / {rememberRound ? rememberRound.targets.length : 0}</span>
            )}
          </div>
        </div>

        {/* ===================================================================
            MODE 1: MEMORY MATCH (CARD FLIP GRID)
            =================================================================== */}
        {activeMode === 'match' && (
          <div className={`memory-cards-grid cols-${currentDiffPreset.gridCols}`}>
            {deck.map((card) => {
              const isFlipped =
                flippedCards.some((c) => c.cardId === card.cardId) ||
                matchedIds.has(card.matchId);
              const isMatched = matchedIds.has(card.matchId);
              const isMismatch = mismatchedCardIds.includes(card.cardId);

              return (
                <div
                  key={card.cardId}
                  className={`memory-card-wrap ${isFlipped ? 'is-flipped' : ''} ${
                    isMatched ? 'is-matched' : ''
                  } ${isMismatch ? 'shake-mismatch' : ''}`}
                  onClick={() => handleCardClick(card)}
                  id={`card-${card.cardId}`}
                >
                  <div className="memory-card-inner">
                    {/* Face Down Back */}
                    <div className="memory-card-face memory-card-back">
                      <div className="memory-card-back-pattern">
                        <span className="memory-card-back-star">⭐</span>
                        <span className="memory-card-back-label">{isMarathi ? 'जोडी' : 'Match'}</span>
                      </div>
                    </div>

                    {/* Face Up Front */}
                    <div
                      className="memory-card-face memory-card-front"
                      style={{
                        backgroundColor: card.item.bg,
                        borderColor: card.item.border,
                        color: card.item.color
                      }}
                    >
                      <span className="memory-card-front-icon">{card.item.icon}</span>
                      <span className="memory-card-front-label">
                        {isMarathi ? (card.item.nameMr || card.item.name) : card.item.name}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ===================================================================
            MODE 2: REMEMBER & FIND
            =================================================================== */}
        {activeMode === 'remember' && rememberRound && (
          <div className="remember-find-container">
            {/* Spotlight Card */}
            {rememberPhase === 'preview' ? (
              <div className="remember-spotlight-card">
                <h3 className="remember-spotlight-title">
                  {isMarathi ? 'या वस्तू लक्षात ठेवा!' : 'Remember these items!'}
                </h3>
                <div className="remember-targets-row">
                  {rememberRound.targets.map((target) => (
                    <div
                      key={target.id}
                      className="remember-target-bubble"
                      style={{ backgroundColor: target.bg, borderColor: target.border }}
                    >
                      <span style={{ fontSize: '2.5rem' }}>{target.icon}</span>
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: target.color }}>
                        {isMarathi ? (target.nameMr || target.name) : target.name}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Countdown progress bar */}
                <div className="remember-timer-bar-bg">
                  <div
                    className="remember-timer-bar-fill"
                    style={{ width: `${rememberTimeLeft}%` }}
                  />
                </div>
              </div>
            ) : (
              /* Options selection grid */
              <div className="remember-options-grid">
                {rememberRound.options.map((opt) => {
                  const isFound = foundTargetIds.has(opt.id);
                  return (
                    <div
                      key={opt.id}
                      className={`remember-option-item ${isFound ? 'found' : ''}`}
                      style={{ backgroundColor: opt.bg, borderColor: isFound ? '#10b981' : opt.border }}
                      onClick={() => handleRememberOptionClick(opt)}
                      id={`remember-opt-${opt.id}`}
                    >
                      {isFound && <span className="remember-option-badge">✅</span>}
                      <span style={{ fontSize: '2.5rem' }}>{opt.icon}</span>
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: opt.color }}>
                        {isMarathi ? (opt.nameMr || opt.name) : opt.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* 4. Action Buttons */}
        <div className="memory-actions-bar">
          <button
            type="button"
            className="memory-action-btn secondary"
            onClick={() => {
              memorySounds.playPop();
              startNewGame();
            }}
            title={isMarathi ? "खेळ पुन्हा सुरू करा" : "Restart Game"}
            id="btn-memory-restart"
          >
            <RotateCcw size={18} />
            <span>{isMarathi ? 'पुन्हा सुरू करा' : 'Restart'}</span>
          </button>

          <button
            type="button"
            className="memory-action-btn primary"
            onClick={handleNextLevel}
            title={isMarathi ? "पुढील पातळी" : "Next Level"}
            id="btn-memory-next"
          >
            <span>{isMarathi ? 'पुढील पातळी' : 'Next Level'}</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </main>

      {/* 5. Celebration Modal */}
      {showCelebration && (
        <div className="memory-celebration-backdrop">
          <div className="memory-celebration-card">
            <div className="memory-celebration-trophy">
              {difficulty === 'hard' ? '🏆' : '🌟'}
            </div>

            {difficulty === 'easy' && (
              <>
                <h2 className="memory-celebration-title">
                  {isMarathi ? 'सोपी पातळी पूर्ण! 🔓 मध्यम पातळी खुली झाली!' : 'Easy Level Complete! 🔓 Medium Level Unlocked!'}
                </h2>
                <div className="memory-celebration-stats">
                  <p>
                    {isMarathi ? 'चाली' : 'Moves'}: <strong>{moves}</strong> • {isMarathi ? 'वेळ' : 'Time'}: <strong>{formatTime(elapsedSeconds)}</strong>
                  </p>
                  <p>{isMarathi ? '🎉 उत्कृष्ट स्मरणशक्ती! पातळी २ (मध्यम) आता सुरू करा!' : '🎉 Outstanding memory! Level 2 (Medium) is now unlocked!'}</p>
                </div>
                <div className="memory-celebration-actions">
                  <button
                    type="button"
                    className="memory-action-btn primary"
                    onClick={() => {
                      handleSelectDifficulty('medium');
                      setShowCelebration(false);
                    }}
                  >
                    <span>{isMarathi ? 'मध्यम पातळी खेळा 🔓 ➡️' : 'Play Medium Level 🔓 ➡️'}</span>
                    <ChevronRight size={18} />
                  </button>
                  <button
                    type="button"
                    className="memory-action-btn secondary"
                    onClick={() => {
                      memorySounds.playPop();
                      startNewGame();
                    }}
                  >
                    <RotateCcw size={18} />
                    <span>{isMarathi ? 'पुन्हा खेळा 🔄' : 'Replay Level 1 🔄'}</span>
                  </button>
                </div>
              </>
            )}

            {difficulty === 'medium' && (
              <>
                <h2 className="memory-celebration-title">
                  {isMarathi ? 'मध्यम पातळी पूर्ण! 🔓 कठीण पातळी खुली झाली!' : 'Medium Level Complete! 🔓 Hard Level Unlocked!'}
                </h2>
                <div className="memory-celebration-stats">
                  <p>
                    {isMarathi ? 'चाली' : 'Moves'}: <strong>{moves}</strong> • {isMarathi ? 'वेळ' : 'Time'}: <strong>{formatTime(elapsedSeconds)}</strong>
                  </p>
                  <p>{isMarathi ? '🎉 अफाट बुद्धिमत्ता! पातळी ३ (कठीण) चे आव्हान स्वीकारा!' : '🎉 Brilliant memory skills! Level 3 (Hard) is now unlocked!'}</p>
                </div>
                <div className="memory-celebration-actions">
                  <button
                    type="button"
                    className="memory-action-btn primary"
                    onClick={() => {
                      handleSelectDifficulty('hard');
                      setShowCelebration(false);
                    }}
                  >
                    <span>{isMarathi ? 'कठीण पातळी खेळा 🔓 ➡️' : 'Play Hard Level 🔓 ➡️'}</span>
                    <ChevronRight size={18} />
                  </button>
                  <button
                    type="button"
                    className="memory-action-btn secondary"
                    onClick={() => {
                      memorySounds.playPop();
                      startNewGame();
                    }}
                  >
                    <RotateCcw size={18} />
                    <span>{isMarathi ? 'पुन्हा खेळा 🔄' : 'Replay Level 2 🔄'}</span>
                  </button>
                </div>
              </>
            )}

            {difficulty === 'hard' && (
              <>
                <h2 className="memory-celebration-title">
                  {isMarathi ? 'स्मरणशक्तीचे महाविजेते! 🏆' : 'Grand Memory Master! 🏆'}
                </h2>
                <div className="memory-celebration-stars">
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                </div>
                <div className="memory-celebration-stats">
                  <p>
                    {isMarathi ? 'चाली' : 'Moves'}: <strong>{moves}</strong> • {isMarathi ? 'वेळ' : 'Time'}: <strong>{formatTime(elapsedSeconds)}</strong>
                  </p>
                  <p>{isMarathi ? 'तुम्ही सर्व स्मरणशक्ती पातळ्या जिंकल्या! 🌟' : 'You mastered all memory development levels with flying colors! 🌟'}</p>
                </div>
                <div className="memory-celebration-actions">
                  <button
                    type="button"
                    className="memory-action-btn primary"
                    onClick={() => {
                      memorySounds.playPop();
                      startNewGame();
                    }}
                  >
                    <RotateCcw size={18} />
                    <span>{isMarathi ? 'पुन्हा खेळा 🔄' : 'Play Again 🔄'}</span>
                  </button>
                  <button
                    type="button"
                    className="memory-action-btn secondary"
                    onClick={() => {
                      memorySounds.playPop();
                      onHome();
                    }}
                  >
                    <Home size={18} />
                    <span>{t('btnHome')}</span>
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
