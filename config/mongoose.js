// Mongo Atlas
const mongoose = require('mongoose');

//Connect to your own db
const db = process.env.MONGODB_URL;

mongoose.connect(db).then(() => {
    console.log("DB connected");
}).catch((err) => {
    console.log("DB connection Error", err);
    return;
});
