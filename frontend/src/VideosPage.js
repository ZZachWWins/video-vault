import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import './App.css';

function VideosPage({ user }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState(''); // Fixed: Renamed setTitle to setDescription
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('video');
  const [uploading, setUploading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch videos from MongoDB via Netlify function on component mount
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get('/.netlify/functions/videos');
        setVideos(res.data || []);
      } catch (err) {
        console.error('Fetch videos error:', err.response?.data || err.message);
        alert('Failed to load videos—please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

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
        'https://api.cloudinary.com/v1_1/dwmnbrjtu/upload', // Replace with your Cloudinary cloud name
        formData
      );

      // Save metadata to MongoDB via Netlify function
      const videoData = {
        title,
        description,
        category,
        fileUrl: cloudinaryRes.data.secure_url,
        uploadedBy: user.username,
      };
      await axios.post('/.netlify/functions/upload-content', videoData);

      // Refresh the video list after upload
      const videosRes = await axios.get('/.netlify/functions/videos');
      setVideos(videosRes.data || []);

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
    <div className="main-content">
      <section className="featured-section">
        <h2 className="featured-title">ClO₂ Videos</h2>
        <p className="landing-text">
          Watch testimonies and tutorials on Chlorine Dioxide (ClO₂). Learn how Mark Grenon’s protocols heal the body. “Go into all the world and proclaim the gospel to the whole creation.” – Mark 16:15
        </p>
        {loading ? (
          <div className="loader" />
        ) : videos.length === 0 ? (
          <p className="no-videos">No videos available—check back soon!</p>
        ) : (
          <div className="video-grid">
            {videos.map((video) => (
              <div key={video._id} className="video-card glassmorphism">
                <ReactPlayer
                  url={video.fileUrl}
                  light={video.fileUrl.replace('/upload/', '/upload/f_auto,q_auto,w_320,h_240/')}
                  width="100%"
                  height="180px"
                  controls
                />
                <h3 className="video-title">{video.title}</h3>
                <p className="video-description">{video.description}</p>
                <p className="video-uploader">Uploaded by: {video.uploadedBy}</p>
                <p className="video-views">Views: {video.views || 0}</p>
              </div>
            ))}
          </div>
        )}
        <p className="landing-text">
          More videos coming soon—check back for updates or share your own ClO₂ story!
        </p>
      </section>
      {user && user.role === 'admin' && (
        <section className="upload-section">
          <h2 className="featured-title">Upload New Video</h2>
          <form className="upload-form glassmorphism" onSubmit={handleSubmit}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Video Title"
              required
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Video Description"
              required
              rows="4"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="video">Video</option>
              <option value="article">Article</option>
            </select>
            <input
              type="file"
              accept="video/*,application/pdf"
              onChange={handleFileChange}
              required
            />
            <button type="submit" className="upload-btn" disabled={uploading}>
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </form>
        </section>
      )}
    </div>
  );
}

export default VideosPage;