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
import { NUMBERS_DATA } from './numbersData';
import { numberSounds } from './soundEffects';
import './NumbersCountingGame.css';

export default function NumbersCountingGame({ onHome, onEarnStars }) {
  // Navigation & Mode
  const [activeMode, setActiveMode] = useState('explorer'); // 'explorer' | 'count' | 'find' | 'match' | 'order'
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Stats & Progress
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState(0);
  const [currentNumberIndex, setCurrentNumberIndex] = useState(0); // 0 to 19 (for 1 to 20)
  const currentItem = NUMBERS_DATA[currentNumberIndex];

  // Feedback Banner
  const [feedback, setFeedback] = useState(null);

  // ---------------------------------------------------------------------------
  // MINI-GAME 1: Count & Choose
  // ---------------------------------------------------------------------------
  const [countTarget, setCountTarget] = useState(NUMBERS_DATA[4]); // default 5
  const [countOptions, setCountOptions] = useState([]);
  const [countPicked, setCountPicked] = useState(null);

  const initCountGame = () => {
    // Pick numbers 1 through 10 for friendly counting
    const pool = NUMBERS_DATA.slice(0, 10);
    const target = pool[Math.floor(Math.random() * pool.length)];
    const others = pool.filter((item) => item.number !== target.number);
    const shuffledOthers = [...others].sort(() => 0.5 - Math.random()).slice(0, 3);
    const options = [target, ...shuffledOthers].sort(() => 0.5 - Math.random());

    setCountTarget(target);
    setCountOptions(options);
    setCountPicked(null);
    setFeedback(null);

    setTimeout(() => {
      numberSounds.speak(`How many ${target.itemPlural} do you see? Count them and choose the right number!`);
    }, 250);
  };

  const handleCountChoice = (choice) => {
    if (countPicked) return;
    setCountPicked(choice.number);

    if (choice.number === countTarget.number) {
      numberSounds.playVictoryChime();
      numberSounds.speak(`Great counting! That is ${choice.number} ${countTarget.itemPlural}!`);
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.5 } });

      setScore((prev) => prev + 10);
      setStars((prev) => prev + 5);
      onEarnStars?.(5);
      setFeedback({ type: 'success', message: `Super! You counted ${choice.number} ${countTarget.itemPlural}! ⭐ +5 Stars` });

      setTimeout(() => {
        initCountGame();
      }, 2300);
    } else {
      numberSounds.playWrongBoing();
      numberSounds.speak(`Oops, not ${choice.number}. Try counting them again!`);
      setFeedback({ type: 'wrong', message: `Count carefully! Tap each item to count.` });
      setTimeout(() => {
        setCountPicked(null);
      }, 1200);
    }
  };

  // ---------------------------------------------------------------------------
  // MINI-GAME 2: Find the Number
  // ---------------------------------------------------------------------------
  const [findTarget, setFindTarget] = useState(NUMBERS_DATA[0]);
  const [findOptions, setFindOptions] = useState([]);
  const [findPicked, setFindPicked] = useState(null);

  const initFindGame = () => {
    const target = NUMBERS_DATA[Math.floor(Math.random() * NUMBERS_DATA.length)];
    const others = NUMBERS_DATA.filter((item) => item.number !== target.number);
    const shuffledOthers = [...others].sort(() => 0.5 - Math.random()).slice(0, 3);
    const options = [target, ...shuffledOthers].sort(() => 0.5 - Math.random());

    setFindTarget(target);
    setFindOptions(options);
    setFindPicked(null);
    setFeedback(null);

    setTimeout(() => {
      numberSounds.speak(`Can you find the number ${target.number}? ${target.word}!`);
    }, 200);
  };

  const handleFindChoice = (choice) => {
    if (findPicked) return;
    setFindPicked(choice.number);

    if (choice.number === findTarget.number) {
      numberSounds.playVictoryChime();
      numberSounds.speak(`Awesome! That is number ${choice.number}!`);
      confetti({ particleCount: 75, spread: 65, origin: { y: 0.5 } });

      setScore((prev) => prev + 10);
      setStars((prev) => prev + 5);
      onEarnStars?.(5);
      setFeedback({ type: 'success', message: `Hooray! You found number ${choice.number}! ⭐ +5 Stars` });

      setTimeout(() => {
        initFindGame();
      }, 2200);
    } else {
      numberSounds.playWrongBoing();
      numberSounds.speak(`That's number ${choice.number}. Try again to find ${findTarget.number}!`);
      setFeedback({ type: 'wrong', message: `Try again! Where is number ${findTarget.number}?` });
      setTimeout(() => {
        setFindPicked(null);
      }, 1200);
    }
  };

  // ---------------------------------------------------------------------------
  // MINI-GAME 3: Match Number & Objects
  // ---------------------------------------------------------------------------
  const [matchSet, setMatchSet] = useState([]);
  const [selectedMatchNumber, setSelectedMatchNumber] = useState(null);
  const [selectedMatchObject, setSelectedMatchObject] = useState(null);
  const [matchedIds, setMatchedIds] = useState([]);

  const initMatchGame = () => {
    const pool = NUMBERS_DATA.slice(0, 8);
    const selected = [...pool].sort(() => 0.5 - Math.random()).slice(0, 3);
    setMatchSet(selected);
    setSelectedMatchNumber(null);
    setSelectedMatchObject(null);
    setMatchedIds([]);
    setFeedback(null);

    setTimeout(() => {
      numberSounds.speak('Match each number with its correct quantity of objects!');
    }, 200);
  };

  const handleMatchNumberClick = (item) => {
    numberSounds.playPop();
    setSelectedMatchNumber(item);
    numberSounds.speak(`Number ${item.number}`);

    if (selectedMatchObject) {
      checkNumberMatch(item, selectedMatchObject);
    }
  };

  const handleMatchObjectClick = (item) => {
    numberSounds.playPop();
    setSelectedMatchObject(item);
    numberSounds.speak(`${item.number} ${item.itemPlural}`);

    if (selectedMatchNumber) {
      checkNumberMatch(selectedMatchNumber, item);
    }
  };

  const checkNumberMatch = (numberItem, objectItem) => {
    if (numberItem.number === objectItem.number) {
      numberSounds.playVictoryChime();
      numberSounds.speak(`Matched! Number ${numberItem.number} has ${objectItem.number} ${objectItem.itemPlural}!`);
      const nextMatched = [...matchedIds, numberItem.number];
      setMatchedIds(nextMatched);
      setSelectedMatchNumber(null);
      setSelectedMatchObject(null);

      setScore((prev) => prev + 10);
      setStars((prev) => prev + 5);
      onEarnStars?.(5);

      if (nextMatched.length === 3) {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
        setFeedback({ type: 'success', message: 'You matched all the numbers! ⭐ +15 Stars' });
        setTimeout(() => {
          initMatchGame();
        }, 2500);
      }
    } else {
      numberSounds.playWrongBoing();
      numberSounds.speak('Not a match, try again!');
      setTimeout(() => {
        setSelectedMatchNumber(null);
        setSelectedMatchObject(null);
      }, 700);
    }
  };

  // ---------------------------------------------------------------------------
  // MINI-GAME 4: Put in Order (Smallest to Largest)
  // ---------------------------------------------------------------------------
  const [orderGoal, setOrderGoal] = useState([]); // Sorted [2, 4, 7, 9]
  const [orderShuffled, setOrderShuffled] = useState([]);
  const [orderFilled, setOrderFilled] = useState([]);

  const initOrderGame = () => {
    // Pick 4 random unique numbers from 1 to 15
    const pool = NUMBERS_DATA.slice(0, 15);
    const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, 4);
    const sorted = [...shuffled].sort((a, b) => a.number - b.number);

    setOrderGoal(sorted);
    setOrderShuffled(shuffled);
    setOrderFilled([]);
    setFeedback(null);

    setTimeout(() => {
      numberSounds.speak('Put the numbers in order from smallest to largest!');
    }, 200);
  };

  const handleOrderTileClick = (item) => {
    const nextIndex = orderFilled.length;
    const expected = orderGoal[nextIndex];

    if (item.number === expected.number) {
      numberSounds.playPop();
      numberSounds.speak(`${item.number}!`);
      const nextFilled = [...orderFilled, item.number];
      setOrderFilled(nextFilled);

      if (nextFilled.length === orderGoal.length) {
        numberSounds.playVictoryChime();
        numberSounds.speak('Super job! You put all numbers in order!');
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
        setScore((prev) => prev + 15);
        setStars((prev) => prev + 10);
        onEarnStars?.(10);
        setFeedback({ type: 'success', message: 'Perfect order! Smallest to largest! ⭐ +10 Stars' });

        setTimeout(() => {
          initOrderGame();
        }, 2600);
      }
    } else {
      numberSounds.playWrongBoing();
      numberSounds.speak(`Not quite! Look for the smallest available number next.`);
      setFeedback({ type: 'wrong', message: `Which number comes next? Look for the smallest!` });
    }
  };

  // Switch Mode Lifecycle
  useEffect(() => {
    setFeedback(null);
    if (activeMode === 'count') {
      initCountGame();
    } else if (activeMode === 'find') {
      initFindGame();
    } else if (activeMode === 'match') {
      initMatchGame();
    } else if (activeMode === 'order') {
      initOrderGame();
    } else if (activeMode === 'explorer') {
      numberSounds.speak(`Number ${currentItem.number}. ${currentItem.word}. ${currentItem.number} ${currentItem.itemPlural}!`);
    }
  }, [activeMode]);

  // Explorer Actions
  const handleSelectNumber = (index) => {
    setCurrentNumberIndex(index);
    numberSounds.playPop();
    const item = NUMBERS_DATA[index];
    numberSounds.speak(`Number ${item.number}. ${item.word}. ${item.number} ${item.itemPlural}!`);
  };

  const handleListenSound = () => {
    numberSounds.speak(`Number ${currentItem.number}. ${currentItem.word}. ${currentItem.number} ${currentItem.itemPlural}!`);
  };

  const handleTapObject = (idx) => {
    numberSounds.playPop();
    numberSounds.speak(`${idx + 1}`);
  };

  const handleNext = () => {
    numberSounds.playPop();
    if (activeMode === 'explorer') {
      const nextIndex = (currentNumberIndex + 1) % NUMBERS_DATA.length;
      setCurrentNumberIndex(nextIndex);
      const item = NUMBERS_DATA[nextIndex];
      numberSounds.speak(`Number ${item.number}. ${item.word}. ${item.number} ${item.itemPlural}!`);
    } else if (activeMode === 'count') {
      initCountGame();
    } else if (activeMode === 'find') {
      initFindGame();
    } else if (activeMode === 'match') {
      initMatchGame();
    } else if (activeMode === 'order') {
      initOrderGame();
    }
  };

  const handleReplay = () => {
    numberSounds.playPop();
    if (activeMode === 'explorer') {
      numberSounds.speak(`Number ${currentItem.number}. ${currentItem.word}. ${currentItem.number} ${currentItem.itemPlural}!`);
    } else if (activeMode === 'count') {
      numberSounds.speak(`How many ${countTarget.itemPlural} do you see? Count them and choose the right number!`);
    } else if (activeMode === 'find') {
      numberSounds.speak(`Can you find the number ${findTarget.number}? ${findTarget.word}!`);
    } else if (activeMode === 'match') {
      numberSounds.speak('Match each number with its correct quantity of objects!');
    } else if (activeMode === 'order') {
      numberSounds.speak('Put the numbers in order from smallest to largest!');
    }
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    numberSounds.setSoundEnabled(next);
  };

  const progressPercent =
    activeMode === 'explorer'
      ? Math.round(((currentNumberIndex + 1) / NUMBERS_DATA.length) * 100)
      : Math.min(100, Math.round((score / 100) * 100));

  return (
    <div className="numbers-game-fullscreen-container">
      {/* 1. Game Top Header HUD - Full Width & Fixed */}
      <header className="numbers-game-hud">
        <div className="hud-inner-container">
          {/* Left: Home Button & Game Title */}
          <div className="hud-left-group">
            <button
              type="button"
              className="hud-btn-home"
              onClick={onHome}
              title="Return to Home"
            >
              <Home size={20} />
              <span>Home</span>
            </button>

            <div className="hud-game-title-group">
              <h1 className="hud-game-title">
                <span>Numbers & Counting</span>
                <Sparkles size={18} color="#f59e0b" />
              </h1>
              <span className="hud-game-subtitle">Learn 1–20, count objects & have fun!</span>
            </div>
          </div>

          {/* Center: Visual Progress Bar */}
          <div className="hud-progress-group">
            <span className="hud-progress-label">
              {activeMode === 'explorer'
                ? `Number ${currentNumberIndex + 1} of 20`
                : `Score: ${score} pts`}
            </span>
            <div className="hud-progress-track">
              <div className="hud-progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>

          {/* Right: Stars, Sound, Replay, Next */}
          <div className="hud-right-group">
            <div className="hud-pill-badge stars" title="Stars collected!">
              <Star size={20} fill="#f59e0b" color="#f59e0b" />
              <span>{stars}</span>
            </div>

            <button
              type="button"
              className="hud-icon-btn"
              onClick={handleToggleSound}
              title={soundEnabled ? 'Mute Audio' : 'Unmute Audio'}
            >
              {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} color="#dc2626" />}
            </button>

            <button
              type="button"
              className="hud-btn-nav replay"
              onClick={handleReplay}
              title="Replay Sound"
            >
              <RotateCcw size={18} />
              <span>Replay</span>
            </button>

            <button
              type="button"
              className="hud-btn-nav next"
              onClick={handleNext}
              title="Next"
            >
              <span>Next</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Mini-Games Mode Selector Bar */}
      <nav className="numbers-mode-bar">
        <button
          type="button"
          className={`mode-pill-btn ${activeMode === 'explorer' ? 'is-active' : ''}`}
          onClick={() => setActiveMode('explorer')}
        >
          <span>🔢 1–20 Explorer</span>
        </button>

        <button
          type="button"
          className={`mode-pill-btn ${activeMode === 'count' ? 'is-active' : ''}`}
          onClick={() => setActiveMode('count')}
        >
          <span>🧮 Count & Choose</span>
        </button>

        <button
          type="button"
          className={`mode-pill-btn ${activeMode === 'find' ? 'is-active' : ''}`}
          onClick={() => setActiveMode('find')}
        >
          <span>🎯 Find the Number</span>
        </button>

        <button
          type="button"
          className={`mode-pill-btn ${activeMode === 'match' ? 'is-active' : ''}`}
          onClick={() => setActiveMode('match')}
        >
          <span>🧩 Match Number & Objects</span>
        </button>

        <button
          type="button"
          className={`mode-pill-btn ${activeMode === 'order' ? 'is-active' : ''}`}
          onClick={() => setActiveMode('order')}
        >
          <span>🚀 Put in Order</span>
        </button>
      </nav>

      {/* Feedback Banner if active */}
      {feedback && (
        <div className={`numbers-feedback-pill ${feedback.type}`}>
          {feedback.type === 'success' ? <CheckCircle2 size={26} /> : <XCircle size={26} />}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* 3. Main Play Area */}
      <main className="numbers-game-canvas">
        {/* ==================================================================
            MODE 1: 1–20 EXPLORER
            ================================================================== */}
        {activeMode === 'explorer' && (
          <div className="numbers-explorer-layout">
            {/* Left: 20 Number Cards (1–20) */}
            <div className="numbers-cards-grid">
              {NUMBERS_DATA.map((item, idx) => {
                const isSelected = idx === currentNumberIndex;
                return (
                  <div
                    key={item.number}
                    className={`number-card-item ${isSelected ? 'is-active' : ''}`}
                    style={{
                      borderColor: isSelected ? item.color : item.borderColor,
                      backgroundColor: isSelected ? item.bg : '#ffffff'
                    }}
                    onClick={() => handleSelectNumber(idx)}
                  >
                    <span className="number-card-digit" style={{ color: item.color }}>
                      {item.number}
                    </span>
                    <span className="number-card-word">{item.word}</span>
                    <span className="number-card-emoji">{item.emoji}</span>
                  </div>
                );
              })}
            </div>

            {/* Right: Large Spotlight Card */}
            <div className="number-spotlight-card">
              {/* Huge Number */}
              <div className="spotlight-number-hero" style={{ color: currentItem.color }}>
                {currentItem.number}
              </div>

              {/* Word Pill */}
              <div className="spotlight-word-pill">
                <span>{currentItem.word}</span>
              </div>

              {/* Matching Objects (e.g., 5 → 🍎🍎🍎🍎🍎) */}
              <div className="spotlight-objects-tray">
                {Array.from({ length: currentItem.number }).map((_, i) => (
                  <span
                    key={i}
                    className="spotlight-object-item"
                    title={`Tap to count: ${i + 1}`}
                    onClick={() => handleTapObject(i)}
                  >
                    {currentItem.emoji}
                  </span>
                ))}
              </div>

              {/* Counting Phrase */}
              <p className="spotlight-counting-phrase">
                "{currentItem.number} {currentItem.number === 1 ? currentItem.itemName : currentItem.itemPlural}!"
              </p>

              {/* Large 🔊 Listen Button */}
              <button
                type="button"
                className="btn-large-listen-numbers"
                onClick={handleListenSound}
              >
                <Volume2 size={28} />
                <span>🔊 Listen</span>
              </button>
            </div>
          </div>
        )}

        {/* ==================================================================
            MODE 2: COUNT & CHOOSE
            ================================================================== */}
        {activeMode === 'count' && (
          <div className="minigame-center-box">
            <div className="minigame-prompt-card">
              <h2 className="minigame-prompt-title">
                How many {countTarget.itemPlural} are there?
              </h2>
              <p className="minigame-prompt-sub">Tap each item to count, then choose the right number!</p>
            </div>

            {/* Objects Tray */}
            <div className="count-objects-tray">
              {Array.from({ length: countTarget.number }).map((_, i) => (
                <span
                  key={i}
                  className="count-object-item"
                  onClick={() => handleTapObject(i)}
                >
                  {countTarget.emoji}
                </span>
              ))}
            </div>

            {/* 4 Options Grid */}
            <div className="numbers-options-grid">
              {countOptions.map((choice) => {
                const isPicked = countPicked === choice.number;
                const isCorrect = isPicked && choice.number === countTarget.number;
                const isWrong = isPicked && choice.number !== countTarget.number;

                return (
                  <button
                    key={choice.number}
                    type="button"
                    className={`number-option-btn ${isCorrect ? 'is-correct' : ''} ${isWrong ? 'is-wrong' : ''}`}
                    onClick={() => handleCountChoice(choice)}
                  >
                    <span className="option-big-number" style={{ color: choice.color }}>
                      {choice.number}
                    </span>
                    <span className="option-number-word">{choice.word}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================================================================
            MODE 3: FIND THE NUMBER
            ================================================================== */}
        {activeMode === 'find' && (
          <div className="minigame-center-box">
            <div className="minigame-prompt-card">
              <h2 className="minigame-prompt-title">
                Can you find number <span style={{ color: findTarget.color }}>"{findTarget.number}"</span>?
              </h2>
              <p className="minigame-prompt-sub">Look for the number that spells {findTarget.word}!</p>
            </div>

            <div className="numbers-options-grid">
              {findOptions.map((choice) => {
                const isPicked = findPicked === choice.number;
                const isCorrect = isPicked && choice.number === findTarget.number;
                const isWrong = isPicked && choice.number !== findTarget.number;

                return (
                  <button
                    key={choice.number}
                    type="button"
                    className={`number-option-btn ${isCorrect ? 'is-correct' : ''} ${isWrong ? 'is-wrong' : ''}`}
                    onClick={() => handleFindChoice(choice)}
                  >
                    <span className="option-big-number" style={{ color: choice.color }}>
                      {choice.number}
                    </span>
                    <span className="option-number-word">{choice.word}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================================================================
            MODE 4: MATCH NUMBER & OBJECTS
            ================================================================== */}
        {activeMode === 'match' && (
          <div className="minigame-center-box">
            <div className="minigame-prompt-card">
              <h2 className="minigame-prompt-title">Match Number & Objects</h2>
              <p className="minigame-prompt-sub">Tap a number, then tap the matching group of items!</p>
            </div>

            <div className="numbers-match-grid">
              {/* Left Column: Numbers */}
              <div className="numbers-match-col">
                {matchSet.map((item) => {
                  const isMatched = matchedIds.includes(item.number);
                  const isSelected = selectedMatchNumber?.number === item.number;
                  return (
                    <button
                      key={item.number}
                      type="button"
                      className={`numbers-match-item ${isSelected ? 'is-selected' : ''} ${isMatched ? 'is-matched' : ''}`}
                      onClick={() => handleMatchNumberClick(item)}
                    >
                      <span style={{ color: item.color }}>{item.number}</span>
                      <span style={{ fontSize: '1.2rem', color: '#64748b' }}>({item.word})</span>
                      {isMatched && <span>✓</span>}
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Objects */}
              <div className="numbers-match-col">
                {matchSet.map((item) => {
                  const isMatched = matchedIds.includes(item.number);
                  const isSelected = selectedMatchObject?.number === item.number;
                  return (
                    <button
                      key={item.number}
                      type="button"
                      className={`numbers-match-item ${isSelected ? 'is-selected' : ''} ${isMatched ? 'is-matched' : ''}`}
                      onClick={() => handleMatchObjectClick(item)}
                    >
                      <span>
                        {Array.from({ length: item.number }).map((_, i) => (
                          <span key={i} style={{ fontSize: '1.6rem', marginRight: '3px' }}>
                            {item.emoji}
                          </span>
                        ))}
                      </span>
                      {isMatched && <span>✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            MODE 5: PUT IN ORDER (Smallest to Largest)
            ================================================================== */}
        {activeMode === 'order' && (
          <div className="minigame-center-box">
            <div className="minigame-prompt-card">
              <h2 className="minigame-prompt-title">Put in Order 🚀</h2>
              <p className="minigame-prompt-sub">Tap the numbers from smallest to largest!</p>
            </div>

            {/* Target Slots */}
            <div className="order-slots-row">
              {orderGoal.map((item, idx) => {
                const isFilled = idx < orderFilled.length;
                return (
                  <div
                    key={idx}
                    className={`order-target-slot ${isFilled ? 'is-filled' : ''}`}
                  >
                    {isFilled ? orderFilled[idx] : idx + 1}
                  </div>
                );
              })}
            </div>

            {/* Scrambled Tile Choices */}
            <div className="order-tiles-row">
              {orderShuffled.map((item) => {
                const isUsed = orderFilled.includes(item.number);
                return (
                  <button
                    key={item.number}
                    type="button"
                    className={`order-draggable-tile ${isUsed ? 'is-used' : ''}`}
                    onClick={() => handleOrderTileClick(item)}
                  >
                    <span style={{ color: item.color }}>{item.number}</span>
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
