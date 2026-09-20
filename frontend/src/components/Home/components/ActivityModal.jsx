import React, { useState } from 'react';
import { X, Trophy, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ActivityModal({ activity, onClose, onCompleteActivity }) {
  const [gameState, setGameState] = useState({
    score: 0,
    completed: false,
    selectedItems: []
  });

  if (!activity) return null;

  const handleItemTap = (index) => {
    if (gameState.selectedItems.includes(index) || gameState.completed) return;

    const nextSelected = [...gameState.selectedItems, index];
    const isDone = nextSelected.length >= 3;

    setGameState({
      score: nextSelected.length * 10,
      completed: isDone,
      selectedItems: nextSelected
    });

    if (isDone) {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.5 }
      });
      onCompleteActivity?.(10);
    }
  };

  return (
    <div className="activity-modal-backdrop" onClick={onClose}>
      <div className="activity-modal-window" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header-row">
          <div className="modal-title-group">
            <span className="modal-title-icon">🎈</span>
            <div>
              <h3 className="modal-heading">{activity.title}</h3>
              <p className="modal-subheading">{activity.desc}</p>
            </div>
          </div>

          <button type="button" className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Playground Area */}
        <div className="minigame-playground">
          {gameState.completed ? (
            <div style={{ padding: '1rem 0' }}>
              <Trophy size={60} color="#f59e0b" style={{ margin: '0 auto 0.5rem' }} />
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 900, color: '#15803d' }}>
                Hooray! You Won +10 Stars! ⭐
              </h4>
              <p style={{ color: '#475569', fontSize: '0.95rem', fontWeight: 600, marginTop: '0.25rem' }}>
                Great work completing {activity.title}!
              </p>
              <button
                type="button"
                className="btn-play-action btn-play-purple"
                style={{ width: 'auto', margin: '1rem auto 0', padding: '0.65rem 1.75rem' }}
                onClick={onClose}
              >
                <span>Awesome! Keep Playing</span>
              </button>
            </div>
          ) : (
            <>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, color: '#1e1b4b' }}>
                Tap all 3 items to complete the adventure!
              </p>

              <div className="interactive-items-cluster">
                {activity.id === 'letter-hunt' && ['A', 'B', 'C'].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`interactive-item-pill ${gameState.selectedItems.includes(idx) ? 'clicked' : ''}`}
                    onClick={() => handleItemTap(idx)}
                  >
                    {gameState.selectedItems.includes(idx) ? '⭐ ' + item : item}
                  </button>
                ))}

                {activity.id === 'count-match' && ['🍎', '🍏', '🍎'].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`interactive-item-pill ${gameState.selectedItems.includes(idx) ? 'clicked' : ''}`}
                    onClick={() => handleItemTap(idx)}
                  >
                    {gameState.selectedItems.includes(idx) ? '✨ ' + (idx + 1) : item}
                  </button>
                ))}

                {activity.id !== 'letter-hunt' && activity.id !== 'count-match' && ['🎨', '🌟', '🚀'].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`interactive-item-pill ${gameState.selectedItems.includes(idx) ? 'clicked' : ''}`}
                    onClick={() => handleItemTap(idx)}
                  >
                    {gameState.selectedItems.includes(idx) ? '🎉' : item}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#16a34a', fontWeight: 700, fontSize: '0.9rem' }}>
                <CheckCircle2 size={18} />
                <span>{gameState.selectedItems.length} of 3 collected</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
