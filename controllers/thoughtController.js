const { User, Thought } = require('../models');


module.exports = {

    // get all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughtData = await Thought.find()
            res.json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    // get one thought by id
    async thoughtById(req, res) {
        try {
            const thoughtData = await Thought.findOne({ _id: req.params.id })
                .select('-__v')
            if (!thoughtData) {
                return res.status(404).json({ message: 'No thought found on this id!' });

            }
            res.json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    // create thought
    async createThought(req, res) {
        try {
            const thoughtData = await Thought.create(req.body);
            const userData = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thoughtData._id } },
                { new: true }
            );
            if (!userData) {
                return res.status(404).json({ message: 'Thought created but no User found!' });
            }
            res.json({ message: 'Thought created and updated to user!' })
        } catch (err) {
            res.status(400).json(err);
        }
    },

    // update thought by id
    async updateThought({ params, body }, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: params.id },
                { $set: body },
                { new: true, runValidators: true }
            )
            if (!thoughtData) {
                return res.status(404).json({ message: 'No thought found on this id!' });
            }
            res.json(thoughtData);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    // delete thought by id
    async deleteThought(req, res) {
        try {
            const thoughtData = await Thought.findOneAndDelete(
                { _id: req.params.id }
            );
            if (!thoughtData) {
                return res.status(404).json({ message: 'No thought found on this id!' });
            }
            res.json({ message: 'Thought has been deleted!' });
        } catch (err) {
            res.status(400).json(err);
        }
    },

    // create a new reaction
    async createReaction(req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $push: { reactions: req.body } },
                { new: true, runValidators: true }
            );
            if (!thoughtData) {
                return res.status(404).json({ message: 'No thought found on this id!' });
            }
            res.json({ message: 'Reaction created!' });
        } catch (err) {
            res.status(400).json(err);
        }
    },

    // delete a reaction 
    async deleteReaction(req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true, runValidators: true }
            );
            if (!thoughtData) {
                return res.status(404).json({ message: 'No thought found on this id!' });
            }
            res.json({ message: 'Reaction deleted!' });
        } catch (err) {
            res.status(400).json(err);
        }
    }

}