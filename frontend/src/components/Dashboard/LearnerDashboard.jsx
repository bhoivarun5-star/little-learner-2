import React, { useState } from 'react';
import {
  GraduationCap,
  Users,
  BookOpen,
  Award,
  LogOut,
  Sparkles,
  PlusCircle,
  CheckCircle2,
  Calendar,
  BarChart3
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LearnerDashboard({ user, mode, onLogout }) {
  const [activeTab, setActiveTab] = useState('classes');
  const [announcementSent, setAnnouncementSent] = useState(false);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleSendStarReward = () => {
    setAnnouncementSent(true);
    triggerConfetti();
    setTimeout(() => setAnnouncementSent(false), 3500);
  };

  return (
    <div className="dashboard-container-card">
      {/* Top Faculty Header Bar */}
      <div style={profileBarStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.15rem' }}>
          <div style={avatarWrapStyle}>
            <img
              src={user?.avatar || '/assets/boy-avatar.jpg'}
              alt="Faculty Avatar"
              style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
            />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#1e1b4b', fontFamily: 'var(--font-display)', margin: 0 }}>
                {user?.display_name || 'Faculty Member'}
              </h2>
              <span style={facultyBadgeStyle}>Faculty Staff</span>
            </div>
            <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center', marginTop: '0.35rem' }}>
              <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>
                🏛️ Faculty & Staff Portal
              </span>
              <span style={{ fontSize: '0.85rem', color: mode === 'offline' ? '#d97706' : '#16a34a', fontWeight: 700 }}>
                ● {mode === 'offline' ? 'Offline Progressive Mode' : 'Connected to Django API'}
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={statBoxStyle}>
            <Users color="#0284c7" size={20} />
            <span style={statTextStyle}>{user?.assigned_students || 24} Students</span>
          </div>
          <div style={statBoxStyle}>
            <BookOpen color="#16a34a" size={20} />
            <span style={statTextStyle}>{user?.active_courses || 4} Classes</span>
          </div>
          <button onClick={onLogout} style={logoutBtnStyle} title="Log Out of Faculty Portal">
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Quick Action Bar for Staff */}
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1.75rem', flexWrap: 'wrap' }}>
        <button
          onClick={handleSendStarReward}
          style={primaryActionBtn}
        >
          <Sparkles size={18} />
          <span>Award Class Stars ⭐</span>
        </button>

        <button
          onClick={() => alert('New lesson module added to offline cache!')}
          style={secondaryActionBtn}
        >
          <PlusCircle size={18} />
          <span>Create New Lesson</span>
        </button>
      </div>

      {announcementSent && (
        <div style={successAlertStyle}>
          <CheckCircle2 size={20} color="#16a34a" />
          <span>Hooray! 50 reward stars were distributed to your active students! 🌟</span>
        </div>
      )}

      {/* Classroom Modules */}
      <div className="dashboard-classes-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '1.25rem', marginTop: '1.75rem' }}>
        {/* Class 1 */}
        <div style={courseCardStyle('#f0fdf4', '#16a34a')}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '2rem' }}>🦁</span>
            <span style={badgeSmall('#16a34a')}>Grade 1 • 24 Students</span>
          </div>
          <h3 style={courseTitleStyle}>STEM & Number Safari</h3>
          <p style={courseDescStyle}>Unit 3: Basic addition, counting patterns, and geometric animal shapes.</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
            <span style={{ fontSize: '0.85rem', color: '#16a34a', fontWeight: 700 }}>92% Progress</span>
            <button style={courseBtnStyle('#16a34a')}>Manage Class ➔</button>
          </div>
        </div>

        {/* Class 2 */}
        <div style={courseCardStyle('#eff6ff', '#0284c7')}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '2rem' }}>📖</span>
            <span style={badgeSmall('#0284c7')}>Kindergarten • 18 Students</span>
          </div>
          <h3 style={courseTitleStyle}>Phonics & Storybook Castle</h3>
          <p style={courseDescStyle}>Unit 2: Alphabet sound matching, rhymes, and story listening adventures.</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
            <span style={{ fontSize: '0.85rem', color: '#0284c7', fontWeight: 700 }}>85% Progress</span>
            <button style={courseBtnStyle('#0284c7')}>Manage Class ➔</button>
          </div>
        </div>

        {/* Class 3 */}
        <div style={courseCardStyle('#fdf4ff', '#8b5cf6')}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '2rem' }}>🎨</span>
            <span style={badgeSmall('#8b5cf6')}>Pre-K • 20 Students</span>
          </div>
          <h3 style={courseTitleStyle}>Creative Arts & Music</h3>
          <p style={courseDescStyle}>Unit 1: Color mixing, rhythm clapping, and tactile finger painting.</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
            <span style={{ fontSize: '0.85rem', color: '#8b5cf6', fontWeight: 700 }}>96% Progress</span>
            <button style={courseBtnStyle('#8b5cf6')}>Manage Class ➔</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const profileBarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: '#ffffff',
  padding: '1.25rem 1.75rem',
  borderRadius: '24px',
  boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
  flexWrap: 'wrap',
  gap: '1rem'
};

const avatarWrapStyle = {
  width: '64px',
  height: '64px',
  borderRadius: '50%',
  border: '3px solid #8b5cf6',
  padding: '2px'
};

const facultyBadgeStyle = {
  background: '#ede9fe',
  color: '#7c3aed',
  fontSize: '0.78rem',
  fontWeight: 700,
  padding: '3px 9px',
  borderRadius: '999px',
  fontFamily: 'var(--font-display)'
};

const statBoxStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.45rem',
  background: '#f8fafc',
  padding: '0.55rem 1.1rem',
  borderRadius: '16px',
  border: '1px solid #e2e8f0'
};

const statTextStyle = {
  fontSize: '0.95rem',
  fontWeight: 800,
  color: '#1e293b',
  fontFamily: 'var(--font-display)'
};

const logoutBtnStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  background: '#fee2e2',
  color: '#b91c1c',
  border: 'none',
  padding: '0.6rem 1.1rem',
  borderRadius: '14px',
  fontWeight: 700,
  cursor: 'pointer'
};

const primaryActionBtn = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
  color: '#ffffff',
  border: 'none',
  padding: '0.75rem 1.35rem',
  borderRadius: '16px',
  fontFamily: 'var(--font-display)',
  fontWeight: 700,
  cursor: 'pointer',
  boxShadow: '0 4px 14px rgba(124, 58, 237, 0.3)'
};

const secondaryActionBtn = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  background: '#ffffff',
  color: '#334155',
  border: '1.5px solid #e2e8f0',
  padding: '0.75rem 1.35rem',
  borderRadius: '16px',
  fontFamily: 'var(--font-display)',
  fontWeight: 700,
  cursor: 'pointer'
};

const successAlertStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.6rem',
  background: '#dcfce7',
  color: '#15803d',
  padding: '0.85rem 1.25rem',
  borderRadius: '16px',
  marginTop: '1.25rem',
  fontWeight: 700,
  fontSize: '0.92rem',
  border: '1px solid #bbf7d0'
};

const courseCardStyle = (bgColor, accentColor) => ({
  background: bgColor,
  padding: '1.5rem',
  borderRadius: '22px',
  border: `1.5px solid ${accentColor}33`,
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem'
});

const courseTitleStyle = {
  fontSize: '1.25rem',
  fontWeight: 800,
  color: '#1e1b4b',
  fontFamily: 'var(--font-display)'
};

const courseDescStyle = {
  fontSize: '0.88rem',
  color: '#475569',
  lineHeight: 1.4,
  marginBottom: '1rem'
};

const badgeSmall = (color) => ({
  background: '#ffffff',
  color: color,
  fontSize: '0.75rem',
  fontWeight: 700,
  padding: '3px 8px',
  borderRadius: '999px',
  border: `1px solid ${color}33`
});

const courseBtnStyle = (color) => ({
  background: color,
  color: '#ffffff',
  border: 'none',
  borderRadius: '12px',
  padding: '0.55rem 0.95rem',
  fontWeight: 700,
  cursor: 'pointer',
  fontSize: '0.85rem'
});
