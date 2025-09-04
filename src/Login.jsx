import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation for demo purposes
    if (username && password) {
      // In a real app, you would authenticate with a server
      onLogin();
    } else {
      setError('Please enter both username and password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card card">
        <div className="login-header">
          <div className="logo-placeholder">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="64" height="64" rx="12" fill="var(--elite-primary)" />
              <path d="M32 16L38 26L48 28L40 36L42 48L32 42L22 48L24 36L16 28L26 26L32 16Z" fill="var(--elite-accent)" />
            </svg>
          </div>
          <h1 className="text-heading-xl">Corporate Travel Portal</h1>
          <p className="text-body-md text-secondary">Access your exclusive corporate travel experience</p>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username" className="text-body-sm text-secondary">Username or Email</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username or email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password" className="text-body-sm text-secondary">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
          </div>
          
          <button type="submit" className="btn btn-accent btn-large w-full">
            Sign In to Elite Experience
          </button>
        </form>
        
        <div className="login-footer">
          <a href="#forgot" className="text-body-sm text-secondary">Forgot password?</a>
          <span className="text-secondary"> | </span>
          <a href="#signup" className="text-body-sm text-secondary">Request access</a>
        </div>
      </div>
    </div>
  );
};

export default Login;