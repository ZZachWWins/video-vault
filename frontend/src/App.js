import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { gsap } from 'gsap';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [showAuth, setShowAuth] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [progress, setProgress] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const [showEternal, setShowEternal] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get('/.netlify/functions/videos');
        setVideos(res.data || []);
      } catch (err) {
        console.error('Fetch videos error:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();

    const createStars = () => {
      const app = document.querySelector('.app');
      const starCount = 50; // Fewer stars for simplicity
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = `${Math.random() * 2}px`;
        star.style.height = star.style.width;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        app.appendChild(star);
      }
    };
    createStars();

    const title = titleRef.current;
    if (title) {
      gsap.from(title, { duration: 1, opacity: 0, y: 20, ease: 'power2.out' }); // Simplified animation
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/.netlify/functions/login', { username, password });
      setUser(res.data.user);
      setUsername('');
      setPassword('');
      setShowAuth(false);
    } catch (err) {
      alert('Login failed—check your credentials!');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/.netlify/functions/signup', { username: signupUsername, password: signupPassword });
      alert('Signup successful! Please log in.');
      setSignupUsername('');
      setSignupPassword('');
      setActiveTab('login');
    } catch (err) {
      alert('Signup failed—username might be taken!');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get('/.netlify/functions/logout');
      setUser(null);
    } catch (err) {
      alert('Logout failed—try again!');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!user) return alert('Please log in to upload videos!');
    if (!file) return alert('Please select a video file!');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'video-vault-preset');

    try {
      const res = await axios.post('https://api.cloudinary.com/v1_1/dwmnbrjtu/video/upload', formData, {
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percent);
        },
      });

      const videoData = {
        title,
        description,
        fileUrl: res.data.secure_url,
        thumbnailUrl: res.data.secure_url.replace('/upload/', '/upload/f_auto,q_auto,w_320,h_240/'),
        uploadedBy: user.username,
      };

      await axios.post('/.netlify/functions/videos', videoData);
      setFile(null);
      setTitle('');
      setDescription('');
      setProgress(0);
      const videosRes = await axios.get('/.netlify/functions/videos');
      setVideos(videosRes.data || []);
      alert('Video uploaded successfully!');
    } catch (err) {
      console.error('Upload error:', err.response?.data || err.message);
      alert('Upload failed—check your file or permissions!');
      setProgress(0);
    }
  };

  const Header = () => {
    const navigate = useNavigate();
    return (
      <header className="header">
        <div className="header-content">
          <h1 className="title" ref={titleRef}>God’s Detox for Bob</h1>
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
  };

  const Footer = () => (
    <footer className="footer">
      <p className="footer-text">© 2025 God’s Detox for Bob. All rights reserved. | Contact: info@godsdetoxforbob.com</p>
    </footer>
  );

  const HomeContent = () => {
    const navigate = useNavigate();
    return (
      <div className="main-content">
        {/* Sidebar (Left Column) */}
        <div className="sidebar">
          <div className="sidebar-section">
            <h3 className="sidebar-title">Quick Links</h3>
            <a href="#welcome" className="sidebar-link">Welcome</a>
            <a href="#testimonials" className="sidebar-link">Testimonials</a>
            <a href="#eternal" className="sidebar-link">Eternal Perspective</a>
            <a href="#history" className="sidebar-link">Detox History</a>
          </div>
          <div className="sidebar-section">
            <h3 className="sidebar-title">Resources</h3>
            <a href="/videos" className="sidebar-link">Watch Videos</a>
            <a href="/articles" className="sidebar-link">Read Articles</a>
          </div>
        </div>
        {/* Main Content Area (Right Column) */}
        <div className="content-area">
          <section className="content-section" id="welcome">
            <h2 className="content-title">Welcome to God’s Detox for Bob</h2>
            <p className="content-text">
              God’s Detox for Bob is dedicated to holistic wellness through spiritual cleansing and healthy living. Our mission is to guide you toward a renewed body, mind, and spirit through faith-based practices and community support.
            </p>
            <p className="content-text">
              <a href="/articles">Learn more about our approach</a> to detoxification and spiritual growth.
            </p>
          </section>
          <section className="content-section" id="testimonials">
            <h2 className="content-title">Testimonials</h2>
            <p className="content-text">
              Hear from our community members who have experienced transformation through God’s Detox. Watch their stories in our <a href="/videos">video gallery</a>.
            </p>
          </section>
          <section className="content-section" id="eternal">
            <h2 className="content-title">The Eternal Big Picture</h2>
            <p className="content-text">
              The foundation of God’s Detox is spiritual cleansing through faith. We believe true wellness begins with a connection to the divine, offering peace and purpose for eternity.
            </p>
            <button className="nav-btn" onClick={() => setShowEternal(true)}>Read More</button>
          </section>
          <section className="content-section" id="history">
            <h2 className="content-title">History of Detox</h2>
            <p className="content-text">
              Detoxification has been practiced for centuries across cultures. Explore the history of holistic cleansing and its benefits.
            </p>
            <button className="nav-btn" onClick={() => setShowHistory(true)}>Learn More</button>
          </section>
          {user && user.role === 'admin' && (
            <section className="upload-section">
              <h3 className="content-title">Share Your Story</h3>
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
        {showHistory && (
          <div className="info-modal">
            <div className="info-content">
              <h2 className="info-title">History of Detox</h2>
              <p className="info-text">
                Detox practices date back to ancient civilizations, using natural methods to cleanse the body and spirit. From fasting to herbal remedies, these traditions continue to inspire modern wellness.
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
                The foundation of God’s Detox is spiritual cleansing through faith. True wellness begins with a connection to the divine, offering peace and purpose for eternity.
              </p>
              <button className="close-btn" onClick={() => setShowEternal(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const VideosContent = () => (
    <div className="main-content">
      <div className="content-area">
        <section className="videos-section">
          <h2 className="content-title">Videos</h2>
          {loading ? (
            <div className="loader"></div>
          ) : videos.length === 0 ? (
            <p className="no-videos">No videos available.</p>
          ) : (
            <div className="video-grid">
              {videos.map((video) => (
                <div key={video._id} className="video-card">
                  <ReactPlayer
                    url={video.fileUrl}
                    light={video.thumbnailUrl}
                    width="100%"
                    height="200px"
                    controls
                  />
                  <h3 className="video-title">{video.title}</h3>
                  <p className="video-description">{video.description}</p>
                  <p className="video-uploader">Uploaded by: {video.uploadedBy}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );

  const ArticlesContent = () => (
    <div className="main-content">
      <div className="content-area">
        <section className="articles-section">
          <h2 className="content-title">Articles</h2>
          <div className="article-section">
            <h3 className="article-title">Welcome to God’s Detox</h3>
            <p className="article-text">
              Explore our holistic approach to wellness through spiritual cleansing and healthy living practices.
            </p>
          </div>
          <div className="article-section">
            <h3 className="article-title">Benefits of Detox</h3>
            <p className="article-text">
              Learn how detoxification can rejuvenate your body and spirit, drawing from ancient traditions.
            </p>
          </div>
        </section>
      </div>
    </div>
  );

  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<HomeContent />} />
          <Route path="/videos" element={<VideosContent />} />
          <Route path="/articles" element={<ArticlesContent />} />
        </Routes>
        {showAuth && (
          <div className="auth-modal">
            <div className="auth-content">
              <h2 className="auth-title">Authentication</h2>
              <div className="auth-tabs">
                <button className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`} onClick={() => setActiveTab('login')}>Login</button>
                <button className={`tab-btn ${activeTab === 'signup' ? 'active' : ''}`} onClick={() => setActiveTab('signup')}>Signup</button>
              </div>
              {activeTab === 'login' ? (
                <div className="auth-form">
                  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                  <button onClick={handleLogin} className="submit-btn">Login</button>
                </div>
              ) : (
                <div className="auth-form">
                  <input type="text" value={signupUsername} onChange={(e) => setSignupUsername(e.target.value)} placeholder="Choose Username" required />
                  <input type="password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} placeholder="Choose Password" required />
                  <button onClick={handleSignup} className="submit-btn">Signup</button>
                </div>
              )}
              <button className="close-btn" onClick={() => setShowAuth(false)}>Close</button>
            </div>
          </div>
        )}
        <Footer />
      </div>
    </Router>
  );
}

export default App;