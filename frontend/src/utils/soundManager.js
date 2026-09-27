// Centralized Sound & Audio Manager for Little Learner
// Coordinates global mute state across Web Audio API sound engines and SpeechSynthesis

const STORAGE_KEY = 'little_learner_audio_muted';

class GlobalSoundManager {
  constructor() {
    this.muted = this.readStorage();
    this.listeners = new Set();
  }

  readStorage() {
    if (typeof window === 'undefined') return false;
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true';
    } catch (_) {
      return false;
    }
  }

  isMuted() {
    return this.muted;
  }

  isSoundEnabled() {
    return !this.muted;
  }

  setMuted(shouldMute) {
    const val = Boolean(shouldMute);
    this.muted = val;
    try {
      localStorage.setItem(STORAGE_KEY, val ? 'true' : 'false');
    } catch (_) {}

    // Immediately stop any currently playing or queued speech
    if (val && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    // Notify all listeners
    this.listeners.forEach((listener) => {
      try {
        listener(val);
      } catch (err) {
        console.warn('Sound listener error:', err);
      }
    });

    // Dispatch global DOM event for any standalone sound classes
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('little_learner_audio_mute_change', { detail: { isMuted: val } }));
    }

    return this.muted;
  }

  toggleMute() {
    return this.setMuted(!this.muted);
  }

  subscribe(listener) {
    this.listeners.add(listener);
    // Fire immediately with current state
    listener(this.muted);
    return () => {
      this.listeners.delete(listener);
    };
  }
}

export const soundManager = new GlobalSoundManager();
export const isAudioMuted = () => soundManager.isMuted();
export const isSoundEnabled = () => soundManager.isSoundEnabled();
export const setAudioMuted = (muted) => soundManager.setMuted(muted);
export const toggleAudioMute = () => soundManager.toggleMute();
export default soundManager;
