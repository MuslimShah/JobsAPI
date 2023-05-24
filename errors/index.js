//import all custom errors here
const CustomAPIError = require('./custom-api-error');
const BadRequest = require('./bad-request');
const UnAuthenticatedError = require('./unAuthenticated');
const resouceNotFound = require('./notFound');

module.exports = {
    CustomAPIError,
    BadRequest,
    UnAuthenticatedError,
    resouceNotFound
}