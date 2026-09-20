import React, { useState } from 'react';
import {
  Home,
  BookOpen,
  Gamepad2,
  Book,
  Palette,
  MoreHorizontal,
  ChevronDown,
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

  const navItems = [
    { id: 'home', label: t('navHome', 'Home'), icon: Home },
    { id: 'logic', label: t('navLogic', 'Logic & Thinking'), icon: Lightbulb },
    { id: 'activities', label: t('navActivities', 'Activities'), icon: Palette, defaultActive: true },
    { id: 'games', label: t('navGames', 'Games'), icon: Gamepad2 },
    { id: 'learn', label: t('navLearn', 'Learn'), icon: BookOpen },
    { id: 'stories', label: t('navStories', 'Stories'), icon: Book },
    { id: 'more', label: t('navMore', 'More'), icon: MoreHorizontal },
  ];

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

        {/* Middle: Navigation Links */}
        <ul className="home-nav-links">
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

        {/* Right: Language Toggle, Star Counter & User Profile */}
        <div className="home-nav-right">
          {/* Language Switcher Pill */}
          <button
            type="button"
            className="home-lang-toggle-btn"
            onClick={toggleLanguage}
            title={language === 'mr' ? 'Switch to English' : 'मराठी भाषेत बदला'}
            aria-label="Toggle Language"
          >
            <Languages size={18} />
            <span className="lang-flag">{language === 'mr' ? '🇮🇳' : '🇬🇧'}</span>
            <span className="lang-name">{language === 'mr' ? 'मराठी' : 'English'}</span>
          </button>

          {/* Star Currency Counter */}
          <div className="star-counter-badge" title="Stars collected on Little Learner!">
            <Star size={20} fill="#f59e0b" color="#f59e0b" />
            <span>{stars}</span>
          </div>

          {/* User Profile Pill with Dropdown */}
          <div className="user-profile-pill" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <div className="user-avatar-circle">
              <img src="/assets/homepage/user_avatar.jpg" alt="Learner Avatar" />
            </div>
            <div className="user-info-text">
              <span className="user-name-title">{user?.display_name || 'Aarav'}</span>
              <span className="user-level-badge">{t('level', 'Level')} 3</span>
            </div>
            <ChevronDown size={16} color="#64748b" />

            {/* User Options Dropdown */}
            {dropdownOpen && (
              <div className="user-dropdown-menu" onClick={(e) => e.stopPropagation()}>
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
