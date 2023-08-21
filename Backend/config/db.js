const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb://localhost/reviewsoftware", {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
        console.log(`MongoDB connected: ${conn.connection.host}`);
        
        // Create TTL index for claimed software subscriptionExpiry
        await conn.connection.db.collection('users').createIndex(
            { 'claimedSoftwares.subscriptionExpiry': 1 },
            { expireAfterSeconds: 0 }
        );

        console.log('TTL index created for claimedSoftwares.subscriptionExpiry');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
