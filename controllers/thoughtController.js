const { User, Thought } = require('../models');


module.exports = {

    // get all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughtData = await Thought.find()
                .select('-__v')
                .populate('reactions')
                .populate('thoughts');

            res.json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    // get one thought by id
    async thoughtById({ params }, res) {
        try {
            const thoughtData = await Thought.findOne({ _id: params.id })
                .select('-__v')
                .populate('reactions')
                .populate('thoughts');

            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }

            res.json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    // create thought
    async createThought({ body }, res) {
        try {
            const thoughtData = await Thought.create(body);
            res.json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    // update thought by id
    async updateThought({ params, body }, res) {
        try {

        } catch (err) { }
    }

}