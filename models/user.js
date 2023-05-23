const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

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
        minlength: 6
    }

});
//validation ==>hasing password
userSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
//instanceMethod for creating jsonweb token
userSchema.methods.createToken = function getname() {
    const secretKey = process.env.JWT_SECRET;
    const payload = { userId: this._id, username: this.name };
    return jwt.sign(payload, secretKey, { expiresIn: process.env.JWT_LIFETIME });
}

module.exports = mongoose.model('User', userSchema);