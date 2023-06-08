// Mongo Atlas
const mongoose = require('mongoose');

//Connect to your own db
const db = "CONNECT TO YOUR DB";

mongoose.connect(db).then(() => {
    console.log("DB connected");
}).catch((err) => {
    console.log("DB connection Error", err);
    return;
});
