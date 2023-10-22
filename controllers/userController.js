const { User, Thought } = require('../models');


module.exports = {

    // get all users
    async getAllUsers(req, res) {
        try {
            const userData = await User.find()
            res.status(200).json(userData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    // get one user by id
    async getUserById(req, res) {
        try {
            const userData = await User.findOne({ _id: req.params.userId })
            res.status(200).json(userData);
            if (!userData) {
                return res.status(404).json({ message: 'No user found on this id!' });
            }
            res.json(userData);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    // create user
    async createUser(req, res) {
        try {
            const userData = await User.create(req.body);
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    // update user by id
    async updateUser({ params, body }, res) {
        try {
            const userData = await User.fineOneAndUpdate(
                { $set: req.body },
                { _id: req.params.userId },
                { new: true, runValidators: true }
            );
            if (!userData) {
                return res.status(404).json({ message: 'No user found on this id!' });
            }
            res.json(userData);
        } catch (err) {
            res.status(400).json(err);
        }
    }
}