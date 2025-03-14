import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import './App.css';

function App() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const canvasRef = useRef(null);

  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dwmnbrjtu/video/upload';
  const UPLOAD_PRESET = 'video-vault-preset'; // Create this in Cloudinary if not done

  useEffect(() => {
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
  }, []);

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
    if (!user || user.role !== 'admin') {
      alert('Only admins can upload videos!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
      const res = await axios.post(CLOUDINARY_URL, formData);
      const videoData = {
        title,
        description,
        fileUrl: res.data.secure_url,
        thumbnailUrl: `${res.data.secure_url.replace('/upload/', '/upload/w_320,h_240/')}`,
        uploadedBy: user.username
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

  return (
    <div className="app">
      <canvas ref={canvasRef} className="starry-background" />
      <header className="header">
        <h1 className="title">Gods Detox</h1>
        <p className="subtitle">By Bob The Plumber</p>
        <div className="auth-section">
          {user ? (
            <>
              <span>Welcome, {user.username} ({user.role})</span>
              <button onClick={handleLogout} className="auth-btn">Logout</button>
            </>
          ) : (
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
          )}
        </div>
      </header>

      <section className="info-section">
        <h2 className="info-title">Gods Detox</h2>
        <p className="info-text">
          Sharing faith through video, we bring you stories of grace, hope, and inspiration.
        </p>
        <p className="info-cta">
          Explore our collection below or join us as an admin to share your own message.
        </p>
      </section>

      <main className="main">
        {user && user.role === 'admin' && (
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
            <p className="no-videos">Loading videos...</p>
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
                />
                <h2 className="video-title">{video.title}</h2>
                <p className="video-description">{video.description}</p>
                <p className="video-uploader">Uploaded by: {video.uploadedBy}</p>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
}

export default App;