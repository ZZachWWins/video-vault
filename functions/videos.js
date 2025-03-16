const mongoose = require('mongoose');
require('dotenv').config();

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error('MONGODB_URI is not defined');
  return {
    statusCode: 500,
    body: JSON.stringify({ error: 'Server configuration error: Missing MONGODB_URI' }),
  };
}

// Connect to MongoDB with error handling
let cachedConnection = null;

async function connectToDatabase() {
  if (cachedConnection) return cachedConnection;
  try {
    cachedConnection = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s
    });
    console.log('MongoDB connected successfully');
    return cachedConnection;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw new Error('Failed to connect to MongoDB');
  }
}

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
  context.callbackWaitsForEmptyEventLoop = false; // Prevent timeout issues

  try {
    await connectToDatabase();

    if (event.httpMethod === 'GET') {
      const videos = await Video.find().sort({ createdAt: -1 });
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(videos),
      };
    }

    if (event.httpMethod === 'POST') {
      const data = JSON.parse(event.body);
      const video = new Video(data);
      await video.save();
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(video),
      };
    }

    if (event.httpMethod === 'PUT') {
      const { id } = JSON.parse(event.body);
      const video = await Video.findByIdAndUpdate(
        id,
        { $inc: { views: 1 } },
        { new: true }
      );
      if (!video) {
        return {
          statusCode: 404,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: 'Video not found' }),
        };
      }
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(video),
      };
    }

    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  } catch (err) {
    console.error('Function error:', err.message);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Internal server error', details: err.message }),
    };
  }
};