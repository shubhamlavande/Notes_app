import React, { useState } from 'react';
import { AuthMode } from '../types';

interface AuthFormProps {
  onAuth: (email: string, password: string, name?: string) => Promise<void>;
  loading: boolean;
  error: string;
  success: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ onAuth, loading, error, success }) => {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'login') {
      await onAuth(email, password);
    } else {
      await onAuth(email, password, name);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{authMode === 'login' ? 'Login' : 'Register'}</h2>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        <form onSubmit={handleSubmit}>
          {authMode === 'register' && (
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Please wait...' : (authMode === 'login' ? 'Login' : 'Register')}
          </button>
        </form>
        <div className="switch-auth">
          <button onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}>
            {authMode === 'login' ? 'Need an account? Register' : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;