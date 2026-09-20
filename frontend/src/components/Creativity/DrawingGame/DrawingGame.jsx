import React, { useState, useRef, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  Home,
  Volume2,
  VolumeX,
  RotateCcw,
  RotateCw,
  Trash2,
  Download,
  Sparkles,
  Star,
  Paintbrush,
  PaintBucket,
  Eraser,
  Palette,
  FilePlus2,
  CheckCircle2,
  Trophy
} from 'lucide-react';
import { TEMPLATES } from './drawingTemplates';
import { drawingSounds } from './drawingSounds';
import './DrawingGame.css';

// 16 Bright Toddler Colors
const COLOR_PALETTE = [
  { name: 'Red', hex: '#ef4444' },
  { name: 'Pink', hex: '#ec4899' },
  { name: 'Orange', hex: '#f97316' },
  { name: 'Amber', hex: '#f59e0b' },
  { name: 'Yellow', hex: '#facc15' },
  { name: 'Lime', hex: '#84cc16' },
  { name: 'Green', hex: '#10b981' },
  { name: 'Teal', hex: '#14b8a6' },
  { name: 'Cyan', hex: '#06b6d4' },
  { name: 'Sky Blue', hex: '#0ea5e9' },
  { name: 'Royal Blue', hex: '#3b82f6' },
  { name: 'Purple', hex: '#8b5cf6' },
  { name: 'Violet', hex: '#a855f7' },
  { name: 'Rose', hex: '#fb7185' },
  { name: 'Brown', hex: '#854d0e' },
  { name: 'Black', hex: '#1e1b4b' }
];

// 4 Tactile Brush Sizes
const BRUSH_SIZES = [
  { id: 'sm', label: 'Small', size: 8, dot: 8 },
  { id: 'md', label: 'Medium', size: 16, dot: 14 },
  { id: 'lg', label: 'Large', size: 26, dot: 20 },
  { id: 'xl', label: 'Jumbo', size: 40, dot: 28 }
];

export default function DrawingGame({ onHome, onEarnStars }) {
  // Sound
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Active Tool: 'brush' | 'bucket' | 'eraser'
  const [activeTool, setActiveTool] = useState('brush');
  const [activeColor, setActiveColor] = useState('#ef4444');
  const [activeSize, setActiveSize] = useState(BRUSH_SIZES[1]); // Medium 16px

  // Active Template
  const [activeTemplate, setActiveTemplate] = useState(TEMPLATES[0]);

  // Game Stats
  const [stars, setStars] = useState(0);
  const [masterpiecesCount, setMasterpiecesCount] = useState(0);

  // Celebration / Save Modal
  const [savedImageUrl, setSavedImageUrl] = useState(null);

  // Canvas Refs
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });

  // Undo / Redo History Stack (storing Data URLs)
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Sound toggle
  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    drawingSounds.setSoundEnabled(next);
  };

  // Helper to save current canvas state to history
  const pushCanvasState = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL();
    setHistory((prev) => {
      const updated = prev.slice(0, historyIndex + 1);
      if (updated.length >= 25) updated.shift();
      return [...updated, dataUrl];
    });
    setHistoryIndex((prev) => Math.min(prev + 1, 24));
  }, [historyIndex]);

  // Load a template onto the canvas
  const loadTemplate = useCallback((template) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    template.draw(ctx, canvas.width, canvas.height);

    const initialData = canvas.toDataURL();
    setHistory([initialData]);
    setHistoryIndex(0);
  }, []);

  // Initialize Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Set larger internal resolution matching 4:3 aspect ratio (1000 x 750)
    canvas.width = 1000;
    canvas.height = 750;
    loadTemplate(activeTemplate);
  }, [loadTemplate, activeTemplate]);

  // Handle Template Selection
  const handleSelectTemplate = (template) => {
    drawingSounds.playPop();
    setActiveTemplate(template);
    loadTemplate(template);
  };

  // Get pointer coordinates relative to canvas internal resolution
  const getCanvasCoords = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
    const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY) ?? 0;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  // ---------------------------------------------------------------------------
  // Flood Fill / Paint Bucket Algorithm (Fast 32-bit Uint32 Array)
  // ---------------------------------------------------------------------------
  const floodFill = (startX, startY, fillHex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const width = canvas.width;
    const height = canvas.height;

    // Boundary check
    startX = Math.floor(startX);
    startY = Math.floor(startY);
    if (startX < 0 || startX >= width || startY < 0 || startY >= height) return;

    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;

    // Convert fillHex to RGBA
    const r = parseInt(fillHex.slice(1, 3), 16);
    const g = parseInt(fillHex.slice(3, 5), 16);
    const b = parseInt(fillHex.slice(5, 7), 16);
    const a = 255;

    const startIdx = (startY * width + startX) * 4;
    const startR = data[startIdx];
    const startG = data[startIdx + 1];
    const startB = data[startIdx + 2];
    const startA = data[startIdx + 3];

    // Do not fill on black or very dark template lines
    if (startR < 55 && startG < 55 && startB < 55) return;

    // If target color is already fill color, return
    if (
      Math.abs(startR - r) < 15 &&
      Math.abs(startG - g) < 15 &&
      Math.abs(startB - b) < 15 &&
      Math.abs(startA - a) < 15
    ) {
      return;
    }

    const colorMatch = (idx) => {
      const dr = Math.abs(data[idx] - startR);
      const dg = Math.abs(data[idx + 1] - startG);
      const db = Math.abs(data[idx + 2] - startB);
      const da = Math.abs(data[idx + 3] - startA);
      // Tolerance threshold
      return dr + dg + db + da < 55;
    };

    const isLineBorder = (idx) => {
      // Dark outline detection
      return data[idx] < 60 && data[idx + 1] < 60 && data[idx + 2] < 60;
    };

    const pixelQueue = [startX, startY];
    const visited = new Uint8Array(width * height);
    visited[startY * width + startX] = 1;

    while (pixelQueue.length > 0) {
      const cy = pixelQueue.pop();
      const cx = pixelQueue.pop();
      const idx = (cy * width + cx) * 4;

      data[idx] = r;
      data[idx + 1] = g;
      data[idx + 2] = b;
      data[idx + 3] = a;

      const neighbors = [
        [cx + 1, cy],
        [cx - 1, cy],
        [cx, cy + 1],
        [cx, cy - 1]
      ];

      for (let i = 0; i < 4; i++) {
        const nx = neighbors[i][0];
        const ny = neighbors[i][1];
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const nIdxCoord = ny * width + nx;
          if (!visited[nIdxCoord]) {
            visited[nIdxCoord] = 1;
            const nIdx = nIdxCoord * 4;
            if (!isLineBorder(nIdx) && colorMatch(nIdx)) {
              pixelQueue.push(nx, ny);
            }
          }
        }
      }
    }

    ctx.putImageData(imgData, 0, 0);
    drawingSounds.playSplash();
    pushCanvasState();
  };

  // ---------------------------------------------------------------------------
  // Pointer Drawing Events
  // ---------------------------------------------------------------------------
  const handlePointerDown = (e) => {
    e.preventDefault();
    const { x, y } = getCanvasCoords(e);

    // If paint bucket tool is active -> flood fill!
    if (activeTool === 'bucket') {
      floodFill(x, y, activeColor);
      return;
    }

    // Brush or Eraser tool
    isDrawingRef.current = true;
    lastPosRef.current = { x, y };

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.arc(x, y, activeSize.size / 2, 0, Math.PI * 2);
    ctx.fillStyle = activeTool === 'eraser' ? '#ffffff' : activeColor;
    ctx.fill();
  };

  const handlePointerMove = (e) => {
    e.preventDefault();
    if (!isDrawingRef.current || activeTool === 'bucket') return;

    const { x, y } = getCanvasCoords(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    ctx.lineWidth = activeSize.size;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = activeTool === 'eraser' ? '#ffffff' : activeColor;

    ctx.beginPath();
    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
    ctx.lineTo(x, y);
    ctx.stroke();

    lastPosRef.current = { x, y };
  };

  const handlePointerUp = (e) => {
    e.preventDefault();
    if (isDrawingRef.current) {
      isDrawingRef.current = false;
      pushCanvasState();
    }
  };

  // ---------------------------------------------------------------------------
  // Undo & Redo Actions
  // ---------------------------------------------------------------------------
  const handleUndo = () => {
    if (historyIndex <= 0) return;
    drawingSounds.playWhoosh();
    const newIdx = historyIndex - 1;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = history[newIdx];
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      setHistoryIndex(newIdx);
    };
  };

  const handleRedo = () => {
    if (historyIndex >= history.length - 1) return;
    drawingSounds.playWhoosh();
    const newIdx = historyIndex + 1;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = history[newIdx];
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      setHistoryIndex(newIdx);
    };
  };

  // Clear Canvas
  const handleClear = () => {
    drawingSounds.playSparkle();
    loadTemplate(activeTemplate);
  };

  // Save / Download Artwork
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    drawingSounds.playSuccessFanfare();
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 }
    });

    const dataUrl = canvas.toDataURL('image/png');
    setSavedImageUrl(dataUrl);

    // Trigger download anchor
    const link = document.createElement('a');
    link.download = `Little-Learner-${activeTemplate.name.replace(/\s+/g, '-')}.png`;
    link.href = dataUrl;
    link.click();

    setStars((s) => s + 3);
    setMasterpiecesCount((m) => m + 1);
    onEarnStars?.(3);
  };

  // Start Fresh New Drawing
  const handleStartNew = () => {
    drawingSounds.playPop();
    setActiveTemplate(TEMPLATES[0]);
    loadTemplate(TEMPLATES[0]);
  };

  return (
    <div className="drawing-game-viewport">
      {/* Floating Clouds Backdrop */}
      <div className="drawing-clouds-backdrop">
        <div className="drawing-cloud c1" />
        <div className="drawing-cloud c2" />
      </div>

      {/* 1. HUD Top Navigation Bar */}
      <header className="drawing-hud-header">
        <div className="drawing-hud-inner">
          {/* Left: Home Button and Game Title */}
          <div className="drawing-hud-left">
            <button
              type="button"
              className="drawing-btn-home"
              onClick={onHome}
              title="Back to Home"
            >
              <Home size={18} />
              <span>Home</span>
            </button>

            <div className="drawing-title-group">
              <h1 className="drawing-main-title">
                <span>Drawing Game</span>
                <Sparkles size={20} color="#f59e0b" />
              </h1>
              <span className="drawing-sub-title">Ages 3–6 • Draw & Color Freely!</span>
            </div>
          </div>

          {/* Right: Stars, Save, New Drawing, Sound */}
          <div className="drawing-hud-right">
            <div className="drawing-score-badge" title="Stars Collected">
              <Star size={18} fill="#f59e0b" color="#f59e0b" />
              <span>{stars} Stars</span>
            </div>

            <div
              className="drawing-score-badge"
              style={{ background: '#ede9fe', color: '#6d28d9', borderColor: '#ddd6fe' }}
              title="Artworks Created"
            >
              <Trophy size={18} color="#7c3aed" />
              <span>{masterpiecesCount} Art</span>
            </div>

            {/* Save / Download Button */}
            <button
              type="button"
              className="drawing-btn-hud-action download"
              onClick={handleDownload}
              title="Save & Download My Drawing"
            >
              <Download size={18} />
              <span>Save Picture</span>
            </button>

            {/* New Blank Sheet Button */}
            <button
              type="button"
              className="drawing-btn-hud-action new-sheet"
              onClick={handleStartNew}
              title="Start a Fresh New Drawing"
            >
              <FilePlus2 size={18} />
              <span>New</span>
            </button>

            {/* Sound Toggle */}
            <button
              type="button"
              className="drawing-icon-circle-btn"
              onClick={handleToggleSound}
              title={soundEnabled ? 'Mute Audio' : 'Unmute Audio'}
            >
              {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} color="#ef4444" />}
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Studio Canvas Arena */}
      <main className="drawing-studio-container">
        <div className="drawing-stage-grid">
          {/* Left Panel: Tools & Brush Sizes & Undo/Redo */}
          <aside className="drawing-tool-card">
            {/* Mode Tools */}
            <div className="tool-section-group">
              <span className="tool-section-label">Tools</span>

              {/* Brush */}
              <button
                type="button"
                className={`drawing-mode-btn ${activeTool === 'brush' ? 'is-active' : ''}`}
                style={{
                  '--tool-theme-bg': '#ede9fe',
                  '--tool-theme-color': '#7c3aed'
                }}
                onClick={() => {
                  drawingSounds.playPop();
                  setActiveTool('brush');
                }}
                title="Paint Brush"
              >
                <Paintbrush size={22} />
                <span>Brush</span>
              </button>

              {/* Paint Bucket (Color Fill) */}
              <button
                type="button"
                className={`drawing-mode-btn ${activeTool === 'bucket' ? 'is-active' : ''}`}
                style={{
                  '--tool-theme-bg': '#dbeafe',
                  '--tool-theme-color': '#0284c7'
                }}
                onClick={() => {
                  drawingSounds.playSplash();
                  setActiveTool('bucket');
                }}
                title="Paint Bucket (Color Fill)"
              >
                <PaintBucket size={22} />
                <span>Fill</span>
              </button>

              {/* Eraser */}
              <button
                type="button"
                className={`drawing-mode-btn ${activeTool === 'eraser' ? 'is-active' : ''}`}
                style={{
                  '--tool-theme-bg': '#fee2e2',
                  '--tool-theme-color': '#ef4444'
                }}
                onClick={() => {
                  drawingSounds.playSqueak();
                  setActiveTool('eraser');
                }}
                title="Eraser"
              >
                <Eraser size={22} />
                <span>Eraser</span>
              </button>
            </div>

            {/* Brush Sizes */}
            <div className="tool-section-group">
              <span className="tool-section-label">Size</span>
              <div className="brush-sizes-grid">
                {BRUSH_SIZES.map((bSize) => {
                  const isActive = activeSize.id === bSize.id;
                  return (
                    <button
                      key={bSize.id}
                      type="button"
                      className={`brush-size-btn ${isActive ? 'is-active' : ''}`}
                      onClick={() => {
                        drawingSounds.playPop();
                        setActiveSize(bSize);
                      }}
                      title={`${bSize.label} Brush Size`}
                    >
                      <div
                        className="brush-dot-indicator"
                        style={{
                          width: `${bSize.dot}px`,
                          height: `${bSize.dot}px`,
                          backgroundColor: activeTool === 'eraser' ? '#cbd5e1' : activeColor
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Undo / Redo & Clear */}
            <div className="tool-section-group">
              <span className="tool-section-label">Actions</span>
              <div className="undo-redo-group">
                <button
                  type="button"
                  className="tool-action-btn"
                  onClick={handleUndo}
                  disabled={historyIndex <= 0}
                  title="Undo"
                >
                  <RotateCcw size={18} />
                </button>
                <button
                  type="button"
                  className="tool-action-btn"
                  onClick={handleRedo}
                  disabled={historyIndex >= history.length - 1}
                  title="Redo"
                >
                  <RotateCw size={18} />
                </button>
              </div>

              <button
                type="button"
                className="tool-action-btn clear"
                onClick={handleClear}
                title="Clear Artwork"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </aside>

          {/* Center Panel: The Drawing Canvas */}
          <section className="drawing-easel-card">
            <div className="drawing-canvas-wrapper">
              <canvas
                ref={canvasRef}
                className="drawing-canvas-element"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
              />
            </div>
          </section>

          {/* Right Panel: 16-Color Rainbow Palette */}
          <aside className="drawing-palette-card">
            <span className="palette-header-label">Colors</span>
            <div className="drawing-colors-grid">
              {COLOR_PALETTE.map((c) => {
                const isActive = activeColor === c.hex && activeTool !== 'eraser';
                return (
                  <button
                    key={c.hex}
                    type="button"
                    className={`drawing-color-swatch-btn ${isActive ? 'is-active' : ''}`}
                    style={{ backgroundColor: c.hex }}
                    onClick={() => {
                      drawingSounds.playPop();
                      setActiveColor(c.hex);
                      if (activeTool === 'eraser') {
                        setActiveTool('brush');
                      }
                    }}
                    title={`${c.name} (${c.hex})`}
                  />
                );
              })}
            </div>
          </aside>
        </div>

        {/* 3. Bottom Template Carousel */}
        <div className="drawing-templates-bar">
          <div className="templates-bar-header">
            <div className="templates-bar-title">
              <Palette size={20} color="#7c3aed" />
              <span>Choose a Cute Template to Color</span>
            </div>
            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 700 }}>
              {activeTemplate.name}
            </span>
          </div>

          <div className="templates-scroll-row">
            {TEMPLATES.map((tmpl) => {
              const isActive = activeTemplate.id === tmpl.id;
              return (
                <button
                  key={tmpl.id}
                  type="button"
                  className={`template-card-btn ${isActive ? 'is-active' : ''}`}
                  onClick={() => handleSelectTemplate(tmpl)}
                  title={tmpl.subtitle}
                >
                  <span className="template-card-icon">{tmpl.icon}</span>
                  <span>{tmpl.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </main>

      {/* 4. Celebration / Save Masterpiece Modal */}
      {savedImageUrl && (
        <div
          className="drawing-celebration-overlay"
          onClick={() => setSavedImageUrl(null)}
        >
          <div
            className="drawing-celebration-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="drawing-celebration-stars">
              <span className="drawing-jumping-star">⭐</span>
              <span className="drawing-jumping-star">⭐</span>
              <span className="drawing-jumping-star">⭐</span>
            </div>

            <h2 className="drawing-celebration-title">
              Masterpiece Saved! 🎨
            </h2>

            <p className="drawing-celebration-msg">
              Awesome work! Your picture was saved to your device!
              <br />
              <span style={{ color: '#10b981', fontWeight: 900 }}>
                +3 Stars ⭐ Added to your Learner Profile!
              </span>
            </p>

            <div className="drawing-celebration-preview-thumb">
              <img src={savedImageUrl} alt="Your Little Learner Drawing" />
            </div>

            <div className="drawing-celebration-buttons">
              <button
                type="button"
                className="drawing-btn-celebrate primary"
                onClick={() => setSavedImageUrl(null)}
              >
                <CheckCircle2 size={18} />
                <span>Keep Creating!</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
