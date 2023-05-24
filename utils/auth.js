const User = require('../models/user');
const { UnAuthenticatedError } = require('../errors');
const jwt = require('jsonwebtoken');

//implementing auth middleware for routes
const auth = (req, res, next) => {
    const authHeaders = req.headers.authorization;
    if (!authHeaders || !authHeaders.startsWith('Bearer')) {
        throw new UnAuthenticatedError('Invalid Authentication');
    }
    const token = authHeaders.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: payload.userId, name: payload.username };
        next();

    } catch (err) {
        throw new UnAuthenticatedError('Invalid Authentication');

    }

}
module.exports = auth;