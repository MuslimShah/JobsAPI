const { StatusCodes } = require('http-status-codes');
const { BadRequest, UnAuthenticatedError } = require('../errors');
const jwt = require('jsonwebtoken')
const User = require('../models/user');
exports.register = async(req, res) => {
    //password hashing is handled in user model 
    const user = await User.create({...req.body });
    //create token
    const token = await user.createToken();
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
}

//login user
exports.login = async(req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequest('provide username and email');
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw new UnAuthenticatedError('invalid credintials');
    }
    const checkPass = await user.comparePassword(password);
    console.log(checkPass);
    //compare password
    if (!checkPass) {
        throw new UnAuthenticatedError('invalid credintials');
    }

    const token = await user.createToken();
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token });

}