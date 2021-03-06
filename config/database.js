const mongoose = require('mongoose');
require('../models/User');

//TODO change db name
const dbName = 'wildlife';

async function initDb() {
    try {
        await mongoose.connect(`mongodb://localhost:27017/${dbName}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected');

        mongoose.connection.on('error', (error) => {
            console.error('Database error');
            console.error(error);
        })
    } catch (error) {
        console.error('Error connecting to database');
        process.exit(1);
    }
}

module.exports = initDb;