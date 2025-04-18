import React from 'react';
import './App.css';

function Footer({ showBackToTop, setShowBackToTop }) {
  const handleScroll = () => setShowBackToTop(window.scrollY > 200);

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
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

      {showBackToTop && (
        <button className="back-to-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑ Top</button>
      )}
    </>
  );
}

export default Footer;