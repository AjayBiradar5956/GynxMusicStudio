module.exports.play = function (req, res) {
    const info = {
        name: req.query.name,
        songImgPath: req.query.songImgPath,
        songAudioPath: req.query.songAudioPath,
    }
    return res.render('mc', {
        title: `${req.query.name} playing...`,
        user: req.user,
        info,
    })
}