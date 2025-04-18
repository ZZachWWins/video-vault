import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header({ user, setShowAuth, setUser, handleLogout, titleRef, setActiveTab, username, setShowCourse }) {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="title" ref={titleRef}>God’s Detox</h1>
        <button className="nav-toggle" onClick={toggleNav}>
          <i className="fas fa-bars"></i>
        </button>
      </div>
      <nav className={`nav-menu ${isNavOpen ? 'open' : ''}`}>
        <button className="nav-btn" onClick={() => navigate('/')}>Home</button>
        <button className="nav-btn" onClick={() => navigate('/about')}>About</button>
        <button className="nav-btn" onClick={() => navigate('/grenon')}>Grenon</button>
        <button className="nav-btn" onClick={() => navigate('/videos')}>Videos</button>
        <button className="nav-btn" onClick={() => navigate('/articles')}>Articles</button>
        {user ? (
          <>
            <span className="nav-username">{user.username}</span>
            <button className="nav-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <button className="nav-btn" onClick={() => { setShowAuth(true); setActiveTab('login'); }}>
            Login / Signup
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;