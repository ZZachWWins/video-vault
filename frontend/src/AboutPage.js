import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">About God’s Detox</h1>
        <p className="subtitle">Our Mission</p>
        <nav className="navbar">
          <button className="auth-btn" onClick={() => navigate('/')}>Home</button>
          <button className="auth-btn" onClick={() => navigate('/drkory')}>Dr. Kory</button>
          <button className="auth-btn" onClick={() => navigate('/about')}>About</button>
        </nav>
      </header>

      <section className="landing-section">
        <h2 className="landing-title">Who We Are</h2>
        <p className="landing-text">
          God’s Detox is a platform born from faith and a desire to empower people with knowledge. Led by Bob The Plumber, we share stories of transformation through chlorine dioxide (ClO₂) and spiritual renewal. We’re not here to sell—just to inspire and inform.
        </p>
      </section>

      <section className="article-section">
        <h2 className="article-title">Our Vision</h2>
        <p className="article-text">
          We believe in two detoxes: one for the body, one for the soul. ClO₂ offers a path to physical cleansing, while faith in Jesus Christ brings eternal redemption. Join us to explore both.
        </p>
      </section>

      <footer className="footer">
        <p className="footer-text">
          Built by Zachary | © 2025 Bob The Plumber
        </p>
      </footer>
    </div>
  );
}

export default AboutPage;