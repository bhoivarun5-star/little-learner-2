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
  Star,
  LayoutDashboard
} from 'lucide-react';

export default function Navbar({ user, stars = 125, activeTab, onSelectTab, onLogout, onToggleDashboard }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'stories', label: 'Stories', icon: Book },
    { id: 'activities', label: 'Activities', icon: Palette, defaultActive: true },
    { id: 'more', label: 'More', icon: MoreHorizontal },
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
            <span className="home-brand-tagline">Learn • Play • Grow</span>
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

        {/* Right: Star Counter & User Profile */}
        <div className="home-nav-right">
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
              <span className="user-level-badge">Level 3</span>
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
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
