import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Header({ user, setShowAuth, setUser, handleLogout, titleRef, setActiveTab, username, setShowCourse }) {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  return (
    <header className="header glassmorphism">
      <div className="header-content">
        <h1 className="title" ref={titleRef}>God’s Detox</h1>
        <button className="nav-toggle" onClick={toggleNav}>
          {isNavOpen ? '✖' : '☰'}
        </button>
      </div>

      <nav className={`nav-menu ${isNavOpen ? 'open' : ''}`}>
        <button className="nav-btn" onClick={() => navigate('/')}>Home</button>
        <button className="nav-btn" onClick={() => { navigate('/about'); setIsNavOpen(false); }}>Learn More</button>
        <button className="nav-btn" onClick={() => { navigate('/articles'); setIsNavOpen(false); }}>Why ClO₂?</button>
        <button className="nav-btn" onClick={() => { navigate('/videos'); setIsNavOpen(false); }}>Testimonials</button>
        <button className="nav-btn" onClick={() => { navigate('/grenon'); setIsNavOpen(false); }}>Grenon Legacy</button>
        <button className="nav-btn" onClick={() => { setShowCourse(true); setIsNavOpen(false); }}>ClO₂ Course</button>
        <button className="nav-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to Top</button>

        {user ? (
          <>
            <span className="nav-username">Welcome, {username || user.username}!</span>
            <button className="nav-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <button className="nav-btn" onClick={() => { setShowAuth(true); setActiveTab('login'); setIsNavOpen(false); }}>
            Login / Signup
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;