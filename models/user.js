const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide name'],
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, 'please provide email'],
        match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'please enter a valid email'],
        unique: true

    },
    password: {
        type: String,
        required: [true, 'please provide password'],
        minlength: 6,
        maxlength: 30
    }

});

module.exports = mongoose.model('User', userSchema);