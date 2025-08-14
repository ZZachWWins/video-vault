import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player';
import './App.css';

function Home({ user, setUser, videos, setVideos, loading, setLoading }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [showHistory, setShowHistory] = useState(false);
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
        setVideos(res.data || []);
      } catch (err) {
        console.error('Fetch error:', err.response ? err.response.data : err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [setVideos, setLoading]);

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
      setVideos(videosRes.data || []);
      alert('Video uploaded successfully!');
    } catch (err) {
      console.error('Upload error:', err.response ? err.response.data : err.message);
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
      console.error('Failed to increment views:', err.response ? err.response.data : err.message);
    }
  };

  const featuredVideo = videos.length > 0 ? videos[0] : null;

  return (
    <div className="app">
      <canvas ref={canvasRef} className="starry-background" />
      <header className="header">
        <h1 className="title">Gods Detox</h1>
        <p className="subtitle">Presented by Bob The Plumber</p>
        <nav className="nav-section">
          <Link to="/" className="auth-btn">Home</Link>
          <Link to="/about" className="auth-btn">About CLO2</Link>
          <Link to="/testimonials" className="auth-btn">Testimonials</Link>
          <Link to="/resources" className="auth-btn">Resources</Link>
          <Link to="/contact" className="auth-btn">Contact</Link>
        </nav>
        {user ? (
          <div className="auth-section">
            <span>Welcome, {user.username}</span>
            <button onClick={handleLogout} className="auth-btn">Logout</button>
          </div>
        ) : (
          <div className="auth-section">
            <div className="login-form">
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
              <button onClick={handleLogin} className="auth-btn">Login</button>
            </div>
            <div className="signup-form">
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
              <button onClick={handleSignup} className="auth-btn">Signup</button>
            </div>
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
        <button className="cta-btn" onClick={() => window.location.href = 'mailto:zacharystreamingdba@gmail.com'}>
          Share Your Story
        </button>
        <button className="cta-btn" onClick={() => setShowHistory(true)}>
          History of CLO2
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
          <div className="upload-form">
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
            <button onClick={handleUpload} className="upload-btn">Upload Video</button>
          </div>
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

function About() {
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

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="app">
      <canvas ref={canvasRef} className="starry-background" />
      <header className="header">
        <h1 className="title">About CLO2</h1>
        <p className="subtitle">Understanding Chlorine Dioxide</p>
        <nav className="nav-section">
          <Link to="/" className="auth-btn">Home</Link>
          <Link to="/about" className="auth-btn">About CLO2</Link>
          <Link to="/testimonials" className="auth-btn">Testimonials</Link>
          <Link to="/resources" className="auth-btn">Resources</Link>
          <Link to="/contact" className="auth-btn">Contact</Link>
        </nav>
      </header>
      <main className="main">
        <section className="landing-section">
          <h2 className="landing-title">What is Chlorine Dioxide?</h2>
          <p className="landing-text">
            Chlorine dioxide (ClO₂) is a yellowish-green gas discovered in 1814 by Sir Humphry Davy. Known for its powerful oxidizing properties, it has been used for over a century in various applications, from water purification to industrial sanitation. Unlike chlorine, ClO₂ produces fewer harmful byproducts, making it a preferred choice for disinfecting drinking water and treating surfaces in food processing.
          </p>
          <h2 className="landing-title">Historical Uses</h2>
          <p className="landing-text">
            Since the 1940s, ClO₂ has been a cornerstone in water treatment, famously used to disinfect Niagara Falls’ drinking water. Its applications expanded in the 1970s and 1980s to include paper bleaching, medical equipment sterilization, and emergency disinfection in disaster zones. Today, it’s used globally in municipal water systems and industrial settings.
          </p>
          <h2 className="landing-title">Modern Applications</h2>
          <p className="landing-text">
            Beyond water purification, ClO₂ is explored for its potential in personal wellness by some communities. Advocates highlight its affordability and accessibility, while critics urge caution due to limited regulatory approval for certain uses. At Gods Detox, we provide information to help you understand its history and applications, empowering you to make informed decisions.
          </p>
          <p className="landing-disclaimer">
            Disclaimer: Information provided is for educational purposes only. We do not sell ClO₂ or offer medical advice. Always consult professionals and conduct your own research before making decisions.
          </p>
        </section>
      </main>
    </div>
  );
}

function Testimonials({ videos, loading, setVideos }) {
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

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleViewIncrement = async (id) => {
    try {
      const res = await axios.put('/.netlify/functions/videos', { id });
      setVideos(videos.map(video => 
        video._id === id ? { ...video, views: res.data.views } : video
      ));
    } catch (err) {
      console.error('Failed to increment views:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className="app">
      <canvas ref={canvasRef} className="starry-background" />
      <header className="header">
        <h1 className="title">Testimonials</h1>
        <p className="subtitle">Real Stories from Our Community</p>
        <nav className="nav-section">
          <Link to="/" className="auth-btn">Home</Link>
          <Link to="/about" className="auth-btn">About CLO2</Link>
          <Link to="/testimonials" className="auth-btn">Testimonials</Link>
          <Link to="/resources" className="auth-btn">Resources</Link>
          <Link to="/contact" className="auth-btn">Contact</Link>
        </nav>
      </header>
      <main className="main">
        <section className="video-grid">
          {loading ? (
            <div className="loader"></div>
          ) : videos.length === 0 ? (
            <p className="no-videos">No testimonials yet—share yours!</p>
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

function Resources() {
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

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="app">
      <canvas ref={canvasRef} className="starry-background" />
      <header className="header">
        <h1 className="title">Resources</h1>
        <p className="subtitle">Learn More About CLO2</p>
        <nav className="nav-section">
          <Link to="/" className="auth-btn">Home</Link>
          <Link to="/about" className="auth-btn">About CLO2</Link>
          <Link to="/testimonials" className="auth-btn">Testimonials</Link>
          <Link to="/resources" className="auth-btn">Resources</Link>
          <Link to="/contact" className="auth-btn">Contact</Link>
        </nav>
      </header>
      <main className="main">
        <section className="landing-section">
          <h2 className="landing-title">Educational Resources</h2>
          <p className="landing-text">
            Explore a curated list of resources to deepen your understanding of chlorine dioxide (ClO₂) and its applications. These materials are provided for informational purposes to help you make informed decisions.
          </p>
          <ul className="resource-list">
            <li><a href="https://www.epa.gov/dwreginfo/chlorine-dioxide" className="resource-link" target="_blank" rel="noopener noreferrer">EPA: Chlorine Dioxide in Water Treatment</a></li>
            <li><a href="https://www.who.int/publications/i/item/9789241548960" className="resource-link" target="_blank" rel="noopener noreferrer">WHO: Guidelines for Drinking-Water Quality</a></li>
            <li><a href="https://pubmed.ncbi.nlm.nih.gov/" className="resource-link" target="_blank" rel="noopener noreferrer">PubMed: Research Articles on ClO₂</a></li>
          </ul>
          <p className="landing-disclaimer">
            Disclaimer: These resources are external and provided for educational purposes only. We do not endorse or verify their content. Always consult professionals before making decisions.
          </p>
        </section>
      </main>
    </div>
  );
}

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
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

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleContactSubmit = () => {
    if (!name || !email || !message) {
      alert('Please fill out all fields!');
      return;
    }
    const mailtoLink = `mailto:zacharystreamingdba@gmail.com?subject=Contact from ${name}&body=${encodeURIComponent(message)}%0D%0AFrom: ${name}%0D%0AEmail: ${email}`;
    window.location.href = mailtoLink;
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="app">
      <canvas ref={canvasRef} className="starry-background" />
      <header className="header">
        <h1 className="title">Contact Us</h1>
        <p className="subtitle">Get in Touch with Gods Detox</p>
        <nav className="nav-section">
          <Link to="/" className="auth-btn">Home</Link>
          <Link to="/about" className="auth-btn">About CLO2</Link>
          <Link to="/testimonials" className="auth-btn">Testimonials</Link>
          <Link to="/resources" className="auth-btn">Resources</Link>
          <Link to="/contact" className="auth-btn">Contact</Link>
        </nav>
      </header>
      <main className="main">
        <section className="contact-section">
          <h2 className="landing-title">Reach Out</h2>
          <p className="landing-text">
            Have questions or want to share your thoughts? Contact us below, and we’ll get back to you as soon as possible.
          </p>
          <div className="contact-form">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              required
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your Message"
              required
            />
            <button onClick={handleContactSubmit} className="contact-btn">Send Message</button>
          </div>
        </section>
      </main>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} videos={videos} setVideos={setVideos} loading={loading} setLoading={setLoading} />} />
        <Route path="/about" element={<About />} />
        <Route path="/testimonials" element={<Testimonials videos={videos} loading={loading} setVideos={setVideos} />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;