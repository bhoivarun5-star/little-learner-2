import React, { useState, useRef, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  Home,
  Volume2,
  VolumeX,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Star,
  Trash2,
  Trophy,
  CheckCircle2,
  Lightbulb
} from 'lucide-react';
import {
  TRACING_MODES,
  UPPERCASE_DATA,
  LOWERCASE_DATA,
  NUMBERS_DATA,
  generateCheckpoints
} from './tracingData';
import { tracingSounds } from './tracingSounds';
import './TracingGame.css';

// Bright Toddler-Friendly Brush Colors
const BRUSH_COLORS = [
  { name: 'Red', hex: '#ef4444' },
  { name: 'Pink', hex: '#ec4899' },
  { name: 'Orange', hex: '#f97316' },
  { name: 'Amber', hex: '#f59e0b' },
  { name: 'Green', hex: '#10b981' },
  { name: 'Blue', hex: '#3b82f6' },
  { name: 'Purple', hex: '#8b5cf6' }
];

export default function TracingGame({ onHome, onEarnStars }) {
  // Game Mode: 'uppercase' | 'lowercase' | 'numbers'
  const [activeMode, setActiveMode] = useState('uppercase');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Brush styling
  const [brushColor, setBrushColor] = useState(BRUSH_COLORS[4].hex); // Green default
  const brushSize = 22; // Tactile child-friendly stroke width

  // Sound
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Progress & Completion
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [feedbackToast, setFeedbackToast] = useState(null); // { type: 'correct' | 'try-again', text: string }
  const [completedSet, setCompletedSet] = useState(() => new Set());
  const [totalStars, setTotalStars] = useState(125);

  // Canvas Refs
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastCoordRef = useRef({ x: 0, y: 0 });
  const checkpointsRef = useRef([]);
  const hitCountRef = useRef(0);
  const drawnDistanceRef = useRef(0);

  // Current dataset according to mode
  const currentDataset =
    activeMode === 'uppercase'
      ? UPPERCASE_DATA
      : activeMode === 'lowercase'
      ? LOWERCASE_DATA
      : NUMBERS_DATA;

  const currentItem = currentDataset[currentIndex] || currentDataset[0];

  // Initialize Canvas & Checkpoints for current item
  const resetCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Initialize checkpoints
    const points = generateCheckpoints(currentItem.segments || []);
    checkpointsRef.current = points;
    hitCountRef.current = 0;
    drawnDistanceRef.current = 0;
    setProgress(0);
    setIsCompleted(false);
    setFeedbackToast(null);
  }, [currentItem]);

  // Handle character switch or mode switch
  useEffect(() => {
    resetCanvas();
  }, [currentIndex, activeMode, resetCanvas]);

  // Audio mute/unmute sync
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    tracingSounds.setSoundEnabled(next);
  };

  // Pronounce character & phonics
  const handleListen = () => {
    tracingSounds.playTap();
    tracingSounds.speak(currentItem.soundText);
  };

  // Mode change
  const handleModeChange = (modeId) => {
    tracingSounds.playTap();
    setActiveMode(modeId);
    setCurrentIndex(0);
  };

  // Navigation
  const handlePrev = () => {
    tracingSounds.playTap();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : currentDataset.length - 1));
  };

  const handleNext = () => {
    tracingSounds.playTap();
    setCurrentIndex((prev) => (prev < currentDataset.length - 1 ? prev + 1 : 0));
  };

  const handleDirectSelect = (idx) => {
    tracingSounds.playTap();
    setCurrentIndex(idx);
  };

  // Clear Canvas
  const handleClear = () => {
    tracingSounds.playTap();
    resetCanvas();
  };

  // Replay
  const handleReplay = () => {
    tracingSounds.playTap();
    resetCanvas();
    tracingSounds.speak(currentItem.soundText);
  };

  // Pointer / Touch drawing handlers
  const getCanvasCoords = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = 400 / rect.width;
    const scaleY = 400 / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const handlePointerDown = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setPointerCapture(e.pointerId);

    isDrawingRef.current = true;
    const coords = getCanvasCoords(e);
    lastCoordRef.current = coords;

    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(coords.x, coords.y, brushSize / 2, 0, Math.PI * 2);
    ctx.fillStyle = brushColor;
    ctx.fill();

    checkCheckpointHit(coords.x, coords.y);
  };

  const checkCheckpointHit = (x, y) => {
    const hitRadius = 38; // Generous hit radius for preschoolers
    let newHits = 0;
    const pts = checkpointsRef.current;
    for (let i = 0; i < pts.length; i++) {
      if (!pts[i].hit) {
        const dist = Math.hypot(x - pts[i].x, y - pts[i].y);
        if (dist <= hitRadius) {
          pts[i].hit = true;
          hitCountRef.current += 1;
          newHits++;
        }
      }
    }
    if (pts.length > 0) {
      const pct = Math.round((hitCountRef.current / pts.length) * 100);
      setProgress(Math.min(100, pct));
    }
  };

  const handlePointerMove = (e) => {
    if (!isDrawingRef.current) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const coords = getCanvasCoords(e);
    const ctx = canvas.getContext('2d');

    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(lastCoordRef.current.x, lastCoordRef.current.y);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();

    const segDist = Math.hypot(coords.x - lastCoordRef.current.x, coords.y - lastCoordRef.current.y);
    drawnDistanceRef.current += segDist;

    lastCoordRef.current = coords;
    checkCheckpointHit(coords.x, coords.y);
  };

  const handlePointerUp = (e) => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;

    const totalPts = checkpointsRef.current.length || 1;
    const pct = Math.round((hitCountRef.current / totalPts) * 100);

    // Tracing threshold: 65% is great for ages 3-6 to avoid frustration
    if (pct >= 65 && !isCompleted) {
      triggerSuccess();
    } else if (drawnDistanceRef.current > 120 && pct < 40) {
      // Child drew a bunch but missed the guide lines
      tracingSounds.playTryAgain();
      setFeedbackToast({ type: 'try-again', text: 'Follow the dots! You can do it! 👆' });
      setTimeout(() => setFeedbackToast(null), 2500);
    }
  };

  const triggerSuccess = () => {
    setIsCompleted(true);
    setProgress(100);
    tracingSounds.playSuccessChime();

    // Confetti celebration
    confetti({
      particleCount: 110,
      spread: 80,
      origin: { y: 0.6 }
    });

    // Update stars
    setTotalStars((prev) => prev + 3);
    if (onEarnStars) {
      onEarnStars(3);
    }

    // Mark completed in set
    const key = `${activeMode}-${currentIndex}`;
    setCompletedSet((prev) => new Set([...prev, key]));

    setFeedbackToast({ type: 'correct', text: `🌟 Super! You traced ${currentItem.char}!` });
  };

  const handleCelebrationNext = () => {
    tracingSounds.playTap();
    handleNext();
  };

  const handleCelebrationAgain = () => {
    tracingSounds.playTap();
    resetCanvas();
  };

  return (
    <div className="tracing-game-container">
      {/* 1. Header Navigation Bar */}
      <header className="tracing-header">
        <div className="tracing-header-inner">
          <button
            className="tracing-btn-home"
            onClick={() => {
              tracingSounds.playTap();
              onHome();
            }}
            title="Back to Home"
            id="btn-tracing-home"
          >
            <Home size={20} />
            <span>Home</span>
          </button>

          {/* Mode Selector Tabs */}
          <div className="tracing-mode-switcher">
            {TRACING_MODES.map((mode) => (
              <button
                key={mode.id}
                className={`tracing-mode-btn ${activeMode === mode.id ? 'active' : ''}`}
                onClick={() => handleModeChange(mode.id)}
                id={`tab-tracing-${mode.id}`}
              >
                <span>{mode.icon}</span>
                <span>{mode.label}</span>
              </button>
            ))}
          </div>

          {/* Stars & Sound Controls */}
          <div className="tracing-header-right">
            <div className="tracing-stars-pill">
              <Star size={20} className="star-icon-glow" />
              <span>{totalStars}</span>
            </div>

            <button
              className="tracing-sound-btn"
              onClick={toggleSound}
              title={soundEnabled ? 'Mute Audio' : 'Unmute Audio'}
              id="btn-tracing-sound"
            >
              {soundEnabled ? <Volume2 size={22} /> : <VolumeX size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Game Arena */}
      <main className="tracing-arena">
        {/* Character Info Bar */}
        <div className="tracing-char-header-bar">
          <div className="tracing-char-identity">
            <div
              className="tracing-char-badge"
              style={{ backgroundColor: currentItem.color || '#3b82f6' }}
            >
              {currentItem.char}
            </div>
            <div className="tracing-word-group">
              <h2 className="tracing-word-title">
                {currentItem.word} <span>{currentItem.icon}</span>
              </h2>
              <p className="tracing-word-subtitle">
                Trace the {activeMode === 'numbers' ? 'number' : 'letter'} with your finger or mouse!
              </p>
            </div>
          </div>

          <div className="tracing-char-actions">
            <button className="btn-listen" onClick={handleListen} id="btn-tracing-listen">
              <Volume2 size={24} />
              <span>Listen</span>
            </button>

            <div className="tracing-progress-pill" title="Tracing Progress">
              <div className="tracing-progress-bar-bg">
                <div
                  className="tracing-progress-bar-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="tracing-progress-text">{progress}%</span>
            </div>
          </div>
        </div>

        {/* 3. Interactive Tracing Stage */}
        <div className="tracing-stage-wrapper">
          <div className="tracing-card">
            {/* SVG Guidelines Layer */}
            <svg
              className="tracing-svg-layer"
              viewBox="0 0 400 400"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Soft watermark letter in background */}
              <text x="200" y="220" className="tracing-watermark">
                {currentItem.char}
              </text>

              {/* Dotted Stroke Guide Paths */}
              {currentItem.strokes &&
                currentItem.strokes.map((stroke) => (
                  <path
                    key={stroke.id}
                    d={stroke.path}
                    className="tracing-guide-stroke"
                  />
                ))}

              {/* Numbered Stroke Start Nodes (①, ②, ③) with Arrow */}
              {currentItem.strokes &&
                currentItem.strokes.map((stroke) => (
                  <g key={`node-${stroke.id}`} className="stroke-node-group">
                    <circle
                      cx={stroke.start.x}
                      cy={stroke.start.y}
                      r="16"
                      className="stroke-node-circle"
                    />
                    <text
                      x={stroke.start.x}
                      y={stroke.start.y + 1}
                      className="stroke-node-text"
                    >
                      {stroke.label}
                    </text>
                  </g>
                ))}
            </svg>

            {/* Interactive Drawing Canvas */}
            <canvas
              ref={canvasRef}
              width={400}
              height={400}
              className="tracing-canvas"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            />

            {/* Toast Feedback */}
            {feedbackToast && (
              <div className={`tracing-feedback-toast ${feedbackToast.type}`}>
                {feedbackToast.type === 'correct' ? (
                  <CheckCircle2 size={22} />
                ) : (
                  <Lightbulb size={22} />
                )}
                <span>{feedbackToast.text}</span>
              </div>
            )}
          </div>
        </div>

        {/* 4. Controls & Color Palette */}
        <div className="tracing-controls-panel">
          {/* Color Swatches */}
          <div className="tracing-color-bar">
            <span className="tracing-palette-label">Color:</span>
            {BRUSH_COLORS.map((c) => (
              <button
                key={c.hex}
                className={`tracing-color-swatch ${brushColor === c.hex ? 'active' : ''}`}
                style={{ backgroundColor: c.hex }}
                onClick={() => {
                  tracingSounds.playTap();
                  setBrushColor(c.hex);
                }}
                title={c.name}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="tracing-actions-bar">
            <button
              className="tracing-action-btn secondary"
              onClick={handlePrev}
              title="Previous Character"
              id="btn-tracing-prev"
            >
              <ChevronLeft size={22} />
              <span>Prev</span>
            </button>

            <button
              className="tracing-action-btn secondary"
              onClick={handleClear}
              title="Clear Canvas"
              id="btn-tracing-clear"
            >
              <Trash2 size={20} />
              <span>Clear</span>
            </button>

            <button
              className="tracing-action-btn secondary"
              onClick={handleReplay}
              title="Replay & Listen"
              id="btn-tracing-replay"
            >
              <RotateCcw size={20} />
              <span>Replay</span>
            </button>

            <button
              className="tracing-action-btn primary"
              onClick={handleNext}
              title="Next Character"
              id="btn-tracing-next"
            >
              <span>Next</span>
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* 5. Bottom Character Quick Selector Strip */}
        <div className="tracing-char-tray">
          {currentDataset.map((item, idx) => {
            const key = `${activeMode}-${idx}`;
            const done = completedSet.has(key);
            return (
              <button
                key={item.char + idx}
                className={`tracing-char-tray-item ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => handleDirectSelect(idx)}
                title={`Trace ${item.char}`}
              >
                <span>{item.char}</span>
                {done && <span className="tracing-char-tray-star">⭐</span>}
              </button>
            );
          })}
        </div>
      </main>

      {/* 6. Celebration Modal */}
      {isCompleted && (
        <div className="tracing-celebration-backdrop">
          <div className="tracing-celebration-card">
            <div className="celebration-trophy-badge">🏆</div>
            <h2 className="celebration-title">Fantastic Tracing!</h2>
            <div className="celebration-stars-row">
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
            </div>
            <p className="celebration-subtitle">
              You traced <strong>{currentItem.char}</strong> ({currentItem.word}) perfectly!
            </p>
            <div className="celebration-actions">
              <button
                className="tracing-action-btn secondary"
                onClick={handleCelebrationAgain}
              >
                <RotateCcw size={20} />
                <span>Trace Again</span>
              </button>
              <button
                className="tracing-action-btn primary"
                onClick={handleCelebrationNext}
              >
                <span>Next</span>
                <ChevronRight size={22} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
