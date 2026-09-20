import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

import LoginPage from './components/Login';
import HomePage from './components/Home';
import LearnerDashboard from './components/Dashboard';
import CustomCursor from './components/Cursor';
import { preloadAllAssets } from './utils/preloadAssets';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [authMode, setAuthMode] = useState('online');
  const [viewMode, setViewMode] = useState('home'); // 'home' or 'dashboard'
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  // Preload all critical assets at once & check saved session on initial mount
  useEffect(() => {
    // 1. Preload all images and assets at once
    preloadAllAssets().catch((err) => console.log('Asset preloading note:', err));

    // 2. Check saved session
    try {
      const savedUser =
        localStorage.getItem('ll_current_user') ||
        sessionStorage.getItem('ll_current_user');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.warn('Session check error', e);
    }

    // 3. Online/Offline network state listeners
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleLoginSuccess = (user, mode) => {
    setCurrentUser(user);
    setAuthMode(mode || 'online');
    setViewMode('home'); // Automatically navigates to the HomePage on successful login!
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.4 }
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('ll_current_user');
    localStorage.removeItem('ll_token');
    sessionStorage.removeItem('ll_current_user');
    setCurrentUser(null);
    setViewMode('home');
  };

  return (
    <>
      {/* Offline Status Badge */}
      {isOffline && (
        <div
          style={{
            position: 'fixed',
            bottom: '16px',
            right: '16px',
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            color: '#ffffff',
            padding: '0.5rem 1rem',
            borderRadius: '999px',
            fontFamily: 'var(--font-display)',
            fontSize: '0.85rem',
            fontWeight: 800,
            zIndex: 9999,
            boxShadow: '0 4px 15px rgba(217, 119, 6, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            pointerEvents: 'none'
          }}
        >
          <span>⚡</span>
          <span>Offline Ready • Progress Saved Locally</span>
        </div>
      )}
      {currentUser ? (
        /* LOGGED IN USER VIEWS */
        viewMode === 'dashboard' ? (
          <div className="app-home-viewport" style={{ padding: '1.5rem', background: '#e0f2fe', minHeight: '100vh' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => setViewMode('home')}
                  style={{
                    padding: '0.6rem 1.25rem',
                    borderRadius: '999px',
                    border: 'none',
                    background: '#7c3aed',
                    color: '#ffffff',
                    fontWeight: 800,
                    cursor: 'pointer',
                    fontFamily: 'var(--font-display)',
                    boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)'
                  }}
                >
                  ← Back to Learner Homepage 🎈
                </button>
              </div>
              <LearnerDashboard
                user={currentUser}
                mode={authMode}
                onLogout={handleLogout}
              />
            </div>
          </div>
        ) : (
          /* PRIMARY HOME PAGE AS REQUESTED */
          <HomePage
            user={currentUser}
            onLogout={handleLogout}
            onToggleDashboard={() => setViewMode('dashboard')}
          />
        )
      ) : (
        /* LOGIN / SIGN UP VIEW */
        <div className="app-viewport">
          <main className="main-canvas">
            <LoginPage onLoginSuccess={handleLoginSuccess} />
          </main>
        </div>
      )}

      {/* ZERO-LAG MASCOT CURSOR & DOTTED COLOR TRAIL */}
      <CustomCursor />
    </>
  );
}
