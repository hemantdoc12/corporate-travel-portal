import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      // Sample users for testing
      const sampleUsers = [
        { id: 1, email: 'admin@company.com', name: 'Admin User', role: 'Administrator' },
        { id: 2, email: 'travel@company.com', name: 'Travel Manager', role: 'Travel Manager' },
        { id: 3, email: 'executive@company.com', name: 'Executive Traveler', role: 'Executive' }
      ];
      
      const user = sampleUsers.find(u => u.email === email);
      
      if (user && password === 'password123') {
        onLogin({
          ...user,
          token: 'sample-jwt-token-' + Date.now()
        });
      } else {
        setError('Invalid email or password. Try admin@company.com / password123');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-card card">
        <div className="login-header">
          <div className="logo-placeholder">
            <svg width="60" height="60" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="8" fill="var(--elite-primary)" />
              <path d="M20 12L24 18L30 20L26 26L28 32L20 28L12 32L14 26L8 20L14 18L20 12Z" fill="var(--elite-accent)" />
            </svg>
          </div>
          <h1 className="text-heading-lg">TravelPortal</h1>
          <p className="text-body-md text-secondary">Corporate Travel Management</p>
        </div>
        
        <form className="login-form" onSubmit={handleSubmit}>
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email" className="text-body-sm text-secondary">Email</label>
            <input
              id="email"
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password" className="text-body-sm text-secondary">Password</label>
            <input
              id="password"
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-accent w-full" 
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <div className="login-footer">
          <p className="text-body-sm text-secondary">Test credentials:</p>
          <p className="text-body-sm">admin@company.com / password123</p>
        </div>
      </div>
    </div>
  );
}

export default Login;