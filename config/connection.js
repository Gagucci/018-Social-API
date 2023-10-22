const { connect, connection } = require('mongoose');

// Connect to MongoDB
const mongoURL = 'mongodb://localhost:27017/socialAPI'

connect(mongoURL);

connection.on('error', (error) => {
    console.error('Database connection error:', error);
});

connection.once('open', () => {
    console.log('Successfully connected to the database!');
});

module.exports = connection;

