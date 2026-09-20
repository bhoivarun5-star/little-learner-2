import React, { useState } from 'react';
import { X, KeyRound, Mail, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setEmail('');
    onClose();
  };

  return (
    <div style={modalBackdropStyle}>
      <div style={modalBoxStyle}>
        <div style={headerStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <KeyRound color="#7c3aed" size={24} />
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1e1b4b', fontFamily: 'var(--font-display)' }}>
              Reset Password
            </h3>
          </div>
          <button onClick={onClose} style={closeBtnStyle}>
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <CheckCircle2 size={54} color="#16a34a" style={{ margin: '0 auto 1rem auto' }} />
            <h4 style={{ fontSize: '1.2rem', color: '#15803d', fontWeight: 700, marginBottom: '0.5rem' }}>
              Instructions Sent!
            </h4>
            <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              We've sent a magic reset link to <strong>{email}</strong>. Parents can also quickly reset passwords offline using the test credentials:
              <br />
              <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', marginTop: '6px', display: 'inline-block' }}>
                learner@littlelearner.com / password123
              </code>
            </p>
            <button className="btn-login-submit" style={{ width: '100%' }} onClick={handleReset}>
              Back to Login
            </button>
          </div>
        ) : (
          <div>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Enter your parent email address and we'll help you securely reset your password.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="input-field-wrap">
                <span className="input-icon-left"><Mail size={18} /></span>
                <input
                  type="email"
                  className="custom-input"
                  placeholder="Enter parent email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn-login-submit">
                Send Reset Link
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

const modalBackdropStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(15, 23, 42, 0.65)',
  backdropFilter: 'blur(6px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  padding: '1rem'
};

const modalBoxStyle = {
  background: '#ffffff',
  borderRadius: '28px',
  maxWidth: '440px',
  width: '100%',
  padding: '2rem',
  boxShadow: '0 25px 50px -12px rgba(124, 58, 237, 0.25)',
  animation: 'slide-down 0.25s ease'
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '0.75rem'
};

const closeBtnStyle = {
  background: '#f1f5f9',
  border: 'none',
  borderRadius: '50%',
  width: '36px',
  height: '36px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  color: '#64748b'
};
