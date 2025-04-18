import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';

function HomePage({ user, videos, loading, file, title, description, progress, setFile, setTitle, setDescription, setProgress, handleUpload }) {
  const navigate = useNavigate();
  const [showHistory, setShowHistory] = useState(false);
  const [showEternal, setShowEternal] = useState(false);
  const featuredVideo = videos.length > 0 ? videos[0] : null;

  return (
    <div className="main-content">
      {featuredVideo && (
        <section className="featured-section">
          <h2 className="menu-title">Featured Video</h2>
          <div className="video-card">
            <ReactPlayer
              url={featuredVideo.fileUrl}
              light={featuredVideo.thumbnailUrl}
              width="100%"
              height="200px"
              controls
            />
            <h3 className="video-title">{featuredVideo.title}</h3>
            <button className="cta-btn" onClick={() => navigate('/videos')}>
              <span>▶</span> Watch More
            </button>
          </div>
        </section>
      )}
      <div className="menu-grid">
        <section className="menu-tile">
          <i className="fas fa-handshake"></i>
          <h2 className="menu-title">Welcome</h2>
          <button className="cta-btn" onClick={() => navigate('/articles')}>
            <span>▶</span> Learn More
          </button>
        </section>
        <section className="menu-tile">
          <i className="fas fa-question-circle"></i>
          <h2 className="menu-title">Why CLO2?</h2>
          <button className="cta-btn" onClick={() => navigate('/articles')}>
            <span>▶</span> Dive Deeper
          </button>
        </section>
        <section className="menu-tile">
          <i className="fas fa-comments"></i>
          <h2 className="menu-title">Testimonials</h2>
          <button className="cta-btn" onClick={() => navigate('/videos')}>
            <span>▶</span> See Stories
          </button>
        </section>
        <section className="menu-tile">
          <i className="fas fa-history"></i>
          <h2 className="menu-title">CLO2 History</h2>
          <button className="cta-btn" onClick={() => setShowHistory(true)}>
            <span>▶</span> Explore History
          </button>
        </section>
        <section className="menu-tile">
          <i className="fas fa-cross"></i>
          <h2 className="menu-title">The Eternal Big Picture</h2>
          <button className="cta-btn" onClick={() => setShowEternal(true)}>
            <span>▶</span> Explore Eternity
          </button>
        </section>
      </div>

      {showHistory && (
        <div className="info-modal">
          <div className="info-content">
            <h2 className="info-title">Chlorine Dioxide: A Brief History</h2>
            <p className="info-text">
              Discovered in 1814 by Sir Humphry Davy, chlorine dioxide (ClO₂) started as a yellowish-green gas with powerful oxidizing properties.
            </p>
            <button className="close-btn" onClick={() => setShowHistory(false)}>Close</button>
          </div>
        </div>
      )}

      {showEternal && (
        <div className="info-modal">
          <div className="info-content">
            <h2 className="info-title">The Eternal Big Picture</h2>
            <p className="info-text">
              The foundational TRUTH of “God’s Detox.com” is that man needs to be Spiritually cleansed (detoxed) by the Word of God. And that can ONLY happen by repenting and believing the Gospel of Jesus, which allows ANY man or woman to enter into His Kingdom for eternity through the blood sacrifice of the Christ!
            </p>
            <button className="close-btn" onClick={() => setShowEternal(false)}>Close</button>
          </div>
        </div>
      )}

      {user && user.role === 'admin' && (
        <section className="upload-section">
          <div className="upload-form">
            <input type="file" onChange={(e) => setFile(e.target.files[0])} accept="video/*" required />
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
            <button onClick={handleUpload} className="upload-btn">Upload Video</button>
            {progress > 0 && progress < 100 && (
              <div className="progress-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}>
                  <span className="progress-text">{progress}%</span>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

export default HomePage;