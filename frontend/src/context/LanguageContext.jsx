import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { TRANSLATIONS } from './translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      return localStorage.getItem('ll_language') || 'en';
    } catch (e) {
      return 'en';
    }
  });

  const [availableVoices, setAvailableVoices] = useState([]);

  // Load and cache browser voices
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        setAvailableVoices(voices);
      }
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const setLanguage = useCallback((lang) => {
    const valid = lang === 'mr' ? 'mr' : 'en';
    setLanguageState(valid);
    try {
      localStorage.setItem('ll_language', valid);
    } catch (e) {}
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => {
      const next = prev === 'en' ? 'mr' : 'en';
      try {
        localStorage.setItem('ll_language', next);
      } catch (e) {}
      return next;
    });
  }, []);

  // Translation helper
  const t = useCallback(
    (key, fallback = '') => {
      const dict = TRANSLATIONS[language] || TRANSLATIONS.en;
      return dict[key] !== undefined ? dict[key] : fallback || key;
    },
    [language]
  );

  // Smart speech synthesis supporting English & Marathi
  const speak = useCallback(
    (textInput, options = {}) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

      try {
        window.speechSynthesis.cancel(); // Stop any overlapping speech

        let textToSpeak = '';
        if (typeof textInput === 'string') {
          textToSpeak = textInput;
        } else if (textInput && typeof textInput === 'object') {
          textToSpeak = textInput[language] || textInput.en || '';
        }

        if (!textToSpeak.trim()) return;

        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        const currentLang = options.lang || language;

        if (currentLang === 'mr') {
          utterance.lang = 'mr-IN';

          // Try finding a Marathi voice, or fallback to Indian regional voice
          const mrVoice = availableVoices.find(
            (v) =>
              v.lang === 'mr-IN' ||
              v.lang === 'mr_IN' ||
              /marathi/i.test(v.name)
          );
          const hiVoice = availableVoices.find(
            (v) =>
              v.lang === 'hi-IN' ||
              v.lang === 'hi_IN' ||
              /hindi/i.test(v.name)
          );
          const inVoice = availableVoices.find(
            (v) => /IN/i.test(v.lang)
          );

          if (mrVoice) {
            utterance.voice = mrVoice;
          } else if (hiVoice) {
            utterance.voice = hiVoice;
          } else if (inVoice) {
            utterance.voice = inVoice;
          }
          utterance.rate = 0.85; // Slightly measured pace for young kids in Marathi
          utterance.pitch = 1.15;
        } else {
          utterance.lang = 'en-US';
          const enVoice = availableVoices.find(
            (v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Child') || v.name.includes('Google'))
          );
          if (enVoice) {
            utterance.voice = enVoice;
          }
          utterance.rate = 0.88;
          utterance.pitch = 1.2;
        }

        utterance.volume = options.volume !== undefined ? options.volume : 1.0;
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        console.warn('Speech synthesis error:', e);
      }
    },
    [language, availableVoices]
  );

  const stopSpeech = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const value = {
    language,
    isMarathi: language === 'mr',
    setLanguage,
    toggleLanguage,
    t,
    speak,
    stopSpeech
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export default LanguageContext;
