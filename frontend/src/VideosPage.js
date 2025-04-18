import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function VideosPage({ user }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('video');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'godsdetox_upload'); // Your Cloudinary preset

    try {
      // Upload to Cloudinary
      const cloudinaryRes = await axios.post(
        'https://api.cloudinary.com/v1_1/your-cloudinary-cloud-name/upload', // Replace with your Cloudinary cloud name
        formData
      );

      // Save metadata to MongoDB via Netlify function
      await axios.post('/.netlify/functions/upload-content', {
        title,
        description,
        category,
        fileUrl: cloudinaryRes.data.secure_url,
        uploadedBy: user.username,
      });

      alert('Content uploaded successfully!');
      setTitle('');
      setDescription('');
      setFile(null);
      setCategory('video');
    } catch (err) {
      alert('Upload failed—please try again.');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="main-section">
      <h2 className="main-title">ClO₂ Videos</h2>
      <div className="main-content glassmorphism-card">
        <p className="main-text">
          Watch testimonies and tutorials on Chlorine Dioxide (ClO₂). Learn how Mark Grenon’s protocols heal the body. “Go into all the world and proclaim the gospel to the whole creation.” – Mark 16:15
        </p>
        <div className="video-grid">
          <div className="video-card glassmorphism-card">
            <div className="video-placeholder">
              <span>Video Coming Soon</span>
            </div>
            <h3 className="video-title">ClO₂ Testimony #1</h3>
            <p className="video-description">A story of healing with Chlorine Dioxide.</p>
          </div>
          <div className="video-card glassmorphism-card">
            <div className="video-placeholder">
              <span>Video Coming Soon</span>
            </div>
            <h3 className="video-title">How to Use ClO₂</h3>
            <p className="video-description">A tutorial on Mark Grenon’s protocols.</p>
          </div>
          <div className="video-card glassmorphism-card">
            <div className="video-placeholder">
              <span>Video Coming Soon</span>
            </div>
            <h3 className="video-title">ClO₂ Testimony #2</h3>
            <p className="video-description">Another powerful healing story.</p>
          </div>
        </div>
        <p className="main-text">
          More videos coming soon—check back for updates or share your own ClO₂ story!
        </p>
      </div>
      {user && user.role === 'admin' && (
        <div className="main-content glassmorphism-card">
          <h3 className="main-title">Upload New Video</h3>
          <form className="upload-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Video Title"
              required
              className="upload-input glassmorphism-input"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Video Description"
              required
              className="upload-textarea glassmorphism-input"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="upload-select glassmorphism-input"
            >
              <option value="video">Video</option>
              <option value="article">Article</option>
            </select>
            <input
              type="file"
              accept="video/*,application/pdf"
              onChange={handleFileChange}
              className="upload-file glassmorphism-input"
              required
            />
            <button type="submit" className="cta-btn" disabled={uploading}>
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </form>
        </div>
      )}
    </section>
  );
}

export default VideosPage;