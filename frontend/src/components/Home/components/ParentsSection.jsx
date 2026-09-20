import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function ParentsSection({ onOpenParentTips }) {
  return (
    <div className="bottom-feature-banner for-parents-banner">
      <div className="parents-left-cluster">
        <img
          src="/assets/homepage/parents_avatar.jpg"
          alt="Happy Parents"
          className="parents-avatar-img"
        />
        <div className="parents-text-col">
          <h4 className="parents-title">For Parents</h4>
          <p className="parents-desc">
            Activities help children build skills while having fun. Learn together!
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          type="button"
          className="btn-parent-tips"
          onClick={onOpenParentTips}
        >
          <span>Parent Tips</span>
          <ChevronRight size={16} strokeWidth={3} />
        </button>
        <span style={{ fontSize: '1.4rem' }}>❤️</span>
      </div>
    </div>
  );
}
