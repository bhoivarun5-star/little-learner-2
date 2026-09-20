import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Home,
  Volume2,
  VolumeX,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Sparkles,
  Star,
  CheckCircle2,
  HelpCircle,
  Trophy,
  Award
} from 'lucide-react';
import {
  COMPLETION_CATEGORIES,
  DIFFICULTY_MODES,
  PICTURE_SCENES
} from './pictureCompletionData';
import { pictureSounds } from './pictureCompletionSounds';
import './PictureCompletionGame.css';

export default function PictureCompletionGame({ onHome, onEarnStars }) {
  // Navigation & Filtering
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [difficulty, setDifficulty] = useState('easy'); // 'easy' | 'medium' | 'hard'
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sound
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Game Play State
  const [isCompleted, setIsCompleted] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type: 'correct' | 'try-again', message: string }
  const [wrongOptionId, setWrongOptionId] = useState(null);
  const [isHintActive, setIsHintActive] = useState(false);
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState(125);
  const [showCelebration, setShowCelebration] = useState(false);

  // Drag & drop state
  const [draggedOption, setDraggedOption] = useState(null);
  const [isDragOverSlot, setIsDragOverSlot] = useState(false);

  // Filtered scenes
  const filteredScenes = PICTURE_SCENES.filter((scene) =>
    selectedCategory === 'all' ? true : scene.category === selectedCategory
  );

  const currentScene = filteredScenes[currentIndex] || filteredScenes[0] || PICTURE_SCENES[0];
  const activeOptions = currentScene.options[difficulty] || currentScene.options.easy;

  // Reset state on scene or difficulty change
  useEffect(() => {
    setIsCompleted(false);
    setFeedback(null);
    setWrongOptionId(null);
    setIsHintActive(false);
    setShowCelebration(false);
  }, [currentIndex, selectedCategory, difficulty]);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    pictureSounds.setSoundEnabled(next);
  };

  // Check piece selection (handles both tap and drag drop)
  const handleSelectPiece = (option) => {
    if (isCompleted) return;

    if (option.isCorrect) {
      // SUCCESS!
      setIsCompleted(true);
      setIsHintActive(false);
      setWrongOptionId(null);
      pictureSounds.playSnap();
      pictureSounds.playSuccessChime();

      setScore((s) => s + 20);
      setStars((st) => st + 3);
      if (onEarnStars) {
        onEarnStars(3);
      }

      setFeedback({
        type: 'correct',
        message: `🌟 Awesome! You completed the ${currentScene.title}!`
      });

      confetti({
        particleCount: 100,
        spread: 75,
        origin: { y: 0.6 }
      });

      setTimeout(() => {
        setShowCelebration(true);
      }, 1200);
    } else {
      // TRY AGAIN!
      pictureSounds.playTryAgain();
      setWrongOptionId(option.id);
      setFeedback({
        type: 'try-again',
        message: 'Almost! Try a different piece! 🧩'
      });

      setTimeout(() => {
        setWrongOptionId(null);
      }, 700);

      setTimeout(() => {
        setFeedback(null);
      }, 2400);
    }
  };

  // Hint button
  const handleHint = () => {
    pictureSounds.playPop();
    setIsHintActive(true);
    setTimeout(() => {
      setIsHintActive(false);
    }, 3500);
  };

  // Reset current scene
  const handleReset = () => {
    pictureSounds.playPop();
    setIsCompleted(false);
    setFeedback(null);
    setWrongOptionId(null);
    setIsHintActive(false);
    setShowCelebration(false);
  };

  // Navigation
  const handleNext = () => {
    pictureSounds.playPop();
    setCurrentIndex((prev) => (prev < filteredScenes.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    pictureSounds.playPop();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredScenes.length - 1));
  };

  // Category switch
  const handleCategoryChange = (catId) => {
    pictureSounds.playPop();
    setSelectedCategory(catId);
    setCurrentIndex(0);
  };

  // Difficulty switch
  const handleDifficultyChange = (diffId) => {
    pictureSounds.playPop();
    setDifficulty(diffId);
  };

  // Drag and Drop handlers
  const handleDragStart = (e, option) => {
    setDraggedOption(option);
    pictureSounds.playPop();
    e.dataTransfer.setData('text/plain', option.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOverSlot(true);
  };

  const handleDragLeave = () => {
    setIsDragOverSlot(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOverSlot(false);
    if (draggedOption) {
      handleSelectPiece(draggedOption);
      setDraggedOption(null);
    }
  };

  // Calculate percentage coordinates for the slot overlay
  const slotPctX = (currentScene.slot.cx / 400) * 100;
  const slotPctY = (currentScene.slot.cy / 400) * 100;
  const slotRadiusPct = (currentScene.slot.r / 400) * 100;

  // Correct option object for ghost hint
  const correctOption = activeOptions.find((opt) => opt.isCorrect);

  return (
    <div className="pc-game-container">
      {/* 1. Header Navigation Bar */}
      <header className="pc-header">
        <div className="pc-header-inner">
          <button
            className="pc-btn-home"
            onClick={() => {
              pictureSounds.playPop();
              onHome();
            }}
            title="Back to Home"
            id="btn-pc-home"
          >
            <Home size={20} />
            <span>Home</span>
          </button>

          {/* Difficulty Switcher */}
          <div className="pc-difficulty-bar">
            {DIFFICULTY_MODES.map((d) => (
              <button
                key={d.id}
                className={`pc-diff-btn ${difficulty === d.id ? 'active' : ''}`}
                onClick={() => handleDifficultyChange(d.id)}
                id={`btn-diff-${d.id}`}
              >
                <span>{d.badge}</span>
              </button>
            ))}
          </div>

          {/* Score, Stars & Sound */}
          <div className="pc-header-right">
            <div className="pc-score-pill">
              <Award size={18} />
              <span>{score} pts</span>
            </div>

            <div className="pc-stars-pill">
              <Star size={18} className="pc-star-glow" />
              <span>{stars}</span>
            </div>

            <button
              className="pc-sound-btn"
              onClick={toggleSound}
              title={soundEnabled ? 'Mute Audio' : 'Unmute Audio'}
              id="btn-pc-sound"
            >
              {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* 2. Category Filter Pills */}
      <nav className="pc-category-nav">
        {COMPLETION_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`pc-category-chip ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => handleCategoryChange(cat.id)}
            id={`chip-cat-${cat.id}`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </nav>

      {/* 3. Main Arena */}
      <main className="pc-arena">
        {/* Prompt Card */}
        <div className="pc-prompt-card">
          <div className="pc-prompt-info">
            <h2 className="pc-prompt-title">
              <span>{currentScene.title}</span>
            </h2>
            <p className="pc-prompt-subtitle">{currentScene.prompt}</p>
          </div>
        </div>

        {/* 4. Picture Frame with Missing Slot */}
        <div className="pc-stage-row">
          <div className="pc-stage-frame">
            {currentScene.renderBase(isCompleted)}

            {/* Cutout missing slot overlay (clickable or droppable) */}
            {!isCompleted && (
              <div
                className={`pc-slot-overlay ${isHintActive ? 'highlight-hint' : ''} ${
                  isDragOverSlot ? 'drag-over' : ''
                }`}
                style={{
                  left: `${slotPctX - slotRadiusPct}%`,
                  top: `${slotPctY - slotRadiusPct}%`,
                  width: `${slotRadiusPct * 2}%`,
                  height: `${slotRadiusPct * 2}%`
                }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => {
                  if (correctOption) handleSelectPiece(correctOption);
                }}
                title="Place missing piece here!"
                id="pc-missing-slot"
              >
                {/* Easy Mode / Hint: Faint ghost preview */}
                {(difficulty === 'easy' || isHintActive) && correctOption && (
                  <div className="pc-slot-ghost">
                    {correctOption.render()}
                  </div>
                )}
                {isHintActive && <span className="pc-slot-sparkle">✨</span>}
              </div>
            )}

            {/* Feedback Banner */}
            {feedback && (
              <div className={`pc-feedback-banner ${feedback.type}`}>
                {feedback.type === 'correct' ? (
                  <CheckCircle2 size={22} />
                ) : (
                  <HelpCircle size={22} />
                )}
                <span>{feedback.message}</span>
              </div>
            )}
          </div>
        </div>

        {/* 5. Options Tray: 3-4 Missing Piece Cards */}
        <div className="pc-options-tray">
          <div className="pc-options-label">
            <span>Choose the missing piece:</span>
          </div>

          <div className="pc-options-row">
            {activeOptions.map((opt) => {
              const isWrong = wrongOptionId === opt.id;
              const isHinted = isHintActive && opt.isCorrect;

              return (
                <div
                  key={opt.id}
                  className={`pc-option-card ${isHinted ? 'hint-glow' : ''} ${
                    isWrong ? 'shake-wrong' : ''
                  }`}
                  draggable={!isCompleted}
                  onDragStart={(e) => handleDragStart(e, opt)}
                  onClick={() => handleSelectPiece(opt)}
                  title={`Select ${opt.label}`}
                  id={`opt-piece-${opt.id}`}
                >
                  <div className="pc-option-svg-box">
                    {opt.render()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 6. Action Toolbar */}
        <div className="pc-actions-bar">
          <button
            className="pc-action-btn secondary"
            onClick={handlePrev}
            title="Previous Picture"
            id="btn-pc-prev"
          >
            <ChevronLeft size={20} />
            <span>Prev</span>
          </button>

          <button
            className="pc-action-btn hint"
            onClick={handleHint}
            title="Need a Hint?"
            id="btn-pc-hint"
          >
            <Lightbulb size={20} />
            <span>Hint</span>
          </button>

          <button
            className="pc-action-btn secondary"
            onClick={handleReset}
            title="Reset Picture"
            id="btn-pc-reset"
          >
            <RotateCcw size={20} />
            <span>Reset</span>
          </button>

          <button
            className="pc-action-btn primary"
            onClick={handleNext}
            title="Next Picture"
            id="btn-pc-next"
          >
            <span>Next</span>
            <ChevronRight size={20} />
          </button>
        </div>
      </main>

      {/* 7. Celebration Modal on Completion */}
      {showCelebration && (
        <div className="pc-celebration-backdrop">
          <div className="pc-celebration-card">
            <div className="pc-celebration-trophy">🏆</div>
            <h2 className="pc-celebration-title">Picture Complete!</h2>
            <div className="pc-celebration-stars">
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
            </div>
            <p className="pc-celebration-subtitle">
              You completed the <strong>{currentScene.title}</strong>! +3 Stars!
            </p>
            <div className="pc-celebration-actions">
              <button
                className="pc-action-btn secondary"
                onClick={handleReset}
              >
                <RotateCcw size={18} />
                <span>Play Again</span>
              </button>
              <button
                className="pc-action-btn primary"
                onClick={handleNext}
              >
                <span>Next Picture</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
