import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import axios from 'axios';
import './App.css';
import ErrorBoundary from './ErrorBoundary';
import StarryBackground from './StarryBackground';

// Cloudinary images for Bob with famous people and other notable moments
const galleryImages = [
  { src: 'https://res.cloudinary.com/dwmnbrjtu/image/upload/PHOTO-2025-04-21-19-22-59_b6xwco.jpg', alt: 'Damascus Gate Old City Jerusalem', caption: 'Damascus Gate in Old City Jerusalem' },
  { src: 'https://res.cloudinary.com/dwmnbrjtu/image/upload/PHOTO-2025-04-21-19-20-58_fp4wia.jpg', alt: 'Filming a movie with Ann Vandersteel Sheriff Mack and Michael Yon', caption: 'Filming a movie with Ann Vandersteel, Sheriff Mack, and Michael Yon' },
  { src: 'https://res.cloudinary.com/dwmnbrjtu/image/upload/PHOTO-2025-04-21-19-19-19_ewlfnf.jpg', alt: 'Meeting Michael Yon', caption: 'Meeting Michael Yon' },
  { src: 'https://res.cloudinary.com/dwmnbrjtu/image/upload/PHOTO-2025-04-21-19-18-16_fzzykg.jpg', alt: 'Interviewing Dr Brian Artis', caption: 'Interviewing Dr. Brian Artis' },
  { src: 'https://res.cloudinary.com/dwmnbrjtu/image/upload/PHOTO-2025-04-21-19-17-10_j3dgni.jpg', alt: 'Bob and Mr. G again', caption: 'Bob and Mr. G Together Again' },
  { src: 'https://res.cloudinary.com/dwmnbrjtu/image/upload/PHOTO-2025-04-21-19-13-57_tqumou.jpg', alt: 'Bob with Dr. Judy Mikovits', caption: 'Bob with Dr. Judy Mikovits' },
  { src: 'https://res.cloudinary.com/dwmnbrjtu/image/upload/PHOTO-2025-04-21-19-11-51_iwpv1u.jpg', alt: 'Bob with Charlie Ward', caption: 'Bob with Charlie Ward' },
  { src: 'https://res.cloudinary.com/dwmnbrjtu/image/upload/PHOTO-2025-04-21-19-09-18_epmfga.jpg', alt: 'Bob Healing Kids in Uganda', caption: 'Bob Healing Kids in Uganda' },
  { src: 'https://res.cloudinary.com/dwmnbrjtu/image/upload/PHOTO-2025-04-21-19-08-35_ulzvvw.jpg', alt: 'Bob the Ladies', caption: 'Bob with the Ladies' },
  { src: 'https://res.cloudinary.com/dwmnbrjtu/image/upload/PHOTO-2025-04-21-19-07-50_l0ide5.jpg', alt: 'Bob with Dr. Jane Ruby', caption: 'Bob with Dr. Jane Ruby' },
  { src: 'https://res.cloudinary.com/dwmnbrjtu/image/upload/PHOTO-2025-04-21-19-07-09_fldumk.jpg', alt: 'Patriot street fighter', caption: 'Patriot Street Fighter' },
  { src: 'https://res.cloudinary.com/dwmnbrjtu/image/upload/PHOTO-2025-04-21-19-06-19_yaioox.jpg', alt: 'Photo of Bob', caption: 'Photo of Bob' },
  { src: 'https://res.cloudinary.com/dwmnbrjtu/image/upload/PHOTO-2025-04-21-19-03-37_xj2gai.jpg', alt: 'Cutting up with the General', caption: 'Cutting Up with the General' },
  { src: 'https://res.cloudinary.com/dwmnbrjtu/image/upload/PHOTO-2025-04-21-19-02-43_r167hf.jpg', alt: 'Bob: Us with General Flynn', caption: 'Bob with General Flynn' },
  { src: 'https://res.cloudinary.com/dwmnbrjtu/image/upload/PHOTO-2025-04-21-19-01-53_m2ixj1.jpg', alt: 'Bob with Tom Renz', caption: 'Bob with Tom Renz' },
  { src: 'https://res.cloudinary.com/dwmnbrjtu/image/upload/PHOTO-2025-04-21-19-00-48_uyngxf.jpg', alt: 'Bob with Karen Kingston and Mike Adams', caption: 'Bob with Karen Kingston and Mike Adams' },
  { src: 'https://res.cloudinary.com/dwmnbrjtu/image/upload/PHOTO-2025-04-21-19-00-48_uyngxf.jpg', alt: 'Bob & Leo Dr. Merritt me and Mr. G', caption: 'Bob with Leo, Dr. Merritt, and Mr. G' },
];

// Mock data for videos and testimonials
const mockVideos = [
  { url: 'https://rumble.com/vm8dkf-chlorine-dioxide-the-universal-remedy-that-drug-companies-hate.html', title: 'Chlorine Dioxide, the Universal Remedy that Drug Companies Hate', description: 'This video discusses a remedy claimed to cure many life-threatening illnesses, with testimonials from people sharing their success stories, and notes that it is not widely promoted by the pharmaceutical industry. It is presented as a low-budget documentary from circa 2016, sourced from the Genesis II Church of Health and Healing.', uploader: 'Test User' },
  { url: '//vjs.zencdn.net/v/oceans.mp4', title: 'Mock Video 2', description: 'Another mock video.', uploader: 'Test User' },
];

const mockTestimonials = [
  { username: 'Sarah', testimony: 'CLO2 changed my life. The users here helped me make my own informed decisions.' },
  { username: 'Sam', testimony: 'Bishop Grenons work showed me a new life. Bobs writings brought me closer to knowing God.'},
];

function GalleryModal({ images, selectedIndex, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(selectedIndex);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="gallery-modal">
      <div className="gallery-modal-content">
        <button className="close-btn" onClick={onClose}>X</button>
        <button className="nav-arrow nav-arrow-left" onClick={handlePrev}>←</button>
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          className="gallery-modal-image"
          onError={(e) => {
            console.error(`Failed to load modal image: ${images[currentIndex].src}`);
            e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
          }}
          onLoad={() => console.log(`Successfully loaded modal image: ${images[currentIndex].src}`)}
        />
        <button className="nav-arrow nav-arrow-right" onClick={handleNext}>→</button>
        <p className="gallery-modal-caption">{images[currentIndex].caption}</p>
      </div>
    </div>
  );
}

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
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [authMode, setAuthMode] = useState('signup');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [testimony, setTestimony] = useState('');
  const [testimonials, setTestimonials] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    console.log('Starting useEffect in Home component');

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      console.log('Found stored user:', storedUser);
      setLoggedInUser(JSON.parse(storedUser));
    }

    // Mock videos and testimonials for now
    setVideos(mockVideos);
    if (mockVideos.length > 0) {
      setFeaturedVideo(mockVideos[0]);
    }
    setTestimonials(mockTestimonials);
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!videoFile || !title || !description) return;

    setUploading(true);

    try {
      console.log('Uploading video via Netlify function');
      const response = await axios.post('/.netlify/functions/upload-video', {
        file: videoFile,
        upload_preset: 'detox_videos',
        public_id: title,
      }, {
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
      setError('Failed to upload video');
    } finally {
      setUploading(false);
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      console.log(`Attempting ${authMode} with username: ${username}`);
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
      setError(`Failed to ${authMode}`);
    }
  };

  const handleLogout = () => {
    console.log('Logging out user');
    localStorage.removeItem('user');
    setLoggedInUser(null);
    setIsMenuOpen(false);
  };

  const handleNewsletterSignup = (e) => {
    e.preventDefault();
    console.log('Newsletter signup submitted');
    alert('Thank you for signing up for our newsletter!');
  };

  const openGalleryModal = (index) => {
    console.log('Opening gallery modal for image index:', index);
    setSelectedImageIndex(index);
    setShowGalleryModal(true);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="app">
      <StarryBackground />
      <header className="header">
        <div className="header-content">
          <img src="https://res.cloudinary.com/dwmnbrjtu/image/upload/The_Universal_Antidote_u6g7xx.png" alt="God's Detox Logo" className="header-logo" />
          <div className="title-container">
            <h1 className="title">God's Detox</h1>
            <p className="tagline">Chlorine Dioxide - The Universal Antidote</p>
          </div>
          <button
            className="hamburger-menu"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            <span className="hamburger-icon"></span>
          </button>
        </div>
        <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/" className="nav-btn" onClick={() => setIsMenuOpen(false)}>Knowing God</Link>
          <Link to="/about" className="nav-btn" onClick={() => setIsMenuOpen(false)}>What is CLO2</Link>
          <Link to="/dmso" className="nav-btn" onClick={() => setIsMenuOpen(false)}>What is DMSO</Link>
          <Link to="/benefits" className="nav-btn" onClick={() => setIsMenuOpen(false)}>Testimonials</Link>
          <Link to="/mms" className="nav-btn" onClick={() => setIsMenuOpen(false)}>Our Mission</Link>
          <Link to="/seminars" className="nav-btn" onClick={() => setIsMenuOpen(false)}>Documentaries</Link>
          <Link to="/testimonials" className="nav-btn" onClick={() => setIsMenuOpen(false)}>News Letters</Link>
          <Link to="/gallery" className="nav-btn" onClick={() => setIsMenuOpen(false)}>Articles</Link>
          <Link to="/contact" className="nav-btn" onClick={() => setIsMenuOpen(false)}>Research</Link>
          {loggedInUser ? (
            <>
              <span className="nav-username">{loggedInUser.username}</span>
              <button onClick={handleLogout} className="nav-btn">Logout</button>
            </>
          ) : (
            <button onClick={() => { setShowAuthModal(true); setIsMenuOpen(false); }} className="nav-btn">Sign Up / Login</button>
          )}
        </nav>
      </header>
      <div className="main-content">
        <aside className="sidebar">
          <div className="sidebar-section">
            <h3 className="sidebar-title">
              <img src="https://cdn-icons-png.flaticon.com/32/2089/2089733.png" alt="Calendar Icon" className="sidebar-icon" />
              Upcoming Seminars
            </h3>
            <span className="sidebar-link">God's Detox Seminar in Santa Marta, Colombia - Feb 22nd-23rd 2020 (SPANISH): Learn about ClO2 detoxification in a hands-on workshop.</span>
            <span className="sidebar-link">God's Detox Seminar in Miami, FL - March 10th-11th 2025 (ENGLISH): Join us for a comprehensive detox training session.</span>
          </div>
          <div className="sidebar-section">
            <h3 className="sidebar-title">Recent News</h3>
            <span className="sidebar-link">New ClO2 Study Published - Jan 2025: A recent study highlights the benefits of ClO2 in detoxification.</span>
            <span className="sidebar-link">Community Spotlight - Feb 2025: Member Sarah shares her detox journey.</span>
          </div>
        </aside>
        <main className="content-area">
          <section className="content-section">
            <div className="hero-section">
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&h=300&fit=crop" alt="Detox Event" className="hero-image" />
              <div className="hero-overlay">
                <h2 className="content-title">We believe in...</h2>
                <p className="content-text">
                  At God's Detox, we are committed to promoting holistic health through natural detoxification methods. Our core beliefs include:
                </p>
                <ul className="beliefs-list">
                  <li>Doing good deeds to support our community</li>
                  <li>Doing what is right for the health of all</li>
                  <li>Good health for all mankind through natural means</li>
                  <li>Freedom for all mankind to choose their health path</li>
                  <li>Enlightening with the truth about detoxification</li>
                  <li>Helping one another in our health journeys</li>
                  <li>Integrity in all things we do</li>
                </ul>
                <button className="nav-btn" onClick={() => setShowAuthModal(true)}>Sign Up</button>
              </div>
            </div>
          </section>
          <img src="https://cdn-icons-png.flaticon.com/512/10438/10438811.png" alt="Wave Divider" className="section-divider" />
          <section className="content-section">
            <h2 className="content-title">What is ClO2?</h2>
            <p className="content-text">
              Chlorine Dioxide (ClO2) is a powerful detoxifying agent used in various holistic health practices. It is known for its ability to support the body in eliminating toxins and promoting overall wellness. Learn more about how ClO2 can benefit your health journey.
            </p>
            <Link to="/mms" className="nav-btn">Learn More About MMS</Link>
          </section>
          <img src="https://cdn-icons-png.flaticon.com/512/10438/10438811.png" alt="Wave Divider" className="section-divider" />
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
              <p className="no-videos">No featured video available. Check back soon!</p>
            )}
          </section>
          <img src="https://cdn-icons-png.flaticon.com/512/10438/10438811.png" alt="Wave Divider" className="section-divider" />
          <section className="content-section">
            <h2 className="content-title">Testimonials Spotlight</h2>
            {testimonials.length > 0 ? (
              <div className="testimonials-grid">
                {testimonials.slice(0, 2).map((testimonial, index) => (
                  <div key={index} className="testimonial-card">
                    <p className="testimonial-text">"{testimonial.testimony}"</p>
                    <p className="testimonial-author">- {testimonial.username}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-videos">No testimonials available. Share your story today!</p>
            )}
            <Link to="/testimonials" className="nav-btn">View All Testimonials</Link>
          </section>
          <img src="https://cdn-icons-png.flaticon.com/512/10438/10438811.png" alt="Wave Divider" className="section-divider" />
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
              <p className="no-videos">No videos available. Upload your detox video today!</p>
            )}
          </section>
          <img src="https://cdn-icons-png.flaticon.com/512/10438/10438811.png" alt="Wave Divider" className="section-divider" />
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
          <img src="https://cdn-icons-png.flaticon.com/512/10438/10438811.png" alt="Wave Divider" className="section-divider" />
          <section className="content-section">
            <h2 className="content-title">Join Our Community</h2>
            <p className="content-text">
              Become a part of God's Detox and connect with others on their health journey. Share your experiences, learn from others, and grow together in wellness.
            </p>
            <button className="nav-btn" onClick={() => setShowAuthModal(true)}>Join Now</button>
          </section>
          <img src="https://cdn-icons-png.flaticon.com/512/10438/10438811.png" alt="Wave Divider" className="section-divider" />
          <section className="content-section">
            <h2 className="content-title">Gallery: Bob with Famous People</h2>
            <div className="gallery-grid">
              {galleryImages.length > 0 ? (
                galleryImages.slice(0, 6).map((image, index) => (
                  <div key={index} className="gallery-card" onClick={() => openGalleryModal(index)}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="gallery-image"
                      loading="lazy"
                      onError={(e) => {
                        console.error(`Failed to load gallery image: ${image.src}`);
                        e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                      }}
                      onLoad={() => console.log(`Successfully loaded gallery image: ${image.src}`)}
                    />
                    <p className="gallery-caption">{image.caption}</p>
                  </div>
                ))
              ) : (
                <p className="no-videos">No gallery images available.</p>
              )}
            </div>
            <Link to="/gallery" className="nav-btn">View More</Link>
          </section>
        </main>
        <aside className="resources">
          <div className="resources-section">
            <h3 className="resources-title">
              <img src="https://cdn-icons-png.flaticon.com/32/1087/1087840.png" alt="Resources Icon" className="resources-icon" />
              Resources
            </h3>
            <a href="https://example.com/clo2-guide" className="resources-link" target="_blank" rel="noopener noreferrer">ClO2 Usage Guide</a>
            <a href="https://example.com/detox-protocols" className="resources-link" target="_blank" rel="noopener noreferrer">Detox Protocols</a>
            <a href="https://example.com/research-papers" className="resources-link" target="_blank" rel="noopener noreferrer">Research Papers</a>
          </div>
        </aside>
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
      {showGalleryModal && (
        <GalleryModal
          images={galleryImages}
          selectedIndex={selectedImageIndex}
          onClose={() => setShowGalleryModal(false)}
        />
      )}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <Link to="/about" className="footer-link">About Us</Link>
            <Link to="/contact" className="footer-link">Contact</Link>
            <Link to="/testimonials" className="footer-link">Testimonials</Link>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Connect With Us</h3>
            <a href="https://facebook.com" className="footer-link" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/32/5968/5968764.png" alt="Facebook Icon" className="footer-icon" /> Facebook
            </a>
            <a href="https://twitter.com" className="footer-link" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/32/5969/5969020.png" alt="Twitter Icon" className="footer-icon" /> Twitter
            </a>
            <a href="mailto:info@godsdetoxforbob.com" className="footer-link">
              <img src="https://cdn-icons-png.flaticon.com/32/732/732200.png" alt="Email Icon" className="footer-icon" /> Email Us
            </a>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">
              <img src="https://cdn-icons-png.flaticon.com/32/732/732200.png" alt="Envelope Icon" className="footer-icon" /> Newsletter Signup
            </h3>
            <form onSubmit={handleNewsletterSignup} className="newsletter-form">
              <input type="email" placeholder="Your Email" required />
              <button type="submit" className="submit-btn">Subscribe</button>
            </form>
          </div>
        </div>
        <p className="footer-text">© 2025 God's Detox. All rights reserved.</p>
      </footer>
    </div>
  );
}

function About() {
  return (
    <div className="content-area">
      <h2 className="content-title">About Our Mission</h2>
      <p className="content-text">
        God's Detox is dedicated to sharing knowledge and testimonials about ClO2 detoxification methods inspired by holistic health practices. Our mission is to empower individuals to take control of their health through natural means, fostering a community of support and education.
      </p>
    </div>
  );
}

function DMSO() {
  return (
    <div className="content-area">
      <h2 className="content-title">What is DMSO?</h2>
      <p className="content-text">
        DMSO (Dimethyl Sulfoxide) is a colorless liquid derived as a by-product from wood pulp in paper production. In holistic health and alternative medicine, it is valued for its ability to penetrate the skin deeply and act as a carrier for other substances, making it useful in detoxification protocols. It has anti-inflammatory and analgesic properties, often used to relieve pain from conditions like osteoarthritis and arthritis. Some community members combine DMSO with ClO2 for enhanced detox effects, as it can help transport detox agents more effectively into tissues.
      </p>
      <h3 className="content-subtitle">Potential Benefits</h3>
      <ul className="beliefs-list">
        <li>Reduces inflammation and pain in joints and muscles.</li>
        <li>Enhances skin penetration for topical treatments, aiding in toxin removal.</li>
        <li>Supports wound healing and tissue repair in alternative practices.</li>
        <li>May help with conditions like interstitial cystitis (FDA-approved use) and other inflammatory issues.</li>
      </ul>
      <h3 className="content-subtitle">Risks and Considerations</h3>
      <p className="content-text">
        While DMSO is generally considered safe for topical use, it can cause skin irritation, dryness, or a garlic-like odor on breath. It is not approved by the FDA for most alternative uses, and internal use should be approached with caution. Always consult a healthcare professional before incorporating DMSO into your detox routine, as it can interact with medications and carry impurities through the skin.
      </p>
      <p className="disclaimer-text">
        Disclaimer: Information provided is for educational purposes only and based on community experiences. It is not medical advice. Consult a qualified healthcare provider for personalized guidance.
      </p>
      <Link to="/" className="nav-btn">Back to Home</Link>
    </div>
  );
}

function Benefits() {
  return (
    <div className="content-area">
      <h2 className="content-title">Benefits of ClO2 Detox</h2>
      <p className="content-text">
        ClO2 detoxification has been reported to support the body in eliminating toxins, boosting energy levels, and promoting overall wellness. Many community members have shared stories of improved health and vitality after incorporating ClO2 into their routines.
      </p>
    </div>
  );
}

function MMS() {
  return (
    <div className="content-area">
      <h2 className="content-title">MMS (Master Mineral Solution)</h2>
      <p className="content-text">
        MMS, or Master Mineral Solution, is a key component in many detox protocols. It involves the use of ClO2 to support the body's natural detoxification processes. Learn more about its uses, preparation, and community experiences.
      </p>
    </div>
  );
}

function Seminars() {
  return (
    <div className="content-area">
      <h2 className="content-title">Upcoming Seminars</h2>
      <div className="seminar-card">
        <h3 className="seminar-title">God's Detox Seminar in Santa Marta, Colombia</h3>
        <p className="seminar-date">Feb 22nd-23rd 2020 (SPANISH)</p>
        <p className="seminar-description">
          Join us in Santa Marta for a hands-on workshop on ClO2 detoxification. Learn how to safely use MMS and other detox methods to improve your health.
        </p>
      </div>
      <div className="seminar-card">
        <h3 className="seminar-title">God's Detox Seminar in Miami, FL</h3>
        <p className="seminar-date">March 10th-11th 2025 (ENGLISH)</p>
        <p className="seminar-description">
          A comprehensive training session in Miami, FL, covering the latest in detox protocols and community health practices. Perfect for beginners and advanced practitioners alike.
        </p>
      </div>
    </div>
  );
}

function Testimonials({ testimonials }) {
  return (
    <div className="content-area">
      <h2 className="content-title">ClO2 Testimonials</h2>
      {testimonials && testimonials.length > 0 ? (
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <p className="testimonial-text">"{testimonial.testimony}"</p>
              <p className="testimonial-author">- {testimonial.username}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-videos">No testimonials available. Share your story today!</p>
      )}
    </div>
  );
}

function Gallery() {
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    console.log('Starting useEffect in Gallery component');
  }, []);

  const openGalleryModal = (index) => {
    console.log('Opening gallery modal for image index:', index);
    setSelectedImageIndex(index);
    setShowGalleryModal(true);
  };

  return (
    <div className="content-area">
      <h2 className="content-title">Gallery: Bob with Famous People</h2>
      <div className="gallery-grid">
        {galleryImages.length > 0 ? (
          galleryImages.map((image, index) => (
            <div key={index} className="gallery-card" onClick={() => openGalleryModal(index)}>
              <img
                src={image.src}
                alt={image.alt}
                className="gallery-image"
                loading="lazy"
                onError={(e) => {
                  console.error(`Failed to load gallery image: ${image.src}`);
                  e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                }}
                onLoad={() => console.log(`Successfully loaded gallery image: ${image.src}`)}
              />
              <p className="gallery-caption">{image.caption}</p>
            </div>
          ))
        ) : (
          <p className="no-videos">No gallery images available.</p>
        )}
      </div>
      {showGalleryModal && (
        <GalleryModal
          images={galleryImages}
          selectedIndex={selectedImageIndex}
          onClose={() => setShowGalleryModal(false)}
        />
      )}
    </div>
  );
}

function Contact() {
  return (
    <div className="content-area">
      <h2 className="content-title">Contact The Church</h2>
      <p className="content-text">
        Reach out to us for more information about God's Detox and our mission to promote holistic health. Email us at <a href="mailto:info@godsdetoxforbob.com">info@godsdetoxforbob.com</a>.
      </p>
    </div>
  );
}

function Documentary() {
  return (
    <div className="content-area">
      <h2 className="content-title">God's Detox Documentary</h2>
      <p className="content-text">
        Watch the God's Detox Documentary to learn more about our mission to promote holistic health and natural detoxification practices. Discover how communities worldwide are embracing these methods for wellness.
      </p>
    </div>
  );
}

function Newsletter() {
  return (
    <div className="content-area">
      <h2 className="content-title">Get The Newsletter!</h2>
      <p className="content-text">
        Sign up for our newsletter to receive updates, testimonials, and more from God's Detox. Stay informed about upcoming seminars and community events.
      </p>
    </div>
  );
}

function App() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    console.log('Starting useEffect in App component');
    setTestimonials(mockTestimonials);
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dmso" element={<DMSO />} />
          <Route path="/benefits" element={<Benefits />} />
          <Route path="/mms" element={<MMS />} />
          <Route path="/seminars" element={<Seminars />} />
          <Route path="/testimonials" element={<Testimonials testimonials={testimonials} />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/documentary" element={<Documentary />} />
          <Route path="/newsletter" element={<Newsletter />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;