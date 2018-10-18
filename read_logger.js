let log = require('./log');

module.exports = function readArticle(req, res, payload, cb) {
    cb(null, log,'application/json');
};