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
  Lightbulb,
  Award,
  Lock,
  ArrowRight
} from 'lucide-react';
import {
  TRACING_MODES,
  UPPERCASE_DATA,
  LOWERCASE_DATA,
  NUMBERS_DATA,
  generateCheckpoints
} from './tracingData';
import { tracingSounds } from './tracingSounds';
import { useLanguage } from '../../../context/LanguageContext';
import StudentSwitcher from '../../StudentSwitcher';
import './TracingGame.css';

// Bright Toddler-Friendly Brush Colors with Marathi Names
const BRUSH_COLORS = [
  { name: 'Red', nameMr: 'लाल', hex: '#ef4444' },
  { name: 'Pink', nameMr: 'गुलाबी', hex: '#ec4899' },
  { name: 'Orange', nameMr: 'केशरी', hex: '#f97316' },
  { name: 'Amber', nameMr: 'अंबर', hex: '#f59e0b' },
  { name: 'Green', nameMr: 'हिरवा', hex: '#10b981' },
  { name: 'Blue', nameMr: 'निळा', hex: '#3b82f6' },
  { name: 'Purple', nameMr: 'जांभळा', hex: '#8b5cf6' }
];

export default function TracingGame({ onHome, onEarnStars, onToggleDashboard }) {
  const { t, speak, language, isMuted, soundEnabled, toggleMute } = useLanguage();
  const isMarathi = language === 'mr';

  // Level Progression:
  // Level 1: 'uppercase' -> Unlocked by default
  // Level 2: 'lowercase' -> Locked until Level 1 complete
  // Level 3: 'numbers' -> Locked until Level 2 complete
  const [unlockedLevel, setUnlockedLevel] = useState(() => {
    try {
      const saved = localStorage.getItem('little_learner_trace_unlocked_level');
      const val = parseInt(saved, 10);
      return val >= 1 && val <= 3 ? val : 1;
    } catch {
      return 1;
    }
  });
  const [lockToast, setLockToast] = useState(null);
  const [score, setScore] = useState(0);

  // Game Mode: 'uppercase' | 'lowercase' | 'numbers'
  const [activeMode, setActiveMode] = useState('uppercase');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Brush styling
  const [brushColor, setBrushColor] = useState(BRUSH_COLORS[4].hex); // Green default
  const brushSize = 22; // Tactile child-friendly stroke width

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
    toggleMute();
  };

  // Pronounce character & phonics
  const handleListen = () => {
    tracingSounds.playTap();
    const speechTxt = isMarathi ? (currentItem.soundTextMr || currentItem.wordMr || currentItem.soundText) : currentItem.soundText;
    speak(speechTxt);
  };

  // Mode change with level locking protection
  const handleModeChange = (modeId) => {
    if (modeId === 'lowercase' && unlockedLevel < 2) {
      tracingSounds.playTryAgain();
      const msg = isMarathi
        ? '🔒 ही पातळी बंद आहे! उघडण्यासाठी प्रथम "मोठी अक्षरे A–Z" (पातळी १) पूर्ण करा!'
        : '🔒 Level Locked! Complete "Uppercase A–Z" (Level 1) first to unlock!';
      setLockToast(msg);
      if (speak) speak(isMarathi ? 'प्रथम मोठी अक्षरे पूर्ण करा' : 'Please complete Uppercase letters first');
      setTimeout(() => setLockToast(null), 3500);
      return;
    }

    if (modeId === 'numbers' && unlockedLevel < 3) {
      tracingSounds.playTryAgain();
      const msg = isMarathi
        ? '🔒 ही पातळी बंद आहे! उघडण्यासाठी प्रथम "लहान अक्षरे a–z" (पातळी २) पूर्ण करा!'
        : '🔒 Level Locked! Complete "Lowercase a–z" (Level 2) first to unlock!';
      setLockToast(msg);
      if (speak) speak(isMarathi ? 'प्रथम लहान अक्षरे पूर्ण करा' : 'Please complete Lowercase letters first');
      setTimeout(() => setLockToast(null), 3500);
      return;
    }

    tracingSounds.playTap();
    setLockToast(null);
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
    const speechTxt = isMarathi ? (currentItem.soundTextMr || currentItem.wordMr || currentItem.soundText) : currentItem.soundText;
    speak(speechTxt);
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

    const pts = checkpointsRef.current;
    const totalPts = pts.length || 1;
    const pct = Math.round((hitCountRef.current / totalPts) * 100);

    // Segment coverage check: Ensure NO stroke/segment of the letter or number was skipped
    const segmentCounts = {};
    const segmentHits = {};
    pts.forEach((p) => {
      const sId = p.segIdx !== undefined ? p.segIdx : 0;
      segmentCounts[sId] = (segmentCounts[sId] || 0) + 1;
      if (p.hit) {
        segmentHits[sId] = (segmentHits[sId] || 0) + 1;
      }
    });

    const allSegmentsCovered =
      Object.keys(segmentCounts).length > 0 &&
      Object.keys(segmentCounts).every((sId) => {
        const count = segmentCounts[sId];
        const hits = segmentHits[sId] || 0;
        return (hits / count) >= 0.65; // Every segment must have at least 65% tracing
      });

    // Complete tracing requirements:
    // Only give points when user traces the complete letter or number (not for half tracing)
    const isComplete = pct >= 88 && allSegmentsCovered;

    if (isComplete && !isCompleted) {
      triggerSuccess();
    } else if (!isCompleted && pct >= 25 && pct < 88) {
      // Incomplete / half tracing: encourage child to finish whole letter, NO points awarded
      const partialMsg = isMarathi
        ? 'छान प्रयत्न! पूर्ण अक्षर गिरवा, मगच गुण आणि तारे मिळतील! ✍️'
        : 'Good effort! Trace the complete character to earn points & stars! ✍️';
      setFeedbackToast({ type: 'hint', text: partialMsg });
      setTimeout(() => setFeedbackToast(null), 3000);
    } else if (drawnDistanceRef.current > 120 && pct < 25) {
      // Child drew wildly off the guidelines
      tracingSounds.playTryAgain();
      const tryText = isMarathi ? 'ठिपक्यांच्या रेषेवरून गिरवा! तुम्ही करू शकता! 👆' : 'Follow the dots! You can do it! 👆';
      speak(tryText);
      setFeedbackToast({ type: 'try-again', text: tryText });
      setTimeout(() => setFeedbackToast(null), 2500);
    }
  };

  const triggerSuccess = () => {
    setIsCompleted(true);
    setProgress(100);
    tracingSounds.playSuccessChime();

    const wordSpoken = isMarathi ? (currentItem.wordMr || currentItem.word) : currentItem.word;
    speak(wordSpoken);

    // Confetti celebration
    confetti({
      particleCount: 110,
      spread: 80,
      origin: { y: 0.6 }
    });

    // Award points and stars ONLY on complete tracing
    setScore((s) => s + 20);
    setTotalStars((prev) => prev + 3);
    if (onEarnStars) {
      onEarnStars(3);
    }

    // Unlock next level progression
    if (activeMode === 'uppercase' && unlockedLevel < 2) {
      setUnlockedLevel(2);
      try {
        localStorage.setItem('little_learner_trace_unlocked_level', '2');
      } catch (e) {
        console.error(e);
      }
    } else if (activeMode === 'lowercase' && unlockedLevel < 3) {
      setUnlockedLevel(3);
      try {
        localStorage.setItem('little_learner_trace_unlocked_level', '3');
      } catch (e) {
        console.error(e);
      }
    }

    // Mark completed in set
    const key = `${activeMode}-${currentIndex}`;
    setCompletedSet((prev) => new Set([...prev, key]));

    const superText = isMarathi
      ? `🌟 शाब्बास! तुम्ही ${currentItem.char} पूर्ण गिरवले! +२० गुण, +३ तारे!`
      : `🌟 Super! You traced ${currentItem.char} completely! +20 Pts, +3 Stars!`;
    setFeedbackToast({ type: 'correct', text: superText });
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
            title={isMarathi ? "मुख्यपृष्ठावर परत जा" : "Back to Home"}
            id="btn-tracing-home"
          >
            <Home size={20} />
            <span>{t('btnHome')}</span>
          </button>

          {/* Mode Selector Tabs with Level Lock indicators */}
          <div className="tracing-mode-switcher">
            {TRACING_MODES.map((mode) => {
              const isLocked =
                (mode.id === 'lowercase' && unlockedLevel < 2) ||
                (mode.id === 'numbers' && unlockedLevel < 3);

              return (
                <button
                  key={mode.id}
                  type="button"
                  className={`tracing-mode-btn ${activeMode === mode.id ? 'active' : ''} ${isLocked ? 'is-locked' : ''}`}
                  onClick={() => handleModeChange(mode.id)}
                  id={`tab-tracing-${mode.id}`}
                  title={isLocked ? (isMarathi ? 'आधीची पातळी पूर्ण केल्यावर उघडेल' : 'Complete previous level to unlock') : ''}
                >
                  {isLocked ? <Lock size={14} className="tracing-diff-lock-icon" /> : <span>{mode.icon}</span>}
                  <span>{isMarathi ? (mode.labelMr || mode.label) : mode.label}</span>
                  <span className="tracing-diff-tag">
                    {mode.id === 'uppercase'
                      ? (isMarathi ? 'पातळी १' : 'Lvl 1')
                      : mode.id === 'lowercase'
                      ? (isLocked ? '🔒' : (isMarathi ? 'पातळी २' : 'Lvl 2'))
                      : (isLocked ? '🔒' : (isMarathi ? 'पातळी ३' : 'Lvl 3'))}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Stars, Points & Sound Controls */}
          <div className="tracing-header-right">
            <StudentSwitcher compact={true} onOpenDashboard={onToggleDashboard} />
            <div className="tracing-score-pill" title={isMarathi ? "मिळालेले गुण" : "Earned Points"}>
              <Award size={18} />
              <span>{score} {isMarathi ? 'गुण' : 'pts'}</span>
            </div>

            <div className="tracing-stars-pill" title={isMarathi ? "मिळालेले तारे" : "Total Stars"}>
              <Star size={20} className="star-icon-glow" />
              <span>{totalStars}</span>
            </div>

            <button
              className="tracing-sound-btn"
              onClick={toggleSound}
              title={soundEnabled ? (isMarathi ? 'आवाज बंद करा' : 'Mute Audio') : (isMarathi ? 'आवाज सुरू करा' : 'Unmute Audio')}
              id="btn-tracing-sound"
            >
              {soundEnabled ? <Volume2 size={22} /> : <VolumeX size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Level Lock Alert Toast */}
      {lockToast && (
        <div className="tracing-lock-toast">
          <Lock size={18} className="tracing-lock-toast-icon" />
          <span>{lockToast}</span>
        </div>
      )}

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
                {isMarathi ? (currentItem.wordMr || currentItem.word) : currentItem.word} <span>{currentItem.icon}</span>
              </h2>
              <p className="tracing-word-subtitle">
                {isMarathi
                  ? `तुमच्या बोटाने किंवा माऊसने ${activeMode === 'numbers' ? 'अंक' : 'अक्षर'} गिरवा!`
                  : `Trace the ${activeMode === 'numbers' ? 'number' : 'letter'} with your finger or mouse!`}
              </p>
            </div>
          </div>

          <div className="tracing-char-actions">
            <button className="btn-listen" onClick={handleListen} id="btn-tracing-listen">
              <Volume2 size={24} />
              <span>{isMarathi ? 'ऐका' : 'Listen'}</span>
            </button>

            <div className="tracing-progress-pill" title={isMarathi ? "गिरवण्याची प्रगती" : "Tracing Progress"}>
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
            <span className="tracing-palette-label">{isMarathi ? 'रंग:' : 'Color:'}</span>
            {BRUSH_COLORS.map((c) => (
              <button
                key={c.hex}
                className={`tracing-color-swatch ${brushColor === c.hex ? 'active' : ''}`}
                style={{ backgroundColor: c.hex }}
                onClick={() => {
                  tracingSounds.playTap();
                  setBrushColor(c.hex);
                }}
                title={isMarathi ? c.nameMr : c.name}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="tracing-actions-bar">
            <button
              className="tracing-action-btn secondary"
              onClick={handlePrev}
              title={isMarathi ? "मागील" : "Previous Character"}
              id="btn-tracing-prev"
            >
              <ChevronLeft size={22} />
              <span>{isMarathi ? 'मागील' : 'Prev'}</span>
            </button>

            <button
              className="tracing-action-btn secondary"
              onClick={handleClear}
              title={isMarathi ? "कॅनव्हास स्वच्छ करा" : "Clear Canvas"}
              id="btn-tracing-clear"
            >
              <Trash2 size={20} />
              <span>{isMarathi ? 'पुसा' : 'Clear'}</span>
            </button>

            <button
              className="tracing-action-btn secondary"
              onClick={handleReplay}
              title={isMarathi ? "पुन्हा ऐका" : "Replay & Listen"}
              id="btn-tracing-replay"
            >
              <RotateCcw size={20} />
              <span>{isMarathi ? 'पुन्हा' : 'Replay'}</span>
            </button>

            <button
              className="tracing-action-btn primary"
              onClick={handleNext}
              title={isMarathi ? "पुढील" : "Next Character"}
              id="btn-tracing-next"
            >
              <span>{isMarathi ? 'पुढील' : 'Next'}</span>
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
                title={isMarathi ? `${item.char} गिरवा` : `Trace ${item.char}`}
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
            <div className="celebration-trophy-badge">
              {activeMode === 'numbers' ? '👑' : '🏆'}
            </div>
            <h2 className="celebration-title">
              {activeMode === 'numbers'
                ? (isMarathi ? 'ट्रेसिंग मास्टर! 👑' : 'Tracing Master! 👑')
                : (isMarathi ? 'उत्कृष्ट काम! 🏆' : 'Fantastic Tracing!')}
            </h2>
            <div className="celebration-stars-row">
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
            </div>
            <p className="celebration-subtitle">
              {isMarathi ? (
                <>तुम्ही <strong>{currentItem.char}</strong> ({currentItem.wordMr || currentItem.word}) संपूर्णपणे अचूक गिरवले! +२० गुण, +३ तारे!</>
              ) : (
                <>You traced <strong>{currentItem.char}</strong> ({currentItem.word}) completely! +20 Pts, +3 Stars!</>
              )}
            </p>

            {/* Level unlock notice badge */}
            {activeMode === 'uppercase' && (
              <div className="tracing-celebration-badge">
                🎉 {isMarathi ? 'लहान अक्षरे पातळी अनलॉक झाली!' : 'Lowercase Level Unlocked!'} 🔓
              </div>
            )}
            {activeMode === 'lowercase' && (
              <div className="tracing-celebration-badge">
                🌟 {isMarathi ? 'अंक पातळी अनलॉक झाली!' : 'Numbers Level Unlocked!'} 🔓
              </div>
            )}
            {activeMode === 'numbers' && (
              <div className="tracing-celebration-badge success">
                🏆 {isMarathi ? 'सर्व पातळ्या यशस्वीरित्या पूर्ण!' : 'All Levels Successfully Completed!'}
              </div>
            )}

            <div className="celebration-actions">
              {activeMode === 'uppercase' && (
                <button
                  type="button"
                  className="tracing-action-btn next-level"
                  onClick={() => {
                    handleModeChange('lowercase');
                    setIsCompleted(false);
                  }}
                >
                  <span>{isMarathi ? 'लहान अक्षरे पातळी खेळा 🔓 ➡️' : 'Play Lowercase Level 🔓 ➡️'}</span>
                  <ArrowRight size={18} />
                </button>
              )}

              {activeMode === 'lowercase' && (
                <button
                  type="button"
                  className="tracing-action-btn next-level"
                  onClick={() => {
                    handleModeChange('numbers');
                    setIsCompleted(false);
                  }}
                >
                  <span>{isMarathi ? 'अंक पातळी खेळा 🔓 ➡️' : 'Play Numbers Level 🔓 ➡️'}</span>
                  <ArrowRight size={18} />
                </button>
              )}

              <button
                type="button"
                className="tracing-action-btn secondary"
                onClick={handleCelebrationAgain}
              >
                <RotateCcw size={20} />
                <span>{isMarathi ? 'पुन्हा गिरवा' : 'Trace Again'}</span>
              </button>
              <button
                type="button"
                className="tracing-action-btn primary"
                onClick={handleCelebrationNext}
              >
                <span>{isMarathi ? 'पुढील' : 'Next'}</span>
                <ChevronRight size={22} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
