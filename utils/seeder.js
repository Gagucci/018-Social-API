const connection = require('../config/connection');
const { user, thought, reaction } = require('../models');
const { userSeeds, thoughtSeeds, reactionSeeds } = require('./seeds');

connection.once('error', (err) => {
    console.log('connection error: ', err);
})