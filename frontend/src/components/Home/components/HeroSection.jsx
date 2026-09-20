import React from 'react';
import { Rocket, Sparkles } from 'lucide-react';

export default function HeroSection({ onExploreClick }) {
  return (
    <section className="home-hero-section">
      {/* Left Side: Headline, Subtitle, and Explore CTA */}
      <div className="hero-left-pitch">
        <h1 className="hero-big-title">
          Let's Get Creative<br />
          and Have Fun!
        </h1>

        <p className="hero-pitch-sub">
          Explore exciting activities to learn, create and discover new things!
        </p>

        <button
          type="button"
          className="btn-explore-activities"
          onClick={onExploreClick}
        >
          <Rocket size={20} />
          <span>Explore Activities</span>
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
