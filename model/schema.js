const { strict } = require('assert');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password1: {
        type: String,
        required: true
    },
    password2: {
        type: String,
        required: true
    },
    totalamount: {
        type: Number,
        required: true
    },
    expense: {
        type: Number,
        required: true
    },
    income: {
        type: Number,
        required: true
    },
    messages: [
        {
            history_messages: String,
            history_amounts: Number
        }

    ]
    ,
    Date: {
        type: Date,
        default: Date.now
    }
})
const User = mongoose.model('mydatas', UserSchema);
module.exports = User;