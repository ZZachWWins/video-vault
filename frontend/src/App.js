import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { gsap } from 'gsap';
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
  const [signup strangUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [showCourse, setShowCourse] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const canvasRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * (canvas?.width || window.innerWidth),
      y: Math.random() * (canvas?.height || window.innerHeight),
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.5,
    }));

    // More constellations in white and gold
    const constellations = [
      { points: [[200, 200], [200, 300], [150, 250], [250, 250]], color: '#ffffff' }, // White
      { points: [[400, 100], [450, 150], [500, 200], [450, 250], [400, 200]], color: '#d4af37' }, // Gold
      { points: [[300, 400], [350, 450], [400, 400], [350, 350]], color: '#ffffff' }, // White
      { points: [[600, 300], [650, 350], [700, 300], [650, 250]], color: '#d4af37' }, // Gold
      { points: [[100, 500], [150, 550], [200, 500], [150, 450]], color: '#ffffff' }, // White
    ];

    const animate = () => {
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach((star) => {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
          ctx.fill();
          star.alpha += Math.random() * 0.05 - 0.025;
          star.alpha = Math.max(0.5, Math.min(1, star.alpha));
        });

        constellations.forEach((constellation) => {
          ctx.beginPath();
          ctx.strokeStyle = constellation.color;
          ctx.lineWidth = 1;
          constellation.points.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
          ctx.stroke();
        });

        animationFrameId = requestAnimationFrame(animate);
      }
    };
    animate();

    const fetchVideos = async () => {
      try {
        const res = await axios.get('/.netlify/functions/videos');
        setVideos(res.data || []);
      } catch (err) {
        console.error('Fetch error:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();

    const title = titleRef.current;
    if (title) {
      const letters = title.innerText
        .split('')
        .map((char) => `<span class="letter">${char}</span>`)
        .join('');
      title.innerHTML = letters;

      gsap.from('.letter', {
        duration: 1,
        opacity: 0,
        y: 50,
        stagger: 0.05,
        ease: 'power2.out',
        onComplete: () => {
          gsap.set('.letter', {
            y: 0,
            opacity: 1,
            clearProps: 'all',
          });
        },
      });
    }

    return () => {
      window.addEventListener('resize', resizeCanvas);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
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
      const res = await axios.post('https://api.cloudinary.com/v1_1/dwmnbrjtu/video/upload', formData);
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
      const videosRes = await axios.get('/.netlify/functions/videos');
      setVideos(videosRes.data || []);
      alert('Video uploaded successfully!');
    } catch (err) {
      console.error('Upload error:', err.response?.data || err.message);
      alert('Upload failed—check your file or permissions!');
    }
  };

  const handleViewIncrement = async (id) => {
    try {
      const res = await axios.put('/.netlify/functions/videos', { id });
      setVideos((videos) =>
        videos.map((video) => (video._id === id ? { ...video, views: res.data.views } : video))
      );
    } catch (err) {
      console.error('Failed to increment views:', err.response?.data || err.message);
    }
  };

  const featuredVideo = videos.length > 0 ? videos[0] : null;

  return (
    <div className="app">
      <canvas ref={canvasRef} className="starry-background" />
      <div className="rotating-text-background">Gods Detox</div>

      <header className="header">
        <h1 ref={titleRef} className="title">
          Gods Detox
        </h1>
        <p className="subtitle">Presented by Bob The Plumber</p>
        <div className="auth-section">
          {user ? (
            <>
              <span>Welcome, {user.username}</span>
              <button onClick={handleLogout} className="auth-btn">Logout</button>
            </>
          ) : (
            <button onClick={() => setShowAuth(true)} className="auth-btn">Auth</button>
          )}
        </div>
      </header>

      {/* Featured Video Section - Moved under header */}
      {featuredVideo && (
        <section className="featured-section">
          <h2 className="featured-title">Featured Video</h2>
          <div className="featured-video">
            <ReactPlayer
              url={featuredVideo.fileUrl}
              light={featuredVideo.thumbnailUrl}
              width="100%"
              height="400px"
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

      {/* Auth Modal */}
      {showAuth && (
        <div className="auth-modal">
          <div className="auth-content">
            <h2 className="auth-title">Authentication</h2>
            <div className="auth-tabs">
              <button
                className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
                onClick={() => setActiveTab('login')}
              >
                Login
              </button>
              <button
                className={`tab-btn ${activeTab === 'signup' ? 'active' : ''}`}
                onClick={() => setActiveTab('signup')}
              >
                Signup
              </button>
            </div>
            {activeTab === 'login' ? (
              <form onSubmit={handleLogin} className="auth-form">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  required
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
                <button type="submit" className="submit-btn">Login</button>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="auth-form">
                <input
                  type="text"
                  value={signupUsername}
                  onChange={(e) => setSignupUsername(e.target.value)}
                  placeholder="Choose Username"
                  required
                />
                <input
                  type="password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  placeholder="Choose Password"
                  required
                />
                <button type="submit" className="submit-btn">Signup</button>
              </form>
            )}
            <button className="close-btn" onClick={() => setShowAuth(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Landing Section - Moved after featured video */}
      <section className="landing-section">
        <h2 className="landing-title">Welcome to Gods Detox</h2>
        <p className="landing-text">
          Welcome to Gods Detox, where faith meets transformation. We’re sharing powerful stories of grace, hope, and inspiration through video, spotlighting the potential of CLO2—a simple, accessible tool used worldwide to purify water and, some believe, enhance well-being. Join us to explore real experiences and decide for yourself.
        </p>
        <h2 className="landing-title">The CLO2 Movement</h2>
        <p className="landing-text">
          Chlorine dioxide (CLO2) isn’t just another health fad—it’s a movement. Used for years in water purification, CLO2 is affordable and easy to make, offering an option for those seeking alternatives. Through our videos, hear from people of faith who’ve embraced it and share your own story of detox and renewal.
        </p>
        <h2 className="landing-title">Your Choice, Your Voice</h2>
        <p className="landing-text">
          At Gods Detox, we believe in your right to choose. CLO2 has sparked debate—praised by some, questioned by others. Our platform cuts through the noise with authentic video testimonies. Watch, learn, and contribute your voice to a community grounded in faith and personal freedom.
        </p>
        <button className="cta-btn" onClick={() => (window.location.href = 'mailto:zacharystreamingdba@gmail.com')}>
          Share Your Story
        </button>
        <button className="cta-btn" onClick={() => setShowHistory(true)}>
          History of CLO2
        </button>
        <button className="cta-btn" onClick={() => setShowCourse(true)}>
          ClO₂ Course
        </button>
        <p className="landing-disclaimer">
          Disclaimer: Views on this site are for opinion-sharing only. We believe in helping bring people closer to God while healing themselves. We don’t sell products, offer medical advice, or diagnose illness. Information about CLO2 is presented for your consideration only—evaluate it carefully and make your own informed decisions.
        </p>

        {showHistory && (
          <div className="history-modal">
            <div className="history-content">
              <h2 className="history-title">Chlorine Dioxide: A Brief History</h2>
              <p className="history-text">
                Discovered in 1814 by Sir Humphry Davy, chlorine dioxide (ClO₂) started as a yellowish-green gas with powerful oxidizing properties. Studied through the 19th century, it emerged in the 1900s as a bleaching agent for paper, revolutionizing the industry. By the 1940s, it became a breakthrough in water treatment, disinfecting Niagara Falls’ drinking water. Its eco-friendly profile—producing fewer toxic byproducts—boosted its use in the 1970s-80s for water and industrial applications. Today, ClO₂ is vital for sanitation, food processing, and emergency disinfection, though it’s faced controversy. It's recently being used as a way to detox your system. From a lab curiosity to a global tool, its story blends innovation with responsibility.
              </p>
              <button className="close-btn" onClick={() => setShowHistory(false)}>
                Close
              </button>
            </div>
          </div>
        )}

        {showCourse && (
          <div className="course-modal">
            <div className="course-content">
              <h2 className="course-title">The Universal Antidote Course: ClO₂ Basics</h2>
              <p className="course-text">
                The Universal Antidote Course is a free, eight-part video series teaching you how to make and use chlorine dioxide (ClO₂), a substance dubbed “The Universal Antidote.” Created by “The Curious Outlier,” it’s rooted in faith and a mission to help people heal. Here’s what you’ll learn:
              </p>
              <ul className="course-list">
                <li><strong>History:</strong> ClO₂’s journey from water purification to health applications, including NASA’s 1987 “universal antidote” claim.</li>
                <li><strong>Making MMS1 (CD):</strong> Mix sodium chlorite with an acid (e.g., 4% hydrochloric or 50% citric) for 30 seconds to release 10% ClO₂ gas. Use orally starting with 1-3 drops.</li>
                <li><strong>Making CDS:</strong> Pure ClO₂ gas dissolved in water, free of residuals, ideal for those sensitive to MMS1.</li>
                <li><strong>Usage:</strong> Start with the MMS Starting Procedure (low doses), then escalate to protocols like 1000 for illness—always with caution.</li>
                <li><strong>Safety:</strong> Use food-grade ingredients, avoid overuse, and consult the free guidebook for detailed steps.</li>
              </ul>
              <p className="course-text">
                Testimonials claim ClO₂ helps with everything from heart issues to cancer, but evidence is anecdotal. Explore the course at <a href="https://theuniversalantidote.com" target="_blank" rel="noopener noreferrer">theuniversalantidote.com</a> and decide for yourself.
              </p>
              <button className="close-btn" onClick={() => setShowCourse(false)}>
                Close
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Main Section - Video grid and upload form at the bottom */}
      <main className="main">
        {user && (
          <form onSubmit={handleUpload} className="upload-form">
            <input type="file" onChange={(e) => setFile(e.target.files[0])} accept="video/*" required />
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              required
            />
            <button type="submit" className="upload-btn">Upload Video</button>
          </form>
        )}

        <section className="video-grid">
          {loading ? (
            <div className="loader"></div>
          ) : videos.length === 0 ? (
            <p className="no-videos">No videos yet—upload some!</p>
          ) : (
            videos.map((video) => (
              <div key={video._id} className="video-card">
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
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
}

export default App;