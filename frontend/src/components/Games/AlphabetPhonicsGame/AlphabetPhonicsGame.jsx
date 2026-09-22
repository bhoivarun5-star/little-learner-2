import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Home,
  Volume2,
  VolumeX,
  RotateCcw,
  ArrowRight,
  Sparkles,
  Star,
  CheckCircle2,
  XCircle,
  Trophy
} from 'lucide-react';
import { ALPHABET_DATA } from './alphabetData';
import { sounds } from './soundEffects';
import { useLanguage } from '../../../context/LanguageContext';
import './AlphabetPhonicsGame.css';

export default function AlphabetPhonicsGame({ onHome, onEarnStars }) {
  // Navigation & Mode
  const { language, t, speak } = useLanguage();
  const isMarathi = language === 'mr';

  const [activeMode, setActiveMode] = useState('explorer'); // 'explorer' | 'find' | 'match' | 'sound'
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Stats & Progress
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0); // 0 to 25
  const selectedLetter = ALPHABET_DATA[currentLetterIndex];

  // Feedback Banner
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'wrong', message: string }

  // ---------------------------------------------------------------------------
  // MINI-GAME 1: Find the Letter State
  // ---------------------------------------------------------------------------
  const [findTarget, setFindTarget] = useState(ALPHABET_DATA[0]);
  const [findOptions, setFindOptions] = useState([]);
  const [findPicked, setFindPicked] = useState(null);

  const initFindGame = () => {
    const target = ALPHABET_DATA[Math.floor(Math.random() * ALPHABET_DATA.length)];
    const others = ALPHABET_DATA.filter((item) => item.letter !== target.letter);
    const shuffledOthers = [...others].sort(() => 0.5 - Math.random()).slice(0, 3);
    const options = [target, ...shuffledOthers].sort(() => 0.5 - Math.random());

    setFindTarget(target);
    setFindOptions(options);
    setFindPicked(null);
    setFeedback(null);

    setTimeout(() => {
      speak({
        en: `Can you find the letter ${target.letter}? As in ${target.word}!`,
        mr: `अक्षर ${target.letter} शोधा! उदा. ${target.wordMr || target.word}!`
      });
    }, 200);
  };

  const handleFindChoice = (choice) => {
    if (findPicked) return;
    setFindPicked(choice.letter);

    if (choice.letter === findTarget.letter) {
      sounds.playVictoryChime();
      speak({
        en: `Hooray! That is letter ${choice.letter} for ${choice.word}!`,
        mr: `शाब्बास! ${choice.letter} म्हणजे ${choice.wordMr || choice.word}!`
      });
      confetti({ particleCount: 75, spread: 65, origin: { y: 0.5 } });

      setScore((prev) => prev + 10);
      setStars((prev) => prev + 5);
      onEarnStars?.(5);
      setFeedback({
        type: 'success',
        message: isMarathi
          ? `शाब्बास! ${choice.letter} म्हणजे ${choice.wordMr || choice.word}! ⭐ +५ तारे`
          : `Awesome! ${choice.letter} is for ${choice.word}! ⭐ +5 Stars`
      });

      setTimeout(() => {
        initFindGame();
      }, 2200);
    } else {
      sounds.playWrongBoing();
      speak({
        en: `Oops! That's ${choice.letter}. Try again!`,
        mr: `अरेरे! ते अक्षर ${choice.letter} आहे. पुन्हा प्रयत्न करा!`
      });
      setFeedback({
        type: 'wrong',
        message: isMarathi
          ? `पुन्हा प्रयत्न करा! अक्षर ${findTarget.letter} कुठे आहे?`
          : `Try again! Where is letter ${findTarget.letter}?`
      });
      setTimeout(() => {
        setFindPicked(null);
      }, 1200);
    }
  };

  // ---------------------------------------------------------------------------
  // MINI-GAME 2: Match Letter & Picture State
  // ---------------------------------------------------------------------------
  const [matchSet, setMatchSet] = useState([]);
  const [selectedMatchLetter, setSelectedMatchLetter] = useState(null);
  const [selectedMatchObject, setSelectedMatchObject] = useState(null);
  const [matchedIds, setMatchedIds] = useState([]);

  const initMatchGame = () => {
    const pool = [...ALPHABET_DATA].sort(() => 0.5 - Math.random()).slice(0, 3);
    setMatchSet(pool);
    setSelectedMatchLetter(null);
    setSelectedMatchObject(null);
    setMatchedIds([]);
    setFeedback(null);

    setTimeout(() => {
      speak({
        en: 'Match each letter with its cute picture!',
        mr: 'प्रत्येक अक्षराची त्याच्या चित्राशी जोडी लावा!'
      });
    }, 200);
  };

  const handleMatchLetterClick = (item) => {
    sounds.playPop();
    setSelectedMatchLetter(item);
    speak({
      en: `Letter ${item.letter}`,
      mr: `अक्षर ${item.letter}`
    });

    if (selectedMatchObject) {
      checkMatch(item, selectedMatchObject);
    }
  };

  const handleMatchObjectClick = (item) => {
    sounds.playPop();
    setSelectedMatchObject(item);
    speak({
      en: item.word,
      mr: item.wordMr || item.word
    });

    if (selectedMatchLetter) {
      checkMatch(selectedMatchLetter, item);
    }
  };

  const checkMatch = (letterItem, objectItem) => {
    if (letterItem.letter === objectItem.letter) {
      sounds.playVictoryChime();
      speak({
        en: `Match! ${letterItem.letter} is for ${letterItem.word}!`,
        mr: `जोडी जुळली! ${letterItem.letter} म्हणजे ${letterItem.wordMr || letterItem.word}!`
      });
      const nextMatched = [...matchedIds, letterItem.letter];
      setMatchedIds(nextMatched);
      setSelectedMatchLetter(null);
      setSelectedMatchObject(null);

      setScore((prev) => prev + 10);
      setStars((prev) => prev + 5);
      onEarnStars?.(5);

      if (nextMatched.length === 3) {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
        setFeedback({
          type: 'success',
          message: isMarathi
            ? 'तुम्ही सर्व जोड्या जुळवल्या! खूप छान! ⭐ +१५ तारे'
            : 'You matched them all! Superstar! ⭐ +15 Stars'
        });
        setTimeout(() => {
          initMatchGame();
        }, 2500);
      }
    } else {
      sounds.playWrongBoing();
      speak({
        en: 'Not a match, try again!',
        mr: 'जोडी जुळत नाही, पुन्हा प्रयत्न करा!'
      });
      setTimeout(() => {
        setSelectedMatchLetter(null);
        setSelectedMatchObject(null);
      }, 700);
    }
  };

  // ---------------------------------------------------------------------------
  // MINI-GAME 3: What Sound? State
  // ---------------------------------------------------------------------------
  const [soundTarget, setSoundTarget] = useState(ALPHABET_DATA[0]);
  const [soundChoices, setSoundChoices] = useState([]);
  const [soundPicked, setSoundPicked] = useState(null);

  const initSoundGame = () => {
    const target = ALPHABET_DATA[Math.floor(Math.random() * ALPHABET_DATA.length)];
    const others = ALPHABET_DATA.filter((item) => item.letter !== target.letter);
    const shuffledOthers = [...others].sort(() => 0.5 - Math.random()).slice(0, 3);
    const options = [target, ...shuffledOthers].sort(() => 0.5 - Math.random());

    setSoundTarget(target);
    setSoundChoices(options);
    setSoundPicked(null);
    setFeedback(null);

    setTimeout(() => {
      speak({
        en: `Listen carefully: Which letter makes the sound ${target.phonics}, as in ${target.word}?`,
        mr: `लक्षपूर्वक ऐका: कोणत्या अक्षराचा आवाज ${target.phonics} असा येतो? उदा. ${target.wordMr || target.word}?`
      });
    }, 200);
  };

  const handleSoundChoice = (choice) => {
    if (soundPicked) return;
    setSoundPicked(choice.letter);

    if (choice.letter === soundTarget.letter) {
      sounds.playVictoryChime();
      speak({
        en: `Correct! ${choice.letter} ${choice.phonics}, like ${choice.word}!`,
        mr: `बरोबर! ${choice.letter} चा आवाज ${choice.phonics}, जसे ${choice.wordMr || choice.word}!`
      });
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.5 } });

      setScore((prev) => prev + 10);
      setStars((prev) => prev + 5);
      onEarnStars?.(5);
      setFeedback({
        type: 'success',
        message: isMarathi
          ? `उत्तम ऐकले! ${choice.letter} ${choice.phonicsMr || choice.phonics}! ⭐ +५ तारे`
          : `Great ears! ${choice.letter} ${choice.phonics}! ⭐ +5 Stars`
      });

      setTimeout(() => {
        initSoundGame();
      }, 2300);
    } else {
      sounds.playWrongBoing();
      speak({
        en: 'Not quite! Listen again and find the right letter!',
        mr: 'नाही, पुन्हा ऐका आणि योग्य अक्षर शोधा!'
      });
      setFeedback({
        type: 'wrong',
        message: isMarathi
          ? `लक्षपूर्वक ऐका! कोणत्या अक्षराचा आवाज ${soundTarget.phonics} असा येतो?`
          : `Listen closely! Which letter says ${soundTarget.phonics}?`
      });
      setTimeout(() => {
        setSoundPicked(null);
      }, 1200);
    }
  };

  // Switch Mode Lifecycle
  useEffect(() => {
    setFeedback(null);
    if (activeMode === 'find') {
      initFindGame();
    } else if (activeMode === 'match') {
      initMatchGame();
    } else if (activeMode === 'sound') {
      initSoundGame();
    } else if (activeMode === 'explorer') {
      // Announce initial letter
      speak({
        en: `${selectedLetter.letter} says ${selectedLetter.phonics}, as in ${selectedLetter.word}!`,
        mr: `${selectedLetter.letter} चा आवाज ${selectedLetter.phonics}, जसे ${selectedLetter.wordMr || selectedLetter.word}!`
      });
    }
  }, [activeMode]);

  // A–Z Explorer Actions
  const handleSelectLetter = (index) => {
    setCurrentLetterIndex(index);
    sounds.playPop();
    const item = ALPHABET_DATA[index];
    speak({
      en: `${item.letter} says ${item.phonics}, as in ${item.word}!`,
      mr: `${item.letter} चा आवाज ${item.phonics}, जसे ${item.wordMr || item.word}!`
    });
  };

  const handleListenSound = () => {
    speak({
      en: `${selectedLetter.letter} says ${selectedLetter.phonics}, as in ${selectedLetter.word}!`,
      mr: `${selectedLetter.letter} चा आवाज ${selectedLetter.phonics}, जसे ${selectedLetter.wordMr || selectedLetter.word}!`
    });
  };

  const handleNext = () => {
    sounds.playPop();
    if (activeMode === 'explorer') {
      const nextIndex = (currentLetterIndex + 1) % ALPHABET_DATA.length;
      setCurrentLetterIndex(nextIndex);
      const nextItem = ALPHABET_DATA[nextIndex];
      speak({
        en: `${nextItem.letter} says ${nextItem.phonics}, as in ${nextItem.word}!`,
        mr: `${nextItem.letter} चा आवाज ${nextItem.phonics}, जसे ${nextItem.wordMr || nextItem.word}!`
      });
    } else if (activeMode === 'find') {
      initFindGame();
    } else if (activeMode === 'match') {
      initMatchGame();
    } else if (activeMode === 'sound') {
      initSoundGame();
    }
  };

  const handleReplay = () => {
    sounds.playPop();
    if (activeMode === 'explorer') {
      speak({
        en: `${selectedLetter.letter} says ${selectedLetter.phonics}, as in ${selectedLetter.word}!`,
        mr: `${selectedLetter.letter} चा आवाज ${selectedLetter.phonics}, जसे ${selectedLetter.wordMr || selectedLetter.word}!`
      });
    } else if (activeMode === 'find') {
      speak({
        en: `Can you find the letter ${findTarget.letter}? As in ${findTarget.word}!`,
        mr: `अक्षर ${findTarget.letter} शोधा! उदा. ${findTarget.wordMr || findTarget.word}!`
      });
    } else if (activeMode === 'match') {
      speak({
        en: 'Match each letter with its cute picture!',
        mr: 'प्रत्येक अक्षराची त्याच्या चित्राशी जोडी लावा!'
      });
    } else if (activeMode === 'sound') {
      speak({
        en: `Listen carefully: Which letter makes the sound ${soundTarget.phonics}, as in ${soundTarget.word}?`,
        mr: `लक्षपूर्वक ऐका: कोणत्या अक्षराचा आवाज ${soundTarget.phonics} असा येतो? उदा. ${soundTarget.wordMr || soundTarget.word}?`
      });
    }
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.setSoundEnabled(next);
  };

  // Progress percentage
  const progressPercent =
    activeMode === 'explorer'
      ? Math.round(((currentLetterIndex + 1) / ALPHABET_DATA.length) * 100)
      : Math.min(100, Math.round((score / 100) * 100));

  return (
    <div className="phonics-game-fullscreen-container">
      {/* 1. Game Top Header HUD - Full Width & Fixed */}
      <header className="phonics-game-hud">
        <div className="hud-inner-container">
          {/* Left: Home Button & Game Title */}
          <div className="hud-left-group">
            <button
              type="button"
              className="hud-btn-home"
              onClick={onHome}
              title={isMarathi ? 'मुख्यपृष्ठावर परत जा' : 'Return to Home'}
            >
              <Home size={20} />
              <span>{isMarathi ? 'मुख्यपृष्ठ' : 'Home'}</span>
            </button>

            <div className="hud-game-title-group">
              <h1 className="hud-game-title">
                <span>{isMarathi ? 'अक्षर आणि फोनिक्स' : 'Alphabet & Phonics'}</span>
                <Sparkles size={18} color="#f59e0b" />
              </h1>
              <span className="hud-game-subtitle">
                {isMarathi ? 'अक्षरांचे आवाज शिका आणि खेळ खेळा!' : 'Learn letter sounds & play games!'}
              </span>
            </div>
          </div>

          {/* Center: Visual Progress Bar */}
          <div className="hud-progress-group">
            <span className="hud-progress-label">
              {activeMode === 'explorer'
                ? (isMarathi ? `अक्षर ${currentLetterIndex + 1} / २६` : `Letter ${currentLetterIndex + 1} of 26`)
                : (isMarathi ? `गुण: ${score}` : `Score: ${score} pts`)}
            </span>
            <div className="hud-progress-track">
              <div className="hud-progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>

          {/* Right: Stars, Sound, Replay, Next */}
          <div className="hud-right-group">
            <div className="hud-pill-badge stars" title={isMarathi ? 'मिळालेले तारे!' : 'Stars collected!'}>
              <Star size={20} fill="#f59e0b" color="#f59e0b" />
              <span>{stars}</span>
            </div>

            <button
              type="button"
              className="hud-icon-btn"
              onClick={handleToggleSound}
              title={soundEnabled ? (isMarathi ? 'आवाज बंद करा' : 'Mute Audio') : (isMarathi ? 'आवाज सुरू करा' : 'Unmute Audio')}
            >
              {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} color="#dc2626" />}
            </button>

            <button
              type="button"
              className="hud-btn-nav replay"
              onClick={handleReplay}
              title={isMarathi ? 'पुन्हा ऐका' : 'Replay Sound'}
            >
              <RotateCcw size={18} />
              <span>{isMarathi ? 'पुन्हा ऐका' : 'Replay'}</span>
            </button>

            <button
              type="button"
              className="hud-btn-nav next"
              onClick={handleNext}
              title={isMarathi ? 'पुढे' : 'Next'}
            >
              <span>{isMarathi ? 'पुढे' : 'Next'}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Mini-Games Mode Selector Bar */}
      <nav className="phonics-mode-bar">
        <button
          type="button"
          className={`mode-pill-btn ${activeMode === 'explorer' ? 'is-active' : ''}`}
          onClick={() => setActiveMode('explorer')}
        >
          <span>🔤 {isMarathi ? 'A–Z एक्सप्लोरर' : 'A–Z Explorer'}</span>
        </button>

        <button
          type="button"
          className={`mode-pill-btn ${activeMode === 'find' ? 'is-active' : ''}`}
          onClick={() => setActiveMode('find')}
        >
          <span>🎯 {isMarathi ? 'अक्षर शोधा' : 'Find the Letter'}</span>
        </button>

        <button
          type="button"
          className={`mode-pill-btn ${activeMode === 'match' ? 'is-active' : ''}`}
          onClick={() => setActiveMode('match')}
        >
          <span>🧩 {isMarathi ? 'अक्षर आणि चित्रांची जोडी' : 'Match Letter & Picture'}</span>
        </button>

        <button
          type="button"
          className={`mode-pill-btn ${activeMode === 'sound' ? 'is-active' : ''}`}
          onClick={() => setActiveMode('sound')}
        >
          <span>🔊 {isMarathi ? 'कोणता आवाज?' : 'What Sound?'}</span>
        </button>
      </nav>

      {/* Feedback Banner if active */}
      {feedback && (
        <div className={`game-feedback-pill ${feedback.type}`}>
          {feedback.type === 'success' ? <CheckCircle2 size={26} /> : <XCircle size={26} />}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* 3. Main Play Area */}
      <main className="phonics-game-canvas">
        {/* ==================================================================
            MODE 1: A–Z EXPLORER
            ================================================================== */}
        {activeMode === 'explorer' && (
          <div className="explorer-layout">
            {/* Left: 26 A–Z Letter Cards */}
            <div className="az-cards-grid">
              {ALPHABET_DATA.map((item, idx) => {
                const isSelected = idx === currentLetterIndex;
                return (
                  <div
                    key={item.letter}
                    className={`az-letter-card ${isSelected ? 'is-active' : ''}`}
                    style={{
                      borderColor: isSelected ? item.color : item.borderColor,
                      backgroundColor: isSelected ? item.bg : '#ffffff'
                    }}
                    onClick={() => handleSelectLetter(idx)}
                  >
                    <div className="az-card-letters" style={{ color: item.color }}>
                      <span className="az-card-upper">{item.letter}</span>
                      <span className="az-card-lower">{item.lower}</span>
                    </div>
                    <span className="az-card-emoji">{item.emoji}</span>
                  </div>
                );
              })}
            </div>

            {/* Right: Large Spotlight Letter Card */}
            <div className="az-spotlight-card">
              {/* Cute Picture */}
              <div
                className="spotlight-illustration-hero"
                style={{ backgroundColor: selectedLetter.bg }}
              >
                <span>{selectedLetter.emoji}</span>
              </div>

              {/* Uppercase + Lowercase */}
              <div className="spotlight-letter-heading" style={{ color: selectedLetter.color }}>
                <span className="spotlight-upper-letter">{selectedLetter.letter}</span>
                <span className="spotlight-lower-letter">{selectedLetter.lower}</span>
              </div>

              {/* Word & Phonics Tag */}
              <div className="spotlight-word-badge">
                <span className="spotlight-word-name">
                  {isMarathi ? selectedLetter.wordMr : selectedLetter.word}
                </span>
                <span className="spotlight-phonics-sound-tag">
                  {isMarathi ? (selectedLetter.phonicsMr || selectedLetter.phonics) : selectedLetter.phonics}
                </span>
              </div>

              {/* Sentence */}
              <p className="spotlight-phonics-desc">
                "{selectedLetter.letter} {isMarathi ? (selectedLetter.phonicsMr || selectedLetter.phonics) : selectedLetter.phonics}, {isMarathi ? `उदा. ${selectedLetter.wordMr} (${selectedLetter.word})` : `as in ${selectedLetter.word}`}!"
              </p>

              {/* Large 🔊 Listen Button */}
              <button
                type="button"
                className="btn-large-listen"
                onClick={handleListenSound}
              >
                <Volume2 size={28} />
                <span>🔊 {isMarathi ? 'ऐका' : 'Listen'}</span>
              </button>
            </div>
          </div>
        )}

        {/* ==================================================================
            MODE 2: FIND THE LETTER
            ================================================================== */}
        {activeMode === 'find' && (
          <div className="minigame-center-box">
            <div className="minigame-prompt-card">
              <h2 className="minigame-prompt-title">
                {isMarathi ? (
                  <>तुम्ही अक्षर <span style={{ color: findTarget.color }}>"{findTarget.letter}"</span> शोधू शकता का?</>
                ) : (
                  <>Can you find the letter <span style={{ color: findTarget.color }}>"{findTarget.letter}"</span>?</>
                )}
              </h2>
              <p className="minigame-prompt-sub">
                {isMarathi ? (
                  <>या {findTarget.emoji} <strong>{findTarget.wordMr || findTarget.word}</strong> ने सुरू होणारे अक्षर शोधा!</>
                ) : (
                  <>Look for the letter that starts {findTarget.emoji} <strong>{findTarget.word}</strong>!</>
                )}
              </p>
            </div>

            <div className="minigame-options-grid">
              {findOptions.map((choice) => {
                const isPicked = findPicked === choice.letter;
                const isCorrect = isPicked && choice.letter === findTarget.letter;
                const isWrong = isPicked && choice.letter !== findTarget.letter;

                return (
                  <button
                    key={choice.letter}
                    type="button"
                    className={`minigame-option-btn ${isCorrect ? 'is-correct' : ''} ${isWrong ? 'is-wrong' : ''}`}
                    onClick={() => handleFindChoice(choice)}
                  >
                    <span className="option-big-letter" style={{ color: choice.color }}>
                      {choice.letter} {choice.lower}
                    </span>
                    <span className="option-emoji">{choice.emoji}</span>
                    <span className="option-word">
                      {isMarathi ? choice.wordMr : choice.word}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================================================================
            MODE 3: MATCH LETTER & PICTURE
            ================================================================== */}
        {activeMode === 'match' && (
          <div className="minigame-center-box">
            <div className="minigame-prompt-card">
              <h2 className="minigame-prompt-title">
                {isMarathi ? 'अक्षर आणि चित्रांची जोडी 🧩' : 'Match Letter & Picture'}
              </h2>
              <p className="minigame-prompt-sub">
                {isMarathi
                  ? 'आधी अक्षरावर टॅप करा, मग जुळणाऱ्या चित्रावर टॅप करा!'
                  : 'Tap a letter, then tap the matching picture!'}
              </p>
            </div>

            <div className="match-columns-container">
              {/* Left Column: Letters */}
              <div className="match-column">
                {matchSet.map((item) => {
                  const isMatched = matchedIds.includes(item.letter);
                  const isSelected = selectedMatchLetter?.letter === item.letter;
                  return (
                    <button
                      key={item.letter}
                      type="button"
                      className={`match-item-btn ${isSelected ? 'is-selected' : ''} ${isMatched ? 'is-matched' : ''}`}
                      onClick={() => handleMatchLetterClick(item)}
                    >
                      <span style={{ color: item.color }}>
                        {item.letter} {item.lower}
                      </span>
                      {isMatched && <span>✓</span>}
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Objects */}
              <div className="match-column">
                {matchSet.map((item) => {
                  const isMatched = matchedIds.includes(item.letter);
                  const isSelected = selectedMatchObject?.letter === item.letter;
                  return (
                    <button
                      key={item.letter}
                      type="button"
                      className={`match-item-btn ${isSelected ? 'is-selected' : ''} ${isMatched ? 'is-matched' : ''}`}
                      onClick={() => handleMatchObjectClick(item)}
                    >
                      <span>{item.emoji}</span>
                      <span>{isMarathi ? item.wordMr : item.word}</span>
                      {isMatched && <span>✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            MODE 4: WHAT SOUND?
            ================================================================== */}
        {activeMode === 'sound' && (
          <div className="minigame-center-box">
            <div className="minigame-prompt-card">
              <button
                type="button"
                className="btn-large-listen"
                style={{ width: 'auto', padding: '0.9rem 2.25rem' }}
                onClick={() => {
                  speak({
                    en: `Listen closely: Which letter says ${soundTarget.phonics}, as in ${soundTarget.word}?`,
                    mr: `लक्षपूर्वक ऐका: कोणत्या अक्षराचा आवाज ${soundTarget.phonics} असा येतो? उदा. ${soundTarget.wordMr || soundTarget.word}?`
                  });
                }}
              >
                <Volume2 size={28} />
                <span>🔊 {isMarathi ? 'आवाज पुन्हा ऐका' : 'Hear Sound Again'}</span>
              </button>

              <h2 className="minigame-prompt-title" style={{ marginTop: '0.5rem' }}>
                {isMarathi ? (
                  <>कोणत्या अक्षराचा आवाज <span style={{ color: soundTarget.color }}>"{soundTarget.phonics}"</span> असा येतो?</>
                ) : (
                  <>Which letter makes the sound <span style={{ color: soundTarget.color }}>"{soundTarget.phonics}"</span>?</>
                )}
              </h2>
              <p className="minigame-prompt-sub">
                {isMarathi
                  ? 'हा आवाज काढणाऱ्या अक्षरावर टॅप करा!'
                  : 'Tap the letter that makes this sound!'}
              </p>
            </div>

            <div className="minigame-options-grid">
              {soundChoices.map((choice) => {
                const isPicked = soundPicked === choice.letter;
                const isCorrect = isPicked && choice.letter === soundTarget.letter;
                const isWrong = isPicked && choice.letter !== soundTarget.letter;

                return (
                  <button
                    key={choice.letter}
                    type="button"
                    className={`minigame-option-btn ${isCorrect ? 'is-correct' : ''} ${isWrong ? 'is-wrong' : ''}`}
                    onClick={() => handleSoundChoice(choice)}
                  >
                    <span className="option-big-letter" style={{ color: choice.color }}>
                      {choice.letter}
                    </span>
                    <span className="option-emoji">{choice.emoji}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
