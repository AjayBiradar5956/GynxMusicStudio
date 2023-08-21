const mongoose = require('mongoose');

async function connectToDatabase() {
    try {
        const dbURI = "mongodb+srv://ajaybiradar5956:ajay362AJAY@cluster0.tabwpj6.mongodb.net/?retryWrites=true&w=majority";
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB atlas');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

connectToDatabase();

