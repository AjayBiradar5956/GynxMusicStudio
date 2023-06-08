const mongoose = require('mongoose');

const queueSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    songId: {
        type: Number,
        required: true,
    },
    songName: {
        type: String,
        required: true,
    },
    songImgPath: {
        type: String,
        required: true,
    },

}, {
    timestamps: true,
});


const Que = mongoose.model('queue', queueSchema);

module.exports = Que;