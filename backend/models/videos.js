const { mongoose } = require('../db/connection');

const videosSchema = new mongoose.Schema({
    title:  {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    channelThumbnail: {
        type: String,
        required: true
    },
    channelTitle: {
        type: String,
        required: true
    },
    publishTime: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        required: true
    },
    videoURL: {
        type: String,
        required: true
    },
    categories: {
        type: [String]
    }
})

const Videos = mongoose.model('Videos', videosSchema);

module.exports = Videos;