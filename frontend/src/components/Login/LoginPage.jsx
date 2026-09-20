import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import LoginHero from './components/LoginHero';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import MascotStarBadge from './components/MascotStarBadge';

export default function LoginPage({ onLoginSuccess }) {
  const [isSwapped, setIsSwapped] = useState(false);
  const [inputSwappedOnce, setInputSwappedOnce] = useState(false);
  const [isForgotPassOpen, setIsForgotPassOpen] = useState(false);

  // When clicking on an input field, swap from left to right ONCE
  const handleInputInteraction = () => {
    if (!inputSwappedOnce) {
      setIsSwapped(true);
      setInputSwappedOnce(true);
    }
  };

  // When clicking on the hero banner/image, swap sides every time
  const handleHeroClick = () => {
    setIsSwapped((prev) => !prev);
  };

  return (
    <>
      {/* Top Right Decorative Lucky Star Sub-component */}
      <MascotStarBadge />

      {/* Swapping Animated Container with Form and Hero Sub-components */}
      <div className={`canvas-swap-wrapper ${isSwapped ? 'is-swapped' : ''}`}>
        {/* Panel A: Login & Signup Form Sub-component */}
        <div className="swap-panel-form">
          <LoginForm
            onLoginSuccess={onLoginSuccess}
            onOpenForgotPassword={() => setIsForgotPassOpen(true)}
            onInputInteraction={handleInputInteraction}
          />
        </div>

        {/* Panel B: Hero Illustration & Brand Sub-component */}
        <div className="swap-panel-hero">
          <LoginHero onHeroClick={handleHeroClick} />
        </div>
      </div>

      {/* Password Reset Modal Sub-component */}
      <ForgotPasswordModal
        isOpen={isForgotPassOpen}
        onClose={() => setIsForgotPassOpen(false)}
      />
    </>
  );
}
