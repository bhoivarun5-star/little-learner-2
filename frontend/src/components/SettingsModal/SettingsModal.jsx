import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Settings,
  Languages,
  Volume2,
  VolumeX,
  X,
  Check,
  Sparkles,
  UserCheck,
  Shield,
  HelpCircle
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useStudent } from '../../context/StudentContext';
import './SettingsModal.css';

export default function SettingsModal({ isOpen, onClose }) {
  const { language, setLanguage, t, speak } = useLanguage();
  const { activeStudent } = useStudent();

  const [soundEffectsEnabled, setSoundEffectsEnabled] = useState(true);
  const [speechTestPlaying, setSpeechTestPlaying] = useState(false);
  const openTimeRef = useRef(Date.now());
  const isOverlayMouseDownRef = useRef(false);

  useEffect(() => {
    if (isOpen) {
      openTimeRef.current = Date.now();
      isOverlayMouseDownRef.current = false;
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayMouseDown = (e) => {
    if (e.target === e.currentTarget) {
      isOverlayMouseDownRef.current = true;
    }
  };

  const handleOverlayClick = (e) => {
    // Only close if mousedown was also initiated on the backdrop itself and at least 300ms elapsed
    if (Date.now() - openTimeRef.current < 300) {
      isOverlayMouseDownRef.current = false;
      return;
    }
    if (isOverlayMouseDownRef.current && e.target === e.currentTarget) {
      onClose?.();
    }
    isOverlayMouseDownRef.current = false;
  };

  const handleSelectLanguage = (newLang) => {
    setLanguage(newLang);
    // Voice preview in selected language
    if (newLang === 'mr') {
      speak({ mr: 'मराठी भाषा निवडली आहे! खेळा आणि शिका!', en: '' });
    } else {
      speak({ en: 'English language selected! Enjoy learning!', mr: '' });
    }
  };

  const handleTestSpeech = () => {
    setSpeechTestPlaying(true);
    speak({
      en: 'Welcome to Little Learner! Have fun exploring and learning!',
      mr: 'लिटल लर्नरमध्ये तुमचे स्वागत आहे! आनंद घ्या आणि नवनवीन गोष्टी शिका!'
    });
    setTimeout(() => setSpeechTestPlaying(false), 2500);
  };

  return createPortal(
    <div
      className="settings-modal-overlay"
      onMouseDown={handleOverlayMouseDown}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="settings-modal-container"
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="settings-modal-header">
          <div className="settings-header-title-wrap">
            <div className="settings-icon-badge">
              <Settings size={22} color="#ffffff" />
            </div>
            <div>
              <h2 className="settings-modal-title">{t('facultySettings', 'Settings')}</h2>
              <p className="settings-modal-subtitle">
                {t('languageSubtext', 'Manage your language, audio and learning preferences')}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="settings-modal-close-btn"
            onClick={onClose}
            title="Close Settings"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="settings-modal-body">
          {/* SECTION 1: LANGUAGE SELECTION */}
          <div className="settings-section-card">
            <div className="settings-section-header">
              <div className="section-title-with-icon">
                <Languages size={18} color="#7c3aed" />
                <span className="section-title-text">{t('languageSetting', 'Display Language')}</span>
              </div>
              <span className="current-lang-pill">
                {language === 'mr' ? 'मराठी चालू आहे 🇮🇳' : 'English Active 🇬🇧'}
              </span>
            </div>

            <div className="language-options-grid">
              {/* Option 1: English */}
              <div
                className={`language-card ${language === 'en' ? 'is-selected' : ''}`}
                onClick={() => handleSelectLanguage('en')}
                role="button"
                tabIndex={0}
              >
                <div className="language-card-top">
                  <div className="lang-flag-circle">🇬🇧</div>
                  <div className="lang-name-wrap">
                    <span className="lang-primary-title">English</span>
                    <span className="lang-secondary-title">UK / International</span>
                  </div>
                  {language === 'en' && (
                    <div className="lang-check-badge">
                      <Check size={13} />
                    </div>
                  )}
                </div>
                <p className="lang-card-detail">
                  English phonics, voice narration, stories, and game menus.
                </p>
              </div>

              {/* Option 2: Marathi */}
              <div
                className={`language-card ${language === 'mr' ? 'is-selected' : ''}`}
                onClick={() => handleSelectLanguage('mr')}
                role="button"
                tabIndex={0}
              >
                <div className="language-card-top">
                  <div className="lang-flag-circle">🇮🇳</div>
                  <div className="lang-name-wrap">
                    <span className="lang-primary-title">मराठी</span>
                    <span className="lang-secondary-title">Marathi Language</span>
                  </div>
                  {language === 'mr' && (
                    <div className="lang-check-badge">
                      <Check size={13} />
                    </div>
                  )}
                </div>
                <p className="lang-card-detail">
                  सर्व खेळ, सूचना, उच्चार आणि शब्द मराठी भाषेत उपलब्ध.
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 2: AUDIO & SPEECH PREFERENCES */}
          <div className="settings-section-card">
            <div className="settings-section-header">
              <div className="section-title-with-icon">
                <Volume2 size={18} color="#0284c7" />
                <span className="section-title-text">{t('voiceNarration', 'Audio & Speech Guide')}</span>
              </div>
            </div>

            <div className="settings-toggle-row">
              <div className="toggle-label-wrap">
                <span className="toggle-main-label">Pronunciation & Voice Guide</span>
                <span className="toggle-sub-label">Reads out prompts and phonics for learners</span>
              </div>
              <button
                type="button"
                className={`test-speech-btn ${speechTestPlaying ? 'playing' : ''}`}
                onClick={handleTestSpeech}
                title="Test Pronunciation"
              >
                <Volume2 size={15} />
                <span>{speechTestPlaying ? 'Playing...' : 'Test Voice 🔊'}</span>
              </button>
            </div>

            <div className="settings-toggle-row" style={{ marginTop: '0.5rem' }}>
              <div className="toggle-label-wrap">
                <span className="toggle-main-label">{t('soundEffects', 'Sound Effects & Chimes')}</span>
                <span className="toggle-sub-label">Stars, level celebrations, and touch chimes</span>
              </div>
              <button
                type="button"
                className={`switch-toggle-btn ${soundEffectsEnabled ? 'on' : 'off'}`}
                onClick={() => setSoundEffectsEnabled(!soundEffectsEnabled)}
              >
                <div className="toggle-knob" />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="settings-modal-footer">
          <div className="footer-status-text">
            <span>💾 Preferences saved automatically</span>
          </div>
          <button type="button" className="settings-done-btn" onClick={onClose}>
            <span>Done</span>
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
