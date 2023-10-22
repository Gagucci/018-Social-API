const { Schema, model } = require('mongoose');
const reactionModel = require('./reaction');

const thoughtSchema = new Schema({
    Text: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 300,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: {
        type: String,
        required: true,
        ref: 'User'
    },
    reactions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Reaction',
        },
    ]
},
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
        timestamps: true,
    },
);

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;