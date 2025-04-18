import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import StarryBackground from './StarryBackground';
import './App.css';

function GrenonPage() {
  const navigate = useNavigate();
  const [isBookMenuOpen, setIsBookMenuOpen] = useState(false);
  const [selectedMoment, setSelectedMoment] = useState(null);
  const [enlargedImage, setEnlargedImage] = useState(null);

  const grenonTimeline = [
    {
      year: '2010',
      title: 'Genesis II Church Founded',
      desc: 'Mark Grenon establishes the Genesis II Church to promote ClO₂ healing.',
    },
    {
      year: '2015',
      title: 'Haiti Mission Success',
      desc: 'The Grenons treat thousands in Haiti, eradicating MRSA with ClO₂.',
    },
    {
      year: '2020',
      title: 'Legal Challenges',
      desc: 'The Grenon family faces legal battles over ClO₂ advocacy.',
    },
  ];

  const toggleBookMenu = () => setIsBookMenuOpen(!isBookMenuOpen);

  const handleMomentClick = (index) => {
    setSelectedMoment(index === selectedMoment ? null : index);
  };

  const handleImageClick = (src, alt) => {
    setEnlargedImage({ src, alt });
  };

  const closeEnlargedImage = () => {
    setEnlargedImage(null);
  };

  const Section = ({ children, className }) => {
    const sectionRef = useRef(null);

    useEffect(() => {
      const currentRef = sectionRef.current; // Store ref value
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        { threshold: 0.1 }
      );

      if (currentRef) {
        observer.observe(currentRef);
      }

      return () => {
        if (currentRef) {
          observer.unobserve(currentRef); // Use stored ref in cleanup
        }
      };
    }, []); // Empty deps to run once

    return (
      <section ref={sectionRef} className={`${className} fade-in-section`}>
        {children}
      </section>
    );
  };

  return (
    <div className="app">
      <StarryBackground />
      <header className="header">
        <h1 className="title">The Grenon Legacy</h1>
        <p className="subtitle">Warriors of Faith and ClO₂</p>
        <nav className="navbar">
          <button className="auth-btn" onClick={() => navigate('/')} aria-label="Navigate to Home page">Home</button>
          <button className="auth-btn" onClick={() => navigate('/drkory')} aria-label="Navigate to Dr. Kory page">Dr. Kory</button>
          <button className="auth-btn" onClick={() => navigate('/about')} aria-label="Navigate to About page">About</button>
          <button className="auth-btn" onClick={() => navigate('/videos')} aria-label="Navigate to Videos page">Videos</button>
          <button className="auth-btn" onClick={() => navigate('/grenon')} aria-label="Navigate to Grenon page">Grenon</button>
          <button className="auth-btn" onClick={() => navigate('/articles')} aria-label="Navigate to Articles page">Articles</button>
        </nav>
      </header>

      <Section className="landing-section">
        <h2 className="landing-title">The Grenon Legacy</h2>
        <p className="scripture">
          "Heal the sick, raise the dead, cleanse lepers, cast out demons." – Matthew 10:8
        </p>
      </Section>

      <Section className="grenon-section">
        <h2 className="grenon-title">God’s Detox: The Grenon Legacy</h2>
        <p className="grenon-text">
          Mark Grenon and his sons—Jonathan, Jordan, and Joseph—stood tall as warriors of faith, wielding chlorine dioxide (ClO₂) to heal where others wouldn’t dare. From Haiti’s slums, they crushed MRSA with this simple compound, saving lives Big Pharma left for dead. Mark, a 47-year missionary, detoxed his own family from flesh-eating bacteria; his boys spread the gospel of ClO₂ through Genesis II Church—until the system locked them up. Their testimony? ClO₂ purges toxins, restores God’s Temple, and spits in the face of tyranny. Watch their story, weigh their truth, and join the fight.
        </p>
        <div className="grenon-gallery">
          <img
            src="https://res.cloudinary.com/dwmnbrjtu/image/upload/v1711308900/g0rpwkyt3poc4lidafas.jpg"
            alt="Mark Grenon - Mission Work"
            className="grenon-gallery-image fade-in-section"
            onClick={() => handleImageClick("https://res.cloudinary.com/dwmnbrjtu/image/upload/v1711308900/g0rpwkyt3poc4lidafas.jpg", "Mark Grenon - Mission Work")}
            onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200'; }}
          />
          <img
            src="https://res.cloudinary.com/dwmnbrjtu/image/upload/v1711308900/o7fzvl6tybthrtc41dsm.jpg"
            alt="Mark Grenon - Preaching"
            className="grenon-gallery-image fade-in-section"
            onClick={() => handleImageClick("https://res.cloudinary.com/dwmnbrjtu/image/upload/v1711308900/o7fzvl6tybthrtc41dsm.jpg", "Mark Grenon - Preaching")}
            onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200'; }}
          />
          <img
            src="https://res.cloudinary.com/dwmnbrjtu/image/upload/v1711308900/wejh7oticxazrdvywhvt.jpg"
            alt="Mark Grenon - Legacy Moment"
            className="grenon-gallery-image fade-in-section"
            onClick={() => handleImageClick("https://res.cloudinary.com/dwmnbrjtu/image/upload/v1711308900/wejh7oticxazrdvywhvt.jpg", "Mark Grenon - Legacy Moment")}
            onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200'; }}
          />
        </div>
        <div className="grenon-timeline">
          {grenonTimeline.map((moment, index) => (
            <div
              key={index}
              className={`timeline-moment fade-in-section ${selectedMoment === index ? 'active' : ''}`}
              onClick={() => handleMomentClick(index)}
              aria-label={`View details for ${moment.year}: ${moment.title}`}
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
              </div>
            )}
          </div>
        </div>
      </Section>

      <Section className="testimonials-section">
        <h2 className="testimonials-title">Impact of the Grenon Legacy</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p className="testimonial-text">"The Grenons saved my life with ClO₂ in Haiti. I owe them everything."</p>
            <p className="testimonial-author">— John D., Haiti Mission Survivor</p>
          </div>
          <div className="testimonial-card">
            <p className="testimonial-text">"Their faith and courage inspire us to keep fighting for truth."</p>
            <p className="testimonial-author">— Sarah M., Genesis II Supporter</p>
          </div>
        </div>
      </Section>

      <Section className="cta-section">
        <h2 className="cta-title">Discover More</h2>
        <p className="cta-text">Learn more about ClO₂ and our mission through our videos and articles.</p>
        <div className="button-group">
          <button className="cta-btn" onClick={() => navigate('/videos')}>
            <span>▶</span> Watch Videos
          </button>
          <button className="cta-btn" onClick={() => navigate('/articles')}>
            <span>▶</span> Read Articles
          </button>
        </div>
      </Section>

      <footer className="footer">
        <p className="footer-text">God's Detox</p>
        <div className="quick-links">
          <a href="/" className="footer-link">Home</a>
          <a href="/about" className="footer-link">About</a>
          <a href="/articles" className="footer-link">Articles</a>
        </div>
        <p className="footer-contact">
          Contact us at <a href="mailto:info@godsdetox.com" className="contact-link">info@godsdetox.com</a>
        </p>
        <p className="footer-copyright">© {new Date().getFullYear()} God's Detox. All rights reserved.</p>
        <div className="social-links">
          <a href="https://truthsocial.com/@BobThePlumber" target="_blank" rel="noopener noreferrer" className="social-icon" title="Truth Social"><i className="fab fa-tumblr"></i></a>
          <a href="https://x.com/BobsThePlumber" target="_blank" rel="noopener noreferrer" className="social-icon" title="X"><i className="fab fa-twitter"></i></a>
        </div>
      </footer>

      {enlargedImage && (
        <div className="enlarged-image-overlay" onClick={closeEnlargedImage}>
          <img src={enlargedImage.src} alt={enlargedImage.alt} className="enlarged-image" />
          <button className="close-btn" onClick={closeEnlargedImage}>Close</button>
        </div>
      )}
    </div>
  );
}

export default GrenonPage;