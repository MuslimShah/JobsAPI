// const { CustomAPIError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
//custom error handling middleware
const errorHandler = (err, req, res, next) => {
    //custom error
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'something went wrong try again'
    }

    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate  value for ${Object.keys(err.keyValue)} field please choose another value`;
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }

    if (err.name === 'CastError') {
        customError.msg = `No job with id :${err.value}`;
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }

    if (err.name === 'ValidationError') {
        customError.msg = ` missing values  of field(s) ${Object.keys(err.errors)} please provide values`;
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }
    //don't need this code any more
    // if (err instanceof CustomAPIError) {
    //     return res.status(err.statusCode).json({ msg: err.message });
    // }
    return res.status(customError.statusCode).json({ msg: customError.msg });
};
module.exports = errorHandler;