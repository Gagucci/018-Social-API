const { connect, connection } = require('mongoose');

// Connect to MongoDB
const mongoURL = 'mongodb://localhost:27017/socialAPI'

connect(mongoURL);

module.exports = connection;

