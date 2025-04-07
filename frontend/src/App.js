import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { gsap } from 'gsap';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import DrKoryPage from './DrKoryPage';
import AboutPage from './AboutPage';
import GrenonPage from './GrenonPage';
import VideosPage from './VideosPage';
import ArticlesPage from './ArticlesPage';
import StarryBackground from './StarryBackground';
import './App.css';

function HomePage({ user, videos, loading, file, title, description, username, password, signupUsername, signupPassword, showHistory, showCourse, showAuth, activeTab, progress, enlargedImage, isBookMenuOpen, selectedMoment, searchTerm, showBackToTop, setUser, setVideos, setLoading, setFile, setTitle, setDescription, setUsername, setPassword, setSignupUsername, setSignupPassword, setShowHistory, setShowCourse, setShowAuth, setActiveTab, setProgress, setEnlargedImage, setIsBookMenuOpen, setSelectedMoment, setSearchTerm, setShowBackToTop, titleRef, landingRefs, handleLogin, handleSignup, handleLogout, handleUpload, handleViewIncrement, handleLike, hasLiked, handleImage isbnClick, closeEnlargedImage, toggleBookMenu, handleMomentClick, sortedVideos, featuredVideo }) {
  const navigate = useNavigate();

  return (
    <div className="app">
      <StarryBackground />
      <div className="rotating-text-background">God’s Detox</div>

      <header className="header">
        <h1 ref={titleRef} className="title">God’s Detox</h1>
        <p className="subtitle">Presented by Bob The Plumber</p>
        <nav className="navbar">
          <button className="auth-btn" onClick={() => navigate('/')}>Home</button>
          <button className="auth-btn" onClick={() => navigate('/drkory')}>Dr. Kory</button>
          <button className="auth-btn" onClick={() => navigate('/about')}>About</button>
          <button className="auth-btn" onClick={() => navigate('/videos')}>Videos</button>
          <button className="auth-btn" onClick={() => navigate('/grenon')}>Grenon</button>
          <button className="auth-btn" onClick={() => navigate('/articles')}>Articles</button>
        </nav>
        <div className="auth-section">
          {user ? (
            <>
              <span>Welcome, {user.username}</span>
              <button onClick={handleLogout} className="auth-btn">Logout</button>
            </>
          ) : (
            <button onClick={() => setShowAuth(true)} className="auth-btn">Sign up or Log in</button>
          )}
        </div>
      </header>

      <main className="quadrants-container">
        {featuredVideo && (
          <section className="quadrant featured-section">
            <h2 className="featured-title">Featured Video</h2>
            <div className="featured-video">
              <ReactPlayer
                url={featuredVideo.fileUrl}
                light={featuredVideo.thumbnailUrl}
                width="100%"
                height="200px"
                controls
                onStart={() => handleViewIncrement(featuredVideo._id)}
              />
              <h3 className="video-title">{featuredVideo.title}</h3>
              <p className="video-description">{featuredVideo.description}</p>
              <p className="video-uploader">Uploaded by: {featuredVideo.uploadedBy}</p>
              <p className="video-views">Views: {featuredVideo.views || 0}</p>
            </div>
          </section>
        )}

        <section className="quadrant landing-section">
          <h2 className="landing-title" ref={(el) => (landingRefs.current[0] = el)}>Welcome to God’s Detox</h2>
          <p className="landing-text" ref={(el) => (landingRefs.current[1] = el)}>
            Welcome to God’s Detox, where faith meets transformation. We’re sharing powerful stories of grace, hope, and inspiration through video, spotlighting the potential of CLO2.
          </p>
          <h2 className="landing-title" ref={(el) => (landingRefs.current[2] = el)}>The CLO2 Movement</h2>
          <p className="landing-text" ref={(el) => (landingRefs.current[3] = el)}>
            Chlorine dioxide (CLO2) isn’t just another health fad—it’s a movement. Used for years in water purification, CLO2 is affordable and easy to make.
          </p>
          <div className="button-group">
            <button className="cta-btn" onClick={() => (window.location.href = 'mailto:zacharystreamingdba@gmail.com')} ref={(el) => (landingRefs.current[4] = el)}>Share Your Story</button>
            <button className="cta-btn" onClick={() => setShowHistory(true)} ref={(el) => (landingRefs.current[5] = el)}>History of CLO2</button>
            <button className="cta-btn" onClick={() => setShowCourse(true)} ref={(el) => (landingRefs.current[6] = el)}>ClO₂ Course</button>
          </div>
        </section>

        <section className="quadrant why-clo2-section">
          <h2 className="why-clo2-title">Why CLO2?</h2>
          <p className="why-clo2-text">
            Chlorine dioxide (CLO2) has been a quiet hero in water purification for decades—safe enough to treat municipal water supplies, yet powerful enough to tackle pathogens.
          </p>
        </section>

        <section className="quadrant article-section">
          <h2 className="article-title">A Message from Bob The Plumber</h2>
          <div className="article-content">
            <p className="article-text">
              Thank you for coming to our website. God has a detox for both your body and your soul. Physically, chlorine dioxide kills bacteria; spiritually, Jesus Christ offers eternal redemption.
            </p>
            <p className="article-author">— Bob The Plumber</p>
            <button className="cta-btn" onClick={() => navigate('/about')}>Read More</button>
          </div>
        </section>

        <section className="quadrant testimonials-section">
          <h2 className="testimonials-title">What People Are Saying</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p className="testimonial-text">“I started using CLO2 after watching a video here. It’s changed how I feel every day—more energy!”</p>
              <p className="testimonial-author">- Sarah M., Texas</p>
            </div>
          </div>
        </section>
      </main>

      {showAuth && (
        <div className="auth-modal">
          <div className="auth-content">
            <h2 className="auth-title">Authentication</h2>
            <div className="auth-tabs">
              <button className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`} onClick={() => setActiveTab('login')}>Login</button>
              <button className={`tab-btn ${activeTab === 'signup' ? 'active' : ''}`} onClick={() => setActiveTab('signup')}>Signup</button>
            </div>
            {activeTab === 'login' ? (
              <form onSubmit={handleLogin} className="auth-form">
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit" className="submit-btn">Login</button>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="auth-form">
                <input type="text" value={signupUsername} onChange={(e) => setSignupUsername(e.target.value)} placeholder="Choose Username" required />
                <input type="password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} placeholder="Choose Password" required />
                <button type="submit" className="submit-btn">Signup</button>
              </form>
            )}
            <button className="close-btn" onClick={() => setShowAuth(false)}>Close</button>
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
          <form onSubmit={handleUpload} className="upload-form">
            <input type="file" onChange={(e) => setFile(e.target.files[0])} accept="video/*" required />
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
            <button type="submit" className="upload-btn">Upload Video</button>
            {progress > 0 && progress < 100 && (
              <div className="progress-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}>
                  <span className="progress-text">{progress}%</span>
                </div>
              </div>
            )}
          </form>
        </section>
      )}

      <footer className="footer">
        <p className="footer-text">Built by Zachary | © 2025 Bob The Plumber. All rights reserved.</p>
        <div className="social-links">
          <a href="https://truthsocial.com/@BobThePlumber" target="_blank" rel="noopener noreferrer" className="social-icon" title="Truth Social"><i className="fab fa-tumblr"></i></a>
          <a href="https://x.com/BobsThePlumber" target="_blank" rel="noopener noreferrer" className="social-icon" title="X"><i className="fab fa-twitter"></i></a>
        </div>
      </footer>

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
              titleRef={titleRef}
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
        <Route path="/drkory" element={<DrKoryPage />} />
        <Route path="/about" element={<AboutPage />} />
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
    </Router>
  );
}

export default App;