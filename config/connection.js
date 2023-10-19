const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/socialNetworkDB')
console.log('Connected to MongoDB')

module.exports = mongoose.connection;

