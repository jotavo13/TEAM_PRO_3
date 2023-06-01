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
    category: {
        type: String
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const Videos = mongoose.model('Videos', videosSchema);

module.exports = Videos;