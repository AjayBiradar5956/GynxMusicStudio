// Mongo Atlas

//Connect to your own db
// const db = "mongodb+srv://ajaybiradar5956:ajay362AJAY@cluster0.5ebtloc.mongodb.net/?retryWrites=true&w=majority";
const mongoose = require('mongoose');

async function connectToDatabase() {
    try {
        const dbURI = process.env.MONGODB_URI;
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

connectToDatabase();

