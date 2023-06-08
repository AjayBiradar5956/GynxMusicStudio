const User = require('../model/user');
const Fav = require('../model/favorites');
const Artist = require('../model/artist');
const Que = require('../model/queue');

module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: "Music Player | Sign Up"
    })
}

module.exports.profile = function (req, res) {
    User.findById(req.user._id)
        .then((user) => {
            Que.find({ user: req.user._id })
                .then((queue) => {
                    Fav.aggregate([
                        { $group: { _id: '$songId', count: { $sum: 1 }, songName: { $first: '$songName' }, songImgPath: { $first: '$songImgPath' } } },
                        { $match: { count: { $gt: 1 } } },
                        { $sort: { count: -1 } },
                    ])
                        .then((aggr) => {
                            return res.render('profile', {
                                title: `${user.name}'s Profile`,
                                profile_user: user,
                                queue,
                                aggr,
                            })
                        })

                })

        })
}

module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Music Player | Sign In"
    })
}

//sign-up/register the user info
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                User.create(req.body)
                    .then((user) => {
                        req.flash('success', 'User Signed Up Successfully');
                        return res.redirect('/users/sign-in');
                    })
                    .catch((err) => {
                        if (err) { console.log('error in creating user while signing up'); return }
                    })
            }
            else {
                return res.redirect('back');
            }
        })
        .catch((err) => {
            if (err) { console.log('error in finding user in signing up'); return }
        })
}


// sign in and create a session for the user
module.exports.createSession = function (req, res) {

    req.flash('success', 'Logged in Successfully');

    //to push all the available artist in the database-here we can add more artist - Scaling purpose
    const names = ["Charlie Puth", "Cold Play", "Justin Beiber", "Ed Sheeran", "Bruno Mars"];
    const desc = ["Charles Otto Puth Jr. is an American singer and songwriter. His initial exposure came through the viral success of his song videos uploaded to YouTube. Puth signed with the record label eleveneleven in 2011 after performing on The Ellen DeGeneres Show, while songwriting and producing material for other artists",
        "Coldplay are a British rock band formed in London in 1997. They consist of vocalist and pianist Chris Martin, guitarist Jonny Buckland, bassist Guy Berryman, drummer Will Champion and creative director Phil Harvey",
        "Justin Drew Bieber is a Canadian singer. He is recognized for his genre-melding musicianship and global influence in modern-day popular music",
        "Edward Christopher Sheeran MBE is an English singer-songwriter. Born in Halifax, West Yorkshire, and raised in Framlingham, Suffolk, he began writing songs around the age of eleven. In early 2011, Sheeran independently released the extended play No. 5 Collaborations Project", "Peter Gene Hernandez, known professionally as Bruno Mars, is an American singer, songwriter, and record producer. He is known for his stage performances, retro showmanship, and for performing in a wide range of musical styles, including pop, R&B, funk, soul, reggae, disco, and rock"];
    const origin = ["American", "British", "Canadian", "United Kindom", "American"];
    const img = ["charliePuth", "coldPlay", "justin", "edSheeran", "brunoMars"];

    for (let i = 0, j = 0, k = 0, l = 0; l < img.length, i < names.length, j < desc.length, k < origin.length; i++, j++, k++, l++) {
        Artist.findOne({ artistId: `${[i]}` })
            .then((artist) => {
                if (!artist) {
                    Artist.create({
                        artistName: `${names[i]}`,
                        artistImgPath: `/artist/${img[l]}.jfif`,
                        desc: `${desc[j]}`,
                        origin: `${origin[k]}`,
                        artistId: i,
                    })
                        .then(() => {
                            return console.log("created succ");
                        })
                        .catch((err) => {
                            return console.log("artist", err);
                        })
                }
            })

    }
    return res.redirect('/users/profile');
}

module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
        if (err) {
            console.log(err);
            return res.status(500).send('an error occured during logout');
        } else {
            req.flash('success', 'Logged Out');
            return res.redirect('/users/sign-in');
        }
    })
}