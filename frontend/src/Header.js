import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import './App.css';

function Header({ user, setUser, setShowAuth, setActiveTab, handleLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const titleRef = useRef(null);

  const pageNames = {
    '/': 'Home',
    '/about': 'About',
    '/videos': 'Videos',
    '/grenon': 'Grenon',
    '/articles': 'Articles',
  };
  const currentPage = pageNames[location.pathname] || 'Menu';

  const toggleNavMenu = () => setIsNavMenuOpen(!isNavMenuOpen);

  useEffect(() => {
    const title = titleRef.current;
    if (title) {
      const letters = "God’s Detox".split('').map((char) => `<span class="letter">${char}</span>`).join('');
      title.innerHTML = letters;
      gsap.from('.letter', { duration: 1, opacity: 0, y: 50, stagger: 0.05, ease: 'power2.out', onComplete: () => gsap.set('.letter', { y: 0, opacity: 1, clearProps: 'all' }) });
    }
  }, []);

  return (
    <header className="header glassmorphism">
      <h1 ref={titleRef} className="title">God’s Detox</h1>
      <p className="subtitle">Presented by Bob The Plumber</p>
      <nav className="navbar">
        <div className="desktop-nav">
          <button className="auth-btn" onClick={() => navigate('/')}>Home</button>
          <button className="auth-btn" onClick={() => navigate('/about')}>About</button>
          <button className="auth-btn" onClick={() => navigate('/videos')}>Videos</button>
          <button className="auth-btn" onClick={() => navigate('/grenon')}>Grenon</button>
          <button className="auth-btn" onClick={() => navigate('/articles')}>Articles</button>
        </div>

        <div className="mobile-nav">
          <button className="nav-menu-btn" onClick={toggleNavMenu}>
            Menu: {currentPage}
          </button>
          {isNavMenuOpen && (
            <div className="nav-menu glassmorphism">
              {Object.entries(pageNames).map(([path, name]) => (
                <button
                  key={path}
                  className={`nav-menu-item ${location.pathname === path ? 'active' : ''}`}
                  onClick={() => {
                    navigate(path);
                    setIsNavMenuOpen(false);
                  }}
                >
                  {name}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
      <div className="auth-section">
        {user ? (
          <>
            <span>Welcome, {user.username}</span>
            <button onClick={handleLogout} className="auth-btn">Logout</button>
          </>
        ) : (
          <button onClick={() => setShowAuth(true)} className="auth-btn">Sign up or Log in</button>
        )}
      </div>
    </header>
  );
}

export default Header;