// Pure Tap Sound System for Kids Drawing Game
// Only a gentle, clean tap sound is played on interaction. All voice/narration and extraneous audio removed.

class DrawingSoundSystem {
  constructor() {
    this.audioCtx = null;
    this.soundEnabled = true;
  }

  getAudioContext() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  setSoundEnabled(enabled) {
    this.soundEnabled = enabled;
  }

  // Gentle, crisp tap sound for buttons, color swatches, brush sizes, and templates
  playTap() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(780, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // ignore audio context errors
    }
  }

  // Compatibility aliases all mapped to playTap or silent
  playPop() {
    this.playTap();
  }

  playSplash() {
    this.playTap();
  }

  playSqueak() {
    // Silent for drawing/erasing to keep drawing quiet
  }

  playWhoosh() {
    this.playTap();
  }

  playSparkle() {
    this.playTap();
  }

  playSuccessFanfare() {
    this.playTap();
  }

  speak(_text) {
    // Voice audio completely removed as requested
  }
}

export const drawingSounds = new DrawingSoundSystem();
