import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import './App.css';

function App() {
  // State variables
  const [user, setUser] = useState(null); // Logged-in user data
  const [videos, setVideos] = useState([]); // List of videos
  const [loading, setLoading] = useState(true); // Loading state for videos
  const [file, setFile] = useState(null); // Video file for upload
  const [title, setTitle] = useState(''); // Video title
  const [description, setDescription] = useState(''); // Video description
  const [username, setUsername] = useState(''); // Login username
  const [password, setPassword] = useState(''); // Login password
  const [signupUsername, setSignupUsername] = useState(''); // Signup username
  const [signupPassword, setSignupPassword] = useState(''); // Signup password
  const canvasRef = useRef(null); // Reference to canvas for starry background

  // Setup starry background and fetch videos on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Resize canvas to fit window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create stars
    const stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.5,
    }));

    // Define constellations
    const constellations = [
      { points: [[200, 200], [200, 300], [150, 250], [250, 250]], color: '#d32f2f' },
      { points: [[400, 100], [450, 150], [500, 200], [450, 250], [400, 200]], color: '#1976d2' },
    ];

    // Animation loop for stars and constellations
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

    // Fetch videos from Netlify Function
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

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Handle login
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

  // Handle signup
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

  // Handle logout
  const handleLogout = async () => {
    try {
      await axios.get('/.netlify/functions/logout');
      setUser(null);
    } catch (err) {
      alert('Logout failed—try again!');
    }
  };

  // Handle video upload
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
    formData.append('upload_preset', 'video-vault-preset'); // Replace with your preset

    try {
      const res = await axios.post('https://api.cloudinary.com/v1_1/dwmnbrjtu/video/upload', formData);
      const videoData = {
        title,
        description,
        fileUrl: res.data.secure_url,
        thumbnailUrl: res.data.secure_url.replace('/upload/', '/upload/w_320,h_240/'),
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

  // Handle video delete
  const handleDelete = async (videoId) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      try {
        await axios.post('/.netlify/functions/deleteVideo', { videoId });
        setVideos(videos.filter((v) => v._id !== videoId));
      } catch (err) {
        console.error('Delete failed:', err);
        alert('Delete failed—try again!');
      }
    }
  };

  // Render UI
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

      <section className="info-section">
        <h2 className="info-title">Welcome to Gods Detox</h2>
        <p className="info-text">
          Sharing faith through video, we bring you stories of grace, hope, and inspiration.
        </p>
        <p className="info-cta">
          Explore our collection below or message us with your story about CLO2 to share your own message.
        </p>
      </section>

      <main className="main">
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
                {user && user.app_metadata && user.app_metadata.roles && user.app_metadata.roles.includes('admin') && (
                  <button onClick={() => handleDelete(video._id)} className="delete-btn">Delete</button>
                )}
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
}

export default App;