/**
 * AQUA PURE SYSTEM - Database Configuration
 * Connects to MongoDB using Mongoose
 */

const mongoose = require('mongoose');

/**
 * Connect to MongoDB
 * Uses MONGO_URI environment variable
 */
const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/aqua-pure-system', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB Connected: ${connection.connection.host}`);
        return connection;
    } catch (error) {
        console.error(`Database connection error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
