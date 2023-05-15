const { mongoose } = require('../db/connection');

const videosSchema = new mongoose.Schema({
    name: String
})

const Videos = mongoose.model('Videos', videosSchema);

module.exports = Videos;