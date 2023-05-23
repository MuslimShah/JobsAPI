const { StatusCodes } = require('http-status-codes');
const { BadRequest } = require('../errors');
const jwt = require('jsonwebtoken')
const User = require('../models/user');
exports.register = async(req, res) => {
    //password hashing is handled in user model 
    const user = await User.create({...req.body });
    //create token
    const token = await user.createToken();


    res.status(StatusCodes.CREATED).json(token);
}

//login user
exports.login = async(req, res) => {
    res.send('login user user');
}