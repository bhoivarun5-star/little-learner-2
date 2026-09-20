import React from 'react';
import confetti from 'canvas-confetti';

export default function MascotStarBadge() {
  const handleStarClick = () => {
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { x: 0.9, y: 0.1 }
    });
  };

  return (
    <div
      className="top-right-star-badge"
      onClick={handleStarClick}
      title="Click the magic star for good luck! ✨"
    >
      <img src="/assets/star-mascot.jpg" alt="Lucky Mascot Star" />
    </div>
  );
}
