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
  Languages
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

export default function Navbar({ user, stars = 125, activeTab, onSelectTab, onLogout, onToggleDashboard }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const navScrollRef = useRef(null);
  const profileRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
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

  return (
    <header className="home-navbar-wrapper">
      <nav className="home-navbar">
        {/* Left: Little Learner Logo */}
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

        {/* Middle: Horizontally Scrollable Navigation Links */}
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

        {/* Right: Language Toggle, Star Counter & User Profile */}
        <div className="home-nav-right">
          {/* Minimized Language Switcher Pill */}
          <button
            type="button"
            className="home-lang-toggle-btn compact"
            onClick={toggleLanguage}
            title={language === 'mr' ? 'Switch to English (मराठी चालू आहे)' : 'मराठी भाषेत बदला (English active)'}
            aria-label="Toggle Language"
          >
            <Languages size={15} />
            <span className="lang-flag">{language === 'mr' ? '🇮🇳' : '🇬🇧'}</span>
            <span className="lang-name">{language === 'mr' ? 'मराठी' : 'EN'}</span>
          </button>

          {/* Star Currency Counter */}
          <div className="star-counter-badge" title="Stars collected on Little Learner!">
            <Star size={18} fill="#f59e0b" color="#f59e0b" />
            <span>{stars}</span>
          </div>

          {/* Profile Avatar Icon Only (User name appears in dropdown on click) */}
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

            {/* User Options Dropdown */}
            {dropdownOpen && (
              <div className="user-dropdown-menu" onClick={(e) => e.stopPropagation()}>
                {/* User info header displayed upon clicking profile icon */}
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
        </div>
      </nav>
    </header>
  );
}
