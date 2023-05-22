const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please enter a valid name'],
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, 'please enter a valid email']

    }

});

module.exports = mongoose.model('User', userSchema);