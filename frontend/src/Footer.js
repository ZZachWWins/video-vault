import React, { useEffect } from 'react';
import './App.css';

function Footer({ showBackToTop }) {
  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 200 ? showBackToTop(true) : showBackToTop(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showBackToTop]); // Added handleScroll to the dependency array

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