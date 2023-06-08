const express = require('express');
const app = express();
const db = require('./config/mongoose');

const expressLayouts = require('express-ejs-layouts');
const port = 8000;
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const cookieParser = require('cookie-parser');

const flash = require('connect-flash');
const customMware = require('./config/middleware');


// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
app.use(express.urlencoded());

app.use(cookieParser());


app.use(express.static('assets'));

app.set('view engine', 'ejs');

app.set('views', './views');


app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



//mongo store
app.use(session({
    name: 'Codeial',
    //todo change the secret before deployment in production mode
    secret: 'ajay',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100),
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/codeial_dev',
        autoRemove: 'disabled',
    }, function (err) {
        console.log(err || "ok");
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

app.use('/', require('./routes/home'));

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("listening to port:", port);
})