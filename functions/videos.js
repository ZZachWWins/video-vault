const mongoose = require('mongoose');
require('dotenv').config();

const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

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

  // New endpoint for incrementing views
  if (event.httpMethod === 'PUT') {
    try {
      const { id } = JSON.parse(event.body);
      const video = await Video.findByIdAndUpdate(
        id,
        { $inc: { views: 1 } }, // Increment views by 1
        { new: true } // Return updated document
      );
      return {
        statusCode: 200,
        body: JSON.stringify(video),
      };
    } catch (err) {
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