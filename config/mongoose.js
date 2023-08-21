const mongoose = require('mongoose');

async function connectToDatabase() {
    try {
        const dbURI = "mongodb://0.0.0.0:27017";
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB compass');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

connectToDatabase();

