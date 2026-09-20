import React from 'react';
import { Target } from 'lucide-react';

export default function DailyChallenge({ onStartChallenge }) {
  return (
    <div className="bottom-feature-banner daily-challenge-banner">
      <div className="challenge-left-cluster">
        <img
          src="/assets/homepage/trophy.jpg"
          alt="Daily Trophy"
          className="challenge-trophy-img"
        />
        <div className="challenge-text-col">
          <h4 className="challenge-title">Daily Challenge</h4>
          <p className="challenge-desc">
            Complete today's activity and earn a surprise badge!
          </p>
        </div>
      </div>

      <div className="challenge-cta-group">
        <button
          type="button"
          className="btn-start-challenge"
          onClick={onStartChallenge}
        >
          <span>Start Challenge</span>
          <Target size={16} />
        </button>

        <div className="challenge-reward-decor">
          <span>🏅</span>
          <span>🎁</span>
        </div>
      </div>
    </div>
  );
}
