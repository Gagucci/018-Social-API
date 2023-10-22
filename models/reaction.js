const { model, Types, Schema } = require('mongoose');

const reactionSchema = new Schema({
    Id: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    Body: {
        type: String,
        required: true,
        maxLength: 280,
    },
    username: {
        type: String,
        required: true,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
},
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
)

const Reaction = model("Reaction", reactionSchema)

module.exports = Reaction;
