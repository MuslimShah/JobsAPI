const { StatusCodes } = require('http-status-codes');
const { BadRequest } = require('../errors');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
exports.register = async(req, res) => {
    //password hashing is handled in user model 
    const user = await User.create({...req.body });
    res.status(StatusCodes.CREATED).json({ user });
}

//login user
exports.login = async(req, res) => {
    res.send('login user user');
}