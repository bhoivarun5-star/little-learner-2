import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  Home,
  RotateCcw,
  Lightbulb,
  Volume2,
  VolumeX,
  Trophy,
  Star,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Heart,
  ChevronRight,
  ThumbsUp,
  Smile,
  X
} from 'lucide-react';
import {
  CharacterAvatars,
  WHAT_SHOULD_I_DO_DATA,
  GOOD_CHOICE_DATA,
  ROLE_PLAY_STORIES,
  KINDNESS_SUPERPOWERS
} from './socialSkillsData';
import { socialSounds } from './socialSkillsSounds';
import './SocialSkillsGame.css';

export default function SocialSkillsGame({ onBack, onHome, onEarnStars }) {
  const handleExit = onHome || onBack;

  // Active Modes: 'wsid' | 'goodchoice' | 'roleplay' | 'superpowers'
  const [activeMode, setActiveMode] = useState('wsid');

  // Overall State
  const [stars, setStars] = useState(0);
  const [score, setScore] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showHintModal, setShowHintModal] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);

  // Mode 1: What Should I Do?
  const [wsidIndex, setWsidIndex] = useState(0);
  const [wsidSelectedOption, setWsidSelectedOption] = useState(null);
  const [wsidFeedback, setWsidFeedback] = useState(null); // 'correct' | 'try-again' | null

  // Mode 2: Good Choice or Try Again?
  const [gcIndex, setGcIndex] = useState(0);
  const [gcSelectedChoice, setGcSelectedChoice] = useState(null); // true | false
  const [gcFeedback, setGcFeedback] = useState(null); // 'correct' | 'try-again' | null

  // Mode 3: Role-Play Adventures
  const [storyIndex, setStoryIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [rolePlayChoice, setRolePlayChoice] = useState(null);
  const [rolePlayFeedback, setRolePlayFeedback] = useState(null);

  // Mode 4: Kindness Superpowers
  const [activePower, setActivePower] = useState(KINDNESS_SUPERPOWERS[0]);

  // Sync sound player mute state
  useEffect(() => {
    socialSounds.enabled = soundEnabled;
  }, [soundEnabled]);

  const handleToggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  const handleModeChange = (mode) => {
    socialSounds.playTap();
    setActiveMode(mode);
    setShowWinModal(false);
    setShowHintModal(false);
  };

  const handleRestart = () => {
    socialSounds.playTap();
    if (activeMode === 'wsid') {
      setWsidIndex(0);
      setWsidSelectedOption(null);
      setWsidFeedback(null);
    } else if (activeMode === 'goodchoice') {
      setGcIndex(0);
      setGcSelectedChoice(null);
      setGcFeedback(null);
    } else if (activeMode === 'roleplay') {
      setStepIndex(0);
      setRolePlayChoice(null);
      setRolePlayFeedback(null);
    }
    setShowWinModal(false);
  };

  // =========================================================================
  // MODE 1: What Should I Do?
  // =========================================================================
  const currentWsid = WHAT_SHOULD_I_DO_DATA[wsidIndex];

  const handleWsidChoice = (option) => {
    if (wsidFeedback === 'correct') return;
    setWsidSelectedOption(option.id);

    if (option.isCorrect) {
      socialSounds.playCorrect();
      setWsidFeedback('correct');
      setScore((s) => s + 10);
      setStars((st) => st + 1);
      onEarnStars?.(1);

      confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.6 }
      });
    } else {
      socialSounds.playTryAgain();
      setWsidFeedback('try-again');
    }
  };

  const handleNextWsid = () => {
    socialSounds.playTap();
    setWsidSelectedOption(null);
    setWsidFeedback(null);

    if (wsidIndex < WHAT_SHOULD_I_DO_DATA.length - 1) {
      setWsidIndex((prev) => prev + 1);
    } else {
      socialSounds.playFanfare();
      setShowWinModal(true);
      confetti({
        particleCount: 130,
        spread: 90,
        origin: { y: 0.5 }
      });
    }
  };

  // =========================================================================
  // MODE 2: Good Choice or Try Again?
  // =========================================================================
  const currentGc = GOOD_CHOICE_DATA[gcIndex];

  const handleGcChoice = (choice) => {
    if (gcFeedback === 'correct') return;
    setGcSelectedChoice(choice);

    const isCorrect = choice === currentGc.isGood;

    if (isCorrect) {
      socialSounds.playCorrect();
      setGcFeedback('correct');
      setScore((s) => s + 10);
      setStars((st) => st + 1);
      onEarnStars?.(1);

      confetti({
        particleCount: 60,
        spread: 65,
        origin: { y: 0.6 }
      });
    } else {
      socialSounds.playTryAgain();
      setGcFeedback('try-again');
    }
  };

  const handleNextGc = () => {
    socialSounds.playTap();
    setGcSelectedChoice(null);
    setGcFeedback(null);

    if (gcIndex < GOOD_CHOICE_DATA.length - 1) {
      setGcIndex((prev) => prev + 1);
    } else {
      socialSounds.playFanfare();
      setShowWinModal(true);
      confetti({
        particleCount: 130,
        spread: 90,
        origin: { y: 0.5 }
      });
    }
  };

  // =========================================================================
  // MODE 3: Role-Play Adventures
  // =========================================================================
  const currentStory = ROLE_PLAY_STORIES[storyIndex];
  const currentStep = currentStory.steps[stepIndex];

  const handleRolePlayChoice = (option, optIdx) => {
    if (rolePlayFeedback === 'correct') return;
    setRolePlayChoice(optIdx);

    if (option.isCorrect) {
      socialSounds.playCorrect();
      setRolePlayFeedback('correct');
      setScore((s) => s + 15);
      setStars((st) => st + 2);
      onEarnStars?.(2);

      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      socialSounds.playTryAgain();
      setRolePlayFeedback('try-again');
    }
  };

  const handleNextStoryStep = () => {
    socialSounds.playTap();
    setRolePlayChoice(null);
    setRolePlayFeedback(null);

    if (stepIndex < currentStory.steps.length - 1) {
      setStepIndex((prev) => prev + 1);
    } else {
      socialSounds.playFanfare();
      setShowWinModal(true);
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 }
      });
    }
  };

  const handleSelectStory = (idx) => {
    socialSounds.playTap();
    setStoryIndex(idx);
    setStepIndex(0);
    setRolePlayChoice(null);
    setRolePlayFeedback(null);
  };

  // =========================================================================
  // MODE 4: Kindness Superpowers Guide
  // =========================================================================
  const handleSelectSuperpower = (power) => {
    socialSounds.playSparkle();
    setActivePower(power);
  };

  const handleReadAloud = (text) => {
    socialSounds.speak(text);
  };

  // Get current hint text based on mode
  const getCurrentHint = () => {
    if (activeMode === 'wsid') {
      return currentWsid.hint;
    } else if (activeMode === 'goodchoice') {
      return currentGc.isGood
        ? 'This action helps make everyone happy, safe, and included! It is a Good Choice!'
        : 'Think about how this action feels to others. Does it spread smiles or hurt feelings?';
    } else if (activeMode === 'roleplay') {
      return 'Choose the welcoming, patient option that invites friends to have fun together!';
    }
    return 'Click each badge to discover your 7 kindness superpowers!';
  };

  // Progress calculations
  const getProgressPercent = () => {
    if (activeMode === 'wsid') {
      return ((wsidIndex + 1) / WHAT_SHOULD_I_DO_DATA.length) * 100;
    }
    if (activeMode === 'goodchoice') {
      return ((gcIndex + 1) / GOOD_CHOICE_DATA.length) * 100;
    }
    if (activeMode === 'roleplay') {
      return ((stepIndex + 1) / currentStory.steps.length) * 100;
    }
    return 100;
  };

  return (
    <div className="social-skills-game-wrapper">
      {/* Top Header Navbar */}
      <header className="ss-header">
        <div className="ss-header-left">
          <button
            className="ss-nav-btn ss-home-btn"
            onClick={() => {
              socialSounds.playTap();
              handleExit?.();
            }}
            title="Return to Activities"
            aria-label="Home"
          >
            <Home className="ss-icon" />
            <span className="ss-btn-text">Home</span>
          </button>

          <div className="ss-title-container">
            <h1 className="ss-main-title">
              <span className="ss-title-emoji">🤝</span> Social Skills
            </h1>
            <span className="ss-age-tag">Ages 3–6</span>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="ss-mode-tabs" role="tablist">
          <button
            className={`ss-tab-btn ${activeMode === 'wsid' ? 'active' : ''}`}
            onClick={() => handleModeChange('wsid')}
            role="tab"
            aria-selected={activeMode === 'wsid'}
          >
            <HelpCircle size={18} />
            <span>What Should I Do?</span>
          </button>

          <button
            className={`ss-tab-btn ${activeMode === 'goodchoice' ? 'active' : ''}`}
            onClick={() => handleModeChange('goodchoice')}
            role="tab"
            aria-selected={activeMode === 'goodchoice'}
          >
            <CheckCircle2 size={18} />
            <span>Good Choice?</span>
          </button>

          <button
            className={`ss-tab-btn ${activeMode === 'roleplay' ? 'active' : ''}`}
            onClick={() => handleModeChange('roleplay')}
            role="tab"
            aria-selected={activeMode === 'roleplay'}
          >
            <Sparkles size={18} />
            <span>Role-Play</span>
          </button>

          <button
            className={`ss-tab-btn ${activeMode === 'superpowers' ? 'active' : ''}`}
            onClick={() => handleModeChange('superpowers')}
            role="tab"
            aria-selected={activeMode === 'superpowers'}
          >
            <Heart size={18} />
            <span>Kindness Guide</span>
          </button>
        </div>

        {/* Stats & Tools */}
        <div className="ss-header-right">
          <div className="ss-stat-pill ss-stars-pill">
            <Star className="ss-star-icon" fill="#FBBF24" />
            <span className="ss-stat-num">{stars}</span>
          </div>

          <div className="ss-stat-pill ss-score-pill">
            <Trophy className="ss-trophy-icon" />
            <span className="ss-stat-num">{score}</span>
          </div>

          <button
            className="ss-tool-btn"
            onClick={handleToggleSound}
            title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
            aria-label="Sound Toggle"
          >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>

          {activeMode !== 'superpowers' && (
            <button
              className="ss-tool-btn ss-hint-btn"
              onClick={() => {
                socialSounds.playSparkle();
                setShowHintModal(true);
              }}
              title="Get a Friendly Clue"
              aria-label="Hint"
            >
              <Lightbulb size={20} />
            </button>
          )}

          <button
            className="ss-tool-btn"
            onClick={handleRestart}
            title="Restart Mode"
            aria-label="Restart"
          >
            <RotateCcw size={20} />
          </button>
        </div>
      </header>

      {/* Progress Bar (Modes 1-3) */}
      {activeMode !== 'superpowers' && (
        <div className="ss-progress-container">
          <div className="ss-progress-track">
            <div
              className="ss-progress-fill"
              style={{ width: `${getProgressPercent()}%` }}
            />
          </div>
          <div className="ss-progress-meta">
            {activeMode === 'wsid' && (
              <span>Scenario {wsidIndex + 1} of {WHAT_SHOULD_I_DO_DATA.length}</span>
            )}
            {activeMode === 'goodchoice' && (
              <span>Situation {gcIndex + 1} of {GOOD_CHOICE_DATA.length}</span>
            )}
            {activeMode === 'roleplay' && (
              <span>Step {stepIndex + 1} of {currentStory.steps.length} • {currentStory.title}</span>
            )}
          </div>
        </div>
      )}

      {/* Main Game Stage */}
      <main className="ss-main-stage">
        {/* ================================================================= */}
        {/* MODE 1: WHAT SHOULD I DO?                                         */}
        {/* ================================================================= */}
        {activeMode === 'wsid' && currentWsid && (
          <div className="ss-mode-container ss-wsid-mode">
            <div className="ss-scenario-card">
              <div className="ss-card-top-bar">
                <span className="ss-badge-category">
                  {currentWsid.category.toUpperCase()}
                </span>
                <h2 className="ss-scenario-heading">{currentWsid.title}</h2>
              </div>

              {/* Scenario SVG Illustration */}
              <div className="ss-visual-frame">
                <currentWsid.visual />
              </div>

              {/* Prompt & Speech */}
              <div className="ss-prompt-box">
                <p className="ss-prompt-text">{currentWsid.prompt}</p>
                <button
                  className="ss-speak-btn"
                  onClick={() => handleReadAloud(currentWsid.prompt)}
                  title="Listen to story prompt"
                  aria-label="Listen"
                >
                  <Volume2 size={20} />
                  <span>Listen</span>
                </button>
              </div>

              {/* 2 Choice Options */}
              <div className="ss-options-grid">
                {currentWsid.options.map((opt) => {
                  const isSelected = wsidSelectedOption === opt.id;
                  let optClass = 'ss-choice-btn';
                  if (isSelected && wsidFeedback === 'correct') optClass += ' correct';
                  if (isSelected && wsidFeedback === 'try-again') optClass += ' wrong';

                  return (
                    <button
                      key={opt.id}
                      className={optClass}
                      onClick={() => handleWsidChoice(opt)}
                      disabled={wsidFeedback === 'correct'}
                    >
                      <span className="ss-choice-icon">{opt.icon}</span>
                      <span className="ss-choice-label">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback & Next */}
              {wsidFeedback && (
                <div
                  className={`ss-feedback-banner ${
                    wsidFeedback === 'correct' ? 'positive' : 'encouraging'
                  }`}
                >
                  <div className="ss-feedback-content">
                    <span className="ss-feedback-emoji">
                      {wsidFeedback === 'correct' ? '🌟' : '🤔'}
                    </span>
                    <p className="ss-feedback-text">
                      {wsidFeedback === 'correct'
                        ? currentWsid.options.find((o) => o.id === wsidSelectedOption)?.feedback
                        : currentWsid.options.find((o) => o.id === wsidSelectedOption)?.feedback ||
                          'Let’s think twice! Try the other option to see what brings more smiles!'}
                    </p>
                  </div>

                  {wsidFeedback === 'correct' && (
                    <button className="ss-next-btn" onClick={handleNextWsid}>
                      <span>Next Scenario</span>
                      <ChevronRight size={20} />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* MODE 2: GOOD CHOICE OR TRY AGAIN?                                 */}
        {/* ================================================================= */}
        {activeMode === 'goodchoice' && currentGc && (
          <div className="ss-mode-container ss-goodchoice-mode">
            <div className="ss-gc-card">
              <div className="ss-gc-emoji-frame">
                <span className="ss-gc-big-emoji">{currentGc.emoji}</span>
              </div>

              <h2 className="ss-gc-action-text">{currentGc.action}</h2>

              <button
                className="ss-speak-btn ss-speak-center"
                onClick={() => handleReadAloud(currentGc.action)}
                title="Listen to situation"
                aria-label="Listen"
              >
                <Volume2 size={20} />
                <span>Listen to Action</span>
              </button>

              <div className="ss-gc-buttons-container">
                <button
                  className={`ss-gc-decision-btn ss-btn-good ${
                    gcSelectedChoice === true && gcFeedback === 'correct' ? 'celebrate' : ''
                  }`}
                  onClick={() => handleGcChoice(true)}
                  disabled={gcFeedback === 'correct'}
                >
                  <ThumbsUp size={28} />
                  <span>Good Choice! 🌟</span>
                </button>

                <button
                  className={`ss-gc-decision-btn ss-btn-tryagain ${
                    gcSelectedChoice === false && gcFeedback === 'correct' ? 'celebrate' : ''
                  }`}
                  onClick={() => handleGcChoice(false)}
                  disabled={gcFeedback === 'correct'}
                >
                  <Smile size={28} />
                  <span>Think Twice 🤔</span>
                </button>
              </div>

              {gcFeedback && (
                <div
                  className={`ss-feedback-banner ${
                    gcFeedback === 'correct' ? 'positive' : 'encouraging'
                  }`}
                >
                  <div className="ss-feedback-content">
                    <span className="ss-feedback-emoji">
                      {gcFeedback === 'correct' ? '🎉' : '💡'}
                    </span>
                    <p className="ss-feedback-text">
                      {gcFeedback === 'correct'
                        ? currentGc.feedback
                        : 'Think about how this action feels! Is it kind and helpful or hurtful? Try again!'}
                    </p>
                  </div>

                  {gcFeedback === 'correct' && (
                    <button className="ss-next-btn" onClick={handleNextGc}>
                      <span>Next Situation</span>
                      <ChevronRight size={20} />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* MODE 3: ROLE-PLAY ADVENTURES                                      */}
        {/* ================================================================= */}
        {activeMode === 'roleplay' && currentStory && currentStep && (
          <div className="ss-mode-container ss-roleplay-mode">
            {/* Story Picker Tabs */}
            <div className="ss-story-picker">
              {ROLE_PLAY_STORIES.map((story, idx) => (
                <button
                  key={story.id}
                  className={`ss-story-pill ${storyIndex === idx ? 'active' : ''}`}
                  onClick={() => handleSelectStory(idx)}
                >
                  <span className="ss-story-pill-icon">{story.icon}</span>
                  <span className="ss-story-pill-title">{story.title}</span>
                </button>
              ))}
            </div>

            <div className="ss-roleplay-card">
              <div className="ss-story-header">
                <span className="ss-story-tagline">{currentStory.tagline}</span>
                <h2 className="ss-story-title">{currentStory.title}</h2>
              </div>

              {/* Scene Description */}
              <div className="ss-scene-box">
                <p className="ss-scene-narration">{currentStep.scene}</p>
                <div className="ss-dialogue-bubble">
                  <span className="ss-dialogue-quote">💬</span>
                  <p className="ss-dialogue-text">{currentStep.dialogue}</p>
                </div>
              </div>

              {/* Question & Audio */}
              <div className="ss-roleplay-question-box">
                <h3 className="ss-roleplay-q-text">{currentStep.question}</h3>
                <button
                  className="ss-speak-btn"
                  onClick={() =>
                    handleReadAloud(`${currentStep.scene}. ${currentStep.dialogue}. ${currentStep.question}`)
                  }
                  title="Listen to adventure story"
                  aria-label="Listen"
                >
                  <Volume2 size={18} />
                  <span>Listen</span>
                </button>
              </div>

              {/* Option Buttons */}
              <div className="ss-roleplay-options">
                {currentStep.options.map((opt, optIdx) => {
                  const isSelected = rolePlayChoice === optIdx;
                  let btnClass = 'ss-rp-choice-btn';
                  if (isSelected && rolePlayFeedback === 'correct') btnClass += ' correct';
                  if (isSelected && rolePlayFeedback === 'try-again') btnClass += ' wrong';

                  return (
                    <button
                      key={optIdx}
                      className={btnClass}
                      onClick={() => handleRolePlayChoice(opt, optIdx)}
                      disabled={rolePlayFeedback === 'correct'}
                    >
                      <span className="ss-rp-text">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback Reaction */}
              {rolePlayFeedback && (
                <div
                  className={`ss-feedback-banner ${
                    rolePlayFeedback === 'correct' ? 'positive' : 'encouraging'
                  }`}
                >
                  <div className="ss-feedback-content">
                    <span className="ss-feedback-emoji">
                      {rolePlayFeedback === 'correct' ? '🏰' : '💭'}
                    </span>
                    <p className="ss-feedback-text">
                      {rolePlayChoice !== null && currentStep.options[rolePlayChoice]?.reaction}
                    </p>
                  </div>

                  {rolePlayFeedback === 'correct' && (
                    <button className="ss-next-btn" onClick={handleNextStoryStep}>
                      <span>
                        {stepIndex < currentStory.steps.length - 1
                          ? 'Next Step'
                          : 'Complete Adventure'}
                      </span>
                      <ChevronRight size={20} />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* MODE 4: KINDNESS SUPERPOWERS GUIDE                                */}
        {/* ================================================================= */}
        {activeMode === 'superpowers' && (
          <div className="ss-mode-container ss-superpowers-mode">
            <div className="ss-guide-header-box">
              <h2 className="ss-guide-title">🌟 Your 7 Kindness Superpowers!</h2>
              <p className="ss-guide-subtitle">
                Tap each superpower badge to unlock your kind habits and hear the special motto!
              </p>
            </div>

            {/* Badges Grid */}
            <div className="ss-powers-grid">
              {KINDNESS_SUPERPOWERS.map((power) => (
                <button
                  key={power.id}
                  className={`ss-power-card ${activePower.id === power.id ? 'active' : ''}`}
                  onClick={() => handleSelectSuperpower(power)}
                  style={{ '--power-color': power.color }}
                >
                  <div className="ss-power-icon-bubble">{power.emoji}</div>
                  <h3 className="ss-power-name">{power.title}</h3>
                  <span className="ss-power-badge-label">{power.badge}</span>
                </button>
              ))}
            </div>

            {/* Selected Superpower Detail Card */}
            {activePower && (
              <div
                className="ss-power-detail-card"
                style={{ borderColor: activePower.color }}
              >
                <div className="ss-detail-left">
                  <div
                    className="ss-detail-emoji"
                    style={{ backgroundColor: `${activePower.color}22` }}
                  >
                    {activePower.emoji}
                  </div>
                </div>

                <div className="ss-detail-content">
                  <div className="ss-detail-top">
                    <span
                      className="ss-detail-badge"
                      style={{ backgroundColor: activePower.color }}
                    >
                      {activePower.badge}
                    </span>
                    <h3 className="ss-detail-title">{activePower.title}</h3>
                  </div>

                  <p className="ss-detail-motto">
                    <strong>Motto:</strong> "{activePower.motto}"
                  </p>
                  <p className="ss-detail-tip">
                    <strong>Everyday Tip:</strong> {activePower.tip}
                  </p>

                  <button
                    className="ss-speak-btn"
                    onClick={() =>
                      handleReadAloud(
                        `${activePower.title}! Motto: ${activePower.motto}. Tip: ${activePower.tip}`
                      )
                    }
                    title="Listen to superpower motto"
                    aria-label="Listen"
                  >
                    <Volume2 size={18} />
                    <span>Hear Superpower Motto</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* =================================================================== */}
      {/* HINT MODAL                                                          */}
      {/* =================================================================== */}
      {showHintModal && (
        <div className="ss-modal-overlay" onClick={() => setShowHintModal(false)}>
          <div className="ss-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="ss-modal-close-btn"
              onClick={() => setShowHintModal(false)}
              aria-label="Close Hint"
            >
              <X size={22} />
            </button>
            <div className="ss-modal-icon-bubble ss-hint-bubble">
              <Lightbulb size={36} color="#F59E0B" />
            </div>
            <h3 className="ss-modal-title">Friendly Helper Clue! 💡</h3>
            <p className="ss-modal-body">{getCurrentHint()}</p>
            <button
              className="ss-modal-action-btn"
              onClick={() => setShowHintModal(false)}
            >
              Got it! Let’s Play!
            </button>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* WIN CELEBRATION MODAL                                               */}
      {/* =================================================================== */}
      {showWinModal && (
        <div className="ss-modal-overlay" onClick={() => setShowWinModal(false)}>
          <div className="ss-modal-card ss-win-card" onClick={(e) => e.stopPropagation()}>
            <div className="ss-modal-icon-bubble ss-win-bubble">
              <Trophy size={48} color="#F59E0B" />
            </div>
            <h2 className="ss-modal-title">You’re a Kindness Super Star! 🌟</h2>
            <p className="ss-modal-body">
              Fantastic job making caring choices, sharing smiles, and practicing great social manners!
            </p>

            <div className="ss-win-stats-grid">
              <div className="ss-win-stat-box">
                <Star size={24} fill="#FBBF24" color="#F59E0B" />
                <span className="ss-win-stat-num">+{stars} Stars</span>
              </div>
              <div className="ss-win-stat-box">
                <Trophy size={24} color="#3B82F6" />
                <span className="ss-win-stat-num">{score} Points</span>
              </div>
            </div>

            <div className="ss-win-actions">
              <button className="ss-modal-action-btn ss-primary-action" onClick={handleRestart}>
                Play This Mode Again 🔄
              </button>
              <button
                className="ss-modal-action-btn ss-secondary-action"
                onClick={() => {
                  setShowWinModal(false);
                  setActiveMode('superpowers');
                }}
              >
                View Kindness Guide 💖
              </button>
              <button
                className="ss-modal-action-btn ss-exit-action"
                onClick={() => {
                  setShowWinModal(false);
                  handleExit?.();
                }}
              >
                Back to Activities 🏠
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
