import React from 'react';
import { useNavigate } from 'react-router-dom';
import StarryBackground from './StarryBackground';
import './App.css';

function DrKoryPage() {
  const navigate = useNavigate();

  return (
    <div className="app">
      <StarryBackground />
      <header className="header">
        <h1 className="title">Dr. Kory’s Corner</h1>
        <p className="subtitle">Health, Faith, and Freedom</p>
        <nav className="navbar">
          <button className="auth-btn" onClick={() => navigate('/')}>Home</button>
          <button className="auth-btn" onClick={() => navigate('/drkory')}>Dr. Kory</button>
          <button className="auth-btn" onClick={() => navigate('/about')}>About</button>
          <button className="auth-btn" onClick={() => navigate('/videos')}>Videos</button>
          <button className="auth-btn" onClick={() => navigate('/grenon')}>Grenon</button>
        </nav>
      </header>

      <section className="landing-section">
        <h2 className="landing-title">Meet Dr. Pierre Kory</h2>
        <p className="landing-text">
          Dr. Pierre Kory is a renowned critical care physician and advocate for truth in medicine. Known for his work with the FLCCC Alliance and his fearless stance on alternative treatments, he’s a voice for those seeking health freedom. Here, explore his insights on chlorine dioxide (ClO₂), faith-based healing, and standing firm in adversity.
        </p>
      </section>

      <section className="why-clo2-section">
        <h2 className="why-clo2-title">Dr. Kory on ClO₂</h2>
        <p className="why-clo2-text">
          Dr. Kory has spoken about the potential of overlooked therapies like ClO₂. While not a replacement for medical advice, he champions open discussion and patient empowerment. Watch his talks, read his thoughts, and join the conversation about detoxifying body and soul.
        </p>
        <button className="cta-btn" onClick={() => window.open('https://flccc.net', '_blank')}>
          Visit FLCCC
        </button>
      </section>

      <section className="testimonials-section">
        <h2 className="testimonials-title">Inspired by Dr. Kory</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p className="testimonial-text">
              “Dr. Kory’s courage inspired me to research ClO₂. It’s been a game-changer for my family.”
            </p>
            <p className="testimonial-author">- James R., Florida</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p className="footer-text">Built by Zachary | © 2025 Bob The Plumber</p>
      </footer>
    </div>
  );
}

export default DrKoryPage;