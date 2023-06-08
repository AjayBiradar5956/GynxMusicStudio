const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    songId: {
        type: Number,

    },
    songName: {
        type: String,

    },
    songImgPath: {
        type: String,

    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'artists',
    },
}, {
    timestamps: true,
});


const Fav = mongoose.model('favorites', favoriteSchema);

module.exports = Fav;