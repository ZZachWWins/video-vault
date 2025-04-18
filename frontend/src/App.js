import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { gsap } from 'gsap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import StarryBackground from './StarryBackground';
import HomePage from './HomePage';
import VideosPage from './VideosPage';
import ArticlesPage from './ArticlesPage';
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

    const title = titleRef.current;
    if (title) {
      const letters = "God’s Detox".split('').map((char) => `<span class="letter">${char}</span>`).join('');
      title.innerHTML = letters;
      gsap.from('.letter', { duration: 1, opacity: 0, y: 50, stagger: 0.05, ease: 'power2.out' });
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
                progress={progress}
                setFile={setFile}
                setTitle={setTitle}
                setDescription={setDescription}
                setProgress={setProgress}
                handleUpload={handleUpload}
              />
            }
          />
          <Route path="/videos" element={<VideosPage videos={videos} loading={loading} />} />
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
        <Footer />
      </div>
    </Router>
  );
}

export default App;