const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebookDB"

async function connectToMongo(){
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB Successfully');
    }catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process on failure
    }
}

module.exports = connectToMongo;