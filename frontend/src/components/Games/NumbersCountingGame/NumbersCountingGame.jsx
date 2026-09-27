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
  Trophy,
  Lock,
  Award
} from 'lucide-react';
import { NUMBERS_DATA } from './numbersData';
import { numberSounds } from './soundEffects';
import { useLanguage } from '../../../context/LanguageContext';
import StudentSwitcher from '../../StudentSwitcher';
import './NumbersCountingGame.css';

export const COUNTING_MODES = [
  { id: 'explorer', label: '1–20 Explorer', labelMr: '१–२० एक्सप्लोरर', icon: '🔢', level: 1 },
  { id: 'count', label: 'Count & Choose', labelMr: 'मोजा आणि निवडा', icon: '🧮', level: 2 },
  { id: 'find', label: 'Find the Number', labelMr: 'अंक शोधा', icon: '🎯', level: 3 },
  { id: 'match', label: 'Match Number & Objects', labelMr: 'अंक आणि वस्तूंची जोडी', icon: '🧩', level: 4 },
  { id: 'order', label: 'Put in Order', labelMr: 'क्रमाने लावा', icon: '🚀', level: 5 }
];

export default function NumbersCountingGame({ onHome, onEarnStars, onToggleDashboard }) {
  // Navigation & Mode
  const { language, t, speak, isMuted, soundEnabled, toggleMute } = useLanguage();
  const isMarathi = language === 'mr';

  // Level Progression:
  // Level 1: 'explorer' -> Unlocked by default
  // Level 2: 'count' -> Locked until Level 1 explored
  // Level 3: 'find' -> Locked until Level 2 (count) complete
  // Level 4: 'match' -> Locked until Level 3 (find) complete
  // Level 5: 'order' -> Locked until Level 4 (match) complete
  const [unlockedLevel, setUnlockedLevel] = useState(() => {
    try {
      const saved = localStorage.getItem('little_learner_nc_unlocked_level');
      const val = parseInt(saved, 10);
      return val >= 1 && val <= 5 ? val : 1;
    } catch {
      return 1;
    }
  });
  const [lockToast, setLockToast] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationSubtitle, setCelebrationSubtitle] = useState('');

  const [activeMode, setActiveMode] = useState('explorer'); // 'explorer' | 'count' | 'find' | 'match' | 'order'

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
      speak({
        en: `How many ${target.itemPlural} do you see? Count them and choose the right number!`,
        mr: `येथे किती ${target.itemPluralMr || target.itemPlural} आहेत? मोजा आणि योग्य अंक निवडा!`
      });
    }, 250);
  };

  const handleCountChoice = (choice) => {
    if (countPicked) return;
    setCountPicked(choice.number);

    if (choice.number === countTarget.number) {
      numberSounds.playVictoryChime();
      speak({
        en: `Great counting! That is ${choice.number} ${countTarget.itemPlural}!`,
        mr: `खूप छान! ते ${choice.number} ${choice.number === 1 ? countTarget.itemNameMr : countTarget.itemPluralMr} आहेत!`
      });
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.5 } });

      setScore((prev) => prev + 10);
      setStars((prev) => prev + 5);
      onEarnStars?.(5);

      if (unlockedLevel < 3) {
        setUnlockedLevel(3);
        try {
          localStorage.setItem('little_learner_nc_unlocked_level', '3');
        } catch (e) {
          console.error(e);
        }
      }

      setCelebrationSubtitle(
        isMarathi
          ? `छान! तुम्ही ${choice.number} ${choice.number === 1 ? countTarget.itemNameMr : countTarget.itemPluralMr} मोजले! ⭐ +५ तारे`
          : `Super! You counted ${choice.number} ${countTarget.itemPlural}! ⭐ +5 Stars`
      );

      setFeedback({
        type: 'success',
        message: isMarathi
          ? `छान! तुम्ही ${choice.number} ${choice.number === 1 ? countTarget.itemNameMr : countTarget.itemPluralMr} मोजले! ⭐ +५ तारे`
          : `Super! You counted ${choice.number} ${countTarget.itemPlural}! ⭐ +5 Stars`
      });

      setTimeout(() => {
        setShowCelebration(true);
      }, 1000);
    } else {
      numberSounds.playWrongBoing();
      speak({
        en: `Oops, not ${choice.number}. Try counting them again!`,
        mr: `अरे, ${choice.number} नाही. पुन्हा मोजून पहा!`
      });
      setFeedback({
        type: 'wrong',
        message: isMarathi
          ? 'काळजीपूर्वक मोजा! मोजण्यासाठी प्रत्येक वस्तूवर टॅप करा.'
          : 'Count carefully! Tap each item to count.'
      });
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
      speak({
        en: `Can you find the number ${target.number}? ${target.word}!`,
        mr: `${target.number} म्हणजेच ${target.wordMr || target.word} हा अंक शोधा!`
      });
    }, 200);
  };

  const handleFindChoice = (choice) => {
    if (findPicked) return;
    setFindPicked(choice.number);

    if (choice.number === findTarget.number) {
      numberSounds.playVictoryChime();
      speak({
        en: `Awesome! That is number ${choice.number}!`,
        mr: `शाब्बास! हा अंक ${choice.number} आहे!`
      });
      confetti({ particleCount: 75, spread: 65, origin: { y: 0.5 } });

      setScore((prev) => prev + 10);
      setStars((prev) => prev + 5);
      onEarnStars?.(5);

      if (unlockedLevel < 4) {
        setUnlockedLevel(4);
        try {
          localStorage.setItem('little_learner_nc_unlocked_level', '4');
        } catch (e) {
          console.error(e);
        }
      }

      setCelebrationSubtitle(
        isMarathi
          ? `शाब्बास! तुम्ही अंक ${choice.number} शोधला! ⭐ +५ तारे`
          : `Hooray! You found number ${choice.number}! ⭐ +5 Stars`
      );

      setFeedback({
        type: 'success',
        message: isMarathi
          ? `शाब्बास! तुम्ही अंक ${choice.number} शोधला! ⭐ +५ तारे`
          : `Hooray! You found number ${choice.number}! ⭐ +5 Stars`
      });

      setTimeout(() => {
        setShowCelebration(true);
      }, 1000);
    } else {
      numberSounds.playWrongBoing();
      speak({
        en: `That's number ${choice.number}. Try again to find ${findTarget.number}!`,
        mr: `तो अंक ${choice.number} आहे. अंक ${findTarget.number} शोधा!`
      });
      setFeedback({
        type: 'wrong',
        message: isMarathi
          ? `पुन्हा प्रयत्न करा! अंक ${findTarget.number} कुठे आहे?`
          : `Try again! Where is number ${findTarget.number}?`
      });
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
      speak({
        en: 'Match each number with its correct quantity of objects!',
        mr: 'प्रत्येक अंकाची योग्य वस्तूंच्या संख्येशी जोडी लावा!'
      });
    }, 200);
  };

  const handleMatchNumberClick = (item) => {
    numberSounds.playPop();
    setSelectedMatchNumber(item);
    speak({
      en: `Number ${item.number}`,
      mr: `अंक ${item.number}`
    });

    if (selectedMatchObject) {
      checkNumberMatch(item, selectedMatchObject);
    }
  };

  const handleMatchObjectClick = (item) => {
    numberSounds.playPop();
    setSelectedMatchObject(item);
    speak({
      en: `${item.number} ${item.itemPlural}`,
      mr: `${item.number} ${item.itemPluralMr || item.itemPlural}`
    });

    if (selectedMatchNumber) {
      checkNumberMatch(selectedMatchNumber, item);
    }
  };

  const checkNumberMatch = (numberItem, objectItem) => {
    if (numberItem.number === objectItem.number) {
      numberSounds.playVictoryChime();
      speak({
        en: `Matched! Number ${numberItem.number} has ${objectItem.number} ${objectItem.itemPlural}!`,
        mr: `जोडी जुळली! अंक ${numberItem.number} म्हणजे ${objectItem.number} ${objectItem.itemPluralMr || objectItem.itemPlural}!`
      });
      const nextMatched = [...matchedIds, numberItem.number];
      setMatchedIds(nextMatched);
      setSelectedMatchNumber(null);
      setSelectedMatchObject(null);

      setScore((prev) => prev + 10);
      setStars((prev) => prev + 5);
      onEarnStars?.(5);

      if (nextMatched.length === 3) {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });

        if (unlockedLevel < 5) {
          setUnlockedLevel(5);
          try {
            localStorage.setItem('little_learner_nc_unlocked_level', '5');
          } catch (e) {
            console.error(e);
          }
        }

        setCelebrationSubtitle(
          isMarathi
            ? 'तुम्ही सर्व अंकांचे योग्य गट जुळवले! ⭐ +१५ तारे'
            : 'You matched all the numbers! ⭐ +15 Stars'
        );

        setFeedback({
          type: 'success',
          message: isMarathi
            ? 'तुम्ही सर्व अंकांचे योग्य गट जुळवले! ⭐ +१५ तारे'
            : 'You matched all the numbers! ⭐ +15 Stars'
        });

        setTimeout(() => {
          setShowCelebration(true);
        }, 1000);
      }
    } else {
      numberSounds.playWrongBoing();
      speak({
        en: 'Not a match, try again!',
        mr: 'जोडी जुळत नाही, पुन्हा प्रयत्न करा!'
      });
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
      speak({
        en: 'Put the numbers in order from smallest to largest!',
        mr: 'अंक लहानापासून मोठ्या क्रमाने लावा!'
      });
    }, 200);
  };

  const handleOrderTileClick = (item) => {
    const nextIndex = orderFilled.length;
    const expected = orderGoal[nextIndex];

    if (item.number === expected.number) {
      numberSounds.playPop();
      speak({
        en: `${item.number}!`,
        mr: `${item.number}!`
      });
      const nextFilled = [...orderFilled, item.number];
      setOrderFilled(nextFilled);

      if (nextFilled.length === orderGoal.length) {
        numberSounds.playVictoryChime();
        speak({
          en: 'Super job! You put all numbers in order!',
          mr: 'खूप छान! तुम्ही सर्व अंक योग्य क्रमाने लावले!'
        });
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
        setScore((prev) => prev + 15);
        setStars((prev) => prev + 10);
        onEarnStars?.(10);

        setCelebrationSubtitle(
          isMarathi
            ? 'उत्तम क्रम! लहानापासून मोठ्यापर्यंत! ⭐ +१० तारे'
            : 'Perfect order! Smallest to largest! ⭐ +10 Stars'
        );

        setFeedback({
          type: 'success',
          message: isMarathi
            ? 'उत्तम क्रम! लहानापासून मोठ्यापर्यंत! ⭐ +१० तारे'
            : 'Perfect order! Smallest to largest! ⭐ +10 Stars'
        });

        setTimeout(() => {
          setShowCelebration(true);
        }, 1000);
      }
    } else {
      numberSounds.playWrongBoing();
      speak({
        en: 'Not quite! Look for the smallest available number next.',
        mr: 'अरेरे! पुढील सर्वात लहान अंक निवडा.'
      });
      setFeedback({
        type: 'wrong',
        message: isMarathi
          ? 'पुढील अंक कोणता आहे? सर्वात लहान अंक शोधा!'
          : 'Which number comes next? Look for the smallest!'
      });
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
      speak({
        en: `Number ${currentItem.number}. ${currentItem.word}. ${currentItem.number} ${currentItem.itemPlural}!`,
        mr: `अंक ${currentItem.number}. ${currentItem.wordMr || currentItem.word}. ${currentItem.number} ${(currentItem.number === 1 ? currentItem.itemNameMr : currentItem.itemPluralMr) || currentItem.itemPlural}!`
      });
    }
  }, [activeMode]);

  // Mode Select with level locking protection
  const handleModeSelect = (modeId) => {
    const targetMode = COUNTING_MODES.find((m) => m.id === modeId);
    const requiredLevel = targetMode?.level || 1;

    if (requiredLevel > unlockedLevel) {
      numberSounds.playWrongBoing();
      const prevMode = COUNTING_MODES.find((m) => m.level === requiredLevel - 1);
      const prevNameEn = prevMode?.label || 'previous level';
      const prevNameMr = prevMode?.labelMr || 'मागील पातळी';

      const msg = isMarathi
        ? `🔒 ही पातळी बंद आहे! उघडण्यासाठी प्रथम "${prevNameMr}" (पातळी ${requiredLevel - 1}) पूर्ण करा!`
        : `🔒 Level Locked! Complete "${prevNameEn}" (Level ${requiredLevel - 1}) first to unlock!`;

      setLockToast(msg);
      if (speak) {
        speak({
          en: `Please complete ${prevNameEn} first to unlock!`,
          mr: `प्रथम ${prevNameMr} पूर्ण करा!`
        });
      }
      setTimeout(() => setLockToast(null), 3500);
      return;
    }

    numberSounds.playPop();
    setLockToast(null);
    setActiveMode(modeId);
  };

  // Explorer Actions
  const handleSelectNumber = (index) => {
    setCurrentNumberIndex(index);
    numberSounds.playPop();
    const item = NUMBERS_DATA[index];
    speak({
      en: `Number ${item.number}. ${item.word}. ${item.number} ${item.itemPlural}!`,
      mr: `अंक ${item.number}. ${item.wordMr || item.word}. ${item.number} ${(item.number === 1 ? item.itemNameMr : item.itemPluralMr) || item.itemPlural}!`
    });

    if (unlockedLevel < 2) {
      setUnlockedLevel(2);
      try {
        localStorage.setItem('little_learner_nc_unlocked_level', '2');
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleListenSound = () => {
    speak({
      en: `Number ${currentItem.number}. ${currentItem.word}. ${currentItem.number} ${currentItem.itemPlural}!`,
      mr: `अंक ${currentItem.number}. ${currentItem.wordMr || currentItem.word}. ${currentItem.number} ${(currentItem.number === 1 ? currentItem.itemNameMr : currentItem.itemPluralMr) || currentItem.itemPlural}!`
    });

    if (unlockedLevel < 2) {
      setUnlockedLevel(2);
      try {
        localStorage.setItem('little_learner_nc_unlocked_level', '2');
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleTapObject = (idx) => {
    numberSounds.playPop();
    speak({ en: `${idx + 1}`, mr: `${idx + 1}` });
  };

  const handleNext = () => {
    numberSounds.playPop();
    if (activeMode === 'explorer') {
      const nextIndex = (currentNumberIndex + 1) % NUMBERS_DATA.length;
      setCurrentNumberIndex(nextIndex);
      const item = NUMBERS_DATA[nextIndex];
      speak({
        en: `Number ${item.number}. ${item.word}. ${item.number} ${item.itemPlural}!`,
        mr: `अंक ${item.number}. ${item.wordMr || item.word}. ${item.number} ${(item.number === 1 ? item.itemNameMr : item.itemPluralMr) || item.itemPlural}!`
      });
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
      speak({
        en: `Number ${currentItem.number}. ${currentItem.word}. ${currentItem.number} ${currentItem.itemPlural}!`,
        mr: `अंक ${currentItem.number}. ${currentItem.wordMr || currentItem.word}. ${currentItem.number} ${(currentItem.number === 1 ? currentItem.itemNameMr : currentItem.itemPluralMr) || currentItem.itemPlural}!`
      });
    } else if (activeMode === 'count') {
      speak({
        en: `How many ${countTarget.itemPlural} do you see? Count them and choose the right number!`,
        mr: `येथे किती ${countTarget.itemPluralMr || countTarget.itemPlural} आहेत? मोजा आणि योग्य अंक निवडा!`
      });
    } else if (activeMode === 'find') {
      speak({
        en: `Can you find the number ${findTarget.number}? ${findTarget.word}!`,
        mr: `${findTarget.number} म्हणजेच ${findTarget.wordMr || findTarget.word} हा अंक शोधा!`
      });
    } else if (activeMode === 'match') {
      speak({
        en: 'Match each number with its correct quantity of objects!',
        mr: 'प्रत्येक अंकाची योग्य वस्तूंच्या संख्येशी जोडी लावा!'
      });
    } else if (activeMode === 'order') {
      speak({
        en: 'Put the numbers in order from smallest to largest!',
        mr: 'अंक लहानापासून मोठ्या क्रमाने लावा!'
      });
    }
  };

  const handleToggleSound = () => {
    toggleMute();
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
              title={isMarathi ? 'मुख्यपृष्ठावर परत जा' : 'Return to Home'}
            >
              <Home size={20} />
              <span>{isMarathi ? 'मुख्यपृष्ठ' : 'Home'}</span>
            </button>

            <div className="hud-game-title-group">
              <h1 className="hud-game-title">
                <span>{isMarathi ? 'अंक आणि मोजणी' : 'Numbers & Counting'}</span>
                <Sparkles size={18} color="#f59e0b" />
              </h1>
              <span className="hud-game-subtitle">
                {isMarathi ? '१–२० शिका, वस्तू मोजा आणि मजा करा!' : 'Learn 1–20, count objects & have fun!'}
              </span>
            </div>
          </div>

          {/* Center: Visual Progress Bar */}
          <div className="hud-progress-group">
            <span className="hud-progress-label">
              {activeMode === 'explorer'
                ? (isMarathi ? `अंक ${currentNumberIndex + 1} / २०` : `Number ${currentNumberIndex + 1} of 20`)
                : (isMarathi ? `गुण: ${score}` : `Score: ${score} pts`)}
            </span>
            <div className="hud-progress-track">
              <div className="hud-progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>

          {/* Right: Switcher, Stars, Sound, Replay, Next */}
          <div className="hud-right-group">
            <StudentSwitcher compact={true} onOpenDashboard={onToggleDashboard} />

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

      {/* 2. Mini-Games Mode Selector Bar with Level Lock indicators */}
      <nav className="numbers-mode-bar">
        {COUNTING_MODES.map((mode) => {
          const isLocked = mode.level > unlockedLevel;
          const isActive = activeMode === mode.id;

          return (
            <button
              key={mode.id}
              type="button"
              className={`mode-pill-btn ${isActive ? 'is-active' : ''} ${isLocked ? 'is-locked' : ''}`}
              onClick={() => handleModeSelect(mode.id)}
              title={isLocked ? (isMarathi ? 'आधीची पातळी पूर्ण केल्यावर उघडेल' : 'Complete previous level to unlock') : ''}
              id={`tab-numbers-${mode.id}`}
            >
              {isLocked ? <Lock size={15} className="numbers-diff-lock-icon" /> : <span>{mode.icon}</span>}
              <span>{isMarathi ? mode.labelMr : mode.label}</span>
              <span className="numbers-diff-tag">
                {mode.level === 1
                  ? (isMarathi ? 'पातळी १' : 'Lvl 1')
                  : isLocked
                  ? '🔒'
                  : (isMarathi ? `पातळी ${mode.level}` : `Lvl ${mode.level}`)}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Level Lock Alert Toast */}
      {lockToast && (
        <div className="numbers-lock-toast">
          <Lock size={18} className="numbers-lock-toast-icon" />
          <span>{lockToast}</span>
        </div>
      )}

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
                    <span className="number-card-word">
                      {isMarathi ? item.wordMr : item.word}
                    </span>
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
                <span>{isMarathi ? currentItem.wordMr : currentItem.word}</span>
              </div>

              {/* Matching Objects (e.g., 5 → 🍎🍎🍎🍎🍎) */}
              <div className="spotlight-objects-tray">
                {Array.from({ length: currentItem.number }).map((_, i) => (
                  <span
                    key={i}
                    className="spotlight-object-item"
                    title={isMarathi ? `मोजण्यासाठी टॅप करा: ${i + 1}` : `Tap to count: ${i + 1}`}
                    onClick={() => handleTapObject(i)}
                  >
                    {currentItem.emoji}
                  </span>
                ))}
              </div>

              {/* Counting Phrase */}
              <p className="spotlight-counting-phrase">
                "{currentItem.number} {isMarathi ? (currentItem.number === 1 ? currentItem.itemNameMr : currentItem.itemPluralMr) : (currentItem.number === 1 ? currentItem.itemName : currentItem.itemPlural)}!"
              </p>

              {/* Large 🔊 Listen Button */}
              <button
                type="button"
                className="btn-large-listen-numbers"
                onClick={handleListenSound}
              >
                <Volume2 size={28} />
                <span>🔊 {isMarathi ? 'ऐका' : 'Listen'}</span>
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
                {isMarathi
                  ? `येथे किती ${countTarget.itemPluralMr || countTarget.itemPlural} आहेत?`
                  : `How many ${countTarget.itemPlural} are there?`}
              </h2>
              <p className="minigame-prompt-sub">
                {isMarathi
                  ? 'मोजण्यासाठी प्रत्येक वस्तूवर टॅप करा, नंतर योग्य अंक निवडा!'
                  : 'Tap each item to count, then choose the right number!'}
              </p>
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
                    <span className="option-number-word">
                      {isMarathi ? choice.wordMr : choice.word}
                    </span>
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
                {isMarathi ? (
                  <>तुम्ही <span style={{ color: findTarget.color }}>"{findTarget.number}"</span> हा अंक शोधू शकता का?</>
                ) : (
                  <>Can you find number <span style={{ color: findTarget.color }}>"{findTarget.number}"</span>?</>
                )}
              </h2>
              <p className="minigame-prompt-sub">
                {isMarathi
                  ? `"${findTarget.wordMr || findTarget.word}" दर्शवणारा अंक शोधा!`
                  : `Look for the number that spells ${findTarget.word}!`}
              </p>
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
                    <span className="option-number-word">
                      {isMarathi ? choice.wordMr : choice.word}
                    </span>
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
              <h2 className="minigame-prompt-title">
                {isMarathi ? 'अंक आणि वस्तूंची जोडी 🧩' : 'Match Number & Objects'}
              </h2>
              <p className="minigame-prompt-sub">
                {isMarathi
                  ? 'आधी अंकावर टॅप करा, मग योग्य वस्तूंच्या समूहावर टॅप करा!'
                  : 'Tap a number, then tap the matching group of items!'}
              </p>
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
                      <span style={{ fontSize: '1.2rem', color: '#64748b' }}>
                        ({isMarathi ? item.wordMr : item.word})
                      </span>
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
              <h2 className="minigame-prompt-title">
                {isMarathi ? 'क्रमाने लावा 🚀' : 'Put in Order 🚀'}
              </h2>
              <p className="minigame-prompt-sub">
                {isMarathi
                  ? 'लहानापासून मोठ्यापर्यंत अंक क्रमाने निवडा!'
                  : 'Tap the numbers from smallest to largest!'}
              </p>
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

      {/* Celebration Modal */}
      {showCelebration && (
        <div className="numbers-celebration-backdrop">
          <div className="numbers-celebration-card">
            <div className="numbers-celebration-trophy">
              {activeMode === 'order' ? '👑' : '🏆'}
            </div>
            <h2 className="numbers-celebration-title">
              {activeMode === 'order'
                ? (isMarathi ? 'अंक मोजणी मास्टर! 👑' : 'Numbers Master! 👑')
                : (isMarathi ? 'अभिनंदन! 🏆' : 'Level Complete! 🏆')}
            </h2>
            <div className="numbers-celebration-stars">
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
            </div>
            <p className="numbers-celebration-subtitle">
              {celebrationSubtitle || (isMarathi ? 'खूप छान खेळलात! +१० तारे!' : 'Great job! +10 Stars!')}
            </p>

            {/* Level unlock notice badge */}
            {activeMode === 'explorer' && (
              <div className="numbers-celebration-badge">
                🎉 {isMarathi ? '"मोजा आणि निवडा" पातळी अनलॉक झाली!' : '"Count & Choose" Level Unlocked!'} 🔓
              </div>
            )}
            {activeMode === 'count' && (
              <div className="numbers-celebration-badge">
                🎉 {isMarathi ? '"अंक शोधा" पातळी अनलॉक झाली!' : '"Find the Number" Level Unlocked!'} 🔓
              </div>
            )}
            {activeMode === 'find' && (
              <div className="numbers-celebration-badge">
                🌟 {isMarathi ? '"अंक आणि वस्तूंची जोडी" पातळी अनलॉक झाली!' : '"Match Number & Objects" Level Unlocked!'} 🔓
              </div>
            )}
            {activeMode === 'match' && (
              <div className="numbers-celebration-badge">
                🚀 {isMarathi ? '"क्रमाने लावा" पातळी अनलॉक झाली!' : '"Put in Order" Level Unlocked!'} 🔓
              </div>
            )}
            {activeMode === 'order' && (
              <div className="numbers-celebration-badge success">
                👑 {isMarathi ? 'सर्व पातळ्या यशस्वीरित्या पूर्ण!' : 'All Counting Levels Completed!'} 🏆
              </div>
            )}

            <div className="numbers-celebration-actions">
              {activeMode === 'explorer' && (
                <button
                  type="button"
                  className="numbers-modal-btn next-level"
                  onClick={() => {
                    handleModeSelect('count');
                    setShowCelebration(false);
                  }}
                >
                  <span>{isMarathi ? 'मोजा आणि निवडा खेळा 🔓 ➡️' : 'Play Count & Choose 🔓 ➡️'}</span>
                  <ArrowRight size={18} />
                </button>
              )}

              {activeMode === 'count' && (
                <button
                  type="button"
                  className="numbers-modal-btn next-level"
                  onClick={() => {
                    handleModeSelect('find');
                    setShowCelebration(false);
                  }}
                >
                  <span>{isMarathi ? 'अंक शोधा खेळा 🔓 ➡️' : 'Play Find the Number 🔓 ➡️'}</span>
                  <ArrowRight size={18} />
                </button>
              )}

              {activeMode === 'find' && (
                <button
                  type="button"
                  className="numbers-modal-btn next-level"
                  onClick={() => {
                    handleModeSelect('match');
                    setShowCelebration(false);
                  }}
                >
                  <span>{isMarathi ? 'अंक आणि वस्तूंची जोडी खेळा 🔓 ➡️' : 'Play Match Number & Objects 🔓 ➡️'}</span>
                  <ArrowRight size={18} />
                </button>
              )}

              {activeMode === 'match' && (
                <button
                  type="button"
                  className="numbers-modal-btn next-level"
                  onClick={() => {
                    handleModeSelect('order');
                    setShowCelebration(false);
                  }}
                >
                  <span>{isMarathi ? 'क्रमाने लावा खेळा 🔓 ➡️' : 'Play Put in Order 🔓 ➡️'}</span>
                  <ArrowRight size={18} />
                </button>
              )}

              <button
                type="button"
                className="numbers-modal-btn secondary"
                onClick={() => {
                  setShowCelebration(false);
                  handleNext();
                }}
              >
                <RotateCcw size={18} />
                <span>{isMarathi ? 'पुढील प्रश्न / पुन्हा खेळा' : 'Next Round / Play Again'}</span>
              </button>

              <button
                type="button"
                className="numbers-modal-btn secondary"
                onClick={onHome}
              >
                <Home size={18} />
                <span>{t('btnHome')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
