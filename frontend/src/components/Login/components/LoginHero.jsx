import React from 'react';

export default function LoginHero({ onHeroClick }) {
  return (
    <div
      className="hero-column"
      onClick={onHeroClick}
      style={{ cursor: 'pointer' }}
      title="Click image to swap sides! 🎈"
    >
      {/* Brand Header */}
      <div className="brand-header">
        <div className="brand-star-icon">
          <img src="/assets/star-mascot.jpg" alt="Little Learner Star" />
        </div>
        <div className="brand-title-wrap">
          <div className="brand-name">
            <span className="brand-name-little">Little</span>
            <span className="brand-name-learner">
              <span className="rainbow-l">L</span>
              <span className="rainbow-e1">e</span>
              <span className="rainbow-a">a</span>
              <span className="rainbow-r1">r</span>
              <span className="rainbow-n">n</span>
              <span className="rainbow-e2">e</span>
              <span className="rainbow-r2">r</span>
            </span>
          </div>
          <div className="brand-tagline">
            Learn • Play • Grow
          </div>
        </div>
      </div>

      {/* Hero Headings */}
      <div className="hero-headings">
        <h1 className="hero-main-title">Welcome Back!</h1>
        <p className="hero-sub-title">
          <span>Let's continue your</span>
          <span className="highlight-adventure">learning adventure</span>
          <span className="sparkle-icon">⭐</span>
        </p>
      </div>

      {/* Hero 3D Illustration */}
      <div className="hero-art-container">
        <img
          src="/assets/hero-scene.jpg"
          alt="Little Learner waving with cute panda friend on learning trail"
          className="hero-image-render"
        />
      </div>
    </div>
  );
}
