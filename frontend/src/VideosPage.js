import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import StarryBackground from './StarryBackground';
import './App.css';

function VideosPage() {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [likedVideos, setLikedVideos] = useState(() => {
    const saved = localStorage.getItem('likedVideos');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('likedVideos', JSON.stringify(likedVideos));
  }, [likedVideos]);

  const handleLike = (videoId) => {
    setLikedVideos((prev) => [...prev, videoId]);
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video._id === videoId
          ? { ...video, likes: (video.likes || 0) + 1 }
          : video
      )
    );
  };

  const hasLiked = (video) => likedVideos.includes(video._id);

  const handleViewIncrement = (videoId) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video._id === videoId
          ? { ...video, views: (video.views || 0) + 1 }
          : video
      )
    );
  };

  const filteredVideos = videos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const Section = ({ children, className }) => {
    const sectionRef = useRef(null);

    useEffect(() => {
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

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => {
        if (sectionRef.current) {
          observer.unobserve(sectionRef.current);
        }
      };
    }, []);

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
        <h1 className="title">Video Gallery</h1>
        <p className="subtitle">Explore All Videos</p>
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
        <h2 className="landing-title">Watch and Be Inspired</h2>
        <p className="scripture">
          "Let the word of Christ dwell in you richly, teaching and admonishing one another in all wisdom." – Colossians 3:16
        </p>
      </Section>

      <main className="main">
        <div className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search videos..."
            className="search-input"
            aria-label="Search videos"
          />
        </div>

        <Section className="video-grid">
          {loading ? (
            <div className="loader"></div>
          ) : filteredVideos.length === 0 ? (
            videos.length === 0 ? (
              <p className="no-videos">No videos yet—upload some!</p>
            ) : (
              <p className="no-videos">No videos match your search.</p>
            )
          ) : (
            filteredVideos.map((video) => (
              <div key={video._id} className="video-card fade-in-section">
                <ReactPlayer
                  url={video.fileUrl}
                  light={video.thumbnailUrl}
                  width="100%"
                  height="200px"
                  controls
                  lazy={true}
                  onStart={() => handleViewIncrement(video._id)}
                />
                <h2 className="video-title">{video.title}</h2>
                <p className="video-description">{video.description}</p>
                <p className="video-uploader">Uploaded by: {video.uploadedBy}</p>
                <p className="video-views">Views: {video.views || 0}</p>
                <div className="like-section">
                  <button
                    onClick={() => handleLike(video._id)}
                    className={`like-btn ${hasLiked(video) ? 'liked' : ''}`}
                    disabled={hasLiked(video)}
                    aria-label={hasLiked(video) ? 'Video already liked' : 'Like this video'}
                  >
                    👍 {hasLiked(video) ? 'Liked' : 'Like'}
                  </button>
                  <span className="like-count">Likes: {video.likes || 0}</span>
                </div>
              </div>
            ))
          )}
        </Section>

        <Section className="cta-section">
          <h2 className="cta-title">Share Your Story</h2>
          <p className="cta-text">Have a testimony about ClO₂ or faith? Share it with our community!</p>
          <div className="button-group">
            <button className="cta-btn" onClick={() => navigate('/contact')}>
              <span>▶</span> Submit Your Story
            </button>
            <button className="cta-btn" onClick={() => navigate('/articles')}>
              <span>▶</span> Read Articles
            </button>
          </div>
        </Section>
      </main>

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
    </div>
  );
}

export default VideosPage;