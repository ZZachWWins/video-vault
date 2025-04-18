import React from 'react';
import './App.css';

function Footer() {
  return (
    <footer className="footer glassmorphism">
      <p className="footer-text">Built by Zachary | © 2025 Bob The Plumber. All rights reserved.</p>
      <div className="social-links">
        <a href="https://truthsocial.com/@BobThePlumber" target="_blank" rel="noopener noreferrer" className="social-icon" title="Truth Social">
          <i className="fab fa-tumblr"></i>
        </a>
        <a href="https://x.com/BobsThePlumber" target="_blank" rel="noopener noreferrer" className="social-icon" title="X">
          <i className="fab fa-twitter"></i>
        </a>
      </div>
    </footer>
  );
}

export default Footer;