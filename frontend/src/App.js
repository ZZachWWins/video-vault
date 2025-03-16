import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
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
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.5,
    }));

    const constellations = [
      { points: [[200, 200], [200, 300], [150, 250], [250, 250]], color: '#d32f2f' },
      { points: [[400, 100], [450, 150], [500, 200], [450, 250], [400, 200]], color: '#1976d2' },
    ];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
        star.alpha += Math.random() * 0.05 - 0.025;
        if (star.alpha > 1) star.alpha = 1;
        if (star.alpha < 0.5) star.alpha = 0.5;
      });

      constellations.forEach(constellation => {
        ctx.beginPath();
        ctx.strokeStyle = constellation.color;
        ctx.lineWidth = 1;
        constellation.points.forEach(([x, y], i) => {
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    const fetchVideos = async () => {
      try {
        const res = await axios.get('/.netlify/functions/videos');
        setVideos(res.data);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/.netlify/functions/login', { username, password });
      setUser(res.data.user);
      setUsername('');
      setPassword('');
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
    if (!user) {
      alert('Please log in to upload videos!');
      return;
    }
    if (!file) {
      alert('Please select a video file!');
      return;
    }

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
      setVideos(videosRes.data);
      alert('Video uploaded successfully!');
    } catch (err) {
      console.error('Upload error:', err);
      alert('Upload failed—check your file or permissions!');
    }
  };

  const handleViewIncrement = async (id) => {
    try {
      const res = await axios.put('/.netlify/functions/videos', { id });
      setVideos(videos.map(video => 
        video._id === id ? { ...video, views: res.data.views } : video
      ));
    } catch (err) {
      console.error('Failed to increment views:', err);
    }
  };

  const featuredVideo = videos.length > 0 ? videos[0] : null;

  return (
    <div className="app">
      <canvas ref={canvasRef} className="starry-background" />
      <header className="header">
        <h1 className="title">Gods Detox</h1>
        <p className="subtitle">Presented by Bob The Plumber</p>
        {user ? (
          <div className="auth-section">
            <span>Welcome, {user.username}</span>
            <button onClick={handleLogout} className="auth-btn">Logout</button>
          </div>
        ) : (
          <div className="auth-section">
            <form onSubmit={handleLogin} className="login-form">
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
              <button type="submit" className="auth-btn">Login</button>
            </form>
            <form onSubmit={handleSignup} className="signup-form">
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
              <button type="submit" className="auth-btn">Signup</button>
            </form>
          </div>
        )}
      </header>

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
        <button className="cta-btn" onClick={() => window.location.href = 'mailto:your-email@example.com'}>
          Share Your Story
        </button>
        <p className="landing-disclaimer">
          Disclaimer: Views on this site are for entertainment and opinion-sharing only. We don’t sell products, offer medical advice, or diagnose illness. Information about CLO2 is presented for your consideration—evaluate it carefully and make your own informed decisions.
        </p>
      </section>

      <main className="main">
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

        {user && (
          <form onSubmit={handleUpload} className="upload-form">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              accept="video/*"
              required
            />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              required
            />
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