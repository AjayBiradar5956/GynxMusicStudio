const User = require('../model/user');
const Fav = require('../model/favorites');
const Artist = require('../model/artist');

module.exports.createFav = function (req, res) {
    Fav.findOne({ user: req.user.id, songId: req.query.id })
        .then((doc) => {
            if (doc) {
                req.flash('success', 'Already Added');
                return res.redirect('back');
            } else {
                let favoriteData = {
                    user: req.user._id,
                    songId: req.query.id,
                    songName: req.query.name,
                    songImgPath: req.query.imagePath
                };
                Fav.create(favoriteData)
                    .then(savedFavorite => {
                        // Handle success, e.g., send a response back to the client
                        req.flash('success', 'Favorite Added Successfully');
                        return res.redirect('back');
                    })
                    .catch(error => {
                        console.error('Error saving favorite:', error);
                        // Handle error, e.g., send an error response back to the client
                    });

            }

        })
        .catch((err) => {
            return console.log("error while looking for favorites", err);
        })

};

module.exports.createFavA = function (req, res) {

    Fav.findOne({ artistId: req.query.artistId }).populate('artist')
        .then((docs) => {
            if (!docs) {
                Artist.findOne({ artistId: req.query.artistId })
                    .then((artist) => {
                        if (!artist) {
                            // Handle case when artist is not found
                            // For example, send an error response or redirect
                            return;
                        } else {
                            Fav.create({
                                user: req.user.id,
                                artist: artist._id,  // Use the _id of the artist
                            })
                                .then((fav) => {
                                    // Handle success, e.g., send a response or redirect
                                    req.flash('success', 'Artist Added to Favorites');
                                    return res.redirect('back');
                                })
                                .catch((error) => {
                                    console.error('Error saving artist:', error);
                                    // Handle error
                                });
                        }
                    });
            }
        });
};


module.exports.favPage = async function (req, res) {
    Fav.find({ user: req.user.id })
        .then((favorites) => {
            const artistKeys = favorites.filter((favorite) => (favorite.artist));
            const favoriteSongs = favorites.filter((favorite) => (!favorite.artist));
            favorites = favoriteSongs;
            const artId = artistKeys.map((key) => key.artist);
            Artist.find({ _id: artId })
                .then((favArtist) => {
                    return res.render('fav.ejs', {
                        title: `${req.user.name}'s Favorites`,
                        user: req.user,
                        favorites,
                        favArtist,
                    });
                })
        })
        .catch((error) => {
            return console.log(error);
        });
};


module.exports.destroy = function (req, res) {
    Fav.deleteOne({ user: req.user.id, _id: req.params.id })
        .then(() => {
            req.flash('success', 'Favorite Deleted');
            return res.redirect('back');
        })
        .catch((err) => {
            return console.log("err in deleting fav", err);
        })
}
module.exports.destroyA = function (req, res) {
    Fav.deleteOne({ user: req.user.id, artist: req.params.id })
        .then(() => {
            req.flash('success', 'Favorite Deleted');
            return res.redirect('back');
        })
        .catch((err) => {
            return console.log("err in deleting fav", err);
        })
}
