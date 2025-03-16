const mongoose = require('mongoose');
require('dotenv').config();

const mongoUri = process.env.MONGODB_URI; // Updated to MONGODB_URI

if (!mongoUri) {
  console.error('MONGODB_URI is not defined in environment variables');
  return {
    statusCode: 500,
    body: JSON.stringify({ error: 'Server configuration error: Missing MONGODB_URI' }),
  };
}

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(err => console.error('MongoDB connection error:', err));

const Video = mongoose.model('Video', new mongoose.Schema({
  title: String,
  description: String,
  fileUrl: String,
  thumbnailUrl: String,
  uploadedBy: String,
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
}));

exports.handler = async (event, context) => {
  if (event.httpMethod === 'GET') {
    try {
      const videos = await Video.find().sort({ createdAt: -1 });
      return {
        statusCode: 200,
        body: JSON.stringify(videos),
      };
    } catch (err) {
      console.error('Fetch videos error:', err);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to fetch videos' }),
      };
    }
  }

  if (event.httpMethod === 'POST') {
    try {
      const data = JSON.parse(event.body);
      const video = new Video(data);
      await video.save();
      return {
        statusCode: 200,
        body: JSON.stringify(video),
      };
    } catch (err) {
      console.error('Save video error:', err);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to save video' }),
      };
    }
  }

  if (event.httpMethod === 'PUT') {
    try {
      const { id } = JSON.parse(event.body);
      const video = await Video.findByIdAndUpdate(
        id,
        { $inc: { views: 1 } },
        { new: true }
      );
      if (!video) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: 'Video not found' }),
        };
      }
      return {
        statusCode: 200,
        body: JSON.stringify(video),
      };
    } catch (err) {
      console.error('Update views error:', err);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to update views' }),
      };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ error: 'Method not allowed' }),
  };
};