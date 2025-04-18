import React from 'react';
import ReactPlayer from 'react-player';

function VideosPage({ videos, loading }) {
  return (
    <div className="main-content">
      <h2 className="menu-title">Videos</h2>
      {loading ? (
        <div className="loader"></div>
      ) : videos.length === 0 ? (
        <p className="no-videos">No videos available.</p>
      ) : (
        <div className="video-grid">
          {videos.map((video) => (
            <div key={video._id} className="video-card">
              <ReactPlayer
                url={video.fileUrl}
                light={video.thumbnailUrl}
                width="100%"
                height="200px"
                controls
              />
              <h3 className="video-title">{video.title}</h3>
              <p className="video-description">{video.description}</p>
              <p className="video-uploader">Uploaded by: {video.uploadedBy}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VideosPage;