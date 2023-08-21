const mongoose = require('mongoose');

async function connectToDatabase() {
    try {
        const dbURI = process.env.MONGODB_URI;
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

