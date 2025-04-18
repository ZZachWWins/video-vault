import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { gsap } from 'gsap';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Header from './Header';
import Footer from './Footer';
import AboutPage from './AboutPage';
import GrenonPage from './GrenonPage';
import VideosPage from './VideosPage';
import ArticlesPage from './ArticlesPage';
import StarryBackground from './StarryBackground';
import './App.css';

function HomePage({ user, videos, loading, file, title, description, username, password, signupUsername, signupPassword, showHistory, showCourse, showAuth, activeTab, progress, enlargedImage, isBookMenuOpen, selectedMoment, searchTerm, showBackToTop, setUser, setVideos, setLoading, setFile, setTitle, setDescription, setUsername, setPassword, setSignupUsername, setSignupPassword, setShowHistory, setShowCourse, setShowAuth, setActiveTab, setProgress, setEnlargedImage, setIsBookMenuOpen, setSelectedMoment, setSearchTerm, setShowBackToTop, landingRefs, handleLogin, handleSignup, handleLogout, handleUpload, handleViewIncrement, handleLike, hasLiked, handleImageClick, closeEnlargedImage, toggleBookMenu, handleMomentClick, sortedVideos, featuredVideo }) {
  const navigate = useNavigate();
  const [showEternalModal, setShowEternalModal] = useState(false);

  console.log('HomePage rendering', { videos, featuredVideo, loading });

  return (
    <div className="main-content">
      <div className="rotating-text-background">God’s Detox</div>

      <main className="menu-container">
        {featuredVideo && (
          <section className="featured-section">
            <h2 className="featured-title">Featured Video</h2>
            <div className="featured-video">
              <ReactPlayer
                url={featuredVideo.fileUrl}
                light={featuredVideo.thumbnailUrl}
                width="100%"
                height="150px"
                controls
                onStart={() => handleViewIncrement(featuredVideo._id)}
              />
              <h3 className="video-title">{featuredVideo.title}</h3>
              <button className="cta-btn" onClick={() => navigate('/videos')}>
                <span>▶</span> Watch More
              </button>
            </div>
          </section>
        )}
        <div className="menu-grid">
          <section className="menu-tile landing-section">
            <i className="fas fa-handshake"></i>
            <h2 className="landing-title" ref={(el) => (landingRefs.current[0] = el)}>Welcome</h2>
            <button className="cta-btn" onClick={() => navigate('/about')}>
              <span>▶</span> Learn More
            </button>
          </section>
          <section className="menu-tile why-clo2-section">
            <i className="fas fa-question-circle"></i>
            <h2 className="why-clo2-title">Why CLO2?</h2>
            <button className="cta-btn" onClick={() => navigate('/articles')}>
              <span>▶</span> Dive Deeper
            </button>
          </section>
          <section className="menu-tile article-section">
            <i className="fas fa-quote-left"></i>
            <h2 className="article-title">Bob’s Message</h2>
            <button className="cta-btn" onClick={() => navigate('/about')}>
              <span>▶</span> Read More
            </button>
          </section>
          <section className="menu-tile testimonials-section">
            <i className="fas fa-comments"></i>
            <h2 className="testimonials-title">Testimonials</h2>
            <button className="cta-btn" onClick={() => navigate('/videos')}>
              <span>▶</span> See Stories
            </button>
          </section>
          <section className="menu-tile history-section">
            <i className="fas fa-history"></i>
            <h2 className="history-title">CLO2 History</h2>
            <button className="cta-btn" onClick={() => setShowHistory(true)}>
              <span>▶</span> Explore History
            </button>
          </section>
          <section className="menu-tile course-section">
            <i className="fas fa-graduation-cap"></i>
            <h2 className="course-title">ClO₂ Course</h2>
            <button className="cta-btn" onClick={() => setShowCourse(true)}>
              <span>▶</span> Start Learning
            </button>
          </section>
          <section className="menu-tile eternal-picture-section">
            <i className="fas fa-cross"></i>
            <h2 className="eternal-title">The Eternal Big Picture</h2>
            <button className="cta-btn glowing-btn" onClick={() => setShowEternalModal(true)}>
              <span>▶</span> Explore Eternity
            </button>
          </section>
        </div>
      </main>

      {showEternalModal && (
        <div className="eternal-modal">
          <div className="eternal-content">
            <h2 className="eternal-title">The Eternal Big Picture</h2>
            <div className="eternal-scrollable">
              <p className="eternal-text">
                The foundational TRUTH of “God’s Detox.com” is that man needs to be Spiritually cleansed (detoxed) by the Word of God. And that can ONLY happen by repenting and believing the Gospel of Jesus, which allows ANY man or woman to enter into His Kingdom for eternity through the blood sacrifice of the Christ!
              </p>
            </div>
            <button className="close-btn" onClick={() => setShowEternalModal(false)}>Close</button>
          </div>
        </div>
      )}

      {showHistory && (
        <div className="history-modal">
          <div className="history-content">
            <h2 className="history-title">Chlorine Dioxide: A Brief History</h2>
            <p className="history-text">
              Discovered in 1814 by Sir Humphry Davy, chlorine dioxide (ClO₂) started as a yellowish-green gas with powerful oxidizing properties.
            </p>
            <button className="close-btn" onClick={() => setShowHistory(false)}>Close</button>
          </div>
        </div>
      )}

      {showCourse && (
        <div className="course-modal">
          <div className="course-content">
            <h2 className="course-title">The Universal Antidote Course: ClO₂ Basics</h2>
            <p className="course-text">
              A free, eight-part video series teaching you how to make and use chlorine dioxide (ClO₂). Explore it at <a href="https://theuniversalantidote.com" target="_blank" rel="noopener noreferrer">theuniversalantidote.com</a>.
            </p>
            <button className="close-btn" onClick={() => setShowCourse(false)}>Close</button>
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

      {showBackToTop && (
        <button className="back-to-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑ Top</button>
      )}
    </div>
  );
}

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
  const [showHistory, setShowHistory] = useState(false);
  const [showCourse, setShowCourse] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [progress, setProgress] = useState(0);
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [isBookMenuOpen, setIsBookMenuOpen] = useState(false);
  const [selectedMoment, setSelectedMoment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const titleRef = useRef(null);
  const landingRefs = useRef([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get('/.netlify/functions/videos');
        console.log('Videos fetched:', res.data);
        setVideos(res.data || []);
      } catch (err) {
        console.error('Fetch videos error:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();

    const title = titleRef.current;
    if (title) {
      const letters = "God’s Detox".split('').map((char) => `<span class="letter">${char}</span>`).join('');
      title.innerHTML = letters;
      gsap.from('.letter', { duration: 1, opacity: 0, y: 50, stagger: 0.05, ease: 'power2.out', onComplete: () => gsap.set('.letter', { y: 0, opacity: 1, clearProps: 'all' }) });
    }

    if (landingRefs.current.length) {
      gsap.from(landingRefs.current, { duration: 1, opacity: 0, y: 30, stagger: 0.2, ease: 'power2.out', delay: 0.5 });
    }

    const handleScroll = () => setShowBackToTop(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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

  const handleViewIncrement = async (id) => {
    try {
      const res = await axios.put('/.netlify/functions/videos', { id });
      setVideos((prevVideos) => prevVideos.map((video) => (video._id === id ? { ...video, views: res.data.views } : video)));
    } catch (err) {
      console.error('View increment error:', err.response?.data || err.message);
    }
  };

  const handleLike = async (id) => {
    if (!user) {
      alert('Please log in to like videos!');
      return;
    }
    try {
      const res = await axios.put('/.netlify/functions/videos', { id, userId: user._id, action: 'like' });
      setVideos((prevVideos) =>
        prevVideos.map((video) =>
          video._id === id
            ? { ...video, likes: res.data.likes !== undefined ? res.data.likes : (video.likes || 0) + 1, likedBy: res.data.likedBy || [...(video.likedBy || []), user._id] }
            : video
        )
      );
    } catch (err) {
      console.error('Like error:', err.response?.data || err.message);
      if (err.response?.status === 403) {
        alert('You’ve already liked this video!');
      } else {
        alert('Failed to like video—try again later!');
        const videosRes = await axios.get('/.netlify/functions/videos');
        setVideos(videosRes.data || []);
      }
    }
  };

  const hasLiked = (video) => user && video.likedBy && Array.isArray(video.likedBy) && video.likedBy.includes(user._id);

  const handleImageClick = (src, alt) => setEnlargedImage({ src, alt });
  const closeEnlargedImage = () => setEnlargedImage(null);
  const toggleBookMenu = () => setIsBookMenuOpen(!isBookMenuOpen);
  const handleMomentClick = (index) => setSelectedMoment(index === selectedMoment ? null : index);

  const filteredVideos = videos.filter(video =>
    (video.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (video.description || '').toLowerCase().includes(searchTerm.toLowerCase())
  );
  const sortedVideos = [...videos].sort((a, b) => (b.views || 0) - (a.views || 0));
  const featuredVideo = sortedVideos.length > 0 ? sortedVideos[0] : null;

  return (
    <Router>
      <div className="app">
        <StarryBackground />
        <Header
          user={user}
          setShowAuth={setShowAuth}
          setUser={setUser}
          handleLogout={handleLogout}
          titleRef={titleRef}
          setActiveTab={setActiveTab}
          username={username}
          setShowCourse={setShowCourse}
        />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                user={user}
                videos={videos}
                loading={loading}
                file={file}
                title={title}
                description={description}
                username={username}
                password={password}
                signupUsername={signupUsername}
                signupPassword={signupPassword}
                showHistory={showHistory}
                showCourse={showCourse}
                showAuth={showAuth}
                activeTab={activeTab}
                progress={progress}
                enlargedImage={enlargedImage}
                isBookMenuOpen={isBookMenuOpen}
                selectedMoment={selectedMoment}
                searchTerm={searchTerm}
                showBackToTop={showBackToTop}
                setUser={setUser}
                setVideos={setVideos}
                setLoading={setLoading}
                setFile={setFile}
                setTitle={setTitle}
                setDescription={setDescription}
                setUsername={setUsername}
                setPassword={setPassword}
                setSignupUsername={setSignupUsername}
                setSignupPassword={setSignupPassword}
                setShowHistory={setShowHistory}
                setShowCourse={setShowCourse}
                setShowAuth={setShowAuth}
                setActiveTab={setActiveTab}
                setProgress={setProgress}
                setEnlargedImage={setEnlargedImage}
                setIsBookMenuOpen={setIsBookMenuOpen}
                setSelectedMoment={setSelectedMoment}
                setSearchTerm={setSearchTerm}
                setShowBackToTop={setShowBackToTop}
                landingRefs={landingRefs}
                handleLogin={handleLogin}
                handleSignup={handleSignup}
                handleLogout={handleLogout}
                handleUpload={handleUpload}
                handleViewIncrement={handleViewIncrement}
                handleLike={handleLike}
                hasLiked={hasLiked}
                handleImageClick={handleImageClick}
                closeEnlargedImage={closeEnlargedImage}
                toggleBookMenu={toggleBookMenu}
                handleMomentClick={handleMomentClick}
                sortedVideos={sortedVideos}
                featuredVideo={featuredVideo}
              />
            }
          />
          <Route path="/about" element={<AboutPage user={user} />} />
          <Route
            path="/grenon"
            element={
              <GrenonPage
                enlargedImage={enlargedImage}
                selectedMoment={selectedMoment}
                setEnlargedImage={setEnlargedImage}
                handleImageClick={handleImageClick}
                closeEnlargedImage={closeEnlargedImage}
                toggleBookMenu={toggleBookMenu}
                handleMomentClick={handleMomentClick}
                isBookMenuOpen={isBookMenuOpen}
              />
            }
          />
          <Route
            path="/videos"
            element={
              <VideosPage
                user={user}
                videos={videos}
                loading={loading}
                filteredVideos={filteredVideos}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleViewIncrement={handleViewIncrement}
                handleLike={handleLike}
                hasLiked={hasLiked}
              />
            }
          />
          <Route path="/articles" element={<ArticlesPage />} />
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
        <Footer setShowBackToTop={setShowBackToTop} />
      </div>
    </Router>
  );
}

export default App;