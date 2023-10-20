const { User, Thought } = require('../models');


module.exports = {
    // get all users
    async getAllUsers(req, res) {
        try {
            const userData = await User.find()
                .select('-__v')
                .populate('friends')
                .populate('thoughts');

            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    // get one user by id
    async getUserById({ params }, res) {
        try {
            const userData = await User.findOne({ _id: params.id })
                .select('-__v')
                .populate('friends')
                .populate('thoughts');

            if (!userData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }

            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    // create user
    async createUser({ body }, res) {
        try {
            const userData = await User.create(body);
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    // update user by id
    async updateUser({ params, body }, res) {
        try {

        } catch (err) { }
    }
}