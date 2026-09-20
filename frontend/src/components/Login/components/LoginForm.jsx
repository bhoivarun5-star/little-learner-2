import React, { useState } from 'react';
import {
  User,
  Lock,
  Eye,
  EyeOff,
  Check,
  ArrowRight,
  Mail,
  ArrowLeft
} from 'lucide-react';
import { loginUser, registerUser, socialLogin } from '../../../api/auth';

export default function LoginForm({ onLoginSuccess, onOpenForgotPassword, onInputInteraction }) {
  // Mode: 'login' or 'signup' (on the exact same form, NO pop-ups)
  const [formMode, setFormMode] = useState('login');

  // Login form state
  const [identifier, setIdentifier] = useState('learner@littlelearner.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Signup form state
  const [fullName, setFullName] = useState('');
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [statusAlert, setStatusAlert] = useState(null);

  // Handle Login Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setStatusAlert(null);

    if (!identifier.trim() || !password.trim()) {
      setStatusAlert({ type: 'error', message: 'Please provide both email/username and password.' });
      return;
    }

    setLoading(true);
    try {
      const result = await loginUser(identifier, password, rememberMe);
      if (result.success) {
        setStatusAlert({ type: 'success', message: result.message });
        setTimeout(() => {
          onLoginSuccess?.(result.user, result.mode);
        }, 500);
      } else {
        setStatusAlert({ type: 'error', message: result.error || 'Invalid credentials.' });
      }
    } catch (err) {
      setStatusAlert({ type: 'error', message: 'Connection issue. Try demo credentials: learner@littlelearner.com' });
    } finally {
      setLoading(false);
    }
  };

  // Handle Sign Up Submit (on same form, no popup)
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setStatusAlert(null);

    if (!signUpUsername.trim() || !signUpPassword.trim()) {
      setStatusAlert({ type: 'error', message: 'Username and password are required.' });
      return;
    }

    setLoading(true);
    try {
      const res = await registerUser({
        username: signUpUsername.trim(),
        email: signUpEmail.trim() || `${signUpUsername.trim()}@littlelearner.com`,
        password: signUpPassword.trim(),
        displayName: fullName.trim() || signUpUsername.trim()
      });

      if (res.success) {
        setStatusAlert({ type: 'success', message: res.message });
        setTimeout(() => {
          onLoginSuccess?.(res.user, res.mode);
        }, 500);
      } else {
        setStatusAlert({ type: 'error', message: res.error || 'Failed to create account.' });
      }
    } catch (err) {
      setStatusAlert({ type: 'error', message: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Handle Social Login (Google, Apple, Facebook)
  const handleSocialSignIn = async (provider) => {
    setLoading(true);
    setStatusAlert(null);
    try {
      const result = await socialLogin(provider);
      if (result.success) {
        setStatusAlert({ type: 'success', message: result.message });
        setTimeout(() => {
          onLoginSuccess?.(result.user, result.mode);
        }, 500);
      }
    } catch (err) {
      setStatusAlert({ type: 'error', message: `Could not connect with ${provider}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-column">
      {/* Top Greeting Pill */}
      <div className="greeting-pill-wrap">
        <div className="greeting-pill">
          <span>💜</span>
          <span>Nice to see you again!</span>
          <span>💜</span>
        </div>
      </div>

      {/* Avatar Section */}
      <div className="avatar-section">
        <div className="avatar-circle-frame" title="Account Profile">
          <img
            src="/assets/boy-avatar.jpg"
            alt="Avatar"
            className="avatar-img"
          />
        </div>
      </div>

      {/* Header Group */}
      <div className="login-header-group">
        <h2 className="login-title">
          {formMode === 'login' ? 'Login to Your Account' : 'Create Your Account'}
        </h2>
        <p className="login-subtitle">
          We're excited to learn and play with you!
        </p>
      </div>

      {/* Alert Banner */}
      {statusAlert && (
        <div
          className={`status-alert-toast ${
            statusAlert.type === 'error' ? 'status-alert-error' : 'status-alert-success'
          }`}
          style={{ marginBottom: '0.85rem' }}
        >
          <span>{statusAlert.type === 'error' ? '⚠️' : '🎉'}</span>
          <span>{statusAlert.message}</span>
        </div>
      )}

      {/* MODE 1: LOGIN FORM */}
      {formMode === 'login' && (
        <form className="login-form" onSubmit={handleLoginSubmit}>
          {/* Email or Username */}
          <div className="input-field-wrap">
            <span className="input-icon-left">
              <User size={19} />
            </span>
            <input
              type="text"
              className="custom-input"
              placeholder="Email or Username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              onFocus={onInputInteraction}
              onClick={onInputInteraction}
              required
              autoComplete="username"
            />
          </div>

          {/* Password */}
          <div className="input-field-wrap">
            <span className="input-icon-left">
              <Lock size={19} />
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              className="custom-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={onInputInteraction}
              onClick={onInputInteraction}
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              className="input-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>

          {/* Options Row: Remember me + Forgot password */}
          <div className="form-options-row">
            <label className="remember-label" onClick={() => setRememberMe(!rememberMe)}>
              <div className={`custom-checkbox ${rememberMe ? 'checked' : ''}`}>
                {rememberMe && <Check size={13} color="#ffffff" strokeWidth={3} />}
              </div>
              <span>Remember me</span>
            </label>

            <button
              type="button"
              className="forgot-password-link"
              style={{ background: 'none', border: 'none' }}
              onClick={onOpenForgotPassword}
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit Button: simple word 'Login' */}
          <button
            type="submit"
            className="btn-login-submit"
            disabled={loading}
          >
            {loading ? (
              <span>Signing In... 🚀</span>
            ) : (
              <>
                <ArrowRight size={20} strokeWidth={2.6} />
                <span>Login</span>
              </>
            )}
          </button>

          {/* Divider */}
          <div className="divider-wrap">
            <div className="divider-line"></div>
            <span className="divider-text">or continue with</span>
            <div className="divider-line"></div>
          </div>

          {/* Social / SSO Buttons */}
          <div className="social-buttons-row">
            <button
              type="button"
              className="btn-social"
              onClick={() => handleSocialSignIn('Google')}
              title="Continue with Google"
            >
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.94 0 12s.45 3.84 1.24 5.42l4.04-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              className="btn-social"
              onClick={() => handleSocialSignIn('Apple')}
              title="Continue with Apple"
            >
              <svg viewBox="0 0 170 170" width="18" height="18" fill="currentColor">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.69-7.85-12.02-14.42-6.44-9.78-11.45-20.73-15.02-32.85-3.57-12.12-5.36-23.73-5.36-34.84 0-14.77 3.75-26.89 11.24-36.36 7.49-9.47 16.9-14.31 28.23-14.53 4.8 0 10.22 1.26 16.27 3.78 6.05 2.52 10.15 3.84 12.3 3.96 1.84 0 6.09-1.34 12.74-4.01 6.65-2.67 12.33-3.89 17.03-3.67 13.06.76 23.47 5.77 31.23 15.02-11.76 7.18-17.51 17.07-17.26 29.68.25 9.9 4.16 18.23 11.74 24.99 7.58 6.75 16.71 10.51 27.38 11.28-2.61 7.62-5.77 15.35-9.48 23.2m-33.02-105.7c0-6.75 2.52-13.23 7.56-19.45 5.04-6.22 11.38-10.3 19.02-12.24.43 1.09.65 2.29.65 3.61 0 6.64-2.5 13.11-7.5 19.41-5 6.3-11.53 10.45-19.59 12.44-.07-1.18-.14-2.43-.14-3.77z"/>
              </svg>
              <span>Apple</span>
            </button>

            <button
              type="button"
              className="btn-social"
              onClick={() => handleSocialSignIn('Facebook')}
              title="Continue with Facebook"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Facebook</span>
            </button>
          </div>

          {/* SIGN UP SWITCH (NO POPUP - ON SAME FORM) */}
          <div className="signup-prompt-row">
            <span>Don't have an account?</span>
            <button
              type="button"
              className="signup-action-link"
              style={{ background: 'none', border: 'none' }}
              onClick={() => {
                setStatusAlert(null);
                setFormMode('signup');
              }}
            >
              <span>Sign Up</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </form>
      )}

      {/* MODE 2: SIGN UP ON SAME FORM (NO POP-UP!) */}
      {formMode === 'signup' && (
        <form className="login-form" onSubmit={handleSignUpSubmit}>
          {/* Full Name */}
          <div className="input-field-wrap">
            <span className="input-icon-left">
              <User size={19} />
            </span>
            <input
              type="text"
              className="custom-input"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          {/* Username */}
          <div className="input-field-wrap">
            <span className="input-icon-left">
              <User size={19} />
            </span>
            <input
              type="text"
              className="custom-input"
              placeholder="Username"
              value={signUpUsername}
              onChange={(e) => setSignUpUsername(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="input-field-wrap">
            <span className="input-icon-left">
              <Mail size={19} />
            </span>
            <input
              type="email"
              className="custom-input"
              placeholder="Email"
              value={signUpEmail}
              onChange={(e) => setSignUpEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="input-field-wrap">
            <span className="input-icon-left">
              <Lock size={19} />
            </span>
            <input
              type={showSignUpPassword ? 'text' : 'password'}
              className="custom-input"
              placeholder="Password"
              value={signUpPassword}
              onChange={(e) => setSignUpPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="input-toggle-btn"
              onClick={() => setShowSignUpPassword(!showSignUpPassword)}
              aria-label={showSignUpPassword ? 'Hide password' : 'Show password'}
            >
              {showSignUpPassword ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>

          {/* Register Button: simple word 'Register' */}
          <button
            type="submit"
            className="btn-login-submit"
            disabled={loading}
          >
            {loading ? (
              <span>Registering... 🌟</span>
            ) : (
              <>
                <ArrowRight size={20} strokeWidth={2.6} />
                <span>Register</span>
              </>
            )}
          </button>

          {/* BACK TO LOGIN (ON SAME FORM) */}
          <div className="signup-prompt-row">
            <span>Already have an account?</span>
            <button
              type="button"
              className="signup-action-link"
              style={{ background: 'none', border: 'none' }}
              onClick={() => {
                setStatusAlert(null);
                setFormMode('login');
              }}
            >
              <ArrowLeft size={15} />
              <span>Log In</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
