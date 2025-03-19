const mongoose = require('mongoose');

exports.handler = async (event, context) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const Video = mongoose.model('Video', new mongoose.Schema({
      title: String,
      description: String,
      fileUrl: String,
      thumbnailUrl: String,
      uploadedBy: String,
      views: { type: Number, default: 0 },
      likes: { type: Number, default: 0 },
      likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      createdAt: { type: Date, default: Date.now },
    }));

    const result = await Video.updateMany(
      { likes: { $exists: false } },
      { $set: { likes: 0, likedBy: [] } }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Videos updated', modifiedCount: result.modifiedCount }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to update videos' }),
    };
  } finally {
    await mongoose.connection.close();
  }
};