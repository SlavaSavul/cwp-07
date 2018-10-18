let articles = require('./articles');
const handle_errors = require('./handle_errors');

module.exports = function readArticle(req, res, payload, cb) {
    let index = articles.findIndex(i => i.id == payload.id);
    if(index === -1){
        return handle_errors.invalidRequest(req, res, payload, cb);
    }
    cb(null, articles[index],'application/json');
};