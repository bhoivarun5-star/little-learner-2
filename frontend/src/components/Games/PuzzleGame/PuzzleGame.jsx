import React, { useState, useEffect, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  Home,
  Volume2,
  VolumeX,
  RotateCcw,
  ArrowRight,
  Sparkles,
  Star,
  Eye,
  EyeOff,
  Lightbulb,
  RefreshCw,
  Trophy,
  CheckCircle2,
  HelpCircle,
  Puzzle
} from 'lucide-react';
import {
  CATEGORIES,
  DIFFICULTY_LEVELS,
  PUZZLES_DATA
} from './puzzleData';
import { puzzleSounds } from './puzzleSounds';
import { useLanguage } from '../../../context/LanguageContext';
import './PuzzleGame.css';

export default function PuzzleGame({ onHome, onEarnStars }) {
  // Navigation & Language
  const { language, t, speak } = useLanguage();
  const isMarathi = language === 'mr';

  // Sound toggle
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Active Category & Difficulty
  const [activeCategory, setActiveCategory] = useState('animals');
  const [activeDifficulty, setActiveDifficulty] = useState(DIFFICULTY_LEVELS[1]); // default 4 pieces (2x2)

  // Current Puzzle Index within Category
  const categoryPuzzles = useMemo(() => {
    return PUZZLES_DATA.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const currentPuzzle = categoryPuzzles[puzzleIndex] || categoryPuzzles[0];

  // Game Stats
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState(0);

  // Outline / Ghost Preview Mode: 'clear' | 'faint' | 'hidden'
  const [outlineMode, setOutlineMode] = useState('clear');
  const [isPeekModalOpen, setIsPeekModalOpen] = useState(false);

  // Board and Tray State
  const totalPieces = activeDifficulty.pieces;
  const numRows = activeDifficulty.rows;
  const numCols = activeDifficulty.cols;

  const [placedPieces, setPlacedPieces] = useState(() => Array(totalPieces).fill(null));
  const [trayPieces, setTrayPieces] = useState([]);
  const [selectedTrayPiece, setSelectedTrayPiece] = useState(null);
  const [draggedPiece, setDraggedPiece] = useState(null);
  const [hoveredSlotIndex, setHoveredSlotIndex] = useState(null);
  const [hintSlotIndex, setHintSlotIndex] = useState(null);

  // Celebration state
  const [isCelebrated, setIsCelebrated] = useState(false);

  // Toggle sound helper
  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    puzzleSounds.setSoundEnabled(next);
  };

  // Initialize or reset puzzle pieces when puzzle or difficulty changes
  const initPuzzle = useCallback(() => {
    const piecesCount = activeDifficulty.pieces;
    setPlacedPieces(Array(piecesCount).fill(null));
    setIsCelebrated(false);
    setSelectedTrayPiece(null);
    setDraggedPiece(null);
    setHoveredSlotIndex(null);
    setHintSlotIndex(null);

    // Create array of piece indices: [0, 1, 2, ..., piecesCount - 1]
    const pieces = Array.from({ length: piecesCount }, (_, idx) => idx);
    // Shuffle pieces randomly
    const shuffled = [...pieces].sort(() => 0.5 - Math.random());
    setTrayPieces(shuffled);

    setTimeout(() => {
      speak({
        en: `Let's solve the ${currentPuzzle.name}! Drag or tap the pieces to place them.`,
        mr: `चला ${currentPuzzle.nameMr || currentPuzzle.name} चे कोडे सोडवूया! तुकडे जागेवर लावा.`
      });
    }, 200);
  }, [activeDifficulty, currentPuzzle, speak]);

  // Re-initialize when puzzle or difficulty changes
  useEffect(() => {
    initPuzzle();
  }, [initPuzzle]);

  // Handle Category Switch
  const handleSelectCategory = (catId) => {
    puzzleSounds.playPop();
    setActiveCategory(catId);
    setPuzzleIndex(0);
  };

  // Handle Difficulty Switch
  const handleSelectDifficulty = (diff) => {
    puzzleSounds.playPop();
    setActiveDifficulty(diff);
  };

  // Check for Puzzle Completion
  useEffect(() => {
    if (!placedPieces || placedPieces.length === 0) return;
    const allFilled = placedPieces.every((pieceIdx, slotIdx) => pieceIdx === slotIdx);

    if (allFilled && !isCelebrated && trayPieces.length === 0) {
      setIsCelebrated(true);
      puzzleSounds.playSuccessFanfare();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.55 }
      });

      const earnedStarsAmount = activeDifficulty.pieces >= 6 ? 3 : 2;
      setScore((prev) => prev + 15);
      setStars((prev) => prev + earnedStarsAmount);
      onEarnStars?.(earnedStarsAmount);

      setTimeout(() => {
        speak({
          en: `Hooray! Fantastic job! You solved the ${currentPuzzle.name}! You earned ${earnedStarsAmount} stars!`,
          mr: `शाब्बास! खूप छान! तुम्ही ${currentPuzzle.nameMr || currentPuzzle.name} चे कोडे सोडवले! तुम्हाला ${earnedStarsAmount} तारे मिळाले!`
        });
      }, 350);
    }
  }, [placedPieces, isCelebrated, trayPieces, activeDifficulty, currentPuzzle, onEarnStars, speak]);

  // Place a piece into a slot
  const tryPlacePiece = (pieceIdx, targetSlotIdx) => {
    if (pieceIdx === targetSlotIdx) {
      puzzleSounds.playSnap();
      setPlacedPieces((prev) => {
        const next = [...prev];
        next[targetSlotIdx] = pieceIdx;
        return next;
      });
      setTrayPieces((prev) => prev.filter((p) => p !== pieceIdx));
      setSelectedTrayPiece(null);
      setHintSlotIndex(null);
      setHoveredSlotIndex(null);
    } else {
      // Wrong slot
      puzzleSounds.playWrongBoing();
      speak({
        en: 'Oops! Look closely for the matching piece!',
        mr: 'अरेरे! जुळणारा योग्य तुकडा नीट शोधा!'
      });
      setSelectedTrayPiece(null);
      setHoveredSlotIndex(null);
    }
  };

  // Tap-to-Place Interactions:
  const handleTrayPieceClick = (pieceIdx) => {
    puzzleSounds.playPop();
    if (selectedTrayPiece === pieceIdx) {
      setSelectedTrayPiece(null);
    } else {
      setSelectedTrayPiece(pieceIdx);
    }
  };

  const handleSlotClick = (slotIdx) => {
    if (placedPieces[slotIdx] !== null) return;

    if (selectedTrayPiece !== null) {
      tryPlacePiece(selectedTrayPiece, slotIdx);
    } else {
      puzzleSounds.playPop();
      speak({
        en: 'Tap a puzzle piece first, then tap where it belongs!',
        mr: 'आधी पझलच्या तुकड्यावर टॅप करा, मग तो कुठे बसतो त्यावर टॅप करा!'
      });
    }
  };

  // HTML5 Drag & Drop Interactions
  const handleDragStart = (e, pieceIdx) => {
    puzzleSounds.playPop();
    setDraggedPiece(pieceIdx);
    e.dataTransfer.setData('text/plain', String(pieceIdx));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, slotIdx) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (hoveredSlotIndex !== slotIdx) {
      setHoveredSlotIndex(slotIdx);
    }
  };

  const handleDragLeave = (e, slotIdx) => {
    if (hoveredSlotIndex === slotIdx) {
      setHoveredSlotIndex(null);
    }
  };

  const handleDrop = (e, slotIdx) => {
    e.preventDefault();
    setHoveredSlotIndex(null);
    const pieceIdxStr = e.dataTransfer.getData('text/plain');
    const pieceIdx = pieceIdxStr !== '' ? parseInt(pieceIdxStr, 10) : draggedPiece;

    if (pieceIdx !== null && pieceIdx !== undefined && !isNaN(pieceIdx)) {
      tryPlacePiece(pieceIdx, slotIdx);
    }
    setDraggedPiece(null);
  };

  // Hint button: finds first unplaced piece and snaps it into place
  const handleHint = () => {
    if (trayPieces.length === 0) return;
    puzzleSounds.playHintChime();

    const targetPiece = trayPieces[0];
    setHintSlotIndex(targetPiece);

    speak({
      en: `Here's a hint for piece ${targetPiece + 1}!`,
      mr: `तुकडा ${targetPiece + 1} साठी ही एक मदत!`
    });

    setTimeout(() => {
      tryPlacePiece(targetPiece, targetPiece);
    }, 700);
  };

  // Next Puzzle button
  const handleNextPuzzle = () => {
    puzzleSounds.playPop();
    if (puzzleIndex + 1 < categoryPuzzles.length) {
      setPuzzleIndex((prev) => prev + 1);
    } else {
      const currentCatIndex = CATEGORIES.findIndex((c) => c.id === activeCategory);
      const nextCat = CATEGORIES[(currentCatIndex + 1) % CATEGORIES.length];
      setActiveCategory(nextCat.id);
      setPuzzleIndex(0);
    }
  };

  // Replay Current Puzzle
  const handleReplay = () => {
    puzzleSounds.playPop();
    initPuzzle();
    speak({
      en: `Let's solve the ${currentPuzzle.name} again!`,
      mr: `चला ${currentPuzzle.nameMr || currentPuzzle.name} चे कोडे पुन्हा सोडवूया!`
    });
  };

  // Toggle Outline / Ghost Mode
  const handleToggleOutline = () => {
    puzzleSounds.playPop();
    setOutlineMode((prev) => {
      if (prev === 'clear') return 'faint';
      if (prev === 'faint') return 'hidden';
      return 'clear';
    });
  };

  // Helper to render piece graphics via offset/clipping
  const renderPieceArt = (pieceIdx) => {
    const row = Math.floor(pieceIdx / numCols);
    const col = pieceIdx % numCols;

    return (
      <div
        className="puzzle-piece-inner-canvas"
        style={{
          width: `${numCols * 100}%`,
          height: `${numRows * 100}%`,
          left: `-${col * 100}%`,
          top: `-${row * 100}%`
        }}
      >
        {currentPuzzle.renderArt()}
      </div>
    );
  };

  return (
    <div className="puzzle-game-viewport">
      {/* Floating Clouds Backdrop */}
      <div className="puzzle-clouds-backdrop">
        <div className="puzzle-cloud c1" />
        <div className="puzzle-cloud c2" />
      </div>

      {/* 1. HUD Top Navigation Bar */}
      <header className="puzzle-hud-header">
        <div className="puzzle-hud-inner">
          {/* Left: Home Button and Game Title */}
          <div className="puzzle-hud-left">
            <button
              type="button"
              className="puzzle-btn-home"
              onClick={onHome}
              title={isMarathi ? 'मुख्यपृष्ठावर परत जा' : 'Back to Home'}
            >
              <Home size={18} />
              <span>{isMarathi ? 'मुख्यपृष्ठ' : 'Home'}</span>
            </button>

            <div className="puzzle-title-group">
              <h1 className="puzzle-main-title">
                <span>{isMarathi ? 'चित्र कोडी (पझल्स)' : 'Picture Puzzles'}</span>
                <Sparkles size={20} color="#f59e0b" />
              </h1>
              <span className="puzzle-sub-title">
                {isMarathi ? 'वय ३–६ • तुकडे जोडून कोडी सोडवा!' : 'Ages 3–6 • Drag & Fit the Pieces!'}
              </span>
            </div>
          </div>

          {/* Center: Difficulty Selector Pills */}
          <div className="puzzle-difficulty-selector">
            {DIFFICULTY_LEVELS.map((diff) => {
              const isActive = activeDifficulty.id === diff.id;
              return (
                <button
                  key={diff.id}
                  type="button"
                  className={`puzzle-diff-btn ${isActive ? 'is-active' : ''}`}
                  onClick={() => handleSelectDifficulty(diff)}
                >
                  <span>{isMarathi ? diff.labelMr : diff.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right: Stars, Score, and Audio Button */}
          <div className="puzzle-hud-right">
            <div className="puzzle-score-badge" title={isMarathi ? 'मिळालेले एकूण तारे' : 'Total Stars Collected'}>
              <Star size={18} fill="#f59e0b" color="#f59e0b" />
              <span>{stars} {isMarathi ? 'तारे' : 'Stars'}</span>
            </div>

            <div
              className="puzzle-score-badge"
              style={{ background: '#ede9fe', color: '#6d28d9', borderColor: '#ddd6fe' }}
              title={isMarathi ? 'खेळाचे गुण' : 'Game Score'}
            >
              <Trophy size={18} color="#7c3aed" />
              <span>{score} {isMarathi ? 'गुण' : 'pts'}</span>
            </div>

            <button
              type="button"
              className="puzzle-icon-circle-btn"
              onClick={handleToggleSound}
              title={soundEnabled ? (isMarathi ? 'आवाज बंद करा' : 'Mute Sound') : (isMarathi ? 'आवाज सुरू करा' : 'Unmute Sound')}
            >
              {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} color="#ef4444" />}
            </button>
          </div>
        </div>
      </header>

      {/* 2. Category Navigation Bar */}
      <nav className="puzzle-category-bar">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              className={`puzzle-cat-btn ${isActive ? 'is-active' : ''}`}
              style={{
                '--cat-color': cat.color,
                '--cat-bg': cat.bg
              }}
              onClick={() => handleSelectCategory(cat.id)}
            >
              <span className="puzzle-cat-icon">{cat.icon}</span>
              <span>{isMarathi ? cat.labelMr : cat.label}</span>
            </button>
          );
        })}
      </nav>

      {/* 3. Main Arena Container */}
      <main className="puzzle-arena-container">
        {/* Info & Action Controls Bar */}
        <div className="puzzle-info-bar">
          <div className="puzzle-info-left">
            <span
              className="puzzle-badge-tag"
              style={{ backgroundColor: currentPuzzle.badgeColor }}
            >
              {isMarathi
                ? (CATEGORIES.find((c) => c.id === currentPuzzle.category)?.labelMr || currentPuzzle.category)
                : currentPuzzle.category}
            </span>
            <div>
              <div className="puzzle-item-name">
                {isMarathi ? currentPuzzle.nameMr : currentPuzzle.name}
              </div>
              <div className="puzzle-item-subtitle">
                {isMarathi ? currentPuzzle.subtitleMr : currentPuzzle.subtitle}
              </div>
            </div>
          </div>

          <div className="puzzle-info-actions">
            {/* Hint Button */}
            <button
              type="button"
              className="puzzle-btn-action hint"
              onClick={handleHint}
              title={isMarathi ? 'मदत मिळवा' : 'Show a Hint'}
              disabled={trayPieces.length === 0}
            >
              <Lightbulb size={18} />
              <span>{isMarathi ? 'मदत' : 'Hint'}</span>
            </button>

            {/* Peek Picture Button */}
            <button
              type="button"
              className="puzzle-btn-action preview"
              onClick={() => setIsPeekModalOpen(true)}
              title={isMarathi ? 'पूर्ण चित्र पाहा' : 'Peek at Completed Picture'}
            >
              <Eye size={18} />
              <span>{isMarathi ? 'चित्राची झलक' : 'Peek'}</span>
            </button>

            {/* Reset Button */}
            <button
              type="button"
              className="puzzle-btn-action reset"
              onClick={initPuzzle}
              title={isMarathi ? 'पुन्हा कोडे लावा' : 'Reset Puzzle'}
            >
              <RefreshCw size={18} />
              <span>{isMarathi ? 'पुन्हा लावा' : 'Reset'}</span>
            </button>

            {/* Replay Sound */}
            <button
              type="button"
              className="puzzle-btn-action replay"
              onClick={handleReplay}
              title={isMarathi ? 'पुन्हा ऐका' : 'Replay Puzzle'}
            >
              <RotateCcw size={18} />
              <span>{isMarathi ? 'पुन्हा ऐका' : 'Replay'}</span>
            </button>

            {/* Next Puzzle */}
            <button
              type="button"
              className="puzzle-btn-action next"
              onClick={handleNextPuzzle}
              title={isMarathi ? 'पुढील कोडे' : 'Next Puzzle'}
            >
              <span>{isMarathi ? 'पुढील कोडे' : 'Next'}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Play Stage: Target Board (Left) & Tray (Right) */}
        <div className="puzzle-play-stage">
          {/* Target Puzzle Board */}
          <section className="puzzle-board-card">
            <div className="puzzle-board-header">
              <div className="puzzle-board-heading">
                <Puzzle size={20} color="#7c3aed" />
                <span>{isMarathi ? 'पझल बोर्ड' : 'Puzzle Board'}</span>
              </div>

              {/* Ghost Outline Toggle */}
              <button
                type="button"
                className={`puzzle-outline-toggle ${outlineMode !== 'hidden' ? 'is-active' : ''}`}
                onClick={handleToggleOutline}
                title={isMarathi ? 'रेखाचित्र मार्गदर्शक टॉगल करा' : 'Toggle Picture Outline Guide'}
              >
                {outlineMode !== 'hidden' ? <Eye size={16} /> : <EyeOff size={16} />}
                <span>
                  {isMarathi
                    ? (outlineMode === 'clear' ? 'रेखाचित्र: स्पष्ट' : outlineMode === 'faint' ? 'रेखाचित्र: फिकट' : 'रेखाचित्र: बंद')
                    : (outlineMode === 'clear' ? 'Outline: Clear' : outlineMode === 'faint' ? 'Outline: Faint' : 'Outline: Off')}
                </span>
              </button>
            </div>

            {/* Board Frame */}
            <div className="puzzle-board-frame">
              {/* Semi-transparent Ghost Outline Artwork */}
              <div className={`puzzle-board-ghost-art outline-${outlineMode}`}>
                {currentPuzzle.renderArt()}
              </div>

              {/* Drop Slots Grid */}
              <div
                className="puzzle-slots-grid"
                style={{
                  gridTemplateRows: `repeat(${numRows}, 1fr)`,
                  gridTemplateColumns: `repeat(${numCols}, 1fr)`
                }}
              >
                {Array.from({ length: totalPieces }).map((_, slotIdx) => {
                  const placedPieceIdx = placedPieces[slotIdx];
                  const isHovered = hoveredSlotIndex === slotIdx;
                  const isHinted = hintSlotIndex === slotIdx;

                  return (
                    <div
                      key={slotIdx}
                      className={`puzzle-slot ${isHovered ? 'is-hovered' : ''} ${isHinted ? 'is-hinted' : ''}`}
                      onClick={() => handleSlotClick(slotIdx)}
                      onDragOver={(e) => handleDragOver(e, slotIdx)}
                      onDragLeave={(e) => handleDragLeave(e, slotIdx)}
                      onDrop={(e) => handleDrop(e, slotIdx)}
                    >
                      {/* Slot Number indicator */}
                      {placedPieceIdx === null && (
                        <div className="puzzle-slot-number-badge">
                          {slotIdx + 1}
                        </div>
                      )}

                      {/* Placed Piece Artwork */}
                      {placedPieceIdx !== null && (
                        <div className="puzzle-placed-piece">
                          {renderPieceArt(placedPieceIdx)}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Piece Tray */}
          <section className="puzzle-tray-card">
            <div className="puzzle-tray-header">
              <div className="puzzle-tray-title">
                <Sparkles size={20} color="#f59e0b" />
                <span>{isMarathi ? 'पझलचे तुकडे' : 'Puzzle Pieces'}</span>
              </div>
              <span className="puzzle-tray-count-badge">
                {trayPieces.length} {isMarathi ? 'शिल्लक' : 'Remaining'}
              </span>
            </div>

            <div className="puzzle-tray-tip">
              <span>{isMarathi ? '💡 टीप:' : '💡 Tip:'}</span>
              <span>
                {isMarathi
                  ? 'तुकडे बोर्डवर ड्रॅग करा किंवा तुकड्यावर टॅप करून रिकाम्या जागेवर टॅप करा!'
                  : 'Drag pieces onto the board OR tap a piece and tap a slot!'}
              </span>
            </div>

            <div className="puzzle-pieces-tray">
              {trayPieces.length > 0 ? (
                trayPieces.map((pieceIdx) => {
                  const isSelected = selectedTrayPiece === pieceIdx;
                  const isDragging = draggedPiece === pieceIdx;

                  return (
                    <div
                      key={pieceIdx}
                      className={`puzzle-piece-item ${isSelected ? 'is-selected' : ''} ${isDragging ? 'is-dragging' : ''}`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, pieceIdx)}
                      onDragEnd={() => setDraggedPiece(null)}
                      onClick={() => handleTrayPieceClick(pieceIdx)}
                      title={isMarathi
                        ? `तुकडा ${pieceIdx + 1} - निवडण्यासाठी टॅप करा किंवा बोर्डवर ड्रॅग करा`
                        : `Piece ${pieceIdx + 1} - Tap to select or drag to board`}
                    >
                      {renderPieceArt(pieceIdx)}
                      <span className="puzzle-piece-label-tag">
                        #{pieceIdx + 1}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className="puzzle-tray-completed-box">
                  <div className="puzzle-tray-completed-icon">🎉</div>
                  <div className="puzzle-tray-completed-text">
                    {isMarathi
                      ? 'सर्व तुकडे योग्य जागी बसवले! खूप छान!'
                      : 'All Pieces Placed! Great Job!'}
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* 4. Peek Modal */}
      {isPeekModalOpen && (
        <div
          className="puzzle-peek-modal-overlay"
          onClick={() => setIsPeekModalOpen(false)}
        >
          <div
            className="puzzle-peek-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#1e1b4b' }}>
              {isMarathi ? 'पूर्ण चित्राची झलक 🖼️' : 'Completed Picture Preview 🖼️'}
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>
              {isMarathi
                ? 'सर्व तुकडे कुठे बसतात हे पाहण्यासाठी चित्र नीट पाहा!'
                : 'Look at the picture closely to see where all pieces fit!'}
            </p>
            <div className="puzzle-peek-image-frame">
              {currentPuzzle.renderArt()}
            </div>
            <button
              type="button"
              className="puzzle-peek-btn-close"
              onClick={() => setIsPeekModalOpen(false)}
            >
              {isMarathi ? 'कोड्याकडे परत जा ✨' : 'Back to Puzzle ✨'}
            </button>
          </div>
        </div>
      )}

      {/* 5. Cheerful Celebration Modal */}
      {isCelebrated && (
        <div className="puzzle-celebration-overlay">
          <div className="puzzle-celebration-card">
            {/* 3 Bouncing Golden Stars */}
            <div className="puzzle-celebration-stars">
              <span className="puzzle-jumping-star">⭐</span>
              <span className="puzzle-jumping-star">⭐</span>
              <span className="puzzle-jumping-star">⭐</span>
            </div>

            <h2 className="puzzle-celebration-title">
              {isMarathi ? 'शाब्बास! तुम्ही कोडे सोडवले! 🎈' : 'Hooray! You Solved It! 🎈'}
            </h2>

            <p className="puzzle-celebration-msg">
              {isMarathi ? (
                <>
                  अप्रतिम काम! तुम्ही <strong>{currentPuzzle.nameMr || currentPuzzle.name}</strong> चे कोडे पूर्ण केले!
                  <br />
                  <span style={{ color: '#10b981', fontWeight: 900 }}>
                    +{activeDifficulty.pieces >= 6 ? 3 : 2} तारे ⭐ आणि +१५ गुण 🏆
                  </span>
                </>
              ) : (
                <>
                  Awesome job! You finished the <strong>{currentPuzzle.name}</strong> puzzle!
                  <br />
                  <span style={{ color: '#10b981', fontWeight: 900 }}>
                    +{activeDifficulty.pieces >= 6 ? 3 : 2} Stars ⭐ & +15 Points 🏆
                  </span>
                </>
              )}
            </p>

            <div className="puzzle-celebration-preview-thumb">
              {currentPuzzle.renderArt()}
            </div>

            <p style={{ fontSize: '0.9rem', color: '#64748b', fontStyle: 'italic', margin: 0 }}>
              "{isMarathi ? (currentPuzzle.funFactMr || currentPuzzle.funFact) : currentPuzzle.funFact}"
            </p>

            <div className="puzzle-celebration-buttons">
              <button
                type="button"
                className="puzzle-btn-celebrate secondary"
                onClick={handleReplay}
              >
                <RotateCcw size={18} />
                <span>{isMarathi ? 'पुन्हा खेळा' : 'Play Again'}</span>
              </button>

              <button
                type="button"
                className="puzzle-btn-celebrate primary"
                onClick={handleNextPuzzle}
              >
                <span>{isMarathi ? 'पुढील कोडे' : 'Next Puzzle'}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
