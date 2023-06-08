const Artist = require('../model/artist');
module.exports.launch = async function (req, res) {
    try {
        const artistQ = Artist.findOne({ artistId: req.query.id });
        const artist = await artistQ.exec();
        return res.render('artist.ejs', {
            title: `${artist.artistName}`,
            user: req.user,
            artist
        });
    } catch (err) {
        return console.log(err);
    }
}