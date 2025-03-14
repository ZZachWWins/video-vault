const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const VideoSchema = new mongoose.Schema({
  title: String,
  description: String,
  fileUrl: String,
  thumbnailUrl: String,
  uploadedBy: String
});
const Video = mongoose.model('Video', VideoSchema);

exports.handler = async (event) => {
  if (event.httpMethod === 'POST') {
    const video = JSON.parse(event.body);
    const newVideo = new Video(video);
    await newVideo.save();
    return { statusCode: 200, body: JSON.stringify({ message: 'Video added' }) };
  }
  const videos = await Video.find();
  return { statusCode: 200, body: JSON.stringify(videos) };
};