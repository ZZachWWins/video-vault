import React from 'react';
import { useNavigate } from 'react-router-dom';
import StarryBackground from './StarryBackground';
import './App.css';

function GrenonPage({ enlargedImage, selectedMoment, setEnlargedImage, handleImageClick, closeEnlargedImage, toggleBookMenu, handleMomentClick, isBookMenuOpen }) {
  const navigate = useNavigate();

  const grenonTimeline = [
    { year: "1980s", title: "Haiti Mission Begins", desc: "Mark steps into the slums, healing with faith and grit." },
    { year: "2010", title: "Genesis II Church Founded", desc: "The Grenons launch a ClO₂ revolution." },
    { year: "2015", title: "Haiti MRSA Victory", desc: "ClO₂ crushes flesh-eaters—lives saved." },
    { year: "2020", title: "Facing Tyranny", desc: "System strikes back; Grenons stand firm." },
  ];

  return (
    <div className="app">
      <StarryBackground />
      <header className="header">
        <h1 className="title">The Grenon Legacy</h1>
        <p className="subtitle">Warriors of Faith and ClO₂</p>
        <nav className="navbar">
          <button className="auth-btn" onClick={() => navigate('/')}>Home</button>
          <button className="auth-btn" onClick={() => navigate('/drkory')}>Dr. Kory</button>
          <button className="auth-btn" onClick={() => navigate('/about')}>About</button>
          <button className="auth-btn" onClick={() => navigate('/videos')}>Videos</button>
          <button className="auth-btn" onClick={() => navigate('/grenon')}>Grenon</button>
          <button className="auth-btn" onClick={() => navigate('/articles')}>Articles</button>
        </nav>
      </header>

      <section className="grenon-section">
        <h2 className="grenon-title">God’s Detox: The Grenon Legacy</h2>
        <p className="grenon-text">
          Mark Grenon and his sons—Jonathan, Jordan, and Joseph—stood tall as warriors of faith, wielding chlorine dioxide (ClO₂) to heal where others wouldn’t dare. From Haiti’s slums, they crushed MRSA with this simple compound, saving lives Big Pharma left for dead. Mark, a 47-year missionary, detoxed his own family from flesh-eating bacteria; his boys spread the gospel of ClO₂ through Genesis II Church—until the system locked them up. Their testimony? ClO₂ purges toxins, restores God’s Temple, and spits in the face of tyranny. Watch their story, weigh their truth, and join the fight.
        </p>
        <div className="grenon-gallery">
          <img
            src="https://res.cloudinary.com/dwmnbrjtu/image/upload/v1711308900/g0rpwkyt3poc4lidafas.jpg"
            alt="Mark Grenon - Mission Work"
            className="grenon-gallery-image"
            onClick={() => handleImageClick("https://res.cloudinary.com/dwmnbrjtu/image/upload/v1711308900/g0rpwkyt3poc4lidafas.jpg", "Mark Grenon - Mission Work")}
          />
          <img
            src="https://res.cloudinary.com/dwmnbrjtu/image/upload/v1711308900/o7fzvl6tybthrtc41dsm.jpg"
            alt="Mark Grenon - Preaching"
            className="grenon-gallery-image"
            onClick={() => handleImageClick("https://res.cloudinary.com/dwmnbrjtu/image/upload/v1711308900/o7fzvl6tybthrtc41dsm.jpg", "Mark Grenon - Preaching")}
          />
          {/* Add remaining images */}
          <img
            src="https://res.cloudinary.com/dwmnbrjtu/image/upload/v1711308900/wejh7oticxazrdvywhvt.jpg"
            alt="Mark Grenon - Legacy Moment"
            className="grenon-gallery-image"
            onClick={() => handleImageClick("https://res.cloudinary.com/dwmnbrjtu/image/upload/v1711308900/wejh7oticxazrdvywhvt.jpg", "Mark Grenon - Legacy Moment")}
          />
        </div>
        <div className="grenon-timeline">
          {grenonTimeline.map((moment, index) => (
            <div
              key={index}
              className={`timeline-moment ${selectedMoment === index ? 'active' : ''}`}
              onClick={() => handleMomentClick(index)}
            >
              <span className="timeline-year">{moment.year}</span>
              <span className="timeline-title">{moment.title}</span>
              {selectedMoment === index && (
                <div className="timeline-tooltip">{moment.desc}</div>
              )}
            </div>
          ))}
        </div>
        <div className="grenon-book">
          <h3 className="grenon-title">A World Without Dis-Ease by Mark Grenon</h3>
          <p className="grenon-text">
            In <em>A World Without Dis-Ease</em>, Mark Grenon lays out a fearless blueprint for a healthier humanity, rooted in faith and the power of chlorine dioxide (ClO₂). This isn’t just a book—it’s a battle cry against a broken system, blending decades of missionary grit with real-world healing stories.
          </p>
          <div className="book-menu-container">
            <button className="cta-btn book-menu-btn" onClick={toggleBookMenu}>Get The Book Now</button>
            {isBookMenuOpen && (
              <div className="book-menu">
                <h3 className="book-menu-title">Printed Books</h3>
                <div className="book-item">
                  <a href="https://www.printshopcentral.com/bookstore/book/-imagine-a-world-without-dis-ease-is-it-possible-volume-one" target="_blank" rel="noopener noreferrer" className="book-link">Volume One</a>
                  <p className="book-description">Explores the foundational concepts of CLO2 and a world free from disease.</p>
                </div>
                {/* Add remaining book links */}
              </div>
            )}
          </div>
        </div>
      </section>

      {enlargedImage && (
        <div className="enlarged-image-overlay" onClick={closeEnlargedImage}>
          <img src={enlargedImage.src} alt={enlargedImage.alt} className="enlarged-image" />
          <button className="close-btn" onClick={closeEnlargedImage}>Close</button>
        </div>
      )}

      <footer className="footer">
        <p className="footer-text">Built by Zachary | © 2025 Bob The Plumber</p>
      </footer>
    </div>
  );
}

export default GrenonPage;