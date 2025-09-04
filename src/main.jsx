import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Login from './Login.jsx';
import './index.css';

function Main() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <React.StrictMode>
      {isLoggedIn ? (
        <div>
          <button 
            onClick={handleLogout} 
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              padding: '0.5rem 1rem',
              backgroundColor: '#c9a76a',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              zIndex: 1000,
              fontFamily: 'var(--font-family-heading)',
              fontWeight: 'var(--font-weight-semibold)',
              boxShadow: 'var(--shadow-md)',
              transition: 'var(--transition-default)'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#d4b57d'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#c9a76a'}
          >
            Logout
          </button>
          <App />
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);