const mongoose = require('mongoose');
require('dotenv').config();

const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

const Video = mongoose.model('Video', new mongoose.Schema({
  title: String,
  description: String,
  fileUrl: String,
  thumbnailUrl: String,
  uploadedBy: String,
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
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to save video' }),
      };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ error: 'Method not allowed' }),
  };
};