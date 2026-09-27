import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Home,
  BookOpen,
  Gamepad2,
  Book,
  Palette,
  MoreHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Lightbulb,
  Star,
  LayoutDashboard,
  Languages,
  Settings,
  Trophy,
  Menu,
  X,
  Users,
  Check
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import { useStudent } from '../../../context/StudentContext';
import StudentSwitcher from '../../StudentSwitcher';
import SettingsModal from '../../SettingsModal';
import ScoreRecordsModal from '../../ScoreRecordsModal';

export default function Navbar({ user, stars = 0, activeTab, onSelectTab, onLogout, onToggleDashboard }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showScoreRecordsModal, setShowScoreRecordsModal] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const { activeStudent, students = [], switchStudent } = useStudent();
  const navScrollRef = useRef(null);
  const profileRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Close profile dropdown on outside click or touch
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, []);

  // Prevent background page scrolling when mobile navigation menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on resize to desktop (> 768px) or escape key
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setDropdownOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navItems = [
    { id: 'home', label: t('navHome', 'Home'), icon: Home },
    { id: 'logic', label: t('navLogic', 'Logic & Thinking'), icon: Lightbulb },
    { id: 'activities', label: t('navActivities', 'Activities'), icon: Palette, defaultActive: true },
    { id: 'games', label: t('navGames', 'Games'), icon: Gamepad2 },
    { id: 'learn', label: t('navLearn', 'Learn'), icon: BookOpen },
    { id: 'stories', label: t('navStories', 'Stories'), icon: Book },
    { id: 'more', label: t('navMore', 'More'), icon: MoreHorizontal },
  ];

  // Check scroll positions to show/hide indicator arrows
  const checkScrollState = useCallback(() => {
    if (navScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navScrollRef.current;
      setCanScrollLeft(scrollLeft > 4);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
    }
  }, []);

  useEffect(() => {
    checkScrollState();
    window.addEventListener('resize', checkScrollState);
    return () => window.removeEventListener('resize', checkScrollState);
  }, [checkScrollState]);

  // Smooth scroll left or right
  const handleScroll = (direction) => {
    if (navScrollRef.current) {
      const scrollAmount = direction === 'left' ? -180 : 180;
      navScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScrollState, 260);
    }
  };

  // Enable mouse wheel horizontal scrolling
  const handleWheel = (e) => {
    if (navScrollRef.current && e.deltaY !== 0) {
      navScrollRef.current.scrollLeft += e.deltaY * 0.9;
      checkScrollState();
    }
  };

  const handleMobileNavSelect = (itemId) => {
    onSelectTab?.(itemId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="home-navbar-wrapper">
      <nav className="home-navbar">
        {/* Left: Little Learner Brand Logo & Title */}
        <div className="home-nav-left" onClick={() => onSelectTab?.('activities')}>
          <div className="home-brand-logo">
            <img src="/assets/star-mascot.jpg" alt="Little Learner Mascot Star" />
          </div>
          <div className="home-brand-text">
            <div className="home-brand-name">
              <span style={{ color: '#1e3a8a' }}>Little</span>
              <span>
                <span style={{ color: '#0284c7' }}>L</span>
                <span style={{ color: '#0ea5e9' }}>e</span>
                <span style={{ color: '#10b981' }}>a</span>
                <span style={{ color: '#84cc16' }}>r</span>
                <span style={{ color: '#f59e0b' }}>n</span>
                <span style={{ color: '#f97316' }}>e</span>
                <span style={{ color: '#ef4444' }}>r</span>
              </span>
            </div>
            <span className="home-brand-tagline">{t('brandTagline', 'Learn • Play • Grow')}</span>
          </div>
        </div>

        {/* Middle: Horizontally Scrollable Navigation Links (Desktop) */}
        <div className="home-nav-scroll-wrapper">
          {canScrollLeft && (
            <button
              type="button"
              className="home-nav-scroll-arrow left"
              onClick={() => handleScroll('left')}
              title="Scroll left"
              aria-label="Scroll navigation buttons left"
            >
              <ChevronLeft size={17} />
            </button>
          )}

          <ul
            className="home-nav-links"
            ref={navScrollRef}
            onScroll={checkScrollState}
            onWheel={handleWheel}
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = (activeTab || 'activities') === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`home-nav-item ${isActive ? 'is-active' : ''}`}
                    onClick={() => onSelectTab?.(item.id)}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {canScrollRight && (
            <button
              type="button"
              className="home-nav-scroll-arrow right"
              onClick={() => handleScroll('right')}
              title="Scroll right"
              aria-label="Scroll navigation buttons right"
            >
              <ChevronRight size={17} />
            </button>
          )}
        </div>

        {/* Right: Student Switcher, Star Counter, User Profile & Mobile Toggle */}
        <div className="home-nav-right">
          {/* Desktop Student Switcher */}
          <div className="desktop-student-switcher-wrap">
            <StudentSwitcher onOpenDashboard={onToggleDashboard} />
          </div>

          {/* Star Currency Counter */}
          <div
            className="star-counter-badge"
            onClick={() => setShowScoreRecordsModal(true)}
            title="Stars collected by active learner! Click to view game records."
            role="button"
            tabIndex={0}
            style={{ cursor: 'pointer' }}
          >
            <Star size={18} fill="#f59e0b" color="#f59e0b" />
            <span>{activeStudent ? activeStudent.total_stars : stars}</span>
          </div>

          {/* Profile Avatar Icon */}
          <div
            ref={profileRef}
            className={`user-profile-btn ${dropdownOpen ? 'open' : ''}`}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            title={user?.display_name || 'My Profile'}
            role="button"
            tabIndex={0}
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            <div className="user-avatar-circle">
              <img
                src={user?.avatar || '/assets/boy-avatar.jpg'}
                alt={user?.display_name || 'Learner Avatar'}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/assets/boy-avatar.jpg';
                }}
              />
            </div>

            {/* Desktop User Options Dropdown */}
            {dropdownOpen && (
              <div className="user-dropdown-menu" onClick={(e) => e.stopPropagation()}>
                <div className="dropdown-user-header">
                  <div className="dropdown-avatar-circle">
                    <img
                      src={user?.avatar || '/assets/boy-avatar.jpg'}
                      alt={user?.display_name || 'Avatar'}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/assets/boy-avatar.jpg';
                      }}
                    />
                  </div>
                  <div className="dropdown-user-info">
                    <span className="dropdown-user-name">{user?.display_name || 'Aarav'}</span>
                    <span className="dropdown-user-role">{t('level', 'Level')} 3 • Learner</span>
                  </div>
                </div>

                <div className="dropdown-divider" />

                <button
                  type="button"
                  className="dropdown-item-btn"
                  onClick={() => {
                    setDropdownOpen(false);
                    onToggleDashboard?.();
                  }}
                >
                  <LayoutDashboard size={16} color="#7c3aed" />
                  <span>Faculty Dashboard</span>
                </button>

                <button
                  type="button"
                  className="dropdown-item-btn"
                  onClick={() => {
                    setDropdownOpen(false);
                    setShowScoreRecordsModal(true);
                  }}
                  title="View detailed score record of each game played"
                >
                  <Trophy size={16} color="#f59e0b" />
                  <span>Game Score Records</span>
                </button>

                <button
                  type="button"
                  className="dropdown-item-btn"
                  onClick={() => {
                    setDropdownOpen(false);
                    setShowSettingsModal(true);
                  }}
                  title="Configure language, speech, and preferences"
                >
                  <Settings size={16} color="#0284c7" />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <span>{t('settings', 'Settings')}</span>
                    <span style={{
                      fontSize: '0.68rem',
                      color: '#475569',
                      background: '#f1f5f9',
                      padding: '2px 6px',
                      borderRadius: '6px',
                      fontWeight: 700
                    }}>
                      {language === 'mr' ? 'मराठी 🇮🇳' : 'EN 🇬🇧'}
                    </span>
                  </div>
                </button>

                <div className="dropdown-divider" />

                <button
                  type="button"
                  className="dropdown-item-btn logout"
                  onClick={() => {
                    setDropdownOpen(false);
                    onLogout?.();
                  }}
                >
                  <LogOut size={16} />
                  <span>{t('logout', 'Sign Out')}</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger Toggle Button */}
          <button
            type="button"
            className={`home-mobile-menu-btn ${mobileMenuOpen ? 'is-open' : ''}`}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* ==================================================================== */}
      {/* MOBILE INTERACTIVE DROPDOWN MENU */}
      {/* ==================================================================== */}
      {mobileMenuOpen && (
        <div
          className="home-mobile-dropdown-backdrop"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="home-mobile-dropdown-sheet"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Active Learner Summary Header */}
            <div className="mobile-dropdown-learner-card">
              <div className="mobile-learner-left">
                <div className="mobile-learner-avatar">
                  <img
                    src={user?.avatar || '/assets/boy-avatar.jpg'}
                    alt={activeStudent?.name || user?.display_name || 'Learner'}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/assets/boy-avatar.jpg';
                    }}
                  />
                </div>
                <div className="mobile-learner-details">
                  <div className="mobile-learner-name-line">
                    <strong className="mobile-learner-name">
                      {activeStudent?.name || user?.display_name || 'Learner'}
                    </strong>
                    <span className="mobile-learner-id-chip">
                      {activeStudent?.student_id || activeStudent?.id || 'STU-001'}
                    </span>
                  </div>
                  <span className="mobile-learner-sub">
                    {activeStudent?.grade || 'Kindergarten'} • Level 3 Learner
                  </span>
                </div>
              </div>

              <div
                className="mobile-learner-star-pill"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowScoreRecordsModal(true);
                }}
                role="button"
                tabIndex={0}
                title="View stars & score records"
              >
                <Star size={16} fill="#f59e0b" color="#f59e0b" />
                <span>{activeStudent ? activeStudent.total_stars : stars}</span>
              </div>
            </div>

            {/* Switch Active Learner in Mobile Menu (Direct touch pills, no nested popups) */}
            {students && students.length > 0 && (
              <div className="mobile-dropdown-section">
                <div className="mobile-section-header">
                  <div className="mobile-section-title">
                    <Users size={16} color="#7c3aed" />
                    <span>Switch Active Student</span>
                  </div>
                </div>
                <div className="mobile-students-pill-grid">
                  {students.map((stu) => {
                    const isSelected = (activeStudent?.id === stu.id || activeStudent?.student_id === stu.student_id);
                    return (
                      <button
                        key={stu.student_id || stu.id}
                        type="button"
                        className={`mobile-student-select-btn ${isSelected ? 'is-selected' : ''}`}
                        onClick={() => {
                          switchStudent(stu.student_id || stu.id);
                        }}
                      >
                        <div className="stu-select-icon">
                          {isSelected ? <Check size={14} color="#ffffff" strokeWidth={3} /> : '👤'}
                        </div>
                        <div className="stu-select-text">
                          <span className="stu-select-name">{stu.name}</span>
                          <span className="stu-select-id">{stu.student_id || stu.id}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Navigation Tabs Grid */}
            <div className="mobile-dropdown-section">
              <div className="mobile-section-header">
                <div className="mobile-section-title">
                  <BookOpen size={16} color="#0284c7" />
                  <span>Explore Curriculum & Games</span>
                </div>
              </div>
              <div className="mobile-nav-grid">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = (activeTab || 'activities') === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`mobile-nav-card-btn ${isActive ? 'is-active' : ''}`}
                      onClick={() => handleMobileNavSelect(item.id)}
                    >
                      <div className="mobile-nav-icon-badge">
                        <Icon size={18} />
                      </div>
                      <span className="mobile-nav-btn-text">{item.label}</span>
                      {isActive && <span className="mobile-nav-active-indicator" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions (Faculty Dashboard, Records, Settings, Sign Out) */}
            <div className="mobile-dropdown-section">
              <div className="mobile-section-header">
                <div className="mobile-section-title">
                  <Settings size={16} color="#64748b" />
                  <span>Tools & Preferences</span>
                </div>
              </div>
              <div className="mobile-action-links-list">
                <button
                  type="button"
                  className="mobile-action-row-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onToggleDashboard?.();
                  }}
                >
                  <div className="mobile-item-icon-circle purple">
                    <LayoutDashboard size={17} />
                  </div>
                  <span className="mobile-item-label">Faculty Dashboard</span>
                  <ChevronRight size={17} className="mobile-item-arrow" />
                </button>

                <button
                  type="button"
                  className="mobile-action-row-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShowScoreRecordsModal(true);
                  }}
                >
                  <div className="mobile-item-icon-circle amber">
                    <Trophy size={17} />
                  </div>
                  <span className="mobile-item-label">Game Score Records</span>
                  <ChevronRight size={17} className="mobile-item-arrow" />
                </button>

                <button
                  type="button"
                  className="mobile-action-row-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShowSettingsModal(true);
                  }}
                >
                  <div className="mobile-item-icon-circle blue">
                    <Settings size={17} />
                  </div>
                  <div className="mobile-item-text-group">
                    <span className="mobile-item-label">{t('settings', 'Settings')}</span>
                    <span className="mobile-lang-tag">
                      {language === 'mr' ? 'मराठी 🇮🇳' : 'English 🇬🇧'}
                    </span>
                  </div>
                  <ChevronRight size={17} className="mobile-item-arrow" />
                </button>

                <button
                  type="button"
                  className="mobile-action-row-btn logout"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout?.();
                  }}
                >
                  <div className="mobile-item-icon-circle red">
                    <LogOut size={17} />
                  </div>
                  <span className="mobile-item-label">{t('logout', 'Sign Out')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Settings & Language Modal */}
      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
      />

      {/* Detailed Game Score Records Modal */}
      <ScoreRecordsModal
        isOpen={showScoreRecordsModal}
        onClose={() => setShowScoreRecordsModal(false)}
      />
    </header>
  );
}
