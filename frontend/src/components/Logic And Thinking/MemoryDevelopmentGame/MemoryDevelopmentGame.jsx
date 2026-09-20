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
  ChevronRight
} from 'lucide-react';
import {
  GAME_MODES,
  DIFFICULTY_PRESETS,
  MEMORY_THEMES,
  generateMemoryDeck,
  generateRememberRound
} from './memoryData';
import { memorySounds } from './memorySounds';
import './MemoryDevelopmentGame.css';

export default function MemoryDevelopmentGame({ onHome, onEarnStars }) {
  // Navigation & Settings
  const [activeMode, setActiveMode] = useState('match'); // 'match' | 'remember'
  const [difficulty, setDifficulty] = useState('easy'); // 'easy' | 'medium' | 'hard'
  const [activeTheme, setActiveTheme] = useState('all');
  const [soundEnabled, setSoundEnabled] = useState(true);

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
    const next = !soundEnabled;
    setSoundEnabled(next);
    memorySounds.setSoundEnabled(next);
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

    setTimeout(() => {
      setShowCelebration(true);
    }, 800);
  };

  // Advance Difficulty / Next Round
  const handleNextLevel = () => {
    memorySounds.playPop();
    if (difficulty === 'easy') {
      setDifficulty('medium');
    } else if (difficulty === 'medium') {
      setDifficulty('hard');
    } else {
      setDifficulty('easy');
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
            title="Back to Home"
            id="btn-memory-home"
          >
            <Home size={20} />
            <span>Home</span>
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
                <span>{mode.label}</span>
              </button>
            ))}
          </div>

          {/* Right: Stats (Moves, Timer, Stars, Sound) */}
          <div className="memory-stats-group">
            <div className="memory-stat-pill" title="Moves Counter">
              <span>Moves:</span>
              <strong>{moves}</strong>
            </div>

            <div className="memory-stat-pill" title="Timer">
              <Timer size={16} />
              <span>{formatTime(elapsedSeconds)}</span>
            </div>

            <div className="memory-stat-pill stars" title="Total Stars">
              <Star size={16} className="memory-star-glow" />
              <span>{stars}</span>
            </div>

            <button
              type="button"
              className="memory-sound-btn"
              onClick={toggleSound}
              title={soundEnabled ? 'Mute Audio' : 'Unmute Audio'}
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
          {DIFFICULTY_PRESETS.map((diff) => (
            <button
              key={diff.id}
              className={`memory-diff-chip ${difficulty === diff.id ? 'active' : ''}`}
              onClick={() => {
                memorySounds.playPop();
                setDifficulty(diff.id);
              }}
              id={`chip-diff-${diff.id}`}
            >
              <span>{diff.badge}</span>
            </button>
          ))}
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
              <span>{th.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Main Stage Arena */}
      <main className="memory-stage-arena">
        {/* Status Bar */}
        <div className="memory-prompt-bar">
          <h2 className="memory-prompt-text">
            {activeMode === 'match' ? (
              <>
                <span>Flip & Find the Matching Pairs!</span>
                <span>✨</span>
              </>
            ) : rememberPhase === 'preview' ? (
              <>
                <span>Memorize these objects!</span>
                <span>🧠</span>
              </>
            ) : (
              <>
                <span>Now find the items you saw!</span>
                <span>🔍</span>
              </>
            )}
          </h2>

          <div className="memory-pairs-counter">
            {activeMode === 'match' ? (
              <span>Pairs: {matchedIds.size} / {currentDiffPreset.pairs}</span>
            ) : (
              <span>Found: {foundTargetIds.size} / {rememberRound ? rememberRound.targets.length : 0}</span>
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
                        <span className="memory-card-back-label">Match</span>
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
                      <span className="memory-card-front-label">{card.item.name}</span>
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
                <h3 className="remember-spotlight-title">Remember these items!</h3>
                <div className="remember-targets-row">
                  {rememberRound.targets.map((target) => (
                    <div
                      key={target.id}
                      className="remember-target-bubble"
                      style={{ backgroundColor: target.bg, borderColor: target.border }}
                    >
                      <span style={{ fontSize: '2.5rem' }}>{target.icon}</span>
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: target.color }}>
                        {target.name}
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
                        {opt.name}
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
            title="Restart Game"
            id="btn-memory-restart"
          >
            <RotateCcw size={18} />
            <span>Restart</span>
          </button>

          <button
            type="button"
            className="memory-action-btn primary"
            onClick={handleNextLevel}
            title="Next Level"
            id="btn-memory-next"
          >
            <span>Next Level</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </main>

      {/* 5. Celebration Modal */}
      {showCelebration && (
        <div className="memory-celebration-backdrop">
          <div className="memory-celebration-card">
            <div className="memory-celebration-trophy">🏆</div>
            <h2 className="memory-celebration-title">Super Memory!</h2>
            <div className="memory-celebration-stars">
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
            </div>
            <div className="memory-celebration-stats">
              <p>Moves: <strong>{moves}</strong> • Time: <strong>{formatTime(elapsedSeconds)}</strong></p>
              <p>+3 Stars Awarded! 🌟</p>
            </div>
            <div className="memory-celebration-actions">
              <button
                type="button"
                className="memory-action-btn secondary"
                onClick={() => {
                  memorySounds.playPop();
                  startNewGame();
                }}
              >
                <RotateCcw size={18} />
                <span>Play Again</span>
              </button>
              <button
                type="button"
                className="memory-action-btn primary"
                onClick={() => {
                  handleNextLevel();
                  setShowCelebration(false);
                }}
              >
                <span>Next Level</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
