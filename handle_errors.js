const handleErrors = {};

handleErrors.notFound = function(req, res, payload, cb) {
    cb({ code: 404, message: 'Not found'});
};
handleErrors.invalidRequest = function(req, res, payload, cb) {
    cb({ code: 400, message: 'Request invalid'});
};
module.exports = handleErrors;