import React from 'react';
import { Rocket } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

export default function HeroSection({ onExploreClick }) {
  const { t, isMarathi } = useLanguage();

  return (
    <section className="home-hero-section">
      {/* Left Side: Headline, Subtitle, and Explore CTA */}
      <div className="hero-left-pitch">
        <h1 className="hero-big-title">
          {isMarathi ? (
            <>
              चला सर्जनशील बनूया<br />
              आणि भरपूर मजा करूया!
            </>
          ) : (
            <>
              Let's Get Creative<br />
              and Have Fun!
            </>
          )}
        </h1>

        <p className="hero-pitch-sub">
          {isMarathi
            ? 'नवीन गोष्टी शिकण्यासाठी, तयार करण्यासाठी आणि शोधण्यासाठी रोमांचक उपक्रम एक्सप्लोर करा!'
            : 'Explore exciting activities to learn, create and discover new things!'}
        </p>

        <button
          type="button"
          className="btn-explore-activities"
          onClick={onExploreClick}
        >
          <Rocket size={20} />
          <span>{t('heroCtaExplore', 'Explore Activities')}</span>
        </button>
      </div>

      {/* Right Side: Hero Video Player (Same size as original image) */}
      <div className="hero-video-container">
        <div className="hero-video-wrapper">
          <video
            src="/assets/homepage/hero_video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="hero-video-player"
          />
        </div>
      </div>
    </section>
  );
}
