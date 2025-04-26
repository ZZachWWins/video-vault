import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import axios from 'axios';
import './App.css';
import { gsap } from 'gsap';

function Home() {
  const [videos, setVideos] = useState([]);
  const [featuredVideo, setFeaturedVideo] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [authMode, setAuthMode] = useState('signup');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [testimony, setTestimony] = useState('');
  const [testimonials, setTestimonials] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }

    const fetchVideos = async () => {
      try {
        const response = await axios.get('https://api.cloudinary.com/v1_1/dcmv6p5a8/resources/video', {
          headers: { Authorization: `Basic ${btoa('CLOUDINARY_API_KEY:CLOUDINARY_API_SECRET')}` },
        });
        const fetchedVideos = response.data.resources.map(video => ({
          url: video.secure_url,
          title: video.public_id,
          description: 'A video on detoxification.',
          uploader: 'Anonymous',
        }));
        setVideos(fetchedVideos);
        if (fetchedVideos.length > 0) {
          setFeaturedVideo(fetchedVideos[0]);
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('/api/testimonials');
        setTestimonials(response.data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };

    fetchVideos();
    fetchTestimonials();

    const stars = 50;
    for (let i = 0; i < stars; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.width = `${Math.random() * 3 + 1}px`;
      star.style.height = star.style.width;
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 100}vh`;
      star.style.animationDelay = `${Math.random() * 2}s`;
      document.body.appendChild(star);
    }

    gsap.to('.star', {
      opacity: 0.3,
      repeat: -1,
      yoyo: true,
      duration: 2,
      stagger: 0.05,
    });
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!videoFile || !title || !description) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', videoFile);
    formData.append('upload_preset', 'detox_videos');
    formData.append('public_id', title);

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/dcmv6p5a8/video/upload', formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
        },
      });

      const newVideo = {
        url: response.data.secure_url,
        title,
        description,
        uploader: loggedInUser ? loggedInUser.username : 'Anonymous',
      };

      setVideos([...videos, newVideo]);
      setTitle('');
      setDescription('');
      setVideoFile(null);
      setProgress(0);
    } catch (error) {
      console.error('Error uploading video:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/${authMode}`, { username, password, email, testimony });
      if (authMode === 'signup') {
        const newTestimonial = { username, testimony };
        setTestimonials([...testimonials, newTestimonial]);
        setShowAuthModal(false);
      } else {
        localStorage.setItem('user', JSON.stringify(response.data));
        setLoggedInUser(response.data);
        setShowAuthModal(false);
      }
    } catch (error) {
      console.error(`Error during ${authMode}:`, error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setLoggedInUser(null);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo-placeholder">Logo</div>
          <h1 className="title">God's Detox for Bob</h1>
          <div className="header-links">
            <Link to="/documentary" className="nav-btn">G2 Church Documentary</Link>
            <Link to="/newsletter" className="nav-btn">Get The Newsletter!</Link>
          </div>
        </div>
        <nav className="nav-menu">
          <Link to="/" className="nav-btn">Home</Link>
          <Link to="/about" className="nav-btn">About Our...</Link>
          <Link to="/benefits" className="nav-btn">Benefits</Link>
          <Link to="/mms" className="nav-btn">MMS (Master Mineral Solution)</Link>
          <Link to="/contact" className="nav-btn">Contact The Church</Link>
          {loggedInUser ? (
            <>
              <span className="nav-username">{loggedInUser.username}</span>
              <button onClick={handleLogout} className="nav-btn">Logout</button>
            </>
          ) : (
            <button onClick={() => setShowAuthModal(true)} className="nav-btn">Sign Up / Login</button>
          )}
        </nav>
      </header>
      <div className="main-content">
        <aside className="sidebar">
          <div className="sidebar-section">
            <h3 className="sidebar-title">Upcoming Seminars</h3>
            <span className="sidebar-link">G2 Church seminar in Santa Marta, Colombia - Feb 22nd-23rd 2020 (SPANISH)</span>
            <span className="sidebar-link">Genesis II Church Seminar 2020 Santa Marta, Colombia! - In English: Feb. 15th-16th - In Spanish: Feb. 22nd-23rd</span>
          </div>
        </aside>
        <main className="content-area">
          <section className="content-section">
            <div className="hero-section">
              <div className="hero-image-placeholder">Event Image</div>
              <div className="hero-overlay">
                <h2 className="content-title">We believe in...</h2>
                <ul className="beliefs-list">
                  <li>Doing good deeds</li>
                  <li>Doing what is right</li>
                  <li>Good health for all mankind</li>
                  <li>Freedom for all mankind</li>
                  <li>Enlightening with the truth</li>
                  <li>Helping one another</li>
                  <li>Integrity in all things</li>
                </ul>
                <button className="nav-btn" onClick={() => setShowAuthModal(true)}>Sign Up</button>
              </div>
            </div>
          </section>
          <section className="content-section">
            <h2 className="content-title">Featured Video</h2>
            {featuredVideo ? (
              <div className="video-card">
                <ReactPlayer url={featuredVideo.url} className="react-player" width="100%" height="300px" controls />
                <h3 className="video-title">{featuredVideo.title}</h3>
                <p className="video-description">{featuredVideo.description}</p>
                <p className="video-uploader">Uploaded by: {featuredVideo.uploader}</p>
              </div>
            ) : (
              <p className="no-videos">No featured video available.</p>
            )}
          </section>
          <section className="content-section">
            <h2 className="content-title">Videos</h2>
            {videos.length > 0 ? (
              <div className="video-grid">
                {videos.map((video, index) => (
                  <div key={index} className="video-card">
                    <ReactPlayer url={video.url} className="react-player" width="100%" height="200px" controls />
                    <h3 className="video-title">{video.title}</h3>
                    <p className="video-description">{video.description}</p>
                    <p className="video-uploader">Uploaded by: {video.uploader}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-videos">No videos available.</p>
            )}
          </section>
          <section className="content-section">
            <h2 className="content-title">Upload Your Detox Video</h2>
            <div className="upload-section">
              <form onSubmit={handleUpload} className="upload-form">
                <input type="text" placeholder="Video Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <textarea placeholder="Video Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files[0])} required />
                <button type="submit" className="upload-btn" disabled={uploading}>
                  {uploading ? 'Uploading...' : 'Upload Video'}
                </button>
                {uploading && (
                  <div className="progress-container">
                    <div className="progress-bar" style={{ width: `${progress}%` }}>
                      <span className="progress-text">{progress}%</span>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </section>
        </main>
      </div>
      {showAuthModal && (
        <div className="auth-modal">
          <div className="auth-content">
            <button className="close-btn" onClick={() => setShowAuthModal(false)}>X</button>
            <h2 className="auth-title">{authMode === 'signup' ? 'Sign Up' : 'Login'}</h2>
            <div className="auth-tabs">
              <button className={`tab-btn ${authMode === 'signup' ? 'active' : ''}`} onClick={() => setAuthMode('signup')}>
                Sign Up
              </button>
              <button className={`tab-btn ${authMode === 'login' ? 'active' : ''}`} onClick={() => setAuthMode('login')}>
                Login
              </button>
            </div>
            <form onSubmit={handleAuth} className="auth-form">
              <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              {authMode === 'signup' && (
                <>
                  <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  <textarea
                    className="testimonial-input"
                    placeholder="Your ClO2 Testimony"
                    value={testimony}
                    onChange={(e) => setTestimony(e.target.value)}
                    required
                  />
                  <p className="disclaimer-text">
                    Disclaimer: Testimonials are user-submitted and not verified. Consult a healthcare professional before using ClO2.
                  </p>
                </>
              )}
              <button type="submit" className="submit-btn">{authMode === 'signup' ? 'Sign Up' : 'Login'}</button>
            </form>
          </div>
        </div>
      )}
      {showInfoModal && (
        <div className="info-modal">
          <div className="info-content">
            <button className="close-btn" onClick={() => setShowInfoModal(false)}>X</button>
            <h2 className="info-title">ClO2 Testimonials</h2>
            {testimonials.length > 0 ? (
              testimonials.map((testimonial, index) => (
                <div key={index} className="info-text">
                  <strong>{testimonial.username}</strong>: {testimonial.testimony}
                </div>
              ))
            ) : (
              <p className="info-text">No testimonials available.</p>
            )}
          </div>
        </div>
      )}
      <footer className="footer">
        <p className="footer-text">© 2025 God's Detox for Bob. All rights reserved.</p>
      </footer>
    </div>
  );
}

function About() {
  return (
    <div className="content-area">
      <h2 className="content-title">About Our Mission</h2>
      <p className="content-text">
        God's Detox for Bob is dedicated to sharing knowledge and testimonials about ClO2 detoxification methods inspired by holistic health practices.
      </p>
    </div>
  );
}

function Benefits() {
  return (
    <div className="content-area">
      <h2 className="content-title">Benefits of ClO2 Detox</h2>
      <p className="content-text">
        Learn about the potential benefits of ClO2 detoxification, including improved health and wellness as reported by our community.
      </p>
    </div>
  );
}

function MMS() {
  return (
    <div className="content-area">
      <h2 className="content-title">MMS (Master Mineral Solution)</h2>
      <p className="content-text">
        MMS, or Master Mineral Solution, is a key component in many detox protocols. Learn more about its uses and community experiences.
      </p>
    </div>
  );
}

function Contact() {
  return (
    <div className="content-area">
      <h2 className="content-title">Contact The Church</h2>
      <p className="content-text">
        Reach out to us for more information about God's Detox for Bob and our mission to promote holistic health.
      </p>
    </div>
  );
}

function Documentary() {
  return (
    <div className="content-area">
      <h2 className="content-title">G2 Church Documentary</h2>
      <p className="content-text">
        Watch the G2 Church Documentary to learn more about the history and mission of the Genesis II Church of Health & Healing.
      </p>
    </div>
  );
}

function Newsletter() {
  return (
    <div className="content-area">
      <h2 className="content-title">Get The Newsletter!</h2>
      <p className="content-text">
        Sign up for our newsletter to receive updates, testimonials, and more from God's Detox for Bob.
      </p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/benefits" element={<Benefits />} />
        <Route path="/mms" element={<MMS />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/documentary" element={<Documentary />} />
        <Route path="/newsletter" element={<Newsletter />} />
      </Routes>
    </Router>
  );
}

export default App;