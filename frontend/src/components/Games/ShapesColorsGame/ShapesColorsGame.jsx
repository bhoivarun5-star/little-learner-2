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
  Palette,
  Shapes
} from 'lucide-react';
import {
  SHAPES_DATA,
  COLORS_DATA,
  renderShapeSVG
} from './shapesColorsData';
import { shapesSounds } from './soundEffects';
import { useLanguage } from '../../../context/LanguageContext';
import './ShapesColorsGame.css';

export default function ShapesColorsGame({ onHome, onEarnStars }) {
  const { language, t, speak } = useLanguage();
  const isMarathi = language === 'mr';

  // Navigation & Mode
  // Modes: 'explorer' | 'find-shape' | 'find-color' | 'match-name' | 'color-match' | 'sort-color'
  const [activeMode, setActiveMode] = useState('explorer');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Stats & Progress
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState(0);

  // Explorer State
  const [explorerTab, setExplorerTab] = useState('shapes'); // 'shapes' | 'colors'
  const [currentShapeIndex, setCurrentShapeIndex] = useState(0);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [activeShapeColorHex, setActiveShapeColorHex] = useState(SHAPES_DATA[0].defaultColor);

  const selectedShape = SHAPES_DATA[currentShapeIndex];
  const selectedColor = COLORS_DATA[currentColorIndex];

  // Feedback Banner
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'wrong', message: string }

  // ---------------------------------------------------------------------------
  // MINI-GAME 1: Find the Shape State
  // ---------------------------------------------------------------------------
  const [findShapeTarget, setFindShapeTarget] = useState(SHAPES_DATA[0]);
  const [findShapeOptions, setFindShapeOptions] = useState([]);
  const [findShapePicked, setFindShapePicked] = useState(null);

  const initFindShapeGame = () => {
    const target = SHAPES_DATA[Math.floor(Math.random() * SHAPES_DATA.length)];
    const others = SHAPES_DATA.filter((s) => s.id !== target.id);
    const shuffledOthers = [...others].sort(() => 0.5 - Math.random()).slice(0, 3);
    const options = [target, ...shuffledOthers].sort(() => 0.5 - Math.random());

    setFindShapeTarget(target);
    setFindShapeOptions(options);
    setFindShapePicked(null);
    setFeedback(null);

    setTimeout(() => {
      speak({
        en: `Can you find the ${target.name}?`,
        mr: `${target.nameMr || target.name} शोधा!`
      });
    }, 200);
  };

  const handleFindShapeChoice = (choice) => {
    if (findShapePicked) return;
    setFindShapePicked(choice.id);

    if (choice.id === findShapeTarget.id) {
      shapesSounds.playSuccessChime();
      setScore((s) => s + 10);
      setStars((st) => st + 1);
      onEarnStars?.(1);
      setFeedback({
        type: 'success',
        message: isMarathi
          ? `खूप छान! हा ${findShapeTarget.nameMr || findShapeTarget.name} आहे! ⭐`
          : `Great job! That's the ${findShapeTarget.name}! ⭐`
      });

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });

      speak({
        en: `Awesome! That is a ${findShapeTarget.name}!`,
        mr: `शाब्बास! तो ${findShapeTarget.nameMr || findShapeTarget.name} आहे!`
      });

      setTimeout(() => {
        initFindShapeGame();
      }, 2000);
    } else {
      shapesSounds.playWrongBoing();
      speak({
        en: `Oops! Look closely for the ${findShapeTarget.name}!`,
        mr: `अरेरे! ${findShapeTarget.nameMr || findShapeTarget.name} नीट शोधा!`
      });
      setFeedback({
        type: 'wrong',
        message: isMarathi
          ? `पुन्हा प्रयत्न करा! ${findShapeTarget.nameMr || findShapeTarget.name} कुठे आहे?`
          : `Try again! Can you find the ${findShapeTarget.name}?`
      });
      setTimeout(() => {
        setFindShapePicked(null);
      }, 1200);
    }
  };

  // ---------------------------------------------------------------------------
  // MINI-GAME 2: Find the Color State
  // ---------------------------------------------------------------------------
  const [findColorTarget, setFindColorTarget] = useState(COLORS_DATA[0]);
  const [findColorOptions, setFindColorOptions] = useState([]);
  const [findColorPicked, setFindColorPicked] = useState(null);

  const initFindColorGame = () => {
    const target = COLORS_DATA[Math.floor(Math.random() * COLORS_DATA.length)];
    const others = COLORS_DATA.filter((c) => c.id !== target.id);
    const shuffledOthers = [...others].sort(() => 0.5 - Math.random()).slice(0, 3);
    const options = [target, ...shuffledOthers].sort(() => 0.5 - Math.random());

    setFindColorTarget(target);
    setFindColorOptions(options);
    setFindColorPicked(null);
    setFeedback(null);

    setTimeout(() => {
      speak({
        en: `Which one is ${target.name}?`,
        mr: `यापैकी ${target.nameMr || target.name} रंग कोणता आहे?`
      });
    }, 200);
  };

  const handleFindColorChoice = (choice) => {
    if (findColorPicked) return;
    setFindColorPicked(choice.id);

    if (choice.id === findColorTarget.id) {
      shapesSounds.playSuccessChime();
      setScore((s) => s + 10);
      setStars((st) => st + 1);
      onEarnStars?.(1);
      setFeedback({
        type: 'success',
        message: isMarathi
          ? `शाब्बास! हा ${findColorTarget.nameMr || findColorTarget.name} रंग आहे! ⭐`
          : `Super! That's ${findColorTarget.name}! ⭐`
      });

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });

      speak({
        en: `Yay! You found ${findColorTarget.name}!`,
        mr: `छान! तुम्ही ${findColorTarget.nameMr || findColorTarget.name} रंग शोधला!`
      });

      setTimeout(() => {
        initFindColorGame();
      }, 2000);
    } else {
      shapesSounds.playWrongBoing();
      speak({
        en: `Not quite! Look for the color ${findColorTarget.name}!`,
        mr: `अरेरे! ${findColorTarget.nameMr || findColorTarget.name} रंग शोधा!`
      });
      setFeedback({
        type: 'wrong',
        message: isMarathi
          ? `पुन्हा पाहा! ${findColorTarget.nameMr || findColorTarget.name} रंगावर टॅप करा!`
          : `Look again! Tap the ${findColorTarget.name} color!`
      });
      setTimeout(() => {
        setFindColorPicked(null);
      }, 1200);
    }
  };

  // ---------------------------------------------------------------------------
  // MINI-GAME 3: Match Shape & Name State
  // ---------------------------------------------------------------------------
  const [matchShapesList, setMatchShapesList] = useState([]);
  const [matchNamesList, setMatchNamesList] = useState([]);
  const [selectedShapeMatch, setSelectedShapeMatch] = useState(null);
  const [selectedNameMatch, setSelectedNameMatch] = useState(null);
  const [matchedIds, setMatchedIds] = useState(new Set());

  const initMatchNameGame = () => {
    const shuffledShapes = [...SHAPES_DATA].sort(() => 0.5 - Math.random()).slice(0, 3);
    const shuffledNames = [...shuffledShapes].sort(() => 0.5 - Math.random());

    setMatchShapesList(shuffledShapes);
    setMatchNamesList(shuffledNames);
    setSelectedShapeMatch(null);
    setSelectedNameMatch(null);
    setMatchedIds(new Set());
    setFeedback(null);

    setTimeout(() => {
      speak({
        en: 'Match each cute shape with its correct name!',
        mr: 'प्रत्येक आकाराची त्याच्या नावाशी जोडी लावा!'
      });
    }, 200);
  };

  const handleSelectMatchShape = (shape) => {
    if (matchedIds.has(shape.id)) return;
    shapesSounds.playPop();
    speak({ en: shape.name, mr: shape.nameMr || shape.name });
    setSelectedShapeMatch(shape);

    if (selectedNameMatch) {
      checkShapeNameMatch(shape, selectedNameMatch);
    }
  };

  const handleSelectMatchName = (shapeObj) => {
    if (matchedIds.has(shapeObj.id)) return;
    shapesSounds.playPop();
    speak({ en: shapeObj.name, mr: shapeObj.nameMr || shapeObj.name });
    setSelectedNameMatch(shapeObj);

    if (selectedShapeMatch) {
      checkShapeNameMatch(selectedShapeMatch, shapeObj);
    }
  };

  const checkShapeNameMatch = (shape, nameObj) => {
    if (shape.id === nameObj.id) {
      shapesSounds.playSuccessChime();
      const updated = new Set(matchedIds);
      updated.add(shape.id);
      setMatchedIds(updated);
      setSelectedShapeMatch(null);
      setSelectedNameMatch(null);
      setScore((s) => s + 10);
      setStars((st) => st + 1);
      onEarnStars?.(1);

      if (updated.size === 3) {
        shapesSounds.playVictory();
        setFeedback({
          type: 'success',
          message: isMarathi
            ? 'शाब्बास! तुम्ही सर्व आकारांच्या जोड्या लावल्या! 🎉'
            : 'Hooray! You matched all the shapes! 🎉'
        });
        confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
        speak({
          en: 'Fantastic job! You matched all the shapes!',
          mr: 'खूप छान! तुम्ही सर्व आकारांच्या योग्य जोड्या लावल्या!'
        });
        setTimeout(() => {
          initMatchNameGame();
        }, 2500);
      } else {
        setFeedback({
          type: 'success',
          message: isMarathi
            ? `छान जोडी: ${shape.nameMr || shape.name}! ⭐`
            : `Great match: ${shape.name}! ⭐`
        });
        setTimeout(() => setFeedback(null), 1500);
      }
    } else {
      shapesSounds.playWrongBoing();
      setFeedback({
        type: 'wrong',
        message: isMarathi
          ? `अरेरे! ${shape.nameMr || shape.name} आणि ${nameObj.nameMr || nameObj.name} जुळत नाहीत!`
          : `Oops! ${shape.name} does not match ${nameObj.name}!`
      });
      setTimeout(() => {
        setSelectedShapeMatch(null);
        setSelectedNameMatch(null);
        setFeedback(null);
      }, 1200);
    }
  };

  // ---------------------------------------------------------------------------
  // MINI-GAME 4: Color Match State
  // ---------------------------------------------------------------------------
  const [colorMatchTarget, setColorMatchTarget] = useState(null);
  const [colorMatchOptions, setColorMatchOptions] = useState([]);
  const [colorMatchPicked, setColorMatchPicked] = useState(null);

  const initColorMatchGame = () => {
    const targetColor = COLORS_DATA[Math.floor(Math.random() * COLORS_DATA.length)];
    const targetItem = targetColor.items[Math.floor(Math.random() * targetColor.items.length)];

    const otherColors = COLORS_DATA.filter((c) => c.id !== targetColor.id);
    const shuffledOthers = [...otherColors].sort(() => 0.5 - Math.random()).slice(0, 3);
    const options = [targetColor, ...shuffledOthers].sort(() => 0.5 - Math.random());

    setColorMatchTarget({ ...targetItem, color: targetColor });
    setColorMatchOptions(options);
    setColorMatchPicked(null);
    setFeedback(null);

    setTimeout(() => {
      speak({
        en: `What color is this ${targetItem.name}?`,
        mr: `या ${targetItem.nameMr || targetItem.name} चा रंग कोणता आहे?`
      });
    }, 200);
  };

  const handleColorMatchChoice = (colorOption) => {
    if (colorMatchPicked) return;
    setColorMatchPicked(colorOption.id);

    if (colorOption.id === colorMatchTarget.color.id) {
      shapesSounds.playSuccessChime();
      setScore((s) => s + 10);
      setStars((st) => st + 1);
      onEarnStars?.(1);
      setFeedback({
        type: 'success',
        message: isMarathi
          ? `बरोबर! ${colorMatchTarget.nameMr || colorMatchTarget.name} चा रंग ${colorOption.nameMr || colorOption.name} आहे! ⭐`
          : `Yes! The ${colorMatchTarget.name} is ${colorOption.name}! ⭐`
      });

      confetti({
        particleCount: 55,
        spread: 65,
        origin: { y: 0.6 }
      });

      speak({
        en: `Correct! The ${colorMatchTarget.name} is ${colorOption.name}!`,
        mr: `बरोबर! ${colorMatchTarget.nameMr || colorMatchTarget.name} चा रंग ${colorOption.nameMr || colorOption.name} आहे!`
      });

      setTimeout(() => {
        initColorMatchGame();
      }, 2000);
    } else {
      shapesSounds.playWrongBoing();
      speak({
        en: `Try again! What color is the ${colorMatchTarget.name}?`,
        mr: `पुन्हा प्रयत्न करा! ${colorMatchTarget.nameMr || colorMatchTarget.name} चा रंग कोणता आहे?`
      });
      setFeedback({
        type: 'wrong',
        message: isMarathi
          ? `पुन्हा प्रयत्न करा! ${colorMatchTarget.nameMr || colorMatchTarget.name} चा योग्य रंग निवडा!`
          : `Not quite! Tap the matching color for the ${colorMatchTarget.name}!`
      });
      setTimeout(() => {
        setColorMatchPicked(null);
      }, 1200);
    }
  };

  // ---------------------------------------------------------------------------
  // MINI-GAME 5: Sort by Color State
  // ---------------------------------------------------------------------------
  const [sortBuckets, setSortBuckets] = useState([]);
  const [sortQueue, setSortQueue] = useState([]);
  const [selectedSortItem, setSelectedSortItem] = useState(null);
  const [bucketItems, setBucketItems] = useState({});

  const initSortGame = () => {
    const selectedBuckets = [...COLORS_DATA].sort(() => 0.5 - Math.random()).slice(0, 3);
    const items = [];
    selectedBuckets.forEach((bucket) => {
      bucket.items.slice(0, 2).forEach((item) => {
        items.push({ ...item, uid: `${item.colorId}-${item.name}-${Math.random()}` });
      });
    });

    const shuffledItems = [...items].sort(() => 0.5 - Math.random());

    setSortBuckets(selectedBuckets);
    setSortQueue(shuffledItems);
    setSelectedSortItem(shuffledItems[0] || null);

    const initialBucketItems = {};
    selectedBuckets.forEach((b) => {
      initialBucketItems[b.id] = [];
    });
    setBucketItems(initialBucketItems);
    setFeedback(null);

    setTimeout(() => {
      speak({
        en: 'Place each cute item into the matching color bucket!',
        mr: 'प्रत्येक वस्तू तिच्या रंगाच्या बादलीत ठेवा!'
      });
    }, 200);
  };

  const handleSelectSortItem = (item) => {
    shapesSounds.playPop();
    setSelectedSortItem(item);
    speak({ en: item.name, mr: item.nameMr || item.name });
  };

  const handleDropIntoBucket = (bucket) => {
    if (!selectedSortItem) return;

    if (selectedSortItem.colorId === bucket.id) {
      shapesSounds.playSuccessChime();
      const updatedQueue = sortQueue.filter((it) => it.uid !== selectedSortItem.uid);
      const updatedBuckets = {
        ...bucketItems,
        [bucket.id]: [...(bucketItems[bucket.id] || []), selectedSortItem]
      };

      setBucketItems(updatedBuckets);
      setSortQueue(updatedQueue);
      setSelectedSortItem(updatedQueue[0] || null);
      setScore((s) => s + 10);
      setStars((st) => st + 1);
      onEarnStars?.(1);

      if (updatedQueue.length === 0) {
        shapesSounds.playVictory();
        setFeedback({
          type: 'success',
          message: isMarathi
            ? 'अप्रतिम! सर्व वस्तू योग्य रंगात ठेवल्या! 🎉'
            : 'Awesome! All items sorted correctly! 🎉'
        });
        confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
        speak({
          en: 'Hooray! You sorted every colorful item!',
          mr: 'शाब्बास! तुम्ही सर्व वस्तू योग्य रंगात ठेवल्या!'
        });
        setTimeout(() => {
          initSortGame();
        }, 2500);
      } else {
        speak({
          en: `Into the ${bucket.name} bucket!`,
          mr: `${bucket.nameMr || bucket.name} बादलीत!`
        });
      }
    } else {
      shapesSounds.playWrongBoing();
      speak({
        en: `Oops! That belongs in the ${selectedSortItem.colorId} bucket!`,
        mr: 'अरेरे! ते दुसऱ्या रंगाच्या बादलीत ठेवा!'
      });
      setFeedback({
        type: 'wrong',
        message: isMarathi
          ? 'रंग जुळत नाही! योग्य रंगाची बादली निवडा!'
          : `That doesn't match! Look for the ${selectedSortItem.colorId} bucket!`
      });
      setTimeout(() => setFeedback(null), 1500);
    }
  };

  // Switch Mode Lifecycle
  useEffect(() => {
    setFeedback(null);
    if (activeMode === 'find-shape') {
      initFindShapeGame();
    } else if (activeMode === 'find-color') {
      initFindColorGame();
    } else if (activeMode === 'match-name') {
      initMatchNameGame();
    } else if (activeMode === 'color-match') {
      initColorMatchGame();
    } else if (activeMode === 'sort-color') {
      initSortGame();
    } else if (activeMode === 'explorer') {
      speak({
        en: `This is a ${selectedShape.name}! ${selectedShape.description}`,
        mr: `हा ${selectedShape.nameMr || selectedShape.name} आकार आहे! ${selectedShape.descriptionMr || selectedShape.description}`
      });
    }
  }, [activeMode]);

  // Explorer Actions
  const handleSelectShape = (index) => {
    setCurrentShapeIndex(index);
    setActiveShapeColorHex(SHAPES_DATA[index].defaultColor);
    shapesSounds.playPop();
    const item = SHAPES_DATA[index];
    speak({
      en: `${item.name}! ${item.description}`,
      mr: `${item.nameMr || item.name}! ${item.descriptionMr || item.description}`
    });
  };

  const handleSelectColor = (index) => {
    setCurrentColorIndex(index);
    shapesSounds.playPop();
    const item = COLORS_DATA[index];
    speak({
      en: item.soundDesc,
      mr: item.soundDescMr || item.soundDesc
    });
  };

  const handleListenShape = () => {
    speak({
      en: `${selectedShape.name}! Pronounced: ${selectedShape.pronunciation}. ${selectedShape.description}`,
      mr: `${selectedShape.nameMr || selectedShape.name}! उच्चार: ${selectedShape.pronunciationMr || selectedShape.pronunciation}. ${selectedShape.descriptionMr || selectedShape.description}`
    });
  };

  const handleListenColor = () => {
    speak({
      en: selectedColor.soundDesc,
      mr: selectedColor.soundDescMr || selectedColor.soundDesc
    });
  };

  const handleNext = () => {
    shapesSounds.playPop();
    if (activeMode === 'explorer') {
      if (explorerTab === 'shapes') {
        const nextIndex = (currentShapeIndex + 1) % SHAPES_DATA.length;
        setCurrentShapeIndex(nextIndex);
        setActiveShapeColorHex(SHAPES_DATA[nextIndex].defaultColor);
        speak({
          en: SHAPES_DATA[nextIndex].name,
          mr: SHAPES_DATA[nextIndex].nameMr || SHAPES_DATA[nextIndex].name
        });
      } else {
        const nextIndex = (currentColorIndex + 1) % COLORS_DATA.length;
        setCurrentColorIndex(nextIndex);
        speak({
          en: COLORS_DATA[nextIndex].name,
          mr: COLORS_DATA[nextIndex].nameMr || COLORS_DATA[nextIndex].name
        });
      }
    } else if (activeMode === 'find-shape') {
      initFindShapeGame();
    } else if (activeMode === 'find-color') {
      initFindColorGame();
    } else if (activeMode === 'match-name') {
      initMatchNameGame();
    } else if (activeMode === 'color-match') {
      initColorMatchGame();
    } else if (activeMode === 'sort-color') {
      initSortGame();
    }
  };

  const handleReplay = () => {
    shapesSounds.playPop();
    if (activeMode === 'explorer') {
      if (explorerTab === 'shapes') {
        handleListenShape();
      } else {
        handleListenColor();
      }
    } else if (activeMode === 'find-shape') {
      speak({
        en: `Can you find the ${findShapeTarget.name}?`,
        mr: `${findShapeTarget.nameMr || findShapeTarget.name} शोधा!`
      });
    } else if (activeMode === 'find-color') {
      speak({
        en: `Which one is ${findColorTarget.name}?`,
        mr: `यापैकी ${findColorTarget.nameMr || findColorTarget.name} रंग कोणता आहे?`
      });
    } else if (activeMode === 'match-name') {
      speak({
        en: 'Match each cute shape with its correct name!',
        mr: 'प्रत्येक आकाराची त्याच्या नावाशी जोडी लावा!'
      });
    } else if (activeMode === 'color-match') {
      speak({
        en: `What color is this ${colorMatchTarget?.name}?`,
        mr: `या ${colorMatchTarget?.nameMr || colorMatchTarget?.name} चा रंग कोणता आहे?`
      });
    } else if (activeMode === 'sort-color') {
      speak({
        en: 'Place each cute item into the matching color bucket!',
        mr: 'प्रत्येक वस्तू तिच्या रंगाच्या बादलीत ठेवा!'
      });
    }
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    shapesSounds.setSoundEnabled(next);
  };

  const progressPercent =
    activeMode === 'explorer'
      ? Math.round(
          (((explorerTab === 'shapes' ? currentShapeIndex : currentColorIndex) + 1) /
            (explorerTab === 'shapes' ? SHAPES_DATA.length : COLORS_DATA.length)) *
            100
        )
      : Math.min(100, Math.round((score / 100) * 100));

  return (
    <div className="shapes-game-fullscreen-container">
      {/* 1. Game Top Header HUD - Full Width & Fixed */}
      <header className="sc-game-hud">
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
                <span>{isMarathi ? 'आकार आणि रंग' : 'Shapes & Colors'}</span>
                <Sparkles size={18} color="#f59e0b" />
              </h1>
              <span className="hud-game-subtitle">
                {isMarathi ? 'वय ३–६ • आकार, रंग आणि मिनी-गेम्स!' : 'Ages 3–6 • Shapes, Colors & Mini-Games!'}
              </span>
            </div>
          </div>

          {/* Center: Visual Progress Bar */}
          <div className="hud-progress-group">
            <span className="hud-progress-label">
              {activeMode === 'explorer'
                ? explorerTab === 'shapes'
                  ? (isMarathi ? `आकार ${currentShapeIndex + 1} / ${SHAPES_DATA.length}` : `Shape ${currentShapeIndex + 1} of ${SHAPES_DATA.length}`)
                  : (isMarathi ? `रंग ${currentColorIndex + 1} / ${COLORS_DATA.length}` : `Color ${currentColorIndex + 1} of ${COLORS_DATA.length}`)
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
      <nav className="sc-mode-bar">
        <button
          type="button"
          className={`sc-mode-btn ${activeMode === 'explorer' ? 'is-active' : ''}`}
          onClick={() => setActiveMode('explorer')}
        >
          <Shapes size={18} />
          <span>{isMarathi ? 'आकार आणि रंग' : 'Shapes & Colors'}</span>
        </button>

        <button
          type="button"
          className={`sc-mode-btn ${activeMode === 'find-shape' ? 'is-active' : ''}`}
          onClick={() => setActiveMode('find-shape')}
        >
          <span>⭐ {isMarathi ? 'आकार शोधा' : 'Find the Shape'}</span>
        </button>

        <button
          type="button"
          className={`sc-mode-btn ${activeMode === 'find-color' ? 'is-active' : ''}`}
          onClick={() => setActiveMode('find-color')}
        >
          <span>🎨 {isMarathi ? 'रंग शोधा' : 'Find the Color'}</span>
        </button>

        <button
          type="button"
          className={`sc-mode-btn ${activeMode === 'match-name' ? 'is-active' : ''}`}
          onClick={() => setActiveMode('match-name')}
        >
          <span>🧩 {isMarathi ? 'आकार आणि नावाची जोडी' : 'Match Shape & Name'}</span>
        </button>

        <button
          type="button"
          className={`sc-mode-btn ${activeMode === 'color-match' ? 'is-active' : ''}`}
          onClick={() => setActiveMode('color-match')}
        >
          <span>🎯 {isMarathi ? 'रंग जुळवा' : 'Color Match'}</span>
        </button>

        <button
          type="button"
          className={`sc-mode-btn ${activeMode === 'sort-color' ? 'is-active' : ''}`}
          onClick={() => setActiveMode('sort-color')}
        >
          <span>🧺 {isMarathi ? 'रंगानुसार वर्गीकरण' : 'Sort by Color'}</span>
        </button>
      </nav>

      {/* Feedback Banner */}
      {feedback && (
        <div className={`sc-feedback-pill ${feedback.type}`}>
          {feedback.type === 'success' ? (
            <CheckCircle2 size={26} color="#15803d" />
          ) : (
            <XCircle size={26} color="#b91c1c" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* 3. Main Game Canvas Area */}
      <main className="sc-game-canvas">
        {/* -------------------------------------------------------------------
            MODE 1: EXPLORER SHOWCASE (Shapes & Colors)
            ------------------------------------------------------------------- */}
        {activeMode === 'explorer' && (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
            {/* Shapes vs Colors Toggle */}
            <div className="sc-sub-tabs">
              <button
                type="button"
                className={`sc-sub-tab-btn ${explorerTab === 'shapes' ? 'is-active' : ''}`}
                onClick={() => {
                  setExplorerTab('shapes');
                  shapesSounds.playPop();
                  speak({
                    en: `Let's explore Shapes!`,
                    mr: `चला आकार शिकूया!`
                  });
                }}
              >
                🔺 {isMarathi ? 'आकार (१–७)' : 'Shapes (1–7)'}
              </button>
              <button
                type="button"
                className={`sc-sub-tab-btn ${explorerTab === 'colors' ? 'is-active' : ''}`}
                onClick={() => {
                  setExplorerTab('colors');
                  shapesSounds.playPop();
                  speak({
                    en: `Let's explore Colors!`,
                    mr: `चला रंग शिकूया!`
                  });
                }}
              >
                🎨 {isMarathi ? 'रंग (१–७)' : 'Colors (1–7)'}
              </button>
            </div>

            {explorerTab === 'shapes' ? (
              <div className="sc-explorer-layout">
                {/* Left: Shape Spotlight Card */}
                <div className="sc-spotlight-card">
                  <div
                    className="sc-shape-display-stage"
                    onClick={handleListenShape}
                    title={isMarathi ? 'आकार ऐकण्यासाठी टॅप करा!' : 'Click to hear shape!'}
                  >
                    {renderShapeSVG(selectedShape.id, activeShapeColorHex, 200)}
                  </div>

                  <h2 className="sc-spotlight-title">
                    {isMarathi ? selectedShape.nameMr : selectedShape.name}
                  </h2>
                  <p className="sc-spotlight-phonics">
                    {isMarathi ? `उच्चार: "${selectedShape.pronunciationMr || selectedShape.pronunciation}"` : `Says: "${selectedShape.pronunciation}"`}
                  </p>
                  <p className="sc-spotlight-desc">
                    {isMarathi ? selectedShape.descriptionMr : selectedShape.description}
                  </p>

                  <button
                    type="button"
                    className="sc-btn-listen"
                    onClick={handleListenShape}
                  >
                    <Volume2 size={24} />
                    <span>{isMarathi ? 'ऐका' : 'Listen'}</span>
                  </button>

                  {/* Change Shape Color Palette */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
                    <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#64748b' }}>
                      {isMarathi ? 'आकारासाठी रंग निवडा:' : 'Pick a color for the shape:'}
                    </span>
                    <div className="sc-color-palette-bar">
                      {COLORS_DATA.map((color) => (
                        <button
                          key={color.id}
                          type="button"
                          className={`sc-palette-circle ${activeShapeColorHex === color.hex ? 'is-active' : ''}`}
                          style={{ background: color.hex }}
                          onClick={() => {
                            setActiveShapeColorHex(color.hex);
                            shapesSounds.playPop();
                            speak({
                              en: `${color.name} ${selectedShape.name}!`,
                              mr: `${color.nameMr || color.name} ${selectedShape.nameMr || selectedShape.name}!`
                            });
                          }}
                          title={isMarathi ? color.nameMr : color.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Shape selector grid & real-world items */}
                <div className="sc-explorer-right-panel">
                  <div className="sc-selector-grid">
                    {SHAPES_DATA.map((shape, idx) => (
                      <div
                        key={shape.id}
                        className={`sc-selector-card ${idx === currentShapeIndex ? 'is-active' : ''}`}
                        onClick={() => handleSelectShape(idx)}
                      >
                        <div style={{ transform: 'scale(0.55)', width: '90px', height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {renderShapeSVG(shape.id, shape.defaultColor, 120)}
                        </div>
                        <span className="sc-selector-card-name">
                          {isMarathi ? shape.nameMr : shape.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Real World Objects */}
                  <div className="sc-real-world-box">
                    <h3 className="sc-real-world-title">
                      <span>{isMarathi ? `आपल्या सभोवतालचे ${selectedShape.nameMr}:` : `Real-World ${selectedShape.name}s:`}</span>
                    </h3>
                    <div className="sc-real-world-grid">
                      {selectedShape.realWorld.map((item, i) => (
                        <div
                          key={i}
                          className="sc-real-world-item"
                          onClick={() => {
                            shapesSounds.playPop();
                            speak({
                              en: `A ${item.name} is a ${selectedShape.name}!`,
                              mr: `${item.nameMr || item.name} हा ${selectedShape.nameMr || selectedShape.name} आकाराचा असतो!`
                            });
                          }}
                          title={isMarathi ? `${item.nameMr} ऐका` : `Listen to ${item.name}`}
                        >
                          <span className="sc-real-world-emoji">{item.emoji}</span>
                          <span className="sc-real-world-name">
                            {isMarathi ? item.nameMr : item.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Colors Explorer Tab */
              <div className="sc-explorer-layout">
                {/* Left: Color Spotlight Card */}
                <div className="sc-spotlight-card" style={{ borderColor: selectedColor.borderHex }}>
                  <div
                    className="sc-shape-display-stage"
                    style={{
                      background: selectedColor.lightBg,
                      border: `4px solid ${selectedColor.borderHex}`
                    }}
                    onClick={handleListenColor}
                    title={isMarathi ? 'रंग ऐकण्यासाठी टॅप करा!' : 'Click to hear color!'}
                  >
                    <span style={{ fontSize: '5rem' }}>{selectedColor.iconEmoji}</span>
                  </div>

                  <h2 className="sc-spotlight-title" style={{ color: selectedColor.accentColor }}>
                    {isMarathi ? selectedColor.nameMr : selectedColor.name}
                  </h2>
                  <p className="sc-spotlight-desc">
                    {isMarathi ? selectedColor.soundDescMr : selectedColor.soundDesc}
                  </p>

                  <button
                    type="button"
                    className="sc-btn-listen"
                    style={{ background: selectedColor.hex, borderColor: selectedColor.borderHex }}
                    onClick={handleListenColor}
                  >
                    <Volume2 size={24} />
                    <span>{isMarathi ? 'ऐका' : 'Listen'}</span>
                  </button>
                </div>

                {/* Right: Color Selector Grid & Color Items */}
                <div className="sc-explorer-right-panel">
                  <div className="sc-selector-grid">
                    {COLORS_DATA.map((color, idx) => (
                      <div
                        key={color.id}
                        className={`sc-selector-card ${idx === currentColorIndex ? 'is-active' : ''}`}
                        style={idx === currentColorIndex ? { borderColor: color.hex } : {}}
                        onClick={() => handleSelectColor(idx)}
                      >
                        <div
                          style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '50%',
                            background: color.hex,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                          }}
                        />
                        <span className="sc-selector-card-name">
                          {isMarathi ? color.nameMr : color.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Things that are this color */}
                  <div className="sc-real-world-box">
                    <h3 className="sc-real-world-title">
                      <span>{isMarathi ? `या रंगाच्या गोष्टी (${selectedColor.nameMr}):` : `Things that are ${selectedColor.name}:`}</span>
                    </h3>
                    <div className="sc-real-world-grid">
                      {selectedColor.items.map((item, i) => (
                        <div
                          key={i}
                          className="sc-real-world-item"
                          onClick={() => {
                            shapesSounds.playPop();
                            speak({
                              en: `A ${item.name} is ${selectedColor.name}!`,
                              mr: `${item.nameMr || item.name} ${selectedColor.nameMr || selectedColor.name} रंगाचा असतो!`
                            });
                          }}
                          title={isMarathi ? `${item.nameMr} ऐका` : `Listen to ${item.name}`}
                        >
                          <span className="sc-real-world-emoji">{item.emoji}</span>
                          <span className="sc-real-world-name">
                            {isMarathi ? item.nameMr : item.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* -------------------------------------------------------------------
            MINI-GAME 1: FIND THE SHAPE
            ------------------------------------------------------------------- */}
        {activeMode === 'find-shape' && (
          <div className="sc-minigame-container">
            <div className="sc-prompt-box">
              <h2 className="sc-prompt-text">
                {isMarathi ? (
                  <>तुम्ही <span style={{ color: '#ec4899' }}>{findShapeTarget.nameMr}</span> शोधू शकता का?</>
                ) : (
                  <>Can you find the <span style={{ color: '#ec4899' }}>{findShapeTarget.name}</span>?</>
                )}
              </h2>
              <button
                type="button"
                className="sc-prompt-audio-btn"
                onClick={() => speak({
                  en: `Can you find the ${findShapeTarget.name}?`,
                  mr: `${findShapeTarget.nameMr || findShapeTarget.name} शोधा!`
                })}
                title={isMarathi ? 'प्रश्न ऐका' : 'Hear Question'}
              >
                <Volume2 size={24} />
              </button>
            </div>

            <div className="sc-options-grid">
              {findShapeOptions.map((shape) => {
                const isSelected = findShapePicked === shape.id;
                const isCorrect = isSelected && shape.id === findShapeTarget.id;
                const isWrong = isSelected && shape.id !== findShapeTarget.id;

                return (
                  <button
                    key={shape.id}
                    type="button"
                    className={`sc-option-card ${isCorrect ? 'is-correct' : ''} ${isWrong ? 'is-wrong' : ''}`}
                    onClick={() => handleFindShapeChoice(shape)}
                  >
                    <div style={{ transform: 'scale(0.85)' }}>
                      {renderShapeSVG(shape.id, shape.defaultColor, 140)}
                    </div>
                    <span style={{ fontFamily: 'Fredoka', fontSize: '1.4rem', fontWeight: 700, color: '#1e1b4b' }}>
                      {isMarathi ? shape.nameMr : shape.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------------
            MINI-GAME 2: FIND THE COLOR
            ------------------------------------------------------------------- */}
        {activeMode === 'find-color' && (
          <div className="sc-minigame-container">
            <div className="sc-prompt-box">
              <h2 className="sc-prompt-text">
                {isMarathi ? (
                  <>यापैकी <span style={{ color: findColorTarget.hex }}>{findColorTarget.nameMr}</span> कोणता आहे?</>
                ) : (
                  <>Which one is <span style={{ color: findColorTarget.hex }}>{findColorTarget.name}</span>?</>
                )}
              </h2>
              <button
                type="button"
                className="sc-prompt-audio-btn"
                onClick={() => speak({
                  en: `Which one is ${findColorTarget.name}?`,
                  mr: `यापैकी ${findColorTarget.nameMr || findColorTarget.name} रंग कोणता आहे?`
                })}
                title={isMarathi ? 'प्रश्न ऐका' : 'Hear Question'}
              >
                <Volume2 size={24} />
              </button>
            </div>

            <div className="sc-options-grid">
              {findColorOptions.map((color) => {
                const isSelected = findColorPicked === color.id;
                const isCorrect = isSelected && color.id === findColorTarget.id;
                const isWrong = isSelected && color.id !== findColorTarget.id;

                return (
                  <button
                    key={color.id}
                    type="button"
                    className={`sc-option-card ${isCorrect ? 'is-correct' : ''} ${isWrong ? 'is-wrong' : ''}`}
                    onClick={() => handleFindColorChoice(color)}
                    style={{ borderColor: isCorrect ? '#22c55e' : color.borderHex }}
                  >
                    <div
                      style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: color.hex,
                        boxShadow: `0 6px 16px ${color.hex}55`,
                        border: '4px solid #ffffff'
                      }}
                    />
                    <span style={{ fontFamily: 'Fredoka', fontSize: '1.4rem', fontWeight: 700, color: '#1e1b4b' }}>
                      {isMarathi ? color.nameMr : color.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------------
            MINI-GAME 3: MATCH SHAPE & NAME
            ------------------------------------------------------------------- */}
        {activeMode === 'match-name' && (
          <div className="sc-minigame-container">
            <div className="sc-prompt-box">
              <h2 className="sc-prompt-text">
                {isMarathi ? (
                  <>प्रत्येक <span style={{ color: '#ec4899' }}>आकाराची</span> त्याच्या <span style={{ color: '#8b5cf6' }}>नावाशी</span> जोडी लावा!</>
                ) : (
                  <>Match each <span style={{ color: '#ec4899' }}>Shape</span> with its <span style={{ color: '#8b5cf6' }}>Name</span>!</>
                )}
              </h2>
              <button
                type="button"
                className="sc-prompt-audio-btn"
                onClick={() => speak({
                  en: 'Match each cute shape with its correct name!',
                  mr: 'प्रत्येक आकाराची त्याच्या नावाशी जोडी लावा!'
                })}
                title={isMarathi ? 'सूचना ऐका' : 'Hear instruction'}
              >
                <Volume2 size={24} />
              </button>
            </div>

            <div className="sc-match-container">
              {/* Left: Shape cards */}
              <div className="sc-match-column">
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#64748b', textAlign: 'center' }}>
                  {isMarathi ? 'आकार' : 'Shapes'}
                </span>
                {matchShapesList.map((shape) => {
                  const isMatched = matchedIds.has(shape.id);
                  const isSelected = selectedShapeMatch?.id === shape.id;

                  return (
                    <button
                      key={shape.id}
                      type="button"
                      className={`sc-match-item ${isSelected ? 'is-selected' : ''} ${isMatched ? 'is-matched' : ''}`}
                      onClick={() => handleSelectMatchShape(shape)}
                    >
                      <div style={{ transform: 'scale(0.65)' }}>
                        {renderShapeSVG(shape.id, shape.defaultColor, 80)}
                      </div>
                      <span>
                        {isMatched
                          ? `✓ ${isMarathi ? shape.nameMr : shape.name}`
                          : (isMarathi ? 'टॅप करा' : 'Tap Me')}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Right: Name cards */}
              <div className="sc-match-column">
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#64748b', textAlign: 'center' }}>
                  {isMarathi ? 'नावे' : 'Names'}
                </span>
                {matchNamesList.map((shapeObj) => {
                  const isMatched = matchedIds.has(shapeObj.id);
                  const isSelected = selectedNameMatch?.id === shapeObj.id;

                  return (
                    <button
                      key={shapeObj.id}
                      type="button"
                      className={`sc-match-item ${isSelected ? 'is-selected' : ''} ${isMatched ? 'is-matched' : ''}`}
                      onClick={() => handleSelectMatchName(shapeObj)}
                    >
                      <Volume2 size={20} color="#64748b" />
                      <span>{isMarathi ? shapeObj.nameMr : shapeObj.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------------
            MINI-GAME 4: COLOR MATCH
            ------------------------------------------------------------------- */}
        {activeMode === 'color-match' && colorMatchTarget && (
          <div className="sc-minigame-container">
            <div className="sc-prompt-box">
              <h2 className="sc-prompt-text">
                {isMarathi ? (
                  <>या <span style={{ color: colorMatchTarget.color.hex }}>{colorMatchTarget.nameMr || colorMatchTarget.name}</span> चा रंग कोणता आहे?</>
                ) : (
                  <>What color is this <span style={{ color: colorMatchTarget.color.hex }}>{colorMatchTarget.name}</span>?</>
                )}
              </h2>
              <button
                type="button"
                className="sc-prompt-audio-btn"
                onClick={() => speak({
                  en: `What color is this ${colorMatchTarget.name}?`,
                  mr: `या ${colorMatchTarget.nameMr || colorMatchTarget.name} चा रंग कोणता आहे?`
                })}
                title={isMarathi ? 'प्रश्न ऐका' : 'Hear Question'}
              >
                <Volume2 size={24} />
              </button>
            </div>

            {/* Target Item Spotlight */}
            <div
              style={{
                background: '#f8fafc',
                border: '3px solid #e2e8f0',
                borderRadius: '28px',
                padding: '2rem 3rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.75rem',
                boxShadow: '0 8px 24px rgba(0,0,0,0.05)'
              }}
            >
              <span style={{ fontSize: '5.5rem', lineHeight: 1 }}>{colorMatchTarget.emoji}</span>
              <span style={{ fontFamily: 'Fredoka', fontSize: '1.6rem', fontWeight: 700, color: '#1e1b4b' }}>
                {isMarathi ? (colorMatchTarget.nameMr || colorMatchTarget.name) : colorMatchTarget.name}
              </span>
            </div>

            {/* Color Swatch Choices */}
            <div className="sc-options-grid">
              {colorMatchOptions.map((color) => {
                const isSelected = colorMatchPicked === color.id;
                const isCorrect = isSelected && color.id === colorMatchTarget.color.id;
                const isWrong = isSelected && color.id !== colorMatchTarget.color.id;

                return (
                  <button
                    key={color.id}
                    type="button"
                    className={`sc-option-card ${isCorrect ? 'is-correct' : ''} ${isWrong ? 'is-wrong' : ''}`}
                    onClick={() => handleColorMatchChoice(color)}
                  >
                    <div
                      style={{
                        width: '72px',
                        height: '72px',
                        borderRadius: '50%',
                        background: color.hex,
                        boxShadow: `0 6px 16px ${color.hex}55`,
                        border: '4px solid #ffffff'
                      }}
                    />
                    <span style={{ fontFamily: 'Fredoka', fontSize: '1.35rem', fontWeight: 700, color: '#1e1b4b' }}>
                      {isMarathi ? color.nameMr : color.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------------
            MINI-GAME 5: SORT BY COLOR
            ------------------------------------------------------------------- */}
        {activeMode === 'sort-color' && (
          <div className="sc-sort-container">
            <div className="sc-prompt-box">
              <h2 className="sc-prompt-text">
                {isMarathi ? (
                  <>एका वस्तूवर टॅप करा, मग तिच्या <span style={{ color: '#ec4899' }}>रंगाच्या बादलीवर</span> टॅप करा!</>
                ) : (
                  <>Tap an item, then tap its <span style={{ color: '#ec4899' }}>Color Bucket</span>!</>
                )}
              </h2>
              <button
                type="button"
                className="sc-prompt-audio-btn"
                onClick={() => speak({
                  en: 'Place each cute item into the matching color bucket!',
                  mr: 'प्रत्येक वस्तू तिच्या रंगाच्या बादलीत ठेवा!'
                })}
                title={isMarathi ? 'सूचना ऐका' : 'Hear instruction'}
              >
                <Volume2 size={24} />
              </button>
            </div>

            {/* Unsorted Items Rack */}
            <div className="sc-sort-items-rack">
              {sortQueue.length > 0 ? (
                sortQueue.map((item) => {
                  const isSelected = selectedSortItem?.uid === item.uid;
                  return (
                    <div
                      key={item.uid}
                      className={`sc-sortable-item-card ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => handleSelectSortItem(item)}
                    >
                      <span style={{ fontSize: '2.5rem' }}>{item.emoji}</span>
                      <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#475569' }}>
                        {isMarathi ? item.nameMr : item.name}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div style={{ padding: '1rem', fontWeight: 700, color: '#15803d', fontSize: '1.3rem' }}>
                  {isMarathi
                    ? '🎉 सर्व वस्तू योग्य रंगात ठेवल्या! पुढे जाण्यासाठी नेक्स्ट किंवा पुन्हा खेळावर टॅप करा!'
                    : '🎉 All items sorted! Tap Next or Replay to play again!'}
                </div>
              )}
            </div>

            {/* 3 Sorting Buckets */}
            <div className="sc-sort-buckets-row">
              {sortBuckets.map((bucket) => {
                const itemsInThisBucket = bucketItems[bucket.id] || [];

                return (
                  <div
                    key={bucket.id}
                    className="sc-sort-bucket"
                    style={{
                      background: bucket.lightBg,
                      borderColor: bucket.borderHex,
                      color: bucket.accentColor
                    }}
                    onClick={() => handleDropIntoBucket(bucket)}
                  >
                    <span style={{ fontSize: '3rem' }}>{bucket.iconEmoji}</span>
                    <h3 className="sc-sort-bucket-label">
                      {isMarathi ? `${bucket.nameMr} बादली` : `${bucket.name} Bucket`}
                    </h3>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                      {itemsInThisBucket.length} {isMarathi ? 'वस्तू ठेवल्या' : 'items placed'}
                    </span>

                    {/* Tray of collected items */}
                    <div className="sc-bucket-items-tray">
                      {itemsInThisBucket.map((item) => (
                        <span key={item.uid} className="sc-bucket-item-badge" title={isMarathi ? item.nameMr : item.name}>
                          {item.emoji}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
