// Mongo Atlas
const mongoose = require('mongoose');

//Connect to your own db
const db = "mongodb+srv://ajaybiradar5956:ajay362AJAY@cluster0.5ebtloc.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(db).then(() => {
    console.log("DB connected");
}).catch((err) => {
    console.log("DB connection Error", err);
    return;
});
