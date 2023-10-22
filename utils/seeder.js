const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');
const { userSeeds, thoughtSeeds, reactionSeeds } = require('./seeds');

connection.on('error', (err) => {
    console.log('connection error: ', err);
})

connection.once('open', async () => {
    try {
        console.log('Successfully connected to the database!');

        // wait until users are seeded 
        const users = await User.insertMany(userSeeds);

        // then map username to the user's assigned ID
        const nameMap = {};
        users.forEach((user) => {
            nameMap[user.username] = user._id;
        });

        // seed user's reactions
        const reactions = reactionSeeds.map((reaction) => ({
            ...reaction,
            user: nameMap[reaction.username],
        }));
        await Reaction.insertMany(reactions);

        // seed user's thoughts
        const thoughts = thoughtSeeds.map((thought) => ({
            ...thought,
            user: nameMap[thought.username],
        }));
        await Thought.insertMany(thoughts);

        console.log('Successfully seeded database!');
    } catch (error) {
        console.error('Error seeding database: ', error);
    } finally {
        connection.close();
    }
});

