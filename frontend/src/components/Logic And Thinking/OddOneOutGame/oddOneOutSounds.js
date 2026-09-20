// Web Audio API tactile sound effects for Odd One Out (Zero synthetic speech)

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  setMuted(val) {
    this.muted = val;
  }

  // Soft wooden bubble pop on tap
  playTap() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(780, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (_) {}
  }

  // Joyful 3-tone arpeggio for correct answer (C5 -> E5 -> G5)
  playCorrect() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.09);

        gain.gain.setValueAtTime(0.001, this.ctx.currentTime + idx * 0.09);
        gain.gain.linearRampToValueAtTime(0.22, this.ctx.currentTime + idx * 0.09 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.09 + 0.22);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.09);
        osc.stop(this.ctx.currentTime + idx * 0.09 + 0.22);
      });
    } catch (_) {}
  }

  // Soft friendly cartoon wobble boing for try again
  playWrong() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(280, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(220, this.ctx.currentTime + 0.12);
      osc.frequency.linearRampToValueAtTime(260, this.ctx.currentTime + 0.22);
      osc.frequency.linearRampToValueAtTime(170, this.ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
    } catch (_) {}
  }

  // Shimmering harp glissando for hint
  playHint() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const freqs = [659.25, 783.99, 987.77, 1174.66, 1318.51];
      freqs.forEach((f, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, this.ctx.currentTime + i * 0.05);

        gain.gain.setValueAtTime(0.12, this.ctx.currentTime + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.05 + 0.18);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + i * 0.05);
        osc.stop(this.ctx.currentTime + i * 0.05 + 0.18);
      });
    } catch (_) {}
  }

  // Brass celebratory victory fanfare (5 notes)
  playVictory() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const fanfare = [
        { f: 523.25, d: 0.12, t: 0 },
        { f: 659.25, d: 0.12, t: 0.14 },
        { f: 783.99, d: 0.12, t: 0.28 },
        { f: 659.25, d: 0.08, t: 0.42 },
        { f: 1046.50, d: 0.45, t: 0.52 }
      ];

      fanfare.forEach((n) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(n.f, this.ctx.currentTime + n.t);

        gain.gain.setValueAtTime(0.001, this.ctx.currentTime + n.t);
        gain.gain.linearRampToValueAtTime(0.24, this.ctx.currentTime + n.t + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + n.t + n.d);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + n.t);
        osc.stop(this.ctx.currentTime + n.t + n.d);
      });
    } catch (_) {}
  }
}

export const oddSounds = new SoundEngine();
