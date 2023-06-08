const Que = require('../model/queue');

module.exports.createQue = function (req, res) {
    Que.findOne({ user: req.user.id, songId: req.query.id })
        .then((doc) => {
            if (doc) {
                req.flash('success', 'Already Added');
                return res.redirect('back');
            } else {
                let queData = {
                    user: req.user._id,
                    songId: req.query.id,
                    songName: req.query.name,
                    songImgPath: req.query.imagePath
                };
                Que.create(queData)
                    .then(savedQue => {

                        // Handle success, e.g., send a response back to the client
                        req.flash('success', 'Added to Queue');
                        return res.redirect('back');
                    })
                    .catch(error => {
                        console.error('Error saving Queue:', error);
                        // Handle error, e.g., send an error response back to the client
                    });
            }
        })
        .catch((err) => {
            return console.log("error while looking for Queue", err);
        })
};

module.exports.destroy = function (req, res) {
    Que.deleteOne({ user: req.user.id, _id: req.params.id })
        .then(() => {
            req.flash('success', 'Deleted from Queue');
            return res.redirect('back');
        })
        .catch((err) => {
            return console.log("err in deleting fav", err);
        })
}