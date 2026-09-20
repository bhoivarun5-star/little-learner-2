import React, { useEffect, useRef } from 'react';

// Little Learner vibrant palette matching the mascot cursor accents
const TRAIL_COLORS = [
  '#FF3B70', // Hot pink / Coral
  '#00A8FF', // Sky blue
  '#70D614', // Lime green
  '#FFC700', // Sunshine yellow
  '#A855F7', // Vivid purple
  '#FF7A00', // Cheerful orange
  '#06D6A0', // Fresh aqua mint
];

export default function CustomCursor() {
  const canvasRef = useRef(null);
  const prevPos = useRef({ x: -100, y: -100 });
  const particles = useRef([]);
  const isRunning = useRef(false);

  useEffect(() => {
    // Touch screen optimization: disable canvas trail on pure touch devices
    const isTouchOnly = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouchOnly) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });

    const updateCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Spawns high-performance colorful dots and star sparkles
    const addParticle = (x, y, isBurst = false) => {
      const color = TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)];
      const baseRadius = isBurst ? Math.random() * 4 + 3 : Math.random() * 3.2 + 2.2;
      const angle = isBurst ? Math.random() * Math.PI * 2 : Math.random() * Math.PI * 2;
      const speed = isBurst ? Math.random() * 4.5 + 1.8 : Math.random() * 0.7 + 0.2;
      const isStar = Math.random() > 0.82;

      particles.current.push({
        x: x + (Math.random() - 0.5) * (isBurst ? 8 : 6),
        y: y + (Math.random() - 0.5) * (isBurst ? 8 : 6),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed + (isBurst ? 0 : 0.35),
        color,
        radius: baseRadius,
        initialRadius: baseRadius,
        alpha: 1,
        life: isBurst ? 38 + Math.random() * 18 : 24 + Math.random() * 12,
        maxLife: isBurst ? 56 : 36,
        isStar,
        rotation: Math.random() * Math.PI,
        rotationSpeed: (Math.random() - 0.5) * 0.12,
      });

      if (particles.current.length > 200) {
        particles.current.shift();
      }

      startLoop();
    };

    // Draw cute 4-point star sparkle without expensive shadowBlur
    const drawStar = (context, cx, cy, spikes, outerRadius, innerRadius, color, alpha) => {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      context.save();
      context.beginPath();
      context.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        context.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        context.lineTo(x, y);
        rot += step;
      }
      context.lineTo(cx, cy - outerRadius);
      context.closePath();
      context.fillStyle = color;
      context.globalAlpha = alpha;
      context.fill();
      context.restore();
    };

    // Fast 60-120fps render loop: only runs when particles exist
    const renderLoop = () => {
      if (particles.current.length === 0) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        isRunning.current = false;
        return;
      }

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.life -= 1;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.alpha = Math.max(0, p.life / p.maxLife);
        p.radius = p.initialRadius * (p.life / p.maxLife);

        if (p.life <= 0 || p.radius <= 0.2) {
          particles.current.splice(i, 1);
          continue;
        }

        if (p.isStar) {
          drawStar(ctx, p.x, p.y, 4, p.radius * 1.5, p.radius * 0.55, p.color, p.alpha);
        } else {
          // Zero-lag fast 2-step glossy dot (replaces slow shadowBlur)
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fill();

          if (p.radius > 1.8) {
            ctx.beginPath();
            ctx.arc(p.x - p.radius * 0.25, p.y - p.radius * 0.25, p.radius * 0.35, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.globalAlpha = p.alpha * 0.9;
            ctx.fill();
          }
        }
      }

      requestAnimationFrame(renderLoop);
    };

    const startLoop = () => {
      if (!isRunning.current) {
        isRunning.current = true;
        requestAnimationFrame(renderLoop);
      }
    };

    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      const dx = x - prevPos.current.x;
      const dy = y - prevPos.current.y;
      const dist = Math.hypot(dx, dy);

      // Interpolate smooth dotted trail
      if (prevPos.current.x > 0 && dist > 6) {
        const count = Math.min(Math.floor(dist / 8), 5);
        for (let i = 0; i < count; i++) {
          const t = i / count;
          const px = prevPos.current.x + dx * t;
          const py = prevPos.current.y + dy * t;
          addParticle(px + 4, py + 12);
        }
      } else if (dist > 3) {
        addParticle(x + 4, y + 12);
      }

      prevPos.current = { x, y };
    };

    const handleMouseDown = (e) => {
      // Cheerful burst of colorful dots & stars on click!
      for (let i = 0; i < 16; i++) {
        addParticle(e.clientX + 4, e.clientY + 12, true);
      }
    };

    const handleMouseLeave = () => {
      prevPos.current = { x: -100, y: -100 };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="custom-cursor-trail-canvas"
    />
  );
}
