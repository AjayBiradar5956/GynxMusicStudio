const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    artistName: {
        type: String,
        required: true,
        unique: true
    },
    artistImgPath: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    artistId: {
        type: Number,
        required: true,
    }

});

const Artist = mongoose.model('artists', artistSchema);
module.exports = Artist;

