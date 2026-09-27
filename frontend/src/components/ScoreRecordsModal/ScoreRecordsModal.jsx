import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Star,
  Trophy,
  Award,
  Gamepad2,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Flame,
  UserCheck,
  Sparkles
} from 'lucide-react';
import { useStudent } from '../../context/StudentContext';
import { useLanguage } from '../../context/LanguageContext';
import './ScoreRecordsModal.css';

// Friendly game metadata with emoji icons and category colors
const GAME_META = {
  'odd-one-out': { title: 'Odd One Out', icon: '🔍', color: '#f59e0b', category: 'Logic' },
  'good-habits': { title: 'Good Habits & Manners', icon: '🌱', color: '#10b981', category: 'Social' },
  'emotional-recognition': { title: 'Emotional Recognition', icon: '😊', color: '#ec4899', category: 'Social' },
  'social-skills': { title: 'Social Skills & Empathy', icon: '🤝', color: '#6366f1', category: 'Social' },
  'memory-development': { title: 'Memory Development', icon: '🧠', color: '#8b5cf6', category: 'Logic' },
  'picture-completion': { title: 'Picture Completion', icon: '🖼️', color: '#06b6d4', category: 'Creativity' },
  'drawing-game': { title: 'Creative Drawing Canvas', icon: '🎨', color: '#f43f5e', category: 'Creativity' },
  'tracing-game': { title: 'Letter & Number Tracing', icon: '✏️', color: '#3b82f6', category: 'Writing' },
  'picture-puzzles': { title: 'Picture Puzzles', icon: '🧩', color: '#14b8a6', category: 'Games' },
  'alphabet-phonics': { title: 'Alphabet & Phonics', icon: '🔤', color: '#7c3aed', category: 'Reading' },
  'count-match': { title: 'Numbers & Counting', icon: '🔢', color: '#d97706', category: 'Math' },
  'shapes-colors': { title: 'Shapes & Colors', icon: '🔷', color: '#0284c7', category: 'STEM' }
};

export default function ScoreRecordsModal({ isOpen, onClose, selectedStudentId = null, onSelectGame = null }) {
  const { students, activeStudent, switchStudent } = useStudent();
  const { t, language } = useLanguage();
  const isMarathi = language === 'mr';

  // Target student to inspect (defaults to selected or active student)
  const [viewStudentId, setViewStudentId] = useState(() => selectedStudentId || activeStudent?.student_id || 'STU-001');

  const openTimeRef = React.useRef(Date.now());
  const isOverlayMouseDownRef = React.useRef(false);

  // Sync if selectedStudentId changes from outside
  React.useEffect(() => {
    if (isOpen) {
      openTimeRef.current = Date.now();
      isOverlayMouseDownRef.current = false;
    }
    if (selectedStudentId) {
      setViewStudentId(selectedStudentId);
    } else if (activeStudent?.student_id) {
      setViewStudentId(activeStudent.student_id);
    }
  }, [isOpen, selectedStudentId, activeStudent]);

  if (!isOpen) return null;

  const handleOverlayMouseDown = (e) => {
    if (e.target === e.currentTarget) {
      isOverlayMouseDownRef.current = true;
    }
  };

  const handleOverlayClick = (e) => {
    // Only close if mousedown was also initiated on the backdrop itself and at least 300ms elapsed
    if (Date.now() - openTimeRef.current < 300) {
      isOverlayMouseDownRef.current = false;
      return;
    }
    if (isOverlayMouseDownRef.current && e.target === e.currentTarget) {
      onClose?.();
    }
    isOverlayMouseDownRef.current = false;
  };

  const currentStudent = students.find(s => s.student_id === viewStudentId || s.id === viewStudentId) || activeStudent || students[0];
  const progressList = Array.isArray(currentStudent?.progress) ? currentStudent.progress : [];

  // Sort progress by most recent played or highest score
  const sortedProgress = [...progressList].sort((a, b) => {
    const timeA = a.last_played ? new Date(a.last_played).getTime() : 0;
    const timeB = b.last_played ? new Date(b.last_played).getTime() : 0;
    return timeB - timeA;
  });

  const totalGamesPlayed = progressList.reduce((acc, p) => acc + (p.times_played || 1), 0);
  const bestGame = progressList.length > 0 
    ? [...progressList].sort((a, b) => (b.score || 0) - (a.score || 0))[0]
    : null;

  const formatLastPlayed = (isoDate) => {
    if (!isoDate) return isMarathi ? 'अलीकडे' : 'Recently';
    try {
      const date = new Date(isoDate);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      if (diffMins < 1) return isMarathi ? 'आत्ताच' : 'Just now';
      if (diffMins < 60) return isMarathi ? `${diffMins} मिनिटांपूर्वी` : `${diffMins}m ago`;
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return isMarathi ? `${diffHours} तासांपूर्वी` : `${diffHours}h ago`;
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch (_) {
      return isMarathi ? 'अलीकडे' : 'Recently';
    }
  };

  const modalContent = (
    <div
      className="score-modal-overlay"
      onMouseDown={handleOverlayMouseDown}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="score-modal-container"
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="score-modal-header">
          <div className="score-modal-header-left">
            <div className="score-modal-badge-icon">
              <Trophy size={22} color="#ffffff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <h3 className="score-modal-title">
                  {isMarathi ? 'विद्यार्थी गेम स्टार रेकॉर्ड' : 'Student Game Activity Record'}
                </h3>
                <span className="score-modal-sid-pill">{currentStudent?.student_id || 'STU-001'}</span>
              </div>
              <p className="score-modal-subtitle">
                {isMarathi
                  ? 'प्रत्येक खेळलेल्या गेमचे अचूक स्टार आणि सत्र ट्रॅकिंग'
                  : 'Detailed activity history, stars earned, and play counts'}
              </p>
            </div>
          </div>
          <button className="score-modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Student Selector Switcher Strip */}
        <div className="score-modal-student-strip">
          <span className="strip-label">
            <UserCheck size={15} />
            <span>{isMarathi ? 'विद्यार्थी निवडा:' : 'Select Student:'}</span>
          </span>
          <div className="student-pills-row">
            {students.map((stu) => {
              const sid = stu.student_id || stu.id;
              const isSelected = sid === currentStudent?.student_id;
              return (
                <button
                  key={sid}
                  type="button"
                  className={`stu-select-pill ${isSelected ? 'active' : ''}`}
                  onClick={() => setViewStudentId(sid)}
                >
                  <span className="stu-pill-id">[{sid}]</span>
                  <span className="stu-pill-name">{stu.name}</span>
                  <span className="stu-pill-stars">⭐ {stu.total_stars || 0}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Body */}
        <div className="score-modal-body">
          {/* Top Metric Cards */}
          <div className="score-metrics-grid">
            <div className="score-metric-card stars-card">
              <div className="metric-icon-wrap stars-wrap">
                <Star size={24} fill="#f59e0b" color="#f59e0b" />
              </div>
              <div className="metric-content">
                <span className="metric-number">{currentStudent?.total_stars || 0}</span>
                <span className="metric-label">{isMarathi ? 'एकूण तारे' : 'Total Stars Earned'}</span>
                <span className="metric-hint">{isMarathi ? 'होमपेज स्टार' : 'Shows in Navbar'}</span>
              </div>
            </div>

            <div className="score-metric-card score-card">
              <div className="metric-icon-wrap score-wrap">
                <Gamepad2 size={24} color="#7c3aed" />
              </div>
              <div className="metric-content">
                <span className="metric-number">{progressList.length}</span>
                <span className="metric-label">{isMarathi ? 'खेळलेले उपक्रम' : 'Activities Played'}</span>
                <span className="metric-hint">{isMarathi ? 'विविध खेळ' : 'Unique games'}</span>
              </div>
            </div>

            <div className="score-metric-card plays-card">
              <div className="metric-icon-wrap plays-wrap">
                <Award size={24} color="#0284c7" />
              </div>
              <div className="metric-content">
                <span className="metric-number">{totalGamesPlayed}</span>
                <span className="metric-label">{isMarathi ? 'खेळलेली सत्रे' : 'Rounds Completed'}</span>
                <span className="metric-hint">{isMarathi ? 'एकूण सराव' : 'Practice sessions'}</span>
              </div>
            </div>

            <div className="score-metric-card best-card">
              <div className="metric-icon-wrap best-wrap">
                <Flame size={24} color="#ea580c" />
              </div>
              <div className="metric-content">
                <span className="metric-best-name">
                  {bestGame ? (GAME_META[bestGame.game_id]?.title || bestGame.game_title) : '—'}
                </span>
                <span className="metric-label">{isMarathi ? 'सर्वोत्कृष्ट खेळ' : 'Top Performing Game'}</span>
                <span className="metric-hint">
                  {bestGame ? `${bestGame.stars} ⭐ earned` : (isMarathi ? 'सुरू करा' : 'Not played yet')}
                </span>
              </div>
            </div>
          </div>

          {/* Section: Game-by-Game Star Record */}
          <div className="game-records-section">
            <div className="game-records-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.2rem' }}>🎮</span>
                <h4 className="section-title">
                  {isMarathi ? 'खेळांचे वैयक्तिक स्टार रेकॉर्ड' : 'Star Record for Each Game Played'}
                </h4>
              </div>
              <span className="game-count-badge">
                {progressList.length} {isMarathi ? 'खेळ नोंदवले' : 'games recorded'}
              </span>
            </div>

            {progressList.length === 0 ? (
              <div className="empty-scores-state">
                <div className="empty-scores-icon">⭐</div>
                <h5 className="empty-title">
                  {isMarathi ? 'अद्याप कोणतेही गेम खेळले नाहीत' : 'No game records yet for this student'}
                </h5>
                <p className="empty-desc">
                  {isMarathi
                    ? `विद्यार्थी ${currentStudent?.name} (${currentStudent?.student_id}) ने खेळ खेळताच मिळालेले स्टार येथे दिसतील आणि होमपेज नेव्हबारमध्ये थेट जोडले जातील!`
                    : `As soon as ${currentStudent?.name} (${currentStudent?.student_id}) plays any game, their earned stars will be recorded here and immediately reflected in the navbar!`}
                </p>
              </div>
            ) : (
              <div className="score-records-list">
                {sortedProgress.map((item, idx) => {
                  const meta = GAME_META[item.game_id] || {
                    title: item.game_title || item.game_id,
                    icon: '🎯',
                    color: '#6366f1',
                    category: 'Activity'
                  };

                  return (
                    <div key={item.game_id || idx} className="game-record-item-card">
                      {/* Left: Icon & Title */}
                      <div className="record-game-left">
                        <div
                          className="record-game-icon-circle"
                          style={{ background: `${meta.color}15`, border: `1.5px solid ${meta.color}35` }}
                        >
                          <span style={{ fontSize: '1.4rem' }}>{meta.icon}</span>
                        </div>
                        <div className="record-game-details">
                          <div className="record-game-title-row">
                            <span className="record-game-title">{meta.title}</span>
                            <span className="record-game-category">{meta.category}</span>
                          </div>
                          <div className="record-game-sub">
                            <span className="record-times-played">
                              <Gamepad2 size={13} />
                              {item.times_played || 1} {isMarathi ? 'वेळा खेळले' : 'times played'}
                            </span>
                            <span className="sub-dot">•</span>
                            <span className="record-last-time">
                              <Clock size={13} />
                              {formatLastPlayed(item.last_played)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Stars Earned */}
                      <div className="record-game-right">
                        <div className="record-stat-box stars-stat">
                          <span className="stat-label">{isMarathi ? 'मिळालेले तारे' : 'Stars Earned'}</span>
                          <span className="stat-value-stars">⭐ {item.stars || 0}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="score-modal-footer">
          <div className="footer-tip">
            <Sparkles size={16} color="#d97706" />
            <span>
              {isMarathi
                ? 'कोणताही गेम खेळताच मिळणारे स्टार्स होमपेजच्या नेव्हबारमध्ये थेट जोडले जातात.'
                : 'All stars earned during games are automatically added to the navbar star counter!'}
            </span>
          </div>
          <button className="score-modal-done-btn" onClick={onClose}>
            {isMarathi ? 'पूर्ण झाले' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
}
