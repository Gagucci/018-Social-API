const { Schema, model } = require('mongoose');


const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: 'Username is required'
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: function (v) {
                return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
    {
        toJSON: {
            virtuals: true,
            versionKey: false,
        },
        id: false,
    }
);

const User = model('User', userSchema);

module.exports = User;