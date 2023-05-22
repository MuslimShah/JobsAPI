//import all custom errors here
const CustomAPIError = require('./custom-api-error');
const BadRequest = require('./bad-request');
const UnAuthenticatedError = require('./unAuthenticated');

module.exports = {
    CustomAPIError,
    BadRequest,
    UnAuthenticatedError
}