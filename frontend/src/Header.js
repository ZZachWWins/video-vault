import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header({ user, setShowAuth, setUser, handleLogout, titleRef, setActiveTab }) {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="title" ref={titleRef}>God’s Detox</h1>
        <nav className="nav-menu">
          <button className="nav-btn" onClick={() => navigate('/')}>Home</button>
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
      </div>
    </header>
  );
}

export default Header;