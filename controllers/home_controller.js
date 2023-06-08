module.exports.welcome = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('welcome', {
        title: "GynX Music Player",
    });
}
